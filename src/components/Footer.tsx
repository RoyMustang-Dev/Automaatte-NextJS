import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram, ArrowUp, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToHero = () => {
    const heroSection = document.querySelector('section:first-of-type');
    heroSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-purple-500/20 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="mb-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest AI automation insights, product updates, and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-slate-800/50 border-purple-500/30 text-white placeholder-gray-400"
            />
            <Button variant="gradient">
              <Send className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <button onClick={scrollToHero} className="flex items-center space-x-2 mb-6 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Automaatte</span>
            </button>
            <p className="text-gray-400 mb-6">Transforming Tomorrow, Today</p>
            <p className="text-gray-500 text-sm">© 2025 Automaatte Pvt. Ltd. All rights reserved.</p>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <button onClick={() => handleNavClick('/services/core')} className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-left">
                  Core Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/services/special')} className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-left">
                  Special Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/services/free')} className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-left">
                  Free Services
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/dashboard')} className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-left">
                  Dashboard
                </button>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <button onClick={() => handleNavClick('/about')} className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/blog')} className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-left">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/careers')} className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-left">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/contact')} className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-left">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          {/* Support & Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Support & Legal</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <button onClick={() => handleNavClick('/support')} className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-left">
                  Support Center
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/privacy')} className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('/terms')} className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <a href="mailto:hello@automaatte.com" className="hover:text-white transition-colors hover:translate-x-1 transform duration-200 inline-block">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-purple-500/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Contact Info */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-6 md:mb-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>hello@automaatte.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>India</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://twitter.com/automaatte"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/automaatte"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/automaatte"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/automaatte"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <div className="text-center mt-8">
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <span className="text-sm font-medium">Back to Top</span>
            <div className="w-8 h-8 border-2 border-gray-400 group-hover:border-white rounded-full flex items-center justify-center transition-colors duration-300">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
