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
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
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

  const renderIcon = (iconName: string, isWhite: boolean = false) => {
    const iconClass = `w-5 h-5 ${isWhite ? 'text-white' : 'text-emerald-600'}`;
    switch (iconName) {
      case 'Trees': return <Trees className={iconClass} />;
      case 'Bird': return <Bird className={iconClass} />;
      case 'Sprout': return <Sprout className={iconClass} />;
      case 'Droplets': return <Droplets className={iconClass} />;
      case 'Shovel': return <Shovel className={iconClass} />;
      case 'Cpu': return <Cpu className={iconClass} />;
      case 'Building2': return <Building2 className={iconClass} />;
      case 'Compass': return <Compass className={iconClass} />;
      case 'Scale': return <Scale className={iconClass} />;
      case 'BookOpen': return <BookOpen className={iconClass} />;
      default: return <Trees className={iconClass} />;
    }
  };

  return (
    <section id="programs" className="py-16 sm:py-20 bg-white text-slate-900 border-b border-emerald-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-emerald-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                SOLUTIONS & PROGRAMS
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-mono">10 Operational Pillars</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Conservation Architecture Built for West Africa
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl leading-relaxed">
              Explore GAE's structured action pillars spanning indigenous reforestation, freshwater watershed protection, youth leadership, and circular waste systems.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 bg-emerald-50 p-1 rounded-md border border-emerald-200 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Master / Detail Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Service List */}
          <div className="lg:col-span-5 space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredPillars.map((pillar) => {
              const isSelected = pillar.id === activePillarId;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-600 border-l-4 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {renderIcon(pillar.iconName, isSelected)}
                    </div>
                    <div>
                      <h3 className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-emerald-950 font-extrabold' : 'text-slate-800'}`}>
                        {pillar.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {pillar.shortDesc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-emerald-600 translate-x-1' : 'text-slate-400'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Pillar Spotlight Card */}
          <div className="lg:col-span-7 bg-[#f8faf9] border border-emerald-200 border-t-4 border-t-emerald-600 rounded-xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  {renderIcon(activePillar.iconName, true)}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                    {activePillar.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {activePillar.title}
                  </h3>
                </div>
              </div>

              <span className="hidden sm:inline-block text-[11px] font-mono text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md border border-emerald-200 font-semibold">
                Pillar {activePillar.id.replace('p', '0')}
              </span>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              {activePillar.fullDesc}
            </p>

            {/* Key Deliverables & Activities */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Field Deliverables & Activities:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activePillar.keyActivities.map((activity, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border border-emerald-200/90 hover:border-emerald-400 p-3 rounded-md text-xs text-slate-800 font-medium flex items-center gap-2 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Community Verified Protocol &bull; Techiman, Ghana
              </span>
              <a
                href="#contact"
                className="text-emerald-700 hover:text-emerald-800 hover:underline font-bold flex items-center gap-1"
              >
                <span>Partner on this pillar</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
