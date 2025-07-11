-- =====================================================
-- OAUTH SIGNUP FIX - Run this in Supabase SQL Editor
-- =====================================================

-- 1. First, check if profiles table exists and has correct structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position;

-- 2. Create or replace the user creation function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  provider_name TEXT;
  is_admin BOOLEAN := false;
BEGIN
  -- Determine provider
  provider_name := COALESCE(NEW.raw_app_meta_data->>'provider', 'email');
  
  -- Check if user is admin
  IF NEW.email = 'adityamishra0996@gmail.com' THEN
    is_admin := true;
  END IF;
  
  -- Insert into profiles table
  INSERT INTO public.profiles (
    id, 
    email, 
    name, 
    user_type, 
    avatar_url, 
    provider,
    full_name,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'full_name', 
      split_part(NEW.email, '@', 1)
    ),
    CASE 
      WHEN is_admin THEN 'admin'
      ELSE 'free'
    END,
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      NEW.raw_user_meta_data->>'picture'
    ),
    provider_name,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name'
    ),
    NOW(),
    NOW()
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 4. Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon, authenticated;

-- 6. Check RLS policies on profiles table
SELECT policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'profiles';

-- 7. Ensure profiles table has correct RLS policies
-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- Create policy to allow profile creation during signup
CREATE POLICY "Enable insert for authenticated users during signup" ON profiles
  FOR INSERT WITH CHECK (true);

-- Keep existing policies for select and update
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Admin policies
CREATE POLICY "Admin can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

CREATE POLICY "Admin can update all profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- 8. Test the function manually (optional)
-- You can test this by creating a test user:
/*
SELECT public.handle_new_user() FROM auth.users LIMIT 1;
*/

-- 9. Verify everything is working
SELECT 
  'Trigger exists' as check_type,
  COUNT(*) as count
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created'
UNION ALL
SELECT 
  'Function exists' as check_type,
  COUNT(*) as count
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user'
UNION ALL
SELECT 
  'Profiles table exists' as check_type,
  COUNT(*) as count
FROM information_schema.tables 
WHERE table_name = 'profiles';

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
