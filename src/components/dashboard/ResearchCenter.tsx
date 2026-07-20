import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Download, Bookmark, Clock, ArrowRight, X,
  TrendingUp, ShieldAlert, CheckCircle2, Plus, BarChart3, AlertCircle, Zap
} from 'lucide-react';

export const ResearchCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Live Calls State
  const [callFilter, setCallFilter] = useState('All');
  const [callSort, setCallSort] = useState('Latest');

  // Screener State
  const [screenerRules] = useState([
    { field: 'PE Ratio', operator: '<', value: '20' },
    { field: 'ROE', operator: '>', value: '15' }
  ]);

  const TABS = [
    { id: 'overview', name: 'Overview', icon: null, count: null },
    { id: 'calls', name: 'Live Calls', icon: null, count: 28 },
    { id: 'ai', name: 'AI Insights', icon: null, count: 12 },
    { id: 'screeners', name: 'Screeners', icon: null, count: null },
    { id: 'reports', name: 'Reports', icon: null, count: '6 New' }
  ];

  const featuredOpportunities = [
    {
      company: 'Reliance Industries Ltd', symbol: 'RELIANCE', logo: 'RL',
      rec: 'BUY', price: '₹2,934.50', entry: '₹2,920', target: '₹3,160', stop: '₹2,838',
      return: '14%', risk: 'Low', confidence: 92,
      summary: 'Consolidation breakout verified on daily frames. Hydrogen commissioning projected to trigger re-rating triggers in late Q3.',
      analyst: 'Aarav Mehta', time: '42 min ago'
    },
    {
      company: 'HDFC Bank Ltd', symbol: 'HDFCBANK', logo: 'HD',
      rec: 'BUY', price: '₹1,682.40', entry: '₹1,660', target: '₹1,884', stop: '₹1,595',
      return: '15%', risk: 'Moderate', confidence: 91,
      summary: 'AI accumulation indicators at multi-month demand zone. Corporate deposit expansion stable.',
      analyst: 'Neha Shah', time: '2 hrs ago'
    },
    {
      company: 'Tata Consultancy', symbol: 'TCS', logo: 'TC',
      rec: 'HOLD', price: '₹4,185.10', entry: '₹4,100', target: '₹4,400', stop: '₹3,950',
      return: '7%', risk: 'Low', confidence: 85,
      summary: 'Sector rotation towards defensives continues. Wait for decisive breakout above 4250 before adding fresh long positions.',
      analyst: 'Aarav Mehta', time: '5 hrs ago'
    }
  ];

  const reports = [
    { title: 'IT Services Sector Outlook FY27', author: 'Univest Quant Team', date: '18 Jul 2026', time: '12 Min Read', category: 'Sector Report' },
    { title: 'Energy Giga-factory Valuation Impact', author: 'Aarav Mehta', date: '15 Jul 2026', time: '8 Min Read', category: 'Fundamental Note' },
    { title: 'Q1 Banking Margin Analysis', author: 'Neha Shah', date: '12 Jul 2026', time: '15 Min Read', category: 'Quarterly Report' }
  ];

  const renderOverview = () => (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* Research Brief */}
      <div className="bg-[#0F172A] rounded-[24px] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">MARKET OUTLOOK</span>
              <span className="text-emerald-400 text-xs font-bold px-2 py-1 bg-emerald-400/10 rounded">BULLISH</span>
            </div>
            <h2 className="text-3xl font-black mb-4 leading-tight">
              Institutional buying offsets IT outflow pressure. AI signals strong accumulation in Large-Cap energy & banking.
            </h2>
            <div className="flex items-center gap-6 mt-8">
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs font-bold mb-1">NEW CALLS</span>
                <span className="text-2xl font-black">12</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs font-bold mb-1">TARGETS HIT</span>
                <span className="text-2xl font-black text-emerald-400">4</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-slate-400 text-xs font-bold mb-1">AI OPPORTUNITIES</span>
                <span className="text-2xl font-black text-blue-400">5</span>
              </div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 flex flex-col justify-between backdrop-blur-md">
            <div>
              <span className="text-blue-400 text-xs font-black uppercase tracking-wider mb-2 block">Top AI Pick</span>
              <h3 className="text-xl font-black mb-2">{featuredOpportunities[0].company}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {featuredOpportunities[0].summary}
              </p>
            </div>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2">
              Read Analysis <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Opportunities */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-black text-[#0F172A]">Featured Opportunities</h3>
          <button className="text-blue-600 font-bold text-sm hover:underline">View All Active</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredOpportunities.map((call) => (
            <div key={call.symbol} className="bg-white rounded-[20px] border border-[#E2E8F0] p-5 shadow-sm hover:shadow-md transition group flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-500 text-xs shrink-0">
                    {call.logo}
                  </div>
                  <div>
                    <h4 className="font-black text-[#0F172A] leading-tight">{call.company}</h4>
                    <span className="text-xs font-bold text-slate-400">{call.symbol}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded ${
                  call.rec === 'BUY' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {call.rec}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1 line-clamp-3">
                {call.summary}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-5 p-3 bg-[#F8FAFC] rounded-xl">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Target</span>
                  <span className="font-black text-[#0F172A]">{call.target}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Return</span>
                  <span className="font-black text-emerald-600">{call.return}</span>
                </div>
              </div>
              <button className="w-full py-2.5 rounded-xl border border-[#E2E8F0] text-[#0F172A] font-bold text-sm hover:bg-slate-50 transition group-hover:border-blue-200 group-hover:text-blue-600">
                Read Analysis
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* High Conviction Picks */}
      <div>
        <h3 className="text-xl font-black text-[#0F172A] mb-5">High Conviction Picks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
           <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition cursor-pointer group">
             <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-500 text-xl shrink-0 group-hover:bg-blue-50 transition">HD</div>
             <div className="flex-1">
               <div className="flex justify-between items-start">
                 <div>
                   <h4 className="text-lg font-black text-[#0F172A] group-hover:text-blue-600 transition">HDFC Bank Ltd</h4>
                   <span className="text-sm font-bold text-slate-400">Large Cap · Financials</span>
                 </div>
                 <span className="bg-blue-100 text-blue-700 font-black text-[10px] px-2 py-1 rounded">HIGH CONVICTION</span>
               </div>
               <div className="flex gap-6 mt-4">
                 <div><span className="text-xs text-slate-400 font-bold block">Entry</span><span className="font-black">₹1,660</span></div>
                 <div><span className="text-xs text-slate-400 font-bold block">Target</span><span className="font-black">₹1,884</span></div>
                 <div><span className="text-xs text-slate-400 font-bold block">Upside</span><span className="font-black text-emerald-600">15%</span></div>
               </div>
             </div>
           </div>
           <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition cursor-pointer group">
             <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-500 text-xl shrink-0 group-hover:bg-blue-50 transition">LT</div>
             <div className="flex-1">
               <div className="flex justify-between items-start">
                 <div>
                   <h4 className="text-lg font-black text-[#0F172A] group-hover:text-blue-600 transition">Larsen & Toubro</h4>
                   <span className="text-sm font-bold text-slate-400">Large Cap · Capital Goods</span>
                 </div>
                 <span className="bg-blue-100 text-blue-700 font-black text-[10px] px-2 py-1 rounded">HIGH CONVICTION</span>
               </div>
               <div className="flex gap-6 mt-4">
                 <div><span className="text-xs text-slate-400 font-bold block">Entry</span><span className="font-black">₹3,400</span></div>
                 <div><span className="text-xs text-slate-400 font-bold block">Target</span><span className="font-black">₹3,950</span></div>
                 <div><span className="text-xs text-slate-400 font-bold block">Upside</span><span className="font-black text-emerald-600">16%</span></div>
               </div>
             </div>
           </div>
        </div>
      </div>
      
    </div>
  );

  const renderLiveCalls = () => (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      
      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-[20px] border border-[#E2E8F0] shadow-sm">
        <div className="flex flex-wrap gap-2">
          {['All', 'BUY', 'SELL', 'HOLD', 'Swing', 'Intraday', 'Long Term', 'F&O'].map(filter => (
            <button 
              key={filter}
              onClick={() => setCallFilter(filter)}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors ${
                callFilter === filter ? 'bg-[#0F172A] text-white' : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <span className="text-xs font-bold text-slate-400">Sort by:</span>
          <select 
            value={callSort}
            onChange={(e) => setCallSort(e.target.value)}
            className="bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold px-3 py-2 rounded-xl outline-none text-[#0F172A] hover:bg-slate-50 transition cursor-pointer"
          >
            <option>Latest</option>
            <option>Highest Return</option>
            <option>High Confidence</option>
            <option>Low Risk</option>
          </select>
        </div>
      </div>

      {/* Editorial Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {featuredOpportunities.map((call) => (
          <div key={call.symbol} className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition">
            
            <div className="flex justify-between items-start border-b border-slate-100 pb-5 mb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] flex items-center justify-center font-black text-[#64748B] text-sm shrink-0 border border-slate-100">
                  {call.logo}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0F172A] leading-tight mb-1">{call.company}</h3>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${call.rec === 'BUY' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{call.rec}</span>
                    <span>{call.symbol}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span>{call.price}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg mb-2">
                  <Zap className="w-3.5 h-3.5 fill-blue-700" />
                  <span className="text-xs font-black">{call.confidence}% AI</span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{call.risk} Risk</div>
              </div>
            </div>

            <p className="text-[#334155] text-sm leading-relaxed mb-6 font-medium line-clamp-3">
              {call.summary}
            </p>

            <div className="grid grid-cols-4 gap-4 bg-[#F8FAFC] rounded-2xl p-4 mb-6 border border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Entry</span>
                <span className="font-black text-[#0F172A] text-sm">{call.entry}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Target</span>
                <span className="font-black text-[#0F172A] text-sm">{call.target}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Stop Loss</span>
                <span className="font-black text-rose-600 text-sm">{call.stop}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Return</span>
                <span className="font-black text-emerald-600 text-sm">{call.return}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-[10px] font-black text-slate-500">
                  {call.analyst.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <span className="block text-xs font-black text-[#0F172A]">{call.analyst}</span>
                  <span className="block text-[10px] font-bold text-slate-400">{call.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-[#0F172A] transition">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="px-5 h-10 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 font-black text-xs hover:bg-blue-100 transition">
                  Read Analysis
                </button>
                <button className="px-6 h-10 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 shadow-sm transition">
                  Trade
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAIInsights = () => (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
        
        {/* Left Column */}
        <div className="flex flex-col gap-8">
          {/* AI Explain Card */}
          <div className="bg-white rounded-[24px] border border-blue-100 p-8 shadow-[0_8px_30px_rgb(37,99,235,0.06)] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
               <Zap className="w-48 h-48 text-blue-600" />
             </div>
             <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg mb-6 border border-blue-100">
                <Zap className="w-3.5 h-3.5 fill-blue-700" />
                <span className="text-xs font-black">AI High Confidence Pick</span>
             </div>
             <h3 className="text-3xl font-black text-[#0F172A] mb-3 relative z-10">Tata Consultancy Services (TCS)</h3>
             <p className="text-slate-600 font-medium leading-relaxed max-w-2xl mb-8 text-base relative z-10">
               Our neural networks have identified a high-probability rotation sequence favoring IT defensives. Strong momentum indicators matched with institutional accumulation over the past 5 sessions.
             </p>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
               <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0]">
                 <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Confidence</span>
                 <span className="font-black text-blue-600 text-xl">98%</span>
               </div>
               <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0]">
                 <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Expected Time</span>
                 <span className="font-black text-[#0F172A] text-xl">3-4 Weeks</span>
               </div>
               <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0]">
                 <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Hist. Accuracy</span>
                 <span className="font-black text-[#0F172A] text-xl">84%</span>
               </div>
               <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0]">
                 <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Target Upside</span>
                 <span className="font-black text-emerald-600 text-xl">+12%</span>
               </div>
             </div>

             <div className="relative z-10">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Supporting Indicators</h4>
               <div className="flex flex-wrap gap-2">
                 <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                   <CheckCircle2 className="w-3.5 h-3.5" /> MACD Bullish Crossover
                 </span>
                 <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                   <CheckCircle2 className="w-3.5 h-3.5" /> RSI Divergence
                 </span>
                 <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                   <CheckCircle2 className="w-3.5 h-3.5" /> Volume Breakout (2.5x)
                 </span>
               </div>
             </div>
          </div>

          {/* Breakout Detection */}
          <div>
            <h3 className="text-xl font-black text-[#0F172A] mb-5">Breakout Detection</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-white p-6 rounded-[24px] border border-[#E2E8F0] shadow-sm flex items-center justify-between hover:border-emerald-200 transition group cursor-pointer">
                <div>
                  <h4 className="text-lg font-black text-[#0F172A] group-hover:text-emerald-700 transition">BHEL</h4>
                  <span className="text-sm font-bold text-slate-400">Crossing 52W High</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-[24px] border border-[#E2E8F0] shadow-sm flex items-center justify-between hover:border-emerald-200 transition group cursor-pointer">
                <div>
                  <h4 className="text-lg font-black text-[#0F172A] group-hover:text-emerald-700 transition">ZOMATO</h4>
                  <span className="text-sm font-bold text-slate-400">Volume Expansion</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          
          {/* Portfolio Suggestions */}
          <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 shadow-sm">
            <h3 className="text-xl font-black text-[#0F172A] mb-2">Portfolio Suggestions</h3>
            <p className="text-sm text-slate-500 font-medium mb-6">Based on your connected portfolio and AI models.</p>
            
            <div className="flex flex-col gap-4">
              <div className="p-5 rounded-[20px] border border-rose-100 bg-rose-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="font-black text-rose-700 text-sm">Reduce Exposure</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#0F172A] text-base">IT Sector</span>
                  <span className="font-black text-rose-600 text-base">-5%</span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Global valuation multiples peaking. Consider rotating capital.</p>
              </div>

              <div className="p-5 rounded-[20px] border border-emerald-100 bg-emerald-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-black text-emerald-700 text-sm">Increase Allocation</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#0F172A] text-base">Banking</span>
                  <span className="font-black text-emerald-600 text-base">+8%</span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">Margin expansion expected in Q3 due to deposit repricing.</p>
              </div>
            </div>
          </div>

          {/* Risk Alerts */}
          <div className="bg-white rounded-[24px] border border-rose-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <h3 className="text-xl font-black text-[#0F172A]">Risk Alerts</h3>
            </div>
            <div className="flex flex-col gap-5">
              <div className="pb-5 border-b border-slate-100 last:border-0 last:pb-0">
                <h4 className="text-base font-black text-[#0F172A] mb-1.5">XYZ Metals Ltd</h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">Weak earnings momentum and rising debt ratios. AI flags multi-session negative momentum.</p>
              </div>
              <div className="pb-5 border-b border-slate-100 last:border-0 last:pb-0">
                <h4 className="text-base font-black text-[#0F172A] mb-1.5">Alpha Chemicals</h4>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">Severe RSI divergence accompanied by promoter pledging alerts.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  const renderScreeners = () => (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* Custom Builder */}
      <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-8 shadow-sm">
        <h3 className="text-2xl font-black text-[#0F172A] mb-2">Custom Screener</h3>
        <p className="text-base text-slate-500 font-medium mb-8">Build your own rule-based filtering model with instant results.</p>
        
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {screenerRules.map((rule, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-2.5 rounded-2xl">
              <span className="text-sm font-black text-[#0F172A]">{rule.field}</span>
              <span className="text-sm font-black text-blue-600">{rule.operator}</span>
              <span className="text-sm font-black text-[#0F172A]">{rule.value}</span>
              <button className="ml-3 text-slate-400 hover:text-rose-500 transition"><X className="w-4 h-4" /></button>
            </div>
          ))}
          <button className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-100 transition text-sm font-bold">
            <Plus className="w-4 h-4" /> Add Condition
          </button>
        </div>
        
        <div className="bg-[#0F172A] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between text-white gap-6">
           <div>
             <span className="text-sm font-bold text-slate-400 block mb-1">Matches Found</span>
             <h4 className="text-3xl font-black">42 Stocks</h4>
           </div>
           <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-black text-base transition shadow-sm">
             View Results
           </button>
        </div>
      </div>

      {/* Popular Screeners */}
      <div>
        <h3 className="text-xl font-black text-[#0F172A] mb-5">Popular Screeners</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[
            { title: 'Momentum Trajectory', count: '14 Stocks', icon: <TrendingUp />, desc: 'Stocks with 50DMA crossing above 200DMA with high volume.' },
            { title: 'Dividend Yielders', count: '28 Stocks', icon: <BarChart3 />, desc: 'Consistent dividend track record > 4% yield.' },
            { title: 'Value & Growth', count: '8 Stocks', icon: <CheckCircle2 />, desc: 'Low PE ratio mixed with high revenue growth YoY.' },
            { title: 'Breakout Alerts', count: '12 Stocks', icon: <Zap />, desc: 'Closing above 52-week highs with expanded volume.' },
            { title: 'Strong Fundamentals', count: '35 Stocks', icon: <ShieldAlert />, desc: 'Zero debt, high ROE (>20%) and robust cash flows.' },
            { title: 'High Volume Reversal', count: '6 Stocks', icon: <AlertCircle />, desc: 'Price rejection at support accompanied by 3x average volume.' }
          ].map(screener => (
            <div key={screener.title} className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition cursor-pointer group flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {screener.icon}
              </div>
              <h4 className="text-lg font-black text-[#0F172A] mb-2 group-hover:text-blue-600 transition">{screener.title}</h4>
              <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed flex-1">{screener.desc}</p>
              <div className="flex justify-between items-center border-t border-slate-100 pt-5 mt-auto">
                <span className="text-sm font-black text-[#0F172A]">{screener.count}</span>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );

  const renderReports = () => (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reports.map((report, i) => (
          <div key={i} className="bg-white rounded-[24px] border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition group flex flex-col">
            <div className="h-40 bg-slate-900 relative p-6 flex flex-col justify-end overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/30 blur-3xl rounded-full" />
               <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-lg w-fit uppercase mb-2">
                 {report.category}
               </span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-[#0F172A] mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                {report.title}
              </h3>
              <div className="flex items-center gap-2 mb-6 text-xs font-bold text-slate-500">
                <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-700 shrink-0">
                  {report.author.charAt(0)}
                </span>
                <span>{report.author}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>{report.date}</span>
              </div>
              
              <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
                <span className="flex items-center gap-1.5 text-sm font-bold text-slate-400">
                  <Clock className="w-4 h-4" /> {report.time}
                </span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-[#0F172A] transition">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-[#0F172A] transition">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="px-5 h-10 rounded-xl bg-[#0F172A] text-white font-bold text-sm hover:bg-slate-800 transition">
                    Read
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 w-full pb-12">
      
      {/* HEADER SECTION */}
      <div className="w-full pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#0F172A] mb-2">
            Research Intelligence
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Institutional-grade investment research powered by expert analysts and AI.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search research, stocks, reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-[#E2E8F0] rounded-2xl text-sm font-medium outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 bg-white shadow-sm transition-all"
          />
        </div>
      </div>

      {/* SEGMENTED CONTROLS (TABS) */}
      <div className="w-full bg-white p-2.5 rounded-[24px] border border-[#E2E8F0] shadow-sm flex items-center overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2.5 px-6 py-3.5 rounded-[16px] font-black text-sm transition-all shrink-0 ${
                isActive ? 'text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-[#F1F5F9] rounded-[16px]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 text-lg">{tab.icon}</span>
              <span className="relative z-10">{tab.name}</span>
              {tab.count && (
                <span className={`relative z-10 text-[10px] px-2 py-0.5 rounded border ${isActive ? 'bg-white shadow-sm text-blue-600 border-white' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'calls' && renderLiveCalls()}
            {activeTab === 'ai' && renderAIInsights()}
            {activeTab === 'screeners' && renderScreeners()}
            {activeTab === 'reports' && renderReports()}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};
