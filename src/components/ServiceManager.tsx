import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Brain, Zap, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ServiceModal } from './ServiceModal';
import { ServiceWorkflow } from './ServiceWorkflow';
import { VacationResearchForm } from './forms/VacationResearchForm';
import { EducationResearchForm } from './forms/EducationResearchForm';
import { InsuranceResearchForm } from './forms/InsuranceResearchForm';
import { InvestmentResearchForm } from './forms/InvestmentResearchForm';
import { VideoShootResearchForm } from './forms/VideoShootResearchForm';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  category?: string;
  type: 'researcher' | 'planner';
}

interface ServiceManagerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: Service | null;
}

type WorkflowMode = 'independent' | 'connected';
type CurrentView = 'modal' | 'form' | 'workflow' | 'results';

export const ServiceManager: React.FC<ServiceManagerProps> = ({
  isOpen,
  onClose,
  selectedService
}) => {
  const [currentView, setCurrentView] = useState<CurrentView>('modal');
  const [workflowMode, setWorkflowMode] = useState<WorkflowMode>('independent');
  const [formData, setFormData] = useState<any>(null);
  const [researchResults, setResearchResults] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    if (currentView === 'form') {
      setCurrentView('modal');
    } else if (currentView === 'workflow' || currentView === 'results') {
      setCurrentView('form');
    } else {
      onClose();
    }
  };

  const handleProceedToForm = () => {
    setWorkflowMode('independent');
    setCurrentView('form');
  };

  const handleConnectToPlanner = () => {
    setWorkflowMode('connected');
    setCurrentView('form');
  };

  const handleFormSubmit = async (data: any) => {
    setFormData(data);
    setIsProcessing(true);

    if (workflowMode === 'connected') {
      setCurrentView('workflow');
      // Simulate API call
      setTimeout(() => {
        setResearchResults({ ...data, processed: true });
        setIsProcessing(false);
      }, 3000);
    } else {
      // Independent service processing
      setTimeout(() => {
        setResearchResults({ ...data, processed: true });
        setCurrentView('results');
        setIsProcessing(false);
      }, 3000);
    }
  };

  const handlePlanningStart = (researchData: any) => {
    // Start planning phase with research data
    console.log('Starting planning with:', researchData);
  };

  const handleWorkflowComplete = (finalResults: any) => {
    setCurrentView('results');
    console.log('Workflow complete:', finalResults);
  };

  const renderForm = () => {
    if (!selectedService) return null;

    const commonProps = {
      onSubmit: handleFormSubmit,
      onBack: handleBack,
      isLoading: isProcessing
    };

    switch (selectedService.id) {
      case 'vacation-research':
        return <VacationResearchForm {...commonProps} />;
      case 'education-research':
        return <EducationResearchForm {...commonProps} />;
      case 'insurance-research':
        return <InsuranceResearchForm {...commonProps} />;
      case 'investment-research':
        return <InvestmentResearchForm {...commonProps} />;
      case 'video-research':
        return <VideoShootResearchForm {...commonProps} />;
      default:
        return (
          <div className="text-center text-white">
            <p>Form for {selectedService.title} is coming soon!</p>
            <Button onClick={handleBack} className="mt-4">Back</Button>
          </div>
        );
    }
  };

  const renderResults = () => {
    if (!researchResults || !selectedService) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-br from-slate-800/95 to-purple-900/95 backdrop-blur-md rounded-2xl border border-purple-500/30 p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Research Complete!</h2>
            <p className="text-gray-300">
              Your {selectedService.title.toLowerCase()} research has been completed successfully.
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Research Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                <h4 className="text-purple-400 font-medium mb-2">Data Processed</h4>
                <p className="text-gray-300 text-sm">
                  Comprehensive analysis completed based on your requirements
                </p>
              </div>
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                <h4 className="text-blue-400 font-medium mb-2">Insights Generated</h4>
                <p className="text-gray-300 text-sm">
                  Key recommendations and actionable insights prepared
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleBack} variant="ghost" className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start New Research
            </Button>
            <Button variant="gradient" className="flex-1">
              <Brain className="w-4 h-4 mr-2" />
              View Detailed Results
            </Button>
            {selectedService.type === 'researcher' && (
              <Button variant="ai" className="flex-1">
                <Zap className="w-4 h-4 mr-2" />
                Create Plan from Research
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  if (!isOpen || !selectedService) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="w-full max-w-6xl my-8">
          <AnimatePresence mode="wait">
            {currentView === 'modal' && (
              <ServiceModal
                key="modal"
                isOpen={true}
                onClose={onClose}
                service={selectedService}
                onProceedToForm={handleProceedToForm}
                onConnectToPlanner={selectedService.type === 'researcher' ? handleConnectToPlanner : undefined}
                isResearcher={selectedService.type === 'researcher'}
              />
            )}

            {currentView === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {renderForm()}
              </motion.div>
            )}

            {currentView === 'workflow' && (
              <motion.div
                key="workflow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ServiceWorkflow
                  researchService={selectedService.title}
                  planningService={selectedService.title.replace('Research', 'Planning')}
                  researchData={formData}
                  onPlanningStart={handlePlanningStart}
                  onWorkflowComplete={handleWorkflowComplete}
                  isProcessing={isProcessing}
                />
              </motion.div>
            )}

            {currentView === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {renderResults()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back Button for non-modal views */}
          {currentView !== 'modal' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 left-4"
            >
              <Button
                onClick={handleBack}
                variant="ghost"
                size="icon"
                className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
