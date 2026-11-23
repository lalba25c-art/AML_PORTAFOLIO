/* ---------- 17. OJO DE HORUS 3D · HISTORIA · MUNDO EXPLORABLE ---------- */
const ovShow=el=>{el.classList.add('ov-on');el.setAttribute('aria-hidden','false')};
const ovHide=el=>{el.classList.remove('ov-on');el.setAttribute('aria-hidden','true')};
let toastT=null;
function toast(msg,ms=4200){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';t.setAttribute('role','status');t.setAttribute('aria-live','polite');app.appendChild(t)}
  t.innerHTML=msg;t.style.zIndex=300;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),ms)}
function typeText(el,text,sp=16){
  if(REDUCED){el.textContent=text;return()=>{}}
  let i=0;el.textContent='';const iv=setInterval(()=>{i+=1;el.textContent=text.slice(0,i);if(i>=text.length)clearInterval(iv)},sp);
  return()=>{clearInterval(iv);el.textContent=text};
}

/* ----- Ojo de Horus: ojo dorado, iris turquesa, candado, sigue el puntero ----- */
function eyeSVG(){return `<div class="eye-in"><svg viewBox="0 0 400 260" role="img" aria-label="Ojo de Horus con un candado en el centro">
 <defs>${rgrad('eiris',[[0,'#bff7f0'],[.45,'#2fb3a9'],[1,'#0e4f55']])}${grad('egold',[[0,'#fff3c8'],[.5,'#E4C77D'],[1,'#8a6428']])}
 <clipPath id="eclip"><path d="M30 130Q200 10 370 130Q200 250 30 130Z"/></clipPath></defs>
 <path class="rim" d="M30 130Q200 10 370 130Q200 250 30 130Z" fill="#0c1b1a" stroke="url(#egold)" stroke-width="7" stroke-linejoin="round"/>
 <g clip-path="url(#eclip)"><rect x="30" y="20" width="340" height="220" fill="#f4ead2" opacity=".95"/>
  <g class="iris"><circle cx="200" cy="130" r="66" fill="url(#eiris)" stroke="#E4C77D" stroke-width="3"/>
   <g stroke="#bff7f0" stroke-width="1" opacity=".5">${Array.from({length:18},(_,i)=>`<path d="M200 130L${200+Math.cos(i*Math.PI/9)*64} ${130+Math.sin(i*Math.PI/9)*64}"/>`).join('')}</g>
   <circle cx="200" cy="130" r="30" fill="#07181a" stroke="#E4C77D" stroke-width="2"/>
   <g fill="none" stroke="url(#egold)" stroke-width="4" stroke-linecap="round"><path d="M188 128v-8a12 12 0 0 1 24 0v8"/></g><rect x="184" y="126" width="32" height="26" rx="4" fill="url(#egold)"/><circle cx="200" cy="137" r="3.4" fill="#07181a"/><rect x="198.6" y="137" width="2.8" height="8" fill="#07181a"/>
   <circle cx="182" cy="108" r="9" fill="#fff" opacity=".55"/></g>
  <rect class="lid" x="20" y="0" width="360" height="132" fill="#0b1213"/><rect class="lid lo" x="20" y="128" width="360" height="132" fill="#0b1213"/></g>
 <path d="M30 130Q200 10 370 130" fill="none" stroke="url(#egold)" stroke-width="7" opacity=".0"/>
 <path d="M46 98Q200 -34 354 98" fill="none" stroke="#1b1406" stroke-width="16" stroke-linecap="round"/><path d="M46 98Q200 -34 354 98" fill="none" stroke="url(#egold)" stroke-width="6" stroke-linecap="round"/>
 <path d="M200 192v34q0 20-30 20" fill="none" stroke="url(#egold)" stroke-width="7" stroke-linecap="round"/><path d="M258 180q50 26 40 62q-6 12-26 6" fill="none" stroke="url(#egold)" stroke-width="7" stroke-linecap="round"/>
 </svg></div>`}
function initEye(){
  if(!$('#eyeDefs'))document.body.insertAdjacentHTML('beforeend','<svg id="eyeDefs" width="0" height="0" style="position:absolute" aria-hidden="true"><defs><filter id="eyeGlow" x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs></svg>');
  $$('.eye3d').forEach(e=>{if(e.dataset.on)return;e.dataset.on=1;e.innerHTML=eyeSVG()});
  if(!FINE||REDUCED)return;
  addEventListener('pointermove',e=>{$$('.eye3d').forEach(el=>{const r=el.getBoundingClientRect();if(!r.width||r.bottom<0||r.top>innerHeight)return;
    const dx=(e.clientX-(r.left+r.width/2))/innerWidth,dy=(e.clientY-(r.top+r.height/2))/innerHeight;
    el.style.setProperty('--ry',clamp(dx*34,-16,16)+'deg');el.style.setProperty('--rx',clamp(-dy*30,-14,14)+'deg');
    el.style.setProperty('--ix',clamp(dx*90,-20,20)+'px');el.style.setProperty('--iy',clamp(dy*60,-9,9)+'px');
    const d=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2));el.style.setProperty('--glow',String(clamp(1-d/520,.15,1)))})},{passive:true});
}

