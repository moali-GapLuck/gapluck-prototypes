/**
 * GapLuck - Reusable Global Footer Component
 * Centralizes the markup, behavior, and state synchronization (translation) for the footer.
 * Combines the 3-column link grid from the landing page, the social links, and the app download badges.
 */

(function () {
  'use strict';

  // Combined translation dictionary is now centralized in window.GapLuckI18N

  // Premium Hybrid Footer HTML Structure (uses BEM .ag-footer prefix classes)
  const footerHTML = `
    <footer class="ag-footer" role="contentinfo">
      <div class="ag-container ag-footer__container">
        <div class="ag-footer__top-row">
          <!-- Column 1: Brand Info -->
          <div class="ag-footer__brand-col">
            <a href="../index.html" class="ag-footer__logo-group" aria-label="GapLuck Home">
              <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="6" y="18" width="22" height="8" rx="2" fill="var(--color-text-primary)"/>
                <rect x="36" y="38" width="22" height="8" rx="2" fill="var(--color-text-primary)"/>
                <path d="M26 22 L38 42" stroke="var(--color-positive)" stroke-width="5" stroke-linecap="round"/>
                <circle cx="32" cy="32" r="4.5" fill="var(--color-positive)"/>
              </svg>
              <span class="ag-footer__logo-text">Gap<span class="ag-footer__logo-text--highlight">Luck</span></span>
            </a>
            <p class="ag-footer__tagline" data-footer-i18n="footer_tagline"></p>
            <nav class="ag-footer__social-links" aria-label="Social media links">
              <a href="#" class="ag-footer__social-link" aria-label="GapLuck on X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" class="ag-footer__social-link" aria-label="GapLuck on LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" class="ag-footer__social-link" aria-label="GapLuck on Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" class="ag-footer__social-link" aria-label="GapLuck on Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="#" class="ag-footer__social-link" aria-label="GapLuck on TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.18 1.02 1.22 2.5 2.02 4.1 2.23v3.72c-1.6-.02-3.18-.5-4.51-1.39a8.62 8.62 0 0 1-1.18-.98v7.69c0 1.22-.22 2.45-.8 3.51-.76 1.4-2.07 2.5-3.6 2.93-1.63.47-3.41.34-4.94-.37A8.15 8.15 0 0 1 2.7 17.5a8.2 8.2 0 0 1-.77-4.9c.35-2.08 1.63-3.97 3.48-4.95a8.16 8.16 0 0 1 5.92-.37v3.83c-.88-.26-1.85-.2-2.67.24a4.34 4.34 0 0 0-2.22 3.19c-.19.98.05 2 .65 2.78.68.86 1.76 1.39 2.87 1.4 1.1-.03 2.16-.59 2.76-1.51.32-.51.48-1.11.48-1.72V0h-.38z"/>
                </svg>
              </a>
            </nav>
          </div>

          <!-- Column 2: Product Links -->
          <nav class="ag-footer__links-col" aria-label="Product links">
            <div class="ag-footer__links-heading" data-footer-i18n="footer_product_heading"></div>
            <ul class="ag-footer__links-list">
              <li><a href="comparison_V3.html" class="ag-footer__link" data-footer-i18n="footer_link_comparison"></a></li>
              <li><a href="#ag-pricing" class="ag-footer__link" data-footer-i18n="footer_link_pricing"></a></li>
              <li><a href="#ag-traveler-title" class="ag-footer__link" data-footer-i18n="footer_link_traveler"></a></li>
              <li><a href="#" class="ag-footer__link" data-footer-i18n="footer_link_landed"></a></li>
              <li><a href="#" class="ag-footer__link" data-footer-i18n="footer_link_alerts"></a></li>
              <li><a href="#" class="ag-footer__link" data-footer-i18n="footer_link_history"></a></li>
            </ul>
          </nav>

          <!-- Column 3: Company Links -->
          <nav class="ag-footer__links-col" aria-label="Company links">
            <div class="ag-footer__links-heading" data-footer-i18n="footer_company_heading"></div>
            <ul class="ag-footer__links-list">
              <li><a href="#" class="ag-footer__link" data-footer-i18n="footer_link_about"></a></li>
              <li><a href="#" class="ag-footer__link" data-footer-i18n="footer_link_methodology"></a></li>
              <li><a href="#" class="ag-footer__link" data-footer-i18n="footer_link_sources"></a></li>
              <li><a href="#" class="ag-footer__link" data-footer-i18n="footer_link_affiliate"></a></li>
              <li><a href="#" class="ag-footer__link" data-footer-i18n="footer_link_contact"></a></li>
              <li><a href="#" class="ag-footer__link" data-footer-i18n="footer_link_blog"></a></li>
            </ul>
          </nav>

          <!-- Column 4: Legal Links -->
          <nav class="ag-footer__links-col" aria-label="Legal links">
            <div class="ag-footer__links-heading" data-footer-i18n="footer_legal_heading"></div>
            <ul class="ag-footer__links-list">
              <li><a href="#" class="ag-footer__link" data-footer-i18n="footer_link_privacy"></a></li>
              <li><a href="#" class="ag-footer__link" data-footer-i18n="footer_link_terms"></a></li>
              <li><a href="#" class="ag-footer__link" data-footer-i18n="footer_link_cookie"></a></li>
              <li><a href="#" class="ag-footer__link" data-footer-i18n="footer_link_gdpr"></a></li>
            </ul>
          </nav>

          <!-- Column 5: App Downloads -->
          <div class="ag-footer__links-col" aria-label="App downloads">
            <div class="ag-footer__links-heading" data-footer-i18n="footer_apps_heading"></div>
            <div class="ag-footer__app-btn-list">
              <a class="ag-footer__app-btn" href="#" aria-label="Download on the App Store">
                <svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-1.01 2.96.99.08 2.15-.52 2.84-1.35" />
                </svg>
                <div class="ag-footer__app-btn-text-group">
                  <span class="ag-footer__app-btn-sub" data-footer-i18n="footer_app_download_sub"></span>
                  <span class="ag-footer__app-btn-main">App Store</span>
                </div>
              </a>
              <a class="ag-footer__app-btn" href="#" aria-label="Get it on Google Play">
                <svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.783 12 3.609 22.186A2.245 2.245 0 0 1 3 20.598V3.402c0-.663.243-1.249.609-1.588zm11.29 9.088L17.72 9.07 4.962 1.8c-.516-.293-1.038-.204-1.353.11l11.29 10.992zm3.328 1.636l2.945-1.678c.552-.315.552-.821 0-1.136l-2.945-1.678-2.949 2.246 2.949 2.246zm-3.328.538L3.609 22.09c.315.315.837.404 1.353.111l12.758-7.27-2.822-1.855z" />
                </svg>
                <div class="ag-footer__app-btn-text-group">
                  <span class="ag-footer__app-btn-sub" data-footer-i18n="footer_app_get_sub"></span>
                  <span class="ag-footer__app-btn-main">Google Play</span>
                </div>
              </a>
              <a class="ag-footer__app-btn" href="#" aria-label="Explore it on AppGallery">
                <svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24">
                  <path d="M19.5 4h-3V3A3 3 0 0 0 13.5 0h-3A3 3 0 0 0 7.5 3v1h-3A1.5 1.5 0 0 0 3 5.5v15A1.5 1.5 0 0 0 4.5 22h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 4zm-10.5-1A1.5 1.5 0 0 1 10.5 1.5h3A1.5 1.5 0 0 1 15 3v1H9.5zm7 11.5a1.5 1.5 0 0 1-1.5 1.5H9a1.5 1.5 0 0 1-1.5-1.5V11A1.5 1.5 0 0 1 9 9.5h6a1.5 1.5 0 0 1 1.5 1.5z" />
                </svg>
                <div class="ag-footer__app-btn-text-group">
                  <span class="ag-footer__app-btn-sub" data-footer-i18n="footer_app_explore_sub"></span>
                  <span class="ag-footer__app-btn-main">AppGallery</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <hr class="ag-footer__divider" />

        <div class="ag-footer__bottom-row">
          <p class="ag-footer__disclaimer" data-footer-i18n="footer_disclaimer"></p>
          <p class="ag-footer__copyright" data-footer-i18n="footer_copyright"></p>
        </div>
      </div>
    </footer>
  `;

  // Main injection controller
  function injectFooter() {
    // Prevent duplicate injection
    if (document.getElementById('ag-global-footer')) return;

    // Search for any existing footer element on the page (supports landing, comparison, etc.)
    const existingFooter = document.querySelector('footer');

    const wrapper = document.createElement('div');
    wrapper.innerHTML = footerHTML.trim();
    const footerElement = wrapper.firstChild;
    footerElement.id = 'ag-global-footer';

    if (existingFooter) {
      existingFooter.parentNode.replaceChild(footerElement, existingFooter);
    } else {
      document.body.appendChild(footerElement);
    }

    initLanguage();
  }

  // Language state management and translation injection
  function initLanguage() {
    const savedLang = localStorage.getItem('gl-lang') || localStorage.getItem('ag-lang') || 'en';

    function applyTranslations(lang) {
      const code = lang.toLowerCase();
      const dictionary = window.GapLuckI18N ? (window.GapLuckI18N[code] || window.GapLuckI18N.en) : null;
      if (!dictionary) return;

      // Select all elements in our component that require translation
      const container = document.getElementById('ag-global-footer');
      if (!container) return;

      const elements = container.querySelectorAll('[data-footer-i18n]');
      elements.forEach(el => {
        const key = el.getAttribute('data-footer-i18n');
        if (dictionary[key] !== undefined) {
          el.textContent = dictionary[key];
        }
      });
    }

    // Apply translations on initial load
    applyTranslations(savedLang);

    // Listen to global language change event dispatched by the navbar
    window.addEventListener('gl-language-change', function (e) {
      applyTranslations(e.detail.language);
    });
  }

  // Inject immediately or when DOM is ready
  if (document.body) {
    injectFooter();
  } else {
    document.addEventListener('DOMContentLoaded', injectFooter);
  }

})();
