import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bookmark, X, Plus, Search, ArrowUpDown, Trash2, TrendingUp, Sparkles, 
  FileText, ExternalLink, ShieldCheck, ArrowRight, FolderPlus, Edit3, Save, Layers
} from 'lucide-react';
import toast from 'react-hot-toast';

interface WatchlistStock {
  symbol: string;
  companyName: string;
  price: string;
  changePercent: number;
  aiRating: 'STRONG BUY' | 'BUY' | 'ACCUMULATE' | 'HOLD';
  researchBadge?: string;
  sparkline: number[];
  notes?: string;
  category: string;
  logoText: string;
}

interface WatchlistFolder {
  id: string;
  name: string;
  category: string;
  color: string;
  stocksCount: number;
}

interface WatchlistManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStock?: (stock: any) => void;
  onSelectResearch?: (research: any) => void;
  onTrade?: (tradeData: any) => void;
}

export const WatchlistManagerModal: React.FC<WatchlistManagerModalProps> = ({
  isOpen,
  onClose,
  onSelectStock,
  onSelectResearch,
  onTrade
}) => {
  const [activeWatchlist, setActiveWatchlist] = useState<string>('Long Term');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'change' | 'price' | 'symbol' | 'rating'>('change');
  const [editingNoteSymbol, setEditingNoteSymbol] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState('');

  const [watchlists, setWatchlists] = useState<string[]>([
    'Long Term', 'Swing', 'Dividend', 'High Growth', 'F&O', 'Recently Viewed'
  ]);

  const [stocks, setStocks] = useState<WatchlistStock[]>([
    {
      symbol: 'RELIANCE',
      companyName: 'Reliance Industries Ltd',
      price: '2,934.50',
      changePercent: 1.25,
      aiRating: 'STRONG BUY',
      researchBadge: 'Green Hydrogen Re-rating (96% Target)',
      sparkline: [2900, 2910, 2915, 2928, 2934.5],
      notes: 'Accumulate on dips below ₹2,900 prior to electrolyzer commissioning.',
      category: 'Long Term',
      logoText: 'RL'
    },
    {
      symbol: 'HDFCBANK',
      companyName: 'HDFC Bank Limited',
      price: '1,682.40',
      changePercent: 0.85,
      aiRating: 'BUY',
      researchBadge: 'Q1 NIM Recovery Beat',
      sparkline: [1660, 1672, 1675, 1678, 1682.4],
      notes: 'Core margin expansion expected after RBI liquidity injection.',
      category: 'Long Term',
      logoText: 'HD'
    },
    {
      symbol: 'TATASTEEL',
      companyName: 'Tata Steel Limited',
      price: '147.20',
      changePercent: 2.40,
      aiRating: 'STRONG BUY',
      researchBadge: '4-Hour Breakout Validated',
      sparkline: [141, 143, 145, 144, 147.2],
      notes: 'Breakout above ₹145 target ₹158 in swing timeframe.',
      category: 'Swing',
      logoText: 'TS'
    },
    {
      symbol: 'LT',
      companyName: 'Larsen & Toubro Ltd',
      price: '3,456.90',
      changePercent: 1.05,
      aiRating: 'BUY',
      researchBadge: '₹28 Dividend Ex-Date',
      sparkline: [3410, 3435, 3456.9],
      notes: 'Record order backlog of ₹4.7 Lakh Cr.',
      category: 'Dividend',
      logoText: 'LT'
    },
    {
      symbol: 'TATAPOWER',
      companyName: 'Tata Power Company',
      price: '435.60',
      changePercent: 3.15,
      aiRating: 'STRONG BUY',
      researchBadge: '1:1 Bonus Issue Announced',
      sparkline: [418, 424, 430, 435.6],
      notes: 'Solar rooftop expansion driving momentum.',
      category: 'High Growth',
      logoText: 'TP'
    },
    {
      symbol: 'INFY',
      companyName: 'Infosys Limited',
      price: '1,562.10',
      changePercent: -0.85,
      aiRating: 'ACCUMULATE',
      researchBadge: 'US Yield Sensitivity',
      sparkline: [1580, 1572, 1560, 1564, 1562.1],
      notes: 'Hold for long term software recovery.',
      category: 'F&O',
      logoText: 'IF'
    }
  ]);

  if (!isOpen) return null;

  const filteredStocks = stocks
    .filter(s => activeWatchlist === 'Recently Viewed' || s.category === activeWatchlist)
    .filter(s => s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || s.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'change') return b.changePercent - a.changePercent;
      if (sortBy === 'price') return parseFloat(b.price.replace(/,/g, '')) - parseFloat(a.price.replace(/,/g, ''));
      if (sortBy === 'symbol') return a.symbol.localeCompare(b.symbol);
      return a.aiRating.localeCompare(b.aiRating);
    });

  const handleCreateWatchlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWatchlistName.trim()) return;
    if (!watchlists.includes(newWatchlistName)) {
      setWatchlists(prev => [...prev, newWatchlistName]);
      setActiveWatchlist(newWatchlistName);
      toast.success(`Created Watchlist "${newWatchlistName}"`);
    }
    setNewWatchlistName('');
    setShowCreateModal(false);
  };

  const handleRemoveStock = (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStocks(prev => prev.filter(s => s.symbol !== symbol));
    toast.success(`Removed $${symbol} from Watchlist`);
  };

  const handleSaveNote = (symbol: string) => {
    setStocks(prev => prev.map(s => s.symbol === symbol ? { ...s, notes: noteText } : s));
    setEditingNoteSymbol(null);
    toast.success('Saved stock note');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
        />

        {/* Watchlist Manager Workspace */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="relative w-full max-w-5xl max-h-[85vh] bg-white border border-[#E2E8F0] rounded-[28px] shadow-2xl z-10 overflow-hidden flex flex-col"
        >
          {/* TOP HEADER */}
          <header className="p-6 border-b border-[#E2E8F0] bg-white flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                <Bookmark className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-black text-xl text-[#0F172A] leading-tight">
                  Multi-Watchlist Command Center
                </h3>
                <span className="text-xs text-slate-400 font-bold">Track Securities, AI Ratings & Personal Notes</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition shadow-sm flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> New Watchlist
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* WATCHLIST TABS BAR */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-[#F8FAFC] overflow-x-auto gap-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {watchlists.map((wl) => {
                const isActive = activeWatchlist === wl;
                return (
                  <button
                    key={wl}
                    onClick={() => setActiveWatchlist(wl)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition whitespace-nowrap shrink-0 ${
                      isActive ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-500 hover:text-[#0F172A]'
                    }`}
                  >
                    {wl}
                  </button>
                );
              })}
            </div>

            {/* Sort & Search Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#E2E8F0] text-xs">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-[#0F172A] outline-none w-28 sm:w-36"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#E2E8F0] rounded-xl px-3 py-1.5 text-xs font-bold text-[#0F172A] outline-none cursor-pointer"
              >
                <option value="change">Sort by % Change</option>
                <option value="price">Sort by LTP Price</option>
                <option value="symbol">Sort by Symbol</option>
                <option value="rating">Sort by AI Rating</option>
              </select>
            </div>
          </div>

          {/* WATCHLIST STOCKS GRID / LIST SURFACE */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {filteredStocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-20 text-slate-400 font-bold text-xs">
                <Bookmark className="w-12 h-12 text-slate-300 mb-3" />
                No stocks added to "{activeWatchlist}" yet.
              </div>
            ) : (
              filteredStocks.map((st) => {
                const isPositive = st.changePercent >= 0;
                const isEditingNote = editingNoteSymbol === st.symbol;

                return (
                  <div
                    key={st.symbol}
                    className="bg-white p-5 rounded-[24px] border border-[#E2E8F0] hover:border-blue-300 transition shadow-xs flex flex-col gap-4 group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      
                      {/* Company Info */}
                      <div 
                        onClick={() => {
                          if (onSelectStock) onSelectStock({ symbol: st.symbol, company: st.companyName });
                        }}
                        className="flex items-center gap-3 cursor-pointer flex-1 min-w-[200px]"
                      >
                        <div className="w-11 h-11 rounded-2xl bg-[#0F172A] text-white font-black text-xs flex items-center justify-center shrink-0">
                          {st.logoText}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base text-[#0F172A] group-hover:text-blue-600 transition">{st.symbol}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                              st.aiRating === 'STRONG BUY' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {st.aiRating}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 font-medium truncate block max-w-xs">{st.companyName}</span>
                        </div>
                      </div>

                      {/* Price & Change */}
                      <div className="text-right min-w-[120px]">
                        <span className="font-black text-base text-[#0F172A] block">₹{st.price}</span>
                        <span className={`text-xs font-black ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {isPositive ? '▲ +' : '▼ '}{st.changePercent.toFixed(2)}%
                        </span>
                      </div>

                      {/* Sparkline Mini Chart Simulation */}
                      <div className="w-24 h-8 flex items-center shrink-0">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
                          <polyline
                            fill="none"
                            stroke={isPositive ? '#10B981' : '#EF4444'}
                            strokeWidth="2.5"
                            points="0,20 25,15 50,25 75,10 100,5"
                          />
                        </svg>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            if (onSelectResearch) onSelectResearch({ symbol: st.symbol, company: st.companyName });
                          }}
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                        >
                          Research
                        </button>

                        <button
                          onClick={() => {
                            if (onTrade) onTrade({ symbol: st.symbol, company: st.companyName, price: st.price, rec: 'BUY' });
                          }}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs transition shadow-xs"
                        >
                          Trade
                        </button>

                        <button
                          onClick={(e) => handleRemoveStock(st.symbol, e)}
                          className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                          title="Remove from Watchlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* Research & Notes Bar */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      {st.researchBadge && (
                        <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50/70 px-3 py-1 rounded-lg text-[10px] font-bold">
                          <Sparkles className="w-3 h-3 text-blue-600" />
                          <span>{st.researchBadge}</span>
                        </div>
                      )}

                      {/* Notes Section */}
                      <div className="flex items-center gap-2 text-slate-500 text-[11px] font-medium">
                        {isEditingNote ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              placeholder="Add personal stock note..."
                              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-[#0F172A] outline-none"
                            />
                            <button
                              onClick={() => handleSaveNote(st.symbol)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-black text-[10px]"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingNoteSymbol(st.symbol);
                              setNoteText(st.notes || '');
                            }}
                            className="flex items-center gap-1 hover:text-blue-600 transition"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-400" />
                            <span>{st.notes || 'Add personal note...'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>

          {/* CREATE WATCHLIST OVERLAY */}
          <AnimatePresence>
            {showCreateModal && (
              <div className="absolute inset-0 z-30 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
                <motion.form
                  onSubmit={handleCreateWatchlist}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white p-6 rounded-[24px] shadow-2xl border border-slate-200 w-full max-w-sm flex flex-col gap-4"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-black text-base text-[#0F172A]">Create Custom Watchlist</h4>
                    <button type="button" onClick={() => setShowCreateModal(false)}>
                      <X className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Watchlist Name (e.g. Dividend Champs)"
                    value={newWatchlistName}
                    onChange={(e) => setNewWatchlistName(e.target.value)}
                    className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] outline-none focus:border-blue-600"
                  />

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-black text-xs hover:bg-blue-700 transition"
                  >
                    Create Watchlist
                  </button>
                </motion.form>
              </div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default WatchlistManagerModal;
