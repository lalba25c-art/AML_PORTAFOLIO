/* ---------- 23. MINIJUEGOS (uno por templo) ----------
   Cada juego recibe (a = arena DOM, c = contexto) y registra sus eventos/bucles con c.listen/c.raf/c.timer, de modo que
   se limpian solos al terminar. Contexto: c.level (-1 asistido, 0 normal, +1 difícil), c.pick(normal,asist,dificil),
   c.hit(frac) (daño al guardián, 0..1), c.hurt() (pierde vida), c.win(), c.lose(), c.hint (true si pidió pista). */
const fx={
  hit(){aud.tone(520,.16,'square',.07,240);aud.noise&&aud.noise(.12,1800,400,.1)},
  bad(){aud.tone(190,.35,'sawtooth',.1,80)},
  ok(){aud.tone(880,.2,'sine',.12,1320)},
  step(){aud.noise&&aud.noise(.06,700,250,.05)},
  shot(){aud.tone(900,.09,'triangle',.04,420)},
  seq(i){aud.tone([262,330,392,523][i%4],.35,'sine',.16)},
  boom(){aud.noise&&aud.noise(.7,900,60,.35);aud.tone(80,.6,'sine',.25,40)}
};
function mkCanvas(a){
  const cv=document.createElement('canvas'),x=cv.getContext('2d');a.appendChild(cv);let W=0,H=0;
  const fit=()=>{const r=a.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);W=Math.max(50,r.width);H=Math.max(50,r.height);cv.width=W*d;cv.height=H*d;x.setTransform(d,0,0,d,0,0)};
  fit();let ro=null;try{ro=new ResizeObserver(fit);ro.observe(a)}catch(e){}
  return{cv,x,w:()=>W,h:()=>H,off:()=>{try{ro&&ro.disconnect()}catch(e){}}};
}
const tokenCache={};
function tokenImg(){
  const av=avGet(),k=JSON.stringify(av);if(tokenCache.k===k)return tokenCache.img;
  const svg=avBust(av,false).replace('<svg','<svg xmlns="http://www.w3.org/2000/svg"'),im=new Image();im.src='data:image/svg+xml;utf8,'+encodeURIComponent(svg);tokenCache.k=k;tokenCache.img=im;return im;
}
const GAMES={};

/* ===== 1 · DEFENSA DEL UMBRAL: reflejos y reconocer amenazas ===== */
GAMES[1]={name:'Defensa del Umbral',skill:'Reflejos · reconocer amenazas',
 how:'Caen archivos y avisos. <b>Pulsa o toca las amenazas (rojas)</b> antes de que toquen el suelo. <b>No toques lo legítimo (verde)</b>. Teclado: <kbd>←</kbd><kbd>→</kbd> eligen carril y <kbd>Espacio</kbd> golpea lo más bajo del carril.',
 run(a,c){
  const L=5,need=c.pick(12,8,16),every=c.pick(1.15,1.7,.9),sp0=c.pick(105,78,135);
  const BAD=['Malware','Phishing','Ransomware','Contraseña débil','Keylogger','Troyano','Archivo .exe falso'],GOOD=['Copia de seguridad','Actualización','Antivirus','Cortafuegos','Contraseña robusta'];
  a.innerHTML='<div class="g1-base"></div>'+Array.from({length:L},(_,i)=>`<div class="g1-lane" style="left:${i/L*100}%;width:${100/L}%"></div>`).join('');
  const lanes=$$('.g1-lane',a);let items=[],hits=0,sel=2,acc=0;lanes[sel].classList.add('sel');
  const kill=it=>{it.dead=true;it.el.classList.add('pop');setTimeout(()=>it.el.remove(),300)},
   strike=it=>{if(!it||it.dead||c.over)return;kill(it);if(it.bad){hits++;fx.hit();c.hit(hits/need);if(hits>=need)c.win()}else{fx.bad();c.hurt()}};
  const spawn=()=>{const lane=Math.floor(Math.random()*L),bad=Math.random()<.7,txt=(bad?BAD:GOOD)[Math.floor(Math.random()*(bad?BAD.length:GOOD.length))];
    const el=document.createElement('button');el.type='button';el.className='g1-it '+(bad?'bad':'good');el.innerHTML=(bad?'⚠ ':'✓ ')+esc(txt);el.setAttribute('aria-label',(bad?'Amenaza: ':'Legítimo: ')+txt);el.style.left=((lane+.5)/L*100)+'%';el.style.top='-30px';a.appendChild(el);
    const it={el,lane,bad,y:-30,dead:false};el.addEventListener('pointerdown',e=>{e.preventDefault();strike(it)});items.push(it)};
  c.listen(window,'keydown',e=>{if(e.key==='ArrowLeft'||e.key==='a'){lanes[sel].classList.remove('sel');sel=(sel+L-1)%L;lanes[sel].classList.add('sel')}
    else if(e.key==='ArrowRight'||e.key==='d'){lanes[sel].classList.remove('sel');sel=(sel+1)%L;lanes[sel].classList.add('sel')}
    else if(e.key===' '||e.key==='Enter'){if(e.target.tagName==='BUTTON'&&e.key==='Enter')return;e.preventDefault();const cand=items.filter(i=>!i.dead&&i.lane===sel).sort((p,q)=>q.y-p.y)[0];strike(cand)}});
  c.raf(dt=>{const H=a.clientHeight,k=H/520,ramp=1+hits/need*.7;acc+=dt;if(acc>every/(1+hits/need*.5)){acc=0;spawn()}
    items.forEach(it=>{if(it.dead)return;it.y+=sp0*ramp*k*dt;it.el.style.top=it.y+'px';if(it.y>H-48){if(it.bad){fx.bad();c.hurt()}it.dead=true;it.el.remove()}});items=items.filter(i=>!i.dead)});
 }};

