/* ---------- 15. PROGRESO, COMPAÑERA Y MÚSICA POR ZONAS ---------- */
const SKEY='archivo-sagrado-nilo-v2';
const P=(function(){
  let d={pass:{},done:{},items:{},facts:{},story:false,climb:false,room:false,stats:{ok:0,ko:0},sand:{},seal:false,purged:false};
  try{const s=JSON.parse(localStorage.getItem(SKEY)||'null');if(s&&typeof s==='object')d=Object.assign(d,s)}catch(e){}
  return{d,save(){try{localStorage.setItem(SKEY,JSON.stringify(d))}catch(e){}},
    count(){return Object.keys(d.done).length},
    reset(){try{localStorage.removeItem(SKEY)}catch(e){}location.reload()}};
})();

/* Compañera: estados de ánimo, burbuja, pistas */
const MOODS=['idle','happy','curious','walk','think','hint','celebrate','sleep'];
const STATE_TXT={idle:'observando',happy:'contenta',curious:'curioseando',walk:'explorando',think:'pensando',hint:'te da una pista',celebrate:'¡celebrando!',sleep:'descansando'};
const comp={cur:'idle',timer:null,tipT:null,sleepT:null,hintCtx:null,
  mood(m,ms){
    const l=$('#gLaunch');if(!l)return;MOODS.forEach(x=>l.classList.remove('mood-'+x));l.classList.add('mood-'+m);this.cur=m;
    const s=$('#gState');if(s)s.textContent=STATE_TXT[m]||'observando';
    
    clearTimeout(this.timer);if(ms)this.timer=setTimeout(()=>this.mood('idle'),ms);
    this.wake();
  },
  wake(){clearTimeout(this.sleepT);this.sleepT=setTimeout(()=>{if(!guide.open&&this.cur==='idle')this.mood('sleep')},45000)},
  tip(t,ms=5200){const b=$('#gTip'),x=$('#gTipTxt');if(!b||!x||guide.open)return;x.textContent=t;b.classList.add('show');clearTimeout(this.tipT);this.tipT=setTimeout(()=>b.classList.remove('show'),ms)},
  line(arr){return arr[Math.floor(Math.random()*arr.length)]},
  react(kind){
    const L={
      ok:['¡Guau! Lo has descifrado.','¡Muy bien, exploradora! Lo tenías.','¡Eso es! Vamos a por la siguiente.'],
      ko:['Tranquila, no pasa nada. Podemos intentarlo otra vez.','Casi. Equivocarse también es explorar.','Vamos a mirarlo con calma, juntas.'],
      item:['¡Qué hallazgo! Lo guardo en el diario.','¡Mira eso! Esto tiene una historia.'],
      unlock:['¡Lo conseguimos! La cámara se abre.'],
      near:['Creo que estamos muy cerca de descubrir algo.'],
      world:['Este escenario esconde algo… mantén los ojos abiertos.','Los detalles importan: busca brillos y jeroglíficos.']
    };
    const t=this.line(L[kind]||L.world);
    this.mood(kind==='ok'?'happy':kind==='ko'?'curious':kind==='unlock'?'celebrate':kind==='item'?'curious':'walk',kind==='unlock'?4500:3200);
    this.tip(t,4800);return t;
  },
  hint(){
    if(!guide.open)guide.show();
    let h=this.hintCtx&&this.hintCtx();
    if(!h){const g=['Observa detenidamente las palabras clave de la pregunta.','Recuerda lo que vimos en las cámaras: cada pirámide guarda su tema.','Busca la relación entre el concepto y su función.','¡Piénsalo con calma! La respuesta está en las pistas.'];h=this.line(g)}
    this.mood('hint',4200);guide.say('bot','<b>Pista:</b> '+esc(h));sfx.chat();
  },
  progress(){const n=P.count(),el=$('#gProg');if(el)el.textContent=n+'/7 cámaras';const np=$('.np');if(np)np.textContent=n+'/7 CÁMARAS';
    const it=Object.keys(P.d.items).length;const j=$('#jCount');if(j)j.textContent=it;try{syncDone()}catch(x){}}
};
/* Reacción al cursor: la compañera mira hacia el puntero */
function initCompanionCursor(){
  const d=$('#gDog');if(!d||!FINE||REDUCED)return;
  addEventListener('pointermove',e=>{
    const l=$('#gLaunch').getBoundingClientRect();const dx=(e.clientX-(l.left+l.width/2)),dy=(e.clientY-(l.top+l.height/2));
    const dist=Math.hypot(dx,dy);
    if(dist<420){const k=1-dist/420;d.style.setProperty('--look-x',`${clamp(dx/40,-6,6)*k}px`);d.style.setProperty('--look-y',`${clamp(dy/50,-4,4)*k}px`);d.style.setProperty('--look-r',`${clamp(dx/60,-5,5)*k}deg`);if(dist<150&&comp.cur==='sleep')comp.mood('curious',1800)}else{d.style.setProperty('--look-x','0px');d.style.setProperty('--look-y','0px');d.style.setProperty('--look-r','0deg')}
    comp.wake();
  },{passive:true});
}
/* KB extra (sin IA externa: respuestas programadas) */
KB.unshift(
 {id:'prog',m:q=>hasAny(q,['progreso','cuantas camaras','que llevo','como voy','descubrimientos']),r:()=>{const n=P.count(),it=Object.keys(P.d.items).length;return{h:`<p>Llevas <b>${n} de 7</b> cámaras desbloqueadas y <b>${it}</b> objetos en el diario. ${n<6?'Cada pirámide guarda un secreto distinto.':n===6?'¡Solo falta la Cumbre de los Pergaminos!':'¡Has recorrido todo el archivo!'}</p>`,a:[['Abrir el diario',()=>openJournal()]]}}},
 {id:'pista',m:q=>hasAny(q,['pista','ayuda con la prueba','no se la respuesta','estoy atascada','estoy atascado']),r:()=>{setTimeout(()=>comp.hint(),50);return{h:`<p>Mira, te doy una pista ahora mismo. Nunca te diré la respuesta directa: lo importante es que la descubras tú.</p>`}}},
 {id:'diario',m:q=>hasAny(q,['diario','objetos','artefactos','habitacion','sala secreta']),r:()=>({h:`<p>En el <b>diario</b> guardo tus cámaras superadas, los objetos recogidos y los datos curiosos. Dicen que hay una <b>sala secreta de objetos perdidos</b>… busca un resplandor en el desierto.</p>`,a:[['Abrir el diario',()=>openJournal()]]})},
 {id:'exped',m:q=>hasAny(q,['expedicion','mundo','explorar el mundo','retos','pruebas','quiz']),r:()=>({h:`<p>Pulsa <b>«Iniciar expedición»</b> en el mapa para sumergirte en el desierto. Cada pirámide la guarda una guardiana que te propondrá una prueba. Si fallas, podrás intentarlo otra vez.</p>`,a:[['Iniciar expedición',()=>startExpedition()]]})}
);

