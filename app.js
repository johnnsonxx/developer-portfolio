
(() => {
  const navTargets = ['about', 'foundation', 'expertise', 'work', 'leadership', 'certificates', 'contact'];
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const nav = document.querySelector('.nav');

  document.querySelector('.brand')?.addEventListener('click', () => go('home'));
  document.querySelectorAll('.nav-links button').forEach((button, index) => {
    button.addEventListener('click', () => go(navTargets[index]));
  });
  document.querySelector('.hero-actions .primary')?.addEventListener('click', () => go('about'));
  document.querySelector('.hero-actions .text-button')?.addEventListener('click', () => go('work'));
  document.querySelector('footer .footer-top button')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const menuButton = document.querySelector('.menu-button');
  let mobileMenu;
  menuButton?.addEventListener('click', () => {
    if (mobileMenu) {
      mobileMenu.remove();
      mobileMenu = null;
      menuButton.setAttribute('aria-expanded', 'false');
      return;
    }
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    const labels = ['關於我', '經歷軌跡', '核心能力', '精選案例', '帶領團隊', '專業證照', '聯絡'];
    labels.forEach((label, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.innerHTML = '<span>' + label + '</span><span>›</span>';
      button.addEventListener('click', () => {
        go(navTargets[index]);
        mobileMenu.remove();
        mobileMenu = null;
        menuButton.setAttribute('aria-expanded', 'false');
      });
      mobileMenu.append(button);
    });
    nav.append(mobileMenu);
    menuButton.setAttribute('aria-expanded', 'true');
  });

  const updateNav = () => nav?.classList.toggle('scrolled', window.scrollY > 30);
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(element => observer.observe(element));
  } else {
    reveals.forEach(element => element.classList.add('visible'));
  }

  let activeOverlay;
  const closeDetail = () => {
    activeOverlay?.remove();
    activeOverlay = null;
    document.body.style.overflow = '';
  };
  const openDetail = key => {
    const template = document.getElementById('detail-' + key);
    if (!template) return;
    closeDetail();
    activeOverlay = template.content.firstElementChild.cloneNode(true);
    activeOverlay.querySelector('.modal-close')?.addEventListener('click', closeDetail);
    activeOverlay.addEventListener('mousedown', event => {
      if (event.target === activeOverlay) closeDetail();
    });
    document.body.append(activeOverlay);
    document.body.style.overflow = 'hidden';
    activeOverlay.querySelector('.modal-close')?.focus();
  };
  document.querySelectorAll('[data-detail]').forEach(element => {
    element.addEventListener('click', () => openDetail(element.dataset.detail));
    element.addEventListener('keydown', event => {
      if ((event.key === 'Enter' || event.key === ' ') && element.tagName !== 'BUTTON') {
        event.preventDefault();
        openDetail(element.dataset.detail);
      }
    });
  });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeDetail();
  });
})();
