const cups = [
  { name: 'Ice coffee', price: '6.00€', image: 'assets/ledkava.png' },
  { name: 'Voćni frape', price: '4.00€', image: 'assets/vocni-frape.png' },
  { name: 'Jagode sa šlagom', price: '6.00€', image: 'assets/jagode-slag.png' },
  { name: 'Holiday kup', price: '6.00€', image: 'assets/holiday-kup.png' },
  { name: 'Holiday kup manji', price: '5.00€', image: 'assets/holiday-kup.png' },
  { name: 'Banana split', price: '6.50€', image: 'assets/banana-split.png' },
  { name: 'Voćna salata', price: '7.00€', image: 'assets/vocna-salata.png' },
  { name: 'Mexiko kup', price: '6.00€', image: 'assets/meksiko-kup.png' },
  { name: 'Ananas kup', price: '6.00€', image: 'assets/ananas-kup.png' },
  { name: 'Kivi kup', price: '5.00€', image: 'assets/kivi-kup.png' },
  { name: 'Dječiji kup manji', price: '4.00€', image: 'assets/djecijikup.png' },
  { name: 'Dječiji kup veći', price: '5.00€', image: 'assets/djecijikup.png' },
  { name: 'Špagete kup', price: '6.00€', image: 'assets/spagete-kup.png' },
  { name: 'Lješnjak kup', price: '6.00€', image: 'assets/ljesnjak-kup.png' },
  { name: 'Dinja ananas kup', price: '7.00€', image: 'assets/dinja-ananas-kup.png' },
  { name: 'Raffaello kup', price: '6.50€', image: 'assets/raffaello-kup.png' },
  { name: 'Kinder kup', price: '6.50€', image: 'assets/kinder-kup.png' }
];

document.addEventListener('DOMContentLoaded', () => {
  const cupsGrid = document.getElementById('cupsGrid');

  if (cupsGrid) {
    cupsGrid.innerHTML = cups.map(cup => `
      <article class="cup-card">
        <img src="${cup.image}" alt="${cup.name}">
        <div class="cup-body">
          <h4>${cup.name}</h4>
          <div class="cup-meta">
            <span class="badge">${cup.price}</span>
          </div>
        </div>
      </article>
    `).join('');
  }
});

const menuToggle = document.getElementById('menuToggle');
const navPanel = document.getElementById('navPanel');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  const open = navPanel.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.classList.toggle('menu-open', open);
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');

    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();

      const target = document.querySelector(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }

    navPanel.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

const reveals = document.querySelectorAll('.reveal');

reveals.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 0.04, 0.28)}s`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14,
  rootMargin: '0px 0px -60px 0px'
});

reveals.forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.5 });
sections.forEach(section => sectionObserver.observe(section));
