import React, { useState } from 'react';
import { NEWS_ARTICLES } from '../data/gaeData';
import { 
  Newspaper, 
  Calendar, 
  User, 
  ArrowRight, 
  X,
  Share2,
  Check
} from 'lucide-react';
import { NewsItem } from '../types';

export const NewsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="news" className="py-16 sm:py-20 bg-[#f8faf9] text-slate-900 border-b border-emerald-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-emerald-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                WHAT'S NEW &bull; GAE FIELD DISPATCH & ANNOUNCEMENTS
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-mono">Bono East Field Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Conservation Announcements & Field Updates
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl leading-relaxed">
              Stay informed on our community tree-planting operations, school anti-plastic club expansions, and stakeholder symposiums across Ghana.
            </p>
          </div>

          <span className="text-xs font-mono text-emerald-800 bg-white border border-emerald-200 px-3 py-1.5 rounded-md self-start md:self-auto font-semibold shadow-2xs">
            Updated Bi-Weekly
          </span>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-emerald-200 hover:border-emerald-500 rounded-xl overflow-hidden transition-all duration-150 flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="p-6 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      {article.date}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setSelectedArticle(article)}
                    className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2 mb-2 leading-snug"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                  <User className="w-3 h-3 text-slate-400" />
                  {article.author}
                </span>

                <button
                  onClick={() => setSelectedArticle(article)}
                  className="text-emerald-700 font-bold group-hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3 text-emerald-600" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Detail Lightbox */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm">
          <div className="bg-white border-2 border-emerald-200 rounded-xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-emerald-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md uppercase">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {selectedArticle.date}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {selectedArticle.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-mono pt-1">
                <span>By {selectedArticle.author}</span>
                <span>&bull;</span>
                <span>Techiman Field Secretariat</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
              <p className="font-semibold text-slate-900">
                {selectedArticle.summary}
              </p>
              <p>
                {selectedArticle.content}
              </p>
              <div className="bg-emerald-50/70 border border-emerald-200 p-3.5 rounded-md text-xs text-slate-700">
                <strong className="block text-emerald-950 mb-1">Field Verification:</strong>
                All operations detailed above are documented in the official GAE conservation registry in Techiman, Bono East Region, Ghana.
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
              <button
                onClick={handleShare}
                className="text-xs font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-md cursor-pointer shadow-xs"
              >
                Close Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
