import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export type AuthProvider = 'google' | 'github'

export const signInWithProvider = async (provider: AuthProvider, isSignUp: boolean = false) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback${isSignUp ? '?mode=signup' : ''}`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  })
  return { data, error }
}

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signUpWithEmail = async (email: string, password: string, userData?: { name?: string }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`,
      data: userData
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`
  })
  return { data, error }
}

export const updatePassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password
  })
  return { data, error }
}

export const updateUser = async (userData: { name?: string; avatar_url?: string }) => {
  const { data, error } = await supabase.auth.updateUser({
    data: userData
  })
  return { data, error }
}

export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback)
}

export const checkDuplicateUser = async (email: string) => {
  const { data, error } = await supabase.rpc('check_duplicate_user', {
    user_email: email
  })
  return { data, error }
}

// Check if OAuth user exists before allowing sign in
export const checkOAuthUserExists = async (email: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('email, provider')
    .eq('email', email)
    .single()

  return { data, error }
}

// Create user profile for OAuth users
export const createOAuthUserProfile = async (user: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || '',
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || '',
        provider: user.app_metadata?.provider || 'oauth',
        user_type: user.email === 'adityamishra0996@gmail.com' ? 'admin' : 'free'
      }
    ])
    .select()
    .single()

  return { data, error }
}

// Types
export interface User {
  id: string
  email: string
  name?: string
  user_type?: 'free' | 'paid' | 'enterprise'
  avatar_url?: string
  created_at: string
  updated_at?: string
}

export interface Profile {
  id: string
  email: string
  name: string
  user_type: 'free' | 'paid' | 'enterprise'
  avatar_url?: string
  created_at: string
  updated_at: string
}