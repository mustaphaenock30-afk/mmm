import React, { useState } from 'react';
import { PROGRAM_PILLARS } from '../data/gaeData';
import { 
  Trees, 
  Bird, 
  Sprout, 
  Droplets, 
  Shovel, 
  Cpu, 
  Building2, 
  Compass, 
  Scale, 
  BookOpen,
  ChevronRight,
  Filter,
  Layers
} from 'lucide-react';

export const ProgramsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePillarId, setActivePillarId] = useState<string>(PROGRAM_PILLARS[0].id);

  const categories = ['All', 'Ecosystems', 'Agriculture', 'Water & WASH', 'Youth Outreach'];

  const filteredPillars = PROGRAM_PILLARS.filter(p => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Ecosystems') return p.category.includes('Ecosystem') || p.category.includes('Biodiversity');
    if (selectedCategory === 'Agriculture') return p.category.includes('Resilience') || p.category.includes('Community');
    if (selectedCategory === 'Water & WASH') return p.category.includes('Public Health');
    if (selectedCategory === 'Youth Outreach') return p.category.includes('Youth Leadership');
    return true;
  });

  const activePillar = PROGRAM_PILLARS.find(p => p.id === activePillarId) || PROGRAM_PILLARS[0];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trees': return <Trees className="w-5 h-5" />;
      case 'Bird': return <Bird className="w-5 h-5" />;
      case 'Sprout': return <Sprout className="w-5 h-5" />;
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      case 'Shovel': return <Shovel className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Scale': return <Scale className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      default: return <Trees className="w-5 h-5" />;
    }
  };

  return (
    <section id="programs" className="py-16 sm:py-20 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Core Environmental Pillars</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our 10 Pillars of Action
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              From community nursery establishment to freshwater protection and climate advocacy, explore GAE's structured programs across Ghana.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Master / Detail Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: List of Pillars */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[600px] overflow-y-auto pr-2">
            {filteredPillars.map((pillar) => {
              const isSelected = pillar.id === activePillarId;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-400 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200 group-hover:bg-emerald-200'
                    }`}>
                      {renderIcon(pillar.iconName)}
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold ${isSelected ? 'text-emerald-950' : 'text-slate-900'}`}>
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {pillar.shortDesc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-emerald-700 translate-x-1' : 'text-slate-400 group-hover:text-slate-600'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Pillar Spotlight */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  {renderIcon(activePillar.iconName)}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-emerald-700 uppercase font-bold tracking-widest">
                    Pillar Spotlight
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {activePillar.title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {activePillar.fullDesc}
            </p>

            {/* Key Activities / Targets */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Strategic Focus Areas & Key Activities:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePillar.keyActivities.map((activity, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border border-slate-200 p-3.5 rounded-xl text-xs text-slate-800 font-semibold flex items-center gap-2.5 shadow-xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-emerald-700">Global Alliance on Environment Initiative</span>
              <span>Techiman, Ghana</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
