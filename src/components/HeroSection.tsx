import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavTab } from '../types';
import { GAE_INFO, IMPACT_STATS, GAE_IMAGES } from '../data/gaeData';
import { 
  Trees, 
  GraduationCap, 
  School, 
  Mountain, 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Images,
  MapPin,
  ExternalLink,
  Layers,
  Sprout,
  Droplets,
  Calendar
} from 'lucide-react';

interface HeroSectionProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenDonate: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActiveTab,
  onOpenDonate,
}) => {
  const carouselSlides = [
    {
      id: 'slide-1',
      image: GAE_IMAGES.treePlanting,
      title: 'Youth Anti-Plastic Campaign & Native Tree Planting',
      tabLabel: 'Youth Anti-Plastic',
      location: 'Techiman Municipal, Ghana',
      badge: 'YOUTH ACTION',
      description: 'Mobilizing hundreds of students with placards and indigenous saplings to eliminate single-use plastics and green schoolyards.',
      metric: '1,200+ Students Engaged'
    },
    {
      id: 'slide-2',
      image: GAE_IMAGES.communityCleanup,
      title: 'Civic Sanitation & Drainage Canal Unblocking',
      tabLabel: 'Drainage & Cleanups',
      location: 'Techiman Township Streets',
      badge: 'SANITATION & WASH',
      description: 'Equipping grassroots volunteer squads in high-visibility vests to restore urban waterways and prevent flood hazards.',
      metric: '35+ Tons Debris Cleared'
    },
    {
      id: 'slide-3',
      image: GAE_IMAGES.schoolOutreach,
      title: 'Secondary School Environmental Clubs & Outreach',
      tabLabel: 'School Environmental Clubs',
      location: 'Junior & Senior High Schools',
      badge: 'CLIMATE EDUCATION',
      description: 'Establishing active biodiversity clubs with hands-on curriculum, sapling care, and environmental stewardship toolkits.',
      metric: '15+ Partner Schools'
    },
    {
      id: 'slide-4',
      image: GAE_IMAGES.treeNursery,
      title: 'Central Seedling Nursery & Reforestation Distribution',
      tabLabel: 'Seedling Nurseries',
      location: 'GAE Central Nursery, Bono East',
      badge: 'REFORESTATION',
      description: 'Cultivating over 50,000 indigenous mahogany, acacia, and moringa seedlings for riverbank buffers and community woodlots.',
      metric: '58,500+ Trees Grown'
    },
    {
      id: 'slide-5',
      image: GAE_IMAGES.greenGhanaDelegation,
      title: 'Green Ghana Municipal Tree Planting Partnership',
      tabLabel: 'Green Ghana Day',
      location: 'Techiman Municipal Assembly',
      badge: 'POLICY & CIVIC ACTION',
      description: 'Collaborating directly with traditional chiefs, the Municipal Chief Executive, and security services for regional reforestation.',
      metric: 'Annual Civic Milestone'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, carouselSlides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const activeSlide = carouselSlides[currentSlide];

  return (
    <div className="w-full bg-[#0f172a] text-white">
      
      {/* ========================================================
          AWS HERO BANNER: Deep Navy, High Contrast, Technical Grid
         ======================================================== */}
      <section className="relative overflow-hidden pt-8 pb-14 lg:pt-12 lg:pb-16 border-b border-[#232f3e]">
        
        {/* AWS Ambient Technical Background: Grid & Subtle Radial Glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(rgba(236, 114, 17, 0.25) 1px, transparent 1px)`,
            backgroundSize: '28px 28px'
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ec7211]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* AWS Style Eyebrow Tag */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#ff9900] bg-[#161e2d] border border-[#384659] px-2.5 py-1 rounded-xs inline-flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#ec7211]" />
              GAE CLOUD CONSERVATION ARCHITECTURE &bull; TECHIMAN, GHANA
            </span>
            <span className="hidden sm:inline-block text-[11px] text-slate-400 font-mono">
              Registered NGO &bull; Founded July 24, 2020
            </span>
          </div>

          {/* 2-Column Grid: AWS Hero Headline & Media Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Bold AWS Enterprise Copy & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                Restoring Degraded Landscapes with{' '}
                <span className="text-[#ff9900]">Scalable Community Action</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                Global Alliance on Environment (GAE) delivers measurable conservation across Ghana: deploying decentralized seedling nurseries, protecting freshwater riverbanks, mobilizing youth anti-plastic campaigns, and advancing sustainable agroforestry.
              </p>

              {/* AWS Feature Checkpoints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-2 bg-[#161e2d]/80 border border-[#2a3447] p-2 rounded-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#ec7211] shrink-0" />
                  <span>58,500+ Indigenous Saplings Planted</span>
                </div>
                <div className="flex items-center gap-2 bg-[#161e2d]/80 border border-[#2a3447] p-2 rounded-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#ec7211] shrink-0" />
                  <span>15+ Active High School Clubs</span>
                </div>
                <div className="flex items-center gap-2 bg-[#161e2d]/80 border border-[#2a3447] p-2 rounded-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#ec7211] shrink-0" />
                  <span>Freshwater River Protection</span>
                </div>
                <div className="flex items-center gap-2 bg-[#161e2d]/80 border border-[#2a3447] p-2 rounded-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#ec7211] shrink-0" />
                  <span>Community Sanitation Operations</span>
                </div>
              </div>

              {/* AWS Button Group */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                {/* Primary AWS Orange Button */}
                <button
                  onClick={onOpenDonate}
                  className="bg-[#ec7211] hover:bg-[#eb5f07] active:bg-[#d85800] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Support GAE via Paystack</span>
                </button>

                {/* Secondary AWS Outline Button */}
                <button
                  onClick={() => setActiveTab('programs')}
                  className="bg-transparent hover:bg-white/10 text-white border border-slate-400 hover:border-white font-semibold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore 10 Core Pillars</span>
                  <ArrowRight className="w-4 h-4 text-[#ff9900]" />
                </button>

                {/* Tertiary Quick Link */}
                <button
                  onClick={() => setActiveTab('gallery')}
                  className="text-slate-300 hover:text-[#ff9900] text-xs font-semibold flex items-center gap-1.5 py-2 px-1 transition-colors"
                >
                  <Images className="w-4 h-4 text-[#ec7211]" />
                  <span>View 9 Field Photos</span>
                </button>
              </div>

              {/* Disclaimer Strip */}
              <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1 border-t border-[#232f3e]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Verified non-profit documentation. Transparent donor accountability via Paystack.</span>
              </div>

            </div>

            {/* Right Column: AWS Technical Media Showcase & Slide Deck */}
            <div 
              className="lg:col-span-6 relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Outer AWS Media Shell */}
              <div className="rounded-xs border border-[#384659] bg-[#161e2d] shadow-2xl overflow-hidden">
                
                {/* Top Control Header in Showcase */}
                <div className="bg-[#232f3e] px-4 py-2.5 border-b border-[#384659] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ec7211]" />
                    <span className="font-mono text-[11px] font-bold text-white tracking-wider">
                      GAE FIELD PHOTOGRAPHY REPOSITORY
                    </span>
                  </div>

                  {/* Slide Navigation & Play/Pause */}
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-[10px] font-mono text-slate-400 mr-1">
                      {currentSlide + 1} of {carouselSlides.length}
                    </span>
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="p-1 hover:text-white hover:bg-[#161e2d] rounded-xs transition-colors"
                      title={isPaused ? 'Resume autoplay' : 'Pause slideshow'}
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5 text-[#ff9900]" /> : <Pause className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={handlePrev}
                      className="p-1 hover:text-white hover:bg-[#161e2d] rounded-xs transition-colors"
                      title="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-1 hover:text-white hover:bg-[#161e2d] rounded-xs transition-colors"
                      title="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main Media Viewport */}
                <div className="relative h-[320px] sm:h-[390px] w-full bg-[#0a0f18] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeSlide.id}
                      src={activeSlide.image}
                      alt={activeSlide.title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45 }}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>

                  {/* Gradient Scrim for Technical Caption Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent pointer-events-none" />

                  {/* Top Eyebrow Tag on Slide */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-[#161e2d]/90 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-xs border border-[#384659] backdrop-blur-sm">
                      {activeSlide.badge}
                    </span>
                  </div>

                  {/* Bottom Technical Caption Card */}
                  <div className="absolute bottom-3 left-3 right-3 z-20">
                    <div className="bg-[#161e2d]/95 backdrop-blur-md border border-[#384659] p-3.5 rounded-xs space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-white text-xs sm:text-sm line-clamp-1">
                          {activeSlide.title}
                        </h3>
                        <span className="text-[11px] font-mono text-[#ff9900] font-bold shrink-0">
                          {activeSlide.metric}
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-snug line-clamp-2">
                        {activeSlide.description}
                      </p>
                      <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#ec7211]" />
                          {activeSlide.location}
                        </span>
                        <span className="text-emerald-400 font-semibold">Verified Field Record</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AWS Product Tabs Under Carousel */}
                <div className="bg-[#161e2d] border-t border-[#384659] grid grid-cols-5 text-center text-xs divide-x divide-[#2a3447]">
                  {carouselSlides.map((slide, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => setCurrentSlide(idx)}
                        className={`py-2 px-1.5 transition-colors cursor-pointer text-left sm:text-center ${
                          isActive
                            ? 'bg-[#232f3e] text-white border-b-2 border-[#ec7211]'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a2333]'
                        }`}
                      >
                        <span className="block font-mono text-[9px] text-[#ff9900] uppercase">
                          0{idx + 1}
                        </span>
                        <span className="text-[10px] font-semibold line-clamp-1">
                          {slide.tabLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================
          AWS 4-COLUMN SOLUTION STRIP: Featured Conservation Cloud
         ======================================================== */}
      <section className="bg-[#161e2d] border-b border-[#232f3e] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#2a3447] pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase text-[#ff9900] font-bold tracking-wider">
                MEASURABLE CONSERVATION IMPACT
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                GAE Field Infrastructure & Metrics
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('programs')}
              className="text-xs font-semibold text-[#ff9900] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore all 10 pillars</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ec7211]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {IMPACT_STATS.map((stat, idx) => {
              const renderIcon = () => {
                switch (stat.icon) {
                  case 'Trees': return <Trees className="w-5 h-5 text-[#ff9900]" />;
                  case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-[#ff9900]" />;
                  case 'School': return <School className="w-5 h-5 text-[#ff9900]" />;
                  case 'Mountain': return <Mountain className="w-5 h-5 text-[#ff9900]" />;
                  default: return <Trees className="w-5 h-5 text-[#ff9900]" />;
                }
              };

              return (
                <div
                  key={idx}
                  className="bg-[#232f3e] border border-[#384659] hover:border-[#ec7211] p-5 rounded-xs transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xs bg-[#161e2d] border border-slate-700 flex items-center justify-center">
                        {renderIcon()}
                      </div>
                      <span className="text-2xl font-extrabold text-white font-mono tracking-tight">
                        {stat.value.toLocaleString()}{stat.unit}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-[#ff9900] transition-colors">
                      {stat.label}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#2a3447] flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">Techiman & Bono East</span>
                    <button 
                      onClick={() => setActiveTab('projects')}
                      className="text-[#ff9900] hover:underline flex items-center gap-0.5 font-semibold"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
