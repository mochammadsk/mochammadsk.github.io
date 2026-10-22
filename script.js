document.getElementById('theme-toggle').addEventListener('click', function () {
  var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

document.getElementById('year').textContent = new Date().getFullYear();

// GitHub contribution data.
async function loadGitHubContributions() {
  const calendar = document.getElementById('github-calendar');
  const months = document.getElementById('github-months');
  const totalElement = document.getElementById('github-total');
  const errorElement = document.getElementById('github-error');

  try {
    const response = await fetch(
      'https://github-contributions-api.jogruber.de/v4/mochammadsk?y=last'
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const contributions = data.contributions ?? [];
    if (!contributions.length) throw new Error('No contribution data found.');

    const total = contributions.reduce((sum, day) => sum + Number(day.count || 0), 0);
    totalElement.textContent = `${total.toLocaleString()} contributions in the last year`;

    const calendarFragment = document.createDocumentFragment();
    const monthFragment = document.createDocumentFragment();

    // Normalize Sunday=0 to the calendar's first row.
    const firstDate = new Date(`${contributions[0].date}T12:00:00`);
    const leadingDays = firstDate.getDay();
    for (let i = 0; i < leadingDays; i++) {
      const emptyCell = document.createElement('span');
      emptyCell.className = 'github-day';
      emptyCell.style.visibility = 'hidden';
      emptyCell.setAttribute('aria-hidden', 'true');
      calendarFragment.appendChild(emptyCell);
    }

    let lastLabelWeek = -2;

    contributions.forEach((day, index) => {
      const date = new Date(`${day.date}T12:00:00`);
      const weekIndex = Math.floor((leadingDays + index) / 7);

      if (index === 0 || date.getDate() === 1) {
        if (weekIndex - lastLabelWeek >= 2) {
          const label = document.createElement('span');
          label.textContent = date.toLocaleString('en', { month: 'short' });
          label.style.left = `${(weekIndex + 1) * 15}px`;
          monthFragment.appendChild(label);
          lastLabelWeek = weekIndex;
        }
      }

      const count = Number(day.count || 0);
      const level = Math.max(0, Math.min(4, Number(day.level) || 0));
      const cell = document.createElement('span');
      cell.className = 'github-day';
      cell.dataset.level = String(level);
      cell.title = `${count} contributions on ${day.date}`;
      cell.setAttribute('aria-label', cell.title);
      calendarFragment.appendChild(cell);
    });

    calendar.replaceChildren(calendarFragment);
    months.replaceChildren(monthFragment);
    errorElement.textContent = '';
  } catch (error) {
    console.error('Failed to load GitHub contributions:', error);
    totalElement.textContent = 'GitHub contributions';
    errorElement.textContent = 'Unable to load contributions right now. Please try again later.';
  }
}

loadGitHubContributions();
