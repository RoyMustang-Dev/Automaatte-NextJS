-- =====================================================
-- FIX RLS POLICIES - Run this in Supabase SQL Editor
-- =====================================================

-- 1. Drop all existing policies on profiles table
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users during signup" ON profiles;
DROP POLICY IF EXISTS "Admin can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admin can update all profiles" ON profiles;

-- 2. Create simple, non-recursive policies

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Allow profile creation during signup (needed for trigger)
CREATE POLICY "Enable insert for authenticated users during signup" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Admin policies using email check instead of profiles table lookup
-- This avoids the circular reference
CREATE POLICY "Admin can view all profiles" ON profiles
  FOR SELECT USING (
    auth.jwt() ->> 'email' = 'adityamishra0996@gmail.com'
  );

CREATE POLICY "Admin can update all profiles" ON profiles
  FOR UPDATE USING (
    auth.jwt() ->> 'email' = 'adityamishra0996@gmail.com'
  );

CREATE POLICY "Admin can insert any profile" ON profiles
  FOR INSERT WITH CHECK (
    auth.jwt() ->> 'email' = 'adityamishra0996@gmail.com'
  );

-- 3. Verify policies are working
SELECT policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';

-- 4. Test profile access
-- This should work now without infinite recursion
SELECT id, email, name, user_type 
FROM profiles 
WHERE id = auth.uid()
LIMIT 1;

-- =====================================================
-- POLICIES FIXED!
-- =====================================================
