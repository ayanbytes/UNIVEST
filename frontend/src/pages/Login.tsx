import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, RefreshCw, ShieldCheck } from 'lucide-react';
import { LoginIllustration } from '../components/auth/LoginIllustration';
import { TrustBadges } from '../components/auth/TrustBadges';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [resendAfter, setResendAfter] = useState(30);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => { 
    if (!otpSent || resendAfter === 0) return; 
    const timer = window.setTimeout(() => setResendAfter(value => value - 1), 1000); 
    return () => window.clearTimeout(timer); 
  }, [otpSent, resendAfter]);

  useEffect(() => { 
    if (otpSent) window.setTimeout(() => otpRefs.current[0]?.focus(), 150); 
  }, [otpSent]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    
    setIsLoading(true);
    try {
      // 1. Check if email exists
      const checkRes = await api.get(`/auth/check-email?email=${encodeURIComponent(email)}`);
      if (!checkRes.data.exists) {
        setErrorMessage('No account found with this email. Please create an account.');
        setIsLoading(false);
        return;
      }

      // 2. Send OTP
      await api.post('/auth/send-otp', { email });
      setOtpSent(true); 
      setResendAfter(30);
      toast.success('OTP sent to your email');
    } catch (error) {
      console.error("Failed to send OTP", error);
      setErrorMessage("Failed to send OTP. Please check your email or try again later.");
    } finally {
      setIsLoading(false); 
    }
  };

  const handleVerifyOtp = async () => { 
    if (otp.some(value => !value) || isLoading) return; 
    setIsLoading(true); 
    
    try {
      const otpString = otp.join('');
      
      const response = await api.post('/auth/login', {
        email: email,
        otp: otpString
      });
      
      const { access_token } = response.data;
      
      const userRes = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      
      login(access_token, userRes.data);
      toast.success('Welcome back to Univest!');
      navigate('/dashboard');
    } catch (error) {
      console.error("Auth Error", error);
      setErrorMessage("Authentication failed. Invalid OTP.");
      setOtp(Array(6).fill(''));
      otpRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { 
    if (otp.every(Boolean)) handleVerifyOtp(); 
    /* eslint-disable-next-line react-hooks/exhaustive-deps */ 
  }, [otp]);

  const setDigit = (index: number, raw: string) => { 
    const next = [...otp]; 
    next[index] = raw.replace(/\D/g, '').slice(-1); 
    setOtp(next); 
    if (next[index] && index < 5) otpRefs.current[index + 1]?.focus(); 
  };

  const pasteOtp = (event: React.ClipboardEvent<HTMLInputElement>) => { 
    const digits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split(''); 
    if (!digits.length) return; 
    event.preventDefault(); 
    setOtp([...digits, ...Array(6).fill('')].slice(0, 6)); 
    otpRefs.current[Math.min(digits.length, 5)]?.focus(); 
  };

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center p-4 sm:p-6 font-sans text-slate-100">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-0 bg-[#0F172A] border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
        
        {/* Left Column: Vector Illustration & Teaser */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-950 border-r border-slate-800/80 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 font-black text-white text-lg flex items-center justify-center shadow-md">
              U
            </div>
            <span className="font-black text-xl tracking-tight text-white">UNIVEST</span>
          </div>

          <div className="my-auto flex flex-col items-center text-center">
            <LoginIllustration />
            <h2 className="text-2xl font-black text-white mt-6 tracking-tight">
              Smart Investing Starts Here
            </h2>
            <p className="text-slate-400 text-xs font-medium mt-2 max-w-sm leading-relaxed">
              Access SEBI certified research calls, autonomous AI advisors, and real-time market order execution.
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 border-t border-slate-800/60 pt-4">
            <span>SEBI RA Registered</span>
            <span>100% Secure SSL</span>
          </div>
        </div>

        {/* Right Column: Interactive Login Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <div className="lg:hidden flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 font-black text-white flex items-center justify-center text-sm">
                  U
                </div>
                <span className="font-black text-lg text-white">UNIVEST</span>
              </div>

              {!otpSent ? (
                <>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Welcome Back</h1>
                  <p className="text-slate-400 text-xs font-medium mt-1">Sign in to manage your portfolio and research signals</p>
                </>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Verify Email</h1>
                    <p className="text-slate-400 text-xs font-medium mt-1">
                      We sent a 6-digit code to <span className="font-bold text-white">{email}</span>.
                    </p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-500/20 text-blue-400 shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-[13px] font-bold text-rose-500">
                {errorMessage}
              </div>
            )}

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full pl-10 pr-4 py-3 bg-[#1E293B] border rounded-xl text-xs font-medium text-white placeholder-slate-500 outline-none transition ${
                        errorMessage ? 'border-rose-500 bg-rose-500/10' : 'border-slate-700 focus:border-blue-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-black text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue with OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                {/* OTP Inputs */}
                <div className="flex justify-between gap-2" onPaste={pasteOtp}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={node => { otpRefs.current[index] = node; }}
                      value={digit}
                      onChange={event => setDigit(index, event.target.value)}
                      onKeyDown={event => { if (event.key === 'Backspace' && !otp[index] && index) otpRefs.current[index - 1]?.focus(); }}
                      inputMode="numeric"
                      maxLength={1}
                      aria-label={`OTP digit ${index + 1}`}
                      className="h-12 w-11 sm:h-14 sm:w-12 rounded-xl border border-slate-700 bg-[#1E293B] text-center text-lg font-black text-white outline-none transition focus:border-blue-500 focus:bg-slate-800"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <button onClick={() => { setOtpSent(false); setErrorMessage(''); }} className="font-bold text-blue-400 hover:text-blue-300 transition-colors">
                    Change email
                  </button>
                  <button 
                    onClick={() => { 
                      if (!resendAfter) { 
                        setOtp(Array(6).fill('')); 
                        handleSendOtp();
                      } 
                    }} 
                    disabled={Boolean(resendAfter)} 
                    className="font-bold text-blue-400 disabled:text-slate-500 transition-colors"
                  >
                    {resendAfter ? `Resend in ${resendAfter}s` : 'Resend code'}
                  </button>
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.some(v => !v)}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-black text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Secure Log In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="mt-6 text-center">
              <span className="text-xs text-slate-400 font-medium">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-blue-400 font-black hover:text-blue-300 transition-colors"
                >
                  Create one now
                </button>
              </span>
            </div>
          </div>

          <div className="mt-8">
            <TrustBadges />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
