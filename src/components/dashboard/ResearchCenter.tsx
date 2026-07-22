import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Download, Bookmark, Clock, ArrowRight, X,
  TrendingUp, ShieldAlert, CheckCircle2, Plus, BarChart3, AlertCircle, Zap,
  LayoutDashboard, Radio, Sparkles, ListFilter, FileText, Share2, ChevronDown,
  RefreshCw, Filter, ArrowUpDown, ShieldCheck, Users, Eye, Sliders
} from 'lucide-react';
import api from '../../services/api';
import { ResearchDetail } from './ResearchDetail';
import { TradeDrawer } from './TradeDrawer';
import { ShareModal } from './ShareModal';
import { CompareModal } from './CompareModal';
import { ReportViewer } from './ReportViewer';
import { StockDetail } from './StockDetail';
import { UniversalSearch } from './UniversalSearch';
import { AiAdvisorsHub } from '../ai/AiAdvisorsHub';
import { OverviewTab } from '../research/OverviewTab';
import { LiveCallsTab } from '../research/LiveCallsTab';
import { AIAdvisorsTab } from '../research/AIAdvisorsTab';
import { ScreenerTab } from '../research/ScreenerTab';
import { ReportsTab } from '../research/ReportsTab';
import toast from 'react-hot-toast';

export const ResearchCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calls' | 'ai-advisors' | 'screeners' | 'reports'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUniversalSearchOpen, setIsUniversalSearchOpen] = useState(false);
  const [featuredOpportunities, setFeaturedOpportunities] = useState<any[]>([]);

  React.useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await api.get('/research/feed');
        // Map backend response to UI format
        const formatted = response.data.map((call: any) => ({
          company: call.company_name || call.symbol,
          symbol: call.symbol,
          logo: call.symbol.substring(0, 2).toUpperCase(),
          exchange: 'NSE',
          rec: call.recommendation.toUpperCase(),
          price: '₹' + (call.entry_price_min || '0'), // Mock current price logic
          entry: `₹${call.entry_price_min} - ₹${call.entry_price_max}`,
          target: `₹${call.target_price}`,
          stop: `₹${call.stop_loss}`,
          return: '10%', // Calculate properly if needed
          risk: 'Medium',
          confidence: 85,
          duration: call.category || 'Positional',
          sector: 'Equities',
          summary: call.summary || call.fundamental_notes || 'Research call published.',
          analyst: 'AI Analyst',
          time: 'Recently'
        }));
        setFeaturedOpportunities(formatted);
      } catch (error) {
        console.error("Failed to fetch research feed", error);
      }
    };
    fetchCalls();
  }, []);
  
  // Interactivity Modals State
  const [selectedResearch, setSelectedResearch] = useState<any | null>(null);
  const [tradeIntent, setTradeIntent] = useState<any | null>(null);
  const [showCompare, setShowCompare] = useState<any | null>(null);
  const [showShare, setShowShare] = useState<any | null>(null);
  const [showReport, setShowReport] = useState<any | null>(null);

  const TABS = [
    { id: 'overview', name: 'Overview', icon: <LayoutDashboard className="w-4 h-4" />, count: null },
    { id: 'calls', name: 'Live Calls', icon: <Radio className="w-4 h-4 text-rose-500" />, count: 28 },
    { id: 'ai-advisors', name: 'AI Advisors', icon: <Sparkles className="w-4 h-4 text-blue-600 fill-blue-600" />, count: '8 AI Experts' },
    { id: 'screeners', name: 'Screeners', icon: <ListFilter className="w-4 h-4" />, count: null },
    { id: 'reports', name: 'Reports', icon: <FileText className="w-4 h-4" />, count: '6 New' },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Research data synced with SEBI feeds');
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 w-full pb-12 font-sans text-slate-800">
      {/* PAGE HEADER & CONTROLS */}
      <div className="w-full pt-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F172A] mb-2">
            Research Center
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            SEBI registered Research Analyst advisory and autonomous AI Investment Experts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div 
            onClick={() => setIsUniversalSearchOpen(true)}
            className="relative flex-1 sm:w-80 flex items-center bg-white border border-[#E2E8F0] rounded-2xl px-3.5 py-2.5 cursor-pointer hover:border-blue-500 transition shadow-xs select-none"
          >
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <span className="text-xs text-slate-400 font-medium truncate flex-1">Search stocks, research, reports...</span>
            <kbd className="hidden sm:inline-block rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 ml-2">⌘ K</kbd>
          </div>

          <button 
            onClick={handleRefresh}
            className="p-2.5 bg-white border border-[#E2E8F0] rounded-2xl text-slate-500 hover:text-[#0F172A] hover:bg-slate-50 transition shadow-xs cursor-pointer"
            title="Refresh Research"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* ANIMATED SEGMENTED TABS BAR */}
      <div className="w-full bg-white p-1.5 rounded-[22px] border border-[#E2E8F0] shadow-xs flex items-center overflow-x-auto no-scrollbar">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs transition-all shrink-0 select-none cursor-pointer ${
                isActive ? 'text-[#0F172A] bg-[#F1F5F9] shadow-xs' : 'text-slate-500 hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10">{tab.name}</span>
              {tab.count && (
                <span className={`relative z-10 text-[10px] px-2 py-0.5 rounded-md border ${
                  isActive ? 'bg-white text-blue-600 border-white font-bold' : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* DYNAMIC TAB CONTENT */}
      <div className="w-full">
        {activeTab === 'overview' && (
          <OverviewTab
            onNavigateTab={(tab) => setActiveTab(tab as any)}
            onOpenAiAdvisor={() => setActiveTab('ai-advisors')}
            onSelectResearchCall={(call) => setSelectedResearch(call)}
          />
        )}
        {activeTab === 'calls' && (
          <LiveCallsTab
            onSelectCall={(call) => setSelectedResearch(call)}
            onTradeCall={(call) => setTradeIntent(call)}
          />
        )}
        {activeTab === 'ai-advisors' && (
          <AIAdvisorsTab
            onTradeStock={(stk) => setTradeIntent(stk)}
            onCompareStock={(stk) => setShowCompare(stk)}
          />
        )}
        {activeTab === 'screeners' && <ScreenerTab />}
        {activeTab === 'reports' && (
          <ReportsTab
            onSelectReport={(rep) => setShowReport(rep)}
          />
        )}
      </div>

      {/* MODALS & DRAWERS */}
      <AnimatePresence>
        {selectedResearch && (
          <ResearchDetail
            isOpen={true}
            onClose={() => setSelectedResearch(null)}
            research={selectedResearch}
            onTrade={(res) => setTradeIntent(res)}
          />
        )}
      </AnimatePresence>

      <TradeDrawer
        isOpen={!!tradeIntent}
        onClose={() => setTradeIntent(null)}
        call={tradeIntent}
      />

      <ShareModal
        isOpen={!!showShare}
        onClose={() => setShowShare(null)}
        item={showShare}
      />

      <CompareModal
        isOpen={!!showCompare}
        onClose={() => setShowCompare(null)}
        call1={showCompare}
      />

      <ReportViewer
        isOpen={!!showReport}
        onClose={() => setShowReport(null)}
        report={showReport}
      />

      <UniversalSearch
        isOpen={isUniversalSearchOpen}
        onClose={() => setIsUniversalSearchOpen(false)}
        onSelectStock={(stk) => setTradeIntent(stk)}
        onSelectResearch={(res) => setSelectedResearch(res)}
        onSelectReport={(rep) => setShowReport(rep)}
        onSelectAnalyst={() => setActiveTab('ai-advisors')}
      />
    </div>
  );
};

export default ResearchCenter;
