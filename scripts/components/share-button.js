/**
 * GapLuck - Share Button Component JS
 * Reusable, accessible component for sharing product details.
 * Supports native sharing on mobile, trilingual translations, and copy-to-clipboard toast alerts.
 */

(function () {
  'use strict';

  // Trilingual dictionary
  const translations = {
    en: {
      share_title: 'Check out this price difference!',
      copied_toast: 'Link copied to clipboard successfully!',
      whatsapp: 'WhatsApp',
      twitter: 'X (Twitter)',
      telegram: 'Telegram',
      copy: 'Copy Link',
      copied: 'Copied!'
    },
    tr: {
      share_title: 'Fiyat farkına göz atın!',
      copied_toast: 'Bağlantı panoya başarıyla kopyalandı!',
      whatsapp: 'WhatsApp',
      twitter: 'X (Twitter)',
      telegram: 'Telegram',
      copy: 'Bağlantıyı Kopyala',
      copied: 'Kopyalandı!'
    },
    ar: {
      share_title: 'تحقق من فرق السعر هذا!',
      copied_toast: 'تم نسخ الرابط إلى الحافظة بنجاح!',
      whatsapp: 'واتساب',
      twitter: 'إكس (تويتر)',
      telegram: 'تيليجرام',
      copy: 'نسخ الرابط',
      copied: 'تم النسخ!'
    }
  };

  // Helper to extract active language
  function getLanguage() {
    return document.documentElement.getAttribute('lang') || 'en';
  }

  const GapLuckShareButton = {
    menuHTML: `
      <div class="ag-share-menu" id="share-menu">
        <button class="ag-share-menu__item" data-share-target="whatsapp">
          <svg class="ag-share-menu__icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          <span class="ag-share-menu__text" data-share-label="whatsapp">WhatsApp</span>
        </button>
        <button class="ag-share-menu__item" data-share-target="twitter">
          <svg class="ag-share-menu__icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span class="ag-share-menu__text" data-share-label="twitter">X (Twitter)</span>
        </button>
        <button class="ag-share-menu__item" data-share-target="telegram">
          <svg class="ag-share-menu__icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
          </svg>
          <span class="ag-share-menu__text" data-share-label="telegram">Telegram</span>
        </button>
        <button class="ag-share-menu__item" data-share-target="copy">
          <svg class="ag-share-menu__icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
            <rect height="13" rx="2" ry="2" width="13" x="9" y="9"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <span class="ag-share-menu__text" data-share-label="copy">Copy Link</span>
        </button>
      </div>
    `,

    // Initializes the share component on a container wrapper
    init: function (containerSelector) {
      const container = typeof containerSelector === 'string'
        ? document.querySelector(containerSelector)
        : containerSelector;

      if (!container) return;

      let menu = container.querySelector('.ag-share-menu');
      const button = container.querySelector('.ag-btn') || container.querySelector('button');

      if (!button) return;

      // If share menu is missing, inject it dynamically
      if (!menu) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.menuHTML.trim();
        menu = tempDiv.firstChild;
        container.appendChild(menu);
      }

      this.bindEvents(container, button, menu);
    },

    // Binds events and logic
    bindEvents: function (container, button, menu) {
      const shareItems = menu.querySelectorAll('.ag-share-menu__item');

      // Initialize translations
      this.translateMenu(menu);

      // Clean close helper
      const closeMenu = () => {
        button.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-active');
      };

      // Open menu helper
      const openMenu = () => {
        button.setAttribute('aria-expanded', 'true');
        menu.classList.add('is-active');

        // Verify bounds for overflow
        const rect = menu.getBoundingClientRect();
        const overflowLeft = rect.left < 0;

        if (overflowLeft) {
          menu.classList.add('ag-share-menu--left');
        } else {
          menu.classList.remove('ag-share-menu--left');
        }
      };

      // Button click handler
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const lang = getLanguage();
        const t = translations[lang] || translations.en;

        // On mobile viewports, utilize native share API if supported
        if (navigator.share && window.innerWidth < 768) {
          try {
            await navigator.share({
              title: document.title,
              text: t.share_title,
              url: window.location.href
            });
          } catch (err) {
            console.log('Error sharing:', err);
          }
          return;
        }

        const isOpen = menu.classList.contains('is-active');
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      // Click outside listener to dismiss
      document.addEventListener('click', (e) => {
        if (!container.contains(e.target) && menu.classList.contains('is-active')) {
          closeMenu();
        }
      });

      // Handle item click sharing targets
      shareItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();

          const target = item.getAttribute('data-share-target');
          const lang = getLanguage();
          const t = translations[lang] || translations.en;
          const url = encodeURIComponent(window.location.href);
          const titleText = encodeURIComponent(t.share_title);

          if (target === 'whatsapp') {
            window.open(`https://api.whatsapp.com/send?text=${titleText}%20${url}`, '_blank');
            closeMenu();
          } else if (target === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${titleText}&url=${url}`, '_blank');
            closeMenu();
          } else if (target === 'telegram') {
            window.open(`https://t.me/share/url?url=${url}&text=${titleText}`, '_blank');
            closeMenu();
          } else if (target === 'copy') {
            navigator.clipboard.writeText(window.location.href).then(() => {
              const textSpan = item.querySelector('.ag-share-menu__text');
              if (textSpan) {
                const originalText = textSpan.textContent;
                textSpan.textContent = t.copied;
                
                // Show centralized toast notification
                if (window.GapLuckToast && typeof window.GapLuckToast.show === 'function') {
                  window.GapLuckToast.show(t.copied_toast);
                }

                setTimeout(() => {
                  textSpan.textContent = originalText;
                  closeMenu();
                }, 1500);
              } else {
                closeMenu();
              }
            }).catch(err => {
              console.error('Failed to copy text: ', err);
              closeMenu();
            });
          }
        });
      });

      // Keyboard Accessibility: Escape key and Focus Trap
      container.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeMenu();
          button.focus();
          return;
        }

        if (e.key === 'Tab' && menu.classList.contains('is-active')) {
          const focusables = Array.from(shareItems);
          if (focusables.length === 0) return;

          const firstEl = focusables[0];
          const lastEl = focusables[focusables.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              button.focus();
            } else if (document.activeElement === button) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              button.focus();
            } else if (document.activeElement === button) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      });

      // Sync with global language changes
      window.addEventListener('gl-language-change', () => {
        this.translateMenu(menu);
      });
    },

    // Handles translations updates
    translateMenu: function (menu) {
      const lang = getLanguage();
      const t = translations[lang] || translations.en;

      const labels = menu.querySelectorAll('.ag-share-menu__text');
      labels.forEach(label => {
        const key = label.getAttribute('data-share-label');
        if (key && t[key]) {
          label.textContent = t[key];
        }
      });
    }
  };

  // Expose namespace globally
  window.GapLuckShareButton = GapLuckShareButton;

  // Auto-scan and initialize
  function scanAndInit() {
    const wrappers = document.querySelectorAll('.ag-share-wrapper');
    wrappers.forEach(wrapper => {
      GapLuckShareButton.init(wrapper);
    });
  }

  if (document.body) {
    scanAndInit();
  } else {
    document.addEventListener('DOMContentLoaded', scanAndInit);
  }
})();
