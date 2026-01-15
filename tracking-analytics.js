/**
 * TRACKING & ANALYTICS - ESCOLA NATUS
 * 
 * Meta Pixel + Google Analytics 4 + Google Tag Manager
 * 
 * IMPORTANTE: IDs FICTÍCIOS ABAIXO - Substituir pelos reais ao configurar
 */

// ============================================
// META PIXEL (Facebook/Instagram Ads)
// ============================================
!(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
})(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
);

// PIXEL ID REAL
fbq("init", "2060371334394589");
fbq("track", "PageView");

// Track CTA Clicks (WhatsApp, Agendar Visita)
document.addEventListener("DOMContentLoaded", function () {
    // WhatsApp CTAs
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            fbq("track", "Contact", {
                content_name: "WhatsApp Click",
                value: 10.0,
                currency: "BRL",
            });
        });
    });

    // Phone CTAs
    const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
    phoneButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            fbq("track", "Contact", {
                content_name: "Phone Click",
                value: 8.0,
                currency: "BRL",
            });
        });
    });

    // Form Submissions
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
        form.addEventListener("submit", function () {
            fbq("track", "Lead", {
                content_name: "Newsletter Signup",
                value: 5.0,
                currency: "BRL",
            });
        });
    });
});

// ============================================
// GOOGLE ANALYTICS 4 (GA4)
// ============================================
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag("js", new Date());

// GA4 MEASUREMENT ID REAL
gtag("config", "G-YLD10XJDP3", {
    send_page_view: true,
    cookie_flags: "SameSite=None;Secure",
});

// Track Custom Events
document.addEventListener("DOMContentLoaded", function () {
    // Track Video Plays (Depoimentos)
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
        video.addEventListener("play", function () {
            gtag("event", "video_start", {
                video_title: video.closest("div").querySelector("h3")?.textContent || "Unknown",
                video_location: window.location.pathname,
            });
        });

        video.addEventListener("ended", function () {
            gtag("event", "video_complete", {
                video_title: video.closest("div").querySelector("h3")?.textContent || "Unknown",
            });
        });
    });

    // Track WhatsApp Clicks
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            gtag("event", "generate_lead", {
                method: "whatsapp",
                page: window.location.pathname,
            });
        });
    });

    // Track Page Downloads/Resources
    const downloadLinks = document.querySelectorAll('a[download], a[href$=".pdf"]');
    downloadLinks.forEach((link) => {
        link.addEventListener("click", function () {
            gtag("event", "file_download", {
                file_name: link.getAttribute("href"),
                link_text: link.textContent,
            });
        });
    });

    // Track Scroll Depth
    let scrollTracked = {
        25: false,
        50: false,
        75: false,
        100: false,
    };

    window.addEventListener("scroll", function () {
        const scrollPercent =
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

        Object.keys(scrollTracked).forEach((threshold) => {
            if (scrollPercent >= threshold && !scrollTracked[threshold]) {
                scrollTracked[threshold] = true;
                gtag("event", "scroll", {
                    percent_scrolled: threshold,
                });
            }
        });
    });
});

// ============================================
// GOOGLE TAG MANAGER (GTM)
// ============================================
(function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, "script", "dataLayer", "GTM-PQ8TW225"); // GTM ID REAL

console.log("✅ Tracking Analytics carregado: Meta Pixel + GA4 + GTM");

// ============================================
// MISSÃO 13: COUNTUP NUMBERS ANIMATION
// Animação de números crescentes
// ============================================
function animateCountUp(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''), 10);
    const suffix = element.textContent.replace(/[\d]/g, '');
    const duration = 2000; // 2 segundos
    const start = 0;
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing: easeOutExpo para desacelerar no final
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeProgress);
        
        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target + suffix;
        }
    }

    requestAnimationFrame(updateNumber);
}

// ============================================
// MISSÃO 21: SCROLL REVEAL OPTIMIZED
// IntersectionObserver para animações
// ============================================
document.addEventListener("DOMContentLoaded", function() {
    // CountUp para elementos com data-countup
    const countUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                animateCountUp(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    // Auto-detect números no hero stats (index.html)
    document.querySelectorAll('.text-4xl.font-bold.text-laranja').forEach(el => {
        countUpObserver.observe(el);
    });

    // Scroll Reveal para [data-animate]
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('[data-animate]').forEach(el => {
        revealObserver.observe(el);
    });

    console.log("✅ CountUp + Scroll Reveal ativados");
});
