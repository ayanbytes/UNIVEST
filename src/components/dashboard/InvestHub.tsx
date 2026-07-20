import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';

export interface InvestHubProps {
  activeCategory: string;
}

export const InvestHub: React.FC<InvestHubProps> = ({
  activeCategory
}) => {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Dynamic Content Panel Area */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {/* STOCKS HUB */}
            {activeCategory === 'stocks' && (
              <div className="flex flex-col gap-5">
                {/* Hero Summary */}
                <div className="bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-black text-brand-navy">Indian Equities Market</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Explore large, mid and small-cap stocks with SEBI research guidance.</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <div>
                      <span className="text-slate-400 text-[9px] uppercase block">Horizon</span>
                      <span className="text-slate-700 font-extrabold">Short to Long Term</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[9px] uppercase block">Risk Level</span>
                      <span className="text-amber-600 font-extrabold">Medium to High</span>
                    </div>
                  </div>
                </div>

                {/* Stock Movers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 mb-3">Trending Movers</h4>
                    <div className="flex flex-col gap-2.5">
                      {[{ s: 'RELIANCE', p: '₹3,024.20', c: '+1.25%' }, { s: 'BHARTIAIRTEL', p: '₹1,420.50', c: '+3.11%' }].map(x => (
                        <div key={x.s} className="flex justify-between items-center text-xs border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                          <span className="font-extrabold text-[#0F172A]">{x.s}</span>
                          <span className="font-black text-[#16A34A]">{x.p} ({x.c})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white border border-[#E2E8F0] p-5 rounded-2xl shadow-sm flex flex-col justify-between">
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1">AI Opportunity Recommendation</h4>
                      <span className="text-[11px] font-black text-blue-600 block mt-1.5">HDFCBANK Buy Signal</span>
                      <p className="text-[10.5px] text-slate-500 mt-1">Accumulation levels identified near multi-month support bounds.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FUTURES & OPTIONS */}
            {activeCategory === 'fno' && (
              <div className="flex flex-col gap-5">
                <div className="bg-slate-900 text-white rounded-2xl p-5 relative overflow-hidden">
                  <h3 className="text-sm font-black">Derivatives Desk (F&O)</h3>
                  <p className="text-[11px] text-slate-300 mt-0.5">Track option chains, open interest metrics and volatility indices.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Nifty PCR (Put Call Ratio)</span>
                    <span className="text-xl font-black text-slate-800 block mt-1">1.12</span>
                    <span className="text-[9px] text-[#16A34A] block mt-0.5">Bullish Sentiment</span>
                  </div>
                  <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Max Pain Strike</span>
                    <span className="text-xl font-black text-slate-800 block mt-1">22,400</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Expiry: Weekly 23 JUL</span>
                  </div>
                  <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl">
                    <span className="text-[9px] font-bold text-slate-400 block uppercase">Implied Volatility (IV)</span>
                    <span className="text-xl font-black text-slate-800 block mt-1">12.8%</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Low VIX Environment</span>
                  </div>
                </div>
              </div>
            )}

            {/* MUTUAL FUNDS */}
            {activeCategory === 'funds' && (
              <div className="flex flex-col gap-5">
                <div className="bg-gradient-to-tr from-emerald-50 to-teal-50 border border-emerald-200/50 rounded-2xl p-4">
                  <h3 className="text-sm font-black text-[#0F172A]">Mutual Funds & SIPs</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Invest in expert-managed baskets across equity, debt, and hybrid assets.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl flex flex-col justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 block uppercase">Top Performing Small Cap</span>
                      <h4 className="text-xs font-black text-slate-800 mt-1">Quant Active Fund Direct-Growth</h4>
                    </div>
                    <span className="text-xs font-black text-[#16A34A]">Returns: 29.2% (3Y CAGR)</span>
                  </div>
                  <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl flex flex-col justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 block uppercase">Best Flexi Cap SIP</span>
                      <h4 className="text-xs font-black text-slate-800 mt-1">Parag Parikh Flexi Cap Fund</h4>
                    </div>
                    <span className="text-xs font-black text-[#16A34A]">Returns: 24.8% (3Y CAGR)</span>
                  </div>
                </div>
              </div>
            )}

            {/* COMMODITIES */}
            {activeCategory === 'commodities' && (
              <div className="flex flex-col gap-5">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h3 className="text-sm font-black text-[#0F172A]">MCX Commodities Desk</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Track crude oil, silver, copper, and natural gas spot futures.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[{ name: 'Crude Oil', price: '₹6,480', change: '+1.12%' }, { name: 'Natural Gas', price: '₹182.40', change: '-2.14%' }, { name: 'Silver Futures', price: '₹82,450', change: '+0.32%' }].map(c => (
                    <div key={c.name} className="bg-white border border-slate-200 p-4 rounded-2xl">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">{c.name}</span>
                      <span className="text-base font-black text-slate-800 mt-1 block">{c.price}</span>
                      <span className="text-[9px] font-bold text-[#16A34A] block mt-0.5">{c.change}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GOLD */}
            {activeCategory === 'gold' && (
              <div className="flex flex-col gap-5">
                <div className="bg-gradient-to-tr from-amber-50 to-yellow-50 border border-yellow-200/50 rounded-2xl p-4">
                  <h3 className="text-sm font-black text-brand-navy">Gold Market Investments</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Secure allocation in Sovereign Gold Bonds (SGB), Gold ETFs, or digital gold vaults.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                    <span className="text-[9px] font-black text-yellow-600 block uppercase">Sovereign Gold Bonds (SGB)</span>
                    <p className="text-[10.5px] text-slate-500 mt-1">Get 2.5% p.a. assured interest + tax-free capital gains at maturity.</p>
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                    <span className="text-[9px] font-black text-yellow-600 block uppercase">Digital Gold Vaults</span>
                    <p className="text-[10.5px] text-slate-500 mt-1">Buy 24K 99.9% pure gold starting from ₹10 with physical delivery options.</p>
                  </div>
                </div>
              </div>
            )}

            {/* IPO */}
            {activeCategory === 'ipo' && (
              <div className="flex flex-col gap-5">
                <div className="bg-gradient-to-tr from-orange-50 to-rose-50 border border-orange-200/50 rounded-2xl p-4">
                  <h3 className="text-sm font-black text-[#0F172A]">Initial Public Offerings (IPOs)</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Discover and apply to upcoming primary stock market listings with subscription data.</p>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="text-xs font-black text-[#0F172A]">Ola Electric IPO</h4>
                      <span className="text-[9px] text-slate-400">GMP Premium: +18% (₹14) • Rating: 4.2★</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black px-3 py-1.5 rounded-lg transition-colors">
                      Apply Now
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-black text-[#0F172A]">FirstCry India IPO</h4>
                      <span className="text-[9px] text-slate-400">GMP Premium: +24% (₹42) • Rating: 4.5★</span>
                    </div>
                    <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black px-3 py-1.5 rounded-lg transition-colors">
                      Apply Soon
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ETFs */}
            {activeCategory === 'etf' && (
              <div className="flex flex-col gap-5">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h3 className="text-sm font-black text-[#0F172A]">Exchange Traded Funds (ETFs)</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">High-liquidity index-tracking baskets with lower expense ratios.</p>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-black text-slate-800">Nippon India Junior BEES ETF</h4>
                    <span className="text-[9px] text-slate-400">Tracks Nifty Next 50 • Expense Ratio: 0.15%</span>
                  </div>
                  <span className="text-xs font-black text-slate-800">₹624.50</span>
                </div>
              </div>
            )}

            {/* FD & BONDS */}
            {activeCategory === 'bonds' && (
              <div className="flex flex-col gap-5">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h3 className="text-sm font-black text-[#0F172A]">Fixed Income & Debt Market</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Low-risk corporate fixed deposits, treasury bills, and government bonds.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                    <span className="text-[9px] font-black text-slate-400 block uppercase">Govt Treasury Bills (T-Bills)</span>
                    <p className="text-[10.5px] text-slate-500 mt-1">91-Day Bills offering yields near 7.15% backed by Sovereign guarantee.</p>
                  </div>
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                    <span className="text-[9px] font-black text-slate-400 block uppercase">AAA Corporate Bonds</span>
                    <p className="text-[10.5px] text-slate-500 mt-1">NHAI tax-free coupons yielding up to 7.35% secure annual returns.</p>
                  </div>
                </div>
              </div>
            )}

            {/* NPS */}
            {activeCategory === 'nps' && (
              <div className="flex flex-col gap-5">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h3 className="text-sm font-black text-[#0F172A]">National Pension Scheme (NPS)</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Tax-deductible retirement accounts with professional equity allocation plans.</p>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-2xl">
                  <span className="text-xs font-black text-slate-800 block">NPS Tax Deductions</span>
                  <p className="text-[10.5px] text-slate-500 mt-1 leading-normal">
                    Claim additional deductions up to ₹50,000 under section 80CCD(1B) beyond standard 80C caps.
                  </p>
                </div>
              </div>
            )}

            {/* RESEARCH HUB */}
            {activeCategory === 'research' && (
              <div className="flex flex-col gap-5">
                <div className="bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl p-4">
                  <h3 className="text-sm font-black text-[#0F172A]">Institutional Research Center</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Download SEBI compliance documents, technical reviews, and quarterly corporate updates.</p>
                </div>

                <div className="flex flex-col gap-3">
                  {['Q1 Corporate Earnings Meta Review.pdf', 'Sector Rotation under High Inflation Regimes.pdf'].map(doc => (
                    <div key={doc} className="bg-white border border-slate-200 p-3 rounded-2xl flex justify-between items-center">
                      <span className="text-xs font-black text-slate-800">{doc}</span>
                      <button className="p-2 hover:bg-slate-100 rounded-xl text-blue-600 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MORE PRODUCTS */}
            {activeCategory === 'more' && (
              <div className="flex flex-col gap-5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">More Opportunities (Coming Soon)</span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['US Equities', 'Smallcase Baskets', 'Term Insurance', 'Portfolio Management Services (PMS)', 'Alternative Funds (AIF)'].map(p => (
                    <div key={p} className="bg-white border border-dashed border-slate-200 p-4 rounded-2xl">
                      <span className="text-xs font-black text-slate-400 block">{p}</span>
                      <span className="text-[9px] text-blue-600 font-bold block mt-1">Integration Pending</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default InvestHub;
