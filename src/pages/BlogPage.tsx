import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search,
  Filter,
  Tag,
  TrendingUp,
  BookOpen,
  Eye,
  MessageSquare,
  Share2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI Automation: Trends to Watch in 2025",
      excerpt: "Explore the emerging trends in AI automation that will shape businesses and industries in the coming year.",
      content: "Full article content here...",
      author: "Aditya Mishra",
      date: "2025-01-15",
      readTime: "8 min read",
      category: "AI Trends",
      tags: ["AI", "Automation", "Future Tech", "Business"],
      image: "/api/placeholder/600/300",
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
      readTime: "6 min read",
      category: "Product Updates",
      tags: ["AI Research", "Decision Making", "Business Intelligence"],
      image: "/api/placeholder/600/300",
      views: 890,
      comments: 15,
      featured: false
    },
    {
      id: 3,
      title: "Building Ethical AI: Our Commitment to Responsible Innovation",
      excerpt: "Learn about our approach to developing AI that is fair, transparent, and beneficial for all users.",
      content: "Full article content here...",
      author: "Aditya Mishra",
      date: "2025-01-05",
      readTime: "10 min read",
      category: "Company",
      tags: ["Ethics", "AI Development", "Responsibility"],
      image: "/api/placeholder/600/300",
      views: 2100,
      comments: 45,
      featured: false
    },
    {
      id: 4,
      title: "Case Study: How Enterprise Clients Save 40% Time with AI Planners",
      excerpt: "Real-world examples of how our AI planning tools are transforming enterprise workflows and productivity.",
      content: "Full article content here...",
      author: "Aditya Mishra",
      date: "2024-12-28",
      readTime: "12 min read",
      category: "Case Studies",
      tags: ["Enterprise", "Productivity", "Case Study", "ROI"],
      image: "/api/placeholder/600/300",
      views: 1680,
      comments: 32,
      featured: true
    },
    {
      id: 5,
      title: "Getting Started with Free AI Tools: A Beginner's Guide",
      excerpt: "A comprehensive guide to using our free AI services effectively, perfect for newcomers to AI automation.",
      content: "Full article content here...",
      author: "Aditya Mishra",
      date: "2024-12-20",
      readTime: "5 min read",
      category: "Tutorials",
      tags: ["Beginner", "Free Tools", "Tutorial", "Getting Started"],
      image: "/api/placeholder/600/300",
      views: 3200,
      comments: 67,
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'ai-trends', name: 'AI Trends', count: 1 },
    { id: 'product-updates', name: 'Product Updates', count: 1 },
    { id: 'company', name: 'Company', count: 1 },
    { id: 'case-studies', name: 'Case Studies', count: 1 },
    { id: 'tutorials', name: 'Tutorials', count: 1 }
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 3);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           post.category.toLowerCase().replace(' ', '-') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Automaatte Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Insights, updates, and stories from the world of AI automation. Stay informed about the latest trends and developments.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "gradient" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="whitespace-nowrap"
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all">
              All Posts
            </TabsTrigger>
            <TabsTrigger value="featured">
              Featured
            </TabsTrigger>
            <TabsTrigger value="recent">
              Recent
            </TabsTrigger>
          </TabsList>

          {/* All Posts */}
          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full cursor-pointer group">
                    <div className="aspect-video bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-t-lg mb-4 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-purple-300" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-300 text-sm bg-purple-500/20 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="text-yellow-400 text-sm bg-yellow-500/20 px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-xs text-gray-400 bg-slate-700/50 px-2 py-1 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Featured Posts */}
          <TabsContent value="featured" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                    <div className="aspect-video bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-t-lg mb-4 flex items-center justify-center">
                      <TrendingUp className="w-16 h-16 text-purple-300" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-300 text-sm bg-purple-500/20 px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-yellow-400 text-sm bg-yellow-500/20 px-2 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                      <CardTitle className="text-xl font-bold text-white">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-6">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <Button variant="gradient" className="w-full">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Recent Posts */}
          <TabsContent value="recent" className="space-y-6">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-48 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-8 h-8 text-purple-300" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-purple-300 text-sm bg-purple-500/20 px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span className="text-gray-400 text-sm">•</span>
                          <span className="text-gray-400 text-sm">{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                        <p className="text-gray-300 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>{post.readTime}</span>
                            <span>•</span>
                            <span>{post.views} views</span>
                            <span>•</span>
                            <span>{post.comments} comments</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-purple-300">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter for the latest AI automation insights and updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                />
                <Button variant="gradient">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
