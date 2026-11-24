(() => {
  const menu = document.querySelector('[data-ct-menu]'), nav = document.querySelector('#ct-navigation');
  const closeMenu = () => { if (!menu || !nav) return; menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Abrir menu'); nav.classList.remove('is-open'); };
  if(menu && nav){
    menu.addEventListener('click',()=>{const next=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(next));menu.setAttribute('aria-label',next?'Fechar menu':'Abrir menu');nav.classList.toggle('is-open',next);});
    nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
  }
  // Abertura em motion design: quatro cenas, 3,2 segundos cada, sem vídeo pesado.
  const film=document.querySelector('#ct-film');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let seen=false;try{seen=sessionStorage.getItem('daysi-motion-v3')==='1';}catch{}
  if(film && typeof film.showModal==='function' && !seen && !location.hash && !motion.matches){
    const stage=film.querySelector('.ct-film-stage'),scenes=[...film.querySelectorAll('[data-film-scene]')],track=film.querySelector('.ct-film-track span'),pause=film.querySelector('[data-ct-pause]');
    const sceneTime=3200,duration=scenes.length*sceneTime;
    let elapsed=0,previous=null,frame=0,index=-1,paused=false,closing=false,finished=false,exitTimer=0;
    const remember=()=>{try{sessionStorage.setItem('daysi-motion-v3','1');}catch{}};
    function cleanUp(){
      if(finished)return;finished=true;cancelAnimationFrame(frame);clearTimeout(exitTimer);
      document.removeEventListener('visibilitychange',resetClock);motion.removeEventListener?.('change',onMotion);
      document.documentElement.classList.remove('ct-intro-open');remember();
      if(film.open)film.close();
    }
    function finish(immediate=false){
      if(closing||finished)return;closing=true;cancelAnimationFrame(frame);
      if(immediate||motion.matches){cleanUp();return;}
      film.classList.add('is-leaving');exitTimer=setTimeout(cleanUp,650);
    }
    function resetClock(){previous=null;}
    function onMotion(e){if(e.matches)finish(true);}
    function setPaused(value){
      paused=value;previous=null;pause.textContent=value?'Continuar':'Pausar';
      pause.setAttribute('aria-pressed',String(value));stage.classList.toggle('is-paused',value);
    }
    function tick(now){
      if(closing||finished)return;
      if(!paused&&!document.hidden&&previous!==null)elapsed+=Math.min(now-previous,100);
      previous=now;
      const next=Math.min(scenes.length-1,Math.floor(elapsed/sceneTime));
      if(index!==next){
        index=next;stage.dataset.filmIndex=String(index);
        scenes.forEach((scene,i)=>{scene.classList.toggle('is-active',i===index);scene.setAttribute('aria-hidden',String(i!==index));});
      }
      track.style.transform='scaleX('+Math.min(1,elapsed/duration)+')';
      if(elapsed>=duration){finish();return;}
      frame=requestAnimationFrame(tick);
    }
    pause.addEventListener('click',()=>setPaused(!paused));
    film.querySelector('[data-ct-skip]').addEventListener('click',()=>finish(true));
    film.addEventListener('cancel',e=>{e.preventDefault();finish(true);});
    film.addEventListener('close',cleanUp,{once:true});
    document.addEventListener('visibilitychange',resetClock);
    motion.addEventListener?.('change',onMotion);
    document.documentElement.classList.add('ct-intro-open');
    film.showModal();frame=requestAnimationFrame(tick);
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