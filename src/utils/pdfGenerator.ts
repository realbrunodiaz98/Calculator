import { jsPDF } from 'jspdf';
import { CarCalculatorState, CalculationResults } from '../types';
import { formatCurrency, formatNumber } from './calculator';

export function generatePdfReport(state: CarCalculatorState, results: CalculationResults): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // ~215.9 mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // ~187.9 mm
  let y = margin;

  const isLease = state.dealType === 'lease';
  const timestamp = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Colors
  const copper = [185, 139, 84]; // #b98b54
  const darkCharcoal = [20, 20, 18];
  const offWhiteBg = [248, 248, 245];
  const borderGray = [224, 224, 218];
  const textDark = [25, 25, 23];
  const textMuted = [110, 110, 105];
  const redAlert = [190, 40, 40];
  const greenOk = [34, 139, 64];

  // 1. TOP BRAND BANNER / HEADER
  doc.setFillColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.rect(margin, y, contentWidth, 24, 'F');

  // Copper accent line at top of header
  doc.setFillColor(copper[0], copper[1], copper[2]);
  doc.rect(margin, y, contentWidth, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(copper[0], copper[1], copper[2]);
  doc.text('MAKE CHEAPER MISTAKES THAN I DID', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(170, 170, 165);
  doc.text('FINANCIAL RECEIPT', margin + 68, y + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('Real Car Cost & True Carry Report', margin + 6, y + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(190, 190, 185);
  doc.text(`Generated: ${timestamp}`, pageWidth - margin - 6, y + 8, { align: 'right' });
  doc.text(`Deal Type: ${isLease ? 'Lease Agreement' : 'Purchase / Loan'}`, pageWidth - margin - 6, y + 15, { align: 'right' });

  y += 28;

  // 2. THE QUOTE VS TRUE CARRY (HIGHLIGHT CARDS)
  const cardGap = 4;
  const colWidth = (contentWidth - cardGap * 2) / 3;

  // Card A: Quoted Payment
  doc.setFillColor(offWhiteBg[0], offWhiteBg[1], offWhiteBg[2]);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, colWidth, 25, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('QUOTED BASE PAYMENT', margin + 4, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(formatCurrency(results.baseMonthlyPayment), margin + 4, y + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`${state.termMonths} mo term`, margin + 4, y + 20);

  // Card B: True Monthly Budget (Main Highlight)
  const cardBX = margin + colWidth + cardGap;
  doc.setFillColor(243, 238, 230); // warm copper-tinted background
  doc.setDrawColor(copper[0], copper[1], copper[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(cardBX, y, colWidth, 25, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(copper[0], copper[1], copper[2]);
  doc.text('TRUE MONTHLY BUDGET', cardBX + 4, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.text(`${formatCurrency(results.totalMonthlyBudget)}/mo`, cardBX + 4, y + 14);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(copper[0], copper[1], copper[2]);
  doc.text('ALL SURROUNDING BILLS INCLUDED', cardBX + 4, y + 20);

  // Card C: The Monthly Gap
  const cardCX = cardBX + colWidth + cardGap;
  doc.setFillColor(254, 242, 242); // soft alert red
  doc.setDrawColor(248, 180, 180);
  doc.setLineWidth(0.3);
  doc.roundedRect(cardCX, y, colWidth, 25, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(redAlert[0], redAlert[1], redAlert[2]);
  doc.text('THE MONTHLY GAP', cardCX + 4, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(redAlert[0], redAlert[1], redAlert[2]);
  doc.text(`+${formatCurrency(results.gapAmount)}/mo`, cardCX + 4, y + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(redAlert[0], redAlert[1], redAlert[2]);
  doc.text(`+${Math.round(results.gapPercentage)}% above quoted sticker`, cardCX + 4, y + 20);

  y += 29;

  // 3. AFFORDABILITY & INCOME RATIO BENCHMARK
  if (results.incomeRatio !== null && state.monthlyTakeHomeIncome > 0) {
    const isAffordable = results.incomeRatio <= 15;
    const isModerate = results.incomeRatio <= 20;

    doc.setFillColor(
      isAffordable ? 240 : isModerate ? 254 : 254,
      isAffordable ? 253 : isModerate ? 249 : 242,
      isAffordable ? 244 : isModerate ? 230 : 242
    );
    doc.setDrawColor(
      isAffordable ? greenOk[0] : isModerate ? copper[0] : redAlert[0],
      isAffordable ? greenOk[1] : isModerate ? copper[1] : redAlert[1],
      isAffordable ? greenOk[2] : isModerate ? copper[2] : redAlert[2]
    );
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(
      isAffordable ? greenOk[0] : isModerate ? 160 : redAlert[0],
      isAffordable ? greenOk[1] : isModerate ? 100 : redAlert[1],
      isAffordable ? greenOk[2] : isModerate ? 30 : redAlert[2]
    );
    const benchmarkLabel = isAffordable
      ? 'HEALTHY AFFORDABILITY (Within 15% Net Income Rule)'
      : isModerate
      ? 'MODERATE STRETCH (15% - 20% Net Income Rule)'
      : 'HIGH FINANCIAL BURDEN (> 20% of Net Take-Home Pay)';
    doc.text(benchmarkLabel, margin + 4, y + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const incomeText = `Net Pay: ${formatCurrency(state.monthlyTakeHomeIncome)}/mo · Car Budget Consumes: ${results.incomeRatio.toFixed(1)}% of take-home pay (${formatCurrency(results.totalMonthlyBudget)}/mo).`;
    doc.text(incomeText, margin + 4, y + 10.5);

    y += 18;
  }

  // 4. MONTHLY BREAKDOWN LEDGER TABLE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('ITEMIZED MONTHLY RUNNING COST BREAKDOWN', margin, y);

  y += 3;

  // Table header
  doc.setFillColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.rect(margin, y, contentWidth, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('EXPENSE CATEGORY', margin + 4, y + 4.2);
  doc.text('FORMULA & INPUT BASIS', margin + 70, y + 4.2);
  doc.text('MONTHLY RUN RATE', pageWidth - margin - 4, y + 4.2, { align: 'right' });

  y += 6;

  // Table rows
  interface RowData {
    category: string;
    basis: string;
    amount: string;
    isBold?: boolean;
    isWarning?: boolean;
  }

  const rows: RowData[] = [
    {
      category: isLease ? 'Quoted Lease Payment' : 'Quoted Loan Payment',
      basis: `${state.termMonths} month term`,
      amount: formatCurrency(results.baseMonthlyPayment),
    },
  ];

  if (results.tradeInMonthlyAdjustment > 0) {
    rows.push({
      category: 'Rolled-in Negative Equity',
      basis: `Trade underwater by ${formatCurrency((state.tradeInPayoff || 0) - (state.tradeInOffer || 0))} amortized over term`,
      amount: `+${formatCurrency(results.tradeInMonthlyAdjustment)}`,
      isWarning: true,
    });
  }

  rows.push(
    {
      category: 'Insurance Premium',
      basis: `${formatCurrency(state.insurancePremium)} every ${state.insurancePeriod} months`,
      amount: `+${formatCurrency(results.monthlyInsurance)}`,
    },
    {
      category: 'Fuel / Charging',
      basis: 'Estimated ongoing monthly energy expense',
      amount: `+${formatCurrency(results.monthlyFuel)}`,
    },
    {
      category: 'Annual DMV & Registration',
      basis: `${formatCurrency(state.annualDmv)} annual renewal / 12 months`,
      amount: `+${formatCurrency(results.monthlyDmvReserve)}`,
    },
    {
      category: 'Upkeep, Tires & Maintenance',
      basis: `${formatCurrency(state.annualUpkeep)} routine annual service reserve / 12`,
      amount: `+${formatCurrency(results.monthlyUpkeepReserve)}`,
    },
    {
      category: 'Parking & Tolls',
      basis: 'Monthly garage passes, permits, and tolls',
      amount: `+${formatCurrency(results.monthlyParking)}`,
    }
  );

  rows.forEach((row, idx) => {
    const isAlt = idx % 2 === 1;
    doc.setFillColor(isAlt ? 250 : 255, isAlt ? 250 : 255, isAlt ? 248 : 255);
    doc.rect(margin, y, contentWidth, 5.5, 'F');
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
    doc.setLineWidth(0.15);
    doc.line(margin, y + 5.5, pageWidth - margin, y + 5.5);

    doc.setFont('helvetica', row.isBold ? 'bold' : 'normal');
    doc.setFontSize(7.5);
    if (row.isWarning) {
      doc.setTextColor(redAlert[0], redAlert[1], redAlert[2]);
    } else {
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    }
    doc.text(row.category, margin + 4, y + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(row.basis, margin + 70, y + 4);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    if (row.isWarning) {
      doc.setTextColor(redAlert[0], redAlert[1], redAlert[2]);
    } else {
      doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    }
    doc.text(row.amount, pageWidth - margin - 4, y + 4, { align: 'right' });

    y += 5.5;
  });

  // Table Total Row
  doc.setFillColor(242, 237, 230);
  doc.rect(margin, y, contentWidth, 6.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.text('TOTAL MONTHLY CAR BUDGET (TRUE CARRY)', margin + 4, y + 4.5);
  doc.setFontSize(9);
  doc.text(`${formatCurrency(results.totalMonthlyBudget)} / mo`, pageWidth - margin - 4, y + 4.5, { align: 'right' });

  y += 11;

  // 5. TWO-COLUMN BOTTOM SECTION: UPFRONT CASH & FUTURE COSTS
  const halfColWidth = (contentWidth - 6) / 2;

  // Left Box: Upfront Cash Needed
  doc.setFillColor(offWhiteBg[0], offWhiteBg[1], offWhiteBg[2]);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, halfColWidth, 42, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(copper[0], copper[1], copper[2]);
  doc.text('UPFRONT CASH AT SIGNING', margin + 4, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(formatCurrency(results.totalCashUpfront), margin + 4, y + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  let upfrontLineY = y + 19;
  doc.text(`• Total Due at signing: ${formatCurrency(results.upfrontBreakdown.dueAtSigning)}`, margin + 4, upfrontLineY);
  upfrontLineY += 4.5;
  if (results.upfrontBreakdown.deposit > 0) {
    doc.text(`• Security Deposit: ${formatCurrency(results.upfrontBreakdown.deposit)}`, margin + 4, upfrontLineY);
    upfrontLineY += 4.5;
  }
  if (results.upfrontBreakdown.firstPaymentNotIncluded > 0) {
    doc.text(`• 1st payment upfront: ${formatCurrency(results.upfrontBreakdown.firstPaymentNotIncluded)}`, margin + 4, upfrontLineY);
    upfrontLineY += 4.5;
  }
  if (results.upfrontBreakdown.tradeDebtUpfront > 0) {
    doc.text(`• Negative equity paid today: ${formatCurrency(results.upfrontBreakdown.tradeDebtUpfront)}`, margin + 4, upfrontLineY);
    upfrontLineY += 4.5;
  }
  doc.text('Total cash required out of pocket before driving away.', margin + 4, y + 38);

  // Right Box: Future Costs Waiting Later
  const rightColX = margin + halfColWidth + 6;
  doc.setFillColor(offWhiteBg[0], offWhiteBg[1], offWhiteBg[2]);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.roundedRect(rightColX, y, halfColWidth, 42, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(copper[0], copper[1], copper[2]);
  doc.text('FUTURE COSTS WAITING LATER', rightColX + 4, y + 6);

  let futureLineY = y + 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`Annual DMV Bill: ${formatCurrency(results.annualDmvTotal)}/yr`, rightColX + 4, futureLineY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`(Keep ${formatCurrency(results.monthlyDmvReserve)}/mo in reserve so renewal isn't a shock)`, rightColX + 4, futureLineY + 3.8);

  futureLineY += 9;

  if (isLease) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    if (results.mileagePenaltyTotal > 0) {
      doc.setTextColor(redAlert[0], redAlert[1], redAlert[2]);
      doc.text(`Mileage Penalty: +${formatCurrency(results.mileagePenaltyTotal)}`, rightColX + 4, futureLineY);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.text(
        `Driving ${state.milesPerWeek} mi/wk creates ${formatNumber(results.totalTermExcessMiles)} excess miles`,
        rightColX + 4,
        futureLineY + 3.8
      );
    } else {
      doc.setTextColor(greenOk[0], greenOk[1], greenOk[2]);
      doc.text('Mileage Penalty: $0 (Within Allowance)', rightColX + 4, futureLineY);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.text(`Driving ${state.milesPerWeek} mi/wk stays inside ${formatNumber(state.allowedMilesPerYear)} mi/yr`, rightColX + 4, futureLineY + 3.8);
    }

    futureLineY += 9;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(`Lease Return Bill: ${formatCurrency(results.leaseReturnCostsTotal)}`, rightColX + 4, futureLineY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`Disposition fee (${formatCurrency(state.leaseReturnFee)}) + overage penalty at turn-in`, rightColX + 4, futureLineY + 3.8);
  } else if (state.hasExitScenario) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(copper[0], copper[1], copper[2]);
    doc.text(`Net Cost @ Month ${state.exitMonths}: ${formatCurrency(results.netCostAfterResale)}`, rightColX + 4, futureLineY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(
      `Total payments (${formatCurrency(results.totalSpentAtExit)}) minus ${formatCurrency(state.estimatedResaleValue)} resale`,
      rightColX + 4,
      futureLineY + 3.8
    );
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    doc.text(`Total Loan Payments: ${formatCurrency(results.baseMonthlyPayment * state.termMonths)}`, rightColX + 4, futureLineY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(`Full loan payout over ${state.termMonths} months of ownership`, rightColX + 4, futureLineY + 3.8);
  }

  y += 45;

  // 5B. ESTIMATED GRAND TOTAL (FULL TERM BIG PICTURE)
  doc.setFillColor(243, 238, 230);
  doc.setDrawColor(copper[0], copper[1], copper[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(copper[0], copper[1], copper[2]);
  doc.text(`ESTIMATED GRAND TOTAL (${state.termMonths}-MONTH ${isLease ? 'LEASE' : 'LOAN'} OUTLAY)`, margin + 4, y + 5.8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(darkCharcoal[0], darkCharcoal[1], darkCharcoal[2]);
  doc.text(formatCurrency(results.estimatedGrandTotal), pageWidth - margin - 4, y + 7.2, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const grandTotalBreakdown = `Upfront (${formatCurrency(results.totalCashUpfront)}) + ${state.termMonths} mos true carry (${formatCurrency(results.totalMonthlyCarryOverTerm)})${isLease && results.leaseReturnCostsTotal > 0 ? ` + lease return (${formatCurrency(results.leaseReturnCostsTotal)})` : ''}.`;
  doc.text(grandTotalBreakdown, margin + 4, y + 11.2);

  doc.setFontSize(6.8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(
    `Total spent by term end vs. ${formatCurrency(results.baseMonthlyPayment * state.termMonths)} in quoted sticker payments alone.`,
    margin + 4,
    y + 15.2
  );

  y += 22;

  // 6. PERSONAL NOTE
  doc.setFillColor(245, 244, 240);
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 11, 2, 2, 'FD');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(
    "I spent ~$69K on 5 cars from 2022 to 2026 and own nothing so you don't have to - Bruno.",
    margin + 4,
    y + 6.8
  );

  y += 15;

  // Bottom Line & Meta
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(
    'Real Car Cost Calculator · This is not financial advice · These are estimates based on your inputs · For educational purposes only · Make Cheaper Mistakes Than I Did',
    margin,
    y + 4
  );
  doc.text('Page 1 of 1', pageWidth - margin, y + 4, { align: 'right' });

  // Save the PDF
  const filename = `Car-Cost-Receipt-${state.dealType}-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
