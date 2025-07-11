import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DuplicateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
  email: string;
  existingProvider: string;
  attemptedProvider: string;
}

export const DuplicateAccountModal: React.FC<DuplicateAccountModalProps> = ({
  isOpen,
  onClose,
  onSignIn,
  email,
  existingProvider,
  attemptedProvider
}) => {
  const getProviderName = (provider: string) => {
    switch (provider) {
      case 'google':
        return 'Google';
      case 'github':
        return 'GitHub';
      case 'email':
        return 'Email/Password';
      default:
        return provider;
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'google':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        );
      case 'github':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="bg-gradient-to-br from-slate-800/95 to-purple-900/95 backdrop-blur-sm border-purple-500/20">
              <CardHeader className="text-center relative">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <AlertTriangle className="w-8 h-8 text-white" />
                </motion.div>
                
                <CardTitle className="text-xl font-bold text-white">
                  Account Already Exists
                </CardTitle>
                <p className="text-gray-300 text-sm">
                  This email is already registered with a different sign-in method
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-slate-700/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Email:</span>
                    <span className="text-white font-medium">{email}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Existing method:</span>
                    <div className="flex items-center space-x-2 text-white">
                      {getProviderIcon(existingProvider)}
                      <span>{getProviderName(existingProvider)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Attempted method:</span>
                    <div className="flex items-center space-x-2 text-gray-400">
                      {getProviderIcon(attemptedProvider)}
                      <span>{getProviderName(attemptedProvider)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-gray-300 text-sm">
                    To continue, please sign in using your existing {getProviderName(existingProvider)} account.
                  </p>

                  <div className="space-y-3">
                    <Button
                      onClick={onSignIn}
                      variant="gradient"
                      className="w-full"
                    >
                      <div className="flex items-center space-x-2">
                        {getProviderIcon(existingProvider)}
                        <span>Sign in with {getProviderName(existingProvider)}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Button>

                    <Button
                      onClick={onClose}
                      variant="ghost"
                      className="w-full text-gray-300 hover:text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-400">
                    Need help? Contact support for assistance with your account.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
