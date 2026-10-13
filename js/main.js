import { loadPlugins } from './plugins.js';
import { loadGames } from './games.js';
import { loadAcademic } from './academic.js';

document.addEventListener('DOMContentLoaded', () => {
  loadPlugins();
  loadGames();
  loadAcademic();
});