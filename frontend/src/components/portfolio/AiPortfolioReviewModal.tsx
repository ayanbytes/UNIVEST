import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';

interface AiPortfolioReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiPortfolioReviewModal: React.FC<AiPortfolioReviewModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const handleExecute = (actionName: string) => {
    toast.success(`${actionName} order initiated via AI Rebalance`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 sm:p-8 max-w-xl w-full shadow-2xl flex flex-col gap-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600 fill-blue-600 animate-pulse" />
              <div>
                <h3 className="font-black text-lg text-[#0F172A]">AI Portfolio Review & Health Audit</h3>
                <span className="text-[10px] text-slate-400 font-bold">SEBI SEBI-Compliant Risk Assessment Engine</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Health Score Overview Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Health Score</span>
              <span className="text-2xl font-black text-blue-600">92/100</span>
              <span className="text-[9px] text-emerald-600 font-bold block mt-1">Excellent</span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Diversification</span>
              <span className="text-2xl font-black text-emerald-600">88/100</span>
              <span className="text-[9px] text-emerald-600 font-bold block mt-1">Well Balanced</span>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Risk Profile</span>
              <span className="text-xl font-black text-[#0F172A] mt-1 block">Low Risk</span>
              <span className="text-[9px] text-slate-500 font-bold block mt-1">0.38 Debt/Eq</span>
            </div>
          </div>

          {/* AI Thesis & Sector Note */}
          <div className="bg-blue-50/60 border border-blue-100 p-5 rounded-2xl flex flex-col gap-2">
            <span className="text-xs font-black text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Rebalance Recommendation
            </span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Your portfolio has outperformed NIFTY 50 by <strong>+7.2%</strong>. However, IT Services accounts for 28% of total equity value. AI recommends reallocating 5% into Healthcare & FMCG to minimize drawdown risk during monsoon volatility.
            </p>
          </div>

          {/* Quick Actions List */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Suggested Rebalance Actions</span>
            
            <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-[#0F172A] block">Trim 5% INFY & TCS Holding</span>
                <span className="text-[10px] text-slate-500 font-medium">Reallocate ₹42,000 into Sun Pharma (SUNPHARMA)</span>
              </div>
              <button
                onClick={() => handleExecute('Trim IT & Buy Sun Pharma')}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition shadow-xs shrink-0"
              >
                Execute
              </button>
            </div>

            <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-[#0F172A] block">Book 50% Profit in TATASTEEL</span>
                <span className="text-[10px] text-slate-500 font-medium">Target ₹147.20 achieved (+18.4% return)</span>
              </div>
              <button
                onClick={() => handleExecute('Book TATASTEEL Profit')}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition shadow-xs shrink-0"
              >
                Book Profit
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-[#E2E8F0] text-slate-700 font-extrabold text-xs hover:bg-slate-50 transition"
            >
              Close Review
            </button>
            <button
              onClick={() => handleExecute('Auto-Rebalance All')}
              className="flex-1 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-black text-xs transition shadow-md flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Auto Rebalance
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
