import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  Globe, 
  Shield, 
  Rocket,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Award,
  Lightbulb,
  Settings,
  BarChart3,
  FileText,
  MessageSquare,
  Code,
  Database,
  Cpu,
  Network,
  Search,
  MapPin,
  GraduationCap,
  DollarSign,
  Video,
  Calendar,
  Plane,
  BookOpen,
  CreditCard,
  TrendingDown,
  Camera,
  Umbrella,
  Play,
  Upload,
  Download,
  Copy,
  RefreshCw,
  Send,
  Eye,
  Heart,
  Bookmark,
  X,
  Loader2,
  Crown
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { useAuthContext } from '../../contexts/AuthContext';
import { aiService } from '../../lib/aiService';

export const CoreServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const [activeService, setActiveService] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<{ [key: string]: string }>({});

  const [activeTab, setActiveTab] = useState<'researchers' | 'planners'>('researchers');

  const aiResearchers = [
    {
      id: 'vacation-researching',
      icon: MapPin,
      title: "Vacation Researching",
      description: "Essential insights for individual and corporate travel planning with comprehensive destination analysis.",
      features: ["Destination Analysis", "Budget Research", "Activity Options", "Weather Patterns", "Cultural Insights", "Safety Information"],
      inputPlaceholder: "What vacation are you researching? (e.g., 7-day trip to Japan, family vacation to Europe)...",
      buttonText: "Research Vacation",
      color: "from-blue-500 to-cyan-500",
      category: "AI Researchers"
    },
    {
      id: 'education-researching',
      icon: GraduationCap,
      title: "Education Researching",
      description: "Data-driven recommendations for student career choices with comprehensive educational pathway analysis.",
      features: ["Course Research", "Institution Analysis", "Career Prospects", "Cost Analysis", "Admission Requirements", "Scholarship Options"],
      inputPlaceholder: "What education path are you researching? (e.g., Computer Science degree, MBA programs)...",
      buttonText: "Research Education",
      color: "from-purple-500 to-pink-500",
      category: "AI Researchers"
    },
    {
      id: 'insurance-researching',
      icon: Shield,
      title: "Insurance Researching",
      description: "Comprehensive insights into medical and vehicle insurance options with detailed coverage analysis.",
      features: ["Policy Comparison", "Coverage Analysis", "Premium Research", "Provider Reviews", "Claim Process", "Benefits Assessment"],
      inputPlaceholder: "What insurance are you researching? (e.g., health insurance for family, car insurance)...",
      buttonText: "Research Insurance",
      color: "from-green-500 to-emerald-500",
      category: "AI Researchers"
    },
    {
      id: 'investment-researching',
      icon: TrendingUp,
      title: "Investment Researching",
      description: "In-depth data for crypto and stock market investments with comprehensive market analysis.",
      features: ["Market Analysis", "Risk Assessment", "Performance History", "Investment Options", "Portfolio Research", "Trend Analysis"],
      inputPlaceholder: "What investments are you researching? (e.g., cryptocurrency, tech stocks, mutual funds)...",
      buttonText: "Research Investments",
      color: "from-orange-500 to-red-500",
      category: "AI Researchers"
    },
    {
      id: 'video-shoot-researching',
      icon: Video,
      title: "Video Shoot Researching",
      description: "Tailored content strategies for film, advertising, and social media with comprehensive production insights.",
      features: ["Content Strategy", "Production Research", "Equipment Analysis", "Location Scouting", "Budget Planning", "Trend Analysis"],
      inputPlaceholder: "What video project are you researching? (e.g., YouTube channel, commercial shoot)...",
      buttonText: "Research Video Shoot",
      color: "from-indigo-500 to-purple-500",
      category: "AI Researchers"
    },
    {
      id: 'general-researching',
      icon: Search,
      title: "General Researching",
      description: "Research for any other general purpose with comprehensive data analysis and insights.",
      features: ["Custom Research", "Data Analysis", "Market Insights", "Trend Research", "Competitive Analysis", "Detailed Reports"],
      inputPlaceholder: "What would you like to research? (e.g., market trends, product analysis, industry insights)...",
      buttonText: "Start Research",
      color: "from-pink-500 to-rose-500",
      category: "AI Researchers"
    }
  ];

  const aiPlanners = [
    {
      id: 'vacation-planning',
      icon: Calendar,
      title: "Vacation Planning",
      description: "Personalized itineraries for individual travelers and corporate retreats in the Tourism industry.",
      features: ["Custom Itineraries", "Booking Assistance", "Activity Scheduling", "Budget Management", "Travel Coordination", "Emergency Planning"],
      inputPlaceholder: "Describe your vacation plans (e.g., 10-day Europe trip, corporate retreat for 50 people)...",
      buttonText: "Plan Vacation",
      color: "from-blue-500 to-cyan-500",
      category: "AI Planners"
    },
    {
      id: 'education-planning',
      icon: BookOpen,
      title: "Education Planning",
      description: "Career pathway guidance tailored to students after 10th and 12th grades, empowering the next generation in EdTech.",
      features: ["Career Pathways", "Course Selection", "Timeline Planning", "Application Strategy", "Skill Development", "Goal Setting"],
      inputPlaceholder: "Describe your education goals (e.g., planning after 12th grade, career change strategy)...",
      buttonText: "Plan Education",
      color: "from-purple-500 to-pink-500",
      category: "AI Planners"
    },
    {
      id: 'insurance-planning',
      icon: Umbrella,
      title: "Insurance Planning",
      description: "Clear, informed decision-making support for medical and vehicle insurance in the Banking sector.",
      features: ["Coverage Planning", "Premium Optimization", "Policy Selection", "Claim Strategy", "Risk Management", "Family Protection"],
      inputPlaceholder: "Describe your insurance needs (e.g., family health coverage, comprehensive car insurance)...",
      buttonText: "Plan Insurance",
      color: "from-green-500 to-emerald-500",
      category: "AI Planners"
    },
    {
      id: 'money-investment-planning',
      icon: DollarSign,
      title: "Money Investment Planning",
      description: "Actionable insights into crypto and stock markets, unlocking smarter investment strategies in FinTech.",
      features: ["Portfolio Planning", "Risk Management", "Investment Strategy", "Diversification", "Goal-based Planning", "Timeline Management"],
      inputPlaceholder: "Describe your investment goals (e.g., retirement planning, wealth building, short-term gains)...",
      buttonText: "Plan Investments",
      color: "from-orange-500 to-red-500",
      category: "AI Planners"
    },
    {
      id: 'video-shoot-planning',
      icon: Camera,
      title: "Video Shoot Planning",
      description: "Thoughtful, customized shoot plans for short films, ads, and YouTube content in AdTech and Social Media.",
      features: ["Production Planning", "Resource Allocation", "Timeline Management", "Budget Planning", "Team Coordination", "Equipment Planning"],
      inputPlaceholder: "Describe your video project (e.g., YouTube series, commercial campaign, short film)...",
      buttonText: "Plan Video Shoot",
      color: "from-indigo-500 to-purple-500",
      category: "AI Planners"
    },
    {
      id: 'general-planning',
      icon: Target,
      title: "General Planning",
      description: "Customized plans for any other general purpose with comprehensive strategy and execution guidance.",
      features: ["Custom Planning", "Strategy Development", "Timeline Creation", "Resource Planning", "Goal Setting", "Progress Tracking"],
      inputPlaceholder: "Describe what you need to plan (e.g., business launch, event organization, project management)...",
      buttonText: "Create Plan",
      color: "from-pink-500 to-rose-500",
      category: "AI Planners"
    }
  ];

  const currentServices = activeTab === 'researchers' ? aiResearchers : aiPlanners;

  const handleServiceAction = async (serviceId: string, input: string) => {
    if (!isAuthenticated) {
      navigate('/auth/signin');
      return;
    }

    setLoading(serviceId);

    try {
      // Get user tier for AI service
      const userTier = user?.user_type === 'admin' ? 'special' :
                      user?.user_type === 'paid' ? 'core' : 'free';

      // Call the appropriate AI service based on service ID
      let response;

      if (serviceId.includes('researching') || serviceId.includes('research')) {
        // AI Researchers
        if (serviceId.includes('vacation')) {
          response = await aiService.vacationResearch(input, userTier);
        } else if (serviceId.includes('education')) {
          response = await aiService.educationResearch(input, userTier);
        } else if (serviceId.includes('insurance')) {
          response = await aiService.insuranceResearch(input, userTier);
        } else if (serviceId.includes('investment')) {
          response = await aiService.investmentResearch(input, userTier);
        } else if (serviceId.includes('video')) {
          response = await aiService.videoShootResearch(input, userTier);
        } else {
          response = await aiService.generalResearch(input, userTier);
        }
      } else {
        // AI Planners
        if (serviceId.includes('vacation')) {
          response = await aiService.vacationPlanning(input, userTier);
        } else if (serviceId.includes('education')) {
          response = await aiService.educationPlanning(input, userTier);
        } else if (serviceId.includes('insurance')) {
          response = await aiService.insurancePlanning(input, userTier);
        } else if (serviceId.includes('investment') || serviceId.includes('money')) {
          response = await aiService.investmentPlanning(input, userTier);
        } else if (serviceId.includes('video')) {
          response = await aiService.videoShootPlanning(input, userTier);
        } else {
          response = await aiService.generalPlanning(input, userTier);
        }
      }

      if (response.success && response.data) {
        // Format the AI response for display
        let formattedResult = '';

        if (typeof response.data === 'string') {
          formattedResult = response.data;
        } else if (response.data.vacation_plan || response.data.education_plan || response.data.insurance_plan || response.data.investment_plan || response.data.production_plan || response.data.strategic_plan) {
          // Planning response
          const planKey = Object.keys(response.data).find(key => key.includes('_plan'));
          formattedResult = response.data[planKey] || JSON.stringify(response.data, null, 2);
        } else if (response.data.destination_analysis || response.data.education_analysis || response.data.insurance_analysis || response.data.investment_analysis || response.data.video_analysis || response.data.research_analysis) {
          // Research response
          const analysisKey = Object.keys(response.data).find(key => key.includes('_analysis'));
          formattedResult = response.data[analysisKey] || JSON.stringify(response.data, null, 2);
        } else {
          // Fallback to JSON display
          formattedResult = JSON.stringify(response.data, null, 2);
        }

        // Add processing info
        const processingInfo = `\n\n---\n**Processing Info:**\n• Response time: ${response.processing_time.toFixed(2)}s\n• Cached: ${response.cached ? 'Yes' : 'No'}\n• Timestamp: ${new Date(response.timestamp).toLocaleString()}`;

        setResults(prev => ({
          ...prev,
          [serviceId]: formattedResult + processingInfo
        }));
      } else {
        // Handle error response
        setResults(prev => ({
          ...prev,
          [serviceId]: `❌ **Service Error:**\n\n${response.error || 'Unknown error occurred'}\n\nPlease try again or contact support if the issue persists.`
        }));
      }
    } catch (error) {
      console.error('AI Service error:', error);
      setResults(prev => ({
        ...prev,
        [serviceId]: `❌ **Connection Error:**\n\nFailed to connect to AI services. Please check your internet connection and try again.\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`
      }));
    } finally {
      setLoading(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
            Core AI Services
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            AI <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Researchers</span> & <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Planners</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Intelligent AI-driven research and planning solutions. Research any topic with our AI Researchers, then create actionable plans with our AI Planners.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-400" />
              <span>AI Researchers</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              <span>AI Planners</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-green-400" />
              <span>Standalone & Combined</span>
            </div>
          </div>

          {/* Service Type Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700">
              <button
                onClick={() => setActiveTab('researchers')}
                className={`px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTab === 'researchers'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Search className="w-4 h-4 mr-2 inline" />
                AI Researchers
              </button>
              <button
                onClick={() => setActiveTab('planners')}
                className={`px-6 py-3 rounded-md transition-all duration-300 ${
                  activeTab === 'planners'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Target className="w-4 h-4 mr-2 inline" />
                AI Planners
              </button>
            </div>
          </div>
        </motion.div>

        {/* Information Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6 mb-12"
        >
          <div className="flex items-start gap-4">
            <Brain className="w-6 h-6 text-blue-400 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">How Core Services Work</h3>
              <p className="text-gray-300 mb-3">
                Our AI Researchers and AI Planners are standalone services that work independently or together:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                <div>
                  <strong className="text-purple-300">Use Independently:</strong> Research any topic or create plans directly with your own information.
                </div>
                <div>
                  <strong className="text-blue-300">Use Together:</strong> Research first, then use those insights to create detailed, data-driven plans.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 h-full">
                <CardHeader>
                  <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                    <service.icon className="w-6 h-6 text-white" />
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
                      <span className="text-gray-400">Service Type</span>
                      <span className="text-purple-300 font-semibold">{service.category}</span>
                    </div>

                    <Button
                      onClick={() => setActiveService(service.id)}
                      className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity`}
                    >
                      {activeTab === 'researchers' ? (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Start Research
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4 mr-2" />
                          Create Plan
                        </>
                      )}
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
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <ServiceModal
                  service={[...aiResearchers, ...aiPlanners].find(s => s.id === activeService)!}
                  onClose={() => setActiveService(null)}
                  onSubmit={handleServiceAction}
                  loading={loading === activeService}
                  result={results[activeService]}
                  onCopy={copyToClipboard}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Service Modal Component
interface ServiceModalProps {
  service: {
    id: string;
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    features: string[];
    inputPlaceholder: string;
    buttonText: string;
    color: string;
    category: string;
  };
  onClose: () => void;
  onSubmit: (serviceId: string, input: string) => void;
  loading: boolean;
  result?: string;
  onCopy: (text: string) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onSubmit,
  loading,
  result,
  onCopy
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(service.id, input);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center`}>
            <service.icon className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">{service.title}</h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <p className="text-gray-300 mb-6">{service.description}</p>

      <div className="space-y-4">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={service.inputPlaceholder}
          rows={6}
          className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
        />

        <Button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Researching...
            </>
          ) : (
            <>
              <service.icon className="w-4 h-4 mr-2" />
              {service.buttonText}
            </>
          )}
        </Button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Research Results</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onCopy(result)}
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setInput('')}
                  className="border-slate-600 text-white hover:bg-slate-700"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="text-gray-300 whitespace-pre-wrap font-mono text-sm bg-slate-800/50 p-3 rounded border">
              {result}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
