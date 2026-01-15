// ========================================
// GLASS EFFECT - Radial Spotlight (BLOCO 2 - V3)
// Faz spotlight seguir o mouse nos cards
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const glassCards = document.querySelectorAll('.glass-card');

    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);
        });

        // Reset ao sair
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '50%');
        });
    });
});
