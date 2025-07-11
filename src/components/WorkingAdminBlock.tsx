import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

interface WorkingAdminBlockProps {
  children: React.ReactNode;
}

export const WorkingAdminBlock: React.FC<WorkingAdminBlockProps> = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuthContext();
  const [adminCheck, setAdminCheck] = useState<'checking' | 'admin' | 'not-admin'>('checking');

  // IMMEDIATE BLOCK - Don't render anything until verified
  console.log('WorkingAdminBlock - Render state:', {
    user: user?.email,
    isAuthenticated,
    loading,
    adminCheck
  });

  useEffect(() => {
    console.log('WorkingAdminBlock - Auth state check:', {
      user: user?.email,
      isAuthenticated,
      loading
    });

    // STRICT: If not loading and not authenticated, immediately deny
    if (!loading && (!isAuthenticated || !user)) {
      console.log('WorkingAdminBlock - DENYING: Not authenticated');
      setAdminCheck('not-admin');
      return;
    }

    // STRICT: If not loading and user email is not admin, immediately deny
    if (!loading && user && user.email !== 'adityamishra0996@gmail.com') {
      console.log('WorkingAdminBlock - DENYING: Not admin email:', user.email);
      setAdminCheck('not-admin');
      return;
    }

    // STRICT: Only allow if authenticated AND admin email
    if (!loading && isAuthenticated && user && user.email === 'adityamishra0996@gmail.com') {
      console.log('WorkingAdminBlock - ALLOWING: Admin verified');
      setAdminCheck('admin');
      return;
    }

    // Still loading
    if (loading) {
      console.log('WorkingAdminBlock - Still loading...');
      setAdminCheck('checking');
    }
  }, [user, isAuthenticated, loading]);

  // NEVER render children unless explicitly admin
  console.log('WorkingAdminBlock - Render decision:', { loading, adminCheck, userEmail: user?.email });

  // Show loading while checking
  if (loading || adminCheck === 'checking') {
    console.log('WorkingAdminBlock - BLOCKING: Showing loading');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // Redirect if not admin
  if (adminCheck === 'not-admin') {
    console.log('WorkingAdminBlock - BLOCKING: Redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }

  // ONLY render if explicitly admin
  if (adminCheck === 'admin') {
    console.log('WorkingAdminBlock - ALLOWING: Rendering admin content');
    return <>{children}</>;
  }

  // Fallback: block everything else
  console.log('WorkingAdminBlock - BLOCKING: Fallback block');
  return <Navigate to="/admin/login" replace />;
};
