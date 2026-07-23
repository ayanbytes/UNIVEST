import React from 'react';
import { TrendingUp, ArrowRight, Wallet, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface PortfolioHeroProps {
  onReviewAi?: () => void;
  onAddFunds?: () => void;
}

export const PortfolioHero: React.FC<PortfolioHeroProps> = ({ onReviewAi, onAddFunds }) => {
  return (
    <section className="relative overflow-hidden rounded-[24px] p-6 md:p-8 shadow-premium-lg bg-brand-navy w-full border border-slate-800">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0f172a] opacity-90" />
      <div className="absolute right-0 top-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-success/15 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Abstract Mesh Graphic (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
      </svg>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Wealth Command Center</span>
            <span className="flex items-center gap-1 bg-white/10 border border-white/20 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">
              <ShieldCheck className="w-3 h-3 text-success" /> Encrypted
            </span>
          </div>
          
          <h1 className="text-white text-2xl md:text-[32px] leading-tight font-black tracking-tight mb-1">
            Your Portfolio
          </h1>
          
          <div className="flex flex-col md:flex-row items-baseline gap-3 mt-4">
            <h2 className="text-white text-2xl md:text-3xl font-black tracking-tighter">
              ₹12,48,650
            </h2>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-success/20 border border-success/30 text-success">
              <TrendingUp className="w-4 h-4" />
              <span className="font-black text-sm">+18.6% Overall</span>
            </div>
          </div>
          
          {/* AI Wealth Story */}
          <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden group hover:bg-white/10 transition-colors duration-300">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/30 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors" />
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                <strong className="text-white">Your portfolio has outperformed the NIFTY 50 by 7.2% over the past year.</strong> Banking and Technology contributed 68% of your gains. AI suggests reducing concentration in one sector and adding exposure to Healthcare for better diversification.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right side CTAs and Quick Stats */}
        <div className="flex flex-col gap-6 md:min-w-[280px]">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Today's P/L</span>
              <span className="text-success font-black text-lg block">+₹14,250</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Health Score</span>
              <span className="text-white font-black text-lg flex items-center gap-1.5">
                92/100 <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              </span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 mt-2">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onReviewAi}
              className="w-full bg-primary text-white font-black py-3 rounded-xl shadow-glow-blue flex items-center justify-center gap-2 hover:bg-blue-700 transition text-sm cursor-pointer"
            >
              Review Portfolio <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAddFunds}
              className="w-full bg-white/10 border border-white/20 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/20 transition text-sm cursor-pointer"
            >
              <Wallet className="w-4 h-4" /> Add Funds
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
