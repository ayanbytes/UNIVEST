import React, { useState } from 'react';
import { 
  FileText, Download, Eye, Search, Filter, ShieldCheck, 
  Sparkles, ArrowRight, Bookmark, Lock, ExternalLink 
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const ReportsTab: React.FC<{
  onSelectReport: (report: any) => void;
}> = ({ onSelectReport }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const reports = [
    {
      id: 'rep-1',
      title: 'Q1 Banking & Financials Sector Deep Dive',
      category: 'Sector Reports',
      analyst: 'Aarav Mehta',
      sebiRegNo: 'INH000009821',
      date: '22 Jul 2026',
      pages: 18,
      fileSize: '4.2 MB',
      downloads: 412,
      isNew: true,
      summary: 'Comprehensive analysis of NIM recovery, loan growth momentum, and asset quality metrics across private banks.'
    },
    {
      id: 'rep-2',
      title: 'Reliance Green Hydrogen & Retail Expansion Report',
      category: 'Company Analysis',
      analyst: 'Neha Shah',
      sebiRegNo: 'INH000004523',
      date: '18 Jul 2026',
      pages: 24,
      fileSize: '6.5 MB',
      downloads: 890,
      isNew: true,
      summary: 'SOTP valuation models assessing hydrogen gigafactory commissioning schedule and retail footfall expansion.'
    },
    {
      id: 'rep-3',
      title: 'H2 FY27 Macroeconomic & Inflation Outlook',
      category: 'Market Outlook',
      analyst: 'Aarav Mehta',
      sebiRegNo: 'INH000009821',
      date: '10 Jul 2026',
      pages: 32,
      fileSize: '8.1 MB',
      downloads: 1240,
      isNew: false,
      summary: 'RBI monetary policy stance, interest rate trajectory, and commodity price pass-through analysis.'
    }
  ];

  const filteredReports = reports.filter((r) => {
    const matchesCat = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesSearch = 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.analyst.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-slate-800 animate-in fade-in duration-300">
      
      {/* 5.3 QUICK STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-xs">
          <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Total Reports</span>
          <span className="text-2xl font-black text-[#0F172A]">156</span>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-xs">
          <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">New This Week</span>
          <span className="text-2xl font-black text-emerald-600">6 New</span>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-xs">
          <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Total Downloads</span>
          <span className="text-2xl font-black text-blue-600">2,843</span>
        </div>
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-xs">
          <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">SEBI Certified</span>
          <span className="text-2xl font-black text-purple-600">100%</span>
        </div>
      </div>

      {/* 5.1 FILTERS & SEARCH */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold w-full md:w-auto no-scrollbar">
          {['All', 'Sector Reports', 'Company Analysis', 'Market Outlook'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#0F172A] text-white font-black'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reports by title or analyst..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
          />
        </div>
      </div>

      {/* 5.2 REPORTS CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredReports.map((rep) => (
          <motion.div
            key={rep.id}
            whileHover={{ y: -3 }}
            className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md border border-blue-200">
                  {rep.category}
                </span>
                {rep.isNew && (
                  <span className="text-[9px] font-black uppercase bg-emerald-500 text-white px-2 py-0.5 rounded">
                    NEW
                  </span>
                )}
              </div>

              <h3 className="font-black text-base text-[#0F172A] leading-snug mb-2 hover:text-blue-600 transition">
                {rep.title}
              </h3>

              <p className="text-slate-600 text-xs font-medium leading-relaxed mb-4 line-clamp-3">
                {rep.summary}
              </p>

              <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400 mb-4">
                <span>By {rep.analyst}</span>
                <span>•</span>
                <span>{rep.pages} Pages ({rep.fileSize})</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onSelectReport(rep)}
                className="px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" /> Read PDF
              </button>

              <button
                onClick={() => toast.success(`Downloading ${rep.title} (PDF)...`)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition cursor-pointer"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReportsTab;
