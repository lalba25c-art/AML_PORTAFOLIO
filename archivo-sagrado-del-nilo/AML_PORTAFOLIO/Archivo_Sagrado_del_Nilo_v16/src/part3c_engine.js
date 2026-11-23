/* ---------- 11. MOTOR: DOM, ESCENA, CÁMARA, NAVEGACIÓN ---------- */
const world=$('#world'),app=$('#app'),root=document.documentElement;
const state={chamber:0,mx:0,my:0,tx:0,ty:0,cx:-100,cy:-100,tcx:-100,tcy:-100,lastFocus:null,busy:false,frame:0};
const setVh=()=>root.style.setProperty('--vh',innerHeight+'px');

function buildHero(){
  $('#svgSky').innerHTML=buildSky();$('#svgFar').innerHTML=buildFar();$('#svgDunes').innerHTML=buildDunes();
  $('#svgAvenue').innerHTML=buildAvenue();
  $('#svgPylonL').innerHTML=buildPylon();$('#svgPylonR').innerHTML=`<g transform="translate(1600 0) scale(-1 1)">${buildPylon().replace(/id="pyF"/,'id="pyF2"').replace(/url\(#pyF\)/,'url(#pyF2)').replace(/id="pyT"/,'id="pyT2"').replace(/url\(#pyT\)/,'url(#pyT2)')}</g>`;
  const sh=document.createElement('div');sh.className='shade';$('#stage').insertBefore(sh,$('#heroCopy'));
  $('#glyphCol').innerHTML=['feather','eye','scarab','ankh','djed','lotus'].map((g,i)=>`<svg viewBox="0 0 40 40">${use(g,0,0,40,'glyph',i*2)}</svg>`).join('');
}
function buildRail(){
  const items=[['goto','umbral','Umbral'],['goto','inscripcion','Inscripción'],['goto','mapa','Mapa'],null].concat(CH.map(c=>['open',c.n,c.name]));
  $('#rail').innerHTML=items.map(it=>it?`<li><button type="button" data-${it[0]}="${it[1]}" data-rail="${it[1]}" aria-label="${it[2]}"><i></i><span>${it[2]}</span></button></li>`:'<li class="sep" aria-hidden="true"></li>').join('');
}
function buildIndex(){
  $('#mapIndex').innerHTML=CH.map(c=>`<li><button type="button" data-open="${c.n}"><b>${String(c.n).padStart(2,'0')}</b><span>${c.title}<small>${esc(c.sub)}</small></span></button></li>`).join('');
}

