import { updateAllTagColors } from './tags.js';

export function isDarkMode() {
  return document.documentElement.classList.contains('dark');
}

export function updateThemeIcons(isDark) {
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    const moon = btn.querySelector('[data-theme-icon="moon"]');
    const sun = btn.querySelector('[data-theme-icon="sun"]');
    if (moon && sun) {
      if (isDark) {
        moon.classList.remove('hidden');
        sun.classList.add('hidden');
      } else {
        moon.classList.add('hidden');
        sun.classList.remove('hidden');
      }
    }
  });
}

export function setTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }

  updateThemeIcons(isDark);
  updateAllTagColors(isDark);

  if (window.lucide) {
    lucide.createIcons();
  }
}

export function toggleTheme() {
  setTheme(!isDarkMode());
}

export function initTheme() {
  const isDark = isDarkMode();
  updateThemeIcons(isDark);
  updateAllTagColors(isDark);

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches);
    }
  });
}
