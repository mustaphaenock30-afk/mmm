import React from 'react';
import { GAE_INFO, TEAM_MEMBERS } from '../data/gaeData';
import { 
  ShieldCheck, 
  Mail, 
  Phone, 
  MessageCircle,
  MapPin 
} from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-16 sm:py-20 bg-white text-slate-900 border-b border-emerald-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-emerald-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs">
              <span className="font-mono font-bold uppercase tracking-wider text-emerald-700">
                Executive Governance
              </span>
              <span className="text-slate-300" aria-hidden="true">&middot;</span>
              <span className="text-slate-500 font-mono">Founding Officers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Leadership &amp; Executive Governance
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl leading-relaxed">
              The executive team overseeing Global Alliance on Environment's field operations, seedling nursery facilities, and regional civic partnerships in Ghana.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono self-start md:self-auto font-semibold">
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
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center font-mono shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                    {member.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wide truncate">
                      {member.role}
                    </p>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                      {member.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium mb-3 flex items-center gap-1.5 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{member.location}</span>
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Single Unified Executive Governance Contact Desk */}
        <div className="mt-8 bg-[#f8faf9] border border-emerald-200 border-l-4 border-l-emerald-600 rounded-xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-2xs">
          <div className="space-y-1 max-w-xl">
            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700">
              Unified Executive Secretariat Desk
            </p>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Official Leadership &amp; Executive Governance Contact
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All correspondence for the Founder &amp; Chairman, Chief Executive Officer, and Director of Programs is coordinated through one official email address and telephone/WhatsApp line.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 shrink-0">
            <a
              href={`mailto:${GAE_INFO.email}`}
              className="inline-flex items-center gap-2.5 bg-white hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-500 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-800 hover:text-emerald-800 transition-colors shadow-2xs"
            >
              <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-mono">{GAE_INFO.email}</span>
            </a>

            <a
              href={`tel:${GAE_INFO.phone}`}
              className="inline-flex items-center gap-2.5 bg-white hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-500 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-800 hover:text-emerald-800 transition-colors shadow-2xs"
            >
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-mono">{GAE_INFO.phone}</span>
            </a>

            <a
              href={GAE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp: {GAE_INFO.whatsapp}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
