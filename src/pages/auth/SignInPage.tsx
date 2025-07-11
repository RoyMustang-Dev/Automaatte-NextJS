import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Brain, Github, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { signInWithEmail, signInWithProvider, checkDuplicateUser } from '../../lib/supabase';
import { DuplicateAccountModal } from '../../components/DuplicateAccountModal';
import { UserNotFoundModal } from '../../components/UserNotFoundModal';

export const SignInPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showUserNotFoundModal, setShowUserNotFoundModal] = useState(false);
  const [duplicateInfo, setDuplicateInfo] = useState({ email: '', existingProvider: '', attemptedProvider: '' });
  const [userNotFoundInfo, setUserNotFoundInfo] = useState({ email: '', provider: '' });
  const navigate = useNavigate();
  const location = useLocation();

  // Handle OAuth callback state
  useEffect(() => {
    const state = location.state as any;
    if (state?.showUserNotFound && state?.email) {
      setUserNotFoundInfo({
        email: state.email,
        provider: state.provider || 'oauth'
      });
      setShowUserNotFoundModal(true);
      // Clear the state
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await signInWithEmail(email, password);

      if (signInError) {
        console.log('Sign in error:', signInError);

        // Check if user doesn't exist (common error messages)
        if (signInError.message.includes('Invalid login credentials') ||
            signInError.message.includes('Email not confirmed') ||
            signInError.message.includes('Invalid email or password')) {

          // Check if user exists with different provider
          const { data: duplicateData, error: checkError } = await checkDuplicateUser(email);

          if (checkError) {
            console.log('Error checking duplicate user:', checkError);
            // If we can't check, assume user doesn't exist
            setError('Account not found. Please sign up first.');
            setTimeout(() => {
              navigate('/auth/signup', { state: { email } });
            }, 2000);
            setIsLoading(false);
            return;
          }

          if (duplicateData && duplicateData.length > 0) {
            // User exists with different provider
            setDuplicateInfo({
              email,
              existingProvider: duplicateData[0].exists_with_provider,
              attemptedProvider: 'email'
            });
            setShowDuplicateModal(true);
            setIsLoading(false);
            return;
          } else {
            // User doesn't exist, show modal
            setUserNotFoundInfo({ email, provider: 'email' });
            setShowUserNotFoundModal(true);
            setIsLoading(false);
            return;
          }
        }

        // Other errors (wrong password, etc.)
        setError(signInError.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Successful sign in
        console.log('Sign in successful:', data.user);
        navigate('/dashboard');
      } else {
        setError('Sign in failed. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Unexpected sign in error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      const { error } = await signInWithProvider('google');
      if (error) {
        setError(error.message);
      }
      // OAuth will handle redirects automatically
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      setError('');
      const { error } = await signInWithProvider('github');
      if (error) {
        setError(error.message);
      }
      // OAuth will handle redirects automatically
    } catch (err) {
      setError('Failed to sign in with GitHub. Please try again.');
    }
  };

  const handleDuplicateSignIn = () => {
    setShowDuplicateModal(false);
    if (duplicateInfo.existingProvider === 'google') {
      handleGoogleSignIn();
    } else if (duplicateInfo.existingProvider === 'github') {
      handleGitHubSignIn();
    }
    // For email provider, user should use the form
  };

  const handleUserNotFoundSignUp = () => {
    setShowUserNotFoundModal(false);
    navigate('/auth/signup', { state: { email: userNotFoundInfo.email } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
          <CardHeader className="text-center">
            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Automaatte</span>
            </button>
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <p className="text-gray-300">Sign in to your account</p>
          </CardHeader>
          
          <CardContent>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-purple-500/30" />
                  <span className="text-sm text-gray-300">Remember me</span>
                </label>
                <Link to="/auth/reset-password" className="text-sm text-purple-400 hover:text-purple-300">
                  Forgot password?
                </Link>
              </div>
              
              <Button
                type="submit"
                variant="gradient"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Social Login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-800 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleGoogleSignIn}
                  className="w-full border border-gray-600 hover:border-gray-500"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleGitHubSignIn}
                  className="w-full border border-gray-600 hover:border-gray-500"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    navigate('/auth/signup');
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                  }}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
            
            {/* Demo User Types */}
            <div className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-purple-500/20">
              <h4 className="text-sm font-medium text-white mb-3">Demo User Types:</h4>
              <div className="space-y-2 text-xs text-gray-400">
                <p>• Free User: any email</p>
                <p>• Paid User: include "paid" or "premium" in email</p>
                <p>• Enterprise: include "enterprise" or "corp" in email</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Duplicate Account Modal */}
      <DuplicateAccountModal
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
        onSignIn={handleDuplicateSignIn}
        email={duplicateInfo.email}
        existingProvider={duplicateInfo.existingProvider}
        attemptedProvider={duplicateInfo.attemptedProvider}
      />

      {/* User Not Found Modal */}
      <UserNotFoundModal
        isOpen={showUserNotFoundModal}
        onClose={() => setShowUserNotFoundModal(false)}
        onSignUp={handleUserNotFoundSignUp}
        email={userNotFoundInfo.email}
        provider={userNotFoundInfo.provider}
      />
    </div>
  );
};
