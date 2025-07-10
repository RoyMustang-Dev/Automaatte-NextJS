import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, Brain, Zap, Shield, Globe, TrendingUp, Play, CheckCircle, Star, Menu, X, Calendar, GraduationCap, DollarSign, Video, Search, Sparkles, MessageSquare, Smartphone, Code, FileText, Languages, Upload, BarChart3, Clock, Users, MapPin, Phone, Mail, Send, Database, Cpu, Network, Settings, Activity, Target, Layers, GitBranch, Workflow, Repeat, Timer, ChevronRight, Building2, Factory, Briefcase, Gauge, Rocket, LineChart, BookOpen, FileSearch, Camera, Heart, Film, Youtube, Gamepad2, Share2, PenTool, Table, Instagram, Linkedin, Facebook, Eye, LogOut, Gift } from 'lucide-react';
import { AuthModal } from './components/AuthModal';
import { PaymentModal } from './components/PaymentModal';
import { getCurrentUser, signOut } from './lib/supabase';
import { aiPlanners, aiResearchers, specializedServices, complimentaryServices, socialMediaServices, itAutomationServices } from './data/services';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'signin' | 'signup' }>({ isOpen: false, mode: 'signin' });
  const [paymentModal, setPaymentModal] = useState<{ isOpen: boolean; plan: any }>({ isOpen: false, plan: null });
  const [user, setUser] = useState<any>(null);
  const [activeService, setActiveService] = useState<'planners' | 'researchers' | 'specialized' | 'complimentary'>('planners');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { user } = await getCurrentUser();
    setUser(user);
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Calendar, GraduationCap, Shield, DollarSign, Video, Search, BookOpen, FileSearch, TrendingUp, Camera,
      Heart, Film, Youtube, Gamepad2, MessageSquare, Share2, Code, FileText, Languages, Upload, Table,
      Database, BarChart3, PenTool, Instagram, Linkedin, Facebook
    };
    return icons[iconName] || Bot;
  };

  const coreFeatures = [
    {
      icon: Upload,
      title: 'Upload Your Data',
      description: 'Our AI automatically processes and prepares your information for analysis'
    },
    {
      icon: Brain,
      title: 'AI Processes & Learns',
      description: 'AI analyzes patterns, identifies data, and learns from inputs to generate tasks'
    },
    {
      icon: Zap,
      title: 'Get Results Instantly',
      description: 'Receive structured outputs, actionable insights, or automated actions workflow'
    }
  ];

  const automationFeatures = [
    {
      icon: Bot,
      title: 'AI Workflow Builder',
      description: 'Drag-and-drop interface to create custom workflows'
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Real-time data and performance tracking'
    },
    {
      icon: Clock,
      title: '24/7 Automation',
      description: 'Runs in the background, even while you sleep'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      priceId: 'free',
      description: 'Perfect for individuals getting started',
      features: [
        '5 AI planning sessions per month',
        'Basic automation templates',
        'Email support',
        'Community access',
        'Free summarization tools'
      ],
      buttonText: 'Get Started Free',
      popular: false
    },
    {
      name: 'Premium',
      price: '$29',
      priceId: 'price_premium_monthly',
      description: 'Ideal for small businesses and teams',
      features: [
        'Unlimited AI planning sessions',
        'Advanced automation workflows',
        'Priority support',
        'Custom integrations',
        'Analytics dashboard',
        'All specialized services'
      ],
      buttonText: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      priceId: 'price_enterprise_monthly',
      description: 'Tailored solutions for large organizations',
      features: [
        'Custom AI model training',
        'Dedicated account manager',
        'White-label solutions',
        'Advanced security features',
        'SLA guarantees',
        'Custom integrations'
      ],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  const workflowSteps = [
    { id: 1, title: 'Data Input', icon: Upload, description: 'Upload documents, spreadsheets, or connect APIs', position: { x: 10, y: 20 } },
    { id: 2, title: 'AI Processing', icon: Brain, description: 'Machine learning algorithms analyze patterns', position: { x: 50, y: 10 } },
    { id: 3, title: 'Task Generation', icon: Settings, description: 'Automated workflows are created', position: { x: 80, y: 30 } },
    { id: 4, title: 'Execution', icon: Zap, description: 'Tasks run automatically in background', position: { x: 70, y: 70 } },
    { id: 5, title: 'Results', icon: Target, description: 'Insights and completed actions delivered', position: { x: 30, y: 80 } },
  ];

  const industries = [
    { icon: Building2, title: 'Enterprise', description: 'Streamline operations' },
    { icon: Factory, title: 'Manufacturing', description: 'Optimize production' },
    { icon: Briefcase, title: 'Consulting', description: 'Automate research' },
    { icon: TrendingUp, title: 'Finance', description: 'Investment analysis' },
  ];

  const handleGetStarted = () => {
    if (user) {
      window.location.href = '/dashboard';
    } else {
      setAuthModal({ isOpen: true, mode: 'signup' });
    }
  };

  const handlePlanSelect = (plan: any) => {
    if (plan.name === 'Free') {
      handleGetStarted();
    } else if (plan.name === 'Enterprise') {
      window.location.href = '#contact';
    } else {
      if (user) {
        setPaymentModal({ isOpen: true, plan });
      } else {
        setAuthModal({ isOpen: true, mode: 'signup' });
      }
    }
  };

  const renderServiceGrid = (services: any[], title: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => {
        const IconComponent = getIconComponent(service.icon);
        return (
          <div key={index} className="group relative bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:-translate-y-2">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-gray-300 leading-relaxed mb-4">{service.description}</p>
            {service.status && (
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                service.status === 'Free' ? 'bg-green-500/20 text-green-400' :
                service.status === 'Available' ? 'bg-blue-500/20 text-blue-400' :
                'bg-orange-500/20 text-orange-400'
              }`}>
                {service.status}
              </div>
            )}
            {service.category && (
              <div className="mt-2">
                <span className="text-purple-400 text-sm font-medium">{service.category}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Enhanced Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(236, 72, 153, 0.4); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.05) rotate(5deg); }
          70% { transform: scale(0.9) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes workflow-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes data-flow {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.6; }
        }

        @keyframes circuit-pulse {
          0%, 100% { stroke: rgba(168, 85, 247, 0.3); stroke-width: 1; }
          50% { stroke: rgba(168, 85, 247, 0.8); stroke-width: 2; }
        }

        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes scale-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-gradient { 
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-bounce-in { animation: bounce-in 1s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-workflow-pulse { animation: workflow-pulse 2s ease-in-out infinite; }
        .animate-data-flow { 
          stroke-dasharray: 10 5;
          animation: data-flow 3s ease-in-out infinite;
        }
        .animate-circuit-pulse { animation: circuit-pulse 2s ease-in-out infinite; }
        .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
        .animate-scale-pulse { animation: scale-pulse 4s ease-in-out infinite; }

        .tech-pattern {
          background-image: 
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .workflow-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md border-b border-purple-500/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 animate-bounce-in">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center animate-pulse-glow">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Automaatte
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors hover:scale-105 transform duration-200">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors hover:scale-105 transform duration-200">Pricing</a>
              <a href="#services" className="text-gray-300 hover:text-white transition-colors hover:scale-105 transform duration-200">Services</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors hover:scale-105 transform duration-200">Contact</a>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">Welcome, {user.email}</span>
                  <button
                    onClick={() => window.location.href = '/dashboard'}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setAuthModal({ isOpen: true, mode: 'signin' })}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleGetStarted}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 animate-pulse-glow"
                  >
                    Get Started Free
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 hover:scale-110 transform transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-purple-500/20 animate-slide-up">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-300 hover:text-white">Features</a>
              <a href="#pricing" className="block text-gray-300 hover:text-white">Pricing</a>
              <a href="#services" className="block text-gray-300 hover:text-white">Services</a>
              <a href="#contact" className="block text-gray-300 hover:text-white">Contact</a>
              {user ? (
                <div className="space-y-2">
                  <button
                    onClick={() => window.location.href = '/dashboard'}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-full"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-gray-300 hover:text-white py-2"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => setAuthModal({ isOpen: true, mode: 'signin' })}
                    className="w-full text-gray-300 hover:text-white py-2"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleGetStarted}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-full"
                  >
                    Get Started Free
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen flex items-center">
        {/* Professional Tech Background */}
        <div className="absolute inset-0">
          {/* Geometric Grid Pattern */}
          <div className="absolute inset-0 tech-pattern opacity-30"></div>
          
          {/* Floating Geometric Shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-purple-500/20 rounded-lg animate-rotate-slow"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-pink-500/20 rounded-full animate-float"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg animate-scale-pulse"></div>
          
          {/* Circuit Board Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(168, 85, 247, 0.5)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0.5)" />
              </linearGradient>
            </defs>
            <path d="M100,100 L300,100 L300,300 L500,300 L500,500 L700,500" 
                  stroke="url(#circuitGradient)" 
                  strokeWidth="2" 
                  fill="none" 
                  className="animate-circuit-pulse"/>
            <path d="M200,200 L400,200 L400,400 L600,400 L600,600 L800,600" 
                  stroke="url(#circuitGradient)" 
                  strokeWidth="2" 
                  fill="none" 
                  className="animate-circuit-pulse"
                  style={{animationDelay: '1s'}}/>
            <circle cx="300" cy="300" r="8" fill="rgba(168, 85, 247, 0.6)" className="animate-workflow-pulse"/>
            <circle cx="500" cy="500" r="8" fill="rgba(236, 72, 153, 0.6)" className="animate-workflow-pulse" style={{animationDelay: '0.5s'}}/>
          </svg>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-scale-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-float"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="mb-8">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
                  Say goodbye to manual
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                    tasks, Hello to AI
                  </span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed animate-slide-up" style={{'animationDelay': '0.2s'}}>
                  Automate repetitive tasks, analyze data instantly, and integrate with your favorite apps—so you can focus on what truly matters.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{'animationDelay': '0.4s'}}>
                <button 
                  onClick={handleGetStarted}
                  className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center animate-pulse-glow"
                >
                  <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button 
                  onClick={() => window.open('https://www.youtube.com/watch?v=demo', '_blank')}
                  className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </button>
              </div>

              {/* Marketing Stats */}
              <div className="grid grid-cols-2 gap-6 animate-slide-up" style={{'animationDelay': '0.6s'}}>
                <div className="text-left bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 group">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform duration-300">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">80%</div>
                  </div>
                  <div className="text-gray-400 text-sm">Time Saved on Repetitive Tasks</div>
                </div>
                <div className="text-left bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 group">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform duration-300">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">3x</div>
                  </div>
                  <div className="text-gray-400 text-sm">Faster Decision Making</div>
                </div>
              </div>

              {/* Industry Trust */}
              <div className="mt-12 animate-slide-up" style={{'animationDelay': '0.8s'}}>
                <p className="text-gray-400 mb-4">Trusted by forward-thinking businesses</p>
                <div className="flex items-center space-x-6 opacity-60">
                  {industries.map((industry, index) => (
                    <div key={index} className="flex items-center space-x-2 hover:opacity-100 transition-opacity duration-300">
                      <industry.icon className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-400 font-medium text-sm">{industry.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Workflow Automation Visualization */}
            <div className="relative workflow-container animate-slide-up" style={{'animationDelay': '1s'}}>
              {/* Main Workflow Container */}
              <div className="relative w-full h-96 bg-gradient-to-br from-slate-800/30 to-purple-900/20 backdrop-blur-sm rounded-3xl border border-purple-500/20 overflow-hidden">
                
                {/* Workflow Steps Visualization */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                  {/* Connection Lines between workflow steps */}
                  <defs>
                    <linearGradient id="workflowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
                      <stop offset="100%" stopColor="rgba(236, 72, 153, 0.8)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Workflow connections */}
                  <path d="M15,25 Q35,15 55,15 Q75,15 85,35" 
                        stroke="url(#workflowGradient)" 
                        strokeWidth="2" 
                        fill="none" 
                        className="animate-data-flow"/>
                  <path d="M85,35 Q85,55 75,75 Q65,85 45,85" 
                        stroke="url(#workflowGradient)" 
                        strokeWidth="2" 
                        fill="none" 
                        className="animate-data-flow"
                        style={{animationDelay: '1s'}}/>
                  <path d="M35,85 Q25,75 15,55 Q15,35 15,25" 
                        stroke="url(#workflowGradient)" 
                        strokeWidth="2" 
                        fill="none" 
                        className="animate-data-flow"
                        style={{animationDelay: '2s'}}/>
                </svg>

                {/* Workflow Step Nodes */}
                {workflowSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-workflow-pulse"
                    style={{
                      left: `${step.position.x}%`,
                      top: `${step.position.y}%`,
                      animationDelay: `${index * 0.5}s`
                    }}
                  >
                    <div className="relative group">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 text-xs text-white whitespace-nowrap border border-purple-500/30">
                          <div className="font-semibold">{step.title}</div>
                          <div className="text-gray-300 text-xs mt-1">{step.description}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Central AI Brain */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center animate-pulse-glow shadow-2xl">
                    <Brain className="w-8 h-8 text-white animate-pulse" />
                  </div>
                </div>

                {/* Floating Data Particles */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float opacity-60"
                    style={{
                      left: `${Math.random() * 90 + 5}%`,
                      top: `${Math.random() * 90 + 5}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  />
                ))}

                {/* Status Indicators */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-center text-xs text-purple-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>AI Active</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4" />
                      <span>Processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>Learning</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Process Cards */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-slate-800/80 to-purple-900/60 backdrop-blur-sm rounded-xl p-3 border border-purple-500/30 animate-float">
                <div className="flex items-center space-x-2">
                  <Workflow className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-white">Automation Active</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-slate-800/80 to-purple-900/60 backdrop-blur-sm rounded-xl p-3 border border-purple-500/30 animate-float" style={{'animationDelay': '1s'}}>
                <div className="flex items-center space-x-2">
                  <Gauge className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-white">80% Efficiency</span>
                </div>
              </div>

              <div className="absolute top-1/2 -right-8 bg-gradient-to-br from-slate-800/80 to-purple-900/60 backdrop-blur-sm rounded-xl p-3 border border-purple-500/30 animate-float" style={{'animationDelay': '2s'}}>
                <div className="flex items-center space-x-2">
                  <Rocket className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-white">3x Faster</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105 group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-300 italic max-w-2xl mx-auto">
              "AI unlocks efficiency—let automation do the work while you focus on what matters."
            </p>
          </div>
        </div>
      </section>

      {/* Automation Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Automate Your Business</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {automationFeatures.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already saving time and increasing productivity with AI automation.
            </p>
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/20">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse" style={{'animationDelay': '0.5s'}}>
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choose a plan that's priced just right.</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${plan.popular ? 'border-purple-400 scale-105' : 'border-purple-500/20 hover:border-purple-400/40'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-2">
                    {plan.price}
                    {plan.price !== 'Custom' && plan.price !== '$0' && <span className="text-lg text-gray-400">/month</span>}
                  </div>
                  <p className="text-gray-300 text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${plan.popular ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg' : 'border border-purple-500/50 text-purple-300 hover:bg-purple-500/10'}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Comprehensive AI Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From planning and research to specialized automation tools, we provide everything you need to transform your workflow with AI.
            </p>
          </div>

          {/* Service Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { key: 'planners', label: 'AI Planners', icon: Calendar },
              { key: 'researchers', label: 'AI Researchers', icon: Search },
              { key: 'specialized', label: 'Specialized Services', icon: Settings },
              { key: 'complimentary', label: 'Free Tools', icon: Gift }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveService(tab.key as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeService === tab.key
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-slate-800/50 text-gray-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Service Content */}
          <div className="space-y-16">
            {activeService === 'planners' && (
              <div>
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-white mb-4">AI Planners</h3>
                  <p className="text-gray-300 max-w-3xl mx-auto">
                    Research and planning are critical yet time-intensive activities across industries. Our AI-powered planners deliver seamless planning experiences across multiple domains.
                  </p>
                </div>
                {renderServiceGrid(aiPlanners, 'AI Planners')}
              </div>
            )}

            {activeService === 'researchers' && (
              <div>
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-white mb-4">AI Researchers</h3>
                  <p className="text-gray-300 max-w-3xl mx-auto">
                    Following research, effective planning becomes crucial. Our AI research tools provide data-driven insights that inform strategic decisions across sectors.
                  </p>
                </div>
                {renderServiceGrid(aiResearchers, 'AI Researchers')}
              </div>
            )}

            {activeService === 'specialized' && (
              <div>
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-white mb-4">Specialized Services</h3>
                  <p className="text-gray-300 max-w-3xl mx-auto">
                    Advanced AI tools and automation services designed for specific industries and use cases.
                  </p>
                </div>
                {renderServiceGrid(specializedServices, 'Specialized Services')}
                
                {/* Social Media Automation Subsection */}
                <div className="mt-16">
                  <h4 className="text-2xl font-bold text-white mb-8 text-center">Social Media Automation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {socialMediaServices.map((service, index) => {
                      const IconComponent = getIconComponent(service.icon);
                      return (
                        <div key={index} className="bg-gradient-to-br from-slate-800/30 to-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h5 className="text-lg font-semibold text-white mb-2">{service.title}</h5>
                          <p className="text-gray-300 text-sm">{service.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* IT Automation Subsection */}
                <div className="mt-16">
                  <h4 className="text-2xl font-bold text-white mb-8 text-center">IT Automation Services</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {itAutomationServices.map((service, index) => {
                      const IconComponent = getIconComponent(service.icon);
                      return (
                        <div key={index} className="bg-gradient-to-br from-slate-800/30 to-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h5 className="text-lg font-semibold text-white mb-2">{service.title}</h5>
                          <p className="text-gray-300 text-sm">{service.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeService === 'complimentary' && (
              <div>
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-white mb-4">Complimentary Services</h3>
                  <p className="text-gray-300 max-w-3xl mx-auto">
                    To enhance daily productivity, we offer these free utilities to support your research and planning needs.
                  </p>
                </div>
                {renderServiceGrid(complimentaryServices, 'Free Tools')}
              </div>
            )}
          </div>

          <div className="text-center mt-16">
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Explore All Services
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Get Started Today</h2>
              <p className="text-gray-300 mb-8">
                Ready to transform your business with AI automation? Contact our team to learn how Automaatte can help you save time and increase productivity.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-300">hello@automaatte.com</div>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Live Chat</div>
                    <div className="text-gray-300">Available 24/7 for support</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your interest! We will contact you soon.'); }}>
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors hover:border-purple-400/60"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors hover:border-purple-400/60"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Company name"
                    className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors hover:border-purple-400/60"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Tell us about your automation needs..."
                    rows={4}
                    className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors resize-none hover:border-purple-400/60"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                >
                  Get Started Free
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-purple-500/20 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Automaatte</span>
              </div>
              <p className="text-gray-400 mb-6">Transforming Tomorrow, Today</p>
              <p className="text-gray-500 text-sm">© 2025 Automaatte. All rights reserved.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Pricing</a></li>
                <li><a href="#services" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">AI Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Careers</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, mode: 'signin' })}
        mode={authModal.mode}
        onModeChange={(mode) => setAuthModal({ isOpen: true, mode })}
      />

      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, plan: null })}
        plan={paymentModal.plan}
      />
    </div>
  );
}

export default App;