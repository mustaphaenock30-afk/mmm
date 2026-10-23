import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavTab } from '../types';
import { PROGRAM_PILLARS, PROJECTS, NEWS_ARTICLES, TEAM_MEMBERS } from '../data/gaeData';
import { 
  Search, 
  X, 
  Trees, 
  FolderKanban, 
  Newspaper, 
  User, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: NavTab) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  setActiveTab,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchQuery = query.toLowerCase().trim();

  // Search Results Filtering
  const pillarResults = searchQuery 
    ? PROGRAM_PILLARS.filter(p => p.title.toLowerCase().includes(searchQuery) || p.shortDesc.toLowerCase().includes(searchQuery))
    : [];

  const projectResults = searchQuery
    ? PROJECTS.filter(p => p.title.toLowerCase().includes(searchQuery) || p.summary.toLowerCase().includes(searchQuery) || p.location.toLowerCase().includes(searchQuery))
    : [];

  const articleResults = searchQuery
    ? NEWS_ARTICLES.filter(a => a.title.toLowerCase().includes(searchQuery) || a.summary.toLowerCase().includes(searchQuery))
    : [];

  const teamResults = searchQuery
    ? TEAM_MEMBERS.filter(t => t.name.toLowerCase().includes(searchQuery) || t.role.toLowerCase().includes(searchQuery))
    : [];

  const totalResults = pillarResults.length + projectResults.length + articleResults.length + teamResults.length;

  const handleSelect = (tab: NavTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/75 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className="bg-white border-2 border-emerald-200 rounded-xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[85vh] flex flex-col font-sans"
        >
          
          {/* Header */}
          <div className="flex items-center justify-between mb-3 border-b border-emerald-100 pb-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700">
              GAE GLOBAL RESOURCE CATALOG SEARCH
            </span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 text-xs flex items-center gap-1 cursor-pointer"
            >
              <kbd className="text-[10px] bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded-xs font-mono">ESC</kbd>
              <span>to close</span>
            </button>
          </div>

          {/* Search Input Bar */}
          <div className="relative mb-4 flex items-center">
            <Search className="w-4 h-4 text-emerald-600 absolute left-3.5" />
            <input
              type="text"
              autoFocus
              placeholder="Search programs, field deployments, news, or team members..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#f8faf9] border border-emerald-200 rounded-md pl-10 pr-9 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Query Results */}
          <div className="overflow-y-auto space-y-5 pr-1 flex-1 text-xs">
            {!searchQuery && (
              <div className="text-center py-6 text-slate-500 space-y-2">
                <p className="font-semibold text-slate-900">Type a query to search GAE resources</p>
                <p className="text-[11px]">Popular tags: <button onClick={() => setQuery('Reforestation')} className="text-emerald-700 hover:underline font-mono font-bold">Reforestation</button>, <button onClick={() => setQuery('Tano River')} className="text-emerald-700 hover:underline font-mono font-bold">Tano River</button>, <button onClick={() => setQuery('Nurseries')} className="text-emerald-700 hover:underline font-mono font-bold">Nurseries</button>, <button onClick={() => setQuery('Sanitation')} className="text-emerald-700 hover:underline font-mono font-bold">Sanitation</button></p>
              </div>
            )}

            {searchQuery && totalResults === 0 && (
              <div className="text-center py-8 text-slate-500">
                No matching results found for "<span className="text-slate-800 font-bold">{query}</span>".
              </div>
            )}

            {/* Pillars */}
            {pillarResults.length > 0 && (
              <div>
                <h4 className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Trees className="w-3.5 h-3.5 text-emerald-600" /> Core Conservation Pillars ({pillarResults.length})
                </h4>
                <div className="space-y-1">
                  {pillarResults.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect('programs')}
                      className="w-full text-left p-2.5 rounded-md bg-[#f8faf9] hover:bg-emerald-50/70 border border-emerald-100 hover:border-emerald-300 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900 text-xs">{p.title}</h5>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{p.shortDesc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projectResults.length > 0 && (
              <div>
                <h4 className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FolderKanban className="w-3.5 h-3.5 text-emerald-600" /> Active Field Projects ({projectResults.length})
                </h4>
                <div className="space-y-1">
                  {projectResults.map(pr => (
                    <button
                      key={pr.id}
                      onClick={() => handleSelect('projects')}
                      className="w-full text-left p-2.5 rounded-md bg-[#f8faf9] hover:bg-emerald-50/70 border border-emerald-100 hover:border-emerald-300 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900 text-xs">{pr.title}</h5>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{pr.location} &bull; {pr.impactMetric}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* News */}
            {articleResults.length > 0 && (
              <div>
                <h4 className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5 text-emerald-600" /> Dispatch Updates ({articleResults.length})
                </h4>
                <div className="space-y-1">
                  {articleResults.map(a => (
                    <button
                      key={a.id}
                      onClick={() => handleSelect('news')}
                      className="w-full text-left p-2.5 rounded-md bg-[#f8faf9] hover:bg-emerald-50/70 border border-emerald-100 hover:border-emerald-300 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900 text-xs">{a.title}</h5>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{a.date}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Team */}
            {teamResults.length > 0 && (
              <div>
                <h4 className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-600" /> Leadership & Governance ({teamResults.length})
                </h4>
                <div className="space-y-1">
                  {teamResults.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleSelect('team')}
                      className="w-full text-left p-2.5 rounded-md bg-[#f8faf9] hover:bg-emerald-50/70 border border-emerald-100 hover:border-emerald-300 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900 text-xs">{t.name}</h5>
                        <p className="text-[11px] text-slate-500">{t.role} &bull; {t.location}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-emerald-100 mt-4 flex items-center justify-between text-[11px] text-slate-500">
            <span>Global Alliance on Environment Resource Registry</span>
            <button
              onClick={() => handleSelect('gallery')}
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View Field Photo Gallery</span>
              <ArrowRight className="w-3 h-3 text-emerald-600" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
