import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldCheck, Check, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface AgreementsProps {
  onComplete: () => void;
  onBack: () => void;
}

export const AgreementsStep: React.FC<AgreementsProps> = ({ onComplete, onBack }) => {
  const [agreedSebi, setAgreedSebi] = useState(true);
  const [agreedRisk, setAgreedRisk] = useState(true);
  const [agreedDigital, setAgreedDigital] = useState(true);
  const [signatureText, setSignatureText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!signatureText.trim()) {
      toast.error('Please type your full name as digital signature');
      return;
    }
    if (!agreedSebi || !agreedRisk || !agreedDigital) {
      toast.error('Please accept all compliance agreements');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Onboarding complete! Your account is active');
      onComplete();
    }, 1600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-xl mx-auto space-y-6 font-sans text-slate-900"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">SEBI Advisory Agreements</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Final step: Review and digitally sign the SEBI Research Advisory Master Service Agreement.
        </p>
      </div>

      <div className="space-y-4">
        {/* Agreement Checkboxes */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 text-xs font-medium shadow-sm">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreedSebi}
              onChange={(e) => setAgreedSebi(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition"
            />
            <span className="text-slate-600 group-hover:text-slate-900 transition">
              I accept the <strong className="text-slate-900">SEBI Research Analyst Master Terms of Advisory</strong> (RA: INH000009821).
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreedRisk}
              onChange={(e) => setAgreedRisk(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition"
            />
            <span className="text-slate-600 group-hover:text-slate-900 transition">
              I have read and acknowledged the <strong className="text-slate-900">Equity & Derivatives Risk Disclosure Document</strong>.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreedDigital}
              onChange={(e) => setAgreedDigital(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition"
            />
            <span className="text-slate-600 group-hover:text-slate-900 transition">
              I consent to digital signature e-Stamping under the Indian Information Technology Act 2000.
            </span>
          </label>
        </div>

        {/* Digital Signature Capture */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Digital Signature (Type your Full Name as per PAN) *
          </label>
          <input
            type="text"
            value={signatureText}
            onChange={(e) => setSignatureText(e.target.value)}
            placeholder="e.g. Omar Khan"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-serif font-black italic text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition"
          />
          <span className="text-[10px] text-slate-500 font-bold block mt-1">
            By typing your full name, you legally execute this digital contract timestamped on {new Date().toLocaleDateString()}.
          </span>
        </div>

        {/* Submit CTA */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {isSubmitting ? (
            <span>Completing Account Setup...</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>E-Sign & Activate Account</span>
            </>
          )}
        </button>
      </div>

      <div className="pt-4 flex justify-start">
        <button onClick={onBack} className="text-sm font-bold text-slate-500 cursor-pointer">
          Back
        </button>
      </div>
    </motion.div>
  );
};

export default AgreementsStep;
