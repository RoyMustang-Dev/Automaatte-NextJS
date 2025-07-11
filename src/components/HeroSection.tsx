import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Play, Brain, Zap, Clock, TrendingUp, Activity } from 'lucide-react';
import { Button } from './ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, opacity }}
      >
        {/* Gradient Orbs */}
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

        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 border border-purple-500/30 rounded-lg"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 right-20 w-24 h-24 border border-pink-500/30 rounded-full"
        />

        {/* Circuit Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.5)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0.5)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M100,100 L300,100 L300,300 L500,300 L500,500 L700,500"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M200,200 L400,200 L400,400 L600,400 L600,600 L800,600"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
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
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
              >
                Where AI meets ambition to turn today's ideas into tomorrow's achievements. 
                Automate research, planning, and decision-making with our intelligent AI services.
              </motion.p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={onGetStarted}
                  variant="gradient"
                  size="xl"
                  className="group shadow-2xl"
                >
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ai"
                  size="xl"
                  className="group shadow-2xl"
                  onClick={() => window.open('https://www.youtube.com/watch?v=demo', '_blank')}
                >
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 cursor-pointer"
              >
                <div className="flex items-center mb-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3"
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold text-white"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    80%
                  </motion.div>
                </div>
                <div className="text-gray-400 text-sm">Time Saved on Research & Planning</div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 cursor-pointer"
              >
                <div className="flex items-center mb-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3"
                  >
                    <TrendingUp className="w-5 h-5 text-white" />
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold text-white"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    3x
                  </motion.div>
                </div>
                <div className="text-gray-400 text-sm">Faster Decision Making</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - AI Visualization */}
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="relative"
          >
            <div className="relative w-full h-96 bg-gradient-to-br from-slate-800/30 to-purple-900/20 backdrop-blur-sm rounded-3xl border border-purple-500/20 overflow-hidden">
              {/* Central AI Brain */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Brain className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Orbiting Elements */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-1/2 left-1/2 w-32 h-32"
                  style={{
                    transformOrigin: `${60 + i * 20}px 0px`,
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg)`
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5
                    }}
                    className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"
                  />
                </motion.div>
              ))}

              {/* Status Indicators */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between items-center text-xs text-purple-300">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>AI Active</span>
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="flex items-center space-x-2"
                  >
                    <Activity className="w-4 h-4" />
                    <span>Processing</span>
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Learning</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{
                y: [-5, 5, -5],
                x: [-2, 2, -2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 bg-gradient-to-br from-slate-800/80 to-purple-900/60 backdrop-blur-sm rounded-xl p-3 border border-purple-500/30"
            >
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-white">AI Processing</span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [5, -5, 5],
                x: [2, -2, 2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-4 -left-4 bg-gradient-to-br from-slate-800/80 to-purple-900/60 backdrop-blur-sm rounded-xl p-3 border border-purple-500/30"
            >
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-green-400" />
                <span className="text-xs text-white">Smart Analysis</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
