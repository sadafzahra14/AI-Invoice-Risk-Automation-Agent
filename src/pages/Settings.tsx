import React, { useState } from 'react';
import { UserSettings } from '../types';
import {
  User,
  Bell,
  Cpu,
  Shield,
  Key,
  Smartphone,
  Save,
  CheckCircle2,
  Webhook,
  Sparkles,
  Sliders,
  Laptop,
} from 'lucide-react';

interface SettingsProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'warning' | 'info') => void;
}

export const Settings: React.FC<SettingsProps> = ({
  settings,
  onUpdateSettings,
  onShowToast,
}) => {
  const [formData, setFormData] = useState<UserSettings>({ ...settings });
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onUpdateSettings(formData);
      onShowToast('Settings Saved', 'Platform preferences and security thresholds updated successfully.', 'success');
    }, 500);
  };

  const handleTestWebhook = () => {
    if (!webhookUrl) {
      onShowToast('Webhook Required', 'Please enter a valid Make.com webhook URL before testing.', 'warning');
      return;
    }
    onShowToast('Webhook Pinged', `Test payload formatted for Make.com webhook listener. Ready for automation!`, 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Platform Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Configure profile details, risk heuristics, notification channels, and security controls.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Section */}
        <div className="rounded-3xl bg-[#0E1322] border border-[#1E273E] p-6 sm:p-7 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#1E273E]">
            <div className="p-2.5 rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/20">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Administrator Profile</h3>
              <p className="text-xs text-slate-400">Manage account credentials and role authorization</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#080B12] border border-[#1E273E] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Corporate Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#080B12] border border-[#1E273E] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Assigned Role
              </label>
              <input
                type="text"
                disabled
                value={formData.role}
                className="w-full bg-[#080B12]/60 border border-[#1E273E] rounded-xl px-4 py-2.5 text-sm text-slate-400 cursor-not-allowed"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Contact security admin to alter role assignments
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Workspace Organization
              </label>
              <input
                type="text"
                disabled
                value="FinFlow AI Enterprise Ledger"
                className="w-full bg-[#080B12]/60 border border-[#1E273E] rounded-xl px-4 py-2.5 text-sm text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="rounded-3xl bg-[#0E1322] border border-[#1E273E] p-6 sm:p-7 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#1E273E]">
            <div className="p-2.5 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Notification Settings</h3>
              <p className="text-xs text-slate-400">Control channels and frequency of dispatch alerts</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Email Notifications Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#080B12] border border-[#1E273E]">
              <div>
                <p className="text-sm font-semibold text-white">Email Notifications</p>
                <p className="text-xs text-slate-400">Receive transactional updates when invoices are processed</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600" />
              </label>
            </div>

            {/* Risk Alerts Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#080B12] border border-rose-500/20">
              <div>
                <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>High Risk Instant Alerts</span>
                </p>
                <p className="text-xs text-slate-400">Immediate SMS and email dispatch when risk score &gt; 70</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.riskAlerts}
                  onChange={(e) => setFormData({ ...formData, riskAlerts: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600" />
              </label>
            </div>

            {/* Payment Reminders Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#080B12] border border-[#1E273E]">
              <div>
                <p className="text-sm font-semibold text-white">Payment Reminders</p>
                <p className="text-xs text-slate-400">Reminders 3 business days before invoice due date</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.paymentReminders}
                  onChange={(e) => setFormData({ ...formData, paymentReminders: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600" />
              </label>
            </div>

            {/* Weekly Reports Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#080B12] border border-[#1E273E]">
              <div>
                <p className="text-sm font-semibold text-white">Weekly Executive Financial Digest</p>
                <p className="text-xs text-slate-400">Comprehensive summary of cash outflow and anomalies sent every Monday</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.weeklyReports}
                  onChange={(e) => setFormData({ ...formData, weeklyReports: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600" />
              </label>
            </div>
          </div>
        </div>

        {/* AI Analysis Settings */}
        <div className="rounded-3xl bg-[#0E1322] border border-[#1E273E] p-6 sm:p-7 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#1E273E]">
            <div className="p-2.5 rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Analysis & Risk Thresholds</h3>
              <p className="text-xs text-slate-400">Fine-tune automated machine learning parameters</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Risk Threshold Slider */}
            <div className="p-4 rounded-2xl bg-[#080B12] border border-[#1E273E] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-slate-300">
                  Automated High-Risk Alert Sensitivity Threshold
                </span>
                <span className="font-mono text-sm font-bold text-violet-400">
                  {formData.riskThreshold} / 100
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="90"
                value={formData.riskThreshold}
                onChange={(e) => setFormData({ ...formData, riskThreshold: Number(e.target.value) })}
                className="w-full accent-violet-600 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>Strict (40)</span>
                <span>Balanced (70)</span>
                <span>Permissive (90)</span>
              </div>
            </div>

            {/* Duplicate Invoice Detection Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#080B12] border border-[#1E273E]">
              <div>
                <p className="text-sm font-semibold text-white">Duplicate Invoice Detection</p>
                <p className="text-xs text-slate-400">Cryptographic hash matching to prevent dual vendor settlements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.duplicateDetection}
                  onChange={(e) => setFormData({ ...formData, duplicateDetection: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600" />
              </label>
            </div>

            {/* Anomaly Detection Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#080B12] border border-[#1E273E]">
              <div>
                <p className="text-sm font-semibold text-white">Historical Spending Anomaly Detection</p>
                <p className="text-xs text-slate-400">Flags amounts deviating &gt;2.5 standard deviations from vendor mean</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.anomalyDetection}
                  onChange={(e) => setFormData({ ...formData, anomalyDetection: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600" />
              </label>
            </div>
          </div>
        </div>

        {/* Security & Sessions */}
        <div className="rounded-3xl bg-[#0E1322] border border-[#1E273E] p-6 sm:p-7 shadow-xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-[#1E273E]">
            <div className="p-2.5 rounded-xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Security & Active Sessions</h3>
              <p className="text-xs text-slate-400">Authentication policies and device access</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* 2FA Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#080B12] border border-emerald-500/20">
              <div>
                <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Two-Factor Authentication (2FA)</span>
                </p>
                <p className="text-xs text-slate-400">Require authenticator app code on login</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.twoFactorAuth}
                  onChange={(e) => setFormData({ ...formData, twoFactorAuth: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600" />
              </label>
            </div>

            {/* Session Management Item */}
            <div className="p-4 rounded-2xl bg-[#080B12] border border-[#1E273E] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white flex items-center gap-2">
                    <span>Chrome on macOS (Current Session)</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    IP: 198.51.100.42 • Singapore (Cloud Run Ingress)
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Active Now
              </span>
            </div>
          </div>
        </div>

        {/* Future Make.com Webhook Integration Slot */}
        <div className="rounded-3xl bg-[#0E1322] border border-violet-500/30 p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#1E273E]">
            <div className="p-2.5 rounded-xl bg-indigo-600/15 text-indigo-400 border border-indigo-500/30">
              <Webhook className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Make.com / Webhook Connector</h3>
              <p className="text-xs text-slate-400">Stream parsed invoice JSON payloads to Make.com scenarios</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            When you're ready to activate live Make.com automations, paste your Make.com Custom Webhook URL below.
            The frontend is already configured to transmit vendorName, invoiceNumber, amount, and PDF details.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://hook.eu1.make.com/YOUR_CUSTOM_WEBHOOK_UUID"
              className="flex-1 bg-[#080B12] border border-[#1E273E] rounded-xl px-4 py-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-violet-500"
            />
            <button
              type="button"
              onClick={handleTestWebhook}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#161F36] hover:bg-violet-900/30 text-violet-300 border border-[#232F48] transition-colors whitespace-nowrap"
            >
              Test Payload
            </button>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
