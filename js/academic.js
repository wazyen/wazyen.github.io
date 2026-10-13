import { createTagSpan } from './tags.js';
import { getCurrentLanguage, getLocalizedDataUrl } from './i18n.js';

export function loadAcademic(lang = getCurrentLanguage()) {
	const container = document.getElementById('academic-grid');
	const template = document.getElementById('academic-card-template');
	if (!container || !template) return;

	const dataUrl = getLocalizedDataUrl('academic', lang);

	fetch(dataUrl)
		.then(res => {
			if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
			return res.json();
		})
		.then(projects => {
			container.innerHTML = '';
			projects.forEach(p => {
				const clone = template.content.cloneNode(true);

				clone.querySelector('[data-img]').src = p.thumbnail;
				clone.querySelector('[data-img]').alt = p.title;
				clone.querySelector('[data-title]').textContent = p.title;
				clone.querySelector('[data-year]').textContent = p.year;
				clone.querySelector('[data-subtitle]').textContent = p.subtitle;
				clone.querySelector('[data-description]').textContent = p.description;

				const tagsContainer = clone.querySelector('[data-tags]');
				if (tagsContainer && Array.isArray(p.tags)) {
					p.tags.forEach(t => {
						const span = createTagSpan(t, true);
						tagsContainer.appendChild(span);
					});
				}

				const linksContainer = clone.querySelector('[data-links]');
				if (linksContainer && p.links) {
					Object.entries(p.links).forEach(([label, url]) => {
						const a = document.createElement('a');
						a.href = url;
						a.target = "_blank";
						a.className = "inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 mr-3";
						a.innerHTML = `${label} <i data-lucide="external-link" class="w-3.5 h-3.5"></i>`;
						linksContainer.appendChild(a);
					});
				}

				container.appendChild(clone);
			});
			if (window.lucide) lucide.createIcons();
		})
		.catch(err => console.error('Error loading academic projects:', err));
}