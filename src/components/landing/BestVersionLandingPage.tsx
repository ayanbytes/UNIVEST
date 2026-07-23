import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, ArrowRight, TrendingUp, TrendingDown, Sparkles, Mail, CheckCircle2, 
  Brain, BarChart3, CandlestickChart, Briefcase, GraduationCap, Bell, Crown, Star, Check, 
  Radio, Lock, ChevronRight, Zap, RefreshCcw, Layers, Award, Terminal, Flame, Sun, Moon,
  UserCheck, FileCheck, CircleDollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MovingTickerRibbon } from '../common/MovingTickerRibbon';
import { CenteredHeroBackground } from './CenteredHeroBackground';
import { LiveHeroCards } from './LiveHeroCards';
import { BentoFeaturesSection } from './BentoFeaturesSection';
import { AIChatSection } from './AIChatSection';
import { ScrollStepperSection } from './ScrollStepperSection';

export const BestVersionLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [signalIndex, setSignalIndex] = useState(0);

  // Cycling Hero AI Signals
  const aiSignals = [
    { symbol: 'RELIANCE', conviction: 96, target: '₹3,120', pattern: 'Cup & Handle Breakout' },
    { symbol: 'TATAMOTORS', conviction: 94, target: '₹1,080', pattern: 'Golden Crossover' },
    { symbol: 'INFY', conviction: 91, target: '₹1,640', pattern: 'Falling Wedge Breakout' },
    { symbol: 'HDFCBANK', conviction: 93, target: '₹1,820', pattern: 'Institutional Accumulation' }
  ];

  // Stepper Steps for How It Works
  const steps = [
    { title: "Quick Signup", desc: "Register with mobile OTP & email in 30s.", icon: UserCheck },
    { title: "Instant DigiLocker eKYC", desc: "Automated NSDL PAN & Aadhaar validation.", icon: FileCheck },
    { title: "AI Investor Calibration", desc: "Determine your risk tolerance & target CAGR.", icon: Brain },
    { title: "Execute Advisory Calls", desc: "Receive SEBI research calls and automated rebalancing.", icon: TrendingUp },
  ];

  // Illustrative User Experiences
  const testimonials = [
    {
      quote: "Univest's AI Market Analyst flagged the Tata Motors breakout at ₹920 before any broker research report. Booked +24% gain in 12 days.",
      author: "Rajesh Sharma",
      role: "Pro Trader, Mumbai (Illustrative Example)",
      gains: "+₹1,84,000 P&L"
    },
    {
      quote: "The DigiLocker KYC process was completely seamless. Uploaded PAN and was ready for SEBI options calls in under 3 minutes.",
      author: "Priya Nair",
      role: "Options Investor, Bengaluru (Illustrative Example)",
      gains: "14-Day Free Access"
    },
    {
      quote: "Having 3 specialized AI advisors watching my portfolio 24/7 gives me total confidence. The auto-rebalance advice protected my gains.",
      author: "Amitabh Verma",
      role: "HNWI Portfolio Client, Delhi (Illustrative Example)",
      gains: "+22.4% XIRR CAGR"
    }
  ];
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSignalIndex((prev) => (prev + 1) % aiSignals.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setEmailSubmitted(true);
    setTimeout(() => navigate('/signup', { state: { email } }), 1200);
  };

  return (
    <div
      data-theme={theme}
      className={`min-h-screen font-sans transition-colors duration-300 relative ${
        theme === 'dark' ? 'bg-[#080E1A] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >

      {/* ── SITE-WIDE BACKGROUND: vertical lines + gradient mesh ───────── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Vertical grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: theme === 'dark'
              ? 'repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 80px)'
              : 'repeating-linear-gradient(90deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 80px)',
          }}
        />
        {/* Blob 1 — Blue, top-left */}
        <div className={`absolute top-[-5%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] ${
          theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-400/10'
        }`} />
        {/* Blob 2 — Emerald, mid-right */}
        <div className={`absolute top-[35%] right-[-8%] w-[500px] h-[500px] rounded-full blur-[120px] ${
          theme === 'dark' ? 'bg-emerald-500/12' : 'bg-emerald-400/8'
        }`} />
        {/* Blob 3 — Indigo, bottom-left */}
        <div className={`absolute bottom-[10%] left-[10%] w-[450px] h-[450px] rounded-full blur-[120px] ${
          theme === 'dark' ? 'bg-indigo-600/15' : 'bg-indigo-400/8'
        }`} />
        {/* Blob 4 — Cyan, top-right */}
        <div className={`absolute top-[15%] right-[20%] w-[350px] h-[350px] rounded-full blur-[100px] ${
          theme === 'dark' ? 'bg-cyan-500/10' : 'bg-cyan-400/6'
        }`} />
        {/* Blob 5 — Blue, bottom-right */}
        <div className={`absolute bottom-[5%] right-[5%] w-[400px] h-[400px] rounded-full blur-[130px] ${
          theme === 'dark' ? 'bg-blue-700/12' : 'bg-blue-400/6'
        }`} />
      </div>

      {/* 1. STICKY NAVBAR WITH SUN/MOON THEME TOGGLE & TICKER RIBBON */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          theme === 'dark'
            ? 'bg-[#0F172A]/90 backdrop-blur-xl border-white/[0.08]'
            : 'bg-white/90 backdrop-blur-xl border-slate-200 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-600/30">
              U
            </div>
            <div>
              <span className="font-black text-xl tracking-tight block leading-none font-display">UNIVEST</span>
              <span className="text-[10px] text-emerald-500 font-mono font-bold tracking-widest uppercase flex items-center gap-1">
                <Shield className="w-3 h-3" /> SEBI RA: INH000009821
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold opacity-90">
            <a href="#hero" className="hover:text-blue-500 transition">Overview</a>
            <a href="#capabilities" className="hover:text-blue-500 transition">Capabilities</a>
            <a href="#ai-advisors" className="hover:text-blue-500 transition">AI Advisors</a>
            <a href="#how-it-works" className="hover:text-blue-500 transition">How It Works</a>
            <a href="#invest-hub" className="hover:text-blue-500 transition">Asset Hub</a>
            <a href="#pricing" className="hover:text-blue-500 transition">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Sun / Moon Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2.5 text-xs font-black opacity-80 hover:opacity-100 transition cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white text-xs font-black rounded-xl transition shadow-lg shadow-blue-600/25 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CONTINUOUS TICKER MARQUEE UNDER NAVBAR */}
        <MovingTickerRibbon theme={theme} />
      </nav>

      {/* FULL-SCREEN HERO — Equitum-inspired gradient layout */}
      <section id="hero" className="relative w-full min-h-screen overflow-hidden flex flex-col">

        {/* Hero-specific extra-density blobs (layered on top of global background) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/25 rounded-full blur-[120px]" />
          <div className="absolute bottom-[0%] right-[10%] w-[400px] h-[400px] bg-emerald-500/15 rounded-full blur-[100px]" />
          <div className="absolute top-[10%] right-[5%] w-[350px] h-[350px] bg-indigo-600/15 rounded-full blur-[90px]" />
          <div className="absolute top-[40%] left-[-5%] w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[80px]" />
        </div>

        {/* Navbar-height spacer */}
        <div className="h-20 shrink-0" />

        {/* Middle: grows to push top content to center */}
        <div className="flex-1 flex flex-col justify-center">

        {/* Top: Split headline + subtitle */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">

          {/* LEFT: Big Headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.04] tracking-tight font-display">
              We're here to help you build
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                lasting wealth.
              </span>
            </h1>
          </motion.div>

          {/* RIGHT: Subtitle + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6 lg:pt-4"
          >
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              Research, invest, and grow your portfolio — all from one intelligent platform. Powered by certified SEBI Research Analysts and AI that works around the clock.
            </p>

            {/* Email Capture */}
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2">
              <div className="flex items-center gap-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                <Mail className="w-4 h-4 ml-4 shrink-0 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-3 py-3.5 text-sm font-medium outline-none bg-transparent text-white placeholder-slate-500"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="shrink-0 m-1.5 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black rounded-xl transition cursor-pointer flex items-center gap-1.5"
                >
                  {emailSubmitted ? 'Welcome!' : isSubmitting ? 'Joining...' : 'Open Account'}
                  {!emailSubmitted && !isSubmitting && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 pl-1">Free 14-day trial · No credit card required · SEBI Compliant</p>
            </form>

            {/* How it works link */}
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white text-sm font-semibold transition w-fit"
            >
              How it works <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        </div> {/* end flex-1 justify-center */}

        <LiveHeroCards />
      </section>

      {/* MAIN CONTAINER — Remaining page sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">

        <BentoFeaturesSection theme={theme} />

        <AIChatSection theme={theme} />

        {/* 4. MARKET INTELLIGENCE — FULL-BLEED AMBIENT DATA STRIP */}
        <section
          id="market-intelligence"
          className={`border py-8 px-6 rounded-3xl transition-colors ${
            theme === 'dark' ? 'bg-[#080D1A] border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
            <div className="flex items-center gap-3 shrink-0">
              <Radio className="w-5 h-5 text-emerald-500 animate-pulse" />
              <div>
                <span className="font-black text-sm block">LIVE EXCHANGE SPARKELINES</span>
                <span className="text-[10px] opacity-70">Sub-second NSE/BSE streaming tick feeds</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <span className="opacity-70 block text-[10px]">NIFTY 50</span>
                <span className="font-black text-sm block">24,520.40</span>
                <span className="text-emerald-500 text-[11px] font-bold">▲ +0.65% (+158.2)</span>
              </div>
              <div>
                <span className="opacity-70 block text-[10px]">SENSEX</span>
                <span className="font-black text-sm block">80,480.10</span>
                <span className="text-emerald-500 text-[11px] font-bold">▲ +0.52% (+412.0)</span>
              </div>
              <div>
                <span className="opacity-70 block text-[10px]">BANKNIFTY</span>
                <span className="font-black text-sm block">52,340.80</span>
                <span className="text-rose-500 text-[11px] font-bold">▼ -0.18% (-94.2)</span>
              </div>
              <div>
                <span className="opacity-70 block text-[10px]">NIFTY IT</span>
                <span className="font-black text-sm block">39,120.50</span>
                <span className="text-emerald-500 text-[11px] font-bold">▲ +1.24% (+478.6)</span>
              </div>
            </div>

            <button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-lg transition shrink-0 cursor-pointer">
              Launch Terminal
            </button>
          </div>
        </section>

        <ScrollStepperSection theme={theme} />

        {/* 6. INVEST HUB PREVIEW — 7 ASSET CLASSES */}
        <section id="invest-hub" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-amber-500 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
              Multi-Asset Universe
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display">
              7 Dedicated Asset Classes
            </h2>
            <p className="opacity-80 text-sm font-medium">Trade stocks, mutual funds, ETFs, IPOs, gold, and commodities from one dashboard.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-5 rounded-2xl border space-y-2 font-mono ${theme === 'dark' ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200 shadow-xs'}`}>
              <span className="text-xs font-bold opacity-70 block">Equities & Stocks</span>
              <span className="text-lg font-black block">4,000+ Listed</span>
              <span className="text-[11px] text-emerald-500 block">RSI & P/E Filters</span>
            </div>

            <div className={`p-5 rounded-2xl border space-y-2 font-mono ${theme === 'dark' ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200 shadow-xs'}`}>
              <span className="text-xs font-bold opacity-70 block">Mutual Funds</span>
              <span className="text-lg font-black block">24.2% Top CAGR</span>
              <span className="text-[11px] text-blue-500 block">SIP Calculator</span>
            </div>

            <div className={`p-5 rounded-2xl border space-y-2 font-mono ${theme === 'dark' ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200 shadow-xs'}`}>
              <span className="text-xs font-bold opacity-70 block">ETFs & Index</span>
              <span className="text-lg font-black block">Low Expense</span>
              <span className="text-[11px] text-purple-500 block">0.05% TER</span>
            </div>

            <div className={`p-5 rounded-2xl border border-amber-500/40 space-y-2 font-mono ${theme === 'dark' ? 'bg-gradient-to-br from-amber-950/20 to-[#1E293B]' : 'bg-amber-50 border-amber-300'}`}>
              <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                <Flame className="w-3.5 h-3.5" /> TRENDING IPO
              </div>
              <span className="text-lg font-black block">Ola Electric</span>
              <span className="text-[11px] text-amber-500 block">GMP: +₹42 (38%)</span>
            </div>

            <div className={`p-5 rounded-2xl border space-y-2 font-mono ${theme === 'dark' ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200 shadow-xs'}`}>
              <span className="text-xs font-bold opacity-70 block">24K Digital Gold</span>
              <span className="text-lg font-black block">₹7,240 / g</span>
              <span className="text-[11px] text-amber-500 block">99.9% Pure SGB</span>
            </div>

            <div className={`p-5 rounded-2xl border space-y-2 font-mono ${theme === 'dark' ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200 shadow-xs'}`}>
              <span className="text-xs font-bold opacity-70 block">MCX Commodities</span>
              <span className="text-lg font-black block">Crude & Silver</span>
              <span className="text-[11px] text-rose-500 block">Margin Active</span>
            </div>

            <div className="col-span-2 bg-gradient-to-r from-blue-600 to-emerald-500 p-5 rounded-2xl text-white font-mono flex items-center justify-between shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase block opacity-90">All-in-One Asset Hub</span>
                <span className="text-lg font-black block">Explore All Products</span>
              </div>
              <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-white text-slate-900 font-black text-xs rounded-xl shadow-md cursor-pointer">
                View Hub
              </button>
            </div>
          </div>
        </section>

        {/* 7. PORTFOLIO PREVIEW — SINGLE SPOTLIGHT HERO PANEL */}
        <section
          id="portfolio-spotlight"
          className={`rounded-3xl p-8 sm:p-12 border shadow-2xl relative overflow-hidden transition-colors ${
            theme === 'dark' ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 font-mono">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block">Portfolio Spotlight</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display leading-tight">
                Total Net Wealth: <span className="text-emerald-500">₹8,42,150.00</span>
              </h2>
              <div className={`grid grid-cols-2 gap-4 text-xs pt-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                <div>
                  <span className="opacity-70 block text-[10px]">Overall Returns</span>
                  <span className="font-black text-emerald-500 text-lg">+20.3% (+₹1,42,150)</span>
                </div>
                <div>
                  <span className="opacity-70 block text-[10px]">CAGR XIRR</span>
                  <span className="font-black text-blue-500 text-lg">22.4%</span>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-6 border space-y-4 font-mono text-xs ${
              theme === 'dark' ? 'bg-[#0F172A] border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`flex justify-between items-center pb-3 border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className="opacity-70">Top Holding</span>
                <span className="text-emerald-500 font-bold">RELIANCE (35% Weight)</span>
              </div>
              <div className={`flex justify-between items-center pb-3 border-b ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className="opacity-70">Today's P&L</span>
                <span className="text-emerald-500 font-bold">+₹14,820.50 (+1.79%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-70">Rebalance Signal</span>
                <span className="text-blue-500 font-bold">Optimal Allocation</span>
              </div>
            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS SPOTLIGHT (CAROUSEL SPOTLIGHT WITH ILLUSTRATIVE DISCLAIMER) */}
        <section
          id="testimonials"
          className={`border rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 transition-colors ${
            theme === 'dark' ? 'bg-[#080D1A] border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <span className="text-xs font-black uppercase tracking-wider text-purple-500 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
            User Experience Spotlight
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <p className="text-lg sm:text-2xl font-medium leading-relaxed italic">
                "{testimonials[testimonialIdx].quote}"
              </p>

              <div>
                <h4 className="font-black text-base">{testimonials[testimonialIdx].author}</h4>
                <p className="text-xs opacity-75 font-medium">{testimonials[testimonialIdx].role}</p>
                <span className="inline-block mt-2 font-mono text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                  {testimonials[testimonialIdx].gains}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* 9. PRICING SECTION — 3-TIER COMPARISON CARDS */}
        <section id="pricing" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              Subscription Plans
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display">
              Transparent Pricing
            </h2>
            <p className="opacity-80 text-sm font-medium">Choose the plan that fits your trading volume. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Basic Free */}
            <div className={`rounded-3xl p-8 border flex flex-col justify-between ${
              theme === 'dark' ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="space-y-4">
                <span className="text-xs font-bold opacity-70 uppercase block">Basic Free</span>
                <div className="font-mono">
                  <span className="text-4xl font-black">₹0</span>
                  <span className="text-xs opacity-70 font-bold"> / forever</span>
                </div>
                <p className="text-xs opacity-75 font-medium">Essential market access and basic watchlists.</p>
                <ul className={`space-y-3 text-xs font-medium pt-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Real-time NSE/BSE ticks</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 3 SEBI Calls per month</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Basic charts</li>
                </ul>
              </div>
              <button onClick={() => navigate('/signup')} className={`w-full mt-8 py-3.5 font-bold text-xs rounded-xl cursor-pointer ${
                theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
              }`}>
                Get Started Free
              </button>
            </div>

            {/* Pro Trader (Elevated Recommended Tier) */}
            <div className={`rounded-3xl p-8 border-2 border-emerald-500 shadow-2xl flex flex-col justify-between scale-105 relative ${
              theme === 'dark' ? 'bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#1E293B]' : 'bg-gradient-to-b from-white via-emerald-50/30 to-white'
            }`}>
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                Recommended Tier
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold text-emerald-500 uppercase block">Pro Trader</span>
                <div className="font-mono">
                  <span className="text-5xl font-black">₹999</span>
                  <span className="text-xs opacity-70 font-bold"> / month</span>
                </div>
                <p className="text-xs font-medium opacity-90">Full access to SEBI Calls & Autonomous AI Signal Engine.</p>
                <ul className={`space-y-3 text-xs font-medium pt-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Unlimited SEBI Research Calls</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> 3 Autonomous AI Advisors</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Options & Futures Screener</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Portfolio Rebalance Engine</li>
                </ul>
              </div>
              <button onClick={() => navigate('/signup')} className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-black text-xs rounded-xl shadow-lg transition cursor-pointer">
                Start 14-Day Free Trial
              </button>
            </div>

            {/* Elite Wealth */}
            <div className={`rounded-3xl p-8 border flex flex-col justify-between ${
              theme === 'dark' ? 'bg-[#1E293B] border-slate-700' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="space-y-4">
                <span className="text-xs font-bold text-amber-500 uppercase block">Elite Wealth</span>
                <div className="font-mono">
                  <span className="text-4xl font-black">₹2,999</span>
                  <span className="text-xs opacity-70 font-bold"> / month</span>
                </div>
                <p className="text-xs opacity-75 font-medium">For HNWIs & professional traders.</p>
                <ul className={`space-y-3 text-xs font-medium pt-4 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Dedicated SEBI Analyst</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Pre-IPO Allocation Desk</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Automated Trading API</li>
                </ul>
              </div>
              <button onClick={() => navigate('/signup')} className="w-full mt-8 py-3.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 font-bold text-xs rounded-xl border border-amber-500/40 cursor-pointer">
                Contact Desk
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* 10. MONOSPACE TABULAR REGULATORY FOOTER */}
      <footer className={`font-mono text-xs border-t py-12 ${
        theme === 'dark' ? 'bg-[#080D1A] border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b ${
            theme === 'dark' ? 'border-slate-800' : 'border-slate-300'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center font-display">U</div>
              <span className="font-black font-display text-lg">UNIVEST</span>
            </div>
            <div className="text-[11px] text-emerald-500 font-bold">
              SEBI Registration No: INH000009821 (Research Analyst)
            </div>
          </div>

          <div className="text-[10px] opacity-70 leading-relaxed space-y-2">
            <p>
              REGULATORY DISCLOSURE: Investments in securities market are subject to market risks. Read all related documents carefully before investing. Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
            </p>
            <p>
              © {new Date().getFullYear()} Univest / Waya Financial Technologies Pvt Ltd. All rights reserved. Tabular figures rendered via JetBrains Mono.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

// SIGNATURE HERO visual: LIVE AI SIGNAL GRAPH
const LiveAiSignalGraph: React.FC<{ theme: 'dark' | 'light'; activeSignal: any }> = ({ theme, activeSignal }) => {
  return (
    <div className="relative w-full max-w-md mx-auto py-4">
      <svg viewBox="0 0 400 320" className="w-full h-auto">
        {/* Background Grid */}
        <defs>
          <pattern id="graph-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={theme === 'dark' ? '#334155' : '#CBD5E1'} strokeWidth="0.8" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#graph-grid)" />

        {/* Candlestick Bars */}
        {[50, 110, 170, 230, 290, 350].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={120 + (i % 3) * 20} x2={x} y2={210 + (i % 3) * 20} stroke="#64748B" strokeWidth="2" />
            <rect
              x={x - 7}
              y={140 + (i % 3) * 15}
              width="14"
              height={30 + (i % 2) * 20}
              fill={i % 2 === 0 ? "#10B981" : "#2563EB"}
              rx="3"
            />
          </g>
        ))}

        {/* Actual Price Trend Line */}
        <path
          d="M 20 260 Q 80 200, 160 230 T 300 130 T 380 90"
          stroke="#2563EB"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* AI Prediction Trend Line (Emerald Glowing) */}
        <path
          d="M 20 280 Q 80 220, 160 240 T 300 110 T 380 65"
          stroke="#10B981"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Traveling Pulsing Dot on AI Prediction Line */}
        <circle cx="380" cy="65" r="7" fill="#10B981" className="animate-ping" opacity="0.75" />
        <circle cx="380" cy="65" r="5" fill="#10B981" />
      </svg>
    </div>
  );
};

export default BestVersionLandingPage;
