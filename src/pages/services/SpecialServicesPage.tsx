import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Bot, 
  Cog, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users,
  Zap,
  Building,
  Globe,
  Shield,
  Cpu,
  Database,
  Network,
  Settings,
  Code,
  Smartphone,
  Monitor
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const SpecialServicesPage: React.FC = () => {
  const specialServices = [
    {
      icon: MessageSquare,
      title: "Custom AI Chatbots",
      description: "Intelligent conversational AI tailored to your business needs with advanced NLP and context understanding.",
      features: ["Natural Language Processing", "Context Awareness", "Multi-language Support", "Custom Training"],
      pricing: "Custom Pricing",
      estimatedTime: "2-4 weeks",
      color: "from-blue-500 to-cyan-500",
      category: "AI Development"
    },
    {
      icon: Cog,
      title: "Process Automation",
      description: "End-to-end business process automation with workflow optimization and intelligent decision making.",
      features: ["Workflow Design", "Process Optimization", "Decision Trees", "Integration APIs"],
      pricing: "Enterprise Only",
      estimatedTime: "3-6 weeks",
      color: "from-green-500 to-emerald-500",
      category: "Automation"
    },
    {
      icon: Bot,
      title: "AI Agent Development",
      description: "Sophisticated AI agents that can perform complex tasks autonomously with learning capabilities.",
      features: ["Autonomous Operation", "Learning Algorithms", "Task Automation", "Performance Analytics"],
      pricing: "Enterprise Only",
      estimatedTime: "4-8 weeks",
      color: "from-purple-500 to-pink-500",
      category: "AI Development"
    },
    {
      icon: Database,
      title: "Data Intelligence Platform",
      description: "Comprehensive data analysis and intelligence platform with predictive analytics and insights.",
      features: ["Data Processing", "Predictive Analytics", "Real-time Insights", "Custom Dashboards"],
      pricing: "Enterprise Only",
      estimatedTime: "6-12 weeks",
      color: "from-orange-500 to-red-500",
      category: "Data Analytics"
    },
    {
      icon: Network,
      title: "AI Integration Services",
      description: "Seamless integration of AI capabilities into existing systems and workflows.",
      features: ["System Integration", "API Development", "Legacy Modernization", "Performance Optimization"],
      pricing: "Custom Pricing",
      estimatedTime: "4-10 weeks",
      color: "from-indigo-500 to-purple-500",
      category: "Integration"
    },
    {
      icon: Shield,
      title: "Enterprise AI Security",
      description: "Advanced security solutions for AI systems with threat detection and compliance management.",
      features: ["Threat Detection", "Compliance Management", "Security Audits", "Risk Assessment"],
      pricing: "Enterprise Only",
      estimatedTime: "3-6 weeks",
      color: "from-red-500 to-pink-500",
      category: "Security"
    }
  ];

  const deploymentOptions = [
    {
      icon: Globe,
      title: "Cloud Deployment",
      description: "Scalable cloud-based solutions with global reach and automatic scaling.",
      features: ["Global CDN", "Auto-scaling", "99.9% Uptime", "Multi-region"]
    },
    {
      icon: Building,
      title: "On-Premise",
      description: "Secure on-premise deployment for maximum control and compliance.",
      features: ["Full Control", "Custom Security", "Compliance Ready", "Local Processing"]
    },
    {
      icon: Network,
      title: "Hybrid Solutions",
      description: "Best of both worlds with hybrid cloud and on-premise architecture.",
      features: ["Flexible Architecture", "Cost Optimization", "Scalable", "Secure"]
    }
  ];

  const developmentProcess = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "Understanding your requirements and analyzing existing systems.",
      duration: "1-2 weeks"
    },
    {
      step: "02",
      title: "Design & Architecture",
      description: "Creating detailed system design and technical architecture.",
      duration: "1-2 weeks"
    },
    {
      step: "03",
      title: "Development & Training",
      description: "Building and training AI models with your specific data.",
      duration: "2-6 weeks"
    },
    {
      step: "04",
      title: "Testing & Optimization",
      description: "Comprehensive testing and performance optimization.",
      duration: "1-2 weeks"
    },
    {
      step: "05",
      title: "Deployment & Support",
      description: "Production deployment with ongoing support and monitoring.",
      duration: "Ongoing"
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
            Special AI Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Custom AI solutions and enterprise-grade services designed for complex business requirements and specialized use cases.
          </p>
        </motion.div>

        {/* Services Grid */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Custom AI Solutions</h2>
            <p className="text-gray-300 text-lg">
              Tailored AI services designed to meet your specific business needs and technical requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
                    <p className="text-purple-300 text-sm">{service.category}</p>
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
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Pricing:</span>
                        <span className="text-purple-300 text-sm font-medium">{service.pricing}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Timeline:</span>
                        <span className="text-blue-300 text-sm font-medium">{service.estimatedTime}</span>
                      </div>
                    </div>
                    
                    <Button variant="gradient" className="w-full">
                      Request Quote
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Deployment Options */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Deployment Options</h2>
            <p className="text-gray-300 text-lg">
              Flexible deployment options to meet your security, compliance, and performance requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deploymentOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-300 mb-6">{option.description}</p>
                    <div className="space-y-2">
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Development Process */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Development Process</h2>
            <p className="text-gray-300 text-lg">
              Our proven methodology ensures successful delivery of custom AI solutions.
            </p>
          </motion.div>

          <div className="space-y-8">
            {developmentProcess.map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">{phase.step}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{phase.title}</h3>
                        <p className="text-gray-300 mb-2">{phase.description}</p>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400 text-sm">{phase.duration}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Enterprise Features */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Enterprise Features</h2>
                  <p className="text-gray-300 text-lg">
                    Advanced capabilities designed for enterprise-scale deployments.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: Shield, title: "Enterprise Security", desc: "Advanced security protocols" },
                    { icon: Users, title: "Team Management", desc: "Multi-user collaboration" },
                    { icon: Database, title: "Data Governance", desc: "Comprehensive data control" },
                    { icon: Settings, title: "Custom Configuration", desc: "Tailored to your needs" }
                  ].map((feature, index) => (
                    <div key={feature.title} className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready for Custom AI Solutions?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's discuss your specific requirements and create a tailored AI solution for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="gradient" size="xl" className="group">
                    Schedule Consultation
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button variant="outline" size="xl">
                    Start with Core Services
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
