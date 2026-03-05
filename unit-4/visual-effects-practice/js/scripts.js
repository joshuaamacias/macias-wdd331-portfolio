(() => {
  const STORAGE_KEY = "bom_visual_effects_note";

  const form = document.getElementById("noteForm");
  const textarea = document.getElementById("note");
  const count = document.getElementById("count");
  const latest = document.getElementById("latest");

  function escapeHtml(str) {
    return str
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function updateCount() {
    const len = textarea.value.length;
    count.textContent = `${len} / 400`;
  }

  function renderSaved() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      latest.innerHTML = `<span class="muted">Nothing saved yet.</span>`;
      return;
    }

    try {
      const data = JSON.parse(raw);
      const when = new Date(data.savedAt).toLocaleString();
      latest.innerHTML = `
        <div class="tiny muted">Saved: ${when}</div>
        <div>${escapeHtml(data.text).replace(/\n/g, "<br>")}</div>
      `;
    } catch {
      latest.innerHTML = `<span class="muted">Nothing saved yet.</span>`;
    }
  }

  // init
  updateCount();
  renderSaved();

  textarea.addEventListener("input", updateCount);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = textarea.value.trim();
    if (!text) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ text, savedAt: Date.now() })
    );

    renderSaved();
  });
})();