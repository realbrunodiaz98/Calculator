/**
 * Standalone production templates for static site hosting on Render & GitHub Pages.
 * Pure Vanilla HTML5, modern CSS with custom properties, and modular Vanilla JS.
 */

export function getStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Real Car Cost Calculator — Make Cheaper Mistakes</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23171715'/%3E%3Crect x='1' y='1' width='30' height='30' rx='6' fill='none' stroke='%23b98b54' stroke-width='1.5' stroke-opacity='0.75'/%3E%3Cpath d='M5.5 19.5V16c0-.8.5-1.3 1.3-1.5l3.7-4c.6-.7 1.3-1 2.2-1h5.6c.9 0 1.7.4 2.3 1.1l2.5 3.1 2.8.8c.7.2 1.1.8 1.1 1.6v3.4z' fill='%23f5f5f2'/%3E%3Cpath d='M11.3 14.3l1.6-2.5h4.9l2.3 2.5z' fill='%23171715'/%3E%3Ccircle cx='10.5' cy='20' r='3.5' fill='%23171715'/%3E%3Ccircle cx='10.5' cy='20' r='2.3' fill='%23b98b54'/%3E%3Ccircle cx='10.5' cy='20' r='0.8' fill='%23171715'/%3E%3Ccircle cx='21.5' cy='20' r='3.5' fill='%23171715'/%3E%3Ccircle cx='21.5' cy='20' r='2.3' fill='%23b98b54'/%3E%3Ccircle cx='21.5' cy='20' r='0.8' fill='%23171715'/%3E%3C/svg%3E">
  <meta name="description" content="Calculate the true monthly car budget, hidden fees, insurance, DMV reserves, and lease penalties.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Top Bar -->
  <header class="site-header">
    <div class="top-bar">
      <div class="top-bar-left">
        <span class="brand-title">MAKE CHEAPER MISTAKES THAN I DID</span>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-headline" style="margin-bottom: 0;">The payment is only the beginning.</h1>
      </div>
    </div>
  </header>

  <!-- Main 2-Column App Layout -->
  <main class="calculator-container">
    <!-- Left Column: Input Form -->
    <section class="form-column">
      <!-- Toolbar -->
      <div class="toolbar-card">
        <div class="segmented-control" role="group" aria-label="Deal Type">
          <button type="button" id="toggle-lease" class="segment-btn active" data-type="lease">Leasing</button>
          <button type="button" id="toggle-finance" class="segment-btn" data-type="finance">Financing</button>
        </div>
        <div class="toolbar-actions">
          <button type="button" id="btn-example" class="btn-accent">Try an example</button>
          <button type="button" id="btn-clear" class="btn-subtle">Clear</button>
        </div>
      </div>

      <!-- 01 The offer on the table -->
      <div class="section-card">
        <div class="section-header">
          <div>
            <span class="section-kicker">SECTION 01</span>
            <h2 class="section-title">The offer on the table</h2>
          </div>
        </div>

        <div class="input-grid">
          <div class="input-field col-span-2">
            <div class="label-row">
              <label for="quotedPayment">Monthly payment</label>
            </div>
            <div class="input-prefix-wrapper">
              <span class="input-prefix">$</span>
              <input type="number" id="quotedPayment" min="0" step="1" placeholder="e.g. 469" class="input-control font-mono">
            </div>
          </div>

          <div class="input-field">
            <div class="label-row">
              <label for="termMonths" id="term-label">Lease length</label>
              <span class="helper-text">Months</span>
            </div>
            <input type="number" id="termMonths" min="12" max="96" step="1" value="36" class="input-control font-mono">
            <div class="pill-group" id="term-pills">
              <button type="button" class="pill-btn" data-months="24">24m</button>
              <button type="button" class="pill-btn active" data-months="36">36m</button>
              <button type="button" class="pill-btn" data-months="48">48m</button>
            </div>
          </div>

          <div class="input-field">
            <div class="label-row">
              <label for="dueAtSigning">Total due at signing</label>
              <span class="helper-text">Cash down + drive-off</span>
            </div>
            <div class="input-prefix-wrapper">
              <span class="input-prefix">$</span>
              <input type="number" id="dueAtSigning" min="0" step="50" placeholder="e.g. 3000" class="input-control font-mono">
            </div>
          </div>
        </div>
      </div>

      <!-- 02 The bills around it -->
      <div class="section-card">
        <div class="section-header">
          <div>
            <span class="section-kicker">SECTION 02</span>
            <h2 class="section-title">The bills around it</h2>
          </div>
        </div>

        <div class="input-grid">
          <div class="input-field col-span-2 highlight-box">
            <div class="grid-2-1">
              <div>
                <div class="label-row">
                  <label for="insurancePremium">Insurance premium</label>
                  <span id="monthly-insurance-preview" class="highlight-mono">= $0/mo</span>
                </div>
                <div class="input-prefix-wrapper">
                  <span class="input-prefix">$</span>
                  <input type="number" id="insurancePremium" min="0" step="25" placeholder="e.g. 1050" class="input-control font-mono">
                </div>
              </div>
              <div>
                <label class="block-label">Premium covers</label>
                <div class="segmented-control inline-segment" id="insurance-period-group">
                  <button type="button" class="segment-btn" data-period="1">1 mo</button>
                  <button type="button" class="segment-btn active" data-period="6">6 mos</button>
                  <button type="button" class="segment-btn" data-period="12">12 mos</button>
                </div>
              </div>
            </div>
          </div>

          <div class="input-field">
            <div class="label-row">
              <label for="annualDmv">Annual DMV / registration</label>
              <span id="monthly-dmv-preview" class="helper-text">$0/mo</span>
            </div>
            <div class="input-prefix-wrapper">
              <span class="input-prefix">$</span>
              <input type="number" id="annualDmv" min="0" step="25" placeholder="e.g. 420/yr" class="input-control font-mono">
            </div>
            <p class="field-hint">Lump sum yearly renewal; amortized monthly.</p>
          </div>

          <div class="input-field">
            <div class="label-row">
              <label for="monthlyFuel">Monthly fuel / charging</label>
              <span class="helper-text">Per month</span>
            </div>
            <div class="input-prefix-wrapper">
              <span class="input-prefix">$</span>
              <input type="number" id="monthlyFuel" min="0" step="10" placeholder="e.g. 160" class="input-control font-mono">
            </div>
            <p class="field-hint">Gasoline or EV home/supercharging.</p>
          </div>

          <div class="input-field">
            <div class="label-row">
              <label for="annualUpkeep">Annual upkeep reserve</label>
              <span id="monthly-upkeep-preview" class="helper-text">$0/mo</span>
            </div>
            <div class="input-prefix-wrapper">
              <span class="input-prefix">$</span>
              <input type="number" id="annualUpkeep" min="0" step="50" placeholder="e.g. 600/yr" class="input-control font-mono">
            </div>
            <p class="field-hint">Tires, brakes, routine maintenance reserve.</p>
          </div>

          <div class="input-field">
            <div class="label-row">
              <label for="monthlyParking">Monthly parking / tolls</label>
              <span class="helper-text">Per month</span>
            </div>
            <div class="input-prefix-wrapper">
              <span class="input-prefix">$</span>
              <input type="number" id="monthlyParking" min="0" step="10" placeholder="e.g. 50" class="input-control font-mono">
            </div>
            <p class="field-hint">Parking permits, garages, toll passes.</p>
          </div>
        </div>
      </div>

      <!-- 03 The miles add up (Lease Only) -->
      <div class="section-card" id="section-mileage">
        <div class="section-header">
          <div>
            <span class="section-kicker">SECTION 03</span>
            <h2 class="section-title">The miles add up</h2>
          </div>
        </div>

        <div class="input-grid">
          <div class="input-field">
            <div class="label-row">
              <label for="allowedMilesPerYear">Allowed miles per year</label>
              <span class="helper-text">Contract limit</span>
            </div>
            <input type="number" id="allowedMilesPerYear" min="5000" step="500" value="10000" class="input-control font-mono">
            <div class="pill-group" id="mileage-pills">
              <button type="button" class="pill-btn" data-miles="7500">7.5k</button>
              <button type="button" class="pill-btn active" data-miles="10000">10k</button>
              <button type="button" class="pill-btn" data-miles="12000">12k</button>
              <button type="button" class="pill-btn" data-miles="15000">15k</button>
            </div>
          </div>

          <div class="input-field">
            <div class="label-row">
              <label for="milesPerWeek">Miles you drive per week</label>
              <span id="annual-miles-preview" class="highlight-mono">13,000 mi/yr</span>
            </div>
            <input type="number" id="milesPerWeek" min="0" max="1000" step="10" value="250" class="input-control font-mono">
            <input type="range" id="milesPerWeekSlider" min="50" max="600" step="10" value="250" class="slider-control">
            <p class="field-hint">35 mi/day roundtrip commute ≈ 245 mi/week.</p>
          </div>

          <div class="input-field">
            <div class="label-row">
              <label for="chargePerExcessMile">Charge per excess mile</label>
              <span class="helper-text">Default $0.25</span>
            </div>
            <div class="input-prefix-wrapper">
              <span class="input-prefix">$</span>
              <input type="number" id="chargePerExcessMile" min="0.05" max="1.00" step="0.05" value="0.25" class="input-control font-mono">
            </div>
          </div>

          <div class="input-field">
            <div class="label-row">
              <label for="leaseReturnFee">Lease return fee</label>
              <span class="helper-text">Disposition fee</span>
            </div>
            <div class="input-prefix-wrapper">
              <span class="input-prefix">$</span>
              <input type="number" id="leaseReturnFee" min="0" step="50" value="395" class="input-control font-mono">
            </div>
          </div>
        </div>

        <!-- Dynamic Mileage Banner -->
        <div id="mileage-banner" class="alert-box alert-overage">
          <div class="alert-title" id="mileage-banner-title">Expected Mileage Penalty</div>
          <div class="alert-desc" id="mileage-banner-desc">Calculating driving habits...</div>
        </div>
      </div>

      <!-- 04 Monthly take-home income -->
      <div class="section-card" id="section-income">
        <div class="section-header">
          <div>
            <span class="section-kicker">SECTION 04</span>
            <h2 class="section-title">Monthly take-home income</h2>
          </div>
          <span class="section-badge badge-warning">15% Rule Benchmark</span>
        </div>

        <div class="input-grid">
          <div class="input-field col-span-2">
            <div class="label-row">
              <label for="monthlyIncome">Monthly take-home pay (after taxes)</label>
              <span class="helper-text">Your actual net paycheck</span>
            </div>
            <div class="input-prefix-wrapper">
              <span class="input-prefix">$</span>
              <input type="number" id="monthlyIncome" placeholder="e.g. 5800" class="input-control font-mono">
            </div>
            <div class="pill-group" id="income-pills">
              <button type="button" class="pill-btn" data-income="4000">$4k</button>
              <button type="button" class="pill-btn" data-income="5500">$5.5k</button>
              <button type="button" class="pill-btn" data-income="7000">$7k</button>
              <button type="button" class="pill-btn" data-income="9000">$9k</button>
              <button type="button" class="pill-btn" data-income="12000">$12k</button>
            </div>
            <p class="field-hint">Rule of thumb: Total car costs should stay under 10–15% of your net pay.</p>
          </div>
        </div>
      </div>

      <!-- Expandable Sections (Hidden Details) -->
      <div class="accordions-container">
        <!-- Trade-in -->
        <details class="accordion-item" id="accordion-tradein">
          <summary class="accordion-summary">
            <div class="accordion-title-wrap">
              <span class="accordion-title">Trade-in vehicle & negative equity</span>
              <span class="accordion-subtitle" id="tradein-summary-text">Appraised value vs current bank payoff</span>
            </div>
          </summary>
          <div class="accordion-content">
            <label class="checkbox-label">
              <input type="checkbox" id="hasTradeIn"> Include vehicle trade-in on this deal
            </label>
            <div class="input-grid mt-3" id="tradein-fields" style="display:none;">
              <div class="input-field">
                <label for="tradeInPayoff">Current loan payoff</label>
                <div class="input-prefix-wrapper">
                  <span class="input-prefix">$</span>
                  <input type="number" id="tradeInPayoff" placeholder="e.g. 15000" class="input-control font-mono">
                </div>
              </div>
              <div class="input-field">
                <label for="tradeInOffer">Trade-in offer from dealer</label>
                <div class="input-prefix-wrapper">
                  <span class="input-prefix">$</span>
                  <input type="number" id="tradeInOffer" placeholder="e.g. 13000" class="input-control font-mono">
                </div>
              </div>
              <div class="input-field col-span-2" id="negative-equity-card" style="display:none;">
                <div class="underwater-box">
                  <div class="underwater-header">
                    <span id="negative-equity-amount">Negative Equity: $0</span>
                    <span class="underwater-tag">Underwater</span>
                  </div>
                  <label class="block-label">Debt treatment:</label>
                  <div class="segmented-control inline-segment">
                    <button type="button" id="debt-rolled" class="segment-btn active" data-treatment="rolled_in">Roll into monthly payment</button>
                    <button type="button" id="debt-upfront" class="segment-btn" data-treatment="paid_upfront">Pay debt upfront today</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>

        <!-- Exit Scenario -->
        <details class="accordion-item" id="accordion-exit">
          <summary class="accordion-summary">
            <div class="accordion-title-wrap">
              <span class="accordion-title">Exit scenario & resale value</span>
              <span class="accordion-subtitle" id="exit-summary-text">Early sale or estimated market trade</span>
            </div>
          </summary>
          <div class="accordion-content">
            <label class="checkbox-label">
              <input type="checkbox" id="hasExitScenario"> Simulate selling before or at end of loan
            </label>
            <div class="input-grid mt-3" id="exit-fields" style="display:none;">
              <div class="input-field">
                <label for="exitMonths">Sell after how many months</label>
                <input type="number" id="exitMonths" min="6" max="120" step="6" value="36" class="input-control font-mono">
              </div>
              <div class="input-field">
                <label for="estimatedResaleValue">Estimated resale value</label>
                <div class="input-prefix-wrapper">
                  <span class="input-prefix">$</span>
                  <input type="number" id="estimatedResaleValue" placeholder="e.g. 18000" class="input-control font-mono">
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </section>

    <!-- Right Column: Sticky Receipt -->
    <aside class="receipt-column">
      <div class="receipt-card">
        <div class="receipt-top-trim"></div>

        <div class="receipt-body">
          <div class="receipt-header">
            <div>
              <h3 class="receipt-title">Real Cost Breakdown</h3>
            </div>
            <span class="receipt-pill">VERIFIED FORMULA</span>
          </div>

          <!-- Main Total -->
          <div class="main-total-box">
            <div class="total-label-row">
              <span class="total-label">Monthly car budget</span>
              <span class="total-tag">TRUE CARRY</span>
            </div>
            <div class="total-amount-row">
              <span class="total-amount font-mono" id="receipt-total-budget">$0</span>
              <span class="total-period font-mono">/ mo</span>
            </div>
            <p class="total-subtext">True sum required to stay fully insured, maintained, and rolling.</p>
          </div>

          <!-- Breakdown Rows -->
          <div class="breakdown-list">
            <div class="breakdown-kicker">INDIVIDUAL MONTHLY COSTS</div>

            <div class="breakdown-row">
              <span class="row-label" id="receipt-payment-label">Base Payment</span>
              <span class="row-value font-mono" id="receipt-payment-val">$0</span>
            </div>

            <div class="breakdown-row row-debt" id="receipt-debt-row" style="display:none;">
              <span class="row-label">Rolled-in Trade Debt</span>
              <span class="row-value font-mono" id="receipt-debt-val">+$0</span>
            </div>

            <div class="breakdown-row">
              <span class="row-label">Insurance Reserve (per month)</span>
              <span class="row-value font-mono" id="receipt-insurance-val">+$0</span>
            </div>

            <div class="breakdown-row">
              <span class="row-label">Fuel / Charging</span>
              <span class="row-value font-mono" id="receipt-fuel-val">+$0</span>
            </div>

            <div class="breakdown-row">
              <span class="row-label">DMV / Registration Reserve (1/12)</span>
              <span class="row-value font-mono" id="receipt-dmv-val">+$0</span>
            </div>

            <div class="breakdown-row">
              <span class="row-label">Upkeep & Tires Reserve (1/12)</span>
              <span class="row-value font-mono" id="receipt-upkeep-val">+$0</span>
            </div>

            <div class="breakdown-row">
              <span class="row-label">Parking & Tolls</span>
              <span class="row-value font-mono" id="receipt-parking-val">+$0</span>
            </div>
          </div>

          <!-- The Gap -->
          <div class="gap-card">
            <div class="gap-kicker">THE GAP</div>
            <div class="gap-amount-row">
              <span class="gap-amount font-mono" id="receipt-gap-amount">+$0</span>
              <span class="gap-percentage font-mono" id="receipt-gap-percentage">/ mo (+0%)</span>
            </div>
            <p class="gap-desc" id="receipt-gap-desc">
              Your sticker payment tells only part of the story.
            </p>
          </div>

          <!-- Income Ratio (If Enabled) -->
          <div class="income-ratio-box" id="receipt-income-card" style="display:none;">
            <div class="income-header">
              <span class="income-label">Car budget / take-home pay</span>
              <span class="income-ratio-val font-mono" id="receipt-income-ratio">0.0%</span>
            </div>
            <div class="progress-track">
              <div class="progress-bar" id="receipt-income-bar" style="width:0%;"></div>
            </div>
            <div class="progress-labels font-mono">
              <span>10% Ideal</span>
              <span>15% Max</span>
              <span>20%+ High</span>
            </div>
            <p class="income-status-desc" id="receipt-income-text"></p>
          </div>

          <!-- Print / Save PDF Action -->
          <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid #23231f;">
            <button type="button" class="btn-accent" style="width: 100%; font-family: 'JetBrains Mono', monospace;" onclick="window.print()">
              Print / Save PDF Report
            </button>
            <p style="font-size: 0.625rem; color: #73736b; text-align: center; margin-top: 0.375rem;">
              Printer-ready formatted financial breakdown.
            </p>
          </div>
        </div>
      </div>

      <!-- Future Costs Cards -->
      <div class="future-cards-wrap">
        <div class="future-heading">FUTURE COSTS WAITING LATER</div>

        <!-- 1. Cash Needed Upfront -->
        <div class="card-future">
          <div class="future-card-head">
            <span class="future-title">Cash Needed Upfront</span>
            <span class="future-val font-mono" id="future-upfront-val">$0</span>
          </div>
          <p class="future-note" id="future-upfront-note">Due at signing, deposit, and upfront fees.</p>
        </div>

        <!-- 2. Annual DMV Bills -->
        <div class="card-future">
          <div class="future-card-head">
            <span class="future-title">Annual DMV Bills</span>
            <span class="future-val font-mono" id="future-dmv-val">$0 / yr</span>
          </div>
          <p class="future-note" id="future-dmv-note">Lump-sum renewal bill due annually; keep reserved.</p>
        </div>

        <!-- 3. Expected Mileage Penalties -->
        <div class="card-future" id="future-mileage-card">
          <div class="future-card-head">
            <span class="future-title">Expected Mileage Penalties</span>
            <span class="future-val font-mono" id="future-mileage-val">$0</span>
          </div>
          <p class="future-note" id="future-mileage-note">Calculated over full term based on weekly driving.</p>
        </div>

        <!-- 4. Lease Return Costs -->
        <div class="card-future" id="future-return-card">
          <div class="future-card-head">
            <span class="future-title">Lease Return Costs</span>
            <span class="future-val font-mono" id="future-return-val">$0</span>
          </div>
          <p class="future-note" id="future-return-note">Disposition fee plus excess mileage penalties.</p>
        </div>

        <!-- 5. Estimated Grand Total -->
        <div class="card-future" id="future-grand-total-card" style="background: linear-gradient(135deg, #241d15, #171715); border-color: rgba(185, 139, 84, 0.45);">
          <div class="future-card-head">
            <span class="future-title" id="future-grand-total-title">Estimated Grand Total (36m)</span>
            <span class="future-val font-mono" id="future-grand-total-val" style="color: #e2c192; font-size: 1.05rem;">$0</span>
          </div>
          <p class="future-note" id="future-grand-total-note" style="color: #d1cec7;">Total cash spent over full term.</p>
        </div>
      </div>
    </aside>
  </main>

  <footer class="site-footer">
    <div class="footer-inner" style="justify-content: center; text-align: center;">
      <span>Real Car Cost Calculator · This is not financial advice · These are estimates based on your inputs · For educational purposes only · Make Cheaper Mistakes Than I Did</span>
    </div>
  </footer>

  <script src="app.js"></script>
