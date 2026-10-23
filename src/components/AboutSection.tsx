import React, { useState } from 'react';
import { GAE_INFO } from '../data/gaeData';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Heart, 
  Globe, 
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'values' | 'history'>('mission');

  return (
    <section id="about" className="py-16 sm:py-20 bg-[#f8f9fa] text-slate-900 border-b border-[#eaeded]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* AWS Style Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#eaeded] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ec7211]">
                ABOUT GAE &bull; GOVERNANCE & CHARTER
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-mono">Registered Non-Governmental Organization</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161e2d] tracking-tight">
              Rooted in Community. Built for Ecological Impact.
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl leading-relaxed">
              Established July 24, 2020 in Techiman, Bono East Region, Ghana. We mobilize youth, farmers, and civil society to build scalable, ground-truth conservation solutions.
            </p>
          </div>

          {/* AWS Style Segmented Tabs */}
          <div className="flex bg-[#eaeded] p-1 rounded-xs border border-slate-300 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'mission'
                  ? 'bg-[#232f3e] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Mission & Vision</span>
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'values'
                  ? 'bg-[#232f3e] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>7 Core Values</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-[#232f3e] text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Governance & Origin</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'mission' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Mission Card */}
            <div className="bg-white border border-[#eaeded] border-t-4 border-t-[#ec7211] rounded-xs p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-slate-400 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xs bg-[#161e2d] flex items-center justify-center text-[#ff9900] mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#161e2d] mb-2">Our Mission</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  "{GAE_INFO.mission}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#eaeded] text-xs text-[#0073bb] font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ec7211]" />
                <span>Action-Oriented Environmental Stewardship</span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white border border-[#eaeded] border-t-4 border-t-[#161e2d] rounded-xs p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:border-slate-400 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xs bg-[#161e2d] flex items-center justify-center text-[#ff9900] mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#161e2d] mb-2">Our Vision</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  "{GAE_INFO.vision}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#eaeded] text-xs text-[#0073bb] font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#ec7211]" />
                <span>Ecological Integrity & Sustainable Agriculture in West Africa</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'values' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GAE_INFO.coreValues.map((val, index) => (
              <div
                key={index}
                className="bg-white border border-[#eaeded] hover:border-[#ec7211] p-5 rounded-xs transition-all duration-150 group flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[11px] font-mono font-bold text-[#ff9900] bg-[#161e2d] px-2 py-0.5 rounded-xs mb-3">
                    VALUE 0{index + 1}
                  </span>
                  <h4 className="text-sm font-bold text-[#161e2d] mb-1.5 group-hover:text-[#ec7211] transition-colors">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white border border-[#eaeded] border-t-4 border-t-[#ec7211] rounded-xs p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-[#eaeded] pb-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#ec7211] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] text-slate-500 uppercase font-mono font-bold">Incorporation Date</h4>
                  <p className="text-sm font-bold text-[#161e2d]">{GAE_INFO.establishedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#ec7211] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] text-slate-500 uppercase font-mono font-bold">Headquarters Secretariat</h4>
                  <p className="text-sm font-bold text-[#161e2d]">{GAE_INFO.headquarters}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] text-slate-500 uppercase font-mono font-bold">Registration Status</h4>
                  <p className="text-sm font-bold text-[#161e2d]">{GAE_INFO.registrationType}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                Global Alliance on Environment was created in response to escalating climate threats in West Africa's forest transition zone, centered in Techiman in the Bono East Region of Ghana. With rapid deforestation, agricultural land degradation, and shifting rainfall patterns affecting rural families, GAE was officially established on July 24, 2020.
              </p>
              <p>
                Founded under the leadership of Mr. Michael Mustapha (Founder), Mr. Enock Mustapha (CEO), and Mr. Yong Osman (Director), the organization operates with strict field transparency, municipal civic partnerships, and hands-on youth involvement.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
