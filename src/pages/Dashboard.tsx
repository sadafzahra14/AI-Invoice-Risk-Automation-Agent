import React from 'react';
import { PageView, Invoice } from '../types';
import { StatCard } from '../components/StatCard';
import { ExpenseChart, RiskDistributionChart } from '../components/Charts';
import { InvoiceTable } from '../components/InvoiceTable';
import {
  FileText,
  DollarSign,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface DashboardProps {
  invoices: Invoice[];
  onNavigate: (page: PageView) => void;
  onViewReport: (invoice: Invoice) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  invoices,
  onNavigate,
  onViewReport,
}) => {
  const totalInvoices = 128;
  const totalExpenses = 84620;
  const highRiskCount = 7;
  const pendingPayments = 18;

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121829] via-[#0E1324] to-[#0A0E1A] border border-[#1E273E] p-6 sm:p-8 shadow-2xl">
        {/* Background glow accents */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Autonomous Risk Engine v4.2</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Financial Intelligence at Your Fingertips
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Process invoices, detect financial risks, and generate AI-powered insights automatically.
            Eliminate manual invoice auditing with real-time fraud and anomaly detection.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('new-invoice')}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.6)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Process New Invoice</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={() => onNavigate('history')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[#121829] hover:bg-[#182035] text-slate-300 hover:text-white border border-[#232F48] transition-all cursor-pointer"
            >
              <span>View Audit Trail</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Invoices"
          value={totalInvoices}
          change="+14.2%"
          isPositive={true}
          icon={FileText}
          accentColor="purple"
          onClick={() => onNavigate('history')}
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses.toLocaleString()}`}
          change="+8.6%"
          isPositive={true}
          icon={DollarSign}
          accentColor="blue"
          onClick={() => onNavigate('analytics')}
        />
        <StatCard
          title="High Risk Invoices"
          value={highRiskCount}
          change="-2"
          isPositive={true}
          icon={AlertTriangle}
          accentColor="rose"
          subtitle="Immediate review advised"
          onClick={() => onNavigate('history')}
        />
        <StatCard
          title="Pending Payments"
          value={pendingPayments}
          change="3 due soon"
          isPositive={false}
          icon={Clock}
          accentColor="amber"
          subtitle="Net-30 cycle"
          onClick={() => onNavigate('history')}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-[#0E1322] border border-[#1E273E] p-5 sm:p-6 shadow-xl">
          <ExpenseChart />
        </div>

        <div className="rounded-2xl bg-[#0E1322] border border-[#1E273E] p-5 sm:p-6 shadow-xl">
          <RiskDistributionChart />
        </div>
      </div>

      {/* Recent Invoices Section */}
      <div className="rounded-2xl bg-[#0E1322] border border-[#1E273E] p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">Recent Invoices</h3>
            <p className="text-xs text-slate-400">
              Latest invoices processed through the FinFlow AI risk pipeline
            </p>
          </div>
          <button
            onClick={() => onNavigate('history')}
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 inline-flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>Explore All 128 Invoices</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <InvoiceTable
          invoices={invoices}
          onViewReport={onViewReport}
          limit={5}
          showFilters={false}
        />
      </div>
    </div>
  );
};
