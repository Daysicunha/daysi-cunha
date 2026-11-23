(() => {
  const menu = document.querySelector('[data-ct-menu]'), nav = document.querySelector('#ct-navigation');
  const closeMenu = () => { if (!menu || !nav) return; menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Abrir menu'); nav.classList.remove('is-open'); };
  if(menu && nav){
    menu.addEventListener('click',()=>{const next=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(next));menu.setAttribute('aria-label',next?'Fechar menu':'Abrir menu');nav.classList.toggle('is-open',next);});
    nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
  }
  const intro=document.querySelector('#ct-intro');
  let seen=false; try{seen=sessionStorage.getItem('daysi-creative-intro-v1')==='1';}catch{}
  if(intro && typeof intro.showModal==='function' && !seen && !location.hash && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    const dismiss=()=>{if(intro.open)intro.close();};
    intro.querySelector('[data-ct-skip]').addEventListener('click',dismiss);
    intro.addEventListener('close',()=>{document.documentElement.classList.remove('ct-intro-open');});
    try{sessionStorage.setItem('daysi-creative-intro-v1','1');}catch{}
    intro.showModal();document.documentElement.classList.add('ct-intro-open');
    setTimeout(dismiss,2300);
  }
  const site=window.DaysiSite;
  if(site?.whatsapp)document.querySelectorAll('[data-ct-whatsapp]').forEach(a=>{a.href='https://wa.me/'+site.whatsapp+'?text='+encodeURIComponent('Olá, Daysi! Gostaria de conversar sobre uma ideia, projeto ou oportunidade.');});
  const navLinks=[...document.querySelectorAll('#ct-navigation a[href^="#"]')];
  if('IntersectionObserver' in window){
    const sections=navLinks.map(a=>document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;navLinks.forEach(a=>{if(a.hash==='#'+visible.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});},{rootMargin:'-15% 0px -55% 0px'});
    sections.forEach(s=>observer.observe(s));
  }
  const year=document.querySelector('[data-ct-year]');if(year)year.textContent=new Date().getFullYear();
})();