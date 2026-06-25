/* ==========================================================================
   GapLuck - Interactive Steps Demo Component JS
   Strict BEM, Clean modular structure, Keyboard accessibility
   ========================================================================== */

(function () {
  function initInteractiveSteps() {
    var stepCards = document.querySelectorAll('.ag-interactive-step-card');
    var previewItems = document.querySelectorAll('.ag-steps-preview-item');
    var connectionFill = document.getElementById('ag-steps-connection-fill');
    var typingSpan = document.getElementById('ag-search-mockup-typing-text');
    
    if (!stepCards.length) return;

    var pinnedStep = 1;
    var query = "iPhone 16 Pro Max 256GB";
    var charIndex = 0;
    var typingInterval = null;

    function updateStepUI(stepNumber) {
      var fillHeight = ((stepNumber - 1) / (stepCards.length - 1)) * 100;
      if (connectionFill) {
        connectionFill.style.height = fillHeight + '%';
      }

      stepCards.forEach(function (c) {
        if (parseInt(c.getAttribute('data-step'), 10) === stepNumber) {
          c.classList.add('ag-interactive-step-card--active');
        } else {
          c.classList.remove('ag-interactive-step-card--active');
        }
      });

      previewItems.forEach(function (item) {
        if (item.getAttribute('id') === 'ag-steps-preview-' + stepNumber) {
          item.classList.add('ag-steps-preview-item--active');
        } else {
          item.classList.remove('ag-steps-preview-item--active');
        }
      });
    }

    stepCards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        if (window.innerWidth < 992) return;
        pinnedStep = parseInt(card.getAttribute('data-step'), 10);
        updateStepUI(pinnedStep);
      });

      card.addEventListener('click', function () {
        pinnedStep = parseInt(card.getAttribute('data-step'), 10);
        updateStepUI(pinnedStep);
      });

      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          pinnedStep = parseInt(card.getAttribute('data-step'), 10);
          updateStepUI(pinnedStep);
        }
      });
    });

    function startTypingAnimation() {
      if (!typingSpan) return;
      if (typingInterval) {
        clearInterval(typingInterval);
      }
      typingSpan.textContent = "";
      charIndex = 0;
      
      typingInterval = setInterval(function () {
        if (charIndex < query.length) {
          typingSpan.textContent += query.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(startTypingAnimation, 2000);
        }
      }, 100);
    }

    // Initialize state
    updateStepUI(1);
    startTypingAnimation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveSteps);
  } else {
    initInteractiveSteps();
  }
})();
