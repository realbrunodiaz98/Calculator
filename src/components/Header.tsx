import { FileDown } from 'lucide-react';

interface HeaderProps {
  onExportPdf?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onExportPdf }) => {
  return (
    <header className="border-b border-[#262622] bg-[#141412]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-wider text-xs sm:text-sm text-[#e8e6e3] uppercase">
            MAKE CHEAPER MISTAKES THAN I DID
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onExportPdf && (
            <button
              onClick={onExportPdf}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-[#f5f5f2] bg-[#b98b54]/20 hover:bg-[#b98b54]/30 border border-[#b98b54]/50 rounded transition-colors whitespace-nowrap cursor-pointer"
              title="Download clean PDF financial report"
            >
              <FileDown className="w-3.5 h-3.5 text-[#b98b54]" />
              <span>Export PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 border-t border-[#1d1d1a]">
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#f5f5f2] tracking-tight leading-[1.15]">
            The payment is only the beginning.
          </h1>
        </div>
      </div>
    </header>
  );
};
