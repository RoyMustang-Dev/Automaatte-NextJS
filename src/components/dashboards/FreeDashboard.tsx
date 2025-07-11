import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  Gift, 
  Crown, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  Lock,
  TrendingUp,
  FileText,
  Video,
  MessageSquare,
  Languages
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface User {
  email: string;
  type: string;
  name: string;
}

interface FreeDashboardProps {
  user: User;
}

export const FreeDashboard: React.FC<FreeDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const freeServices = [
    {
      icon: FileText,
      title: "Text Summarization",
      description: "Summarize long documents instantly",
      usage: "3/5 daily",
      available: true
    },
    {
      icon: Video,
      title: "Video Summarization",
      description: "Extract key insights from videos",
      usage: "1/3 daily",
      available: true
    },
    {
      icon: MessageSquare,
      title: "Document Q&A",
      description: "Ask questions about your documents",
      usage: "2/10 daily",
      available: true
    },
    {
      icon: Languages,
      title: "Real-time Translation",
      description: "Translate text in multiple languages",
      usage: "5/20 daily",
      available: true
    }
  ];

  const premiumFeatures = [
    {
      icon: Brain,
      title: "AI Researchers",
      description: "Comprehensive research automation",
      locked: true
    },
    {
      icon: Zap,
      title: "AI Planners",
      description: "Strategic planning services",
      locked: true
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Detailed insights and reporting",
      locked: true
    }
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
            <p className="text-gray-300">Free Plan - Explore AI automation tools</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="gradient" className="group">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="services">
            Free Services
          </TabsTrigger>
          <TabsTrigger value="upgrade">
            Upgrade
          </TabsTrigger>
          <TabsTrigger value="usage">
            Usage
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Services Used Today', value: '11', icon: CheckCircle, color: 'text-green-400' },
              { label: 'Daily Limit', value: '38', icon: Clock, color: 'text-blue-400' },
              { label: 'Free Services', value: '4', icon: Gift, color: 'text-purple-400' },
              { label: 'Days Active', value: '7', icon: TrendingUp, color: 'text-pink-400' }
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

          {/* Available Services */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Available Free Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freeServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                          {service.usage}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-bold text-white">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{service.description}</p>
                      <Button variant="ai" className="w-full">
                        Use Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upgrade Prompt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20"
          >
            <div className="text-center">
              <Crown className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Unlock Premium Features</h3>
              <p className="text-gray-300 mb-6">
                Get access to AI Researchers, Planners, and unlimited usage with our premium plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gradient" size="lg">
                  <Crown className="w-5 h-5 mr-2" />
                  Upgrade to Premium
                </Button>
                <Button variant="outline" size="lg">
                  View Plans
                </Button>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
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
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-300 mb-4">{service.description}</p>
                    <div className="mb-4">
                      <span className="text-sm text-green-400 bg-green-500/20 px-3 py-1 rounded-full">
                        {service.usage}
                      </span>
                    </div>
                    <Button variant="ai" className="w-full">
                      Launch Service
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Upgrade Tab */}
        <TabsContent value="upgrade" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Plan */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Current Plan: Free</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Daily Usage Limits</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">4 Free Services</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Basic Support</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">AI Researchers</span>
                    <Lock className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">AI Planners</span>
                    <Lock className="w-5 h-5 text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium Features */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <Crown className="w-6 h-6 mr-2 text-purple-400" />
                  Premium Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {premiumFeatures.map((feature, index) => (
                    <div key={feature.title} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{feature.title}</h4>
                        <p className="text-gray-300 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="gradient" className="w-full mt-6">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Now - $9.99/month
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Today's Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {freeServices.map((service, index) => (
                  <div key={service.title} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{service.title}</span>
                      <span className="text-gray-400">{service.usage}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(parseInt(service.usage.split('/')[0]) / parseInt(service.usage.split('/')[1])) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
