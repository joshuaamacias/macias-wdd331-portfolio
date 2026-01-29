/**
 * Theme Management System
 * Handles automatic theme detection, manual toggle, and preference persistence
 */

/**
 * Theme manager object containing all theme-related functionality
 */
const themeManager = {
    /**
     * Get the stored theme preference from localStorage
     * @returns {string|null} The stored theme ('light', 'dark') or null if none stored
     */
    getStoredTheme: () => {
        return localStorage.getItem('theme');
    },

    /**
     * Store theme preference in localStorage
     * @param {string} theme The theme to store ('light' or 'dark')
     */
    setStoredTheme: (theme) => {
        localStorage.setItem('theme', theme);
    },

    /**
     * Get the user's system preference for color scheme
     * @returns {string} 'dark' if dark mode is preferred, 'light' otherwise
     */
    getSystemPreference: () => {
        const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
        return darkQuery.matches ? 'dark' : 'light';
    },

    /**
     * Determine which theme to use
     * Prioritizes: stored preference > system preference > default light
     * @returns {string} The theme to apply ('light' or 'dark')
     */
    getPreferredTheme: () => {
        const stored = themeManager.getStoredTheme();
        return stored || themeManager.getSystemPreference();
    },

    /**
     * Apply theme by adding or removing the dark-theme class
     * @param {string} theme The theme to apply ('light' or 'dark')
     */
    applyTheme: (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
        themeManager.updateToggleButton(theme);
    },

    /**
     * Update the theme toggle button to reflect current theme
     * @param {string} theme The currently active theme
     */
    updateToggleButton: (theme) => {
        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            const lightIcon = toggleButton.querySelector('.theme-icon-light');
            const darkIcon = toggleButton.querySelector('.theme-icon-dark');

            if (theme === 'dark') {
                lightIcon.style.display = 'inline';
                darkIcon.style.display = 'none';
            } else {
                lightIcon.style.display = 'none';
                darkIcon.style.display = 'inline';
            }

            toggleButton.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
        }
    },

    /**
     * Toggle between light and dark themes
     * @returns {string} The newly active theme
     */
    toggleTheme: () => {
        const currentTheme = themeManager.getStoredTheme() || themeManager.getSystemPreference();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        themeManager.setStoredTheme(newTheme);
        themeManager.applyTheme(newTheme);

        return newTheme;
    },

    /**
     * Initialize theme system on page load
     * Sets up event listeners and applies initial theme
     */
    init: () => {
        const theme = themeManager.getPreferredTheme();
        themeManager.applyTheme(theme);

        const toggleButton = document.getElementById('theme-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                themeManager.toggleTheme();
            });
        }

        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', (event) => {
            const stored = themeManager.getStoredTheme();
            if (!stored) {
                const systemTheme = event.matches ? 'dark' : 'light';
                themeManager.applyTheme(systemTheme);
            }
        });
    }
};

/**
 * Filter functionality for product categories
 */
const filterManager = {
    /**
     * Filter products by category
     * @param {string} category The category to filter by ('all' shows all products)
     */
    filterProducts: (category) => {
        const products = document.querySelectorAll('.product-card');

        products.forEach((product) => {
            if (category === 'all' || product.dataset.category === category) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    },

    /**
     * Update active state of filter buttons
     * @param {HTMLElement} activeButton The button that was clicked
     */
    updateActiveButton: (activeButton) => {
        const buttons = document.querySelectorAll('.filter-button');
        buttons.forEach((button) => {
            button.classList.remove('active');
        });
        activeButton.classList.add('active');
    },

    /**
     * Initialize filter system
     * Sets up click handlers for all filter buttons
     */
    init: () => {
        const filterButtons = document.querySelectorAll('.filter-button');

        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const { filter } = button.dataset;
                filterManager.filterProducts(filter);
                filterManager.updateActiveButton(button);
            });
        });
    }
};

themeManager.init();
filterManager.init();
