import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck, FileCheck, Brain, TrendingUp,
  CheckCircle2, Smartphone, Shield, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  {
    num: '01',
    title: 'Quick Signup',
    subtitle: 'Register in under 30 seconds',
    desc: 'Enter your mobile number and email. Receive an OTP instantly. No paperwork, no branch visits — your account journey starts here.',
    icon: Smartphone,
    color: 'blue',
    accentFrom: 'from-blue-600',
    accentTo: 'to-blue-400',
    ringColor: 'ring-blue-500/40',
    textAccent: 'text-blue-400',
    bgAccent: 'bg-blue-500/10',
    borderAccent: 'border-blue-500/25',
    visual: [
      { label: 'Mobile OTP', value: '✓ Sent', color: 'text-emerald-400' },
      { label: 'Email verified', value: '✓ Done', color: 'text-emerald-400' },
      { label: 'Account created', value: 'In 28s', color: 'text-blue-400' },
    ],
  },
  {
    num: '02',
    title: 'Instant DigiLocker eKYC',
    subtitle: 'Automated NSDL PAN & Aadhaar validation',
    desc: 'Connect your DigiLocker in one tap. We auto-fetch your PAN and Aadhaar details. NSDL validation happens in real time — fully paperless, 100% compliant.',
    icon: FileCheck,
    color: 'emerald',
    accentFrom: 'from-emerald-600',
    accentTo: 'to-teal-400',
    ringColor: 'ring-emerald-500/40',
    textAccent: 'text-emerald-400',
    bgAccent: 'bg-emerald-500/10',
    borderAccent: 'border-emerald-500/25',
    visual: [
      { label: 'Aadhaar', value: '✓ Fetched', color: 'text-emerald-400' },
      { label: 'PAN Card', value: '✓ Verified', color: 'text-emerald-400' },
      { label: 'NSDL Check', value: '✓ Passed', color: 'text-emerald-400' },
    ],
  },
  {
    num: '03',
    title: 'AI Investor Calibration',
    subtitle: 'Your risk profile & target CAGR',
    desc: 'Answer 5 quick questions. Our AI engine calibrates your risk appetite, investment horizon, and target CAGR — then builds a personalised advisory model just for you.',
    icon: Brain,
    color: 'purple',
    accentFrom: 'from-purple-600',
    accentTo: 'to-indigo-400',
    ringColor: 'ring-purple-500/40',
    textAccent: 'text-purple-400',
    bgAccent: 'bg-purple-500/10',
    borderAccent: 'border-purple-500/25',
    visual: [
      { label: 'Risk Profile', value: 'Moderate', color: 'text-amber-400' },
      { label: 'Target CAGR', value: '22%+', color: 'text-purple-400' },
      { label: 'AI Model', value: '✓ Ready', color: 'text-emerald-400' },
    ],
  },
  {
    num: '04',
    title: 'Execute Advisory Calls',
    subtitle: 'SEBI research calls go live',
    desc: 'Receive live SEBI-compliant research calls with entry price, target, and stop-loss. One-tap execution and automated portfolio rebalancing — your wealth, on autopilot.',
    icon: TrendingUp,
    color: 'amber',
    accentFrom: 'from-amber-500',
    accentTo: 'to-orange-400',
    ringColor: 'ring-amber-500/40',
    textAccent: 'text-amber-400',
    bgAccent: 'bg-amber-500/10',
    borderAccent: 'border-amber-500/25',
    visual: [
      { label: 'RELIANCE BUY', value: '₹3,120', color: 'text-emerald-400' },
      { label: 'TCS BUY', value: '₹4,280', color: 'text-emerald-400' },
      { label: 'Auto-Rebalance', value: '✓ Active', color: 'text-amber-400' },
    ],
  },
];

// ─── Animated visual panel per step ──────────────────────────────────────────
function StepVisual({ step, active }: { step: typeof STEPS[0]; active: boolean }) {
  const Icon = step.icon;
  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center gap-6 p-8 transition-all duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}>

      {/* Big animated icon */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={active ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.accentFrom} ${step.accentTo} flex items-center justify-center shadow-2xl ring-4 ${step.ringColor}`}
      >
        <Icon className="w-12 h-12 text-white" />
      </motion.div>

      {/* Step number */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={active ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className={`font-black text-6xl ${step.textAccent} opacity-20 absolute top-6 right-8 font-mono select-none pointer-events-none`}
      >
        {step.num}
      </motion.div>

      {/* Info chips */}
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={active ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-full max-w-xs space-y-2"
      >
        {step.visual.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ x: 20, opacity: 0 }}
            animate={active ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
            transition={{ delay: 0.25 + i * 0.08, duration: 0.35 }}
            className="flex items-center justify-between bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 backdrop-blur-sm"
          >
            <span className="text-slate-400 text-xs font-medium">{item.label}</span>
            <span className={`text-xs font-black ${item.color}`}>{item.value}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Pulsing ring decoration */}
      <motion.div
        animate={active ? { scale: [1, 1.08, 1], opacity: [0.15, 0.3, 0.15] } : {}}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute w-40 h-40 rounded-full bg-gradient-to-br ${step.accentFrom} ${step.accentTo} blur-3xl -z-10`}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface Props { theme: 'dark' | 'light' }

