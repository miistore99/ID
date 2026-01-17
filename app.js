// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// LINKS
const waLink = (text) => `https://wa.me/${STORE.waNumber}?text=${encodeURIComponent(text)}`;
document.getElementById("orderTop").href = waLink(STORE.waMessage + " (from website)");
document.getElementById("waBtn").href = waLink(STORE.waMessage + " (from social button)");
document.getElementById("igBtn").href = STORE.instagram;
document.getElementById("ytBtn").href = STORE.youtube;
document.getElementById("ttBtn").href = STORE.tiktok;

// RENDER PRODUCTS
const grid = document.getElementById("productGrid");
PRODUCTS.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "card reveal";
  card.style.transitionDelay = `${i * 0.06}s`;

  card.innerHTML = `
    <img class="pimg" src="${p.img}" alt="${p.name}">
    <div class="card-body">
      <h3 class="title">${p.name}</h3>
      <p class="sub">${p.sub}</p>
      <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <div class="actions">
        <a class="btn" target="_blank" rel="noreferrer"
           href="${waLink(STORE.waMessage + p.name)}"
           data-order="1">🟢 ORDER</a>
        <small class="small">Ask price</small>
      </div>
    </div>
  `;
  grid.appendChild(card);
});

// SCROLL REVEAL
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); });
});
document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

// THEME TOGGLE
const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(mode){
  document.body.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
  toggle.textContent = mode === "dark" ? "🌙" : "☀️";
}
toggle.addEventListener("click", () => {
  const cur = document.body.getAttribute("data-theme") || "dark";
  setTheme(cur === "dark" ? "light" : "dark");
});
setTheme(localStorage.getItem("theme") || "dark");

// ORDER COUNTER (hitung klik ORDER)
const countEl = document.getElementById("orderCount");
const resetBtn = document.getElementById("resetOrders");

function getCount(){ return Number(localStorage.getItem("orderCount") || "0"); }
function setCount(v){ localStorage.setItem("orderCount", String(v)); countEl.textContent = v; }
setCount(getCount());

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-order]");
  if(!a) return;
  const v = getCount() + 1;
  setCount(v);
});

resetBtn.addEventListener("click", () => setCount(0));

// FALLING BUBBLES (coklat besar jatuh dari atas)
const wrap = document.getElementById("bubbles");
const BUBBLE_TOTAL = 16;

function spawnBubble(){
  const b = document.createElement("div");
  b.className = "bubble";

  const size = 50 + Math.random() * 90; // besar
  const left = Math.random() * 100;
  const dur  = 9 + Math.random() * 9;
  const delay= Math.random() * 4;
  const drift= (Math.random() * 60 - 30) + "px";

  b.style.width = size + "px";
  b.style.height = size + "px";
  b.style.left = left + "vw";
  b.style.animationDuration = dur + "s";
  b.style.animationDelay = delay + "s";
  b.style.setProperty("--drift", drift);

  wrap.appendChild(b);

  // bersihin setelah animasi
  setTimeout(() => b.remove(), (dur + delay + 1) * 1000);
}

for(let i=0;i<BUBBLE_TOTAL;i++) spawnBubble();
setInterval(spawnBubble, 900);
