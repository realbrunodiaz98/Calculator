import React from 'react';
import { CarCalculatorState } from '../types';
import { AlertTriangle, CheckCircle2, Gauge } from 'lucide-react';
import { formatNumber, formatCurrency } from '../utils/calculator';

interface MileageSectionProps {
  state: CarCalculatorState;
  onChange: (patch: Partial<CarCalculatorState>) => void;
}

export const MileageSection: React.FC<MileageSectionProps> = ({ state, onChange }) => {
  if (state.dealType !== 'lease') {
    return null;
  }

  const annualDriven = (state.milesPerWeek || 0) * 52;
  const isOver = annualDriven > state.allowedMilesPerYear;
  const annualOverage = Math.max(0, annualDriven - state.allowedMilesPerYear);
  const termYears = (state.termMonths || 36) / 12;
  const termOverage = annualOverage * termYears;
  const expectedPenalty = termOverage * (state.chargePerExcessMile || 0.25);

  const mileageOptions = [7500, 10000, 12000, 15000];

  return (
    <div className="bg-[#171715] border border-[#262622] rounded-xl p-5 sm:p-6 mb-6 shadow-md transition-colors hover:border-[#383832]">
      <div className="flex items-center justify-between pb-4 border-b border-[#242420] mb-5">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#b98b54] uppercase block mb-1">
            SECTION 03
          </span>
          <h2 className="text-xl font-bold text-[#f5f5f2]">
            The miles add up
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Allowed miles per year */}
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label htmlFor="allowedMiles" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be]">
              Allowed miles per year
            </label>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <input
                id="allowedMiles"
                type="number"
                min="5000"
                step="500"
                value={state.allowedMilesPerYear === 0 ? '' : state.allowedMilesPerYear}
                onChange={(e) => onChange({ allowedMilesPerYear: parseInt(e.target.value, 10) || 0 })}
                placeholder="10000"
                className="w-full bg-[#111110] border border-[#2b2b26] focus:border-[#b98b54] focus:ring-1 focus:ring-[#b98b54] rounded-lg py-2.5 px-3.5 text-sm font-mono text-[#f5f5f2] placeholder-[#4d4d47] transition-all outline-none"
              />
            </div>
            <div className="flex gap-1.5">
              {mileageOptions.map((miles) => (
                <button
                  key={miles}
                  type="button"
                  onClick={() => onChange({ allowedMilesPerYear: miles })}
                  className={`flex-1 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
                    state.allowedMilesPerYear === miles
                      ? 'border-[#b98b54] text-[#b98b54] bg-[#b98b54]/10'
                      : 'border-[#262622] text-[#8c8c85] hover:text-[#d4d4ce] hover:border-[#383832]'
                  }`}
                >
                  {miles / 1000}k
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Miles you drive per week */}
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label htmlFor="milesPerWeek" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be]">
              Miles you drive per week
            </label>
            <span className="text-[11px] font-mono text-[#b98b54]">
              {formatNumber(annualDriven)} mi/yr
            </span>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <input
                id="milesPerWeek"
                type="number"
                min="0"
                max="1000"
                step="10"
                value={state.milesPerWeek === 0 ? '' : state.milesPerWeek}
                onChange={(e) => onChange({ milesPerWeek: parseInt(e.target.value, 10) || 0 })}
                placeholder="250"
                className="w-full bg-[#111110] border border-[#2b2b26] focus:border-[#b98b54] focus:ring-1 focus:ring-[#b98b54] rounded-lg py-2.5 px-3.5 text-sm font-mono text-[#f5f5f2] placeholder-[#4d4d47] transition-all outline-none"
              />
            </div>
            <input
              type="range"
              min="50"
              max="600"
              step="10"
              value={state.milesPerWeek || 0}
              onChange={(e) => onChange({ milesPerWeek: parseInt(e.target.value, 10) || 0 })}
              className="w-full accent-[#b98b54] cursor-pointer"
            />
          </div>
          <p className="text-[11px] text-[#787870] mt-1">
            Tip: 35 miles/day commute ≈ 245 miles/week.
          </p>
        </div>

        {/* Charge per excess mile */}
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label htmlFor="chargePerExcessMile" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be]">
              Charge per excess mile
            </label>
            <span className="text-[11px] text-[#808078]">Usually $0.20 - $0.30</span>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#808078] font-mono text-sm">
              $
            </span>
            <input
              id="chargePerExcessMile"
              type="number"
              min="0.05"
              max="1.00"
              step="0.05"
              value={state.chargePerExcessMile}
              onChange={(e) => onChange({ chargePerExcessMile: parseFloat(e.target.value) || 0.25 })}
              placeholder="0.25"
              className="w-full bg-[#111110] border border-[#2b2b26] focus:border-[#b98b54] focus:ring-1 focus:ring-[#b98b54] rounded-lg py-2.5 pl-8 pr-4 text-sm font-mono text-[#f5f5f2] placeholder-[#4d4d47] transition-all outline-none"
            />
          </div>
        </div>

        {/* Lease return fee */}
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label htmlFor="leaseReturnFee" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be]">
              Lease return fee
            </label>
            <span className="text-[11px] text-[#808078]">Disposition fee</span>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#808078] font-mono text-sm">
              $
            </span>
            <input
              id="leaseReturnFee"
              type="number"
              min="0"
              step="50"
              value={state.leaseReturnFee === 0 ? '' : state.leaseReturnFee}
              onChange={(e) => onChange({ leaseReturnFee: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 395"
              className="w-full bg-[#111110] border border-[#2b2b26] focus:border-[#b98b54] focus:ring-1 focus:ring-[#b98b54] rounded-lg py-2.5 pl-8 pr-4 text-sm font-mono text-[#f5f5f2] placeholder-[#4d4d47] transition-all outline-none"
            />
          </div>
          <p className="text-[11px] text-[#787870] mt-1">
            Contractual fee paid when handing the keys back.
          </p>
        </div>
      </div>

      {/* Live Overage Banner */}
      <div className={`mt-5 p-3.5 rounded-lg border flex items-start gap-3 transition-colors ${
        isOver
          ? 'bg-[#221614] border-[#6b2a24] text-[#f7b6af]'
          : 'bg-[#151c17] border-[#22442a] text-[#b6e3c0]'
      }`}>
        {isOver ? (
          <AlertTriangle className="w-5 h-5 text-[#f87171] shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-[#4ade80] shrink-0 mt-0.5" />
        )}
        <div className="text-xs leading-relaxed">
          {isOver ? (
            <>
              <p className="font-semibold text-[#fca5a5] mb-0.5">
                Expected mileage penalty: +{formatNumber(termOverage)} excess miles ({formatCurrency(expectedPenalty)})
              </p>
              <p className="text-[#e29e98]">
                At {state.milesPerWeek} mi/week, you will drive {formatNumber(annualDriven)} mi/yr ({formatNumber(annualOverage)} mi/yr over the {formatNumber(state.allowedMilesPerYear)} limit).
                This adds a lump-sum bill of {formatCurrency(expectedPenalty)} when turning the car in.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-[#86efac] mb-0.5">
                Within mileage allowance ({formatNumber(annualDriven)} of {formatNumber(state.allowedMilesPerYear)} mi/yr)
              </p>
              <p className="text-[#a7d7b0]">
                You have an estimated cushion of {formatNumber(state.allowedMilesPerYear - annualDriven)} miles per year without penalty fees.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
