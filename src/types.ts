export type DealType = 'lease' | 'finance';

export type InsurancePeriod = 1 | 6 | 12;

export type DebtTreatment = 'rolled_in' | 'paid_upfront';

export interface CarCalculatorState {
  dealType: DealType;
  
  // 01 The offer on the table
  quotedPayment: number;
  termMonths: number;
  dueAtSigning: number;
  firstPaymentIncluded: boolean;
  refundableDeposit: number;

  // 02 The bills around it
  insurancePremium: number;
  insurancePeriod: InsurancePeriod;
  annualDmv: number;
  monthlyFuel: number;
  annualUpkeep: number;
  monthlyParking: number;

  // 03 The miles add up (Lease only)
  allowedMilesPerYear: number;
  milesPerWeek: number;
  chargePerExcessMile: number;
  leaseReturnFee: number;

  // Hidden details: Trade-in
  hasTradeIn: boolean;
  tradeInPayoff: number;
  tradeInOffer: number;
  debtTreatment: DebtTreatment;

  // Hidden details: Exit scenario
  hasExitScenario: boolean;
  exitMonths: number;
  estimatedResaleValue: number;

  // Hidden details: Income
  hasIncome: boolean;
  monthlyTakeHomeIncome: number;
}

export interface CalculationResults {
  // Monthly Breakdown
  baseMonthlyPayment: number;
  tradeInMonthlyAdjustment: number;
  effectiveMonthlyPayment: number;
  monthlyInsurance: number;
  monthlyFuel: number;
  monthlyDmvReserve: number;
  monthlyUpkeepReserve: number;
  monthlyParking: number;
  totalMonthlyBudget: number;

  // The Gap
  gapAmount: number;
  gapPercentage: number;

  // Upfront cash required
  totalCashUpfront: number;
  upfrontBreakdown: {
    dueAtSigning: number;
    deposit: number;
    firstPaymentNotIncluded: number;
    tradeDebtUpfront: number;
  };

  // Annual DMV
  annualDmvTotal: number;

  // Mileage & Lease End (Lease only)
  annualDrivenMiles: number;
  annualExcessMiles: number;
  totalTermExcessMiles: number;
  mileagePenaltyTotal: number;
  leaseReturnCostsTotal: number;

  // Income Affordability
  incomeRatio: number | null;
  affordabilityStatus: 'healthy' | 'moderate' | 'stretched' | null;

  // Finance Exit scenario
  totalSpentAtExit: number;
  netCostAfterResale: number;

  // Full Term Grand Total
  totalMonthlyCarryOverTerm: number;
  estimatedGrandTotal: number;
}
