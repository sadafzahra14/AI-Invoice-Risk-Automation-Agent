import React, { useState } from 'react';
import { Invoice, PageView } from '../types';
import { InvoiceTable } from '../components/InvoiceTable';
import {
  History,
  PlusCircle,
  Download,
  ShieldAlert,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';

interface InvoiceHistoryProps {
  invoices: Invoice[];
  onNavigate: (page: PageView) => void;
  onViewReport: (invoice: Invoice) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'warning' | 'info') => void;
}

export const InvoiceHistory: React.FC<InvoiceHistoryProps> = ({
  invoices,
  onNavigate,
  onViewReport,
  onShowToast,
}) => {
  const [exporting, setExporting] = useState(false);

  const highRiskCount = invoices.filter((i) => i.risk === 'HIGH').length;
  const pendingCount = invoices.filter((i) => i.status === 'Pending').length;
  const processedCount = invoices.filter((i) => i.status === 'Processed' || i.status === 'Paid' || i.status === 'Approved').length;

  const handleExportCsv = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      const headers = ['Invoice ID', 'Vendor', 'Invoice Date', 'Due Date', 'Amount', 'Currency', 'Risk Level', 'Risk Score', 'Payment Status', 'Category'];
      const rows = invoices.map((inv) => [
        inv.id,
        `"${inv.vendor}"`,
        inv.date,
        inv.dueDate,
        inv.amount,
        inv.currency,
        inv.risk,
        inv.riskScore,
        inv.status,
        `"${inv.category}"`,
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `FinFlow_Invoices_Export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      onShowToast('CSV Export Ready', `Exported ${invoices.length} ledger invoices to CSV.`, 'success');
    }, 500);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Invoice History
            </h1>
            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30">
              {invoices.length} total entries
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Search, filter, and review AI audit reports across all enterprise invoices.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCsv}
            disabled={exporting}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#0E1322] hover:bg-[#151D33] text-slate-300 hover:text-white border border-[#1E273E] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-violet-400" />
            <span>{exporting ? 'Exporting...' : 'Export CSV'}</span>
          </button>

          <button
            onClick={() => onNavigate('new-invoice')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all transform hover:scale-[1.02] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Process New Invoice</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[#0E1322] border border-[#1E273E]">
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Total Analyzed</span>
          <p className="text-xl font-bold font-mono text-white mt-1">{invoices.length}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0E1322] border border-rose-500/25">
          <span className="text-[11px] font-medium uppercase tracking-wider text-rose-400 flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" /> High Risk
          </span>
          <p className="text-xl font-bold font-mono text-rose-400 mt-1">{highRiskCount}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0E1322] border border-amber-500/25">
          <span className="text-[11px] font-medium uppercase tracking-wider text-amber-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Pending Review
          </span>
          <p className="text-xl font-bold font-mono text-amber-400 mt-1">{pendingCount}</p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#0E1322] border border-emerald-500/25">
          <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Reconciled
          </span>
          <p className="text-xl font-bold font-mono text-emerald-400 mt-1">{processedCount}</p>
        </div>
      </div>

      {/* Full Searchable Table */}
      <div className="rounded-2xl bg-[#0E1322] border border-[#1E273E] p-5 sm:p-6 shadow-xl">
        <InvoiceTable
          invoices={invoices}
          onViewReport={onViewReport}
          showFilters={true}
        />
      </div>
    </div>
  );
};
