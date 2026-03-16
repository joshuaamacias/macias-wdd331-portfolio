/**
 * gallery.js
 *
 * Handles two things:
 *   1. Gallery filter with View Transitions API
 *   2. Hero entrance animation using the Web Animations API (WAAPI)
 *
 * This file is complete. You do not need to modify it.
 * Read through it to understand how WAAPI and startViewTransition work
 * before you implement the CSS that completes each effect.
 */


// ============================================================
// GALLERY FILTER WITH VIEW TRANSITIONS
// ============================================================

/**
 * Applies a category filter to the card grid.
 * Wraps the DOM update in document.startViewTransition() when
 * available so the browser animates the layout change.
 * Falls back to a direct DOM update in browsers without support.
 *
 * @param {string} category - The data-category value to show, or 'all'
 */
window.applyFilter = (category) => {
    const cards = document.querySelectorAll('.card');

    const updateDOM = () => {
        cards.forEach((card) => {
            if (category === 'all' || card.dataset.category === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    };

    if ('startViewTransition' in document) {
        document.startViewTransition(updateDOM);
    } else {
        updateDOM();
    }
};

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((btn) => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        window.applyFilter(button.dataset.filter);
    });
});


// ============================================================
// HERO ENTRANCE — WEB ANIMATIONS API
// ============================================================

/**
 * Runs a staggered entrance animation on the three hero elements
 * using Element.animate() (the Web Animations API).
 *
 * Each element fades in and translates upward with a delay that
 * increases by 150ms per element, creating a cascade effect.
 *
 * Skipped entirely when the user prefers reduced motion —
 * in that case the elements are made visible immediately.
 */
window.runHeroEntrance = () => {
    const heroElements = document.querySelectorAll(
        '.hero-eyebrow, .hero-title, .hero-description'
    );

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        heroElements.forEach((el) => {
            el.style.opacity = '1';
        });
        return;
    }

    heroElements.forEach((el, index) => {
        el.animate(
            [
                { opacity: 0, transform: 'translateY(1rem)' },
                { opacity: 1, transform: 'translateY(0)' },
            ],
            {
                duration: 400,
                delay: index * 150,
                easing: 'ease-out',
                fill: 'both',
            }
        );
    });
};

window.runHeroEntrance();
