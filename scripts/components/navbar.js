/**
 * GapLuck - Reusable Navigation Header Component
 * Centralizes the markup, behavior, and state synchronization (theme, language, currency) for the navigation bar.
 */

(function () {
  'use strict';

  // Navigation Header HTML structure (based on premium landing page design)
  const navbarHTML = `
    <header class="ag-navbar" id="ag-navbar">
      <!-- Logo: left-anchored -->
      <a href="../index.html" class="ag-navbar__logo-container" aria-label="GapLuck Home">
        <svg class="ag-navbar__logo" width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="18" width="22" height="8" rx="2" fill="var(--color-text-primary)"/>
          <rect x="36" y="38" width="22" height="8" rx="2" fill="var(--color-text-primary)"/>
          <path d="M26 22 L38 42" stroke="var(--color-positive)" stroke-width="5" stroke-linecap="round"/>
          <circle cx="32" cy="32" r="4.5" fill="var(--color-positive)"/>
        </svg>
        <span class="ag-navbar__logo-text">Gap<span class="ag-navbar__logo-text--highlight">Luck</span></span>
      </a>

      <!-- Premium Pill Search Bar (centered on desktop) -->
      <div class="ag-navbar__search-wrapper" aria-hidden="false" id="ag-navbar-search-wrapper">
        <form role="search" id="ag-navbar-search-form" style="position:relative; width:100%;">
          <span class="ag-navbar__search-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.34-4.34"></path>
            </svg>
          </span>
          <input type="search" placeholder="Search any product..." class="ag-navbar__search-input" id="ag-navbar-search" aria-label="Search products" />
          <button type="submit" class="ag-navbar__search-btn-inline" id="ag-navbar-search-btn">Search</button>
        </form>
      </div>

      <!-- Desktop actions: theme icon · EN · TRY · Sign in -->
      <div class="ag-navbar__actions">
        <button class="ag-navbar__toggle-btn" id="theme-toggle" aria-label="Toggle dark mode">
          <svg class="ag-theme-icon-sun" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg class="ag-theme-icon-moon" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
        <select class="ag-navbar__select" aria-label="Language" id="lang-selector">
          <option value="en">EN</option>
          <option value="tr">TR</option>
          <option value="ar">AR</option>
        </select>
        <select class="ag-navbar__select" aria-label="Change currency" id="currency-selector">
          <option value="TRY">TRY</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="AED">AED</option>
          <option value="GBP">GBP</option>
          <option value="SAR">SAR</option>
          <option value="EGP">EGP</option>
          <option value="SGD">SGD</option>
          <option value="KRW">KRW</option>
          <option value="HKD">HKD</option>
          <option value="CNY">CNY</option>
          <option value="JPY">JPY</option>
        </select>
        <button class="ag-navbar__btn-signin" data-i18n="sign_in">Sign in</button>
      </div>

      <!-- Mobile actions: theme icon · EN · TRY · Sign in -->
      <div class="ag-navbar__mobile-actions">
        <button class="ag-navbar__toggle-btn" id="theme-toggle-mobile" aria-label="Toggle dark mode">
          <svg class="ag-theme-icon-sun" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg class="ag-theme-icon-moon" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
        <select class="ag-navbar__select" aria-label="Language" id="lang-selector-mobile">
          <option value="en">EN</option>
          <option value="tr">TR</option>
          <option value="ar">AR</option>
        </select>
        <select class="ag-navbar__select" aria-label="Change currency" id="currency-selector-mobile">
          <option value="TRY">TRY</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="AED">AED</option>
          <option value="GBP">GBP</option>
          <option value="SAR">SAR</option>
          <option value="EGP">EGP</option>
          <option value="SGD">SGD</option>
          <option value="KRW">KRW</option>
          <option value="HKD">HKD</option>
          <option value="CNY">CNY</option>
          <option value="JPY">JPY</option>
        </select>
        <button class="ag-navbar__btn-signin" data-i18n="sign_in">Sign in</button>
      </div>
    </header>
  `;

  // Dynamic Injection
  function injectNavbar() {
    if (document.getElementById('ag-navbar')) return; // prevent duplicate

    const wrapper = document.createElement('div');
    wrapper.innerHTML = navbarHTML.trim();
    const navbarElement = wrapper.firstChild;

    // Detect if this is the landing page by checking for the hero search form
    const isLandingPage = !!document.getElementById('ag-hero-search-form');
    if (isLandingPage) {
      navbarElement.classList.add('ag-navbar--landing');
      
      // Accessibility settings for landing mode collapsed state
      const searchWrapper = navbarElement.querySelector('#ag-navbar-search-wrapper');
      const searchInput = navbarElement.querySelector('#ag-navbar-search');
      const searchBtn = navbarElement.querySelector('#ag-navbar-search-btn');
      
      if (searchWrapper) searchWrapper.setAttribute('aria-hidden', 'true');
      if (searchInput) searchInput.setAttribute('tabindex', '-1');
      if (searchBtn) searchBtn.setAttribute('tabindex', '-1');
    }

    // Insert at the very top of the body
    document.body.insertBefore(navbarElement, document.body.firstChild);

    initTheme();
    initLanguage();
    initCurrency();
    
    if (isLandingPage) {
      setupScrollObserver(navbarElement);
    }
    
    setupSearchSync(isLandingPage);

    if (window.GapSearchAutocomplete && typeof window.GapSearchAutocomplete.refresh === 'function') {
      window.GapSearchAutocomplete.refresh();
    }
  }

  // --- 1. Theme Controller ---
  function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    function handleToggle() {
      if (window.GapLuckTheme) {
        window.GapLuckTheme.toggleTheme();
      }
    }

    if (themeToggle) themeToggle.addEventListener('click', handleToggle);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', handleToggle);
  }

  // --- 2. Language & Translation Controller ---
  function initLanguage() {
    const savedLang = localStorage.getItem('gl-lang') || localStorage.getItem('ag-lang') || 'en';
    const langDesktop = document.getElementById('lang-selector');
    const langMobile = document.getElementById('lang-selector-mobile');

    function applyLanguage(lang) {
      const code = lang.toLowerCase();
      document.documentElement.setAttribute('lang', code);
      document.documentElement.setAttribute('dir', code === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.style.setProperty('--rtl-flip', code === 'ar' ? '-1' : '1');

      if (langDesktop) langDesktop.value = lang;
      if (langMobile) langMobile.value = lang;

      localStorage.setItem('gl-lang', lang);
      localStorage.setItem('ag-lang', lang);

      // Dispatch a custom event so the page scripts can update their translations
      window.dispatchEvent(new CustomEvent('gl-language-change', { detail: { language: lang } }));
    }

    applyLanguage(savedLang);

    if (langDesktop) {
      langDesktop.addEventListener('change', (e) => applyLanguage(e.target.value));
    }
    if (langMobile) {
      langMobile.addEventListener('change', (e) => applyLanguage(e.target.value));
    }
  }

  // --- 3. Currency Controller ---
  function initCurrency() {
    const savedCurrency = localStorage.getItem('gl-currency') || localStorage.getItem('ag-currency') || 'TRY';
    const currDesktop = document.getElementById('currency-selector');
    const currMobile = document.getElementById('currency-selector-mobile');

    function applyCurrency(curr) {
      const code = curr.toUpperCase();
      if (currDesktop) currDesktop.value = code;
      if (currMobile) currMobile.value = code;

      localStorage.setItem('gl-currency', code);
      localStorage.setItem('ag-currency', code);

      // Dispatch custom event so the page scripts can recalculate prices
      window.dispatchEvent(new CustomEvent('gl-currency-change', { detail: { currency: code } }));
    }

    applyCurrency(savedCurrency);

    const onCurrencyChange = (e) => {
      applyCurrency(e.target.value);
    };

    if (currDesktop) currDesktop.addEventListener('change', onCurrencyChange);
    if (currMobile) currMobile.addEventListener('change', onCurrencyChange);
  }

  // --- 4. Scroll Observer (Landing Page Only) ---
  function setupScrollObserver(navbarElement) {
    const heroSearchEl = document.getElementById('ag-hero-search-form');
    const searchWrapper = document.getElementById('ag-navbar-search-wrapper');
    const navIn = document.getElementById('ag-navbar-search');
    const navBtn = document.getElementById('ag-navbar-search-btn');

    if (!heroSearchEl || typeof IntersectionObserver === 'undefined') return;

    const searchObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          const searchVisible = !entry.isIntersecting;
          
          if (searchVisible) {
            navbarElement.classList.add('ag-navbar--search-visible');
            if (searchWrapper) searchWrapper.removeAttribute('aria-hidden');
            if (navIn) navIn.removeAttribute('tabindex');
            if (navBtn) navBtn.removeAttribute('tabindex');
          } else {
            navbarElement.classList.remove('ag-navbar--search-visible');
            if (searchWrapper) searchWrapper.setAttribute('aria-hidden', 'true');
            if (navIn) navIn.setAttribute('tabindex', '-1');
            if (navBtn) navBtn.setAttribute('tabindex', '-1');
          }
        });
      },
      {
        rootMargin: '-' + (navbarElement.offsetHeight || 72) + 'px 0px 0px 0px',
        threshold: 0
      }
    );

    searchObserver.observe(heroSearchEl);
  }

  // --- 5. Search Typing & Action Synchronizer ---
  function setupSearchSync(isLandingPage) {
    const navIn = document.getElementById('ag-navbar-search');
    const navForm = document.getElementById('ag-navbar-search-form');

    if (isLandingPage) {
      const heroInput = document.getElementById('ag-hero-search-input');
      
      // Sync typing: hero search <-> navbar search
      if (heroInput && navIn) {
        heroInput.addEventListener('input', () => { navIn.value = heroInput.value; });
        navIn.addEventListener('input', () => { heroInput.value = navIn.value; });
      }
    }

    // Submit handler for navbar search button
    if (navForm) {
      navForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = (navIn ? navIn.value : '').trim();
        if (query.length > 0) {
          // Dispatch custom event so the page can handle search results display
          window.dispatchEvent(new CustomEvent('gl-search-submit', { detail: { query: query } }));
        }
      });
    }
  }

  // Inject immediately or on load
  if (document.body) {
    injectNavbar();
  } else {
    document.addEventListener('DOMContentLoaded', injectNavbar);
  }

})();
