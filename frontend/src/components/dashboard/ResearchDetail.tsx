import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, TrendingUp, AlertCircle, Bookmark, Share2, Wallet, 
  ArrowRight, CheckCircle2, Zap, ShieldCheck, BarChart3,
  Sliders, Layers, Activity, Download, FileText, Clock, UserCheck,
  Building2, MessageSquare, ChevronRight, HelpCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ResearchDetailProps {
  isOpen: boolean;
  onClose: () => void;
  research?: any;
  onTrade?: (researchData: any) => void;
}

export const ResearchDetail: React.FC<ResearchDetailProps> = ({
  isOpen,
  onClose,
  research,
  onTrade
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | '5Y' | 'MAX'>('1M');
  const [chartType, setChartType] = useState<'Candlestick' | 'Line' | 'Area' | 'Volume'>('Candlestick');
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['RSI', 'MACD', 'Volume']);
  const [financialPeriod, setFinancialPeriod] = useState<'quarterly' | 'yearly'>('quarterly');
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!isOpen || !research) return null;

  // Fallback data normalization
  const company = research.company || research.companyName || 'Reliance Industries Ltd';
  const symbol = research.symbol || 'RELIANCE';
  const logo = research.logo || symbol.substring(0, 2);
  const rec = research.rec || research.signal || 'BUY';
  const price = research.price || '₹3,024.50';
  const target = research.target || '₹3,375';
  const stop = research.stop || research.stopLoss || '₹2,838';
  const analyst = research.analyst || 'Rahul Sharma';
  const confidence = research.confidence || 94;
  const returnPct = research.return || '+11%';
  const time = research.time || '20 min ago';
  const summary = research.summary || 'Reliance continues to strengthen its market position through improving refining margins, telecom growth, and consistent institutional buying.';

  // Chart simulation
  const chartPointsMap = {
    '1D': [2980, 2995, 3010, 3005, 3024.5],
    '5D': [2910, 2940, 2925, 2990, 3024.5],
    '1M': [2820, 2870, 2850, 2960, 3024.5],
    '3M': [2700, 2780, 2750, 2900, 3024.5],
    '6M': [2550, 2650, 2600, 2850, 3024.5],
    '1Y': [2400, 2550, 2500, 2800, 3024.5],
    '5Y': [1500, 1850, 2100, 2600, 3024.5],
    'MAX': [800, 1200, 1900, 2500, 3024.5],
  };
  const points = chartPointsMap[selectedTimeframe];
  const minPt = Math.min(...points) * 0.98;
  const maxPt = Math.max(...points) * 1.02;

  const toggleIndicator = (ind: string) => {
    setActiveIndicators(prev => 
      prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind]
    );
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from Workspace' : `Saved ${symbol} research to Workspace`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-[#F8FAFC] overflow-y-auto flex flex-col justify-between"
    >
        {/* TOP INSTITUTIONAL BREADCRUMB & HEADER */}
        <header className="sticky top-0 bg-white border-b border-[#E2E8F0] px-6 py-4 flex flex-wrap items-center justify-between z-30 shadow-xs gap-4">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Research Desk
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                {logo}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-black text-lg text-[#0F172A] leading-tight">{company}</h1>
                  <span className="text-[10px] font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    NSE : {symbol}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">Institutional Equity Research Report</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right mr-2">
              <span className="text-xl font-black text-[#0F172A]">{price}</span>
              <span className="block text-xs font-extrabold text-emerald-600">▲ +1.45% Today</span>
            </div>

            <button
              onClick={handleBookmark}
              className={`w-10 h-10 rounded-xl border border-[#E2E8F0] flex items-center justify-center transition ${
                isBookmarked ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-4.5 h-4.5" fill={isBookmarked ? '#2563EB' : 'none'} />
            </button>

            <button
              onClick={() => toast.success('Institutional PDF report downloading...')}
              className="w-10 h-10 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-slate-500 hover:bg-slate-50 transition"
              title="Download PDF"
            >
              <Download className="w-4.5 h-4.5" />
            </button>

            <button
              onClick={() => toast.success('Shareable link copied')}
              className="w-10 h-10 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-slate-500 hover:bg-slate-50 transition"
            >
              <Share2 className="w-4.5 h-4.5" />
            </button>

            <button
              onClick={() => {
                if (onTrade) onTrade(research);
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition shadow-sm"
            >
              Trade Now
            </button>
          </div>
        </header>

        {/* MAIN FULL PAGE CONTENT BODY */}
        <main className="max-w-7xl mx-auto w-full p-6 sm:p-8 flex flex-col gap-8 flex-1">
          
          {/* 1. HERO INSTITUTIONAL SUMMARY BANNER */}
          <section className="bg-[#0F172A] rounded-[28px] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-black tracking-wider uppercase ${
                    rec === 'BUY' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-white'
                  }`}>
                    {rec} RECOMMENDATION
                  </span>
                  <span className="bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-extrabold px-3 py-1 rounded-lg flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-blue-300" /> {confidence}% AI CONFIDENCE
                  </span>
                  <span className="text-xs text-slate-400 font-bold">Published {time}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">
                  {company} ({symbol}) Research Breakdown
                </h1>

                <div className="flex flex-wrap items-baseline gap-4 mb-6">
                  <span className="text-4xl font-black">{target}</span>
                  <span className="text-emerald-400 font-black text-lg flex items-center gap-1">
                    <TrendingUp className="w-5 h-5" /> Expected Upside {returnPct}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-bold text-slate-300 pt-4 border-t border-white/10">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>SEBI Registered Lead Analyst: <strong className="text-white font-black">{analyst}</strong></span>
                </div>
              </div>

              {/* Target & Risk Grid */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-xs font-bold text-slate-400">Current Market Price</span>
                    <span className="text-xl font-black text-white">{price}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-xs font-bold text-slate-400">Entry Range</span>
                    <span className="text-sm font-black text-white">₹2,920 - ₹2,940</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-xs font-bold text-slate-400">Stop Loss</span>
                    <span className="text-sm font-black text-rose-400">{stop}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Risk Profile</span>
                    <span className="text-sm font-black text-blue-300">Low Risk · 30-45 Days</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onTrade) onTrade(research);
                  }}
                  className="mt-6 w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Wallet className="w-4 h-4" /> Execute Trade Order
                </button>
              </div>
            </div>
          </section>

          {/* 2. FULL-WIDTH LIVE TRADINGVIEW INTERACTIVE CHART */}
          <section className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 sm:p-8 shadow-sm flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h3 className="font-black text-lg text-[#0F172A]">Live TradingView Chart</h3>
              </div>

              {/* Timeframes */}
              <div className="flex items-center gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0] text-xs">
                {(['1D', '5D', '1M', '3M', '6M', '1Y', '5Y', 'MAX'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-3 py-1 rounded-lg font-black transition ${
                      selectedTimeframe === tf
                        ? 'bg-[#0F172A] text-white shadow-sm'
                        : 'text-slate-500 hover:text-[#0F172A]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Indicators */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Indicators:</span>
                {['RSI', 'MACD', 'EMA', 'SMA', 'Bollinger', 'Volume'].map((ind) => {
                  const isActive = activeIndicators.includes(ind);
                  return (
                    <button
                      key={ind}
                      onClick={() => toggleIndicator(ind)}
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-black border transition ${
                        isActive ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-400 border-slate-200'
                      }`}
                    >
                      {ind}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TradingView Canvas Engine */}
            <div className="relative h-80 w-full bg-[#0F172A] rounded-2xl p-5 overflow-hidden flex flex-col justify-between shadow-inner">
              <div className="absolute inset-0 flex flex-col justify-between p-5 pointer-events-none opacity-20">
                <div className="border-b border-dashed border-slate-400 w-full" />
                <div className="border-b border-dashed border-slate-400 w-full" />
                <div className="border-b border-dashed border-slate-400 w-full" />
              </div>

              <div className="absolute top-8 left-0 right-0 border-b border-emerald-500/80 border-dashed z-10 px-5 flex justify-between items-center text-[10px] font-black text-emerald-400">
                <span>TARGET: {target}</span>
                <span>UPSIDE {returnPct}</span>
              </div>

              <div className="absolute bottom-8 left-0 right-0 border-b border-rose-500/80 border-dashed z-10 px-5 flex justify-between items-center text-[10px] font-black text-rose-400">
                <span>STOP LOSS: {stop}</span>
                <span>INVALIDATION LEVEL</span>
              </div>

              <svg className="w-full h-full relative z-0 mt-4" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="fullPageChartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0,200 ${points.map((pt, i) => {
                    const x = (i / (points.length - 1)) * 500;
                    const y = 170 - ((pt - minPt) / (maxPt - minPt)) * 130;
                    return `L ${x},${y}`;
                  }).join(' ')} L 500,200 Z`}
                  fill="url(#fullPageChartGrad)"
                />
                <path
                  d={points.map((pt, i) => {
                    const x = (i / (points.length - 1)) * 500;
                    const y = 170 - ((pt - minPt) / (maxPt - minPt)) * 130;
                    return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>

              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold z-10 pt-2 border-t border-white/10">
                <span>TradingView Feed</span>
                <span>RSI: 63 (Bullish) · MACD: Positive Crossover · EMA: Above 200</span>
              </div>
            </div>
          </section>

          {/* 3. EDITORIAL INVESTMENT THESIS & KEY DRIVERS */}
          <section className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <h3 className="text-xl font-black text-[#0F172A]">Investment Thesis</h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              {summary} The daily charts confirm a textbook multi-month consolidation breakout on 3.2x average 20-day volume expansion. Institutional accumulation models show aggressive long buildup near current demand zones.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-2xl flex flex-col gap-2">
                <span className="text-xs font-black text-[#0F172A] uppercase tracking-wider">Key Catalysts</span>
                <ul className="flex flex-col gap-2 text-xs text-slate-600 font-medium">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Strong quarterly earnings and operational cash flow growth.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Sector rotation favoring defensive large-caps amidst global volatility.</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Green hydrogen plant commissioning projected for late Q3.</li>
                </ul>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-2xl flex flex-col gap-2">
                <span className="text-xs font-black text-[#0F172A] uppercase tracking-wider">Support & Resistance Levels</span>
                <div className="grid grid-cols-2 gap-3 mt-1 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Resistance</span>
                    <span className="font-black text-[#0F172A] text-sm">₹3,080 / ₹3,375</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Support</span>
                    <span className="font-black text-[#0F172A] text-sm">₹2,960 / ₹2,838</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. AI SUMMARY CARD */}
          <section className="bg-white rounded-[28px] border border-blue-100 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-600 font-black text-base">
                <Sparkles className="w-5 h-5 fill-blue-600" /> AI Quant Engine Summary
              </div>
              <span className="text-[10px] font-bold text-slate-400">Generated 2 mins ago</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">AI Confidence</span>
                <span className="text-xl font-black text-blue-600">94%</span>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Overall Trend</span>
                <span className="text-xl font-black text-emerald-600">Bullish</span>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Expected Return</span>
                <span className="text-xl font-black text-emerald-600">+11%</span>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Risk Profile</span>
                <span className="text-xl font-black text-[#0F172A]">Low Risk</span>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Time Horizon</span>
                <span className="text-xl font-black text-blue-600">30–45 Days</span>
              </div>
            </div>
          </section>

          {/* 5. TECHNICAL & FUNDAMENTAL ANALYSIS GRIDS */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Technical Analysis */}
            <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-lg font-black text-[#0F172A]">Technical Analysis</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">RSI (14)</span>
                  <span className="font-black text-base text-emerald-600">63 (Bullish)</span>
                </div>
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">MACD</span>
                  <span className="font-black text-base text-emerald-600">Bullish Crossover</span>
                </div>
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">EMA</span>
                  <span className="font-black text-base text-[#0F172A]">Above 200 DMA</span>
                </div>
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">Support / Resistance</span>
                  <span className="font-black text-base text-[#0F172A]">₹2,960 / ₹3,375</span>
                </div>
              </div>
            </div>

            {/* Fundamental Analysis */}
            <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-lg font-black text-[#0F172A]">Fundamental Analysis</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">P/E Ratio</span>
                  <span className="font-black text-sm text-[#0F172A]">22x</span>
                </div>
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">ROE %</span>
                  <span className="font-black text-sm text-emerald-600">18%</span>
                </div>
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">ROCE %</span>
                  <span className="font-black text-sm text-emerald-600">24%</span>
                </div>
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-100">
                  <span className="text-slate-400 font-bold block text-[10px] uppercase">EPS (TTM)</span>
                  <span className="font-black text-sm text-[#0F172A]">₹138</span>
                </div>
              </div>
            </div>

          </section>

          {/* 6. WHY BUY? & THINGS TO WATCH (RISKS) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Why BUY? */}
            <div className="bg-white rounded-[28px] border border-emerald-100 p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-lg font-black text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Why BUY? Key Investment Reasons
              </h3>
              <div className="flex flex-col gap-2.5 text-xs text-slate-700 font-medium">
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-2">
                  <span className="font-black text-emerald-700">✓</span> Strong quarterly results and cash flow expansion.
                </div>
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-2">
                  <span className="font-black text-emerald-700">✓</span> Heavy institutional FII buying over last 5 sessions.
                </div>
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-2">
                  <span className="font-black text-emerald-700">✓</span> Clean technical breakout above key resistance levels.
                </div>
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-2">
                  <span className="font-black text-emerald-700">✓</span> Attractive valuation multiple compared to sector peers.
                </div>
              </div>
            </div>

            {/* Things to Watch / Risks */}
            <div className="bg-white rounded-[28px] border border-rose-100 p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-lg font-black text-rose-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600" /> Things to Watch (Key Risks)
              </h3>
              <div className="flex flex-col gap-2.5 text-xs text-slate-700 font-medium">
                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 flex items-center gap-2">
                  <span className="font-black text-rose-700">!</span> Global crude oil price volatility impacting short-term margins.
                </div>
                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 flex items-center gap-2">
                  <span className="font-black text-rose-700">!</span> Global macroeconomic slowdown in discretionary exports.
                </div>
                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 flex items-center gap-2">
                  <span className="font-black text-rose-700">!</span> Daily close below Stop Loss level of {stop} invalidates setup.
                </div>
              </div>
            </div>

          </section>

          {/* 7. SIMILAR OPPORTUNITIES (AI SUGGESTIONS) */}
          <section className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-lg font-black text-[#0F172A]">Similar AI-Suggested Opportunities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { company: 'ONGC Ltd', symbol: 'ONGC', rec: 'BUY', target: '₹340', return: '+14%' },
                { company: 'Indian Oil Corp', symbol: 'IOC', rec: 'BUY', target: '₹195', return: '+12%' },
                { company: 'Bharat Petroleum', symbol: 'BPCL', rec: 'HOLD', target: '₹360', return: '+8%' }
              ].map((sim) => (
                <div key={sim.symbol} className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="font-black text-sm text-[#0F172A] block">{sim.company}</span>
                    <span className="text-[10px] text-slate-400 font-bold">Target: {sim.target} ({sim.return})</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${
                    sim.rec === 'BUY' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {sim.rec}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* STICKY BOTTOM ACTION BAR */}
        <footer className="sticky bottom-0 bg-white border-t border-[#E2E8F0] p-5 z-30 flex items-center justify-between gap-4 shadow-2xl">
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Target Upside</span>
            <span className="text-lg font-black text-emerald-600">{target} ({returnPct})</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto flex-1 sm:flex-none justify-end">
            <button
              onClick={() => {
                if (onTrade) onTrade({ ...research, rec: 'SELL' });
              }}
              className="flex-1 sm:px-8 py-4 rounded-xl bg-[#EF4444] hover:bg-rose-700 text-white font-black text-sm transition shadow-md"
            >
              SELL {symbol}
            </button>

            <button
              onClick={() => {
                if (onTrade) onTrade({ ...research, rec: 'BUY' });
              }}
              className="flex-1 sm:px-10 py-4 rounded-xl bg-[#16A34A] hover:bg-emerald-700 text-white font-black text-sm transition shadow-md"
            >
              BUY {symbol}
            </button>
          </div>
        </footer>
      </motion.div>
  );
};
