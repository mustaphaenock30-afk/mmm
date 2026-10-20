import React, { useState } from 'react';
import { GAE_INFO } from '../data/gaeData';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Users, 
  Heart, 
  Globe, 
  Sparkles,
  MapPin,
  Calendar
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'values' | 'history'>('mission');

  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold mb-3 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>Who We Are &bull; Global Alliance on Environment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Rooted in Community. Driven by Purpose.
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Established on July 24, 2020 in Techiman, Bono East Region, Ghana, GAE addresses environmental degradation by mobilizing farmers, youth, and communities to create sustainable, action-oriented solutions.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-white border border-slate-200 rounded-2xl gap-1 shadow-sm">
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'mission'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Mission & Vision</span>
            </button>
            <button
              onClick={() => setActiveTab('values')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'values'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>7 Core Values</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>History & Location</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'mission' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch animate-fadeIn">
            {/* Mission Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/50 hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  "{GAE_INFO.mission}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-emerald-700 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Action-Oriented Environmental Leadership</span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between group hover:border-teal-500/50 hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700 mb-4">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  "{GAE_INFO.vision}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-teal-700 font-bold flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-600" />
                <span>Ecological Integrity & Economic Sustainability</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'values' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fadeIn">
            {GAE_INFO.coreValues.map((val, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 p-5 rounded-2xl hover:border-emerald-400 hover:shadow-sm transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 text-xs font-extrabold font-mono mb-3 group-hover:scale-110 transition-transform">
                  0{index + 1}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1.5">{val.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 shadow-sm animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-100 pb-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs text-slate-500 uppercase font-bold tracking-wider">Date Established</h4>
                  <p className="text-sm font-bold text-slate-900">{GAE_INFO.establishedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs text-slate-500 uppercase font-bold tracking-wider">Headquarters</h4>
                  <p className="text-sm font-bold text-slate-900">{GAE_INFO.headquarters}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs text-slate-500 uppercase font-bold tracking-wider">Legal Entity</h4>
                  <p className="text-sm font-bold text-slate-900">{GAE_INFO.registrationType}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                Global Alliance on Environment was created in response to escalating climate threats in West Africa's forest transition zone, specifically around Techiman in the Bono East Region of Ghana. With rapid deforestation, agricultural land degradation, and shifting rainfall patterns affecting rural families, GAE was launched on July 24, 2020.
              </p>
              <p>
                Founder Mr. Michael Mustapha, CEO Mr. Enock Mustapha, and Director Mr. Yong Osman recognized that sustainable conservation could only succeed if local stakeholders were equipped with environmental literacy, practical skills, and ownership of restoration projects.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
