// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', function () {
  var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Year (footer)
document.getElementById('year').textContent = new Date().getFullYear();

// GitHub Contributions
async function loadGitHubContributions() {
  const calendar = document.getElementById('github-calendar');
  const months = document.getElementById('github-months');
  const totalElement = document.getElementById('github-total');
  const errorElement = document.getElementById('github-error');

  if (!calendar || !months || !totalElement || !errorElement) return;

  try {
    const response = await fetch(
      'https://github-contributions-api.jogruber.de/v4/mochammadsk?y=last'
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const contributions = data.contributions ?? [];

    if (!contributions.length) {
      throw new Error('No contribution data found.');
    }

    const total = contributions.reduce((sum, day) => sum + Number(day.count || 0), 0);

    totalElement.textContent = `${total.toLocaleString()} contributions in the last year`;

    const calendarFragment = document.createDocumentFragment();
    const monthFragment = document.createDocumentFragment();

    const firstDate = new Date(`${contributions[0].date}T12:00:00`);
    const leadingDays = firstDate.getDay();

    // invisible cells so the first date aligns with its weekday.
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

          label.textContent = date.toLocaleString('en', {
            month: 'short',
          });

          // Save week index (calculate the actual position after layout)
          label.dataset.weekIndex = String(weekIndex);
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

    // align month labels with the actual rendered week columns.
    function alignMonthLabels() {
      const calendarRect = calendar.getBoundingClientRect();

      months.querySelectorAll('span').forEach((label) => {
        const weekIndex = Number(label.dataset.weekIndex);
        const firstCell = calendar.children[weekIndex * 7];

        if (!firstCell) return;

        const cellRect = firstCell.getBoundingClientRect();
        const left = cellRect.left - calendarRect.left;

        label.style.left = `${left}px`;
      });
    }

    // Wait for the browser to calculate the flexible grid columns.
    requestAnimationFrame(alignMonthLabels);

    // Re-align labels when the viewport changes size.
    if (!window.githubCalendarResizeHandler) {
      window.githubCalendarResizeHandler = () => {
        requestAnimationFrame(() => {
          const currentCalendar = document.getElementById('github-calendar');
          const currentMonths = document.getElementById('github-months');

          if (!currentCalendar || !currentMonths) return;

          const calendarRect = currentCalendar.getBoundingClientRect();

          currentMonths.querySelectorAll('span').forEach((label) => {
            const weekIndex = Number(label.dataset.weekIndex);
            const firstCell = currentCalendar.children[weekIndex * 7];

            if (!firstCell) return;

            label.style.left = `${firstCell.getBoundingClientRect().left - calendarRect.left}px`;
          });
        });
      };

      window.addEventListener('resize', window.githubCalendarResizeHandler);
    }

    errorElement.textContent = '';
  } catch (error) {
    console.error('Failed to load GitHub contributions:', error);

    totalElement.textContent = 'GitHub contributions';
    errorElement.textContent = 'Unable to load contributions right now. Please try again later.';
  }
}

loadGitHubContributions();
