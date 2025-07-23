const htmlElement = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const logoImg = document.getElementById('logo');
const sidebar = document.querySelector('.sidebar');

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
themeToggle.checked = currentTheme === 'dark';
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

// Toggle Sidebar
menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Close Sidebar on Outside Click
document.addEventListener('click', (event) => {
  const isClickInsideSidebar = sidebar.contains(event.target);
  const isClickOnMenuToggle = menuToggle.contains(event.target);

  if (
    sidebar.classList.contains('active') &&
    !isClickInsideSidebar &&
    !isClickOnMenuToggle
  ) {
    sidebar.classList.remove('active');
  }
});
