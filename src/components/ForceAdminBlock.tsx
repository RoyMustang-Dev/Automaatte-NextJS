import React from 'react';

interface ForceAdminBlockProps {
  children: React.ReactNode;
}

export const ForceAdminBlock: React.FC<ForceAdminBlockProps> = ({ children }) => {
  // NUCLEAR OPTION: Always redirect to login
  console.log('ForceAdminBlock - ALWAYS BLOCKING ACCESS');
  
  // Force redirect
  window.location.href = '/admin/login';
  
  // Never render children
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-4">ACCESS DENIED</h1>
        <p className="text-gray-300">Redirecting to admin login...</p>
      </div>
    </div>
  );
};
