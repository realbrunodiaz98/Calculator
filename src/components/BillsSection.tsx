import React from 'react';
import { CarCalculatorState, InsurancePeriod } from '../types';

interface BillsSectionProps {
  state: CarCalculatorState;
  onChange: (patch: Partial<CarCalculatorState>) => void;
}

export const BillsSection: React.FC<BillsSectionProps> = ({ state, onChange }) => {
  const period = state.insurancePeriod;
  const monthlyInsurance = state.insurancePremium > 0 ? state.insurancePremium / period : 0;
  const monthlyDmv = state.annualDmv > 0 ? state.annualDmv / 12 : 0;
  const monthlyUpkeep = state.annualUpkeep > 0 ? state.annualUpkeep / 12 : 0;

  return (
    <div className="bg-[#171715] border border-[#262622] rounded-xl p-5 sm:p-6 mb-6 shadow-md transition-colors hover:border-[#383832]">
      <div className="flex items-center justify-between pb-4 border-b border-[#242420] mb-5">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#b98b54] uppercase block mb-1">
            SECTION 02
          </span>
          <h2 className="text-xl font-bold text-[#f5f5f2]">
            The bills around it
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Insurance Premium & Period */}
        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#131311] p-3.5 rounded-lg border border-[#262621]">
          <div className="sm:col-span-2">
            <div className="flex justify-between items-baseline mb-1.5">
              <label htmlFor="insurancePremium" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be]">
                Insurance premium
              </label>
              {monthlyInsurance > 0 && (
                <span className="text-[11px] font-mono text-[#b98b54]">
                  = ${Math.round(monthlyInsurance)}/month
                </span>
              )}
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#808078] font-mono text-sm">
                $
              </span>
              <input
                id="insurancePremium"
                type="number"
                min="0"
                step="25"
                value={state.insurancePremium === 0 ? '' : state.insurancePremium}
                onChange={(e) => onChange({ insurancePremium: parseFloat(e.target.value) || 0 })}
                placeholder="e.g. 1050"
                className="w-full bg-[#171715] border border-[#2b2b26] focus:border-[#b98b54] focus:ring-1 focus:ring-[#b98b54] rounded-lg py-2.5 pl-8 pr-4 text-sm font-mono text-[#f5f5f2] placeholder-[#4d4d47] transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-[#c4c4be] block mb-1.5">
              Covers
            </label>
            <div className="grid grid-cols-3 gap-1 bg-[#171715] p-1 rounded-lg border border-[#2b2b26]">
              {([1, 6, 12] as InsurancePeriod[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onChange({ insurancePeriod: p })}
                  className={`py-2 text-xs font-mono font-medium rounded transition-all cursor-pointer ${
                    state.insurancePeriod === p
                      ? 'bg-[#2b2b24] text-[#b98b54] border border-[#b98b54]/40 shadow-xs'
                      : 'text-[#8c8c85] hover:text-[#d4d4ce]'
                  }`}
                >
                  {p === 1 ? '1 mo' : p === 6 ? '6 mos' : '12 mos'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Annual DMV / Registration */}
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label htmlFor="annualDmv" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be]">
              Annual DMV / registration
            </label>
            {monthlyDmv > 0 && (
              <span className="text-[11px] font-mono text-[#8c8c85]">
                ${Math.round(monthlyDmv)}/mo
              </span>
            )}
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#808078] font-mono text-sm">
              $
            </span>
            <input
              id="annualDmv"
              type="number"
              min="0"
              step="25"
              value={state.annualDmv === 0 ? '' : state.annualDmv}
              onChange={(e) => onChange({ annualDmv: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 420/yr"
              className="w-full bg-[#111110] border border-[#2b2b26] focus:border-[#b98b54] focus:ring-1 focus:ring-[#b98b54] rounded-lg py-2.5 pl-8 pr-4 text-sm font-mono text-[#f5f5f2] placeholder-[#4d4d47] transition-all outline-none"
            />
          </div>
          <p className="text-[11px] text-[#787870] mt-1">
            Lump sum due each year; reserved monthly.
          </p>
        </div>

        {/* Monthly Fuel / Charging */}
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label htmlFor="monthlyFuel" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be]">
              Monthly fuel / charging
            </label>
            <span className="text-[11px] text-[#808078]">Per month</span>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#808078] font-mono text-sm">
              $
            </span>
            <input
              id="monthlyFuel"
              type="number"
              min="0"
              step="10"
              value={state.monthlyFuel === 0 ? '' : state.monthlyFuel}
              onChange={(e) => onChange({ monthlyFuel: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 160"
              className="w-full bg-[#111110] border border-[#2b2b26] focus:border-[#b98b54] focus:ring-1 focus:ring-[#b98b54] rounded-lg py-2.5 pl-8 pr-4 text-sm font-mono text-[#f5f5f2] placeholder-[#4d4d47] transition-all outline-none"
            />
          </div>
          <p className="text-[11px] text-[#787870] mt-1">
            Gasoline or EV charging consumption.
          </p>
        </div>

        {/* Annual Upkeep Reserve */}
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label htmlFor="annualUpkeep" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be]">
              Annual upkeep reserve
            </label>
            {monthlyUpkeep > 0 && (
              <span className="text-[11px] font-mono text-[#8c8c85]">
                ${Math.round(monthlyUpkeep)}/mo
              </span>
            )}
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#808078] font-mono text-sm">
              $
            </span>
            <input
              id="annualUpkeep"
              type="number"
              min="0"
              step="50"
              value={state.annualUpkeep === 0 ? '' : state.annualUpkeep}
              onChange={(e) => onChange({ annualUpkeep: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 600/yr"
              className="w-full bg-[#111110] border border-[#2b2b26] focus:border-[#b98b54] focus:ring-1 focus:ring-[#b98b54] rounded-lg py-2.5 pl-8 pr-4 text-sm font-mono text-[#f5f5f2] placeholder-[#4d4d47] transition-all outline-none"
            />
          </div>
          <p className="text-[11px] text-[#787870] mt-1">
            Tires, brakes, oil, and routine maintenance.
          </p>
        </div>

        {/* Monthly Parking / Tolls */}
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label htmlFor="monthlyParking" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be]">
              Monthly parking / tolls
            </label>
            <span className="text-[11px] text-[#808078]">Per month</span>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#808078] font-mono text-sm">
              $
            </span>
            <input
              id="monthlyParking"
              type="number"
              min="0"
              step="10"
              value={state.monthlyParking === 0 ? '' : state.monthlyParking}
              onChange={(e) => onChange({ monthlyParking: parseFloat(e.target.value) || 0 })}
              placeholder="e.g. 50"
              className="w-full bg-[#111110] border border-[#2b2b26] focus:border-[#b98b54] focus:ring-1 focus:ring-[#b98b54] rounded-lg py-2.5 pl-8 pr-4 text-sm font-mono text-[#f5f5f2] placeholder-[#4d4d47] transition-all outline-none"
            />
          </div>
          <p className="text-[11px] text-[#787870] mt-1">
            Garage, city permits, toll expressways.
          </p>
        </div>
      </div>
    </div>
  );
};
