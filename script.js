// AOS Animation
const isMobile = window.innerWidth < 768;
document.querySelectorAll('[data-aos]').forEach((el) => {
  if (isMobile) {
    const aos = el.dataset.aos;

    if (aos === 'fade-left' || aos === 'fade-right' || aos === 'zoom-in' || aos === 'flip-left') {
      el.dataset.aos = 'fade-up';
    }
  }
});

AOS.init({
  duration: 1000,
  delay: 100,
  offset: 30,
  once: true,
});

// Tooltip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// Theme
const html = document.documentElement;
const themeButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const logo = document.getElementById('img-logo');
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

// Employment Duration
document.querySelectorAll('.employment-duration').forEach((el) => {
  const start = el.dataset.start;
  const end = el.dataset.end;

  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  let months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const startFormatted = startDate.toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  const endFormatted = end
    ? endDate.toLocaleString('en-US', {
        month: 'short',
        year: 'numeric',
      })
    : 'Present';

  const durationParts = [];

  if (years > 0) {
    durationParts.push(`${years} yr`);
  }
  if (remainingMonths > 0) {
    durationParts.push(`${remainingMonths} mos`);
  }

  const duration = durationParts.join(' ');

  el.textContent = `${startFormatted} - ${endFormatted} · ${duration}`;
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();