/* ===== 2 · DESCIFRA EL CÓDICE: lógica · criptografía (cifrado César) ===== */
GAMES[2]={name:'Descifra el códice',skill:'Lógica · criptografía',
 how:'El códice está cifrado con <b>César</b>: cada letra se desplazó una cantidad fija. Gira el disco (<kbd>←</kbd><kbd>→</kbd> o el deslizador) hasta que aparezca una palabra con sentido y pulsa <b>Sellar</b> (<kbd>Enter</kbd>). La tinta de las sombras avanza: si se llena, pierdes una vida.',
 run(a,c){
  const R=c.pick(3,2,4),T=c.pick(48,75,38),W=['CLAVE','SECRETO','CIFRADO','HASH','FIRMA','PUBLICA','PRIVADA','CLAVE PUBLICA','SIMETRICA'],words=shuf(W).slice(0,R);
  const sh=(s,k)=>s.replace(/[A-Z]/g,ch=>String.fromCharCode((ch.charCodeAt(0)-65+k+26)%26+65));
  let r=0,key=0,s=0,ink=0;
  a.innerHTML=`<div class="g2" id="g2"><div class="mg-how" id="g2n"></div><div class="cipher" id="g2c" aria-live="polite"></div><div class="plain" id="g2p" aria-live="polite"></div><div class="dial"><button class="btn" id="g2l" type="button" aria-label="Desplazar menos">◀</button><input id="g2r" type="range" min="0" max="25" value="0" aria-label="Desplazamiento del disco"><button class="btn" id="g2m" type="button" aria-label="Desplazar más">▶</button><span class="kv" id="g2k">0</span></div><button class="btn" id="g2s" type="button">Sellar el códice</button><div class="ink" aria-label="Tinta de las sombras"><b id="g2i"></b></div></div>`;
  const q=id=>$('#'+id,a),upd=()=>{q('g2p').textContent=sh(words[r].replace(/[A-Z]/g,x=>sh(x,key)),-s);q('g2k').textContent=s;q('g2r').value=s};
  const setR=()=>{key=1+Math.floor(Math.random()*24);s=0;ink=0;q('g2c').textContent=sh(words[r],key);q('g2n').innerHTML='Palabra <b>'+(r+1)+'</b> de '+R+(c.hint&&r===0?' · Pista de la Escriba: la clave está entre 1 y 25; prueba todas.':'');upd();q('g2i').style.width='0'};
  const mv=d=>{s=(s+d+26)%26;fx.step();upd()};
  q('g2l').onclick=()=>mv(-1);q('g2m').onclick=()=>mv(1);q('g2r').oninput=e=>{s=+e.target.value;upd()};
  const seal=()=>{if(c.over)return;if(s===key){fx.ok();c.hit((r+1)/R);r++;if(r>=R){c.win();return}setR()}else{fx.bad();ink=Math.min(100,ink+18);q('g2').classList.remove('shake');void q('g2').offsetWidth;q('g2').classList.add('shake')}};
  q('g2s').onclick=seal;
  c.listen(window,'keydown',e=>{if(e.target&&e.target.tagName==='INPUT'&&e.target.type!=='range'&&false)return;if(e.key==='ArrowLeft'){e.preventDefault();mv(-1)}else if(e.key==='ArrowRight'){e.preventDefault();mv(1)}else if(e.key==='Enter'&&e.target.tagName!=='BUTTON'){e.preventDefault();seal()}});
  setR();
  c.raf(dt=>{ink+=100/T*dt;q('g2i').style.width=Math.min(100,ink)+'%';if(ink>=100){ink=0;fx.bad();c.hurt()}});
 }};

/* ===== 3 · SALA DE MÁQUINAS: seguridad pasiva · elegir la medida adecuada ===== */
GAMES[3]={name:'La sala de máquinas',skill:'Reflejos · conocimiento de seguridad pasiva',
 how:'Los peligros bajan hacia los racks. Elige la <b>medida de protección correcta</b> para el peligro más bajo: botón o teclas <kbd>1</kbd>–<kbd>5</kbd>. Si fallas o llega a los racks, pierdes una vida.',
 run(a,c){
  const need=c.pick(12,8,16),every=c.pick(1.5,2.1,1.2),sp0=c.pick(62,46,82);
  const HZ=[['Incendio',0],['Sobrecalentamiento',1],['Apagón eléctrico',2],['Humedad / inundación',3],['Intruso en la sala',4]],TL=[['Extintor','Incendio'],['Climatización','Calor'],['SAI','Electricidad'],['Deshumidificador','Humedad'],['Control de acceso','Intrusos']];
  a.innerHTML=`<div class="g3"><div class="g3-col"></div><div class="g3-rack" aria-hidden="true"></div><div class="g3-tools">${TL.map((t,i)=>`<button class="g3-tool" type="button" data-t="${i}"><b>${i+1} · ${t[1]}</b>${t[0]}</button>`).join('')}</div></div>`;
  const root=$('.g3',a);let hz=[],hits=0,acc=0;
  const spawn=()=>{const d=HZ[Math.floor(Math.random()*HZ.length)],el=document.createElement('div');el.className='g3-hz';el.textContent=d[0];el.style.top='-30px';root.appendChild(el);hz.push({el,t:d[1],y:-30})};
  const use=i=>{if(c.over)return;const f=hz[0];if(!f)return;const b=$$('.g3-tool',a)[i];b.classList.add('f');setTimeout(()=>b.classList.remove('f'),150);
    if(f.t===i){f.el.remove();hz.shift();hits++;fx.hit();c.hit(hits/need);if(hits>=need)c.win()}else{fx.bad();c.hurt()}};
  $$('.g3-tool',a).forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();use(+b.dataset.t)}));
  c.listen(window,'keydown',e=>{if(e.key>='1'&&e.key<='5')use(+e.key-1)});
  c.raf(dt=>{const H=a.clientHeight,k=H/520,ramp=1+hits/need*.8;acc+=dt;if(acc>every/(1+hits/need*.5)){acc=0;spawn()}
    hz.forEach((h,i)=>{h.y+=sp0*ramp*k*dt;h.el.style.top=h.y+'px';h.el.style.outline=i===0?'2px solid #ffd48a':'none'});
    if(hz[0]&&hz[0].y>H-120){hz[0].el.remove();hz.shift();fx.bad();c.hurt()}});
 }};

