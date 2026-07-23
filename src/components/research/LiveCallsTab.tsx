import React, { useState, useMemo } from 'react';
import { 
  Radio, Search, Filter, ShieldCheck, ArrowRight, ArrowUpRight, 
  BarChart3, RefreshCw, ChevronLeft, ChevronRight, Bookmark, Share2, GitCompare
} from 'lucide-react';
import { motion } from 'framer-motion';

export interface ResearchCallItem {
  id: string;
  symbol: string;
  companyName: string;
  exchange: 'NSE' | 'BSE' | 'MCX';
  recommendation: 'BUY' | 'SELL' | 'HOLD' | 'ACCUMULATE';
  entryRange: string;
  targetPrice: number;
  stopLoss: number;
  currentPrice: number;
  potentialReturn: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  confidenceScore: number;
  horizon: 'Intraday' | 'Swing' | 'Long Term';
  sebiRegNo: string;
  analystName: string;
  summary: string;
  status: 'ACTIVE' | 'TARGET_HIT' | 'STOP_LOSS_HIT' | 'CLOSED';
}

export const MOCK_RESEARCH_CALLS: ResearchCallItem[] = [
  {
    id: 'rc-1',
    symbol: 'RELIANCE',
    companyName: 'Reliance Industries Ltd',
    exchange: 'NSE',
    recommendation: 'BUY',
    entryRange: '₹2,920 - ₹2,940',
    targetPrice: 3160,
    stopLoss: 2838,
    currentPrice: 2934.50,
    potentialReturn: 14.2,
    riskLevel: 'Low',
    confidenceScore: 92,
    horizon: 'Swing',
    sebiRegNo: 'INH000009821',
    analystName: 'Aarav Mehta',
    summary: 'Consolidation breakout verified on daily frames. Hydrogen commissioning projected to trigger re-rating.',
    status: 'ACTIVE'
  },
  {
    id: 'rc-2',
    symbol: 'HDFCBANK',
    companyName: 'HDFC Bank Limited',
    exchange: 'NSE',
    recommendation: 'BUY',
    entryRange: '₹1,675 - ₹1,685',
    targetPrice: 1840,
    stopLoss: 1610,
    currentPrice: 1682.40,
    potentialReturn: 12.5,
    riskLevel: 'Low',
    confidenceScore: 88,
    horizon: 'Long Term',
    sebiRegNo: 'INH000004523',
    analystName: 'Neha Shah',
    summary: 'Q1 net interest margin bottomed out. Credit growth expanding 16% YoY across retail sectors.',
    status: 'ACTIVE'
  },
  {
    id: 'rc-3',
    symbol: 'TATASTEEL',
    companyName: 'Tata Steel Limited',
    exchange: 'NSE',
    recommendation: 'BUY',
    entryRange: '₹142 - ₹145',
    targetPrice: 168,
    stopLoss: 136,
    currentPrice: 147.20,
    potentialReturn: 18.4,
    riskLevel: 'Medium',
    confidenceScore: 85,
    horizon: 'Swing',
    sebiRegNo: 'INH000009821',
    analystName: 'Aarav Mehta',
    summary: 'UK plant transition subvention received. European spreads normalizing with lower coking coal costs.',
    status: 'TARGET_HIT'
  },
  {
    id: 'rc-4',
    symbol: 'INFY',
    companyName: 'Infosys Limited',
    exchange: 'NSE',
    recommendation: 'HOLD',
    entryRange: '₹1,560 - ₹1,570',
    targetPrice: 1650,
    stopLoss: 1520,
    currentPrice: 1562.10,
    potentialReturn: 5.6,
    riskLevel: 'Medium',
    confidenceScore: 78,
    horizon: 'Intraday',
    sebiRegNo: 'INH000007812',
    analystName: 'Vikram Roy',
    summary: 'Large deal TCV remains healthy at $2.4B, but discretionary IT spend commentary remains cautious.',
    status: 'ACTIVE'
  },
  {
    id: 'rc-5',
    symbol: 'TCS',
    companyName: 'Tata Consultancy Services',
    exchange: 'NSE',
    recommendation: 'BUY',
    entryRange: '₹4,150 - ₹4,180',
    targetPrice: 4450,
    stopLoss: 4050,
    currentPrice: 4185.10,
    potentialReturn: 8.5,
    riskLevel: 'Low',
    confidenceScore: 90,
    horizon: 'Swing',
    sebiRegNo: 'INH000004523',
    analystName: 'Neha Shah',
    summary: 'Forming ascending triangle consolidation. Cloud migration deal momentum accelerating in UK market.',
    status: 'ACTIVE'
  },
  {
    id: 'rc-6',
    symbol: 'ICICIBANK',
    companyName: 'ICICI Bank Limited',
    exchange: 'NSE',
    recommendation: 'BUY',
    entryRange: '₹1,230 - ₹1,245',
    targetPrice: 1380,
    stopLoss: 1190,
    currentPrice: 1240.50,
    potentialReturn: 11.2,
    riskLevel: 'Low',
    confidenceScore: 94,
    horizon: 'Long Term',
    sebiRegNo: 'INH000009821',
    analystName: 'Aarav Mehta',
    summary: 'Industry-leading ROA of 2.3%. Asset quality continues to outperform private sector peers.',
    status: 'ACTIVE'
  }
];

