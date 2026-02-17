const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  body.classList.add(savedTheme);
  updateIcon(savedTheme);
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  const currentTheme = body.classList.contains("dark")
    ? "dark"
    : "light";

  localStorage.setItem("theme", currentTheme);
  updateIcon(currentTheme);
});

function updateIcon(theme) {
  toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
}
