/**
 * GapLuck - Social Sign-In Buttons Component JS
 * Programmatic controller for rendering and handling Google, Apple, and Facebook mock logins.
 * Strictly avoids em-dashes, follows BEM styling, logical properties, and matches sign-in modal actions.
 */

(function () {
  'use strict';

  // Trilingual dictionary for button labels and toast notifications
  const translations = {
    en: {
      continue_google: 'Continue with Google',
      continue_apple: 'Continue with Apple',
      continue_facebook: 'Continue with Facebook',
      google_label: 'Sign in with Google',
      apple_label: 'Sign in with Apple',
      facebook_label: 'Sign in with Facebook',
      welcome_social: 'Login successful via {provider}! Welcome to GapLuck.'
    },
    tr: {
      continue_google: 'Google ile devam et',
      continue_apple: 'Apple ile devam et',
      continue_facebook: 'Facebook ile devam et',
      google_label: 'Google ile giriş yap',
      apple_label: 'Apple ile giriş yap',
      facebook_label: 'Facebook ile giriş yap',
      welcome_social: '{provider} ile giriş başarılı! GapLuck\'a hoş geldiniz.'
    },
    ar: {
      continue_google: 'متابعة باستخدام جوجل',
      continue_apple: 'متابعة باستخدام أبل',
      continue_facebook: 'متابعة باستخدام فيسبوك',
      google_label: 'تسجيل الدخول باستخدام جوجل',
      apple_label: 'تسجيل الدخول باستخدام أبل',
      facebook_label: 'تسجيل الدخول باستخدام فيسبوك',
      welcome_social: 'تم تسجيل الدخول بنجاح عبر {provider}! مرحبًا بك في GapLuck.'
    }
  };

  // Helper to extract active language
  function getLanguage() {
    return document.documentElement.getAttribute('lang') || 'en';
  }

  const GapLuckSocialAuth = {
    /**
     * Generate HTML markup for social buttons group
     * @param {Object} options - Customization options
     * @param {string} options.layout - 'row' or 'column'
     * @param {boolean} options.showText - Whether to show the text labels or only icons
     * @param {boolean} options.responsive - Whether to collapse rows to columns on mobile
     * @returns {string} HTML string
     */
    createMarkup: function (options = {}) {
      const layout = options.layout || 'row';
      const showText = options.showText !== false;
      const responsive = options.responsive !== false;
      
      const lang = getLanguage();
      const t = translations[lang] || translations.en;

      // Determine assets prefix based on routing folder location
      const isPagesFolder = window.location.pathname.includes('/pages/');
      const assetPrefix = isPagesFolder ? '../assets/' : 'assets/';

      let containerClass = 'ag-social-auth';
      if (layout === 'column') {
        containerClass += ' ag-social-auth--column';
      } else {
        containerClass += ' ag-social-auth--row';
        if (responsive) {
          containerClass += ' ag-social-auth--responsive-row';
        }
      }

      // Define buttons configuration
      const providers = [
        {
          id: 'Google',
          ariaLabel: t.google_label,
          text: t.continue_google,
          iconMarkup: `<img class="ag-social-auth__icon" src="${assetPrefix}google_logo.svg" alt="Google logo" />`
        },
        {
          id: 'Apple',
          ariaLabel: t.apple_label,
          text: t.continue_apple,
          iconMarkup: `
            <img class="ag-social-auth__icon ag-social-auth__icon--apple-light" src="${assetPrefix}apple_logo_light.svg" alt="Apple logo" />
            <img class="ag-social-auth__icon ag-social-auth__icon--apple-dark" src="${assetPrefix}apple_logo_dark.svg" alt="Apple logo" />
          `
        },
        {
          id: 'Facebook',
          ariaLabel: t.facebook_label,
          text: t.continue_facebook,
          iconMarkup: `<img class="ag-social-auth__icon" src="${assetPrefix}facebook_logo.svg" alt="Facebook logo" />`
        }
      ];

      // Build buttons markup
      const buttonsMarkup = providers.map(provider => {
        const textLabel = showText ? `<span class="ag-social-auth__label">${provider.text}</span>` : '';
        return `
          <button class="ag-social-auth__btn" aria-label="${provider.ariaLabel}" data-provider="${provider.id}" type="button">
            ${provider.iconMarkup}
            ${textLabel}
          </button>
        `;
      }).join('');

      return `
        <div class="${containerClass}">
          ${buttonsMarkup}
        </div>
      `;
    },

    /**
     * Render the social authentication buttons group inside a container
     * @param {HTMLElement} container - DOM node container
     * @param {Object} options - Customization options
     */
    render: function (container, options = {}) {
      if (!container) return;

      container.innerHTML = this.createMarkup(options).trim();

      // Bind click handlers to the newly injected buttons
      const buttons = container.querySelectorAll('.ag-social-auth__btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const provider = btn.dataset.provider;
          this.handleSocialLogin(provider);
        });
      });
    },

    /**
     * Execute mock social login flow, firing success triggers and toast notifications
     * @param {string} provider - 'Google', 'Apple', or 'Facebook'
     */
    handleSocialLogin: function (provider) {
      const lang = getLanguage();
      const t = translations[lang] || translations.en;
      const message = t.welcome_social.replace('{provider}', provider);

      // Trigger standard toast notification
      if (window.GapLuckToast && typeof window.GapLuckToast.show === 'function') {
        window.GapLuckToast.show(message);
      } else {
        alert(message);
      }

      // Dispatch custom authentication success event for page controllers
      window.dispatchEvent(new CustomEvent('gl-auth-success', {
        detail: {
          provider: provider,
          email: `social.${provider.toLowerCase()}@gapluck.com`
        }
      }));

      // Automatically close Sign-in Modal if open
      if (window.GapLuckSigninModal && typeof window.GapLuckSigninModal.close === 'function') {
        window.GapLuckSigninModal.close();
      }
    },

    /**
     * Auto-scan container elements on page load
     */
    init: function () {
      const containers = document.querySelectorAll('[data-social-auth-container]');
      containers.forEach(container => {
        const layout = container.getAttribute('data-social-layout') || 'row';
        const showText = container.getAttribute('data-social-show-text') !== 'false';
        const responsive = container.getAttribute('data-social-responsive') !== 'false';
        
        this.render(container, {
          layout: layout,
          showText: showText,
          responsive: responsive
        });
      });
    }
  };

  // Expose component globally
  window.GapLuckSocialAuth = GapLuckSocialAuth;

  // Initialize auto-scan on DOM ready
  if (document.body) {
    GapLuckSocialAuth.init();
  } else {
    document.addEventListener('DOMContentLoaded', () => GapLuckSocialAuth.init());
  }

  // Re-render when language modifications are registered
  window.addEventListener('gl-language-change', () => {
    GapLuckSocialAuth.init();
  });

})();
