import { CarCalculatorState, CalculationResults } from '../types';

export const INITIAL_EMPTY_STATE: CarCalculatorState = {
  dealType: 'lease',
  quotedPayment: 0,
  termMonths: 36,
  dueAtSigning: 0,
  firstPaymentIncluded: true,
  refundableDeposit: 0,

  insurancePremium: 0,
  insurancePeriod: 6,
  annualDmv: 0,
  monthlyFuel: 0,
  annualUpkeep: 0,
  monthlyParking: 0,

  allowedMilesPerYear: 10000,
  milesPerWeek: 250,
  chargePerExcessMile: 0.25,
  leaseReturnFee: 395,

  hasTradeIn: false,
  tradeInPayoff: 0,
  tradeInOffer: 0,
  debtTreatment: 'rolled_in',

  hasExitScenario: false,
  exitMonths: 36,
  estimatedResaleValue: 0,

  hasIncome: false,
  monthlyTakeHomeIncome: 0,
};

export const EXAMPLE_LEASE_STATE: CarCalculatorState = {
  dealType: 'lease',
  quotedPayment: 469,
  termMonths: 36,
  dueAtSigning: 3250,
  firstPaymentIncluded: true,
  refundableDeposit: 0,

  insurancePremium: 1050,
  insurancePeriod: 6,
  annualDmv: 420,
  monthlyFuel: 160,
  annualUpkeep: 600,
  monthlyParking: 65,

  allowedMilesPerYear: 10000,
  milesPerWeek: 260, // 260 * 52 = 13,520 mi/yr -> 3,520 excess/yr
  chargePerExcessMile: 0.25,
  leaseReturnFee: 495,

  hasTradeIn: true,
  tradeInPayoff: 14200,
  tradeInOffer: 12500, // $1,700 negative equity
  debtTreatment: 'rolled_in',

  hasExitScenario: false,
  exitMonths: 36,
  estimatedResaleValue: 0,

  hasIncome: true,
  monthlyTakeHomeIncome: 5800,
};

export const EXAMPLE_FINANCE_STATE: CarCalculatorState = {
  dealType: 'finance',
  quotedPayment: 585,
  termMonths: 60,
  dueAtSigning: 4500,
  firstPaymentIncluded: true,
  refundableDeposit: 0,

  insurancePremium: 980,
  insurancePeriod: 6,
  annualDmv: 380,
  monthlyFuel: 190,
  annualUpkeep: 900,
  monthlyParking: 40,

  allowedMilesPerYear: 12000,
  milesPerWeek: 240,
  chargePerExcessMile: 0.25,
  leaseReturnFee: 0,

  hasTradeIn: false,
  tradeInPayoff: 0,
  tradeInOffer: 0,
  debtTreatment: 'rolled_in',

  hasExitScenario: true,
  exitMonths: 48,
  estimatedResaleValue: 16500,

  hasIncome: true,
  monthlyTakeHomeIncome: 6500,
};