</body>
</html>`;
}

export function getStandaloneCss(): string {
  return `/* Real Car Cost Calculator — Standalone Pure CSS */
:root {
  --bg-main: #111110;
  --bg-card: #171715;
  --bg-elevated: #1e1e1b;
  --bg-input: #121210;
  --accent-gold: #b98b54;
  --accent-gold-hover: #c99a63;
  --accent-gold-dim: rgba(185, 139, 84, 0.15);
  --border-subtle: #262622;
  --border-focus: #b98b54;
  --text-main: #f5f5f2;
  --text-muted: #a3a39e;
  --text-dim: #73736b;
  --color-danger: #f87171;
  --color-success: #4ade80;
  --color-warning: #fbbf24;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-main);
  color: var(--text-main);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: 'Outfit', sans-serif;
  letter-spacing: -0.02em;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
  font-variant-numeric: tabular-nums;
}

/* Header */
.site-header {
  border-bottom: 1px solid var(--border-subtle);
  background-color: rgba(20, 20, 18, 0.95);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 50;
}

.top-bar {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top-bar-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-title {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-main);
}

.separator {
  color: var(--text-dim);
}

.badge-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  padding: 0.125rem 0.5rem;
  border: 1px solid rgba(185, 139, 84, 0.4);
  background: var(--accent-gold-dim);
  color: var(--accent-gold);
  border-radius: 2px;
}

