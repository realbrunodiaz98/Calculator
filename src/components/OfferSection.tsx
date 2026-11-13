import React from 'react';
import { CarCalculatorState } from '../types';

interface OfferSectionProps {
  state: CarCalculatorState;
  onChange: (patch: Partial<CarCalculatorState>) => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({ state, onChange }) => {
  const isLease = state.dealType === 'lease';

  const termOptions = isLease ? [24, 36, 48] : [36, 48, 60, 72, 84];

  return (
    <div className="bg-[#171715] border border-[#262622] rounded-xl p-5 sm:p-6 mb-6 shadow-md transition-colors hover:border-[#383832]">
      <div className="flex items-center justify-between pb-4 border-b border-[#242420] mb-5">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#b98b54] uppercase block mb-1">
            SECTION 01
          </span>
          <h2 className="text-xl font-bold text-[#f5f5f2]">
            The offer on the table
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Monthly payment */}
        <div className="sm:col-span-2">
          <div className="flex justify-between items-baseline mb-1.5">
            <label htmlFor="quotedPayment" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be]">
              Monthly payment
            </label>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#808078] font-mono text-sm">
              $
            </span>
            <input
              id="quotedPayment"
              type="number"
              min="0"
              step="1"
              value={state.quotedPayment === 0 ? '' : state.quotedPayment}
              onChange={(e) => onChange({ quotedPayment: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 485"
              className="w-full bg-[#111110] border border-[#2b2b26] focus:border-[#b98b54] focus:ring-1 focus:ring-[#b98b54] rounded-lg py-2.5 pl-8 pr-4 text-base font-mono text-[#f5f5f2] placeholder-[#4d4d47] transition-all outline-none"
            />
          </div>
        </div>

        {/* Term (months) */}
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label htmlFor="termMonths" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be]">
              {isLease ? 'Lease length' : 'Loan term'}
            </label>
            <span className="text-[11px] text-[#808078]">Months</span>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <input
                id="termMonths"
                type="number"
                min="12"
                max="96"
                step="1"
                value={state.termMonths === 0 ? '' : state.termMonths}
                onChange={(e) => onChange({ termMonths: parseInt(e.target.value, 10) || 0 })}
                placeholder="36"
                className="w-full bg-[#111110] border border-[#2b2b26] focus:border-[#b98b54] focus:ring-1 focus:ring-[#b98b54] rounded-lg py-2.5 px-3.5 text-sm font-mono text-[#f5f5f2] placeholder-[#4d4d47] transition-all outline-none"
              />
            </div>
            {/* Quick term selectors */}
            <div className="flex gap-1.5">
              {termOptions.map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => onChange({ termMonths: months })}
                  className={`flex-1 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
                    state.termMonths === months
                      ? 'border-[#b98b54] text-[#b98b54] bg-[#b98b54]/10'
                      : 'border-[#262622] text-[#8c8c85] hover:text-[#d4d4ce] hover:border-[#383832]'
                  }`}
                >
                  {months}m
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Total due at signing */}
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label htmlFor="dueAtSigning" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be]">
              Total due at signing
            </label>
            <span className="text-[11px] text-[#808078]">Down payment + drive-off</span>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#808078] font-mono text-sm">
              $
            </span>
            <input
              id="dueAtSigning"
              type="number"
              min="0"
              step="50"
              value={state.dueAtSigning === 0 ? '' : state.dueAtSigning}
              onChange={(e) => onChange({ dueAtSigning: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 3000"
              className="w-full bg-[#111110] border border-[#2b2b26] focus:border-[#b98b54] focus:ring-1 focus:ring-[#b98b54] rounded-lg py-2.5 pl-8 pr-4 text-sm font-mono text-[#f5f5f2] placeholder-[#4d4d47] transition-all outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
