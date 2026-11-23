(() => {
  const menu = document.querySelector('[data-ct-menu]'), nav = document.querySelector('#ct-navigation');
  const closeMenu = () => { if (!menu || !nav) return; menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Abrir menu'); nav.classList.remove('is-open'); };
  if(menu && nav){
    menu.addEventListener('click',()=>{const next=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(next));menu.setAttribute('aria-label',next?'Fechar menu':'Abrir menu');nav.classList.toggle('is-open',next);});
    nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
  }
  const film=document.querySelector('#ct-film');
  let seen=false;try{seen=sessionStorage.getItem('daysi-film-v2')==='1';}catch{}
  if(film && !seen && !location.hash && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    film.hidden=false;
    const stage=film.querySelector('.ct-film-stage'),scenes=[...film.querySelectorAll('[data-film-scene]')],track=film.querySelector('.ct-film-track span');
    const remember=()=>{try{sessionStorage.setItem('daysi-film-v2','1');}catch{}};
    let frame=0,last=-1;
    function render(){
      frame=0;
      const total=Math.max(1,film.offsetHeight-stage.offsetHeight);
      const rect=film.getBoundingClientRect(),top=parseFloat(getComputedStyle(stage).top)||0;
      const progress=Math.max(0,Math.min(1,(top-rect.top)/total));
      const index=Math.min(scenes.length-1,Math.floor(progress*scenes.length));
      stage.style.setProperty('--film-progress',String(progress));
      track.style.transform='scaleX('+progress+')';
      if(last!==index){scenes.forEach((scene,i)=>{scene.classList.toggle('is-active',i===index);scene.setAttribute('aria-hidden',String(i!==index));});last=index;}
      if(progress>=.995)remember();
    }
    function queue(){if(!frame)frame=requestAnimationFrame(render);}
    window.addEventListener('scroll',queue,{passive:true});window.addEventListener('resize',queue,{passive:true});
    film.querySelector('[data-ct-skip]').addEventListener('click',remember);
    render();
  }
  const portraits=[...document.querySelectorAll('[data-ct-portrait]')];
  if(portraits.length){
    const candidate=new Image();
    candidate.onload=()=>{portraits.forEach(portrait=>{portrait.src=candidate.src;portrait.width=candidate.naturalWidth;portrait.height=candidate.naturalHeight;portrait.alt='Retrato de Daysi Cunha com símbolo luminoso de comércio local';portrait.classList.add('ct-editorial-photo');portrait.closest('.ct-hero')?.classList.add('ct-hero--editorial-photo');});};
    candidate.src=portraits[0].dataset.ctPortrait;
  }
  const site=window.DaysiSite;
  if(site?.whatsapp)document.querySelectorAll('[data-ct-whatsapp]').forEach(a=>{a.href='https://wa.me/'+site.whatsapp+'?text='+encodeURIComponent('Olá, Daysi! Gostaria de conversar sobre uma ideia, projeto ou oportunidade.');});
  const navLinks=[...document.querySelectorAll('#ct-navigation a[href^="#"]')];
  if('IntersectionObserver' in window){
    const sections=navLinks.map(a=>document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
    let pending=false;
    function syncNav(){pending=false;const threshold=Math.min(180,window.innerHeight*.27);let current=sections[0];for(const s of sections.slice().sort((a,b)=>a.offsetTop-b.offsetTop)){if(s.getBoundingClientRect().top<=threshold)current=s;}
      navLinks.forEach(a=>{if(current&&a.hash==='#'+current.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
    window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(syncNav);}},{passive:true});syncNav();
  }
  const year=document.querySelector('[data-ct-year]');if(year)year.textContent=new Date().getFullYear();
})();