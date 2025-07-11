import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Search, Settings, Gift, Brain, Zap, ArrowRight } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { ServiceManager } from './ServiceManager';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { aiPlanners, aiResearchers, specializedServices, complimentaryServices } from '../data/services';

const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Calendar, Search, Settings, Gift, Brain, Zap, ArrowRight
  };
  return icons[iconName] || Brain;
};

const serviceCategories = [
  { 
    key: 'researchers', 
    label: 'AI Researchers', 
    icon: Search, 
    description: 'Comprehensive research powered by AI',
    services: aiResearchers.map(service => ({ ...service, type: 'researcher' as const, id: `${service.title.toLowerCase().replace(/\s+/g, '-')}` }))
  },
  { 
    key: 'planners', 
    label: 'AI Planners', 
    icon: Calendar, 
    description: 'Intelligent planning solutions',
    services: aiPlanners.map(service => ({ ...service, type: 'planner' as const, id: `${service.title.toLowerCase().replace(/\s+/g, '-')}` }))
  },
  { 
    key: 'specialized', 
    label: 'Specialized Services', 
    icon: Settings, 
    description: 'Advanced AI tools for specific needs',
    services: specializedServices.map(service => ({ ...service, type: 'specialized' as const, id: `${service.title.toLowerCase().replace(/\s+/g, '-')}` }))
  },
  { 
    key: 'complimentary', 
    label: 'Free Tools', 
    icon: Gift, 
    description: 'Complimentary AI-powered utilities',
    services: complimentaryServices.map(service => ({ ...service, type: 'complimentary' as const, id: `${service.title.toLowerCase().replace(/\s+/g, '-')}` }))
  }
];

export const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('researchers');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isServiceManagerOpen, setIsServiceManagerOpen] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setIsServiceManagerOpen(true);
  };

  const handleCloseServiceManager = () => {
    setIsServiceManagerOpen(false);
    setSelectedService(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 border border-purple-500/10 rounded-lg animate-rotate-slow"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-pink-500/10 rounded-full animate-float"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-lg animate-scale-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comprehensive AI Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From intelligent research to strategic planning, our AI-powered services transform how you work and make decisions.
          </p>
        </motion.div>

        {/* Service Categories Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={category.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <TabsTrigger
                    value={category.key}
                    className="flex flex-col items-center space-y-2 p-4 transition-all duration-300 hover:scale-105"
                  >
                    <category.icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </TabsTrigger>
                </motion.div>
              ))}
            </TabsList>

            {/* Service Content */}
            {serviceCategories.map((category) => (
              <TabsContent key={category.key} value={category.key} className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-8"
                >
                  <h3 className="text-2xl font-bold text-white mb-2">{category.label}</h3>
                  <p className="text-gray-300">{category.description}</p>
                </motion.div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {category.services.map((service, index) => {
                    const IconComponent = getIconComponent(service.icon);
                    return (
                      <motion.div key={service.id} variants={itemVariants}>
                        <ServiceCard
                          icon={IconComponent}
                          title={service.title}
                          description={service.description}
                          color={service.color}
                          category={service.category}
                          status={service.status}
                          onSelect={() => handleServiceSelect(service)}
                          delay={index * 0.1}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Category-specific Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-center mt-12"
                >
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20">
                    <h4 className="text-xl font-semibold text-white mb-3">
                      {category.key === 'researchers' && 'Research + Planning Combo'}
                      {category.key === 'planners' && 'Intelligent Planning Solutions'}
                      {category.key === 'specialized' && 'Advanced AI Capabilities'}
                      {category.key === 'complimentary' && 'Free AI-Powered Tools'}
                    </h4>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                      {category.key === 'researchers' && 'Combine our research services with planning for comprehensive solutions that save time and deliver better results.'}
                      {category.key === 'planners' && 'Transform your ideas into actionable plans with our AI-powered planning services that adapt to your specific needs.'}
                      {category.key === 'specialized' && 'Explore cutting-edge AI tools designed for specific industries and use cases to enhance your workflow.'}
                      {category.key === 'complimentary' && 'Access powerful AI utilities at no cost to enhance your daily productivity and decision-making.'}
                    </p>
                    <Button variant="gradient" size="lg" className="group">
                      <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                      Explore {category.label}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Floating Action Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <Button
            variant="gradient"
            size="lg"
            className="rounded-full shadow-2xl animate-pulse-glow"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Brain className="w-5 h-5 mr-2" />
            Get Started
          </Button>
        </motion.div>
      </div>

      {/* Service Manager Modal */}
      <ServiceManager
        isOpen={isServiceManagerOpen}
        onClose={handleCloseServiceManager}
        selectedService={selectedService}
      />
    </section>
  );
};