/* ===== 4 · LABERINTO DEL TESORO: exploración, trampas y centinelas ===== */
GAMES[4]={name:'El laberinto del tesoro',skill:'Exploración · sigilo · trampas',
 how:'Recoge las <b>3 copias de seguridad</b> (rombos dorados) y llega a la <b>puerta turquesa</b>. Evita las <b>trampas</b> (se activan por turnos) y a los <b>escarabajos centinela</b>: patrullan y te persiguen si te detectan. Mueve con <kbd>←↑↓→</kbd>/<kbd>WASD</kbd>, deslizando o con la cruceta. Con ratón, haz clic en una casilla para trazar una ruta.',
 run(a,c){
  const cv=mkCanvas(a),GW=17,GH=11,NIT=3,ne=c.pick(2,1,3),nt=c.pick(6,4,8),SPD=c.pick(2.1,1.7,2.5);
  const g=Array.from({length:GH},()=>Array(GW).fill(1)),st=[[1,1]];g[1][1]=0;
  while(st.length){const[x,y]=st[st.length-1],nb=[[2,0],[-2,0],[0,2],[0,-2]].map(([dx,dy])=>[x+dx,y+dy,dx/2,dy/2]).filter(([nx,ny])=>nx>0&&ny>0&&nx<GW-1&&ny<GH-1&&g[ny][nx]===1);if(!nb.length){st.pop();continue}const[nx,ny,hx,hy]=nb[Math.floor(Math.random()*nb.length)];g[y+hy][x+hx]=0;g[ny][nx]=0;st.push([nx,ny])}
  for(let i=0;i<14;i++){const x=1+Math.floor(Math.random()*(GW-2)),y=1+Math.floor(Math.random()*(GH-2));if(g[y][x]===1&&((g[y][x-1]===0&&g[y][x+1]===0)||(g[y-1][x]===0&&g[y+1][x]===0)))g[y][x]=0}
  const open=[];for(let y=1;y<GH-1;y++)for(let x=1;x<GW-1;x++)if(g[y][x]===0)open.push([x,y]);
  const far=open.filter(([x,y])=>x+y>9&&!(x===GW-2&&y===GH-2));
  const items=shuf(far).slice(0,NIT).map(([x,y])=>({x,y,got:false})),traps=shuf(open.filter(([x,y])=>x+y>5&&!items.some(i=>i.x===x&&i.y===y)&&!(x===GW-2&&y===GH-2))).slice(0,nt).map(([x,y],i)=>({x,y,ph:i*.7}));
  const P={x:1,y:1,vx:1,vy:1,cd:0,inv:0},EX={x:GW-2,y:GH-2};
  const bfs=(f,t)=>{const q=[[f[0],f[1]]],pr={};pr[f[1]*GW+f[0]]=null;let found=false;while(q.length){const[x,y]=q.shift();if(x===t[0]&&y===t[1]){found=true;break}[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{const nx=x+dx,ny=y+dy,k=ny*GW+nx;if(g[ny]&&g[ny][nx]===0&&!(k in pr)){pr[k]=[x,y];q.push([nx,ny])}})}
    if(!found)return null;let cur=[t[0],t[1]],path=[cur];while(pr[cur[1]*GW+cur[0]]){cur=pr[cur[1]*GW+cur[0]];path.push(cur)}return path.reverse()};
  const en=Array.from({length:ne},(_,i)=>{const[x,y]=shuf(far)[i%far.length];return{x,y,tx:x,ty:y,mode:'patrol',px:-1,py:-1}});
  let held={},got=0,tm=0,img=tokenImg();
  a._dbg={g,P,items,EX,en,GW,GH,traps,check};
  const dirs={ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0],ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1]};
  c.listen(window,'keydown',e=>{if(dirs[e.key]){e.preventDefault();held[e.key]=1}});c.listen(window,'keyup',e=>{delete held[e.key]});
  const move=(dx,dy)=>{if(g[P.y+dy]&&g[P.y+dy][P.x+dx]===0){P.x+=dx;P.y+=dy;fx.step();check()}};
  let sx=0,sy=0,route=[],routeAt=0;
  c.listen(cv.cv,'pointerdown',e=>{sx=e.clientX;sy=e.clientY});
  c.listen(cv.cv,'pointerup',e=>{
    const dx=e.clientX-sx,dy=e.clientY-sy;
    if(Math.abs(dx)<18&&Math.abs(dy)<18){
      // Ratón: clic en una casilla para trazar una ruta segura hasta ella.
      // Táctil: los gestos cortos no desplazan accidentalmente al explorador.
      if(e.pointerType==='mouse'){
        const r=cv.cv.getBoundingClientRect(),W=cv.w(),H=cv.h(),cs=Math.min(W/GW,H/GH),ox=(W-cs*GW)/2,oy=(H-cs*GH)/2;
        const gx=Math.floor(((e.clientX-r.left)*W/r.width-ox)/cs),gy=Math.floor(((e.clientY-r.top)*H/r.height-oy)/cs);
        if(gx>=0&&gy>=0&&gx<GW&&gy<GH&&g[gy][gx]===0){
          const path=bfs([Math.round(P.x),Math.round(P.y)],[gx,gy]);
          route=path?path.slice(1):[];routeAt=0;P.cd=0;
        }
      }
      return;
    }
    route=[];
    if(Math.abs(dx)>Math.abs(dy))move(dx>0?1:-1,0);else move(0,dy>0?1:-1);
  });
  a.insertAdjacentHTML('beforeend','<div class="mg-dpad"><button class="u" aria-label="Arriba">▲</button><button class="l" aria-label="Izquierda">◀</button><button class="r" aria-label="Derecha">▶</button><button class="d" aria-label="Abajo">▼</button></div>');
  [['u',0,-1],['l',-1,0],['r',1,0],['d',0,1]].forEach(([k,dx,dy])=>$('.mg-dpad .'+k,a).addEventListener('pointerdown',e=>{e.preventDefault();move(dx,dy)}));
  const respawn=why=>{if(P.inv>0)return;P.x=1;P.y=1;P.inv=1.4;fx.bad();c.hurt()};
  const trapOn=t=>((tm+t.ph)%3.2)>1.9;
  function check(){items.forEach(i=>{if(!i.got&&i.x===P.x&&i.y===P.y){i.got=true;got++;fx.ok();c.hit(got/NIT)}});
    if(P.x===EX.x&&P.y===EX.y){if(got>=NIT)c.win();else toast&&toast('Aún faltan copias de seguridad: '+got+'/'+NIT)}}
  c.raf(dt=>{
    tm+=dt;P.inv=Math.max(0,P.inv-dt);P.cd-=dt;
    if(P.cd<=0){
      let moved=false;
      for(const k in held){const[dx,dy]=dirs[k];move(dx,dy);P.cd=.13;route=[];moved=true;break}
      if(!moved&&routeAt<route.length){const [rx,ry]=route[routeAt++];if(g[ry]&&g[ry][rx]===0){P.x=rx;P.y=ry;fx.step();check()}P.cd=.13}
      if(routeAt>=route.length){route=[];routeAt=0}
    }
    P.vx+=(P.x-P.vx)*Math.min(1,dt*16);P.vy+=(P.y-P.vy)*Math.min(1,dt*16);
    if(traps.some(t=>t.x===P.x&&t.y===P.y&&trapOn(t)))respawn();
    en.forEach(e=>{const dxp=Math.abs(e.x-P.x)+Math.abs(e.y-P.y);const chase=dxp<6;e.mode=chase?'chase':'patrol';
      const sp=SPD*(chase?1.35:1)*dt,dx=e.tx-e.x,dy=e.ty-e.y,d=Math.hypot(dx,dy);
      if(d<=sp){e.x=e.tx;e.y=e.ty;const cx=Math.round(e.x),cy=Math.round(e.y);let n=null;
        if(chase){const p=bfs([cx,cy],[P.x,P.y]);if(p&&p.length>1)n=p[1]}
        if(!n){const opts=[[1,0],[-1,0],[0,1],[0,-1]].filter(([ax,ay])=>g[cy+ay]&&g[cy+ay][cx+ax]===0);const nb=opts.filter(([ax,ay])=>!(cx+ax===e.px&&cy+ay===e.py));const pick=(nb.length?nb:opts)[Math.floor(Math.random()*(nb.length||opts.length))];n=[cx+pick[0],cy+pick[1]];}
        e.px=cx;e.py=cy;e.tx=n[0];e.ty=n[1]}else{e.x+=dx/d*sp;e.y+=dy/d*sp}
      if(Math.hypot(e.x-P.vx,e.y-P.vy)<.6)respawn()});
    // dibujo
    const W=cv.w(),H=cv.h(),cs=Math.min(W/GW,H/GH),ox=(W-cs*GW)/2,oy=(H-cs*GH)/2,x=cv.x;x.clearRect(0,0,W,H);x.fillStyle='#120d07';x.fillRect(0,0,W,H);
    for(let y=0;y<GH;y++)for(let xx=0;xx<GW;xx++){const px=ox+xx*cs,py=oy+y*cs;if(g[y][xx]){x.fillStyle=(xx+y)%2?'#1c150c':'#17110a';x.fillRect(px,py,cs,cs);x.strokeStyle='#6e5528';x.lineWidth=1;x.strokeRect(px+.5,py+.5,cs-1,cs-1)}else{x.fillStyle=(xx+y)%2?'#3a2c16':'#33260f';x.fillRect(px,py,cs,cs)}}
    traps.forEach(t=>{const on=trapOn(t),warn=!on&&((tm+t.ph)%3.2)>1.5,px=ox+t.x*cs,py=oy+t.y*cs;x.fillStyle=on?'#c4312a':warn?'#d9a03a':'#4a3a20';for(let i=0;i<3;i++){x.beginPath();x.moveTo(px+cs*(.12+i*.28),py+cs*.85);x.lineTo(px+cs*(.26+i*.28),py+cs*(on?.2:.6));x.lineTo(px+cs*(.4+i*.28),py+cs*.85);x.fill()}});
    items.forEach(i=>{if(i.got)return;const px=ox+(i.x+.5)*cs,py=oy+(i.y+.5)*cs,p=1+Math.sin(tm*4)*.12;x.fillStyle='#ffd77a';x.shadowColor='#ffb23a';x.shadowBlur=12;x.beginPath();x.moveTo(px,py-cs*.3*p);x.lineTo(px+cs*.24*p,py);x.lineTo(px,py+cs*.3*p);x.lineTo(px-cs*.24*p,py);x.fill();x.shadowBlur=0});
    x.fillStyle=got>=NIT?'#5fe0d0':'#2a6a64';x.shadowColor='#5fe0d0';x.shadowBlur=got>=NIT?18:0;x.fillRect(ox+EX.x*cs+cs*.15,oy+EX.y*cs+cs*.08,cs*.7,cs*.84);x.shadowBlur=0;
    en.forEach(e=>{const px=ox+(e.x+.5)*cs,py=oy+(e.y+.5)*cs;x.fillStyle=e.mode==='chase'?'#d9442e':'#2f6a8f';x.beginPath();x.ellipse(px,py,cs*.3,cs*.36,0,0,7);x.fill();x.fillStyle='#fff';x.fillRect(px-cs*.15,py-cs*.18,cs*.1,cs*.1);x.fillRect(px+cs*.05,py-cs*.18,cs*.1,cs*.1);x.strokeStyle=x.fillStyle;x.strokeStyle='#0008';x.beginPath();x.moveTo(px-cs*.3,py);x.lineTo(px+cs*.3,py);x.stroke()});
    const px=ox+(P.vx+.5)*cs,py=oy+(P.vy+.5)*cs;if(P.inv>0&&Math.floor(P.inv*10)%2)x.globalAlpha=.35;
    if(img.complete&&img.naturalWidth)x.drawImage(img,px-cs*.42,py-cs*.46,cs*.84,cs*.9);else{x.fillStyle='#f3e3b0';x.beginPath();x.arc(px,py,cs*.3,0,7);x.fill()}x.globalAlpha=1;
  });
  c.onStop(()=>cv.off());
 }};

