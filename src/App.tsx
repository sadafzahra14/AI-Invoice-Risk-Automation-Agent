import React, { useState, useEffect } from 'react';
import { PageView, Invoice, InvoiceFormData, ToastNotification, UserSettings } from './types';
import { INITIAL_INVOICES } from './data/mockInvoices';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { ToastContainer } from './components/Toast';
import { HelpModal } from './components/HelpModal';

// Pages
import { Dashboard } from './pages/Dashboard';
import { NewInvoice } from './pages/NewInvoice';
import { Processing } from './pages/Processing';
import { FinancialReport } from './pages/FinancialReport';
import { InvoiceHistory } from './pages/InvoiceHistory';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  // Default selected invoice is CloudSync Ltd (INV-1002) as highlighted in the specification
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice>(INITIAL_INVOICES[1]);
  const [pendingInvoiceData, setPendingInvoiceData] = useState<InvoiceFormData | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const [settings, setSettings] = useState<UserSettings>({
    name: 'Sadaf',
    email: 'zahrasadaf619@gmail.com',
    role: 'Administrator',
    emailNotifications: true,
    riskAlerts: true,
    paymentReminders: true,
    weeklyReports: false,
    riskThreshold: 70,
    duplicateDetection: true,
    anomalyDetection: true,
    twoFactorAuth: true,
  });

  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'warning' | 'info' | 'error' = 'info'
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastNotification = {
      id,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartProcessing = (formData: InvoiceFormData) => {
    setPendingInvoiceData(formData);
    setCurrentPage('processing');
  };

  const handleCompleteProcessing = (newInvoice: Invoice) => {
    // Add to list or replace if ID already exists
    setInvoices((prev) => {
      const existingIndex = prev.findIndex((inv) => inv.id === newInvoice.id);
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = newInvoice;
        return next;
      }
      return [newInvoice, ...prev];
    });

    setSelectedInvoice(newInvoice);
    setCurrentPage('financial-report');
    showToast(
      'Analysis Complete',
      `Invoice ${newInvoice.id} evaluated. Risk score: ${newInvoice.riskScore}/100.`,
      newInvoice.risk === 'HIGH' ? 'warning' : 'success'
    );
  };

  const handleViewReport = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setCurrentPage('financial-report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateInvoice = (updated: Invoice) => {
    setSelectedInvoice(updated);
    setInvoices((prev) => prev.map((inv) => (inv.id === updated.id ? updated : inv)));
  };

  const handleLogout = () => {
    showToast('Logged Out', 'Demo session terminated. Returning to Dashboard overview.', 'info');
    setCurrentPage('dashboard');
  };

  const highRiskCount = invoices.filter((i) => i.risk === 'HIGH').length;

  return (
    <div className="min-h-screen bg-[#080B12] text-[#F8FAFC] flex flex-col lg:flex-row antialiased selection:bg-violet-600 selection:text-white">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        highRiskCount={highRiskCount}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Top Header */}
        <Topbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenMobileSidebar={() => setIsMobileMenuOpen(true)}
          userName={settings.name}
          userRole={settings.role}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          {currentPage === 'dashboard' && (
            <Dashboard
              invoices={invoices}
              onNavigate={handleNavigate}
              onViewReport={handleViewReport}
            />
          )}

          {currentPage === 'new-invoice' && (
            <NewInvoice onStartProcessing={handleStartProcessing} />
          )}

          {currentPage === 'processing' && (
            <Processing
              invoiceData={pendingInvoiceData}
              onComplete={handleCompleteProcessing}
            />
          )}

          {currentPage === 'financial-report' && (
            <FinancialReport
              invoice={selectedInvoice}
              onNavigate={handleNavigate}
              onUpdateInvoice={handleUpdateInvoice}
              onShowToast={showToast}
            />
          )}

          {currentPage === 'history' && (
            <InvoiceHistory
              invoices={invoices}
              onNavigate={handleNavigate}
              onViewReport={handleViewReport}
              onShowToast={showToast}
            />
          )}

          {currentPage === 'analytics' && (
            <Analytics
              invoices={invoices}
              onNavigate={handleNavigate}
              onViewReport={handleViewReport}
            />
          )}

          {currentPage === 'settings' && (
            <Settings
              settings={settings}
              onUpdateSettings={setSettings}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Help / Support Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
