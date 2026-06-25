/**
 * GapLuck - Savings Banner Component JS
 * Programmatic controller for displaying dynamic price differences between regions.
 * Features trilingual templates, error flag fallbacks, a "Go to deal" button with smooth scroll highlighting, and fade transitions.
 */

(function () {
  'use strict';

  // Trilingual dictionary with i18n template strings
  const translations = {
    en: {
      cheapest_local: 'Congratulations! You have the cheapest deal <span class="ag-savings-banner__amount">in your region</span>',
      savings_text: '{cheapestRegionName} · Save <span class="ag-savings-banner__amount">{savingsAmount} ({percentage}%)</span> vs {homeRegionName}',
      go_to_deal: 'Go to deal'
    },
    tr: {
      cheapest_local: 'Tebrikler! En ucuz fiyata <span class="ag-savings-banner__amount">kendi bölgenizde</span> sahipsiniz',
      savings_text: '{cheapestRegionName} · {homeRegionName} ile karşılaştırıldığında <span class="ag-savings-banner__amount">{savingsAmount} ({percentage}%)</span> tasarruf edin',
      go_to_deal: 'Fırsata Git'
    },
    ar: {
      cheapest_local: 'تهانينا! لديك أرخص سعر <span class="ag-savings-banner__amount">في منطقتك</span>',
      savings_text: '{cheapestRegionName} · وفر <span class="ag-savings-banner__amount">{savingsAmount} ({percentage}%)</span> مقارنة بـ {homeRegionName}',
      go_to_deal: 'اذهب إلى العرض'
    }
  };

  // Helper to extract active language
  function getLanguage() {
    return document.documentElement.getAttribute('lang') || 'en';
  }

  const GapLuckSavingsBanner = {
    isCheapestLocalState: false,

    // Inject structural markup if not already present
    init: function (containerSelector) {
      const container = typeof containerSelector === 'string'
        ? document.querySelector(containerSelector)
        : containerSelector;
      if (!container) return;

      if (!container.querySelector('.ag-savings-banner')) {
        container.innerHTML = `
          <div class="ag-savings-banner ag-savings-banner--savings" id="ag-savings-banner" role="region" aria-label="Price savings summary">
            <img class="ag-savings-banner__flag" id="savings-flag" src="" alt="" style="display: none;" />
            <span class="ag-savings-banner__text" id="savings-message"></span>
            <button class="ag-btn ag-savings-banner__btn" id="savings-btn" type="button"></button>
          </div>
        `;

        // Bind onerror fallback to flag element to hide it on failure
        const flagEl = container.querySelector('#savings-flag');
        if (flagEl) {
          flagEl.addEventListener('error', () => {
            flagEl.style.display = 'none';
          });
        }

        // Bind smooth scrolling click action to the "Go to deal" button
        const btnEl = container.querySelector('#savings-btn');
        if (btnEl) {
          btnEl.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            let targetEl;
            if (this.isCheapestLocalState) {
              // Scroll to the cheapest local retailer row
              targetEl = document.querySelector('#local-retailer-list .ag-retailers-row');
            } else {
              // Find the cheapest country card in the worldwide list
              const firstCountryCard = document.querySelector('#ag-worldwide-deals .ag-price-card');
              if (firstCountryCard) {
                targetEl = firstCountryCard.querySelector('.ag-retailers-row') || firstCountryCard;
              }
            }

            // Fallback if target element is not found
            if (!targetEl) {
              targetEl = document.querySelector('.ag-retailers-row--winner, #ag-worldwide-deals .ag-price-card, #local-retailer-list .ag-retailers-row');
            }

            if (targetEl) {
              // Smooth scroll to element and center it in the viewport
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

              // Add flash highlight micro-interaction to guide the user's focus
              targetEl.classList.add('ag-row-flash');
              setTimeout(() => {
                targetEl.classList.remove('ag-row-flash');
              }, 1500);
            }
          });
        }
      }
    },

    // Updates content, flags, and values dynamically with a smooth fade transition
    update: function (containerSelector, options) {
      this.init(containerSelector);
      const container = typeof containerSelector === 'string'
        ? document.querySelector(containerSelector)
        : containerSelector;
      if (!container) return;

      const bannerEl = container.querySelector('.ag-savings-banner');
      const flagEl = container.querySelector('#savings-flag');
      const messageEl = container.querySelector('#savings-message');
      const btnEl = container.querySelector('#savings-btn');

      if (!bannerEl || !messageEl || !btnEl) return;

      const {
        savingsAmount,
        percentage,
        isCheapestLocal,
        cheapestRegionName,
        homeRegionName,
        flagPath,
        flagAlt,
        lang: optionLang
      } = options;

      // Sync state for scrolling target
      this.isCheapestLocalState = isCheapestLocal;

      const activeLang = optionLang || getLanguage();
      const t = translations[activeLang] || translations.en;

      // Trigger micro-animation: fade out
      bannerEl.style.opacity = '0';
      bannerEl.style.transform = 'translateY(-4px)';

      setTimeout(() => {
        // Handle flag display
        if (flagEl) {
          if (flagPath && !isCheapestLocal) {
            flagEl.src = flagPath;
            flagEl.alt = flagAlt || cheapestRegionName || '';
            flagEl.style.display = 'inline-block';
          } else {
            flagEl.style.display = 'none';
          }
        }

        // Handle message rendering from templates
        if (isCheapestLocal) {
          messageEl.innerHTML = t.cheapest_local;
        } else {
          let template = t.savings_text;
          template = template.replace('{cheapestRegionName}', cheapestRegionName || '')
                             .replace('{savingsAmount}', savingsAmount || '')
                             .replace('{percentage}', percentage || '')
                             .replace('{homeRegionName}', homeRegionName || '');
          messageEl.innerHTML = template;
        }

        // Handle CTA button text
        btnEl.textContent = t.go_to_deal;

        // Trigger micro-animation: fade in
        requestAnimationFrame(() => {
          bannerEl.style.opacity = '1';
          bannerEl.style.transform = 'translateY(0)';
        });
      }, 150);
    }
  };

  // Expose component globally
  window.GapLuckSavingsBanner = GapLuckSavingsBanner;

})();
