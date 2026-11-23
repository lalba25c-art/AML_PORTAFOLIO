/* ---------- 18. GUARDIANAS Y RETOS · APERTURA · DIARIO · SALA SECRETA · CUMBRE ---------- */
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const TYPE_L={mc:'Selección múltiple',tf:'Verdadero o falso',cmd:'Identifica el comando',order:'Ordena los pasos',scn:'Escenario de ciberseguridad'};
const DIF_L=['','Fácil','Media','Difícil'];
const EN={n:0,qs:[],i:0,res:[],phase:'intro',state:'ask',sel:null,tries:0,opts:null,pool:[],ans:[],opening:null};
function pickQs(n){
  const b=QUIZ[n]||[];const by=d=>shuf(b.filter(q=>q.d===d));
  let out=[...by(1).slice(0,1),...by(2).slice(0,2),...by(3).slice(0,1)];
  if(out.length<4)out=out.concat(shuf(b.filter(q=>!out.includes(q))).slice(0,4-out.length));
  return out.sort((a,b)=>a.d-b.d).map(q=>Object.assign({},q,{_opts:null,_pool:null}));
}
function enMarkup(){
  const g=GUARD[EN.n-1],c=CH[EN.n-1];
  return `<svg class="en-bg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${grad('enbg',[[0,'#05090a'],[1,c.bg]])}${rgrad('enl',[[0,g.gl+'44'],[1,g.gl+'00']])}</defs><rect width="1600" height="900" fill="url(#enbg)"/><circle cx="420" cy="380" r="520" fill="url(#enl)"/>${starz(40,EN.n+7)}</svg>
  <button class="ov-btn" id="enBack" type="button" style="left:18px;top:62px">← Volver al mundo</button>
  <div class="en-wrap"><div class="en-g"><div class="medal" id="enMedal" style="--gl:${g.gl};--ga:${g.ga}">${g.art()}</div>
   <h2>${esc(g.name)}</h2><div class="role">${esc(g.role)}</div><div class="scroll-box" id="enSay" aria-live="polite"></div><div class="en-me"><span class="pic">${avBust(avGet(),true)}</span><span>${esc(avName())}</span></div></div>
   <div class="en-q" id="enQ"></div></div>`;
}
function openEncounter(n,opts){
  Object.assign(EN,{n,qs:pickQs(n),i:0,res:[],phase:'intro',state:'ask',sel:null,tries:0,opts:opts||{}});
  const el=$('#encounter');el.innerHTML=enMarkup();ovShow(el);
  aud.setMood('reto');comp.mood('curious',3000);comp.tip('Una guardiana nos corta el paso. ¡Yo te ayudo!',4500);
  comp.hintCtx=()=>EN.phase==='quiz'&&EN.qs[EN.i]?(EN.qs[EN.i].h||HINT_GEN[EN.qs[EN.i].t]):null;
  setSay(GUARD[n-1].intro);renderEn();
  if(opts&&opts.direct){const b=$('#enStart');b&&b.click()}
  setTimeout(()=>{const b=$('#enStart')||$('#enBack');try{b.focus({preventScroll:true})}catch(e){}},300);
}
function setSay(t){const s=$('#enSay');if(s)s.innerHTML=`<b>${esc(GUARD[EN.n-1].name)}</b>${esc(t)}`}
function closeEncounter(){if(typeof TP!=='undefined'&&TP.on)tpClose();const el=$('#encounter');ovHide(el);el.innerHTML='';EN.phase='';comp.hintCtx=null;if(!state.exp&&!state.chamber)aud.setMood('mapa');else if(state.exp&&!state.chamber)aud.setMood('mundo')}
function qState(q){
  if(q.t==='order'){if(!q._pool)q._pool=shuf(q.o.map((_,i)=>i));if(q._pool.every((v,i)=>v===i))q._pool.reverse();return}
  if(!q._opts)q._opts=q.t==='tf'?[{txt:'Verdadero',ok:q.a===true},{txt:'Falso',ok:q.a===false}]:shuf(q.o.map((t,k)=>({txt:t,ok:k===q.a})));
}
function renderEn(){
  const Q=$('#enQ');if(!Q)return;
  if(EN.phase==='intro'){Q.innerHTML=`<div class="en-meta"><span class="dif">Prueba de la guardiana</span><span>${EN.qs.length} preguntas</span></div><h3>«${esc(GUARD[EN.n-1].place)}»</h3><p>${esc(CH[EN.n-1].sub)}. Si te equivocas, Sadchuruzen te ayudará y podrás intentarlo otra vez. Nada se bloquea para siempre.</p><div class="en-actions"><button class="btn" id="enStart" type="button">Aceptar la prueba</button></div><p class="en-skip">¿Prefieres explorar sin prueba? <button type="button" id="enSkip">Entrar de todos modos</button></p>`;return}
  if(EN.phase==='result'){
    const ok=EN.res.filter(Boolean).length,pass=ok>=2;
    Q.innerHTML=`<div class="en-meta"><span class="dif">Resultado</span></div><h3>${pass?'¡Prueba superada!':'Casi lo tienes'}</h3><p>${pass?`Has acertado ${ok} de ${EN.qs.length} a la primera. ${esc(GUARD[EN.n-1].win)}`:`Has acertado ${ok} de ${EN.qs.length} a la primera. No pasa nada: repasa y prueba con otras preguntas, o entra y vuelve cuando quieras.`}</p><div class="en-actions">${pass?'<button class="btn" id="enOpen" type="button">Abrir la cámara</button>':'<button class="btn" id="enAgain" type="button">Intentarlo con otras preguntas</button><button class="btn" id="enSkip" type="button" style="opacity:.85">Entrar de todos modos</button>'}</div>`;
    if(pass){setSay(GUARD[EN.n-1].win);$('#enMedal').classList.add('react-good')}return}
  const q=EN.qs[EN.i];qState(q);
  const dots=EN.qs.map((_,k)=>`<i class="${k<EN.i?'ok':k===EN.i?'cur':''}"></i>`).join('');
  let body='';const locked=EN.state==='ok'||EN.state==='reveal';
  if(q.t==='order'){
    const ans=EN.ans,pool=q._pool.filter(v=>!ans.includes(v));
    body=`<div class="ord-lbl">Tu orden</div><ol class="ord-ans" aria-label="Tu orden">${ans.map(v=>`<li><button class="opt ${locked?(EN.state==='ok'?'ok':''):''} mono" data-ans="${v}" ${locked?'disabled':''}>${esc(q.o[v])}</button></li>`).join('')}</ol><div class="ord-lbl">Pasos disponibles</div><div class="ord-pool">${pool.map(v=>`<button class="opt mono" data-pool="${v}" ${locked?'disabled':''}>${esc(q.o[v])}</button>`).join('')}</div>`;
  }else{
    body=`<ul class="opts" role="radiogroup" aria-label="Opciones de respuesta">${q._opts.map((o,k)=>{let cl='';if(EN.sel===k)cl=' sel';if(EN.state==='ok'||EN.state==='reveal'){if(o.ok)cl=' ok';else if(EN.sel===k)cl=' no'}else if(EN.state==='retry'&&EN.sel===k)cl=' no';
      return `<li><button class="opt${q.mono?' mono':''}${cl}" role="radio" aria-checked="${EN.sel===k}" data-k="${k}" ${locked?'disabled':''}><span class="k"><b>${String.fromCharCode(65+k)}</b></span><span>${esc(o.txt)}</span></button></li>`}).join('')}</ul>`;
  }
  let fb='',act='';
  if(EN.state==='ok')fb=`<div class="en-fb ok show" role="status"><b>¡Correcto!</b>${esc(q.e)}</div>`;
  else if(EN.state==='retry')fb=`<div class="en-fb no show" role="status"><b>Aún no</b>Sadchuruzen te da una pista: ${esc(q.h||HINT_GEN[q.t])}</div>`;
  else if(EN.state==='reveal')fb=`<div class="en-fb no show" role="status"><b>Aprendamos de esta</b>${esc(q.e)}${q.t==='order'?`<br><br><b>Orden correcto</b>${q.o.map((s,k)=>`${k+1}. ${esc(s)}`).join('<br>')}`:''}</div>`;
  if(EN.state==='ask')act=`<button class="btn" id="enCheck" type="button" ${(q.t==='order'?EN.ans.length<q.o.length:EN.sel===null)?'disabled style="opacity:.5"':''}>Comprobar</button><button class="btn" id="enHint" type="button" style="opacity:.85">Pedir pista</button>`;
  else if(EN.state==='retry')act=`<button class="btn" id="enRetry" type="button">Intentarlo de nuevo</button>`;
  else act=`<button class="btn" id="enNext" type="button">${EN.i===EN.qs.length-1?'Ver resultado':'Siguiente'}</button>`;
  Q.innerHTML=`<div class="en-meta"><span class="dif">${DIF_L[q.d]}</span><span>${TYPE_L[q.t]}</span><span>${EN.i+1}/${EN.qs.length}</span><div class="en-dots" aria-hidden="true">${dots}</div></div><h3 id="enQh">${esc(q.q)}</h3>${body}<div class="en-actions">${act}</div>${fb}<p class="en-skip">¿Atascada? <button type="button" id="enSkip">Entrar de todos modos</button></p>`;
}
function enCheck(){
  const q=EN.qs[EN.i];let ok;
  if(q.t==='order')ok=EN.ans.every((v,i)=>v===i);else ok=!!q._opts[EN.sel].ok;
  const med=$('#enMedal');med.classList.remove('react-bad','react-good');void med.offsetWidth;
  if(ok){P.d.stats.ok++;P.save();EN.res.push(EN.tries===0);EN.state='ok';med.classList.add('react-good');setSay(comp.line(GUARD[EN.n-1].ok));comp.react('ok');aud.tone&&(aud.tone(660,.5,'sine',.14,990),aud.tone(990,.7,'sine',.1,1320))}
  else{P.d.stats.ko++;P.save();EN.tries++;med.classList.add('react-bad');setSay(comp.line(GUARD[EN.n-1].ko));comp.react('ko');aud.tone&&aud.tone(220,.4,'sawtooth',.08,150);
    if(EN.tries>=2){EN.res.push(false);EN.state='reveal'}else EN.state='retry'}
  renderEn();const f=$('.en-fb');if(f)try{f.scrollIntoView({block:'nearest',behavior:REDUCED?'auto':'smooth'})}catch(e){}
}
function enPass(){
  const n=EN.n;P.d.done[n]=1;P.d.pass[n]=1;P.save();comp.progress();exUpdateProg&&exUpdateProg();
  const go=()=>startUnlock(n,()=>{closeEncounter();openChamber(n,Object.assign({},EN.opts,{bypass:true}))});
  if(TP.on)tpPurify(go);else{comp.react('unlock');go()}
}
function enterAnyway(){const n=EN.n,o=EN.opts;P.d.pass[n]=1;P.save();closeEncounter();openChamber(n,Object.assign({},o,{bypass:true}))}
function bindEncounter(){
  $('#encounter').addEventListener('click',e=>{
    const t=e.target;let b;
    if(t.closest('#enBack')){sfx.click();closeEncounter();return}
    if(t.closest('#enStart')){sfx.click();EN.phase='quiz';EN.state='ask';EN.sel=null;EN.tries=0;EN.ans=[];qState(EN.qs[0]);aud.setMood('reto');setSay('Escucha con atención. Aquí va mi primer enigma.');renderEn();return}
    if(t.closest('#enSkip')){sfx.click();enterAnyway();return}
    if(t.closest('#enAgain')){sfx.click();EN.qs=pickQs(EN.n);EN.i=0;EN.res=[];EN.phase='quiz';EN.state='ask';EN.sel=null;EN.tries=0;EN.ans=[];qState(EN.qs[0]);setSay('Otra vez, con nuevos enigmas. Tú puedes.');renderEn();return}
    if(t.closest('#enOpen')){sfx.click();enPass();return}
    if(t.closest('#enHint')){comp.hint();return}
    if(t.closest('#enCheck')){sfx.click();enCheck();return}
    if(t.closest('#enRetry')){sfx.click();EN.state='ask';EN.sel=null;EN.ans=[];renderEn();return}
    if(t.closest('#enNext')){sfx.click();EN.i++;EN.state='ask';EN.sel=null;EN.tries=0;EN.ans=[];if(EN.i>=EN.qs.length){EN.phase='result'}else{qState(EN.qs[EN.i]);setSay('Siguiente enigma…')}renderEn();return}
    if(b=t.closest('[data-k]')){sfx.click();if(EN.state==='ask'||EN.state==='retry'){EN.sel=+b.dataset.k;EN.state='ask';renderEn();const x=$(`[data-k="${EN.sel}"]`);try{x.focus({preventScroll:true})}catch(e){}}return}
    if(b=t.closest('[data-pool]')){sfx.click();EN.ans.push(+b.dataset.pool);if(EN.state==='retry')EN.state='ask';renderEn();return}
    if(b=t.closest('[data-ans]')){sfx.click();EN.ans=EN.ans.filter(v=>v!==+b.dataset.ans);if(EN.state==='retry')EN.state='ask';renderEn();return}
  });
}

