// ====== SETTINGS (UBAH DI SINI) ======
const STORE = {
  sold: 1098, // fixed
  whatsapp: "6282191223912", // ganti kalau perlu
  instagram: "https://instagram.com/asami.am0",
  tiktok: "https://tiktok.com/@mii._002",
  youtube: "https://youtube.com/@asami.0111?si=aCmKvQvwMrfKZgyd"
};

// GANTI nama file gambar sesuai yang ada di folder kamu /ID/
const products = [
  {
    key: "canva",
    name: "Canva Pro",
    meta: "1 Month — Sharing / Private",
    img: "canva.jpg",
    badges: ["Sharing", "Private", "Ask Stock"],
    desc: `Canva Pro For Design Needs.\n\nBenefits:\n• Premium Features\n• Fast Support\n• Sharing / Private Depending On Stock`,
  },
  {
    key: "capcut",
    name: "CapCut Pro",
    meta: "1 Month — Private",
    img: "capcut.jpg",
    badges: ["Private", "No Ads", "Fast"],
    desc: `CapCut Pro Private.\n\nBenefits:\n• No Ads\n• Premium Tools\n• Fast Processing`,
  },
  {
    key: "youtube",
    name: "YouTube Premium",
    meta: "1 Month — Invite",
    img: "youtube.jpg",
    badges: ["Invite", "No Ads", "Ask Stock"],
    desc: `YouTube Premium Via Invite.\n\nBenefits:\n• No Ads\n• Background Play\n• Premium Music`,
  },
  {
    key: "gptgo",
    name: "ChatGPT Go",
    meta: "1 Year — Private",
    img: "chatgpt-go.jpg",
    badges: ["Private", "Fast", "Guided"],
    desc: `ChatGPT Go 1 Year Private.\n\nNotes:\n• Stock May Change\n• Guidance After Purchase`,
  },
  {
    key: "gptplus",
    name: "ChatGPT Plus",
    meta: "1 Month — Sharing / Private",
    img: "chatgpt-plus.jpg",
    badges: ["Sharing", "Private", "Ask Stock"],
    desc: `ChatGPT Plus 1 Month.\n\nBenefits:\n• Faster Access\n• Better Limits\n• Sharing / Private Depending On Stock`,
  },
  {
    key: "gemini1m",
    name: "Gemini Pro",
    meta: "1 Month — Private / Sharing",
    img: "gemini-1m.jpg",
    badges: ["Private", "Sharing", "Ask Stock"],
    desc: `Gemini Pro 1 Month.\n\nBenefits:\n• Premium Access\n• Fast Processing\n• Private / Sharing Depending On Stock`,
  },
  {
    key: "gemini1y",
    name: "Gemini Pro",
    meta: "1 Year — Private / Sharing",
    img: "gemini-1y.jpg",
    badges: ["Private", "Sharing", "Ask Stock"],
    desc: `Gemini Pro 1 Year.\n\nBenefits:\n• Long Term Plan\n• Premium Access\n• Private / Sharing Depending On Stock`,
  },
  {
    key: "spotify",
    name: "Spotify Premium",
    meta: "3 Months — Private",
    img: "spotify.jpg",
    badges: ["Private", "Music", "Fast"],
    desc: `Spotify Premium 3 Months Private.\n\nBenefits:\n• Ad-Free Music\n• Offline Download\n• High Quality Audio`,
  },
  {
    key: "alight",
    name: "Alight Motion",
    meta: "1 Year — Private",
    img: "alight.jpg",
    badges: ["Private", "Editor", "Long Term"],
    desc: `Alight Motion Premium 1 Year Private.\n\nBenefits:\n• No Watermark\n• No Ads\n• Support Android / iOS\n• Support XML 5MB`,
  },
];

