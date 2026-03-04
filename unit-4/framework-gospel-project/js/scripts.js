/* =========================================
   Gospel Project JS
   - Theme toggle (persisted)
   - Reflection save (localStorage)
   - Copy-to-clipboard + toast
   - Shuffle themes / pick random theme
   ========================================= */

(() => {
  const STORAGE = {
    theme: "gospelTheme",
    reflection: "gospelReflection"
  };

  // Elements
  const themeToggleBtn = document.getElementById("themeToggle");
  const latestReflectionEl = document.getElementById("latestReflection");

  const reflectionForm = document.getElementById("reflectionForm");
  const reflectionText = document.getElementById("reflectionText");
  const charCount = document.getElementById("charCount");
  const clearReflectionBtn = document.getElementById("clearReflection");

  const toastEl = document.getElementById("appToast");
  const toastBody = document.getElementById("toastBody");
  const toast = toastEl ? bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 1800 }) : null;

  const notes = document.querySelectorAll(".note-item");
  const copyVerseRefBtn = document.getElementById("copyVerseRef");

  const shuffleThemesBtn = document.getElementById("shuffleThemes");
  const themesGrid = document.getElementById("themesGrid");
  const pickThemeBtn = document.getElementById("pickThemeBtn");

  // -----------------------
  // Helpers
  // -----------------------
  function showToast(message) {
    if (!toast) return;
    toastBody.textContent = message;
    toast.show();
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`Copied: ${text}`);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast(`Copied: ${text}`);
    }
  }

  function setTheme(theme) {
    // theme: "dark" | "light"
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem(STORAGE.theme, theme);
  }

  function getTheme() {
    return localStorage.getItem(STORAGE.theme) || "dark";
  }

  function updateCharCount() {
    if (!reflectionText || !charCount) return;
    const len = reflectionText.value.length;
    charCount.textContent = `${len} / 600`;
  }

  function renderLatestReflection(text, savedAt) {
    if (!latestReflectionEl) return;

    if (!text) {
      latestReflectionEl.innerHTML = `<span class="text-secondary">Nothing saved yet. Write one!</span>`;
      return;
    }

    const date = savedAt ? new Date(savedAt) : null;
    const stamp = date ? date.toLocaleString() : "";

    latestReflectionEl.innerHTML = `
      <div class="d-flex flex-column gap-2">
        <div class="small text-secondary">Saved: ${stamp}</div>
        <div>${escapeHtml(text).replace(/\n/g, "<br>")}</div>
      </div>
    `;
  }

  function escapeHtml(str) {
    return str
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function loadReflection() {
    try {
      const raw = localStorage.getItem(STORAGE.reflection);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function saveReflection(text) {
    const payload = { text, savedAt: Date.now() };
    localStorage.setItem(STORAGE.reflection, JSON.stringify(payload));
    return payload;
  }

  function clearReflection() {
    localStorage.removeItem(STORAGE.reflection);
  }

  function shuffleChildren(container) {
    if (!container) return;
    const items = Array.from(container.children);
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    items.forEach(el => container.appendChild(el));
  }

  // -----------------------
  // Init
  // -----------------------
  // Apply theme
  setTheme(getTheme());

  // Load reflection (latest box + modal textarea)
  const saved = loadReflection();
  if (saved?.text) {
    if (reflectionText) reflectionText.value = saved.text;
    renderLatestReflection(saved.text, saved.savedAt);
  } else {
    renderLatestReflection("", null);
  }
  updateCharCount();

  // -----------------------
  // Events
  // -----------------------
  // Theme toggle
  themeToggleBtn?.addEventListener("click", () => {
    const current = getTheme();
    setTheme(current === "dark" ? "light" : "dark");
    showToast(`Theme: ${getTheme()}`);
  });

  // Copy note references
  notes.forEach(btn => {
    btn.addEventListener("click", () => {
      const ref = btn.getAttribute("data-copy");
      if (ref) copyText(ref);
    });
  });

  copyVerseRefBtn?.addEventListener("click", () => {
    const ref = copyVerseRefBtn.getAttribute("data-copy");
    if (ref) copyText(ref);
  });

  // Reflection typing
  reflectionText?.addEventListener("input", updateCharCount);

  // Reflection submit
  reflectionForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = reflectionText.value.trim();

    if (!text) {
      showToast("Write something first.");
      reflectionText.focus();
      return;
    }

    const payload = saveReflection(text);
    renderLatestReflection(payload.text, payload.savedAt);
    showToast("Reflection saved.");

    // Close modal
    const modalEl = document.getElementById("reflectionModal");
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl) || bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.hide();
    }
  });

  // Clear reflection
  clearReflectionBtn?.addEventListener("click", () => {
    reflectionText.value = "";
    updateCharCount();
    clearReflection();
    renderLatestReflection("", null);
    showToast("Cleared.");
  });

  // Shuffle themes
  shuffleThemesBtn?.addEventListener("click", () => {
    shuffleChildren(themesGrid);
    showToast("Themes shuffled.");
  });

  // Pick a theme for me
  pickThemeBtn?.addEventListener("click", () => {
    const cards = themesGrid ? Array.from(themesGrid.querySelectorAll(".theme-card")) : [];
    if (!cards.length) return;

    const pick = cards[Math.floor(Math.random() * cards.length)];
    pick.scrollIntoView({ behavior: "smooth", block: "center" });

    // quick highlight
    pick.classList.add("picked");
    setTimeout(() => pick.classList.remove("picked"), 900);

    const title = pick.querySelector("h3")?.textContent?.trim() || "Theme";
    showToast(`Try: ${title}`);
  });

})();