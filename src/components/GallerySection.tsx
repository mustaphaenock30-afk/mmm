import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GAE_IMAGES } from '../data/gaeData';
import { 
  Images, 
  Camera, 
  MapPin, 
  Calendar, 
  Upload, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  X,
  Maximize2,
  Tag,
  Share2
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
    <section className="py-16 sm:py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Images className="w-4 h-4 text-emerald-600" />
            <span>Field Media & Photo Archive</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            GAE Conservation Field Gallery
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Authentic photographic records from our tree nurseries, youth school anti-plastic drives, street sanitation operations, and municipal tree planting delegations in Techiman, Ghana.
          </p>
        </motion.div>

        {/* Category Filter Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Gallery Items Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => setSelectedImage(item)}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-500 hover:shadow-xl transition-all group flex flex-col justify-between cursor-pointer"
              >
                {/* Photo Frame */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs border border-emerald-400/30">
                      {item.category}
                    </span>
                  </div>

                  {/* Lightbox Zoom Icon Overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-xs">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Location Tag Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white text-[11px] font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      {item.location}
                    </span>
                    <span className="text-[10px] bg-slate-900/80 px-2 py-0.5 rounded font-mono">
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* Card Body Information */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-1.5">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Media Contribution Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Media Contributions & Press Enquiries</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Are you a Field Photographer or Volunteer?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We welcome high-resolution photos and video drone footage from community tree planting days, nursery management, and water conservation events across the Bono East Region.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all shrink-0 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Submit Media / Request Access</span>
          </button>
        </motion.div>

      </div>

      {/* Lightbox Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-700 text-white rounded-2xl max-w-3xl w-full overflow-hidden relative shadow-2xl space-y-0"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-30 p-2.5 bg-slate-950/80 hover:bg-slate-800 text-slate-200 hover:text-white rounded-full transition-colors border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-16/10 bg-slate-950 overflow-hidden">
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title} 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 space-y-3 bg-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full">
                    {selectedImage.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Recorded: {selectedImage.date} &bull; {selectedImage.location}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedImage.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedImage.description}
                </p>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedImage.tags.map((tag, idx) => (
                      <span key={idx} className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Media Submission Modal */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl space-y-5 text-slate-900"
            >
              <button
                onClick={() => { setIsSubmitModalOpen(false); setSubmitSuccess(false); }}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {submitSuccess ? (
                <div className="text-center space-y-4 py-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Media Request Received!</h3>
                  <p className="text-xs text-slate-600">
                    Thank you. Our media desk will review your submission details and email you instructions to upload high-res RAW/JPEG field media.
                  </p>
                  <button
                    onClick={() => { setIsSubmitModalOpen(false); setSubmitSuccess(false); }}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitPhoto} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      GAE Media Desk
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">Submit Field Photos</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Share community photos or request high-resolution press assets from GAE operations.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. photographer@example.com"
                      value={submitEmail}
                      onChange={(e) => setSubmitEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
                  >
                    Send Media Contribution Request
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