/* ----- Apertura de la cámara: «DESCIFRANDO EL MISTERIO» ----- */
const TECH_GL=['<path d="M8 20v-5a6 6 0 0 1 12 0v5M6 20h16v14H6Z" />','<rect x="9" y="9" width="22" height="22" rx="2"/><path d="M14 4v5M20 4v5M26 4v5M14 31v5M20 31v5M26 31v5M4 14h5M4 20h5M4 26h5M31 14h5M31 20h5M31 26h5"/>','<path d="M14 6l-4 28M26 6l-4 28M5 15h30M3 25h30"/>','<path d="M8 10h4v6H8zM16 10h4v6h-4zM24 10h4v6h-4zM8 24h4v6H8zM24 24h4v6h-4z"/>'];
function startUnlock(n,done){
  const el=$('#unlock'),g=GUARD[n-1],c=CH[n-1],fi=FACT_BY_CH[n],f=FACTS[fi]||FACTS[0];
  P.d.facts[fi]=1;P.save();
  const glyphs=[...['eye','ankh','scarab','feather'].map(k=>`<svg viewBox="0 0 40 40" class="glyph"><use href="#g-${k}"/></svg>`),...TECH_GL.map(p=>`<svg viewBox="0 0 40 40" class="glyph" fill="none" stroke="#E4C77D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`)];
  el.innerHTML=`<div class="un-room"></div><div class="un-relief"><svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g stroke="#8a6428" stroke-width="3" fill="none" opacity=".7">${Array.from({length:12},(_,i)=>`<rect x="${90+i*125}" y="${150+(i%2)*40}" width="90" height="${520-(i%3)*60}" rx="4"/>`).join('')}</g>${Array.from({length:12},(_,i)=>use(GL[i%GL.length],110+i*125,200+(i%2)*40,50,'glyph',i)).join('')}</svg></div>
  <div class="un-door" aria-hidden="true"><i><svg viewBox="0 0 40 40" style="position:absolute;right:18%;top:40%;width:80px;stroke:#E4C77D;fill:none;opacity:.5"><use href="#g-ankh"/></svg></i><i></i><div class="carve"></div></div><div class="un-beam"></div><canvas id="unCv" aria-hidden="true"></canvas>
  <button class="ov-btn skipbtn" id="unSkip" type="button" style="right:18px;top:18px">Saltar</button>
  <div class="un-txt"><h2>DESCIFRANDO EL MISTERIO</h2><div class="un-glyphs" aria-hidden="true">${glyphs.map(s=>s).join('')}</div></div>
  <div class="un-hero" aria-hidden="true">${avFull(avGet(),{live:true}).replace('class="ex-svg','class="ex-svg cheer')}</div><div class="un-fact"><small>Dato curioso · ${esc(g.place)}</small><p>${esc(f.t)}</p><em>${esc(f.s)}</em><br><button class="btn un-go" id="unGo" type="button">Entrar en la cámara</button></div>`;
  ovShow(el);el.className='ov-on';aud.setMood('unlock');
  const T=[];let alive=true,raf=0;const at=(ms,fn)=>T.push(setTimeout(()=>alive&&fn(),ms));
  const cls=k=>el.classList.add(k);
  const finish=()=>{if(!alive)return;alive=false;T.forEach(clearTimeout);cancelAnimationFrame(raf);el.className='';ovHide(el);el.innerHTML='';done&&done()};
  const toFact=()=>{['t-open','t-relief','t-beam','t-title','t-fact'].forEach(cls);$$('.un-glyphs .glyph',el).forEach(g=>g.classList.add('lit'));alive&&(alive=true)};
  $('#unGo',el).addEventListener('click',()=>{sfx.click();finish()});
  $('#unSkip',el).addEventListener('click',()=>{T.forEach(clearTimeout);cancelAnimationFrame(raf);toFact()});
  // tormenta de arena
  const cv=$('#unCv',el),cx=cv.getContext&&cv.getContext('2d');
  const run=()=>{if(!cx)return;cv.width=innerWidth/2|0;cv.height=innerHeight/2|0;const P_=Array.from({length:240},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,v:3+Math.random()*7,s:.5+Math.random()*2,a:.2+Math.random()*.5}));const t0=performance.now();
    const loop=t=>{if(!alive)return;const k=(t-t0)/1000,env=k<1.2?k/1.2:k>4.8?Math.max(0,1-(k-4.8)/1.2):1;cx.clearRect(0,0,cv.width,cv.height);cx.fillStyle=`rgba(216,189,140,${.35*env})`;cx.fillRect(0,0,cv.width,cv.height);
      P_.forEach(p=>{p.x+=p.v;p.y+=Math.sin((p.x+k*60)/40)*.8;if(p.x>cv.width)p.x=-5;cx.fillStyle=`rgba(240,220,170,${p.a*env})`;cx.fillRect(p.x,p.y,p.s*2,p.s)});
      if(k<6)raf=requestAnimationFrame(loop);else cx.clearRect(0,0,cv.width,cv.height)};raf=requestAnimationFrame(loop)};
  if(REDUCED){toFact();return}
  cls('t-shake');sfx.open();
  at(1300,()=>{el.classList.remove('t-shake');cls('t-open');run();aud.noise&&aud.noise(3,300,2400,.5);aud.tone&&aud.tone(50,2,'sine',.3,35)});
  at(2900,()=>cls('t-relief'));
  at(3900,()=>{cls('t-beam');aud.fanfare&&aud.fanfare()});
  at(5200,()=>{cls('t-title');$$('.un-glyphs .glyph',el).forEach((g,i)=>setTimeout(()=>{g.classList.add('lit');aud.tone&&aud.tone(520+i*90,.4,'sine',.07)},i*320))});
  at(8600,()=>cls('t-fact'));
  setTimeout(()=>{try{$('#unSkip',el).focus({preventScroll:true})}catch(e){}},200);
}

