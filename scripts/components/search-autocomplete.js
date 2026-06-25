/**
 * GapLuck - Search Autocomplete & History Box Component JS
 * Handles autocomplete suggestions and recent search history for all search inputs.
 * Strictly avoids em-dash character, uses standard BEM, supports trilingual toggle.
 */

(function () {
  'use strict';

  // Mock catalog database for prototyping
  const mockCatalog = [
    { name: 'iPhone 17 Pro Max', brand: 'Apple', category: 'Smartphones', price: '₺52,000', slug: 'apple/iphone-17-pro-max', identifiers: ['A3084', 'MTRX3LL/A', '194253433125'] },
    { name: 'iPhone 17 Pro', brand: 'Apple', category: 'Smartphones', price: '₺46,000', slug: 'apple/iphone-17-pro', identifiers: ['A3083', 'MTRX3LL/B'] },
    { name: 'MacBook Pro 16 M4', brand: 'Apple', category: 'Laptops', price: '₺84,000', slug: 'apple/macbook-pro-16-m4', identifiers: ['A3102'] },
    { name: 'iPad Pro 13 M4', brand: 'Apple', category: 'Tablets', price: '₺38,000', slug: 'apple/ipad-pro-13-m4', identifiers: ['A3007'] },
    { name: 'Sony WH-1000XM5', brand: 'Sony', category: 'Headphones', price: '₺12,500', slug: 'sony/wh-1000xm5', identifiers: ['WH1000XM5'] },
    { name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', category: 'Smartphones', price: '₺49,000', slug: 'samsung/galaxy-s24-ultra', identifiers: ['S24ULTRA'] }
  ];

  // Trilingual dictionary for component interface
  const translations = {
    en: {
      recent_searches: 'Recent Searches',
      clear_btn: 'Clear',
      in_category: 'in'
    },
    tr: {
      recent_searches: 'Son Aramalar',
      clear_btn: 'Temizle',
      in_category: 'kategorisinde'
    },
    ar: {
      recent_searches: 'عمليات البحث الأخيرة',
      clear_btn: 'مسح',
      in_category: 'في'
    }
  };

  const HISTORY_KEY = 'gl-search-history';
  const MAX_HISTORY = 5;
  const MAX_SUGGESTIONS = 6;

  let currentFocusIndex = -1;
  let activeDropdown = null;
  let activeInput = null;

  // Retrieve current language
  function getLanguage() {
    return document.documentElement.getAttribute('lang') || 'en';
  }

  // Get search history from localStorage
  function getHistory() {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  // Save query to search history
  function saveToHistory(query) {
    if (!query || !query.trim()) return;
    const cleanQuery = query.trim();
    let history = getHistory();
    
    // Remove query if it already exists to move it to the top
    history = history.filter(item => item.toLowerCase() !== cleanQuery.toLowerCase());
    history.unshift(cleanQuery);
    
    // Cap history size
    if (history.length > MAX_HISTORY) {
      history = history.slice(0, MAX_HISTORY);
    }
    
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      // Storage full or unavailable
    }
  }

  // Remove a single query from history
  function removeFromHistory(query) {
    let history = getHistory();
    history = history.filter(item => item !== query);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      // Storage unavailable
    }
  }

  // Clear all search history
  function clearHistory() {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      // Storage unavailable
    }
  }

  // Navigate to comparison page for a product
  function navigateToProduct(slug) {
    const isPagesFolder = window.location.pathname.includes('/pages/');
    const comparePath = isPagesFolder ? 'comparison_V3.html' : 'pages/comparison_V3.html';
    window.location.href = `${comparePath}?product=${slug}`;
  }

  // Perform client-side suggestion matching
  function getSuggestions(query) {
    if (!query || query.length < 2) return [];
    const cleanQuery = query.toLowerCase().trim();

    return mockCatalog.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(cleanQuery);
      const brandMatch = product.brand.toLowerCase().includes(cleanQuery);
      const identifierMatch = product.identifiers && product.identifiers.some(id => id.toLowerCase().includes(cleanQuery));
      return nameMatch || brandMatch || identifierMatch;
    }).slice(0, MAX_SUGGESTIONS);
  }

  // Create the autocomplete dropdown HTML element
  function createDropdownElement() {
    const dropdown = document.createElement('div');
    dropdown.className = 'ag-search-autocomplete';
    dropdown.id = 'search-autocomplete-dropdown';
    return dropdown;
  }

  // Render the autocomplete list or history list
  function renderDropdown(dropdown, input) {
    const query = input.value;
    const lang = getLanguage();
    const t = translations[lang] || translations.en;

    dropdown.innerHTML = '';
    currentFocusIndex = -1;

    if (query.length < 2) {
      // Render History Box
      const history = getHistory();
      if (history.length === 0) {
        dropdown.classList.remove('ag-search-autocomplete--open');
        return;
      }

      const section = document.createElement('div');
      section.className = 'ag-search-autocomplete__section ag-search-autocomplete__section--history';

      const header = document.createElement('div');
      header.className = 'ag-search-autocomplete__header';
      header.innerHTML = `
        <span class="ag-search-autocomplete__title">${t.recent_searches}</span>
        <button type="button" class="ag-search-autocomplete__clear-btn" id="ag-clear-history">${t.clear_btn}</button>
      `;

      const list = document.createElement('ul');
      list.className = 'ag-search-autocomplete__list';

      history.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'ag-search-autocomplete__item';
        li.dataset.index = index;

        const link = document.createElement('a');
        link.className = 'ag-search-autocomplete__link';
        link.href = '#';
        link.innerHTML = `
          <div style="display: flex; align-items: center;">
            <svg class="ag-search-autocomplete__history-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span class="ag-search-autocomplete__item-title">${item}</span>
          </div>
        `;

        // Direct search execution on click
        link.addEventListener('click', (e) => {
          e.preventDefault();
          input.value = item;
          saveToHistory(item);
          dropdown.classList.remove('ag-search-autocomplete--open');
          
          // Dispatch submit event or custom search event
          const form = input.closest('form');
          if (form) {
            form.dispatchEvent(new Event('submit', { cancelable: true }));
          } else {
            window.dispatchEvent(new CustomEvent('gl-search-submit', { detail: { query: item } }));
          }
        });

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'ag-search-autocomplete__remove-history';
        removeBtn.ariaLabel = 'Remove search history item';
        removeBtn.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        `;
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          removeFromHistory(item);
          renderDropdown(dropdown, input);
        });

        li.appendChild(link);
        li.appendChild(removeBtn);
        list.appendChild(li);
      });

      section.appendChild(header);
      section.appendChild(list);
      dropdown.appendChild(section);

      // Wire up clear button
      const clearBtn = header.querySelector('#ag-clear-history');
      if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
          e.preventDefault();
          clearHistory();
          renderDropdown(dropdown, input);
        });
      }

      dropdown.classList.add('ag-search-autocomplete--open');

    } else {
      // Render Catalog Suggestions
      const suggestions = getSuggestions(query);
      if (suggestions.length === 0) {
        dropdown.classList.remove('ag-search-autocomplete--open');
        return;
      }

      const section = document.createElement('div');
      section.className = 'ag-search-autocomplete__section ag-search-autocomplete__section--suggestions';

      const list = document.createElement('ul');
      list.className = 'ag-search-autocomplete__list';

      suggestions.forEach((product, index) => {
        const li = document.createElement('li');
        li.className = 'ag-search-autocomplete__item';
        li.dataset.index = index;

        const link = document.createElement('a');
        link.className = 'ag-search-autocomplete__link';
        link.href = '#';
        link.innerHTML = `
          <div class="ag-search-autocomplete__item-content">
            <span class="ag-search-autocomplete__item-title">${product.name}</span>
            <span class="ag-search-autocomplete__item-meta">${product.brand} · ${product.category}</span>
          </div>
          <span class="ag-search-autocomplete__item-price">${product.price}</span>
        `;

        link.addEventListener('click', (e) => {
          e.preventDefault();
          saveToHistory(product.name);
          dropdown.classList.remove('ag-search-autocomplete--open');
          navigateToProduct(product.slug);
        });

        li.appendChild(link);
        list.appendChild(li);
      });

      section.appendChild(list);
      dropdown.appendChild(section);
      dropdown.classList.add('ag-search-autocomplete--open');
    }
  }

  // Keyboard navigation controller
  function handleKeyboardNavigation(e, dropdown, input) {
    if (!dropdown.classList.contains('ag-search-autocomplete--open')) return;

    const items = dropdown.querySelectorAll('.ag-search-autocomplete__item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentFocusIndex++;
      if (currentFocusIndex >= items.length) currentFocusIndex = 0;
      updateFocusState(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentFocusIndex--;
      if (currentFocusIndex < 0) currentFocusIndex = items.length - 1;
      updateFocusState(items);
    } else if (e.key === 'Enter') {
      if (currentFocusIndex >= 0) {
        e.preventDefault();
        const focusedItem = items[currentFocusIndex];
        const link = focusedItem.querySelector('.ag-search-autocomplete__link');
        if (link) link.click();
      } else {
        // Standard form submit, save input query
        saveToHistory(input.value);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      dropdown.classList.remove('ag-search-autocomplete--open');
      input.blur();
    }
  }

  // Update visual focus classes for keyboard selection
  function updateFocusState(items) {
    items.forEach((item, index) => {
      if (index === currentFocusIndex) {
        item.classList.add('ag-search-autocomplete__item--focused');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('ag-search-autocomplete__item--focused');
      }
    });
  }

  // Bind autocomplete instance to a specific search input
  function setupAutocomplete(input) {
    // Avoid double binding
    if (input.dataset.autocompleteBound) return;
    input.dataset.autocompleteBound = 'true';

    // Ensure input container is relative
    const container = input.closest('form') || input.parentElement;
    if (container) {
      if (window.getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
      }
    }

    const dropdown = createDropdownElement();
    if (container) {
      container.appendChild(dropdown);
    }

    // Toggle view on focus
    input.addEventListener('focus', () => {
      activeDropdown = dropdown;
      activeInput = input;
      renderDropdown(dropdown, input);
    });

    // Handle input typing
    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (activeDropdown === dropdown) {
          renderDropdown(dropdown, input);
        }
      }, 150); // Debounce typing adjustments slightly
    });

    // Keyboard bindings
    input.addEventListener('keydown', (e) => {
      handleKeyboardNavigation(e, dropdown, input);
    });

    // Save search to history when the parent form is submitted
    const form = input.closest('form');
    if (form) {
      form.addEventListener('submit', () => {
        saveToHistory(input.value);
      });
    }
  }

  // Scan document for search inputs and bind autocomplete
  function scanAndInit() {
    const searchInputs = document.querySelectorAll('input[type="search"], .ag-search-bar__input, .ag-navbar__search-input');
    searchInputs.forEach(input => {
      setupAutocomplete(input);
    });
  }

  // Initialize
  if (document.body) {
    scanAndInit();
  } else {
    document.addEventListener('DOMContentLoaded', scanAndInit);
  }

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (activeDropdown && activeInput) {
      const clickedInsideInput = activeInput.contains(e.target);
      const clickedInsideDropdown = activeDropdown.contains(e.target);
      
      if (!clickedInsideInput && !clickedInsideDropdown) {
        activeDropdown.classList.remove('ag-search-autocomplete--open');
        activeDropdown = null;
        activeInput = null;
      }
    }
  });

  // Re-render open dropdown when language changes
  window.addEventListener('gl-language-change', () => {
    if (activeDropdown && activeInput) {
      renderDropdown(activeDropdown, activeInput);
    }
  });

  // Re-scan inputs when page content modifies dynamically
  window.GapSearchAutocomplete = {
    refresh: scanAndInit,
    saveSearch: saveToHistory
  };

})();
