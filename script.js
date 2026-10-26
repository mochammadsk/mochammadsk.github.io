// Theme Toggle
document.getElementById('theme-toggle').addEventListener('click', function () {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem('theme', nextTheme);
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

    // Map API data by date for quick lookup.
    const contributionsByDate = new Map(contributions.map((day) => [day.date, day]));

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    };

    // Start on Sunday after the one-year cutoff.
    // This makes the calendar begin with a complete week.
    const today = new Date();
    today.setHours(12, 0, 0, 0);

    const cutoff = new Date(today);
    cutoff.setFullYear(cutoff.getFullYear() - 1);

    const startDate = new Date(cutoff);
    startDate.setDate(startDate.getDate() + ((7 - startDate.getDay()) % 7));

    // If the cutoff is Sunday, start the following Sunday.
    if (startDate.getTime() === cutoff.getTime()) {
      startDate.setDate(startDate.getDate() + 7);
    }

    const calendarFragment = document.createDocumentFragment();
    const monthFragment = document.createDocumentFragment();

    const visibleDays = [];
    const cursor = new Date(startDate);

    while (cursor <= today) {
      const date = new Date(cursor);
      const dateKey = formatDate(date);
      const contribution = contributionsByDate.get(dateKey);

      visibleDays.push({
        date,
        dateKey,
        count: Number(contribution?.count ?? 0),
        level: Math.max(0, Math.min(4, Number(contribution?.level ?? 0))),
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    // Complete the last week with invisible future cells.
    while (visibleDays.length % 7 !== 0) {
      const date = new Date(cursor);

      visibleDays.push({
        date,
        dateKey: formatDate(date),
        count: 0,
        level: 0,
        future: true,
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    const total = data.total?.lastYear;
    totalElement.textContent = `${Number(total ?? 0).toLocaleString()} contributions in the last year`;

    function getOrdinalSuffix(day) {
      if (day >= 11 && day <= 13) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }

    // Render seven days per week, Sunday through Saturday.
    visibleDays.forEach((day, index) => {
      const cell = document.createElement('span');
      cell.className = 'github-day';

      if (day.future) {
        cell.style.visibility = 'hidden';
        cell.setAttribute('aria-hidden', 'true');
      } else {
        cell.className = 'github-day';
        cell.dataset.level = String(day.level);
        cell.title = `${day.count} contributions on ${day.date.toLocaleDateString('en-US', { month: 'short' })} ${day.date.getDate()}${getOrdinalSuffix(day.date.getDate())}`;
      }

      calendarFragment.appendChild(cell);

      // Label the first month and each subsequent month.
      const isFirstDay = day.date.getDate() === 1;
      const isFirstVisibleDay = index === 0;

      if (!day.future && (isFirstVisibleDay || isFirstDay)) {
        const weekIndex = Math.floor(index / 7);
        const label = document.createElement('span');

        label.textContent = day.date.toLocaleString('en', {
          month: 'short',
        });

        label.dataset.weekIndex = String(weekIndex);
        monthFragment.appendChild(label);
      }
    });

    calendar.replaceChildren(calendarFragment);
    months.replaceChildren(monthFragment);

    // Align month labels with their actual week columns.
    function alignMonthLabels() {
      const calendarRect = calendar.getBoundingClientRect();

      months.querySelectorAll('span').forEach((label) => {
        const weekIndex = Number(label.dataset.weekIndex);
        const firstCell = calendar.children[weekIndex * 7];

        if (!firstCell) return;

        const left = firstCell.getBoundingClientRect().left - calendarRect.left;

        label.style.left = `${left}px`;
      });
    }

    requestAnimationFrame(alignMonthLabels);

    if (!window.githubCalendarResizeHandler) {
      window.githubCalendarResizeHandler = () => {
        requestAnimationFrame(alignMonthLabels);
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
