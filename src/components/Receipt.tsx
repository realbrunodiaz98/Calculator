import React, { useState } from 'react';
import { CarCalculatorState, CalculationResults } from '../types';
import { formatCurrency, formatNumber } from '../utils/calculator';
import { generatePdfReport } from '../utils/pdfGenerator';
import {
  Coins,
  AlertOctagon,
  CalendarDays,
  TrendingUp,
  CircleAlert,
  Percent,
  FileDown,
  Check,
} from 'lucide-react';

interface ReceiptProps {
  state: CarCalculatorState;
  results: CalculationResults;
  onExportPdf?: () => void;
}

export const Receipt: React.FC<ReceiptProps> = ({ state, results, onExportPdf }) => {
  const isLease = state.dealType === 'lease';
  const [exportStatus, setExportStatus] = useState<'idle' | 'generating' | 'done'>('idle');

  const handleExportPdf = () => {
    if (exportStatus === 'generating') return;
    setExportStatus('generating');
    try {
      if (onExportPdf) {
        onExportPdf();
      } else {
        generatePdfReport(state, results);
      }
      setTimeout(() => {
        setExportStatus('done');
        setTimeout(() => setExportStatus('idle'), 2500);
      }, 400);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      setExportStatus('idle');
    }
  };

  return (
    <div className="sticky top-20 space-y-5">
      {/* The Master Receipt Container */}
      <div className="bg-[#161614] border border-[#2b2b26] rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Subtle decorative gold line across top */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#b98b54] to-transparent opacity-80" />

        <div className="p-6 sm:p-7">
          {/* Header of Receipt */}
          <div className="flex items-center justify-between border-b border-[#262621] pb-4 mb-5">
            <div>
              <h3 className="text-base font-semibold text-[#f5f5f2]">
                Real Cost Breakdown
              </h3>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleExportPdf}
                type="button"
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium text-[#f5f5f2] bg-[#b98b54]/20 hover:bg-[#b98b54]/30 border border-[#b98b54]/40 rounded-lg transition-colors cursor-pointer"
                title="Export printer-friendly PDF report"
              >
                {exportStatus === 'done' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span className="text-[#4ade80]">Saved!</span>
                  </>
                ) : exportStatus === 'generating' ? (
                  <span>Exporting...</span>
                ) : (
                  <>
                    <FileDown className="w-3.5 h-3.5 text-[#b98b54]" />
                    <span>PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* MAIN TOTAL: Monthly Car Budget */}
          <div className="bg-[#111110] border border-[#262621] rounded-xl p-5 mb-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs uppercase font-mono tracking-wider text-[#9e9e94]">
                Monthly car budget
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#b98b54]/15 text-[#c99a63] border border-[#b98b54]/30">
                TRUE CARRY
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-[#f5f5f2] tracking-tight tabular-nums">
                {formatCurrency(results.totalMonthlyBudget)}
              </span>
              <span className="text-sm font-mono text-[#8a8a82]">/ month</span>
            </div>

            <p className="text-xs text-[#a6a69e] leading-snug">
              Every dollar required to drive, park, insure, register, and maintain this car.
            </p>
          </div>

          {/* BREAKDOWN ROWS */}
          <div className="space-y-2.5 text-xs font-mono mb-6">
            <div className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#73736b] mb-1">
              Individual Monthly Items
            </div>

            {/* Quoted Payment */}
            <div className="flex items-center justify-between py-1 border-b border-[#1f1f1c]">
              <span className="text-[#c4c4be] font-sans">
                {isLease ? 'Base Lease Payment' : 'Base Loan Payment'}
              </span>
              <span className="text-[#f5f5f2] tabular-nums font-semibold">
                {formatCurrency(results.baseMonthlyPayment)}
              </span>
            </div>

            {/* Trade-in rolled in (if applicable) */}
            {results.tradeInMonthlyAdjustment > 0 && (
              <div className="flex items-center justify-between py-1 border-b border-[#1f1f1c] text-[#fca5a5]">
                <span className="font-sans">Rolled-in Negative Equity</span>
                <span className="tabular-nums font-semibold">
                  +{formatCurrency(results.tradeInMonthlyAdjustment)}
                </span>
              </div>
            )}

            {/* Insurance */}
            <div className="flex items-center justify-between py-1 border-b border-[#1f1f1c]">
              <span className="text-[#c4c4be] font-sans">
                Insurance Premium ({state.insurancePeriod}m amortized)
              </span>
              <span className="text-[#f5f5f2] tabular-nums font-semibold">
                +{formatCurrency(results.monthlyInsurance)}
              </span>
            </div>

            {/* Fuel / Charging */}
            <div className="flex items-center justify-between py-1 border-b border-[#1f1f1c]">
              <span className="text-[#c4c4be] font-sans">Fuel / Charging</span>
              <span className="text-[#f5f5f2] tabular-nums font-semibold">
                +{formatCurrency(results.monthlyFuel)}
              </span>
            </div>

            {/* DMV Reserve */}
            <div className="flex items-center justify-between py-1 border-b border-[#1f1f1c]">
              <span className="text-[#c4c4be] font-sans">DMV / Registration Reserve (1/12)</span>
              <span className="text-[#f5f5f2] tabular-nums font-semibold">
                +{formatCurrency(results.monthlyDmvReserve)}
              </span>
            </div>

            {/* Upkeep Reserve */}
            <div className="flex items-center justify-between py-1 border-b border-[#1f1f1c]">
              <span className="text-[#c4c4be] font-sans">Upkeep & Tires Reserve (1/12)</span>
              <span className="text-[#f5f5f2] tabular-nums font-semibold">
                +{formatCurrency(results.monthlyUpkeepReserve)}
              </span>
            </div>

            {/* Parking / Tolls */}
            <div className="flex items-center justify-between py-1 border-b border-[#1f1f1c]">
              <span className="text-[#c4c4be] font-sans">Parking & Tolls</span>
              <span className="text-[#f5f5f2] tabular-nums font-semibold">
                +{formatCurrency(results.monthlyParking)}
              </span>
            </div>
          </div>

          {/* THE GAP: Emphasize difference between base payment and actual carry */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#241d14] to-[#1a1712] border border-[#b98b54]/40 mb-6">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#c99a63] mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>THE GAP</span>
            </div>

            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#f5f5f2] tabular-nums">
                +{formatCurrency(results.gapAmount)}
              </span>
              <span className="text-xs font-mono text-[#b98b54]">
                / mo ({results.gapPercentage > 0 ? `+${results.gapPercentage.toFixed(0)}%` : '0%'} above quoted)
              </span>
            </div>

            <p className="text-xs text-[#d1cec7] leading-relaxed">
              Your <span className="font-semibold text-white">{formatCurrency(results.baseMonthlyPayment)}</span> sticker payment actually requires{' '}
              <span className="font-semibold text-[#e2c192]">{formatCurrency(results.totalMonthlyBudget)}</span> cash every month to keep the car on the road.
            </p>
          </div>

          {/* INCOME RATIO (If provided) */}
          {results.incomeRatio !== null && (
            <div className="p-4 rounded-xl bg-[#111110] border border-[#262621] mb-6 space-y-2.5">
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-sans font-medium text-[#c4c4be] flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-[#b98b54]" />
                  Car budget / take-home pay
                </span>
                <span className={`font-mono font-bold text-sm tabular-nums ${
                  results.affordabilityStatus === 'healthy'
                    ? 'text-[#4ade80]'
                    : results.affordabilityStatus === 'moderate'
                    ? 'text-[#fbbf24]'
                    : 'text-[#f87171]'
                }`}>
                  {results.incomeRatio.toFixed(1)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-[#20201c] overflow-hidden relative">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    results.affordabilityStatus === 'healthy'
                      ? 'bg-[#4ade80]'
                      : results.affordabilityStatus === 'moderate'
                      ? 'bg-[#fbbf24]'
                      : 'bg-[#f87171]'
                  }`}
                  style={{ width: `${Math.min(100, (results.incomeRatio / 30) * 100)}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-[#787870]">
                <span>10% Ideal</span>
                <span>15% Max Recommended</span>
                <span>20%+ Stretched</span>
              </div>

              <p className="text-[11px] text-[#9c9c94] leading-snug">
                {results.affordabilityStatus === 'healthy' && (
                  <span className="text-[#86efac]">
                    Affordable: Comfortably under the 15% threshold of take-home pay.
                  </span>
                )}
                {results.affordabilityStatus === 'moderate' && (
                  <span className="text-[#fde047]">
                    Caution: Consumes 15–20% of your monthly net pay.
                  </span>
                )}
                {results.affordabilityStatus === 'stretched' && (
                  <span className="text-[#fca5a5]">
                    High Burden: Exceeds 20% of your take-home pay. Consider a lower payment or larger down payment.
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Action Card: Export PDF Report */}
          <div className="pt-2 border-t border-[#242420]">
            <button
              onClick={handleExportPdf}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-mono font-semibold tracking-wide text-[#f5f5f2] bg-[#b98b54]/15 hover:bg-[#b98b54]/25 border border-[#b98b54]/40 hover:border-[#b98b54]/60 transition-all cursor-pointer shadow-sm group"
            >
              {exportStatus === 'done' ? (
                <>
                  <Check className="w-4 h-4 text-[#4ade80]" />
                  <span className="text-[#86efac]">Report Downloaded Successfully!</span>
                </>
              ) : exportStatus === 'generating' ? (
                <span>Generating Vector PDF...</span>
              ) : (
                <>
                  <FileDown className="w-4 h-4 text-[#b98b54] group-hover:translate-y-0.5 transition-transform" />
                  <span>Save Estimate - PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* FUTURE COSTS CARDS (4 Alert / Callout Boxes) */}
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-[#808078] px-1">
          Future Costs Waiting Later
        </div>

        {/* Card 1: Cash Needed Upfront */}
        <div className="p-4 rounded-xl bg-[#171715] border border-[#262622] hover:border-[#383832] transition-colors">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-[#b98b54]" />
              <span className="text-xs font-semibold text-[#f5f5f2] uppercase tracking-wide">
                Cash Needed Upfront
              </span>
            </div>
            <span className="text-sm font-mono font-bold text-[#f5f5f2] tabular-nums">
              {formatCurrency(results.totalCashUpfront)}
            </span>
          </div>
          <p className="text-xs text-[#a3a39b] leading-relaxed">
            Due at signing ({formatCurrency(results.upfrontBreakdown.dueAtSigning)})
            {results.upfrontBreakdown.deposit > 0 && ` + refundable deposit (${formatCurrency(results.upfrontBreakdown.deposit)})`}
            {results.upfrontBreakdown.firstPaymentNotIncluded > 0 && ` + 1st payment not in signing (${formatCurrency(results.upfrontBreakdown.firstPaymentNotIncluded)})`}
            {results.upfrontBreakdown.tradeDebtUpfront > 0 && ` + negative trade-in paid upfront (${formatCurrency(results.upfrontBreakdown.tradeDebtUpfront)})`}
            .
          </p>
        </div>

        {/* Card 2: Annual DMV Bills */}
        <div className="p-4 rounded-xl bg-[#171715] border border-[#262622] hover:border-[#383832] transition-colors">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-[#b98b54]" />
              <span className="text-xs font-semibold text-[#f5f5f2] uppercase tracking-wide">
                Annual DMV Bills
              </span>
            </div>
            <span className="text-sm font-mono font-bold text-[#f5f5f2] tabular-nums">
              {formatCurrency(results.annualDmvTotal)} / yr
            </span>
          </div>
          <p className="text-xs text-[#a3a39b] leading-relaxed">
            Must be paid as a lump sum upon annual registration renewal. Reserve{' '}
            <span className="text-[#f5f5f2] font-mono">{formatCurrency(results.monthlyDmvReserve)}/month</span>{' '}
            in a separate account so this renewal bill never surprises you.
          </p>
        </div>

        {/* Card 3: Expected Mileage Penalties (Lease only) */}
        {isLease ? (
          <div className="p-4 rounded-xl bg-[#171715] border border-[#262622] hover:border-[#383832] transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <AlertOctagon className={`w-4 h-4 ${results.mileagePenaltyTotal > 0 ? 'text-[#f87171]' : 'text-[#4ade80]'}`} />
                <span className="text-xs font-semibold text-[#f5f5f2] uppercase tracking-wide">
                  Expected Mileage Penalties
                </span>
              </div>
              <span className={`text-sm font-mono font-bold tabular-nums ${results.mileagePenaltyTotal > 0 ? 'text-[#f87171]' : 'text-[#4ade80]'}`}>
                {results.mileagePenaltyTotal > 0 ? formatCurrency(results.mileagePenaltyTotal) : '$0'}
              </span>
            </div>
            <p className="text-xs text-[#a3a39b] leading-relaxed">
              {results.mileagePenaltyTotal > 0 ? (
                <>
                  Driving <span className="font-mono text-[#f5f5f2]">{formatNumber(results.annualDrivenMiles)} mi/yr</span> ({state.milesPerWeek} mi/wk) creates{' '}
                  <span className="text-[#fca5a5] font-mono font-semibold">{formatNumber(results.totalTermExcessMiles)} excess miles</span> over {state.termMonths} months at {formatCurrency(state.chargePerExcessMile)}/mi.
                </>
              ) : (
                <>
                  At {state.milesPerWeek} mi/wk ({formatNumber(results.annualDrivenMiles)} mi/yr), you are inside the {formatNumber(state.allowedMilesPerYear)} mi/yr allowance with zero mileage penalty.
                </>
              )}
            </p>
          </div>
        ) : (
          /* Financing: Exit Scenario Card */
          state.hasExitScenario && (
            <div className="p-4 rounded-xl bg-[#171715] border border-[#262622] hover:border-[#383832] transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#b98b54]" />
                  <span className="text-xs font-semibold text-[#f5f5f2] uppercase tracking-wide">
                    Net Ownership Cost (Exit @ {state.exitMonths}m)
                  </span>
                </div>
                <span className="text-sm font-mono font-bold text-[#b98b54] tabular-nums">
                  {formatCurrency(results.netCostAfterResale)}
                </span>
              </div>
              <p className="text-xs text-[#a3a39b] leading-relaxed">
                Total cash spent over {state.exitMonths} months ({formatCurrency(results.totalSpentAtExit)}) minus estimated resale value ({formatCurrency(state.estimatedResaleValue)}).
              </p>
            </div>
          )
        )}

        {/* Card 4: Lease Return Costs (Lease only) */}
        {isLease && (
          <div className="p-4 rounded-xl bg-[#171715] border border-[#262622] hover:border-[#383832] transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <CircleAlert className="w-4 h-4 text-[#b98b54]" />
                <span className="text-xs font-semibold text-[#f5f5f2] uppercase tracking-wide">
                  Lease Return Costs
                </span>
              </div>
              <span className="text-sm font-mono font-bold text-[#f5f5f2] tabular-nums">
                {formatCurrency(results.leaseReturnCostsTotal)}
              </span>
            </div>
            <p className="text-xs text-[#a3a39b] leading-relaxed">
              Contractual disposition fee ({formatCurrency(state.leaseReturnFee)})
              {results.mileagePenaltyTotal > 0 && ` + expected mileage overage (${formatCurrency(results.mileagePenaltyTotal)})`}
              . Due at turn-in when handing keys back.
            </p>
          </div>
        )}

        {/* Card 5: Estimated Grand Total (Full Term Outlay) */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#241d14] to-[#171715] border border-[#b98b54]/45 shadow-lg">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#b98b54]" />
              <span className="text-xs font-semibold text-[#f5f5f2] uppercase tracking-wide">
                Estimated Grand Total ({state.termMonths}m)
              </span>
            </div>
            <span className="text-lg font-mono font-extrabold text-[#e2c192] tabular-nums">
              {formatCurrency(results.estimatedGrandTotal)}
            </span>
          </div>
          <p className="text-xs text-[#d1cec7] leading-relaxed">
            Upfront ({formatCurrency(results.totalCashUpfront)}) + {state.termMonths} mos of true carry (
            {formatCurrency(results.totalMonthlyCarryOverTerm)})
            {isLease && results.leaseReturnCostsTotal > 0 && ` + lease return (${formatCurrency(results.leaseReturnCostsTotal)})`}
            .
          </p>
          <p className="text-[11px] text-[#a3a39b] mt-1.5 leading-relaxed">
            Total money thrown into this car by the time the {isLease ? 'lease' : 'loan'} ends—compared to{' '}
            <span className="font-mono text-[#f5f5f2]">
              {formatCurrency(results.baseMonthlyPayment * state.termMonths)}
            </span>{' '}
            in quoted monthly payments alone.
          </p>
        </div>
      </div>
    </div>
  );
};
