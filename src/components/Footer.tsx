import React, { useState } from 'react';
import { NavTab } from '../types';
import { GAE_INFO, GAE_IMAGES } from '../data/gaeData';
import { 
  Trees, 
  MapPin, 
  Mail, 
  CheckCircle2, 
  Heart, 
  Globe2,
  ShieldCheck
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

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white p-0.5 border border-slate-700 shadow-md shrink-0 overflow-hidden">
                <img 
                  src={GAE_IMAGES.logo} 
                  alt="GAE Logo3" 
                  className="w-full h-full object-contain rounded-[9px]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">Global Alliance on Environment</span>
                <p className="text-[10px] text-emerald-400 font-mono font-semibold">Techiman, Ghana &bull; Est. July 24, 2020</p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed">
              Restoring transitional forest ecosystems, protecting freshwater riverbanks, promoting sustainable agriculture, and advancing environmental stewardship across West Africa.
            </p>

            <div className="pt-2 text-slate-400 space-y-1.5 text-[11px]">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {GAE_INFO.headquarters}
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {GAE_INFO.email}
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Explore GAE</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-emerald-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-emerald-300 transition-colors">
                  About GAE & Mission
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('programs')} className="hover:text-emerald-300 transition-colors">
                  10 Core Pillars
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('projects')} className="hover:text-emerald-300 transition-colors">
                  Active Projects
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gallery')} className="hover:text-emerald-300 transition-colors">
                  Field Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('news')} className="hover:text-emerald-300 transition-colors">
                  News & Media
                </button>
              </li>
            </ul>
          </div>

          {/* Core Focus Areas */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Key Action Areas</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Afforestation & Reforestation</li>
              <li>Water Sanitation & River Protection</li>
              <li>Agroforestry Farmers</li>
              <li>Biodiversity & Soil Health</li>
              <li>
                <button onClick={() => setActiveTab('team')} className="hover:text-emerald-300 transition-colors">
                  Executive Leadership
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-4 space-y-4 bg-slate-950 border border-slate-800 p-5 rounded-2xl">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              Subscribe to GAE Field Dispatch
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Get quarterly updates on tree seedling survival rates, community conservation drives, and sustainable agriculture in Techiman.
            </p>

            {newsletterSubscribed ? (
              <div className="bg-emerald-950 border border-emerald-500/40 p-3 rounded-xl text-center text-emerald-300 text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Thank you! You are subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shrink-0 transition-colors"
                >
                  Join
                </button>
              </form>
            )}

            <button
              onClick={onOpenDonate}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Donate via Paystack</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>
            &copy; {new Date().getFullYear()} Global Alliance on Environment (GAE). Registered NGO &bull; Founded July 24, 2020 in Techiman, Ghana.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('about')} className="hover:text-slate-200">Privacy & Terms</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-slate-200">Contact Secretariat</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
