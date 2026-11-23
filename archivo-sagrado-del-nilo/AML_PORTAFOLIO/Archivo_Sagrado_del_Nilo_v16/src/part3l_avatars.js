/* ---------- 22. AVATARES Y CREACIÓN DEL EXPLORADOR ----------
   Un solo "rig" articulado (cabeza, brazos, piernas, pelo) dibujado con datos: 10 personajes (5 personas, perro, gata,
   ibis, cría de esfinge, escarabajo), 5 peinados, 5 tonos de piel / 5 colores de pelaje, 4 vestuarios, 6 colores de ropa,
   5 adornos, 5 amuletos. La presentación (mujer / hombre / prefiero no decirlo) SOLO ordena sugerencias en la galería:
   cualquier avatar puede usar cualquier ropa, y no limita contenidos, retos ni recompensas.
   Los desbloqueos (colores, adornos, amuletos) dependen de cámaras realmente superadas. */
const hx2=h=>{if(h.length===4)h='#'+h[1]+h[1]+h[2]+h[2]+h[3]+h[3];return [1,3,5].map(i=>parseInt(h.substr(i,2),16))};
const mixc=(a,b,k)=>{const A=hx2(a),B=hx2(b);return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*k).toString(16).padStart(2,'0')).join('')};
const FUR5=['#c99a5b','#7a5233','#2e2723','#d9cdb8','#8a8a92'];
const AV={
  kinds:[
    {id:'archivera',n:'Archivera',t:'h',g:'f',hs:0,o:0,d:'Melena larga y mirada serena',grp:0},
    {id:'sacerdotisa',n:'Sacerdotisa',t:'h',g:'f',hs:1,o:2,d:'Peluca egipcia con cuentas de oro',grp:0},
    {id:'escriba',n:'Escriba',t:'h',g:'m',hs:2,o:1,d:'Pelo corto, falda y gran collar',grp:0},
    {id:'sabio',n:'Sabio del templo',t:'h',g:'m',hs:3,o:2,d:'Cabeza rasurada y barba trenzada',grp:0},
    {id:'peregrine',n:'Peregrine',t:'h',g:'x',hs:4,o:3,d:'Rizos y capa de viajero',grp:0},
    {id:'chacal',n:'Perro del alba',t:'dog',d:'Orejas de chacal, hocico fino',grp:1},
    {id:'gata',n:'Gata de Bastet',t:'cat',d:'Ojos verdes y andar silencioso',grp:1},
    {id:'ibis',n:'Ibis de Thot',t:'ibis',d:'Pico curvo, guardián de escribas',grp:2},
    {id:'esfinge',n:'Cría de esfinge',t:'sph',d:'Nemes rayado y cola de león',grp:2},
    {id:'escarabajo',n:'Escarabajo solar',t:'scar',d:'Coraza brillante y antenas',grp:2}],
  grpN:['Personas','Animales','Criaturas míticas'],
  skins:['#f4dcc6','#e2b48c','#c58a5c','#9a6440','#6b4128'],skinN:['Marfil','Miel','Bronce','Cobre','Ébano'],
  hairC:['#2b170e','#0e0b0c','#6a3a1f','#b0823a','#aab0bd','#24407a'],hairCN:['Castaño','Negro','Cobrizo','Dorado','Plata','Azul noche'],
  hairS:['Melena larga','Peluca egipcia','Corto','Rasurado y barba','Rizado'],
  fur:{dog:FUR5,cat:['#1d1d24','#8a8a92','#d09a5a','#e8e0d0','#6a4a38'],ibis:['#f1ede4','#d9d4c8','#8a8a96','#e8c9c0','#7b8fa8'],sph:['#d4a55a','#c9915a','#a8793d','#e0c28a','#8f6a3a'],scar:['#1f6f8f','#2fb3a9','#b8892f','#2a2f55','#6a3f8f']},
  furN:['Tono 1','Tono 2','Tono 3','Tono 4','Tono 5'],
  outfits:['Túnica de lino','Falda y collar','Túnica de sacerdote','Capa de viajero'],
  dress:['#f6ecd0','#7fe0d8','#9cc4f2','#e0a870','#c0505e','#3a3f6a'],dressN:['Lino','Turquesa','Lapislázuli','Ocre','Carmesí','Noche'],
  acc:[['none','Sin adorno',0],['banda','Banda dorada',0],['loto','Flor de loto',2],['uraeus','Diadema de la cobra',4],['sol','Disco solar',6]],
  amu:[['none','Ninguno',0],['ankh','Ankh',1],['eye','Ojo de Horus',2],['scarab','Escarabajo',3],['feather','Pluma de Maat',5]],
  DEF:{kind:0,name:'',gender:'x',skin:1,hair:0,hairC:0,fur:0,outfit:0,dress:0,acc:1,amu:0}
};
const avGet=()=>Object.assign({},AV.DEF,P.d.avatar||{});
const avDone=n=>!!P.d.done[n];
const avUnl={
  dress:i=>i<=P.count()+1,
  acc:i=>AV.acc[i][2]===0||avDone(AV.acc[i][2]),
  amu:i=>AV.amu[i][2]===0||avDone(AV.amu[i][2])};
