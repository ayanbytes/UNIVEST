import React from 'react';
import { 
  TrendingUp, Radio, Sparkles, FileText, ArrowRight, ShieldCheck, 
  CheckCircle2, Clock, Zap, BarChart3, ChevronRight, Activity, ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../services/api';

interface OverviewTabProps {
  onNavigateTab: (tabId: string) => void;
  onOpenAiAdvisor: (advisorId?: string) => void;
  onSelectResearchCall?: (call: any) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  onNavigateTab,
  onOpenAiAdvisor,
  onSelectResearchCall
}) => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  React.useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data } = await api.get('/analytics/leaderboard');
        setLeaderboard(data);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      }
    };
    fetchLeaderboard();
  }, []);

  const stats = [
    { title: 'Active Calls', value: '12', trend: '+2 this week', icon: Radio, color: 'text-rose-600 bg-rose-50 border-rose-200' },
    { title: 'Calls This Month', value: '28', trend: '+18% vs June', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { title: 'AI Experts Active', value: '8', trend: '100% Online', icon: Sparkles, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { title: 'Reports Published', value: '6', trend: '+50% YoY', icon: FileText, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  ];

  const indices = [
    { name: 'NIFTY 50', value: '22,145.80', change: '+0.68%', positive: true },
    { name: 'SENSEX', value: '73,852.20', change: '+0.72%', positive: true },
    { name: 'BANK NIFTY', value: '48,245.30', change: '+0.45%', positive: true },
    { name: 'INDIA VIX', value: '14.32', change: '-2.10%', positive: false },
  ];

  const recentActivity = [
    { time: '10 mins ago', type: 'NEW_CALL', title: 'New BUY Call: RELIANCE (Target ₹3,160)', badge: 'SEBI Approved', color: 'bg-emerald-100 text-emerald-800' },
    { time: '45 mins ago', type: 'TARGET_HIT', title: 'Target Met: TATASTEEL hit ₹147.20 (+14%)', badge: 'Target Hit', color: 'bg-blue-100 text-blue-800' },
    { time: '2 hours ago', type: 'AI_INSIGHT', title: 'Market Strategist: Banking Sector Rotation Signal', badge: 'AI Insight', color: 'bg-purple-100 text-purple-800' },
    { time: '4 hours ago', type: 'NEW_REPORT', title: 'Published Q1 Sector Outlook: IT & Semiconductor', badge: 'PDF Report', color: 'bg-amber-100 text-amber-800' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-slate-800 animate-in fade-in duration-300">
      {/* 1.1 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-xs flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{s.title}</span>
                <div className={`p-2 rounded-xl border ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-[#0F172A]">{s.value}</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {s.trend}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 1.2 MARKET SUMMARY & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Indices Grid */}
        <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-sm text-[#0F172A] flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" /> Live Benchmark Indices Summary
            </h3>
            <span className="text-[10px] font-bold text-slate-400">Real-Time IST Feeds</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {indices.map((ind, i) => (
              <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{ind.name}</span>
                <span className="text-sm font-black text-[#0F172A]">{ind.value}</span>
                <span className={`text-[10px] font-black ${ind.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {ind.change}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>SEBI Registered Advisory Services · 100% Transparency</span>
            <button
              onClick={() => onNavigateTab('live-calls')}
              className="text-blue-600 hover:text-blue-700 font-black flex items-center gap-1 cursor-pointer"
            >
              View Live Calls <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Action Navigation Buttons */}
        <div className="bg-gradient-to-br from-[#0F172A] to-slate-900 text-white rounded-[24px] p-6 shadow-md flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Quick Action Navigation</span>
            <h3 className="text-lg font-black tracking-tight mb-4">Research Command Center</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onNavigateTab('live-calls')}
                className="w-full p-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-rose-400" />
                  <span>View All 28 Live Calls</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onOpenAiAdvisor()}
                className="w-full p-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-black transition flex items-center justify-between cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white fill-white" />
                  <span>Ask AI Investment Advisors</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-white" />
              </button>

              <button
                onClick={() => onNavigateTab('screener')}
                className="w-full p-3 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>Custom Screener Builder</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 1.3 RECENT ACTIVITY FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-sm text-[#0F172A] flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" /> Live Research Feed & Updates
            </h3>
            <span className="text-xs font-bold text-slate-400">Updated just now</span>
          </div>

          <div className="flex flex-col gap-3">
            {recentActivity.map((act, i) => (
              <div key={i} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <div>
                    <span className="font-black text-xs text-[#0F172A] block">{act.title}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{act.time}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase ${act.color}`}>
                  {act.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 1.4 ANALYST LEADERBOARD */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-sm text-[#0F172A] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Top Analysts Leaderboard
            </h3>
            <span className="text-[10px] font-bold text-slate-400">By Accuracy & ROI</span>
          </div>

          <div className="flex flex-col gap-3">
            {leaderboard.map((analyst: any, i: number) => (
              <div key={i} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs">
                    #{analyst.rank}
                  </div>
                  <div>
                    <span className="font-black text-sm text-[#0F172A] block">{analyst.name}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{analyst.specialty} • {analyst.calls_made} Calls</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-sm text-emerald-600 block">{analyst.accuracy}% Win</span>
                  <span className="text-[10px] font-bold text-slate-500">Avg ROI: {analyst.avg_roi}%</span>
                </div>
              </div>
            ))}
            {leaderboard.length === 0 && (
              <div className="p-4 text-center text-sm font-bold text-slate-400">
                Loading Leaderboard...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
