/* Research page renderer. */
(() => {
  const root = document.querySelector('.research-page .entry-content');
  if (!root || !Array.isArray(window.ZHOU_RESEARCH_TOPICS)) return;
  const html = window.ZHOU_RESEARCH_TOPICS.map((topic, i) => {
    const loading = topic.loading ? ` loading="${topic.loading}"` : '';
    const priority = topic.fetchpriority ? ` fetchpriority="${topic.fetchpriority}"` : '';
    const paragraphs = (topic.paragraphsHtml || []).map(p => `<p>${p}</p>`).join('');
    const related = topic.relatedHtml ? `<p class="rp-related">${topic.relatedHtml}</p>` : '';
    const row = `<div class="topic-row${topic.reverse ? ' reverse' : ''}">
      <div class="topic-text">
        <h3>${topic.title || ''}</h3>${paragraphs}${related}
      </div>
      <div class="topic-image">
        <img src="${topic.image || ''}" alt="${topic.alt || ''}"${loading}${priority}>
      </div>
    </div>`;
    return i < window.ZHOU_RESEARCH_TOPICS.length - 1 ? row + '<hr>' : row;
  }).join('');
  root.insertAdjacentHTML('beforeend', html);
})();
