import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PaystackPop from '@paystack/inline-js';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Lock,
  ArrowRight
} from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const paystackKey = (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '').trim();
  
  const [currency, setCurrency] = useState<'GHS' | 'USD'>('GHS');
  const [selectedPreset, setSelectedPreset] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [cause, setCause] = useState<string>('Reforestation & Seedling Nurseries');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState<{
    reference: string;
    amount: number;
    currency: string;
    email: string;
    name: string;
  } | null>(null);

  if (!isOpen) return null;

  const ghsPresets = [50, 100, 250, 500, 1000];
  const usdPresets = [10, 25, 50, 100, 250];

  const presets = currency === 'GHS' ? ghsPresets : usdPresets;

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedPreset;

  const isKeyValidFormat = paystackKey.startsWith('pk_test_') || paystackKey.startsWith('pk_live_');

  const handlePaystackCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!paystackKey) {
      setErrorMsg('Paystack Public Key is not set. Please set the VITE_PAYSTACK_PUBLIC_KEY environment variable in Settings.');
      return;
    }

    if (!isKeyValidFormat) {
      setErrorMsg('The configured Paystack key appears invalid. A valid Paystack public key starts with pk_test_ or pk_live_.');
      return;
    }

    if (!donorEmail || !donorEmail.includes('@')) {
      setErrorMsg('Please enter a valid donor email address for Paystack receipt transmission.');
      return;
    }

    if (finalAmount <= 0) {
      setErrorMsg('Please select or specify a donation amount greater than 0.');
      return;
    }

    setLoading(true);

    try {
      const paystack = new PaystackPop();
      const amountInSubunits = Math.round(finalAmount * 100);

      paystack.newTransaction({
        key: paystackKey,
        email: donorEmail,
        amount: amountInSubunits,
        currency: currency,
        metadata: {
          custom_fields: [
            {
              display_name: 'Donor Name',
              variable_name: 'donor_name',
              value: donorName || 'Anonymous Conservation Supporter'
            },
            {
              display_name: 'Selected Cause',
              variable_name: 'selected_cause',
              value: cause
            },
            {
              display_name: 'MoMo / Phone',
              variable_name: 'phone_number',
              value: donorPhone || 'Not provided'
            },
            {
              display_name: 'Project Target',
              variable_name: 'project_target',
              value: 'Global Alliance on Environment (Techiman, Ghana)'
            }
          ]
        },
        onSuccess: (transaction: any) => {
          setLoading(false);
          setPaymentSuccess({
            reference: transaction.reference,
            amount: finalAmount,
            currency: currency,
            email: donorEmail,
            name: donorName || 'Generous Supporter'
          });
        },
        onCancel: () => {
          setLoading(false);
          setErrorMsg('Transaction cancelled. You can retry whenever you are ready.');
        }
      });
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(`Could not initialize Paystack popup: ${err?.message || 'Unknown error'}`);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white border border-[#eaeded] rounded-xs max-w-lg w-full p-6 sm:p-7 relative shadow-2xl space-y-4 text-slate-900 font-sans"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xs transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {paymentSuccess ? (
            /* Payment Success Confirmation View */
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 rounded-xs bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] bg-[#161e2d] text-[#ff9900] px-2.5 py-0.5 rounded-xs font-mono font-bold uppercase">
                  PAYSTACK TRANSACTION VERIFIED
                </span>
                <h2 className="text-xl font-bold text-[#161e2d] mt-2">
                  Thank You for Backing GAE Conservation
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Your funds directly support indigenous sapling cultivation in Techiman, Ghana.
                </p>
              </div>

              <div className="bg-[#f8f9fa] border border-[#eaeded] rounded-xs p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#eaeded] pb-1.5">
                  <span className="text-slate-500 font-mono">Reference:</span>
                  <span className="font-mono font-bold text-[#161e2d]">{paymentSuccess.reference}</span>
                </div>
                <div className="flex justify-between border-b border-[#eaeded] pb-1.5">
                  <span className="text-slate-500 font-mono">Amount Paid:</span>
                  <span className="font-bold text-[#ec7211] text-sm font-mono">{paymentSuccess.currency} {paymentSuccess.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-[#eaeded] pb-1.5">
                  <span className="text-slate-500 font-mono">Donor:</span>
                  <span className="font-semibold text-slate-800">{paymentSuccess.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-mono">Target Program:</span>
                  <span className="font-semibold text-slate-800">{cause}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setPaymentSuccess(null);
                    onClose();
                  }}
                  className="w-full py-2.5 bg-[#232f3e] hover:bg-[#161e2d] text-white font-bold text-xs uppercase tracking-wide rounded-xs cursor-pointer"
                >
                  Return to Portal
                </button>
              </div>
            </div>
          ) : (
            /* Payment Form View */
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#ec7211] bg-[#161e2d] px-2 py-0.5 rounded-xs">
                    SECURE CHECKOUT &bull; PAYSTACK GATEWAY
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-[#161e2d] tracking-tight">
                  Sponsor Tree Nurseries & Watersheds
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Fund native sapling cultivation and youth climate clubs in Techiman, Ghana.
                </p>
              </div>

              {/* Missing Key Warning Banner */}
              {(!paystackKey || !isKeyValidFormat) && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xs text-xs text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-amber-800">
                    ⚠️ Paystack Configuration Notice
                  </p>
                  <p className="text-[11px] text-amber-800 leading-normal">
                    To accept live transactions, configure <code className="bg-amber-100 px-1 py-0.5 rounded-xs font-mono font-bold">VITE_PAYSTACK_PUBLIC_KEY</code> in Settings with your <code className="font-mono font-bold">pk_test_</code> or <code className="font-mono font-bold">pk_live_</code> key.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <div className="p-2.5 bg-red-50 border border-red-300 rounded-xs text-xs text-red-700 font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handlePaystackCheckout} className="space-y-3.5">
                
                {/* Currency Selector & Presets */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800">Select Donation Currency</label>
                    <div className="inline-flex bg-[#eaeded] p-0.5 rounded-xs border border-slate-300">
                      <button
                        type="button"
                        onClick={() => { setCurrency('GHS'); setSelectedPreset(100); }}
                        className={`px-2 py-0.5 text-[11px] font-bold rounded-xs transition-colors cursor-pointer ${
                          currency === 'GHS' ? 'bg-[#232f3e] text-white shadow-xs' : 'text-slate-700'
                        }`}
                      >
                        GHS (&cent;)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setCurrency('USD'); setSelectedPreset(25); }}
                        className={`px-2 py-0.5 text-[11px] font-bold rounded-xs transition-colors cursor-pointer ${
                          currency === 'USD' ? 'bg-[#232f3e] text-white shadow-xs' : 'text-slate-700'
                        }`}
                      >
                        USD ($)
                      </button>
                    </div>
                  </div>

                  {/* Amount Presets Grid */}
                  <div className="grid grid-cols-5 gap-1.5 mb-2">
                    {presets.map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => { setSelectedPreset(val); setCustomAmount(''); }}
                        className={`py-1.5 text-xs font-bold rounded-xs border transition-colors cursor-pointer font-mono ${
                          selectedPreset === val && !customAmount
                            ? 'bg-[#ec7211] text-white border-[#ec7211]'
                            : 'bg-[#f8f9fa] text-slate-800 border-[#eaeded] hover:bg-slate-200'
                        }`}
                      >
                        {currency === 'GHS' ? 'GH¢' : '$'}{val}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Input */}
                  <input
                    type="number"
                    placeholder={`Or custom amount in ${currency}`}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-slate-300 rounded-xs px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#ec7211]"
                  />
                </div>

                {/* Cause Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Target Conservation Pillar</label>
                  <select
                    value={cause}
                    onChange={(e) => setCause(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-slate-300 rounded-xs px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#ec7211] cursor-pointer"
                  >
                    <option value="Reforestation & Seedling Nurseries">Reforestation & Seedling Nurseries</option>
                    <option value="Clean Water & River Protection">Clean Water & Tano River Protection</option>
                    <option value="Agroforestry Farmer Support">Agroforestry Farmer Support</option>
                    <option value="General Environmental Stewardship">General Environmental Stewardship</option>
                  </select>
                </div>

                {/* Donor Contact Information */}
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Email Address * <span className="text-[10px] text-slate-400 font-normal">(Receipt delivery)</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. donor@organization.org"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-slate-300 rounded-xs px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#ec7211]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Kwame Mensah"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full bg-[#f8f9fa] border border-slate-300 rounded-xs px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#ec7211]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">MoMo Number</label>
                      <input
                        type="tel"
                        placeholder="024 XXX XXXX"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="w-full bg-[#f8f9fa] border border-slate-300 rounded-xs px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#ec7211]"
                      />
                    </div>
                  </div>
                </div>

                {/* Paystack Channel Badges */}
                <div className="p-2.5 bg-[#f8f9fa] border border-[#eaeded] rounded-xs space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Encrypted Payment Processing</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">MTN / Telecel / Card</span>
                  </div>
                </div>

                {/* Submit Paystack CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#ec7211] hover:bg-[#eb5f07] active:bg-[#d85800] text-white font-bold text-xs uppercase tracking-wide rounded-xs shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Opening Gateway...</span>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Complete {currency === 'GHS' ? 'GH¢' : '$'}{finalAmount.toLocaleString()} Support via Paystack</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
