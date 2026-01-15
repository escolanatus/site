// ========================================
// STAGGER STRATEGY (BLOCO 4 - V3)
// Entrada sequencial tipo "virar página"
// ========================================

/**
 * Observer para animações com stagger
 * @param {string} selector - Seletor CSS dos elementos
 * @param {number} delayInterval - Delay entre elementos (ms)
 * @param {number} threshold - % visível para trigger
 */
function observeStagger(selector, delayInterval = 60, threshold = 0.1) {
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                // Delay progressivo baseado no index
                const delay = index * delayInterval;

                setTimeout(() => {
                    entry.target.style.animationDelay = `${delay}ms`;
                    entry.target.classList.add('animate-[fade-up]');
                    entry.target.dataset.animated = 'true';
                }, 50); // Pequeno delay inicial
            }
        });
    }, {
        threshold,
        rootMargin: '0px 0px -50px 0px' // Trigger um pouco antes
    });

    elements.forEach(el => observer.observe(el));
}

// ========================================
// APLICAR STAGGER NOS COMPONENTES
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // 4.2 - Cards do blog (60ms delay)
    observeStagger('.blog-post-card', 60, 0.1);

    // 4.3 - Galeria de fotos (40ms - mais rápido)
    observeStagger('[data-gallery-item]', 40, 0.15);

    // 4.4 - Diferenciais (80ms - mais lento, dar peso)
    observeStagger('.diferencial-card', 80, 0.1);

    // Genérico para qualquer elemento com data-animate
    observeStagger('[data-animate]', 60, 0.1);

    console.log('✅ Stagger observer ativo em múltiplos componentes');
});
