-- =====================================================
-- OAUTH USER CREATION FIX
-- Run this in your Supabase SQL Editor
-- =====================================================

-- 1. Create a function to check if OAuth user should be allowed
CREATE OR REPLACE FUNCTION public.should_allow_oauth_user(user_email TEXT, provider_name TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  existing_user_count INTEGER;
BEGIN
  -- Check if user already exists in profiles
  SELECT COUNT(*) INTO existing_user_count
  FROM profiles
  WHERE email = user_email;
  
  -- If user exists, allow the OAuth sign in
  IF existing_user_count > 0 THEN
    RETURN TRUE;
  END IF;
  
  -- If user doesn't exist, don't allow OAuth sign in
  -- (They should sign up first)
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Update the user creation function to handle OAuth restrictions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  provider_name TEXT;
  is_admin BOOLEAN := false;
  should_create_profile BOOLEAN := true;
BEGIN
  -- Determine provider
  provider_name := COALESCE(NEW.raw_app_meta_data->>'provider', 'email');
  
  -- Check if user is admin
  IF NEW.email = 'adityamishra0996@gmail.com' THEN
    is_admin := true;
  END IF;
  
  -- For OAuth providers, check if user should be allowed
  IF provider_name IN ('google', 'github') THEN
    should_create_profile := public.should_allow_oauth_user(NEW.email, provider_name);
    
    -- If OAuth user shouldn't be created, delete the auth user and return
    IF NOT should_create_profile THEN
      -- Log the attempt (optional)
      RAISE LOG 'Preventing OAuth user creation for email: %', NEW.email;
      
      -- Delete the auth user that was just created
      DELETE FROM auth.users WHERE id = NEW.id;
      
      -- Return NULL to prevent further processing
      RETURN NULL;
    END IF;
  END IF;
  
  -- Create profile for allowed users
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

-- 3. Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Grant permissions
GRANT EXECUTE ON FUNCTION public.should_allow_oauth_user(TEXT, TEXT) TO anon, authenticated;

-- =====================================================
-- ALTERNATIVE APPROACH: RLS on auth.users (if above doesn't work)
-- =====================================================

-- Note: The above approach might not work because we can't delete from auth.users
-- in a trigger. Here's an alternative approach using a custom signup function:

CREATE OR REPLACE FUNCTION public.custom_oauth_signup(
  user_email TEXT,
  provider_name TEXT,
  user_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS JSONB AS $$
DECLARE
  existing_user_count INTEGER;
  result JSONB;
BEGIN
  -- Check if user already exists
  SELECT COUNT(*) INTO existing_user_count
  FROM profiles
  WHERE email = user_email;
  
  IF existing_user_count > 0 THEN
    -- User exists, allow OAuth sign in
    result := jsonb_build_object(
      'success', true,
      'message', 'User exists, OAuth sign in allowed'
    );
  ELSE
    -- User doesn't exist, prevent OAuth sign in
    result := jsonb_build_object(
      'success', false,
      'message', 'User not found. Please sign up first.',
      'redirect_to_signup', true
    );
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.custom_oauth_signup(TEXT, TEXT, JSONB) TO anon, authenticated;

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Test the function
SELECT public.should_allow_oauth_user('test@example.com', 'google');
SELECT public.custom_oauth_signup('test@example.com', 'google', '{"name": "Test User"}'::jsonb);

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
