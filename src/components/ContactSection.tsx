import React, { useState } from 'react';
import { GAE_INFO } from '../data/gaeData';
import { 
  Send, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Clock,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white text-slate-900 border-b border-[#eaeded]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* AWS Style Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#eaeded] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ec7211]">
                SECRETARIAT SUPPORT &bull; CONTACT US
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-mono">Techiman, Ghana</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161e2d] tracking-tight">
              Connect with GAE Secretariat Desk
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl leading-relaxed">
              Have questions regarding tree seedling distribution, regional agroforestry training, corporate CSR sponsorships, or press requests? Submit your inquiry.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 font-mono bg-[#f8f9fa] border border-[#eaeded] px-3 py-1.5 rounded-xs self-start md:self-auto">
            <Clock className="w-3.5 h-3.5 text-[#ec7211]" />
            <span>Mon&ndash;Fri: 08:00&ndash;17:00 GMT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-4 bg-[#f8f9fa] border border-[#eaeded] p-6 sm:p-7 rounded-xs">
            <h3 className="text-base font-bold text-[#161e2d] border-b border-[#eaeded] pb-3">
              Regional Secretariat Headquarters
            </h3>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xs bg-[#161e2d] text-[#ff9900] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#161e2d] uppercase font-mono tracking-wider text-[11px]">Physical Address</h4>
                  <p className="text-slate-600 mt-0.5">{GAE_INFO.headquarters}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xs bg-[#161e2d] text-[#ff9900] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#161e2d] uppercase font-mono tracking-wider text-[11px]">Email Dispatch</h4>
                  <p className="text-slate-600 mt-0.5">{GAE_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xs bg-[#161e2d] text-[#ff9900] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#161e2d] uppercase font-mono tracking-wider text-[11px]">Field Telephone Hotline</h4>
                  <p className="text-slate-600 mt-0.5">+233 (0) 54 812 4491 / +233 (0) 50 234 5678</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#eaeded]">
              <div className="bg-white border border-[#eaeded] border-l-4 border-l-[#ec7211] p-3 rounded-xs text-xs text-slate-700 space-y-1">
                <span className="font-bold block text-[#161e2d]">Registered Non-Profit Organization</span>
                <p className="text-[11px] text-slate-500">Global Alliance on Environment is officially registered under the laws of the Republic of Ghana.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#eaeded] border-t-4 border-t-[#ec7211] p-6 sm:p-8 rounded-xs shadow-xs">
            {formSubmitted ? (
              <div className="bg-[#f8f9fa] border border-[#eaeded] p-8 rounded-xs text-center space-y-3">
                <div className="w-12 h-12 rounded-xs bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#161e2d]">Inquiry Successfully Dispatched</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. A secretariat liaison will review your ticket and reply to <strong className="text-slate-900">{formData.email}</strong> within 1 business day.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-4 py-2 bg-[#232f3e] hover:bg-[#161e2d] text-white text-xs font-bold rounded-xs transition-colors cursor-pointer"
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-[#161e2d]">Submit an Official Inquiry Ticket</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Please provide your details below to reach our secretariat.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-slate-300 rounded-xs px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#ec7211] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. kwame@organization.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-slate-300 rounded-xs px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#ec7211] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+233 XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-slate-300 rounded-xs px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#ec7211] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Inquiry Category *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-slate-300 rounded-xs px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#ec7211] focus:bg-white cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Tree Seedling Partnership">Tree Seedling Partnership</option>
                      <option value="Research & Field Work">Research & Field Work</option>
                      <option value="Media & Press">Media & Press</option>
                      <option value="Donation / Paystack Support">Donation / Paystack Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Message Description *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details on your project inquiry or collaboration..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#f8f9fa] border border-slate-300 rounded-xs px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#ec7211] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#ec7211] hover:bg-[#eb5f07] text-white font-bold text-xs uppercase tracking-wide rounded-xs shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry Ticket</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
