// Theme (Light/Dark)
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const currentTheme =
  localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light');
htmlElement.setAttribute('theme', currentTheme);
themeToggle.addEventListener('click', () => {
  const newTheme =
    htmlElement.getAttribute('theme') === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();
