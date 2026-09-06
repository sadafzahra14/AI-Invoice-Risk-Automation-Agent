import React from 'react';
import { X, HelpCircle, ShieldAlert, Cpu, Webhook, CheckCircle2, MessageSquare, BookOpen } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0E1322] border border-[#1E273E] shadow-2xl p-6 text-white max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#1E273E]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">FinFlow AI Knowledge & Support</h3>
              <p className="text-xs text-slate-400">Enterprise documentation & system architecture</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5 text-sm">
          {/* Section 1 */}
          <div className="p-4 rounded-xl bg-[#080B12] border border-[#1B2337] space-y-2">
            <div className="flex items-center gap-2 text-violet-400 font-bold">
              <Cpu className="w-4 h-4" />
              <span>How FinFlow AI Evaluates Financial Risk</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              FinFlow AI models compare each incoming invoice against trailing 90-day vendor averages,
              historical seat quotas, bank routing delta checks, and duplicate document hashes. Scores
              range from 0 to 100:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-xs font-bold text-emerald-400 block">Low Risk (0 - 34)</span>
                <span className="text-[11px] text-slate-400">Routine, verified vendors with clean historical reconciliations.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <span className="text-xs font-bold text-amber-400 block">Medium Risk (35 - 74)</span>
                <span className="text-[11px] text-slate-400">Amount anomalies, impending payment deadlines, or seat tier spikes.</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <span className="text-xs font-bold text-rose-400 block">High Risk (75 - 100)</span>
                <span className="text-[11px] text-slate-400">Surge over 300%, missing POs, altered bank details, or suspicious urgency.</span>
              </div>
            </div>
          </div>

          {/* Section 2: Make.com Webhook Integration */}
          <div className="p-4 rounded-xl bg-[#080B12] border border-[#1B2337] space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Webhook className="w-4 h-4" />
              <span>Make.com / Webhook Integration Ready</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The invoice submission workflow is structured with a clean, extensible <code className="text-violet-300 font-mono bg-violet-950/60 px-1 py-0.5 rounded">processInvoice()</code> controller.
              When ready, you can configure your Make.com Custom Webhook URL in settings to stream invoices directly into your automated ERP and Slack alerts.
            </p>
          </div>

          {/* Section 3: Contact & Support */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-gradient-to-r from-violet-950/30 to-indigo-950/30 border border-violet-500/30 gap-3">
            <div>
              <h5 className="text-xs font-bold text-white">Need enterprise audit support?</h5>
              <p className="text-[11px] text-slate-400">Our financial intelligence team is available 24/7.</p>
            </div>
            <a
              href="mailto:support@finflow.ai"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all whitespace-nowrap"
            >
              Contact Support
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#1E273E] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#161F36] hover:bg-[#1C2744] text-white border border-[#232F48] transition-colors"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