/* ----- Historia en 4 escenas ----- */
const starz=(n,seed)=>Array.from({length:n},(_,i)=>`<circle cx="${(i*379+seed*53)%1600}" cy="${(i*211+seed*97)%520}" r="${(i%4)*.5+.7}" fill="#fff3c8" class="spark" style="animation-delay:${(i%9)*.3}s"/>`).join('');
const miniPyr=(x,y,s,lit)=>`<polygon points="${x-60*s},${y} ${x},${y-80*s} ${x+60*s},${y}" fill="#0e2220" stroke="${lit}" stroke-width="2"/><polygon points="${x},${y-80*s} ${x+60*s},${y} ${x},${y}" fill="#081614"/><circle cx="${x}" cy="${y-80*s}" r="${5*s}" fill="${lit}"/>`;
const SCENE_BASE=(a,b,inner)=>`<svg class="full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${grad('sk'+a.slice(1),[[0,a],[1,b]])}</defs><rect width="1600" height="900" fill="url(#sk${a.slice(1)})"/>${inner}</svg>`;
function storyScenes(){
 const dune=(c,y,a)=>`<path d="M0 ${y}Q300 ${y-a} 620 ${y}T1240 ${y}T1600 ${y-a/2}V900H0Z" fill="${c}"/>`;
 const sacred=[200,450,720,990,1250,1470,1580].map((x,i)=>miniPyr(x,640+(i%2)*20,.7+(i%3)*.15,'#E4C77D')).join('');
 return[
  {who:'La narradora',t:'Hace miles de años, a orillas del Nilo, los escribas guardaron en siete cámaras los secretos para proteger todo lo que sabían.',
   svg:SCENE_BASE('#040a12','#16403a',`${starz(70,1)}<circle cx="1280" cy="170" r="54" fill="#f6ecd0" opacity=".9"/><circle cx="1262" cy="156" r="54" fill="#050c14" opacity=".08"/>${dune('#0c1d1b',690,50)}${sacred}<path d="M0 790Q400 740 800 800T1600 770V900H0Z" fill="#15325c" opacity=".9"/><use href="#g-eye" x="720" y="80" width="160" height="160" class="glyph" style="opacity:.55;animation:none"/>`)},
  {who:'La narradora',t:'Pero algo antiguo ha despertado. Una amenaza que se arrastra por la red y corrompe cada sello digital del Archivo Sagrado.',
   svg:SCENE_BASE('#14070d','#06182a',`<g class="corrupt">${starz(40,2)}${dune('#0a1214',700,40)}${sacred}${Array.from({length:22},(_,i)=>`<rect x="${(i*173)%1500}" y="${(i*97)%700}" width="${60+(i%5)*40}" height="${3+(i%3)*3}" fill="${i%2?'#00e5ff':'#ff3d6e'}" opacity=".5" class="glitch" style="animation-delay:${(i%7)*.4}s"/>`).join('')}${[300,640,980,1280].map((x,i)=>`<use href="#g-scarab" x="${x}" y="${690-i*14}" width="90" height="90" style="stroke:#ff3d6e;fill:none;stroke-width:1.4" class="glitch"/>`).join('')}</g>`)},
  {who:'La narradora',t:'Nuestro mundo digital está en peligro. Solo el Archivo Sagrado guarda cómo defenderlo, y dioses, esfinges y guardianas protegen cada puerta con enigmas.',
   svg:SCENE_BASE('#06121a','#24402f',`${starz(50,3)}${dune('#0d1d19',720,40)}${[260,620,980,1340].map((x,i)=>`<g><path d="M${x-70} 760L${x-52} 520H${x+52}L${x+70} 760Z" fill="#182a28" stroke="#E4C77D" stroke-width="2"/>${[0,1,2,3,4].map(k=>`<rect x="${x-38}" y="${548+k*40}" width="76" height="22" fill="#08130f" stroke="#7a5a25"/><circle cx="${x-26}" cy="${559+k*40}" r="3.4" fill="#6fe3a3" class="led" style="--i:${k+i}"/>`).join('')}<path d="M${x} 520V120" stroke="#E4C77D" stroke-width="6" opacity=".25"/></g>`).join('')}<path d="M0 840H1600" stroke="#2fb3a9" stroke-width="4" class="flow" opacity=".8"/>`)},
  {who:'Sadchuruzen',t:'¡Guau! Soy Sadchuruzen, tu guardiana y compañera de expedición. Superaremos las pruebas juntas y recuperaremos el Archivo. ¡Vamos, exploradora!',
   svg:SCENE_BASE('#26233a','#e6a15d',`<circle cx="800" cy="560" r="150" fill="#ffe29a" opacity=".85"/>${dune('#3a2a1c',690,70)}${dune('#1a1208',780,40)}${[250,1350].map(x=>miniPyr(x,700,1.1,'#fff3c8')).join('')}`)}
 ];
}
let storyCtl=null;
function startStory(done){
  const el=$('#story'),sc=storyScenes();let i=0,cancel=()=>{};
  el.innerHTML=`<div class="st-bg">${sc.map((s,k)=>`<div class="st-scene" data-k="${k}">${s.svg}</div>`).join('')}</div>
  <button class="ov-btn skipbtn" id="stSkip" type="button">Saltar historia</button>
  <div class="st-comp" id="stComp" hidden><img src="${$('#gDog').src}" alt="Sadchuruzen" width="92" height="92"></div>
  <div class="st-text" aria-live="polite"><span class="who" id="stWho"></span><p id="stP"></p></div>
  <div class="st-ctl"><button class="btn" id="stNext" type="button">Continuar</button></div>
  <div class="st-dots" aria-hidden="true">${sc.map(()=>'<i></i>').join('')}</div>`;
  ovShow(el);
  const show=k=>{i=k;$$('.st-scene',el).forEach((s,j)=>s.classList.toggle('on',j===k));$$('.st-dots i',el).forEach((d,j)=>d.classList.toggle('on',j<=k));
    $('#stWho',el).textContent=sc[k].who;$('#stComp',el).hidden=k<3;cancel();cancel=typeText($('#stP',el),sc[k].t,18);
    $('#stNext',el).textContent=k===sc.length-1?'Comenzar la expedición':'Continuar';
    aud.setMood&&aud.setMood(k===1?'reto':k===3?'unlock':'portada');comp.mood(k===3?'happy':'curious',3500);sfx.click()};
  const end=()=>{cancel();storyCtl=null;P.d.story=true;P.save();ovHide(el);el.innerHTML='';done&&done()};
  const next=()=>{if(i>=sc.length-1)end();else show(i+1)};
  $('#stNext',el).addEventListener('click',next);$('#stSkip',el).addEventListener('click',end);
  storyCtl={next,end};show(0);setTimeout(()=>{try{$('#stNext',el).focus({preventScroll:true})}catch(e){}},200);
}

