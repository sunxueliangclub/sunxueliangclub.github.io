/* Shared Zhou Group site behavior. */
(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('is-open');
      menuToggle.setAttribute(
        'aria-expanded',
        navList.classList.contains('is-open') ? 'true' : 'false'
      );
    });
  }
})();
