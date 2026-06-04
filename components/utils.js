export function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function renderDuration({ start, end }) {
  const endAttr = end ? ` data-end="${escapeHtml(end)}"` : '';
  return `<span class="employment-duration" data-start="${escapeHtml(start)}"${endAttr}></span>`;
}

export function renderListItems(items, { className = '' } = {}) {
  const listClass = className ? ` class="${className}"` : '';
  const listItems = items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  return `<ul${listClass}>${listItems}</ul>`;
}

export function renderTechBadges(technologies) {
  return technologies
    .map((tech) => `<span class="badge border text-body">${escapeHtml(tech)}</span>`)
    .join('');
}

export function alternatingAos(index, even = 'fade-right', odd = 'fade-left') {
  return index % 2 === 0 ? even : odd;
}
