import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, TrendingUp, AlertCircle, ArrowRight, Bookmark, Share2, Clock, 
  CheckCircle2, ShieldCheck, Zap, BarChart3, Building2, Calendar, Search, 
  HelpCircle, ChevronRight, Filter, Radio, Eye, FileText, Globe, DollarSign,
  Activity, ArrowUpRight, ArrowDownRight, Layers, Trash2, BookOpen
} from 'lucide-react';
import toast from 'react-hot-toast';
import { NewsDetail } from './NewsDetail';

interface MarketIntelligenceCenterProps {
  onSelectStock?: (stock: any) => void;
  onSelectResearch?: (research: any) => void;
  onTrade?: (tradeData: any) => void;
}

export const MarketIntelligenceCenter: React.FC<MarketIntelligenceCenterProps> = ({
  onSelectStock,
  onSelectResearch,
  onTrade
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Markets' | 'Companies' | 'Corporate Actions' | 'Economy' | 'AI Brief' | 'Bookmarks'>('All');
  const [companySearch, setCompanySearch] = useState('');
  const [corporateTimeFilter, setCorporateTimeFilter] = useState<'Today' | 'This Week' | 'This Month'>('Today');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['news1']);

  const tabs = [
    { id: 'All', label: 'All' },
    { id: 'Markets', label: 'Markets' },
    { id: 'Companies', label: 'Companies' },
    { id: 'Corporate Actions', label: 'Corporate Actions' },
    { id: 'Economy', label: 'Economy' },
    { id: 'AI Brief', label: 'AI Brief', isAi: true },
    { id: 'Bookmarks', label: 'Bookmarks', count: bookmarkedIds.length }
  ] as const;

  const breakingNews = [
    {
      id: 'news1',
      headline: 'RBI Repo Rate Maintained at 6.50%: Banking System Liquidity Inflows Expected',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop',
      source: 'Bloomberg India',
      time: '12 min ago',
      readTime: '4 min read',
      category: 'Economy',
      sentiment: 'Bullish',
      stocks: ['HDFCBANK', 'ICICIBANK', 'SBIN'],
      sectors: ['Financials', 'Banking'],
      summary: 'The RBI kept interest rates steady for the 7th consecutive policy meeting. Commercial banks gain headroom to improve core margins without deposit rate hikes.'
    },
    {
      id: 'news2',
      headline: 'Reliance Green Hydrogen Gigafactory Phase-1 Commissioning Approaching Target Date',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop',
      source: 'Reuters Financial',
      time: '45 min ago',
      readTime: '3 min read',
      category: 'Companies',
      sentiment: 'Bullish',
      stocks: ['RELIANCE', 'LT'],
      sectors: ['Energy', 'Utilities'],
      summary: 'Reliance Industries is preparing for commercial green hydrogen electrolyzer production. Institutional brokerages project a long-term enterprise valuation re-rating.'
    },
    {
      id: 'news3',
      headline: 'US Fed Signals Rate Cut Outlook as US CPI Inflation Softens to 2.9%',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop',
      source: 'Wall Street Journal',
      time: '2 hrs ago',
      readTime: '5 min read',
      category: 'Economy',
      sentiment: 'Bullish',
      stocks: ['TCS', 'INFY', 'WIPRO'],
      sectors: ['Technology', 'IT Services'],
      summary: 'Lower US yields bode well for Indian IT exporters as US enterprise software spending resumes momentum in Q3 FY26.'
    }
  ];

  const marketMovers = [
    {
      id: 'm1',
      question: 'Why did Reliance rise +2.4% today?',
      explanation: 'Breakout above ₹2,940 verified on 4-hour charts following institutional accumulation in green energy subsidiaries.',
      stocks: ['RELIANCE'],
      technical: 'Above 50 DMA Crossover',
      fundamental: 'Strong Refining Margins'
    },
    {
      id: 'm2',
      question: 'Why is IT experiencing temporary drag?',
      explanation: 'Higher US Treasury yields pushed short-term profit taking across tier-1 software exporters prior to quarterly earnings.',
      stocks: ['INFY', 'TCS'],
      technical: 'RSI Neutral (46.2)',
      fundamental: 'Discretionary Spend Lag'
    }
  ];

  const corporateActions = [
    { type: 'Dividend', company: 'Larsen & Toubro Ltd', symbol: 'LT', detail: '₹28.00 per share', date: 'Ex-Date Tomorrow' },
    { type: 'Quarterly Results', company: 'Reliance Industries Ltd', symbol: 'RELIANCE', detail: 'Q1 Earnings Release', date: 'Today after close' },
    { type: 'Bonus Issue', company: 'Tata Power Company', symbol: 'TATAPOWER', detail: '1:1 Bonus Shares', date: 'Record Date 28 Jul' },
    { type: 'Buyback', company: 'TCS Ltd', symbol: 'TCS', detail: '₹4,150 Tender Offer', date: 'Open Now' }
  ];

  const economicEvents = [
    { event: 'RBI Monetary Policy Statement', date: 'Today', time: '10:00 AM IST', impact: 'High Impact', sectors: 'Banking & Financials' },
    { event: 'US Federal Reserve Interest Rate Decision', date: 'Tomorrow', time: '11:30 PM IST', impact: 'High Impact', sectors: 'Global Markets & IT' },
    { event: 'India Retail Inflation (CPI)', date: '28 Jul', time: '05:30 PM IST', impact: 'Medium Impact', sectors: 'Consumer Goods' },
    { event: 'Crude Oil Inventory Stocks', date: 'Weekly', time: '08:00 PM IST', impact: 'Low Impact', sectors: 'Oil & Gas' }
  ];

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds(prev => {
      const isSaved = prev.includes(id);
      toast.success(isSaved ? 'Removed from Bookmarks' : 'Saved to Bookmarks');
      return isSaved ? prev.filter(i => i !== id) : [...prev, id];
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-500 pb-16">
      
      {/* 1. HERO BRANDED HEADER */}
      <section className="relative overflow-hidden rounded-[28px] p-6 sm:p-8 bg-[#0F172A] text-white shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-blue-400 fill-blue-400 animate-pulse" />
              <span className="text-xs font-black text-blue-400 uppercase tracking-widest">MARKET INTELLIGENCE DESK</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
              Market Intelligence & Daily Briefing
            </h1>

            <p className="text-xs text-slate-300 font-medium leading-relaxed mb-6">
              Real-time actionable news transformed into investment opportunities, risk alerts, and portfolio insights.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('AI Brief')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition shadow-lg flex items-center gap-2"
              >
                Read 60-Second AI Brief <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedArticle(breakingNews[0])}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-xs transition"
              >
                Top Story Analysis
              </button>
            </div>
          </div>

          {/* Market Mood Widget */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md shrink-0 flex flex-col gap-4 min-w-[280px]">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Market Sentiment</span>
              <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                🟢 BULLISH
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">AI Conviction Score</span>
              <span className="text-xl font-black text-blue-400">92/100</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Active Catalyst</span>
              <span className="text-xs font-bold text-slate-200">RBI Rate Clearance</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 7 FOCUSED CATEGORY TABS WITH DISTINCT AI BRIEF BADGE */}
      <div className="flex items-center gap-2 p-1.5 bg-white border border-[#E2E8F0] rounded-2xl w-full overflow-x-auto shadow-sm relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-5 py-2.5 rounded-xl text-xs font-black transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isActive 
                  ? 'text-white' 
                  : tab.isAi 
                    ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200' 
                    : 'text-slate-500 hover:text-[#0F172A]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="newsTabBubble"
                  className="absolute inset-0 bg-[#0F172A] rounded-xl shadow-sm"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              
              {tab.isAi && <Sparkles className={`w-3.5 h-3.5 relative z-10 ${isActive ? 'text-blue-400' : 'text-blue-600'}`} />}
              <span className="relative z-10">{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`relative z-10 ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. DYNAMIC TAB CONTENT SURFACE */}
      <div className="w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-8"
          >

            {/* TAB 1: ALL (DEFAULT PERSONALIZED FEED) */}
            {activeTab === 'All' && (
              <>
                <section className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-[#0F172A] flex items-center gap-2">
                      <Radio className="w-5 h-5 text-rose-500 animate-pulse" /> Breaking Intelligence Feed
                    </h2>
                    <span className="text-xs font-bold text-slate-400">Personalized for Your Portfolio</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {breakingNews.map((news) => (
                      <div
                        key={news.id}
                        onClick={() => setSelectedArticle(news)}
                        className="bg-white rounded-[24px] border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between cursor-pointer group hover:border-blue-300"
                      >
                        <div className="relative h-48 w-full overflow-hidden">
                          <img
                            src={news.image}
                            alt={news.headline}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">
                              {news.category}
                            </span>
                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase ${
                              news.sentiment === 'Bullish' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                            }`}>
                              {news.sentiment}
                            </span>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                          <div>
                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mb-1">
                              <span>{news.source}</span>
                              <span>{news.time} · {news.readTime}</span>
                            </div>
                            <h3 className="font-black text-base text-[#0F172A] leading-snug group-hover:text-blue-600 transition mb-2">
                              {news.headline}
                            </h3>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                              {news.summary}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {news.stocks.map(st => (
                                <span key={st} className="text-[10px] font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                                  ${st}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => toggleBookmark(news.id, e)}
                                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition"
                              >
                                <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(news.id) ? 'fill-blue-600 text-blue-600' : ''}`} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Market Movers */}
                <section className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                  <h3 className="text-lg font-black text-[#0F172A]">Market Movers Explained</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {marketMovers.map((mover) => (
                      <div key={mover.id} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 flex flex-col gap-3 justify-between">
                        <div>
                          <h4 className="font-black text-sm text-[#0F172A] mb-1.5">{mover.question}</h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                            {mover.explanation}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            if (onSelectStock) onSelectStock({ symbol: mover.stocks[0], company: mover.stocks[0] });
                          }}
                          className="self-end text-xs font-black text-blue-600 hover:underline flex items-center gap-1 pt-2 border-t border-slate-200 w-full justify-end"
                        >
                          Read Workspace Analysis →
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Action Center */}
                <section className="bg-white border-2 border-blue-600/30 rounded-[28px] p-6 sm:p-8 shadow-xl relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-black text-[#0F172A]">Today's Action Center</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl">
                      <span className="text-[10px] font-black text-emerald-600 uppercase block mb-2">✅ Stocks to Watch</span>
                      <ul className="flex flex-col gap-1.5 font-bold text-[#0F172A]">
                        <li>· Reliance Industries</li>
                        <li>· HDFC Bank</li>
                        <li>· Tata Power</li>
                      </ul>
                    </div>

                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl">
                      <span className="text-[10px] font-black text-rose-600 uppercase block mb-2">⚠️ Elevated Risk</span>
                      <ul className="flex flex-col gap-1.5 font-bold text-slate-700">
                        <li>· Small-cap IT Exporters</li>
                        <li>· High Beta Futures</li>
                      </ul>
                    </div>

                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl">
                      <span className="text-[10px] font-black text-blue-600 uppercase block mb-2">📅 Events Tomorrow</span>
                      <ul className="flex flex-col gap-1.5 font-bold text-[#0F172A]">
                        <li>· RBI Official Policy</li>
                        <li>· Infosys Earnings</li>
                      </ul>
                    </div>

                    <div className="bg-blue-600 text-white p-4 rounded-2xl flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase text-blue-200 block mb-1">🤖 AI Strategy</span>
                        <p className="text-xs font-bold leading-relaxed">Focus on Banking and Capital Goods. Avoid volatile small-caps today.</p>
                      </div>
                      <button
                        onClick={() => {
                          if (onTrade) onTrade({ symbol: 'HDFCBANK', company: 'HDFC Bank', rec: 'BUY' });
                        }}
                        className="mt-3 w-full py-2 rounded-xl bg-white text-blue-700 font-black text-[10px] text-center hover:bg-blue-50"
                      >
                        Trade Top Pick (HDFCBANK)
                      </button>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* TAB 2: MARKETS */}
            {activeTab === 'Markets' && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white border border-[#E2E8F0] p-5 rounded-[24px] shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">NIFTY 50</span>
                    <span className="text-xl font-black text-[#0F172A]">24,586.20</span>
                    <span className="text-xs font-bold text-emerald-600 block mt-1">▲ +142.50 (+0.58%)</span>
                  </div>
                  <div className="bg-white border border-[#E2E8F0] p-5 rounded-[24px] shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">SENSEX</span>
                    <span className="text-xl font-black text-[#0F172A]">80,716.40</span>
                    <span className="text-xs font-bold text-emerald-600 block mt-1">▲ +485.10 (+0.61%)</span>
                  </div>
                  <div className="bg-white border border-[#E2E8F0] p-5 rounded-[24px] shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">BANK NIFTY</span>
                    <span className="text-xl font-black text-[#0F172A]">52,380.90</span>
                    <span className="text-xs font-bold text-emerald-600 block mt-1">▲ +610.40 (+1.18%)</span>
                  </div>
                </div>

                <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col gap-4">
                  <h3 className="text-lg font-black text-[#0F172A]">Institutional FII / DII Flow Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">FII Net Inflow (Today)</span>
                      <span className="text-lg font-black text-emerald-600">+₹2,450 Cr</span>
                      <span className="text-[10px] text-slate-500 block mt-1">Strong buying in Banking & Energy</span>
                    </div>
                    <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">DII Net Inflow (Today)</span>
                      <span className="text-lg font-black text-emerald-600">+₹1,820 Cr</span>
                      <span className="text-[10px] text-slate-500 block mt-1">Mutual funds SIP inflows stable</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: COMPANIES */}
            {activeTab === 'Companies' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-[#E2E8F0] max-w-md">
                  <Search className="w-4 h-4 text-slate-400 ml-2" />
                  <input
                    type="text"
                    placeholder="Search company news by name or symbol..."
                    value={companySearch}
                    onChange={(e) => setCompanySearch(e.target.value)}
                    className="flex-1 bg-transparent text-xs text-[#0F172A] outline-none"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  {breakingNews.map((news) => (
                    <div key={news.id} className="bg-white p-6 rounded-[24px] border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white font-black text-sm flex items-center justify-center shrink-0">
                          {news.stocks[0].substring(0, 2)}
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-blue-600 uppercase">{news.stocks.join(', ')}</span>
                          <h4 className="font-black text-base text-[#0F172A] leading-snug">{news.headline}</h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">{news.summary}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setSelectedArticle(news)}
                          className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 font-black text-xs hover:bg-blue-100 transition"
                        >
                          Read More
                        </button>
                        <button
                          onClick={() => {
                            if (onSelectStock) onSelectStock({ symbol: news.stocks[0], company: news.stocks[0] });
                          }}
                          className="px-4 py-2 rounded-xl bg-[#0F172A] text-white font-black text-xs hover:bg-slate-800 transition"
                        >
                          Open Company
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: CORPORATE ACTIONS */}
            {activeTab === 'Corporate Actions' && (
              <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-[#0F172A]">Corporate Actions & Earnings Calendar</h3>
                  <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
                    {(['Today', 'This Week', 'This Month'] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setCorporateTimeFilter(t)}
                        className={`px-3 py-1.5 rounded-lg transition ${corporateTimeFilter === t ? 'bg-white shadow-xs text-[#0F172A] font-black' : 'text-slate-500'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {corporateActions.map((ca, i) => (
                    <div key={i} className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex justify-between items-center">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-black text-[9px] uppercase block mb-1 w-fit">{ca.type}</span>
                        <h4 className="font-black text-sm text-[#0F172A]">{ca.company} ({ca.symbol})</h4>
                        <span className="text-xs text-slate-500 font-medium">{ca.detail}</span>
                      </div>
                      <button
                        onClick={() => {
                          if (onSelectStock) onSelectStock({ symbol: ca.symbol, company: ca.company });
                        }}
                        className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-blue-600 font-black text-xs hover:bg-slate-50 transition"
                      >
                        View {ca.symbol}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: ECONOMY */}
            {activeTab === 'Economy' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col gap-4">
                  <h3 className="text-lg font-black text-[#0F172A]">Macro & Central Bank Updates</h3>
                  <div className="flex flex-col gap-3">
                    {economicEvents.map((ee, i) => (
                      <div key={i} className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-100 flex justify-between items-center">
                        <div>
                          <strong className="text-sm font-black text-[#0F172A] block">{ee.event}</strong>
                          <span className="text-xs text-slate-500">Affecting: {ee.sectors}</span>
                        </div>
                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">{ee.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col gap-4">
                  <h3 className="text-lg font-black text-[#0F172A]">Commodities & Currency Indicators</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">USD / INR</span>
                      <strong className="text-base text-[#0F172A] block mt-1">₹83.68</strong>
                      <span className="text-emerald-600 font-bold">▲ Stable</span>
                    </div>
                    <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Brent Crude Oil</span>
                      <strong className="text-base text-[#0F172A] block mt-1">$78.40 / bbl</strong>
                      <span className="text-emerald-600 font-bold">▼ Favorable</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: AI BRIEF (SIGNATURE DAILY BRIEFING WORKSPACE) */}
            {activeTab === 'AI Brief' && (
              <div className="bg-white rounded-[28px] border-2 border-blue-600/30 p-6 sm:p-8 shadow-xl flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-blue-600 fill-blue-600 animate-pulse" />
                    <div>
                      <h3 className="text-xl font-black text-[#0F172A]">60-Second AI Daily Intelligence Brief</h3>
                      <span className="text-xs text-slate-400 font-bold">SEBI-Compliant Automated Market Digest</span>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    Updated 08:30 AM IST
                  </span>
                </div>

                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl flex flex-col gap-3">
                  <h4 className="text-xs font-black text-blue-700 uppercase tracking-wider">Executive Market Synthesis</h4>
                  <p className="text-sm text-slate-800 font-medium leading-relaxed">
                    Markets remain positively positioned following the RBI repo rate pause. Banking and capital goods equities are leading institutional inflows. Short-term volatility remains subdued, providing an ideal climate for swing positioning in large-cap equities.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Top Opportunity</span>
                    <strong className="text-sm font-black text-emerald-600 block">Large-cap Banking Accumulation</strong>
                  </div>
                  <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Biggest Risk</span>
                    <strong className="text-sm font-black text-rose-600 block">Small-cap Monsoon Volatility</strong>
                  </div>
                  <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Sector Spotlight</span>
                    <strong className="text-sm font-black text-[#0F172A] block">Green Energy & Hydrogen</strong>
                  </div>
                  <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Market Sentiment</span>
                    <strong className="text-sm font-black text-blue-600 block">Bullish (92% Conviction)</strong>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      if (onSelectResearch) onSelectResearch({ symbol: 'RELIANCE', company: 'Reliance Industries' });
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition shadow-md text-center"
                  >
                    Explore Suggested Research Reports
                  </button>
                </div>
              </div>
            )}

            {/* TAB 7: BOOKMARKS (SAVED NEWS & REPORTS) */}
            {activeTab === 'Bookmarks' && (
              <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-black text-[#0F172A]">Saved News & Intelligence</h3>
                  <span className="text-xs font-bold text-slate-400">{bookmarkedIds.length} Saved Items</span>
                </div>

                {bookmarkedIds.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {breakingNews.filter(n => bookmarkedIds.includes(n.id)).map(news => (
                      <div key={news.id} className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-black text-blue-600 uppercase">{news.category}</span>
                          <h4 className="font-black text-sm text-[#0F172A]">{news.headline}</h4>
                          <span className="text-[10px] text-slate-400">{news.source} · {news.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedArticle(news)}
                            className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-black text-xs"
                          >
                            Read
                          </button>
                          <button
                            onClick={() => toggleBookmark(news.id)}
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-slate-400 font-bold text-xs">
                    No saved articles yet. Click the bookmark icon on any news story to save it for later.
                  </div>
                )}
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ARTICLE DETAIL FULL PAGE MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <NewsDetail
            isOpen={true}
            onClose={() => setSelectedArticle(null)}
            newsItem={selectedArticle}
            onOpenCompany={(sym) => {
              setSelectedArticle(null);
              if (onSelectStock) onSelectStock({ symbol: sym, company: sym });
            }}
            onOpenResearch={(res) => {
              setSelectedArticle(null);
              if (onSelectResearch) onSelectResearch(res);
            }}
            onTrade={(tr) => {
              setSelectedArticle(null);
              if (onTrade) onTrade(tr);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default MarketIntelligenceCenter;
