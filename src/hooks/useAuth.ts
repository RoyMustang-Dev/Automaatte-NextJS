import { useState, useEffect } from 'react'
import { User as SupabaseUser, Session } from '@supabase/supabase-js'
import { supabase, onAuthStateChange, getCurrentUser, getSession } from '../lib/supabase'

interface AuthState {
  user: SupabaseUser | null
  session: Session | null
  loading: boolean
  error: string | null
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { session, error: sessionError } = await getSession()

        if (sessionError) {
          console.warn('Session error:', sessionError)
          setAuthState({
            user: null,
            session: null,
            loading: false,
            error: null // Don't show session errors to user
          })
          return
        }

        const { user, error: userError } = await getCurrentUser()

        if (userError) {
          console.warn('User error:', userError)
        }

        setAuthState({
          user: user || null,
          session: session || null,
          loading: false,
          error: null
        })
      } catch (error) {
        console.error('Auth initialization error:', error)
        setAuthState({
          user: null,
          session: null,
          loading: false,
          error: null // Don't block UI for initialization errors
        })
      }
    }

    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('Auth timeout reached, setting loading to false');
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: null
      }))
    }, 3000) // 3 second timeout

    initializeAuth().finally(() => {
      clearTimeout(timeoutId)
    })

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session)
      
      if (session) {
        const { user } = await getCurrentUser()
        setAuthState({
          user,
          session,
          loading: false,
          error: null
        })
      } else {
        setAuthState({
          user: null,
          session: null,
          loading: false,
          error: null
        })
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }))
      const { error } = await supabase.auth.signOut()
      
      if (error) throw error
      
      setAuthState({
        user: null,
        session: null,
        loading: false,
        error: null
      })
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Sign out error'
      }))
    }
  }

  return {
    user: authState.user,
    session: authState.session,
    loading: authState.loading,
    error: authState.error,
    isAuthenticated: !!authState.user,
    signOut
  }
}
