import { projects } from '../data/projects.js';
import { createProjectCard } from './project-card.js';

export function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = projects.map((project) => createProjectCard(project)).join('');
}
