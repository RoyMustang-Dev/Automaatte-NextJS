-- =====================================================
-- TEMPORARY FIX - Disable RLS on profiles table
-- Run this in Supabase SQL Editor for immediate fix
-- =====================================================

-- Temporarily disable RLS on profiles table
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- This will allow all authenticated users to access profiles
-- You should re-enable RLS after fixing the policies

-- To re-enable later (after running FIX_RLS_POLICIES.sql):
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- TEMPORARY FIX COMPLETE!
-- =====================================================
