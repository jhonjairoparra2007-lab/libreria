/* ============================================================
   PURPURA.JS - Fan Page Eladio Carrión & Messi
   Creado por: Jhon Jairo Parra Obando
   ============================================================ */

'use strict';

/* ============================
   DOM READY
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initScrollAnimations();
    initSlider();
    initBackToTop();
    initMobileMenu();
    initTypewriter();
    initCounters();
    initModal();
    initGalleryHover();
});

/* ============================
   PARTICLES
   ============================ */
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    const colors = ['#7b2fff', '#c840ff', '#f5c518', '#ffffff', '#bf7bff'];
    const count = 55;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = Math.random() * 8 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 14 + 8;
        const delay = Math.random() * 12;
        const left = Math.random() * 100;

        p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      opacity: ${Math.random() * 0.5 + 0.15};
    `;
        container.appendChild(p);
    }
}

/* ============================
   NAVBAR SCROLL EFFECT
   ============================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.style.background = 'rgba(13, 0, 20, 0.97)';
            navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(13, 0, 20, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    }, { passive: true });
}

/* ============================
   MOBILE MENU
   ============================ */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        const spans = toggle.querySelectorAll('span');
        links.classList.contains('open')
            ? animateHamburgerOpen(spans)
            : animateHamburgerClose(spans);
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('open');
            animateHamburgerClose(toggle.querySelectorAll('span'));
        });
    });
}

function animateHamburgerOpen(spans) {
    spans[0].style.transform = 'rotate(45deg) translateY(9px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translateY(-9px)';
}
function animateHamburgerClose(spans) {
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
}

/* ============================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================ */
function initScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 120);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    timelineItems.forEach(item => observer.observe(item));

    const fadeEls = document.querySelectorAll('[data-fade]');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    fadeEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        fadeObserver.observe(el);
    });
}

/* ============================
   QUOTES SLIDER
   ============================ */
function initSlider() {
    const track = document.querySelector('.quotes-track');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    if (!track) return;

    let current = 0;
    const total = track.children.length;

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
    prevBtn?.addEventListener('click', () => goTo(current - 1));
    nextBtn?.addEventListener('click', () => goTo(current + 1));

    setInterval(() => goTo(current + 1), 5500);

    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
    });
}

/* ============================
   BACK TO TOP
   ============================ */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================
   TYPEWRITER EFFECT
   ============================ */
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const phrases = [
        'El Trono del Trap Latino',
        'La Voz de una Generación',
        'El Rey de Puerto Rico',
        'Un Ícono Mundial',
    ];

    let i = 0;
    let j = 0;
    let deleting = false;

    function type() {
        const phrase = phrases[i];
        el.textContent = deleting ? phrase.substring(0, j--) : phrase.substring(0, j++);

        if (!deleting && j > phrase.length) {
            setTimeout(() => { deleting = true; type(); }, 1800);
            return;
        }
        if (deleting && j < 0) {
            deleting = false;
            i = (i + 1) % phrases.length;
        }

        setTimeout(type, deleting ? 55 : 110);
    }
    type();
}

/* ============================
   ANIMATING COUNTERS
   ============================ */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function update(ts) {
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

/* ============================
   MODAL
   ============================ */
function initModal() {
    const overlay = document.getElementById('modalOverlay');
    const close = document.getElementById('modalClose');

    close?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

window.openModal = function (title, body) {
    const overlay = document.getElementById('modalOverlay');
    const mTitle = document.getElementById('modalTitle');
    const mBody = document.getElementById('modalBody');
    if (mTitle) mTitle.textContent = title;
    if (mBody) mBody.innerHTML = body;
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
};

function closeModal() {
    document.getElementById('modalOverlay')?.classList.remove('open');
    document.body.style.overflow = '';
}

/* ============================
   GALLERY HOVER TEXT
   ============================ */
function initGalleryHover() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        item.addEventListener('mouseenter', () => { item.style.zIndex = '5'; });
        item.addEventListener('mouseleave', () => { item.style.zIndex = ''; });
    });
}

/* ============================
   SMOOTH SCROLL
   ============================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
