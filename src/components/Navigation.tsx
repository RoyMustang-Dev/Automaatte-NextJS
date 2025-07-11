import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, User, LogOut, Settings, Brain, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { useAuthContext } from '../contexts/AuthContext';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, signOut } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const navigationItems = [
    {
      name: 'Services',
      path: '/services',
      dropdown: [
        { name: 'Core Services', path: '/services/core' },
        { name: 'Special Services', path: '/services/special' },
        { name: 'Free Services', path: '/services/free' }
      ]
    },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
    { name: 'Support', path: '/support' }
  ];

  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-purple-500/20 shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => handleNavClick('/')} className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center"
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
            <motion.span
              className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Automaatte
            </motion.span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setServicesDropdown(true)}
                    onMouseLeave={() => setServicesDropdown(false)}
                  >
                    <button
                      className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                        isActivePath(item.path)
                          ? 'text-purple-300 bg-purple-500/10'
                          : 'text-gray-300 hover:text-white hover:bg-purple-500/5'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    <AnimatePresence>
                      {servicesDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-slate-800/95 backdrop-blur-md rounded-xl border border-purple-500/20 shadow-2xl overflow-hidden"
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <button
                              key={dropdownItem.name}
                              onClick={() => handleNavClick(dropdownItem.path)}
                              className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-purple-500/10 transition-colors duration-300"
                            >
                              {dropdownItem.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActivePath(item.path)
                        ? 'text-purple-300 bg-purple-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-purple-500/5'
                    }`}
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user?.user_metadata?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() ||
                       user?.email?.split('@')[0][0].toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-white font-medium">
                    {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${userDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-purple-500/20 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-slate-700">
                        <p className="text-sm text-gray-300">Signed in as</p>
                        <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                        <p className="text-xs text-purple-300 capitalize">
                          {user?.user_metadata?.user_type || 'Free'} Plan
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          handleNavClick('/dashboard');
                          setUserDropdown(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Dashboard
                      </button>

                      {/* Admin Dashboard - Only show for admin */}
                      {user?.email === 'adityamishra0996@gmail.com' && (
                        <button
                          onClick={() => {
                            handleNavClick('/admin-dashboard');
                            setUserDropdown(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-purple-300 hover:bg-purple-700/20 hover:text-purple-200 transition-colors"
                        >
                          <Shield className="w-4 h-4 mr-3" />
                          Admin Dashboard
                        </button>
                      )}

                      <button
                        onClick={() => {
                          handleNavClick('/profile');
                          setUserDropdown(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </button>

                      <button
                        onClick={() => {
                          handleSignOut();
                          setUserDropdown(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white"
                  onClick={() => handleNavClick('/auth/signin')}
                >
                  Sign In
                </Button>
                <Button
                  variant="gradient"
                  onClick={() => handleNavClick('/auth/signup')}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-purple-500/10 transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-purple-500/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <div className="text-white font-medium mb-2">{item.name}</div>
                      <div className="pl-4 space-y-2">
                        {item.dropdown.map((dropdownItem) => (
                          <button
                            key={dropdownItem.name}
                            onClick={() => {
                              handleNavClick(dropdownItem.path);
                              setIsMenuOpen(false);
                            }}
                            className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300"
                          >
                            {dropdownItem.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleNavClick(item.path);
                        setIsMenuOpen(false);
                      }}
                      className={`block w-full text-left py-2 transition-colors duration-300 ${
                        isActivePath(item.path)
                          ? 'text-purple-300'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-purple-500/20">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user?.user_metadata?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() ||
                           user?.email?.split('@')[0][0].toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-xs text-purple-300 capitalize">
                          {user?.user_metadata?.user_type || 'Free'} Plan
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="gradient"
                      className="w-full"
                      onClick={() => {
                        handleNavClick('/dashboard');
                        setIsMenuOpen(false);
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                    <Button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full text-gray-400 hover:text-white"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      variant="ghost"
                      className="w-full text-gray-300 hover:text-white"
                      onClick={() => {
                        handleNavClick('/auth/signin');
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="gradient"
                      className="w-full"
                      onClick={() => {
                        handleNavClick('/auth/signup');
                        setIsMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
