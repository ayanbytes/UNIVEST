import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, TrendingUp, Sparkles, 
  Bookmark, Compass, Award, BookOpen, Play, 
  Calculator, ShieldCheck, Share2, Search, Plus, X
} from 'lucide-react';
import { FinancialConstellation } from '../ui/FinancialConstellation';
import { useMarketData } from '../../hooks/useMarketData';
import { useStockSearch } from '../../hooks/useStockSearch';

// Interfaces for structured data
interface IndexData {
  name: string;
  value: string;
  change: string;
  changePercent: number;
  sparkline: number[];
}

interface MarketNews {
  id: string;
  headline: string;
  source: string;
  time: string;
  summary: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  relatedStock: string;
  category: string;
  impact: string;
  imageUrl?: string;
}

interface AIPick {
  id: string;
  symbol: string;
  companyName: string;
  sector: string;
  price: string;
  changePercent: number;
  confidence: number;
  risk: 'Low' | 'Moderate' | 'High';
  signal: 'BUY' | 'SELL' | 'HOLD';
  target: string;
  horizon: string;
  reason: string;
}

interface ResearchCall {
  id: string;
  symbol: string;
  category: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
  entry: string;
  target: string;
  stopLoss: string;
  riskReward: string;
  analyst: string;
  accuracy: string;
  duration: string;
  time: string;
}

interface CorporateAction {
  company: string;
  logo: string;
  actionType: 'Dividend' | 'Bonus' | 'Split' | 'Results' | 'AGM';
  exDate: string;
  recordDate: string;
  impact: string;
  expectedYield?: string;
}

interface MarketEvent {
  title: string;
  date: string;
  timeframe: 'Today' | 'Tomorrow' | 'This Week' | 'Next Week';
  category: 'IPO' | 'Policy' | 'Economy' | 'Earnings' | 'F&O';
  description: string;
}