/* ----- Fichas de objetos y diario ----- */
function openFicha(id,nuevo){
  const a=ARTIFACTS.find(x=>x.id===id);if(!a)return;const el=$('#ficha');const g=GUARD[a.ch-1];
  el.innerHTML=`<div class="fi"><div class="fi-card" role="document"><div class="big">${a.svg()}</div><h2>${esc(a.name)}</h2><div class="ca">${nuevo?'Nuevo hallazgo · ':''}Cámara ${String(a.ch).padStart(2,'0')} · ${esc(g.place)}</div>
  <dl><dt>Historia</dt><dd>${esc(a.story||'')}</dd><dt>Función</dt><dd>${esc(a.fn)}</dd><dt>Relación con la ciberseguridad</dt><dd>${esc(a.sec)}</dd><dt>Cámara relacionada</dt><dd>${esc(g.place)} — ${esc(CH[a.ch-1].sub)}</dd><dt>Lugar del hallazgo</dt><dd>${esc(typeof P.d.items[id]==='string'?P.d.items[id]:'Mundo del Nilo')}</dd><dt>Estado</dt><dd>${P.d.items[id]?'Recogida · guardada en el diario':'Sin recoger'}</dd></dl>
  <div class="row"><button class="btn" id="fiClose" type="button">Cerrar</button><button class="btn" id="fiJ" type="button">Ver diario</button></div></div></div>`;
  ovShow(el);sfx.click();aud.fanfare&&nuevo&&aud.tone&&aud.tone(880,.8,'sine',.1,1320);
  comp.tip(comp.line(['¡Qué hallazgo! Lo guardo en el diario.','¡Mira eso! Esto tiene una historia.']),4500);comp.mood('curious',3000);
  setTimeout(()=>{try{$('#fiClose',el).focus({preventScroll:true})}catch(e){}},150);
}
function closeFicha(){const el=$('#ficha');ovHide(el);el.innerHTML=''}
function expPct(){const m=MISSIONS.filter(x=>x.ok()).length,c=CORE().filter(a=>P.d.items[a.id]).length;return Math.round((P.count()+m+c)/(7+MISSIONS.length+CORE().length)*100)}
function avatarPicker(){
  const a=avGet(),sd=avKind(a).n;
  return `<div class="avp"><div class="avp-prev cl-ex" style="position:relative;width:70px;transform:none">${avFull(a,{live:true})}</div><div><b>${esc(avName())}</b><br><small>${a.created?esc(sd)+'.':'Aún no has creado a tu explorador.'} Los colores, adornos y amuletos nuevos se desbloquean al superar cámaras.</small><div class="row" style="margin-top:10px"><button class="btn" id="jrEdit" type="button">${a.created?'Editar mi explorador':'Crear mi explorador'}</button></div></div></div>`;
}
function openJournal(){
  const el=$('#journal'),n=P.count(),it=Object.keys(P.d.items).length,pc=expPct();
  el.innerHTML=`<button class="ov-btn" id="jrClose" type="button" style="left:18px;top:18px">Cerrar diario ✕</button><div class="jr"><div class="jr-in">
  <h2>Diario de expedición</h2><p class="sub">Lo que Sadchuruzen y tú habéis descubierto hasta ahora. Sin prisas: el mundo espera.</p>
  <div class="bar" aria-hidden="true"><i style="width:${pc}%"></i></div><p><b>${pc}%</b> de la expedición · ${n} de 7 cámaras · ${CORE().filter(a=>P.d.items[a.id]).length} de ${CORE().length} reliquias · ${MISSIONS.filter(m=>m.ok()).length} de ${MISSIONS.length} misiones</p>
  <h3>Apartados académicos</h3><p style="color:var(--ink-soft);font-size:15px;margin:0 0 12px">Siempre accesibles, sin necesidad de superar retos.</p>${acadHTML()}
  <h3>Cámaras</h3><div class="jr-ch">${CH.map((c,i)=>`<button type="button" class="jr-c ${P.d.done[c.n]?'done':'lock'}" data-jn="${c.n}"><span class="st"><i>${P.d.done[c.n]?'✓':c.roman}</i></span><span><b>${esc(GUARD[i].place)}</b><span>${P.d.done[c.n]?'Desbloqueada':'Pendiente · '+esc(GUARD[i].name)}</span></span></button>`).join('')}</div>
  <h3>Misiones opcionales</h3><ul class="jr-ms">${MISSIONS.map(m=>`<li class="${m.ok()?'ok':''}"><i>${m.ok()?'✓':'○'}</i><span><b>${esc(m.t)}</b><br><small>${esc(m.d)}</small></span></li>`).join('')}</ul>
  <h3>Colección de reliquias</h3><div class="jr-items">${ARTIFACTS.map(a=>P.d.items[a.id]?`<button type="button" class="jr-i" data-ji="${a.id}">${a.svg()}<span>${esc(a.name)}</span></button>`:`<div class="jr-i empty"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="none" stroke="#E4C77D" stroke-dasharray="4 5"/><text x="32" y="40" text-anchor="middle" font-size="22" fill="#E4C77D">?</text></svg><span>Sin descubrir</span></div>`).join('')}</div>
  <h3>Datos curiosos descubiertos</h3><ul class="jr-facts">${Object.keys(P.d.facts).length?Object.keys(P.d.facts).map(k=>`<li>${esc(FACTS[k].t)}<br><small>${esc(FACTS[k].s)}</small></li>`).join(''):'<li><small>Aparecerán cuando abras cámaras.</small></li>'}</ul>
  <h3>Mi explorador</h3>${avatarPicker()}
  <h3>Otros</h3><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" id="jrRoom" type="button" ${P.d.room?'':'hidden'}>Entrar en la sala secreta</button><button class="btn" id="jrReset" type="button" style="opacity:.8">Reiniciar expedición</button><button class="btn" id="jrResetAll" type="button" style="opacity:.6">Borrar todo, incluido mi perfil</button></div>
  </div></div>`;
  ovShow(el);sfx.click();setTimeout(()=>{try{$('#jrClose',el).focus({preventScroll:true})}catch(e){}},150);
}
function closeJournal(){const el=$('#journal');ovHide(el);el.innerHTML=''}