.hero-section {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem 2.5rem;
  border-top: 1px solid #1a1a17;
}

.hero-content {
  max-width: 800px;
}

.hero-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--accent-gold);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.hero-headline {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
  color: #fff;
  margin-bottom: 0.75rem;
}

.hero-subtext {
  font-size: 1.125rem;
  color: var(--text-muted);
  margin-bottom: 1.25rem;
}

.context-card {
  padding: 1rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  font-size: 0.875rem;
  color: #d1d1cc;
  line-height: 1.6;
}

.context-lead {
  color: #e2c192;
}

/* Layout */
.calculator-container {
  max-width: 1280px;
  margin: 2rem auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .calculator-container {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: start;
  }
}

/* Toolbar */
.toolbar-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  overflow-x: auto;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.segmented-control {
  display: inline-flex;
  background: #0d0d0c;
  padding: 4px;
  border-radius: 8px;
  border: 1px solid #23231f;
  gap: 4px;
  flex-shrink: 0;
}

.segment-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 0.8125rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  white-space: nowrap;
}

.segment-btn.active {
  background: #252521;
  color: var(--text-main);
  border: 1px solid rgba(185, 139, 84, 0.4);
}

.inline-segment {
  width: 100%;
}
.inline-segment .segment-btn {
  flex: 1;
}