/* ----- Scroll / cámara de la portada ----- */
const L={};
function cacheLayers(){$$('.layer').forEach(l=>L[l.dataset.l]=l)}
function updateHero(){
  const vh=innerHeight,W=innerWidth,y=world.scrollTop,p=clamp(y/(vh*2),0,1),m=REDUCED?0:1,mx=state.mx*m,my=state.my*m;
  const portrait=W<760||W/vh<.95,off=portrait?W*.7:0;
  const t=(el,s,x,yy)=>{el.style.transform=`translate3d(${x}px,${yy}px,0) scale(${s})`};
  t(L.sky,1+.12*p,mx*-6,my*-4);
  t(L.far,1+.38*p,mx*-12,my*-6-p*30);
  t(L.dunes,1+.7*p,mx*-20,my*-8+p*50);
  t(L.avenue,1+1.0*p,mx*-30,my*-10+p*90);
  t(L.goddess,1+1.05*p,mx*-24,my*-8-p*26);
  L.goddess.style.opacity=String(1-sstep(.7,.93,p));
  t(L.pylonL,1+1.5*p,-p*W*.46-off+mx*-10,0);t(L.pylonR,1+1.5*p,p*W*.46+off+mx*-10,0);
  $('#flash').style.opacity=String(sstep(.58,.96,p)*.96);
  const hc=$('#heroCopy');hc.style.opacity=String(clamp(1-p*2.6,0,1));hc.style.transform=`translate3d(0,${-p*110}px,0)`;hc.style.pointerEvents=p>.35?'none':'';
  $('#rays').style.opacity=String(1-p*.4);
}
function activeSection(y){
  const vh=innerHeight,ins=$('#inscripcion').offsetTop,map=$('#mapa').offsetTop;
  if(y+vh*.55>=map)return 'mapa';if(y+vh*.55>=ins)return 'inscripcion';return 'umbral';
}
let lastRail='';
function updateRail(){
  const cur=state.chamber?String(state.chamber):activeSection(world.scrollTop);
  if(cur===lastRail)return;lastRail=cur;
  if(!state.chamber&&!modeLock&&aud.setMood)aud.setMood(cur==='mapa'?'mapa':'portada');
  $$('#rail button').forEach(b=>{const on=b.dataset.rail===cur;b.classList.toggle('on',on);if(on)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')});
}
function updateProgress(){
  const el=state.chamber?$('#ch'+state.chamber):world;
  const max=el.scrollHeight-el.clientHeight;$('#progressBar').style.transform=`scaleX(${max>0?clamp(el.scrollTop/max,0,1):0})`;
}
function updateChamber(){
  const el=$('#ch'+state.chamber);if(!el)return;const st=el.scrollTop,bg=$('.ch-scene .bg',el),tt=$('.ch-title',el);
  if(!REDUCED){bg.style.transform=`translate3d(${state.mx*-14}px,${st*.3+state.my*-6}px,0)`;tt.style.transform=`translate3d(0,${st*.14}px,0)`;}
  tt.style.opacity=String(clamp(1-st/(innerHeight*.7),0,1));
  if(state.frame%8===0&&el.dataset.n==='7'){let cur=null;$$('.chron-item',el).forEach(it=>{if(it.getBoundingClientRect().top<innerHeight*.4)cur=it.id});$$('.chron-index a',el).forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur))}
}

/* ----- Cursor y botones magnéticos ----- */
const cur=$('#cur');let curOn=false;
function initCursor(){
  if(!FINE||REDUCED)return;
  document.body.classList.add('has-cursor');
  addEventListener('mousemove',e=>{state.tcx=e.clientX;state.tcy=e.clientY;if(!curOn){curOn=true;cur.classList.add('on');state.cx=e.clientX;state.cy=e.clientY}
    cur.classList.toggle('hot',!!e.target.closest('a,button,[role=button],.shot,input,.pyr,.cmp'));},{passive:true});
  document.addEventListener('mouseleave',()=>{cur.classList.remove('on');curOn=false});
}
function updateCursor(){
  if(!curOn)return;state.cx=lerp(state.cx,state.tcx,.28);state.cy=lerp(state.cy,state.tcy,.28);
  cur.style.transform=`translate3d(${state.cx}px,${state.cy}px,0)`;
}
function updateMagnetic(){
  if(!FINE||REDUCED)return;
  $$('.magnetic').forEach(w=>{const b=w.getBoundingClientRect();if(b.width===0)return;const cx=b.left+b.width/2,cy=b.top+b.height/2,dx=state.tcx-cx,dy=state.tcy-cy,d=Math.hypot(dx,dy),R=Math.max(b.width,b.height)*.9;
    const k=d<R?(1-d/R):0,tx=dx*.28*k,ty=dy*.28*k,el=w.firstElementChild||w;el.style.transform=`translate3d(${tx}px,${ty}px,0)`;el.style.transition=k?'transform .12s':'transform .6s var(--ease)'});
}

