import { alternatingAos, escapeHtml, renderDuration, renderListItems } from './utils.js';

function renderInstitutionLink(institution, url) {
  return `
    <a
      href="${escapeHtml(url)}"
      target="_blank"
      class="fw-semibold fs-5 text-decoration-none text-body"
    >
      ${escapeHtml(institution)}
    </a>
  `;
}

export function createEducationCard(entry, index) {
  return `
    <div class="timeline-item" data-aos="${alternatingAos(index)}">
      <div class="timeline-dot"></div>
      <div class="card border shadow-sm">
        <div class="card-body">
          <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-md-start mb-1"
          >
            <div>
              ${renderInstitutionLink(entry.institution, entry.url)}
              <h5 class="fs-6 fw-normal mb-1">${escapeHtml(entry.program)}</h5>
            </div>
            <div class="text-body-secondary small mt-1 mt-md-0 text-md-end flex-shrink-0">
              ${renderDuration(entry.period)}
            </div>
          </div>
          ${renderListItems(entry.highlights)}
        </div>
      </div>
    </div>
  `;
}
