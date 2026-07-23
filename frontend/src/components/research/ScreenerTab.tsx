import React, { useState } from 'react';
import { 
  ListFilter, Plus, Trash2, Search, ArrowRight, Zap, Download, 
  BarChart3, RefreshCw, Bookmark, ArrowUpRight 
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../../services/api';

export const ScreenerTab: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('Momentum Stocks');
  const [screenerRules, setScreenerRules] = useState([
    { id: '1', field: 'RSI (14)', operator: '>', value: '60' },
    { id: '2', field: 'Volume', operator: '>', value: '1,000,000' },
    { id: '3', field: '3M Return %', operator: '>', value: '20' }
  ]);

  const templates = [
    { name: 'Momentum Stocks', count: 142, desc: 'RSI > 60 & High 3M Return' },
    { name: 'Undervalued Stocks', count: 28, desc: 'P/E < 15 & High ROE' },
    { name: 'Breakout Stocks', count: 56, desc: 'Price > 200 EMA & Volume Spike' },
    { name: 'Growth Stocks', count: 34, desc: 'Revenue Growth > 20%' },
    { name: 'High Dividend', count: 19, desc: 'Yield > 4% & Stable Cash Flow' },
  ];

  const [screenerResults, setScreenerResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock templates and rules logic for UI demonstration remains.
  // We'll replace the hardcoded results with data fetched from the API.

  const handleRunScreener = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post('/screener/', {
        filters: screenerRules.map(r => ({
          indicator: r.field,
          operator: r.operator,
          value: parseFloat(r.value.replace(/,/g, '')) || 0
        }))
      });
      // Map API response to UI shape
      setScreenerResults(data.map((item: any) => ({
        symbol: item.symbol,
        company: item.company_name,
        price: `₹${item.current_price.toFixed(2)}`,
        change: '+1.5%', // Mock change for now since backend doesn't return it
        rsi: item.indicator_values['RSI (14)']?.toFixed(1) || '--',
        pe: item.indicator_values['P/E Ratio']?.toFixed(1) || '--',
        volume: '1.2M' // Mock volume
      })));
      toast.success(`Found ${data.length} matches`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to run screener');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRule = () => {
    setScreenerRules((prev) => [
      ...prev,
      { id: Date.now().toString(), field: 'P/E Ratio', operator: '<', value: '25' }
    ]);
    toast.success('New rule added to custom screener');
  };

  const handleRemoveRule = (id: string) => {
    setScreenerRules((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-slate-800 animate-in fade-in duration-300">
      
      {/* 4.1 PRE-BUILT SCREENERS CARDS */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        {templates.map((tpl) => (
          <button
            key={tpl.name}
            onClick={() => setSelectedTemplate(tpl.name)}
            className={`p-4 rounded-2xl border text-left transition shrink-0 cursor-pointer min-w-[200px] ${
              selectedTemplate === tpl.name
                ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                : 'bg-white text-slate-800 border-[#E2E8F0] hover:border-blue-300'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-black">{tpl.name}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                selectedTemplate === tpl.name ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {tpl.count}
              </span>
            </div>
            <span className={`text-[10px] font-medium block ${
              selectedTemplate === tpl.name ? 'text-slate-300' : 'text-slate-500'
            }`}>
              {tpl.desc}
            </span>
          </button>
        ))}
      </div>

      {/* 4.2 BUILDER & RESULTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: Screener Rule Builder */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-sm text-[#0F172A] flex items-center gap-2">
                <ListFilter className="w-4 h-4 text-blue-600" /> Filter Criteria Builder
              </h3>
              <button
                onClick={handleAddRule}
                className="text-[10px] font-black text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 cursor-pointer"
              >
                + Add Rule
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {screenerRules.map((rule) => (
                <div key={rule.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2 text-xs font-bold">
                  <span className="text-slate-800">{rule.field}</span>
                  <span className="text-blue-600 font-mono font-black">{rule.operator}</span>
                  <span className="text-slate-900 font-black">{rule.value}</span>
                  <button onClick={() => handleRemoveRule(rule.id)} className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleRunScreener}
            disabled={isLoading}
            className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs transition shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Running...' : 'Run Custom Screener'}
          </button>
        </div>

        {/* RIGHT: Results Table */}
        <div className="lg:col-span-2 bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-black text-sm text-[#0F172A]">Screener Matches ({screenerResults.length})</h3>
                <span className="text-[10px] font-bold text-slate-400">Template: {selectedTemplate}</span>
              </div>
              <button
                onClick={() => toast.success('Exported Screener Results (CSV)')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs font-medium border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 font-black text-[10px] uppercase border-b border-slate-200">
                    <th className="py-3 px-4">Symbol</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Change</th>
                    <th className="py-3 px-4">RSI (14)</th>
                    <th className="py-3 px-4">P/E Ratio</th>
                    <th className="py-3 px-4">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {screenerResults.map((res) => (
                    <tr key={res.symbol} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-black text-[#0F172A]">
                        {res.symbol}
                        <span className="text-[10px] text-slate-400 block font-normal">{res.company}</span>
                      </td>
                      <td className="py-3 px-4 font-black text-slate-900">{res.price}</td>
                      <td className="py-3 px-4 font-black text-emerald-600">{res.change}</td>
                      <td className="py-3 px-4 font-bold text-slate-700">{res.rsi}</td>
                      <td className="py-3 px-4 font-bold text-slate-700">{res.pe}</td>
                      <td className="py-3 px-4 font-bold text-slate-500">{res.volume}</td>
                    </tr>
                  ))}
                  {screenerResults.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 font-bold">
                        No matches found. Run the screener to see results.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ScreenerTab;
