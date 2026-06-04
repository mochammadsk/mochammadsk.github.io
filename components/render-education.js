import { education } from '../data/education.js';
import { createEducationCard } from './education-card.js';

export function renderEducation() {
  const container = document.getElementById('education-container');
  if (!container) return;

  container.innerHTML = education
    .map((entry, index) => createEducationCard(entry, index))
    .join('');
}
