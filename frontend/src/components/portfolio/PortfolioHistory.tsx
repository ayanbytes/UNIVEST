import React from 'react';
import { Search, Download, ArrowDownLeft, ArrowUpRight, Repeat, Sparkles } from 'lucide-react';

const mockHistory = [
  { id: '1', type: 'Buy', symbol: 'RELIANCE', name: 'Reliance Industries', qty: 50, price: 2900.50, total: 145025.00, date: '18 Jul 2026', time: '10:24 AM' },
  { id: '2', type: 'Dividend', symbol: 'TCS', name: 'Tata Consultancy Services', qty: 45, price: 28.00, total: 1260.00, date: '15 Jul 2026', time: '09:15 AM' },
  { id: '3', type: 'Sell', symbol: 'HDFCBANK', name: 'HDFC Bank', qty: 100, price: 1650.00, total: 165000.00, date: '10 Jul 2026', time: '02:45 PM' },
  { id: '4', type: 'Bonus', symbol: 'INFY', name: 'Infosys Limited', qty: 42, price: 0, total: 0, date: '05 Jul 2026', time: '--:--' },
  { id: '5', type: 'Deposit', symbol: 'FUNDS', name: 'Wallet Deposit', qty: 0, price: 0, total: 50000.00, date: '01 Jul 2026', time: '11:30 AM' },
];

export const PortfolioHistory: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full bg-white border border-[#E2E8F0] rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-brand-navy outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-sm font-bold text-slate-600 hover:text-brand-navy hover:bg-slate-50 transition shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-[24px] shadow-premium overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-4 bg-slate-50 px-6 py-4 border-b border-[#E2E8F0] text-[10px] font-black uppercase tracking-wider text-slate-400">
          <span>Date & Time</span>
          <span>Asset Details</span>
          <span>Transaction Type</span>
          <span>Quantity & Price</span>
          <span className="text-right">Total Amount</span>
        </div>

        <div className="flex flex-col">
          {mockHistory.map((item) => {
            let Icon = Repeat;
            let iconColor = 'text-slate-500';
            let iconBg = 'bg-slate-100';
            let amountColor = 'text-brand-navy';

            if (item.type === 'Buy') {
              Icon = ArrowDownLeft;
              iconColor = 'text-primary';
              iconBg = 'bg-blue-50';
              amountColor = 'text-brand-navy';
            } else if (item.type === 'Sell') {
              Icon = ArrowUpRight;
              iconColor = 'text-rose-500';
              iconBg = 'bg-rose-50';
              amountColor = 'text-rose-600';
            } else if (item.type === 'Dividend') {
              Icon = Sparkles;
              iconColor = 'text-success';
              iconBg = 'bg-emerald-50';
              amountColor = 'text-success';
            } else if (item.type === 'Deposit') {
              Icon = ArrowDownLeft;
              iconColor = 'text-success';
              iconBg = 'bg-emerald-50';
              amountColor = 'text-success';
            }

            return (
              <div key={item.id} className="grid grid-cols-2 md:grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-4 px-6 py-5 border-b border-[#F1F5F9] last:border-0 items-center hover:bg-slate-50/50 transition">
                {/* Date */}
                <div>
                  <span className="text-xs font-bold text-brand-navy block">{item.date}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{item.time}</span>
                </div>

                {/* Asset */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                  </div>
                  <div>
                    <span className="text-xs font-black text-brand-navy block">{item.symbol}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5 truncate">{item.name}</span>
                  </div>
                </div>

                {/* Type */}
                <div className="hidden md:block">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase ${
                    item.type === 'Buy' ? 'bg-blue-50 text-primary' :
                    item.type === 'Sell' ? 'bg-rose-50 text-rose-600' :
                    item.type === 'Dividend' ? 'bg-emerald-50 text-success' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {item.type}
                  </span>
                </div>

                {/* Qty & Price */}
                <div className="hidden md:block">
                  {item.qty > 0 ? (
                    <>
                      <span className="text-xs font-bold text-brand-navy block">{item.qty} Shares</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">@ ₹{item.price.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 block">-</span>
                  )}
                </div>

                {/* Amount */}
                <div className="text-right flex flex-col justify-center h-full">
                  {item.total > 0 ? (
                    <span className={`text-sm font-black block ${amountColor}`}>
                      {item.type === 'Sell' ? '+' : ''}₹{item.total.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-slate-400 block">-</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
