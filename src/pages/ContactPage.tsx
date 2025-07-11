import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Building,
  Users,
  Headphones,
  FileText,
  ExternalLink,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email for general inquiries",
      contact: "hello@automaatte.com",
      action: "mailto:hello@automaatte.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our team in real-time",
      contact: "Available 9 AM - 6 PM IST",
      action: "#",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Headphones,
      title: "Support Center",
      description: "Browse our help articles and documentation",
      contact: "24/7 Self-Service",
      action: "/support",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'sales', label: 'Sales & Pricing' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'enterprise', label: 'Enterprise Solutions' },
    { value: 'media', label: 'Media & Press' }
  ];

  const officeInfo = {
    address: "India",
    timezone: "IST (UTC+5:30)",
    hours: "Monday - Friday, 9 AM - 6 PM IST",
    response: "We typically respond within 24 hours"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: ''
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about our AI automation services? We're here to help. Reach out to us through any of the channels below.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.color} flex items-center justify-center mx-auto mb-4`}>
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-300 mb-4">{method.description}</p>
                    <p className="text-purple-300 font-medium mb-4">{method.contact}</p>
                    <Button
                      variant="ai"
                      className="w-full group-hover:scale-105 transition-transform duration-300"
                      onClick={() => {
                        if (method.action.startsWith('mailto:')) {
                          window.location.href = method.action;
                        } else if (method.action.startsWith('/')) {
                          window.location.href = method.action;
                        }
                      }}
                    >
                      {method.title === "Email Us" ? "Contact Now" :
                       method.title === "Live Chat" ? "Chat Now" :
                       "Visit Now"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Form and Office Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Send us a Message</CardTitle>
                <p className="text-gray-300">Fill out the form below and we'll get back to you as soon as possible.</p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-300">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-white font-medium mb-2 block">Full Name *</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-white font-medium mb-2 block">Email Address *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email"
                          className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-white font-medium mb-2 block">Company (Optional)</label>
                        <Input
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="Enter your company name"
                          className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="text-white font-medium mb-2 block">Inquiry Type *</label>
                        <Select onValueChange={(value) => handleInputChange('inquiryType', value)} required>
                          <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-purple-500/30">
                            {inquiryTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value} className="text-white">
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-white font-medium mb-2 block">Subject *</label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Enter the subject of your inquiry"
                        className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-white font-medium mb-2 block">Message *</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us more about your inquiry..."
                        className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" variant="gradient" size="lg" className="w-full">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Office Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-6"
          >
            {/* Office Info Card */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Office Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Location</h4>
                    <p className="text-gray-300 text-sm">{officeInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Business Hours</h4>
                    <p className="text-gray-300 text-sm">{officeInfo.hours}</p>
                    <p className="text-gray-400 text-xs">{officeInfo.timezone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <h4 className="text-white font-medium">Response Time</h4>
                    <p className="text-gray-300 text-sm">{officeInfo.response}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  onClick={() => {
                    window.location.href = '/support';
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                  }}
                  className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-700/30 transition-colors group w-full text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Headphones className="w-5 h-5 text-purple-400" />
                    <span className="text-white">Support Center</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </button>
                
                <a href="/services/free" className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-700/30 transition-colors group">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <span className="text-white">Free Services</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </a>
                
                <a href="/about" className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-700/30 transition-colors group">
                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-purple-400" />
                    <span className="text-white">About Us</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white" />
                </a>
              </CardContent>
            </Card>

            {/* Enterprise Contact */}
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
              <CardContent className="p-6 text-center">
                <Building className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Enterprise Solutions</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Need custom AI solutions for your enterprise? Let's discuss your requirements.
                </p>
                <Button variant="gradient" size="sm" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">Frequently Asked Questions</CardTitle>
              <p className="text-gray-300">Quick answers to common questions</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    question: "What's the difference between AI Researchers and AI Planners?",
                    answer: "AI Researchers gather and analyze information on specific topics, while AI Planners create actionable strategies based on research data. They work together in our interconnected workflow."
                  },
                  {
                    question: "How much does the premium plan cost?",
                    answer: "Our premium plan is $9.99/month and includes unlimited access to all AI Researchers, Planners, and free tools with priority support."
                  },
                  {
                    question: "Can I cancel my subscription anytime?",
                    answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period."
                  },
                  {
                    question: "Do you offer custom AI solutions for businesses?",
                    answer: "Yes, we provide enterprise-grade custom AI solutions including chatbots, process automation, and specialized integrations with dedicated support."
                  },
                  {
                    question: "Is my data secure with Automaatte?",
                    answer: "Absolutely. We use enterprise-grade security measures, encryption, and comply with international privacy standards. Your data is never shared with third parties."
                  },
                  {
                    question: "How quickly do you respond to support requests?",
                    answer: "We respond to all inquiries within 24 hours. Premium users get priority support, and enterprise clients have dedicated account managers."
                  }
                ].map((faq, index) => (
                  <div key={index} className="p-4 bg-slate-800/30 rounded-lg">
                    <h4 className="text-white font-medium mb-2">{faq.question}</h4>
                    <p className="text-gray-300 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
