import React, { useState } from 'react';
import { 
  TrendingUp, Briefcase, GraduationCap, Sparkles, ArrowRight, 
  Zap, HelpCircle, ShieldCheck, MessageSquare 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AI_ADVISORS_LIST, type AiAdvisorConfig, AiAdvisorWorkspaceModal } from '../ai/AiAdvisorWorkspaceModal';

interface AIAdvisorsTabProps {
  onTradeStock?: (stock: any) => void;
  onCompareStock?: (stock: any) => void;
}

export const AIAdvisorsTab: React.FC<AIAdvisorsTabProps> = ({
  onTradeStock,
  onCompareStock
}) => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<AiAdvisorConfig | null>(null);

  // Top 3 Featured AI Advisors
  const featuredAdvisors = [
    {
      id: 'market-strategist',
      name: 'Market Analyst',
      tagline: 'Stocks, Technicals & Market Intelligence',
      icon: TrendingUp,
      colorFrom: 'from-blue-600',
      colorTo: 'to-indigo-700',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      capabilities: ['Real-time market analysis', 'Technical indicators (RSI, MACD)', 'News impact analysis', 'Sector rotation insights'],
      samplePrompts: ['What is driving NIFTY today?', 'Analyze Tata Steel chart for breakout', 'Explain today RBI policy impact']
    },
    {
      id: 'portfolio-advisor',
      name: 'Portfolio Advisor',
      tagline: 'Portfolio Health, Risk & Wealth Planning',
      icon: Briefcase,
      colorFrom: 'from-emerald-600',
      colorTo: 'to-teal-700',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      capabilities: ['Portfolio health scoring', 'Risk assessment & position sizing', 'Goal-based planning (SIP, Retirement)', 'Rebalancing recommendations'],
      samplePrompts: ['Review my portfolio health & risk', 'Create a retirement plan for 2040', 'Suggest rebalancing strategy']
    },
    {
      id: 'investment-coach',
      name: 'Investment Coach',
      tagline: 'Learn Investing in Plain English',
      icon: GraduationCap,
      colorFrom: 'from-purple-600',
      colorTo: 'to-indigo-800',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      capabilities: ['Explain financial concepts simply', 'Answer beginner questions', 'Guide on investing basics', 'Interactive learning'],
      samplePrompts: ['Explain P/E ratio like I am 12', 'Difference between mutual funds and ETFs', 'How does options trading work?']
    }
  ];

  const handleOpenWorkspace = (advId: string) => {
    const found = AI_ADVISORS_LIST.find((a) => a.id === advId) || AI_ADVISORS_LIST[0];
    setSelectedAdvisor(found);
  };

  return (
    <div className="flex flex-col gap-8 w-full font-sans text-slate-800 animate-in fade-in duration-300">
      
      {/* 3.2 SMART ADVISOR SELECTION BANNER */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-[24px] shadow-md border border-blue-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400">
            <Sparkles className="w-6 h-6 fill-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                Autonomous AI Advisory Engine
              </span>
            </div>
            <h2 className="text-xl font-black tracking-tight">Consult Your Specialized AI Investment Experts</h2>
            <p className="text-slate-300 text-xs mt-1">Get instantaneous answers on market trends, portfolio health, or complex financial concepts.</p>
          </div>
        </div>

        <button
          onClick={() => handleOpenWorkspace('market-strategist')}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-xs transition shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
        >
          <span>Ask Market Analyst Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3.1 3 FEATURED ADVISOR CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredAdvisors.map((adv) => {
          const Icon = adv.icon;
          return (
            <motion.div
              key={adv.id}
              whileHover={{ y: -4 }}
              className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs hover:shadow-xl hover:border-blue-200 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${adv.colorFrom} ${adv.colorTo} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${adv.badgeColor}`}>
                    ● Available
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#0F172A] leading-tight group-hover:text-blue-600 transition-colors">
                  {adv.name}
                </h3>
                <span className="text-xs font-bold text-slate-400 block mt-0.5 mb-4">
                  {adv.tagline}
                </span>

                <div className="flex flex-col gap-1.5 mb-6">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Key Capabilities</span>
                  {adv.capabilities.map((cap, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Sample Questions</span>
                <div className="flex flex-col gap-1.5">
                  {adv.samplePrompts.map((prompt, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => handleOpenWorkspace(adv.id)}
                      className="text-[11px] font-bold text-slate-700 hover:text-blue-600 text-left transition truncate cursor-pointer"
                    >
                      • {prompt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleOpenWorkspace(adv.id)}
                  className={`w-full mt-2 py-3 bg-gradient-to-r ${adv.colorFrom} ${adv.colorTo} text-white rounded-xl font-black text-xs transition shadow-sm flex items-center justify-center gap-2 cursor-pointer`}
                >
                  <span>Open Advisor Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* WORKSPACE MODAL INTEGRATION */}
      <AiAdvisorWorkspaceModal
        isOpen={!!selectedAdvisor}
        onClose={() => setSelectedAdvisor(null)}
        advisor={selectedAdvisor}
        onTradeStock={onTradeStock}
        onCompareStock={onCompareStock}
      />
    </div>
  );
};

export default AIAdvisorsTab;