.btn-accent {
  background: var(--accent-gold-dim);
  border: 1px solid rgba(185, 139, 84, 0.4);
  color: var(--accent-gold);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: inherit;
  white-space: nowrap;
}
.btn-accent:hover {
  background: rgba(185, 139, 84, 0.25);
}

.btn-subtle {
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-dim);
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  font-size: 0.8125rem;
  cursor: pointer;
  font-family: inherit;
  white-space: nowrap;
}
.btn-subtle:hover {
  color: var(--text-main);
  background: #22221e;
}

@media (max-width: 639px) {
  .toolbar-card {
    padding: 0.5rem 0.625rem;
    gap: 0.375rem;
  }
  .toolbar-card .segmented-control {
    padding: 2px;
    gap: 2px;
  }
  .toolbar-card .segment-btn {
    padding: 0.375rem 0.5rem;
    font-size: 0.6875rem;
  }
  .toolbar-actions {
    gap: 0.25rem;
  }
  .toolbar-card .btn-accent {
    padding: 0.375rem 0.5rem;
    font-size: 0.6875rem;
  }
  .toolbar-card .btn-subtle {
    padding: 0.375rem 0.4375rem;
    font-size: 0.6875rem;
  }
}

.btn-ghost {
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
}
.btn-ghost:hover {
  color: #fff;
  border-color: var(--accent-gold);
}

