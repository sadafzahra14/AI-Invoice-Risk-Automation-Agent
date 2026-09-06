import React, { useEffect, useState } from 'react';
import { Invoice, InvoiceFormData } from '../types';
import { ProcessingSteps } from '../components/ProcessingSteps';
import { Sparkles, Loader2, FastForward, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

interface ProcessingProps {
  invoiceData: InvoiceFormData | null;
  onComplete: (generatedInvoice: Invoice) => void;
}

export const Processing: React.FC<ProcessingProps> = ({ invoiceData, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progressPercent, setProgressPercent] = useState(25);

  // Generate result invoice based on submitted form data
  const generateAnalyzedInvoice = (): Invoice => {
    const amountNum = invoiceData ? Number(invoiceData.amount) : 4850;
    const vendorName = invoiceData?.vendorName || 'CloudSync Ltd';
    const invNumber = invoiceData?.invoiceNumber || 'INV-1002';
    const isHigh = amountNum > 10000 || vendorName.toLowerCase().includes('datacore');
    const isMedium = amountNum > 3000 || vendorName.toLowerCase().includes('cloudsync');

    const riskLevel = isHigh ? 'HIGH' : isMedium ? 'MEDIUM' : 'LOW';
    const riskScore = isHigh ? 88 : isMedium ? 62 : 18;

    return {
      id: invNumber,
      vendor: vendorName,
      date: invoiceData?.invoiceDate || 'Sep 2, 2026',
      dueDate: invoiceData?.dueDate || 'Sep 30, 2026',
      amount: amountNum,
      currency: invoiceData?.currency || 'USD',
      category: invoiceData?.category || 'Software Subscription',
      risk: riskLevel,
      riskScore: riskScore,
      status: isHigh ? 'Review Required' : isMedium ? 'Pending' : 'Processed',
      recipientEmail: invoiceData?.recipientEmail || 'billing@cloudsync.io',
      fileName: invoiceData?.fileName || 'invoice_document.pdf',
      fileSize: invoiceData?.fileSize || '2.8 MB',
      tax: Math.round(amountNum * 0.1),
      explanation: isHigh
        ? 'The invoice amount represents a substantial anomaly compared to historic transactions. Unscheduled expedited payment terms flagged.'
        : isMedium
        ? 'The invoice amount is above the normal transaction range for this vendor. The invoice should be reviewed before payment.'
        : 'All transaction metrics, tax codes, and vendor historical benchmarks verified successfully with no anomalies.',
      riskFactors: isHigh
        ? [
            'Invoice total represents >300% increase over previous benchmark',
            'Vendor updated settlement details within last 30 days',
            'High-risk surge in resource provisioning quota'
          ]
        : isMedium
        ? [
            'Above average invoice amount',
            'Payment deadline approaching',
            'Vendor transaction requires verification'
          ]
        : [
            'Standard recurring vendor agreement active',
            'Purchase order lines match catalog pricing',
            'Clean verification history across 12 cycles'
          ],
      recommendation: isHigh
        ? 'Requires mandatory two-person administrative sign-off before releasing payment.'
        : isMedium
        ? 'Verify the vendor and invoice details before approving payment.'
        : 'Safe for automated standard reconciliation.',
      emailPrepared: true,
      analysisCompleted: true,
    };
  };

  useEffect(() => {
    // Step 1 -> Step 2
    const timer1 = setTimeout(() => {
      setCurrentStep(2);
      setProgressPercent(50);
    }, 900);

    // Step 2 -> Step 3
    const timer2 = setTimeout(() => {
      setCurrentStep(3);
      setProgressPercent(75);
    }, 1800);

    // Step 3 -> Step 4
    const timer3 = setTimeout(() => {
      setCurrentStep(4);
      setProgressPercent(100);
    }, 2700);

    // Auto navigate after step 4 finishes
    const timer4 = setTimeout(() => {
      const result = generateAnalyzedInvoice();
      onComplete(result);
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleSkip = () => {
    const result = generateAnalyzedInvoice();
    onComplete(result);
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto text-center">
      {/* Animated Radar/Orb */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-violet-600/10 border border-violet-500/30 flex items-center justify-center relative shadow-[0_0_50px_rgba(124,58,237,0.3)]">
          <div className="absolute inset-0 rounded-full border border-violet-400/30 animate-ping opacity-40" />
          <div className="absolute -inset-3 rounded-full border border-indigo-500/20 animate-pulse" />
          <Sparkles className="w-10 h-10 text-violet-400 animate-pulse" />
        </div>
      </div>

      {/* Main Title and Subtitle */}
      <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
        Analyzing Your Invoice...
      </h1>
      <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-md">
        FinFlow AI is extracting and analyzing your financial data.
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-md mt-6 mb-8">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
          <span>AI Pipeline</span>
          <span className="text-violet-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#0E1322] border border-[#1E273E] overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 transition-all duration-700 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Processing Steps List */}
      <div className="w-full mb-8 text-left">
        <ProcessingSteps currentStep={currentStep} />
      </div>

      {/* Status Footer Message */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-xl px-4 py-3 rounded-xl bg-[#0E1322]/80 border border-[#1E273E] gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Loader2 className="w-4 h-4 text-violet-400 animate-spin flex-shrink-0" />
          <span>AI engine is processing your document...</span>
        </div>

        <button
          onClick={handleSkip}
          className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-semibold px-2 py-1 rounded hover:bg-violet-950/40 transition-colors"
        >
          <span>Skip to Report</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
