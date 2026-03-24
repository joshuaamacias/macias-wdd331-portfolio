document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const navToggle = document.querySelector(".nav-toggle");
  const siteHeader = document.querySelector(".site-header");
  const siteNav = document.getElementById("siteNav");
  const progressBar = document.getElementById("progressBar");
  const revealItems = document.querySelectorAll(".reveal");
  const currentYear = document.getElementById("currentYear");
  const themeToggle = document.getElementById("themeToggle");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  const getStoredTheme = () => localStorage.getItem("theme");

  const setThemeToggleUI = (theme) => {
    if (!themeToggle) return;

    const nextTheme = theme === "dark" ? "light" : "dark";
    themeToggle.setAttribute("aria-pressed", String(theme === "light"));
    themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);

    const label = themeToggle.querySelector(".theme-toggle__text");
    if (label) {
      label.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    }
  };

  const applyTheme = (theme, shouldStore = true) => {
    root.dataset.theme = theme;
    setThemeToggleUI(theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#050505" : "#f7f4ec");
    }

    if (shouldStore) {
      localStorage.setItem("theme", theme);
    }
  };

  const initialTheme = root.dataset.theme || getStoredTheme() || (systemTheme.matches ? "dark" : "light");
  applyTheme(initialTheme, Boolean(getStoredTheme()));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }

  systemTheme.addEventListener("change", (event) => {
    if (getStoredTheme()) return;
    applyTheme(event.matches ? "dark" : "light", false);
  });

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteHeader.classList.toggle("is-nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteHeader.classList.remove("is-nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  const updateScrollProgress = () => {
    if (!progressBar) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.transform = `scaleX(${progress / 100})`;
  };

  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });

  if (prefersReducedMotion.matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
});