/* Sections */
.section-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #23231f;
  padding-bottom: 1rem;
  margin-bottom: 1.25rem;
}

.section-kicker {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  color: var(--accent-gold);
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.25rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
}

.section-badge {
  font-size: 0.75rem;
  color: var(--text-muted);
}
.badge-warning {
  color: var(--accent-gold);
  font-family: 'JetBrains Mono', monospace;
}

/* Inputs */
.input-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .input-grid {
    grid-template-columns: 1fr 1fr;
  }
  .col-span-2 {
    grid-column: span 2;
  }
}

.input-field {
  display: flex;
  flex-direction: column;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.375rem;
}

label, .block-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #c4c4be;
}

.helper-text {
  font-size: 0.6875rem;
  color: var(--text-dim);
}

.highlight-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--accent-gold);
}

.input-prefix-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-prefix {
  position: absolute;
  left: 0.875rem;
  color: var(--text-dim);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  pointer-events: none;
}

.input-control {
  width: 100%;
  background: var(--bg-input);
  border: 1px solid #2a2a26;
  border-radius: 8px;
  padding: 0.625rem 0.875rem;
  color: var(--text-main);
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-prefix-wrapper .input-control {
  padding-left: 2rem;
}

.input-control:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 1px var(--border-focus);
}

.field-hint {
  font-size: 0.6875rem;
  color: var(--text-dim);
  margin-top: 0.375rem;
}

