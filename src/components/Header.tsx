import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavTab } from '../types';
import { GAE_INFO, GAE_IMAGES } from '../data/gaeData';
import { 
  Trees, 
  Menu, 
  X, 
  Search, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenDonate: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenDonate,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About GAE' },
    { id: 'programs', label: 'Core Programs' },
    { id: 'projects', label: 'Active Projects' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'news', label: 'News & Media' },
    { id: 'team', label: 'Leadership' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: NavTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 bg-white">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {GAE_INFO.headquarters}
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              {GAE_INFO.email}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase">
              Est. July 24, 2020
            </span>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} 
              className="hover:text-emerald-300 transition-colors flex items-center gap-1 text-slate-300"
            >
              <Phone className="w-3 h-3 text-emerald-400" /> Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Navbar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md py-3' 
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Title */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-white p-0.5 border border-slate-200 shadow-md shadow-emerald-600/10 group-hover:scale-105 group-hover:border-emerald-400 transition-all duration-200 overflow-hidden shrink-0">
              <img 
                src={GAE_IMAGES.logo} 
                alt="Global Alliance on Environment Logo3" 
                className="w-full h-full object-contain rounded-[9px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-none">
                  Global Alliance
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-bold">
                  GAE
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 font-medium tracking-wide">
                on Environment &bull; Techiman, Ghana
              </p>
            </div>
          </motion.button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="Search Site"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline font-semibold">Search</span>
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenDonate}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donate / Support</span>
            </motion.button>
          </div>

          {/* Mobile Menu & Search Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-emerald-600" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-1">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDonate();
                  }}
                  className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate & Support GAE</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
