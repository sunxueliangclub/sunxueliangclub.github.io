/* Open Positions renderer. */
(() => {
  const root = document.querySelector('.open-page .open-main');
  if (!root || !Array.isArray(window.ZHOU_OPENING_BLOCKS)) return;
  root.innerHTML = window.ZHOU_OPENING_BLOCKS.map(block => block.html || '').join('');
})();
