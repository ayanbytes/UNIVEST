import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Clock, Bookmark, Share2, Wallet, 
  ArrowRight, CheckCircle2, Zap, ShieldCheck, BarChart3,
  Building2, MessageSquare, ChevronRight, ExternalLink, Sparkles, AlertCircle, FileText
} from 'lucide-react';
import toast from 'react-hot-toast';

interface NewsDetailProps {
  isOpen: boolean;
  onClose: () => void;
  newsItem: any;
  onOpenCompany?: (symbol: string) => void;
  onOpenResearch?: (researchData: any) => void;
  onTrade?: (tradeData: any) => void;
}

export const NewsDetail: React.FC<NewsDetailProps> = ({
  isOpen,
  onClose,
  newsItem,
  onOpenCompany,
  onOpenResearch,
  onTrade
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!isOpen || !newsItem) return null;

  const headline = newsItem.headline || newsItem.title || 'RBI Monetary Policy: Repo Rate Held Steady at 6.50% Amid Inflation Control';
  const source = newsItem.source || 'Bloomberg Intelligence';
  const time = newsItem.time || '15 min ago';
  const readTime = newsItem.readTime || '3 min read';
  const category = newsItem.category || 'Economy & Policy';
  const image = newsItem.image || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop';
  const sentiment = newsItem.sentiment || 'Bullish';
  const affectedStocks = newsItem.stocks || ['HDFCBANK', 'ICICIBANK', 'RELIANCE', 'LT'];
  const summary = newsItem.summary || 'The Reserve Bank of India maintained its key policy rates unchanged while reiterating commitment to bring retail inflation closer to the 4% target. Banking stocks responded positively to liquidity measures.';
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from Bookmarks' : 'Article saved to Saved Intelligence');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-[#F8FAFC] overflow-y-auto flex flex-col justify-between"
    >
      {/* TOP HEADER BAR */}
      <header className="sticky top-0 bg-white border-b border-[#E2E8F0] px-6 py-4 flex flex-wrap items-center justify-between z-30 shadow-xs gap-4">
        
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Market Intelligence
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-100 uppercase">
              {category}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {source} · {time} · {readTime}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleBookmark}
            className={`w-10 h-10 rounded-xl border border-[#E2E8F0] flex items-center justify-center transition ${
              isBookmarked ? 'bg-blue-50 text-blue-600 border-blue-200' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <Bookmark className="w-4.5 h-4.5" fill={isBookmarked ? '#2563EB' : 'none'} />
          </button>

          <button
            onClick={() => toast.success('Article link copied to clipboard')}
            className="w-10 h-10 rounded-xl border border-[#E2E8F0] flex items-center justify-center text-slate-500 hover:bg-slate-50 transition"
          >
            <Share2 className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={() => {
              if (onOpenCompany) onOpenCompany(affectedStocks[0]);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#0F172A] text-white font-black text-xs hover:bg-slate-800 transition"
          >
            Open ${affectedStocks[0]} Workspace
          </button>
        </div>
      </header>

      {/* MAIN ARTICLE BODY */}
      <main className="max-w-5xl mx-auto w-full p-6 sm:p-10 flex flex-col gap-8 flex-1">
        
        {/* Article Title Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase ${
              sentiment === 'Bullish' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {sentiment} Market Impact
            </span>
            <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" /> AI Verified Analysis
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] leading-tight">
            {headline}
          </h1>
        </div>

        {/* Hero Image */}
        <div className="relative h-80 sm:h-96 w-full rounded-[28px] overflow-hidden shadow-lg border border-[#E2E8F0]">
          <img src={image} alt={headline} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
            <span className="text-white text-xs font-bold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
              Source: {source} Intelligence Bureau
            </span>
          </div>
        </div>

        {/* AI Executive Summary Card */}
        <section className="bg-blue-50/70 border border-blue-200/80 rounded-[24px] p-6 sm:p-8 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600 fill-blue-600 animate-pulse" /> AI INVESTMENT THESIS & KEY TAKEAWAYS
            </span>
            <span className="text-[10px] font-black text-blue-600 bg-white px-2.5 py-1 rounded-md border border-blue-100">
              96% AI Conviction
            </span>
          </div>

          <p className="text-sm font-medium text-slate-800 leading-relaxed">
            {summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-blue-200/60 text-xs">
            <div className="bg-white p-3 rounded-xl border border-blue-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Primary Sector Impact</span>
              <strong className="text-[#0F172A]">Banking & Financials (+1.8%)</strong>
            </div>
            <div className="bg-white p-3 rounded-xl border border-blue-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Recommended Strategy</span>
              <strong className="text-emerald-700">Accumulate Large-cap Banks</strong>
            </div>
            <div className="bg-white p-3 rounded-xl border border-blue-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">Volatility Expectation</span>
              <strong className="text-blue-700">Low Volatility Ahead</strong>
            </div>
          </div>
        </section>

        {/* Affected Stocks Grid */}
        <section className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-base font-black text-[#0F172A]">Directly Impacted Securities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {affectedStocks.map((st: string) => (
              <div key={st} className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-[#0F172A]">{st}</span>
                  <span className="text-[10px] font-extrabold text-emerald-600">▲ +1.6%</span>
                </div>
                <button
                  onClick={() => {
                    if (onOpenCompany) onOpenCompany(st);
                  }}
                  className="w-full py-2 rounded-xl bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[10px] font-black text-blue-600 transition text-center"
                >
                  View Workspace
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Article Text Content */}
        <section className="bg-white rounded-[24px] border border-[#E2E8F0] p-8 shadow-sm text-slate-700 leading-relaxed font-medium flex flex-col gap-4 text-sm">
          <h3 className="text-xl font-black text-[#0F172A]">Detailed Breakdown</h3>
          <p>
            The Monetary Policy Committee (MPC) voted unanimously to maintain the repo rate at 6.50%. Governor Shaktikanta Das highlighted that while core inflation has softened substantially over recent quarters, persistent food inflation requires continued vigilance.
          </p>
          <p>
            System liquidity has returned to neutral, providing major commercial lenders like HDFC Bank and ICICI Bank room to expand net interest margins without raising deposit rates aggressively. Analysts expect credit growth in corporate and retail loan books to remain buoyant at 14–16% YoY.
          </p>
        </section>

      </main>

      {/* STICKY BOTTOM ACTIONS BAR */}
      <footer className="sticky bottom-0 bg-white border-t border-[#E2E8F0] p-5 z-30 flex items-center justify-between gap-4 shadow-lg">
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-400">Impacted Asset:</span>
          <span className="font-black text-[#0F172A]">${affectedStocks[0]} · NSE</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => {
              if (onOpenResearch) onOpenResearch({ symbol: affectedStocks[0], company: headline });
            }}
            className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition"
          >
            Read Advisory Research
          </button>

          <button
            onClick={() => {
              if (onTrade) onTrade({ symbol: affectedStocks[0], company: affectedStocks[0], rec: 'BUY' });
            }}
            className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition shadow-md"
          >
            Trade {affectedStocks[0]}
          </button>
        </div>
      </footer>

    </motion.div>
  );
};