.pill-group {
  display: flex;
  gap: 0.375rem;
  margin-top: 0.5rem;
}

.pill-btn {
  flex: 1;
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  padding: 0.25rem 0;
  border-radius: 4px;
  cursor: pointer;
}
.pill-btn:hover {
  border-color: #3f3f38;
  color: #fff;
}
.pill-btn.active {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
  background: var(--accent-gold-dim);
}

.highlight-box {
  background: #131311;
  border: 1px solid #242420;
  border-radius: 8px;
  padding: 0.875rem;
}

.grid-2-1 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 640px) {
  .grid-2-1 {
    grid-template-columns: 2fr 1fr;
  }
}

.slider-control {
  margin-top: 0.5rem;
  width: 100%;
  accent-color: var(--accent-gold);
  cursor: pointer;
}

.alert-box {
  margin-top: 1.25rem;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  font-size: 0.75rem;
  line-height: 1.5;
}
.alert-overage {
  background: #241614;
  border: 1px solid #6b2a24;
  color: #f7b6af;
}
.alert-ok {
  background: #141c16;
  border: 1px solid #204729;
  color: #bce6c6;
}
.alert-title {
  font-weight: 700;
  margin-bottom: 0.25rem;
}

/* Accordions */
.accordions-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.accordion-item {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  overflow: hidden;
}

