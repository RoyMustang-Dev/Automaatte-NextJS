import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users,
  Calendar,
  GraduationCap,
  DollarSign,
  Shield,
  Video,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const CoreServicesPage: React.FC = () => {
  const aiResearchers = [
    {
      icon: MapPin,
      title: "Vacation Research",
      description: "Comprehensive travel planning with destination insights, budget analysis, and personalized recommendations.",
      features: ["Destination Analysis", "Budget Planning", "Activity Recommendations", "Weather Insights"],
      pricing: "Premium Feature",
      estimatedTime: "5-10 minutes",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: GraduationCap,
      title: "Education Research",
      description: "Career pathway guidance with course recommendations, institution analysis, and future prospects.",
      features: ["Course Analysis", "Institution Comparison", "Career Mapping", "Skill Assessment"],
      pricing: "Premium Feature",
      estimatedTime: "10-15 minutes",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: DollarSign,
      title: "Investment Research",
      description: "Market analysis and investment strategies with risk assessment and portfolio recommendations.",
      features: ["Market Analysis", "Risk Assessment", "Portfolio Optimization", "Trend Prediction"],
      pricing: "Premium Feature",
      estimatedTime: "15-20 minutes",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Insurance Research",
      description: "Comprehensive insurance analysis with coverage comparison and cost optimization.",
      features: ["Coverage Analysis", "Cost Comparison", "Risk Evaluation", "Policy Recommendations"],
      pricing: "Premium Feature",
      estimatedTime: "10-15 minutes",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Video,
      title: "Video Production Research",
      description: "Content strategy and production planning with market analysis and creative insights.",
      features: ["Market Research", "Content Strategy", "Production Planning", "Audience Analysis"],
      pricing: "Premium Feature",
      estimatedTime: "15-25 minutes",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const aiPlanners = [
    {
      icon: Calendar,
      title: "Vacation Planning",
      description: "Transform research into detailed itineraries with bookings, schedules, and contingency plans.",
      features: ["Detailed Itineraries", "Booking Assistance", "Schedule Optimization", "Backup Plans"],
      pricing: "Premium Feature",
      estimatedTime: "10-15 minutes",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Education Planning",
      description: "Create actionable academic and career roadmaps with timeline and milestone tracking.",
      features: ["Academic Roadmap", "Career Timeline", "Milestone Tracking", "Resource Planning"],
      pricing: "Premium Feature",
      estimatedTime: "15-20 minutes",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Investment Planning",
      description: "Strategic portfolio management with allocation strategies and risk management.",
      features: ["Portfolio Strategy", "Asset Allocation", "Risk Management", "Performance Tracking"],
      pricing: "Premium Feature",
      estimatedTime: "20-30 minutes",
      color: "from-purple-500 to-pink-500"
    }
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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Core AI Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our flagship AI-powered research and planning services designed to transform how you make decisions and plan for the future.
          </p>
        </motion.div>

        {/* Service Interconnectivity Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Service Interconnectivity</h2>
                <p className="text-gray-300 mb-6">
                  Our unique approach allows research outputs to seamlessly feed into planning services, creating comprehensive end-to-end solutions.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-6 h-6 text-purple-400" />
                    <span className="text-white font-medium">AI Research</span>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <Users className="w-6 h-6 text-blue-400" />
                    <span className="text-white font-medium">User Input</span>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <Zap className="w-6 h-6 text-green-400" />
                    <span className="text-white font-medium">AI Planning</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Researchers Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">AI Researchers</h2>
            </div>
            <p className="text-gray-300 text-lg">
              Intelligent research automation that gathers, analyzes, and synthesizes information to provide comprehensive insights.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiResearchers.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
                    <p className="text-purple-300 text-sm">{service.pricing}</p>
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
                        <span className="text-gray-400 text-sm">{service.estimatedTime}</span>
                      </div>
                    </div>
                    
                    <Button variant="gradient" className="w-full">
                      Start Research
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI Planners Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">AI Planners</h2>
            </div>
            <p className="text-gray-300 text-lg">
              Strategic planning services that transform research insights into actionable roadmaps and comprehensive plans.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiPlanners.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
                    <p className="text-blue-300 text-sm">{service.pricing}</p>
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
                        <span className="text-gray-400 text-sm">{service.estimatedTime}</span>
                      </div>
                    </div>
                    
                    <Button variant="ai" className="w-full">
                      Start Planning
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to Experience AI-Powered Automation?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have transformed their decision-making process with our core AI services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth/signup">
                  <Button variant="gradient" size="xl" className="group">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="xl">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
