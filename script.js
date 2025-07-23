const htmlElement = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const logoImg = document.getElementById('logo');

// Update Logo
function updateLogo(theme) {
  const logoPath =
    theme === 'dark' ? 'images/logo-light.png' : 'images/logo-dark.png';
  logoImg.setAttribute('src', logoPath);
}

// Set Initial Theme
const currentTheme =
  localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light');

htmlElement.setAttribute('theme', currentTheme);
updateLogo(currentTheme);

themeToggle.addEventListener('click', () => {
  const newTheme =
    htmlElement.getAttribute('theme') === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateLogo(newTheme);
});

// Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();