/* ----- Partículas de arena y polvo luminoso ----- */
const cv=$('#sand');let ctx=null,parts=[];
function initParticles(){
  if(REDUCED)return;ctx=cv.getContext('2d');if(!ctx)return;
  const rs=()=>{const d=Math.min(devicePixelRatio||1,1.5);cv.width=innerWidth*d;cv.height=innerHeight*d;ctx.setTransform(d,0,0,d,0,0)};rs();addEventListener('resize',rs);
  const N=innerWidth<760?38:90;
  for(let i=0;i<N;i++)parts.push(mk(true,i%4===0));
}
function mk(init,dust){return{x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:dust?1.2+Math.random()*2.2:.5+Math.random()*1.3,vx:dust?.1+Math.random()*.25:.8+Math.random()*2,vy:dust?-.1-Math.random()*.3:(Math.random()-.5)*.35,a:dust?.25+Math.random()*.5:.1+Math.random()*.35,dust,ph:Math.random()*6.28}}
function drawParticles(t){
  if(!ctx)return;const W=innerWidth,H=innerHeight;ctx.clearRect(0,0,W,H);
  const gust=1+Math.sin(t*.0004)*.6,k=state.chamber?.55:1;
  for(const p of parts){
    p.x+=p.vx*gust;p.y+=p.vy+Math.sin(t*.001+p.ph)*.18;
    const dx=p.x-state.tcx,dy=p.y-state.tcy,d2=dx*dx+dy*dy;if(d2<9000){const f=(1-d2/9000)*1.4;p.x+=dx*.02*f;p.y+=dy*.02*f}
    if(p.x>W+10)p.x=-10;if(p.x<-12)p.x=W+10;if(p.y<-10)p.y=H+10;if(p.y>H+10)p.y=-10;
    if(p.dust){ctx.globalAlpha=p.a*k*(.6+.4*Math.sin(t*.002+p.ph));ctx.fillStyle='#ffe9a8';ctx.shadowColor='#E4C77D';ctx.shadowBlur=10;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.283);ctx.fill();ctx.shadowBlur=0}
    else{ctx.globalAlpha=p.a*k;ctx.fillStyle='#e8cd94';ctx.fillRect(p.x,p.y,p.r*1.8,p.r)}
  }
  ctx.globalAlpha=1;
}

/* ----- Bucle principal ----- */
function tick(t){
  requestAnimationFrame(tick);if(document.hidden)return;state.frame++;
  state.mx=lerp(state.mx,state.tx,.07);state.my=lerp(state.my,state.ty,.07);
  if(!state.chamber){if(world.scrollTop<innerHeight*3.1)updateHero();}else updateChamber();
  updateProgress();updateRail();updateCursor();updateMagnetic();drawParticles(t);
}

/* ----- Revelado al hacer scroll ----- */
function initReveal(){
  if(!('IntersectionObserver' in window)){$$('.reveal').forEach(e=>e.classList.add('in'));$('#map').classList.add('drawn');return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.14,rootMargin:'0px 0px -6% 0px'});
  $$('.reveal').forEach(e=>io.observe(e));
  const mo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$('#map').classList.add('drawn');mo.disconnect()}}),{threshold:.2});mo.observe($('#map'));
}
function initMapMotion(){
  $$('.pyr').forEach((p,i)=>p.style.setProperty('--d',i));
  const fr=$('#mapFrame'),tilt=$('#mapTilt'),a=$('#mpBase'),b=$('#mpMid');
  if(!FINE||REDUCED)return;
  fr.addEventListener('mousemove',e=>{const r=fr.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    tilt.style.setProperty('--tx',(-y*5).toFixed(2)+'deg');tilt.style.setProperty('--ty',(x*7).toFixed(2)+'deg');
    a.style.transform=`translate(${-x*14}px,${-y*10}px)`;b.style.transform=`translate(${-x*7}px,${-y*5}px)`;},{passive:true});
  fr.addEventListener('mouseleave',()=>{tilt.style.setProperty('--tx','0deg');tilt.style.setProperty('--ty','0deg');a.style.transform='';b.style.transform=''});
  $$('.pyr').forEach(p=>p.addEventListener('mouseenter',()=>sfx.hover()));
  $$('.pyr').forEach(p=>p.addEventListener('focus',()=>sfx.hover()));
}

