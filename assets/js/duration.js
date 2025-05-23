window.addEventListener('DOMContentLoaded', () => {
  const spans = document.querySelectorAll('.duration');

  spans.forEach((span) => {
    const parent = span.closest('small');
    const em = parent.querySelector('em');
    if (!em) return;

    const [startText, endText] = em.textContent.split(' - ');
    const start = new Date(startText + ' 1');
    const today = new Date();

    const end =
      endText.trim() === 'Present'
        ? new Date(today.getFullYear(), today.getMonth(), 1)
        : new Date(endText + ' 1');

    let months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1; // ← ini penting

    const years = Math.floor(months / 12);
    months = months % 12;

    const durationText =
      years > 0 && months > 0
        ? ` ${years} year${years > 1 ? 's' : ''} ${months} month${
            months > 1 ? 's' : ''
          }`
        : years > 0
        ? ` ${years} year${years > 1 ? 's' : ''}`
        : ` ${months} month${months > 1 ? 's' : ''}`;

    span.textContent = durationText;
  });
});
