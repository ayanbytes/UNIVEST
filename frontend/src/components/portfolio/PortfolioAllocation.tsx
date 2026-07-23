import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart as PieChartIcon, Layers, Network } from 'lucide-react';

const mockAssetAllocation = [
  { name: 'Equity', value: 65, color: '#2563EB' },
  { name: 'Mutual Funds', value: 20, color: '#16A34A' },
  { name: 'Gold / Commodities', value: 10, color: '#F59E0B' },
  { name: 'Cash', value: 5, color: '#64748B' },
];

const mockSectorAllocation = [
  { name: 'IT / Tech', value: 35, color: '#0EA5E9' },
  { name: 'Banking', value: 25, color: '#3B82F6' },
  { name: 'Automotive', value: 15, color: '#6366F1' },
  { name: 'FMCG', value: 15, color: '#8B5CF6' },
  { name: 'Healthcare', value: 10, color: '#A855F7' },
];

export const PortfolioAllocation: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Asset Allocation Donut */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 shadow-premium">
          <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy mb-8 flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-primary" /> Asset Allocation
          </h3>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockAssetAllocation}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {mockAssetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontSize: '12px', fontWeight: 700 }}
                    itemStyle={{ color: '#0F172A' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-[10px] font-bold text-slate-400">Total Assets</span>
                <span className="text-base font-black text-brand-navy">4 Classes</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full">
              {mockAssetAllocation.map(asset => (
                <div key={asset.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: asset.color }} />
                    <span className="text-xs font-bold text-brand-navy">{asset.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-500">{asset.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sector Allocation Donut */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 shadow-premium">
          <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy mb-8 flex items-center gap-2">
            <Network className="w-4 h-4 text-indigo-500" /> Sector Exposure
          </h3>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockSectorAllocation}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {mockSectorAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontSize: '12px', fontWeight: 700 }}
                    itemStyle={{ color: '#0F172A' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-[10px] font-bold text-slate-400">Top Sector</span>
                <span className="text-base font-black text-brand-navy">IT / Tech</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 w-full">
              {mockSectorAllocation.map(sector => (
                <div key={sector.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sector.color }} />
                    <span className="text-xs font-bold text-brand-navy">{sector.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-500">{sector.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Market Cap & Risk Distribution (Treemap alternative / Bars) */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 shadow-premium">
        <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy mb-6 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-500" /> Market Cap Distribution
        </h3>
        
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-brand-navy">Large Cap (Low Risk)</span>
              <span className="text-xs font-black text-slate-500">65%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-[#2563EB] h-full rounded-full" style={{ width: '65%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-brand-navy">Mid Cap (Moderate Risk)</span>
              <span className="text-xs font-black text-slate-500">25%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-[#0EA5E9] h-full rounded-full" style={{ width: '25%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-brand-navy">Small Cap (High Risk)</span>
              <span className="text-xs font-black text-slate-500">10%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-[#6366F1] h-full rounded-full" style={{ width: '10%' }} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
