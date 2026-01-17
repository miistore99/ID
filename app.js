/* =========================
   MII STORE - APP.JS
   Render Products + Theme
========================= */

// YEAR AUTO
document.getElementById("year").textContent = new Date().getFullYear();

// RENDER PRODUCTS
const grid = document.getElementById("productGrid");

PRODUCTS.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "card reveal";
  card.style.transitionDelay = `${i * 0.08}s`;

  card.innerHTML = `
    <img src="${p.img}" alt="${p.name}" class="pimg">
    <div class="card-body">
      <h3 class="title">${p.name}</h3>
      <p class="sub">${p.sub}</p>
      <div class="ptags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
      <div class="actions">
        <a class="btn" target="_blank"
          href="https://wa.me/${STORE.waNumber}?text=${encodeURIComponent(STORE.waMessage + ' ' + p.name)}">
          ORDER
        </a>
        <small>Ask price</small>
      </div>
    </div>
  `;
  grid.appendChild(card);
});

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// THEME TOGGLE
const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(mode) {
  root.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
  toggle.textContent = mode === "dark" ? "☀️" : "🌙";
}

toggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

// LOAD SAVED THEME
setTheme(localStorage.getItem("theme") || "dark");
