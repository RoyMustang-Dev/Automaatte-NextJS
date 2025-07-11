import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FreeDashboard } from '../components/dashboards/FreeDashboard';
import { PaidDashboard } from '../components/dashboards/PaidDashboard';
import { EnterpriseDashboard } from '../components/dashboards/EnterpriseDashboard';

interface User {
  email: string;
  type: 'free' | 'paid' | 'enterprise';
  name: string;
  company?: string;
}

export const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/auth/signin');
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (user.type) {
      case 'free':
        return <FreeDashboard user={user} />;
      case 'paid':
        return <PaidDashboard user={user} />;
      case 'enterprise':
        return <EnterpriseDashboard user={user} />;
      default:
        return <FreeDashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {renderDashboard()}
    </div>
  );
};
