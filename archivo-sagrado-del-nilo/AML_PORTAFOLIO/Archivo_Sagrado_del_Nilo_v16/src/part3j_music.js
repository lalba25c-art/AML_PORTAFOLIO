/* ---------- 20. BANDA SONORA CON PISTAS REALES (assets/audio) ----------
   Sustituye a la música sintetizada: cada zona reproduce una de las 10 pistas aportadas, en bucle, con
   fundido cruzado al cambiar de zona. Solo suena UNA pista a la vez (más la saliente durante el fundido).
   Los efectos (clics, apertura de puertas, fanfarria) siguen siendo WebAudio y tienen volumen propio. */
const TRACKS={
  isis:{url:'assets/audio/isis_templo.mp3',name:'Isis · Rituales del templo'},
  damasco:{url:'assets/audio/damasco.mp3',name:'Música egipcia · Damasco'},
  desert:{url:'assets/audio/desert_dance.mp3',name:'Danza del desierto'},
  reina:{url:'assets/audio/reina_vs_impostora.mp3',name:'La reina y la impostora'},
  cleo:{url:'assets/audio/cleopatra_vibe.mp3',name:'Cleopatra · Majestad'},
  antiguo:{url:'assets/audio/antiguo_egipto.mp3',name:'Antiguo Egipto · Sueños'},
  duduk:{url:'assets/audio/duduk_soulful.m4a',name:'Duduk · Melodías ancestrales'},
  nefertiti:{url:'assets/audio/nefertiti.m4a',name:'Nefertiti · Reina de Egipto'},
  sufi:{url:'assets/audio/sufi_dreams.m4a',name:'Sueños sufíes · Ney y oud'},
  extra:{url:'assets/audio/tema_extra_video.m4a',name:'Tema adicional · Archivo de audio'}
};
/* zona → pista. Hay 10 pistas para las zonas principales: ninguna pista se repite en zonas contiguas del recorrido principal. */
const ZONES={
  portada:'isis',historia:'isis',creador:'isis',
  mapa:'nefertiti',mundo:'damasco',reto:'desert',unlock:'cleo',secreto:'sufi',
  c1:'isis',c2:'antiguo',c3:'damasco',c4:'duduk',c5:'desert',c6:'reina',c7:'cleo'
};
const bgm={cur:null,out:[],pos:{},want:'isis',err:{},warned:false,timer:null,
  vol(){return aud.muted?0:Math.pow(aud.vol,1.5)},
  eff(el){return clamp((el._k||0)*this.vol(),0,1)},
  mk(key){const el=new Audio();el.preload='auto';el.src=TRACKS[key].url;el._k=0;el.volume=0;el.dataset.track=key;
    el.addEventListener('error',()=>{this.err[key]=1;if(!this.warned){this.warned=true;try{toast('No se encuentra la pista «'+TRACKS[key].name+'». Comprueba que la carpeta assets/audio está junto al index.html.')}catch(e){}}});return el},
  ramp(el,to,ms,done){clearInterval(el._f);const from=el._k,t0=performance.now();
    el._f=setInterval(()=>{const k=Math.min(1,(performance.now()-t0)/ms);el._k=from+(to-from)*k;el.volume=this.eff(el);if(k>=1){clearInterval(el._f);done&&done()}},40)},
  retire(o,ms){this.out.push(o);this.ramp(o.el,0,ms,()=>{try{o.el.pause();o.el.removeAttribute('src');o.el.load()}catch(e){}this.out=this.out.filter(x=>x!==o)})},
  go(key,start,ms){
    if(!TRACKS[key])return;const old=this.cur;
    if(old&&old.key===key&&start==null)return;
    if(old){this.pos[old.key]=old.el.currentTime||0;this.retire(old,ms||2200)}
    const el=this.mk(key),from=start!=null?start:(this.pos[key]||0);
    el.volume=this.vol();el.load();
    if(from>1)el.addEventListener('loadedmetadata',()=>{try{el.currentTime=from}catch(e){}},{once:true});
    this.cur={key,el,looping:false};
    const np=document.querySelector('#audio .np');if(np)np.textContent='♪ '+TRACKS[key].name+' · cargando…';
    el.addEventListener('playing',()=>{if(np)np.textContent='♪ '+TRACKS[key].name},{once:true});
    el.addEventListener('error',()=>{if(np)np.textContent='Audio no disponible';try{toast('No se puede reproducir «'+TRACKS[key].name+'». Comprueba que has subido también la carpeta <b>assets/audio</b> y que estás abriendo la web desde un servidor.')}catch(e){}},{once:true});
    const p=el.play();
    if(p&&p.then)p.then(()=>{if(this.cur&&this.cur.el===el)this.ramp(el,1,ms||1200)}).catch(err=>{
      if(np)np.textContent='Pulsa para activar la música';
      try{toast('El navegador ha bloqueado la reproducción. Pulsa el botón de música y comprueba que el volumen no esté a cero. ('+(err&&err.name?err.name:'Error')+')')}catch(e){}
    });
    else this.ramp(el,1,ms||1200);
  },
  zone(mood){this.want=ZONES[mood]||'isis';this.zoneName=mood;if(aud.on)this.go(this.want)},
  /* bucle sin corte: poco antes del final se funde con el inicio de la misma pista */
  watch(){clearInterval(this.timer);this.timer=setInterval(()=>{const c=this.cur;if(!c||!aud.on||c.looping)return;const d=c.el.duration;
    if(isFinite(d)&&d>12&&d-c.el.currentTime<4){c.looping=true;this.pos[c.key]=0;this.go(c.key,0,3600)}},400)},
  apply(){if(this.cur)this.cur.el.volume=this.eff(this.cur.el);this.out.forEach(o=>o.el.volume=this.eff(o.el))},
  play(){if(this.cur&&this.cur.key===this.want&&this.cur.el.paused){this.resume();return}this.go(this.want);this.watch()},
  pause(){const c=this.cur;if(!c)return;this.pos[c.key]=c.el.currentTime||0;clearInterval(this.timer);
    this.ramp(c.el,0,450,()=>{try{c.el.pause()}catch(e){}})},
  resume(){const c=this.cur;this.watch();if(!c){this.go(this.want);return}
    if(c.key!==this.want){this.go(this.want);return}
    const p=c.el.play();if(p&&p.catch)p.catch(()=>{});this.ramp(c.el,1,900)},
  playing(){return !!(this.cur&&!this.cur.el.paused&&this.cur.el.currentTime>0)}
};
aud.bgm=bgm;aud.fxVol=.7;
aud.setMood=function(m){if(this.mood===m)return;this.mood=m;this.mp=MOOD_P[m]||MOOD_P.portada;bgm.zone(m)};
aud.switchFile=function(){};  /* el gancho antiguo queda anulado: evita reproducciones simultáneas */
aud.start=function(){this.init();try{this.ctx&&this.ctx.resume&&this.ctx.resume()}catch(e){}this.on=true;bgm.play();return true};
aud.stop=function(){this.on=false;bgm.pause()};
aud.setVol=function(){bgm.apply();if(!this.master)return;const g=this.muted?0:Math.pow(this.fxVol,1.6)*.95;this.master.gain.setTargetAtTime(g,this.ctx.currentTime,.05)};
aud.visibility=function(){
  if(document.hidden){this._hid=this.on;if(this.on)bgm.pause();this.ctx&&this.ctx.suspend&&this.ctx.suspend()}
  else{this.ctx&&this.ctx.resume&&this.ctx.resume();if(this._hid){this._hid=false;bgm.resume()}}};
