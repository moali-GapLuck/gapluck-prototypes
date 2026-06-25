/**
 * GapLuck - Centralized Theme Controller
 * Immediately initializes and applies the light/dark data-theme attribute,
 * and exposes window.GapLuckTheme globally.
 */

(function () {
  'use strict';

  // Determine initial theme
  const savedTheme = localStorage.getItem('gl-theme') || localStorage.getItem('ag-theme');
  let theme = savedTheme;

  if (!theme) {
    // Check system preferences (fallback to dark)
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    theme = prefersLight ? 'light' : 'dark';
  }

  // Apply immediately to documentElement to prevent layout theme flashing
  document.documentElement.setAttribute('data-theme', theme);

  // Global theme interface
  window.GapLuckTheme = {
    /**
     * Get the active theme
     * @returns {string} active theme name ('light' | 'dark')
     */
    getTheme: function () {
      return document.documentElement.getAttribute('data-theme') || 'dark';
    },

    /**
     * Set a new theme
     * @param {string} newTheme new theme name ('light' | 'dark')
     */
    setTheme: function (newTheme) {
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('gl-theme', newTheme);
      localStorage.setItem('ag-theme', newTheme);
      
      // Dispatch custom event for components to respond to changes dynamically
      window.dispatchEvent(new CustomEvent('gl-theme-change', { detail: { theme: newTheme } }));
    },

    /**
     * Toggle the theme state
     */
    toggleTheme: function () {
      const current = this.getTheme();
      const next = current === 'light' ? 'dark' : 'light';
      this.setTheme(next);
    }
  };
})();
