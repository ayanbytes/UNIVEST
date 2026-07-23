import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, ShieldCheck, Sparkles, PieChart, Activity, Wallet, AlertCircle } from 'lucide-react';
import { PortfolioHero } from './PortfolioHero';
import { PortfolioOverview } from './PortfolioOverview';
import { PortfolioHoldings } from './PortfolioHoldings';
import { PortfolioPerformance } from './PortfolioPerformance';
import { PortfolioAllocation } from './PortfolioAllocation';
import { PortfolioHistory } from './PortfolioHistory';
import { AiPortfolioReviewModal } from './AiPortfolioReviewModal';
import api from '../../services/api';

export interface PortfolioDashboardProps {
  onSelectStock?: (stock: any) => void;
  onSelectResearch?: (research: any) => void;
  onTrade?: (trade: any) => void;
}

export const PortfolioDashboard: React.FC<PortfolioDashboardProps> = ({
  onSelectStock,
  onSelectResearch,
  onTrade
}) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Holdings' | 'Performance' | 'Allocation' | 'History'>('Overview');
  const [isAiReviewOpen, setIsAiReviewOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState<any>(null);

  React.useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await api.get('/portfolio/');
        setPortfolioData(data);
      } catch (err) {
        console.error("Failed to load portfolio", err);
      }
    };
    fetchPortfolio();
  }, []);

  const tabs = ['Overview', 'Holdings', 'Performance', 'Allocation', 'History'] as const;

  // Formatters
  const formatVal = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);
  const pVal = portfolioData ? portfolioData.current_value : 842150;
  const pnl = portfolioData ? portfolioData.unrealized_pnl : 142600;
  const pnlPerc = portfolioData ? portfolioData.unrealized_pnl_percentage : 20.3;

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500 pb-16">
      
      {/* 1. Portfolio Hero (Wealth Command Center) */}
      <PortfolioHero onReviewAi={() => setIsAiReviewOpen(true)} />

      {/* 2. PERSISTENT PORTFOLIO SUMMARY BAR (Sticky Below Header) */}
      <div className="sticky top-[80px] z-30 bg-white/95 backdrop-blur-md border border-[#E2E8F0] p-4 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6 text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Portfolio Value</span>
            <span className="text-base font-black text-[#0F172A]">{formatVal(pVal)}</span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Today's P&L</span>
            <span className="text-sm font-black text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +₹12,840 (+1.55%)
            </span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Overall Returns</span>
            <span className={`text-sm font-black ${pnl >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {pnl >= 0 ? '+' : ''}{formatVal(pnl)} ({pnl >= 0 ? '+' : ''}{pnlPerc.toFixed(2)}%)
            </span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden md:block" />

          <div className="hidden md:block">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Available Cash</span>
            <span className="text-sm font-black text-[#0F172A]">₹1,24,500</span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden lg:block" />

          <div className="hidden lg:block">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Health Score</span>
            <span className="text-sm font-black text-blue-600 flex items-center gap-1">
              92/100 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsAiReviewOpen(true)}
          className="px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 font-extrabold text-xs hover:bg-blue-100 transition flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 fill-blue-600" /> AI Review
        </button>
      </div>

      {/* 3. Portfolio Tabs (Segmented Control) */}
      <div className="flex items-center gap-2 p-1.5 bg-white border border-[#E2E8F0] rounded-2xl w-fit shadow-sm relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2.5 rounded-xl text-xs font-black transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-slate-500 hover:text-brand-navy'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="portfolioTabBubble"
                  className="absolute inset-0 bg-[#0F172A] rounded-xl shadow-sm"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Dynamic Portfolio Content Surface */}
      <div className="w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'Overview' && <PortfolioOverview />}
            {activeTab === 'Holdings' && <PortfolioHoldings />}
            {activeTab === 'Performance' && <PortfolioPerformance />}
            {activeTab === 'Allocation' && <PortfolioAllocation />}
            {activeTab === 'History' && <PortfolioHistory />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* AI Portfolio Audit Modal */}
      <AiPortfolioReviewModal
        isOpen={isAiReviewOpen}
        onClose={() => setIsAiReviewOpen(false)}
      />

    </div>
  );
};

export default PortfolioDashboard;
