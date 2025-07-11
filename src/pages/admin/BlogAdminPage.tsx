import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
  Settings,
  Upload,
  Image,
  Code,
  Bold,
  Italic,
  Link,
  List,
  AlignLeft,
  Type
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  views: number;
  comments: number;
  featured: boolean;
  featuredImage?: string;
  images?: string[];
}

export const BlogAdminPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "The Future of AI Automation: Trends to Watch in 2025",
      excerpt: "Explore the emerging trends in AI automation that will shape businesses and industries in the coming year.",
      content: "Full article content here...",
      author: "Aditya Mishra",
      date: "2025-01-15",
      category: "AI Trends",
      tags: ["AI", "Automation", "Future Tech", "Business"],
      status: "published",
      views: 1250,
      comments: 23,
      featured: true
    },
    {
      id: 2,
      title: "How AI Researchers Are Revolutionizing Decision Making",
      excerpt: "Discover how our AI research tools are helping businesses make better, data-driven decisions faster than ever before.",
      content: "Full article content here...",
      author: "Aditya Mishra",
      date: "2025-01-10",
      category: "Product Updates",
      tags: ["AI Research", "Decision Making", "Business Intelligence"],
      status: "published",
      views: 890,
      comments: 15,
      featured: false
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featured: false,
    featuredImage: '',
    images: [] as string[]
  });
  const [showPreview, setShowPreview] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'AI Trends',
    'Product Updates',
    'Company',
    'Case Studies',
    'Tutorials',
    'Industry News'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setUploadedImages(prev => [...prev, imageUrl]);
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, imageUrl]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const insertImageUrl = (url: string) => {
    const imageMarkdown = `![Image](${url})`;
    setFormData(prev => ({
      ...prev,
      content: prev.content + '\n\n' + imageMarkdown
    }));
  };

  const insertLatex = (latex: string) => {
    const latexMarkdown = `$$${latex}$$`;
    setFormData(prev => ({
      ...prev,
      content: prev.content + '\n\n' + latexMarkdown
    }));
  };

  const insertCodeBlock = (language: string = '') => {
    const codeBlock = `\`\`\`${language}\n// Your code here\n\`\`\``;
    setFormData(prev => ({
      ...prev,
      content: prev.content + '\n\n' + codeBlock
    }));
  };

  const formatText = (format: string) => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      case 'list':
        formattedText = `- ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', '),
      featured: post.featured,
      featuredImage: post.featuredImage || '',
      images: post.images || []
    });
    setUploadedImages(post.images || []);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingPost) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? {
              ...post,
              title: formData.title,
              excerpt: formData.excerpt,
              content: formData.content,
              category: formData.category,
              tags: formData.tags.split(',').map(tag => tag.trim()),
              featured: formData.featured
            }
          : post
      ));
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Math.max(...posts.map(p => p.id)) + 1,
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: "Aditya Mishra",
        date: new Date().toISOString().split('T')[0],
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        status: 'draft',
        views: 0,
        comments: 0,
        featured: formData.featured
      };
      setPosts([newPost, ...posts]);
    }
    
    setIsEditing(false);
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      featured: false
    });
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const handlePublish = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: 'published' as const } : post
    ));
  };

  const handleUnpublish = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: 'draft' as const } : post
    ));
  };

  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.status === 'published').length,
    draftPosts: posts.filter(p => p.status === 'draft').length,
    totalViews: posts.reduce((sum, post) => sum + post.views, 0),
    totalComments: posts.reduce((sum, post) => sum + post.comments, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Blog Administration</h1>
            <p className="text-gray-300">Manage your blog content and analytics</p>
          </div>
          <Button 
            variant="gradient" 
            onClick={() => setIsEditing(true)}
            className="group"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </motion.div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="posts">
              Posts
            </TabsTrigger>
            <TabsTrigger value="analytics">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="categories">
              Categories
            </TabsTrigger>
            <TabsTrigger value="settings">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Posts Management */}
          <TabsContent value="posts" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              {[
                { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'text-blue-400' },
                { label: 'Published', value: stats.publishedPosts, icon: Eye, color: 'text-green-400' },
                { label: 'Drafts', value: stats.draftPosts, icon: Edit, color: 'text-yellow-400' },
                { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: BarChart3, color: 'text-purple-400' },
                { label: 'Comments', value: stats.totalComments, icon: User, color: 'text-pink-400' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                    <CardContent className="p-4 text-center">
                      <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              post.status === 'published' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {post.status}
                            </span>
                            {post.featured && (
                              <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">
                                Featured
                              </span>
                            )}
                            <span className="text-gray-400 text-sm">{post.category}</span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.views} views</span>
                            <span>•</span>
                            <span>{post.comments} comments</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          {post.status === 'draft' ? (
                            <Button
                              variant="ai"
                              size="sm"
                              onClick={() => handlePublish(post.id)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Publish
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUnpublish(post.id)}
                            >
                              Unpublish
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Popular Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {posts
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 5)
                      .map((post, index) => (
                        <div key={post.id} className="flex justify-between items-center">
                          <div>
                            <h4 className="text-white font-medium text-sm">{post.title}</h4>
                            <p className="text-gray-400 text-xs">{post.category}</p>
                          </div>
                          <span className="text-purple-300 font-semibold">{post.views}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white">Category Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category) => {
                      const count = posts.filter(p => p.category === category).length;
                      const percentage = posts.length > 0 ? (count / posts.length) * 100 : 0;
                      return (
                        <div key={category}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300">{category}</span>
                            <span className="text-white">{count}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Categories */}
          <TabsContent value="categories" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Manage Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => {
                    const count = posts.filter(p => p.category === category).length;
                    return (
                      <div key={category} className="p-4 bg-slate-800/30 rounded-lg">
                        <h3 className="text-white font-medium">{category}</h3>
                        <p className="text-gray-400 text-sm">{count} posts</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Blog Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-white font-medium mb-2 block">Blog Title</label>
                    <Input 
                      defaultValue="Automaatte Blog" 
                      className="bg-slate-700/50 border-purple-500/30 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white font-medium mb-2 block">Blog Description</label>
                    <Textarea 
                      defaultValue="Insights, updates, and stories from the world of AI automation."
                      className="bg-slate-700/50 border-purple-500/30 text-white"
                    />
                  </div>
                  <Button variant="gradient">
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit/Create Post Modal */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-800 rounded-2xl border border-purple-500/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-white font-medium mb-2 block">Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter post title"
                      className="bg-slate-700/50 border-purple-500/30 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">Excerpt</label>
                    <Textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                      placeholder="Enter post excerpt"
                      className="bg-slate-700/50 border-purple-500/30 text-white"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">Content</label>

                    {/* Rich Text Toolbar */}
                    <div className="mb-4 p-3 bg-slate-800/50 rounded-lg border border-purple-500/20">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => formatText('bold')}
                          className="text-gray-300 hover:text-white"
                        >
                          <Bold className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => formatText('italic')}
                          className="text-gray-300 hover:text-white"
                        >
                          <Italic className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => formatText('link')}
                          className="text-gray-300 hover:text-white"
                        >
                          <Link className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => formatText('list')}
                          className="text-gray-300 hover:text-white"
                        >
                          <List className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertCodeBlock('javascript')}
                          className="text-gray-300 hover:text-white"
                        >
                          <Code className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertLatex('E = mc^2')}
                          className="text-gray-300 hover:text-white"
                        >
                          <Type className="w-4 h-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-gray-300 hover:text-white"
                        >
                          <Image className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPreview(!showPreview)}
                          className="text-purple-300 hover:text-white"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {showPreview ? 'Edit' : 'Preview'}
                        </Button>
                      </div>
                    </div>

                    {/* Hidden File Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    {/* Content Editor/Preview */}
                    {showPreview ? (
                      <div className="bg-slate-700/50 border border-purple-500/30 rounded-lg p-4 min-h-[300px] text-white">
                        <div className="prose prose-invert max-w-none">
                          <div dangerouslySetInnerHTML={{
                            __html: formData.content
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em>$1</em>')
                              .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
                              .replace(/\$\$(.*?)\$\$/g, '<span class="latex">$1</span>')
                              .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg" />')
                              .replace(/\n/g, '<br>')
                          }} />
                        </div>
                      </div>
                    ) : (
                      <Textarea
                        name="content"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        placeholder="Enter post content (supports Markdown, LaTeX with $$formula$$, and HTML)"
                        className="bg-slate-700/50 border-purple-500/30 text-white font-mono"
                        rows={15}
                      />
                    )}

                    {/* Uploaded Images */}
                    {uploadedImages.length > 0 && (
                      <div className="mt-4">
                        <label className="text-white font-medium mb-2 block">Uploaded Images</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-20 object-cover rounded-lg border border-purple-500/20"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => insertImageUrl(image)}
                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs"
                              >
                                Insert
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white font-medium mb-2 block">Category</label>
                      <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-purple-500/30">
                          {categories.map((category) => (
                            <SelectItem key={category} value={category} className="text-white">
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-white font-medium mb-2 block">Tags (comma separated)</label>
                      <Input
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        placeholder="AI, Automation, Technology"
                        className="bg-slate-700/50 border-purple-500/30 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="rounded border-purple-500/30"
                    />
                    <label htmlFor="featured" className="text-white">Featured Post</label>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      variant="ghost"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="gradient"
                      onClick={handleSave}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingPost ? 'Update Post' : 'Create Post'}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
