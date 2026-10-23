import React, { useState } from 'react';
import { PROJECTS } from '../data/gaeData';
import { 
  FolderKanban, 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ProjectsExplorer: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'Active' | 'Expanding' | 'Completed'>('all');

  const filteredProjects = PROJECTS.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <section id="projects" className="py-16 sm:py-20 bg-white text-slate-900 border-b border-emerald-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-emerald-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                FIELD PROJECTS REGISTRY &bull; ON-THE-GROUND OPERATIONS
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-mono">Bono East Region, Ghana</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Active Conservation Deployments
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl leading-relaxed">
              Targeted field interventions taking place across Techiman, the Tano River basin, and adjacent agroforestry districts.
            </p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-emerald-50 p-1 rounded-md border border-emerald-200 self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/60'
              }`}
            >
              All Deployments ({PROJECTS.length})
            </button>
            <button
              onClick={() => setFilter('Active')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'Active'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/60'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('Expanding')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'Expanding'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/60'
              }`}
            >
              Expanding
            </button>
            <button
              onClick={() => setFilter('Completed')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'Completed'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-100/60'
              }`}
            >
              Milestones Met
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-emerald-200 hover:border-emerald-500 rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-150 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md border ${
                    project.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : project.status === 'Expanding'
                      ? 'bg-teal-50 text-teal-800 border-teal-300'
                      : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}>
                    {project.status}
                  </span>

                  <span className="text-[11px] font-mono text-slate-500 font-medium">
                    Est. {project.startDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {project.summary}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 border-t border-emerald-100 pt-3 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate text-slate-700">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-slate-700 font-medium">{project.impactMetric}</span>
                  </div>
                </div>
              </div>

              {/* Progress & Target */}
              <div className="pt-3 border-t border-emerald-100">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">Target Metrics</span>
                  <span className="font-mono font-bold text-emerald-700">{project.impactMetric}</span>
                </div>
                <div className="w-full h-2 bg-emerald-50 rounded-full overflow-hidden mb-3 border border-emerald-100">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: project.status === 'Completed' ? '100%' : project.status === 'Expanding' ? '85%' : '65%' }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-mono">ID: {project.id}</span>
                  <span className="text-emerald-700 font-bold group-hover:underline flex items-center gap-1 cursor-pointer">
                    <span>Project Log</span>
                    <ArrowRight className="w-3 h-3 text-emerald-600" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
