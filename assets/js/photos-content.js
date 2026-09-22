/* Photos gallery renderer; photos.js attaches filtering/lightbox afterwards. */
(() => {
  const root = document.querySelector('.photos-page .layout > div');
  if (!root || !Array.isArray(window.ZHOU_PHOTO_SECTIONS)) return;
  root.insertAdjacentHTML('beforeend', window.ZHOU_PHOTO_SECTIONS.map(section => `
    <section class="section" id="${section.id || ''}">
      <div class="section-head">
        <h2>${section.title || ''}</h2>
        <div class="sec-note">${section.note || ''}</div>
      </div>
      <div class="grid">
        ${(section.cards || []).map(card => {
          const loading = card.loading ? ` loading="${card.loading}"` : '';
          return `<article class="photo" data-cat="${card.category || ''}">
            <div class="media"><img src="${card.image || ''}" alt="${card.alt || ''}"${loading}></div>
            <p class="cap">${card.captionHtml || ''}</p>
          </article>`;
        }).join('')}
      </div>
    </section>`).join(''));
  const count = document.getElementById('photoCount');
  if (count) count.textContent = String(
    window.ZHOU_PHOTO_SECTIONS.reduce((n, s) => n + (s.cards || []).length, 0)
  );
})();
