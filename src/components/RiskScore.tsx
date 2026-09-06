import React from 'react';
import { RiskLevel } from '../types';

interface RiskScoreProps {
  score: number; // 0 - 100
  riskLevel: RiskLevel;
  size?: number;
}

export const RiskScore: React.FC<RiskScoreProps> = ({ score, riskLevel, size = 160 }) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Let's use 270 degree arc for gauge look or full 360 circle
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score < 35) return { stroke: '#10B981', glow: 'rgba(16, 185, 129, 0.4)', text: 'text-emerald-400', label: 'Low Risk' };
    if (score < 75) return { stroke: '#F59E0B', glow: 'rgba(245, 158, 11, 0.4)', text: 'text-amber-400', label: 'Moderate Risk' };
    return { stroke: '#EF4444', glow: 'rgba(239, 68, 68, 0.4)', text: 'text-rose-500', label: 'High Alert' };
  };

  const { stroke, glow, text } = getColor();

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg] transition-all duration-700">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1E273E"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: `drop-shadow(0 0 8px ${glow})`,
              transition: 'stroke-dashoffset 1s ease-out',
            }}
          />
        </svg>

        {/* Center score readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
            {score}
          </span>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-medium -mt-0.5">
            out of 100
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: stroke }} />
        <span className={`text-xs font-semibold uppercase tracking-wider ${text}`}>
          {riskLevel} RISK INDEX
        </span>
      </div>
    </div>
  );
};