export const HomeDashboard: React.FC = () => {
  // Collapsible brief state
  const [briefExpanded, setBriefExpanded] = useState(false);

  // Search & Custom Watchlist State
  const [searchQuery, setSearchQuery] = useState('');
  const { results: searchResults, isSearching, searchStocks, clearSearch } = useStockSearch();
  const [customWatchlist, setCustomWatchlist] = useState<string[]>(['TCS', 'INFY']); // Defaults for the custom watchlist

  // Live Market Data Integration
  // We combine the default symbols and the user's custom watchlist
  const defaultSymbols = ['ADANIENT', 'BHARTIARTL', 'ITC', 'TATASTEEL', 'WIPRO', 'AXISBANK', 'RELIANCE', 'YESBANK', 'HDFCBANK', 'M&M', 'HAL'];
  const allSymbolsToFetch = Array.from(new Set([...defaultSymbols, ...customWatchlist]));
  
  const { quotes } = useMarketData(allSymbolsToFetch, 3000);

  // Active tabs inside widgets
  const [newsCategory, setNewsCategory] = useState('Latest');
  const [corporateActionFilter, setCorporateActionFilter] = useState<'All' | 'Dividend' | 'Bonus' | 'Split' | 'Results'>('All');
  const [eventTimeframe, setEventTimeframe] = useState<'Today' | 'Tomorrow' | 'This Week' | 'Next Week'>('Today');
  const [opportunitiesTab, setOpportunitiesTab] = useState<'Stocks' | 'IPO' | 'Mutual Funds' | 'ETF' | 'Bonds' | 'Gold'>('Stocks');
  const [moverTab, setMoverTab] = useState<'Gainers' | 'Losers' | 'High Volume' | '52W High'>('Gainers');

  // Bookmarks
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const toggleBookmark = (id: string) => {
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Mock Data
  const indicesData: IndexData[] = [
    { name: 'NIFTY 50', value: '22,482.15', change: '+142.40', changePercent: 0.64, sparkline: [22300, 22350, 22320, 22410, 22440, 22482] },
    { name: 'SENSEX', value: '74,312.10', change: '+354.80', changePercent: 0.48, sparkline: [73900, 74100, 74050, 74200, 74250, 74312] },
    { name: 'BANK NIFTY', value: '48,250.60', change: '-78.20', changePercent: -0.16, sparkline: [48450, 48380, 48420, 48310, 48290, 48250] },
    { name: 'INDIA VIX', value: '12.84', change: '-0.42', changePercent: -3.20, sparkline: [13.4, 13.2, 13.5, 13.0, 12.9, 12.84] }
  ];

  const portfolioSummary = {
    currentValue: '₹8,42,150',
    investedAmount: '₹7,11,110',
    totalReturn: '+₹1,31,040',
    totalReturnPercent: 18.42,
    todayPnL: '+₹12,840',
    todayPnLPercent: 1.55,
    riskScore: 'Low-to-Medium',
    allocation: [
      { category: 'Equities', value: '₹4,88,447', percent: 58, color: '#2563EB' },
      { category: 'Mutual Funds', value: '₹2,10,537', percent: 25, color: '#16A34A' },
      { category: 'Commodities', value: '₹1,01,058', percent: 12, color: '#F59E0B' },
      { category: 'Liquid Cash', value: '₹42,108', percent: 5, color: '#64748B' }
    ]
  };

  const aiPicks: AIPick[] = [
    {
      id: 'aip1',
      symbol: 'HDFCBANK',
      companyName: 'HDFC Bank Ltd',
      sector: 'Banking & Financials',
      price: '₹1,682.40',
      changePercent: 0.85,
      confidence: 95,
      risk: 'Low',
      signal: 'BUY',
      target: '₹1,884',
      horizon: '3-6 Months',
      reason: 'AI engine detects heavy accumulation near multi-month support. Margin compression fears appear fully priced in.'
    },
    {
      id: 'aip2',
      symbol: 'TATAMOTORS',
      companyName: 'Tata Motors Ltd',
      sector: 'Automotive & EV',
      price: '₹978.65',
      changePercent: 1.42,
      confidence: 91,
      risk: 'Moderate',
      signal: 'BUY',
      target: '₹1,092',
      horizon: '1-3 Months',
      reason: 'JLR order book expansion and strong domestic EV market share are projected to drive double-digit EBITDA growth.'
    },
    {
      id: 'aip3',
      symbol: 'SUNPHARMA',
      companyName: 'Sun Pharmaceutical Industries',
      sector: 'Healthcare & Pharma',
      price: '₹1,526.80',
      changePercent: 0.36,
      confidence: 88,
      risk: 'Low',
      signal: 'HOLD',
      target: '₹1,645',
      horizon: '6-12 Months',
      reason: 'Specialty segment sales remain robust, but high valuation indicates limited short-term upside. Hold for steady yield.'
    }
  ];

  const researchCalls: ResearchCall[] = [
    {
      id: 'rc1',
      symbol: 'RELIANCE',
      category: 'Short-Term Swing',
      signal: 'BUY',
      entry: '₹2,922 - 2,940',
      target: '₹3,160',
      stopLoss: '₹2,838',
      riskReward: '1:2.4',
      analyst: 'Aarav Mehta',
      accuracy: '78%',
      duration: '15-30 Days',
      time: '42 min ago'
    },
    {
      id: 'rc2',
      symbol: 'NIFTY 22500 CE',
      category: 'Index F&O Strategy',
      signal: 'BUY',
      entry: '₹112 - 118',
      target: '₹172',
      stopLoss: '₹78',
      riskReward: '1:2.1',
      analyst: 'Neha Shah',
      accuracy: '81%',
      duration: 'Weekly Expiry',
      time: '18 min ago'
    },
    {
      id: 'rc3',
      symbol: 'MCX GOLD OCT',
      category: 'Commodities Futures',
      signal: 'HOLD',
      entry: '₹71,880',
      target: '₹73,250',
      stopLoss: '₹71,180',
      riskReward: '1:1.8',
      analyst: 'Karan Rao',
      accuracy: '76%',
      duration: '45 Days',
      time: '1 hour ago'
    }
  ];

  const newsData: MarketNews[] = [
    {
      id: 'news1',
      headline: 'RBI maintains a measured policy stance as retail inflation cools to 4.2%',
      source: 'Univest Research',
      time: '42 min ago',
      summary: 'Central bank hints at potential rate cuts in late Q3 if inflation trajectory stabilizes below targets.',
      sentiment: 'Bullish',
      relatedStock: 'HDFCBANK',
      category: 'Economy',
      impact: 'Positive'
    },
    {
      id: 'news2',
      headline: 'IT earnings signal a resilient demand outlook for FY27 with cloud pipeline expansion',
      source: 'Tech Desk',
      time: '2 hours ago',
      summary: 'Large-cap IT majors report increased deal wins and stable operating margins despite global macro headwinds.',
      sentiment: 'Bullish',
      relatedStock: 'TCS',
      category: 'Markets',
      impact: 'Positive'
    },
    {
      id: 'news3',
      headline: 'Automotive sector records minor supply chain drag due to global logistics bottlenecks',
      source: 'Waya Advisory',
      time: '4 hours ago',
      summary: 'Marginal rise in inventory cycle times expected to temporarily impact next month passenger vehicle deliveries.',
      sentiment: 'Bearish',
      relatedStock: 'TATAMOTORS',
      category: 'Companies',
      impact: 'Negative'
    },
    {
      id: 'news4',
      headline: 'Crypto markets witness stabilization as institutional inflows surge into Ether ETFs',
      source: 'Crypto Intelligence',
      time: '5 hours ago',
      summary: 'Total capitalization recovers above benchmark targets as Spot ETF volumes establish stable floors.',
      sentiment: 'Neutral',
      relatedStock: 'BTC',
      category: 'Crypto',
      impact: 'Neutral'
    }
  ];

  const corporateActions: CorporateAction[] = [
    { company: 'Larsen & Toubro Ltd', logo: 'LT', actionType: 'Dividend', exDate: '24 Jul 2026', recordDate: '25 Jul 2026', impact: 'High', expectedYield: '₹28.00 / Share (2.1%)' },
    { company: 'Infosys Limited', logo: 'IF', actionType: 'Bonus', exDate: '28 Jul 2026', recordDate: '29 Jul 2026', impact: 'Moderate', expectedYield: '1:1 Ratio' },
    { company: 'Tata Steel Limited', logo: 'TS', actionType: 'Split', exDate: '04 Aug 2026', recordDate: '05 Aug 2026', impact: 'High', expectedYield: '10:1 Split' },
    { company: 'Reliance Industries', logo: 'RL', actionType: 'Results', exDate: '21 Jul 2026', recordDate: 'N/A', impact: 'High', expectedYield: 'Q1 Performance Release' }
  ];

  const upcomingEvents: MarketEvent[] = [
    { title: 'Ola Electric IPO Bidding Window', date: 'Today, 10:00 AM', timeframe: 'Today', category: 'IPO', description: 'Bidding window opens for retail and institutional allocators.' },
    { title: 'RBI Monetary Policy Committee decision', date: 'Today, 2:30 PM', timeframe: 'Today', category: 'Policy', description: 'Governor announcement regarding benchmark interest rates.' },
    { title: 'US Federal Reserve FOMC minutes release', date: 'Tomorrow, 11:30 PM', timeframe: 'Tomorrow', category: 'Policy', description: 'Overnight release outlines potential rate cut paths.' },
    { title: 'Reliance Industries Q1 Earnings call', date: 'This Thursday, 4:15 PM', timeframe: 'This Week', category: 'Earnings', description: 'Corporate earnings call summarizing margins and refinery growth plans.' },
    { title: 'Budget 2026 India Parliamentary Tabling', date: 'Next Tuesday, 11:00 AM', timeframe: 'Next Week', category: 'Economy', description: 'Finance ministry presents union budget directives.' }
  ];

  const stockMovers = {
    Gainers: [
      { symbol: 'ADANIENT', price: '₹3,242.10', change: '+₹112.40', changePercent: 3.59 },
      { symbol: 'BHARTIARTL', price: '₹1,420.50', change: '+₹42.80', changePercent: 3.11 },
      { symbol: 'ITC', price: '₹436.90', change: '+₹11.20', changePercent: 2.63 }
    ],
    Losers: [
      { symbol: 'TATASTEEL', price: '₹147.20', change: '-₹3.60', changePercent: -2.38 },
      { symbol: 'WIPRO', price: '₹462.15', change: '-₹8.40', changePercent: -1.78 },
      { symbol: 'AXISBANK', price: '₹1,180.40', change: '-₹18.20', changePercent: -1.52 }
    ],
    'High Volume': [
      { symbol: 'RELIANCE', price: '₹3,024.20', change: '+37.80', changePercent: 1.25, extra: 'Volume: 12.8M' },
      { symbol: 'YESBANK', price: '₹24.80', change: '+0.45', changePercent: 1.85, extra: 'Volume: 94.2M' },
      { symbol: 'HDFCBANK', price: '₹1,682.40', change: '+14.20', changePercent: 0.85, extra: 'Volume: 18.5M' }
    ],
    '52W High': [
      { symbol: 'M&M', price: '₹2,842.10', change: '+₹94.20', changePercent: 3.43, extra: '52W High: ₹2,850' },
      { symbol: 'HAL', price: '₹4,120.40', change: '+₹118.50', changePercent: 2.96, extra: '52W High: ₹4,150' }
    ]
  };

  const trendingOpportunities = {
    Stocks: [
      { symbol: 'L&T', price: '₹3,456.90', change: '+1.05%', score: '92 Confidence', details: 'Technicals show consolidation breakout setup' },
      { symbol: 'COALINDIA', price: '₹480.20', change: '+2.14%', score: '88 Confidence', details: 'Dividend yield opportunity near ex-date' }
    ],
    IPO: [
      { symbol: 'Ola Electric', price: '₹72 - 76', change: 'Ex. Premium +18%', score: '4.2★ Rating', details: 'Opens today for subscription bidding' },
      { symbol: 'FirstCry India', price: '₹420 - 450', change: 'Ex. Premium +24%', score: '4.5★ Rating', details: 'Closing soon, high institutional demand' }
    ],
    'Mutual Funds': [
      { symbol: 'Parag Parikh Flexi Cap', price: 'Returns: 24.8%', change: '3Y CAGR', score: '5★ Fund', details: 'Flexible allocation across domestic & global majors' },
      { symbol: 'Quant Active Fund', price: 'Returns: 29.2%', change: '3Y CAGR', score: '5★ Fund', details: 'Dynamic momentum investing across sectors' }
    ],
    ETF: [
      { symbol: 'NIPPON INDIA JUNIOR BEES', price: '₹624.50', change: '+0.82%', score: 'High Liquidity', details: 'Mirroring Nifty Next 50 index performance' }
    ],
    Bonds: [
      { symbol: 'NHAI Tax Free Bonds', price: 'Yield: 7.25%', change: 'AAA Rated', score: 'Secure Income', details: 'Tax-free interest allocation opportunity' }
    ],
    Gold: [
      { symbol: 'Sovereign Gold Bonds (SGB)', price: '2.5% p.a. + Growth', change: 'Tax Free at Exit', score: 'Govt Backed', details: 'Digital sovereign gold allocations' }
    ]
  };

  const sectorRotation = [
    { name: 'Nifty IT', strength: 'Strong', momentum: '▲ +1.84%', color: '#16A34A' },
    { name: 'Nifty Bank', strength: 'Weak', momentum: '▼ -0.24%', color: '#EF4444' },
    { name: 'Nifty Metal', strength: 'Consolidating', momentum: '▲ +0.12%', color: '#F59E0B' },
    { name: 'Nifty Auto', strength: 'Strong', momentum: '▲ +2.11%', color: '#16A34A' }
  ];

  return (
    <div className="flex flex-col gap-8 pb-16">
      
      {/* SECTION 1: TODAY'S FOCUS (AI Morning Brief) */}
      <section className="bg-gradient-to-br from-[#2563EB]/10 via-[#0EA5E9]/5 to-[#16A34A]/5 rounded-[24px] p-8 shadow-premium-sm relative overflow-hidden border border-blue-100">
        <FinancialConstellation className="opacity-10" />
        {/* Decorative background glows */}
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute left-10 bottom-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-black tracking-widest text-blue-600 uppercase">AI Morning briefing</span>
              <h2 className="text-[42px] leading-tight font-black tracking-tight mt-2 text-[#0F172A]">Good morning, Omar</h2>
              <p className="text-[17px] text-slate-600 mt-2 max-w-2xl font-medium">
                The Indian markets are preparing for policy action. Here is what requires your attention in the next 30 seconds:
              </p>
            </div>
            <button 
              onClick={() => setBriefExpanded(!briefExpanded)}
              className="bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#0F172A] font-black text-sm px-6 py-3 rounded-button transition-all flex items-center gap-2 shrink-0 shadow-sm self-start md:self-auto hover:-translate-y-0.5"
            >
              <span>{briefExpanded ? 'Collapse Brief' : 'View Morning Brief'}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${briefExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8 relative z-10">
            <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 flex flex-col justify-between hover:border-blue-200 transition">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Market State</span>
              <span className="text-sm font-black text-emerald-600 flex items-center gap-1.5 mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Market
              </span>
            </div>
            <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 flex flex-col justify-between hover:border-blue-200 transition">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Research Desk</span>
              <span className="text-sm font-black text-blue-600 mt-2">5 Active Calls</span>
            </div>
            <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 flex flex-col justify-between hover:border-blue-200 transition">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Portfolio PnL</span>
              <span className="text-sm font-black text-emerald-600 mt-2">+1.55% today</span>
            </div>
            <div className="bg-rose-50 border border-rose-100 shadow-sm rounded-2xl p-4 flex flex-col justify-between hover:border-rose-200 transition">
              <span className="text-[10px] font-bold text-rose-500 uppercase">Key Event Today</span>
              <span className="text-sm font-black text-rose-700 mt-2">RBI Policy Decision</span>
            </div>
            <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 flex flex-col justify-between hover:border-blue-200 transition">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Alert Targets</span>
              <span className="text-sm font-black text-emerald-600 mt-2">2 Near Target</span>
            </div>
            <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4 flex flex-col justify-between hover:border-blue-200 transition">
              <span className="text-[10px] font-bold text-slate-400 uppercase">AI Queue Signals</span>
              <span className="text-sm font-black text-blue-600 mt-2">4 Setups Found</span>
            </div>
          </div>

          {/* Expandable Morning Report Details */}
          <AnimatePresence>
            {briefExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden relative z-10"
              >
                <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-700">
                  <div className="flex flex-col gap-3">
                    <h4 className="font-black text-[#0F172A] text-xs uppercase tracking-wider">Overnight Globals & News</h4>
                    <p className="leading-relaxed font-medium">
                      US indices closed higher (NASDAQ +0.82%) as treasury yields consolidated. Retail inflation in India cooled to 4.2% supporting rate-cut expectations.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4 className="font-black text-[#0F172A] text-xs uppercase tracking-wider">Corporate Actions Today</h4>
                    <p className="leading-relaxed font-medium">
                      Reliance Q1 numbers will be watched closely. L&T dividend ex-date is approaching with an expected yield of 2.1%.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4 className="font-black text-[#0F172A] text-xs uppercase tracking-wider">Action Plan Suggestions</h4>
                    <p className="leading-relaxed text-[13px] font-bold text-blue-700 bg-blue-50 border border-blue-100 p-4 rounded-[16px]">
                      AI recommends booking partial profit on TATASTEEL near resistance levels, and adding defensive allocations ahead of the budget.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 2: PORTFOLIO & AI RECOMMENDATIONS */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-6">
        {/* Portfolio Card */}
        <div className="bg-[#0F172A] rounded-[28px] p-5 md:p-6 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 top-0 w-36 h-36 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Portfolio Value</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <h3 className="text-3xl font-black tracking-tight">{portfolioSummary.currentValue}</h3>
                  <span className="text-xs font-black text-[#6ee7a0] flex items-center gap-0.5">
                    <TrendingUp className="w-3.5 h-3.5" /> {portfolioSummary.todayPnL} (+{portfolioSummary.todayPnLPercent}%) today
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <span className="text-[9px] font-bold text-slate-400 uppercase bg-slate-800 px-2 py-0.5 rounded">Risk: Balanced</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10 text-xs">
              <div>
                <span className="text-slate-400">Invested Capital</span>
                <p className="font-extrabold text-sm mt-0.5">{portfolioSummary.investedAmount}</p>
              </div>
              <div>
                <span className="text-slate-400">All-time Net Profits</span>
                <p className="font-extrabold text-sm text-[#6ee7a0] mt-0.5">{portfolioSummary.totalReturn}</p>
              </div>
            </div>
          </div>

          {/* Allocation & sparklines row */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-400 font-medium">Asset Allocation</span>
              <span className="text-slate-300 font-bold">4 Asset Classes</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
              {portfolioSummary.allocation.map((item) => (
                <div 
                  key={item.category} 
                  style={{ width: `${item.percent}%`, backgroundColor: item.color }} 
                  className="h-full first:rounded-l-full last:rounded-r-full"
                  title={`${item.category}: ${item.percent}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
              {portfolioSummary.allocation.map((item) => (
                <div key={item.category} className="flex items-center gap-1.5 text-[10px] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.category} ({item.percent}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendations Carousel */}
        <div className="bg-white border border-[#E2E8F0] rounded-[28px] p-5 md:p-6 shadow-sm flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" /> AI Discoveries
              </h3>
              <p className="text-[10px] text-[#64748B] mt-0.5">High-confidence quantitative opportunities</p>
            </div>
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Auto-Updating</span>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin flex-1">
            {aiPicks.map((pick) => (
              <div 
                key={pick.id} 
                className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 min-w-[240px] max-w-[280px] flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[8.5px] font-black text-[#2563EB] bg-blue-50 px-1.5 py-0.2 rounded uppercase">{pick.sector}</span>
                      <h4 className="text-xs font-black text-[#0F172A] mt-1.5">{pick.symbol}</h4>
                    </div>
                    <span className="text-[9.5px] font-black text-[#2563EB] bg-white border border-slate-200 px-1.5 py-0.5 rounded-md">
                      {pick.confidence}% Conf.
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-3 text-[10px] bg-white p-2 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[8px]">Value</span>
                      <span className="font-extrabold text-[#0F172A]">{pick.price}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[8px]">Target</span>
                      <span className="font-extrabold text-[#16A34A]">{pick.target}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[9px]">
                  <span className="text-slate-500 font-medium">Horizon: {pick.horizon}</span>
                  <span className="text-[#16A34A] font-black px-1.5 bg-[#E8F8F0] rounded">{pick.signal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: TODAY'S RESEARCH CALLS */}
      <section className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 shadow-premium transition hover:shadow-premium-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#2563EB]" /> Live Research Advisory Center
            </h3>
            <p className="text-xs font-medium text-[#64748B] mt-1.5">SEBI-compliant registered research recommendations.</p>
          </div>
        </div>

        <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden bg-white">
          <div className="hidden md:grid grid-cols-[1.25fr_1.1fr_1.1fr_1fr_1.1fr_1fr] gap-4 bg-slate-50 px-5 py-3 text-[9px] font-bold uppercase tracking-wider text-[#64748B] border-b border-[#E2E8F0]">
            <span>Research Target</span>
            <span>Signal Info</span>
            <span>Entry Range</span>
            <span>Target / Stop Loss</span>
            <span>Risk:Reward / Duration</span>
            <span className="text-right">Advisory Details</span>
          </div>
          {researchCalls.map((call) => (
            <div 
              key={call.id}
              className="grid grid-cols-2 md:grid-cols-[1.25fr_1.1fr_1.1fr_1fr_1.1fr_1fr] gap-2 md:gap-4 px-5 py-4 border-b border-[#F1F5F9] last:border-0 items-center hover:bg-slate-50/40 transition-colors"
            >
              <div>
                <span className="text-xs font-black text-[#0F172A]">{call.symbol}</span>
                <span className="block text-[8px] text-[#64748B] mt-0.5">Published {call.time}</span>
              </div>
              <div>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                  call.signal === 'BUY' ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEF3C7] text-[#92400E]'
                }`}>
                  {call.signal}
                </span>
                <span className="block text-[9px] text-[#64748B] mt-1">{call.category}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#0F172A]">{call.entry}</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#16A34A]">{call.target}</span>
                <span className="text-[#94A3B8] mx-1">/</span>
                <span className="text-xs font-bold text-[#EF4444]">{call.stopLoss}</span>
              </div>
              <div>
                <span className="text-xs font-semibold text-[#0F172A]">{call.riskReward}</span>
                <span className="block text-[9px] text-[#64748B] mt-0.5">{call.duration}</span>
              </div>
              <div className="col-span-2 md:col-span-1 text-right mt-2 md:mt-0 flex items-center justify-between md:justify-end gap-3">
                <span className="text-[9px] text-[#64748B] text-left md:text-right hidden sm:block">
                  By <b>{call.analyst}</b> ({call.accuracy} accuracy)
                </span>
                <button className="border border-[#E2E8F0] hover:bg-slate-50 text-xs font-bold text-[#2563EB] px-3.5 py-2 rounded-xl transition-colors">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: STOCK SEARCH & CUSTOM WATCHLIST */}
      <section className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 shadow-premium transition hover:shadow-premium-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" /> Stock Search & Custom Watchlist
            </h3>
            <p className="text-xs font-medium text-[#64748B] mt-1.5">Add any stock to track its live price.</p>
          </div>
          <div className="relative flex-1 max-w-md">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input 
                type="text" 
                className="bg-transparent border-none outline-none text-sm font-bold text-slate-800 placeholder-slate-400 w-full"
                placeholder="Search stocks on Groww..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim().length > 1) {
                    searchStocks(e.target.value);
                  } else {
                    clearSearch();
                  }
                }}
              />
              {isSearching && (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin ml-2" />
              )}
            </div>

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-[300px] overflow-y-auto">
                {searchResults.map((result) => {
                  const isAdded = customWatchlist.includes(result.symbol);
                  return (
                    <div 
                      key={result.symbol} 
                      className="flex items-center justify-between p-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer"
                      onClick={() => {
                        if (!isAdded) {
                          setCustomWatchlist(prev => [...prev, result.symbol]);
                        }
                        setSearchQuery('');
                        clearSearch();
                      }}
                    >
                      <div>
                        <span className="text-sm font-black text-slate-800">{result.symbol}</span>
                        <span className="text-[10px] text-slate-500 block">{result.companyName}</span>
                      </div>
                      <button 
                        className={`p-1.5 rounded-lg border ${isAdded ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'}`}
                        disabled={isAdded}
                      >
                        {isAdded ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Custom Watchlist Cards */}
        {customWatchlist.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {customWatchlist.map((symbol) => {
              const liveQuote = quotes[symbol];
              const displayPrice = liveQuote ? `₹${liveQuote.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Fetching...';
              
              let displayChangePct = 0;
              if (liveQuote && liveQuote.close > 0) {
                displayChangePct = parseFloat((((liveQuote.ltp - liveQuote.close) / liveQuote.close) * 100).toFixed(2));
              }
              const isGain = displayChangePct >= 0;

              return (
                <div key={symbol} className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl relative group">
                  <button 
                    onClick={() => setCustomWatchlist(prev => prev.filter(s => s !== symbol))}
                    className="absolute top-2 right-2 p-1 bg-slate-200 text-slate-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-100 hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-black text-[#0F172A] flex items-center gap-1.5">
                    {symbol}
                    {liveQuote && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Live Pricing Active" />}
                  </span>
                  <div className="mt-2">
                    <span className="text-sm font-extrabold text-[#0F172A] block">{displayPrice}</span>
                    {liveQuote && (
                      <span className={`text-[10px] font-black block mt-0.5 ${isGain ? 'text-[#16A34A]' : 'text-[#EF4444]'}`}>
                        {displayChangePct > 0 ? '+' : ''}{displayChangePct}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-sm font-bold text-slate-400">Your custom watchlist is empty.</p>
            <p className="text-xs text-slate-500 mt-1">Search for a stock above to add it to your live feed.</p>
          </div>
        )}
      </section>

      {/* SECTION 5: MARKET OVERVIEW & MOVERS */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.18fr_.82fr] gap-8">
        
        {/* Left Part: Market Indices & Movers */}
        <div className="flex flex-col gap-8 bg-white border border-[#E2E8F0] rounded-[24px] p-8 shadow-premium transition hover:shadow-premium-lg">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#0F172A] mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" /> Market Overview & Gainers
            </h3>
            
            {/* Indices list */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {indicesData.map(idx => {
                const isPos = idx.changePercent >= 0;
                return (
                  <div key={idx.name} className="bg-slate-50 border border-slate-200/50 p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 block">{idx.name}</span>
                      <span className="text-xs font-black text-[#0F172A] mt-0.5 block">{idx.value}</span>
                    </div>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                      isPos ? 'bg-[#E8F8F0] text-[#16A34A]' : 'bg-[#FEECEC] text-[#EF4444]'
                    }`}>
                      {idx.changePercent > 0 ? '+' : ''}{idx.changePercent}%
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Movers Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100 text-[10px]">
              {(['Gainers', 'Losers', 'High Volume', '52W High'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMoverTab(tab)}
                  className={`px-3 py-1.5 rounded-lg font-black transition-colors ${
                    moverTab === tab 
                      ? 'bg-brand-navy text-white' 
                      : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Movers Listing */}
            <div className="flex flex-col gap-2.5 mt-4">
              {stockMovers[moverTab].map((mover) => {
                const liveQuote = quotes[mover.symbol];
                
                // Determine price and change to display
                const displayPrice = liveQuote 
                  ? `₹${liveQuote.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                  : mover.price;
                  
                let displayChangePct = mover.changePercent;
                if (liveQuote && liveQuote.close > 0) {
                  displayChangePct = parseFloat((((liveQuote.ltp - liveQuote.close) / liveQuote.close) * 100).toFixed(2));
                }
                
                const isGain = displayChangePct >= 0;
                
                return (
                  <div key={mover.symbol} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                    <div>
                      <span className="text-xs font-black text-[#0F172A] flex items-center gap-1.5">
                        {mover.symbol}
                        {liveQuote && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Live Pricing Active" />}
                      </span>
                      {'extra' in mover && <span className="text-[8px] text-slate-400 block mt-0.5">{mover.extra}</span>}
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-[#0F172A] block">{displayPrice}</span>
                      <span className={`text-[10px] font-black block ${isGain ? 'text-[#16A34A]' : 'text-[#EF4444]'}`}>
                        {displayChangePct > 0 ? '+' : ''}{displayChangePct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Part: Desktop Floating Sidebar Widgets */}
        <div className="flex flex-col gap-6">
          {/* Fear & Greed widget */}
          <div className="bg-[#0F172A] text-white rounded-[24px] p-5 shadow-sm border border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              Fear & Greed Index
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-amber-400 block">62</span>
                <span className="text-[10px] font-bold text-slate-400 mt-1 block">Zone: Greed</span>
              </div>
              <div className="h-10 w-24 bg-slate-800 rounded-lg relative overflow-hidden flex items-center px-1">
                {/* Pointer indicator */}
                <div className="absolute left-[62%] top-0 bottom-0 w-1 bg-amber-400 z-10" />
                <div className="h-2 w-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* FII/DII Activities */}
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1">
              FII / DII Net Activity
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs leading-normal">
              <div className="bg-[#E8F8F0] p-2.5 rounded-xl border border-emerald-100">
                <span className="text-[9px] font-bold text-[#16A34A] uppercase tracking-wider block">FII Net Buyers</span>
                <span className="font-extrabold text-[#16A34A] block mt-1">+₹2,480 Cr</span>
              </div>
              <div className="bg-[#FEECEC] p-2.5 rounded-xl border border-rose-100">
                <span className="text-[9px] font-bold text-[#EF4444] uppercase tracking-wider block">DII Net Sellers</span>
                <span className="font-extrabold text-[#EF4444] block mt-1">-₹412 Cr</span>
              </div>
            </div>
          </div>

          {/* Sector Rotation */}
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">
                Sector Rotation Strength
              </h4>
              <div className="flex flex-col gap-2.5">
                {sectorRotation.map(sec => (
                  <div key={sec.name} className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#0F172A]">{sec.name}</span>
                    <span className="font-black text-[10px]" style={{ color: sec.color }}>{sec.strength} ({sec.momentum})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: UPCOMING EVENTS & TIMELINE */}
      <section className="bg-white border border-[#E2E8F0] rounded-[28px] p-5 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-1">
              Market Events Calendar
            </h3>
            <p className="text-[10px] text-[#64748B] mt-0.5">Timeline of macro variables and earnings</p>
          </div>

          <div className="flex items-center gap-1.5 text-[9px]">
            {(['Today', 'Tomorrow', 'This Week', 'Next Week'] as const).map(time => (
              <button
                key={time}
                onClick={() => setEventTimeframe(time)}
                className={`px-2.5 py-1 rounded-md font-black transition-colors ${
                  eventTimeframe === time 
                    ? 'bg-brand-navy text-white' 
                    : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {upcomingEvents.filter(e => e.timeframe === eventTimeframe).map((event) => (
            <div key={event.title} className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-3">
                <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded uppercase mt-0.5">
                  {event.category}
                </span>
                <div>
                  <h4 className="text-xs font-black text-[#0F172A]">{event.title}</h4>
                  <p className="text-[10.5px] text-slate-500 mt-1 leading-normal max-w-xl">{event.description}</p>
                </div>
              </div>
              <span className="text-[10.5px] font-extrabold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shrink-0">
                {event.date}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: CORPORATE ACTIONS */}
      <section className="bg-white border border-[#E2E8F0] rounded-[28px] p-5 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-1">
              Upcoming Corporate Actions
            </h3>
            <p className="text-[10px] text-[#64748B] mt-0.5">Dividends, stock splits, bonuses and results schedules</p>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] overflow-x-auto no-scrollbar pb-1">
            {(['All', 'Dividend', 'Bonus', 'Split', 'Results'] as const).map(act => (
              <button
                key={act}
                onClick={() => setCorporateActionFilter(act)}
                className={`px-2.5 py-1 rounded-md font-black transition-colors shrink-0 ${
                  corporateActionFilter === act 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {act}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {corporateActions
            .filter(act => corporateActionFilter === 'All' || act.actionType === corporateActionFilter)
            .map((act) => (
              <div key={act.company} className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex flex-col justify-between gap-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-slate-200 rounded flex items-center justify-center font-black text-[9px] text-slate-500 shrink-0">
                      {act.logo}
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-[#0F172A] leading-normal">{act.company}</h4>
                      <span className="text-[8px] font-black text-[#2563EB] bg-blue-50 px-1 rounded uppercase mt-0.5 inline-block">
                        {act.actionType}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[8.5px] font-black px-1.5 py-0.2 rounded-full ${
                    act.impact === 'High' ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEF3C7] text-[#92400E]'
                  }`}>
                    {act.impact} Impact
                  </span>
                </div>

                <div className="text-[10.5px] leading-normal bg-white border border-slate-100 p-2.5 rounded-xl">
                  <div className="flex justify-between border-b border-slate-50 pb-1">
                    <span className="text-slate-400">Ex-Date</span>
                    <span className="font-bold text-slate-700">{act.exDate}</span>
                  </div>
                  {act.expectedYield && (
                    <div className="flex flex-col gap-0.5 pt-1">
                      <span className="text-slate-400 text-[8.5px]">Expected Impact Details</span>
                      <span className="font-extrabold text-brand-navy text-[11px] mt-0.5">{act.expectedYield}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* SECTION 7: CATEGORIZED MARKET NEWS */}
      <section className="bg-white border border-[#E2E8F0] rounded-[28px] p-5 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-1">
              Categorized Market News
            </h3>
            <p className="text-[10px] text-[#64748B] mt-0.5">Real-time news alerts mapped with sentiment metrics</p>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] overflow-x-auto no-scrollbar pb-1">
            {['Latest', 'Markets', 'Economy', 'Companies', 'Crypto'].map(cat => (
              <button
                key={cat}
                onClick={() => setNewsCategory(cat)}
                className={`px-2.5 py-1 rounded-md font-black transition-colors shrink-0 ${
                  newsCategory === cat 
                    ? 'bg-brand-navy text-white' 
                    : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {newsData
            .filter(news => newsCategory === 'Latest' || news.category === newsCategory)
            .map((news) => (
              <div key={news.id} className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex flex-col justify-between gap-3 hover:border-slate-300 transition-colors">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-400">{news.source} • {news.time}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[8.5px] font-black px-1.5 py-0.2 rounded-full ${
                        news.sentiment === 'Bullish' ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEECEC] text-[#991B1B]'
                      }`}>
                        {news.sentiment} Sentiment
                      </span>
                    </div>
                  </div>
                  <h4 className="text-xs font-black text-[#0F172A] mt-2.5 leading-relaxed">{news.headline}</h4>
                  <p className="text-[10.5px] text-slate-500 mt-1.5 leading-relaxed">{news.summary}</p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/60 pt-3 text-[10.5px]">
                  <span className="font-extrabold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded cursor-pointer hover:bg-slate-100">
                    ${news.relatedStock}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="text-slate-400 hover:text-slate-600 p-1">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => toggleBookmark(news.id)}
                      className="text-slate-400 hover:text-blue-600 p-1"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarks[news.id] ? 'fill-blue-600 text-blue-600' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* SECTION 8: TRENDING OPPORTUNITIES */}
      <section className="bg-white border border-[#E2E8F0] rounded-[28px] p-5 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-1">
              Trending Investment Opportunities
            </h3>
            <p className="text-[10px] text-[#64748B] mt-0.5">Explore high-quality products across different asset classes</p>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] overflow-x-auto no-scrollbar pb-1">
            {(['Stocks', 'IPO', 'Mutual Funds', 'ETF', 'Bonds', 'Gold'] as const).map(opt => (
              <button
                key={opt}
                onClick={() => setOpportunitiesTab(opt)}
                className={`px-2.5 py-1 rounded-md font-black transition-colors shrink-0 ${
                  opportunitiesTab === opt 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingOpportunities[opportunitiesTab]?.map((item) => (
            <div key={item.symbol} className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex flex-col justify-between gap-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-black text-[#0F172A] block">{item.symbol}</span>
                  <span className="text-[10.5px] text-[#2563EB] font-bold block mt-0.5">{item.score}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-[#0F172A] block">{item.price}</span>
                  <span className="text-[9.5px] text-slate-400 block mt-0.5">{item.change}</span>
                </div>
              </div>
              <p className="text-[10.5px] text-slate-500 leading-normal border-t border-slate-200/50 pt-2.5">
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: INVESTOR CALCULATORS & TOOLS */}
      <section className="bg-slate-50 border border-[#E2E8F0] rounded-[28px] p-5 md:p-6 shadow-sm">
        <h3 className="text-[10px] font-black uppercase tracking-wider text-[#64748B] mb-3.5 flex items-center gap-1">
          <Calculator className="w-4 h-4 text-blue-600" /> Professional Investment Calculators & Tools
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {[
            { name: 'SIP Calculator', desc: 'Calculate recurring fund yields' },
            { name: 'Lumpsum Calculator', desc: 'Track compounded single payouts' },
            { name: 'Goal Planner', desc: 'Map asset milestones targets' },
            { name: 'Screener', desc: 'Filters stocks with technicals' },
            { name: 'Option Builder', desc: 'Design spreads and calculate Greeks' },
            { name: 'Dividend Calculator', desc: 'Project quarterly payouts yield' },
            { name: 'Tax Calculator', desc: 'Determine capital gains burden' },
            { name: 'Risk Profiler', desc: 'Analyze standard deviations loss' }
          ].map((tool) => (
            <button 
              key={tool.name} 
              className="bg-white border border-[#E2E8F0] hover:border-[#2563EB]/40 p-4 rounded-xl text-left transition-all hover:-translate-y-0.5 hover:shadow-premium-sm"
            >
              <span className="text-xs font-black text-[#0F172A] block">{tool.name}</span>
              <span className="text-[9.5px] text-slate-400 mt-1 block leading-normal">{tool.desc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 10: LEARNING HUB & ACADEMY */}
      <section className="bg-white border border-[#E2E8F0] rounded-[28px] p-5 md:p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-[#0F172A] mb-4 flex items-center gap-1">
            <BookOpen className="w-4.5 h-4.5 text-[#2563EB]" /> Wealth Intelligence Academy
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex gap-3.5 items-start">
              <span className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <Play className="w-4 h-4 fill-blue-600" />
              </span>
              <div>
                <span className="text-xs font-black text-[#0F172A] block">Option Spread Strategies for Swing Trading</span>
                <span className="text-[9px] text-[#64748B] mt-1 block uppercase">Video Course • 15 Mins</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl flex gap-3.5 items-start">
              <span className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-black text-[#0F172A] block">Asset Allocation Directives in High-VIX regimes</span>
                <span className="text-[9px] text-[#64748B] mt-1 block uppercase">Advisory Article • 8 Mins Read</span>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full text-center text-xs font-bold text-[#2563EB] hover:underline mt-4 pt-3 border-t border-slate-100">
          Go to Wealth Academy Center
        </button>
      </section>

      {/* Advisory compliance disclaimer */}
      <footer className="bg-slate-50 border border-[#E2E8F0] p-4 rounded-2xl flex items-start gap-2.5 text-[9.5px] text-slate-500 leading-relaxed select-none">
        <ShieldCheck className="w-4.5 h-4.5 text-[#16A34A] shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-[#0F172A]">SEBI Advisory Regulatory Disclosure</span>
          <p className="mt-0.5">
            Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. Investment in securities market are subject to market risks. Read all the related documents carefully before investing.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default HomeDashboard;
