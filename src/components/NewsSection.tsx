import React, { useState } from 'react';
import { NEWS_ARTICLES } from '../data/gaeData';
import { 
  Newspaper, 
  Calendar, 
  User, 
  Tag, 
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
    <section id="news" className="py-16 sm:py-20 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold mb-3 shadow-xs">
            <Newspaper className="w-3.5 h-3.5 text-emerald-600" />
            <span>Field Stories & Announcements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Latest News & Media
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Stay informed on our recent tree-planting drives, community training sessions, and environmental advocacy across Ghana.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS_ARTICLES.map((article) => (
            <article
              key={article.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Article Header Meta */}
                <div className="p-6 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      {article.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {article.title}
                  </h3>
                </div>

                <div className="px-6 pb-4">
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-white border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  {article.author}
                </span>

                <button
                  onClick={() => setSelectedArticle(article)}
                  className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                {selectedArticle.date}
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 mb-3 leading-snug">
              {selectedArticle.title}
            </h2>

            <p className="text-xs text-slate-500 font-semibold mb-6 pb-4 border-b border-slate-100 flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-600" />
              By {selectedArticle.author} &bull; Secretariat Field Dispatch
            </p>

            <div className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
              <p className="font-semibold text-slate-800">
                {selectedArticle.summary}
              </p>
              <p>
                {selectedArticle.content}
              </p>
              <p>
                As GAE continues its targeted interventions across Techiman and the Bono East region, partnerships with local leaders, agricultural extension officers, and community volunteers remain at the core of our long-term environmental stewardship strategy.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
