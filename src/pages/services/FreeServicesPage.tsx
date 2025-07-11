import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText,
  MessageSquare,
  Languages,
  Image,
  Code,
  Mail,
  Calculator,
  Bot,
  Wand2,
  Play,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Gift,
  Upload,
  Download,
  Sparkles,
  Copy,
  RefreshCw,
  Send,
  Eye,
  Heart,
  Bookmark,
  X,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { useAuthContext } from '../../contexts/AuthContext';

export const FreeServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const [activeService, setActiveService] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<{ [key: string]: string }>({});

  const freeServices = [
    {
      id: 'text-summarization',
      icon: FileText,
      title: "Text Summarization",
      description: "Instant, clear overviews of complex text content. Transform lengthy documents into concise summaries.",
      features: ["Extract key points", "Adjustable length", "Multiple formats", "Instant results"],
      inputPlaceholder: "Paste your text here to summarize...",
      buttonText: "Summarize Text",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 'video-summarization',
      icon: Play,
      title: "Video Summarization",
      description: "Get quick summaries of video content. Perfect for educational videos, meetings, and presentations.",
      features: ["Video analysis", "Key moments extraction", "Transcript generation", "Time-stamped summaries"],
      inputPlaceholder: "Paste video URL or upload video file...",
      buttonText: "Summarize Video",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 'document-summarization',
      icon: Upload,
      title: "Document Summarization",
      description: "Upload and summarize PDFs, Word documents, and other file formats instantly.",
      features: ["Multiple file formats", "Batch processing", "Structured summaries", "Download results"],
      inputPlaceholder: "Upload your document to summarize...",
      buttonText: "Summarize Document",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 'document-qna',
      icon: MessageSquare,
      title: "Document Q&A",
      description: "Ask detailed questions about your documents and get precise answers based on the content.",
      features: ["Context-aware answers", "Multiple questions", "Source citations", "Interactive chat"],
      inputPlaceholder: "Upload document and ask your questions...",
      buttonText: "Start Q&A",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 'language-translation',
      icon: Languages,
      title: "Real-Time Language Translation",
      description: "Break language barriers with seamless text and speech translations in real-time.",
      features: ["100+ languages", "Text & speech", "Real-time translation", "Context preservation"],
      inputPlaceholder: "Enter text to translate or speak...",
      buttonText: "Translate",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const handleServiceAction = async (serviceId: string, input: string) => {
    if (!isAuthenticated) {
      navigate('/auth/signin');
      return;
    }

    setLoading(serviceId);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = {
        'text-summarization': `📝 **Text Summary:**\n\n**Key Points:**\n• Main topic: ${input.slice(0, 30)}...\n• Important details extracted\n• Core conclusions identified\n\n**Summary:**\nYour text has been condensed from ${input.length} characters to this concise overview, capturing the essential information while maintaining context and meaning.\n\n**Reduction:** 75% shorter while preserving key insights.`,
        'video-summarization': `🎥 **Video Summary:**\n\n**Key Moments:**\n• 00:30 - Introduction and main topic\n• 02:15 - Key discussion points\n• 05:45 - Important conclusions\n\n**Main Content:**\nThis video covers essential topics with clear explanations and practical examples.\n\n**Duration:** Original 10:30 → Summary covers main points\n**Transcript:** Available with timestamps`,
        'document-summarization': `📄 **Document Summary:**\n\n**Document Analysis:**\n• Type: PDF Document\n• Pages: 15\n• Word Count: ~3,500 words\n\n**Executive Summary:**\nThe document discusses key business strategies and implementation approaches...\n\n**Main Sections:**\n1. Introduction and objectives\n2. Methodology and approach\n3. Results and recommendations\n\n**Key Takeaways:**\n• Strategic insights identified\n• Actionable recommendations provided\n• Clear next steps outlined`,
        'document-qna': `❓ **Document Q&A Results:**\n\n**Your Question:** [Based on uploaded document]\n\n**Answer:**\nBased on the document content, here's a detailed response to your question...\n\n**Source References:**\n• Page 3, Section 2.1\n• Page 7, Figure 4\n• Page 12, Conclusion\n\n**Confidence:** 95%\n**Additional Context:** Related information found in sections 3.2 and 4.1`,
        'language-translation': `🌐 **Translation Results:**\n\n**Original Text:** ${input.slice(0, 50)}...\n**Detected Language:** English\n**Target Language:** Spanish\n\n**Translation:**\n[AI-powered translation with context preservation]\n\n**Quality Score:** 98%\n**Alternative Translations:** 2 variations available\n**Cultural Context:** Adapted for target audience`
      };

      setResults(prev => ({
        ...prev,
        [serviceId]: mockResults[serviceId as keyof typeof mockResults] || "AI processing complete! Results would appear here."
      }));
      setLoading(null);
    }, 2000);
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-6">
            <Gift className="w-4 h-4" />
            Free AI Services
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Free <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">AI Tools</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Experience the power of AI with our free tools. No credit card required, just sign up and start automating!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span>10,000+ Users</span>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {freeServices.map((service, index) => (
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
                  
                  <Button
                    onClick={() => setActiveService(service.id)}
                    className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Try Now
                  </Button>
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
                  service={freeServices.find(s => s.id === activeService)!}
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
        {service.id === 'image-analyzer' ? (
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Drag & drop an image or click to upload</p>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </div>
        ) : (
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={service.inputPlaceholder}
            rows={6}
            className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
          />
        )}

        <Button
          onClick={handleSubmit}
          disabled={loading || (!input.trim() && service.id !== 'image-analyzer')}
          className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
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
              <h3 className="text-lg font-semibold text-white">Result</h3>
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
