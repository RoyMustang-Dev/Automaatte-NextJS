import { supabase } from './supabase';
import type { 
  Blog, 
  BlogComment, 
  CreateBlogData, 
  UpdateBlogData, 
  CreateCommentData, 
  BlogFilters 
} from '../types/blog';

// Blog CRUD operations
export const createBlog = async (blogData: CreateBlogData): Promise<Blog> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // Generate slug from title
  const slug = blogData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const { data, error } = await supabase
    .from('blogs')
    .insert({
      ...blogData,
      slug,
      author_id: user.id,
      published_at: blogData.status === 'published' ? new Date().toISOString() : null
    })
    .select(`
      *,
      author:profiles(id, name, email, avatar_url)
    `)
    .single();

  if (error) throw error;
  return data;
};

export const updateBlog = async (blogData: UpdateBlogData): Promise<Blog> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const updateData: any = { ...blogData };
  delete updateData.id;

  // Update slug if title changed
  if (blogData.title) {
    updateData.slug = blogData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Set published_at if status changed to published
  if (blogData.status === 'published') {
    updateData.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('blogs')
    .update(updateData)
    .eq('id', blogData.id)
    .select(`
      *,
      author:profiles(id, name, email, avatar_url)
    `)
    .single();

  if (error) throw error;
  return data;
};

export const deleteBlog = async (blogId: string): Promise<void> => {
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', blogId);

  if (error) throw error;
};

export const getBlogs = async (filters: BlogFilters = {}): Promise<Blog[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  let query = supabase
    .from('blogs')
    .select(`
      *,
      author:profiles(id, name, email, avatar_url)
    `);

  // Apply filters
  if (filters.status) {
    query = query.eq('status', filters.status);
  } else {
    // Default to published for non-admin users
    query = query.eq('status', 'published');
  }

  if (filters.author_id) {
    query = query.eq('author_id', filters.author_id);
  }

  if (filters.tags && filters.tags.length > 0) {
    query = query.overlaps('tags', filters.tags);
  }

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
  }

  // Sorting
  const sortBy = filters.sort_by || 'created_at';
  const sortOrder = filters.sort_order || 'desc';
  query = query.order(sortBy, { ascending: sortOrder === 'asc' });

  // Pagination
  if (filters.limit) {
    query = query.limit(filters.limit);
  }
  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;
  if (error) throw error;

  // Add user interaction data if user is authenticated
  if (user && data) {
    const blogIds = data.map(blog => blog.id);
    
    // Get user likes
    const { data: likes } = await supabase
      .from('blog_likes')
      .select('blog_id')
      .eq('user_id', user.id)
      .in('blog_id', blogIds);

    // Get user ratings
    const { data: ratings } = await supabase
      .from('blog_ratings')
      .select('blog_id, rating')
      .eq('user_id', user.id)
      .in('blog_id', blogIds);

    const likedBlogs = new Set(likes?.map(like => like.blog_id) || []);
    const userRatings = new Map(ratings?.map(rating => [rating.blog_id, rating.rating]) || []);

    return data.map(blog => ({
      ...blog,
      user_liked: likedBlogs.has(blog.id),
      user_rating: userRatings.get(blog.id)
    }));
  }

  return data || [];
};

export const getBlogBySlug = async (slug: string): Promise<Blog | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('blogs')
    .select(`
      *,
      author:profiles(id, name, email, avatar_url)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  // Record view
  if (data) {
    await recordBlogView(data.id);
  }

  // Add user interaction data if user is authenticated
  if (user && data) {
    const [{ data: like }, { data: rating }] = await Promise.all([
      supabase
        .from('blog_likes')
        .select('id')
        .eq('blog_id', data.id)
        .eq('user_id', user.id)
        .single(),
      supabase
        .from('blog_ratings')
        .select('rating')
        .eq('blog_id', data.id)
        .eq('user_id', user.id)
        .single()
    ]);

    return {
      ...data,
      user_liked: !!like,
      user_rating: rating?.rating
    };
  }

  return data;
};

// Blog interactions
export const toggleBlogLike = async (blogId: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data: existingLike } = await supabase
    .from('blog_likes')
    .select('id')
    .eq('blog_id', blogId)
    .eq('user_id', user.id)
    .single();

  if (existingLike) {
    // Unlike
    const { error } = await supabase
      .from('blog_likes')
      .delete()
      .eq('id', existingLike.id);
    if (error) throw error;
    return false;
  } else {
    // Like
    const { error } = await supabase
      .from('blog_likes')
      .insert({ blog_id: blogId, user_id: user.id });
    if (error) throw error;
    return true;
  }
};

export const rateBlog = async (blogId: string, rating: number): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  const { error } = await supabase
    .from('blog_ratings')
    .upsert({
      blog_id: blogId,
      user_id: user.id,
      rating
    });

  if (error) throw error;
};

export const recordBlogView = async (blogId: string): Promise<void> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { error } = await supabase
    .from('blog_views')
    .insert({
      blog_id: blogId,
      user_id: user?.id || null
    });

  // Ignore duplicate view errors
  if (error && !error.message.includes('duplicate')) {
    throw error;
  }
};

// Comments
export const getBlogComments = async (blogId: string): Promise<BlogComment[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('blog_comments')
    .select(`
      *,
      user:profiles(id, name, email, avatar_url)
    `)
    .eq('blog_id', blogId)
    .is('parent_id', null)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Get replies for each comment
  const commentsWithReplies = await Promise.all(
    (data || []).map(async (comment) => {
      const { data: replies } = await supabase
        .from('blog_comments')
        .select(`
          *,
          user:profiles(id, name, email, avatar_url)
        `)
        .eq('parent_id', comment.id)
        .order('created_at', { ascending: true });

      // Add user like status if authenticated
      let user_liked = false;
      if (user) {
        const { data: like } = await supabase
          .from('comment_likes')
          .select('id')
          .eq('comment_id', comment.id)
          .eq('user_id', user.id)
          .single();
        user_liked = !!like;
      }

      return {
        ...comment,
        user_liked,
        replies: replies || []
      };
    })
  );

  return commentsWithReplies;
};

export const createComment = async (commentData: CreateCommentData): Promise<BlogComment> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('blog_comments')
    .insert({
      ...commentData,
      user_id: user.id
    })
    .select(`
      *,
      user:profiles(id, name, email, avatar_url)
    `)
    .single();

  if (error) throw error;
  return data;
};

export const toggleCommentLike = async (commentId: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data: existingLike } = await supabase
    .from('comment_likes')
    .select('id')
    .eq('comment_id', commentId)
    .eq('user_id', user.id)
    .single();

  if (existingLike) {
    // Unlike
    const { error } = await supabase
      .from('comment_likes')
      .delete()
      .eq('id', existingLike.id);
    if (error) throw error;
    return false;
  } else {
    // Like
    const { error } = await supabase
      .from('comment_likes')
      .insert({ comment_id: commentId, user_id: user.id });
    if (error) throw error;
    return true;
  }
};

// Image upload
export const uploadBlogImage = async (file: File): Promise<string> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}/${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(fileName, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(data.path);

  return publicUrl;
};
