import React, { useState } from 'react';
import { CarCalculatorState } from '../types';
import { ChevronDown, ChevronUp, ArrowLeftRight, Landmark } from 'lucide-react';
import { formatCurrency } from '../utils/calculator';

interface ExpandableDetailsProps {
  state: CarCalculatorState;
  onChange: (patch: Partial<CarCalculatorState>) => void;
}

export const ExpandableDetails: React.FC<ExpandableDetailsProps> = ({ state, onChange }) => {
  const [openTradeIn, setOpenTradeIn] = useState(state.hasTradeIn);
  const [openExit, setOpenExit] = useState(state.hasExitScenario);

  const tradeEquity = state.hasTradeIn ? state.tradeInOffer - state.tradeInPayoff : 0;
  const isNegativeEquity = tradeEquity < 0;
  const netDebt = Math.abs(tradeEquity);
  const monthlyNegativeEquity = state.termMonths > 0 ? netDebt / state.termMonths : 0;

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#8c8c85]">
          OPTIONAL HIDDEN DETAILS
        </span>
        <div className="h-px bg-[#262622] flex-1" />
      </div>

      {/* Accordion 1: Trade-in */}
      <div className="bg-[#171715] border border-[#262622] rounded-xl overflow-hidden transition-colors">
        <button
          type="button"
          onClick={() => {
            const next = !openTradeIn;
            setOpenTradeIn(next);
            if (!state.hasTradeIn && next) {
              onChange({ hasTradeIn: true });
            }
          }}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#1d1d1a] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#22221e] border border-[#2e2e28] flex items-center justify-center text-[#b98b54]">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-semibold text-[#f5f5f2] block">
                Trade-in vehicle & negative equity
              </span>
              <span className="text-xs text-[#8c8c85]">
                {state.hasTradeIn
                  ? tradeEquity < 0
                    ? `Negative equity: ${formatCurrency(netDebt)} (${state.debtTreatment === 'rolled_in' ? `+$${Math.round(monthlyNegativeEquity)}/mo` : 'paid upfront'})`
                    : `Positive equity: +${formatCurrency(tradeEquity)}`
                  : 'Current loan payoff vs trade offer'}
              </span>
            </div>
          </div>
          {openTradeIn ? (
            <ChevronUp className="w-4 h-4 text-[#8c8c85]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#8c8c85]" />
          )}
        </button>

        {openTradeIn && (
          <div className="p-5 border-t border-[#242420] bg-[#141412] space-y-4">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-[#c4c4be] cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.hasTradeIn}
                  onChange={(e) => onChange({ hasTradeIn: e.target.checked })}
                  className="rounded border-[#383832] bg-[#1c1c19] text-[#b98b54] focus:ring-[#b98b54]"
                />
                <span>Include a vehicle trade-in on this deal</span>
              </label>
            </div>

            {state.hasTradeIn && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label htmlFor="tradeInPayoff" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be] block mb-1">
                    Current loan payoff
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#808078] font-mono text-sm">$</span>
                    <input
                      id="tradeInPayoff"
                      type="number"
                      min="0"
                      step="100"
                      value={state.tradeInPayoff === 0 ? '' : state.tradeInPayoff}
                      onChange={(e) => onChange({ tradeInPayoff: parseFloat(e.target.value) || 0 })}
                      placeholder="e.g. 15000"
                      className="w-full bg-[#171715] border border-[#2b2b26] focus:border-[#b98b54] rounded-lg py-2 pl-8 pr-4 text-sm font-mono text-[#f5f5f2] outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-[#787870] mt-1">Amount owed to your current bank.</p>
                </div>

                <div>
                  <label htmlFor="tradeInOffer" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be] block mb-1">
                    Trade-in offer from dealer
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#808078] font-mono text-sm">$</span>
                    <input
                      id="tradeInOffer"
                      type="number"
                      min="0"
                      step="100"
                      value={state.tradeInOffer === 0 ? '' : state.tradeInOffer}
                      onChange={(e) => onChange({ tradeInOffer: parseFloat(e.target.value) || 0 })}
                      placeholder="e.g. 13000"
                      className="w-full bg-[#171715] border border-[#2b2b26] focus:border-[#b98b54] rounded-lg py-2 pl-8 pr-4 text-sm font-mono text-[#f5f5f2] outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-[#787870] mt-1">Appraised value offered for the car.</p>
                </div>

                {isNegativeEquity && (
                  <div className="sm:col-span-2 p-3.5 rounded-lg bg-[#241a18] border border-[#482823] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#fca5a5]">
                        Underwater / Negative Equity: -{formatCurrency(netDebt)}
                      </span>
                      <span className="text-[11px] text-[#e29e98]">
                        Owe more than it is worth
                      </span>
                    </div>

                    <label className="text-xs font-medium uppercase tracking-wide text-[#c4c4be] block">
                      Negative debt treatment:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onChange({ debtTreatment: 'rolled_in' })}
                        className={`py-2 px-3 text-xs font-medium rounded transition-all text-left cursor-pointer ${
                          state.debtTreatment === 'rolled_in'
                            ? 'bg-[#331f1c] text-[#fca5a5] border border-[#b98b54]/60'
                            : 'bg-[#181816] text-[#8c8c85] hover:text-[#d4d4ce]'
                        }`}
                      >
                        <div className="font-semibold">Roll into monthly</div>
                        <div className="text-[10px] text-[#a8a8a0]">
                          +${Math.round(monthlyNegativeEquity)}/mo across {state.termMonths} mos
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => onChange({ debtTreatment: 'paid_upfront' })}
                        className={`py-2 px-3 text-xs font-medium rounded transition-all text-left cursor-pointer ${
                          state.debtTreatment === 'paid_upfront'
                            ? 'bg-[#331f1c] text-[#fca5a5] border border-[#b98b54]/60'
                            : 'bg-[#181816] text-[#8c8c85] hover:text-[#d4d4ce]'
                        }`}
                      >
                        <div className="font-semibold">Pay upfront</div>
                        <div className="text-[10px] text-[#a8a8a0]">
                          Adds {formatCurrency(netDebt)} to cash required
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Accordion 2: Exit scenario */}
      <div className="bg-[#171715] border border-[#262622] rounded-xl overflow-hidden transition-colors">
        <button
          type="button"
          onClick={() => {
            const next = !openExit;
            setOpenExit(next);
            if (!state.hasExitScenario && next) {
              onChange({ hasExitScenario: true });
            }
          }}
          className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#1d1d1a] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#22221e] border border-[#2e2e28] flex items-center justify-center text-[#b98b54]">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-semibold text-[#f5f5f2] block">
                Exit scenario & resale value
              </span>
              <span className="text-xs text-[#8c8c85]">
                {state.hasExitScenario
                  ? `Sell after ${state.exitMonths} months (Est. Resale ${formatCurrency(state.estimatedResaleValue)})`
                  : 'Sell or trade-in early before loan completion'}
              </span>
            </div>
          </div>
          {openExit ? (
            <ChevronUp className="w-4 h-4 text-[#8c8c85]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#8c8c85]" />
          )}
        </button>

        {openExit && (
          <div className="p-5 border-t border-[#242420] bg-[#141412] space-y-4">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-[#c4c4be] cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.hasExitScenario}
                  onChange={(e) => onChange({ hasExitScenario: e.target.checked })}
                  className="rounded border-[#383832] bg-[#1c1c19] text-[#b98b54] focus:ring-[#b98b54]"
                />
                <span>Simulate selling before or at end of term</span>
              </label>
            </div>

            {state.hasExitScenario && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label htmlFor="exitMonths" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be] block mb-1">
                    Sell after how many months
                  </label>
                  <input
                    id="exitMonths"
                    type="number"
                    min="6"
                    max="120"
                    step="6"
                    value={state.exitMonths === 0 ? '' : state.exitMonths}
                    onChange={(e) => onChange({ exitMonths: parseInt(e.target.value, 10) || 0 })}
                    placeholder="36"
                    className="w-full bg-[#171715] border border-[#2b2b26] focus:border-[#b98b54] rounded-lg py-2 px-3.5 text-sm font-mono text-[#f5f5f2] outline-none"
                  />
                  <p className="text-[11px] text-[#787870] mt-1">E.g., selling at 36 months on a 60-month loan.</p>
                </div>

                <div>
                  <label htmlFor="estimatedResaleValue" className="text-xs font-medium uppercase tracking-wide text-[#c4c4be] block mb-1">
                    Estimated resale value
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#808078] font-mono text-sm">$</span>
                    <input
                      id="estimatedResaleValue"
                      type="number"
                      min="0"
                      step="500"
                      value={state.estimatedResaleValue === 0 ? '' : state.estimatedResaleValue}
                      onChange={(e) => onChange({ estimatedResaleValue: parseFloat(e.target.value) || 0 })}
                      placeholder="e.g. 18000"
                      className="w-full bg-[#171715] border border-[#2b2b26] focus:border-[#b98b54] rounded-lg py-2 pl-8 pr-4 text-sm font-mono text-[#f5f5f2] outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-[#787870] mt-1">Estimated Kelly Blue Book / market value.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
