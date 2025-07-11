import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  User, 
  Tag, 
  ArrowRight, 
  Clock, 
  Eye, 
  Heart, 
  MessageCircle, 
  Star, 
  Filter, 
  SortAsc, 
  SortDesc, 
  ThumbsUp, 
  Send, 
  Reply,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Select } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { useAuthContext } from '../contexts/AuthContext';
import { 
  getBlogs, 
  getBlogBySlug, 
  toggleBlogLike, 
  rateBlog, 
  getBlogComments, 
  createComment, 
  toggleCommentLike 
} from '../lib/blogService';
import type { Blog, BlogComment } from '../types/blog';

export const BlogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  
  // State for blog list view
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState<'created_at' | 'views_count' | 'likes_count' | 'average_rating'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // State for single blog view
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (slug) {
      loadSingleBlog(slug);
    } else {
      loadBlogs();
    }
  }, [slug, searchTerm, selectedTag, sortBy, sortOrder]);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      console.log('BlogPage - Loading blogs...');

      // For now, just set empty blogs to stop infinite loading
      setBlogs([]);
      console.log('BlogPage - Blogs loaded (empty for now)');
    } catch (error) {
      console.error('Error loading blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const loadSingleBlog = async (blogSlug: string) => {
    try {
      setLoading(true);
      const blog = await getBlogBySlug(blogSlug);
      if (!blog) {
        navigate('/blog');
        return;
      }
      setCurrentBlog(blog);
      setUserRating(blog.user_rating || 0);
      
      // Load comments
      const blogComments = await getBlogComments(blog.id);
      setComments(blogComments);
    } catch (error) {
      console.error('Error loading blog:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleLikeBlog = async (blogId: string) => {
    if (!isAuthenticated) {
      navigate('/auth/signin');
      return;
    }

    try {
      const isLiked = await toggleBlogLike(blogId);
      if (currentBlog && currentBlog.id === blogId) {
        setCurrentBlog(prev => prev ? {
          ...prev,
          user_liked: isLiked,
          likes_count: isLiked ? prev.likes_count + 1 : prev.likes_count - 1
        } : null);
      } else {
        setBlogs(prev => prev.map(blog => 
          blog.id === blogId 
            ? { 
                ...blog, 
                user_liked: isLiked,
                likes_count: isLiked ? blog.likes_count + 1 : blog.likes_count - 1
              }
            : blog
        ));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleRateBlog = async (rating: number) => {
    if (!isAuthenticated || !currentBlog) {
      navigate('/auth/signin');
      return;
    }

    try {
      await rateBlog(currentBlog.id, rating);
      setUserRating(rating);
      // Reload blog to get updated rating
      loadSingleBlog(currentBlog.slug);
    } catch (error) {
      console.error('Error rating blog:', error);
    }
  };

  const handleSubmitComment = async () => {
    if (!isAuthenticated) {
      navigate('/auth/signin');
      return;
    }

    if (!newComment.trim() || !currentBlog) return;

    try {
      setSubmittingComment(true);
      const comment = await createComment({
        blog_id: currentBlog.id,
        content: newComment.trim(),
        parent_id: replyTo || undefined
      });
      
      if (replyTo) {
        // Add reply to existing comment
        setComments(prev => prev.map(c => 
          c.id === replyTo 
            ? { ...c, replies: [...(c.replies || []), comment] }
            : c
        ));
      } else {
        // Add new top-level comment
        setComments(prev => [comment, ...prev]);
      }
      
      setNewComment('');
      setReplyTo(null);
      
      // Update comment count
      setCurrentBlog(prev => prev ? {
        ...prev,
        comments_count: prev.comments_count + 1
      } : null);
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    if (!isAuthenticated) {
      navigate('/auth/signin');
      return;
    }

    try {
      const isLiked = await toggleCommentLike(commentId);
      setComments(prev => prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            user_liked: isLiked,
            likes_count: isLiked ? comment.likes_count + 1 : comment.likes_count - 1
          };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => 
              reply.id === commentId 
                ? {
                    ...reply,
                    user_liked: isLiked,
                    likes_count: isLiked ? reply.likes_count + 1 : reply.likes_count - 1
                  }
                : reply
            )
          };
        }
        return comment;
      }));
    } catch (error) {
      console.error('Error toggling comment like:', error);
    }
  };

  // Get all unique tags from blogs
  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  // Single blog view
  if (slug && currentBlog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button
              onClick={() => navigate('/blog')}
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </motion.div>

          {/* Blog content will be added in next part... */}
        </div>
      </div>
    );
  }

  // Blog list view
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on AI automation, technology, and the future of work
          </p>
        </motion.div>

        {/* No blogs message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-2xl font-semibold text-white mb-2">No Articles Yet</h3>
          <p className="text-gray-400">
            Check back soon for exciting content about AI automation and technology!
          </p>
        </motion.div>
      </div>
    </div>
  );
};
