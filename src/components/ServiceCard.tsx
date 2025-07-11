import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  category?: string;
  status?: string;
  onSelect: () => void;
  delay?: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
  category,
  status,
  onSelect,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="h-full"
    >
      <Card className="group relative bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 h-full cursor-pointer overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${20 + i * 30}%`,
                top: `${60 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              whileHover={{ rotate: 5 }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            
            {status && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.2 }}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  status === 'Free' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  status === 'Available' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                }`}
              >
                {status === 'Free' && <Sparkles className="w-3 h-3 mr-1" />}
                {status}
              </motion.div>
            )}
          </div>
          
          <CardTitle className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
            {title}
          </CardTitle>
          
          <CardDescription className="text-gray-300 leading-relaxed">
            {description}
          </CardDescription>
          
          {category && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.3 }}
              className="mt-3"
            >
              <span className="text-purple-400 text-sm font-medium bg-purple-500/10 px-2 py-1 rounded-md">
                {category}
              </span>
            </motion.div>
          )}
        </CardHeader>

        <CardContent className="relative z-10 pt-0">
          <Button
            onClick={onSelect}
            variant="ghost"
            className="w-full group/btn bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/30 hover:border-purple-400/50 text-purple-300 hover:text-white transition-all duration-300"
          >
            <span className="mr-2">Get Started</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Button>
        </CardContent>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  );
};