/* ----- Veil: transición de iris ----- */
const veilEl=$('#veil');
function veilAnim(x,y,from,to,dur){
  veilEl.style.setProperty('--vx',x+'px');veilEl.style.setProperty('--vy',y+'px');
  if(!veilEl.animate)return Promise.resolve();
  const a=veilEl.animate([{clipPath:`circle(${from} at ${x}px ${y}px)`},{clipPath:`circle(${to} at ${x}px ${y}px)`}],{duration:dur,easing:'cubic-bezier(.65,0,.35,1)',fill:'forwards'});
  return a.finished.catch(()=>{});
}
function showChamber(n,opts){
  const el=$('#ch'+n);
  $$('.chamber').forEach(c=>{c.classList.remove('open');c.setAttribute('aria-hidden','true')});
  el.classList.add('open');el.removeAttribute('aria-hidden');el.scrollTop=0;state.chamber=n;
  try{world.inert=true}catch(e){}world.setAttribute('aria-hidden','true');
  if(opts&&opts.lab)selectLab(n,opts.lab);
  try{el.focus({preventScroll:true})}catch(e){}
  aud.setMood&&aud.setMood('c'+n);
  if(state.exp)expHide();
}
let gateHook=null,modeLock='';
function openChamber(n,opts={}){
  const c=CH[n-1];if(!c||state.busy)return;
  if(gateHook&&!opts.bypass&&gateHook(n,opts))return;
  if(state.chamber===n){if(opts.lab)selectLab(n,opts.lab);return}
  state.busy=true;sfx.open();
  state.lastFocus=document.activeElement;
  const fin=()=>{state.busy=false};
  try{if(location.hash!=='#camara-'+n)history.pushState({n},'','#camara-'+n)}catch(e){}
  if(REDUCED||!veilEl.animate){showChamber(n,opts);fin();return}
  const x=opts.x??innerWidth/2,y=opts.y??innerHeight/2,cx=innerWidth/2,cy=innerHeight/2;
  veilEl.classList.add('cover');
  veilAnim(x,y,'0px','150vmax',state.chamber?520:820).then(()=>{showChamber(n,opts);return veilAnim(cx,cy,'150vmax','0px',760)}).then(()=>{veilEl.classList.remove('cover');veilEl.style.clipPath='circle(0 at 50% 50%)';fin()});
}
function closeChamber(silent,after){
  if(!state.chamber){after&&after();return}
  if(state.busy)return;state.busy=true;if(!silent)sfx.close();
  const el=$('#ch'+state.chamber),fromN=state.chamber;
  const done=()=>{el.classList.remove('open');el.setAttribute('aria-hidden','true');state.chamber=0;try{world.inert=false}catch(e){}world.removeAttribute('aria-hidden');
    world.scrollTop=$('#mapa').offsetTop;state.busy=false;aud.setMood&&aud.setMood(state.exp?'mundo':'mapa');state.exp&&expBack();
    const pb=$(`.pyr[data-n="${fromN}"]`);try{pb&&pb.focus({preventScroll:true})}catch(e){}after&&after();};
  try{if(location.hash.indexOf('#camara-')===0)history.pushState({n:0},'',location.pathname+location.search)}catch(e){}
  if(REDUCED||!veilEl.animate){done();return}
  const cx=innerWidth/2,cy=innerHeight/2;veilEl.classList.add('cover');
  veilAnim(cx,cy,'0px','150vmax',620).then(()=>{done();return veilAnim(cx,cy,'150vmax','0px',720)}).then(()=>{veilEl.classList.remove('cover');veilEl.style.clipPath='circle(0 at 50% 50%)'});
}
function goto(id){
  const run=()=>{const el=$('#'+id);if(!el)return;const top=id==='umbral'?0:el.offsetTop;world.scrollTo({top,behavior:REDUCED?'auto':'smooth'})};
  if(state.chamber){closeChamber(true,()=>setTimeout(run,60))}else run();
}
function selectLab(n,labId){
  const el=$('#ch'+n);if(!el)return;
  $$('[data-lab-tab]',el).forEach(b=>b.setAttribute('aria-selected',String(b.dataset.labTab===labId)));
  $$('.lab-panel',el).forEach(p=>{p.hidden=p.id!=='lab-'+labId});
  const tabs=$('.lab-tabs',el);if(tabs)setTimeout(()=>{const top=tabs.getBoundingClientRect().top-el.getBoundingClientRect().top+el.scrollTop-76;el.scrollTo({top,behavior:REDUCED?'auto':'smooth'})},opts_delay(el));
}
const opts_delay=el=>el.classList.contains('open')?30:900;