export interface LiveCallsTabProps {
  onSelectCall?: (call: ResearchCallItem) => void;
  onTradeCall?: (call: ResearchCallItem) => void;
  calls?: ResearchCallItem[];
}

export const LiveCallsTab: React.FC<LiveCallsTabProps> = ({
  onSelectCall,
  onTradeCall,
  calls = []
}) => {
  const [recFilter, setRecFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [horizonFilter, setHorizonFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  
  const activeData = calls.length > 0 ? calls : MOCK_RESEARCH_CALLS;

  const filteredCalls = useMemo(() => {
    return activeData.filter((call) => {
      const matchesRec = recFilter === 'All' || call.recommendation === recFilter;
      const matchesRisk = riskFilter === 'All' || call.riskLevel === riskFilter;
      const matchesHorizon = horizonFilter === 'All' || call.horizon === horizonFilter;
      const matchesSearch = 
        call.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.analystName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRec && matchesRisk && matchesHorizon && matchesSearch;
    });
  }, [recFilter, riskFilter, horizonFilter, searchQuery]);

  const totalPages = Math.ceil(filteredCalls.length / pageSize) || 1;
  const paginatedCalls = filteredCalls.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-slate-800 animate-in fade-in duration-300">
      
      {/* 2.1 FILTER BAR */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto text-xs font-bold">
          {/* Recommendation Filter */}
          <select
            value={recFilter}
            onChange={(e) => setRecFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="BUY">BUY Calls</option>
            <option value="HOLD">HOLD Calls</option>
            <option value="SELL">SELL Calls</option>
          </select>

          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="All">All Risk</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>

          {/* Horizon Filter */}
          <select
            value={horizonFilter}
            onChange={(e) => setHorizonFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="All">All Horizons</option>
            <option value="Intraday">Intraday</option>
            <option value="Swing">Swing</option>
            <option value="Long Term">Long Term</option>
          </select>

          {(recFilter !== 'All' || riskFilter !== 'All' || horizonFilter !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => {
                setRecFilter('All');
                setRiskFilter('All');
                setHorizonFilter('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-rose-600 hover:underline px-2 cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search symbol, company, analyst..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-xs font-medium outline-none transition"
          />
        </div>
      </div>

      {/* RESULT COUNT BAR */}
      <div className="flex justify-between items-center text-xs font-bold text-slate-500">
        <span>Showing {filteredCalls.length} SEBI Certified Research Calls</span>
        <span className="flex items-center gap-1 text-emerald-600">
          <ShieldCheck className="w-4 h-4" /> SEBI RA Verified
        </span>
      </div>

      {/* 2.2 RESEARCH CALLS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedCalls.map((call) => (
          <motion.div
            key={call.id}
            whileHover={{ y: -3 }}
            className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header Info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#0F172A] text-white font-black text-xs flex items-center justify-center shadow-xs">
                    {call.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-base text-[#0F172A]">{call.symbol}</h3>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase">
                        {call.exchange}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium block truncate max-w-[180px]">
                      {call.companyName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase shadow-2xs ${
                    call.recommendation === 'BUY' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {call.recommendation}
                  </span>
                </div>
              </div>

              {/* Price Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl mb-4 text-xs font-bold">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-bold">Entry Range</span>
                  <span className="text-slate-900 font-black">{call.entryRange}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-bold">Target Price</span>
                  <span className="text-emerald-600 font-black">₹{call.targetPrice}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-bold">Stop Loss</span>
                  <span className="text-rose-600 font-black">₹{call.stopLoss}</span>
                </div>
              </div>

              {/* Rationale Summary */}
              <p className="text-slate-600 text-xs font-medium leading-relaxed mb-4 line-clamp-2">
                {call.summary}
              </p>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10.5px] font-bold text-slate-500">
                <span>By {call.analystName}</span>
                <span>•</span>
                <span className="text-blue-600 font-black">{call.potentialReturn}% Return</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectCall(call)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-extrabold transition cursor-pointer"
                >
                  Details
                </button>
                <button
                  onClick={() => onTradeCall(call)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black transition cursor-pointer shadow-xs"
                >
                  Trade Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs font-bold">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-2 rounded-xl border bg-white disabled:opacity-40 flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-2 rounded-xl border bg-white disabled:opacity-40 flex items-center gap-1 cursor-pointer"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LiveCallsTab;
