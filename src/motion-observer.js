/**
 * Motion Observer - Intersection Observer para scroll-reveal animations
 * Escola Natus - Sony 4.5 CDO
 * 
 * Detects elements with .reveal class and adds .revealed when visible
 */

// Configuração do Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1 // Elemento precisa estar 10% visível
};

// Callback quando elemento entra no viewport
const observerCallback = (entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Adiciona delay escalonado para efeito stagger
      const delay = index * 100; // 100ms entre cada elemento
      
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);
      
      // Para de observar depois de revelar (performance)
      observer.unobserve(entry.target);
    }
  });
};

// Cria o observer
const motionObserver = new IntersectionObserver(observerCallback, observerOptions);

// Função de inicialização
export function initMotionObserver() {
  // Seleciona todos elementos com .reveal
  const revealElements = document.querySelectorAll('.reveal');
  
  // Observa cada elemento
  revealElements.forEach(el => {
    motionObserver.observe(el);
  });
  
  console.log(`[Motion Observer] Observando ${revealElements.length} elementos`);
}

// Auto-inicializa quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMotionObserver);
} else {
  initMotionObserver();
}
