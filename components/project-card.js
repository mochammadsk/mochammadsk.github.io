import { escapeHtml } from './utils.js';

function renderActionButton(link, { variant, fallbackLabel }) {
  const label = escapeHtml(link?.label ?? fallbackLabel);

  if (!link?.url) {
    return `<button type="button" class="btn btn-${variant}" disabled>${label}</button>`;
  }

  return `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-${variant}">${label}</a>`;
}

function renderCarousel(project) {
  const carouselId = `${project.id}-carousel`;
  const imageClass = project.imageClass ?? 'd-block w-100';

  const indicators = project.images
    .map(
      (_, index) => `
        <button
          type="button"
          data-bs-target="#${carouselId}"
          data-bs-slide-to="${index}"
          ${index === 0 ? 'class="active" aria-current="true"' : ''}
          aria-label="Slide ${index + 1}"
        ></button>
      `
    )
    .join('');

  const slides = project.images
    .map(
      (src, index) => `
        <div class="carousel-item${index === 0 ? ' active' : ''}">
          <img
            src="${escapeHtml(src)}"
            class="${imageClass}"
            alt="${escapeHtml(project.title)} screenshot ${index + 1}"
          />
        </div>
      `
    )
    .join('');

  return `
    <div
      id="${carouselId}"
      class="project-carousel carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">${indicators}</div>
      <div class="carousel-inner">${slides}</div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#${carouselId}"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#${carouselId}"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
}

export function createProjectCard(project) {
  const techBadges = project.technologies
    .map((tech) => `<span class="badge border text-body">${escapeHtml(tech)}</span>`)
    .join('');

  return `
    <div class="col-12 col-md-6" data-aos="fade-up">
      <div class="card h-100 shadow-sm">
        ${renderCarousel(project)}
        <div class="card-body">
          <h5 class="card-title fw-semibold">${escapeHtml(project.title)}</h5>
          <p class="card-text text-body-secondary">${escapeHtml(project.description)}</p>
          <div class="d-flex flex-wrap gap-2 mb-3">${techBadges}</div>
          <div class="d-flex gap-2">
            ${renderActionButton(project.links.demo, {
              variant: 'primary',
              fallbackLabel: 'Live Demo',
            })}
            ${renderActionButton(project.links.github, {
              variant: 'outline-secondary',
              fallbackLabel: 'GitHub',
            })}
          </div>
        </div>
      </div>
    </div>
  `;
}
