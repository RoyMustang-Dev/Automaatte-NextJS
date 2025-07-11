import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Zap,
  Brain,
  Cpu,
  Database,
  Globe,
  Shield,
  Rocket,
  Target,
  TrendingUp,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  Star,
  Crown,
  Sparkles,
  ArrowRight,
  Play,
  Lock,
  Unlock,
  CreditCard,
  Gift,
  Award,
  Lightbulb,
  Settings,
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
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { useAuthContext } from '../../contexts/AuthContext';

export const PaidServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const [activeService, setActiveService] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'enterprise'>('pro');

  const paidServices = [
    {
      id: 'advanced-automation',
      icon: Rocket,
      title: "Advanced Automation Suite",
      description: "Complete workflow automation with AI-powered decision making and multi-step processes.",
      features: ["Multi-step workflows", "AI decision trees", "API integrations", "Custom triggers", "Real-time monitoring"],
      pricing: { pro: 49, enterprise: 149 },
      color: "from-blue-500 to-cyan-500",
      category: "Automation"
    },
    {
      id: 'ai-analytics',
      icon: BarChart3,
      title: "AI Analytics & Insights",
      description: "Deep data analysis with predictive modeling and automated reporting.",
      features: ["Predictive analytics", "Custom dashboards", "Automated reports", "Data visualization", "ML insights"],
      pricing: { pro: 79, enterprise: 199 },
      color: "from-purple-500 to-pink-500",
      category: "Analytics"
    },
    {
      id: 'enterprise-chatbot',
      icon: Bot,
      title: "Enterprise Chatbot",
      description: "Intelligent conversational AI for customer support and internal operations.",
      features: ["Natural language processing", "Multi-language support", "Integration ready", "Custom training", "24/7 availability"],
      pricing: { pro: 99, enterprise: 299 },
      color: "from-green-500 to-emerald-500",
      category: "AI Assistant"
    },
    {
      id: 'document-intelligence',
      icon: FileText,
      title: "Document Intelligence",
      description: "Extract, analyze, and process documents with advanced AI understanding.",
      features: ["OCR & text extraction", "Document classification", "Data extraction", "Compliance checking", "Batch processing"],
      pricing: { pro: 59, enterprise: 179 },
      color: "from-orange-500 to-red-500",
      category: "Document Processing"
    },
    {
      id: 'vision-ai',
      icon: Image,
      title: "Computer Vision AI",
      description: "Advanced image and video analysis for quality control and monitoring.",
      features: ["Object detection", "Quality inspection", "Facial recognition", "Video analytics", "Real-time processing"],
      pricing: { pro: 89, enterprise: 249 },
      color: "from-indigo-500 to-purple-500",
      category: "Computer Vision"
    },
    {
      id: 'workflow-orchestrator',
      icon: Settings,
      title: "Workflow Orchestrator",
      description: "Enterprise-grade workflow management with advanced scheduling and monitoring.",
      features: ["Visual workflow builder", "Advanced scheduling", "Error handling", "Performance monitoring", "Team collaboration"],
      pricing: { pro: 69, enterprise: 189 },
      color: "from-pink-500 to-rose-500",
      category: "Workflow Management"
    }
  ];

  const plans = [
    {
      id: 'pro',
      name: 'Professional',
      description: 'Perfect for growing businesses',
      features: [
        'Up to 10,000 API calls/month',
        'Standard support',
        'Basic integrations',
        'Email notifications',
        'Standard SLA'
      ],
      highlight: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large-scale operations',
      features: [
        'Unlimited API calls',
        'Priority support',
        'Custom integrations',
        'Advanced monitoring',
        'Custom SLA',
        'Dedicated account manager'
      ],
      highlight: true
    }
  ];

  const handleServiceAction = (serviceId: string) => {
    if (!isAuthenticated) {
      navigate('/auth/signin');
      return;
    }
    setActiveService(serviceId);
  };

  const handleUpgrade = (serviceId: string, plan: string) => {
    // Simulate payment flow
    console.log(`Upgrading to ${plan} plan for ${serviceId}`);
    // In real app, integrate with payment processor
    alert(`Redirecting to payment for ${plan} plan...`);
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6">
            <Crown className="w-4 h-4" />
            Premium AI Services
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Professional <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">AI Solutions</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Unlock the full potential of AI automation with our premium services. Enterprise-grade solutions for serious businesses.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>High Performance</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span>24/7 Support</span>
            </div>
          </div>
        </motion.div>

        {/* Plan Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id as 'pro' | 'enterprise')}
                className={`px-6 py-3 rounded-md transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {plan.name}
                {plan.highlight && <Crown className="w-4 h-4 ml-2 inline" />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paidServices.map((service, index) => (
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
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
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
                  
                  <div className="pt-4 border-t border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-400">Starting at</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-white">
                          ${service.pricing[selectedPlan]}
                        </span>
                        <span className="text-gray-400 text-sm">/month</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleServiceAction(service.id)}
                      className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity`}
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Service Modal */}
        <AnimatePresence>
          {activeService && (
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
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                <PaidServiceModal
                  service={paidServices.find(s => s.id === activeService)!}
                  selectedPlan={selectedPlan}
                  onClose={() => setActiveService(null)}
                  onUpgrade={handleUpgrade}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Paid Service Modal Component
interface PaidServiceModalProps {
  service: {
    id: string;
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    features: string[];
    pricing: { pro: number; enterprise: number };
    color: string;
    category: string;
  };
  selectedPlan: 'pro' | 'enterprise';
  onClose: () => void;
  onUpgrade: (serviceId: string, plan: string) => void;
}

const PaidServiceModal: React.FC<PaidServiceModalProps> = ({
  service,
  selectedPlan,
  onClose,
  onUpgrade
}) => {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    setTimeout(() => {
      onUpgrade(service.id, selectedPlan);
      setLoading(false);
    }, 1000);
  };

  const planFeatures = {
    pro: [
      'Up to 10,000 API calls/month',
      'Standard support (24h response)',
      'Basic integrations',
      'Email notifications',
      'Standard SLA (99.5% uptime)'
    ],
    enterprise: [
      'Unlimited API calls',
      'Priority support (2h response)',
      'Custom integrations',
      'Advanced monitoring & alerts',
      'Custom SLA (99.9% uptime)',
      'Dedicated account manager',
      'White-label options',
      'Custom deployment'
    ]
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center`}>
            <service.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{service.title}</h2>
            <span className="text-sm px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
              {service.category}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <p className="text-gray-300 mb-8">{service.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Service Features */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Service Features</h3>
          <div className="space-y-3">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Plan Features */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            {selectedPlan === 'pro' ? 'Professional' : 'Enterprise'} Plan
          </h3>
          <div className="space-y-3">
            {planFeatures[selectedPlan].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-300">
                <Star className="w-4 h-4 text-purple-400" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-slate-700/30 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-xl font-bold text-white">
              {selectedPlan === 'pro' ? 'Professional' : 'Enterprise'} Plan
            </h4>
            <p className="text-gray-400">
              {selectedPlan === 'pro' ? 'Perfect for growing businesses' : 'For large-scale operations'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">
              ${service.pricing[selectedPlan]}
            </div>
            <div className="text-gray-400">per month</div>
          </div>
        </div>

        <Button
          onClick={handleUpgrade}
          disabled={loading}
          className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Subscribe to {selectedPlan === 'pro' ? 'Professional' : 'Enterprise'}
            </>
          )}
        </Button>
      </div>

      {/* Additional Info */}
      <div className="text-center text-sm text-gray-400">
        <p>✓ 14-day free trial • ✓ Cancel anytime • ✓ No setup fees</p>
      </div>
    </div>
  );
};