/* Preferencias del usuario (volumen de música, de efectos, silencio y si la música estaba activa) */
const AKEY='archivo-sagrado-audio-v1';
function audPrefs(){try{return JSON.parse(localStorage.getItem(AKEY)||'null')||{}}catch(e){return{}}}
function audSave(){try{localStorage.setItem(AKEY,JSON.stringify({vol:aud.vol,fx:aud.fxVol,muted:aud.muted,on:aud.on}))}catch(e){}}
function initMusic(){
  const pr=audPrefs(),vol=$('#vol'),fx=$('#volFx'),bm=$('#btnMusic'),bu=$('#btnMute');
  if(typeof pr.vol==='number')aud.vol=clamp(pr.vol,0,1);if(typeof pr.fx==='number')aud.fxVol=clamp(pr.fx,0,1);
  vol.value=Math.round(aud.vol*100);if(fx)fx.value=Math.round(aud.fxVol*100);
  if(pr.muted){aud.muted=true;bu.setAttribute('aria-pressed','true')}
  if(fx)fx.addEventListener('input',()=>{aud.fxVol=fx.value/100;aud.setVol();audSave()});
  vol.addEventListener('input',()=>{aud.vol=vol.value/100;aud.setVol();audSave()});
  /* los manejadores de initAudioUI ya han cambiado el estado cuando se ejecutan estos */
  bm.addEventListener('click',()=>{audSave()});bu.addEventListener('click',()=>{aud.setVol();audSave()});
  document.addEventListener('visibilitychange',()=>aud.visibility());
  /* Los navegadores exigen un gesto del usuario: la música arranca con la primera pulsación o tecla
     (salvo que el usuario la hubiera dejado en pausa la última vez). */
  const first=e=>{
    document.removeEventListener('pointerdown',first,true);document.removeEventListener('keydown',first,true);
    if(e.target&&e.target.closest&&e.target.closest('#audio'))return;
    if(pr.on===false||aud.on)return;
    bm.click()};
  document.addEventListener('pointerdown',first,true);document.addEventListener('keydown',first,true);
  window.addEventListener('pagehide',()=>{if(bgm.cur)bgm.pos[bgm.cur.key]=bgm.cur.el.currentTime});
}
