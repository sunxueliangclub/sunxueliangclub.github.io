/* Home data renderer. */
(() => {
  const highlightsRoot = document.querySelector('.lastestnew');
  if (highlightsRoot && Array.isArray(window.ZHOU_HOME_HIGHLIGHTS)) {
    const html = window.ZHOU_HOME_HIGHLIGHTS.map(item => {
      const loading = item.loading ? ` loading="${item.loading}"` : '';
      return `<article class="highlight-card">
        <img class="highlight-image" src="${item.image || ''}" alt="${item.alt || ''}"
             width="${item.width || 240}" height="${item.height || 160}"${loading}>
        <div class="highlight-text">
          <h3 class="highlight-title">${item.title || ''}</h3>
          <p class="body-text">${item.bodyHtml || ''}</p>
        </div>
      </article>`;
    }).join('');
    highlightsRoot.insertAdjacentHTML('beforeend', html);
  }

  const list = document.querySelector('#B1 ul');
  if (list && Array.isArray(window.ZHOU_HOME_NEWS)) {
    list.innerHTML = window.ZHOU_HOME_NEWS
      .map(item => `<li><span class="date">${item.date || ''}</span> ${item.contentHtml || ''}</li>`)
      .join('');
  }
})();
