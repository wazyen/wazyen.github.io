export function loadAcademic() {
  const container = document.getElementById('academic-grid');
  const template = document.getElementById('academic-card-template');
  if (!container || !template) return;

  fetch('data/academic.json')
    .then(res => res.json())
    .then(projects => {
      projects.forEach(p => {
        const clone = template.content.cloneNode(true);

        clone.querySelector('[data-img]').src = p.thumbnail;
        clone.querySelector('[data-img]').alt = p.title;
        clone.querySelector('[data-title]').textContent = p.title;
        clone.querySelector('[data-year]').textContent = p.year;
        clone.querySelector('[data-subtitle]').textContent = p.subtitle;
        clone.querySelector('[data-description]').textContent = p.description;

        const tagsContainer = clone.querySelector('[data-tags]');
        p.tags.forEach(t => {
          const span = document.createElement('span');
          span.className = "px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300";
          span.textContent = t;
          tagsContainer.appendChild(span);
        });

        const linksContainer = clone.querySelector('[data-links]');
        Object.entries(p.links).forEach(([label, url]) => {
          const a = document.createElement('a');
          a.href = url;
          a.target = "_blank";
          a.className = "inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 mr-3";
          a.innerHTML = `${label} <i data-lucide="external-link" class="w-3.5 h-3.5"></i>`;
          linksContainer.appendChild(a);
        });

        container.appendChild(clone);
      });
      if (window.lucide) lucide.createIcons();
    })
    .catch(err => console.error('Error loading academic projects:', err));
}