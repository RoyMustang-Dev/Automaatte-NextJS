import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Edit2, 
  Save, 
  X, 
  Camera,
  MapPin,
  Globe,
  Building,
  Github,
  Users,
  GitBranch,
  Eye,
  Settings,
  Key,
  Trash2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuthContext } from '../contexts/AuthContext';
import { updateUser, updatePassword } from '../lib/supabase';

export const ProfilePage: React.FC = () => {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
    company: ''
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user_metadata?.name || user.email?.split('@')[0] || '',
        bio: user.user_metadata?.bio || '',
        location: user.user_metadata?.location || '',
        website: user.user_metadata?.website || user.user_metadata?.blog || '',
        company: user.user_metadata?.company || ''
      });
    }
  }, [user]);

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
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { error: updateError } = await updatePassword(passwordData.newPassword);
      
      if (updateError) {
        setError(updateError.message);
        setIsLoading(false);
        return;
      }

      setSuccess('Password updated successfully!');
      setPasswordData({ newPassword: '', confirmPassword: '' });
      setIsLoading(false);
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update password. Please try again.');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.user_metadata?.name || user?.email?.split('@')[0] || '',
      bio: user?.user_metadata?.bio || '',
      location: user?.user_metadata?.location || '',
      website: user?.user_metadata?.website || user?.user_metadata?.blog || '',
      company: user?.user_metadata?.company || ''
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
      case 'admin':
        return 'text-red-400';
      case 'enterprise':
        return 'text-yellow-400';
      case 'paid':
        return 'text-blue-400';
      default:
        return 'text-green-400';
    }
  };

  const getProviderInfo = () => {
    const provider = user?.app_metadata?.provider || 'email';
    switch (provider) {
      case 'google':
        return { name: 'Google', icon: '🔍' };
      case 'github':
        return { name: 'GitHub', icon: <Github className="w-4 h-4" /> };
      default:
        return { name: 'Email', icon: <Mail className="w-4 h-4" /> };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Profile Settings</h1>
          <p className="text-gray-300 text-lg">Manage your account information and preferences</p>
        </motion.div>

        {/* Status Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
          >
            <p className="text-green-400">{success}</p>
          </motion.div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security">
              <Key className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="account">
              <Settings className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
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
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      {user?.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-2xl">
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
                  
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-xl mb-1">
                      {formData.name || 'User'}
                    </h3>
                    <p className="text-gray-300 mb-2">{user?.email}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`font-medium capitalize ${getUserTypeColor()}`}>
                        {getUserType()} Plan
                      </span>
                      <div className="flex items-center space-x-1 text-gray-400">
                        {getProviderInfo().icon}
                        <span>{getProviderInfo().name}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email Address</span>
                    </label>
                    <p className="text-gray-300 p-3 bg-slate-700/30 rounded-lg">
                      {user?.email}
                    </p>
                  </div>

                  {isEditing ? (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Bio</label>
                      <Input
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Tell us about yourself"
                        className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                      />
                    </div>
                  ) : formData.bio && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Bio</label>
                      <p className="text-gray-300 p-3 bg-slate-700/30 rounded-lg">
                        {formData.bio}
                      </p>
                    </div>
                  )}

                  {isEditing ? (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Location</span>
                      </label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Your location"
                        className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                      />
                    </div>
                  ) : formData.location && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Location</span>
                      </label>
                      <p className="text-gray-300 p-3 bg-slate-700/30 rounded-lg">
                        {formData.location}
                      </p>
                    </div>
                  )}
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
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Key className="w-5 h-5" />
                  <span>Password & Security</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {user?.app_metadata?.provider === 'email' ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">New Password</label>
                      <Input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        placeholder="Enter new password"
                        className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Confirm Password</label>
                      <Input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        placeholder="Confirm new password"
                        className="bg-slate-700/50 border-purple-500/30 text-white placeholder-gray-400"
                      />
                    </div>

                    <Button
                      onClick={handlePasswordUpdate}
                      variant="gradient"
                      disabled={isLoading || !passwordData.newPassword || !passwordData.confirmPassword}
                      className="w-full"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Updating...</span>
                        </div>
                      ) : (
                        <>
                          <Key className="w-4 h-4 mr-2" />
                          Update Password
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-white font-medium mb-2">OAuth Account</h3>
                    <p className="text-gray-300 text-sm">
                      Your account is managed by {getProviderInfo().name}. 
                      Password changes should be made through your {getProviderInfo().name} account.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Account Information</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Account Type</span>
                    </label>
                    <p className={`p-3 bg-slate-700/30 rounded-lg capitalize font-medium ${getUserTypeColor()}`}>
                      {getUserType()} Plan
                    </p>
                  </div>

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

                {/* GitHub Stats (if GitHub user) */}
                {user?.app_metadata?.provider === 'github' && (
                  <div className="border-t border-gray-600 pt-6">
                    <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
                      <Github className="w-5 h-5" />
                      <span>GitHub Stats</span>
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {user.user_metadata?.public_repos && (
                        <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                          <GitBranch className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                          <p className="text-white font-semibold">{user.user_metadata.public_repos}</p>
                          <p className="text-gray-400 text-xs">Repositories</p>
                        </div>
                      )}
                      {user.user_metadata?.followers && (
                        <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                          <Users className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                          <p className="text-white font-semibold">{user.user_metadata.followers}</p>
                          <p className="text-gray-400 text-xs">Followers</p>
                        </div>
                      )}
                      {user.user_metadata?.following && (
                        <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                          <Eye className="w-6 h-6 text-green-400 mx-auto mb-1" />
                          <p className="text-white font-semibold">{user.user_metadata.following}</p>
                          <p className="text-gray-400 text-xs">Following</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
