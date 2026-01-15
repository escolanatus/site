/**
 * Components Loader - Escola Natus
 * 
 * Carrega header e footer dinamicamente em todas as páginas
 * Para alterar header/footer: edite apenas /components/*html
 */

// Função para carregar componente
async function loadComponent(componentName, targetSelector) {
    try {
        const response = await fetch(`/components/${componentName}.html`);
        if (!response.ok) {
            console.error(`Erro ao carregar ${componentName}:`, response.status);
            return;
        }

        const html = await response.text();
        const targetElement = document.querySelector(targetSelector);

        if (targetElement) {
            targetElement.outerHTML = html;
            console.log(`✅ ${componentName} carregado com sucesso`);

            // Re-inicializar event listeners após carregar header
            if (componentName === 'header') {
                initHeaderInteractions();
                setActiveNavLinkLocal();
            }
        }
    } catch (error) {
        console.error(`Erro ao carregar ${componentName}:`, error);
    }
}

// Event listeners do header (mobile menu)
function initHeaderInteractions() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

function setActiveNavLinkLocal() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href') || '';
        const isHome = (currentPath === '/' || currentPath === '/index.html') && (linkPath === '/' || linkPath === '/index.html');
        const normalizedCurrent = currentPath.endsWith('/') ? currentPath : currentPath + '/';
        const normalizedLink = linkPath.endsWith('/') ? linkPath : linkPath + '/';

        if (isHome || normalizedCurrent === normalizedLink || (normalizedCurrent.includes(linkPath) && linkPath !== '/' && linkPath !== '/index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Carregar componentes quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Carregar header se existe placeholder
    const headerPlaceholder = document.querySelector('[data-component="header"]');
    if (headerPlaceholder) {
        loadComponent('header', '[data-component="header"]');
    }

    // Carregar footer se existe placeholder
    const footerPlaceholder = document.querySelector('[data-component="footer"]');
    if (footerPlaceholder) {
        loadComponent('footer', '[data-component="footer"]');
    }
});
