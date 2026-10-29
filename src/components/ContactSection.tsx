import React, { useState } from 'react';
import { GAE_INFO } from '../data/gaeData';
import { 
  Send, 
  MapPin, 
  Mail, 
  Phone, 
  MessageCircle,
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface InquiryPayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'activation_pending' | 'error';

export const ContactSection: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');
  const [submittedRecord, setSubmittedRecord] = useState<InquiryPayload | null>(null);
  const [formData, setFormData] = useState<InquiryPayload>({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const buildDirectLinks = (payload: InquiryPayload) => {
    const emailSubject = `[GAE Secretariat Desk] ${payload.subject} — ${payload.name}`;
    const formattedBody = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone / WhatsApp: ${payload.phone || 'Not provided'}`,
      `Category: ${payload.subject}`,
      '',
      'Message:',
      payload.message,
    ].join('\n');

    const mailtoHref = `mailto:${GAE_INFO.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(formattedBody)}`;
    const whatsappHref = `${GAE_INFO.whatsappUrl}?text=${encodeURIComponent(`Hello GAE Secretariat Desk,\n\n${formattedBody}`)}`;
    return { mailtoHref, whatsappHref };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) return;

    const payload: InquiryPayload = {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      subject: formData.subject,
      message: trimmedMessage,
    };

    setSubmitStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${GAE_INFO.email}`, {
        method: 'POST',
        referrerPolicy: 'origin',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          _replyto: payload.email,
          phone: payload.phone || 'Not provided',
          inquiry_category: payload.subject,
          _subject: `[GAE Secretariat Desk] ${payload.subject} — ${payload.name}`,
          message: payload.message,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => null);
      const isSuccess =
        response.ok &&
        data &&
        (data.success === true || data.success === 'true');
      const apiMessage = typeof data?.message === 'string' ? data.message : '';
      const requiresActivation =
        apiMessage.toLowerCase().includes('activation') ||
        apiMessage.toLowerCase().includes('activate');

      if (isSuccess) {
        setSubmittedRecord(payload);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: '',
        });
        setSubmitStatus('sent');
        return;
      }

      if (requiresActivation) {
        setSubmittedRecord(payload);
        setSubmitStatus('activation_pending');
        return;
      }

      setSubmitStatus('error');
      setErrorMessage(
        apiMessage || 'Unable to complete automatic dispatch right now. You can send your message directly below via Email or WhatsApp.'
      );
    } catch {
      setSubmitStatus('error');
      setErrorMessage(
        'Network connection could not reach the mail relay. Use one of the direct buttons below to send your prepared message immediately.'
      );
    }
  };

  const activePayloadForLinks = submittedRecord || formData;
  const { mailtoHref, whatsappHref } = buildDirectLinks(activePayloadForLinks);

  return (
    <section id="contact" className="py-16 sm:py-20 bg-white text-slate-900 border-b border-emerald-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-emerald-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs">
              <span className="font-mono font-bold uppercase tracking-wider text-emerald-700">
                Secretariat Support
              </span>
              <span className="text-slate-300" aria-hidden="true">&middot;</span>
              <span className="text-slate-500 font-mono">Techiman, Ghana</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Connect with GAE Secretariat Desk
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl leading-relaxed">
              Have questions regarding tree seedling distribution, regional agroforestry training, corporate CSR sponsorships, or press requests? Messages sent below are delivered directly to our Secretariat inbox.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-800 font-mono self-start md:self-auto font-semibold">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mon&ndash;Fri: 08:00&ndash;17:00 GMT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-4 bg-[#f8faf9] border border-emerald-200 p-6 sm:p-7 rounded-xl">
            <h3 className="text-base font-bold text-slate-900 border-b border-emerald-100 pb-3">
              Regional Secretariat Headquarters
            </h3>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 uppercase font-mono tracking-wider text-[11px]">Physical Address</h4>
                  <p className="text-slate-600 mt-0.5">{GAE_INFO.headquarters}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 uppercase font-mono tracking-wider text-[11px]">Official Email Desk</h4>
                  <a
                    href={`mailto:${GAE_INFO.email}`}
                    className="text-emerald-700 hover:text-emerald-800 hover:underline font-mono font-semibold mt-0.5 inline-block"
                  >
                    {GAE_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-900 uppercase font-mono tracking-wider text-[11px]">Telephone &amp; WhatsApp</h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:${GAE_INFO.phone}`}
                      className="text-slate-800 hover:text-emerald-700 font-mono font-semibold hover:underline"
                    >
                      {GAE_INFO.phone}
                    </a>
                    <span className="text-slate-300" aria-hidden="true">&middot;</span>
                    <a
                      href={GAE_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-100">
              <div className="bg-white border border-emerald-200 border-l-4 border-l-emerald-600 p-3.5 rounded-md text-xs text-slate-700 space-y-1 shadow-2xs">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  Registered Non-Profit Organization
                </span>
                <p className="text-[11px] text-slate-500">Global Alliance on Environment is officially registered under the laws of the Republic of Ghana.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-emerald-200 border-t-4 border-t-emerald-600 p-6 sm:p-8 rounded-xl shadow-xs">
            {submitStatus === 'sent' && submittedRecord ? (
              <div className="bg-emerald-50/70 border border-emerald-200 p-7 sm:p-8 rounded-xl text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-900">Message Delivered to Secretariat</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-900">{submittedRecord.name}</strong>. Your message has been sent to{' '}
                    <strong className="text-emerald-800 font-mono">{GAE_INFO.email}</strong>. Our Secretariat desk will respond to{' '}
                    <strong className="text-slate-900">{submittedRecord.email}</strong> within 1 business day.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRecord(null);
                      setSubmitStatus('idle');
                    }}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-md transition-colors cursor-pointer shadow-xs"
                  >
                    Send Another Message
                  </button>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Follow Up on WhatsApp ({GAE_INFO.whatsapp})</span>
                  </a>
                </div>
              </div>
            ) : submitStatus === 'activation_pending' && submittedRecord ? (
              <div className="bg-emerald-50/60 border border-emerald-200 p-6 sm:p-7 rounded-xl space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">
                      One-Time Inbox Activation Sent to {GAE_INFO.email}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      A one-time verification email has just been sent to{' '}
                      <strong className="text-slate-900 font-mono">{GAE_INFO.email}</strong> (check Inbox or Spam and click{' '}
                      <strong className="text-slate-900">Activate Form</strong> once so all future website messages arrive automatically).
                    </p>
                    <p className="text-xs text-slate-700 font-medium pt-1">
                      To also deliver your current message right away, choose either direct option below:
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={mailtoHref}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-md transition-colors inline-flex items-center gap-2 shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Copy via Email App</span>
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold rounded-md transition-colors inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Send via WhatsApp ({GAE_INFO.whatsapp})</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRecord(null);
                      setSubmitStatus('idle');
                    }}
                    className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Back to Form
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Send a Message to the Secretariat Desk</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Messages are dispatched directly to <span className="font-mono text-emerald-800 font-semibold">{GAE_INFO.email}</span>.
                  </p>
                </div>

                {/* Anti-spam honeypot */}
                <input
                  type="text"
                  name="_honey"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {submitStatus === 'error' && (
                  <div className="bg-amber-50 border border-amber-300 rounded-lg p-3.5 space-y-2.5 text-xs text-amber-950">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{errorMessage}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 pl-6">
                      <a
                        href={mailtoHref}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email {GAE_INFO.email}</span>
                      </a>
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold rounded-md inline-flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp {GAE_INFO.whatsapp}</span>
                      </a>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      disabled={submitStatus === 'sending'}
                      placeholder="e.g. Kwame Mensah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#f8faf9] border border-emerald-200 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      disabled={submitStatus === 'sending'}
                      placeholder="e.g. kwame@organization.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#f8faf9] border border-emerald-200 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white disabled:opacity-60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Phone / WhatsApp Number (Optional)</label>
                    <input
                      type="tel"
                      disabled={submitStatus === 'sending'}
                      placeholder="e.g. +233 59 678 9429"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#f8faf9] border border-emerald-200 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Inquiry Category *</label>
                    <select
                      disabled={submitStatus === 'sending'}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#f8faf9] border border-emerald-200 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white cursor-pointer disabled:opacity-60"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Tree Seedling Partnership">Tree Seedling Partnership</option>
                      <option value="Research & Field Work">Research &amp; Field Work</option>
                      <option value="Media & Press">Media &amp; Press</option>
                      <option value="Donation / Paystack Support">Donation / Paystack Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Message Description *</label>
                  <textarea
                    required
                    rows={4}
                    disabled={submitStatus === 'sending'}
                    placeholder="Provide details on your project inquiry or collaboration..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#f8faf9] border border-emerald-200 rounded-md px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wide rounded-md shadow-md shadow-emerald-600/25 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'sending' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending to Secretariat Desk...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message to Secretariat</span>
                    </>
                  )}
                </button>

                <div className="pt-2 border-t border-emerald-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                  <span>
                    Direct Email:{' '}
                    <a href={`mailto:${GAE_INFO.email}`} className="text-emerald-700 hover:underline font-mono font-semibold">
                      {GAE_INFO.email}
                    </a>
                  </span>
                  <a
                    href={GAE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Desk: {GAE_INFO.whatsapp}</span>
                  </a>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
