/**
 * GapLuck - Shipping & Traveler Steps Component JS
 * Renders parallel traveler vs. courier step-by-step logistics columns.
 * Strictly avoids em-dash characters, uses BEM, supports trilingual toggle.
 */

(function () {
  'use strict';

  // Helper to extract active language
  function getLanguage() {
    return document.documentElement.getAttribute('lang') || 'en';
  }

  const GapLuckShippingTravelerSteps = {
    // Standard Plane SVG for Traveler Header
    travelerIcon: `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 2L11 13"></path>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    `,

    // Standard Package SVG for Courier Header
    courierIcon: `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
        <polygon points="12 22.08 12 12 3 6.92 3 17.08 12 22.08"></polygon>
        <polygon points="12 22.08 21 17.08 21 6.92 12 12 12 22.08"></polygon>
        <polygon points="12 12 21 6.92 12 1.84 3 6.92 12 12"></polygon>
        <line x1="12" y1="5.14" x2="12" y2="12"></line>
      </svg>
    `,

    createMarkup: function () {
      const lang = getLanguage();
      // Access central translations database fallback to en if missing
      const t = (window.GapLuckI18N && window.GapLuckI18N[lang]) || (window.GapLuckI18N && window.GapLuckI18N.en) || {};

      // Safe get function
      const getVal = (key, fallback) => t[key] || fallback;

      // Traveler Steps
      const travelerSteps = [
        {
          num: 1,
          title: getVal('step_a1_title', 'Budget Escrow Hold'),
          desc: getVal('step_a1_desc', 'Buyer deposits funds into secure escrow. Route is locked.'),
          benefit: getVal('escrow_secured', 'Escrow Secured')
        },
        {
          num: 2,
          title: getVal('step_a2_title', 'Route Match & ID Verification'),
          desc: getVal('step_a2_desc', 'A verified traveler accepts the request. ID checks completed.'),
          benefit: getVal('identity_verified', 'ID Verified')
        },
        {
          num: 3,
          title: getVal('step_a3_title', 'Traveler Store Purchase'),
          desc: getVal('step_a3_desc', 'Traveler purchases the item physically and uploads receipt.')
        },
        {
          num: 4,
          title: getVal('step_a4_title', 'Physical Handover & Verification'),
          desc: getVal('step_a4_desc', 'Buyer meets traveler to inspect package in person.')
        },
        {
          num: 5,
          title: getVal('step_a5_title', 'Inspection & Payout'),
          desc: getVal('step_a5_desc', 'Upon inspection, buyer releases unique payout code to traveler.'),
          benefit: getVal('buyer_protection', 'Buyer Protection')
        }
      ];

      // Courier Steps
      const courierSteps = [
        {
          num: 1,
          title: getVal('step_b1_title', 'Forwarding Address Allocation'),
          desc: getVal('step_b1_desc', 'Buyer receives a tax-free shipping address in the foreign country.'),
          benefit: getVal('tax_free_state', 'Tax-Free DE/OR')
        },
        {
          num: 2,
          title: getVal('step_b2_title', 'Online Retail Order'),
          desc: getVal('step_b2_desc', 'Buyer purchases the product online and ships to warehouse.')
        },
        {
          num: 3,
          title: getVal('step_b3_title', 'Package Forwarding & Duty Prepay'),
          desc: getVal('step_b3_desc', 'Buyer prepays VAT, shipping, and duties directly on GapLuck.'),
          benefit: getVal('prepaid_duties', 'Duty Prepay')
        },
        {
          num: 4,
          title: getVal('step_b4_title', 'Global Home Delivery'),
          desc: getVal('step_b4_desc', 'DHL/FedEx clears customs and delivers to buyer home.')
        }
      ];

      const renderSteps = (steps) => steps.map(s => `
        <li class="ag-timeline-step-item">
          <div class="ag-timeline-step-badge">${s.num}</div>
          <div class="ag-timeline-step-card">
            <h4 class="ag-timeline-step-title">${s.title}</h4>
            <p class="ag-timeline-step-desc">${s.desc}</p>
            ${s.benefit ? `<span class="ag-timeline-step-benefit-badge">${s.benefit}</span>` : ''}
          </div>
        </li>
      `).join('');

      return `
        <div class="ag-timeline-container">
          <!-- Traveler Column -->
          <div class="ag-timeline-column ag-timeline-column--traveler">
            <h3 class="ag-timeline-column-header">
              <span class="ag-timeline-column-header-icon-wrapper ag-timeline-column-header-icon-wrapper--traveler">
                ${this.travelerIcon}
              </span>
              <span>${getVal('option_a_traveler', 'Option A: Get via Traveler')}</span>
            </h3>
            <ul class="ag-timeline-steps">
              ${renderSteps(travelerSteps)}
            </ul>
          </div>

          <!-- Courier Column -->
          <div class="ag-timeline-column ag-timeline-column--courier">
            <h3 class="ag-timeline-column-header">
              <span class="ag-timeline-column-header-icon-wrapper ag-timeline-column-header-icon-wrapper--courier">
                ${this.courierIcon}
              </span>
              <span>${getVal('option_b_courier', 'Option B: Get via Courier')}</span>
            </h3>
            <ul class="ag-timeline-steps">
              ${renderSteps(courierSteps)}
            </ul>
          </div>
        </div>
      `;
    },

    render: function (container) {
      if (!container) return;
      container.innerHTML = this.createMarkup().trim();
    },

    init: function () {
      const containers = document.querySelectorAll('[data-timeline-container]');
      containers.forEach(container => {
        this.render(container);
      });
    }
  };

  // Expose component globally
  window.GapLuckShippingTravelerSteps = GapLuckShippingTravelerSteps;

  // Render on ready
  if (document.body) {
    GapLuckShippingTravelerSteps.init();
  } else {
    document.addEventListener('DOMContentLoaded', () => GapLuckShippingTravelerSteps.init());
  }

  // Handle language updates
  window.addEventListener('gl-language-change', () => {
    GapLuckShippingTravelerSteps.init();
  });

})();
