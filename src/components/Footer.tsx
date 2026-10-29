import React, { useState } from 'react';
import { NavTab } from '../types';
import { GAE_INFO, GAE_IMAGES } from '../data/gaeData';
import { 
  Trees, 
  MapPin, 
  Mail, 
  Phone,
  MessageCircle,
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

  const [newsletterSending, setNewsletterSending] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!email || newsletterSending) return;
    setNewsletterSending(true);
    try {
      await fetch(`https://formsubmit.co/ajax/${GAE_INFO.email}`, {
        method: 'POST',
        referrerPolicy: 'origin',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          _replyto: email,
          _subject: `[GAE Conservation Dispatch] New Newsletter Subscriber: ${email}`,
          message: `Please add ${email} to the Global Alliance on Environment quarterly conservation dispatch list.`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
    } catch {
      // Allow graceful UI confirmation even if offline
    } finally {
      setNewsletterSending(false);
      setNewsletterSubscribed(true);
    }
  };

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="font-sans antialiased">
      
      {/* Top Pre-Footer Action Banner: Emerald Green Callout */}
      <div className="bg-emerald-700 text-white border-b border-emerald-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-800 border border-emerald-600 rounded-md flex items-center justify-center text-emerald-200">
              <Trees className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm sm:text-base tracking-tight">
                Support Community-Led Reforestation Across Ghana
              </h3>
              <p className="text-emerald-100 text-xs">
                Directly sponsor native mahogany and acacia saplings cultivated in Techiman.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenDonate}
              className="w-full md:w-auto bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs uppercase tracking-wide px-5 py-2.5 rounded-md transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-emerald-800 text-emerald-800" />
              <span>Donate via Paystack</span>
            </button>
            <button
              onClick={() => handleNavClick('projects')}
              className="hidden sm:inline-flex bg-transparent hover:bg-emerald-800 text-white border border-emerald-400 font-semibold text-xs px-4 py-2.5 rounded-md transition-colors cursor-pointer"
            >
              Explore Field Projects
            </button>
          </div>
        </div>
      </div>

      {/* Main Forest Green Directory Links Grid */}
      <div className="bg-[#064e3b] text-emerald-100 text-xs border-t border-emerald-900 pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Brand & Overview Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-white p-0.5 border border-emerald-300 shrink-0 overflow-hidden shadow-xs flex items-center justify-center">
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
                  <p className="text-[11px] text-emerald-300 font-mono font-semibold">
                    Techiman, Ghana &bull; Est. July 24, 2020
                  </p>
                </div>
              </div>

              <p className="text-emerald-100/80 text-xs leading-relaxed">
                Global Alliance on Environment (GAE) is a non-governmental conservation organization committed to environmental restoration, riverbank watershed protection, youth climate empowerment, and sustainable agroforestry across Ghana.
              </p>

              <div className="pt-2 text-emerald-200 space-y-2 text-xs">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <span>{GAE_INFO.headquarters}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <a href={`mailto:${GAE_INFO.email}`} className="hover:text-white hover:underline font-mono">
                    {GAE_INFO.email}
                  </a>
                </p>
                <p className="flex flex-wrap items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                  <a href={`tel:${GAE_INFO.phone}`} className="hover:text-white hover:underline font-mono">
                    {GAE_INFO.phone}
                  </a>
                  <span className="text-emerald-600" aria-hidden="true">&middot;</span>
                  <a
                    href={GAE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-300 hover:text-white hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </p>
              </div>
            </div>

            {/* Directory Column 1: Solutions & Programs */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-emerald-700/60 pb-1.5">
                Solutions
              </h4>
              <ul className="space-y-2 text-emerald-200 text-xs">
                <li>
                  <button onClick={() => handleNavClick('programs')} className="hover:text-white transition-colors text-left cursor-pointer">
                    Afforestation & Nurseries
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('programs')} className="hover:text-white transition-colors text-left cursor-pointer">
                    Watershed & River Protection
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('programs')} className="hover:text-white transition-colors text-left cursor-pointer">
                    Community Sanitation & WASH
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('programs')} className="hover:text-white transition-colors text-left cursor-pointer">
                    Agroforestry & Soil Health
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('programs')} className="hover:text-white transition-colors text-left cursor-pointer">
                    Youth Climate Education
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('programs')} className="hover:text-white transition-colors text-left font-semibold cursor-pointer">
                    All 10 Core Pillars &rarr;
                  </button>
                </li>
              </ul>
            </div>

            {/* Directory Column 2: Documentation & Field Records */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-emerald-700/60 pb-1.5">
                Field Records
              </h4>
              <ul className="space-y-2 text-emerald-200 text-xs">
                <li>
                  <button onClick={() => handleNavClick('gallery')} className="hover:text-white transition-colors text-left cursor-pointer">
                    Field Photography Archive
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('projects')} className="hover:text-white transition-colors text-left cursor-pointer">
                    Active Projects Registry
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('news')} className="hover:text-white transition-colors text-left cursor-pointer">
                    News & Dispatch Updates
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('team')} className="hover:text-white transition-colors text-left cursor-pointer">
                    Executive Leadership
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors text-left cursor-pointer">
                    Constitution & Values
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Dispatch Subscription Box */}
            <div className="lg:col-span-4 space-y-3 bg-[#043c2e] border border-emerald-700/80 p-4 rounded-lg">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-emerald-300" />
                <span>Subscribe to GAE Conservation Dispatch</span>
              </h4>
              <p className="text-emerald-100/80 text-xs leading-relaxed">
                Quarterly field updates on seedling survival rates, anti-plastic drives, and agroforestry milestones in Bono East Region.
              </p>

              {newsletterSubscribed ? (
                <div className="bg-emerald-900/60 border border-emerald-500/50 p-2.5 rounded-md text-emerald-200 text-xs flex items-center gap-2">
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
                    className="w-full bg-[#032e23] border border-emerald-600 rounded-md px-3 py-2 text-xs text-white placeholder-emerald-300/50 focus:outline-none focus:border-emerald-400"
                  />
                  <button
                    type="submit"
                    disabled={newsletterSending}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-md shrink-0 transition-colors uppercase tracking-wide cursor-pointer disabled:opacity-60"
                  >
                    {newsletterSending ? '...' : 'Join'}
                  </button>
                </form>
              )}

              <div className="pt-2 border-t border-emerald-700/60 flex items-center justify-between text-[11px] text-emerald-300/80">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Strict Privacy Policy
                </span>
                <button
                  onClick={onOpenDonate}
                  className="text-emerald-300 hover:text-white font-semibold cursor-pointer"
                >
                  Donate Direct &rarr;
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Legal Strip */}
          <div className="mt-12 pt-6 border-t border-emerald-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-emerald-300/80 text-[11px]">
            <div className="space-y-1 text-center md:text-left">
              <p>
                Global Alliance on Environment (GAE) is an environmental non-governmental organization registered in Techiman, Bono East Region, Ghana.
              </p>
              <p className="text-emerald-400/60">
                &copy; 2020&ndash;{new Date().getFullYear()}, Global Alliance on Environment. All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-emerald-200">
              <button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors cursor-pointer">
                Privacy Notice
              </button>
              <span className="text-emerald-700">|</span>
              <button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors cursor-pointer">
                Terms of Use
              </button>
              <span className="text-emerald-700">|</span>
              <button onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors cursor-pointer">
                Secretariat Support
              </button>
              <span className="text-emerald-700">|</span>
              <span className="text-emerald-300 font-mono">Region: GH-BE</span>
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
};
