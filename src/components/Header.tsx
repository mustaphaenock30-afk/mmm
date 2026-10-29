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
  Trees,
  ShieldCheck,
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
    <header className="sticky top-0 z-50 w-full font-sans antialiased shadow-sm">
      
      {/* =========================================
          TIER 1: Crisp White Utility Bar
         ========================================= */}
      <div className="bg-white text-slate-800 border-b border-emerald-100 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          
          {/* Brand Lockup */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-9 h-9 bg-white p-0.5 rounded-md border border-emerald-200 group-hover:border-emerald-500 transition-colors shrink-0 overflow-hidden shadow-xs flex items-center justify-center">
                <img 
                  src={GAE_IMAGES.logo} 
                  alt="GAE Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-emerald-950 font-extrabold text-sm sm:text-base tracking-tight group-hover:text-emerald-700 transition-colors">
                    Global Alliance on Environment
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-xs border border-emerald-200">
                    GAE
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium group-hover:text-emerald-600 transition-colors hidden sm:inline">
                  Techiman, Ghana &bull; Est. July 24, 2020
                </span>
              </div>
            </button>
          </div>

          {/* Center: Clean Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-2">
            <button
              onClick={onOpenSearch}
              className="w-full bg-slate-50 hover:bg-emerald-50/40 border border-emerald-200 hover:border-emerald-400 focus:border-emerald-600 text-left px-3 py-1.5 rounded-md text-xs text-slate-600 flex items-center justify-between transition-all group cursor-pointer"
              aria-label="Search GAE documentation and programs"
            >
              <span className="flex items-center gap-2 text-slate-700">
                <Search className="w-3.5 h-3.5 text-emerald-600" />
                <span className="group-hover:text-emerald-800 transition-colors">Search programs, gallery & reports...</span>
              </span>
              <kbd className="hidden lg:inline-block text-[10px] font-mono text-emerald-800 bg-white border border-emerald-200 px-1.5 py-0.5 rounded-xs shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right Utility Actions */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Region / Secretariat Indicator */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-slate-600 border-r border-emerald-100 pr-3">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>West Africa (Techiman)</span>
            </div>

            {/* Quick Contact link */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden lg:inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-600" />
              <span>Contact Secretariat</span>
            </button>

            {/* Mobile Search Button */}
            <button
              onClick={onOpenSearch}
              className="md:hidden p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-md"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-emerald-600" />
            </button>

            {/* Green and White Button: Support GAE / Donate */}
            <button
              onClick={onOpenDonate}
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wide px-3.5 sm:px-4 py-2 rounded-md shadow-sm shadow-emerald-600/25 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white shrink-0" />
              <span className="whitespace-nowrap">Support GAE</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-md focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-700" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* =========================================
          TIER 2: Clean White & Emerald Primary Nav
         ========================================= */}
      <nav className="bg-white/95 backdrop-blur-md text-slate-700 border-b border-emerald-100 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
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
                          ? 'border-emerald-600 text-emerald-800 bg-emerald-50/70 font-bold'
                          : 'border-transparent text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/40'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${programsDropdownOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                    </button>

                    {/* Green & White Mega Dropdown Menu */}
                    <AnimatePresence>
                      {programsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 w-[540px] bg-white border border-emerald-200 shadow-xl z-50 p-4 rounded-b-lg"
                        >
                          <div className="border-b border-emerald-100 pb-2 mb-3 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                              10 Conservation Pillars & Solutions
                            </span>
                            <button
                              onClick={() => handleNavClick('programs')}
                              className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                            >
                              <span>View All Solutions</span>
                              <ArrowRight className="w-3 h-3 text-emerald-600" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {PROGRAM_PILLARS.slice(0, 6).map((pillar) => (
                              <button
                                key={pillar.id}
                                onClick={() => handleNavClick('programs')}
                                className="text-left p-2 rounded-md hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-colors group cursor-pointer"
                              >
                                <p className="font-bold text-slate-800 text-xs group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                                  <Trees className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span className="truncate">{pillar.title}</span>
                                </p>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {pillar.shortDesc}
                                </p>
                              </button>
                            ))}
                          </div>

                          <div className="mt-3 pt-2 border-t border-emerald-100 bg-emerald-50/60 -mx-4 -mb-4 p-3 flex items-center justify-between rounded-b-lg">
                            <span className="text-[11px] text-slate-600">
                              Direct field deployment in Bono East Region
                            </span>
                            <button
                              onClick={() => {
                                setProgramsDropdownOpen(false);
                                onOpenDonate();
                              }}
                              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>Fund a Nursery Sapling</span>
                              <ChevronRight className="w-3 h-3 text-emerald-600" />
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
                      ? 'border-emerald-600 text-emerald-800 bg-emerald-50/70 font-bold'
                      : 'border-transparent text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Sub-Tier Quick Status / Metrics Badge */}
          <div className="hidden lg:flex items-center gap-3 py-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono font-semibold">58,500+ Saplings Planted</span>
            </div>
            <button
              onClick={() => handleNavClick('projects')}
              className="text-slate-600 hover:text-emerald-700 text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Field Projects</span>
              <ChevronRight className="w-3 h-3 text-emerald-600" />
            </button>
          </div>

          {/* Mobile Display Indicator */}
          <div className="flex lg:hidden items-center justify-between w-full py-2">
            <span className="text-[11px] text-slate-700 font-mono flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {navItems.find(i => i.id === activeTab)?.label || 'Overview'}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 cursor-pointer"
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
              className="lg:hidden bg-white border-t border-emerald-100 px-4 pt-3 pb-6 space-y-3 overflow-hidden shadow-xl"
            >
              {/* Mobile Quick Search Bar */}
              <div className="pt-1 pb-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full bg-slate-50 border border-emerald-200 text-left px-3 py-2 rounded-md text-xs text-slate-600 flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-emerald-600" />
                  <span>Search GAE catalog...</span>
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="divide-y divide-emerald-50">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left py-2.5 px-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                        isActive
                          ? 'text-emerald-800 bg-emerald-50 border-l-3 border-emerald-600 pl-3 font-bold'
                          : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  );
                })}
              </div>

              {/* Mobile Action Buttons */}
              <div className="pt-4 border-t border-emerald-100 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDonate();
                  }}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide rounded-md shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Support GAE & Donate</span>
                </button>

                <div className="text-[11px] text-slate-500 pt-1 text-center font-medium flex flex-wrap items-center justify-center gap-1.5">
                  <a href={`mailto:${GAE_INFO.email}`} className="hover:text-emerald-700 font-mono">
                    {GAE_INFO.email}
                  </a>
                  <span aria-hidden="true">&middot;</span>
                  <a href={`tel:${GAE_INFO.phone}`} className="hover:text-emerald-700 font-mono">
                    {GAE_INFO.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

    </header>
  );
};
