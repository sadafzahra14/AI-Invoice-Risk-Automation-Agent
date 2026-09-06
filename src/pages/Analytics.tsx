import React from 'react';
import { PageView, Invoice } from '../types';
import { StatCard } from '../components/StatCard';
import { ExpenseChart, RiskDistributionChart, CategoryBreakdownChart } from '../components/Charts';
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Building2,
  Calendar,
  CreditCard,
} from 'lucide-react';

interface AnalyticsProps {
  invoices: Invoice[];
  onNavigate: (page: PageView) => void;
  onViewReport: (invoice: Invoice) => void;
}

export const Analytics: React.FC<AnalyticsProps> = ({
  invoices,
  onNavigate,
  onViewReport,
}) => {
  const totalValue = 142850;
  const averageInvoice = 1116;
  const highRiskPercent = '5.4%';
  const pendingAmount = 28450;

  // High risk vendors from invoice dataset
  const highRiskInvoices = invoices.filter((inv) => inv.risk === 'HIGH');

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Financial Analytics
            </h1>
            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
              Live Telemetry
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Monitor invoice activity and financial risk across enterprise departments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('new-invoice')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Process New Invoice</span>
          </button>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Invoice Value"
          value={`$${totalValue.toLocaleString()}`}
          change="+11.3%"
          isPositive={true}
          icon={DollarSign}
          accentColor="purple"
        />
        <StatCard
          title="Average Invoice"
          value={`$${averageInvoice.toLocaleString()}`}
          change="+3.8%"
          isPositive={true}
          icon={TrendingUp}
          accentColor="blue"
        />
        <StatCard
          title="High Risk %"
          value={highRiskPercent}
          change="-1.2%"
          isPositive={true}
          icon={ShieldAlert}
          accentColor="rose"
          subtitle="7 flagged transactions"
        />
        <StatCard
          title="Pending Amount"
          value={`$${pendingAmount.toLocaleString()}`}
          change="5 awaiting sign-off"
          isPositive={false}
          icon={Clock}
          accentColor="amber"
        />
      </div>

      {/* Primary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Expenses Chart */}
        <div className="lg:col-span-8 rounded-2xl bg-[#0E1322] border border-[#1E273E] p-6 shadow-xl">
          <ExpenseChart />
        </div>

        {/* Risk Distribution Breakdown */}
        <div className="lg:col-span-4 rounded-2xl bg-[#0E1322] border border-[#1E273E] p-6 shadow-xl">
          <RiskDistributionChart />
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown */}
        <div className="lg:col-span-6 rounded-2xl bg-[#0E1322] border border-[#1E273E] p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E273E]">
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Expense by Category</h4>
              <p className="text-xs text-slate-400">Departmental procurement distributions</p>
            </div>
            <Layers className="w-4 h-4 text-violet-400" />
          </div>
          <CategoryBreakdownChart />
        </div>

        {/* Payment Status Distribution */}
        <div className="lg:col-span-6 rounded-2xl bg-[#0E1322] border border-[#1E273E] p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E273E]">
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Payment Status Distribution</h4>
              <p className="text-xs text-slate-400">Settlement velocity and pending liabilities</p>
            </div>
            <CreditCard className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-[#080B12] border border-emerald-500/20">
              <span className="text-xs font-semibold text-emerald-400 block">Reconciled / Paid</span>
              <p className="text-xl font-bold font-mono text-white mt-1">$98,400</p>
              <span className="text-[11px] text-slate-400">69% of portfolio</span>
            </div>

            <div className="p-4 rounded-xl bg-[#080B12] border border-amber-500/20">
              <span className="text-xs font-semibold text-amber-400 block">Pending Net-30</span>
              <p className="text-xl font-bold font-mono text-white mt-1">$28,450</p>
              <span className="text-[11px] text-slate-400">20% of portfolio</span>
            </div>

            <div className="p-4 rounded-xl bg-[#080B12] border border-rose-500/20">
              <span className="text-xs font-semibold text-rose-400 block">Review Required</span>
              <p className="text-xl font-bold font-mono text-white mt-1">$12,500</p>
              <span className="text-[11px] text-slate-400">8% of portfolio</span>
            </div>

            <div className="p-4 rounded-xl bg-[#080B12] border border-slate-700/60">
              <span className="text-xs font-semibold text-slate-400 block">Overdue Invoices</span>
              <p className="text-xl font-bold font-mono text-white mt-1">$3,500</p>
              <span className="text-[11px] text-slate-400">3% of portfolio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Insights Section */}
      <div className="rounded-3xl bg-[#0E1322] border border-[#1E273E] p-6 sm:p-7 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#1E273E]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Risk Insights</h3>
              <p className="text-xs text-slate-400">
                Automated heuristics identifying anomalous ledger patterns
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
            Action Recommended
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: High Risk Vendors */}
          <div className="p-4 rounded-2xl bg-[#080B12] border border-[#1E273E] space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block">
              High Risk Vendors
            </span>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="flex items-center justify-between border-b border-[#161F33] pb-1.5">
                <span className="font-semibold text-white">DataCore Systems</span>
                <span className="font-mono text-rose-400 font-bold">88/100</span>
              </li>
              <li className="flex items-center justify-between border-b border-[#161F33] pb-1.5">
                <span className="font-semibold text-white">Amazon Web Services</span>
                <span className="font-mono text-rose-400 font-bold">81/100</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-semibold text-white">Apex Security Labs</span>
                <span className="font-mono text-rose-400 font-bold">92/100</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Most Expensive Categories */}
          <div className="p-4 rounded-2xl bg-[#080B12] border border-[#1E273E] space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400 block">
              Most Expensive Categories
            </span>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="flex items-center justify-between border-b border-[#161F33] pb-1.5">
                <span className="font-semibold text-white">Cloud Infrastructure</span>
                <span className="font-mono text-slate-300 font-bold">$33,900</span>
              </li>
              <li className="flex items-center justify-between border-b border-[#161F33] pb-1.5">
                <span className="font-semibold text-white">Software & SaaS</span>
                <span className="font-mono text-slate-300 font-bold">$21,500</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-semibold text-white">Cybersecurity & Audit</span>
                <span className="font-mono text-slate-300 font-bold">$15,000</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Overdue Invoices */}
          <div className="p-4 rounded-2xl bg-[#080B12] border border-[#1E273E] space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
              Overdue / Critical
            </span>
            <ul className="text-xs space-y-2 text-slate-300">
              <li className="flex items-center justify-between border-b border-[#161F33] pb-1.5">
                <div>
                  <span className="font-mono font-bold text-white block">INV-1003</span>
                  <span className="text-[10px] text-slate-500">DataCore Systems</span>
                </div>
                <span className="font-mono text-amber-400 font-bold">$12,500</span>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-white block">INV-1009</span>
                  <span className="text-[10px] text-slate-500">Apex Security Labs</span>
                </div>
                <span className="font-mono text-amber-400 font-bold">$15,000</span>
              </li>
            </ul>
          </div>

          {/* Card 4: Unusual Transactions */}
          <div className="p-4 rounded-2xl bg-[#080B12] border border-[#1E273E] space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">
              Unusual Transactions
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">DataCore Systems</strong> spiked 340% above baseline.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">AWS Data Egress</strong> increased 48% across EU-Central availability zones.
            </p>
          </div>
        </div>

        {/* Quick link to high risk reports */}
        {highRiskInvoices.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-400">
            <span>Click any high risk invoice to view comprehensive neural risk breakdown</span>
            <div className="flex gap-2">
              {highRiskInvoices.slice(0, 3).map((inv) => (
                <button
                  key={inv.id}
                  onClick={() => onViewReport(inv)}
                  className="px-2.5 py-1 rounded bg-[#161F36] hover:bg-violet-900/30 text-violet-300 border border-violet-500/25 transition-colors font-mono"
                >
                  View {inv.id} →
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