/* ----- Lightbox con zoom ----- */
const lb={el:$('#lightbox'),img:$('#lbImg'),cap:$('#lbCap'),count:$('#lbCount'),list:[],i:0,z:1,x:0,y:0,drag:null,opener:null};
function lbOpen(btn){
  const g=btn.dataset.g,scope=btn.closest('.chamber')||document;
  lb.list=$$(`.shot[data-g="${g}"]`,scope).map(b=>{const f=b.closest('figure'),cp=$('figcaption',f);return{k:b.dataset.k,t:$('b',cp)?$('b',cp).textContent:'',s:cp?cp.textContent.replace($('b',cp)?$('b',cp).textContent:'','').replace('CAPTURA ORIGINAL',''):''}});
  lb.i=Math.max(0,$$(`.shot[data-g="${g}"]`,scope).indexOf(btn));lb.opener=btn;lbShow();lb.el.classList.add('open');$('#lbClose').focus();sfx.click();
}
function lbShow(){
  const it=lb.list[lb.i];lb.img.src=IMGS[it.k]||it.k;lb.img.alt=it.t;lb.cap.innerHTML=`<b>${esc(it.t)}</b>${esc(it.s)}`;lb.count.textContent=`${lb.i+1} / ${lb.list.length}`;lbReset();
  $('#lbPrev').style.display=$('#lbNext').style.display=lb.list.length>1?'':'none';
}
function lbReset(){lb.z=1;lb.x=0;lb.y=0;lbApply()}
function lbApply(){lb.img.style.transform=`translate(${lb.x}px,${lb.y}px) scale(${lb.z})`;lb.img.style.cursor=lb.z>1?'grab':'zoom-in'}
function lbClose(){lb.el.classList.remove('open');try{lb.opener&&lb.opener.focus({preventScroll:true})}catch(e){}}
function lbStep(d){lb.i=(lb.i+d+lb.list.length)%lb.list.length;lbShow()}
function initLightbox(){
  $('#lbClose').onclick=lbClose;$('#lbPrev').onclick=()=>lbStep(-1);$('#lbNext').onclick=()=>lbStep(1);
  lb.el.addEventListener('click',e=>{if(e.target===lb.el||e.target.id==='lbStage')lbClose()});
  lb.img.addEventListener('click',e=>{if(lb.moved){lb.moved=false;return}lb.z=lb.z>1?1:2.6;if(lb.z===1){lb.x=lb.y=0}lb.img.style.transition='transform .35s var(--ease)';lbApply()});
  lb.img.addEventListener('pointerdown',e=>{if(lb.z<=1)return;lb.drag={x:e.clientX-lb.x,y:e.clientY-lb.y};lb.moved=false;lb.img.setPointerCapture(e.pointerId);lb.img.style.transition='none';lb.img.style.cursor='grabbing'});
  lb.img.addEventListener('pointermove',e=>{if(!lb.drag)return;lb.moved=true;lb.x=e.clientX-lb.drag.x;lb.y=e.clientY-lb.drag.y;lbApply()});
  lb.img.addEventListener('pointerup',()=>{lb.drag=null;lbApply()});
  $('#lbStage').addEventListener('wheel',e=>{e.preventDefault();lb.img.style.transition='transform .15s';lb.z=clamp(lb.z*(e.deltaY<0?1.18:.85),1,6);if(lb.z===1){lb.x=lb.y=0}lbApply()},{passive:false});
}

