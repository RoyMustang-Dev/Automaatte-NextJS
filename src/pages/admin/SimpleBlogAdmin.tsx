import React from 'react';

export const SimpleBlogAdmin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🔒 ADMIN BLOG PANEL</h1>
          <p className="text-gray-300 mb-8">This page should ONLY be accessible to authenticated admin users!</p>
          
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">✅ Admin Access Granted</h2>
            <p className="text-gray-300">
              If you can see this page without being authenticated as adityamishra0996@gmail.com, 
              then there's a security issue!
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            <button
              onClick={() => window.location.href = '/admin/test'}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Go to Admin Test
            </button>
            
            <button
              onClick={() => window.location.href = '/admin/login'}
              className="w-full px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg hover:from-slate-700 hover:to-slate-800 transition-all duration-300"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
