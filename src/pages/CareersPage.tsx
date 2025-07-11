import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  CheckCircle,
  Heart,
  Zap,
  Globe,
  Code,
  Brain,
  Target,
  Coffee,
  Laptop,
  Home,
  Calendar,
  Award,
  TrendingUp,
  Mail,
  Send
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export const CareersPage: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Future job openings (currently none as it's just Aditya)
  const jobOpenings = [
    {
      id: 1,
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "Remote / India",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹15-25 LPA",
      description: "Join our core AI team to build next-generation automation tools and machine learning models.",
      requirements: [
        "Strong background in Machine Learning and AI",
        "Experience with Python, TensorFlow/PyTorch",
        "Knowledge of NLP and computer vision",
        "Experience with cloud platforms (AWS/GCP)",
        "Strong problem-solving skills"
      ],
      posted: "Coming Soon",
      status: "future"
    },
    {
      id: 2,
      title: "Full-Stack Developer",
      department: "Engineering",
      location: "Remote / India",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹12-20 LPA",
      description: "Help build and scale our web platform using modern technologies and best practices.",
      requirements: [
        "Proficiency in React, TypeScript, Node.js",
        "Experience with databases (PostgreSQL, MongoDB)",
        "Knowledge of cloud services and DevOps",
        "Understanding of UI/UX principles",
        "Experience with API design and development"
      ],
      posted: "Coming Soon",
      status: "future"
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "Remote / India",
      type: "Full-time",
      experience: "3-6 years",
      salary: "₹18-30 LPA",
      description: "Drive product strategy and roadmap for our AI automation platform.",
      requirements: [
        "Experience in product management for tech products",
        "Understanding of AI/ML technologies",
        "Strong analytical and communication skills",
        "Experience with agile methodologies",
        "Customer-focused mindset"
      ],
      posted: "Coming Soon",
      status: "future"
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote / India",
      type: "Full-time",
      experience: "2-5 years",
      salary: "₹14-22 LPA",
      description: "Build and maintain our infrastructure to support scalable AI services.",
      requirements: [
        "Experience with containerization (Docker, Kubernetes)",
        "Knowledge of CI/CD pipelines",
        "Cloud platform expertise (AWS/GCP/Azure)",
        "Infrastructure as Code (Terraform, CloudFormation)",
        "Monitoring and logging tools experience"
      ],
      posted: "Coming Soon",
      status: "future"
    }
  ];

  const departments = [
    { id: 'all', name: 'All Departments', count: jobOpenings.length },
    { id: 'engineering', name: 'Engineering', count: 3 },
    { id: 'product', name: 'Product', count: 1 },
    { id: 'design', name: 'Design', count: 0 },
    { id: 'marketing', name: 'Marketing', count: 0 }
  ];

  const benefits = [
    {
      icon: Home,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours and work-life balance."
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Learn and grow with cutting-edge AI technology and mentorship."
    },
    {
      icon: Award,
      title: "Competitive Compensation",
      description: "Attractive salary packages with equity participation."
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs."
    },
    {
      icon: Laptop,
      title: "Latest Technology",
      description: "Top-tier hardware and software tools for maximum productivity."
    },
    {
      icon: Coffee,
      title: "Learning Budget",
      description: "Annual budget for courses, conferences, and skill development."
    }
  ];

  const companyValues = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI."
    },
    {
      icon: Users,
      title: "Collaborative Spirit",
      description: "We believe in the power of teamwork and diverse perspectives."
    },
    {
      icon: Target,
      title: "Customer Focus",
      description: "Everything we do is centered around creating value for our users."
    },
    {
      icon: Zap,
      title: "Move Fast",
      description: "We iterate quickly and learn from our experiences."
    }
  ];

  const filteredJobs = jobOpenings.filter(job => 
    selectedDepartment === 'all' || job.department.toLowerCase() === selectedDepartment
  );

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
            Join Our Mission
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Help us build the future of AI automation. We're looking for passionate individuals who want to make a meaningful impact.
          </p>
        </motion.div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">We're Growing!</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Automaatte is currently a solo venture by founder Aditya Mishra, but we're planning to expand our team soon. 
                Be among the first to join our mission of democratizing AI automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gradient" size="lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Get Notified About Openings
                </Button>
                <Button variant="outline" size="lg">
                  <Send className="w-5 h-5 mr-2" />
                  Send Your Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Company Values */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The principles that guide our work and shape our culture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-white">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Why Join Automaatte?</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We believe in creating an environment where talented individuals can thrive and make a real impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-white">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Future Job Openings */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Future Opportunities</h2>
                <p className="text-gray-300 text-lg">
                  Positions we're planning to open as we grow our team.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Select onValueChange={setSelectedDepartment} defaultValue="all">
                  <SelectTrigger className="w-48 bg-slate-700/50 border-purple-500/30 text-white">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-purple-500/30">
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id} className="text-white">
                        {dept.name} ({dept.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.01, y: -2 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
                            {job.status === 'future' ? 'Coming Soon' : 'Open'}
                          </span>
                          <span className="text-purple-300 text-sm">{job.department}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                        <p className="text-gray-300 mb-4">{job.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 mb-4">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{job.experience}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="text-white font-medium mb-2">Key Requirements:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {job.requirements.slice(0, 4).map((req, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                <span className="text-gray-300 text-sm">{req}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <Button variant="gradient" disabled={job.status === 'future'}>
                          {job.status === 'future' ? 'Coming Soon' : 'Apply Now'}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Early Interest Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Join Our Talent Pool</h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Don't see the perfect role yet? Submit your information and we'll reach out when we have opportunities that match your skills.
                </p>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-white font-medium mb-2 block">Full Name</label>
                    <Input 
                      placeholder="Enter your full name"
                      className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-white font-medium mb-2 block">Email</label>
                    <Input 
                      type="email"
                      placeholder="Enter your email"
                      className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="text-white font-medium mb-2 block">Role Interest</label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                        <SelectValue placeholder="Select role type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-purple-500/30">
                        <SelectItem value="engineering" className="text-white">Engineering</SelectItem>
                        <SelectItem value="product" className="text-white">Product</SelectItem>
                        <SelectItem value="design" className="text-white">Design</SelectItem>
                        <SelectItem value="marketing" className="text-white">Marketing</SelectItem>
                        <SelectItem value="other" className="text-white">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-white font-medium mb-2 block">Experience Level</label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-purple-500/30">
                        <SelectItem value="entry" className="text-white">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="mid" className="text-white">Mid Level (2-5 years)</SelectItem>
                        <SelectItem value="senior" className="text-white">Senior Level (5+ years)</SelectItem>
                        <SelectItem value="lead" className="text-white">Lead/Principal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="text-white font-medium mb-2 block">Tell us about yourself</label>
                  <Textarea 
                    placeholder="Share your background, interests, and what excites you about AI automation..."
                    className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                    rows={4}
                  />
                </div>
                
                <div className="text-center">
                  <Button variant="gradient" size="lg" className="w-full md:w-auto">
                    <Send className="w-5 h-5 mr-2" />
                    Submit Application
                  </Button>
                  <p className="text-gray-400 text-sm mt-4">
                    We'll keep your information confidential and reach out when relevant opportunities arise.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
