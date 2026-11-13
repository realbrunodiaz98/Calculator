import React from 'react';
import { DealType } from '../types';
import { Sparkles, RotateCcw, CarFront, KeyRound } from 'lucide-react';

interface ToolbarProps {
  dealType: DealType;
  onDealTypeChange: (type: DealType) => void;
  onLoadExample: (type: 'lease' | 'finance') => void;
  onClear: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  dealType,
  onDealTypeChange,
  onLoadExample,
  onClear,
}) => {
  return (
    <div className="bg-[#171715] border border-[#262622] rounded-xl p-1.5 sm:p-4 mb-6 flex flex-nowrap items-center justify-between gap-1.5 sm:gap-3 shadow-lg overflow-x-auto">
      {/* Financing vs Leasing Segmented Toggle */}
      <div className="flex items-center gap-0.5 sm:gap-1 bg-[#0f0f0e] p-0.5 sm:p-1 rounded-lg border border-[#2a2a25] shrink-0">
        <button
          type="button"
          onClick={() => onDealTypeChange('lease')}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-sm font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
            dealType === 'lease'
              ? 'bg-[#262622] text-[#f5f5f2] border border-[#b98b54]/50 shadow-sm'
              : 'text-[#9c9c94] hover:text-[#e5e5e0]'
          }`}
        >
          <KeyRound className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#b98b54] shrink-0" />
          <span>Leasing</span>
        </button>

        <button
          type="button"
          onClick={() => onDealTypeChange('finance')}
          className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-sm font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
            dealType === 'finance'
              ? 'bg-[#262622] text-[#f5f5f2] border border-[#b98b54]/50 shadow-sm'
              : 'text-[#9c9c94] hover:text-[#e5e5e0]'
          }`}
        >
          <CarFront className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#b98b54] shrink-0" />
          <span>Financing</span>
        </button>
      </div>

      {/* Action buttons: Try an example & Clear */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <div className="relative group">
          <button
            type="button"
            onClick={() => onLoadExample(dealType)}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 sm:py-2 text-[10px] sm:text-sm font-medium text-[#b98b54] bg-[#b98b54]/10 hover:bg-[#b98b54]/20 border border-[#b98b54]/40 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>Try an example</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm font-medium text-[#8f8f88] hover:text-[#e0dfd9] hover:bg-[#22221e] border border-transparent hover:border-[#33332c] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          title="Reset all fields"
        >
          <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
};
