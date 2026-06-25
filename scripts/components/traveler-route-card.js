/**
 * GapLuck - Traveler Route Cards Component JS
 * Handles dynamic rendering and interactive behaviors for traveler marketplace cards.
 * Strictly avoids em-dash character, uses BEM, logical property rules, and trilingual labels.
 */

(function () {
  'use strict';

  // Trilingual dictionary for component interface
  const translations = {
    en: {
      verified: 'Verified',
      reviews: 'reviews',
      departure: 'Departure',
      weight_capacity: 'Capacity',
      max_item_value: 'Max Value',
      escrow_protected: 'Escrow Protected',
      request_delivery: 'Request Delivery',
      request_sent: 'Delivery request sent to {name}!'
    },
    tr: {
      verified: 'Onaylı',
      reviews: 'değerlendirme',
      departure: 'Kalkış',
      weight_capacity: 'Kapasite',
      max_item_value: 'Maks. Değer',
      escrow_protected: 'Güvenli Ödeme',
      request_delivery: 'Teslimat İste',
      request_sent: '{name} adlı seyahatsevere teslimat isteği gönderildi!'
    },
    ar: {
      verified: 'تم التحقق',
      reviews: 'تقييمات',
      departure: 'المغادرة',
      weight_capacity: 'الحمولة',
      max_item_value: 'أقصى قيمة',
      escrow_protected: 'دفع آمن',
      request_delivery: 'طلب توصيل',
      request_sent: 'تم إرسال طلب التوصيل إلى {name}!'
    }
  };

  // Helper to extract language
  function getLanguage() {
    return document.documentElement.getAttribute('lang') || 'en';
  }

  const GapLuckTravelerCard = {
    /**
     * Generate HTML markup for a single traveler route card
     * @param {Object} data - Traveler route details
     * @returns {string} HTML string
     */
    createMarkup: function (data) {
      const lang = getLanguage();
      const t = translations[lang] || translations.en;
      
      const initials = data.name ? data.name.charAt(0) : 'T';
      const isVerified = data.verified !== false;
      const originCode = data.origin.code.toLowerCase();
      const destCode = data.destination.code.toLowerCase();

      // Mapped flags asset relative path (compatible with subfolder files)
      const isPagesFolder = window.location.pathname.includes('/pages/');
      const flagPrefix = isPagesFolder ? '../assets/flags/' : 'assets/flags/';

      const verifiedBadge = isVerified ? `
        <span class="ag-traveler-card__badge">
          <svg class="ag-traveler-card__badge-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          ${t.verified}
        </span>
      ` : '';

      return `
        <div class="ag-traveler-card" data-traveler-name="${data.name}">
          <div class="ag-traveler-card__header">
            <div class="ag-traveler-card__avatar-container">
              <div class="ag-traveler-card__avatar">${initials}</div>
              <div class="ag-traveler-card__user-info">
                <span class="ag-traveler-card__name">${data.name}</span>
                ${verifiedBadge}
              </div>
            </div>
            <span class="ag-traveler-card__rating">★ ${data.rating} (${data.reviewsCount} ${t.reviews})</span>
          </div>
          
          <div class="ag-traveler-card__route">
            <div class="ag-traveler-card__route-point">
              <img src="${flagPrefix}${originCode}.svg" alt="${data.origin.name}" class="ag-traveler-card__flag" />
              <span class="ag-traveler-card__country">${data.origin.name}</span>
            </div>
            <span class="ag-traveler-card__route-arrow">➔</span>
            <div class="ag-traveler-card__route-point">
              <img src="${flagPrefix}${destCode}.svg" alt="${data.destination.name}" class="ag-traveler-card__flag" />
              <span class="ag-traveler-card__country">${data.destination.name}</span>
            </div>
          </div>
          
          <div class="ag-traveler-card__details">
            <div class="ag-traveler-card__detail-item">
              <span class="ag-traveler-card__detail-label">${t.departure}</span>
              <span class="ag-traveler-card__detail-value">${data.departureDate}</span>
            </div>
            <div class="ag-traveler-card__detail-item">
              <span class="ag-traveler-card__detail-label">${t.weight_capacity}</span>
              <span class="ag-traveler-card__detail-value">${data.weightCapacity}</span>
            </div>
            <div class="ag-traveler-card__detail-item">
              <span class="ag-traveler-card__detail-label">${t.max_item_value}</span>
              <span class="ag-traveler-card__detail-value">${data.maxItemValue}</span>
            </div>
          </div>
          
          <div class="ag-traveler-card__escrow">
            <span>${t.escrow_protected}</span>
          </div>

          <button class="ag-btn ag-btn--primary ag-traveler-card__cta">${t.request_delivery}</button>
        </div>
      `;
    },

    /**
     * Render a single traveler card in a target container
     * @param {HTMLElement} container - DOM node container
     * @param {Object} data - Traveler route details
     */
    render: function (container, data) {
      if (!container) return;
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = this.createMarkup(data).trim();
      const cardElement = tempDiv.firstChild;
      
      // Wire up CTA event listener
      const ctaBtn = cardElement.querySelector('.ag-traveler-card__cta');
      if (ctaBtn) {
        ctaBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const lang = getLanguage();
          const t = translations[lang] || translations.en;
          const message = t.request_sent.replace('{name}', data.name);
          
          if (window.GapLuckToast && typeof window.GapLuckToast.show === 'function') {
            window.GapLuckToast.show(message);
          } else {
            alert(message);
          }
        });
      }

      container.appendChild(cardElement);
    },

    /**
     * Render multiple cards in a container and wire up actions
     * @param {string|HTMLElement} containerSelector - Selector or element
     * @param {Array} routes - List of routes
     */
    init: function (containerSelector, routes) {
      const container = typeof containerSelector === 'string' 
        ? document.querySelector(containerSelector) 
        : containerSelector;

      if (!container) return;
      container.innerHTML = ''; // clear initial mock items if needed

      routes.forEach(route => {
        this.render(container, route);
      });
    }
  };

  // Expose component globally
  window.GapLuckTravelerCard = GapLuckTravelerCard;

})();
