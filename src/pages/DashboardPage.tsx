import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { FreeDashboard } from '../components/dashboards/FreeDashboard';
import { PaidDashboard } from '../components/dashboards/PaidDashboard';
import { EnterpriseDashboard } from '../components/dashboards/EnterpriseDashboard';
import { supabase } from '../lib/supabase';

interface UserProfile {
  email: string;
  type: 'free' | 'paid' | 'enterprise' | 'admin';
  name: string;
  company?: string;
}

export const DashboardPage: React.FC = () => {
  const { user: authUser, loading: authLoading, isAuthenticated } = useAuthContext();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isAuthenticated || !authUser) {
        navigate('/auth/signin');
        return;
      }

      try {
        // Fetch user profile from database
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('email, user_type, name, full_name, company')
          .eq('id', authUser.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          // If profile doesn't exist, redirect to signup
          navigate('/auth/signup');
          return;
        }

        if (profile) {
          setUserProfile({
            email: profile.email,
            type: profile.user_type as 'free' | 'paid' | 'enterprise' | 'admin',
            name: profile.name || profile.full_name || profile.email.split('@')[0],
            company: profile.company
          });
        }
      } catch (error) {
        console.error('Error in fetchUserProfile:', error);
        navigate('/auth/signin');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchUserProfile();
    }
  }, [authUser, isAuthenticated, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading your dashboard...</div>
      </div>
    );
  }

  if (!isAuthenticated || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Redirecting to sign in...</div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (userProfile.type) {
      case 'free':
        return <FreeDashboard user={userProfile} />;
      case 'paid':
        return <PaidDashboard user={userProfile} />;
      case 'enterprise':
        return <EnterpriseDashboard user={userProfile} />;
      case 'admin':
        // Admin users get enterprise dashboard with admin features
        return <EnterpriseDashboard user={userProfile} />;
      default:
        return <FreeDashboard user={userProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {renderDashboard()}
    </div>
  );
};
