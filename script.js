// AOS
AOS.init();

// Theme
const html = document.documentElement;
const themeButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const logo = document.getElementById('site-logo');

const savedTheme = localStorage.getItem('theme') || 'dark';

setTheme(savedTheme);

themeButton.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-bs-theme');

  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  setTheme(newTheme);

  localStorage.setItem('theme', newTheme);
});

function setTheme(theme) {
  html.setAttribute('data-bs-theme', theme);

  if (theme === 'dark') {
    themeIcon.className = 'bi bi-brightness-high-fill';
    logo.src = '/assets/images/logo-dark.svg';
  } else {
    themeIcon.className = 'bi bi-moon-stars-fill';
    logo.src = '/assets/images/logo-light.svg';
  }
}

// Navbar
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('active');

          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  {
    threshold: 0.5,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

// Tooltip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Employment Duration
document.querySelectorAll('.employment-duration').forEach((el) => {
  const start = el.dataset.start;

  const startDate = new Date(start);
  const now = new Date();

  let months =
    (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const startFormatted = startDate.toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  let duration = '';

  if (years > 0) {
    duration += `${years} yr `;
  }

  if (remainingMonths > 0) {
    duration += `${remainingMonths} mos`;
  }

  el.textContent = `${startFormatted} - Present · (${duration})`;
});
