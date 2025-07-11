-- =====================================================
-- ADMIN USER SETUP
-- Run this in your Supabase SQL Editor
-- =====================================================

-- 1. Check if admin user exists in profiles
SELECT * FROM profiles WHERE email = 'adityamishra0996@gmail.com';

-- 2. If admin user doesn't exist in profiles but exists in auth.users, create profile
DO $$
DECLARE
    admin_user_id UUID;
    profile_exists INTEGER;
BEGIN
    -- Check if admin user exists in auth.users
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'adityamishra0996@gmail.com';
    
    IF admin_user_id IS NOT NULL THEN
        -- Check if profile exists
        SELECT COUNT(*) INTO profile_exists
        FROM profiles
        WHERE id = admin_user_id;
        
        IF profile_exists = 0 THEN
            -- Create admin profile
            INSERT INTO profiles (
                id, email, name, user_type, created_at, updated_at
            ) VALUES (
                admin_user_id,
                'adityamishra0996@gmail.com',
                'Aditya Mishra',
                'admin',
                NOW(),
                NOW()
            );
            
            RAISE NOTICE 'Admin profile created for existing user';
        ELSE
            -- Update existing profile to admin
            UPDATE profiles 
            SET user_type = 'admin', name = 'Aditya Mishra'
            WHERE id = admin_user_id;
            
            RAISE NOTICE 'Existing profile updated to admin';
        END IF;
    ELSE
        RAISE NOTICE 'Admin user not found in auth.users. Please sign up first.';
    END IF;
END $$;

-- 3. Verify admin user setup
SELECT 
    u.email,
    u.created_at as auth_created,
    u.email_confirmed_at,
    p.name,
    p.user_type,
    p.created_at as profile_created
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.id
WHERE u.email = 'adityamishra0996@gmail.com';

-- 4. Create function to manually promote user to admin (if needed)
CREATE OR REPLACE FUNCTION public.promote_to_admin(user_email TEXT)
RETURNS TEXT AS $$
DECLARE
    user_id UUID;
    result TEXT;
BEGIN
    -- Find user by email
    SELECT id INTO user_id
    FROM auth.users
    WHERE email = user_email;
    
    IF user_id IS NULL THEN
        RETURN 'User not found in auth.users';
    END IF;
    
    -- Update or create profile
    INSERT INTO profiles (id, email, name, user_type, created_at, updated_at)
    VALUES (
        user_id,
        user_email,
        split_part(user_email, '@', 1),
        'admin',
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        user_type = 'admin',
        updated_at = NOW();
    
    RETURN 'User promoted to admin successfully';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Grant permissions
GRANT EXECUTE ON FUNCTION public.promote_to_admin(TEXT) TO authenticated;

-- 6. Example usage (uncomment if needed):
-- SELECT public.promote_to_admin('adityamishra0996@gmail.com');

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check all admin users
SELECT 
    u.email,
    p.name,
    p.user_type,
    u.email_confirmed_at IS NOT NULL as email_confirmed
FROM auth.users u
JOIN profiles p ON u.id = p.id
WHERE p.user_type = 'admin';

-- Check if admin policies are working
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE policyname LIKE '%admin%';

-- =====================================================
-- TROUBLESHOOTING
-- =====================================================

-- If admin still can't access, run this:
-- UPDATE profiles SET user_type = 'admin' WHERE email = 'adityamishra0996@gmail.com';

-- Check RLS policies
-- SELECT * FROM pg_policies WHERE tablename IN ('profiles', 'usage_tracking');

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