/* ----- Habitación de objetos perdidos ----- */
function openRoom(){
  const el=$('#room');P.d.room=true;P.save();
  el.innerHTML=`<div class="rm-view"><svg class="bg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${rgrad('rml',[[0,'rgba(255,226,154,.55)'],[1,'rgba(255,226,154,0)']])}</defs><rect width="1600" height="900" fill="#0b0805"/><circle cx="800" cy="360" r="620" fill="url(#rml)"/>${[120,330,1270,1480].map(x=>`<rect x="${x-24}" y="70" width="48" height="760" fill="#17110a" stroke="#6e5528" stroke-width="2"/>`).join('')}<path d="M0 840H1600V900H0Z" fill="#1c140c"/></svg>
  <div class="rm-title">Habitación de objetos perdidos<small>Pulsa un objeto para recogerlo</small></div>
  <div class="rm-items">${CORE().map(a=>`<button type="button" class="rm-it ${P.d.items[a.id]?'got':''}" data-ri="${a.id}" aria-label="${esc(a.name)}">${a.svg()}<span>${esc(a.name)}</span></button>`).join('')}</div>
  <button class="ov-btn" id="rmExit" type="button" style="left:18px;top:62px">← Salir de la sala</button></div>`;
  ovShow(el);aud.setMood('secreto');comp.mood('curious',4000);comp.tip('¡Una sala secreta! Todo esto estaba perdido entre la arena.',6000);
  setTimeout(()=>{try{$('#rmExit',el).focus({preventScroll:true})}catch(e){}},200);
}
function closeRoom(){const el=$('#room');ovHide(el);el.innerHTML='';aud.setMood(state.exp?'mundo':'mapa')}

