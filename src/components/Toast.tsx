import React from 'react';
import { ToastNotification } from '../types';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

interface ToastContainerProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />;
            case 'warning':
              return <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />;
            case 'error':
              return <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />;
            case 'info':
            default:
              return <Info className="w-5 h-5 text-sky-400 flex-shrink-0" />;
          }
        };

        const getBorderColor = () => {
          switch (toast.type) {
            case 'success':
              return 'border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]';
            case 'warning':
              return 'border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]';
            case 'error':
              return 'border-rose-500/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]';
            case 'info':
            default:
              return 'border-violet-500/40 shadow-[0_0_20px_rgba(139,92,246,0.15)]';
          }
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-[#0E1322]/95 backdrop-blur-md border ${getBorderColor()} text-white shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3`}
          >
            <div className="mt-0.5">{getIcon()}</div>
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-bold text-white tracking-wide">{toast.title}</h5>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
