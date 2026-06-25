/**
 * GapLuck - Centralized Generational Specs Comparison Component
 * Dynamically renders the specification comparison table and the upgrade verdict summary card.
 * Trilingual and theme-responsive.
 */

(function () {
  'use strict';

  class GapLuckSpecsComparison {
    /**
     * Create a specs comparison block
     * @param {string} containerSelector Target container element
     * @param {Object} data The specs and verdict dataset
     */
    constructor(containerSelector, data = {}) {
      this.container = document.querySelector(containerSelector);
      if (!this.container) {
        console.warn(`GapLuckSpecsComparison: Container "${containerSelector}" not found.`);
        return;
      }
      this.data = data;
      this.currentLang = window.currentLang || 'en';
      
      this.init();
    }

    init() {
      this.render();
      this.setupEventListeners();
    }

    getTxt(key) {
      const dict = window.GapLuckI18N ? (window.GapLuckI18N[this.currentLang] || window.GapLuckI18N.en) : {};
      return dict[key] || dict[key.toLowerCase()] || key;
    }

    render() {
      if (!this.data || !this.data.specs) return;

      const headers = this.data.headers || [];
      const specs = this.data.specs || [];
      const verdict = this.data.verdict || {};

      // Build Table HTML
      let tableHTML = `
        <div class="ag-comparison-table-wrapper">
          <table class="ag-comparison-table">
            <thead>
              <tr>
                <th data-i18n="specification">${this.getTxt('specification') || 'Specification'}</th>
      `;

      headers.forEach((header, idx) => {
        const highlightClass = idx === 0 ? ' class="ag-comparison-col-highlight"' : '';
        tableHTML += `<th${highlightClass}>${header}</th>`;
      });

      tableHTML += `
              </tr>
            </thead>
            <tbody>
      `;

      specs.forEach(row => {
        tableHTML += `
          <tr>
            <td>${row.label[this.currentLang] || row.label.en || row.label}</td>
        `;

        row.values.forEach((val, valIdx) => {
          if (valIdx === 0) {
            let badgeHTML = '';
            if (row.upgradeBadge) {
              badgeHTML = `<span class="ag-comparison-badge-upgrade">${row.upgradeBadge[this.currentLang] || row.upgradeBadge.en || row.upgradeBadge}</span>`;
            }
            tableHTML += `<td class="ag-comparison-col-highlight">${val}${badgeHTML}</td>`;
          } else {
            tableHTML += `<td>${val}</td>`;
          }
        });

        tableHTML += `</tr>`;
      });

      tableHTML += `
            </tbody>
          </table>
        </div>
      `;

      // Build Verdict Card HTML
      let verdictHTML = '';
      if (verdict && verdict.text) {
        const verdictTitle = verdict.title[this.currentLang] || verdict.title.en || verdict.title || 'Upgrade Verdict Summary';
        const verdictText = verdict.text[this.currentLang] || verdict.text.en || verdict.text || '';
        
        verdictHTML = `
          <div class="ag-upgrade-verdict-card">
            <div style="display:flex; align-items:center; gap:var(--space-3); margin-bottom:var(--space-2);">
              <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                stroke-width="2" viewBox="0 0 24 24" width="24" style="color: var(--color-warning);">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .5 2.5 1.5 3.5.7.8 1.3 1.5 1.5 2.5"></path>
                <line x1="9" x2="15" y1="18" y2="18"></line>
                <line x1="10" x2="14" y1="22" y2="22"></line>
              </svg>
              <h3 style="font-size:var(--text-base); margin:0; font-weight:var(--font-weight-bold); color:var(--color-text-primary);">${verdictTitle}</h3>
            </div>
            <p>${verdictText}</p>
          </div>
        `;
      }

      this.container.innerHTML = tableHTML + verdictHTML;
    }

    setupEventListeners() {
      window.addEventListener('gl-language-change', (e) => {
        this.currentLang = e.detail.language;
        this.render();
      });
    }
  }

  // Expose to global namespace
  window.GapLuckSpecsComparison = GapLuckSpecsComparison;
})();