export function calculateCarCosts(state: CarCalculatorState): CalculationResults {
  const {
    dealType,
    quotedPayment,
    termMonths,
    dueAtSigning,
    firstPaymentIncluded,
    refundableDeposit,
    insurancePremium,
    insurancePeriod,
    annualDmv,
    monthlyFuel,
    annualUpkeep,
    monthlyParking,
    allowedMilesPerYear,
    milesPerWeek,
    chargePerExcessMile,
    leaseReturnFee,
    hasTradeIn,
    tradeInPayoff,
    tradeInOffer,
    debtTreatment,
    hasExitScenario,
    exitMonths,
    estimatedResaleValue,
    hasIncome,
    monthlyTakeHomeIncome,
  } = state;

  // Trade-in equity
  let tradeEquity = 0;
  let tradeInMonthlyAdjustment = 0;
  let tradeDebtUpfront = 0;

  if (hasTradeIn) {
    tradeEquity = tradeInOffer - tradeInPayoff;
    if (tradeEquity < 0) {
      const negativeDebt = Math.abs(tradeEquity);
      if (debtTreatment === 'rolled_in') {
        tradeInMonthlyAdjustment = termMonths > 0 ? negativeDebt / termMonths : 0;
      } else {
        tradeDebtUpfront = negativeDebt;
      }
    }
  }

  // Base and effective payment
  const baseMonthlyPayment = Math.max(0, quotedPayment || 0);
  const effectiveMonthlyPayment = baseMonthlyPayment + tradeInMonthlyAdjustment;

  // Monthly conversions
  const period = insurancePeriod === 1 ? 1 : insurancePeriod === 12 ? 12 : 6;
  const monthlyInsurance = Math.max(0, (insurancePremium || 0) / period);
  const monthlyFuelSafe = Math.max(0, monthlyFuel || 0);
  const monthlyDmvReserve = Math.max(0, (annualDmv || 0) / 12);
  const monthlyUpkeepReserve = Math.max(0, (annualUpkeep || 0) / 12);
  const monthlyParkingSafe = Math.max(0, monthlyParking || 0);

  // Total Real Monthly Car Budget:
  // Formula: Effective Payment + (Insurance / Period) + Fuel + (DMV / 12) + (Maintenance / 12) + Parking
  const totalMonthlyBudget =
    effectiveMonthlyPayment +
    monthlyInsurance +
    monthlyFuelSafe +
    monthlyDmvReserve +
    monthlyUpkeepReserve +
    monthlyParkingSafe;

  // The Gap
  const gapAmount = totalMonthlyBudget - baseMonthlyPayment;
  const gapPercentage = baseMonthlyPayment > 0 ? (gapAmount / baseMonthlyPayment) * 100 : 0;

  // Upfront cash required
  const firstPaymentNotIncluded = !firstPaymentIncluded ? baseMonthlyPayment : 0;
  const totalCashUpfront =
    Math.max(0, dueAtSigning || 0) +
    Math.max(0, refundableDeposit || 0) +
    firstPaymentNotIncluded +
    tradeDebtUpfront;

  // Annual DMV
  const annualDmvTotal = Math.max(0, annualDmv || 0);

  // Mileage and lease penalties
  const annualDrivenMiles = (milesPerWeek || 0) * 52;
  const annualExcessMiles = Math.max(0, annualDrivenMiles - (allowedMilesPerYear || 0));
  const termYears = (termMonths || 36) / 12;
  const totalTermExcessMiles = annualExcessMiles * termYears;
  const mileagePenaltyTotal = dealType === 'lease' ? totalTermExcessMiles * (chargePerExcessMile || 0.25) : 0;
  const leaseReturnCostsTotal = dealType === 'lease' ? (leaseReturnFee || 0) + mileagePenaltyTotal : 0;

  // Income Affordability Ratio
  let incomeRatio: number | null = null;
  let affordabilityStatus: 'healthy' | 'moderate' | 'stretched' | null = null;

  if (monthlyTakeHomeIncome > 0) {
    incomeRatio = (totalMonthlyBudget / monthlyTakeHomeIncome) * 100;
    if (incomeRatio <= 15) {
      affordabilityStatus = 'healthy';
    } else if (incomeRatio <= 20) {
      affordabilityStatus = 'moderate';
    } else {
      affordabilityStatus = 'stretched';
    }
  }

  // Finance Exit scenario
  const effectiveExitMonths = exitMonths > 0 ? exitMonths : termMonths;
  const totalSpentAtExit =
    totalCashUpfront +
    (totalMonthlyBudget * effectiveExitMonths);
  const netCostAfterResale = hasExitScenario
    ? totalSpentAtExit - (estimatedResaleValue || 0)
    : totalSpentAtExit;

  // Full Term Grand Total (total money put into the car over the entire lease/loan)
  const safeTermMonths = Math.max(0, termMonths || 0);
  const totalMonthlyCarryOverTerm = totalMonthlyBudget * safeTermMonths;
  const estimatedGrandTotal =
    totalCashUpfront +
    totalMonthlyCarryOverTerm +
    (dealType === 'lease' ? leaseReturnCostsTotal : 0);

  return {
    baseMonthlyPayment,
    tradeInMonthlyAdjustment,
    effectiveMonthlyPayment,
    monthlyInsurance,
    monthlyFuel: monthlyFuelSafe,
    monthlyDmvReserve,
    monthlyUpkeepReserve,
    monthlyParking: monthlyParkingSafe,
    totalMonthlyBudget,

    gapAmount,
    gapPercentage,

    totalCashUpfront,
    upfrontBreakdown: {
      dueAtSigning: Math.max(0, dueAtSigning || 0),
      deposit: Math.max(0, refundableDeposit || 0),
      firstPaymentNotIncluded,
      tradeDebtUpfront,
    },

    annualDmvTotal,

    annualDrivenMiles,
    annualExcessMiles,
    totalTermExcessMiles,
    mileagePenaltyTotal,
    leaseReturnCostsTotal,

    incomeRatio,
    affordabilityStatus,

    totalSpentAtExit,
    netCostAfterResale,

    totalMonthlyCarryOverTerm,
    estimatedGrandTotal,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(amount));
}
