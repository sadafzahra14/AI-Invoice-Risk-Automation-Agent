export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type PaymentStatus = 'Processed' | 'Pending' | 'Review Required' | 'Paid' | 'Approved' | 'Rejected';

export type Currency = 'USD' | 'PKR' | 'EUR' | 'GBP';

export interface Invoice {
  id: string;
  vendor: string;
  date: string;
  dueDate: string;
  amount: number;
  currency: Currency;
  category: string;
  risk: RiskLevel;
  riskScore: number; // 0 - 100
  status: PaymentStatus;
  recipientEmail: string;
  fileName?: string;
  fileSize?: string;
  tax: number;
  explanation: string;
  riskFactors: string[];
  recommendation: string;
  emailPrepared: boolean;
  analysisCompleted: boolean;
  approvedBy?: string;
  notes?: string;
}

export type PageView = 
  | 'dashboard'
  | 'new-invoice'
  | 'processing'
  | 'financial-report'
  | 'history'
  | 'analytics'
  | 'settings';

export interface InvoiceFormData {
  vendorName: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: string;
  currency: Currency;
  recipientEmail: string;
  file: File | null;
  fileName: string;
  fileSize: string;
  category: string;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
}

export interface UserSettings {
  name: string;
  email: string;
  role: string;
  emailNotifications: boolean;
  riskAlerts: boolean;
  paymentReminders: boolean;
  weeklyReports: boolean;
  riskThreshold: number;
  duplicateDetection: boolean;
  anomalyDetection: boolean;
  twoFactorAuth: boolean;
}
