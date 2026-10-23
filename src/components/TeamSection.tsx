import React from 'react';
import { TEAM_MEMBERS } from '../data/gaeData';
import { 
  Users, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-16 sm:py-20 bg-white text-slate-900 border-b border-emerald-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-emerald-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                EXECUTIVE GOVERNANCE &bull; SECRETARIAT
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-mono">Founding Officers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Leadership & Executive Governance
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl leading-relaxed">
              The executive team overseeing Global Alliance on Environment's field operations, seedling nursery facilities, and regional civic partnerships in Ghana.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-md self-start md:self-auto font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Chartered July 24, 2020</span>
          </div>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-emerald-200 hover:border-emerald-500 border-t-4 border-t-emerald-600 rounded-xl p-6 flex flex-col justify-between transition-all duration-150 group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center font-mono shadow-xs group-hover:scale-105 transition-transform">
                    {member.name.charAt(0)}
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wide">
                    {member.role}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                  {member.name}
                </h3>

                <p className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-1 font-mono">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  {member.location}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-100 space-y-1 text-xs text-slate-600 font-mono">
                <p className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3 h-3 text-emerald-600" />
                  <span>info@gae-ghana.org</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-emerald-600" />
                  <span>+233 (0) 54 812 4491</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