/* ---------- Música por zonas (capas sobre el motor existente) ---------- */
const MOOD_P={
  portada:{B:.46,dens:.5,flute:.35,pad:1,pulse:0,mech:0,wind:.24,root:0,choir:.95},
  mapa:{B:.42,dens:.65,flute:.4,pad:1,pulse:.25,mech:0,wind:.22,root:0,choir:.35},
  mundo:{B:.4,dens:.7,flute:.5,pad:1,pulse:.5,mech:.1,wind:.2,root:0,choir:.5},
  reto:{B:.32,dens:.5,flute:.1,pad:1,pulse:.9,mech:.4,wind:.1,root:-5},
  unlock:{B:.38,dens:.9,flute:.8,pad:2,pulse:.3,mech:.3,wind:.08,root:2,choir:1},
  secreto:{B:.62,dens:.3,flute:.5,pad:2,pulse:0,mech:.1,wind:.05,root:-2,choir:1},
  c1:{B:.44,dens:.55,flute:.4,pad:1,pulse:.1,mech:0,wind:.18,root:0,choir:.3},c2:{B:.4,dens:.6,flute:.5,pad:1,pulse:.3,mech:.1,wind:.12,root:3,choir:.5},
  c3:{B:.46,dens:.5,flute:.3,pad:2,pulse:.1,mech:.3,wind:.14,root:-2},c4:{B:.5,dens:.4,flute:.35,pad:1,pulse:0,mech:.2,wind:.1,root:-4},
  c5:{B:.38,dens:.65,flute:.2,pad:1,pulse:.6,mech:.5,wind:.1,root:0},c6:{B:.36,dens:.7,flute:.3,pad:2,pulse:.8,mech:.2,wind:.08,root:5,choir:.4},
  c7:{B:.6,dens:.3,flute:.6,pad:2,pulse:0,mech:0,wind:.12,root:0,choir:.85}
};
aud.mood='portada';aud.mp=MOOD_P.portada;
aud.setMood=function(m){
  if(this.mood===m)return;this.mood=m;this.mp=MOOD_P[m]||MOOD_P.portada;
  if(this.ready&&this.on){const t=this.ctx.currentTime;this.wind.gain.setTargetAtTime(this.mp.wind,t,1.5);
    this.music.gain.cancelScheduledValues(t);this.music.gain.setTargetAtTime(.38,t,.3);this.music.gain.setTargetAtTime(.9,t+.9,.8);this.step=Math.ceil(this.step/16)*16;
    this.switchFile&&this.switchFile(m)}
};
/* Coro vocal sintetizado («aaaah»): voces femeninas con formantes de la vocal /a/, vibrato y ataque lento. Es síntesis ORIGINAL, no una grabación. */
aud.choirVoice=function(t,f,d,v=1){
  const c=this.ctx;if(!this.choirBus){this.choirBus=c.createGain();this.choirBus.gain.value=1;const send=c.createGain();send.gain.value=1.8;this.choirBus.connect(this.music);this.choirBus.connect(send);send.connect(this.rev)}
  const out=c.createGain();out.gain.setValueAtTime(0,t);out.gain.linearRampToValueAtTime(.05*v,t+Math.min(1.6,d*.35));out.gain.setValueAtTime(.05*v,t+d*.7);out.gain.linearRampToValueAtTime(0,t+d+1.6);out.connect(this.choirBus);
  [[800,1,.9],[1150,1.4,.5],[2900,2.2,.18],[3500,2.8,.08]].forEach(([fc,q,g])=>{const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=fc;bp.Q.value=q*4;const gg=c.createGain();gg.gain.value=g;bp.connect(gg);gg.connect(out);
    [-9,0,8].forEach(dt=>{const o=c.createOscillator();o.type='sawtooth';o.frequency.value=f;o.detune.value=dt;const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=5+Math.random()*.6;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*.007,t+d*.5);lfo.connect(lg);lg.connect(o.frequency);o.connect(bp);o.start(t);lfo.start(t);o.stop(t+d+1.8);lfo.stop(t+d+1.8)})});
  const nb=c.createBuffer(1,c.sampleRate*Math.ceil(d+2),c.sampleRate),nd=nb.getChannelData(0);for(let i=0;i<nd.length;i++)nd[i]=Math.random()*2-1;
  const ns=c.createBufferSource();ns.buffer=nb;const nf=c.createBiquadFilter();nf.type='bandpass';nf.frequency.value=2200;nf.Q.value=1.2;const ng=c.createGain();ng.gain.value=.05;ns.connect(nf);nf.connect(ng);ng.connect(out);ns.start(t);ns.stop(t+d+1.8);
};
aud.choirPhrase=function(t,mp){
  const rs=Math.pow(2,mp.root/12),P_=[[7,11],[8,11],[7,10],[9,11]],ch=P_[Math.floor(Math.random()*P_.length)],B=mp.B,d1=B*12,v=mp.choir;
  ch.forEach((k,i)=>{this.choirVoice(t+i*.15,this.N[k]*rs,d1,v*(i?.7:1))});
  if(Math.random()<.75){const k2=this.N[clamp(ch[0]-(Math.random()<.5?1:2),0,11)]*rs;this.choirVoice(t+d1*.9,k2,B*9,v*.9)}
  if(mp.choir>.8)this.choirVoice(t+.3,this.N[ch[0]]*rs*2,d1,v*.35);
};
/* Pistas externas con licencia (opcional): CONFIG.musicTracks={portada:'assets/audio/portada.mp3',...}. Sin archivos, suena la composición sintetizada. */
aud.zoneKey=function(m){return /^c\d$/.test(m)?m:(m==='reto'?'reto':m)};
aud.switchFile=function(m){
  const T=(CONFIG&&CONFIG.musicTracks)||{},url=T[this.zoneKey(m)]||T.default;
  if(!this.fileEl&&!url)return;
  if(!this.fileEl){this.fileEl=new Audio();this.fileEl.loop=true;this.fileEl.crossOrigin='anonymous';this.fileEl.volume=0}
  const el=this.fileEl;clearInterval(this.fileFade);
  const to=url?Math.pow(this.vol,1.4):0,swap=url&&el.getAttribute('src')!==url;
  const ramp=()=>{this.fileFade=setInterval(()=>{const d=to-el.volume;if(Math.abs(d)<.02){el.volume=clamp(to,0,1);clearInterval(this.fileFade);if(!url)el.pause()}else el.volume=clamp(el.volume+Math.sign(d)*.03,0,1)},60)};
  if(swap){const out=setInterval(()=>{el.volume=Math.max(0,el.volume-.05);if(el.volume<=0){clearInterval(out);el.src=url;el.play().catch(()=>{});ramp()}},50)}else{if(url&&el.paused)el.play().catch(()=>{});ramp()}
};
aud.flute=function(t,f,d,v=1){const c=this.ctx,o=c.createOscillator(),g=c.createGain(),lf=c.createOscillator(),lg=c.createGain(),bp=c.createBiquadFilter();
  o.type='sine';o.frequency.value=f*2;lf.frequency.value=5.2;lg.gain.value=f*.012;lf.connect(lg);lg.connect(o.frequency);bp.type='lowpass';bp.frequency.value=2400;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.09*v,t+.12);g.gain.setTargetAtTime(0,t+d,.25);
  o.connect(bp);bp.connect(g);g.connect(this.music);o.start(t);lf.start(t);o.stop(t+d+1.4);lf.stop(t+d+1.4)};
