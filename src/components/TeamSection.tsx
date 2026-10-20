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
    <section id="team" className="py-16 sm:py-20 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-bold mb-3 shadow-xs">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Executive Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Leadership & Executive Officers
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            The visionary team leading Global Alliance on Environment's operations, field nursery management, and strategic partnerships in Ghana.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all group"
            >
              <div>
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-800 font-extrabold text-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                  {member.name.charAt(0)}
                </div>

                <span className="inline-block bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
                  {member.role}
                </span>

                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                  {member.name}
                </h3>

                <p className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  {member.location}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {member.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-500 font-medium">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{member.email}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
