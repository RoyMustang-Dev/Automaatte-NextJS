import React, { createContext, useContext, ReactNode } from 'react'
import { User as SupabaseUser, Session } from '@supabase/supabase-js'
import { useAuth } from '../hooks/useAuth'

interface AuthContextType {
  user: SupabaseUser | null
  session: Session | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}
