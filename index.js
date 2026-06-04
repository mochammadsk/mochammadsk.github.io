import { renderEducation } from './components/render-education.js';
import { renderExperience } from './components/render-experience.js';
import { renderProjects } from './components/render-projects.js';
import { initAos } from './js/aos.js';
import { initEmploymentDuration } from './js/employment-duration.js';
import { initNavbar } from './js/navbar.js';
import { initTheme } from './js/theme.js';
import { initTooltips } from './js/tooltips.js';
import { initYear } from './js/year.js';

renderExperience();
renderEducation();
renderProjects();

initEmploymentDuration();
initAos();
initTooltips();
initTheme();
initNavbar();
initYear();
