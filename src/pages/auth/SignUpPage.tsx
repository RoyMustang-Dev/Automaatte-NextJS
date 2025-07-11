import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Brain, Building, Github, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { signUpWithEmail, signInWithProvider } from '../../lib/supabase';

export const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'free',
    company: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      // Check if this is the admin email
      const isAdmin = formData.email === 'adityamishra0996@gmail.com';

      const { data, error: signUpError } = await signUpWithEmail(
        formData.email,
        formData.password,
        {
          name: formData.name,
          user_type: isAdmin ? 'admin' : formData.userType,
          company: formData.company
        }
      );

      if (signUpError) {
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Show success message and redirect
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setError('');
      const { error } = await signInWithProvider('google', true); // Pass true for signup
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to sign up with Google. Please try again.');
    }
  };

  const handleGitHubSignUp = async () => {
    try {
      setError('');
      const { error } = await signInWithProvider('github', true); // Pass true for signup
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to sign up with GitHub. Please try again.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
            <p className="text-gray-300">Join the future of AI automation</p>
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
                <label className="text-sm font-medium text-white">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Account Type</label>
                <Select onValueChange={(value) => handleInputChange('userType', value)} defaultValue="free">
                  <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-purple-500/30">
                    <SelectItem value="free" className="text-white hover:bg-purple-500/20">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Free - Personal Use</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="paid" className="text-white hover:bg-purple-500/20">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Paid - Professional</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="enterprise" className="text-white hover:bg-purple-500/20">
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4" />
                        <span>Enterprise - Corporate</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.userType === 'enterprise' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Company Name</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Enter your company name"
                      className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a password"
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
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className="pl-10 bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1 rounded border-purple-500/30" required />
                <span className="text-sm text-gray-300">
                  I agree to the{' '}
                  <button
                    onClick={() => {
                      navigate('/terms');
                      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                    }}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button
                    onClick={() => {
                      navigate('/privacy');
                      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                    }}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Privacy Policy
                  </button>
                </span>
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
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <>
                    Create Account
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
                  onClick={handleGoogleSignUp}
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
                  onClick={handleGitHubSignUp}
                  className="w-full border border-gray-600 hover:border-gray-500"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-300">
                Already have an account?{' '}
                <button
                  onClick={() => {
                    navigate('/auth/signin');
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                  }}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
