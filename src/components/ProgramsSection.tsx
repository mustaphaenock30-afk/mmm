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

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trees': return <Trees className="w-5 h-5 text-[#ec7211]" />;
      case 'Bird': return <Bird className="w-5 h-5 text-[#ec7211]" />;
      case 'Sprout': return <Sprout className="w-5 h-5 text-[#ec7211]" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-[#ec7211]" />;
      case 'Shovel': return <Shovel className="w-5 h-5 text-[#ec7211]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#ec7211]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#ec7211]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#ec7211]" />;
      case 'Scale': return <Scale className="w-5 h-5 text-[#ec7211]" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-[#ec7211]" />;
      default: return <Trees className="w-5 h-5 text-[#ec7211]" />;
    }
  };

  return (
    <section id="programs" className="py-16 sm:py-20 bg-[#f8f9fa] text-slate-900 border-b border-[#eaeded]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* AWS Style Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#eaeded] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ec7211]">
                SOLUTIONS & PROGRAMS
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-mono">10 Operational Pillars</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161e2d] tracking-tight">
              Conservation Architecture Built for West Africa
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl leading-relaxed">
              Explore GAE's structured action pillars spanning indigenous reforestation, freshwater watershed protection, youth leadership, and circular waste systems.
            </p>
          </div>

          {/* AWS Style Category Tabs */}
          <div className="flex flex-wrap gap-1 bg-[#eaeded] p-1 rounded-xs border border-slate-300 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#232f3e] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* AWS Master / Detail Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: AWS Service List */}
          <div className="lg:col-span-5 space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredPillars.map((pillar) => {
              const isSelected = pillar.id === activePillarId;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`w-full text-left p-3.5 rounded-xs border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#ec7211] border-l-4 shadow-sm'
                      : 'bg-white border-[#eaeded] hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xs flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-[#161e2d] text-white'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {renderIcon(pillar.iconName)}
                    </div>
                    <div>
                      <h3 className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-[#161e2d]' : 'text-slate-900'}`}>
                        {pillar.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {pillar.shortDesc}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-[#ec7211] translate-x-1' : 'text-slate-400'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: AWS Pillar Spotlight Card */}
          <div className="lg:col-span-7 bg-white border border-[#eaeded] border-t-4 border-t-[#ec7211] rounded-xs p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#eaeded] pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xs bg-[#161e2d] text-white flex items-center justify-center shrink-0">
                  {renderIcon(activePillar.iconName)}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#ec7211] uppercase tracking-wider">
                    {activePillar.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#161e2d]">
                    {activePillar.title}
                  </h3>
                </div>
              </div>

              <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded-xs border border-slate-200">
                Pillar {activePillar.id.replace('p', '0')}
              </span>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              {activePillar.fullDesc}
            </p>

            {/* Key Deliverables & Activities */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#161e2d] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#ec7211]" />
                <span>Field Deliverables & Activities:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activePillar.keyActivities.map((activity, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#f8f9fa] border border-[#eaeded] hover:border-slate-300 p-3 rounded-xs text-xs text-slate-800 font-medium flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ec7211] shrink-0" />
                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#eaeded] flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Community Verified Protocol &bull; Techiman, Ghana
              </span>
              <a
                href="#contact"
                className="text-[#0073bb] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Partner on this pillar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
