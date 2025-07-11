import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Calendar,
  User,
  Tag,
  FileText,
  BarChart3,
  Upload,
  Image,
  Bold,
  Italic,
  List,
  Link,
  Quote,
  Hash,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  MoreVertical,
  Heart,
  MessageCircle,
  Star,
  TrendingUp,
  Users,
  Clock,
  Globe,
  Lock,
  Archive,
  BookOpen,
  PenTool,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card } from '../../components/ui/card';
import { Select } from '../../components/ui/select';
import { useAuthContext } from '../../contexts/AuthContext';
import { 
  getBlogs, 
  createBlog, 
  updateBlog, 
  deleteBlog, 
  uploadBlogImage 
} from '../../lib/blogService';
import type { Blog, CreateBlogData, UpdateBlogData } from '../../types/blog';

export const BlogAdminPage: React.FC = () => {
  const { user } = useAuthContext();

  // Check if user is admin
  if (!user || user.email !== 'adityamishra0996@gmail.com') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-4">You don't have permission to access this page.</p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [sortBy, setSortBy] = useState<'created_at' | 'updated_at' | 'views_count' | 'likes_count'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState<CreateBlogData>({
    title: '',
    content: '',
    excerpt: '',
    featured_image_url: '',
    featured_image_alt: '',
    tags: [],
    status: 'draft'
  });
  const [tagInput, setTagInput] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadBlogs();
  }, [statusFilter, sortBy, sortOrder, searchTerm]);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const filters = {
        status: statusFilter === 'all' ? undefined : statusFilter as any,
        search: searchTerm || undefined,
        sort_by: sortBy,
        sort_order: sortOrder
      };
      const data = await getBlogs(filters);
      setBlogs(data);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = () => {
    setIsCreating(true);
    setIsEditing(false);
    setSelectedBlog(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      featured_image_url: '',
      featured_image_alt: '',
      tags: [],
      status: 'draft'
    });
    setTagInput('');
  };

  const handleEditBlog = (blog: Blog) => {
    setIsEditing(true);
    setIsCreating(false);
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || '',
      featured_image_url: blog.featured_image_url || '',
      featured_image_alt: blog.featured_image_alt || '',
      tags: blog.tags,
      status: blog.status
    });
    setTagInput('');
  };

  const handleSaveBlog = async () => {
    try {
      if (isCreating) {
        const newBlog = await createBlog(formData);
        setBlogs(prev => [newBlog, ...prev]);
      } else if (selectedBlog) {
        const updatedBlog = await updateBlog({ id: selectedBlog.id, ...formData });
        setBlogs(prev => prev.map(blog => blog.id === selectedBlog.id ? updatedBlog : blog));
      }
      
      setIsCreating(false);
      setIsEditing(false);
      setSelectedBlog(null);
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    try {
      await deleteBlog(blogId);
      setBlogs(prev => prev.filter(blog => blog.id !== blogId));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await uploadBlogImage(file);
      setFormData(prev => ({ ...prev, featured_image_url: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Blog Administration</h1>
              <p className="text-gray-300">Manage your blog posts, analytics, and content</p>
            </div>
            <Button
              onClick={handleCreateBlog}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Blog Post
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Posts</p>
                  <p className="text-2xl font-bold text-white">{blogs.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Published</p>
                  <p className="text-2xl font-bold text-white">
                    {blogs.filter(blog => blog.status === 'published').length}
                  </p>
                </div>
                <Globe className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Drafts</p>
                  <p className="text-2xl font-bold text-white">
                    {blogs.filter(blog => blog.status === 'draft').length}
                  </p>
                </div>
                <PenTool className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Views</p>
                  <p className="text-2xl font-bold text-white">
                    {blogs.reduce((sum, blog) => sum + blog.views_count, 0)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search blogs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </Select>

                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <option value="created_at">Created Date</option>
                    <option value="updated_at">Updated Date</option>
                    <option value="views_count">Views</option>
                    <option value="likes_count">Likes</option>
                  </Select>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="border-slate-600 text-white hover:bg-slate-700"
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadBlogs}
                    className="border-slate-600 text-white hover:bg-slate-700"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Blog List or Editor */}
        {(isCreating || isEditing) ? (
          <BlogEditor
            formData={formData}
            setFormData={setFormData}
            tagInput={tagInput}
            setTagInput={setTagInput}
            uploading={uploading}
            fileInputRef={fileInputRef}
            onSave={handleSaveBlog}
            onCancel={() => {
              setIsCreating(false);
              setIsEditing(false);
              setSelectedBlog(null);
            }}
            onImageUpload={handleImageUpload}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            isCreating={isCreating}
          />
        ) : (
          <BlogList
            blogs={filteredBlogs}
            loading={loading}
            onEdit={handleEditBlog}
            onDelete={(blogId: string) => setShowDeleteConfirm(blogId)}
            showDeleteConfirm={showDeleteConfirm}
            onConfirmDelete={handleDeleteBlog}
            onCancelDelete={() => setShowDeleteConfirm(null)}
          />
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

// Blog Editor Component
interface BlogEditorProps {
  formData: CreateBlogData;
  setFormData: React.Dispatch<React.SetStateAction<CreateBlogData>>;
  tagInput: string;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
  uploading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onSave: () => void;
  onCancel: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  isCreating: boolean;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  formData,
  setFormData,
  tagInput,
  setTagInput,
  uploading,
  fileInputRef,
  onSave,
  onCancel,
  onImageUpload,
  onAddTag,
  onRemoveTag,
  isCreating
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {isCreating ? 'Create New Blog Post' : 'Edit Blog Post'}
            </h2>
            <div className="flex gap-2">
              <Button
                onClick={onSave}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={onCancel}
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-700"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter blog title..."
                className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt
              </label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of the blog post..."
                rows={3}
                className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Featured Image
              </label>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    value={formData.featured_image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured_image_url: e.target.value }))}
                    placeholder="Image URL or upload an image..."
                    className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    variant="outline"
                    className="border-slate-600 text-white hover:bg-slate-700"
                  >
                    {uploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {formData.featured_image_url && (
                  <div className="relative">
                    <img
                      src={formData.featured_image_url}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      onClick={() => setFormData(prev => ({ ...prev, featured_image_url: '' }))}
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 bg-red-500/80 border-red-400 text-white hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <Input
                  value={formData.featured_image_alt}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured_image_alt: e.target.value }))}
                  placeholder="Alt text for the image..."
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddTag())}
                    placeholder="Add a tag..."
                    className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                  />
                  <Button
                    onClick={onAddTag}
                    variant="outline"
                    className="border-slate-600 text-white hover:bg-slate-700"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          onClick={() => onRemoveTag(tag)}
                          className="hover:text-purple-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content * (Supports Markdown, LaTeX, and HTML)
              </label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write your blog content here... Supports Markdown, LaTeX ($$formula$$), and HTML code blocks."
                rows={20}
                className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 font-mono"
              />
              <p className="text-xs text-gray-400 mt-1">
                Use $$LaTeX$$ for math, ```code``` for code blocks, and standard Markdown syntax
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <Select
                value={formData.status}
                onValueChange={(value: 'draft' | 'published') =>
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </Select>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Blog List Component
interface BlogListProps {
  blogs: Blog[];
  loading: boolean;
  onEdit: (blog: Blog) => void;
  onDelete: (blogId: string) => void;
  showDeleteConfirm: string | null;
  onConfirmDelete: (blogId: string) => void;
  onCancelDelete: () => void;
}

const BlogList: React.FC<BlogListProps> = ({
  blogs,
  loading,
  onEdit,
  onDelete,
  showDeleteConfirm,
  onConfirmDelete,
  onCancelDelete
}) => {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-12"
      >
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </motion.div>
    );
  }

  if (blogs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
          <div className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No blog posts found</h3>
            <p className="text-gray-400">Create your first blog post to get started.</p>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-white">{blog.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      blog.status === 'published'
                        ? 'bg-green-500/20 text-green-300'
                        : blog.status === 'draft'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-gray-500/20 text-gray-300'
                    }`}>
                      {blog.status}
                    </span>
                  </div>

                  {blog.excerpt && (
                    <p className="text-gray-300 mb-4 line-clamp-2">{blog.excerpt}</p>
                  )}

                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {blog.views_count} views
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {blog.likes_count} likes
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {blog.comments_count} comments
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {blog.average_rating.toFixed(1)} ({blog.ratings_count})
                    </div>
                  </div>

                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {blog.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {blog.status === 'published' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                      className="border-slate-600 text-white hover:bg-slate-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(blog)}
                    className="border-slate-600 text-white hover:bg-slate-700"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(blog.id)}
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-red-500/20 rounded-2xl p-6 max-w-md mx-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-semibold text-white">Delete Blog Post</h3>
              </div>

              <p className="text-gray-300 mb-6">
                Are you sure you want to delete this blog post? This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <Button
                  onClick={() => onConfirmDelete(showDeleteConfirm)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </Button>
                <Button
                  onClick={onCancelDelete}
                  variant="outline"
                  className="flex-1 border-slate-600 text-white hover:bg-slate-700"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
