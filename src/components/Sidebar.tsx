import React from 'react';
import { PageView } from '../types';
import {
  LayoutDashboard,
  PlusCircle,
  History,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface SidebarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  highRiskCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenHelp: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  highRiskCount,
  isOpenMobile,
  onCloseMobile,
  onOpenHelp,
  onLogout,
}) => {
  const navItems: { id: PageView; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new-invoice', label: 'New Invoice', icon: PlusCircle },
    { id: 'history', label: 'Invoice History', icon: History, badge: highRiskCount },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-[#0A0E1A] border-r border-[#1B2337] flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="p-6 border-b border-[#1A2236] flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleNavClick('dashboard')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 fill-white/20" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg font-extrabold tracking-tight text-white">
                    FinFlow <span className="text-violet-400 font-black">AI</span>
                  </h1>
                </div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-0.5">
                  Financial Intelligence
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Platform
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_18px_rgba(124,58,237,0.35)] font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-[#121829]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-violet-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && item.badge > 0 && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      }`}
                      title={`${item.badge} high risk items`}
                    >
                      {item.badge} high
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[#1A2236] space-y-3">
          {/* AI Security status pill */}
          <div className="bg-[#0E1322] border border-[#1E273E] p-3 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Risk Engine Online</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Neural anomaly model v4.2 active
            </p>
          </div>

          {/* Secondary buttons */}
          <div className="space-y-1">
            <button
              onClick={onOpenHelp}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-[#121829] transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Help & Support</span>
            </button>

            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition-colors"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
              <span>Logout (Sadaf)</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
