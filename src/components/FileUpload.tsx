import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, X, AlertCircle, FileCheck } from 'lucide-react';

interface FileUploadProps {
  selectedFile: File | null;
  fileName: string;
  fileSize: string;
  onFileSelect: (file: File | null, fileName: string, fileSize: string) => void;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  selectedFile,
  fileName,
  fileSize,
  onFileSelect,
  error,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a valid PDF document.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds the 10 MB limit.');
      return;
    }

    const sizeFormatted = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    onFileSelect(file, file.name, sizeFormatted);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null, '', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const loadSamplePdf = (sampleName: string, size: string) => {
    // Create a mock File object for immediate testing
    const blob = new Blob(['Mock PDF Content - FinFlow AI Invoice'], { type: 'application/pdf' });
    const file = new File([blob], sampleName, { type: 'application/pdf' });
    onFileSelect(file, sampleName, size);
  };

  return (
    <div className="w-full space-y-3">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[220px] ${
          isDragging
            ? 'border-violet-500 bg-violet-950/20 scale-[1.01]'
            : fileName
            ? 'border-emerald-500/40 bg-emerald-950/10'
            : error
            ? 'border-rose-500/40 bg-rose-950/10'
            : 'border-[#232F48] bg-[#0B0F1A]/80 hover:border-violet-500/50 hover:bg-[#0E1424]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
          id="invoice-pdf-input"
        />

        {fileName ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center justify-center gap-2">
                <p className="font-semibold text-white text-base truncate max-w-xs">{fileName}</p>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="p-1 rounded-full hover:bg-slate-700/60 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {fileSize} • Ready for AI extraction
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>PDF ready for risk analysis</span>
            </div>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-violet-600/10 border border-violet-500/25 flex items-center justify-center text-violet-400 mb-3 shadow-[0_0_15px_rgba(139,92,246,0.15)] group-hover:scale-105 transition-transform">
              <UploadCloud className="w-7 h-7" />
            </div>
            <h4 className="text-base font-semibold text-white">Upload your invoice PDF</h4>
            <p className="text-sm text-slate-400 mt-1">Drag & drop or click to browse</p>
            <span className="text-xs font-mono text-slate-500 mt-2 px-2.5 py-0.5 rounded bg-slate-900/80 border border-slate-800">
              PDF only • Maximum 10 MB
            </span>
          </>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Quick sample PDF load helper */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <span className="text-xs text-slate-500">Quick Test Samples:</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => loadSamplePdf('CloudSync_Inv_1002.pdf', '2.8 MB')}
            className="text-xs px-2.5 py-1 rounded-md bg-[#161F36] hover:bg-violet-900/30 text-slate-300 hover:text-violet-300 border border-[#232F48] transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3 h-3 text-violet-400" />
            <span>CloudSync (Medium Risk)</span>
          </button>
          <button
            type="button"
            onClick={() => loadSamplePdf('DataCore_Sys_Spike.pdf', '4.1 MB')}
            className="text-xs px-2.5 py-1 rounded-md bg-[#161F36] hover:bg-rose-900/30 text-slate-300 hover:text-rose-300 border border-[#232F48] transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3 h-3 text-rose-400" />
            <span>DataCore (High Risk)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
