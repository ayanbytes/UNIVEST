import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldAlert, Sparkles, Target, Zap, AlertCircle, ChevronRight, Activity, PieChart, Info, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';

const mockGrowthData = [
  { name: 'Jan', value: 820000 },
  { name: 'Feb', value: 850000 },
  { name: 'Mar', value: 890000 },
  { name: 'Apr', value: 860000 },
  { name: 'May', value: 920000 },
  { name: 'Jun', value: 1050000 },
  { name: 'Jul', value: 1248650 },
];

const mockTopPerformers = [
  { symbol: 'TCS', name: 'Tata Consultancy Services', logo: 'TC', returnStr: '+24.5%', todayStr: '+1.2%', ai: 'BUY' },
  { symbol: 'RELIANCE', name: 'Reliance Industries', logo: 'RL', returnStr: '+18.2%', todayStr: '+0.8%', ai: 'HOLD' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', logo: 'HD', returnStr: '+12.4%', todayStr: '+2.1%', ai: 'BUY' },
];

export const PortfolioOverview: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Top Row: Snapshot and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Portfolio Snapshot */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium hover:shadow-premium-lg transition duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy flex items-center gap-2">
              <PieChart className="w-4 h-4 text-primary" /> Portfolio Snapshot
            </h3>
            <button className="text-[10px] font-bold text-slate-400 uppercase hover:text-primary transition">Details</button>
          </div>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Invested Amount</span>
              <span className="text-lg font-black text-brand-navy block">₹10,24,500</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Available Cash</span>
              <span className="text-lg font-black text-brand-navy block">₹45,200</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Overall P/L</span>
              <span className="text-lg font-black text-success block">+₹2,24,150</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">XIRR</span>
              <span className="text-lg font-black text-brand-navy block">14.2%</span>
            </div>
          </div>
        </div>

        {/* AI Portfolio Insights */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium hover:shadow-glow-blue transition duration-300 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" /> AI Insights
            </h3>
            <span className="text-[10px] font-black text-white bg-primary px-2 py-0.5 rounded-full">New</span>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-xl">
              <div>
                <span className="text-xs font-bold text-brand-navy block">Diversification Score</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Overweight in IT Sector (28%)</span>
              </div>
              <span className="text-sm font-black text-warning">74/100</span>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
              <h4 className="text-[11px] font-black text-brand-navy uppercase mb-1">AI Recommendation</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Rebalance suggested. Moving 5% from Tech to FMCG could improve stability and reduce volatility by 1.2%.
              </p>
              <button className="mt-3 text-[10px] font-bold text-primary flex items-center gap-1 hover:text-blue-700 transition">
                View Rebalance Strategy <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Growth Chart */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" /> Growth Trajectory
          </h3>
          <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-1">
            {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map(t => (
              <button key={t} className={`px-3 py-1 text-[10px] font-black rounded-md transition ${t === '1Y' ? 'bg-white shadow-sm text-brand-navy border border-slate-200' : 'text-slate-400 hover:text-brand-navy'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockGrowthData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 600 }} tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontSize: '12px', fontWeight: 700 }}
                itemStyle={{ color: '#0F172A' }}
              />
              <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row: Top Performers & Needs Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Performers */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium">
          <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy mb-5 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" /> Top Performers
          </h3>
          <div className="flex flex-col gap-3">
            {mockTopPerformers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-black text-xs text-slate-500">
                    {stock.logo}
                  </div>
                  <div>
                    <span className="text-xs font-black text-brand-navy block">{stock.symbol}</span>
                    <span className="text-[10px] text-slate-500 block truncate max-w-[120px]">{stock.name}</span>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <span className="text-xs font-black text-success block">{stock.returnStr}</span>
                    <span className="text-[9px] text-slate-400 block font-bold mt-0.5">Overall</span>
                  </div>
                  <span className={`text-[8px] font-black px-2 py-1 rounded bg-blue-50 text-primary uppercase`}>
                    AI {stock.ai}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Attention */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium">
          <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy mb-5 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500" /> Needs Attention
          </h3>
          <div className="flex flex-col gap-3">
            
            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase text-rose-600 tracking-wider block mb-1">Stop Loss Alert</span>
                <span className="text-xs font-bold text-brand-navy">INFY dropped below ₹1,580</span>
                <p className="text-[10px] text-slate-600 mt-1">Consider reviewing your position to minimize downside risk.</p>
              </div>
              <button className="text-[10px] font-bold bg-white text-rose-600 px-3 py-1.5 rounded-lg border border-rose-200 shrink-0">Review</button>
            </div>

            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider block mb-1">Target Achieved</span>
                <span className="text-xs font-bold text-brand-navy">TATASTEEL hit ₹147.20</span>
                <p className="text-[10px] text-slate-600 mt-1">You have achieved your short-term target. AI suggests booking 50% profits.</p>
              </div>
              <button className="text-[10px] font-bold bg-white text-amber-600 px-3 py-1.5 rounded-lg border border-amber-200 shrink-0">Action</button>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-wider block mb-1">Corporate Action</span>
                <span className="text-xs font-bold text-brand-navy">L&T Dividend Ex-Date Tomorrow</span>
                <p className="text-[10px] text-slate-600 mt-1">Ensure holding to receive ₹28.00 per share.</p>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-400 mt-2" />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