// ====== HELPERS ======
function waLink(productName) {
  const msg =
`Hello Mii Store, I Want To Order:

Product: ${productName}

My Name:
My Email:
My Phone:
Notes (Sharing/Private If Available):

Thank You.`;
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function setLinks() {
  const wa = `https://wa.me/${STORE.whatsapp}`;
  // top buttons
  document.getElementById("orderWhatsAppTop").href = waLink("Ask Product List");
  // social icons
  document.getElementById("socWa").href = wa;
  document.getElementById("socIg").href = STORE.instagram;
  document.getElementById("socTt").href = STORE.tiktok;
  document.getElementById("socYt").href = STORE.youtube;

  // social section
  document.getElementById("bigWa").href = wa;
  document.getElementById("bigIg").href = STORE.instagram;
  document.getElementById("bigTt").href = STORE.tiktok;
  document.getElementById("bigYt").href = STORE.youtube;
}

function buildProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  products.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "card reveal";
    card.style.transitionDelay = `${Math.min(idx * 40, 240)}ms`;

    card.innerHTML = `
      <img class="cardImg" src="${p.img}" alt="${p.name}" loading="lazy"
        onerror="this.style.opacity=.15; this.style.filter='grayscale(1)'; this.title='Image Not Found: ${p.img}'" />
      <div class="cardBody">
        <div class="cardName">${p.name}</div>
        <div class="cardMeta">${p.meta}</div>
        <div class="badges">
          ${p.badges.map(b => `<span class="badge">${b}</span>`).join("")}
        </div>
        <div class="cardActions">
          <a class="btn btnGreen" href="${waLink(p.name)}" target="_blank" rel="noopener">Order</a>
          <button class="btn btnGhost" data-detail="${p.key}">Detail</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function modalLogic() {
  const modal = document.getElementById("modal");
  const closeAll = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  };

  document.addEventListener("click", (e) => {
    const close = e.target && e.target.getAttribute("data-close");
    if (close) closeAll();

    const btn = e.target && e.target.closest && e.target.closest("[data-detail]");
    if (!btn) return;

    const key = btn.getAttribute("data-detail");
    const p = products.find(x => x.key === key);
    if (!p) return;

    document.getElementById("modalImg").src = p.img;
    document.getElementById("modalImg").alt = p.name;

    document.getElementById("modalName").textContent = p.name;
    document.getElementById("modalMeta").textContent = p.meta;

    const badges = document.getElementById("modalBadges");
    badges.innerHTML = p.badges.map(b => `<span class="badge">${b}</span>`).join("");

    document.getElementById("modalDesc").innerHTML =
      p.desc.replaceAll("\n", "<br>");

    const order = document.getElementById("modalOrder");
    order.href = waLink(p.name);

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });
}

function themeToggle() {
  const btn = document.getElementById("themeToggle");
  const label = document.getElementById("themeLabel");
  const saved = localStorage.getItem("mii_theme");
  if (saved === "light") {
    document.body.classList.remove("theme-dark");
    document.body.classList.add("theme-light");
    label.textContent = "Dark";
  } else {
    label.textContent = "Light";
  }

  btn.addEventListener("click", () => {
    const isLight = document.body.classList.contains("theme-light");
    document.body.classList.toggle("theme-light", !isLight);
    document.body.classList.toggle("theme-dark", isLight);
    localStorage.setItem("mii_theme", isLight ? "dark" : "light");
    label.textContent = isLight ? "Light" : "Dark";
  });
}

function revealOnScroll() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add("show");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

function bubbles() {
  const holder = document.getElementById("bubbles");
  if (!holder) return;

  holder.innerHTML = "";
  const count = 16; // halus, tidak ganggu

  for (let i = 0; i < count; i++) {
    const b = document.createElement("div");
    b.className = "bubble";

    const size = 14 + Math.random() * 34;
    b.style.width = `${size}px`;
    b.style.height = `${size}px`;

    b.style.left = `${Math.random() * 100}%`;
    b.style.top = `${60 + Math.random() * 60}%`;

    const dur = 10 + Math.random() * 14;
    const delay = Math.random() * 10;
    const drift = (Math.random() * 120 - 60).toFixed(0) + "px";

    b.style.setProperty("--drift", drift);
    b.style.animationDuration = `${dur}s`;
    b.style.animationDelay = `-${delay}s`;

    holder.appendChild(b);
  }
}

(function init(){
  setLinks();
  themeToggle();
  buildProducts();
  modalLogic();
  revealOnScroll();
  bubbles();
})();
