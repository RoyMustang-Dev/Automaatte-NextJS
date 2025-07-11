-- =====================================================
-- COMPLETE SUPABASE SQL SETUP FOR AUTOMAATTE
-- Run these queries in your Supabase SQL Editor
-- =====================================================

-- 1. DROP EXISTING TABLES (if you want to start fresh)
-- Uncomment these lines if you need to recreate tables
-- DROP TABLE IF EXISTS usage_tracking CASCADE;
-- DROP TABLE IF EXISTS profiles CASCADE;
-- DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
-- DROP FUNCTION IF EXISTS public.check_duplicate_user(TEXT) CASCADE;

-- 2. CREATE ENHANCED PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  user_type TEXT DEFAULT 'free' CHECK (user_type IN ('free', 'paid', 'enterprise', 'admin')),
  avatar_url TEXT,
  provider TEXT, -- 'email', 'google', 'github'
  provider_id TEXT, -- OAuth provider user ID
  full_name TEXT, -- Full name from OAuth
  first_name TEXT, -- First name from OAuth
  last_name TEXT, -- Last name from OAuth
  username TEXT, -- GitHub username or Google+ username
  bio TEXT, -- GitHub bio
  location TEXT, -- Location from OAuth
  website TEXT, -- Website/blog URL
  company TEXT, -- Company from GitHub
  hireable BOOLEAN, -- GitHub hireable status
  public_repos INTEGER, -- GitHub public repos count
  followers INTEGER, -- GitHub followers count
  following INTEGER, -- GitHub following count
  locale TEXT, -- User's locale/language
  verified_email BOOLEAN DEFAULT false, -- Email verification status
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- 3. CREATE USAGE TRACKING TABLE
CREATE TABLE IF NOT EXISTS usage_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  service_name TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  cost DECIMAL(10,4) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ENABLE ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;

-- 5. CREATE SECURITY POLICIES

-- Profile policies for regular users
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Usage tracking policies for regular users
CREATE POLICY "Users can view own usage" ON usage_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage" ON usage_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin policies (admin can view/update all data)
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

CREATE POLICY "Admin can view all usage" ON usage_tracking
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

CREATE POLICY "Admin can insert any usage" ON usage_tracking
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- 6. CREATE ENHANCED USER CREATION FUNCTION
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
  
  INSERT INTO public.profiles (
    id, email, name, user_type, avatar_url, provider, provider_id,
    full_name, first_name, last_name, username, bio, location, 
    website, company, hireable, public_repos, followers, following,
    locale, verified_email
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
      ELSE COALESCE(NEW.raw_user_meta_data->>'user_type', 'free')
    END,
    NEW.raw_user_meta_data->>'avatar_url',
    provider_name,
    NEW.raw_user_meta_data->>'provider_id',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'given_name',
    NEW.raw_user_meta_data->>'family_name',
    NEW.raw_user_meta_data->>'user_name',
    NEW.raw_user_meta_data->>'bio',
    NEW.raw_user_meta_data->>'location',
    NEW.raw_user_meta_data->>'blog',
    NEW.raw_user_meta_data->>'company',
    (NEW.raw_user_meta_data->>'hireable')::boolean,
    (NEW.raw_user_meta_data->>'public_repos')::integer,
    (NEW.raw_user_meta_data->>'followers')::integer,
    (NEW.raw_user_meta_data->>'following')::integer,
    NEW.raw_user_meta_data->>'locale',
    COALESCE((NEW.raw_user_meta_data->>'email_verified')::boolean, NEW.email_confirmed_at IS NOT NULL)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. CREATE TRIGGER FOR NEW USER SIGNUP
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. CREATE DUPLICATE USER CHECK FUNCTION
CREATE OR REPLACE FUNCTION public.check_duplicate_user(user_email TEXT)
RETURNS TABLE(exists_with_provider TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT p.provider
  FROM profiles p
  WHERE p.email = user_email
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. CREATE UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. CREATE UPDATED_AT TRIGGERS
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 11. CREATE INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS profiles_user_type_idx ON profiles(user_type);
CREATE INDEX IF NOT EXISTS profiles_provider_idx ON profiles(provider);
CREATE INDEX IF NOT EXISTS usage_tracking_user_id_idx ON usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS usage_tracking_created_at_idx ON usage_tracking(created_at);
CREATE INDEX IF NOT EXISTS usage_tracking_service_type_idx ON usage_tracking(service_type);

-- 12. GRANT NECESSARY PERMISSIONS
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.usage_tracking TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_duplicate_user(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_updated_at() TO anon, authenticated;

-- =====================================================
-- VERIFICATION QUERIES (Optional - for testing)
-- =====================================================

-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'usage_tracking');

-- Check if functions exist
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('handle_new_user', 'check_duplicate_user');

-- Check if triggers exist
SELECT trigger_name, event_object_table 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';

-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'usage_tracking');

-- =====================================================
-- SETUP COMPLETE!
-- Your Supabase database is now ready for Automaatte
-- =====================================================
