export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  views_count: number;
  likes_count: number;
  comments_count: number;
  average_rating: number;
  ratings_count: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
  };
  user_liked?: boolean;
  user_rating?: number;
}

export interface BlogComment {
  id: string;
  blog_id: string;
  user_id: string;
  parent_id?: string;
  content: string;
  likes_count: number;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
  };
  user_liked?: boolean;
  replies?: BlogComment[];
}

export interface BlogLike {
  id: string;
  blog_id: string;
  user_id: string;
  created_at: string;
}

export interface BlogRating {
  id: string;
  blog_id: string;
  user_id: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface CommentLike {
  id: string;
  comment_id: string;
  user_id: string;
  created_at: string;
}

export interface BlogView {
  id: string;
  blog_id: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface CreateBlogData {
  title: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  featured_image_alt?: string;
  tags: string[];
  status: 'draft' | 'published';
}

export interface UpdateBlogData extends Partial<CreateBlogData> {
  id: string;
}

export interface CreateCommentData {
  blog_id: string;
  content: string;
  parent_id?: string;
}

export interface BlogFilters {
  status?: 'draft' | 'published' | 'archived';
  author_id?: string;
  tags?: string[];
  search?: string;
  sort_by?: 'created_at' | 'updated_at' | 'published_at' | 'views_count' | 'likes_count' | 'average_rating';
  sort_order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}