const avLockTxt={dress:i=>'Se desbloquea al superar '+Math.max(1,i-1)+' cámara(s)',acc:i=>'Se desbloquea al superar la cámara '+AV.acc[i][2],amu:i=>'Se desbloquea al superar la cámara '+AV.amu[i][2]};
function avKind(av){return AV.kinds[av.kind|0]||AV.kinds[0]}
function avBody(av){const K=avKind(av),t=K.t;return t==='h'?(AV.skins[av.skin|0]||AV.skins[1]):((AV.fur[t]||FUR5)[av.fur|0]||FUR5[0])}

/* ----- cabezas ----- */
function avHeadHTML(av){
  const K=avKind(av),t=K.t,bc=avBody(av),hc=AV.hairC[av.hairC|0]||AV.hairC[0],hs=av.hair|0,dk=mixc(bc,'#000',.3),ks='#15100d';
  const eyeH=(x,y,col,sx)=>`<g class="eye"><path d="M${x-5.2} ${y}q${5.2*sx*0+5.2} -5.4 10.4 0q-5.2 4.8 -10.4 0Z" fill="#fff"/><circle cx="${x+.4}" cy="${y}" r="2.7" fill="${col}"/><circle cx="${x+.9}" cy="${y-.4}" r="1.1" fill="#150b07"/></g><path d="M${x-6} ${y-.6}q6.4-6 12.4-.2l3.2-1.8" stroke="${ks}" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M${x-5} ${y+1.8}q5 3 10 0" stroke="${ks}" stroke-width=".9" fill="none"/>`;
  let back='',front='';
  if(t==='h'||t==='sph'){
    const sk=bc;
    if(t==='h'){
      if(hs===0)back=`<path d="M47 34C20 38 8 92 24 142C32 112 38 92 50 80Z" fill="${hc}"/><path d="M30 80C24 100 26 122 30 136" stroke="${mixc(hc,'#fff',.25)}" stroke-width="1.4" fill="none" opacity=".6"/>`;
      if(hs===1)back=`<path d="M34 46Q34 22 53 22Q72 22 72 46L76 92L30 92Z" fill="${hc}"/><path d="M30 92h46" stroke="#E4C77D" stroke-width="3" stroke-dasharray="3 2"/>`;
      if(hs===4)back=[[40,34,9],[51,27,10],[63,30,9],[71,40,8],[35,47,8],[33,60,7],[38,72,6],[70,56,6]].map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="${hc}"/>`).join('');
    }else back=`<path d="M35 38C33 18 73 18 71 38L76 88L30 88Z" fill="#E4C77D"/>${[30,40,50,60,70,80].map(y=>`<path d="M32 ${y}H74" stroke="#2457b8" stroke-width="3.2" opacity=".85"/>`).join('')}`;
    const face=`<ellipse cx="53" cy="52" rx="15" ry="17" fill="${sk}"/><ellipse cx="39.5" cy="54" rx="3" ry="5" fill="${sk}"/>`
      +eyeH(61,52,t==='h'?'#8a5a1c':'#2a6b3a',1)+`<path d="M56 46q5-3 10-.5" stroke="${t==='h'?hc:'#3a2a14'}" stroke-width="1.9" fill="none" stroke-linecap="round"/><path d="M66 52q3 5 1 7q-2 1-3 0" stroke="${mixc(sk,'#000',.28)}" stroke-width="1.2" fill="none"/><circle cx="59" cy="58" r="3.2" fill="#e07a6a" opacity=".2"/><path d="M59 63q3 2 7 0" stroke="#a24a44" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    if(t==='h'){
      if(hs===0)front=`<path d="M38 50C36 28 52 22 66 32C70 40 68 48 66 52C60 44 50 40 40 46Z" fill="${hc}"/><path d="M38 52C32 72 36 96 40 112" fill="none" stroke="${hc}" stroke-width="8" stroke-linecap="round" class="hairw"/>`;
      if(hs===1)front=`<path d="M37 44Q53 26 69 40L69 46Q53 34 38 50Z" fill="${hc}"/><path d="M36 48L33 90" stroke="${hc}" stroke-width="6" stroke-linecap="round" class="hairw"/>`;
      if(hs===2)front=`<path d="M38 50C36 30 52 22 66 32C70 40 68 46 66 50C60 42 50 38 40 46Z" fill="${hc}"/><path d="M38 46Q36 60 40 62" stroke="${hc}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      if(hs===3)front=`<path d="M44 64q9 15 20 0q-2 9-10 11q-8-2-10-11Z" fill="${hc}"/><path d="M53 74v10" stroke="${hc}" stroke-width="3" stroke-linecap="round"/><ellipse cx="50" cy="36" rx="7" ry="3" fill="#fff" opacity=".18"/>`;
      if(hs===4)front=`<path d="M38 50C36 34 46 30 56 33" fill="none" stroke="${hc}" stroke-width="6" stroke-linecap="round"/>${[[44,36,5],[54,32,5],[64,36,5]].map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="${hc}"/>`).join('')}`;
    }else front=`<path d="M38 48Q53 28 68 48L68 54Q53 38 38 54Z" fill="#E4C77D"/><path d="M40 46Q53 34 66 46" stroke="#2457b8" stroke-width="2.4" fill="none"/><circle cx="37" cy="42" r="4" fill="${sk}"/><circle cx="37" cy="42" r="2" fill="${dk}"/>`;
    return back+face+front;
  }
  if(t==='dog')return `<path d="M44 38L38 6L55 30Z" fill="${bc}"/><path d="M45 33L42 14L51 29Z" fill="${dk}"/><path d="M56 32L63 4L70 36Z" fill="${bc}"/><path d="M60 31L63 14L66 33Z" fill="${dk}"/>
   <ellipse cx="52" cy="50" rx="15" ry="15" fill="${bc}"/><path d="M58 46L88 56Q90 63 82 65L58 66Z" fill="${mixc(bc,'#fff',.12)}"/><path d="M52 58Q58 70 70 66" stroke="${dk}" stroke-width="1" fill="none" opacity=".5"/><ellipse cx="88" cy="57" rx="3.6" ry="3" fill="${ks}"/><path d="M60 64H82" stroke="${ks}" stroke-width="1.1" opacity=".7"/>
   <g class="eye"><ellipse cx="62" cy="47" rx="3.2" ry="2.7" fill="#e0a82e"/><circle cx="62.6" cy="47" r="1.3" fill="#150b07"/></g><path d="M57 46q6-5 11-.5l4-2" stroke="${ks}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  if(t==='cat')return `<path d="M40 40L36 14L54 32Z" fill="${bc}"/><path d="M42 36L40 22L50 32Z" fill="#e8a4a0"/><path d="M52 32L70 14L68 42Z" fill="${bc}"/><path d="M56 33L66 22L64 40Z" fill="#e8a4a0"/>
   <ellipse cx="53" cy="52" rx="16" ry="15" fill="${bc}"/><path d="M44 46q0 6 4 8M58 60q-4 4-10 2" stroke="${dk}" stroke-width=".9" fill="none" opacity=".5"/>
   <g class="eye"><ellipse cx="62" cy="49" rx="4" ry="3.2" fill="#8fd35a"/><ellipse cx="62.4" cy="49" rx="1" ry="3" fill="#0b0b0b"/></g><path d="M56.5 48q6-5.5 12-.4l3-2" stroke="${ks}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
   <path d="M66 56l3 0l-1.5 2.4Z" fill="#e8a4a0"/><path d="M67.5 58.4q-1 3-4 3M67.5 58.4q1 3 4 3" stroke="${ks}" stroke-width=".9" fill="none"/><path d="M69 57L88 52M69 59L89 60M68 61L86 67" stroke="#fff" stroke-width=".7" opacity=".7"/>`;
  if(t==='ibis')return `<path d="M44 42Q36 30 28 34Q38 36 42 46Z" fill="#2a2a33"/><ellipse cx="52" cy="50" rx="12" ry="12" fill="#2a2a33"/><path d="M60 46Q90 40 94 66Q84 52 60 55Z" fill="#3d3944"/><path d="M60 46Q84 44 92 60" stroke="#6a6574" stroke-width="1" fill="none"/>
   <g class="eye"><circle cx="58" cy="48" r="3.2" fill="#f2c24e"/><circle cx="58.6" cy="48" r="1.5" fill="#0b0605"/></g>`;
  if(t==='scar')return `<path d="M48 40Q44 22 54 12M56 38Q60 20 70 16" stroke="${dk}" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M62 46Q78 44 84 30Q82 50 68 56Z" fill="${dk}"/><path d="M62 56Q78 60 82 72Q70 70 62 62Z" fill="${dk}"/>
   <ellipse cx="52" cy="50" rx="17" ry="14" fill="${bc}"/><path d="M52 36V64" stroke="${mixc(bc,'#000',.4)}" stroke-width="1.2"/><ellipse cx="46" cy="44" rx="6" ry="3" fill="#fff" opacity=".22"/>
   <g class="eye"><ellipse cx="61" cy="47" rx="3.6" ry="3" fill="#ffd773"/><circle cx="61.6" cy="47" r="1.3" fill="#2b170e"/></g>`;
  return '';
}
function avAccHTML(av){
  const a=AV.acc[av.acc|0]||AV.acc[0],id=a[0];if(id==='none')return '';
  const t=avKind(av).t,y=t==='h'||t==='sph'?44:40,band=`<path d="M38 ${y}q15-12 30 0" fill="none" stroke="#E4C77D" stroke-width="3.2" stroke-linecap="round"/>`;
  if(id==='banda')return band;
  if(id==='loto')return band+`<g transform="translate(54 ${y-10})"><path d="M0 0q-6-8 0-15q6 7 0 15Z" fill="#79b4f0"/><path d="M0 0q-11-3-11-11q8 1 11 11Z" fill="#4c86cf"/><path d="M0 0q11-3 11-11q-8 1-11 11Z" fill="#4c86cf"/><circle cy="-3" r="1.6" fill="#E4C77D"/></g>`;
  if(id==='uraeus')return band+`<path d="M66 ${y-1}q5-7 0-12q-4 4-1 12Z" fill="#E4C77D" stroke="#a8782d" stroke-width=".8"/><circle cx="66.4" cy="${y-9}" r="1.2" fill="#2fb3a9"/>`;
  if(id==='sol')return band+`<circle cx="54" cy="${y-12}" r="7.5" fill="#d95b3c" stroke="#E4C77D" stroke-width="2"/><path d="M45 ${y-9}q9 8 18 0" stroke="#E4C77D" stroke-width="2" fill="none"/>`;
  return '';
}
/* ----- cuerpo completo (viewBox 100x200, mira a la derecha). opts: view 'full'|'bust', live, pose ----- */
function avFull(av,o){
  o=o||{};av=av||avGet();const K=avKind(av),t=K.t,bc=avBody(av),dc=AV.dress[av.dress|0]||AV.dress[0],dd=mixc(dc,'#000',.22),dl=mixc(dc,'#fff',.35),of=av.outfit|0,
    bird=t==='ibis',legC=bird?'#3a3a44':bc,legW=bird?6:10,amu=(AV.amu[av.amu|0]||AV.amu[0])[0],gold='#E4C77D',tq='#2fb3a9';
  const vb=o.view==='bust'?'14 14 80 84':'0 0 100 200';
  const arm=(cls,x,dx,c)=>`<g class="arm ${cls}" style="transform-origin:${x}px 80px"><path d="M${x} 80q${dx*.6} 18 ${dx} 36" stroke="${c}" stroke-width="8.5" stroke-linecap="round" fill="none"/><path d="M${x+dx*.15} 90q${dx*.4} 12 ${dx*.9} 24" stroke="#000" stroke-opacity=".12" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="${x+dx}" cy="117" r="4.6" fill="${c}"/>${amu==='ankh'&&cls==='an'?'':''}</g>`;
  const leg=(cls,x,c)=>`<g class="lg ${cls}" style="transform-origin:${x}px 120px"><path d="M${x} 120v62" stroke="${c}" stroke-width="${legW}" stroke-linecap="round"/><path d="M${x+2.4} 124v56" stroke="#000" stroke-opacity=".12" stroke-width="${legW*.38}" stroke-linecap="round"/><path d="M${x-6} 186h${bird?18:16}" stroke="${bird?'#2a2a33':gold}" stroke-width="6" stroke-linecap="round"/></g>`;
  let torso='';
  if(of===0)torso=`<path d="M36 76Q50 70 64 76L70 152L32 152Z" fill="${dc}" stroke="${dd}" stroke-width="1.2"/><path d="M60 78L66 152L50 152Z" fill="#000" opacity=".1"/><path d="M42 92v58M50 96v56M58 92v58" stroke="${dd}" stroke-width=".7" opacity=".5"/><path d="M38 84Q50 100 62 84" fill="none" stroke="${gold}" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="94" r="3" fill="${tq}"/><path d="M33 150h38" stroke="${gold}" stroke-width="4"/>`;
  if(of===1)torso=`<path d="M38 76Q50 70 62 76L60 112L40 112Z" fill="${bc}"/><path d="M60 78L61 112L52 112Z" fill="#000" opacity=".12"/><path d="M36 108H66L70 154H32Z" fill="${dc}" stroke="${dd}" stroke-width="1.2"/><path d="M44 108h12l4 46h-20Z" fill="${dl}" opacity=".7"/><path d="M35 106h32v6H35Z" fill="${gold}"/><path d="M38 78Q50 108 62 78" fill="none" stroke="${gold}" stroke-width="5" stroke-linecap="round"/><path d="M41 84Q50 102 59 84" fill="none" stroke="${tq}" stroke-width="2.4" stroke-dasharray="2 3.4" stroke-linecap="round"/>`;
  if(of===2)torso=`<path d="M36 76Q50 70 64 76L72 162L30 162Z" fill="${dc}" stroke="${dd}" stroke-width="1.2"/><path d="M62 78L72 162L52 162Z" fill="#000" opacity=".1"/><path d="M38 78L66 118" stroke="${gold}" stroke-width="6" stroke-linecap="round"/><path d="M38 78L66 118" stroke="${dd}" stroke-width="1.6" stroke-dasharray="3 3"/><path d="M33 112h38" stroke="${dd}" stroke-width="5"/><path d="M31 158h42" stroke="${gold}" stroke-width="4"/>`;
  if(of===3)torso=`<path d="M36 76Q16 104 20 152L42 142Z" fill="${dd}"/><path d="M37 76Q50 70 63 76L66 136L34 136Z" fill="${dc}" stroke="${dd}" stroke-width="1.2"/><path d="M60 78L66 136L50 136Z" fill="#000" opacity=".1"/><path d="M34 112h32" stroke="#6a4028" stroke-width="5"/><circle cx="50" cy="112" r="3" fill="${gold}"/><path d="M38 80Q50 90 62 80" fill="none" stroke="${gold}" stroke-width="3.2"/>`;
  const am=amu==='ankh'?`<path d="M50 112v18M44 118h12M50 112a4 4 0 1 1 0-8" fill="none" stroke="${gold}" stroke-width="2.4" stroke-linecap="round"/>`:amu==='eye'?`<path d="M42 118q8-8 16 0q-8 8-16 0Z" fill="none" stroke="${tq}" stroke-width="2"/><circle cx="50" cy="118" r="2.4" fill="${gold}"/>`:amu==='scarab'?`<ellipse cx="50" cy="118" rx="6" ry="8" fill="${tq}" stroke="${gold}" stroke-width="1.6"/><path d="M50 110v16" stroke="${gold}" stroke-width="1"/>`:amu==='feather'?`<path d="M50 108q-8 12 0 26q8-14 0-26Z" fill="#f2f0e6" stroke="${gold}" stroke-width="1.4"/><path d="M50 108v26" stroke="${gold}" stroke-width=".9"/>`:'';
  const tail=t==='sph'?`<path d="M34 140Q10 138 14 112" fill="none" stroke="${bc}" stroke-width="5" stroke-linecap="round"/><circle cx="14" cy="110" r="4.5" fill="${mixc(bc,'#000',.35)}"/>`:t==='dog'?`<path d="M34 130Q14 130 14 106" fill="none" stroke="${bc}" stroke-width="6" stroke-linecap="round" class="hairw"/>`:t==='cat'?`<path d="M34 134Q8 132 16 100Q20 92 26 96" fill="none" stroke="${bc}" stroke-width="5.5" stroke-linecap="round" class="hairw"/>`:'';
  const hb=t==='h'?'':'';
  return `<svg class="ex-svg avk-${K.id}${o.live?' avl':''}" viewBox="${vb}" aria-hidden="true" focusable="false">
  ${o.view==='bust'?'':'<ellipse class="sh" cx="52" cy="194" rx="30" ry="5" fill="#000" opacity=".3"/>'}
  ${tail}${arm('af',37,-5,mixc(legC,'#000',.14))}${leg('lf',44,mixc(legC,'#000',.1))}
  ${leg('ln',58,legC)}
  <g class="torso">${torso}${am}</g>
  <rect x="46" y="64" width="12" height="14" fill="${bird?'#2a2a33':bc}"/>
  <g class="headx" style="transform-origin:52px 66px">${avHeadHTML(av)}${avAccHTML(av)}</g>
  ${arm('an',63,5,bc)}</svg>`;
}
const avBust=(av,live)=>avFull(av||avGet(),{view:'bust',live});
const avName=()=>{const a=avGet();return (a.name||'').trim()||'Viajero'};

/* ----- jugador dentro del mundo ----- */
const PL={el:null,last:0};
function initWorldPlayer(){
  const hud=$('#expedition .ex-hud');if(!hud)return;let d=$('#exPlayer');
  if(!d){d=document.createElement('div');d.id='exPlayer';d.setAttribute('role','img');hud.appendChild(d)}
  d.setAttribute('aria-label',avName()+' explora el Nilo');d.innerHTML=avFull(avGet(),{live:true});PL.el=d;
}
function playerTick(diff){
  const d=PL.el;if(!d)return;const mv=Math.abs(diff)>.0015,s=d.firstElementChild;if(!s)return;
  s.classList.toggle('walking',mv);if(mv){d.classList.toggle('l',diff<0);s.classList.remove('avl')}else if(!s.classList.contains('avl'))s.classList.add('avl');
}
function playerCheer(ms){const d=PL.el;if(!d||!d.firstElementChild)return;const s=d.firstElementChild;s.classList.add('cheer');setTimeout(()=>s.classList.remove('cheer'),ms||2200)}

/* ----- botón de perfil ----- */
function profileChip(){
  const b=$('#btnProfile');if(!b)return;const a=avGet();
  b.innerHTML=a.created?avBust(a,false):'<span class="q" aria-hidden="true">?</span>';
  const lab=a.created?'Mi explorador: '+avName()+'. Editar perfil':'Crear mi explorador';b.setAttribute('aria-label',lab);b.title=lab;
}

/* ----- creador ----- */
const CR={mode:'new',step:0,done:null,av:null,touched:false,arriving:false};
const CR_STEPS=['Nombre','Avatar','Apariencia','Vestuario','Confirmar'];
function crSw(key,list,cur,names,unl,lockTxt,colors){
  return list.map((c,i)=>{const un=unl?unl(i):true;
    return `<button type="button" class="cr-sw" data-k="${key}:${i}" aria-pressed="${cur===i}" ${un?'':'disabled'} style="background:${colors?colors[i]:c}" aria-label="${esc(names[i])}${un?'':' (bloqueado: '+lockTxt(i)+')'}" title="${esc(names[i])}${un?'':' · '+lockTxt(i)}">${un?'':'🔒'}</button>`}).join('');
}
function crChips(key,list,cur,unl,lockTxt,sub){
  return list.map((c,i)=>{const un=unl?unl(i):true,nm=Array.isArray(c)?c[1]:c;
    return `<button type="button" class="cr-chip" data-k="${key}:${i}" aria-pressed="${cur===i}" ${un?'':'disabled'}>${un?'':'🔒 '}${esc(nm)}${un?'':`<small>${esc(lockTxt(i))}</small>`}</button>`}).join('');
}
function crPanel(){
  const a=CR.av,K=avKind(a),h=K.t==='h',i=CR.step;let s='';
  if(i===0){
    s=`<div class="cr-arch"><div class="hr" aria-hidden="true">${heroinaSVG()}</div><p>«Soy la Archivera. Antes de cruzar el umbral, dime quién eres: el Archivo recuerda a todos los que lo recorren.»</p></div>
    <h3>¿Cómo te llamas, explorador?</h3><p class="lead">Escribe un nombre o apodo. Si lo dejas vacío, te llamaremos «Viajero». Podrás cambiarlo cuando quieras desde el botón de tu perfil.</p>
    <label for="crName" style="display:block;font:600 11px var(--f-display);letter-spacing:.2em;text-transform:uppercase;color:#bfa56b;margin-bottom:6px">Nombre o apodo</label>
    <input id="crName" class="cr-in" type="text" maxlength="18" autocomplete="off" spellcheck="false" value="${esc(a.name)}" placeholder="Tu nombre o apodo">
    <h4>Presentación (opcional)</h4><div class="cr-opts" role="group" aria-label="Presentación">${[['f','Mujer'],['m','Hombre'],['x','Prefiero no decirlo']].map(g=>`<button type="button" class="cr-chip" data-g="${g[0]}" aria-pressed="${a.gender===g[0]}">${g[1]}</button>`).join('')}</div>
    <p class="cr-note">Esto solo sirve para sugerirte avatares y estilos en la galería. No limita ningún personaje, prenda, habilidad, recompensa ni contenido: puedes elegir cualquier opción.</p>`;
  }else if(i===1){
    const sg=a.gender,order=[...AV.kinds.keys()].sort((x,y)=>{const kx=AV.kinds[x],ky=AV.kinds[y];if(kx.grp!==ky.grp)return kx.grp-ky.grp;if(kx.grp===0&&sg!=='x'){return (kx.g===sg?0:1)-(ky.g===sg?0:1)}return x-y});
    s=`<h3>Elige tu avatar</h3><p class="lead">Diez personajes distintos. Pulsa uno para verlo a la derecha: puedes cambiar de idea cuantas veces quieras.</p>`
     +[0,1,2].map(g=>`<h4>${AV.grpN[g]}</h4><div class="cr-gal">${order.filter(k=>AV.kinds[k].grp===g).map(k=>{const kk=AV.kinds[k],b=Object.assign({},a,{kind:k,fur:a.fur,hair:kk.hs!=null?kk.hs:a.hair,outfit:kk.o!=null?kk.o:a.outfit});
       return `<button type="button" class="cr-card" data-k="kind:${k}" aria-pressed="${a.kind===k}">${g===0&&sg!=='x'&&kk.g===sg?'<span class="sg">Sugerido</span>':''}<span class="pic">${avBust(b,false)}</span>${esc(kk.n)}<small>${esc(kk.d)}</small></button>`}).join('')}</div>`).join('');
  }else if(i===2){
    s=`<h3>Apariencia</h3><p class="lead">Ajusta el aspecto de <b>${esc(K.n)}</b>. Todo se ve al instante en la vista previa.</p>`;
    if(h)s+=`<h4>Tono de piel</h4><div class="cr-opts">${crSw('skin',AV.skins,a.skin,AV.skinN)}</div><h4>Peinado</h4><div class="cr-opts">${crChips('hair',AV.hairS,a.hair)}</div><h4>Color del pelo</h4><div class="cr-opts">${crSw('hairC',AV.hairC,a.hairC,AV.hairCN)}</div>`;
    else{const pal=AV.fur[K.t]||FUR5,nm=K.t==='ibis'?'Plumaje':K.t==='scar'?'Coraza':K.t==='sph'?'Pelaje dorado':'Pelaje';s+=`<h4>${nm}</h4><div class="cr-opts">${crSw('fur',pal,a.fur,AV.furN)}</div><p class="cr-note">Los personajes no humanos no llevan peinado: su aspecto lo definen el color y los adornos.</p>`}
    if(K.t==='sph'&&false)s+='';
  }else if(i===3){
    s=`<h3>Vestuario, adornos y amuletos</h3><p class="lead">Cualquier prenda es para cualquier persona. Los colores, adornos y amuletos nuevos se desbloquean al superar cámaras y recoger reliquias.</p>
    <h4>Vestimenta</h4><div class="cr-opts">${crChips('outfit',AV.outfits,a.outfit)}</div>
    <h4>Color de la ropa</h4><div class="cr-opts">${crSw('dress',AV.dress,a.dress,AV.dressN,avUnl.dress,avLockTxt.dress,AV.dress)}</div>
    <h4>Adorno de cabeza</h4><div class="cr-opts">${crChips('acc',AV.acc,a.acc,avUnl.acc,avLockTxt.acc)}</div>
    <h4>Amuleto</h4><div class="cr-opts">${crChips('amu',AV.amu,a.amu,avUnl.amu,avLockTxt.amu)}</div>`;
  }else{
    const o=AV.outfits[a.outfit],acc=AV.acc[a.acc][1],am=AV.amu[a.amu][1],g={f:'Mujer',m:'Hombre',x:'Sin especificar'}[a.gender];
    s=`<h3>${CR.mode==='new'?'Todo listo para la expedición':'Guardar cambios'}</h3><p class="lead">Comprueba cómo te ves a la derecha. ${CR.mode==='new'?'Al confirmar, '+esc((a.name||'').trim()||'Viajero')+' y Sadchuruzen llegarán al Nilo.':'Los cambios se aplican a todo el juego: mundo, retos, diario y subida a la cumbre.'}</p>
    <ul class="cr-sum"><li><b>Nombre</b>${esc((a.name||'').trim()||'Viajero')}</li><li><b>Presentación</b>${g}</li><li><b>Avatar</b>${esc(K.n)}</li><li><b>Vestimenta</b>${esc(o)} · ${esc(AV.dressN[a.dress])}</li><li><b>Adorno</b>${esc(acc)}</li><li><b>Amuleto</b>${esc(am)}</li></ul>
    <p class="cr-note">Tu perfil se guarda en este navegador (sin cuentas ni contraseñas). Puedes editarlo en cualquier momento con el botón de perfil.</p>`;
  }
  return s;
}
function crRender(){
  const el=$('#creator');if(!el)return;
  $('#crPanel',el).innerHTML=crPanel();$('#crPanel',el).scrollTop=0;
  $$('.cr-steps button',el).forEach((b,i)=>{b.classList.toggle('on',i===CR.step);b.setAttribute('aria-current',i===CR.step?'step':'false')});
  $('#crBack',el).disabled=CR.step===0;
  const last=CR.step===CR_STEPS.length-1;$('#crNext',el).textContent=last?(CR.mode==='new'?'¡Comenzar la aventura!':'Guardar cambios'):'Siguiente →';
  crPrev();
}
function crPrev(){
  const el=$('#creator');if(!el)return;const a=CR.av;
  $('#crFig',el).innerHTML=avFull(a,{live:true});$('#crNm',el).textContent=(a.name||'').trim()||'Viajero';$('#crKy',el).textContent=avKind(a).n;
}
function crSync(){
  const el=$('#creator'),a=CR.av;
  $$('[data-k]',el).forEach(b=>{const[k,v]=b.dataset.k.split(':');b.setAttribute('aria-pressed',String(a[k]===+v))});
  $$('[data-g]',el).forEach(b=>b.setAttribute('aria-pressed',String(a.gender===b.dataset.g)));
}
function openCreator(mode,done){
  let el=$('#creator');if(!el){el=document.createElement('div');el.id='creator';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Creación del explorador');el.setAttribute('aria-hidden','true');($('#journal')||document.body).parentNode.appendChild(el);bindCreator(el)}
  CR.mode=mode||'new';CR.step=0;CR.done=done||null;CR.touched=CR.mode==='edit'||!!avGet().created;CR.arriving=false;CR.av=avGet();
  if(!CR.av.created&&CR.mode==='new'){/* valores por defecto: Archivera */}
  el.innerHTML=`<svg class="cr-bg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${grad('crsky',[[0,'#060b14'],[.6,'#241c22'],[1,'#6e4524']])}${rgrad('crglow',[[0,'rgba(255,200,120,.35)'],[1,'rgba(255,200,120,0)']])}</defs><rect width="1600" height="900" fill="url(#crsky)"/><circle cx="1250" cy="170" r="70" fill="#f3e3b0" opacity=".9"/><circle cx="1250" cy="170" r="190" fill="url(#crglow)"/><circle cx="1000" cy="800" r="520" fill="url(#crglow)"/>${Array.from({length:60},(_,i)=>`<circle cx="${(i*131)%1600}" cy="${(i*71)%420}" r="${i%5?.9:1.6}" fill="#fff" opacity="${.2+(i%6)*.1}"/>`).join('')}<path d="M0 700L260 520L520 700ZM380 700L700 440L1020 700Z" fill="#1a1212" opacity=".8"/><rect y="700" width="1600" height="200" fill="#1b130c"/>${[90,1480].map(x=>`<rect x="${x-34}" y="120" width="68" height="640" fill="#120d08" stroke="#6e5528" stroke-width="2"/>`).join('')}</svg>
  <div class="cr-view"><div class="cr-top"><h2>Crea a tu explorador</h2><ol class="cr-steps" aria-label="Pasos">${CR_STEPS.map((s,i)=>`<li><button type="button" data-st="${i}">${i+1}. ${s}</button></li>`).join('')}</ol></div>
  <div class="cr-main"><section class="cr-panel" id="crPanel" aria-live="polite"></section>
   <aside class="cr-stage" aria-label="Vista previa"><div class="cr-pedestal"><div class="cr-fig" id="crFig" role="img" aria-label="Vista previa de tu explorador (pulsa para saludar)"></div><div class="cr-dogp" id="crDog" role="img" aria-label="Sadchuruzen"></div></div><div class="cr-nm" id="crNm"></div><div class="cr-ky" id="crKy"></div>
    <div class="cr-act"><button class="btn" type="button" id="crHi">Saludar</button><button class="btn" type="button" id="crRand">Sorpréndeme</button></div></aside></div>
  <div class="cr-nav"><button class="btn" type="button" id="crBack">← Atrás</button>${CR.mode==='edit'?'<button class="btn" type="button" id="crCancel">Cancelar</button>':''}<button class="btn" type="button" id="crNext">Siguiente →</button></div></div>
  <div class="cr-arrive" id="crArrive" aria-live="polite"></div>`;
  const dg=$('#crDog',el);dog.make(dg,'sit');
  ovShow(el);crRender();aud.setMood('creador');
  
  setTimeout(()=>{const f=$('#crName',el)||$('#crNext',el);try{f.focus({preventScroll:true})}catch(e){}},250);
}
function closeCreator(){const el=$('#creator');if(!el)return;ovHide(el);el.innerHTML='';aud.setMood(state.exp?'mundo':'mapa')}
function crApply(k,v){
  const a=CR.av;
  if(k==='kind'){const K=AV.kinds[v];a.kind=v;CR.touched=true;if(K.hs!=null)a.hair=K.hs;if(K.o!=null)a.outfit=K.o;a.fur=0;if(K.grp===0&&K.g&&a.gender==='x'){}}
  else a[k]=v;
}
function crConfirm(){
  const a=CR.av;a.name=(a.name||'').trim().slice(0,18);a.created=true;P.d.avatar=Object.assign({},a);P.save();
  profileChip();initWorldPlayer();
  const finish=()=>{closeCreator();const cb=CR.done;CR.done=null;cb&&cb()};
  if(CR.mode!=='new'){finish();try{sfx.click();toast('Perfil guardado: '+avName())}catch(e){}return}
  /* entrada cinematográfica: el explorador y Sadchuruzen llegan caminando al amanecer */
  const el=$('#creator'),ar=$('#crArrive',el);CR.arriving=true;sfx.open&&sfx.open();
  ar.innerHTML=`<div class="sun"></div><i class="pyr"></i><i class="pyr b"></i><div class="ground"></div><div class="cap">${esc(avName())} llega al Nilo<small>Sadchuruzen corre delante, olfateando la arena…</small></div><div class="walk"><div class="p">${avFull(a,{live:false}).replace('class="ex-svg','class="ex-svg walking')}</div><div class="d" id="crWd"></div></div><button class="ov-btn" id="crSkip" type="button" style="left:18px;bottom:18px">Continuar ›</button>`;
  ar.classList.add('on');dog.make($('#crWd',ar),'run');aud.setMood('mundo');
  let ended=false;const end=()=>{if(ended)return;ended=true;CR.arriving=false;finish()};
  $('#crSkip',ar).addEventListener('click',end);setTimeout(end,3900);
}
function bindCreator(el){
  el.addEventListener('click',e=>{const t=e.target;let b;
    if(t.closest('#crSkip'))return;
    if(b=t.closest('[data-st]')){CR.step=+b.dataset.st;sfx.click();crRender();return}
    if(t.closest('#crBack')){if(CR.step>0){CR.step--;sfx.click();crRender()}return}
    if(t.closest('#crCancel')){closeCreator();return}
    if(t.closest('#crNext')){sfx.click();if(CR.step<CR_STEPS.length-1){CR.step++;crRender()}else crConfirm();return}
    if(b=t.closest('[data-g]')){const g=b.dataset.g;CR.av.gender=g;if(!CR.touched){CR.av.kind=g==='f'?0:g==='m'?2:4;const K=AV.kinds[CR.av.kind];CR.av.hair=K.hs;CR.av.outfit=K.o}sfx.click();crSync();crPrev();return}
    if(b=t.closest('[data-k]')){if(b.disabled)return;const[k,v]=b.dataset.k.split(':');crApply(k,+v);sfx.click();crSync();crPrev();return}
    if(t.closest('#crHi')||t.closest('#crFig')){const s=$('#crFig .ex-svg',el);if(s){s.classList.remove('greet');void s.getBoundingClientRect();s.classList.add('greet')}dogReactEl($('#crDog',el),'happy');sfx.click();return}
    if(t.closest('#crDog')){dogReactEl($('#crDog',el),'happy');return}
    if(t.closest('#crRand')){const a=CR.av,pick=n=>Math.floor(Math.random()*n),ok=(l,f)=>{const c=[...l.keys()].filter(f);return c[pick(c.length)]};
      a.kind=pick(AV.kinds.length);const K=AV.kinds[a.kind];CR.touched=true;a.skin=pick(5);a.hair=K.hs!=null&&Math.random()<.6?K.hs:pick(5);a.hairC=pick(6);a.fur=pick(5);a.outfit=pick(4);
      a.dress=ok(AV.dress,i=>avUnl.dress(i));a.acc=ok(AV.acc,i=>avUnl.acc(i));a.amu=ok(AV.amu,i=>avUnl.amu(i));sfx.click();crRender();return}});
  el.addEventListener('input',e=>{if(e.target.id==='crName'){CR.av.name=e.target.value.slice(0,18);crPrev()}});
  el.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='crName'){e.preventDefault();$('#crNext',el).click()}});
}
function dogReactEl(d,kind){if(!d)return;d._hold=performance.now()+2200;dog.temp(d,kind==='happy'?'happy':'sniff',2200)}
/* Reinicio: conserva el perfil (nombre y avatar) salvo que se pida lo contrario */
function resetExpedition(keepProfile){
  const av=P.d.avatar;try{localStorage.removeItem(SKEY);if(keepProfile&&av&&av.created)localStorage.setItem(SKEY,JSON.stringify({avatar:av}))}catch(e){}
  location.reload();
}
function initAvatars(){
  const jb=$('#btnJournal');if(!jb||$('#btnProfile'))return;
  const b=document.createElement('button');b.type='button';b.id='btnProfile';b.className='ibtn jbtn pbtn';jb.insertAdjacentElement('afterend',b);
  b.addEventListener('click',()=>{sfx.click();openCreator(avGet().created?'edit':'new',null)});
  profileChip();
  addEventListener('keydown',e=>{if(e.key!=='Escape')return;const c=$('#creator');if(!c||!c.classList.contains('ov-on'))return;
    e.stopImmediatePropagation();e.preventDefault();if(CR.mode==='edit'&&!CR.arriving)closeCreator()},true);
}
