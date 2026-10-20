import React, { useState } from 'react';
import { PROJECTS } from '../data/gaeData';
import { 
  FolderKanban, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Trees,
  Award
} from 'lucide-react';

export const ProjectsExplorer: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Active' | 'Expanding' | 'Completed'>('all');

  const filteredProjects = PROJECTS.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <section id="projects" className="py-16 sm:py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-xs">
              <FolderKanban className="w-3.5 h-3.5 text-emerald-600" />
              <span>On-the-Ground Initiatives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Active Field Projects
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Real environmental interventions taking place across Techiman, the Tano River basin, and surrounding farming districts.
            </p>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Projects ({PROJECTS.length})
            </button>
            <button
              onClick={() => setFilter('Active')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'Active'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('Expanding')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'Expanding'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Expanding
            </button>
            <button
              onClick={() => setFilter('Completed')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === 'Completed'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    project.status === 'Active' || project.status === 'Expanding'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {project.status}
                  </span>

                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    {project.location}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {project.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block font-medium">Started</span>
                    <span className="font-bold text-slate-800">{project.startDate}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block font-medium">People Reached</span>
                    <span className="font-bold text-slate-800">{project.peopleImpacted.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200/60 p-2.5 rounded-xl flex items-center gap-2 text-xs text-emerald-900 font-bold">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Impact: {project.impactMetric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