aud.padChord=function(t,d,fs){const c=this.ctx;fs.forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain(),lp=c.createBiquadFilter();o.type='sawtooth';o.frequency.value=f;o.detune.value=(i-1)*7;lp.type='lowpass';lp.frequency.value=700;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.022,t+d*.4);g.gain.linearRampToValueAtTime(0,t+d);o.connect(lp);lp.connect(g);g.connect(this.music);o.start(t);o.stop(t+d+.1)})};
aud.pulse=function(t,f,v=1){const c=this.ctx,o=c.createOscillator(),g=c.createGain(),lp=c.createBiquadFilter();o.type='square';o.frequency.value=f;lp.type='lowpass';lp.frequency.value=1400;
  g.gain.setValueAtTime(.035*v,t);g.gain.exponentialRampToValueAtTime(.0005,t+.14);o.connect(lp);lp.connect(g);g.connect(this.music);o.start(t);o.stop(t+.18)};
aud.mechTick=function(t){const c=this.ctx,b=c.createBuffer(1,c.sampleRate*.03,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,3);
  const s=c.createBufferSource();s.buffer=b;const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=900+Math.random()*900;bp.Q.value=6;const g=c.createGain();g.gain.value=.16;s.connect(bp);bp.connect(g);g.connect(this.music);s.start(t)};
