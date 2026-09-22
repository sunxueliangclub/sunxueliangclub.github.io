/* Full News page renderer. */
(() => {
  const root = document.querySelector('.news-page .breaknewstext');
  if (!root || !Array.isArray(window.ZHOU_NEWS)) return;
  root.innerHTML = window.ZHOU_NEWS.map(group => `
    <h2 class="year-title">${group.year || ''}</h2>
    <ul class="news-list">
      ${(group.items || []).map(item => `
        <li class="news-item">
          <time class="date"${item.datetime ? ` datetime="${item.datetime}"` : ''}>${item.date || ''}</time>
          <span class="news-text">${item.contentHtml || ''}</span>
        </li>`).join('')}
    </ul>`).join('');
})();
