/* ---------- 14. ARRANQUE ---------- */
function init(){
  setVh();
  safe(()=>{const f=FACTS[Math.floor(Math.random()*FACTS.length)];$('#bootFact').textContent='Dato curioso: '+f.t});
  safe(()=>{$('#heroTitle').setAttribute('aria-label',CONFIG.title);$('#brandTxt').textContent=CONFIG.title;$('#creditTxt').textContent=`${CONFIG.author} · Portafolio de ${CONFIG.course}`;document.title=`${CONFIG.title} · Portafolio de Seguridad Informática`});
  buildHero();cacheLayers();buildRail();buildIndex();
  $('#stelae').innerHTML=buildStelae();
  $('#map').innerHTML=buildMap();
  $('#chambers').innerHTML=CH.map(buildChamber).join('');
  $$('.chamber').forEach(ch=>ch.addEventListener('scroll',()=>{},{passive:true}));
  bindEvents();initLightbox();
  safe(initCursor);safe(initParticles);safe(initReveal);safe(initMapMotion);safe(initAudioUI);safe(initMusic);safe(initGuide);safe(initExpansion);
  requestAnimationFrame(tick);
  const go=()=>{
    root.classList.add('loaded');
    const m=location.hash.match(/#camara-(\d)/);
    // La creación del explorador es la puerta de entrada: se muestra antes
    // del relato, el mapa y las cámaras para que toda la expedición use ese perfil.
    if(!avGet().created){
      setTimeout(()=>openCreator('new',()=>{
        if(m&&CH[+m[1]-1])setTimeout(()=>openChamber(+m[1]),400);
        else try{world.focus({preventScroll:true})}catch(e){}
      }),180);
      return;
    }
    try{world.focus({preventScroll:true})}catch(e){}
    if(m&&CH[+m[1]-1])setTimeout(()=>openChamber(+m[1]),400)
  };
  const t0=performance.now(),ready=(document.fonts&&document.fonts.ready)?Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,1800))]):Promise.resolve();
  ready.then(()=>setTimeout(go,Math.max(0,1500-(performance.now()-t0))));
  window.ARCHIVO={temples:{enPass,EN,openTemple,TP,GAMES,tpStartGame,tpClose,TALK},heroina:heroinaSVG,avatars:{AV,avFull,avBust,openCreator,avGet},openChamber,goto,CONTENT,CONFIG,guide,startExpedition,openJournal,progress:P,QUIZ,dog,EX,aud};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
