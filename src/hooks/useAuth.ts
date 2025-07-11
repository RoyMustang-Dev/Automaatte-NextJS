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
        const { session } = await getSession()
        const { user } = await getCurrentUser()
        
        setAuthState({
          user,
          session,
          loading: false,
          error: null
        })
      } catch (error) {
        setAuthState({
          user: null,
          session: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Authentication error'
        })
      }
    }

    initializeAuth()

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
