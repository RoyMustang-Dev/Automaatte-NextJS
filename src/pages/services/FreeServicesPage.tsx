import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Video, 
  MessageSquare, 
  Languages, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users,
  Zap,
  Gift,
  Crown,
  Play,
  Upload,
  Download,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

export const FreeServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const freeServices = [
    {
      icon: FileText,
      title: "Text Summarization",
      description: "Instantly summarize long documents, articles, and reports with AI-powered analysis.",
      features: ["Document Upload", "Instant Processing", "Key Points Extraction", "Multiple Formats"],
      dailyLimit: "5 documents",
      avgTime: "30 seconds",
      color: "from-blue-500 to-cyan-500",
      demo: "Try with sample document"
    },
    {
      icon: Video,
      title: "Video Summarization",
      description: "Extract key insights and create summaries from video content automatically.",
      features: ["YouTube Integration", "Transcript Generation", "Key Moments", "Highlight Reel"],
      dailyLimit: "3 videos",
      avgTime: "2-5 minutes",
      color: "from-red-500 to-pink-500",
      demo: "Try with sample video"
    },
    {
      icon: MessageSquare,
      title: "Document Q&A",
      description: "Ask questions about your documents and get intelligent, contextual answers.",
      features: ["Natural Language Queries", "Context Understanding", "Source References", "Follow-up Questions"],
      dailyLimit: "10 questions",
      avgTime: "10 seconds",
      color: "from-green-500 to-emerald-500",
      demo: "Try with sample document"
    },
    {
      icon: Languages,
      title: "Real-time Translation",
      description: "Translate text between multiple languages with high accuracy and context awareness.",
      features: ["50+ Languages", "Context Preservation", "Batch Translation", "Format Retention"],
      dailyLimit: "20 translations",
      avgTime: "5 seconds",
      color: "from-purple-500 to-indigo-500",
      demo: "Try translation now"
    }
  ];

  const usageStats = [
    { label: "Daily Active Users", value: "10K+", icon: Users },
    { label: "Documents Processed", value: "50K+", icon: FileText },
    { label: "Videos Summarized", value: "5K+", icon: Video },
    { label: "Questions Answered", value: "100K+", icon: MessageSquare }
  ];

  const comparisonFeatures = [
    { feature: "Text Summarization", free: "5/day", paid: "Unlimited", enterprise: "Unlimited" },
    { feature: "Video Summarization", free: "3/day", paid: "Unlimited", enterprise: "Unlimited" },
    { feature: "Document Q&A", free: "10/day", paid: "Unlimited", enterprise: "Unlimited" },
    { feature: "Real-time Translation", free: "20/day", paid: "Unlimited", enterprise: "Unlimited" },
    { feature: "AI Researchers", free: "❌", paid: "✅", enterprise: "✅" },
    { feature: "AI Planners", free: "❌", paid: "✅", enterprise: "✅" },
    { feature: "Custom AI Solutions", free: "❌", paid: "❌", enterprise: "✅" },
    { feature: "Priority Support", free: "❌", paid: "✅", enterprise: "✅" },
    { feature: "API Access", free: "❌", paid: "Limited", enterprise: "Full" }
  ];

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
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Gift className="w-8 h-8 text-green-400" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Free AI Services
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the power of AI automation with our free tier services. No credit card required, start using AI tools immediately.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="overview">
              Overview
            </TabsTrigger>
            <TabsTrigger value="services">
              Services
            </TabsTrigger>
            <TabsTrigger value="demo">
              Try Now
            </TabsTrigger>
            <TabsTrigger value="compare">
              Compare Plans
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-12">
            {/* Usage Statistics */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Trusted by Thousands</h2>
                <p className="text-gray-300 text-lg text-center max-w-2xl mx-auto">
                  Join our growing community of users who are already experiencing the benefits of AI automation.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {usageStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 text-center">
                      <CardContent className="p-6">
                        <stat.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                        <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                        <div className="text-gray-400 text-sm">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Free Services Grid */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-white mb-6">Available Free Services</h2>
                <p className="text-gray-300 text-lg">
                  Get started with these powerful AI tools at no cost. Perfect for individuals and small teams.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {freeServices.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                      <CardHeader>
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
                        <p className="text-green-300 text-sm">Free • {service.dailyLimit}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-6">{service.description}</p>
                        
                        <div className="space-y-3 mb-6">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400 text-sm">{service.avgTime}</span>
                          </div>
                          <span className="text-green-400 text-sm font-medium">{service.dailyLimit}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <Button variant="gradient" className="w-full">
                            <Play className="w-4 h-4 mr-2" />
                            Try Now
                          </Button>
                          <Button variant="ghost" className="w-full text-gray-300">
                            {service.demo}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Upgrade Prompt */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
                <CardContent className="p-8 text-center">
                  <Crown className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">Want More?</h3>
                  <p className="text-gray-300 mb-6">
                    Upgrade to access AI Researchers, Planners, and unlimited usage of all free services.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/auth/signup">
                      <Button variant="gradient" size="lg">
                        <Crown className="w-5 h-5 mr-2" />
                        Upgrade to Premium
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg">
                      View All Plans
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {freeServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-green-400 bg-green-500/20 px-3 py-1 rounded-full text-sm">
                          {service.dailyLimit}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{service.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm">Average time:</span>
                        <span className="text-white text-sm">{service.avgTime}</span>
                      </div>
                      <Button variant="ai" className="w-full">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Launch Service
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Demo Tab */}
          <TabsContent value="demo" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Try Our Services</h2>
              <p className="text-gray-300 text-lg">
                Experience the power of AI automation with these interactive demos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {freeServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mx-auto mb-4`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-300 mb-6">{service.description}</p>
                      <div className="space-y-3">
                        <Button variant="gradient" className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Try Interactive Demo
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Your File
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Compare Tab */}
          <TabsContent value="compare" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Compare Plans</h2>
              <p className="text-gray-300 text-lg">
                See what's included in each plan and choose the best option for your needs.
              </p>
            </div>

            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/20">
                        <th className="text-left py-4 px-4 text-white font-semibold">Features</th>
                        <th className="text-center py-4 px-4 text-green-400 font-semibold">Free</th>
                        <th className="text-center py-4 px-4 text-purple-400 font-semibold">Premium</th>
                        <th className="text-center py-4 px-4 text-blue-400 font-semibold">Enterprise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((item, index) => (
                        <tr key={item.feature} className="border-b border-slate-700/50">
                          <td className="py-3 px-4 text-gray-300">{item.feature}</td>
                          <td className="py-3 px-4 text-center text-gray-300">{item.free}</td>
                          <td className="py-3 px-4 text-center text-gray-300">{item.paid}</td>
                          <td className="py-3 px-4 text-center text-gray-300">{item.enterprise}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
                  <Link to="/auth/signup">
                    <Button variant="outline" size="lg">
                      Start Free
                    </Button>
                  </Link>
                  <Link to="/auth/signup">
                    <Button variant="gradient" size="lg">
                      <Crown className="w-5 h-5 mr-2" />
                      Upgrade to Premium
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="ai" size="lg">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
