import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { Target, Trophy, ArrowDownRight, ArrowUpRight } from 'lucide-react';

const mockMonthlyData = [
  { name: 'Jan', value: 2.4 },
  { name: 'Feb', value: -1.2 },
  { name: 'Mar', value: 3.5 },
  { name: 'Apr', value: 4.1 },
  { name: 'May', value: 1.8 },
  { name: 'Jun', value: 5.2 },
  { name: 'Jul', value: 2.1 },
];

export const PortfolioPerformance: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Editorial Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium">
          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Portfolio Growth vs NIFTY 50</span>
          <div className="flex items-end gap-3 mt-4">
            <span className="text-2xl font-black text-brand-navy">+7.2%</span>
            <span className="text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded-md mb-1.5">Alpha</span>
          </div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium">
          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Dividend Income</span>
          <div className="flex items-end gap-3 mt-4">
            <span className="text-2xl font-black text-brand-navy">₹18,450</span>
            <span className="text-[10px] font-bold text-slate-400 mb-1.5">YTD</span>
          </div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium">
          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Realized Gains</span>
          <div className="flex items-end gap-3 mt-4">
            <span className="text-2xl font-black text-brand-navy">₹1,12,040</span>
            <span className="text-[10px] font-bold text-slate-400 mb-1.5">Booked</span>
          </div>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium">
          <span className="text-[10px] font-bold text-slate-400 uppercase block mb-2">Unrealized Gains</span>
          <div className="flex items-end gap-3 mt-4">
            <span className="text-2xl font-black text-brand-navy">₹2,24,150</span>
            <span className="text-[10px] font-bold text-slate-400 mb-1.5">Holding</span>
          </div>
        </div>
      </div>

      {/* Monthly Returns Chart */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 shadow-premium">
        <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy mb-8 flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" /> Monthly Returns Analytics
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockMonthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} tickFormatter={(val) => `${val}%`} />
              <Tooltip 
                cursor={{ fill: '#F8FAFC' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontSize: '12px', fontWeight: 700 }}
              />
              <ReferenceLine y={0} stroke="#E2E8F0" />
              <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                {mockMonthlyData.map((entry, index) => (
                  <cell key={`cell-${index}`} fill={entry.value >= 0 ? '#16A34A' : '#EF4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Best / Worst Performers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 border border-emerald-100 rounded-[24px] p-6 flex items-start justify-between">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-wider text-emerald-600 mb-3 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" /> Best Performer
            </h3>
            <span className="text-xl font-black text-brand-navy block">TATA MOTORS</span>
            <span className="text-xs text-slate-600 font-medium mt-1 block">Automotive Sector</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-emerald-600 flex items-center justify-end gap-1">
              <ArrowUpRight className="w-5 h-5" /> +42.5%
            </span>
            <span className="text-[10px] text-slate-500 font-bold block mt-1">Holding Period: 1.2 Yrs</span>
          </div>
        </div>

        <div className="bg-rose-50 border border-rose-100 rounded-[24px] p-6 flex items-start justify-between">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-wider text-rose-600 mb-3 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 opacity-50" /> Worst Performer
            </h3>
            <span className="text-xl font-black text-brand-navy block">WIPRO</span>
            <span className="text-xs text-slate-600 font-medium mt-1 block">IT Sector</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-rose-600 flex items-center justify-end gap-1">
              <ArrowDownRight className="w-5 h-5" /> -12.4%
            </span>
            <span className="text-[10px] text-slate-500 font-bold block mt-1">Holding Period: 8 Mos</span>
          </div>
        </div>
      </div>
    </div>
  );
};
