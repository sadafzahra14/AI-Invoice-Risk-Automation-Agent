import React from 'react';
import { RiskLevel } from '../types';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', showDot = true }) => {
  const getColors = () => {
    switch (level) {
      case 'LOW':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/25',
          text: 'text-emerald-400',
          dot: 'bg-emerald-400',
          glow: 'shadow-[0_0_10px_rgba(16,185,129,0.15)]',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/25',
          text: 'text-amber-400',
          dot: 'bg-amber-400',
          glow: 'shadow-[0_0_10px_rgba(245,158,11,0.15)]',
        };
      case 'HIGH':
        return {
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/25',
          text: 'text-rose-400',
          dot: 'bg-rose-400',
          glow: 'shadow-[0_0_10px_rgba(239,68,68,0.2)]',
        };
      default:
        return {
          bg: 'bg-slate-500/10',
          border: 'border-slate-500/25',
          text: 'text-slate-400',
          dot: 'bg-slate-400',
          glow: '',
        };
    }
  };

  const colors = getColors();

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold tracking-wide',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold tracking-wider',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${colors.bg} ${colors.border} ${colors.text} ${colors.glow} ${sizeClasses[size]} select-none transition-colors`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
      )}
      <span>{level} RISK</span>
    </span>
  );
};
