import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { supabase, checkOAuthUserExists } from '../../lib/supabase'

export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Processing authentication...')

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the auth callback
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Auth callback error:', error)
          setStatus('error')
          setMessage(error.message || 'Authentication failed')
          setTimeout(() => navigate('/auth/signin'), 3000)
          return
        }

        if (data.session && data.session.user) {
          const user = data.session.user
          console.log('OAuth user:', user)

          // Check if this is a new OAuth user (first time signing in)
          if (user.email) {
            const { data: existingUser, error: checkError } = await checkOAuthUserExists(user.email)

            if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
              console.error('Error checking user existence:', checkError)
              // Continue with sign in if we can't check
            } else if (!existingUser) {
              // User doesn't exist in our profiles table, sign them out and redirect to signup
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
          }

          // User exists or we couldn't check, proceed with sign in
          setStatus('success')
          setMessage('Authentication successful! Redirecting...')

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
