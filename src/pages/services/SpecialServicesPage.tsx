import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Crown, 
  Star, 
  Zap, 
  Target, 
  Award, 
  Rocket, 
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Globe,
  TrendingUp,
  Brain,
  Lightbulb,
  Settings,
  BarChart3,
  FileText,
  MessageSquare,
  Code,
  Database,
  Cpu,
  Network,
  Building2,
  Phone,
  Video,
  Briefcase,
  Layers,
  GitBranch,
  Monitor,
  Smartphone,
  Tablet,
  Workflow,
  Package,
  Cloud,
  HardDrive,
  Wifi,
  Activity,
  X,
  Copy,
  Download,
  Share2,
  Loader2,
  Bot,
  Wand2,
  Image,
  Calendar,
  Mail
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { useAuthContext } from '../../contexts/AuthContext';

export const SpecialServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const [activeService, setActiveService] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    service: ''
  });

  const specialServices = [
    {
      id: 'custom-ai-chatbots',
      icon: Bot,
      title: "Custom AI Chatbots",
      description: "Intelligent conversational AI tailored to your business needs with advanced NLP and context understanding.",
      features: [
        "Natural language processing",
        "Multi-language support", 
        "Integration ready",
        "Custom training",
        "24/7 availability",
        "Advanced analytics"
      ],
      pricing: "Starting at $5,000",
      timeline: "4-6 weeks",
      color: "from-blue-500 to-cyan-500",
      category: "AI Development"
    },
    {
      id: 'workflow-automation',
      icon: Workflow,
      title: "Advanced Workflow Automation",
      description: "End-to-end business process automation with AI-powered decision making and intelligent routing.",
      features: [
        "Process mapping & optimization",
        "AI decision trees",
        "Multi-system integration",
        "Real-time monitoring",
        "Error handling & recovery",
        "Performance analytics"
      ],
      pricing: "Starting at $10,000",
      timeline: "6-8 weeks",
      color: "from-purple-500 to-pink-500",
      category: "Automation"
    },
    {
      id: 'ai-content-creation',
      icon: Wand2,
      title: "AI Content Creation Suite",
      description: "Comprehensive content generation platform for marketing, documentation, and creative projects.",
      features: [
        "Multi-format content generation",
        "Brand voice customization",
        "SEO optimization",
        "Content planning & scheduling",
        "Performance tracking",
        "Team collaboration tools"
      ],
      pricing: "Starting at $3,000",
      timeline: "3-4 weeks",
      color: "from-green-500 to-emerald-500",
      category: "Content Creation"
    },
    {
      id: 'computer-vision-solutions',
      icon: Image,
      title: "Computer Vision Solutions",
      description: "Advanced image and video analysis for quality control, security, and business intelligence.",
      features: [
        "Object detection & recognition",
        "Quality inspection automation",
        "Real-time video analysis",
        "Custom model training",
        "Edge deployment options",
        "API integration"
      ],
      pricing: "Starting at $15,000",
      timeline: "8-12 weeks",
      color: "from-orange-500 to-red-500",
      category: "Computer Vision"
    },
    {
      id: 'predictive-analytics',
      icon: BarChart3,
      title: "Predictive Analytics Platform",
      description: "Machine learning-powered forecasting and trend analysis for data-driven decision making.",
      features: [
        "Custom ML model development",
        "Real-time data processing",
        "Interactive dashboards",
        "Automated reporting",
        "Risk assessment tools",
        "Integration with existing systems"
      ],
      pricing: "Starting at $12,000",
      timeline: "6-10 weeks",
      color: "from-indigo-500 to-purple-500",
      category: "Analytics"
    },
    {
      id: 'ai-consulting-strategy',
      icon: Briefcase,
      title: "AI Strategy & Implementation",
      description: "Comprehensive AI transformation consulting with roadmap development and implementation support.",
      features: [
        "AI readiness assessment",
        "Strategic roadmap development",
        "Technology stack selection",
        "Implementation planning",
        "Change management support",
        "ROI optimization"
      ],
      pricing: "Starting at $8,000",
      timeline: "4-8 weeks",
      color: "from-pink-500 to-rose-500",
      category: "Consulting"
    }
  ];

  const handleServiceInquiry = (serviceId: string) => {
    if (!isAuthenticated) {
      navigate('/auth/signin');
      return;
    }
    setContactForm(prev => ({ ...prev, service: serviceId }));
    setActiveService('contact');
  };

  const handleContactSubmit = () => {
    // Simulate form submission
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for your inquiry! Our special services team will contact you within 24 hours.');
    setActiveService(null);
    setContactForm({ name: '', email: '', company: '', message: '', service: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Special AI Services
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Special <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">AI Solutions</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Cutting-edge AI solutions designed for unique business challenges. Custom development and specialized implementations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span>Premium Solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" />
              <span>Custom Development</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Expert Support</span>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {specialServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full">
                      {service.category}
                    </span>
                  </div>
                  <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                  <p className="text-gray-300">{service.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Investment</span>
                      <span className="text-white font-semibold">{service.pricing}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Timeline</span>
                      <span className="text-white font-semibold">{service.timeline}</span>
                    </div>
                    
                    <Button
                      onClick={() => handleServiceInquiry(service.id)}
                      className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity`}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Request Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Modal */}
        <AnimatePresence>
          {activeService === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <SpecialServiceContactModal
                  selectedService={contactForm.service}
                  services={specialServices}
                  contactForm={contactForm}
                  setContactForm={setContactForm}
                  onClose={() => setActiveService(null)}
                  onSubmit={handleContactSubmit}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Special Service Contact Modal Component
interface SpecialServiceContactModalProps {
  selectedService: string;
  services: any[];
  contactForm: any;
  setContactForm: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
  onSubmit: () => void;
}

const SpecialServiceContactModal: React.FC<SpecialServiceContactModalProps> = ({
  selectedService,
  services,
  contactForm,
  setContactForm,
  onClose,
  onSubmit
}) => {
  const [loading, setLoading] = useState(false);
  const selectedServiceData = services.find(s => s.id === selectedService);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      onSubmit();
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-yellow-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">Special Service Inquiry</h2>
            <p className="text-gray-400">Let's discuss your custom AI solution</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {selectedServiceData && (
        <div className="mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 bg-gradient-to-r ${selectedServiceData.color} rounded-lg flex items-center justify-center`}>
              <selectedServiceData.icon className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">{selectedServiceData.title}</h3>
          </div>
          <p className="text-gray-300 text-sm mb-2">{selectedServiceData.description}</p>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>Investment: {selectedServiceData.pricing}</span>
            <span>Timeline: {selectedServiceData.timeline}</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <Input
              value={contactForm.name}
              onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your full name"
              className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <Input
              type="email"
              value={contactForm.email}
              onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your.email@company.com"
              className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Company Name
          </label>
          <Input
            value={contactForm.company}
            onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
            placeholder="Your company name (optional)"
            className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Details *
          </label>
          <Textarea
            value={contactForm.message}
            onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Tell us about your project requirements, goals, and any specific features you need..."
            rows={6}
            className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading || !contactForm.name || !contactForm.email || !contactForm.message}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 transition-opacity"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Request...
            </>
          ) : (
            <>
              <Phone className="w-4 h-4 mr-2" />
              Request Special Service Quote
            </>
          )}
        </Button>

        <div className="text-center text-sm text-gray-400">
          <p>Our special services team will contact you within 24 hours</p>
        </div>
      </div>
    </div>
  );
};
