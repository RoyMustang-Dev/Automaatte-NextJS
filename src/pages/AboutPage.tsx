import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain,
  Target,
  Users,
  ArrowRight,
  CheckCircle,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Database,
  TrendingUp,
  Award,
  Globe,
  Lightbulb,
  Heart,
  Zap,
  Building
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const AboutPage: React.FC = () => {
  const founderSkills = [
    "Machine Learning & AI",
    "Data Science & Analytics",
    "Full-Stack Development",
    "Business Strategy",
    "Product Management",
    "Team Leadership"
  ];

  const companyValues = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "We believe in pushing the boundaries of what's possible with AI technology.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Human-Centric AI",
      description: "Our AI solutions are designed to enhance human capabilities, not replace them.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Results Driven",
      description: "We focus on delivering measurable value and tangible outcomes for our users.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Heart,
      title: "Ethical AI",
      description: "We're committed to developing AI that is fair, transparent, and beneficial for all.",
      color: "from-red-500 to-pink-500"
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Company Founded",
      description: "Aditya Mishra founded Automaatte with a vision to democratize AI automation.",
      icon: Lightbulb
    },
    {
      year: "2024",
      title: "Core Services Launch",
      description: "Launched AI Researchers and Planners with interconnected workflow capabilities.",
      icon: Zap
    },
    {
      year: "2024",
      title: "Free Services Platform",
      description: "Introduced free AI tools to make automation accessible to everyone.",
      icon: Globe
    },
    {
      year: "2025",
      title: "Enterprise Solutions",
      description: "Expanding to serve enterprise clients with custom AI solutions.",
      icon: Building
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
            About Automaatte
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transforming Tomorrow, Today. We're building the future of AI automation to empower individuals and businesses worldwide.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To democratize AI automation by making powerful, intelligent tools accessible to everyone. 
                    We believe that AI should enhance human potential, not replace it, creating a future where 
                    technology serves humanity's greatest aspirations.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    To become the world's leading platform for AI-powered automation, where every individual 
                    and organization can harness the power of artificial intelligence to make better decisions, 
                    save time, and achieve their goals more efficiently.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Meet Our Founder</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Driven by passion for AI and innovation, our founder is building the future of automation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-purple-500/30">
                    <img
                      src="/assets/profile_image.png"
                      alt="Aditya Mishra - Founder of Automaatte"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">Aditya Mishra</h3>
                    <p className="text-purple-300 mb-4">Founder & CEO</p>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Aditya is a passionate technologist and entrepreneur with expertise in AI, data science, 
                      and full-stack development. With a vision to make AI accessible to everyone, he founded 
                      Automaatte to bridge the gap between complex AI technology and practical business solutions.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      {founderSkills.map((skill, index) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="https://aditya-mishra-ds-portfolio.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                      >
                        <Button variant="gradient" className="group">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Portfolio
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </a>
                      <a
                        href="mailto:adityamishra0996@gmail.com"
                        className="inline-flex"
                      >
                        <Button variant="outline">
                          <Mail className="w-4 h-4 mr-2" />
                          Contact Aditya
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Company Values */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do at Automaatte.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 h-full text-center">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mx-auto mb-4`}>
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

        {/* Company Timeline */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Journey</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              From inception to innovation - the milestones that define our growth.
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <milestone.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="text-purple-300 font-bold text-lg">{milestone.year}</span>
                          <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                        </div>
                        <p className="text-gray-300">{milestone.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Future Plans */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Looking Ahead</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  We're just getting started. Our roadmap includes expanding our team, developing new AI capabilities, 
                  and building partnerships that will shape the future of automation.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { title: "Team Expansion", desc: "Hiring top talent in AI and engineering" },
                    { title: "Global Reach", desc: "Expanding to serve customers worldwide" },
                    { title: "New Technologies", desc: "Integrating cutting-edge AI advances" }
                  ].map((plan, index) => (
                    <div key={plan.title} className="text-center">
                      <h3 className="text-white font-semibold mb-2">{plan.title}</h3>
                      <p className="text-gray-400 text-sm">{plan.desc}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/careers">
                    <Button variant="gradient" size="lg">
                      <Users className="w-5 h-5 mr-2" />
                      Join Our Team
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg">
                      <Mail className="w-5 h-5 mr-2" />
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </div>
    </div>
  );
};
