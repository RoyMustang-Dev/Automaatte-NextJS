import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Zap, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  Play, 
  Pause, 
  RotateCcw,
  TrendingUp,
  Activity,
  Workflow,
  Plus
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface WorkflowItem {
  id: string;
  title: string;
  type: 'research' | 'planning' | 'combo';
  status: 'draft' | 'running' | 'completed' | 'paused';
  progress: number;
  createdAt: string;
  estimatedTime: string;
  results?: any;
}

interface ServiceDashboardProps {
  onCreateNew: () => void;
  onServiceSelect: (serviceId: string) => void;
}

export const ServiceDashboard: React.FC<ServiceDashboardProps> = ({
  onCreateNew,
  onServiceSelect
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([
    {
      id: '1',
      title: 'Vacation Research: Japan Trip',
      type: 'research',
      status: 'completed',
      progress: 100,
      createdAt: '2024-01-15',
      estimatedTime: '5 min',
      results: { insights: 15, recommendations: 8 }
    },
    {
      id: '2',
      title: 'Education Planning: MBA Programs',
      type: 'planning',
      status: 'running',
      progress: 65,
      createdAt: '2024-01-16',
      estimatedTime: '3 min remaining'
    },
    {
      id: '3',
      title: 'Investment Research + Planning',
      type: 'combo',
      status: 'paused',
      progress: 40,
      createdAt: '2024-01-14',
      estimatedTime: '8 min remaining'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'running':
        return <Play className="w-5 h-5 text-blue-400 animate-pulse" />;
      case 'paused':
        return <Pause className="w-5 h-5 text-yellow-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'research':
        return <Brain className="w-4 h-4 text-purple-400" />;
      case 'planning':
        return <Zap className="w-4 h-4 text-blue-400" />;
      case 'combo':
        return <Workflow className="w-4 h-4 text-green-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const quickActions = [
    {
      title: 'Vacation Research',
      description: 'Research destinations and travel options',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      action: () => onServiceSelect('vacation-research')
    },
    {
      title: 'Education Planning',
      description: 'Plan your educational journey',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      action: () => onServiceSelect('education-planning')
    },
    {
      title: 'Investment Analysis',
      description: 'Research and plan investments',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      action: () => onServiceSelect('investment-research')
    },
    {
      title: 'Custom Workflow',
      description: 'Create a custom AI workflow',
      icon: Plus,
      color: 'from-orange-500 to-red-500',
      action: onCreateNew
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">AI Service Dashboard</h1>
          <p className="text-gray-300">Manage your AI-powered research and planning workflows</p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="overview">
              Overview
            </TabsTrigger>
            <TabsTrigger value="workflows">
              Workflows
            </TabsTrigger>
            <TabsTrigger value="results">
              Results
            </TabsTrigger>
            <TabsTrigger value="analytics">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Active Workflows', value: '3', icon: Activity, color: 'text-blue-400' },
                { label: 'Completed Tasks', value: '12', icon: CheckCircle, color: 'text-green-400' },
                { label: 'Time Saved', value: '4.2h', icon: Clock, color: 'text-purple-400' },
                { label: 'Success Rate', value: '98%', icon: TrendingUp, color: 'text-emerald-400' }
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

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="cursor-pointer"
                    onClick={action.action}
                  >
                    <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 h-full">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                        <p className="text-gray-300 text-sm mb-4">{action.description}</p>
                        <Button variant="ghost" size="sm" className="w-full group">
                          Start Now
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {workflows.slice(0, 3).map((workflow, index) => (
                      <motion.div
                        key={workflow.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-purple-500/10"
                      >
                        <div className="flex items-center space-x-4">
                          {getTypeIcon(workflow.type)}
                          <div>
                            <h4 className="text-white font-medium">{workflow.title}</h4>
                            <p className="text-gray-400 text-sm">{workflow.createdAt}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(workflow.status)}
                          <span className="text-sm text-gray-300">{workflow.progress}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">All Workflows</h2>
              <Button onClick={onCreateNew} variant="gradient">
                <Plus className="w-4 h-4 mr-2" />
                New Workflow
              </Button>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {workflows.map((workflow, index) => (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getTypeIcon(workflow.type)}
                            <div>
                              <h3 className="text-lg font-semibold text-white">{workflow.title}</h3>
                              <p className="text-gray-400 text-sm">Created {workflow.createdAt}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(workflow.status)}
                            <span className="text-sm text-gray-300 capitalize">{workflow.status}</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Progress</span>
                            <span>{workflow.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${workflow.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">{workflow.estimatedTime}</span>
                          <div className="flex space-x-2">
                            {workflow.status === 'paused' && (
                              <Button size="sm" variant="ai">
                                <Play className="w-4 h-4 mr-1" />
                                Resume
                              </Button>
                            )}
                            {workflow.status === 'running' && (
                              <Button size="sm" variant="ghost">
                                <Pause className="w-4 h-4 mr-1" />
                                Pause
                              </Button>
                            )}
                            {workflow.status === 'completed' && (
                              <Button size="sm" variant="gradient">
                                View Results
                              </Button>
                            )}
                            <Button size="sm" variant="ghost">
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            <h2 className="text-2xl font-bold">Completed Results</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {workflows.filter(w => w.status === 'completed').map((workflow, index) => (
                <motion.div
                  key={workflow.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        {getTypeIcon(workflow.type)}
                        <span>{workflow.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {workflow.results && (
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Insights Generated:</span>
                            <span className="text-white font-semibold">{workflow.results.insights}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Recommendations:</span>
                            <span className="text-white font-semibold">{workflow.results.recommendations}</span>
                          </div>
                          <Button variant="gradient" className="w-full mt-4">
                            <ArrowRight className="w-4 h-4 mr-2" />
                            View Full Report
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Usage Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle>Service Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Research Services', usage: 65, color: 'bg-purple-500' },
                      { name: 'Planning Services', usage: 45, color: 'bg-blue-500' },
                      { name: 'Combo Workflows', usage: 30, color: 'bg-green-500' }
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

              <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">98.5%</div>
                      <div className="text-gray-400">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">2.3min</div>
                      <div className="text-gray-400">Avg. Processing Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">4.2h</div>
                      <div className="text-gray-400">Total Time Saved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
