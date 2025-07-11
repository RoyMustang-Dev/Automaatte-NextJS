-- =====================================================
-- BLOG SYSTEM DATABASE SETUP
-- Run this in your Supabase SQL Editor
-- =====================================================

-- 1. Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  featured_image_alt TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  tags TEXT[] DEFAULT '{}',
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  ratings_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create blog_likes table
CREATE TABLE IF NOT EXISTS blog_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(blog_id, user_id)
);

-- 3. Create blog_ratings table
CREATE TABLE IF NOT EXISTS blog_ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(blog_id, user_id)
);

-- 4. Create blog_comments table
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create comment_likes table
CREATE TABLE IF NOT EXISTS comment_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

-- 6. Create blog_views table (for tracking unique views)
CREATE TABLE IF NOT EXISTS blog_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(blog_id, user_id, DATE(created_at))
);

-- 7. Enable RLS on all tables
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;

-- 8. Create RLS policies for blogs
CREATE POLICY "Anyone can view published blogs" ON blogs
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin can manage all blogs" ON blogs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- 9. Create RLS policies for blog_likes
CREATE POLICY "Anyone can view blog likes" ON blog_likes
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage their own likes" ON blog_likes
  FOR ALL USING (auth.uid() = user_id);

-- 10. Create RLS policies for blog_ratings
CREATE POLICY "Anyone can view blog ratings" ON blog_ratings
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage their own ratings" ON blog_ratings
  FOR ALL USING (auth.uid() = user_id);

-- 11. Create RLS policies for blog_comments
CREATE POLICY "Anyone can view comments" ON blog_comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" ON blog_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" ON blog_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage all comments" ON blog_comments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- 12. Create RLS policies for comment_likes
CREATE POLICY "Anyone can view comment likes" ON comment_likes
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage their own comment likes" ON comment_likes
  FOR ALL USING (auth.uid() = user_id);

-- 13. Create RLS policies for blog_views
CREATE POLICY "Admin can view all blog views" ON blog_views
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

CREATE POLICY "Anyone can insert blog views" ON blog_views
  FOR INSERT WITH CHECK (true);

-- 14. Create functions to update counters
CREATE OR REPLACE FUNCTION update_blog_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE blogs SET likes_count = likes_count + 1 WHERE id = NEW.blog_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE blogs SET likes_count = likes_count - 1 WHERE id = OLD.blog_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_blog_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE blogs SET comments_count = comments_count + 1 WHERE id = NEW.blog_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE blogs SET comments_count = comments_count - 1 WHERE id = OLD.blog_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_blog_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE blogs SET 
    average_rating = (
      SELECT AVG(rating)::DECIMAL(3,2) 
      FROM blog_ratings 
      WHERE blog_id = COALESCE(NEW.blog_id, OLD.blog_id)
    ),
    ratings_count = (
      SELECT COUNT(*) 
      FROM blog_ratings 
      WHERE blog_id = COALESCE(NEW.blog_id, OLD.blog_id)
    )
  WHERE id = COALESCE(NEW.blog_id, OLD.blog_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_comment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE blog_comments SET likes_count = likes_count + 1 WHERE id = NEW.comment_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE blog_comments SET likes_count = likes_count - 1 WHERE id = OLD.comment_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- 15. Create triggers
CREATE TRIGGER blog_likes_count_trigger
  AFTER INSERT OR DELETE ON blog_likes
  FOR EACH ROW EXECUTE FUNCTION update_blog_likes_count();

CREATE TRIGGER blog_comments_count_trigger
  AFTER INSERT OR DELETE ON blog_comments
  FOR EACH ROW EXECUTE FUNCTION update_blog_comments_count();

CREATE TRIGGER blog_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON blog_ratings
  FOR EACH ROW EXECUTE FUNCTION update_blog_rating();

CREATE TRIGGER comment_likes_count_trigger
  AFTER INSERT OR DELETE ON comment_likes
  FOR EACH ROW EXECUTE FUNCTION update_comment_likes_count();

-- 16. Create updated_at triggers
CREATE TRIGGER blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER blog_ratings_updated_at
  BEFORE UPDATE ON blog_ratings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER blog_comments_updated_at
  BEFORE UPDATE ON blog_comments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 17. Create indexes for performance
CREATE INDEX IF NOT EXISTS blogs_status_idx ON blogs(status);
CREATE INDEX IF NOT EXISTS blogs_author_idx ON blogs(author_id);
CREATE INDEX IF NOT EXISTS blogs_published_at_idx ON blogs(published_at);
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs(slug);
CREATE INDEX IF NOT EXISTS blog_likes_blog_idx ON blog_likes(blog_id);
CREATE INDEX IF NOT EXISTS blog_likes_user_idx ON blog_likes(user_id);
CREATE INDEX IF NOT EXISTS blog_ratings_blog_idx ON blog_ratings(blog_id);
CREATE INDEX IF NOT EXISTS blog_comments_blog_idx ON blog_comments(blog_id);
CREATE INDEX IF NOT EXISTS blog_comments_parent_idx ON blog_comments(parent_id);

-- 18. Grant permissions
GRANT ALL ON blogs TO authenticated;
GRANT ALL ON blog_likes TO authenticated;
GRANT ALL ON blog_ratings TO authenticated;
GRANT ALL ON blog_comments TO authenticated;
GRANT ALL ON comment_likes TO authenticated;
GRANT ALL ON blog_views TO authenticated;

-- =====================================================
-- BLOG DATABASE SETUP COMPLETE!
-- =====================================================