.accordion-summary {
  padding: 1rem 1.25rem;
  cursor: pointer;
  user-select: none;
  list-style: none;
}
.accordion-summary::-webkit-details-marker {
  display: none;
}
.accordion-title {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-main);
}
.accordion-subtitle {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.accordion-content {
  padding: 1rem 1.25rem 1.25rem;
  border-top: 1px solid #23231f;
  background: #131311;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #d1d1cc;
  cursor: pointer;
}

.underwater-box {
  background: #271a17;
  border: 1px solid #4a2923;
  border-radius: 8px;
  padding: 0.875rem;
}
.underwater-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fca5a5;
  margin-bottom: 0.5rem;
}
.underwater-tag {
  font-size: 0.6875rem;
  color: #e29e98;
  font-weight: normal;
}

/* Receipt Column */
.receipt-column {
  position: relative;
}
@media (min-width: 1024px) {
  .receipt-column {
    position: sticky;
    top: 5rem;
  }
}

.receipt-card {
  background: #161614;
  border: 1px solid #2b2b26;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  margin-bottom: 1.5rem;
}

.receipt-top-trim {
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
}

.receipt-body {
  padding: 1.5rem;
}

.receipt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #242420;
  padding-bottom: 1rem;
  margin-bottom: 1.25rem;
}

.receipt-kicker {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  color: var(--accent-gold);
}