aud.glitch=function(t){const c=this.ctx,o=c.createOscillator(),g=c.createGain();o.type='sawtooth';o.frequency.setValueAtTime(2200,t);o.frequency.setValueAtTime(600,t+.03);o.frequency.setValueAtTime(3100,t+.06);g.gain.setValueAtTime(.02,t);g.gain.setValueAtTime(0,t+.09);o.connect(g);g.connect(this.music);o.start(t);o.stop(t+.1)};
aud.fanfare=function(){if(!this.ready||this.muted)return;const c=this.ctx,t=c.currentTime+.05,n=[293.66,369.99,440,587.33,739.99];
  n.forEach((f,i)=>{const o=c.createOscillator(),o2=c.createOscillator(),g=c.createGain();o.type='triangle';o2.type='sawtooth';o.frequency.value=f;o2.frequency.value=f/2;g.gain.setValueAtTime(0,t+i*.16);g.gain.linearRampToValueAtTime(.12,t+i*.16+.04);g.gain.exponentialRampToValueAtTime(.001,t+i*.16+2.4);
    o.connect(g);o2.connect(g);g.connect(this.fx);o.start(t+i*.16);o2.start(t+i*.16);o.stop(t+i*.16+2.6);o2.stop(t+i*.16+2.6)});this.noise(1.2,200,1800,.25)};
/* nuevo planificador con capas */
aud.sched=function(){
  const c=this.ctx,mp=this.mp||MOOD_P.portada,B=mp.B,rs=Math.pow(2,mp.root/12);
  while(this.next<c.currentTime+1.1){
    const t=this.next,s=this.step%16;
    if([0,6,10].includes(s)&&(mp.dens>.3))this.dum(t);if([4,8,12,14].includes(s)&&mp.dens>.45)this.tek(t);
    if(s%2===0&&Math.random()<mp.dens){const w=Math.random();let d=w<.45?0:w<.8?(Math.random()<.5?1:-1):(Math.random()<.5?2:-2);
      if(s===0&&Math.random()<.6)this.idx=Math.random()<.5?7:4;else this.idx=clamp(this.idx+d,0,this.N.length-1);
      this.pluck(t,this.N[this.idx]*rs,B*(Math.random()<.3?3:2),.8);
      if(Math.random()<mp.flute&&s%4===0)this.flute(t+.02,this.N[clamp(this.idx+1,0,this.N.length-1)]*rs,B*5,1)}
    if(s===0&&this.step%32===0)this.padChord(t,B*32,mp.pad>1?[146.83*rs,220*rs,277.18*rs]:[146.83*rs,220*rs]);
    if(mp.choir>0&&s===0&&this.step%64===0&&Math.random()<mp.choir+.2)this.choirPhrase(t,mp);
    if(mp.pulse>0&&[0,3,6,8,11,14].includes(s)&&Math.random()<mp.pulse)this.pulse(t,this.N[(s%3)*2]*rs/2,.9);
    if(mp.mech>0&&Math.random()<mp.mech*.35&&s%2===1)this.mechTick(t);
    if(mp.pulse>.7&&Math.random()<.03)this.glitch(t);
    this.next+=B;this.step++;
  }
};
