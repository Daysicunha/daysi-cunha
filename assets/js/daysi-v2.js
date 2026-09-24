(function () {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-site-nav]');
  if (!toggle || !nav) return;
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  document.addEventListener('click', e => { if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false); });
})();


(function () {
  // Progressive enhancement: text/content remain visible without JavaScript.
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const reveals = document.querySelectorAll('[data-reveal]');
  if (!reveals.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
  reveals.forEach((element) => observer.observe(element));
  document.documentElement.classList.add('motion-ready');
})();


/* Hero pessoal: animação de entrada e alternância autoral de palavras. */
(function () {
  const hero = document.querySelector('body.home-v2 .hero');
  if (!hero) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) hero.classList.add('motion-entered');

  const wrapper = hero.querySelector('[data-hero-rotator]');
  const word = wrapper && wrapper.querySelector('.hero-rotator-word');
  if (!wrapper || !word || reduced) return;
  const words = ['digital.', 'real.', 'possível.'];
  let current = 0;
  let interval = null;
  const animateWord = () => {
    current = (current + 1) % words.length;
    wrapper.classList.remove('is-switching');
    word.textContent = words[current];
    // A troca só atualiza uma região decorativa. O título mantém um aria-label estável.
    void wrapper.offsetWidth;
    wrapper.classList.add('is-switching');
  };
  const start = () => {
    if (interval) return;
    interval = window.setInterval(animateWord, 3400);
  };
  const stop = () => {
    window.clearInterval(interval);
    interval = null;
  };
  if ('IntersectionObserver' in window) {
    const watcher = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !document.hidden) start();
      else stop();
    }, {threshold: 0.08});
    watcher.observe(hero);
  } else start();
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
})();
