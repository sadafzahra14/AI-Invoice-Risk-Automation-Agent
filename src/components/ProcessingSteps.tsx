import React from 'react';
import { Check, Loader2, Sparkles, FileText, Cpu, ShieldCheck } from 'lucide-react';

export interface StepItem {
  id: number;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: StepItem[] = [
  { id: 1, label: 'Invoice Uploaded', sublabel: 'Document cryptographic checksum verified', icon: FileText },
  { id: 2, label: 'Extracting Invoice Data', sublabel: 'Parsing line items, amounts, tax & vendor IDs', icon: Cpu },
  { id: 3, label: 'Analyzing Financial Risk', sublabel: 'Benchmarking against historical ledgers & fraud rules', icon: ShieldCheck },
  { id: 4, label: 'Generating AI Report', sublabel: 'Formulating executive recommendations & audit trail', icon: Sparkles },
];

interface ProcessingStepsProps {
  currentStep: number; // 1 to 4
}

export const ProcessingSteps: React.FC<ProcessingStepsProps> = ({ currentStep }) => {
  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {STEPS.map((step) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;
        const isPending = currentStep < step.id;
        const StepIcon = step.icon;

        return (
          <div
            key={step.id}
            className={`flex items-center p-4 rounded-xl border transition-all duration-500 ${
              isCompleted
                ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-300'
                : isCurrent
                ? 'bg-violet-950/30 border-violet-500/40 text-white shadow-[0_0_25px_rgba(139,92,246,0.15)] scale-[1.01]'
                : 'bg-[#0E1322]/50 border-slate-800/60 text-slate-500 opacity-60'
            }`}
          >
            <div className="flex-shrink-0 mr-4">
              {isCompleted ? (
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
              ) : isCurrent ? (
                <div className="w-10 h-10 rounded-full bg-violet-600/20 border border-violet-500 flex items-center justify-center text-violet-400 relative">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="absolute inset-0 rounded-full border border-violet-400/50 animate-ping opacity-30" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-slate-800/60 border border-slate-700/60 flex items-center justify-center text-slate-500">
                  <span className="text-xs font-mono font-medium">{step.id}</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4
                  className={`text-sm font-semibold tracking-wide ${
                    isCompleted
                      ? 'text-emerald-300'
                      : isCurrent
                      ? 'text-white font-bold'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </h4>
                {isCurrent && (
                  <span className="text-xs font-mono font-medium text-violet-400 animate-pulse">
                    Processing...
                  </span>
                )}
                {isCompleted && (
                  <span className="text-xs font-mono text-emerald-400">Done</span>
                )}
              </div>
              <p className="text-xs text-slate-400 truncate mt-0.5">{step.sublabel}</p>
            </div>

            <div className="ml-3 hidden sm:block">
              <StepIcon
                className={`w-4 h-4 ${
                  isCompleted
                    ? 'text-emerald-400'
                    : isCurrent
                    ? 'text-violet-400'
                    : 'text-slate-600'
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
