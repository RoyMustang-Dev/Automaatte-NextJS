import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Book, 
  MessageSquare, 
  Video, 
  FileText, 
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Play,
  Download,
  Star,
  Clock,
  Users,
  Zap,
  Shield,
  Code,
  Settings
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export const SupportPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const supportCategories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using Automaatte's AI services",
      articles: 12,
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "AI Services",
      description: "Detailed guides for our AI Researchers and Planners",
      articles: 8,
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Settings,
      title: "Account Management",
      description: "Manage your account, billing, and subscription",
      articles: 6,
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Code,
      title: "API Documentation",
      description: "Technical documentation for developers",
      articles: 15,
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Information about data security and privacy",
      articles: 4,
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Enterprise",
      description: "Enterprise features and administration",
      articles: 7,
      color: "from-pink-500 to-rose-500"
    }
  ];

  const popularArticles = [
    {
      title: "How to Get Started with Free AI Services",
      category: "Getting Started",
      readTime: "5 min read",
      views: 2500,
      rating: 4.8
    },
    {
      title: "Understanding AI Researchers vs AI Planners",
      category: "AI Services",
      readTime: "8 min read",
      views: 1800,
      rating: 4.9
    },
    {
      title: "Setting Up Your First Automation Workflow",
      category: "AI Services",
      readTime: "12 min read",
      views: 1600,
      rating: 4.7
    },
    {
      title: "Upgrading to Premium: What You Need to Know",
      category: "Account Management",
      readTime: "6 min read",
      views: 1200,
      rating: 4.6
    },
    {
      title: "API Authentication and Rate Limits",
      category: "API Documentation",
      readTime: "10 min read",
      views: 950,
      rating: 4.8
    },
    {
      title: "Troubleshooting Common AI Research Issues",
      category: "Troubleshooting",
      readTime: "7 min read",
      views: 1400,
      rating: 4.5
    },
    {
      title: "Best Practices for AI Planning Workflows",
      category: "AI Services",
      readTime: "15 min read",
      views: 1100,
      rating: 4.9
    },
    {
      title: "Data Privacy and Security Guidelines",
      category: "Security",
      readTime: "9 min read",
      views: 800,
      rating: 4.7
    },
    {
      title: "Integrating Automaatte with Third-Party Tools",
      category: "Integrations",
      readTime: "12 min read",
      views: 650,
      rating: 4.6
    },
    {
      title: "Understanding Usage Limits and Billing",
      category: "Account Management",
      readTime: "6 min read",
      views: 1300,
      rating: 4.4
    },
    {
      title: "Custom AI Solutions for Enterprise",
      category: "Enterprise",
      readTime: "11 min read",
      views: 450,
      rating: 4.8
    }
  ];

  const videoTutorials = [
    {
      title: "Automaatte Platform Overview",
      duration: "8:32",
      thumbnail: "/api/placeholder/300/200",
      views: 5200,
      category: "Getting Started"
    },
    {
      title: "Creating Your First AI Research Project",
      duration: "12:45",
      thumbnail: "/api/placeholder/300/200",
      views: 3800,
      category: "AI Services"
    },
    {
      title: "Advanced Planning Workflows",
      duration: "15:20",
      thumbnail: "/api/placeholder/300/200",
      views: 2100,
      category: "AI Services"
    },
    {
      title: "Enterprise Setup and Management",
      duration: "18:15",
      thumbnail: "/api/placeholder/300/200",
      views: 1500,
      category: "Enterprise"
    },
    {
      title: "API Integration Tutorial",
      duration: "12:45",
      thumbnail: "/api/placeholder/300/200",
      views: 720,
      category: "API"
    },
    {
      title: "Troubleshooting Common Issues",
      duration: "9:30",
      thumbnail: "/api/placeholder/300/200",
      views: 1100,
      category: "Support"
    },
    {
      title: "Data Security Best Practices",
      duration: "11:20",
      thumbnail: "/api/placeholder/300/200",
      views: 680,
      category: "Security"
    },
    {
      title: "Custom Workflow Creation",
      duration: "14:10",
      thumbnail: "/api/placeholder/300/200",
      views: 950,
      category: "Advanced"
    }
  ];

  const faqs = [
    {
      question: "What are the differences between Free, Paid, and Enterprise plans?",
      answer: "Free users get access to 4 basic AI tools with daily limits. Paid users get unlimited access to all tools plus AI Researchers and Planners. Enterprise users get custom solutions, dedicated support, and advanced features.",
      category: "Pricing"
    },
    {
      question: "How do AI Researchers and AI Planners work together?",
      answer: "AI Researchers gather and analyze information on topics like vacation planning or investment research. The output can then be fed into AI Planners, which create actionable plans and strategies based on the research data.",
      category: "AI Services"
    },
    {
      question: "Is my data secure with Automaatte?",
      answer: "Yes, we use enterprise-grade security measures including encryption, secure data centers, and compliance with international privacy standards. Your data is never shared with third parties.",
      category: "Security"
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access to paid features until the end of your billing period.",
      category: "Billing"
    },
    {
      question: "Do you offer API access?",
      answer: "Yes, we provide API access for Paid and Enterprise users. Our RESTful API allows you to integrate Automaatte's AI capabilities into your own applications.",
      category: "Technical"
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer email support for all users, priority support for paid users, and dedicated account management for enterprise clients. We also have comprehensive documentation and video tutorials.",
      category: "Support"
    },
    {
      question: "How accurate are the AI-generated results?",
      answer: "Our AI models are continuously trained and updated to provide high-quality results. While we strive for accuracy, we recommend reviewing and validating AI-generated content for critical decisions.",
      category: "AI Services"
    },
    {
      question: "Can I use Automaatte for commercial purposes?",
      answer: "Yes, both Paid and Enterprise plans allow commercial use. Please review our Terms of Service for specific usage guidelines and restrictions.",
      category: "Legal"
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredArticles = popularArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVideos = videoTutorials.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = supportCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Help Center
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find answers, learn how to use our AI services, and get the most out of Automaatte.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for help articles, guides, or FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400 text-lg"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="categories">
              <span className="hidden sm:inline">Categories</span>
              <span className="sm:hidden">Cats</span>
            </TabsTrigger>
            <TabsTrigger value="popular">
              <span className="hidden sm:inline">Articles</span>
              <span className="sm:hidden">Arts</span>
            </TabsTrigger>
            <TabsTrigger value="videos">
              <span className="hidden sm:inline">Videos</span>
              <span className="sm:hidden">Vids</span>
            </TabsTrigger>
            <TabsTrigger value="faq">
              FAQ
            </TabsTrigger>
          </TabsList>

          {/* Categories */}
          <TabsContent value="categories" className="space-y-8">
            {searchTerm && (
              <div className="mb-6">
                <p className="text-gray-300">
                  {filteredCategories.length} categories found for "{searchTerm}"
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full cursor-pointer group">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{category.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-300 text-sm">{category.articles} articles</span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Popular Articles */}
          <TabsContent value="popular" className="space-y-6">
            {searchTerm && (
              <div className="mb-6">
                <p className="text-gray-300">
                  {filteredArticles.length} articles found for "{searchTerm}"
                </p>
              </div>
            )}
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 cursor-pointer hover:border-purple-400/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-purple-300 text-sm bg-purple-500/20 px-2 py-1 rounded-full">
                            {article.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 text-sm">{article.rating}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 hover:text-purple-300 transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{article.views} views</span>
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          {/* Video Tutorials */}
          <TabsContent value="videos" className="space-y-8">
            {searchTerm && (
              <div className="mb-6">
                <p className="text-gray-300">
                  {filteredVideos.length} videos found for "{searchTerm}"
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 cursor-pointer group">
                    <div className="relative aspect-video bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-t-lg flex items-center justify-center">
                      <Play className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-purple-300 text-sm bg-purple-500/20 px-2 py-1 rounded-full">
                          {video.category}
                        </span>
                        <span className="text-gray-400 text-sm">{video.views} views</span>
                      </div>
                      <CardTitle className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {video.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-6">
            {searchTerm && (
              <div className="mb-6">
                <p className="text-gray-300">
                  {filteredFaqs.length} FAQs found for "{searchTerm}"
                </p>
              </div>
            )}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                    <CardContent className="p-0">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/20 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-purple-300 text-xs bg-purple-500/20 px-2 py-1 rounded-full">
                              {faq.category}
                            </span>
                          </div>
                          <h3 className="text-white font-medium">{faq.question}</h3>
                        </div>
                        {expandedFaq === index ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 pb-6"
                        >
                          <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Still Need Help?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you get the most out of Automaatte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="gradient" size="lg">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Contact Support
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download Guides
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
