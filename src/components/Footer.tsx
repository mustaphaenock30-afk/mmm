import React, { useState } from 'react';
import { NavTab } from '../types';
import { GAE_INFO, GAE_IMAGES } from '../data/gaeData';
import { 
  Trees, 
  MapPin, 
  Mail, 
  Phone,
  CheckCircle2, 
  Heart, 
  Globe2,
  ShieldCheck,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenDonate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenDonate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
  };

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#161e2d] text-slate-300 text-xs border-t border-[#232f3e] font-sans antialiased">
      
      {/* Top Pre-Footer Action Banner: AWS Quick Start Bar */}
      <div className="bg-[#232f3e] border-b border-[#384659] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#161e2d] border border-slate-700 rounded-xs flex items-center justify-center text-[#ff9900]">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm tracking-tight">
                Support Community-Led Reforestation Across Ghana
              </h3>
              <p className="text-slate-400 text-xs">
                Directly sponsor native mahogany and acacia saplings cultivated in Techiman.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenDonate}
              className="w-full md:w-auto bg-[#ec7211] hover:bg-[#eb5f07] text-white font-bold text-xs uppercase tracking-wide px-5 py-2.5 rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Donate via Paystack</span>
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className="hidden sm:inline-flex bg-transparent hover:bg-[#161e2d] text-slate-200 border border-slate-600 font-semibold text-xs px-4 py-2.5 rounded-xs transition-colors"
            >
              Explore Field Projects
            </button>
          </div>
        </div>
      </div>

      {/* Main AWS Directory Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand & Overview Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xs bg-white p-0.5 border border-slate-600 shrink-0 overflow-hidden shadow-xs flex items-center justify-center">
                <img 
                  src={GAE_IMAGES.logo} 
                  alt="GAE Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-base font-extrabold text-white tracking-tight">
                  Global Alliance on Environment
                </span>
                <p className="text-[11px] text-[#ff9900] font-mono font-semibold">
                  Techiman, Ghana &bull; Est. July 24, 2020
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Global Alliance on Environment (GAE) is a non-governmental conservation organization committed to environmental restoration, riverbank watershed protection, youth climate empowerment, and sustainable agroforestry across Ghana.
            </p>

            <div className="pt-2 text-slate-300 space-y-2 text-xs">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#ec7211] shrink-0" />
                <span>{GAE_INFO.headquarters}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#ec7211] shrink-0" />
                <span>{GAE_INFO.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#ec7211] shrink-0" />
                <span>+233 (0) 54 812 4491 / +233 (0) 50 234 5678</span>
              </p>
            </div>
          </div>

          {/* Directory Column 1: Solutions & Programs */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-[#2a3447] pb-1.5">
              Solutions
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button onClick={() => handleNavClick('programs')} className="hover:text-white transition-colors text-left">
                  Afforestation & Nurseries
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('programs')} className="hover:text-white transition-colors text-left">
                  Watershed & River Protection
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('programs')} className="hover:text-white transition-colors text-left">
                  Community Sanitation & WASH
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('programs')} className="hover:text-white transition-colors text-left">
                  Agroforestry & Soil Health
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('programs')} className="hover:text-white transition-colors text-left">
                  Youth Climate Education
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('programs')} className="hover:text-white transition-colors text-left">
                  All 10 Core Pillars &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Directory Column 2: Documentation & Field Records */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-[#2a3447] pb-1.5">
              Field Records
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <button onClick={() => handleNavClick('gallery')} className="hover:text-white transition-colors text-left">
                  Field Photography Archive
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('projects')} className="hover:text-white transition-colors text-left">
                  Active Projects Registry
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('news')} className="hover:text-white transition-colors text-left">
                  News & Dispatch Updates
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('team')} className="hover:text-white transition-colors text-left">
                  Executive Leadership
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors text-left">
                  Constitution & Values
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: AWS Dispatch Subscription Box */}
          <div className="lg:col-span-4 space-y-3 bg-[#1e2738] border border-[#384659] p-4 rounded-xs">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#ff9900]" />
              <span>Subscribe to GAE Conservation Dispatch</span>
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Quarterly field updates on seedling survival rates, anti-plastic drives, and agroforestry milestones in Bono East Region.
            </p>

            {newsletterSubscribed ? (
              <div className="bg-[#10241b] border border-emerald-500/50 p-2.5 rounded-xs text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed! You will receive our next quarterly dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@organization.org"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#161e2d] border border-[#485769] rounded-xs px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ec7211]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ec7211] hover:bg-[#eb5f07] text-white font-bold text-xs rounded-xs shrink-0 transition-colors uppercase tracking-wide cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}

            <div className="pt-2 border-t border-[#2a3447] flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Strict Privacy Policy
              </span>
              <button
                onClick={onOpenDonate}
                className="text-[#ff9900] hover:underline font-semibold"
              >
                Donate Direct &rarr;
              </button>
            </div>
          </div>

        </div>

        {/* AWS Style Bottom Legal Strip */}
        <div className="mt-12 pt-6 border-t border-[#2a3447] flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div className="space-y-1 text-center md:text-left">
            <p>
              Global Alliance on Environment (GAE) is an environmental non-governmental organization registered in Techiman, Bono East Region, Ghana.
            </p>
            <p className="text-slate-500">
              &copy; 2020&ndash;{new Date().getFullYear()}, Global Alliance on Environment. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300">
            <button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors">
              Privacy Notice
            </button>
            <span className="text-slate-600">|</span>
            <button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors">
              Terms of Use
            </button>
            <span className="text-slate-600">|</span>
            <button onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors">
              Secretariat Support
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-[#ff9900] font-mono">Region: GH-BE</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
