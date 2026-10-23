import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavTab } from '../types';
import { GAE_INFO, GAE_IMAGES, PROGRAM_PILLARS } from '../data/gaeData';
import { 
  Menu, 
  X, 
  Search, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight,
  ChevronDown,
  Globe2,
  ExternalLink,
  Trees,
  ShieldCheck,
  FolderKanban,
  Sparkles,
  ArrowRight
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
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: NavTab; label: string; hasDropdown?: boolean }[] = [
    { id: 'home', label: 'Explore GAE' },
    { id: 'programs', label: 'Solutions & Programs', hasDropdown: true },
    { id: 'projects', label: 'Active Projects' },
    { id: 'gallery', label: 'Field Photo Gallery' },
    { id: 'about', label: 'About & Mission' },
    { id: 'team', label: 'Leadership' },
    { id: 'news', label: 'News & Media' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: NavTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setProgramsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full font-sans antialiased shadow-lg">
      
      {/* =========================================
          TIER 1: AWS Global Utility Bar (#161e2d)
         ========================================= */}
      <div className="bg-[#161e2d] text-slate-300 border-b border-[#2a3447] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          
          {/* Brand Lockup: AWS Style */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-9 h-9 bg-white p-0.5 rounded-sm border border-slate-600 group-hover:border-[#ec7211] transition-colors shrink-0 overflow-hidden shadow-xs flex items-center justify-center">
                <img 
                  src={GAE_IMAGES.logo} 
                  alt="GAE Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-white font-extrabold text-sm sm:text-base tracking-tight">
                    Global Alliance on Environment
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#ff9900] bg-[#232f3e] px-1.5 py-0.5 rounded-xs border border-slate-700">
                    GAE
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium group-hover:text-slate-200 transition-colors hidden sm:inline">
                  Techiman, Ghana &bull; Est. July 24, 2020
                </span>
              </div>
            </button>
          </div>

          {/* Center: AWS Inline Quick Search Field */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-2">
            <button
              onClick={onOpenSearch}
              className="w-full bg-[#232f3e] hover:bg-[#2c3b4e] border border-[#485769] hover:border-slate-400 focus:border-[#ec7211] text-left px-3 py-1.5 rounded-xs text-xs text-slate-400 flex items-center justify-between transition-all group"
              aria-label="Search GAE documentation and programs"
            >
              <span className="flex items-center gap-2 text-slate-300">
                <Search className="w-3.5 h-3.5 text-[#ff9900]" />
                <span className="group-hover:text-white transition-colors">Search programs, gallery & reports...</span>
              </span>
              <kbd className="hidden lg:inline-block text-[10px] font-mono text-slate-400 bg-[#161e2d] border border-slate-700 px-1.5 py-0.5 rounded-xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Utility Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Region / Secretariat Indicator */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-400 border-r border-[#2a3447] pr-3">
              <MapPin className="w-3.5 h-3.5 text-[#ec7211]" />
              <span>West Africa (Techiman)</span>
            </div>

            {/* Quick Contact link */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden lg:inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#ff9900]" />
              <span>Contact Secretariat</span>
            </button>

            {/* Mobile Search Button */}
            <button
              onClick={onOpenSearch}
              className="md:hidden p-1.5 text-slate-300 hover:text-white hover:bg-[#232f3e] rounded-xs"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#ff9900]" />
            </button>

            {/* AWS Iconic Orange Button: Support GAE / Donate */}
            <button
              onClick={onOpenDonate}
              className="bg-[#ec7211] hover:bg-[#eb5f07] active:bg-[#d85800] text-white font-bold text-xs uppercase tracking-wide px-3.5 sm:px-4 py-2 rounded-xs shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white shrink-0" />
              <span className="whitespace-nowrap">Support GAE</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-300 hover:text-white hover:bg-[#232f3e] rounded-xs focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* =========================================
          TIER 2: AWS Primary Navigation (#232f3e)
         ========================================= */}
      <nav className="bg-[#232f3e] text-slate-200 border-b border-[#384659] text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-0.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.id} 
                    className="relative"
                    onMouseEnter={() => setProgramsDropdownOpen(true)}
                    onMouseLeave={() => setProgramsDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`h-11 px-3.5 text-xs font-semibold flex items-center gap-1 transition-colors border-b-2 cursor-pointer ${
                        isActive
                          ? 'border-[#ec7211] text-white bg-[#1c2635]'
                          : 'border-transparent text-slate-300 hover:text-white hover:bg-[#2a384b]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${programsDropdownOpen ? 'rotate-180 text-[#ec7211]' : ''}`} />
                    </button>

                    {/* AWS Style Mega Dropdown Menu */}
                    <AnimatePresence>
                      {programsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 w-[540px] bg-[#161e2d] border border-[#384659] shadow-2xl z-50 p-4 rounded-b-xs"
                        >
                          <div className="border-b border-[#2a3447] pb-2 mb-3 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-[#ff9900] uppercase tracking-wider">
                              10 Conservation Pillars & Solutions
                            </span>
                            <button
                              onClick={() => handleNavClick('programs')}
                              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                            >
                              <span>View All Solutions</span>
                              <ArrowRight className="w-3 h-3 text-[#ec7211]" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {PROGRAM_PILLARS.slice(0, 6).map((pillar) => (
                              <button
                                key={pillar.id}
                                onClick={() => handleNavClick('programs')}
                                className="text-left p-2 rounded-xs hover:bg-[#232f3e] transition-colors group"
                              >
                                <p className="font-bold text-white text-xs group-hover:text-[#ff9900] transition-colors flex items-center gap-1.5">
                                  <Trees className="w-3.5 h-3.5 text-[#ec7211] shrink-0" />
                                  <span className="truncate">{pillar.title}</span>
                                </p>
                                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                  {pillar.shortDesc}
                                </p>
                              </button>
                            ))}
                          </div>

                          <div className="mt-3 pt-2 border-t border-[#2a3447] bg-[#101722] -mx-4 -mb-4 p-3 flex items-center justify-between">
                            <span className="text-[11px] text-slate-300">
                              Direct field deployment in Bono East Region
                            </span>
                            <button
                              onClick={() => {
                                setProgramsDropdownOpen(false);
                                onOpenDonate();
                              }}
                              className="text-[11px] font-bold text-[#ff9900] hover:underline flex items-center gap-1"
                            >
                              <span>Fund a Nursery Sapling</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`h-11 px-3.5 text-xs font-semibold flex items-center transition-colors border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-[#ec7211] text-white bg-[#1c2635]'
                      : 'border-transparent text-slate-300 hover:text-white hover:bg-[#2a384b]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Sub-Tier Quick Status / Metrics Badge */}
          <div className="hidden lg:flex items-center gap-3 py-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300 bg-[#161e2d] px-2.5 py-1 rounded-xs border border-[#384659]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-200">58,500+ Saplings Planted</span>
            </div>
            <button
              onClick={() => handleNavClick('projects')}
              className="text-slate-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Field Projects</span>
              <ChevronRight className="w-3 h-3 text-[#ec7211]" />
            </button>
          </div>

          {/* Mobile Display Indicator */}
          <div className="flex lg:hidden items-center justify-between w-full py-2">
            <span className="text-[11px] text-slate-300 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {navItems.find(i => i.id === activeTab)?.label || 'Overview'}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[11px] text-[#ff9900] font-semibold flex items-center gap-1"
            >
              <span>Menu</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>

        </div>

        {/* =========================================
            Mobile Slide-down Navigation Menu
           ========================================= */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#161e2d] border-t border-[#384659] px-4 pt-3 pb-6 space-y-3 overflow-hidden shadow-2xl"
            >
              {/* Mobile Quick Search Bar */}
              <div className="pt-1 pb-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full bg-[#232f3e] border border-[#485769] text-left px-3 py-2 rounded-xs text-xs text-slate-300 flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-[#ff9900]" />
                  <span>Search GAE catalog...</span>
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="divide-y divide-[#2a3447]">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left py-2.5 px-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                        isActive
                          ? 'text-[#ff9900] bg-[#232f3e] border-l-2 border-[#ec7211] pl-3'
                          : 'text-slate-200 hover:text-white hover:bg-[#232f3e]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  );
                })}
              </div>

              {/* Mobile Action Buttons */}
              <div className="pt-4 border-t border-[#2a3447] space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDonate();
                  }}
                  className="w-full py-2.5 bg-[#ec7211] hover:bg-[#eb5f07] text-white font-bold text-xs uppercase tracking-wide rounded-xs shadow-sm flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Support GAE & Donate</span>
                </button>

                <div className="text-[11px] text-slate-400 pt-1 text-center">
                  Techiman Secretariat &bull; +233 (0) 54 812 4491
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

    </header>
  );
};
