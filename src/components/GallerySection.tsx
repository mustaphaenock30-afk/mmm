import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GAE_IMAGES } from '../data/gaeData';
import { 
  Images, 
  MapPin, 
  Upload, 
  ArrowRight, 
  CheckCircle2,
  X,
  Maximize2,
  ExternalLink,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  image: string;
  description: string;
  tags: string[];
}

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitEmail, setSubmitEmail] = useState<string>('');
  const [submitTitle, setSubmitTitle] = useState<string>('');

  const categories = ['All', 'Youth Outreach', 'Sanitation & Cleanup', 'Tree Nurseries', 'Municipal Action', 'Conferences & Workshops'];

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Youth Anti-Plastic Campaign & Schoolyard Tree Planting',
      category: 'Youth Outreach',
      location: 'Techiman South District, Ghana',
      date: 'October 2024',
      image: GAE_IMAGES.treePlanting,
      description: 'School students holding signs saying "THINK BEFORE YOU TRASH" and "STOP PLASTIC POLLUTION" while planting native tree saplings.',
      tags: ['Youth Outreach', 'Anti-Plastic', 'Tree Planting']
    },
    {
      id: 'gal-2',
      title: 'Community Sanitation & Fieldwork Banner Delegation',
      category: 'Sanitation & Cleanup',
      location: 'Techiman Township, Bono East',
      date: 'August 2024',
      image: GAE_IMAGES.communityCleanup,
      description: 'GAE field volunteers wearing bright high-visibility safety vests with wheelbarrows and the official GAE banner.',
      tags: ['Sanitation', 'Cleanups', 'Volunteers']
    },
    {
      id: 'gal-3',
      title: 'School Environmental Club Outreach & Rally',
      category: 'Youth Outreach',
      location: 'Techiman Municipal Schools',
      date: 'September 2024',
      image: GAE_IMAGES.schoolOutreach,
      description: 'Ghanaian school students waving cheerfully with instructors and holding the Global Alliance on Environment banner.',
      tags: ['School Clubs', 'Youth Action', 'Education']
    },
    {
      id: 'gal-4',
      title: 'Community Seedling Nursery & Reforestation Site',
      category: 'Tree Nurseries',
      location: 'GAE Central Nursery, Techiman',
      date: 'July 2024',
      image: GAE_IMAGES.treeNursery,
      description: 'Neat rows of mahogany, acacia, and fruit tree saplings growing under a rustic thatched shade canopy.',
      tags: ['Tree Nursery', 'Seedlings', 'Agroforestry']
    },
    {
      id: 'gal-5',
      title: 'Youth Climate Change Education Summit',
      category: 'Conferences & Workshops',
      location: 'Techiman Town Hall Auditorium',
      date: 'October 2024',
      image: GAE_IMAGES.youthWorkshop,
      description: 'Students seated attentively in an auditorium listening to climate adaptation and forest protection workshops.',
      tags: ['Youth Summit', 'Climate Education', 'GES']
    },
    {
      id: 'gal-6',
      title: 'Green Ghana Municipal Tree Planting Delegation',
      category: 'Municipal Action',
      location: 'Techiman Municipal Assembly Compound',
      date: 'June 2023',
      image: GAE_IMAGES.greenGhanaDelegation,
      description: 'Municipal Chief Executive, police officers, and school students planting trees for the Green Ghana Project.',
      tags: ['Green Ghana', 'Municipal Action', 'Tree Canopy']
    },
    {
      id: 'gal-7',
      title: 'Street Sanitation & Gutter Maintenance Operation',
      category: 'Sanitation & Cleanup',
      location: 'Bono East Township Streets',
      date: 'November 2024',
      image: GAE_IMAGES.streetSanitationSweeper,
      description: 'Sanitation field worker sweeping dirt roads and clearing debris from roadside drainage channels.',
      tags: ['Drainage', 'Sanitation', 'Community Cleanliness']
    },
    {
      id: 'gal-8',
      title: 'EPA Stakeholder Environmental Protection Conference',
      category: 'Conferences & Workshops',
      location: 'Techiman Conference Center',
      date: 'May 2024',
      image: GAE_IMAGES.epaStakeholderSpeaker,
      description: 'Environmental protection speaker addressing local chiefs and civil society leaders at a conservation symposium.',
      tags: ['EPA', 'Stakeholders', 'Policy']
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleSubmitPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitEmail) return;
    setSubmitSuccess(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-white text-slate-900 border-b border-[#eaeded]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* AWS Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#eaeded] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ec7211]">
                FIELD REPOSITORY &bull; MULTIMEDIA EVIDENCE
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-mono">{galleryItems.length} Verified Media Records</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161e2d] tracking-tight">
              Photographic Documentation of Community Impact
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl leading-relaxed">
              Authentic photographic documentation from our seedling nurseries, youth school anti-plastic drives, street sanitation operations, and municipal tree planting delegations in Techiman, Ghana.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="self-start md:self-auto bg-[#161e2d] hover:bg-[#232f3e] text-white text-xs font-bold px-4 py-2.5 rounded-xs transition-colors flex items-center gap-2 cursor-pointer border border-slate-700"
          >
            <Upload className="w-3.5 h-3.5 text-[#ff9900]" />
            <span>Submit Media / Press</span>
          </button>
        </div>

        {/* AWS Category Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-[#f8f9fa] p-1.5 rounded-xs border border-[#eaeded]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xs text-xs font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#232f3e] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="bg-white border border-[#eaeded] hover:border-[#ec7211] rounded-xs overflow-hidden transition-all duration-200 group flex flex-col justify-between cursor-pointer hover:shadow-md"
            >
              {/* Photo Frame */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#161e2d]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#161e2d]/90 via-[#161e2d]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-[#161e2d]/90 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs border border-slate-600 backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                {/* Lightbox Zoom Icon Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <div className="w-10 h-10 rounded-xs bg-[#ec7211] text-white flex items-center justify-center shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Location Tag Bottom */}
                <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-white text-[11px] font-medium font-mono">
                  <span className="flex items-center gap-1 text-slate-200 truncate">
                    <MapPin className="w-3 h-3 text-[#ff9900] shrink-0" />
                    {item.location}
                  </span>
                  <span className="text-[10px] text-slate-300 shrink-0 ml-2">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Card Body Information */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#161e2d] group-hover:text-[#ec7211] transition-colors line-clamp-2 mb-1">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Tags & Action */}
                <div className="pt-3 border-t border-[#eaeded] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded-xs font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-bold text-[#0073bb] group-hover:underline flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AWS Style Media Contribution Banner */}
        <div className="bg-[#161e2d] text-white border border-[#384659] rounded-xs p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-mono font-bold uppercase text-[#ff9900] bg-[#232f3e] px-2 py-0.5 rounded-xs border border-slate-700">
              GAE MEDIA DESK &bull; PRESS ARCHIVE
            </span>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Field Photographers, Researchers & Press
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We welcome high-resolution photos, drone surveys, and video documentation from community tree planting days, nursery operations, and water conservation events across Techiman and Bono East Region.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-5 py-3 rounded-xs bg-[#ec7211] hover:bg-[#eb5f07] text-white font-bold text-xs uppercase tracking-wide transition-colors shrink-0 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span>Submit Media / Request Access</span>
          </button>
        </div>

      </div>

      {/* Lightbox Image Preview Modal: AWS Dark Theme */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#161e2d] border border-[#384659] text-white rounded-xs max-w-3xl w-full overflow-hidden relative shadow-2xl space-y-0"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 z-30 p-2 bg-[#232f3e] hover:bg-[#2c3b4e] text-slate-200 hover:text-white rounded-xs transition-colors border border-slate-600 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-16/10 bg-[#0a0f18] overflow-hidden">
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 space-y-3 bg-[#161e2d]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-[#232f3e] text-[#ff9900] border border-slate-700 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-xs">
                    {selectedImage.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Recorded: {selectedImage.date} &bull; {selectedImage.location}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {selectedImage.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedImage.description}
                </p>

                <div className="pt-3 border-t border-[#2a3447] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedImage.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-[#232f3e] text-slate-300 px-2 py-0.5 rounded-xs font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="px-4 py-2 rounded-xs bg-[#232f3e] hover:bg-[#2c3b4e] border border-slate-600 text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Media Submission Modal: AWS Form Styling */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#eaeded] rounded-xs max-w-md w-full p-6 sm:p-8 relative shadow-2xl space-y-4 text-slate-900"
            >
              <button
                onClick={() => { setIsSubmitModalOpen(false); setSubmitSuccess(false); }}
                className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xs transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {submitSuccess ? (
                <div className="text-center space-y-3 py-4">
                  <div className="w-12 h-12 rounded-xs bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Media Request Received!</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Thank you. The GAE Secretariat desk will review your details and send you instructions to transmit high-resolution assets.
                  </p>
                  <button
                    onClick={() => { setIsSubmitModalOpen(false); setSubmitSuccess(false); }}
                    className="w-full py-2.5 bg-[#232f3e] hover:bg-[#161e2d] text-white text-xs font-bold rounded-xs cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitPhoto} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#ec7211]">
                      GAE MEDIA & PRESS DESK
                    </span>
                    <h3 className="text-lg font-extrabold text-[#161e2d] mt-0.5">Submit Field Photography</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Share community photos or request high-resolution press assets from GAE operations.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="photographer@organization.org"
                      value={submitEmail}
                      onChange={(e) => setSubmitEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xs px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#ec7211]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Event / Photo Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Techiman Tree Planting Drive 2026"
                      value={submitTitle}
                      onChange={(e) => setSubmitTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xs px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#ec7211]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#ec7211] hover:bg-[#eb5f07] text-white font-bold text-xs uppercase tracking-wide rounded-xs shadow-sm transition-colors cursor-pointer"
                  >
                    Send Media Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
