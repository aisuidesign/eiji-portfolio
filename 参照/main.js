// 伊藤英次ポートフォリオ - interactions

const header = document.querySelector(".site-header");
const hero = document.querySelector(".hero");
const backToTop = document.querySelector(".back-to-top");
const loader = document.querySelector(".site-loader");
const loaderBar = document.querySelector(".loader-progress-bar");
const loaderPercent = document.querySelector(".loader-percent");
const protectedSelector = "img, .work-image, .profile-icon, .portfolio-link, a[href^='assets/']";
const revealTargets = document.querySelectorAll(".section-head, .work-subhead, .work-card, .portfolio-link");
let loaderProgress = 0;
let loaderHoldAt = 60 + Math.floor(Math.random() * 21);
let loaderReady = false;
let loaderCompleteScheduled = false;

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
    if (event.target.closest("a[href^='assets/']")) event.preventDefault();
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

function bindInternalAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();

      if (hash === "#top") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        return;
      }

      if (hash === "#portfolio-end") {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          left: 0,
          behavior: "smooth"
        });
        return;
      }

      const headerHeight = header?.offsetHeight || 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      const scrollTop = Math.max(0, targetTop - headerHeight - 18);

      window.scrollTo({ top: scrollTop, left: 0, behavior: "smooth" });
    });
  });
}

function setLoaderProgress(value) {
  loaderProgress = Math.max(0, Math.min(100, Math.round(value)));

  if (loaderBar) loaderBar.style.width = `${loaderProgress}%`;
  if (loaderPercent) loaderPercent.textContent = `${loaderProgress}%`;
}

function completeLoader() {
  const timer = window.setInterval(() => {
    const next = loaderProgress + Math.max(2, Math.ceil((100 - loaderProgress) / 5));
    setLoaderProgress(next);

    if (loaderProgress >= 100) {
      window.clearInterval(timer);
      window.setTimeout(() => {
        loader?.classList.add("is-hidden");
      }, 260);
    }
  }, 42);
}

function scheduleLoaderComplete() {
  if (loaderCompleteScheduled) return;
  loaderCompleteScheduled = true;
  window.setTimeout(() => {
    completeLoader();
  }, 420);
}

function markLoaderReady() {
  loaderReady = true;

  if (loaderProgress >= loaderHoldAt) {
    scheduleLoaderComplete();
  }
}

function startLoaderProgress() {
  if (!loader) return;

  setLoaderProgress(0);

  const timer = window.setInterval(() => {
    if (loaderProgress >= loaderHoldAt) {
      setLoaderProgress(loaderHoldAt);
      if (loaderReady) {
        window.clearInterval(timer);
        scheduleLoaderComplete();
      }
      return;
    }

    setLoaderProgress(loaderProgress + 1 + Math.floor(Math.random() * 4));
  }, 46);
}

function hideLoader() {
  if (!loader) return;

  if (loaderProgress >= 100) {
    loader.classList.add("is-hidden");
    return;
  }

  markLoaderReady();
}

if (loader) {
  loader.dataset.startedAt = String(Date.now());
}

protectPortfolioAssets();
setRevealDefaults();
updateHeaderState();
bindInternalAnchorLinks();
startLoaderProgress();

window.addEventListener("scroll", updateHeaderState, { passive: true });
window.addEventListener("resize", updateHeaderState);

if (window.scrollY > 8) {
  revealOnScroll();
} else {
  window.addEventListener("scroll", revealOnScroll, { once: true, passive: true });
}

if (document.readyState === "complete") {
  hideLoader();
} else {
  window.addEventListener("load", hideLoader, { once: true });
}