/* ----- Copiar al portapapeles ----- */
function copyText(btn){
  const txt=btn.dataset.copy,ok=()=>{const o=btn.textContent;btn.textContent='Copiado';setTimeout(()=>btn.textContent=o,1400)};
  const fb=()=>{try{const ta=document.createElement('textarea');ta.value=txt;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.select();const r=document.execCommand('copy');ta.remove();r?ok():btn.textContent='Selecciona y copia'}catch(e){btn.textContent='Selecciona y copia'}};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(ok,fb);else fb();
}

/* ----- Eventos globales (delegación) ----- */
function bindEvents(){
  app.addEventListener('click',e=>{
    const t=e.target;let el;
    if(el=t.closest('.pyr')){sfx.click();openChamber(+el.dataset.n,{x:e.clientX,y:e.clientY});return}
    if(el=t.closest('[data-open]')){e.preventDefault();sfx.click();openChamber(+el.dataset.open,{x:e.clientX||innerWidth/2,y:e.clientY||innerHeight/2,lab:el.dataset.lab,bypass:true});return}
    if(el=t.closest('[data-act="map"]')){sfx.click();goto('mapa');return}
    if(el=t.closest('[data-goto]')){e.preventDefault();sfx.click();goto(el.dataset.goto);return}
    if(el=t.closest('.shot')){lbOpen(el);return}
    if(el=t.closest('.copy')){copyText(el);return}
    if(el=t.closest('[data-lab-tab]')){sfx.click();selectLab(state.chamber,el.dataset.labTab);return}
    if(el=t.closest('a[data-slot]')){e.preventDefault();const ch=$('#ch'+state.chamber),dest=ch&&$(el.getAttribute('href'),ch);if(dest){const bar=$('.ch-bar',ch),offset=(bar?bar.getBoundingClientRect().height:56)+12;const top=dest.getBoundingClientRect().top-ch.getBoundingClientRect().top+ch.scrollTop-offset;ch.scrollTo({top:Math.max(0,top),behavior:REDUCED?'auto':'smooth'})}return}
  });
  app.addEventListener('keydown',e=>{
    const pyr=e.target.closest&&e.target.closest('.pyr');
    if(pyr&&(e.key==='Enter'||e.key===' ')){e.preventDefault();const r=pyr.getBoundingClientRect();sfx.click();openChamber(+pyr.dataset.n,{x:r.left+r.width/2,y:r.top+r.height/2});return}
    const tab=e.target.closest&&e.target.closest('[data-lab-tab]');
    if(tab&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){const tabs=$$('[data-lab-tab]',tab.closest('.chamber')),i=tabs.indexOf(tab),nx=tabs[(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length];nx.focus();nx.click();e.preventDefault()}
  });
  addEventListener('keydown',e=>{
    if(lb.el.classList.contains('open')){if(e.key==='Escape')lbClose();else if(e.key==='ArrowLeft')lbStep(-1);else if(e.key==='ArrowRight')lbStep(1);else if(e.key==='Tab'){const f=$$('button',lb.el).filter(b=>b.offsetParent);const i=f.indexOf(document.activeElement);const n=e.shiftKey?(i<=0?f.length-1:i-1):(i===f.length-1?0:i+1);f[n].focus();e.preventDefault()}return}
    if(e.key==='Escape'){if(guide.open){guide.close();return}if(state.chamber)goto('mapa')}
  });
  addEventListener('mousemove',e=>{state.tx=(e.clientX/innerWidth-.5)*2;state.ty=(e.clientY/innerHeight-.5)*2},{passive:true});
  addEventListener('resize',()=>{setVh()});
  addEventListener('popstate',()=>{const m=location.hash.match(/#camara-(\d)/);if(m){if(+m[1]!==state.chamber)openChamber(+m[1])}else if(state.chamber){const old=state.busy;closeChamber(true)}});
  document.addEventListener('input',e=>{const r=e.target;if(r.matches&&r.matches('.cmp input')){r.closest('.cmp').style.setProperty('--pos',r.value+'%')}});
  document.addEventListener('visibilitychange',()=>aud.visibility());
  $('#skipLink').addEventListener('click',e=>{e.preventDefault();goto('mapa');world.focus({preventScroll:true})});
}
