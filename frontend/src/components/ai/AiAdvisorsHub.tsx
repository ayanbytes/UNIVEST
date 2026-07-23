import React, { useState, useMemo } from 'react';
import { 
  Sparkles, TrendingUp, BarChart3, CandlestickChart, Briefcase, Target, Newspaper, 
  ShieldAlert, GraduationCap, ArrowRight, ShieldCheck, Zap, RefreshCw, Compass, Search, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AI_ADVISORS_LIST, type AiAdvisorConfig, AiAdvisorWorkspaceModal } from './AiAdvisorWorkspaceModal';
import toast from 'react-hot-toast';

interface AiAdvisorsHubProps {
  onTradeStock?: (stock: any) => void;
  onCompareStock?: (stock: any) => void;
  initialAdvisorId?: string;
  contextMode?: 'market_open' | 'portfolio' | 'news' | 'chart' | 'invest';
}

export const AiAdvisorsHub: React.FC<AiAdvisorsHubProps> = ({
  onTradeStock,
  onCompareStock,
  initialAdvisorId,
  contextMode = 'market_open'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAdvisor, setActiveAdvisor] = useState<AiAdvisorConfig | null>(null);
  const [currentContext, setCurrentContext] = useState<'market_open' | 'portfolio' | 'news' | 'chart' | 'invest'>(contextMode);

  // Determine Proactive Recommended Advisor based on context
  const recommendedAdvisor = useMemo(() => {
    switch (currentContext) {
      case 'market_open':
        return AI_ADVISORS_LIST.find((a) => a.id === 'market-strategist') || AI_ADVISORS_LIST[0];
      case 'portfolio':
        return AI_ADVISORS_LIST.find((a) => a.id === 'portfolio-advisor') || AI_ADVISORS_LIST[3];
      case 'news':
        return AI_ADVISORS_LIST.find((a) => a.id === 'news-intelligence') || AI_ADVISORS_LIST[5];
      case 'chart':
        return AI_ADVISORS_LIST.find((a) => a.id === 'technical-analyst') || AI_ADVISORS_LIST[2];
      case 'invest':
        return AI_ADVISORS_LIST.find((a) => a.id === 'stock-analyst') || AI_ADVISORS_LIST[1];
      default:
        return AI_ADVISORS_LIST[0];
    }
  }, [currentContext]);

  // Filtered Advisors
  const filteredAdvisors = useMemo(() => {
    return AI_ADVISORS_LIST.filter((adv) => {
      const matchesCategory = selectedCategory === 'All' || adv.category === selectedCategory;
      const matchesSearch = 
        adv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        adv.primaryExpertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenAdvisor = (adv: AiAdvisorConfig) => {
    setActiveAdvisor(adv);
  };

  const categories = ['All', 'Market & Trading', 'Portfolio & Wealth', 'Analysis & News', 'Learning'];

  return (
    <div className="flex flex-col gap-8 w-full font-sans text-slate-800 animate-in fade-in duration-500 pb-16">
      
      {/* 1. HERO HEADER */}
      <div className="relative overflow-hidden rounded-[28px] p-6 md:p-8 shadow-premium bg-[#0F172A] text-white border border-slate-800">
        {/* Background glow effects */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 fill-white" /> Autonomous AI Investment Team
              </span>
            </div>
            <h1 className="text-2xl md:text-[34px] leading-tight font-black tracking-tight">
              AI Investment Advisors
            </h1>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl font-medium leading-relaxed">
              Your personalized team of 8 specialized AI Investment Experts working together to analyze markets, companies, portfolio risk, and goals.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 border border-white/15 p-3 rounded-2xl backdrop-blur-md shrink-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">Advisor Engine</span>
              <span className="text-xs font-black text-white flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 8 Experts Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PROACTIVE CONTEXT-AWARE RECOMMENDED ADVISOR CARD */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-[24px] p-6 shadow-xl border border-blue-800/60 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex gap-4 items-start">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${recommendedAdvisor.colorFrom} ${recommendedAdvisor.colorTo} border border-white/30 flex items-center justify-center shadow-lg shrink-0`}>
              <recommendedAdvisor.icon className="w-7 h-7 text-white" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" /> Recommended For You Right Now
                </span>
                <span className="text-[10px] font-bold text-slate-400 hidden sm:inline">
                  (Context: {currentContext.replace('_', ' ').toUpperCase()})
                </span>
              </div>

              <h3 className="text-lg font-black tracking-tight">{recommendedAdvisor.name}</h3>
              <p className="text-slate-300 text-xs mt-0.5 max-w-xl font-medium">
                {recommendedAdvisor.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Context Switcher pills for demo */}
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl text-[10px] font-bold text-slate-300 w-full sm:w-auto overflow-x-auto">
              <span className="px-2 text-slate-400 shrink-0">Context:</span>
              {(['market_open', 'portfolio', 'news', 'chart', 'invest'] as const).map((ctx) => (
                <button
                  key={ctx}
                  onClick={() => setCurrentContext(ctx)}
                  className={`px-2.5 py-1 rounded-lg transition-all capitalize whitespace-nowrap cursor-pointer ${
                    currentContext === ctx ? 'bg-blue-600 text-white font-black' : 'hover:text-white'
                  }`}
                >
                  {ctx.replace('_', ' ')}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleOpenAdvisor(recommendedAdvisor)}
              className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl font-black text-xs transition shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Consult {recommendedAdvisor.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. CATEGORIES & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-white border border-[#E2E8F0] rounded-2xl w-full sm:w-auto shadow-2xs overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-slate-500 hover:text-[#0F172A]'
              }`}
            >
              {cat === 'All' ? 'All Advisors (8)' : cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search AI Advisor or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] focus:border-blue-600 rounded-2xl text-xs font-medium outline-none transition shadow-2xs"
          />
        </div>
      </div>

      {/* 4. ADVISORS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAdvisors.map((advisor) => {
          const Icon = advisor.icon;
          return (
            <motion.div
              key={advisor.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Card Gradient Bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${advisor.colorFrom} ${advisor.colorTo} absolute top-0 left-0 right-0`} />

              <div>
                {/* Advisor Avatar Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${advisor.colorFrom} ${advisor.colorTo} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border flex items-center gap-1 ${advisor.badgeColor}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Available
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="text-lg font-black text-[#0F172A] leading-tight group-hover:text-blue-600 transition-colors">
                  {advisor.name}
                </h3>
                <span className="text-[11px] font-bold text-slate-500 block mt-0.5 mb-3">
                  {advisor.roleTitle}
                </span>

                <p className="text-slate-600 text-xs font-medium leading-relaxed mb-4">
                  {advisor.description}
                </p>

                {/* Primary Expertise Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {advisor.primaryExpertise.slice(0, 3).map((exp, idx) => (
                    <span key={idx} className="text-[10px] font-bold bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200/60">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions & Prompts */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Suggested Questions</span>
                <div className="flex flex-col gap-1.5">
                  {advisor.suggestedPrompts.slice(0, 2).map((prompt, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => handleOpenAdvisor(advisor)}
                      className="text-[11px] font-bold text-slate-700 hover:text-blue-600 text-left line-clamp-1 transition flex items-center gap-1 cursor-pointer"
                    >
                      <span className="text-blue-500">•</span> {prompt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleOpenAdvisor(advisor)}
                  className={`w-full mt-2 py-3 bg-gradient-to-r ${advisor.colorFrom} ${advisor.colorTo} hover:opacity-95 text-white rounded-xl font-black text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer`}
                >
                  <span>Open Advisor Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 5. ADVISOR WORKSPACE MODAL */}
      <AiAdvisorWorkspaceModal
        isOpen={!!activeAdvisor}
        onClose={() => setActiveAdvisor(null)}
        advisor={activeAdvisor}
        onTradeStock={onTradeStock}
        onCompareStock={onCompareStock}
      />

    </div>
  );
};

export default AiAdvisorsHub;