/* ===== 5 · CIRCUITO DEL LABORATORIO: lógica · conectar el circuito mientras el autómata sabotea ===== */
GAMES[5]={name:'El circuito del laboratorio',skill:'Lógica · resolución de problemas',
 how:'Gira las losas (clic, toque o <kbd>Enter</kbd>) para <b>conectar la fuente de la izquierda con el contenedor de la derecha</b>. Cada pocos segundos el <b>Autómata de Anubis</b> sabotea una losa del camino. Cuando la corriente llegue al final, la cámara se activa.',
 run(a,c){
  const N=c.pick(5,4,6),sab=c.pick(11,16,8),limit=c.pick(45,60,36);
  // máscara: 1=N 2=E 4=S 8=W
  const rot=m=>((m<<1)&15)|(m>>3&1);let path,tries=0;
  const gen=()=>{const r0=Math.floor(Math.random()*N),r1=Math.floor(Math.random()*N);const seen=new Set([r0*N]),p=[[0,r0]];
    const dfs=()=>{const[x,y]=p[p.length-1];if(x===N-1&&y===r1)return true;const nb=shuf([[1,0],[0,1],[0,-1],[-1,0]]);for(const[dx,dy]of nb){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=N||ny>=N||seen.has(ny*N+nx))continue;seen.add(ny*N+nx);p.push([nx,ny]);if(dfs())return true;p.pop()}return false};
    dfs();return{p,r0,r1}};
  let G;do{G=gen();tries++}while(G.p.length<N+2&&tries<30);
  const grid=Array.from({length:N},()=>Array(N).fill(0));
  G.p.forEach(([x,y],i)=>{const pv=G.p[i-1],nx=G.p[i+1];let m=0;const link=(o)=>{if(!o)return;const dx=o[0]-x,dy=o[1]-y;if(dx===1)m|=2;if(dx===-1)m|=8;if(dy===1)m|=4;if(dy===-1)m|=1};link(pv);link(nx);if(i===0)m|=8;if(i===G.p.length-1)m|=2;grid[y][x]=m});
  const shapes=[5,10,3,6,12,9,7,11,13,14,1];for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(!grid[y][x])grid[y][x]=shapes[Math.floor(Math.random()*shapes.length)];
  const onPath=new Set(G.p.map(([x,y])=>y*N+x)),sol=grid.map(r=>r.slice());
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){const k=Math.floor(Math.random()*4);for(let i=0;i<k;i++)grid[y][x]=rot(grid[y][x])}
  const conn=()=>{const q=[[0,G.r0]],seen=new Set();if(!(grid[G.r0][0]&8))return seen;seen.add(G.r0*N);while(q.length){const[x,y]=q.shift(),m=grid[y][x];[[1,0,2,8],[-1,0,8,2],[0,1,4,1],[0,-1,1,4]].forEach(([dx,dy,b,ob])=>{const nx=x+dx,ny=y+dy;if(m&b&&nx>=0&&ny>=0&&nx<N&&ny<N&&grid[ny][nx]&ob&&!seen.has(ny*N+nx)){seen.add(ny*N+nx);q.push([nx,ny])}})}return seen};
  a.innerHTML=`<div class="g5"><div class="g5-st" id="g5s" aria-live="polite"></div><div class="g5-grid" id="g5g" style="grid-template-columns:repeat(${N},1fr)"></div><div class="g5-st" id="g5t"></div></div>`;
  const gr=$('#g5g',a),tile=m=>{const h=[];if(m&1)h.push('M50 50V0');if(m&2)h.push('M50 50H100');if(m&4)h.push('M50 50V100');if(m&8)h.push('M50 50H0');return `<svg viewBox="0 0 100 100" aria-hidden="true"><path class="pp" d="${h.join('')}" fill="none" stroke-width="14" stroke-linecap="round"/><circle cx="50" cy="50" r="9" class="pp" fill="#1a1208" stroke-width="5"/></svg>`};
  const draw=()=>{const cs=conn();let n=0;gr.innerHTML='';for(let y=0;y<N;y++)for(let x=0;x<N;x++){const b=document.createElement('button');b.type='button';const on=cs.has(y*N+x);if(on&&onPath.has(y*N+x))n++;b.className='g5-t'+(on?' on':'');b.innerHTML=tile(grid[y][x]);b.setAttribute('aria-label','Losa '+(x+1)+','+(y+1)+(on?' con corriente':''));b.addEventListener('click',()=>{if(c.over)return;grid[y][x]=rot(grid[y][x]);fx.step();draw();if(cs&&done())c.win()});gr.appendChild(b)}
    c.hit(Math.min(1,n/G.p.length));return cs};
  const done=()=>{const cs=conn();return cs.has(G.r1*N+N-1)&&(grid[G.r1][N-1]&2)};
  const check=()=>{if(done()&&!c.over){c.win()}};
  const redraw=()=>{draw();check()};gr.addEventListener('click',()=>setTimeout(check,0));
  draw();let ts=0,tl=0;a._dbg={fix(){for(let y=0;y<N;y++)for(let x=0;x<N;x++)grid[y][x]=sol[y][x];draw();check()}};
  c.raf(dt=>{ts+=dt;tl+=dt;$('#g5t',a).textContent='Sabotaje del Autómata en '+Math.max(0,Math.ceil(sab-ts))+' s · tiempo restante '+Math.max(0,Math.ceil(limit-tl))+' s';
    if(ts>=sab){ts=0;const cand=G.p.filter(([x,y])=>(conn()).has(y*N+x));const[x,y]=(cand.length?cand:G.p)[Math.floor(Math.random()*(cand.length||G.p.length))];grid[y][x]=rot(grid[y][x]);fx.bad();$('#g5s',a).textContent='¡El Autómata ha girado una losa!';draw()}
    if(tl>=limit){tl=0;c.hurt();$('#g5s',a).textContent='Se agota la corriente… ¡rápido!'}});
 }};

