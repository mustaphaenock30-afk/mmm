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
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Images,
  MapPin
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
      title: 'Youth Anti-Plastic & Tree Planting Drive',
      location: 'Techiman, Bono East Region',
      tag: 'Youth Outreach',
      description: 'Students holding anti-plastic campaign banners while planting indigenous shade saplings in schoolyards.'
    },
    {
      id: 'slide-2',
      image: GAE_IMAGES.communityCleanup,
      title: 'Community Sanitation & Gutter Cleanups',
      location: 'Techiman Township Streets',
      tag: 'Sanitation',
      description: 'GAE volunteers in reflective safety vests clearing drainage channels and sorting recyclable waste.'
    },
    {
      id: 'slide-3',
      image: GAE_IMAGES.schoolOutreach,
      title: 'School Environmental Clubs & Workshops',
      location: 'Junior & Senior High Schools',
      tag: 'Education',
      description: 'Mobilizing hundreds of young climate leaders with practical environmental care toolkits.'
    },
    {
      id: 'slide-4',
      image: GAE_IMAGES.treeNursery,
      title: 'Seedling Nurseries & Sapling Distribution',
      location: 'GAE Central Nursery',
      tag: 'Reforestation',
      description: 'Cultivating over 50,000 mahogany, acacia, and moringa seedlings for riverbank protection.'
    },
    {
      id: 'slide-5',
      image: GAE_IMAGES.greenGhanaDelegation,
      title: 'Green Ghana Municipal Tree Planting',
      location: 'Municipal Chief Executive Assembly',
      tag: 'Civic Action',
      description: 'Partnering with local government leaders, police commanders, and students for Green Ghana Day.'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);
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
    <section className="relative bg-white text-slate-900 overflow-hidden pt-6 pb-16 lg:py-20 border-b border-slate-100">
      {/* Subtle Background Accent Blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-50/70 via-slate-50/50 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold mb-6 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Non-Governmental Organization &bull; Est. July 24, 2020</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="hidden sm:inline-block text-emerald-700">Techiman, Ghana</span>
        </motion.div>

        {/* Main Grid: Headline & Featured Hero Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Protecting Nature Through{' '}
              <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Environmental Restoration
              </span>{' '}
              & Conservation
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
              Global Alliance on Environment (GAE) mobilizes local youth, farmers, and communities across Ghana to reforest degraded landscapes, fight plastic pollution, protect freshwater riverbanks, and build climate resilience.
            </p>

            {/* Quick Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Reforestation & Seedling Nurseries</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Youth Climate & Anti-Plastic Clubs</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Clean Water & River Protection</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Community Sanitation Operations</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab('programs')}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
              >
                <span>Explore Core Programs</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab('gallery')}
                className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-sm transition-all flex items-center gap-2"
              >
                <Images className="w-4 h-4 text-emerald-600" />
                <span>View Field Gallery</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenDonate}
                className="px-5 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-sm transition-all flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                <span>Donate via Paystack</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: Interactive Field Action Carousel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-2xl shadow-slate-300/50 group">
              
              {/* Slide Image with Transition */}
              <div className="relative h-[360px] sm:h-[440px] w-full overflow-hidden bg-slate-950">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeSlide.id}
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>

                {/* Dark Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Slide Top Pill Badge & Controls */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                  <span className="bg-emerald-600/90 text-white text-[10px] sm:text-xs font-extrabold uppercase px-3 py-1 rounded-full border border-emerald-400/40 shadow-md backdrop-blur-sm">
                    {activeSlide.tag}
                  </span>

                  <div className="flex items-center gap-1.5 bg-slate-950/70 border border-slate-700/80 p-1 rounded-full backdrop-blur-md">
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                      title={isPaused ? 'Play Slideshow' : 'Pause Slideshow'}
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={handlePrev}
                      className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                      title="Previous Slide"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleNext}
                      className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
                      title="Next Slide"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Slide Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white shadow-xl space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-white line-clamp-1">
                          {activeSlide.title}
                        </h3>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1 shrink-0">
                          <MapPin className="w-3 h-3 text-emerald-400" />
                          {activeSlide.location}
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs leading-snug line-clamp-2">
                        {activeSlide.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Carousel Slide Indicators */}
              <div className="bg-slate-950 p-3 border-t border-slate-800 flex items-center justify-between px-4">
                <div className="flex items-center gap-1.5">
                  {carouselSlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'w-6 bg-emerald-500'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <span className="text-[10px] text-slate-400 font-mono font-medium">
                  {currentSlide + 1} / {carouselSlides.length} &bull; GAE Field Records
                </span>
              </div>

            </div>

            {/* Floating Quick Stat Pill */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 hidden sm:flex items-center gap-3 bg-white border border-emerald-200 p-3 rounded-2xl shadow-xl backdrop-blur-md z-30"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Trees className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Total Trees Planted</p>
                <p className="text-base font-extrabold text-slate-900">58,500+ Saplings</p>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Impact Statistics Counter Strip */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <div className="text-center mb-8">
            <h2 className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              Measurable Local & Regional Impact
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {IMPACT_STATS.map((stat, idx) => {
              const renderIcon = () => {
                switch (stat.icon) {
                  case 'Trees': return <Trees className="w-5 h-5 text-emerald-600" />;
                  case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-teal-600" />;
                  case 'School': return <School className="w-5 h-5 text-emerald-600" />;
                  case 'Mountain': return <Mountain className="w-5 h-5 text-teal-600" />;
                  default: return <Trees className="w-5 h-5 text-emerald-600" />;
                }
              };

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="bg-slate-50 border border-slate-200 hover:border-emerald-400 p-4 sm:p-5 rounded-2xl transition-all duration-200 group hover:-translate-y-1 shadow-xs"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {renderIcon()}
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                      {stat.value.toLocaleString()}{stat.unit}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-800 mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
