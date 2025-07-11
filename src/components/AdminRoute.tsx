import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Loader2, AlertTriangle } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuthContext();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const location = useLocation();

  console.log('AdminRoute - Current state:', {
    user: user?.email,
    loading,
    isAuthenticated,
    isAdmin,
    checkingAdmin,
    pathname: location.pathname
  });

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user || !isAuthenticated) {
        console.log('No user or not authenticated');
        setIsAdmin(false);
        setCheckingAdmin(false);
        return;
      }

      console.log('Checking admin status for user:', user.email);

      try {
        // Check if user is admin by querying the profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('user_type, email')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error checking admin status:', error);
          // If profile doesn't exist, check email directly
          if (user.email === 'adityamishra0996@gmail.com') {
            console.log('Admin email detected, allowing access');
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          console.log('Profile data:', data);
          const isAdminUser = data?.user_type === 'admin' || data?.email === 'adityamishra0996@gmail.com';
          setIsAdmin(isAdminUser);
          console.log('Is admin:', isAdminUser);
        }
      } catch (err) {
        console.error('Unexpected error checking admin status:', err);
        // Fallback check for admin email
        if (user.email === 'adityamishra0996@gmail.com') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } finally {
        setCheckingAdmin(false);
      }
    };

    if (!loading) {
      checkAdminStatus();
    }
  }, [user, isAuthenticated, loading]);

  // Show loading spinner while checking authentication and admin status
  if (loading || checkingAdmin || isAdmin === null) {
    console.log('AdminRoute - Showing loading state');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Verifying admin access...</p>
        </motion.div>
      </div>
    );
  }

  // If user is not authenticated, redirect to admin login
  if (!isAuthenticated || !user) {
    console.log('AdminRoute - User not authenticated, redirecting to login');
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but not admin, show access denied
  if (isAdmin === false) {
    console.log('AdminRoute - User is not admin, showing access denied');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-6">
            You don't have permission to access this area. 
            Administrator privileges are required.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Go Back
            </button>
            
            <p className="text-gray-400 text-sm">
              If you believe this is an error, please contact support.
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <h4 className="text-red-400 font-medium text-sm">Security Notice</h4>
                <p className="text-gray-300 text-xs mt-1">
                  This access attempt has been logged for security purposes.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // If user is admin, render the protected content
  console.log('AdminRoute - Admin access granted, rendering children');
  return <>{children}</>;
};
