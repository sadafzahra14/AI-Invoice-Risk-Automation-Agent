import React, { useState } from 'react';
import { MONTHLY_EXPENSE_DATA, RISK_BREAKDOWN_DATA, CATEGORY_BREAKDOWN } from '../data/mockInvoices';

export const ExpenseChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const data = MONTHLY_EXPENSE_DATA;
  const maxAmount = Math.max(...data.map((d) => d.amount));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-white tracking-wide">Expense Overview</h4>
          <p className="text-xs text-slate-400">Monthly invoice transaction volume (Trailing 12 Months)</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-violet-500" />
            <span className="text-slate-400">Expense Volume</span>
          </div>
          <span className="text-xs font-mono font-bold text-violet-400">$84,620 peak</span>
        </div>
      </div>

      {/* Responsive Bar/Area SVG Graph */}
      <div className="h-56 w-full flex items-end justify-between gap-1 sm:gap-2 pt-6 pb-2 px-1 relative">
        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="border-b border-slate-700 w-full" />
          <div className="border-b border-slate-700 w-full" />
          <div className="border-b border-slate-700 w-full" />
          <div className="border-b border-slate-700 w-full" />
        </div>

        {data.map((item, index) => {
          const heightPercent = Math.round((item.amount / maxAmount) * 100);
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={item.month}
              className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip on hover */}
              {isHovered && (
                <div className="absolute -top-12 z-20 bg-[#121829] border border-violet-500/40 text-white rounded-lg px-2.5 py-1 text-xs shadow-xl pointer-events-none whitespace-nowrap">
                  <p className="font-bold text-violet-300">${item.amount.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">{item.count} invoices in {item.month}</p>
                </div>
              )}

              {/* Bar column */}
              <div className="w-full max-w-[28px] h-full flex items-end">
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-md transition-all duration-300 relative ${
                    isHovered
                      ? 'bg-gradient-to-t from-violet-600 to-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.6)]'
                      : index === data.length - 1
                      ? 'bg-gradient-to-t from-violet-700 to-indigo-500'
                      : 'bg-gradient-to-t from-violet-950/80 to-violet-600/70 hover:to-violet-500'
                  }`}
                >
                  {isHovered && (
                    <div className="w-full h-1 bg-white rounded-t-md shadow-[0_0_8px_white]" />
                  )}
                </div>
              </div>

              {/* Month label */}
              <span
                className={`text-[10px] mt-2 font-mono transition-colors ${
                  isHovered ? 'text-violet-300 font-bold' : 'text-slate-500'
                }`}
              >
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const RiskDistributionChart: React.FC = () => {
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  const data = RISK_BREAKDOWN_DATA;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-white tracking-wide">Risk Distribution</h4>
          <p className="text-xs text-slate-400">Ledger classification breakdown</p>
        </div>
        <span className="text-xs font-mono font-semibold text-emerald-400">128 analyzed</span>
      </div>

      {/* Progress segmented bar */}
      <div className="h-4 w-full rounded-full overflow-hidden flex gap-1 p-0.5 bg-[#080B12] border border-[#1E273E] mb-5">
        {data.map((item) => (
          <div
            key={item.level}
            style={{
              width: `${item.percentage}%`,
              backgroundColor: item.color,
            }}
            onMouseEnter={() => setHoveredLevel(item.level)}
            onMouseLeave={() => setHoveredLevel(null)}
            className="h-full rounded-sm cursor-pointer transition-all duration-200 hover:opacity-90 relative group"
            title={`${item.level}: ${item.percentage}%`}
          />
        ))}
      </div>

      {/* Detailed breakdown items */}
      <div className="space-y-3">
        {data.map((item) => {
          const isHovered = hoveredLevel === item.level;
          return (
            <div
              key={item.level}
              onMouseEnter={() => setHoveredLevel(item.level)}
              onMouseLeave={() => setHoveredLevel(null)}
              className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                isHovered
                  ? 'bg-[#151D33] border-slate-600 scale-[1.01]'
                  : 'bg-[#0B0F1A]/60 border-[#1B2337]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: isHovered ? `0 0 10px ${item.color}` : 'none',
                  }}
                />
                <div>
                  <span className="text-xs font-bold text-white">{item.level}</span>
                  <span className="text-[11px] text-slate-400 block font-mono">
                    {item.count} invoices (${item.amount.toLocaleString()})
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold font-mono text-white">
                  {item.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const CategoryBreakdownChart: React.FC = () => {
  return (
    <div className="w-full space-y-3.5">
      {CATEGORY_BREAKDOWN.map((cat) => (
        <div key={cat.category} className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-300">{cat.category}</span>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-white font-semibold">${cat.amount.toLocaleString()}</span>
              <span className="text-slate-500 text-[11px]">({cat.percentage}%)</span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-[#080B12] overflow-hidden border border-[#1E273E]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${cat.percentage}%`,
                backgroundColor: cat.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
