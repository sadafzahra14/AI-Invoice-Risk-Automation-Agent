import React, { useState } from 'react';
import { Invoice } from '../types';
import { X, Mail, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface SendReportModalProps {
  invoice: Invoice;
  isOpen: boolean;
  onClose: () => void;
  onSendSuccess: (email: string) => void;
}

export const SendReportModal: React.FC<SendReportModalProps> = ({
  invoice,
  isOpen,
  onClose,
  onSendSuccess,
}) => {
  const [recipient, setRecipient] = useState(invoice.recipientEmail || 'finance-approvals@company.com');
  const [includeFullAudit, setIncludeFullAudit] = useState(true);
  const [includeVendorCheck, setIncludeVendorCheck] = useState(true);
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      onSendSuccess(recipient);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0E1322] border border-[#1E273E] shadow-2xl p-6 text-white overflow-hidden">
        {/* Glow Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E273E]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-600/15 border border-violet-500/30 text-violet-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Dispatch AI Financial Report</h3>
              <p className="text-xs text-slate-400 font-mono">Target: {invoice.id} • {invoice.vendor}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Recipient Corporate Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. audit-committee@enterprise.com"
                className="w-full bg-[#080B12] border border-[#1E273E] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-mono"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080B12]/80 border border-[#1B243B] space-y-2.5">
            <p className="text-xs font-semibold text-slate-300">Included AI Package:</p>
            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeFullAudit}
                onChange={(e) => setIncludeFullAudit(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-violet-600 focus:ring-violet-500"
              />
              <span>Full AI Risk Factor breakdown & scoring index ({invoice.riskScore}/100)</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeVendorCheck}
                onChange={(e) => setIncludeVendorCheck(e.target.checked)}
                className="rounded border-slate-700 bg-slate-900 text-violet-600 focus:ring-violet-500"
              />
              <span>Vendor ledger anomaly verification certificate</span>
            </label>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>TLS 1.3 256-bit encrypted delivery</span>
            </div>
            <span className="font-mono text-emerald-400 font-semibold">Ready</span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all disabled:opacity-50"
            >
              {isSending ? (
                <span>Dispatching Report...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Report</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