/* ===== 6 · LA FORJA DE BLOQUES: memoria · secuencias y cadena ===== */
GAMES[6]={name:'La forja de bloques',skill:'Memoria · secuencias',
 how:'La Tejedora muestra una secuencia de símbolos. <b>Repítela</b> con clic, toque o teclas <kbd>1</kbd>–<kbd>4</kbd> / flechas. Cada ronda superada <b>forja un bloque</b> enlazado al anterior por su hash. Un fallo cuesta una vida y repite la secuencia.',
 run(a,c){
  const R=c.pick(6,4,8),base=c.pick(2,2,3),gap=c.pick(620,860,480);
  const PAD=[['eye','#ff7b6b'],['ankh','#7fe0d8'],['scarab','#ffd77a'],['feather','#9db8ff']];
  a.innerHTML=`<div class="g6"><div class="mg-how" id="g6s" aria-live="polite"></div><div class="g6-pads">${PAD.map((p,i)=>`<button class="g6-pad" type="button" data-i="${i}" style="color:${p[1]};border-color:${p[1]}" aria-label="Símbolo ${i+1}"><span><svg viewBox="0 0 40 40" width="44" height="44" fill="none" stroke="#fff" stroke-width="2"><use href="#g-${p[0]}"/></svg><small>${i+1}</small></span></button>`).join('')}</div><div class="g6-chain" id="g6c" aria-label="Cadena de bloques forjados"></div></div>`;
  const pads=$$('.g6-pad',a),st=$('#g6s',a);let r=0,seq=[],pos=0,input=false,hash='0000';
  const H=s=>{let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return (h>>>0).toString(16).padStart(8,'0').slice(0,4)};
  const flash=(i,ms)=>{pads[i].classList.add('lit');fx.seq(i);setTimeout(()=>pads[i].classList.remove('lit'),ms)};
  const show=()=>{input=false;pos=0;st.textContent='Observa la secuencia…';seq.forEach((s,k)=>c.timer(()=>{if(!c.over)flash(s,gap*.7)},500+k*gap));c.timer(()=>{if(c.over)return;input=true;st.textContent='Tu turno: repite los '+seq.length+' símbolos'+(c.hint&&r===0?' (Pista: fíjate en el sonido de cada uno)':'')+'.'},500+seq.length*gap)};
  const next=()=>{seq=Array.from({length:base+r},()=>Math.floor(Math.random()*4));show()};
  const press=i=>{if(!input||c.over)return;flash(i,200);if(seq[pos]===i){pos++;if(pos>=seq.length){input=false;const hs=H(hash+seq.join(''));const b=document.createElement('i');b.textContent='Bloque '+(r+1)+' · '+hs+' ← '+hash;$('#g6c',a).appendChild(b);hash=hs;fx.ok();r++;c.hit(r/R);if(r>=R){c.win();return}st.textContent='¡Bloque forjado!';c.timer(next,900)}}
    else{input=false;fx.bad();c.hurt();if(!c.over){st.textContent='Fallaste: repite la secuencia.';c.timer(show,900)}}};
  pads.forEach(p=>p.addEventListener('pointerdown',e=>{e.preventDefault();press(+p.dataset.i)}));
  c.listen(window,'keydown',e=>{const m={'1':0,'2':1,'3':2,'4':3,ArrowLeft:0,ArrowUp:1,ArrowRight:2,ArrowDown:3}[e.key];if(m!==undefined){e.preventDefault();press(m)}});
  a._dbg={get seq(){return seq},get input(){return input}};next();
 }};

