import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, Edit2, Save, X, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useAuthContext } from '../contexts/AuthContext';
import { updateUser } from '../lib/supabase';

export const UserProfile: React.FC = () => {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.name || user?.email?.split('@')[0] || '',
    avatar_url: user?.user_metadata?.avatar_url || ''
  });

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const { error: updateError } = await updateUser(formData);
      
      if (updateError) {
        setError(updateError.message);
        setIsLoading(false);
        return;
      }

      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setIsLoading(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.user_metadata?.name || user?.email?.split('@')[0] || '',
      avatar_url: user?.user_metadata?.avatar_url || ''
    });
    setIsEditing(false);
    setError('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getUserInitials = () => {
    const name = formData.name || user?.email?.split('@')[0] || 'User';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getUserType = () => {
    return user?.user_metadata?.user_type || 'free';
  };

  const getUserTypeColor = () => {
    const type = getUserType();
    switch (type) {
      case 'enterprise':
        return 'text-yellow-400';
      case 'paid':
        return 'text-blue-400';
      default:
        return 'text-green-400';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Profile Information</span>
          </CardTitle>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="ghost"
              size="sm"
              className="text-purple-400 hover:text-purple-300"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Status Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
          >
            <p className="text-green-400 text-sm">{success}</p>
          </motion.div>
        )}

        {/* Avatar Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              {formData.avatar_url ? (
                <img
                  src={formData.avatar_url}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-xl">
                  {getUserInitials()}
                </span>
              )}
            </div>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            )}
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg">
              {formData.name || 'User'}
            </h3>
            <p className="text-gray-300 text-sm">{user?.email}</p>
            <p className={`text-sm font-medium capitalize ${getUserTypeColor()}`}>
              {getUserType()} Plan
            </p>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Display Name</label>
            {isEditing ? (
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your display name"
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
              />
            ) : (
              <p className="text-gray-300 p-3 bg-slate-700/30 rounded-lg">
                {formData.name || 'Not set'}
              </p>
            )}
          </div>

          {/* Email Field (Read-only) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email Address</span>
            </label>
            <p className="text-gray-300 p-3 bg-slate-700/30 rounded-lg">
              {user?.email}
            </p>
          </div>

          {/* Account Type (Read-only) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Account Type</span>
            </label>
            <p className={`p-3 bg-slate-700/30 rounded-lg capitalize font-medium ${getUserTypeColor()}`}>
              {getUserType()} Plan
            </p>
          </div>

          {/* Member Since (Read-only) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Member Since</span>
            </label>
            <p className="text-gray-300 p-3 bg-slate-700/30 rounded-lg">
              {user?.created_at ? formatDate(user.created_at) : 'Unknown'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex space-x-3 pt-4">
            <Button
              onClick={handleSave}
              variant="gradient"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            
            <Button
              onClick={handleCancel}
              variant="ghost"
              disabled={isLoading}
              className="flex-1 text-gray-300 hover:text-white"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
