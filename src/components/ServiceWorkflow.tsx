import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Zap, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  icon: React.ComponentType<any>;
  data?: any;
}

interface ServiceWorkflowProps {
  researchService: string;
  planningService: string;
  researchData: any;
  onPlanningStart: (researchResults: any) => void;
  onWorkflowComplete: (finalResults: any) => void;
  isProcessing?: boolean;
}

export const ServiceWorkflow: React.FC<ServiceWorkflowProps> = ({
  researchService,
  planningService,
  researchData,
  onPlanningStart,
  onWorkflowComplete,
  isProcessing = false
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [researchResults, setResearchResults] = useState<any>(null);
  const [planningResults, setPlanningResults] = useState<any>(null);

  const workflowSteps: WorkflowStep[] = [
    {
      id: 'research',
      title: `${researchService} Research`,
      description: 'AI is analyzing your requirements and gathering comprehensive research data',
      status: currentStep === 0 ? 'active' : currentStep > 0 ? 'completed' : 'pending',
      icon: Brain,
      data: researchData
    },
    {
      id: 'processing',
      title: 'Data Processing',
      description: 'Processing research results and preparing for planning phase',
      status: currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : 'pending',
      icon: RefreshCw,
    },
    {
      id: 'planning',
      title: `${planningService} Planning`,
      description: 'Creating detailed plans based on research findings',
      status: currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'pending',
      icon: Zap,
    },
    {
      id: 'completion',
      title: 'Workflow Complete',
      description: 'Your comprehensive research and planning results are ready',
      status: currentStep === 3 ? 'completed' : 'pending',
      icon: CheckCircle,
    }
  ];

  const handleStepComplete = (stepId: string, data?: any) => {
    switch (stepId) {
      case 'research':
        setResearchResults(data);
        setCurrentStep(1);
        setTimeout(() => setCurrentStep(2), 2000); // Simulate processing time
        break;
      case 'planning':
        setPlanningResults(data);
        setCurrentStep(3);
        onWorkflowComplete({ research: researchResults, planning: data });
        break;
    }
  };

  const getStepIcon = (step: WorkflowStep) => {
    const Icon = step.icon;
    return (
      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
        step.status === 'completed' ? 'bg-green-500' :
        step.status === 'active' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
        step.status === 'error' ? 'bg-red-500' :
        'bg-gray-600'
      }`}>
        <Icon className={`w-6 h-6 text-white ${step.status === 'active' ? 'animate-pulse' : ''}`} />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="bg-gradient-to-br from-slate-800/95 to-purple-900/95 backdrop-blur-md border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white text-center">
            AI Workflow: Research + Planning
          </CardTitle>
          <p className="text-gray-300 text-center">
            Watch as our AI processes your research and creates comprehensive plans
          </p>
        </CardHeader>

        <CardContent>
          {/* Workflow Steps */}
          <div className="space-y-6">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className={`flex items-center space-x-4 p-6 rounded-xl border transition-all duration-300 ${
                  step.status === 'completed' ? 'bg-green-500/10 border-green-500/30' :
                  step.status === 'active' ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30' :
                  step.status === 'error' ? 'bg-red-500/10 border-red-500/30' :
                  'bg-gray-500/10 border-gray-500/20'
                }`}>
                  {getStepIcon(step)}
                  
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                      step.status === 'completed' ? 'text-green-400' :
                      step.status === 'active' ? 'text-white' :
                      'text-gray-400'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm mt-1">{step.description}</p>
                    
                    {step.status === 'active' && (
                      <div className="mt-3">
                        <div className="flex items-center space-x-2 text-purple-400">
                          <Clock className="w-4 h-4 animate-spin" />
                          <span className="text-sm">Processing...</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <motion.div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {step.status === 'completed' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-400"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </motion.div>
                  )}
                </div>

                {/* Connection Line */}
                {index < workflowSteps.length - 1 && (
                  <div className="flex justify-center my-2">
                    <motion.div
                      className={`w-1 h-8 transition-colors duration-300 ${
                        step.status === 'completed' ? 'bg-green-500' :
                        step.status === 'active' ? 'bg-gradient-to-b from-purple-500 to-pink-500' :
                        'bg-gray-600'
                      }`}
                      initial={{ height: 0 }}
                      animate={{ height: step.status !== 'pending' ? 32 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Results Preview */}
          <AnimatePresence>
            {researchResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20"
              >
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-blue-400" />
                  Research Results Preview
                </h4>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">
                    Research completed successfully! Key findings and data have been processed and are ready for the planning phase.
                  </p>
                  {currentStep >= 2 && (
                    <Button
                      onClick={() => onPlanningStart(researchResults)}
                      variant="ai"
                      className="mt-3"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Start Planning Phase
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {planningResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20"
              >
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  Complete Results Ready
                </h4>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <p className="text-gray-300 text-sm mb-3">
                    Your comprehensive research and planning workflow is complete! You now have detailed insights and actionable plans.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="gradient" className="flex-1">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      View Complete Results
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Download Report
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Workflow Controls */}
          {currentStep === 0 && (
            <div className="mt-8 text-center">
              <Button
                onClick={() => handleStepComplete('research', { mockData: 'Research completed' })}
                variant="gradient"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Processing Research...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Start Research
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
