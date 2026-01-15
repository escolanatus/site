// Version Control
import { BUILD_VERSION, CACHE_BUSTER } from './version.js';

// Importações
import './motion.css';
import './motion-observer.js';
import './border-gradient.css';
import './accessibility.js';

// Force reload on version change
const STORAGE_KEY = 'escola-natus-version';
const storedVersion = localStorage.getItem(STORAGE_KEY);
if (storedVersion !== BUILD_VERSION) {
  console.log('🔄 Nova versão detectada, limpando caches...');
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem(STORAGE_KEY, BUILD_VERSION);
  // Force hard reload
  if (storedVersion) {
    window.location.reload(true);
  }
}

// Scroll animations with Intersection Observer
const animateOnScroll = () => {
  const elements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
};

// Smooth scroll for anchor links
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// Mobile menu toggle
const initMobileMenu = () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');

      // Animate hamburger icon
      const icon = menuToggle.querySelector('svg');
      if (icon) {
        icon.classList.toggle('rotate-90');
      }
    });
  }
};

// FAQ Accordion
const initFAQ = () => {
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');

      // Close all other FAQs
      document.querySelectorAll('.faq-content').forEach(faq => {
        if (faq !== content) {
          faq.classList.add('hidden');
        }
      });

      document.querySelectorAll('.faq-icon').forEach(ic => {
        if (ic !== icon) {
          ic.classList.remove('rotate-180');
        }
      });

      // Toggle current FAQ
      if (isOpen) {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
      } else {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');

        // Smooth scroll to FAQ after opening
        setTimeout(() => {
          toggle.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      }
    });
  });
};

// Header scroll effect
const initHeaderScroll = () => {
  const header = document.querySelector('header');

  // CORREÇÃO: Verificar se header existe
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add('shadow-lg');
    } else {
      header.classList.remove('shadow-lg');
    }

    lastScroll = currentScroll;
  });
};

// Counter animation
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.ceil(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
};

// Google Analytics events
const trackEvent = (eventName, eventCategory, eventLabel) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      'event_category': eventCategory,
      'event_label': eventLabel
    });
  }
};

// Track WhatsApp clicks
const trackWhatsAppClicks = () => {
  document.querySelectorAll('.btn-whatsapp, .whatsapp-float').forEach(btn => {
    btn.addEventListener('click', () => {
      trackEvent('clique_whatsapp', 'conversao', 'botao_cta');
    });
  });
};

// Highlight Active Menu Item
const setActiveNavLink = () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    // Normalize paths (handle trailing slashes and index.html)
    const normalizedCurrent = currentPath.endsWith('/') ? currentPath : currentPath + '/';
    const normalizedLink = linkPath.endsWith('/') ? linkPath : linkPath + '/';

    // Check for exact match or homepage
    const isHomePage = (currentPath === '/' || currentPath === '/index.html') && (linkPath === '/' || linkPath === '/index.html');

    if (isHomePage || normalizedCurrent === normalizedLink || (normalizedCurrent.includes(linkPath) && linkPath !== '/' && linkPath !== '/index.html')) {
      link.classList.add('active');
    }
  });
};

// Initialize all functions on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  initSmoothScroll();
  initMobileMenu();
  initHeaderScroll();
  initFAQ();
  trackWhatsAppClicks();
  initLazyVideos();
  setActiveNavLink();
});

// Lazy loading for videos with Intersection Observer
const initLazyVideos = () => {
  const videos = document.querySelectorAll('video[preload="metadata"]');

  if (videos.length === 0) return;

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        // Change preload to auto when in viewport
        video.setAttribute('preload', 'auto');
        videoObserver.unobserve(video);
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '100px 0px' // Load 100px before entering viewport
  });

  videos.forEach(video => videoObserver.observe(video));
};

// Export functions for use in other modules
export {
  animateOnScroll,
  initSmoothScroll,
  animateCounter,
  trackEvent,
  initLazyVideos,
  setActiveNavLink
};
