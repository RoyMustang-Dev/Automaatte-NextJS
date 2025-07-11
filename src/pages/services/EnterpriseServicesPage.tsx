import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  Lock, 
  Cpu, 
  Database,
  ArrowRight,
  CheckCircle,
  Star,
  Crown,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  Settings,
  Headphones,
  Clock,
  Rocket,
  Brain,
  Network,
  Server,
  Code,
  FileText,
  MessageSquare,
  Image,
  Mail,
  Calendar,
  Bot,
  Wand2,
  X,
  Copy,
  Download,
  Share2,
  Loader2,
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
  Activity
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { useAuthContext } from '../../contexts/AuthContext';

export const EnterpriseServicesPage: React.FC = () => {
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

  const enterpriseServices = [
    {
      id: 'custom-ai-platform',
      icon: Brain,
      title: "Custom AI Platform Development",
      description: "Build bespoke AI solutions tailored to your specific business needs and industry requirements.",
      features: [
        "Custom AI model development",
        "Industry-specific training data",
        "Proprietary algorithm design",
        "Full source code ownership",
        "Ongoing model optimization",
        "Performance monitoring & analytics"
      ],
      pricing: "Custom Quote",
      timeline: "3-6 months",
      color: "from-blue-500 to-cyan-500",
      category: "AI Development"
    },
    {
      id: 'enterprise-integration',
      icon: Network,
      title: "Enterprise System Integration",
      description: "Seamlessly integrate AI capabilities into your existing enterprise infrastructure and workflows.",
      features: [
        "Legacy system integration",
        "API development & management",
        "Data pipeline automation",
        "Real-time synchronization",
        "Security compliance",
        "Scalable architecture design"
      ],
      pricing: "Starting at $50k",
      timeline: "2-4 months",
      color: "from-purple-500 to-pink-500",
      category: "Integration"
    },
    {
      id: 'ai-infrastructure',
      icon: Server,
      title: "AI Infrastructure & Cloud",
      description: "Deploy and manage enterprise-grade AI infrastructure with high availability and security.",
      features: [
        "Cloud-native deployment",
        "Auto-scaling capabilities",
        "Multi-region redundancy",
        "Advanced security protocols",
        "Performance optimization",
        "24/7 monitoring & support"
      ],
      pricing: "Starting at $25k/month",
      timeline: "1-2 months",
      color: "from-green-500 to-emerald-500",
      category: "Infrastructure"
    },
    {
      id: 'data-analytics-platform',
      icon: BarChart3,
      title: "Enterprise Data Analytics",
      description: "Transform your data into actionable insights with advanced analytics and machine learning.",
      features: [
        "Real-time data processing",
        "Predictive analytics models",
        "Custom dashboard development",
        "Automated reporting systems",
        "Data governance & compliance",
        "Advanced visualization tools"
      ],
      pricing: "Starting at $75k",
      timeline: "4-8 months",
      color: "from-orange-500 to-red-500",
      category: "Analytics"
    },
    {
      id: 'ai-consulting',
      icon: Briefcase,
      title: "AI Strategy & Consulting",
      description: "Strategic guidance and roadmap development for AI transformation across your organization.",
      features: [
        "AI readiness assessment",
        "Strategic roadmap development",
        "Technology stack recommendations",
        "ROI analysis & projections",
        "Change management support",
        "Executive training programs"
      ],
      pricing: "Starting at $15k",
      timeline: "1-3 months",
      color: "from-indigo-500 to-purple-500",
      category: "Consulting"
    },
    {
      id: 'managed-ai-services',
      icon: Settings,
      title: "Managed AI Services",
      description: "Complete AI operations management with dedicated support and continuous optimization.",
      features: [
        "Dedicated AI operations team",
        "Proactive monitoring & maintenance",
        "Performance optimization",
        "Security updates & patches",
        "Capacity planning & scaling",
        "SLA-backed service guarantees"
      ],
      pricing: "Starting at $10k/month",
      timeline: "Ongoing",
      color: "from-pink-500 to-rose-500",
      category: "Managed Services"
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
    alert('Thank you for your inquiry! Our enterprise team will contact you within 24 hours.');
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            Enterprise Solutions
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Enterprise <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Solutions</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transform your enterprise with custom AI solutions. From strategy to implementation, we deliver enterprise-grade AI that scales with your business.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>Dedicated Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-400" />
              <span>Custom Solutions</span>
            </div>
          </div>
        </motion.div>

        {/* Enterprise Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <Card className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-sm border-blue-500/20 text-center">
            <CardContent className="p-6">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise Security</h3>
              <p className="text-gray-300">SOC 2 compliant with advanced encryption and security protocols</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 text-center">
            <CardContent className="p-6">
              <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">High Performance</h3>
              <p className="text-gray-300">Optimized for enterprise workloads with 99.9% uptime SLA</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/50 to-green-900/30 backdrop-blur-sm border-green-500/20 text-center">
            <CardContent className="p-6">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Dedicated Support</h3>
              <p className="text-gray-300">24/7 support with dedicated account management</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {enterpriseServices.map((service, index) => (
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
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">
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
                      Request Consultation
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
                <EnterpriseContactModal
                  selectedService={contactForm.service}
                  services={enterpriseServices}
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

// Enterprise Contact Modal Component
interface EnterpriseContactModalProps {
  selectedService: string;
  services: any[];
  contactForm: any;
  setContactForm: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
  onSubmit: () => void;
}

const EnterpriseContactModal: React.FC<EnterpriseContactModalProps> = ({
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
          <Building2 className="w-8 h-8 text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">Enterprise Consultation</h2>
            <p className="text-gray-400">Let's discuss your AI transformation</p>
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
          <p className="text-gray-300 text-sm">{selectedServiceData.description}</p>
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
            Company Name *
          </label>
          <Input
            value={contactForm.company}
            onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
            placeholder="Your company name"
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
            placeholder="Tell us about your project requirements, timeline, and goals..."
            rows={6}
            className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading || !contactForm.name || !contactForm.email || !contactForm.company || !contactForm.message}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-opacity"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending Request...
            </>
          ) : (
            <>
              <Phone className="w-4 h-4 mr-2" />
              Request Enterprise Consultation
            </>
          )}
        </Button>

        <div className="text-center text-sm text-gray-400">
          <p>Our enterprise team will contact you within 24 hours</p>
        </div>
      </div>
    </div>
  );
};
