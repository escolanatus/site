/**
 * Accessibility Enhancement System
 * Escola Natus - Bloco 9: Acessibilidade
 * 
 * Conformidade WCAG 2.1 AA
 */

// Skip to main content link
function addSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Pular para o conteúdo principal';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-verde-escuro, #2D5016);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 1000;
    transition: top 0.2s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Add role="main" to main content if not present
function enhanceSemanticStructure() {
  const mainSections = document.querySelectorAll('main, [role="main"]');
  
  if (mainSections.length === 0) {
    // Find the first section after header and mark as main
    const firstSection = document.querySelector('section');
    if (firstSection && !firstSection.hasAttribute('id')) {
      firstSection.setAttribute('id', 'main-content');
      firstSection.setAttribute('role', 'main');
    }
  }
}

// Ensure all interactive elements are keyboard accessible
function ensureKeyboardAccessibility() {
  // Find all clickable elements without proper semantics
  const clickableElements = document.querySelectorAll('[onclick]:not(a):not(button)');
  
  clickableElements.forEach(el => {
    // Add tabindex if not present
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '0');
    }
    
    // Add role if not present
    if (!el.hasAttribute('role')) {
      el.setAttribute('role', 'button');
    }
    
    // Add keyboard support
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });
}

// Announce live regions for dynamic content
function setupLiveRegions() {
  // Add aria-live to toast/notification areas if they exist
  const toastContainers = document.querySelectorAll('.toast, .notification, [role="alert"]');
  
  toastContainers.forEach(container => {
    if (!container.hasAttribute('aria-live')) {
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
    }
  });
}

// Enhanced focus trap for modals
class FocusTrap {
  constructor(element) {
    this.element = element;
    this.focusableElements = null;
    this.firstFocusable = null;
    this.lastFocusable = null;
  }
  
  activate() {
    this.focusableElements = this.element.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    this.firstFocusable = this.focusableElements[0];
    this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    
    // Focus first element
    this.firstFocusable?.focus();
    
    // Trap focus
    this.element.addEventListener('keydown', this.handleTabKey.bind(this));
  }
  
  handleTabKey(e) {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === this.firstFocusable) {
        e.preventDefault();
        this.lastFocusable.focus();
      }
    } else {
      if (document.activeElement === this.lastFocusable) {
        e.preventDefault();
        this.firstFocusable.focus();
      }
    }
  }
  
  deactivate() {
    this.element.removeEventListener('keydown', this.handleTabKey);
  }
}

// Announce page load to screen readers
function announcePageLoad() {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = 'Página carregada com sucesso';
  announcement.style.cssText = `
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  `;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => announcement.remove(), 1000);
}

// Check for reduced motion preference
function respectReducedMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.body.classList.add('reduce-motion');
    console.log('[A11y] Reduced motion enabled');
  }
  
  // Listen for changes
  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  });
}

// Initialize all accessibility features
function initAccessibility() {
  addSkipLink();
  enhanceSemanticStructure();
  ensureKeyboardAccessibility();
  setupLiveRegions();
  respectReducedMotion();
  announcePageLoad();
  
  console.log('[A11y] Sistema de acessibilidade inicializado ✅');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccessibility);
} else {
  initAccessibility();
}

export { FocusTrap, initAccessibility };
