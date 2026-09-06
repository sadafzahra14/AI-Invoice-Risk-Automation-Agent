import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  subtitle?: string;
  accentColor?: 'purple' | 'amber' | 'rose' | 'emerald' | 'blue';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  subtitle,
  accentColor = 'purple',
  onClick,
}) => {
  const getAccentStyles = () => {
    switch (accentColor) {
      case 'rose':
        return {
          iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          borderHover: 'hover:border-rose-500/30',
          glow: 'group-hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]',
        };
      case 'amber':
        return {
          iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          borderHover: 'hover:border-amber-500/30',
          glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
        };
      case 'emerald':
        return {
          iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          borderHover: 'hover:border-emerald-500/30',
          glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
        };
      case 'blue':
        return {
          iconBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
          borderHover: 'hover:border-sky-500/30',
          glow: 'group-hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]',
        };
      case 'purple':
      default:
        return {
          iconBg: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
          borderHover: 'hover:border-violet-500/30',
          glow: 'group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]',
        };
    }
  };

  const styles = getAccentStyles();

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl bg-[#0E1322] border border-[#1E273E] p-5 transition-all duration-300 ${
        onClick ? 'cursor-pointer' : ''
      } ${styles.borderHover} ${styles.glow} hover:-translate-y-0.5`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-xl border ${styles.iconBg} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        {change && (
          <div className="flex items-center gap-1 font-medium">
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded ${
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-rose-500/10 text-rose-400'
              }`}
            >
              {isPositive ? '↑' : '↓'} {change}
            </span>
            <span className="text-slate-500">vs last month</span>
          </div>
        )}
        {subtitle && !change && (
          <span className="text-slate-400 text-xs font-normal">{subtitle}</span>
        )}
      </div>

      {/* Subtle bottom gradient glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
