import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Users, 
  Shield, 
  Globe, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Brain,
  Zap,
  Settings,
  BarChart3,
  Database,
  Cpu,
  Network,
  Activity,
  UserCheck,
  Lock,
  AlertTriangle,
  Download
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface User {
  email: string;
  type: string;
  name: string;
  company?: string;
}

interface EnterpriseDashboardProps {
  user: User;
}

export const EnterpriseDashboard: React.FC<EnterpriseDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const enterpriseMetrics = [
    { label: 'Total Users', value: '247', icon: Users, color: 'text-blue-400', change: '+12%' },
    { label: 'API Calls', value: '1.2M', icon: Database, color: 'text-green-400', change: '+8%' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: 'text-purple-400', change: '0%' },
    { label: 'Cost Savings', value: '$45K', icon: TrendingUp, color: 'text-pink-400', change: '+15%' }
  ];

  const teamMembers = [
    { name: 'John Smith', role: 'Admin', department: 'IT', lastActive: '2 hours ago', status: 'active' },
    { name: 'Sarah Johnson', role: 'Manager', department: 'Marketing', lastActive: '1 day ago', status: 'active' },
    { name: 'Mike Chen', role: 'User', department: 'Sales', lastActive: '3 days ago', status: 'inactive' },
    { name: 'Lisa Brown', role: 'Manager', department: 'HR', lastActive: '5 hours ago', status: 'active' }
  ];

  const systemHealth = [
    { component: 'API Gateway', status: 'healthy', uptime: '99.9%', responseTime: '45ms' },
    { component: 'AI Processing', status: 'healthy', uptime: '99.8%', responseTime: '120ms' },
    { component: 'Database', status: 'healthy', uptime: '100%', responseTime: '12ms' },
    { component: 'Authentication', status: 'warning', uptime: '99.5%', responseTime: '78ms' }
  ];

  const securityAlerts = [
    { type: 'info', message: 'New user registration: mike.wilson@company.com', time: '2 hours ago' },
    { type: 'warning', message: 'Unusual API usage pattern detected', time: '1 day ago' },
    { type: 'success', message: 'Security scan completed successfully', time: '2 days ago' }
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
              Enterprise Dashboard
            </h1>
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-blue-400" />
              <p className="text-gray-300">{user.company || 'Enterprise Account'} - {user.name}</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button variant="ai">
              <Settings className="w-4 h-4 mr-2" />
              Admin Settings
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
          <TabsTrigger value="overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="users">
            Users
          </TabsTrigger>
          <TabsTrigger value="analytics">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="security">
            Security
          </TabsTrigger>
          <TabsTrigger value="system">
            System
          </TabsTrigger>
          <TabsTrigger value="billing">
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Enterprise Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {enterpriseMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <metric.icon className={`w-8 h-8 ${metric.color}`} />
                      <span className={`text-sm font-medium ${metric.change.startsWith('+') ? 'text-green-400' : 'text-gray-400'}`}>
                        {metric.change}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{metric.label}</p>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions & System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="gradient" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="ai" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-gray-300">
                    <Settings className="w-4 h-4 mr-2" />
                    System Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemHealth.slice(0, 4).map((system, index) => (
                    <div key={system.component} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          system.status === 'healthy' ? 'bg-green-400' :
                          system.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                        }`} />
                        <span className="text-white font-medium">{system.component}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{system.uptime}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: 'Sarah Johnson', action: 'Generated investment research report', time: '2 hours ago', department: 'Marketing' },
                  { user: 'Mike Chen', action: 'Created vacation planning workflow', time: '4 hours ago', department: 'Sales' },
                  { user: 'Lisa Brown', action: 'Used document summarization', time: '6 hours ago', department: 'HR' },
                  { user: 'John Smith', action: 'Updated user permissions', time: '1 day ago', department: 'IT' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg"
                  >
                    <div>
                      <h4 className="text-white font-medium">{activity.user}</h4>
                      <p className="text-gray-300 text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs">{activity.department}</p>
                    </div>
                    <span className="text-gray-400 text-sm">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Team Members</h2>
            <Button variant="gradient">
              <Users className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">{member.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{member.name}</h4>
                        <p className="text-gray-300 text-sm">{member.role} • {member.department}</p>
                        <p className="text-gray-400 text-xs">Last active: {member.lastActive}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`w-3 h-3 rounded-full ${member.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`} />
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
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
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">1.2M</div>
                    <div className="text-gray-400">Total API Calls</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">247</div>
                    <div className="text-gray-400">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
                    <div className="text-gray-400">System Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Department Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Marketing', usage: 45, color: 'bg-purple-500' },
                    { name: 'Sales', usage: 30, color: 'bg-blue-500' },
                    { name: 'IT', usage: 15, color: 'bg-green-500' },
                    { name: 'HR', usage: 10, color: 'bg-pink-500' }
                  ].map((dept, index) => (
                    <div key={dept.name}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">{dept.name}</span>
                        <span className="text-white">{dept.usage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`${dept.color} h-2 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${dept.usage}%` }}
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

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Security Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Two-Factor Authentication</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">SSL Encryption</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Data Backup</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Access Logs</span>
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {securityAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-800/30 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'success' ? 'bg-green-400' :
                        alert.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                      }`} />
                      <div className="flex-1">
                        <p className="text-white text-sm">{alert.message}</p>
                        <p className="text-gray-400 text-xs">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">System Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {systemHealth.map((system, index) => (
                  <motion.div
                    key={system.component}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-slate-800/30 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{system.component}</h4>
                      <div className={`w-3 h-3 rounded-full ${
                        system.status === 'healthy' ? 'bg-green-400' :
                        system.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                      }`} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Uptime</span>
                        <span className="text-white">{system.uptime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Response Time</span>
                        <span className="text-white">{system.responseTime}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Enterprise Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Plan</span>
                    <span className="text-white font-semibold">Enterprise</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Users</span>
                    <span className="text-white font-semibold">247 / 500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Monthly Cost</span>
                    <span className="text-white font-semibold">$2,499/month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Next Billing</span>
                    <span className="text-white font-semibold">Feb 1, 2025</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-6">
                  Manage Billing
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Usage Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">$45K</div>
                    <div className="text-gray-400">Cost Savings This Year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">1.2M</div>
                    <div className="text-gray-400">API Calls This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">247</div>
                    <div className="text-gray-400">Active Users</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
