import { initData } from './data.js';
import { renderAuthors, setupAuthorHandlers } from './authors.js';
import { renderBooks, setupBookHandlers, updateFormSelects } from './books.js';
import { renderGenres, setupGenreHandlers } from './genres.js';

document.addEventListener('DOMContentLoaded', () => {
  initData();

  renderAuthors();
  renderBooks();
  renderGenres();
  updateFormSelects();

  setupAuthorHandlers();
  setupBookHandlers();
  setupGenreHandlers();
  setupTabNavigation();
});

function setupTabNavigation() {
  const tabs = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.view-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Switch active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show specific section
      const targetId = tab.id.replace('nav-', 'section-');

      sections.forEach(section => {
        section.classList.toggle('hidden', section.id !== targetId);
        section.classList.toggle('active', section.id === targetId);
      });
    });
  });
}
