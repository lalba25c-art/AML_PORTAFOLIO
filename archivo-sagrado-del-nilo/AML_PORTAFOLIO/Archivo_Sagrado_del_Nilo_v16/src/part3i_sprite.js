/* ---------- 19. SADCHURUZEN DE CUERPO ENTERO: sprite articulado (patas, cabeza, cola, orejas) ----------
   Dibujado en SVG a partir de la referencia (cachorro Shar Pei chocolate, tocado dorado con gema turquesa,
   collar-pectoral dorado con turquesas). Es una versión PROVISIONAL de cuerpo entero: el retrato circular sigue
   siendo tu fotografía/diseño de referencia. Cuando haya un spritesheet dibujado por un artista, solo hay que
   sustituir dogSVG(). Cada pata, la cabeza, las orejas y la cola son piezas independientes animadas con CSS. */
const DOGC={b:'#4a2b21',b2:'#3a2019',b3:'#6a4335',gold:'#E4C77D',gold2:'#a8782d',tq:'#2fb3a9'};
function dogLeg(cls,hx,hy,shade){
  const c=shade?DOGC.b2:DOGC.b;
  return `<g class="leg ${cls}" style="transform-origin:${hx}px ${hy}px"><path d="M${hx} ${hy-4}v24" stroke="${c}" stroke-width="15" stroke-linecap="round"/>
   <g class="shin" style="transform-origin:${hx}px ${hy+20}px"><path d="M${hx} ${hy+18}v14" stroke="${c}" stroke-width="12" stroke-linecap="round"/><ellipse cx="${hx+4}" cy="${hy+35}" rx="11" ry="5.6" fill="${c}"/>
   <path d="M${hx+1} ${hy+37}v-2M${hx+5} ${hy+37}v-2M${hx+9} ${hy+37}v-2" stroke="#1d0f0b" stroke-width="1.2"/></g></g>`;
}
function dogSVG(){
  return `<svg class="dog-svg" viewBox="0 0 240 160" aria-hidden="true" focusable="false">
  <ellipse class="sh" cx="122" cy="150" rx="82" ry="7" fill="#000" opacity=".28"/>
  <g class="dog-all">
   ${dogLeg('bf',62,104,true)}${dogLeg('ff',130,106,true)}
   <g class="tail" style="transform-origin:46px 76px"><path d="M48 78q-20-4-18-22q2-8 10-4" fill="none" stroke="${DOGC.b}" stroke-width="10" stroke-linecap="round"/></g>
   <g class="body-g" style="transform-origin:140px 110px">
    <path d="M42 90C38 62 62 50 98 50C134 50 154 62 154 88C154 108 140 116 124 116L68 116C52 116 44 106 42 90Z" fill="${DOGC.b}"/>
    <path d="M60 60q12 6 8 20M80 54q12 8 8 24M100 52q12 8 8 22M118 54q10 8 6 22" fill="none" stroke="${DOGC.b2}" stroke-width="2.4" stroke-linecap="round" opacity=".85"/>
    <path d="M56 100q14 6 30 2" stroke="${DOGC.b3}" stroke-width="2" fill="none" opacity=".6"/>
    <ellipse class="haunch" cx="64" cy="92" rx="22" ry="22" fill="${DOGC.b}" stroke="${DOGC.b2}" stroke-width="1.6"/>
    <path d="M60 118a24 22 0 0 1 0-44" fill="none" stroke="${DOGC.b3}" stroke-width="1.6" opacity=".5"/>
    <path d="M142 66Q164 84 142 108" fill="none" stroke="${DOGC.gold2}" stroke-width="10" stroke-linecap="round"/><path d="M142 66Q164 84 142 108" fill="none" stroke="${DOGC.gold}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="153" cy="84" r="5" fill="${DOGC.tq}" stroke="${DOGC.gold}" stroke-width="1.5"/><circle cx="148" cy="72" r="3" fill="${DOGC.tq}"/><circle cx="148" cy="97" r="3" fill="${DOGC.tq}"/>
    <path d="M118 58l16 -4l6 14l-18 4Z" fill="${DOGC.gold}" stroke="${DOGC.gold2}" stroke-width="1.4"/><circle cx="128" cy="62" r="3.4" fill="${DOGC.tq}"/>
   </g>
   ${dogLeg('bn',74,106,false)}${dogLeg('fn',142,108,false)}
   <g class="head" style="transform-origin:152px 74px">
    <g class="ear ear2" style="transform-origin:170px 44px"><path d="M162 46l-2-16l16 10Z" fill="${DOGC.b2}"/></g>
    <ellipse cx="176" cy="64" rx="28" ry="25" fill="${DOGC.b}"/>
    <path d="M158 50q10-7 24-3M158 58q10-5 22-1M162 68q8 3 18 0" fill="none" stroke="${DOGC.b2}" stroke-width="2.2" stroke-linecap="round" opacity=".9"/>
    <ellipse cx="198" cy="74" rx="16" ry="12" fill="${DOGC.b3}"/><ellipse cx="198" cy="76" rx="14" ry="9" fill="${DOGC.b2}"/>
    <circle cx="209" cy="70" r="4.4" fill="#0d0605"/><circle cx="207.8" cy="68.8" r="1.2" fill="#fff" opacity=".6"/>
    <path class="mouth" d="M192 82q8 4 16 0" fill="none" stroke="#1d0f0b" stroke-width="1.8" stroke-linecap="round"/>
    <path class="tongue" d="M200 82q3 12 8 8q2-4-2-8Z" fill="#e0788a"/>
    <g class="eye" style="transform-origin:184px 58px"><ellipse cx="184" cy="58" rx="3.8" ry="3.4" fill="#120807"/><circle cx="185" cy="57" r="1.1" fill="#fff"/></g>
    <path d="M178 52q6-3 11 0" stroke="#1d0f0b" stroke-width="1.4" fill="none" opacity=".7"/>
    <path d="M150 54Q154 34 178 34Q198 36 204 54L192 46Q176 42 158 50L152 74Q146 66 150 54Z" fill="${DOGC.gold}" stroke="${DOGC.gold2}" stroke-width="1.6"/>
    <path d="M160 46Q176 38 196 46M158 52Q176 44 200 52" fill="none" stroke="${DOGC.tq}" stroke-width="2"/>
    <path d="M150 54L146 80L156 78L158 52Z" fill="${DOGC.gold}" stroke="${DOGC.gold2}" stroke-width="1.4"/>
    <circle cx="186" cy="42" r="4.4" fill="${DOGC.tq}" stroke="#fff3c8" stroke-width="1.2"/>
    <g class="ear ear1" style="transform-origin:160px 48px"><path d="M156 48l-6-14l18 6Z" fill="${DOGC.b2}"/></g>
   </g>
  </g>
  <g class="fxs" aria-hidden="true"><text class="zz" x="196" y="30" font-size="20" fill="#E4C77D" font-family="Cinzel,serif">z z</text><text class="hrt" x="206" y="40" font-size="20" fill="#ff8aa8">♥</text></g>
  </svg>`;
}
const POSES=['walk','run','sit','lie','sniff','look','happy','sleep','climb','idle'];
const dog={
  make(host,pose='idle'){host.classList.add('dogspr');host.innerHTML=dogSVG();host.dataset.pose=pose;return host},
  set(host,pose,dir){if(!host)return;if(host.dataset.pose!==pose)host.dataset.pose=pose;if(dir)host.dataset.dir=dir},
  temp(host,pose,ms,back){this.set(host,pose);clearTimeout(host._t);host._t=setTimeout(()=>this.set(host,back||'sit'),ms)}
};
/* Compañera en el mundo: te acompaña y reacciona */
const WD={el:null,idleT:0,last:0,dir:'r'};
function initWorldDog(){
  const hud=$('#expedition .ex-hud');if(!hud||$('#exDog'))return;
  const d=document.createElement('div');d.id='exDog';d.setAttribute('role','img');d.setAttribute('aria-label','Sadchuruzen te acompaña');dog.make(d,'sit');hud.appendChild(d);WD.el=d;WD.last=performance.now();
}
function dogWorldTick(now){
  const d=WD.el;if(!d)return;
  const diff=EX.tgt-EX.camC,mv=Math.abs(diff);playerTick(diff);
  if(mv>.0015){WD.idleT=now;WD.dir=diff>0?'r':'l';dog.set(d,mv>.02?'run':'walk',WD.dir)}
  else{const idle=now-WD.idleT;if(d._hold&&now<d._hold)return;
    dog.set(d,idle>30000?'sleep':idle>12000?'lie':idle>2200?'sit':(d.dataset.pose==='walk'||d.dataset.pose==='run')?'sit':d.dataset.pose)}
}
function dogReact(kind){
  const d=WD.el;if(!d)return;const t=performance.now();
  if(kind==='sniff'){d._hold=t+1800;dog.temp(d,'sniff',1800)}
  else if(kind==='happy'){d._hold=t+2600;dog.temp(d,'happy',2600)}
  else if(kind==='look'){d._hold=t+1600;dog.temp(d,'look',1600)}
  WD.idleT=t;
}
