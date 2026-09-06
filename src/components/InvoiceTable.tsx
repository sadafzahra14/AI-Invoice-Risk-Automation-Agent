import React, { useState, useMemo } from 'react';
import { Invoice, RiskLevel, PaymentStatus } from '../types';
import { RiskBadge } from './RiskBadge';
import { Search, Filter, ArrowUpDown, ChevronRight, Eye, CheckCircle2, Clock, AlertTriangle, ShieldAlert } from 'lucide-react';

interface InvoiceTableProps {
  invoices: Invoice[];
  onViewReport: (invoice: Invoice) => void;
  limit?: number;
  showFilters?: boolean;
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  onViewReport,
  limit,
  showFilters = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc' | 'risk-desc'>('date-desc');

  const filteredInvoices = useMemo(() => {
    let result = invoices.filter((inv) => {
      const matchesSearch =
        inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.recipientEmail.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRisk = riskFilter === 'ALL' || inv.risk === riskFilter;
      const matchesStatus = statusFilter === 'ALL' || inv.status === statusFilter;

      return matchesSearch && matchesRisk && matchesStatus;
    });

    result.sort((a, b) => {
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      if (sortBy === 'amount-asc') return a.amount - b.amount;
      if (sortBy === 'risk-desc') return b.riskScore - a.riskScore;
      // default: date desc
      return b.id.localeCompare(a.id);
    });

    if (limit) {
      return result.slice(0, limit);
    }
    return result;
  }, [invoices, searchTerm, riskFilter, statusFilter, sortBy, limit]);

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'Processed':
      case 'Paid':
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            {status}
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3 h-3" />
            {status}
          </span>
        );
      case 'Review Required':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-3 h-3" />
            Review Required
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full space-y-4">
      {showFilters && (
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, vendor or category..."
              className="w-full bg-[#0E1322] border border-[#1E273E] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Risk filter */}
            <div className="flex items-center bg-[#0E1322] border border-[#1E273E] rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
              <span className="text-slate-500 mr-2 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Risk:
              </span>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none cursor-pointer pr-2"
              >
                <option value="ALL" className="bg-[#0E1322]">All Risks</option>
                <option value="LOW" className="bg-[#0E1322]">Low Risk</option>
                <option value="MEDIUM" className="bg-[#0E1322]">Medium Risk</option>
                <option value="HIGH" className="bg-[#0E1322]">High Risk</option>
              </select>
            </div>

            {/* Status filter */}
            <div className="flex items-center bg-[#0E1322] border border-[#1E273E] rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
              <span className="text-slate-500 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none cursor-pointer pr-2"
              >
                <option value="ALL" className="bg-[#0E1322]">All Statuses</option>
                <option value="Processed" className="bg-[#0E1322]">Processed</option>
                <option value="Pending" className="bg-[#0E1322]">Pending</option>
                <option value="Review Required" className="bg-[#0E1322]">Review Required</option>
                <option value="Paid" className="bg-[#0E1322]">Paid</option>
              </select>
            </div>

            {/* Sort by */}
            <div className="flex items-center bg-[#0E1322] border border-[#1E273E] rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 mr-1.5" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none cursor-pointer"
              >
                <option value="date-desc" className="bg-[#0E1322]">Newest First</option>
                <option value="amount-desc" className="bg-[#0E1322]">Amount: High to Low</option>
                <option value="amount-asc" className="bg-[#0E1322]">Amount: Low to High</option>
                <option value="risk-desc" className="bg-[#0E1322]">Highest Risk First</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-[#1E273E] bg-[#0E1322]/90 shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1E273E] bg-[#121829]/90 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="py-3.5 px-4">Invoice ID</th>
              <th className="py-3.5 px-4">Vendor</th>
              <th className="py-3.5 px-4">Invoice Date</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Due Date</th>
              <th className="py-3.5 px-4">Amount</th>
              <th className="py-3.5 px-4">Risk Level</th>
              <th className="py-3.5 px-4">Payment Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A2236] text-sm">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-[#161F36]/60 transition-colors group"
                >
                  <td className="py-3.5 px-4 font-mono font-medium text-violet-400 whitespace-nowrap">
                    {invoice.id}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-white whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>{invoice.vendor}</span>
                      <span className="text-xs text-slate-500 font-normal">{invoice.category}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap text-xs">
                    {invoice.date}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap text-xs hidden md:table-cell">
                    {invoice.dueDate}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white whitespace-nowrap">
                    ${invoice.amount.toLocaleString()}
                    <span className="text-xs text-slate-500 font-normal ml-1">
                      {invoice.currency}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <RiskBadge level={invoice.risk} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => onViewReport(invoice)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600/10 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/25 hover:border-violet-500 transition-all duration-200 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.25)]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Report</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Search className="w-8 h-8 text-slate-600" />
                    <p className="text-sm font-medium text-slate-400">No invoices matched your filters</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setRiskFilter('ALL');
                        setStatusFilter('ALL');
                      }}
                      className="text-xs text-violet-400 hover:text-violet-300 underline mt-1"
                    >
                      Reset all filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing {filteredInvoices.length} of {invoices.length} total invoices
        </span>
        {limit && invoices.length > limit && (
          <span className="text-violet-400 font-medium">
            Recent activity preview
          </span>
        )}
      </div>
    </div>
  );
};
