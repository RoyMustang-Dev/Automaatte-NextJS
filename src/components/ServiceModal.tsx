import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, Brain, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string;
    category?: string;
  } | null;
  onProceedToForm: () => void;
  onConnectToPlanner?: () => void;
  isResearcher?: boolean;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  onClose,
  service,
  onProceedToForm,
  onConnectToPlanner,
  isResearcher = false
}) => {
  const [showOptions, setShowOptions] = useState(false);

  if (!service) return null;

  const Icon = service.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="bg-gradient-to-br from-slate-800/95 to-purple-900/95 backdrop-blur-md border-purple-500/30 shadow-2xl">
              <CardHeader className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>

                <div className="flex items-center space-x-4 mb-6">
                  <motion.div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      {service.title}
                    </CardTitle>
                    {service.category && (
                      <span className="text-purple-400 text-sm font-medium bg-purple-500/20 px-3 py-1 rounded-full">
                        {service.category}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {service.description}
                </p>
              </CardHeader>

              <CardContent>
                <AnimatePresence mode="wait">
                  {!showOptions ? (
                    <motion.div
                      key="intro"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                          <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                          How it works
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-white font-bold">1</span>
                            </div>
                            <p className="text-sm text-gray-300">Fill out the form with your requirements</p>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Brain className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-sm text-gray-300">AI processes and analyzes your data</p>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                              <Zap className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-sm text-gray-300">Get comprehensive results instantly</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={() => setShowOptions(true)}
                          variant="gradient"
                          size="lg"
                          className="flex-1"
                        >
                          <Sparkles className="w-5 h-5 mr-2" />
                          Get Started
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="options"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">Choose your approach:</h3>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 cursor-pointer"
                        onClick={onProceedToForm}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-1">
                              Use {isResearcher ? 'Researcher' : 'Planner'} Independently
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {isResearcher 
                                ? 'Get comprehensive research results for your specific needs'
                                : 'Create detailed plans based on your own information'
                              }
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-purple-400" />
                        </div>
                      </motion.div>

                      {isResearcher && onConnectToPlanner && (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 cursor-pointer"
                          onClick={onConnectToPlanner}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-1">
                                Research + Planning Combo
                              </h4>
                              <p className="text-gray-300 text-sm">
                                Get research results and automatically feed them into our planning service
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Brain className="w-4 h-4 text-blue-400" />
                              <ArrowRight className="w-4 h-4 text-blue-400" />
                              <Zap className="w-4 h-4 text-blue-400" />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <Button
                        onClick={() => setShowOptions(false)}
                        variant="ghost"
                        className="w-full text-gray-400 hover:text-white"
                      >
                        Back
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
