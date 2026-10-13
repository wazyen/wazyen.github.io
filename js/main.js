import { initI18n, onLanguageChange, getCurrentLanguage } from './i18n.js';
import { initTheme } from './theme.js';
import { loadPlugins } from './plugins.js';
import { loadGames } from './games.js';
import { loadAcademic } from './academic.js';

function renderContent(lang = getCurrentLanguage()) {
  loadPlugins(lang);
  loadGames(lang);
  loadAcademic(lang);
}

function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    menu.classList.toggle('hidden');

    const openIcon = toggleBtn.querySelector('[data-menu-icon="open"]');
    const closeIcon = toggleBtn.querySelector('[data-menu-icon="close"]');
    if (openIcon && closeIcon) {
      openIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const openIcon = toggleBtn.querySelector('[data-menu-icon="open"]');
      const closeIcon = toggleBtn.querySelector('[data-menu-icon="close"]');
      if (openIcon && closeIcon) {
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();

  onLanguageChange((lang) => {
    renderContent(lang);
  });

  initI18n();
});