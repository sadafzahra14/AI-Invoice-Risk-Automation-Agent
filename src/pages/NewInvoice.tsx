import React, { useState } from 'react';
import { Currency, InvoiceFormData, Invoice } from '../types';
import { FileUpload } from '../components/FileUpload';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  AlertCircle,
  FileCheck2,
  Cpu,
  BarChart2,
} from 'lucide-react';

interface NewInvoiceProps {
  onStartProcessing: (formData: InvoiceFormData) => void;
}

export const NewInvoice: React.FC<NewInvoiceProps> = ({ onStartProcessing }) => {
  const [formData, setFormData] = useState<InvoiceFormData>({
    vendorName: '',
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    amount: '',
    currency: 'USD',
    recipientEmail: '',
    file: null,
    fileName: '',
    fileSize: '',
    category: 'Software Subscription',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.vendorName.trim()) {
      errs.vendorName = 'Vendor name is required';
    }
    if (!formData.invoiceNumber.trim()) {
      errs.invoiceNumber = 'Invoice number is required';
    }
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      errs.amount = 'Please enter a valid invoice amount';
    }
    if (!formData.recipientEmail.trim() || !formData.recipientEmail.includes('@')) {
      errs.recipientEmail = 'Please provide a valid corporate recipient email';
    }
    if (!formData.fileName) {
      errs.file = 'Please upload or select an invoice PDF document';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /**
   * =========================================================================
   * MAKE.COM INTEGRATION PREPARATION
   * =========================================================================
   * This function is structured to facilitate seamless replacement with a
   * POST request to a Make.com Custom Webhook URL in the future:
   *
   * Example future webhook implementation:
   * await fetch("https://hook.eu1.make.com/YOUR_CUSTOM_WEBHOOK_URL", {
   *   method: "POST",
   *   headers: { "Content-Type": "application/json" },
   *   body: JSON.stringify({
   *     vendorName: data.vendorName,
   *     invoiceNumber: data.invoiceNumber,
   *     invoiceDate: data.invoiceDate,
   *     dueDate: data.dueDate,
   *     amount: Number(data.amount),
   *     currency: data.currency,
   *     recipientEmail: data.recipientEmail,
   *     fileName: data.fileName,
   *     fileSize: data.fileSize,
   *     category: data.category
   *   })
   * });
   * =========================================================================
   */
  const processInvoice = async (data: InvoiceFormData) => {
  setIsSubmitting(true);

  try {
    const webhookUrl = "https://hook.eu1.make.com/otmesl9jojojk65gz7lk9k4f1grp1g1q";

    const formData = new FormData();

    formData.append("vendorName", data.vendorName);
    formData.append("invoiceNumber", data.invoiceNumber);
    formData.append("invoiceDate", data.invoiceDate);
    formData.append("dueDate", data.dueDate);
    formData.append("amount", data.amount);
    formData.append("currency", data.currency);
    formData.append("recipientEmail", data.recipientEmail);
    formData.append("category", data.category);

    if (data.file) {
      formData.append("invoiceFile", data.file, data.fileName);
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to send invoice to FinFlow AI");
    }

    // Move to Processing screen
    onStartProcessing(data);

  } catch (error) {
    console.error("Webhook Error:", error);
    alert("Invoice could not be submitted. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      processInvoice(formData);
    }
  };

  const fillSampleData = (type: 'cloudsync' | 'datacore') => {
    if (type === 'cloudsync') {
      const blob = new Blob(['Mock PDF'], { type: 'application/pdf' });
      const file = new File([blob], 'cloudsync_subscription_sept.pdf', { type: 'application/pdf' });
      setFormData({
        vendorName: 'CloudSync Ltd',
        invoiceNumber: 'INV-1002',
        invoiceDate: '2026-09-02',
        dueDate: '2026-09-30',
        amount: '4850',
        currency: 'USD',
        recipientEmail: 'billing@cloudsync.io',
        file: file,
        fileName: 'cloudsync_subscription_sept.pdf',
        fileSize: '2.8 MB',
        category: 'Software Subscription',
      });
    } else {
      const blob = new Blob(['Mock PDF'], { type: 'application/pdf' });
      const file = new File([blob], 'datacore_infrastructure_spike.pdf', { type: 'application/pdf' });
      setFormData({
        vendorName: 'DataCore Systems',
        invoiceNumber: 'INV-1003',
        invoiceDate: '2026-09-03',
        dueDate: '2026-09-15',
        amount: '12500',
        currency: 'USD',
        recipientEmail: 'accounts@datacore.net',
        file: file,
        fileName: 'datacore_infrastructure_spike.pdf',
        fileSize: '4.1 MB',
        category: 'Database Infrastructure',
      });
    }
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Heading and Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Process a New Invoice
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Submit your invoice for AI-powered financial analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            AI System Online
          </span>

          <button
            type="button"
            onClick={() => fillSampleData('cloudsync')}
            className="text-xs px-3 py-1 rounded-lg bg-violet-600/15 hover:bg-violet-600/25 text-violet-300 border border-violet-500/30 transition-colors"
          >
            Load CloudSync Demo
          </button>
        </div>
      </div>

      {/* Main Invoice Form Card */}
      <div className="rounded-3xl bg-[#0E1322] border border-[#1E273E] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Vendor Name & Invoice Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Vendor Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. CloudSync"
                value={formData.vendorName}
                onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                className={`w-full bg-[#080B12] border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                  errors.vendorName
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-[#1E273E] focus:border-violet-500 focus:ring-violet-500'
                }`}
              />
              {errors.vendorName && (
                <p className="text-xs text-rose-400 mt-1">{errors.vendorName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Invoice Number <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. INV-2026-001"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                className={`w-full bg-[#080B12] border rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                  errors.invoiceNumber
                    ? 'border-rose-500 focus:ring-rose-500'
                    : 'border-[#1E273E] focus:border-violet-500 focus:ring-violet-500'
                }`}
              />
              {errors.invoiceNumber && (
                <p className="text-xs text-rose-400 mt-1">{errors.invoiceNumber}</p>
              )}
            </div>
          </div>

          {/* Row 2: Dates (Invoice Date & Due Date) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Invoice Date
              </label>
              <input
                type="date"
                value={formData.invoiceDate}
                onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                className="w-full bg-[#080B12] border border-[#1E273E] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full bg-[#080B12] border border-[#1E273E] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>
          </div>

          {/* Row 3: Amount, Currency & Recipient Email */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Total Amount <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm">
                  $
                </span>
                <input
                  type="number"
                  placeholder="4850"
                  step="any"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className={`w-full bg-[#080B12] border rounded-xl pl-8 pr-4 py-2.5 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                    errors.amount
                      ? 'border-rose-500 focus:ring-rose-500'
                      : 'border-[#1E273E] focus:border-violet-500 focus:ring-violet-500'
                  }`}
                />
              </div>
              {errors.amount && <p className="text-xs text-rose-400 mt-1">{errors.amount}</p>}
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value as Currency })}
                className="w-full bg-[#080B12] border border-[#1E273E] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="PKR">PKR (₨)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#080B12] border border-[#1E273E] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 cursor-pointer"
              >
                <option value="Software Subscription">Software Subscription</option>
                <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                <option value="Database Infrastructure">Database Infrastructure</option>
                <option value="AI Model Hosting">AI Model Hosting</option>
                <option value="Design & Creative">Design & Creative</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Hardware & Peripherals">Hardware & Peripherals</option>
              </select>
            </div>
          </div>

          {/* Recipient Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Recipient Email <span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              placeholder="client@example.com"
              value={formData.recipientEmail}
              onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
              className={`w-full bg-[#080B12] border rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-1 transition-all ${
                errors.recipientEmail
                  ? 'border-rose-500 focus:ring-rose-500'
                  : 'border-[#1E273E] focus:border-violet-500 focus:ring-violet-500'
              }`}
            />
            {errors.recipientEmail && (
              <p className="text-xs text-rose-400 mt-1">{errors.recipientEmail}</p>
            )}
          </div>

          {/* Invoice PDF Upload */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Invoice PDF Document <span className="text-rose-400">*</span>
            </label>
            <FileUpload
              selectedFile={formData.file}
              fileName={formData.fileName}
              fileSize={formData.fileSize}
              onFileSelect={(file, fileName, fileSize) => {
                setFormData({
                  ...formData,
                  file,
                  fileName,
                  fileSize,
                });
                if (fileName) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.file;
                    return next;
                  });
                }
              }}
              error={errors.file}
            />
          </div>

          {/* Bottom Security Message & Submit Button */}
          <div className="pt-4 border-t border-[#1E273E] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Lock className="w-4 h-4 text-violet-400" />
              <span>Your financial data is securely processed.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.6)] transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-violet-200" />
              <span>✦ Process Invoice →</span>
            </button>
          </div>
        </form>
      </div>

      {/* Three Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#0E1322] border border-[#1E273E] flex items-start gap-3.5 hover:border-violet-500/30 transition-all">
          <div className="p-2.5 rounded-xl bg-violet-600/10 text-violet-400 border border-violet-500/20 flex-shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">AI Powered</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Automatically extracts and analyzes invoice data.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E1322] border border-[#1E273E] flex items-start gap-3.5 hover:border-amber-500/30 transition-all">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Risk Detection</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Identifies potentially risky financial transactions.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0E1322] border border-[#1E273E] flex items-start gap-3.5 hover:border-emerald-500/30 transition-all">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Instant Reports</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Get detailed financial insights within seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
