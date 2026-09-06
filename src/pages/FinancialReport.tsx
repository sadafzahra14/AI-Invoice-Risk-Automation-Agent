import React, { useState } from 'react';
import { Invoice, PageView } from '../types';
import { RiskBadge } from '../components/RiskBadge';
import { RiskScore } from '../components/RiskScore';
import { SendReportModal } from '../components/SendReportModal';
import {
  ArrowLeft,
  DollarSign,
  Receipt,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  Building2,
  FolderOpen,
  FileText,
  Download,
  Send,
  Check,
  ShieldCheck,
  Sparkles,
  Info,
  ExternalLink,
  Printer,
} from 'lucide-react';

interface FinancialReportProps {
  invoice: Invoice;
  onNavigate: (page: PageView) => void;
  onUpdateInvoice: (updatedInvoice: Invoice) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'warning' | 'info') => void;
}

export const FinancialReport: React.FC<FinancialReportProps> = ({
  invoice,
  onNavigate,
  onUpdateInvoice,
  onShowToast,
}) => {
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleApprove = () => {
    const updated: Invoice = {
      ...invoice,
      status: 'Approved',
      approvedBy: 'Sadaf (Administrator)',
      notes: `Approved on ${new Date().toLocaleDateString()}`,
    };
    onUpdateInvoice(updated);
    onShowToast('Invoice Approved', `${invoice.id} for ${invoice.vendor} was approved for settlement.`, 'success');
  };

  const handleMarkForReview = () => {
    const updated: Invoice = {
      ...invoice,
      status: 'Review Required',
      notes: `Flagged for secondary audit on ${new Date().toLocaleDateString()}`,
    };
    onUpdateInvoice(updated);
    onShowToast('Marked for Review', `${invoice.id} was flagged for secondary risk investigation.`, 'warning');
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      // Generate clean text summary or trigger print view
      const reportText = `FINFLOW AI FINANCIAL REPORT\n--------------------------\nInvoice ID: ${invoice.id}\nVendor: ${invoice.vendor}\nAmount: $${invoice.amount.toLocaleString()} ${invoice.currency}\nRisk Index: ${invoice.riskScore}/100 (${invoice.risk})\nTax: $${invoice.tax}\nExplanation: ${invoice.explanation}\nRecommendation: ${invoice.recommendation}\nAudit Date: ${new Date().toISOString()}`;
      
      const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `FinFlow-Report-${invoice.id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      onShowToast('Report Exported', `Executive audit summary for ${invoice.id} downloaded.`, 'info');
    }, 600);
  };

  const handleSendSuccess = (email: string) => {
    onShowToast('Report Dispatched', `AI Financial analysis sent successfully to ${email}`, 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('history')}
            className="p-2.5 rounded-xl bg-[#0E1322] border border-[#1E273E] text-slate-400 hover:text-white hover:border-violet-500/50 transition-colors"
            title="Back to History"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                AI Financial Report
              </h1>
              <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-violet-600/20 text-violet-300 border border-violet-500/30">
                {invoice.id}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              AI-powered analysis of your invoice.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0E1322] hover:bg-[#151D33] text-slate-300 hover:text-white border border-[#1E273E] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-violet-400" />
            <span>{isDownloading ? 'Exporting...' : 'Download Report'}</span>
          </button>

          <button
            onClick={() => setIsSendModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0E1322] hover:bg-[#151D33] text-slate-300 hover:text-white border border-[#1E273E] transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-indigo-400" />
            <span>Send Report</span>
          </button>

          <button
            onClick={handleMarkForReview}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Mark for Review</span>
          </button>

          <button
            onClick={handleApprove}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all transform hover:scale-[1.02] cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Approve Invoice</span>
          </button>
        </div>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Invoice Amount */}
        <div className="p-5 rounded-2xl bg-[#0E1322] border border-[#1E273E] shadow-xl">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Invoice Amount</p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-white">
            ${invoice.amount.toLocaleString()}
          </h3>
          <span className="text-[11px] text-slate-500 font-mono mt-1 block">
            Base currency: {invoice.currency}
          </span>
        </div>

        {/* Tax */}
        <div className="p-5 rounded-2xl bg-[#0E1322] border border-[#1E273E] shadow-xl">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Tax</p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-bold font-mono text-white">
            ${invoice.tax.toLocaleString()}
          </h3>
          <span className="text-[11px] text-emerald-400 font-mono mt-1 block">
            Estimated 10% standard rate
          </span>
        </div>

        {/* Risk Level */}
        <div className="p-5 rounded-2xl bg-[#0E1322] border border-[#1E273E] shadow-xl">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Risk Level</p>
          <div className="mt-2">
            <RiskBadge level={invoice.risk} size="lg" />
          </div>
          <span className="text-[11px] text-slate-500 font-mono mt-2 block">
            Score index: {invoice.riskScore}/100
          </span>
        </div>

        {/* Payment Status */}
        <div className="p-5 rounded-2xl bg-[#0E1322] border border-[#1E273E] shadow-xl">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Payment Status</p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white capitalize">
            {invoice.status}
          </h3>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Due on {invoice.dueDate}
          </span>
        </div>
      </div>

      {/* Main Grid: Invoice Information & AI Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Invoice Information Card (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#0E1322] border border-[#1E273E] p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1E273E]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/20">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Invoice Information</h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">Parsed Document</span>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-[#161F33]">
              <span className="text-slate-400 text-xs uppercase tracking-wider">Invoice ID</span>
              <span className="font-mono font-bold text-violet-400">{invoice.id}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#161F33]">
              <span className="text-slate-400 text-xs uppercase tracking-wider">Vendor</span>
              <span className="font-semibold text-white">{invoice.vendor}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#161F33]">
              <span className="text-slate-400 text-xs uppercase tracking-wider">Invoice Date</span>
              <span className="text-slate-200">{invoice.date}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#161F33]">
              <span className="text-slate-400 text-xs uppercase tracking-wider">Due Date</span>
              <span className="text-slate-200">{invoice.dueDate}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#161F33]">
              <span className="text-slate-400 text-xs uppercase tracking-wider">Currency</span>
              <span className="font-mono font-medium text-white">{invoice.currency}</span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-slate-400 text-xs uppercase tracking-wider">Category</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#161F36] text-slate-200 border border-[#232F48]">
                {invoice.category}
              </span>
            </div>
          </div>

          {/* Attached Document info */}
          <div className="p-4 rounded-2xl bg-[#080B12] border border-[#1E273E] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-7 h-7 text-violet-400" />
              <div>
                <p className="text-xs font-semibold text-white truncate max-w-[180px]">
                  {invoice.fileName || 'invoice_document.pdf'}
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  {invoice.fileSize || '2.8 MB'} • SHA-256 Verified
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Valid PDF
            </span>
          </div>

          {/* Notification status badges */}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pipeline Status</p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Email report prepared</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Financial analysis completed</span>
            </div>
          </div>
        </div>

        {/* AI Risk Analysis Card (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-[#0E1322] border border-[#1E273E] p-6 sm:p-7 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1E273E]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">AI Risk Analysis</h3>
                <p className="text-xs text-slate-400">Neural financial intelligence model findings</p>
              </div>
            </div>

            <RiskBadge level={invoice.risk} size="md" />
          </div>

          {/* Top section: Meter Gauge & Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-5 rounded-2xl bg-[#080B12]/80 border border-[#1B2337]">
            <div className="md:col-span-5 flex justify-center">
              <RiskScore score={invoice.riskScore} riskLevel={invoice.risk} size={150} />
            </div>

            <div className="md:col-span-7 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Executive Synthesis
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed font-normal">
                "{invoice.explanation}"
              </p>
            </div>
          </div>

          {/* Risk Factors List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Risk Factors Evaluated</span>
            </h4>

            <div className="space-y-2">
              {invoice.riskFactors.map((factor, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-[#080B12] border border-[#1E273E] flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                  <p className="text-xs text-slate-300 leading-relaxed">{factor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 via-[#10172B] to-indigo-950/40 border border-violet-500/30 shadow-[0_0_20px_rgba(124,58,237,0.15)] space-y-2">
            <div className="flex items-center gap-2 text-violet-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>AI Recommendation</span>
            </div>
            <p className="text-sm font-medium text-white leading-relaxed">
              "{invoice.recommendation}"
            </p>
          </div>
        </div>
      </div>

      {/* Send Report Modal */}
      <SendReportModal
        invoice={invoice}
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        onSendSuccess={handleSendSuccess}
      />
    </div>
  );
};