/* ----- Mundo explorable ----- */
const WW=5600,WX=[420,1150,1900,2750,3550,4350,5150];
const dunePath=(W,base,amp,seed,mid)=>{let d=`M0 1000L0 ${base}`;for(let x=0;x<=W;x+=60){const y=base-(Math.sin(x*.004+seed)*amp+Math.sin(x*.0011+seed*2)*amp*1.2+Math.sin(x*.011+seed)*amp*.25);d+=`L${x} ${y.toFixed(1)}`}return d+`L${W} 1000Z`};
function worldSky(){return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${grad('wsky',[[0,'#05080f'],[.45,'#14243a'],[.75,'#6b4a50'],[1,'#e0a063']])}${rgrad('wsun',[[0,'#fff3c8'],[.35,'rgba(255,214,130,.55)'],[1,'rgba(255,214,130,0)']])}</defs>
 <rect width="1600" height="1000" fill="url(#wsky)"/>${starz(90,5)}<circle cx="1080" cy="560" r="330" fill="url(#wsun)"/><circle cx="1080" cy="560" r="64" fill="#fff3c8" opacity=".92"/>
 <path d="M0 740Q400 700 800 740T1600 730V1000H0Z" fill="#2b2230" opacity=".7"/></svg>`}
function worldFar(){const W=2400;return `<svg viewBox="0 0 ${W} 1000" preserveAspectRatio="none" aria-hidden="true"><path d="${dunePath(W,720,26,1)}" fill="#33263a" opacity=".9"/>${[[300,.8],[900,1.2],[1500,.9],[2100,1.1]].map(([x,s])=>miniPyr(x,730,s,'#a77f58')).join('')}<path d="${dunePath(W,780,30,3)}" fill="#241b2c"/></svg>`}
function worldMid(){const W=3600;
 return `<svg viewBox="0 0 ${W} 1000" preserveAspectRatio="none" aria-hidden="true"><defs>${grad('wriv',[[0,'#2f6f9a'],[1,'#0b2740']])}</defs>
 <path d="${dunePath(W,760,34,7)}" fill="#2a2130"/>
 <path d="M0 800Q600 770 1200 812T2400 800T3600 810V870Q2900 892 2200 868T1000 884T0 872Z" fill="url(#wriv)"/><g stroke="#cfe6ff" stroke-width="2" opacity=".35" class="flow">${Array.from({length:14},(_,i)=>`<path d="M${i*260} ${828+(i%3)*12}h90"/>`).join('')}</g>
 ${[600,1700,2800].map(x=>`<g transform="translate(${x} 800)" fill="#0c0f16"><path d="M-40 0L40 0L56 -14L-56 -14Z"/><path d="M0 -14V-74L36 -20Z" fill="#cdb890"/></g>`).join('')}
 ${[400,1250,2100,3000].map((x,i)=>`<g transform="translate(${x} 770)" fill="#171320"><path d="M-6 0V-70M0-70q-34 -8 -46 10M0-70q34 -8 46 10M0-70q-18 -22 -40 -16M0-70q18 -22 40 -16" stroke="#171320" stroke-width="5" fill="none"/></g>`).join('')}
 ${[900,2300].map(x=>`<g transform="translate(${x} 770)"><path d="M-12 0L-8 -150L0 -176L8 -150L12 0Z" fill="#2c2a34" stroke="#a77f58" stroke-width="2"/></g>`).join('')}</svg>`}
const hexHash=s=>{let h=2166136261;const o=[];for(let i=0;i<8;i++){h=Math.imul(h^(i*2654435761),16777619);o.push((h>>>0).toString(16).padStart(8,'0'))}return o.join('').slice(0,16)};
function pyrFaces(c,w,h,y,lines){
  const n=c.n,F=`wl${n}`,R=`wr${n}`,fy=y+w*.1,fx=-w*.04;
  const face=(pts,cls,fill)=>`<polygon class="${cls}" points="${pts}" fill="url(#${fill})"/>`;
  const cap=`<polygon points="0,${y-h} -22,${y-h+38} 22,${y-h+38}" fill="#fff3c8" opacity=".9"/>`;
  if(n===2){let o='';const T=7;for(let i=0;i<T;i++){const bw=w*(1-i/(T+.6)),th=h/T,yy=y-(i+1)*th;o+=`<rect class="fl" x="${-bw/2}" y="${yy}" width="${bw/2}" height="${th}" fill="url(#${F})" stroke="#000" stroke-opacity=".25"/><rect class="fr" x="0" y="${yy}" width="${bw/2}" height="${th}" fill="url(#${R})" stroke="#000" stroke-opacity=".25"/>`}return o}
  if(n===3){const tw=w*.2,yt=y-h*.72;return face(`${-w/2},${y} ${-tw},${yt} 0,${yt+12} ${fx},${fy}`,'fl',F)+face(`0,${yt+12} ${tw},${yt} ${w/2},${y} ${fx},${fy}`,'fr',R)+`<polygon points="${-tw},${yt} 0,${yt-14} ${tw},${yt} 0,${yt+12}" fill="#cfe3ff" opacity=".85"/>${[-.12,-.04,.04,.12].map(k=>`<rect x="${k*w-4}" y="${yt-34}" width="8" height="34" fill="#9cc4f2" stroke="#173C67"/>`).join('')}<rect x="${-tw}" y="${yt-40}" width="${tw*2}" height="6" fill="#cfe3ff" stroke="#173C67"/>`}
  if(n===4){const bx=w/2*.74,by=y-h*.55;return face(`${-w/2},${y} ${-bx},${by} 0,${y-h} 0,${by+30} ${fx},${fy}`,'fl',F)+face(`0,${y-h} ${bx},${by} ${w/2},${y} ${fx},${fy} 0,${by+30}`,'fr',R)+`<path d="M${-bx} ${by}L${bx} ${by}" stroke="#fff3c8" stroke-width="3" opacity=".7"/>`+cap}
  if(n===5){const tw=w*.26,yt=y-h*.6;return face(`${-w/2},${y} ${-tw},${yt} 0,${yt+12} ${fx},${fy}`,'fl',F)+face(`0,${yt+12} ${tw},${yt} ${w/2},${y} ${fx},${fy}`,'fr',R)+`<path d="M${-tw*.9} ${yt}a${tw*.9} ${tw*.9} 0 0 1 ${tw*1.8} 0Z" fill="#ffd48a" fill-opacity=".55" stroke="#ffd48a" stroke-width="3"/><path d="M${-tw*.9} ${yt}Q0 ${yt-tw*1.3} ${tw*.9} ${yt}M0 ${yt}V${yt-tw*.9}" stroke="#7c4f16" fill="none" stroke-width="2"/><circle cx="0" cy="${yt-tw*.9}" r="5" fill="#fff3c8"/>`}
  if(n===6){let o='';const R_=4,bw=w/4.3,bh=h/4.7;for(let r=0;r<R_;r++){const cnt=R_-r,x0=-cnt*bw/2;for(let k=0;k<cnt;k++){const bx=x0+k*bw,by=y-(r+1)*bh;o+=`<rect class="fl" x="${bx+2}" y="${by+2}" width="${bw-4}" height="${bh-4}" rx="4" fill="url(#${(k+r)%2?F:R})" stroke="#a9c2ff" stroke-width="2"/><text x="${bx+bw/2}" y="${by+bh/2+4}" text-anchor="middle" font-family="monospace" font-size="11" fill="#fff" opacity=".7">${(k*7+r*3+9).toString(16).padStart(2,'0')}…</text>`}}return o+`<circle cx="0" cy="${y-h-6}" r="9" fill="#fff3c8"/>`}
  if(n===7){return face(`${-w/2},${y} 0,${y-h} ${fx},${fy}`,'fl',F)+face(`0,${y-h} ${w/2},${y} ${fx},${fy}`,'fr',R)+lines+`<path d="M-8 ${y-h}L0 ${y-h-90}L8 ${y-h}Z" fill="#ffe0bf" stroke="#c2855a"/><circle cx="0" cy="${y-h-96}" r="9" fill="#fff3c8" class="spark"/>`}
  return face(`${-w/2},${y} 0,${y-h} ${fx},${fy}`,'fl',F)+face(`0,${y-h} ${w/2},${y} ${fx},${fy}`,'fr',R)+lines+cap;
}
function wPyr(c,x){
  const big=c.n===7,w=big?360:370,h=big?500:320,y=850,[c1,c2,c3]=c.col;
  const f=(a,b,k)=>`<linearGradient id="${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
  const lines=Array.from({length:big?9:6},(_,i)=>{const t=(i+1)/(big?10:7);return `<path d="M${-w/2*(1-t)} ${y-h*t}H${w/2*(1-t)}" stroke="#000" stroke-opacity=".22" stroke-width="2"/>`}).join('');
  const feat={
   1:`<use href="#g-eye" x="-22" y="${y-130}" width="44" height="44" class="glyph" style="animation:none"/>`,
   2:`<use href="#g-feather" x="-22" y="${y-150}" width="44" height="44" class="glyph" style="animation:none"/>`,
   3:`<g fill="#0a1626" stroke="#9cc4f2" stroke-width="2"><rect x="-54" y="${y-70}" width="12" height="60"/><rect x="-6" y="${y-70}" width="12" height="60"/><rect x="42" y="${y-70}" width="12" height="60"/></g>`,
   4:`<use href="#g-scarab" x="-24" y="${y-150}" width="48" height="48" class="glyph" style="animation:none"/>`,
   5:`<g fill="none" stroke="#ffd48a" stroke-width="3"><circle cx="0" cy="${y-110}" r="22"/><circle cx="0" cy="${y-110}" r="8"/><path d="M0 ${y-142}v10M0 ${y-88}v10M-32 ${y-110}h10M22 ${y-110}h10"/></g>`,
   6:`<g fill="none" stroke="#a9c2ff" stroke-width="5"><rect x="-44" y="${y-120}" width="50" height="24" rx="12"/><rect x="-6" y="${y-120}" width="50" height="24" rx="12"/></g>`,
   7:`<g stroke="#ffe0bf" stroke-width="2" fill="none" opacity=".7">${[.2,.4,.6,.8].map(t=>`<path d="M${-w/2*(1-t)-10} ${y-h*t}h${w*(1-t)+20}"/>`).join('')}</g><path d="M0 ${y-h}L-40 -40L40 -40Z" fill="#ffe29a" opacity=".16"/>`
  }[c.n];
  return `<g class="wp" data-n="${c.n}" tabindex="0" role="button" aria-label="${esc(GUARD[c.n-1].place)}: ${c.n===7?'subir a la cumbre':'abrir la prueba de la guardiana'}" data-tip="${esc(GUARD[c.n-1].place)}" data-sub="${esc(GUARD[c.n-1].name)}" transform="translate(${x} 0)">
   <defs>${f(c1,c2,'wl'+c.n)}${f(c2,c3,'wr'+c.n)}${rgrad('wh'+c.n,[[0,c.accent+'aa'],[1,c.accent+'00']])}</defs>
   <ellipse class="halo" cx="0" cy="${y}" rx="${w*.85}" ry="70" fill="url(#wh${c.n})"/>
   <g class="lift">${pyrFaces(c,w,h,y,lines)}
    <path d="M-30 ${y+8}V${y-44}Q0 ${y-70} 30 ${y-44}V${y+8}Z" fill="#06100f" stroke="${c.accent}" stroke-width="3"/>
    ${feat}
    <g class="doneMark" transform="translate(0 ${y-h-44})"><use href="#g-ankh" x="-20" y="-20" width="40" height="40" style="stroke:#fff3c8;fill:none;stroke-width:1.6"/></g></g>
   <g class="plate"><rect x="-150" y="${y+22}" width="300" height="40" rx="4" fill="#0c1b1a" stroke="${c.accent}" stroke-width="1.5" opacity=".92"/><text x="0" y="${y+49}" text-anchor="middle" font-family="Cinzel,Georgia,serif" font-size="16" letter-spacing="2" fill="${c.accent}">${c.roman} · ${esc(GUARD[c.n-1].place.replace(/^(La|El) /,'').toUpperCase().slice(0,26))}</text></g>
   <rect class="focusring" x="${-w/2-10}" y="${y-h-20}" width="${w+20}" height="${h+150}" rx="8"/>
  </g>`;
}
const hotG=(act,x,tip,sub,body,hit,extra='')=>`<g class="hot" data-act="${act}" data-tip="${esc(tip)}" data-sub="${esc(sub)}" tabindex="0" role="button" aria-label="${esc(tip)}: ${esc(sub)}" transform="translate(${x} 0)" ${extra}>${body}<rect class="hv" x="${hit[0]}" y="${hit[1]}" width="${hit[2]}" height="${hit[3]}" fill="transparent"/></g>`;
function worldMain(){
  const road=(()=>{let d='M0 930',x=0,y=930;const pts=[];while(x<WW){const nx=x+260+((x/260|0)%3)*60;d+=`H${nx-30}l30 ${(((x/260|0)%2)?-1:1)*18}`;x=nx;pts.push(x)}return`<path d="${d}" fill="none" stroke="#0a2a2b" stroke-width="16" opacity=".8"/><path d="${d}" fill="none" stroke="#2fb3a9" stroke-width="4" opacity=".9"/><path d="${d}" fill="none" stroke="#E4C77D" stroke-width="3" class="flow"/>`+pts.map((p,i)=>`<circle cx="${p-30}" cy="930" r="6" fill="#E4C77D" class="led" style="--i:${i}"/>`).join('')})();
  const branches=WX.map(x=>`<path d="M${x} 930V868" stroke="#2fb3a9" stroke-width="5" opacity=".9"/><path d="M${x} 930V868" stroke="#E4C77D" stroke-width="2" class="flow"/>`).join('');
  const glyphs=WX.map((x,i)=>[-250,-210,250,290].map((dx,k)=>use(GL[(i*3+k)%GL.length],x+dx-18,882,38,'lglyph',0)).join('')).join('');
  const sphinxL=`<g transform="translate(-30 850) scale(1.05)" fill="#7a5a35" stroke="#E4C77D" stroke-width="1"><path d="${SPHINX}"/></g>`;
  const sand0=P.d.sand.n|0,purged=!!P.d.purged;
  const rack=hotG('rack',2290,'Rack del templo','Servidor integrado en piedra',`<path d="M-92 850L-70 590H70L92 850Z" fill="#3b2f27" stroke="#E4C77D" stroke-width="2"/>${[0,1,2,3,4,5].map(k=>`<rect x="-52" y="${630+k*34}" width="104" height="22" fill="#08130f" stroke="#7a5a25"/><circle cx="-38" cy="${641+k*34}" r="4" fill="#6fe3a3" class="led" style="--i:${k}"/><circle cx="-24" cy="${641+k*34}" r="4" fill="#ffb454" class="led" style="--i:${k+2}"/>`).join('')}<use href="#g-djed" x="-22" y="538" width="44" height="44" class="glyph" style="animation:none"/>`,[-92,540,184,310]);
  const board=`<g transform="translate(3150 0)"><rect x="-150" y="700" width="300" height="150" rx="8" fill="#3a3027" stroke="#8a6428" stroke-width="3"/><g fill="none" stroke="#2fb3a9" stroke-width="3"><path d="M-130 740H-60V780H0M-130 800H-90V830H-20M130 740H70V790H20M130 810H50V840H0"/></g>${[[-30,730],[40,750],[-100,805]].map(([a,b])=>`<rect x="${a}" y="${b}" width="46" height="46" fill="#1a1613" stroke="#E4C77D" stroke-width="2"/><path d="M${a+8} ${b+8}h30M${a+8} ${b+16}h30M${a+8} ${b+24}h18" stroke="#E4C77D" opacity=".6"/>`).join('')}<text x="0" y="880" text-anchor="middle" font-family="Cinzel,serif" font-size="14" letter-spacing="3" fill="#a77f58">PLACA BASE · RELIEVE</text></g>`;
  const fw=hotG('fw',3950,'Cortafuegos','Barrera protectora',`<defs><pattern id="hexp" width="26" height="30" patternUnits="userSpaceOnUse"><path d="M13 0l13 7.5v15L13 30 0 22.5v-15Z" fill="none" stroke="#ffb454" stroke-width="1.5"/></pattern>${grad('fwg',[[0,'rgba(255,120,60,.0)'],[.5,'rgba(255,170,70,.5)'],[1,'rgba(255,200,100,.85)']])}</defs><rect x="-26" y="520" width="52" height="330" fill="url(#fwg)"/><rect x="-26" y="520" width="52" height="330" fill="url(#hexp)" opacity=".8"/><path class="flame" d="M-26 520q6-40 26-60q20 20 26 60Z" fill="#ffb454" opacity=".85"/>`,[-40,450,80,400]);
  const disks=`<g transform="translate(3350 0)">${[0,1,2,3,4].map(k=>`<ellipse cx="0" cy="${838-k*26}" rx="62" ry="16" fill="#6e5528" stroke="#E4C77D" stroke-width="2"/><rect x="-62" y="${838-k*26}" width="124" height="16" fill="#8a6b30"/><ellipse cx="0" cy="${854-k*26}" rx="62" ry="16" fill="#8a6b30" stroke="#E4C77D" stroke-width="2"/>`).join('')}<text x="0" y="890" text-anchor="middle" font-family="Cinzel,serif" font-size="13" letter-spacing="3" fill="#a77f58">CÁMARA DE DISCOS</text></g>`;
  const disk=hotG('disco',3350,'Disco de piedra','Cámara de discos',`<circle cx="0" cy="700" r="16" fill="none" stroke="#E4C77D" stroke-width="3" class="spark"/>`,[-70,660,140,200]);
  const lib=`<g transform="translate(2750 0)"><path d="M-130 880L-100 850H100L130 880Z" fill="#1a130c"/><rect x="-86" y="856" width="172" height="40" fill="#050806" stroke="#8a6428"/>${[0,1,2,3].map(k=>`<rect x="${-76+k*40}" y="864" width="26" height="22" fill="#6e5528"/>`).join('')}<text x="0" y="918" text-anchor="middle" font-family="Cinzel,serif" font-size="12" letter-spacing="3" fill="#a77f58">BIBLIOTECA SUBTERRÁNEA</text></g>`;
  const lock=hotG('lock',4750,'Puerta con cerradura criptográfica','Solo se abre con la clave correcta',`<path d="M-60 850V690Q0 630 60 690V850Z" fill="#241a0e" stroke="#E4C77D" stroke-width="3"/><path d="M-12 740v-14a12 12 0 0 1 24 0v14" fill="none" stroke="#E4C77D" stroke-width="4"/><rect x="-22" y="738" width="44" height="34" rx="4" fill="#E4C77D"/><circle cx="0" cy="754" r="4" fill="#241a0e"/>`,[-60,630,120,220]);
  const seal=hotG('seal',1530,'Sello hash','Huella digital de piedra',`<circle cx="0" cy="790" r="46" fill="#2a2013" stroke="#E4C77D" stroke-width="3"/><circle cx="0" cy="790" r="36" fill="none" stroke="#E4C77D" stroke-width="1" stroke-dasharray="4 4"/><text x="0" y="788" text-anchor="middle" font-family="monospace" font-size="11" fill="#E4C77D">${hexHash('a').slice(0,8)}</text><text x="0" y="802" text-anchor="middle" font-family="monospace" font-size="11" fill="#E4C77D">${hexHash('b').slice(0,8)}</text>`,[-50,740,100,100]);
  const bug=hotG('bug',2480,purged?'Escarabajo purificado':'Escarabajo corrupto','Pulsa para purificarlo',`<g class="${purged?'':'glitch'}"><use href="#g-scarab" x="-30" y="780" width="60" height="60" style="stroke:${purged?'#E4C77D':'#ff3d6e'};fill:none;stroke-width:1.6"/></g>${purged?'':'<rect x="-34" y="800" width="68" height="3" fill="#00e5ff" class="glitch"/>'}`,[-40,770,80,80]);
  const sand=hotG('sand',770,'Estela cubierta de arena','Retira la arena con el pincel',`<rect x="-34" y="640" width="68" height="210" rx="6" fill="#4b3a26" stroke="#E4C77D" stroke-width="2"/><g class="sandtxt" opacity="${sand0>=3?1:0}"><use href="#g-ankh" x="-16" y="670" width="32" height="32" style="stroke:#E4C77D;fill:none"/><path d="M-20 720h40M-20 734h40M-20 748h28" stroke="#E4C77D" opacity=".8"/></g><path class="sandm" id="sandMound" style="transform:scale(1,${clamp(1-sand0*.34,.02,1)});opacity:${sand0>=3?0:1}" d="M-86 850Q-60 700 0 660Q60 700 86 850Z" fill="#c9a66a"/>`,[-90,640,180,220]);
  const secret=hotG('room',5470,'Resplandor bajo la arena','¿Qué se esconde aquí?',`<circle cx="0" cy="812" r="30" fill="#ffe29a" opacity=".18" class="spark"/><use href="#g-ankh" x="-12" y="796" width="24" height="24" style="stroke:#ffe29a;fill:none;stroke-width:1.6" class="spark"/>`,[-40,770,80,80]);
  const frag=(k,x)=>hotG('frag'+k,x,'Fragmento brillante','¿Qué será?',`<path d="M-14 818l12 -22l16 8l-4 18Z" fill="#E4C77D" stroke="#fff3c8" stroke-width="2" class="spark"/><circle cx="0" cy="812" r="26" fill="#ffe29a" opacity=".15" class="spark"/>`,[-30,780,60,60]);
  const frags=P.d.items.frag1?'':frag(1,1330);const frags2=P.d.items.frag2?'':frag(2,3060);const frags3=P.d.items.frag3?'':frag(3,4170);
  const sph2=`<g transform="translate(1530 850) scale(.7)" fill="#7a5a35" stroke="#E4C77D" stroke-width="1" opacity="0"><path d="${SPHINX}"/></g>`;
  const anubisStat=`<g opacity=".95">${ANUBIS(4620,850,.9,'#2b1f14','#E4C77D')}${SEATED(1700,850,.8,'#2b1f14','#E4C77D')}</g>`;
  return `<svg viewBox="0 0 ${WW} 1000" preserveAspectRatio="none" role="group" aria-label="Mundo explorable con siete pirámides">
   <defs>${grad('wgr',[[0,'#d6a867'],[.12,'#9a7140'],[1,'#2b1f14']])}</defs>
   <path d="${dunePath(WW,860,14,11)}" fill="url(#wgr)"/><rect x="0" y="905" width="${WW}" height="95" fill="#1c140c" opacity=".55"/>
   ${road}${branches}${glyphs}${sphinxL}${anubisStat}${board}${disks}${lib}
   ${WX.map((x,i)=>wPyr(CH[i],x)).join('')}
   ${rack}${fw}${disk}${lock}${seal}${bug}${sand}${secret}${sph2}${frags}${frags2}${frags3}<g opacity=".95">${BASTET(3850,850,.9,'#1a1410','#E4C77D')}</g>
  </svg>`;
}
const EX={cam:0,camC:0,tgt:0,drag:false,moved:0,vw:0,vh:0,raf:0,open:false,px:.5,py:.5,mainW:0,layers:[],lastUse:0};
function buildExpedition(){
  const el=$('#expedition');
  el.innerHTML=`<div class="ex-view" id="exView"><div class="ex-tilt" id="exTilt">
   <div class="ex-layer" data-k="sky" style="left:0;width:100%">${worldSky()}</div>
   <div class="ex-layer" data-k="far">${worldFar()}</div>
   <div class="ex-layer" data-k="mid">${worldMid()}</div>
   <div class="ex-layer main" data-k="main">${worldMain()}</div></div></div>
  <div class="ex-hud">
   <button class="ov-btn exit" id="exExit" type="button">← Volver al mapa</button><button class="ov-btn acadb" id="exAcad" type="button">Apartados académicos</button>
   <div class="ex-title">El mundo del Nilo<small>Arrastra, usa las flechas o pulsa una pirámide</small></div>
   <div class="ex-prog" id="exProg"></div>
   <button class="ex-arrow l" id="exL" aria-label="Avanzar hacia la izquierda"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>
   <button class="ex-arrow r" id="exR" aria-label="Avanzar hacia la derecha"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></button>
   <div class="ex-mini" id="exMini" role="group" aria-label="Minimapa: ir a una pirámide"><div class="track"></div>${CH.map((c,i)=>`<button type="button" data-n="${c.n}" style="left:calc(24px + (100% - 48px)*${WX[i]/WW})" aria-label="Ir a ${esc(GUARD[i].place)}">${c.roman}</button>`).join('')}<div class="cam" id="exCam"></div></div>
   <div class="ex-tip" id="exTip"><b></b><span></span></div></div>`;
  EX.layers=$$('.ex-layer',el);exResize();exUpdateProg();initWorldDog();initWorldPlayer();
}
function exResize(){
  const el=$('#expedition');EX.vw=el.clientWidth||innerWidth;EX.vh=el.clientHeight||innerHeight;
  const r={sky:1,far:2.4,mid:3.6,main:5.6};
  EX.layers.forEach(l=>{const k=l.dataset.k;if(k==='sky'){l.style.width=EX.vw+'px';return}const w=Math.max(EX.vw*1.04,EX.vh*r[k]);l.style.width=w+'px';l._w=w});
  EX.mainW=EX.layers[3]._w;const cm=$('#exCam');if(cm)cm.style.width=clamp(EX.vw/EX.mainW,.05,1)*100+'%';
}
function exUpdateProg(){const p=$('#exProg');if(p)p.innerHTML=`Cámaras desbloqueadas <b>${P.count()}/7</b>`;
  $$('#exMini button').forEach(b=>b.classList.toggle('done',!!P.d.done[b.dataset.n]));$$('.wp').forEach(w=>w.classList.toggle('done',!!P.d.done[w.dataset.n]))}
