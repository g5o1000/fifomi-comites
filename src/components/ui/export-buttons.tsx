import React from 'react';
import { Copy, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from './button';

interface ExportButtonsProps {
  onCopy: () => void;
  onExportCSV: () => void;
  onExportExcel: () => void;
  className?: string;
}

export function ExportButtons({
  onCopy,
  onExportCSV,
  onExportExcel,
  className = '',
}: ExportButtonsProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <Button
        size="sm"
        onClick={onCopy}
        className="h-8 gap-1.5 bg-gradient-to-r from-[#6B7280] to-[#4B5563] hover:from-[#4B5563] hover:to-[#374151] text-white text-xs"
      >
        <Copy className="w-3.5 h-3.5" />
        Copy
      </Button>
      <Button
        size="sm"
        onClick={onExportCSV}
        className="h-8 gap-1.5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white text-xs"
      >
        <FileText className="w-3.5 h-3.5" />
        CSV
      </Button>
      <Button
        size="sm"
        onClick={onExportExcel}
        className="h-8 gap-1.5 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-xs"
      >
        <FileSpreadsheet className="w-3.5 h-3.5" />
        Excel
      </Button>
    </div>
  );
}
