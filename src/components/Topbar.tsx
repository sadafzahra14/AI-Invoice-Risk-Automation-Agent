import React, { useState, useRef, useEffect } from 'react';
import { PageView } from '../types';
import { NOTIFICATIONS_DATA } from '../data/mockInvoices';
import {
  Bell,
  Sparkles,
  Menu,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  UserCheck,
  ExternalLink,
} from 'lucide-react';

interface TopbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenMobileSidebar: () => void;
  userName?: string;
  userRole?: string;
}

export const Topbar: React.FC<TopbarProps> = ({
  currentPage,
  onNavigate,
  onOpenMobileSidebar,
  userName = 'Sadaf',
  userRole = 'Administrator',
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const getPageTitle = (page: PageView) => {
    switch (page) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'new-invoice':
        return 'Process New Invoice';
      case 'processing':
        return 'AI Analysis Pipeline';
      case 'financial-report':
        return 'AI Financial Report';
      case 'history':
        return 'Invoice History & Audit';
      case 'analytics':
        return 'Financial Analytics';
      case 'settings':
        return 'Platform Settings';
      default:
        return 'FinFlow AI';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#080B12]/85 backdrop-blur-md border-b border-[#1A2236] px-4 sm:px-6 flex items-center justify-between">
      {/* Left side: Mobile menu toggle and current title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#121829] lg:hidden transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight">
              {getPageTitle(currentPage)}
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI System Online
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden md:block">
            Welcome back, <span className="text-slate-200 font-semibold">{userName}</span> • Real-time financial oversight
          </p>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-3">
        {/* Quick process button if not on new invoice */}
        {currentPage !== 'new-invoice' && currentPage !== 'processing' && (
          <button
            onClick={() => onNavigate('new-invoice')}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all transform hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Process New Invoice</span>
          </button>
        )}

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-[#0E1322] border border-[#1E273E] text-slate-300 hover:text-white hover:border-violet-500/50 transition-all"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0E1322] border border-[#1E273E] shadow-2xl py-3 z-50 overflow-hidden">
              <div className="px-4 pb-3 border-b border-[#1B243B] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">System Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-mono">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-slate-400 hover:text-violet-400 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-[#182035]">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3.5 hover:bg-[#151D33] transition-colors flex items-start gap-3 ${
                      notif.unread ? 'bg-violet-950/15' : ''
                    }`}
                  >
                    <div className="mt-0.5">
                      {notif.type === 'danger' && (
                        <div className="p-1.5 rounded-lg bg-rose-500/15 text-rose-400">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                      )}
                      {notif.type === 'success' && (
                        <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                      {notif.type === 'info' && (
                        <div className="p-1.5 rounded-lg bg-sky-500/15 text-sky-400">
                          <Info className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white">{notif.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        {notif.desc}
                      </p>
                      <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2.5 border-t border-[#1B243B] text-center bg-[#0B0F1A]">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('history');
                  }}
                  className="text-xs text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-1"
                >
                  <span>Review all audit events</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile avatar & badge */}
        <div
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-[#1E273E] cursor-pointer group"
          title="Account Settings"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-purple-800 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_12px_rgba(139,92,246,0.3)] group-hover:scale-105 transition-transform border border-violet-400/30">
              {userName.charAt(0)}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#080B12]" />
          </div>

          <div className="hidden md:block text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-white group-hover:text-violet-300 transition-colors">
                {userName}
              </span>
            </div>
            <span className="inline-block text-[10px] uppercase font-bold tracking-wider text-violet-400 bg-violet-500/10 px-1.5 py-0.2 rounded border border-violet-500/20">
              {userRole}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
