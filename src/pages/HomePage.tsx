import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Play,
  Brain,
  Zap,
  TrendingUp,
  Shield,
  Globe,
  Users,
  Clock,
  CheckCircle,
  Star,
  Rocket,
  Lightbulb,
  Target,
  MapPin,
  GraduationCap,
  DollarSign,
  Video,
  Bot,
  Smartphone,
  Gift,
  BarChart3,
  ChevronDown
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section with Spline Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Spline Background Placeholder */}
        <div className="absolute inset-0 z-0">
          {/* Animated Background Elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"
          />
          
          {/* Spline Integration Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-purple-400/20 text-center">
              {/* This is where Spline 3D model will be integrated */}
              <div className="w-full h-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl border border-purple-500/10 flex items-center justify-center">
                <p className="text-sm">Spline 3D Background Integration Point</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Tomorrow,
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                Today
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Where AI meets ambition to turn today's ideas into tomorrow's achievements. 
              Automate research, planning, and decision-making with our intelligent AI services.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button 
                variant="gradient"
                size="xl"
                className="group shadow-2xl"
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button 
                variant="ai"
                size="xl"
                className="group shadow-2xl"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                { icon: Brain, label: "AI-Powered", desc: "Advanced Intelligence" },
                { icon: Zap, label: "Lightning Fast", desc: "Instant Results" },
                { icon: Shield, label: "Secure", desc: "Enterprise Grade" },
                { icon: Globe, label: "Global", desc: "Worldwide Access" }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
                >
                  <item.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-1">{item.label}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Down Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <button
            onClick={() => {
              const nextSection = document.querySelector('section:nth-of-type(2)');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex flex-col items-center space-y-2 text-white/70 hover:text-white transition-colors duration-300"
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 border-2 border-white/30 rounded-full flex items-center justify-center group-hover:border-white/60 transition-colors duration-300"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </motion.div>
      </section>

      {/* Marketing Strip */}
      <section className="py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center space-x-8 mx-8">
              <span className="text-white font-semibold flex items-center">
                <Rocket className="w-4 h-4 mr-2" />
                AI-Powered Automation
              </span>
              <span className="text-white font-semibold flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                Intelligent Solutions
              </span>
              <span className="text-white font-semibold flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Lightning Fast Results
              </span>
              <span className="text-white font-semibold flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Precision Planning
              </span>
              <span className="text-white font-semibold flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Future-Ready Technology
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Why Automaatte Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Automaatte?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're not just another AI company. We're your strategic partner in building an automated future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Cutting-Edge AI",
                description: "Leveraging the latest in artificial intelligence to deliver unprecedented automation capabilities.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: TrendingUp,
                title: "Scalable Solutions",
                description: "From startups to enterprises, our solutions grow with your business needs.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Led by experienced professionals with a vision for the future of automation.",
                color: "from-green-500 to-emerald-500"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Core Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive AI-powered solutions designed to transform your business operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Researchers",
                description: "Intelligent research automation for vacation planning, education guidance, investment analysis, and more.",
                features: ["Market Analysis", "Data Processing", "Insight Generation"],
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Zap,
                title: "AI Planners",
                description: "Strategic planning services that turn research into actionable roadmaps and comprehensive plans.",
                features: ["Strategic Planning", "Resource Optimization", "Timeline Management"],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Shield,
                title: "Specialized Services",
                description: "Custom AI solutions including chatbots, automation tools, and enterprise-grade implementations.",
                features: ["Custom Development", "Enterprise Solutions", "24/7 Support"],
                color: "from-green-500 to-emerald-500"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services at a Glance */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-500/5 to-pink-500/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Service Portfolio
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive AI automation solutions designed to transform your workflow and decision-making process.
            </p>
          </motion.div>

          {/* Service Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* AI Researchers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">AI Researchers</h3>
              </div>
              <p className="text-gray-300 mb-6">Intelligent research automation for comprehensive insights and analysis.</p>
              <div className="space-y-3">
                {[
                  { icon: MapPin, name: "Vacation Research", color: "text-blue-400" },
                  { icon: GraduationCap, name: "Education Planning", color: "text-green-400" },
                  { icon: DollarSign, name: "Investment Analysis", color: "text-yellow-400" },
                  { icon: Shield, name: "Insurance Research", color: "text-red-400" },
                  { icon: Video, name: "Video Production", color: "text-purple-400" }
                ].map((service, idx) => (
                  <div key={service.name} className="flex items-center space-x-3">
                    <service.icon className={`w-4 h-4 ${service.color}`} />
                    <span className="text-gray-300 text-sm">{service.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Planners */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">AI Planners</h3>
              </div>
              <p className="text-gray-300 mb-6">Strategic planning services that transform insights into actionable roadmaps.</p>
              <div className="space-y-3">
                {[
                  { icon: Target, name: "Strategic Planning", color: "text-blue-400" },
                  { icon: BarChart3, name: "Performance Tracking", color: "text-green-400" },
                  { icon: Clock, name: "Timeline Management", color: "text-yellow-400" },
                  { icon: TrendingUp, name: "Growth Optimization", color: "text-purple-400" }
                ].map((service, idx) => (
                  <div key={service.name} className="flex items-center space-x-3">
                    <service.icon className={`w-4 h-4 ${service.color}`} />
                    <span className="text-gray-300 text-sm">{service.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Special Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Custom Solutions</h3>
              </div>
              <p className="text-gray-300 mb-6">Tailored AI solutions and enterprise-grade automation services.</p>
              <div className="space-y-3">
                {[
                  { icon: Bot, name: "Custom Chatbots", color: "text-blue-400" },
                  { icon: Smartphone, name: "Mobile Integration", color: "text-green-400" },
                  { icon: Globe, name: "Enterprise Solutions", color: "text-yellow-400" },
                  { icon: Gift, name: "Free Tools", color: "text-purple-400" }
                ].map((service, idx) => (
                  <div key={service.name} className="flex items-center space-x-3">
                    <service.icon className={`w-4 h-4 ${service.color}`} />
                    <span className="text-gray-300 text-sm">{service.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Service Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: "AI Researchers", count: "5+", description: "Specialized research tools" },
              { label: "AI Planners", count: "3+", description: "Strategic planning services" },
              { label: "Free Tools", count: "4", description: "Always available" },
              { label: "Custom Solutions", count: "∞", description: "Unlimited possibilities" }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-gradient-to-br from-slate-800/30 to-purple-900/20 rounded-xl border border-purple-500/10"
              >
                <div className="text-3xl font-bold text-purple-300 mb-2">{stat.count}</div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.description}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Better */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What Makes Us Better
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the unique advantages that set Automaatte apart in the AI automation landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  icon: Brain,
                  title: "Service Interconnectivity",
                  description: "Our unique approach allows research outputs to seamlessly feed into planning services, creating comprehensive end-to-end solutions."
                },
                {
                  icon: Clock,
                  title: "Rapid Development",
                  description: "Built by experienced professionals who understand the urgency of modern business needs and deliver solutions quickly."
                },
                {
                  icon: Users,
                  title: "Human-Centric AI",
                  description: "We believe in AI that enhances human capabilities rather than replacing them, creating collaborative intelligence."
                },
                {
                  icon: TrendingUp,
                  title: "Future-Ready",
                  description: "Our solutions are designed to evolve with emerging technologies and changing business landscapes."
                }
              ].map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <advantage.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{advantage.title}</h3>
                    <p className="text-gray-300">{advantage.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-800/30 to-purple-900/20 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Innovation Metrics</h3>
                  <p className="text-gray-300">Measurable impact of our approach</p>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "Development Speed", value: "3x Faster", color: "text-green-400" },
                    { label: "Service Integration", value: "Seamless", color: "text-blue-400" },
                    { label: "User Satisfaction", value: "Exceptional", color: "text-purple-400" },
                    { label: "Future Readiness", value: "100%", color: "text-pink-400" }
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-300">{metric.label}</span>
                      <span className={`font-bold ${metric.color}`}>{metric.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Corporates */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900/50 to-purple-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Us for Corporates
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade AI automation solutions designed for scale, security, and seamless integration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-grade security protocols, data encryption, and compliance with international standards including GDPR and SOC 2."
                },
                {
                  icon: TrendingUp,
                  title: "Scalable Architecture",
                  description: "Built to handle enterprise workloads with auto-scaling capabilities and 99.9% uptime guarantee."
                },
                {
                  icon: Users,
                  title: "Dedicated Support",
                  description: "24/7 enterprise support with dedicated account managers and priority response times."
                },
                {
                  icon: Globe,
                  title: "Global Deployment",
                  description: "Multi-region deployment options with local data residency and compliance requirements."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Enterprise Benefits</h3>
              <div className="space-y-4">
                {[
                  "Custom AI model training",
                  "White-label solutions",
                  "API-first architecture",
                  "Advanced analytics dashboard",
                  "Multi-tenant capabilities",
                  "Integration with existing systems"
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
              <Button variant="ai" className="w-full mt-6">
                Request Enterprise Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Help Automate */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How We Help Automate Things
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From individual users to enterprise corporations, our AI automation solutions adapt to your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "For Individuals",
                subtitle: "Free & Paid Users",
                icon: Users,
                color: "from-green-500 to-emerald-500",
                features: [
                  "Personal research automation",
                  "Smart planning assistance",
                  "Free tier with essential tools",
                  "Affordable premium features",
                  "Easy-to-use interfaces"
                ]
              },
              {
                title: "For Businesses",
                subtitle: "Small to Medium",
                icon: TrendingUp,
                color: "from-blue-500 to-cyan-500",
                features: [
                  "Team collaboration tools",
                  "Business process automation",
                  "Custom workflow creation",
                  "Analytics and reporting",
                  "Priority support"
                ]
              },
              {
                title: "For Enterprises",
                subtitle: "Corporate Solutions",
                icon: Globe,
                color: "from-purple-500 to-pink-500",
                features: [
                  "Enterprise-grade security",
                  "Custom AI model training",
                  "White-label solutions",
                  "Dedicated infrastructure",
                  "24/7 enterprise support"
                ]
              }
            ].map((tier, index) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tier.color} flex items-center justify-center mx-auto mb-4`}>
                      <tier.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{tier.title}</CardTitle>
                    <p className="text-purple-300">{tier.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl p-12 border border-purple-500/20"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the future of automation. Start your journey with Automaatte today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="xl" className="group">
                <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button variant="outline" size="xl">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
