import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, Activity, FileText, ArrowRightLeft } from 'lucide-react';

const mockHoldings = [
  { id: '1', symbol: 'RELIANCE', name: 'Reliance Industries Ltd', logo: 'RL', qty: 150, avgPrice: 2450.00, cmp: 2934.50, invested: 367500, current: 440175, alloc: 35.2, ai: 'HOLD', isUp: true, sparkline: [2400, 2500, 2700, 2800, 2900, 2934] },
  { id: '2', symbol: 'TCS', name: 'Tata Consultancy Services', logo: 'TC', qty: 45, avgPrice: 3800.50, cmp: 4185.10, invested: 171022.5, current: 188329.5, alloc: 15.1, ai: 'BUY', isUp: true, sparkline: [3800, 3900, 4000, 4100, 4150, 4185] },
  { id: '3', symbol: 'HDFCBANK', name: 'HDFC Bank Limited', logo: 'HD', qty: 200, avgPrice: 1610.20, cmp: 1682.40, invested: 322040, current: 336480, alloc: 26.9, ai: 'BUY', isUp: true, sparkline: [1600, 1580, 1620, 1650, 1670, 1682] },
  { id: '4', symbol: 'INFY', name: 'Infosys Limited', logo: 'IF', qty: 85, avgPrice: 1640.00, cmp: 1562.10, invested: 139400, current: 132778.5, alloc: 10.6, ai: 'SELL', isUp: false, sparkline: [1650, 1630, 1600, 1590, 1580, 1562] },
  { id: '5', symbol: 'TATASTEEL', name: 'Tata Steel Limited', logo: 'TS', qty: 1000, avgPrice: 125.40, cmp: 147.20, invested: 125400, current: 147200, alloc: 11.8, ai: 'HOLD', isUp: true, sparkline: [120, 125, 130, 140, 145, 147] },
];

export const PortfolioHoldings: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input 
            type="text" 
            placeholder="Search your holdings..." 
            className="w-full bg-white border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-brand-navy outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-sm font-bold text-slate-600 hover:text-brand-navy hover:bg-slate-50 transition shadow-sm">
            <SlidersHorizontal className="w-4 h-4" /> Filter
          </button>
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-1 flex shadow-sm">
            <button className="px-4 py-2 text-xs font-black bg-brand-navy text-white rounded-lg transition">All</button>
            <button className="px-4 py-2 text-xs font-black text-slate-500 hover:text-brand-navy rounded-lg transition">Gainers</button>
            <button className="px-4 py-2 text-xs font-black text-slate-500 hover:text-brand-navy rounded-lg transition">Losers</button>
          </div>
        </div>
      </div>

      {/* Holdings Cards */}
      <div className="flex flex-col gap-4">
        {mockHoldings.map((stock) => {
          const isExpanded = expandedId === stock.id;
          const pnl = stock.current - stock.invested;
          const pnlPercent = (pnl / stock.invested) * 100;
          
          return (
            <motion.div 
              layout
              key={stock.id} 
              className={`bg-white border rounded-[24px] overflow-hidden transition-shadow duration-300 ${isExpanded ? 'border-primary/30 shadow-glow-blue' : 'border-[#E2E8F0] shadow-premium hover:shadow-premium-lg'}`}
            >
              {/* Header / Main Row */}
              <div 
                className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer select-none"
                onClick={() => toggleExpand(stock.id)}
              >
                {/* Identity */}
                <div className="flex items-center gap-4 w-full md:w-1/4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-black text-sm text-slate-500 shrink-0">
                    {stock.logo}
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-black text-brand-navy block truncate">{stock.symbol}</span>
                    <span className="text-xs text-slate-500 block truncate">{stock.name}</span>
                  </div>
                </div>

                {/* Quick Stats Row (Desktop) */}
                <div className="hidden md:grid grid-cols-4 gap-8 flex-1">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Quantity</span>
                    <span className="text-sm font-black text-brand-navy">{stock.qty}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Avg Price</span>
                    <span className="text-sm font-black text-brand-navy">₹{stock.avgPrice.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">LTP</span>
                    <span className="text-sm font-black text-brand-navy">₹{stock.cmp.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Overall P/L</span>
                    <span className={`text-sm font-black block ${stock.isUp ? 'text-success' : 'text-rose-500'}`}>
                      {stock.isUp ? '+' : ''}₹{Math.abs(pnl).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Right side indicators */}
                <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Returns</span>
                    <span className={`text-sm font-black bg-${stock.isUp ? 'success' : 'rose'}-50 text-${stock.isUp ? 'success' : 'rose-600'} px-2 py-0.5 rounded`}>
                      {stock.isUp ? '+' : ''}{pnlPercent.toFixed(2)}%
                    </span>
                  </div>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="p-2 bg-slate-50 rounded-full text-slate-400">
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>

              {/* Expanded Area */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="border-t border-slate-100 bg-slate-50/50"
                  >
                    <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                      {/* Detailed Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Invested Value</span>
                          <span className="text-sm font-bold text-brand-navy">₹{stock.invested.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Current Value</span>
                          <span className="text-sm font-bold text-brand-navy">₹{stock.current.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Allocation</span>
                          <span className="text-sm font-bold text-brand-navy">{stock.alloc}%</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">AI Rating</span>
                          <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase ${
                            stock.ai === 'BUY' ? 'bg-[#DCFCE7] text-[#166534]' : 
                            stock.ai === 'SELL' ? 'bg-[#FEECEC] text-[#991B1B]' : 
                            'bg-slate-200 text-slate-700'
                          }`}>
                            {stock.ai}
                          </span>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex flex-wrap gap-3 md:justify-end items-end h-full pt-4 border-t md:border-t-0 md:border-l border-slate-200 md:pl-8">
                        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition shadow-sm">
                          <Activity className="w-3.5 h-3.5" /> Details
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs font-bold text-slate-600 hover:border-primary hover:text-primary transition shadow-sm">
                          <FileText className="w-3.5 h-3.5" /> Research
                        </button>
                        <button className="flex items-center gap-1.5 px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-premium-sm hover:bg-blue-700 transition">
                          <ArrowRightLeft className="w-3.5 h-3.5" /> Trade
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
