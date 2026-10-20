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
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[85vh] flex flex-col"
        >
          
          {/* Search Input Bar */}
          <div className="relative mb-4 flex items-center">
            <Search className="w-5 h-5 text-emerald-600 absolute left-3.5" />
            <input
              type="text"
              autoFocus
              placeholder="Search programs, field projects, news, or team members..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-10 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Query Results */}
          <div className="overflow-y-auto space-y-6 pr-1 flex-1 text-xs">
            {!searchQuery && (
              <div className="text-center py-8 text-slate-500 space-y-2">
                <p className="font-semibold text-slate-700">Type a keyword to start searching</p>
                <p className="text-[11px]">Popular searches: <button onClick={() => setQuery('Reforestation')} className="text-emerald-600 hover:underline">Reforestation</button>, <button onClick={() => setQuery('Tano River')} className="text-emerald-600 hover:underline">Tano River</button>, <button onClick={() => setQuery('Bamiri')} className="text-emerald-600 hover:underline">Bamiri</button>, <button onClick={() => setQuery('Agroforestry')} className="text-emerald-600 hover:underline">Agroforestry</button></p>
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
                <h4 className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Trees className="w-3.5 h-3.5" /> Core Pillars ({pillarResults.length})
                </h4>
                <div className="space-y-1.5">
                  {pillarResults.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect('programs')}
                      className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900">{p.title}</h5>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{p.shortDesc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {projectResults.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FolderKanban className="w-3.5 h-3.5" /> Field Projects ({projectResults.length})
                </h4>
                <div className="space-y-1.5">
                  {projectResults.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect('projects')}
                      className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900">{p.title}</h5>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{p.summary}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Articles */}
            {articleResults.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5" /> News Stories ({articleResults.length})
                </h4>
                <div className="space-y-1.5">
                  {articleResults.map(a => (
                    <button
                      key={a.id}
                      onClick={() => handleSelect('news')}
                      className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900">{a.title}</h5>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{a.summary}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Executive Leadership */}
            {teamResults.length > 0 && (
              <div>
                <h4 className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Leadership ({teamResults.length})
                </h4>
                <div className="space-y-1.5">
                  {teamResults.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleSelect('team')}
                      className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900">{t.name}</h5>
                        <p className="text-[11px] text-slate-500">{t.role}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Press ESC or click Outside to close</span>
            <button onClick={onClose} className="hover:text-slate-700 font-semibold">Close</button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
