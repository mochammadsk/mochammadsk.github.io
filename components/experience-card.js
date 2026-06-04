import {
  alternatingAos,
  escapeHtml,
  renderDuration,
  renderListItems,
  renderTechBadges,
} from './utils.js';

function renderCompanyLink(company, url) {
  return `
    <a
      href="${escapeHtml(url)}"
      target="_blank"
      class="fw-semibold fs-5 text-decoration-none"
    >
      ${escapeHtml(company)}
      <i class="bi bi-box-arrow-up-right small"></i>
    </a>
  `;
}

function renderMeta(meta) {
  return `
    <span class="d-flex align-items-center gap-1">
      <i class="bi bi-briefcase-fill"></i>
      ${escapeHtml(meta.employmentType)}
    </span>
    <span class="d-flex align-items-center gap-1">
      <i class="bi bi-geo-alt-fill"></i>
      ${escapeHtml(meta.location)}
    </span>
    <span class="d-flex align-items-center gap-1">
      <i class="bi bi-laptop"></i>
      ${escapeHtml(meta.workMode)}
    </span>
  `;
}

export function createExperienceCard(experience, index) {
  return `
    <div class="col-lg-9" data-aos="${alternatingAos(index)}">
      <div class="card border shadow-sm">
        <div class="card-body p-4">
          <div class="mb-3">
            <div
              class="d-flex flex-column flex-md-row justify-content-between align-items-md-start"
            >
              <div>
                ${renderCompanyLink(experience.company, experience.url)}
                <h5 class="fs-6 fw-normal my-1">${escapeHtml(experience.role)}</h5>
              </div>
              <div class="text-body-secondary small mt-1 mt-md-0 text-md-end flex-shrink-0">
                ${renderDuration(experience.period)}
              </div>
            </div>
            <div class="d-flex flex-wrap gap-3 text-body-secondary small">
              ${renderMeta(experience.meta)}
            </div>
          </div>
          ${renderListItems(experience.highlights, { className: 'mb-4' })}
          <div class="d-flex flex-wrap gap-2">
            ${renderTechBadges(experience.technologies)}
          </div>
        </div>
      </div>
    </div>
  `;
}
