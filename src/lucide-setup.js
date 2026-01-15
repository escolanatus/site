/**
 * Lucide Icons Setup
 * Escola Natus - Bloco 6
 */

import { 
  MessageCircle, 
  Users, 
  User, 
  Calendar, 
  Clock, 
  HelpCircle,
  Brain,
  AlertCircle,
  DollarSign,
  BookOpen,
  CreditCard,
  Book
} from 'lucide';

// Initialize all icons on page load
function initLucideIcons() {
  // Replace emoji icons with Lucide SVG
  const iconMappings = {
    'message-circle': MessageCircle,
    'users': Users,
    'user': User,
    'calendar': Calendar,
    'clock': Clock,
    'help-circle': HelpCircle,
    'brain': Brain,
    'alert-circle': AlertCircle,
    'dollar-sign': DollarSign,
    'book-open': BookOpen,
    'credit-card': CreditCard,
    'book': Book
  };
  
  // Find all elements with data-lucide attribute
  document.querySelectorAll('[data-lucide]').forEach(element => {
    const iconName = element.getAttribute('data-lucide');
    const IconComponent = iconMappings[iconName];
    
    if (IconComponent) {
      // Create SVG element
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', element.dataset.size || '20');
      svg.setAttribute('height', element.dataset.size || '20');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      svg.classList.add('lucide-icon');
      
      // Get icon path from Lucide
      const icon = IconComponent.toSvg({ size: element.dataset.size || 20 });
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = icon;
      const paths = tempDiv.querySelector('svg').innerHTML;
      svg.innerHTML = paths;
      
      // Replace element content
      element.innerHTML = '';
      element.appendChild(svg);
      
      // Add animation class if specified
      if (element.dataset.animate) {
        svg.classList.add('animate-draw-stroke');
      }
    }
  });
  
  console.log('[Lucide] Ícones inicializados ✅');
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLucideIcons);
} else {
  initLucideIcons();
}

export { initLucideIcons };