export const ScrollStepperSection: React.FC<Props> = ({ theme }) => {
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const sectionH = el.offsetHeight;
      const viewH = window.innerHeight;

      // How far we've scrolled through the sticky section (0 → 1)
      const scrolled = -rect.top / (sectionH - viewH);
      const clamped = Math.max(0, Math.min(1, scrolled));

      // Map 0-1 across 4 steps
      const step = Math.min(3, Math.floor(clamped * 4));
      setActiveStep(step);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const step = STEPS[activeStep];

  return (
    <section id="how-it-works">

      {/* ── Header (always visible above sticky) ───────────────────────── */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-4">
        <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
          Seamless Onboarding
        </span>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black font-display ${dark ? 'text-white' : 'text-slate-900'}`}>
          Ready in 4 Simple Steps
        </h2>
        <p className={`text-sm font-medium ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Digital eKYC via DigiLocker, instant risk calibration, and live advisory execution.
        </p>
      </div>

      {/* ── Tall scroll container that drives the sticky panel ─────────── */}
      {/* Height = viewHeight × steps so each step gets a full scroll-viewport */}
      <div
        ref={sectionRef}
        style={{ height: `${STEPS.length * 100}vh` }}
        className="relative"
      >
        {/* Sticky wrapper */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

              {/* LEFT: Step list */}
              <div className="flex flex-col gap-3">

                {/* Progress bar */}
                <div className={`h-1 rounded-full w-full mb-4 overflow-hidden ${dark ? 'bg-white/[0.06]' : 'bg-slate-200'}`}>
                  <motion.div
                    animate={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 to-amber-400"
                  />
                </div>

                {STEPS.map((s, i) => {
                  const SIcon = s.icon;
                  const isActive = activeStep === i;
                  const isDone = activeStep > i;

                  return (
                    <motion.div
                      key={i}
                      onClick={() => {
                        // Manually jump (optional convenience)
                        const el = sectionRef.current;
                        if (!el) return;
                        const sectionH = el.offsetHeight;
                        const viewH = window.innerHeight;
                        const targetRatio = i / STEPS.length + 0.01;
                        const scrollTarget = el.offsetTop + targetRatio * (sectionH - viewH);
                        window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
                      }}
                      animate={{
                        opacity: isActive ? 1 : isDone ? 0.55 : 0.35,
                        x: isActive ? 0 : -4,
                      }}
                      transition={{ duration: 0.35 }}
                      className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-colors ${
                        isActive
                          ? `${s.bgAccent} ${s.borderAccent}`
                          : dark ? 'border-transparent hover:border-white/[0.06]' : 'border-transparent hover:border-slate-200'
                      }`}
                    >
                      {/* Icon / Check */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-br ${s.accentFrom} ${s.accentTo} shadow-lg`
                          : isDone
                            ? 'bg-emerald-500/20 border border-emerald-500/30'
                            : dark ? 'bg-white/[0.04] border border-white/[0.06]' : 'bg-slate-100'
                      }`}>
                        {isDone
                          ? <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          : <SIcon className={`w-5 h-5 ${isActive ? 'text-white' : dark ? 'text-slate-500' : 'text-slate-400'}`} />
                        }
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold ${isActive ? s.textAccent : dark ? 'text-slate-600' : 'text-slate-400'}`}>
                            {s.num}
                          </span>
                          <h4 className={`font-black text-sm truncate ${
                            isActive ? (dark ? 'text-white' : 'text-slate-900') : dark ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            {s.title}
                          </h4>
                        </div>

                        <AnimatePresence mode="wait">
                          {isActive && (
                            <motion.p
                              key={i}
                              initial={{ opacity: 0, height: 0, y: -4 }}
                              animate={{ opacity: 1, height: 'auto', y: 0 }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`text-xs leading-relaxed mt-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}
                            >
                              {s.desc}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Connector line */}
                      {isActive && (
                        <div className={`w-1 self-stretch rounded-full ml-auto ${`bg-gradient-to-b ${s.accentFrom} ${s.accentTo}`}`} />
                      )}
                    </motion.div>
                  );
                })}

                {/* CTA shown on last step */}
                <AnimatePresence>
                  {activeStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="flex items-center gap-3 mt-2"
                    >
                      <button
                        onClick={() => navigate('/signup')}
                        className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-black text-sm rounded-2xl transition shadow-lg shadow-blue-600/20"
                      >
                        Open Free Account →
                      </button>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        SEBI Registered
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* RIGHT: Animated visual */}
              <div className={`relative h-[420px] lg:h-[480px] rounded-3xl overflow-hidden border ${
                dark
                  ? 'bg-white/[0.03] border-white/[0.06] backdrop-blur-xl shadow-[0_8px_48px_rgba(0,0,0,0.5)]'
                  : 'bg-white/60 border-slate-200/50 backdrop-blur-xl shadow-[0_8px_48px_rgba(0,0,0,0.08)]'
              }`}>

                {/* Step indicator top bar */}
                <div className={`flex items-center justify-between px-5 py-3.5 border-b ${dark ? 'border-white/[0.06]' : 'border-slate-200/50'}`}>
                  <div className="flex items-center gap-2">
                    <Zap className={`w-3.5 h-3.5 ${step.textAccent}`} />
                    <span className={`text-[11px] font-black uppercase tracking-wider ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Step {activeStep + 1} of {STEPS.length}
                    </span>
                  </div>
                  <span className={`text-[11px] font-bold ${step.textAccent}`}>{step.subtitle}</span>
                </div>

                {/* Visual panels — stacked, animated in/out */}
                <div className="relative w-full" style={{ height: 'calc(100% - 52px)' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 20, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.97 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="absolute inset-0"
                    >
                      <StepVisual step={step} active={true} />
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ScrollStepperSection;
