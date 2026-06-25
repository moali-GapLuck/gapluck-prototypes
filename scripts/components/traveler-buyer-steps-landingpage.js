/**
 * GapLuck - Traveler & Buyer Steps Component JS
 * Standardizes the 3-step description blocks for Travelers and Buyers.
 * Strictly avoids em-dash character, BEM compliant, and trilingual support.
 */

(function () {
  'use strict';

  const translations = {
    en: {
      travelers: 'TRAVELERS',
      buyers: 'BUYERS',
      cta_traveler: 'Become a Traveler',
      cta_buyer: 'Sign Up to Save',
      t1_t: 'List Your Trip',
      t1_d: 'Add your upcoming flight dates, departure/arrival airports, and baggage space capacity limits.',
      t2_t: 'Accept Match Requests',
      t2_d: 'Review list requests from buyers flying your exact route. Verify product values and secure the escrow.',
      t3_t: 'Deliver and Earn Cash',
      t3_d: 'Meet the buyer at destination, hand over the inspection box, verify the code, and claim payouts.',
      
      b1_t: 'Search Global Deals',
      b1_d: 'Look up product prices across global markets and calculate real landed courier costs.',
      b2_t: 'Match with Travelers',
      b2_d: 'Connect with verified fliers who already carry local baggage along your transit route coordinates.',
      b3_t: 'Pay via Secure Escrow',
      b3_d: 'Deposit funds to safe escrow, verify packaging physically in-person, and enter pin to release payment.'
    },
    tr: {
      travelers: 'GEZGİNLER',
      buyers: 'ALICILAR',
      cta_traveler: 'Gezgin Ol',
      cta_buyer: 'Kaydol ve Tasarruf Et',
      t1_t: 'Seyahatinizi Listeleyin',
      t1_d: 'Yaklaşan uçuş tarihlerinizi, kalkış/varış havalimanlarını ve bagaj alanı kapasite sınırlarınızı ekleyin.',
      t2_t: 'Eşleşme İsteklerini Kabul Edin',
      t2_d: 'Tam rotanızda uçan alıcılardan gelen talepleri inceleyin. Ürün değerlerini doğrulayın ve emaneti güvenceye alın.',
      t3_t: 'Teslim Edin ve Kazanın',
      t3_d: 'Varış noktasında alıcıyla buluşun, inceleme kutusunu teslim edin, kodu doğrulayın ve ödemenizi alın.',
      
      b1_t: 'Küresel Fırsatları Arayın',
      b1_d: 'Küresel pazarlardaki ürün fiyatlarını arayın ve gerçek kurye gönderim maliyetlerini hesaplayın.',
      b2_t: 'Seyahatseverlerle Eşleşin',
      b2_d: 'Transit rota koordinatlarınız boyunca yerel bagaj taşıyan doğrulanmış yolcularla bağlantı kurun.',
      b3_t: 'Güvenli Havuzla Ödeyin',
      b3_d: 'Parayı güvenli havuz hesabına yatırın, ambalajı fiziksel olarak kontrol edin ve ödemeyi aktarmak için pini girin.'
    },
    ar: {
      travelers: 'المسافرون',
      buyers: 'المشترون',
      cta_traveler: 'كن مسافراً',
      cta_buyer: 'سجل للتوفير',
      t1_t: 'أضف تفاصيل رحلتك',
      t1_d: 'أدخل تواريخ رحلاتك القادمة، ومطارات المغادرة والوصول، وحدود سعة الأمتعة المتاحة لديك.',
      t2_t: 'قبول طلبات التطابق',
      t2_d: 'راجع طلبات المشترين على نفس مسار رحلتك بالضبط. تحقق من قيم المنتجات وأمّن الضمان.',
      t3_t: 'التوصيل واستلام الأرباح',
      t3_d: 'قابل المشتري في وجهة الوصول، وسلّم صندوق الفحص، وتحقق من الرمز، واستلم أرباحك.',
      
      b1_t: 'ابحث عن صفقات عالمية',
      b1_d: 'ابحث عن أسعار المنتجات في الأسواق العالمية واحسب التكاليف الحقيقية لشحن الكوريير.',
      b2_t: 'تطابق مع المسافرين',
      b2_d: 'تواصل مع المسافرين الموثقين الذين يحملون أمتعة محلية على طول مسار عبورك الملاحي.',
      b3_t: 'الدفع عبر الضمان الآمن',
      b3_d: 'أودع الأموال في الضمان الآمن، وافحص العبوة شخصيا، وأدخل الرمز السري لتحرير الدفع للمسافر.'
    }
  };

  function getLanguage() {
    return document.documentElement.getAttribute('lang') || 'en';
  }

  const GapLuckHowItWorks = {
    createMarkup: function () {
      const lang = getLanguage();
      const t = translations[lang] || translations.en;

      // Inline SVGs for Traveler and Buyer steps
      const icons = {
        plane: `<svg class="ag-traveler-flow__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.9-.2-1.8.3-2 1.2-.2.9.3 1.8 1.2 2l8.2 1.8-3.5 3.5L5 14.8c-.5-.1-1.1.1-1.4.6-.4.5-.4 1.2 0 1.6l2 2c.4.4 1.1.4 1.6 0l.6-4.2 3.5-3.5 1.8 8.2c.2.9 1.1 1.4 2 1.2.9-.2 1.4-1.1 1.2-2z"/></svg>`,
        match: `<svg class="ag-traveler-flow__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
        cash: `<svg class="ag-traveler-flow__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`,
        search: `<svg class="ag-traveler-flow__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.34-4.34"/></svg>`,
        compass: `<svg class="ag-traveler-flow__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
        lock: `<svg class="ag-traveler-flow__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11 2 2 4-4"/></svg>`
      };

      return `
        <div class="ag-traveler-flows">
          <!-- Traveler Steps -->
          <div class="ag-traveler-flow ag-traveler-flow--traveler">
            <div class="ag-traveler-flow__title ag-traveler-flow__title--traveler">
              ${t.travelers}
            </div>
            <ol class="ag-traveler-flow__steps ag-traveler-flow__steps--traveler">
              <li class="ag-traveler-flow__step">
                <div class="ag-traveler-flow__step-header">
                  <div class="ag-traveler-flow__icon-wrap" aria-hidden="true">
                    ${icons.plane}
                  </div>
                  <h4 class="ag-traveler-flow__step-title">${t.t1_t}</h4>
                  <span class="ag-traveler-flow__step-number" aria-hidden="true"></span>
                </div>
                <p class="ag-traveler-flow__step-desc">${t.t1_d}</p>
              </li>
              <li class="ag-traveler-flow__step">
                <div class="ag-traveler-flow__step-header">
                  <div class="ag-traveler-flow__icon-wrap" aria-hidden="true">
                    ${icons.match}
                  </div>
                  <h4 class="ag-traveler-flow__step-title">${t.t2_t}</h4>
                  <span class="ag-traveler-flow__step-number" aria-hidden="true"></span>
                </div>
                <p class="ag-traveler-flow__step-desc">${t.t2_d}</p>
              </li>
              <li class="ag-traveler-flow__step">
                <div class="ag-traveler-flow__step-header">
                  <div class="ag-traveler-flow__icon-wrap" aria-hidden="true">
                    ${icons.cash}
                  </div>
                  <h4 class="ag-traveler-flow__step-title">${t.t3_t}</h4>
                  <span class="ag-traveler-flow__step-number" aria-hidden="true"></span>
                </div>
                <p class="ag-traveler-flow__step-desc">${t.t3_d}</p>
              </li>
            </ol>
            <button class="ag-btn ag-btn--primary ag-traveler-flow__cta ag-traveler-flow__cta--traveler">${t.cta_traveler}</button>
          </div>

          <!-- Buyer Steps -->
          <div class="ag-traveler-flow ag-traveler-flow--buyer">
            <div class="ag-traveler-flow__title ag-traveler-flow__title--buyer">
              ${t.buyers}
            </div>
            <ol class="ag-traveler-flow__steps ag-traveler-flow__steps--buyer">
              <li class="ag-traveler-flow__step">
                <div class="ag-traveler-flow__step-header">
                  <div class="ag-traveler-flow__icon-wrap" aria-hidden="true">
                    ${icons.search}
                  </div>
                  <h4 class="ag-traveler-flow__step-title">${t.b1_t}</h4>
                  <span class="ag-traveler-flow__step-number" aria-hidden="true"></span>
                </div>
                <p class="ag-traveler-flow__step-desc">${t.b1_d}</p>
              </li>
              <li class="ag-traveler-flow__step">
                <div class="ag-traveler-flow__step-header">
                  <div class="ag-traveler-flow__icon-wrap" aria-hidden="true">
                    ${icons.compass}
                  </div>
                  <h4 class="ag-traveler-flow__step-title">${t.b2_t}</h4>
                  <span class="ag-traveler-flow__step-number" aria-hidden="true"></span>
                </div>
                <p class="ag-traveler-flow__step-desc">${t.b2_d}</p>
              </li>
              <li class="ag-traveler-flow__step">
                <div class="ag-traveler-flow__step-header">
                  <div class="ag-traveler-flow__icon-wrap" aria-hidden="true">
                    ${icons.lock}
                  </div>
                  <h4 class="ag-traveler-flow__step-title">${t.b3_t}</h4>
                  <span class="ag-traveler-flow__step-number" aria-hidden="true"></span>
                </div>
                <p class="ag-traveler-flow__step-desc">${t.b3_d}</p>
              </li>
            </ol>
            <button class="ag-btn ag-btn--primary ag-traveler-flow__cta ag-traveler-flow__cta--buyer">${t.cta_buyer}</button>
          </div>
        </div>
      `;
    },

    render: function (container) {
      if (!container) return;
      container.innerHTML = this.createMarkup().trim();

      // Programmatically bind events to CTAs
      const travelerCta = container.querySelector('.ag-traveler-flow__cta--traveler');
      const buyerCta = container.querySelector('.ag-traveler-flow__cta--buyer');

      if (travelerCta) {
        travelerCta.addEventListener('click', (e) => {
          e.preventDefault();
          // Option B: Smooth scroll to pricing section and highlight Traveler card
          const pricingSection = document.getElementById('ag-pricing');
          const travelerCard = document.getElementById('ag-pricing-traveler');
          
          if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
            
            if (travelerCard) {
              // Highlight the traveler card after a short delay
              setTimeout(() => {
                travelerCard.classList.add('ag-pricing-card--highlighted');
                // Remove highlight after 2.5 seconds
                setTimeout(() => {
                  travelerCard.classList.remove('ag-pricing-card--highlighted');
                }, 2500);
              }, 800);
            }
          } else {
            // Fallback if not on landing/pricing page
            if (window.GapLuckToast && typeof window.GapLuckToast.show === 'function') {
              window.GapLuckToast.show('Become a Traveler flow initiated');
            }
          }
        });
      }

      if (buyerCta) {
        buyerCta.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.GapLuckSigninModal && typeof window.GapLuckSigninModal.open === 'function') {
            window.GapLuckSigninModal.open();
          } else {
            if (window.GapLuckToast && typeof window.GapLuckToast.show === 'function') {
              window.GapLuckToast.show('Opening sign-in modal');
            }
          }
        });
      }
    },

    init: function () {
      const container = document.querySelector('[data-how-it-works-container]');
      if (container) {
        this.render(container);
      }
    }
  };

  window.GapLuckHowItWorks = GapLuckHowItWorks;

  if (document.body) {
    GapLuckHowItWorks.init();
  } else {
    document.addEventListener('DOMContentLoaded', () => GapLuckHowItWorks.init());
  }

  window.addEventListener('gl-language-change', () => {
    GapLuckHowItWorks.init();
  });

})();
