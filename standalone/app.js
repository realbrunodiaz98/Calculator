/**
 * Real Car Cost Calculator — Vanilla JavaScript Engine
 * Instant event listeners, DOM bindings, and mathematical formula execution.
 */

(function () {
  'use strict';

  // Application State
  const state = {
    dealType: 'lease', // 'lease' | 'finance'
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
    milesPerWeek: 260,
    chargePerExcessMile: 0.25,
    leaseReturnFee: 495,

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

  // Helper Formatter
  function formatCurrency(num) {
    return '$' + Math.round(num || 0).toLocaleString('en-US');
  }

  function formatNum(num) {
    return Math.round(num || 0).toLocaleString('en-US');
  }

  // DOM Elements Cache
  const el = {
    toggleLease: document.getElementById('toggle-lease'),
    toggleFinance: document.getElementById('toggle-finance'),
    btnExample: document.getElementById('btn-example'),
    btnClear: document.getElementById('btn-clear'),
    termLabel: document.getElementById('term-label'),
    sectionMileage: document.getElementById('section-mileage'),

    quotedPayment: document.getElementById('quotedPayment'),
    termMonths: document.getElementById('termMonths'),
    dueAtSigning: document.getElementById('dueAtSigning'),
    firstPaymentYes: document.getElementById('first-payment-yes'),
    firstPaymentNo: document.getElementById('first-payment-no'),
    refundableDeposit: document.getElementById('refundableDeposit'),

    insurancePremium: document.getElementById('insurancePremium'),
    monthlyInsurancePreview: document.getElementById('monthly-insurance-preview'),
    insurancePeriodBtns: document.querySelectorAll('#insurance-period-group .segment-btn'),

    annualDmv: document.getElementById('annualDmv'),
    monthlyDmvPreview: document.getElementById('monthly-dmv-preview'),
    monthlyFuel: document.getElementById('monthlyFuel'),
    annualUpkeep: document.getElementById('annualUpkeep'),
    monthlyUpkeepPreview: document.getElementById('monthly-upkeep-preview'),
    monthlyParking: document.getElementById('monthlyParking'),

    allowedMilesPerYear: document.getElementById('allowedMilesPerYear'),
    milesPerWeek: document.getElementById('milesPerWeek'),
    milesPerWeekSlider: document.getElementById('milesPerWeekSlider'),
    annualMilesPreview: document.getElementById('annual-miles-preview'),
    chargePerExcessMile: document.getElementById('chargePerExcessMile'),
    leaseReturnFee: document.getElementById('leaseReturnFee'),
    mileageBanner: document.getElementById('mileage-banner'),
    mileageBannerTitle: document.getElementById('mileage-banner-title'),
    mileageBannerDesc: document.getElementById('mileage-banner-desc'),

    hasTradeIn: document.getElementById('hasTradeIn'),
    tradeinFields: document.getElementById('tradein-fields'),
    tradeInPayoff: document.getElementById('tradeInPayoff'),
    tradeInOffer: document.getElementById('tradeInOffer'),
    negativeEquityCard: document.getElementById('negative-equity-card'),
    negativeEquityAmount: document.getElementById('negative-equity-amount'),
    debtRolled: document.getElementById('debt-rolled'),
    debtUpfront: document.getElementById('debt-upfront'),
    tradeinSummaryText: document.getElementById('tradein-summary-text'),

    hasExitScenario: document.getElementById('hasExitScenario'),
    exitFields: document.getElementById('exit-fields'),
    exitMonths: document.getElementById('exitMonths'),
    estimatedResaleValue: document.getElementById('estimatedResaleValue'),

    monthlyIncome: document.getElementById('monthlyIncome'),

    // Receipt Outputs
    receiptTotalBudget: document.getElementById('receipt-total-budget'),
    receiptPaymentLabel: document.getElementById('receipt-payment-label'),
    receiptPaymentVal: document.getElementById('receipt-payment-val'),
    receiptDebtRow: document.getElementById('receipt-debt-row'),
    receiptDebtVal: document.getElementById('receipt-debt-val'),
    receiptInsuranceVal: document.getElementById('receipt-insurance-val'),
    receiptFuelVal: document.getElementById('receipt-fuel-val'),
    receiptDmvVal: document.getElementById('receipt-dmv-val'),
    receiptUpkeepVal: document.getElementById('receipt-upkeep-val'),
    receiptParkingVal: document.getElementById('receipt-parking-val'),

    receiptGapAmount: document.getElementById('receipt-gap-amount'),
    receiptGapPercentage: document.getElementById('receipt-gap-percentage'),
    receiptGapDesc: document.getElementById('receipt-gap-desc'),

    receiptIncomeCard: document.getElementById('receipt-income-card'),
    receiptIncomeRatio: document.getElementById('receipt-income-ratio'),
    receiptIncomeBar: document.getElementById('receipt-income-bar'),
    receiptIncomeText: document.getElementById('receipt-income-text'),

    futureUpfrontVal: document.getElementById('future-upfront-val'),
    futureUpfrontNote: document.getElementById('future-upfront-note'),
    futureDmvVal: document.getElementById('future-dmv-val'),
    futureMileageCard: document.getElementById('future-mileage-card'),
    futureMileageVal: document.getElementById('future-mileage-val'),
    futureMileageNote: document.getElementById('future-mileage-note'),
    futureReturnCard: document.getElementById('future-return-card'),
    futureReturnVal: document.getElementById('future-return-val'),
    futureReturnNote: document.getElementById('future-return-note'),
    futureGrandTotalTitle: document.getElementById('future-grand-total-title'),
    futureGrandTotalVal: document.getElementById('future-grand-total-val'),
    futureGrandTotalNote: document.getElementById('future-grand-total-note'),
  };

  // Math & Logic Calculation
  function calculate() {
    const isLease = state.dealType === 'lease';

    // Trade-in equity
    let tradeEquity = 0;
    let tradeDebtMonthly = 0;
    let tradeDebtUpfront = 0;

    if (state.hasTradeIn) {
      tradeEquity = (state.tradeInOffer || 0) - (state.tradeInPayoff || 0);
      if (tradeEquity < 0) {
        const netNegative = Math.abs(tradeEquity);
        if (state.debtTreatment === 'rolled_in') {
          tradeDebtMonthly = state.termMonths > 0 ? netNegative / state.termMonths : 0;
        } else {
          tradeDebtUpfront = netNegative;
        }
      }
    }

    const basePayment = Math.max(0, state.quotedPayment || 0);
    const effectivePayment = basePayment + tradeDebtMonthly;

    // Monthly conversions
    const monthlyInsurance = state.insurancePeriod > 0 ? (state.insurancePremium || 0) / state.insurancePeriod : 0;
    const monthlyFuel = Math.max(0, state.monthlyFuel || 0);
    const monthlyDmv = (state.annualDmv || 0) / 12;
    const monthlyUpkeep = (state.annualUpkeep || 0) / 12;
    const monthlyParking = Math.max(0, state.monthlyParking || 0);

    // Monthly Budget Formula:
    // Quoted Payment + (Insurance / Period) + Fuel + (DMV / 12) + (Maintenance / 12) + Parking
    const totalMonthlyBudget = effectivePayment + monthlyInsurance + monthlyFuel + monthlyDmv + monthlyUpkeep + monthlyParking;

    // The Gap
    const gapAmount = totalMonthlyBudget - basePayment;
    const gapPct = basePayment > 0 ? (gapAmount / basePayment) * 100 : 0;

    // Upfront cash
    const firstPaymentNotIncluded = !state.firstPaymentIncluded ? basePayment : 0;
    const totalCashUpfront = (state.dueAtSigning || 0) + (state.refundableDeposit || 0) + firstPaymentNotIncluded + tradeDebtUpfront;

    // Mileage & Lease End
    const annualDriven = (state.milesPerWeek || 0) * 52;
    const excessMilesPerYear = Math.max(0, annualDriven - (state.allowedMilesPerYear || 0));
    const termYears = (state.termMonths || 36) / 12;
    const totalTermExcessMiles = excessMilesPerYear * termYears;
    const mileagePenalty = isLease ? totalTermExcessMiles * (state.chargePerExcessMile || 0.25) : 0;
    const leaseReturnTotal = isLease ? (state.leaseReturnFee || 0) + mileagePenalty : 0;

    // DOM Updates: Previews
    if (el.monthlyInsurancePreview) {
      el.monthlyInsurancePreview.textContent = monthlyInsurance > 0 ? '= ' + formatCurrency(monthlyInsurance) + '/mo' : '= $0/mo';
    }
    if (el.monthlyDmvPreview) {
      el.monthlyDmvPreview.textContent = formatCurrency(monthlyDmv) + '/mo';
    }
    if (el.monthlyUpkeepPreview) {
      el.monthlyUpkeepPreview.textContent = formatCurrency(monthlyUpkeep) + '/mo';
    }
    if (el.annualMilesPreview) {
      el.annualMilesPreview.textContent = formatNum(annualDriven) + ' mi/yr';
    }

    // Mileage Banner
    if (isLease && el.mileageBanner) {
      if (annualDriven > state.allowedMilesPerYear) {
        el.mileageBanner.className = 'alert-box alert-overage';
        el.mileageBannerTitle.textContent = 'Mileage Penalty: +' + formatNum(totalTermExcessMiles) + ' excess mi (' + formatCurrency(mileagePenalty) + ')';
        el.mileageBannerDesc.textContent = 'Driving ' + formatNum(annualDriven) + ' mi/yr exceeds your ' + formatNum(state.allowedMilesPerYear) + ' limit by ' + formatNum(excessMilesPerYear) + ' mi/yr, adding a ' + formatCurrency(mileagePenalty) + ' bill at return.';
      } else {
        el.mileageBanner.className = 'alert-box alert-ok';
        el.mileageBannerTitle.textContent = 'Within Allowance (' + formatNum(annualDriven) + ' of ' + formatNum(state.allowedMilesPerYear) + ' mi/yr)';
        el.mileageBannerDesc.textContent = 'You have a safety cushion of ' + formatNum(state.allowedMilesPerYear - annualDriven) + ' miles per year without penalty fees.';
      }
    }

    // Receipt Column
    if (el.receiptTotalBudget) el.receiptTotalBudget.textContent = formatCurrency(totalMonthlyBudget);
    if (el.receiptPaymentLabel) el.receiptPaymentLabel.textContent = isLease ? 'Base Lease Payment' : 'Base Loan Payment';
    if (el.receiptPaymentVal) el.receiptPaymentVal.textContent = formatCurrency(basePayment);

    if (el.receiptDebtRow) {
      if (tradeDebtMonthly > 0) {
        el.receiptDebtRow.style.display = 'flex';
        el.receiptDebtVal.textContent = '+' + formatCurrency(tradeDebtMonthly);
      } else {
        el.receiptDebtRow.style.display = 'none';
      }
    }

    if (el.receiptInsuranceVal) el.receiptInsuranceVal.textContent = '+' + formatCurrency(monthlyInsurance);
    if (el.receiptFuelVal) el.receiptFuelVal.textContent = '+' + formatCurrency(monthlyFuel);
    if (el.receiptDmvVal) el.receiptDmvVal.textContent = '+' + formatCurrency(monthlyDmv);
    if (el.receiptUpkeepVal) el.receiptUpkeepVal.textContent = '+' + formatCurrency(monthlyUpkeep);
    if (el.receiptParkingVal) el.receiptParkingVal.textContent = '+' + formatCurrency(monthlyParking);

    // The Gap
    if (el.receiptGapAmount) el.receiptGapAmount.textContent = '+' + formatCurrency(gapAmount);
    if (el.receiptGapPercentage) el.receiptGapPercentage.textContent = '/ mo (+' + Math.round(gapPct) + '% above quote)';
    if (el.receiptGapDesc) {
      el.receiptGapDesc.innerHTML = 'Your <strong>' + formatCurrency(basePayment) + '</strong> sticker payment actually requires <strong style="color:#e2c192">' + formatCurrency(totalMonthlyBudget) + '</strong> cash every month to keep the car on the road.';
    }

    // Income Ratio
    if (el.receiptIncomeCard) {
      if (state.monthlyTakeHomeIncome > 0) {
        el.receiptIncomeCard.style.display = 'block';
        const ratio = (totalMonthlyBudget / state.monthlyTakeHomeIncome) * 100;
        el.receiptIncomeRatio.textContent = ratio.toFixed(1) + '%';
        el.receiptIncomeBar.style.width = Math.min(100, (ratio / 30) * 100) + '%';

        if (ratio <= 15) {
          el.receiptIncomeBar.style.backgroundColor = '#4ade80';
          el.receiptIncomeRatio.style.color = '#4ade80';
          el.receiptIncomeText.innerHTML = '<span style="color:#86efac">Affordable:</span> Under the recommended 15% net pay threshold.';
        } else if (ratio <= 20) {
          el.receiptIncomeBar.style.backgroundColor = '#fbbf24';
          el.receiptIncomeRatio.style.color = '#fbbf24';
          el.receiptIncomeText.innerHTML = '<span style="color:#fde047">Moderate:</span> Consumes 15–20% of take-home pay.';
        } else {
          el.receiptIncomeBar.style.backgroundColor = '#f87171';
          el.receiptIncomeRatio.style.color = '#f87171';
          el.receiptIncomeText.innerHTML = '<span style="color:#fca5a5">High Burden:</span> Exceeds 20% of take-home pay.';
        }
      } else {
        el.receiptIncomeCard.style.display = 'none';
      }
    }

    // Future Costs Cards
    if (el.futureUpfrontVal) el.futureUpfrontVal.textContent = formatCurrency(totalCashUpfront);
    if (el.futureUpfrontNote) {
      el.futureUpfrontNote.textContent = 'Due at signing (' + formatCurrency(state.dueAtSigning) + ')' +
        (state.refundableDeposit > 0 ? ' + deposit (' + formatCurrency(state.refundableDeposit) + ')' : '') +
        (!state.firstPaymentIncluded ? ' + 1st payment (' + formatCurrency(basePayment) + ')' : '') +
        (tradeDebtUpfront > 0 ? ' + negative equity (' + formatCurrency(tradeDebtUpfront) + ')' : '') + '.';
    }

    if (el.futureDmvVal) el.futureDmvVal.textContent = formatCurrency(state.annualDmv) + ' / yr';

    if (el.futureMileageCard) {
      el.futureMileageCard.style.display = isLease ? 'block' : 'none';
      el.futureMileageVal.textContent = mileagePenalty > 0 ? formatCurrency(mileagePenalty) : '$0';
      el.futureMileageVal.style.color = mileagePenalty > 0 ? '#f87171' : '#4ade80';
      el.futureMileageNote.textContent = mileagePenalty > 0
        ? '+' + formatNum(totalTermExcessMiles) + ' excess miles at $' + state.chargePerExcessMile + '/mi over ' + state.termMonths + ' months.'
        : 'Driving stays inside the annual mileage cap with zero penalty.';
    }

    if (el.futureReturnCard) {
      el.futureReturnCard.style.display = isLease ? 'block' : 'none';
      el.futureReturnVal.textContent = formatCurrency(leaseReturnTotal);
      el.futureReturnNote.textContent = 'Disposition fee (' + formatCurrency(state.leaseReturnFee) + ')' +
        (mileagePenalty > 0 ? ' + mileage penalties (' + formatCurrency(mileagePenalty) + ')' : '') + ' at lease turn-in.';
    }

    const safeTermMonths = Math.max(0, state.termMonths || 0);
    const totalMonthlyCarryOverTerm = totalMonthlyBudget * safeTermMonths;
    const estimatedGrandTotal = totalCashUpfront + totalMonthlyCarryOverTerm + (isLease ? leaseReturnTotal : 0);

    if (el.futureGrandTotalTitle) {
      el.futureGrandTotalTitle.textContent = 'Estimated Grand Total (' + safeTermMonths + 'm)';
    }
    if (el.futureGrandTotalVal) {
      el.futureGrandTotalVal.textContent = formatCurrency(estimatedGrandTotal);
    }
    if (el.futureGrandTotalNote) {
      el.futureGrandTotalNote.innerHTML =
        'Upfront (' + formatCurrency(totalCashUpfront) + ') + ' + safeTermMonths + ' mos of true carry (' + formatCurrency(totalMonthlyCarryOverTerm) + ')' +
        (isLease && leaseReturnTotal > 0 ? ' + lease return (' + formatCurrency(leaseReturnTotal) + ')' : '') +
        '.<br><span style="color:#a3a39b;display:inline-block;margin-top:4px;">Total money thrown into this car by the time the ' + (isLease ? 'lease' : 'loan') + ' ends—compared to <strong style="color:#f5f5f2;">' + formatCurrency(basePayment * safeTermMonths) + '</strong> in quoted monthly payments alone.</span>';
    }
  }

  // Populate UI inputs from State
  function syncInputs() {
    el.quotedPayment.value = state.quotedPayment || '';
    el.termMonths.value = state.termMonths || '';
    el.dueAtSigning.value = state.dueAtSigning || '';
    if (el.refundableDeposit) el.refundableDeposit.value = state.refundableDeposit || '';

    el.insurancePremium.value = state.insurancePremium || '';
    el.annualDmv.value = state.annualDmv || '';
    el.monthlyFuel.value = state.monthlyFuel || '';
    el.annualUpkeep.value = state.annualUpkeep || '';
    el.monthlyParking.value = state.monthlyParking || '';

    el.allowedMilesPerYear.value = state.allowedMilesPerYear || '';
    el.milesPerWeek.value = state.milesPerWeek || '';
    el.milesPerWeekSlider.value = state.milesPerWeek || 250;
    el.chargePerExcessMile.value = state.chargePerExcessMile || 0.25;
    el.leaseReturnFee.value = state.leaseReturnFee || 395;

    el.hasTradeIn.checked = state.hasTradeIn;
    el.tradeinFields.style.display = state.hasTradeIn ? 'grid' : 'none';
    el.tradeInPayoff.value = state.tradeInPayoff || '';
    el.tradeInOffer.value = state.tradeInOffer || '';

    el.hasExitScenario.checked = state.hasExitScenario;
    el.exitFields.style.display = state.hasExitScenario ? 'grid' : 'none';
    el.exitMonths.value = state.exitMonths || 36;
    el.estimatedResaleValue.value = state.estimatedResaleValue || '';

    el.monthlyIncome.value = state.monthlyTakeHomeIncome || '';

    // Income pills
    document.querySelectorAll('#income-pills .pill-btn').forEach(function (btn) {
      if (parseInt(btn.getAttribute('data-income'), 10) === state.monthlyTakeHomeIncome) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Deal type toggles
    if (state.dealType === 'lease') {
      el.toggleLease.classList.add('active');
      el.toggleFinance.classList.remove('active');
      el.termLabel.textContent = 'Lease length';
      el.sectionMileage.style.display = 'block';
    } else {
      el.toggleFinance.classList.add('active');
      el.toggleLease.classList.remove('active');
      el.termLabel.textContent = 'Loan term';
      el.sectionMileage.style.display = 'none';
    }

    // Insurance period buttons
    el.insurancePeriodBtns.forEach(function (btn) {
      if (parseInt(btn.getAttribute('data-period'), 10) === state.insurancePeriod) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    calculate();
  }

  // Bind Event Listeners
  function initListeners() {
    // Mode toggles
    el.toggleLease.addEventListener('click', function () {
      state.dealType = 'lease';
      syncInputs();
    });

    el.toggleFinance.addEventListener('click', function () {
      state.dealType = 'finance';
      syncInputs();
    });

    // Try Example button
    el.btnExample.addEventListener('click', function () {
      if (state.dealType === 'lease') {
        state.quotedPayment = 469;
        state.termMonths = 36;
        state.dueAtSigning = 3250;
        state.firstPaymentIncluded = true;
        state.refundableDeposit = 0;
        state.insurancePremium = 1050;
        state.insurancePeriod = 6;
        state.annualDmv = 420;
        state.monthlyFuel = 160;
        state.annualUpkeep = 600;
        state.monthlyParking = 65;
        state.allowedMilesPerYear = 10000;
        state.milesPerWeek = 260;
        state.chargePerExcessMile = 0.25;
        state.leaseReturnFee = 495;
        state.hasTradeIn = false;
        state.hasIncome = true;
        state.monthlyTakeHomeIncome = 5800;
      } else {
        state.quotedPayment = 585;
        state.termMonths = 60;
        state.dueAtSigning = 4500;
        state.firstPaymentIncluded = true;
        state.refundableDeposit = 0;
        state.insurancePremium = 980;
        state.insurancePeriod = 6;
        state.annualDmv = 380;
        state.monthlyFuel = 190;
        state.annualUpkeep = 900;
        state.monthlyParking = 40;
        state.hasTradeIn = false;
        state.hasExitScenario = true;
        state.exitMonths = 48;
        state.estimatedResaleValue = 16500;
        state.hasIncome = true;
        state.monthlyTakeHomeIncome = 6500;
      }
      syncInputs();
    });

    // Clear button
    el.btnClear.addEventListener('click', function () {
      state.quotedPayment = 0;
      state.dueAtSigning = 0;
      state.refundableDeposit = 0;
      state.insurancePremium = 0;
      state.annualDmv = 0;
      state.monthlyFuel = 0;
      state.annualUpkeep = 0;
      state.monthlyParking = 0;
      state.milesPerWeek = 0;
      state.tradeInPayoff = 0;
      state.tradeInOffer = 0;
      state.monthlyTakeHomeIncome = 0;
      syncInputs();
    });

    // Number Inputs
    const bindings = [
      { input: el.quotedPayment, prop: 'quotedPayment' },
      { input: el.termMonths, prop: 'termMonths' },
      { input: el.dueAtSigning, prop: 'dueAtSigning' },
      { input: el.refundableDeposit, prop: 'refundableDeposit' },
      { input: el.insurancePremium, prop: 'insurancePremium' },
      { input: el.annualDmv, prop: 'annualDmv' },
      { input: el.monthlyFuel, prop: 'monthlyFuel' },
      { input: el.annualUpkeep, prop: 'annualUpkeep' },
      { input: el.monthlyParking, prop: 'monthlyParking' },
      { input: el.allowedMilesPerYear, prop: 'allowedMilesPerYear' },
      { input: el.milesPerWeek, prop: 'milesPerWeek', syncSlider: true },
      { input: el.chargePerExcessMile, prop: 'chargePerExcessMile' },
      { input: el.leaseReturnFee, prop: 'leaseReturnFee' },
      { input: el.tradeInPayoff, prop: 'tradeInPayoff' },
      { input: el.tradeInOffer, prop: 'tradeInOffer' },
      { input: el.exitMonths, prop: 'exitMonths' },
      { input: el.estimatedResaleValue, prop: 'estimatedResaleValue' },
      { input: el.monthlyIncome, prop: 'monthlyTakeHomeIncome' },
    ];

    bindings.forEach(function (b) {
      if (!b.input) return;
      b.input.addEventListener('input', function (e) {
        state[b.prop] = parseFloat(e.target.value) || 0;
        if (b.syncSlider && el.milesPerWeekSlider) {
          el.milesPerWeekSlider.value = state[b.prop];
        }
        calculate();
      });
    });

    // Slider sync
    if (el.milesPerWeekSlider) {
      el.milesPerWeekSlider.addEventListener('input', function (e) {
        state.milesPerWeek = parseInt(e.target.value, 10) || 0;
        el.milesPerWeek.value = state.milesPerWeek;
        calculate();
      });
    }

    // Insurance period buttons
    el.insurancePeriodBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        el.insurancePeriodBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        state.insurancePeriod = parseInt(btn.getAttribute('data-period'), 10) || 6;
        calculate();
      });
    });

    // Quick term pills
    document.querySelectorAll('#term-pills .pill-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('#term-pills .pill-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        state.termMonths = parseInt(btn.getAttribute('data-months'), 10) || 36;
        el.termMonths.value = state.termMonths;
        calculate();
      });
    });

    // Quick mileage pills
    document.querySelectorAll('#mileage-pills .pill-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('#mileage-pills .pill-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        state.allowedMilesPerYear = parseInt(btn.getAttribute('data-miles'), 10) || 10000;
        el.allowedMilesPerYear.value = state.allowedMilesPerYear;
        calculate();
      });
    });

    // Trade-in checkbox
    el.hasTradeIn.addEventListener('change', function (e) {
      state.hasTradeIn = e.target.checked;
      el.tradeinFields.style.display = state.hasTradeIn ? 'grid' : 'none';
      calculate();
    });

    // Negative equity treatment buttons
    el.debtRolled.addEventListener('click', function () {
      state.debtTreatment = 'rolled_in';
      el.debtRolled.classList.add('active');
      el.debtUpfront.classList.remove('active');
      calculate();
    });

    el.debtUpfront.addEventListener('click', function () {
      state.debtTreatment = 'paid_upfront';
      el.debtUpfront.classList.add('active');
      el.debtRolled.classList.remove('active');
      calculate();
    });

    // Exit scenario checkbox
    el.hasExitScenario.addEventListener('change', function (e) {
      state.hasExitScenario = e.target.checked;
      el.exitFields.style.display = state.hasExitScenario ? 'grid' : 'none';
      calculate();
    });

    // Income pills click
    document.querySelectorAll('#income-pills .pill-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('#income-pills .pill-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        state.monthlyTakeHomeIncome = parseInt(btn.getAttribute('data-income'), 10) || 0;
        el.monthlyIncome.value = state.monthlyTakeHomeIncome;
        calculate();
      });
    });
  }

  // Initialize
  initListeners();
  syncInputs();
})();
