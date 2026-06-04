export function initEmploymentDuration() {
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
}
