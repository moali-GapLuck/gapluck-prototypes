/**
 * GapLuck - Reusable Global Carousel Slider Component
 * Centralizes viewport scroll animation, scroll progress tracking,
 * and next/prev navigation button state adjustments.
 */

(function () {
  'use strict';

  class GapLuckCarousel {
    /**
     * Initializes a new carousel controller
     * @param {string} id the identifier suffix for the carousel container
     * @param {Object} options configuration options (e.g. scroll step size)
     */
    constructor(id, options = {}) {
      this.id = id;
      this.step = options.step || 260;

      this.viewport = document.getElementById(`viewport-${id}`);
      this.prevBtn = document.getElementById(`btn-prev-${id}`);
      this.nextBtn = document.getElementById(`btn-next-${id}`);
      this.progress = document.getElementById(`progress-${id}`);

      if (!this.viewport) {
        console.warn(`GapLuckCarousel: Viewport element "#viewport-${id}" not found.`);
        return;
      }

      this.init();
    }

    init() {
      const self = this;

      function updateIndicators() {
        const maxScroll = self.viewport.scrollWidth - self.viewport.clientWidth;

        // Update scroll progress bar percentage
        if (self.progress && maxScroll > 0) {
          const percentage = (self.viewport.scrollLeft / maxScroll) * 100;
          self.progress.style.width = `${percentage}%`;
        }

        // Hide or show controls at boundaries
        if (self.prevBtn) {
          if (self.viewport.scrollLeft <= 10) {
            self.prevBtn.classList.add("ag-carousel-btn--hidden");
          } else {
            self.prevBtn.classList.remove("ag-carousel-btn--hidden");
          }
        }

        if (self.nextBtn) {
          if (self.viewport.scrollLeft + self.viewport.clientWidth >= self.viewport.scrollWidth - 10) {
            self.nextBtn.classList.add("ag-carousel-btn--hidden");
          } else {
            self.nextBtn.classList.remove("ag-carousel-btn--hidden");
          }
        }
      }

      // Hook up slide navigation buttons
      if (this.prevBtn) {
        this.prevBtn.addEventListener("click", () => {
          self.viewport.scrollBy({ left: -self.step, behavior: 'smooth' });
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener("click", () => {
          self.viewport.scrollBy({ left: self.step, behavior: 'smooth' });
        });
      }

      // Attach scroll listeners
      this.viewport.addEventListener("scroll", updateIndicators);
      window.addEventListener("resize", updateIndicators);

      // Perform initial layout sync
      updateIndicators();
    }
  }

  // Expose component to global namespace
  window.GapLuckCarousel = GapLuckCarousel;
})();
