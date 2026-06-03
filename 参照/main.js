// 伊藤英次ポートフォリオ - interactions

const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
const backToTop = document.querySelector(".back-to-top");
const protectedSelector = "img, .work-image, .profile-icon, .portfolio-link, a[href^='素材/']";
const revealTargets = document.querySelectorAll(".section-head, .work-subhead, .work-card, .portfolio-link");

function protectPortfolioAssets() {
  document.querySelectorAll("img").forEach((image) => {
    image.setAttribute("draggable", "false");
  });

  document.addEventListener("contextmenu", (event) => {
    if (event.target.closest(protectedSelector)) event.preventDefault();
  });

  document.addEventListener("dragstart", (event) => {
    if (event.target.closest(protectedSelector)) event.preventDefault();
  });

  document.addEventListener("auxclick", (event) => {
    if (event.target.closest("a[href^='素材/']")) event.preventDefault();
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if ((event.metaKey || event.ctrlKey) && ["s", "u"].includes(key)) {
      event.preventDefault();
    }
  });
}

function setRevealDefaults() {
  revealTargets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.setProperty("--delay", `${Math.min(index % 5, 4) * 42}ms`);
  });
}

function updateHeaderState() {
  const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
  header?.classList.toggle("is-raised", window.scrollY > heroBottom - 80);
}

function revealOnScroll() {
  document.body.classList.add("has-scrolled");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    }, { threshold: 0.12, rootMargin: "-4% 0px -4% 0px" });

    revealTargets.forEach((target) => observer.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }
}

function bindBackToTop() {
  backToTop?.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
}

protectPortfolioAssets();
setRevealDefaults();
updateHeaderState();
bindBackToTop();

window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("resize", updateHeaderState);

if (window.scrollY > 8) {
  revealOnScroll();
} else {
  window.addEventListener("scroll", revealOnScroll, { once: true, passive: true });
}
