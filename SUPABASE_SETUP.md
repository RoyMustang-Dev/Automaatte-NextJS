# 🚀 Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for the Automaatte website.

## 📋 Prerequisites

- A Supabase account (free at [supabase.com](https://supabase.com))
- Node.js and npm installed

## 🛠️ Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `automaatte-auth`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be set up (2-3 minutes)

## 🔑 Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 📝 Step 3: Configure Environment Variables

1. Create a `.env` file in your project root:
```bash
cp .env.example .env
```

2. Update the `.env` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🔐 Step 4: Configure Authentication Providers

### Enable Email Authentication
1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Auth Providers**, ensure **Email** is enabled
3. Configure email settings as needed

### Enable Google OAuth (Optional)
1. Go to **Authentication** → **Settings** → **Auth Providers**
2. Find **Google** and click **Enable**
3. You'll need to:
   - Create a Google Cloud Project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `https://your-project-id.supabase.co/auth/v1/callback`
     - `http://localhost:5173/auth/callback` (for development)
4. Enter your Google Client ID and Client Secret

### Enable GitHub OAuth (Optional)
1. Go to **Authentication** → **Settings** → **Auth Providers**
2. Find **GitHub** and click **Enable**
3. You'll need to:
   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - Create a new OAuth App
   - Set Authorization callback URL to: `https://your-project-id.supabase.co/auth/v1/callback`
4. Enter your GitHub Client ID and Client Secret

## 🗄️ Step 5: Set Up Database Tables (Optional)

For user profiles and usage tracking, run this SQL in your Supabase SQL editor:

```sql
-- Create profiles table with enhanced OAuth data
CREATE TABLE profiles (
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

-- Create usage tracking table
CREATE TABLE usage_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  service_name TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  cost DECIMAL(10,4) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own usage" ON usage_tracking
  FOR SELECT USING (auth.uid() = user_id);

-- Create function to handle new user signup with enhanced OAuth data
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

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to check for duplicate users across providers
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

-- Admin-only policies
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
```

## 🚀 Step 6: Test the Setup

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:5173/auth/signin`
3. Try signing up with email/password
4. Test social login if configured
5. Check that users appear in your Supabase dashboard under **Authentication** → **Users**

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Check your environment variables are correct
2. **OAuth redirect errors**: Ensure redirect URLs are properly configured
3. **CORS errors**: Make sure your domain is added to allowed origins in Supabase settings
4. **Email not sending**: Configure SMTP settings in Supabase Auth settings

### Debug Mode:
Add this to your `.env` for more detailed logs:
```env
VITE_SUPABASE_DEBUG=true
```

## 📚 Next Steps

- Customize email templates in Supabase dashboard
- Set up custom domains for production
- Configure rate limiting and security settings
- Add user roles and permissions
- Set up webhooks for user events

## 🆘 Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

---

🎉 **Congratulations!** Your Supabase authentication is now set up and ready to use!
