// YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// THEME (default dark)
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
const themeLabel = toggle.querySelector(".theme-label");

function setTheme(mode){
  root.setAttribute("data-theme", mode);
  localStorage.setItem("theme", mode);
  themeLabel.textContent = mode === "dark" ? "Dark" : "Light";
}
toggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
});
setTheme(localStorage.getItem("theme") || "dark");

// LINKS
const waBase = `https://wa.me/${STORE.waNumber}?text=`;
document.getElementById("waLink").href = waBase + encodeURIComponent("Hi Mii Store! I Want To Order.");
document.getElementById("btnWhatsAppTop").href = waBase + encodeURIComponent("Hi Mii Store! I Want To Order.");
document.getElementById("igLink").href = STORE.instagram;
document.getElementById("ytLink").href = STORE.youtube;
document.getElementById("ttLink").href = STORE.tiktok;

// RENDER PRODUCTS
const grid = document.getElementById("productGrid");

PRODUCTS.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "pcard reveal";
  card.style.transitionDelay = `${i * 0.06}s`;

  const orderLink = waBase + encodeURIComponent(STORE.waMessage + p.name + " (" + p.sub + ")");

  card.innerHTML = `
    <img class="pimg" src="${p.img}" alt="${p.name}" loading="lazy" />
    <div class="pbody">
      <h3 class="ptitle">${p.name}</h3>
      <div class="psub">${p.sub}</div>
      <div class="ptags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      <div class="pactions">
        <a class="order-btn" href="${orderLink}" target="_blank" rel="noopener">Order</a>
        <div class="price-hint">Ask Price</div>
      </div>
    </div>
  `;
  grid.appendChild(card);
});

// REVEAL ON SCROLL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) e.target.classList.add("show");
  });
},{threshold:0.15});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// BUBBLES (falling + drifting)
const bubbles = document.getElementById("bubbles");

function rand(min,max){ return Math.random()*(max-min)+min; }

function spawnBubbles(){
  bubbles.innerHTML = "";

  // Big falling bubbles
  for(let i=0;i<12;i++){
    const b = document.createElement("div");
    b.className = "bubble";
    const size = rand(60, 160);
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${rand(-10, 95)}%`;
    b.style.top = `${rand(-30, -5)}%`;
    b.style.animationDuration = `${rand(9, 18)}s`;
    b.style.animationDelay = `${rand(0, 6)}s`;
    bubbles.appendChild(b);
  }

  // Small drifting bubbles
  for(let i=0;i<18;i++){
    const b = document.createElement("div");
    b.className = "bubble small";
    const size = rand(18, 48);
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;
    b.style.left = `${rand(-10, 95)}%`;
    b.style.top = `${rand(0, 100)}%`;
    b.style.animationDuration = `${rand(10, 22)}s`;
    b.style.animationDelay = `${rand(0, 8)}s`;
    bubbles.appendChild(b);
  }
}

spawnBubbles();

// Re-generate bubbles when theme changes (biar keliatan hidup)
toggle.addEventListener("click", () => {
  setTimeout(spawnBubbles, 120);
});
