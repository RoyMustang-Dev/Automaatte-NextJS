import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { supabase, checkOAuthUserExists, createOAuthUserProfile } from '../../lib/supabase'

export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Processing authentication...')

  // Check if this is a signup flow
  const urlParams = new URLSearchParams(window.location.search)
  const isSignUpMode = urlParams.get('mode') === 'signup'

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Auth callback started, isSignUpMode:', isSignUpMode)
        console.log('Current URL:', window.location.href)

        // Check for OAuth errors in URL
        const urlParams = new URLSearchParams(window.location.search)
        const hashParams = new URLSearchParams(window.location.hash.substring(1))

        const error = urlParams.get('error') || hashParams.get('error')
        const errorDescription = urlParams.get('error_description') || hashParams.get('error_description')

        if (error) {
          console.error('OAuth error:', error, errorDescription)

          if (error === 'server_error' && errorDescription?.includes('Database error saving new user')) {
            // Database trigger failed, we need to handle user creation manually
            console.log('Database trigger failed, attempting manual user creation...')

            // When database trigger fails, Supabase signs out the user
            // We need to extract user info from the URL or try to re-authenticate

            // For now, show a helpful error message and redirect to signup
            setStatus('error')
            setMessage('Database error occurred during signup. This is likely due to database configuration. Please contact support or try again later.')

            // Add a note about the technical issue
            console.error('Technical details: The database trigger for creating user profiles failed. This needs to be fixed in the Supabase database configuration.')

            setTimeout(() => navigate('/auth/signup'), 5000)
            return
          }

          // Other OAuth errors
          setStatus('error')
          setMessage(errorDescription || 'Authentication failed. Please try again.')
          setTimeout(() => navigate('/auth/signin'), 3000)
          return
        }

        // No OAuth errors, proceed with normal flow
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('Session error:', sessionError)
          setStatus('error')
          setMessage('Authentication failed. Please try again.')
          setTimeout(() => navigate('/auth/signin'), 3000)
          return
        }

        // If no session, try to get user directly (for fresh OAuth callback)
        let user = sessionData?.session?.user

        if (!user) {
          const { data: userData, error: userError } = await supabase.auth.getUser()
          if (userError) {
            console.error('User error:', userError)
            setStatus('error')
            setMessage('No session found. Redirecting to sign in...')
            setTimeout(() => navigate('/auth/signin'), 3000)
            return
          }
          user = userData.user
        }

        if (user) {
          console.log('OAuth user:', user)

          // Check if this is a new OAuth user (first time signing in)
          if (user.email) {
            console.log('Checking if user exists:', user.email)
            const { data: existingUser, error: checkError } = await checkOAuthUserExists(user.email)

            console.log('User check result:', { existingUser, checkError })

            if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
              console.error('Error checking user existence:', checkError)
              // Continue with sign in if we can't check
            } else if (!existingUser) {
              console.log('User does not exist, isSignUpMode:', isSignUpMode)
              if (isSignUpMode) {
                // This is a signup flow and user doesn't exist - the database trigger should have created the profile
                // Wait a moment and check again
                console.log('Signup mode: waiting for database trigger to create profile...')
                await new Promise(resolve => setTimeout(resolve, 2000)) // Wait 2 seconds

                const { data: retryUser, error: retryError } = await checkOAuthUserExists(user.email)
                console.log('Retry check result:', { retryUser, retryError })

                if (retryUser) {
                  console.log('Profile created by database trigger')
                  setStatus('success')
                  setMessage('Account created successfully! Redirecting...')
                } else {
                  console.log('Database trigger failed, creating profile manually')
                  try {
                    const { data: newProfile, error: createError } = await createOAuthUserProfile(user)

                    if (createError) {
                      console.error('Error creating user profile:', createError)
                      setStatus('error')
                      setMessage('Failed to create user profile. Please try again.')
                      setTimeout(() => {
                        navigate('/auth/signup')
                      }, 3000)
                      return
                    }

                    console.log('User profile created manually:', newProfile)
                    setStatus('success')
                    setMessage('Account created successfully! Redirecting...')
                  } catch (err) {
                    console.error('Unexpected error creating profile:', err)
                    setStatus('error')
                    setMessage('Failed to create account. Please try again.')
                    setTimeout(() => {
                      navigate('/auth/signup')
                    }, 3000)
                    return
                  }
                }
              } else {
                // This is a sign-in flow but user doesn't exist - redirect to signup
                console.log('OAuth user not found in profiles, signing out')
                await supabase.auth.signOut()
                setStatus('error')
                setMessage('Account not found. Please sign up first.')
                setTimeout(() => {
                  navigate('/auth/signin', {
                    state: {
                      showUserNotFound: true,
                      email: user.email,
                      provider: user.app_metadata?.provider || 'oauth'
                    }
                  })
                }, 3000)
                return
              }
            } else if (existingUser && isSignUpMode) {
              // User already exists and this is signup - just log them in
              console.log('User already exists, logging them in')
              setStatus('success')
              setMessage('Welcome back! Logging you in...')
            }
          }

          // User exists or we couldn't check, proceed with sign in
          if (status !== 'success') {
            setStatus('success')
            setMessage('Authentication successful! Redirecting...')
          }

          // Redirect to dashboard after successful auth
          setTimeout(() => navigate('/dashboard'), 2000)
        } else {
          setStatus('error')
          setMessage('No session found. Redirecting to sign in...')
          setTimeout(() => navigate('/auth/signin'), 3000)
        }
      } catch (error) {
        console.error('Unexpected error:', error)
        setStatus('error')
        setMessage('An unexpected error occurred')
        setTimeout(() => navigate('/auth/signin'), 3000)
      }
    }

    handleAuthCallback()
  }, [navigate])

  const getIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
      case 'success':
        return <CheckCircle className="w-12 h-12 text-green-400" />
      case 'error':
        return <XCircle className="w-12 h-12 text-red-400" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return 'text-purple-400'
      case 'success':
        return 'text-green-400'
      case 'error':
        return 'text-red-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          {getIcon()}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-2xl font-bold mb-4 ${getStatusColor()}`}
        >
          {status === 'loading' && 'Authenticating...'}
          {status === 'success' && 'Welcome to Automaatte!'}
          {status === 'error' && 'Authentication Failed'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 mb-6"
        >
          {message}
        </motion.p>

        {status === 'loading' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full bg-slate-700/50 rounded-full h-2"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
