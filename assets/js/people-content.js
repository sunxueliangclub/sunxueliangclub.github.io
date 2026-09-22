/* People roster renderer. */
(() => {
  const root = document.querySelector('.Renyuan');
  if (!root || !Array.isArray(window.ZHOU_PEOPLE_GROUPS)) return;
  const html = window.ZHOU_PEOPLE_GROUPS.map(group => `
    <div class="${group.headingClass || 'Leader'}">${group.title || ''}</div>
    ${(group.blocksHtml || []).join('')}
  `).join('');
  const footer = root.querySelector(':scope > footer.dibu');
  if (footer) footer.insertAdjacentHTML('beforebegin', html);
  else root.insertAdjacentHTML('afterbegin', html);
})();
