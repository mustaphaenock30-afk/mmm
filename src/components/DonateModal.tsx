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
      setErrorMsg('Paystack Public Key is not set. Please set the VITE_PAYSTACK_PUBLIC_KEY environment variable in the Settings menu.');
      return;
    }

    if (!isKeyValidFormat) {
      setErrorMsg('Invalid Paystack Public Key format. Paystack public keys must start with "pk_test_" or "pk_live_". Please update VITE_PAYSTACK_PUBLIC_KEY in Settings.');
      return;
    }

    if (!donorEmail || !donorEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address required by Paystack.');
      return;
    }

    if (finalAmount <= 0) {
      setErrorMsg('Please select or enter a donation amount greater than 0.');
      return;
    }

    setLoading(true);

    try {
      const paystack = new PaystackPop();
      
      // Amount in lowest subunit (pesewas or cents)
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
              value: donorName || 'Anonymous Donor'
            },
            {
              display_name: 'Phone Number',
              variable_name: 'phone_number',
              value: donorPhone || 'Not provided'
            },
            {
              display_name: 'Donation Purpose',
              variable_name: 'donation_purpose',
              value: cause
            }
          ]
        },
        onSuccess: (transaction: any) => {
          setLoading(false);
          setPaymentSuccess({
            reference: transaction.reference || `GAE-PAYSTACK-${Date.now()}`,
            amount: finalAmount,
            currency: currency,
            email: donorEmail,
            name: donorName || 'Valued Supporter'
          });
        },
        onCancel: () => {
          setLoading(false);
          setErrorMsg('Transaction was cancelled in the Paystack popup window.');
        },
        onError: (err: any) => {
          setLoading(false);
          setErrorMsg(err.message || 'Unable to complete transaction. Please check your Paystack integration.');
        }
      });
    } catch (err: any) {
      setLoading(false);
      console.error('Paystack initialization error:', err);
      setErrorMsg('Paystack Popup initialization failed. Please verify your Paystack Public Key.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {paymentSuccess ? (
            /* Payment Success Confirmation View */
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono font-bold uppercase">
                  Paystack Payment Verified
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
                  Thank You for Your Support!
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Your contribution directly funds environmental restoration in Techiman, Ghana.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Paystack Reference:</span>
                  <span className="font-mono font-bold text-slate-900">{paymentSuccess.reference}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Amount Paid:</span>
                  <span className="font-bold text-emerald-700 text-sm">{paymentSuccess.currency} {paymentSuccess.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Donor Email:</span>
                  <span className="font-semibold text-slate-800">{paymentSuccess.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Purpose:</span>
                  <span className="font-semibold text-slate-800">{cause}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setPaymentSuccess(null);
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Payment Form View */
            <div className="space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-100 border border-emerald-200 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Paystack Gateway Integrated</span>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Support GAE Tree Nurseries
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Fund sapling cultivation, freshwater riverbank protection, and farmer training across Ghana via Paystack.
                </p>
              </div>

              {/* Missing Key Warning Banner */}
              {(!paystackKey || !isKeyValidFormat) && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5 text-amber-800">
                    ⚠️ Paystack Key Configuration Required
                  </p>
                  <p className="text-[11px] text-amber-800 leading-normal">
                    To process real payments, set <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold text-amber-950">VITE_PAYSTACK_PUBLIC_KEY</code> in the AI Studio <strong>Settings</strong> menu (or project <code className="bg-amber-100 px-1 rounded font-mono">.env</code> file) using your key starting with <code className="font-mono font-bold text-amber-950">pk_test_</code> or <code className="font-mono font-bold text-amber-950">pk_live_</code>.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handlePaystackCheckout} className="space-y-4">
                
                {/* Currency Selector & Presets */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-800">Select Currency & Amount</label>
                    <div className="inline-flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                      <button
                        type="button"
                        onClick={() => { setCurrency('GHS'); setSelectedPreset(100); }}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                          currency === 'GHS' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                        }`}
                      >
                        GHS (&cent;)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setCurrency('USD'); setSelectedPreset(25); }}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                          currency === 'USD' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
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
                        className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                          selectedPreset === val && !customAmount
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {currency === 'GHS' ? 'GH¢' : '$'}{val}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Input */}
                  <input
                    type="number"
                    placeholder={`Or enter custom amount in ${currency}`}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                {/* Cause Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Select Action Cause</label>
                  <select
                    value={cause}
                    onChange={(e) => setCause(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="Reforestation & Seedling Nurseries">Reforestation & Seedling Nurseries</option>
                    <option value="Clean Water & River Protection">Clean Water & Tano River Protection</option>
                    <option value="Agroforestry Farmer Support">Agroforestry Farmer Equipment</option>
                    <option value="General Environmental Stewardship">General Environmental Stewardship</option>
                  </select>
                </div>

                {/* Donor Contact Information */}
                <div className="space-y-2.5 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Email Address * <span className="text-[10px] text-slate-400 font-normal">(Required by Paystack for receipt)</span></label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. kwame@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">Full Name (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Kwame Mensah"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">MoMo Phone Number (Optional)</label>
                      <input
                        type="tel"
                        placeholder="024 XXX XXXX"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Paystack Payment Channel Badges */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-[11px] text-slate-600">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" /> Secure Paystack Gateway
                    </span>
                    <span className="text-[10px] text-emerald-700 font-mono">256-bit Encrypted</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[10px]">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                      <Smartphone className="w-3 h-3" /> MTN MoMo
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                      <Smartphone className="w-3 h-3" /> Telecel Cash
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                      <Smartphone className="w-3 h-3" /> AirtelTigo
                    </span>
                    <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                      <CreditCard className="w-3 h-3" /> Visa / Mastercard
                    </span>
                  </div>
                </div>

                {/* Submit Paystack CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>Opening Paystack Popup...</span>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 fill-white" />
                      <span>Pay {currency === 'GHS' ? 'GH¢' : '$'}{finalAmount.toLocaleString()} with Paystack</span>
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
