import React from 'react';
import { CarCalculatorState } from '../types';
import { DollarSign, Percent, ShieldCheck, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface IncomeSectionProps {
  state: CarCalculatorState;
  onChange: (patch: Partial<CarCalculatorState>) => void;
  totalMonthlyBudget: number;
}

export const IncomeSection: React.FC<IncomeSectionProps> = ({
  state,
  onChange,
  totalMonthlyBudget,
}) => {
  const income = state.monthlyTakeHomeIncome || 0;
  const ratio = income > 0 ? (totalMonthlyBudget / income) * 100 : null;

  const quickIncomeOptions = [4000, 5500, 7000, 9000, 12000];

  return (
    <div className="bg-[#171715] border border-[#262622] rounded-xl p-5 sm:p-6 mb-6 shadow-md transition-colors hover:border-[#383832]">
      <div className="flex items-center justify-between pb-4 border-b border-[#242420] mb-5">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#b98b54] uppercase block mb-1">
            SECTION 04
          </span>
          <h2 className="text-xl font-bold text-[#f5f5f2]">
            Monthly take-home income
          </h2>
        </div>
        <span className="text-xs text-[#b98b54] font-mono">
          15% Rule Benchmark
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-baseline mb-1.5">
            <label
              htmlFor="monthlyTakeHomeIncome"
              className="text-xs font-medium uppercase tracking-wide text-[#c4c4be]"
            >
              Monthly take-home pay (after taxes)
            </label>
            <span className="text-[11px] text-[#808078]">
              Your actual net paycheck
            </span>
          </div>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#808078] font-mono text-sm">
              $
            </span>
            <input
              id="monthlyTakeHomeIncome"
              type="number"
              min="0"
              step="100"
              value={state.monthlyTakeHomeIncome === 0 ? '' : state.monthlyTakeHomeIncome}
              onChange={(e) => {
                const val = parseFloat(e.target.value) || 0;
                onChange({
                  monthlyTakeHomeIncome: val,
                  hasIncome: val > 0,
                });
              }}
              placeholder="e.g. 5800"
              className="w-full bg-[#111110] border border-[#2b2b26] focus:border-[#b98b54] focus:ring-1 focus:ring-[#b98b54] rounded-lg py-2.5 pl-8 pr-4 text-base font-mono text-[#f5f5f2] placeholder-[#4d4d47] transition-all outline-none"
            />
          </div>

          {/* Quick preset buttons */}
          <div className="flex gap-1.5 mt-2">
            {quickIncomeOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() =>
                  onChange({
                    monthlyTakeHomeIncome: opt,
                    hasIncome: true,
                  })
                }
                className={`flex-1 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
                  state.monthlyTakeHomeIncome === opt
                    ? 'border-[#b98b54] text-[#b98b54] bg-[#b98b54]/10'
                    : 'border-[#262622] text-[#8c8c85] hover:text-[#d4d4ce] hover:border-[#383832]'
                }`}
              >
                ${opt / 1000}k
              </button>
            ))}
          </div>

          <p className="text-[11px] text-[#787870] mt-1.5">
            Rule of thumb: Total car costs (payment + insurance + fuel + maintenance + fees) should ideally stay under 10–15% of your net pay.
          </p>
        </div>

        {/* Live Affordability Feedback inside Section 04 */}
        {ratio !== null && (
          <div
            className={`p-4 rounded-lg border transition-all ${
              ratio <= 15
                ? 'bg-[#151c17] border-[#22442a] text-[#b6e3c0]'
                : ratio <= 20
                ? 'bg-[#221e14] border-[#59461f] text-[#fbe3a1]'
                : 'bg-[#241614] border-[#6b2a24] text-[#f7b6af]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {ratio <= 15 ? (
                  <ShieldCheck className="w-4 h-4 text-[#4ade80]" />
                ) : (
                  <AlertTriangle className={`w-4 h-4 ${ratio <= 20 ? 'text-[#fbbf24]' : 'text-[#f87171]'}`} />
                )}
                <span className="text-xs font-bold uppercase tracking-wide">
                  {ratio <= 15
                    ? 'Healthy Affordability'
                    : ratio <= 20
                    ? 'Moderate Stretch'
                    : 'High Financial Burden'}
                </span>
              </div>

              <span className="text-sm font-mono font-bold tabular-nums">
                {ratio.toFixed(1)}% of net pay
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-2 rounded-full bg-[#111110]/60 overflow-hidden mb-2">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  ratio <= 15
                    ? 'bg-[#4ade80]'
                    : ratio <= 20
                    ? 'bg-[#fbbf24]'
                    : 'bg-[#f87171]'
                }`}
                style={{ width: `${Math.min(100, (ratio / 30) * 100)}%` }}
              />
            </div>

            <p className="text-xs leading-relaxed opacity-90">
              {ratio <= 15 ? (
                <>
                  At <span className="font-semibold text-white">{formatCurrency(totalMonthlyBudget)}/mo</span>, this car consumes {ratio.toFixed(1)}% of your {formatCurrency(income)} take-home pay, comfortably respecting the 15% ceiling.
                </>
              ) : ratio <= 20 ? (
                <>
                  At <span className="font-semibold text-white">{formatCurrency(totalMonthlyBudget)}/mo</span>, this car consumes {ratio.toFixed(1)}% of your take-home pay. It enters the caution band (15–20%), leaving less flexibility for savings or rent.
                </>
              ) : (
                <>
                  At <span className="font-semibold text-white">{formatCurrency(totalMonthlyBudget)}/mo</span>, this vehicle consumes {ratio.toFixed(1)}% of your {formatCurrency(income)} paycheck. Financial planners strongly advise staying below 15–20% to avoid being &ldquo;car-poor.&rdquo;
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
