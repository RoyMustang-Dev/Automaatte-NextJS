import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Crown, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  FileText,
  Video,
  MessageSquare,
  Languages,
  Calendar,
  GraduationCap,
  DollarSign,
  Shield,
  Activity,
  BarChart3,
  Settings
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface User {
  email: string;
  type: string;
  name: string;
}

interface PaidDashboardProps {
  user: User;
}

export const PaidDashboard: React.FC<PaidDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const premiumServices = [
    {
      icon: Brain,
      title: "Vacation Research",
      description: "Comprehensive travel planning insights",
      usage: "5 this month",
      category: "AI Researcher"
    },
    {
      icon: GraduationCap,
      title: "Education Research",
      description: "Career pathway guidance",
      usage: "3 this month",
      category: "AI Researcher"
    },
    {
      icon: DollarSign,
      title: "Investment Research",
      description: "Market analysis and strategies",
      usage: "8 this month",
      category: "AI Researcher"
    },
    {
      icon: Zap,
      title: "AI Planners",
      description: "Strategic planning services",
      usage: "12 this month",
      category: "AI Planner"
    }
  ];

  const freeServices = [
    {
      icon: FileText,
      title: "Text Summarization",
      description: "Unlimited document summarization",
      usage: "Unlimited"
    },
    {
      icon: Video,
      title: "Video Summarization",
      description: "Extract insights from videos",
      usage: "Unlimited"
    },
    {
      icon: MessageSquare,
      title: "Document Q&A",
      description: "Interactive document querying",
      usage: "Unlimited"
    },
    {
      icon: Languages,
      title: "Real-time Translation",
      description: "Multi-language support",
      usage: "Unlimited"
    }
  ];

  const recentActivity = [
    { service: "Investment Research", time: "2 hours ago", status: "completed" },
    { service: "Vacation Planning", time: "1 day ago", status: "completed" },
    { service: "Education Research", time: "3 days ago", status: "completed" },
    { service: "Text Summarization", time: "5 days ago", status: "completed" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user.name}!
            </h1>
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-purple-400" />
              <p className="text-gray-300">Premium Plan - Full Access</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button variant="ai">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="services">
            Services
          </TabsTrigger>
          <TabsTrigger value="workflows">
            Workflows
          </TabsTrigger>
          <TabsTrigger value="analytics">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="billing">
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Services Used', value: '28', icon: CheckCircle, color: 'text-green-400' },
              { label: 'This Month', value: '28', icon: Calendar, color: 'text-blue-400' },
              { label: 'Premium Services', value: '8', icon: Crown, color: 'text-purple-400' },
              { label: 'Time Saved', value: '12h', icon: Clock, color: 'text-pink-400' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
                    >
                      <div>
                        <h4 className="text-white font-medium">{activity.service}</h4>
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="gradient" className="w-full justify-start">
                    <Brain className="w-4 h-4 mr-2" />
                    Start New Research
                  </Button>
                  <Button variant="ai" className="w-full justify-start">
                    <Zap className="w-4 h-4 mr-2" />
                    Create Planning Workflow
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Summarize Document
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Premium Services Overview */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Premium Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {premiumServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-white">{service.title}</CardTitle>
                      <p className="text-purple-300 text-sm">{service.category}</p>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-300 text-sm mb-3">{service.description}</p>
                      <p className="text-green-400 text-xs mb-4">{service.usage}</p>
                      <Button variant="ai" size="sm" className="w-full">
                        Launch
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Premium AI Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {premiumServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm text-purple-400 bg-purple-500/20 px-2 py-1 rounded-full">
                          Premium
                        </span>
                      </div>
                      <CardTitle className="text-lg font-bold text-white">{service.title}</CardTitle>
                      <p className="text-purple-300 text-sm">{service.category}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-green-400 text-sm">{service.usage}</span>
                        <Button variant="gradient">
                          Launch Service
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Free Services (Unlimited)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {freeServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-white">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-300 text-sm mb-3">{service.description}</p>
                      <p className="text-green-400 text-xs mb-4">{service.usage}</p>
                      <Button variant="ai" size="sm" className="w-full">
                        Use Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Active Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Active Workflows</h3>
                <p className="text-gray-300 mb-6">Create your first workflow to get started</p>
                <Button variant="gradient">
                  <Zap className="w-4 h-4 mr-2" />
                  Create Workflow
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Usage Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">28</div>
                    <div className="text-gray-400">Services Used This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">12h</div>
                    <div className="text-gray-400">Time Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
                    <div className="text-gray-400">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Service Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'AI Researchers', usage: 60, color: 'bg-purple-500' },
                    { name: 'AI Planners', usage: 25, color: 'bg-blue-500' },
                    { name: 'Free Services', usage: 15, color: 'bg-green-500' }
                  ].map((service, index) => (
                    <div key={service.name}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">{service.name}</span>
                        <span className="text-white">{service.usage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`${service.color} h-2 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${service.usage}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Plan</span>
                    <span className="text-white font-semibold">Premium</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Price</span>
                    <span className="text-white font-semibold">$9.99/month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Next Billing</span>
                    <span className="text-white font-semibold">Feb 15, 2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Status</span>
                    <span className="text-green-400 font-semibold">Active</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-6">
                  Manage Subscription
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "Jan 15, 2025", amount: "$9.99", status: "Paid" },
                    { date: "Dec 15, 2024", amount: "$9.99", status: "Paid" },
                    { date: "Nov 15, 2024", amount: "$9.99", status: "Paid" }
                  ].map((bill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{bill.date}</div>
                        <div className="text-gray-400 text-sm">{bill.amount}</div>
                      </div>
                      <span className="text-green-400 text-sm">{bill.status}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
