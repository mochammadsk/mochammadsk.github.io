export function initTheme() {
  const html = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const logo = document.getElementById('img-logo');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  function setTheme(theme) {
    html.setAttribute('data-bs-theme', theme);

    if (theme === 'dark') {
      themeIcon.className = 'bi bi-brightness-high-fill';
      logo.src = '/assets/images/icons/ul-dark.svg';
    } else {
      themeIcon.className = 'bi bi-moon-stars-fill';
      logo.src = '/assets/images/icons/ul-light.svg';
    }
  }

  setTheme(savedTheme);

  themeButton.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
