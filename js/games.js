export function loadGames() {
  const container = document.getElementById('steam-games');
  const template = document.getElementById('game-card-template');
  if (!container || !template) return;

  fetch('data/games.json')
    .then(res => res.json())
    .then(games => {
      games.forEach(g => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('[data-img]').src = g.thumbnail;
        clone.querySelector('[data-img]').alt = g.title;
        clone.querySelector('[data-title]').textContent = g.title;
        clone.querySelector('[data-year]').textContent = g.year;
        clone.querySelector('[data-subtitle]').textContent = g.subtitle;
        clone.querySelector('[data-description]').textContent = g.description;

        const linksContainer = clone.querySelector('[data-links]');
        const entries = Object.entries(g.links);
        if (entries.length > 0) {
          entries.forEach(([label, url]) => {
            const a = document.createElement('a');
            a.href = url;
            a.target = "_blank";
            a.className = "inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300";
            a.innerHTML = `${label} <i data-lucide="external-link" class="w-3.5 h-3.5"></i>`;
            linksContainer.appendChild(a);
          });
        } else {
          const span = document.createElement('span');
          span.className = "text-xs text-slate-600 italic";
          span.textContent = "Unannounced Commercial Title";
          linksContainer.appendChild(span);
        }

        container.appendChild(clone);
      });
      if (window.lucide) lucide.createIcons();
    })
    .catch(err => console.error('Error loading games:', err));
}