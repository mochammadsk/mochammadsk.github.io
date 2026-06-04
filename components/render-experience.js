import { experiences } from '../data/experience.js';
import { createExperienceCard } from './experience-card.js';

export function renderExperience() {
  const container = document.getElementById('experience-container');
  if (!container) return;

  container.innerHTML = experiences
    .map((experience, index) => createExperienceCard(experience, index))
    .join('');
}
