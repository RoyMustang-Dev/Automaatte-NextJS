import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, Brain } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { signInWithEmail } from '../../lib/supabase';

export const AdminLoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();

  // Check if user is already authenticated as admin
  useEffect(() => {
    console.log('AdminLogin - Auth check:', { isAuthenticated, userEmail: user?.email });
    if (isAuthenticated && user && user.email === 'adityamishra0996@gmail.com') {
      console.log('AdminLogin - Admin already authenticated, redirecting');
      setIsLoading(false);
      navigate('/admin/blog');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Check if it's the admin email
    if (email !== 'adityamishra0996@gmail.com') {
      setError('Access denied. Admin credentials required.');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: signInError } = await signInWithEmail(email, password);

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          setError('Invalid admin credentials. Please check your email and password.');
        } else if (signInError.message.includes('Email not confirmed')) {
          setError('Please confirm your email address first.');
        } else {
          setError(signInError.message);
        }
        setIsLoading(false);
        return;
      }

      if (data.user) {
        console.log('Admin signed in successfully:', data.user.email);
        // Force immediate redirect for admin
        if (data.user.email === 'adityamishra0996@gmail.com') {
          console.log('AdminLogin - Admin verified, redirecting immediately');
          setIsLoading(false);

          // Multiple redirect attempts to ensure it works
          setTimeout(() => {
            console.log('AdminLogin - Timeout redirect 1');
            navigate('/admin/blog');
          }, 100);

          setTimeout(() => {
            console.log('AdminLogin - Timeout redirect 2');
            window.location.href = '/admin/blog';
          }, 500);

          setTimeout(() => {
            console.log('AdminLogin - Force redirect 3');
            window.location.replace('/admin/blog');
          }, 1000);

        } else {
          setError('Access denied. Admin credentials required.');
          setIsLoading(false);
        }
      } else {
        setError('Sign in failed. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Admin sign in error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border border-red-500/20">
          <CardHeader className="text-center">
            <button 
              onClick={() => {
                navigate('/');
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
              className="flex items-center justify-center space-x-2 mb-6"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Admin Access</span>
            </button>
            <CardTitle className="text-2xl font-bold text-white">Administrator Login</CardTitle>
            <p className="text-gray-300">Restricted access for authorized personnel only</p>
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
                <label className="text-sm font-medium text-white">Admin Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    className="pl-10 bg-slate-700/50 border-red-500/30 text-white placeholder-gray-400"
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
                    placeholder="Enter admin password"
                    className="pl-10 pr-10 bg-slate-700/50 border-red-500/30 text-white placeholder-gray-400"
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
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <button
                onClick={() => navigate('/auth/reset-password')}
                className="text-sm text-red-400 hover:text-red-300 underline"
              >
                Forgot admin password?
              </button>

              <p className="text-gray-400 text-sm">
                Unauthorized access is prohibited and monitored.
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-400 font-medium text-sm">Security Notice</h4>
                  <p className="text-gray-300 text-xs mt-1">
                    This area is restricted to authorized administrators only. 
                    All access attempts are logged and monitored for security purposes.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
