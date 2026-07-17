import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Activity, ShieldCheck, PieChart, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '../atoms/Button';

const LIVE_TICKERS = [
  { name: 'RELIANCE', price: 2453.20, change: 1.45, signal: 'BUY', confidence: 94 },
  { name: 'TCS', price: 3412.50, change: -0.25, signal: 'HOLD', confidence: 88 },
  { name: 'INFY', price: 1568.90, change: 2.10, signal: 'BUY', confidence: 91 },
  { name: 'HDFC', price: 1682.40, change: 0.85, signal: 'BUY', confidence: 95 },
];

export const GetStarted = () => {
  const navigate = useNavigate();
  const [tickerIndex, setTickerIndex] = useState(0);
  const [chartProgress, setChartProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleGetStarted = () => {
    navigate('/welcome-continue');
  };

  const handleLoginOtp = () => {
    navigate('/welcome-continue');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_TICKERS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setChartProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 60);
    return () => clearInterval(timer);
  }, []);

  // Interactive Particle Network Canvas (adjusted for Light Theme visibility)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const numParticles = 45;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid pattern (Light Grey)
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.4)';
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particles & connect (Bright Primary Blue with lower opacity)
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const distToMouse = Math.hypot(dx, dy);
        if (distToMouse < 200) {
          const force = (200 - distToMouse) / 200;
          p.x += (dx / distToMouse) * force * 0.4;
          p.y += (dy / distToMouse) * force * 0.4;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.15)';
        ctx.fill();

        for (let j = i + 1; j < numParticles; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePos]);

  const activeTicker = LIVE_TICKERS[tickerIndex];

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-brand-navy overflow-x-hidden font-sans relative flex items-center selection:bg-primary/20 selection:text-primary">
      {/* Background glow highlights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Decorative Network Grid Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Premium Copy & Onboarding CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start gap-8">
          {/* Release Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3.5 py-1.5 text-xs text-primary font-semibold shadow-premium-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Advisory Engine v2.4 Live</span>
          </motion.div>

          {/* Mass Typography */}
          <div className="flex flex-col gap-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-brand-navy"
            >
              Invest Smarter.<br />Build Wealth with Confidence.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="text-sm md:text-base text-brand-secondary max-w-xl leading-relaxed mt-2"
            >
              Receive expert research, AI-powered investment insights, portfolio intelligence and real-time market opportunities — all inside one powerful platform designed to help you invest with confidence.
            </motion.p>
          </div>

          {/* Feature highlights list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
          >
            <div className="bg-white border border-brand-border rounded-card p-4 hover:border-slate-300 hover:shadow-premium transition-all duration-300 flex gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-navy">AI Research</h4>
                <p className="text-[11px] text-brand-secondary">Professional market intelligence validation.</p>
              </div>
            </div>

            <div className="bg-white border border-brand-border rounded-card p-4 hover:border-slate-300 hover:shadow-premium transition-all duration-300 flex gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-success/10 flex items-center justify-center text-success shrink-0">
                <PieChart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-navy">Live Portfolio</h4>
                <p className="text-[11px] text-brand-secondary">Track and evaluate every asset class.</p>
              </div>
            </div>

            <div className="bg-white border border-brand-border rounded-card p-4 hover:border-slate-300 hover:shadow-premium transition-all duration-300 flex gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-navy">Expert Signals</h4>
                <p className="text-[11px] text-brand-secondary">Verified BUY, SELL, HOLD advisories.</p>
              </div>
            </div>

            <div className="bg-white border border-brand-border rounded-card p-4 hover:border-slate-300 hover:shadow-premium transition-all duration-300 flex gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-500 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-navy">Secure Shield</h4>
                <p className="text-[11px] text-brand-secondary">Enterprise-grade transaction protocols.</p>
              </div>
            </div>
          </motion.div>

          {/* Action Area */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full mt-2"
          >
            <Button
              variant="primary"
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-blue-700 text-sm font-semibold rounded-button shadow-glow-blue border border-white/5 flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <button
              onClick={handleLoginOtp}
              className="text-xs font-semibold text-brand-secondary hover:text-brand-navy transition-colors py-2 flex items-center gap-1.5"
            >
              Already have an account? <span className="text-primary hover:underline">Login with OTP →</span>
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D Layered Glassmorphic Dashboard Preview */}
        <div className="lg:col-span-6 w-full flex items-center justify-center relative min-h-[460px] select-none">
          {/* Ambient light source */}
          <div className="absolute w-80 h-80 rounded-full bg-primary/10 blur-[100px] pointer-events-none z-0" />

          {/* Outer Layer Container */}
          <div className="relative w-full max-w-[460px] z-10 flex flex-col gap-6">
            
            {/* Layer 1: Floating Ticker Live Signal Feed (White Glass Panel) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="bg-white/80 backdrop-blur-xl border border-brand-border rounded-card p-6 shadow-premium flex flex-col gap-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold text-brand-secondary uppercase tracking-wider">AI Recommendation Stream</span>
                </div>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-bold">SEBI VERIFIED</span>
              </div>

              {/* Ticker Swap with AnimatePresence */}
              <div className="min-h-[72px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTicker.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-black text-brand-navy">{activeTicker.name}</span>
                      <span className="text-xs text-brand-secondary">Current Market Price</span>
                      <span className="text-lg font-bold text-brand-navy">₹{activeTicker.price.toFixed(2)}</span>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider ${
                        activeTicker.signal === 'BUY' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {activeTicker.signal}
                      </span>
                      <span className="text-[10px] text-brand-secondary font-semibold">AI Confidence: {activeTicker.confidence}%</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mini Target / SL stats */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-button border border-brand-border text-xs text-brand-navy">
                <div className="flex flex-col">
                  <span className="text-[9px] text-brand-secondary font-bold uppercase">Estimated Target</span>
                  <span className="text-xs font-bold text-success mt-0.5">₹{(activeTicker.price * 1.12).toFixed(2)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-brand-secondary font-bold uppercase">Trigger Stop Loss</span>
                  <span className="text-xs font-bold text-danger mt-0.5">₹{(activeTicker.price * 0.94).toFixed(2)}</span>
                </div>
              </div>
            </motion.div>

            {/* Layer 2: Portfolio Growth Trend Widget */}
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 1 }}
              className="bg-white/80 backdrop-blur-xl border border-brand-border rounded-card p-6 shadow-premium flex flex-col gap-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-wider">Simulated Asset Growth</span>
                  <span className="text-xl font-bold text-brand-navy mt-0.5">₹8,42,150.00</span>
                </div>
                <div className="flex items-center gap-1 text-success text-xs font-bold">
                  <TrendingUp className="w-4 h-4" />
                  <span>+18.4% Return</span>
                </div>
              </div>

              {/* Simple Canvas-like inline SVG path for animated growth line */}
              <div className="w-full h-16 relative mt-2">
                <svg className="w-full h-full" viewBox="0 0 300 60">
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Fill area */}
                  <path
                    d={`M 0 50 Q 50 45 100 30 T 200 40 T 300 10 L 300 60 L 0 60 Z`}
                    fill="url(#chartGlow)"
                    className="transition-all duration-300"
                  />

                  {/* Line */}
                  <path
                    d="M 0 50 Q 50 45 100 30 T 200 40 T 300 10"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeDasharray="400"
                    strokeDashoffset={400 - (400 * chartProgress) / 100}
                    className="transition-all duration-100"
                  />
                  
                  {/* Glowing end node */}
                  {chartProgress > 0 && (
                    <circle
                      cx={300 * (chartProgress / 100)}
                      cy={50 - 40 * (chartProgress / 100)}
                      r="4"
                      fill="#10B981"
                      className="animate-ping"
                    />
                  )}
                </svg>
              </div>
            </motion.div>

            {/* Subtle disclaimer / risk notification card */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2.5 bg-slate-100/80 border border-brand-border rounded-button p-3 text-[10px] text-brand-secondary select-none justify-center"
            >
              <AlertCircle className="w-3.5 h-3.5 text-primary shrink-0 animate-bounce" />
              <span>Investments in securities market are subject to market risks.</span>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
};
export default GetStarted;