function exFrame(){
  if(!EX.open){EX.raf=0;return}
  const nw=performance.now(),dt=Math.min(100,nw-(EX.lt||nw));EX.lt=nw;EX.camC+=(EX.tgt-EX.camC)*(REDUCED?1:1-Math.exp(-dt*.0075));if(Math.abs(EX.tgt-EX.camC)<.0003)EX.camC=EX.tgt;
  EX.layers.forEach(l=>{if(l.dataset.k==='sky')return;const x=-EX.camC*Math.max(0,l._w-EX.vw);l.style.transform=`translate3d(${x.toFixed(1)}px,0,0)`});
  const cm=$('#exCam');if(cm){const wv=clamp(EX.vw/EX.mainW,.05,1);cm.style.left=`calc(24px + (100% - 48px)*${(EX.camC*(1-wv)).toFixed(4)})`}
  dogWorldTick(performance.now());
  EX.raf=requestAnimationFrame(exFrame);
}
function exGoTo(n){const c=WX[n-1]/WW;EX.tgt=clamp((c*EX.mainW-EX.vw/2)/Math.max(1,EX.mainW-EX.vw),0,1)}
function exNear(e){
  const now=performance.now();if(now-EX.lastUse<60)return;EX.lastUse=now;
  $$('#expedition .wp').forEach(w=>{const r=w.getBoundingClientRect();const d=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height*.6));w.style.setProperty('--near',clamp(1-d/(r.width*1.1),0,1).toFixed(2))});
  $$('#expedition .lglyph').forEach(g=>{const r=g.getBoundingClientRect();g.classList.toggle('lit',Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2))<130)});
}
function bindExpedition(){
  const el=$('#expedition'),view=$('#exView');let sx=0,sc=0,pid=null;
  view.addEventListener('pointerdown',e=>{if(e.target.closest('.ex-hud'))return;EX.drag=true;EX.moved=0;sx=e.clientX;sc=EX.tgt;pid=e.pointerId;view.classList.add('drag')});
  addEventListener('pointermove',e=>{if(!EX.open)return;
    const r=el.getBoundingClientRect();EX.px=(e.clientX-r.left)/r.width;EX.py=(e.clientY-r.top)/r.height;
    if(!REDUCED){const t=$('#exTilt');t.style.setProperty('--wy',((EX.px-.5)*-3).toFixed(2)+'deg');t.style.setProperty('--wx',((EX.py-.5)*1.6).toFixed(2)+'deg')}
    if(EX.drag){const dx=e.clientX-sx;EX.moved=Math.max(EX.moved,Math.abs(dx));EX.tgt=clamp(sc-dx/Math.max(1,EX.mainW-EX.vw)*1.25,0,1)}
    if(e.pointerType==='mouse')exNear(e);
    const tip=$('#exTip'),h=e.target.closest&&e.target.closest('.wp,.hot');if(h&&h.classList.contains('hot')&&EX.lastHot!==h){EX.lastHot=h;dogReact('sniff')}else if(!h)EX.lastHot=null;
    if(h&&el.contains(h)&&e.pointerType==='mouse'){$('b',tip).textContent=h.dataset.tip||'';$('span',tip).textContent=h.dataset.sub||'';tip.style.left=(e.clientX-r.left)+'px';tip.style.top=(e.clientY-r.top)+'px';tip.classList.add('on')}else tip.classList.remove('on')},{passive:true});
  addEventListener('pointerup',()=>{EX.drag=false;view.classList.remove('drag')});
  view.addEventListener('wheel',e=>{e.preventDefault();EX.tgt=clamp(EX.tgt+(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)/Math.max(900,EX.mainW-EX.vw)*1.1,0,1)},{passive:false});
  el.addEventListener('keydown',e=>{if(!EX.open)return;
    if(e.key==='ArrowRight'){EX.tgt=clamp(EX.tgt+.07,0,1);e.preventDefault()}else if(e.key==='ArrowLeft'){EX.tgt=clamp(EX.tgt-.07,0,1);e.preventDefault()}
    else if((e.key==='Enter'||e.key===' ')&&e.target.closest&&e.target.closest('.wp,.hot')){e.preventDefault();e.target.closest('.wp,.hot').dispatchEvent(new MouseEvent('click',{bubbles:true}))}});
  el.addEventListener('click',e=>{
    if(EX.moved>7)return;
    const b=e.target.closest('#exMini button');if(b){sfx.click();exGoTo(+b.dataset.n);return}
    if(e.target.closest('#exAcad')){sfx.click();openJournal();return}
    if(e.target.closest('#exExit')){stopExpedition();return}
    if(e.target.closest('#exL')){sfx.click();EX.tgt=clamp(EX.tgt-.14,0,1);return}
    if(e.target.closest('#exR')){sfx.click();EX.tgt=clamp(EX.tgt+.14,0,1);return}
    const w=e.target.closest('.wp');if(w){sfx.click();const r=w.getBoundingClientRect();openChamber(+w.dataset.n,{x:r.left+r.width/2,y:r.top+r.height/2});return}
    const h=e.target.closest('.hot');if(h){sfx.click();hotAction(h.dataset.act,h)}});
  addEventListener('resize',()=>{if(EX.open)exResize()});
}
async function hotAction(act,node){
  if(act==='rack'){collect('rack')}
  else if(act==='fw'){toast('<b>Cortafuegos.</b> Deja pasar solo el tráfico permitido y detiene el resto.');comp.react('item');collect('muro')}
  else if(act==='disco'){collect('disco')}
  else if(act==='lock'){toast('<b>Autenticación.</b> Esta puerta tiene cerradura criptográfica: solo se abre con la clave correcta. Prueba a recoger la llave en la sala secreta…');comp.mood('curious',3000)}
  else if(act==='seal'){
    let hx='';try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('Archivo Sagrado del Nilo'));hx=[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){}
    toast(hx?`<b>SHA-256</b> de «Archivo Sagrado del Nilo»:<br><code style="word-break:break-all;font-size:12px;color:#E4C77D">${hx}</code>`:'<b>Sello hash.</b> Una huella única que resume un dato.',9000);collect('sello')}
  else if(act==='bug'){
    if(!P.d.purged){P.d.purged=true;P.save();const g=node.querySelector('.glitch');if(g){g.classList.remove('glitch');const u=g.querySelector('use');if(u){u.style.stroke='#E4C77D'}}toast('<b>Escarabajo purificado.</b> El malware corrompe ficheros; se combate con antivirus y actualizaciones.');comp.react('ok');collect('escarabajo')}
    else toast('Ya lo purificaste. Dicen que el malware vuelve si bajas la guardia.')}
  else if(act==='sand'){
    const m=$('#sandMound',node);P.d.sand.n=(P.d.sand.n|0)+1;P.save();const k=P.d.sand.n;
    if(m){m.style.transform=`scale(1,${clamp(1-k*.34,.02,1)})`;if(k>=3){m.style.opacity=0;const t=$('.sandtxt',node);if(t)t.style.opacity=1}}
    if(k<3){toast('Pasas el pincel por la arena… algo aparece bajo ella.',2400);aud.noise&&aud.noise(.5,1800,700,.3)}else{toast('<b>Inscripción revelada.</b> Un pergamino estaba escondido bajo la arena.');collect('papiro')}}
  else if(act==='room'){openRoom()}
  else if(/^frag[123]$/.test(act)){const k=act.slice(4);node.remove();collect(act);if(P.d.items.frag1&&P.d.items.frag2&&P.d.items.frag3&&!P.d.items.clave){P.d.items.clave='Reunión de los 3 fragmentos';P.save();setTimeout(()=>{toast('<b>¡Clave reconstruida!</b> Los tres fragmentos encajan.');openFicha('clave',true)},700)}}
}
function collect(id,where){
  const a=ARTIFACTS.find(x=>x.id===id);if(!a)return;
  const nuevo=!P.d.items[id];dogReact('happy');playerCheer(2200);if(nuevo)P.d.items[id]=where||(a.w&&id!=='clave'?'Mundo del Nilo':'Mundo del Nilo');P.save();comp.progress();
  openFicha(id,nuevo);
}
function expHide(){const el=$('#expedition');el.classList.remove('ov-on');EX.open=false}
function expBack(){const el=$('#expedition');ovShow(el);EX.open=true;try{world.inert=true}catch(e){}exUpdateProg();if(!EX.raf)EX.raf=requestAnimationFrame(exFrame);aud.setMood('mundo');try{el.focus({preventScroll:true})}catch(e){}}
function enterWorld(){
  if(!$('#exView'))buildExpedition();else{exResize();exUpdateProg()}
  state.exp=true;modeLock='mundo';aud.setMood('mundo');
  const el=$('#expedition');ovShow(el);el.setAttribute('tabindex','-1');EX.open=true;try{world.inert=true}catch(e){}
  if(!EX.raf)EX.raf=requestAnimationFrame(exFrame);
  EX.camC=0;EX.tgt=P.count()?clamp((WX[Math.min(6,P.count())]/WW*EX.mainW-EX.vw/2)/Math.max(1,EX.mainW-EX.vw),0,1):0;
  comp.mood('walk',3500);comp.tip(comp.line(['¡Vamos, '+avName()+'! Este escenario esconde algo… busca brillos y jeroglíficos.','Pulsa una pirámide: su guardiana te propondrá una prueba.']),6000);
  setTimeout(()=>{try{el.focus({preventScroll:true})}catch(e){}},300);
}
function stopExpedition(){
  const el=$('#expedition');expHide();state.exp=false;modeLock='';try{world.inert=false}catch(e){}world.removeAttribute('aria-hidden');el.setAttribute('aria-hidden','true');aud.setMood('mapa');
  try{world.scrollTo({top:$('#mapa').offsetTop,behavior:'auto'})}catch(e){}
}
function startExpedition(){
  if(state.exp||state.busy)return;
  if(state.chamber){closeChamber(true,()=>setTimeout(startExpedition,80));return}
  sfx.open();aud.start&&!aud.on&&0;comp.mood('walk',5000);
  const go=()=>{
    const swap=()=>{const after=()=>{if(!avGet().created)openCreator('new',()=>enterWorld());else enterWorld()};if(!P.d.story)startStory(after);else after()};
    if(REDUCED||!veilEl.animate){swap();return}
    const cx=innerWidth/2,cy=innerHeight/2;veilEl.classList.add('cover');
    veilAnim(cx,cy,'0px','150vmax',900).then(()=>{swap();return veilAnim(cx,cy,'150vmax','0px',900)}).then(()=>{veilEl.classList.remove('cover');veilEl.style.clipPath='circle(0 at 50% 50%)'});
  };
  const fr=$('#mapFrame');
  if(!REDUCED&&fr){state.busy=true;fr.classList.add('map-zoom');requestAnimationFrame(()=>fr.classList.add('go'));setTimeout(()=>{state.busy=false;go();setTimeout(()=>fr.classList.remove('map-zoom','go'),1200)},1250)}else go();
}