/* ----- Ascenso a la cumbre (7.ª pirámide): movimiento real escalón a escalón ----- */
const CLIMB=['Los primeros peldaños crujen bajo la arena.','El viento del desierto sopla más fuerte.','Desde aquí se ven las seis pirámides que ya conoces.','Cada escalón es una prueba superada.','El aire se vuelve silencioso.','Ya casi se oye el rumor de los pergaminos.','¡La cumbre! Un santuario brilla con la primera luz.'];
const explorerSVG=()=>avFull(avGet(),{live:false});
const CL={n:21,per:3,x0:140,dx:66,y0:840,dy:28};
const clPos=i=>({x:CL.x0+i*CL.dx+CL.dx/2,y:CL.y0-i*CL.dy});
function climbScene(){
  const pts=[`${CL.x0},880`];for(let i=0;i<CL.n;i++){const y=CL.y0-i*CL.dy;pts.push(`${CL.x0+i*CL.dx},${y}`,`${CL.x0+(i+1)*CL.dx},${y}`)}
  const top=CL.y0-(CL.n-1)*CL.dy;pts.push(`${CL.x0+CL.n*CL.dx},880`);
  const terr=Array.from({length:CL.n/CL.per},(_,t)=>{const i=t*CL.per,y=CL.y0-i*CL.dy;return `<rect x="${CL.x0+i*CL.dx}" y="${y}" width="${CL.n*CL.dx}" height="6" fill="#c9a35a" opacity=".55"/>`}).join('');
  const treads=Array.from({length:CL.n},(_,i)=>`<path d="M${CL.x0+i*CL.dx} ${CL.y0-i*CL.dy}h${CL.dx}" stroke="#f2d79a" stroke-width="3" opacity=".7"/>`).join('');
  const gl=Array.from({length:7},(_,t)=>use(GL[t%GL.length],CL.x0+(t*3+1.2)*CL.dx+260,CL.y0-t*3*CL.dy+34,38,'glyph',t)).join('');
  return `<svg class="cl-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${grad('clsky',[[0,'#0b1214'],[.5,'#3a2b4a'],[1,'#d98a5f']])}${grad('clst',[[0,'#cfa66a'],[1,'#6b4a2a']])}${rgrad('clsun',[[0,'rgba(255,226,154,.9)'],[1,'rgba(255,226,154,0)']])}</defs>
  <rect width="1600" height="900" fill="url(#clsky)"/>${starz(46,9)}<circle id="clSun" cx="1400" cy="170" r="340" fill="url(#clsun)" opacity=".25"/>
  <path d="M0 860Q300 800 700 850T1600 840V900H0Z" fill="#241a24"/>
  <polygon points="${pts.join(' ')}" fill="url(#clst)" stroke="#f2d79a" stroke-width="2"/>${terr}${treads}${gl}
  <g transform="translate(${CL.x0+CL.n*CL.dx-60} ${top-110})"><path d="M0 110V30Q48 -20 96 30V110Z" fill="#1a1006" stroke="#E4C77D" stroke-width="3"/><path id="clDoor" d="M18 110V40Q48 8 78 40V110Z" fill="#ffe29a" opacity=".15"/></g></svg>`;
}
let CLM=null;
function startClimb(opts){
  let el=$('#climb');if(!el){el=document.createElement('div');el.id='climb';el.className='climb-ov';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Ascenso a la Cumbre de los Pergaminos');app.appendChild(el)}
  el.innerHTML=`<div class="cl-stage" id="clStage">${climbScene()}<div class="cl-ch cl-dog" id="clDog"></div><div class="cl-ch cl-ex" id="clEx">${explorerSVG()}</div></div>
   <button class="ov-btn" id="clExit" type="button" style="left:18px;top:62px">← Volver</button>
   <div class="cl-txt" aria-live="polite"><p id="clTxt"></p><div class="cl-btns"><button class="btn" id="clGo" type="button">Subir un tramo</button><button class="btn" id="clAuto" type="button" style="opacity:.9">Subir hasta la cima</button></div><div class="cl-prog" id="clProg" aria-hidden="true"></div></div>`;
  const ex=$('#clEx',el),dg=$('#clDog',el);dog.make(dg,'sit');
  CLM={step:P.d.climbStep|0,dstep:Math.max(0,(P.d.climbStep|0)-2),busy:false,stop:false,opts};
  const place=(node,i,hop)=>{const p=clPos(i);node.style.left=(p.x/16)+'%';node.style.top=((p.y-(hop||0))/9)+'%'};
  const txt=()=>{const t=Math.min(CLIMB.length-1,Math.floor(CLM.step/CL.per));$('#clTxt',el).textContent=CLM.step>=CL.n?CLIMB[6]:CLIMB[t];
    $('#clProg',el).innerHTML=Array.from({length:CL.n/CL.per},(_,k)=>`<i class="${CLM.step>=(k+1)*CL.per?'on':''}"></i>`).join('');
    const go=$('#clGo',el);go.textContent=CLM.step>=CL.n?'Entrar al santuario':'Subir un tramo';$('#clAuto',el).hidden=CLM.step>=CL.n};
  place(ex,CLM.step);place(dg,CLM.dstep);txt();
  const tween=(node,fromI,toI,dur,cb)=>{const a=clPos(fromI),b=clPos(toI);const t0=performance.now();
    const f=t=>{if(!$('#climb')||el.style.display==='none')return;const k=clamp((t-t0)/dur,0,1),e=k;node.style.left=((a.x+(b.x-a.x)*e)/16)+'%';node.style.top=((a.y+(b.y-a.y)*e-Math.sin(k*Math.PI)*22)/9)+'%';if(k<1)requestAnimationFrame(f);else cb&&cb()};requestAnimationFrame(f)};
  const stepDog=()=>{if(CLM.dstep>=CLM.step-2&&CLM.step<CL.n)return;const from=CLM.dstep,to=Math.min(CL.n,from+1);
    if(to===from)return;dog.set(dg,'climb','r');tween(dg,from,to,REDUCED?1:430,()=>{CLM.dstep=to;if(CLM.dstep<CLM.step-1||CLM.step>=CL.n&&CLM.dstep<CL.n-1)stepDog();else dog.set(dg,CLM.step>=CL.n?'happy':'sit')})};
  const climbTo=(target,done)=>{
    if(CLM.busy)return;CLM.busy=true;ex.classList.add('walking');dog.set(dg,'climb','r');
    const one=()=>{if(CLM.stop||CLM.step>=target){ex.classList.remove('walking');CLM.busy=false;P.d.climbStep=CLM.step;P.save();txt();
        if(CLM.step>=CL.n){ex.classList.add('cheer');dog.set(dg,'happy');aud.fanfare&&aud.fanfare();comp.react('unlock');const d=$('#clDoor',el);d&&(d.style.opacity=.9)}else dog.set(dg,'sit');done&&done();return}
      const from=CLM.step;CLM.step++;aud.noise&&aud.noise(.12,1400,500,.12);tween(ex,from,CLM.step,REDUCED?1:460,()=>{if(CLM.step%CL.per===0)txt();one()});
      stepDog()};
    one()};
  ovShow(el);el.style.display='block';aud.setMood('c7');comp.mood('walk',5000);
  el.onclick=e=>{
    if(e.target.closest('#clExit')){CLM.stop=true;sfx.click();el.style.display='none';ovHide(el);return}
    if(e.target.closest('#clGo')){sfx.click();CLM.stop=false;
      if(CLM.step>=CL.n){const fin=()=>{P.d.boss=1;P.d.climb=true;P.d.done[7]=1;P.d.pass[7]=1;P.save();comp.progress();exUpdateProg&&exUpdateProg();el.style.display='none';ovHide(el);openChamber(7,Object.assign({},CLM.opts||{},{bypass:true}))};if(P.d.boss){fin();return}el.style.display='none';ovHide(el);openTemple(7,{final:true,onDone:fin});return}
      climbTo(Math.min(CL.n,(Math.floor(CLM.step/CL.per)+1)*CL.per))}
    if(e.target.closest('#clAuto')){sfx.click();CLM.stop=false;climbTo(CL.n)}};
  setTimeout(()=>{try{$('#clGo',el).focus({preventScroll:true})}catch(e){}},200);
}

/* ----- Cámara 7: santuario con retrato y pergaminos ----- */
function enhanceCh7(){
  const ch=$('#ch7');if(!ch)return;const host=$('.chron',ch);if(!host||ch.dataset.enh)return;ch.dataset.enh=1;
  host.insertAdjacentHTML('beforebegin',`<div class="sanct"><button type="button" class="hr" id="hrCumbre" aria-label="La Archivera. Púlsala para que te salude">${heroinaSVG()}<span class="hr-say" aria-live="polite">Pulsa a la Archivera para saludarla.</span></button><p>El santuario de la cumbre guarda los pergaminos de la exploradora, custodiados por la Archivera. Su retrato acompaña este último tramo del recorrido y da la bienvenida a quien llega hasta aquí. Cada pergamino se despliega al pulsarlo y muestra las crónicas de ${esc(CONFIG.author)}.</p></div>`);heroinaLive($('#hrCumbre',ch));
  $$('.chron-item',ch).forEach(a=>{
    const no=$('.no',a),h3=$('h3',a);if(!no||!h3)return;a.classList.add('scr');
    const rest=[...a.childNodes].filter(n=>n!==no&&n!==h3);const b=document.createElement('div');b.className='scr-b';rest.forEach(n=>b.appendChild(n));
    const btn=document.createElement('button');btn.type='button';btn.className='scr-h';btn.setAttribute('aria-expanded','false');
    btn.innerHTML=`<span class="no">${no.textContent}</span><h3>${h3.innerHTML}</h3><span class="tg">Abrir</span>`;
    a.innerHTML='';a.appendChild(btn);a.appendChild(b);
  });
  ch.addEventListener('click',e=>{const h=e.target.closest('.scr-h');if(h){const it=h.parentNode,o=!it.classList.contains('open');it.classList.toggle('open',o);h.setAttribute('aria-expanded',String(o));$('.tg',h).textContent=o?'Cerrar':'Abrir';sfx.open&&aud.noise&&aud.noise(.6,900,200,.15);if(o)comp.mood('happy',2500)}
    const a=e.target.closest('.chron-index a');if(a){const dest=$(a.getAttribute('href'),ch);if(dest&&!dest.classList.contains('open')){dest.classList.add('open');const hb=$('.scr-h',dest);hb&&(hb.setAttribute('aria-expanded','true'),$('.tg',hb).textContent='Cerrar')}}});
}

/* ----- Puerta de acceso, teclado y arranque de la ampliación ----- */
function initExpansion(){
  gateHook=(n,opts)=>{
    if(n===7){if(P.d.climb||P.d.pass[7])return false;startClimb(opts);return true}
    if(P.d.done[n]||P.d.pass[n])return false;
    openTemple(n,opts);return true};
  buildExpedition();initAvatars();initTemples();initAcad();bindEncounter();bindExpedition();enhanceCh7();initEye();
  $('#btnExpedition').addEventListener('click',()=>{sfx.click();startExpedition()});
  $('#btnJournal').addEventListener('click',()=>{sfx.click();openJournal()});
  $('#eyeMap').addEventListener('click',e=>{e.currentTarget.classList.toggle('closed');sfx.click()});
  $('#journal').addEventListener('click',e=>{const t=e.target;let b;
    if(t.closest('#jrClose')){closeJournal();return}
    if(t.closest('#jrRoom')){closeJournal();openRoom();return}
    if(t.closest('#jrEdit')){closeJournal();openCreator(avGet().created?'edit':'new',null);return}
    if(t.closest('#jrReset')){if(confirm('¿Reiniciar la expedición? Se borrará el progreso (cámaras, reliquias y diario). Tu nombre y tu avatar se conservan.'))resetExpedition(true);return}
    if(t.closest('#jrResetAll')){if(confirm('¿Borrar TODO, incluido tu perfil de explorador, de este navegador?'))resetExpedition(false);return}
    if(b=t.closest('[data-jn]')){closeJournal();if(state.exp&&!state.chamber)expHide(),state.exp=true;openChamber(+b.dataset.jn);return}
    if(b=t.closest('[data-ji]')){openFicha(b.dataset.ji,false);return}});
  $('#ficha').addEventListener('click',e=>{const t=e.target;if(t.closest('#fiClose')||t.classList.contains('fi')){closeFicha();return}if(t.closest('#fiJ')){closeFicha();openJournal()}});
  $('#room').addEventListener('click',e=>{const t=e.target,b=t.closest('[data-ri]');if(t.closest('#rmExit')){closeRoom();return}if(b){collect(b.dataset.ri,'Sala secreta de objetos perdidos');b.classList.add('got')}});
  // Escape: cierra primero la capa superior
  addEventListener('keydown',e=>{if(e.key!=='Escape')return;
    const vis=id=>$(id)&&$(id).classList.contains('ov-on');let h=true;
    if(vis('#ficha'))closeFicha();else if(vis('#journal'))closeJournal();else if(vis('#unlock'))$('#unSkip')&&$('#unSkip').click();
    else if(vis('#room'))closeRoom();else if(vis('#encounter'))closeEncounter();else if($('#climb')&&$('#climb').style.display==='block'){$('#clExit').click()}
    else if(vis('#story'))storyCtl&&storyCtl.end();else if(state.exp&&EX.open&&!state.chamber&&!lbVisible())stopExpedition();else h=false;
    if(h){e.stopImmediatePropagation();e.preventDefault()}},true);
  comp.hintCtx=null;comp.progress();initCompanionCursor();
  $('#gHint').addEventListener('click',()=>{sfx.click();comp.hint()});
  comp.mood('idle');comp.wake();
}
const lbVisible=()=>{const l=$('#lightbox');return l&&getComputedStyle(l).display!=='none'};

/* ----- Índice académico sincronizado con mapa, mundo y diario ----- */
function acadHTML(){
  return `<ol class="acad">${ACAD.map((a,i)=>{const done=P.d.done[a.n];return `<li class="${done?'done':''}" data-an="${a.n}">${a.alt?`<span class="acad-t"><i class="ck"></i>${esc(a.t)}</span><span class="acad-alt">${a.alt.map(([l,n])=>`<button type="button" data-acad="${i}" data-alt="${n}">${esc(l)} <small>${CH[n-1].roman}</small></button>`).join('')}</span>`:`<button type="button" data-acad="${i}"><i class="ck"></i><span>${esc(a.t)}</span><small>${CH[a.n-1].roman} · ${esc(GUARD[a.n-1].place)}</small></button>`}</li>`}).join('')}</ol>`;
}
function syncDone(){
  $$('.pyr[data-n]').forEach(p=>p.classList.toggle('done',!!P.d.done[p.dataset.n]));
  $$('#mapIndex li').forEach((li,i)=>li.classList.toggle('done',!!P.d.done[i+1]));
  $$('.acad li').forEach(li=>li.classList.toggle('done',!!P.d.done[li.dataset.an]));
  $$('#rail [data-open]').forEach(b=>b.classList.toggle('done',!!P.d.done[b.dataset.open]));
}
function afterChamber(n,fn){let t=0;const iv=setInterval(()=>{t+=100;if(state.chamber===n&&!state.busy){clearInterval(iv);setTimeout(fn,350)}else if(t>5000)clearInterval(iv)},100)}
function acadGo(i,altN){
  const a=ACAD[i];if(!a)return;const n=altN||a.n;
  closeJournal();closeFicha&&0;
  openChamber(n,{bypass:true,lab:a.lab});
  afterChamber(n,()=>{const ch=$('#ch'+n);if(!ch)return;let dest=null;
    if(a.chron){dest=$('#c7-'+a.chron,ch);if(dest&&!dest.classList.contains('open')){const hb=$('.scr-h',dest);hb&&hb.click()}}
    else if(a.anchor&&!altN)dest=$(a.anchor,ch);
    if(dest)ch.scrollTo({top:dest.getBoundingClientRect().top-ch.getBoundingClientRect().top+ch.scrollTop-80,behavior:REDUCED?'auto':'smooth'})});
}
function initAcad(){
  // El mapa ya muestra el índice accesible de las siete cámaras.
  // No se añade un segundo índice académico duplicado debajo del mapa.
  syncDone();
}
