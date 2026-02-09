/**
 * Conditional CSS Loading
 * This script attempts to load the processed CSS file (main.min.css) if it exists,
 * otherwise falls back to the source file (main.css).
 *
 * NOTE: This is non-standard practice. We are doing this for convenience in this
 * assignment so you can test both the source and processed CSS files easily.
 * In production, you would use a build process that only deploys the processed files.
 */
(async() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    try {
        const res = await fetch('./css/main.min.css', { method: 'HEAD' });
        link.href = res.ok ? './css/main.min.css' : './css/main.css';
    } catch {
        link.href = './css/main.css';
    }
    document.head.appendChild(link);
})();

/**
 * LocalStorage-backed color mode (light/dark) toggle. Self-contained IIFE; no globals.
 */
(() => {
    const STORAGE_KEY = 'colorMode';

    /**
     * @returns {'light' | 'dark' | null} Stored preference or null if not set.
     */
    const getStored = () => {
        const v = localStorage.getItem(STORAGE_KEY);
        return v === 'light' || v === 'dark' ? v : null;
    };

    /**
     * @param {'light' | 'dark'} value
     */
    const setStored = (value) => {
        localStorage.setItem(STORAGE_KEY, value);
    };

    /**
     * Apply theme to document: add/remove .light / .dark on <html>.
     * Updates toggle button aria-pressed when present.
     * @param {'light' | 'dark'} theme
     */
    const applyTheme = (theme) => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        const btn = document.getElementById('color-mode-toggle');
        if (btn) {
            btn.setAttribute('aria-pressed', theme === 'dark');
        }
    };

    /**
     * Get effective theme (stored preference or system).
     * @returns {'light' | 'dark'}
     */
    const getEffectiveTheme = () => {
        const stored = getStored();
        if (stored !== null) {
            return stored;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    /**
     * Toggle between light and dark and persist.
     */
    const toggleColorMode = () => {
        const next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
        setStored(next);
        applyTheme(next);
    };

    /**
     * Sync toggle button aria-pressed to current theme and attach click listener.
     * Runs on DOMContentLoaded because script is in head (button not in DOM yet).
     */
    const init = () => {
        const btn = document.getElementById('color-mode-toggle');
        if (btn) {
            btn.setAttribute('aria-pressed', getEffectiveTheme() === 'dark');
            btn.addEventListener('click', toggleColorMode);
        }
    };

    /* Apply stored theme to <html> immediately (script runs from head, body not yet parsed). */
    const stored = getStored();
    if (stored !== null) {
        document.documentElement.classList.add(stored);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
