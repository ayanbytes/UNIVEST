import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, MessageSquareCode, ArrowLeft, Smartphone, KeyRound } from 'lucide-react';
import { Button } from '../atoms/Button';

export const LoginWithOtp = () => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);
  const mode = queryParams.get('mode') || 'new';

  const handleBack = () => {
    window.location.href = '/welcome-continue';
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1200);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'existing') {
        window.location.href = '/design-system';
      } else {
        window.location.href = '/onboarding';
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] text-brand-navy px-6 relative select-none">
      {/* Premium background grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle, rgba(37,99,235,0.3) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Background radial ambient glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-primary/5 blur-[110px] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-md w-full bg-white border border-brand-border rounded-modal p-8 md:p-10 shadow-premium flex flex-col gap-6"
      >
        {/* Top Back Action with micro-arrow shift animation */}
        <motion.button
          onClick={handleBack}
          whileHover={{ x: -2 }}
          className="flex items-center gap-1.5 text-brand-secondary hover:text-brand-navy text-xs font-semibold self-start transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </motion.button>

        {/* Brand visual header */}
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-success flex items-center justify-center text-white font-extrabold text-base shadow-premium-sm border border-white/5">
            U
          </div>
          <span className="text-sm font-black tracking-tight text-brand-navy">
            UNIVEST Advisory
          </span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-brand-navy">
            {otpSent ? 'Enter OTP code' : 'Verify Mobile Number'}
          </h2>
          <p className="text-xs text-brand-secondary leading-relaxed">
            {otpSent
              ? `We have sent a verification code to +91 ${phone}`
              : 'Access research, AI analysis, and advisory recommendations.'}
          </p>
        </div>

        {/* Form elements switcher */}
        <AnimatePresence mode="wait">
          {!otpSent ? (
            <motion.form
              key="phone-form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSendOtp}
              className="flex flex-col gap-5"
            >
              {/* Input layout with Country Code prefix */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
                  Mobile Number
                </label>
                <div className="relative flex items-center bg-slate-50 border border-brand-border rounded-input shadow-premium-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all overflow-hidden">
                  <div className="flex items-center gap-1.5 px-4 py-3.5 border-r border-brand-border bg-slate-100/60 text-brand-secondary font-bold text-sm">
                    <Smartphone className="w-4 h-4 text-slate-400" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                    className="w-full bg-transparent px-4 py-3.5 text-brand-navy placeholder:text-slate-400 focus:outline-none font-sans text-sm tracking-wide"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={phone.length < 10}
                className="w-full mt-2 py-4 bg-gradient-to-r from-primary to-blue-700 font-semibold text-white"
                icon={<MessageSquareCode className="w-5 h-5" />}
              >
                Get OTP Verification Code
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="otp-form"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleVerifyOtp}
              className="flex flex-col gap-5"
            >
              {/* OTP code input */}
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-xs font-bold text-brand-secondary uppercase tracking-wider">
                  One-Time Password (OTP)
                </label>
                <div className="relative flex items-center bg-slate-50 border border-brand-border rounded-input shadow-premium-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all overflow-hidden">
                  <div className="flex items-center gap-1.5 px-4 py-3.5 border-r border-brand-border bg-slate-100/60 text-brand-secondary font-bold text-sm">
                    <KeyRound className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    className="w-full bg-transparent px-4 py-3.5 text-brand-navy placeholder:text-slate-400 focus:outline-none font-sans text-sm tracking-widest text-center font-bold"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={otp.length < 6}
                className="w-full mt-2 py-4 bg-gradient-to-r from-primary to-blue-700 font-semibold text-white"
                icon={<ShieldCheck className="w-5 h-5" />}
              >
                Verify & Enter Platform
              </Button>
              
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-xs text-brand-secondary hover:text-brand-navy text-center mt-1 transition-colors"
              >
                Change mobile number or resend code
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Footnote Disclaimers */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-4 mt-2 text-[10px] text-brand-secondary justify-center">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <span>SEBI Registered Advisory Platform • SEC-019273</span>
        </div>
      </motion.div>
    </div>
  );
};
export default LoginWithOtp;
