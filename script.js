const $ = (sel) => document.querySelector(sel);
const root = document.documentElement;
const THEME_KEY = 'pref-theme';

// Update year in footer
const el = document.getElementById('year');
if (el) el.textContent = new Date().getFullYear();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#' || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Theme toggle
function setTheme(mode) {
  const isDark = mode === 'dark';
  if (isDark) root.setAttribute('theme', 'dark');
  else root.removeAttribute('theme');

  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

function initTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') {
    setTheme(stored);
  } else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
}

// Button toggle theme
function bindProfileBadgeToggle() {
  const btn = $('.theme-toogle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isDark = root.getAttribute('theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });
}

initTheme();
bindProfileBadgeToggle();

if (window.matchMedia) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', (e) => {
    const stored = localStorage.getItem(THEME_KEY);
    if (!stored) setTheme(e.matches ? 'dark' : 'light');
  });
}

// Scroll-spy for navbar active link
(function () {
  const nav = document.querySelector('header');
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;

  const items = links
    .map((a) => {
      const id = a.getAttribute('href').slice(1);
      const sec = document.getElementById(id);
      return { a, sec };
    })
    .filter((x) => x.sec);

  // Helper: set active link
  function setActive(link) {
    links.forEach((l) => l.classList.remove('active'));
    if (link) link.classList.add('active');
  }

  // Helper: click link to set active
  links.forEach((l) => {
    l.addEventListener('click', () => setActive(l));
  });

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    requestAnimationFrame(() => {
      const navH = (document.querySelector('.navbar')?.offsetHeight || 64) + 12;
      let current = null;

      for (const { a, sec } of items) {
        const top = sec.getBoundingClientRect().top - navH;
        if (top <= 0) current = a;
      }
      setActive(current || links[0]);
      ticking = false;
    });
    ticking = true;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);
})();

// Reveal on scroll
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  },
  {
    threshold: 0.15,
  }
);
revealElements.forEach((el) => observer.observe(el));