/* ===== 7 · COMBATE FINAL: proyectiles de luz contra la Sombra del Olvido ===== */
GAMES[7]={name:'La Sombra del Olvido',skill:'Combate · puntería · esquiva',
 how:'Mueve con <kbd>←↑↓→</kbd>/<kbd>WASD</kbd>; con ratón, haz clic en la mitad inferior para desplazarte y en la superior para disparar. En móvil, arrastra para moverte y disparar. Esquiva las bolas de sombra. En su tercera fase la Sombra se <b>protege con un escudo</b>: espera a que parpadee y se apague.',
 run(a,c){
  const cv=mkCanvas(a),B={hp:c.pick(30,22,40),max:0,x:.5,dir:1,t:0,cd:1,sum:3,shield:0,warn:0,sc:5},PL={x:.5,y:.82,hp:c.pick(5,7,4),inv:0,cd:0};B.max=B.hp;
  let shots=[],orbs=[],mins=[],parts=[],keys={},ptr={x:null,y:null,down:false,touch:false},tm=0,img=tokenImg(),dead=false;
  const dirs={ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0],ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1]};
  c.listen(window,'keydown',e=>{if(dirs[e.key]||e.key===' ')e.preventDefault();keys[e.key]=1});c.listen(window,'keyup',e=>{delete keys[e.key]});
  const rel=e=>{const r=cv.cv.getBoundingClientRect();return[(e.clientX-r.left),(e.clientY-r.top)]};
  c.listen(cv.cv,'pointermove',e=>{const[x,y]=rel(e);ptr.x=x;ptr.y=y;if(e.pointerType==='touch'&&ptr.down){PL.x=clamp(x/cv.w(),.04,.96);PL.y=clamp(y/cv.h()-.1,.5,.92)}});
  c.listen(cv.cv,'pointerdown',e=>{
    const[x,y]=rel(e);ptr.x=x;ptr.y=y;ptr.touch=e.pointerType==='touch';
    // Ratón: clic en la mitad inferior = movimiento; clic en la mitad superior = disparo.
    // Táctil: arrastrar mueve y mantiene el disparo automático.
    if(e.pointerType==='mouse'&&y>cv.h()*.48){
      PL.x=clamp(x/cv.w(),.04,.96);PL.y=clamp(y/cv.h(),.5,.92);ptr.down=false;
    }else ptr.down=true;
  });
  c.listen(window,'pointerup',()=>{ptr.down=false});
  const burst=(x,y,col,n)=>{for(let i=0;i<n;i++)parts.push({x,y,vx:(Math.random()-.5)*220,vy:(Math.random()-.5)*220,l:.6,col})};
  a._dbg={B,PL};
  const phase=()=>B.hp/B.max>.66?1:B.hp/B.max>.33?2:3;
  const aim=(fx0,fy0,tx,ty,sp,spread)=>{const ang=Math.atan2(ty-fy0,tx-fx0)+spread;orbs.push({x:fx0,y:fy0,vx:Math.cos(ang)*sp,vy:Math.sin(ang)*sp,r:9})};
  c.raf(dt=>{
    const W=cv.w(),H=cv.h(),x=cv.x;tm+=dt;
    if(!dead){
      const sp=.55*dt;let mx=0,my=0;for(const k in keys)if(dirs[k]){mx+=dirs[k][0];my+=dirs[k][1]}
      if(!(ptr.touch&&ptr.down)){PL.x=clamp(PL.x+mx*sp,.04,.96);PL.y=clamp(PL.y+my*sp*(W/H),.5,.92)}
      PL.cd-=dt;PL.inv=Math.max(0,PL.inv-dt);
      const fire=keys[' ']||ptr.down;
      if(fire&&PL.cd<=0){PL.cd=.2;const px=PL.x*W,py=PL.y*H;let tx=ptr.x==null||(ptr.touch)?px:ptr.x,ty=ptr.x==null||(ptr.touch)?py-100:ptr.y;if(keys[' ']&&!ptr.down){tx=px;ty=py-100}if(ptr.touch)tx=B.x*W,ty=70;
        const ang=Math.atan2(ty-py,tx-px);shots.push({x:px,y:py-14,vx:Math.cos(ang)*820,vy:Math.sin(ang)*820});fx.shot()}
      // jefe
      const ph=phase();B.t+=dt;B.x+=B.dir*dt*(ph===1?.12:ph===2?.17:.23);if(B.x>.82){B.dir=-1}if(B.x<.18){B.dir=1}
      B.cd-=dt;const bx=B.x*W,by=H*.17;
      if(B.cd<=0){const px=PL.x*W,py=PL.y*H;
        if(ph===1){B.cd=c.level>0?.9:1.3;[-.28,0,.28].forEach(s=>aim(bx,by+40,px,py,170,s))}
        else if(ph===2){B.cd=c.level>0?.5:.8;for(let i=0;i<6;i++){const ang=B.t*2+i*Math.PI/3;orbs.push({x:bx,y:by+40,vx:Math.cos(ang)*150,vy:Math.abs(Math.sin(ang))*90+80,r:9})}}
        else{B.cd=c.level>0?.65:1;[-.5,-.25,0,.25,.5].forEach(s=>aim(bx,by+40,px,py,210,s))}}
      if(ph>=2){B.sum-=dt;if(B.sum<=0){B.sum=c.level>0?3.2:5;mins.push({x:bx,y:by+30,hp:2})}}
      if(ph===3){B.sc-=dt;if(B.sc<=0){B.warn=.7;B.sc=6.5}if(B.warn>0){B.warn-=dt;if(B.warn<=0)B.shield=2.3}if(B.shield>0)B.shield-=dt}
      const px=PL.x*W,py=PL.y*H;
      shots.forEach(s=>{s.x+=s.vx*dt;s.y+=s.vy*dt;
        if(Math.hypot(s.x-bx,s.y-by)<62){s.dead=true;if(B.shield>0){burst(s.x,s.y,'#9db8ff',4)}else{B.hp--;burst(s.x,s.y,'#ffd77a',8);fx.hit();c.hit(1-B.hp/B.max);$('.tp-actor')&&$('.tp-actor').classList.add('hit');setTimeout(()=>$('.tp-actor')&&$('.tp-actor').classList.remove('hit'),300);if(B.hp<=0&&!dead){dead=true;fx.boom();burst(bx,by,'#fff',60);setTimeout(()=>c.win(),1100)}}}
        mins.forEach(m=>{if(!m.dead&&Math.hypot(s.x-m.x,s.y-m.y)<20){s.dead=true;m.hp--;burst(m.x,m.y,'#c7a0ff',5);if(m.hp<=0)m.dead=true}});
        if(s.x<-20||s.x>W+20||s.y<-20||s.y>H+20)s.dead=true});
      orbs.forEach(o=>{o.x+=o.vx*dt;o.y+=o.vy*dt;if(!PL.inv&&Math.hypot(o.x-px,o.y-py)<o.r+13){o.dead=true;PL.inv=1.1;PL.hp--;fx.bad();burst(px,py,'#ff7b6b',10);c.hurt()}if(o.x<-30||o.x>W+30||o.y>H+30||o.y<-30)o.dead=true});
      mins.forEach(m=>{const dx=px-m.x,dy=py-m.y,d=Math.hypot(dx,dy)||1;m.x+=dx/d*95*dt;m.y+=dy/d*95*dt;if(!PL.inv&&d<26){m.dead=true;PL.inv=1.1;PL.hp--;fx.bad();burst(px,py,'#ff7b6b',10);c.hurt()}});
      shots=shots.filter(s=>!s.dead);orbs=orbs.filter(o=>!o.dead);mins=mins.filter(m=>!m.dead);
    }
    parts.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.l-=dt});parts=parts.filter(p=>p.l>0);
    const bx=B.x*W,by=H*.17,px=PL.x*W,py=PL.y*H;
    x.clearRect(0,0,W,H);const gr=x.createLinearGradient(0,0,0,H);gr.addColorStop(0,'#0a0716');gr.addColorStop(1,'#2a1626');x.fillStyle=gr;x.fillRect(0,0,W,H);
    for(let i=0;i<40;i++){x.fillStyle='rgba(255,255,255,'+(.2+.3*((i*7)%5)/5)+')';x.fillRect((i*131)%W,(i*71+tm*6*(1+i%3))%H,1.5,1.5)}
    // jefe
    const ph=phase();x.save();x.translate(bx,by);const pulse=1+Math.sin(tm*3)*.04;x.scale(pulse,pulse);
    x.fillStyle=ph===3?'#2a0f2a':'#160c24';x.shadowColor=ph===3?'#ff5a6a':'#8a5bd6';x.shadowBlur=26;x.beginPath();x.moveTo(-50,40);x.quadraticCurveTo(-60,-30,0,-52);x.quadraticCurveTo(60,-30,50,40);x.lineTo(30,28);x.lineTo(14,46);x.lineTo(0,30);x.lineTo(-14,46);x.lineTo(-30,28);x.closePath();x.fill();x.shadowBlur=0;
    x.fillStyle=ph===3?'#ff6b7a':'#ffd77a';x.beginPath();x.ellipse(-16,-6,9,6,0,0,7);x.ellipse(16,-6,9,6,0,0,7);x.fill();x.fillStyle='#000';x.fillRect(-18,-8,4,4);x.fillRect(14,-8,4,4);
    if(B.shield>0||B.warn>0){x.strokeStyle=B.shield>0?'#9db8ff':'rgba(157,184,255,'+(Math.floor(tm*14)%2?.9:.2)+')';x.lineWidth=4;x.beginPath();x.arc(0,0,64,0,7);x.stroke()}
    x.restore();
    mins.forEach(m=>{x.fillStyle='#3a1d58';x.shadowColor='#c7a0ff';x.shadowBlur=10;x.beginPath();x.arc(m.x,m.y,14,0,7);x.fill();x.shadowBlur=0;x.fillStyle='#ffd77a';x.fillRect(m.x-6,m.y-3,4,4);x.fillRect(m.x+2,m.y-3,4,4)});
    orbs.forEach(o=>{x.fillStyle='#b25bff';x.shadowColor='#7a2bd6';x.shadowBlur=14;x.beginPath();x.arc(o.x,o.y,o.r,0,7);x.fill();x.shadowBlur=0});
    shots.forEach(s=>{x.fillStyle='#fff3c0';x.shadowColor='#ffd24a';x.shadowBlur=16;x.beginPath();x.arc(s.x,s.y,5,0,7);x.fill();x.shadowBlur=0});
    parts.forEach(p=>{x.globalAlpha=Math.max(0,p.l/.6);x.fillStyle=p.col;x.fillRect(p.x,p.y,3,3)});x.globalAlpha=1;
    if(PL.inv>0&&Math.floor(PL.inv*10)%2)x.globalAlpha=.4;
    if(img.complete&&img.naturalWidth)x.drawImage(img,px-24,py-26,48,52);else{x.fillStyle='#f3e3b0';x.beginPath();x.arc(px,py,16,0,7);x.fill()}x.globalAlpha=1;
    if(ptr.x!=null&&!ptr.touch){x.strokeStyle='#ffd77a';x.lineWidth=1.5;x.beginPath();x.arc(ptr.x,ptr.y,10,0,7);x.moveTo(ptr.x-15,ptr.y);x.lineTo(ptr.x+15,ptr.y);x.moveTo(ptr.x,ptr.y-15);x.lineTo(ptr.x,ptr.y+15);x.stroke()}
    x.fillStyle='#fff';x.font='600 12px sans-serif';x.fillText('Fase '+ph+'/3'+(B.shield>0?' · ESCUDO':B.warn>0?' · ¡escudo!':''),12,H-12);
    const ac=$('.tp-actor');if(ac){ac.classList.toggle('angry',ph>=2);ac.classList.toggle('weak',B.hp/B.max<.2)}
  });
  c.onStop(()=>cv.off());
 }};
