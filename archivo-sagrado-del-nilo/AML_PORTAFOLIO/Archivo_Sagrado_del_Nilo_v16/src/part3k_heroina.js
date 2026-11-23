/* ---------- LA ARCHIVERA · retrato definitivo ----------
   Retrato anime-fantástico egipcio: melena castaña ondulada, facciones delicadas,
   mirada serena y joyería de oro/turquesa. La imagen se incrusta en el HTML final. */
function heroinaSVG(opts){
  return `<img class="hr-svg hr-portrait" src="{{ARCHIVERA_IMG}}" alt="La Archivera, retrato de fantasía egipcia con cabello castaño ondulado, diadema dorada y turquesas, cielo estrellado y luna creciente" loading="eager" decoding="async">`;
}
const HR_LINES=['Bienvenida al Archivo. Aquí cada papiro guarda una lección.','La arena borra huellas, pero los registros permanecen.','Una buena clave abre la puerta; un buen respaldo, el futuro.','Mira con atención: en los jeroglíficos también hay pistas.','Sadchuruzen huele los secretos antes que nadie.'];
function heroinaLive(host){
  if(!host||host._hl)return;host._hl=1;const say=$('.hr-say',host);let n=0,t=0;
  const look=e=>{if(REDUCED)return;const r=host.getBoundingClientRect();if(!r.width||r.bottom<0||r.top>innerHeight)return;
    const x=clamp(((e.clientX-r.left)/r.width-.5)*2,-1,1),y=clamp(((e.clientY-r.top)/r.height-.5)*2,-1,1);
    host.style.setProperty('--gx',x.toFixed(2));host.style.setProperty('--gy',y.toFixed(2))};
  addEventListener('pointermove',look,{passive:true});
  const on=()=>host.classList.add('react'),off=()=>{if(!t)host.classList.remove('react')};
  host.addEventListener('pointerenter',on);host.addEventListener('pointerleave',off);host.addEventListener('focus',on);host.addEventListener('blur',off);
  host.addEventListener('click',()=>{host.classList.add('react','bow');clearTimeout(t);if(say)say.textContent=HR_LINES[n++%HR_LINES.length];
    try{sfx.click();aud.tone&&aud.tone(660,.5,'sine',.06,990)}catch(e){}
    t=setTimeout(()=>{t=0;host.classList.remove('bow');if(!host.matches(':hover,:focus'))host.classList.remove('react')},2600)});
}
