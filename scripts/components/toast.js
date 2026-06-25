/**
 * GapLuck - Reusable Global Toast Notification Component
 * Centralizes toast notifications across the entire platform.
 * Accessible, responsive, and handles entry/exit animations cleanly.
 */

(function () {
  'use strict';

  const GapLuckToast = {
    /**
     * Display a toast message
     * @param {string} message The text to show inside the toast
     */
    show: function (message) {
      if (!message) return;

      // Clean up any existing toast immediately
      const existing = document.querySelector('.ag-toast');
      if (existing) {
        existing.remove();
      }

      // Create new toast element
      const toast = document.createElement('div');
      toast.className = 'ag-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.setAttribute('aria-atomic', 'true');

      const span = document.createElement('span');
      span.className = 'ag-toast__message';
      span.textContent = message;
      toast.appendChild(span);

      document.body.appendChild(toast);

      // Automatically remove toast after the animation duration (2.8s total)
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 2800);
    }
  };

  // Expose component to global namespace
  window.GapLuckToast = GapLuckToast;
})();