.receipt-title {
  font-size: 1.125rem;
  font-weight: 700;
}

.receipt-pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.625rem;
  color: #9c9c94;
  border: 1px solid #2e2e28;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
}

/* Main Total Box */
.main-total-box {
  background: #111110;
  border: 1px solid #252520;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
}

.total-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.total-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #9c9c94;
}

.total-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.625rem;
  background: var(--accent-gold-dim);
  color: var(--accent-gold);
  border: 1px solid rgba(185, 139, 84, 0.4);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
}

.total-amount-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.total-amount {
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
}

.total-period {
  font-size: 0.875rem;
  color: #73736b;
}

.total-subtext {
  font-size: 0.75rem;
  color: #999991;
  line-height: 1.4;
}

/* Breakdown List */
.breakdown-list {
  margin-bottom: 1.25rem;
}

.breakdown-kicker {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #66665f;
  margin-bottom: 0.5rem;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  padding: 0.375rem 0;
  border-bottom: 1px solid #1e1e1a;
  font-size: 0.75rem;
}

.row-label {
  color: #b5b5ad;
}

.row-value {
  color: #f5f5f2;
  font-weight: 600;
}

.row-debt .row-label, .row-debt .row-value {
  color: #fca5a5;
}

/* The Gap */
.gap-card {
  background: linear-gradient(135deg, #241d15, #191612);
  border: 1px solid rgba(185, 139, 84, 0.4);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
}

.gap-kicker {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  color: #c99a63;
  margin-bottom: 0.25rem;
}

.gap-amount-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.gap-amount {
  font-size: 1.75rem;
  font-weight: 800;
  color: #fff;
}

.gap-percentage {
  font-size: 0.75rem;
  color: var(--accent-gold);
}

.gap-desc {
  font-size: 0.75rem;
  color: #d1cec7;
  line-height: 1.4;
}

/* Income Ratio */
.income-ratio-box {
  background: #111110;
  border: 1px solid #262621;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.25rem;
}

.income-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.income-ratio-val {
  font-weight: 700;
}

.progress-track {
  height: 6px;
  background: #242420;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.375rem;
}

.progress-bar {
  height: 100%;
  background: var(--accent-gold);
  border-radius: 4px;
  transition: width 0.3s;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.625rem;
  color: #6e6e67;
  margin-bottom: 0.375rem;
}

.income-status-desc {
  font-size: 0.6875rem;
  line-height: 1.4;
}

/* Future Cards */
.future-cards-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.future-heading {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  color: var(--text-dim);
  padding: 0 0.25rem;
}

.card-future {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  padding: 0.875rem 1rem;
  transition: border-color 0.2s;
}
.card-future:hover {
  border-color: #383832;
}

.future-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.future-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-main);
}

.future-val {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-main);
}

.future-note {
  font-size: 0.6875rem;
  color: var(--text-muted);
  line-height: 1.4;
}

/* Footer */
.site-footer {
  border-top: 1px solid var(--border-subtle);
  padding: 2rem 1.5rem;
  margin-top: 4rem;
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-dim);
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
}

.footer-tag {
  font-family: 'JetBrains Mono', monospace;
  color: #8c8c85;
}

/* Print Styles */
@media print {
  body {
    background: #fff;
    color: #000;
  }
  .site-header, .toolbar-card, .accordions-container, .btn-ghost {
    display: none !important;
  }
  .calculator-container {
    display: block;
  }
  .receipt-card {
    border: 1px solid #ccc;
    background: #fff;
    color: #000;
    box-shadow: none;
  }
  .total-amount, .row-value, .gap-amount {
    color: #000 !important;
  }
}
`;
}

export function getStandaloneJs(): string {
  return `/**
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
`;
}

export function getSingleFileBundle(): string {
  const html = getStandaloneHtml();
  const css = getStandaloneCss();
  const js = getStandaloneJs();

  // Replace external style.css and app.js with embedded tags
  let bundle = html.replace(
    '<link rel="stylesheet" href="style.css">',
    `<style>\n${css}\n</style>`
  );
  bundle = bundle.replace(
    '<script src="app.js"></script>',
    `<script>\n${js}\n</script>`
  );
  return bundle;
}
