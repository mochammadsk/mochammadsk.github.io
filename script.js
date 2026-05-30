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
    themeIcon.className = 'fa-solid fa-sun';
    logo.src = '/assets/images/logo-dark.svg';
  } else {
    themeIcon.className = 'fa-solid fa-moon';
    logo.src = '/assets/images/logo-light.svg';
  }
}

// Tooltip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
