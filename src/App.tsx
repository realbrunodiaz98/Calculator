import React, { useState } from 'react';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { OfferSection } from './components/OfferSection';
import { BillsSection } from './components/BillsSection';
import { MileageSection } from './components/MileageSection';
import { IncomeSection } from './components/IncomeSection';
import { ExpandableDetails } from './components/ExpandableDetails';
import { Receipt } from './components/Receipt';
import { DealType, CarCalculatorState } from './types';
import {
  calculateCarCosts,
  INITIAL_EMPTY_STATE,
  EXAMPLE_LEASE_STATE,
  EXAMPLE_FINANCE_STATE,
} from './utils/calculator';
import { generatePdfReport } from './utils/pdfGenerator';

export default function App() {
  const [state, setState] = useState<CarCalculatorState>(EXAMPLE_LEASE_STATE);

  const results = calculateCarCosts(state);

  const handleStateChange = (patch: Partial<CarCalculatorState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  const handleDealTypeChange = (type: DealType) => {
    setState((prev) => {
      if (type === 'lease') {
        return {
          ...prev,
          dealType: 'lease',
          termMonths: prev.termMonths > 48 ? 36 : prev.termMonths || 36,
        };
      } else {
        return {
          ...prev,
          dealType: 'finance',
          termMonths: prev.termMonths < 36 ? 60 : prev.termMonths || 60,
        };
      }
    });
  };

  const handleLoadExample = (type: 'lease' | 'finance') => {
    if (type === 'lease') {
      setState(EXAMPLE_LEASE_STATE);
    } else {
      setState(EXAMPLE_FINANCE_STATE);
    }
  };

  const handleClear = () => {
    setState({
      ...INITIAL_EMPTY_STATE,
      dealType: state.dealType,
    });
  };

  return (
    <div className="min-h-screen bg-[#111110] text-[#e8e6e3] selection:bg-[#b98b54]/30">
      {/* Header with Top Bar and Hero */}
      <Header onExportPdf={() => generatePdfReport(state, results)} />

      {/* Main 2-Column Application Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Form Controls (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-2">
            {/* Toolbar: Lease/Finance toggle, Try Example, Clear */}
            <Toolbar
              dealType={state.dealType}
              onDealTypeChange={handleDealTypeChange}
              onLoadExample={handleLoadExample}
              onClear={handleClear}
            />

            {/* Section 01: The offer on the table */}
            <OfferSection state={state} onChange={handleStateChange} />

            {/* Section 02: The bills around it */}
            <BillsSection state={state} onChange={handleStateChange} />

            {/* Section 03: The miles add up (Lease Only) */}
            <MileageSection state={state} onChange={handleStateChange} />

            {/* Section 04: Monthly take-home income */}
            <IncomeSection
              state={state}
              onChange={handleStateChange}
              totalMonthlyBudget={results.totalMonthlyBudget}
            />

            {/* Hidden Details (Expandable Sections: Trade-in, Exit) */}
            <ExpandableDetails state={state} onChange={handleStateChange} />
          </div>

          {/* Right Column: Sticky Receipt (5 cols on desktop) */}
          <div className="lg:col-span-5">
            <Receipt
              state={state}
              results={results}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#21211e] mt-16 py-8 text-xs text-[#808078] bg-[#0d0d0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] sm:text-xs text-[#808078] leading-relaxed">
            Real Car Cost Calculator · This is not financial advice · These are estimates based on your inputs · For educational purposes only · Make Cheaper Mistakes Than I Did
          </p>
        </div>
      </footer>
    </div>
  );
}
