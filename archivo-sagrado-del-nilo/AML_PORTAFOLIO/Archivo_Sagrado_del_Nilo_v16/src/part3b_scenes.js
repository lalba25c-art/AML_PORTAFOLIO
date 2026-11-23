/* ---------- 9. ESCENAS DE LAS CÁMARAS (una identidad por cámara) ---------- */
const stars=(n,maxY,seed=1)=>[...Array(n)].map((_,i)=>`<circle cx="${rnd()*1600}" cy="${rnd()*maxY}" r="${.5+rnd()*1.5}" fill="#fff6dc" class="twinkle" style="--i:${(i+seed)%11}"/>`).join('');
const column=(x,base,h,w,fill)=>{const t=base-h;return `<g><rect x="${x-w/2}" y="${t}" width="${w}" height="${h}" fill="${fill}"/>${[1,2,3,4].map(i=>`<path d="M${x-w/2+i*w/5} ${t}V${base}" stroke="rgba(0,0,0,.3)" stroke-width="${Math.max(1,w/40)}"/>`).join('')}<path d="M${x-w*.78} ${t-h*.1}Q${x} ${t-h*.2} ${x+w*.78} ${t-h*.1}L${x+w*.55} ${t}H${x-w*.55}Z" fill="${fill}" stroke="rgba(255,226,150,.35)" stroke-width="1"/><rect x="${x-w*.85}" y="${t-h*.14}" width="${w*1.7}" height="${h*.04}" fill="rgba(0,0,0,.35)"/><ellipse cx="${x}" cy="${base}" rx="${w*.7}" ry="${w*.12}" fill="rgba(0,0,0,.45)"/><path d="M${x-w/2} ${t+h*.12}H${x+w/2}M${x-w/2} ${t+h*.2}H${x+w/2}" stroke="rgba(228,199,125,.4)" stroke-width="${Math.max(1,w/26)}"/></g>`};
const reeds=(x0,x1,base,n,col)=>[...Array(n)].map(()=>{const x=x0+rnd()*(x1-x0),h=90+rnd()*170,b=(rnd()-.5)*50;return `<path d="M${x} ${base}Q${x+b*.4} ${base-h*.6} ${x+b} ${base-h}" fill="none" stroke="${col}" stroke-width="${1.6+rnd()*2}" stroke-linecap="round"/><g transform="translate(${x+b} ${base-h})" stroke="${col}" stroke-width="1.4" fill="none">${[-60,-30,0,30,60].map(a=>`<path d="M0 0l${Math.sin(a*.0175)*22} ${-Math.cos(a*.0175)*22}"/>`).join('')}</g>`}).join('');
const lotus=(x,y,s,c1,c2)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="6" rx="32" ry="8" fill="#12332f"/><path d="M0 0C-14 -4 -22 -18 -14 -34C-6 -26 -2 -14 0 0ZM0 0C14 -4 22 -18 14 -34C6 -26 2 -14 0 0ZM0 0C-6 -14 -6 -32 0 -48C6 -32 6 -14 0 0Z" fill="${c1}" stroke="${c2}" stroke-width="1.4"/></g>`;
const SCENES={
hall(c){const cols=[];for(let i=5;i>=0;i--){const t=i/5,k=1-.6*t,base=470+300*k,h=470*k+60,w=96*k;[-1,1].forEach(s=>cols.push(column(800+s*(560*k+36),base,h,w,'url(#s1c)')))}
 return `<defs>${grad('s1bg',[[0,'#050b0a'],[.5,'#10281f'],[1,'#3a2a10']])}${grad('s1c',[[0,'#2a1f0e'],[.5,'#9a7a3a'],[1,'#2a1f0e']],1,0)}${grad('s1f',[[0,'#3a2a10'],[1,'#0b0f0e']])}${grad('s1b',[[0,'#fff3c8',.55],[1,'#fff3c8',0]])}${rgrad('s1d',[[0,'#fffbe6'],[.4,'#ffe29a'],[1,'#c98b33']])}</defs>
 <rect width="1600" height="800" fill="url(#s1bg)"/>
 <rect x="640" y="250" width="320" height="300" rx="160" fill="url(#s1d)"/><circle cx="800" cy="410" r="260" fill="#ffe29a" opacity=".25"/>
 ${[0,1,2,3].map(i=>`<polygon points="${300+i*250},0 ${340+i*250},0 ${760+i*20},800 ${620+i*60},800" fill="url(#s1b)" opacity=".5" style="mix-blend-mode:screen"/>`).join('')}
 <path d="M0 640H1600V800H0Z" fill="url(#s1f)"/><path d="M0 640H1600" stroke="rgba(255,226,150,.4)"/>
 ${cols.join('')}
 ${SEATED(520,330,.78,'#101a17','rgba(255,226,150,.65)')}${SEATED(1010,330,.78,'#101a17','rgba(255,226,150,.65)')}
 <rect width="1600" height="90" fill="#050808"/><path d="M0 90H1600" stroke="${c.accent}" stroke-opacity=".5"/>
 ${[...Array(20)].map((_,i)=>use(GL[i%10],40+i*80,28,38,'glyph',i%12)).join('')}`},
sphinx(c){
 const ring=r=>[...Array(26)].map((_,i)=>`<text transform="rotate(${i*360/26}) translate(0 ${-r})" text-anchor="middle" font-family="Cinzel,serif" font-size="${r>150?20:16}" fill="#9ff0e8">${String.fromCharCode(65+i)}</text>`).join('');
 return `<defs>${grad('s2bg',[[0,'#030a0d'],[.55,'#0a2a2c'],[.8,'#1d5d5a'],[1,'#d8bd8c']])}${grad('s2d',[[0,'#7a6a3d'],[1,'#10201e']])}${rgrad('s2m',[[0,'#e6fff9'],[.5,'#9ff0e8',.5],[1,'#9ff0e8',0]])}</defs>
 <rect width="1600" height="800" fill="url(#s2bg)"/>${stars(90,420,3)}
 <circle cx="1280" cy="180" r="260" fill="url(#s2m)" opacity=".55"/>
 <g transform="translate(1260 190)" opacity=".5"><g style="transform-origin:0 0;animation:spin 160s linear infinite" fill="none" stroke="#9ff0e8" stroke-width="1.2"><circle r="214"/><circle r="170"/>${ring(190)}</g><g style="transform-origin:0 0;animation:spin 120s linear infinite reverse" fill="none" stroke="#9ff0e8"><circle r="150"/><circle r="110"/>${ring(128)}</g></g>
 <g transform="translate(400 250)" style="color:#9ff0e8" opacity=".6"><use href="#g-eye" width="260" height="260" style="stroke:#9ff0e8;stroke-width:.6;fill:none"/></g>
 ${pyrShape(1180,640,360,250,'#c9ad6e','#1a3d3a')}${pyrShape(1400,646,260,180,'#c9ad6e','#1a3d3a')}
 <path d="M0 650Q300 600 700 650T1600 640V800H0Z" fill="url(#s2d)"/>
 <g transform="translate(360 700)" fill="#0b1615" stroke="rgba(190,255,248,.7)" stroke-width="2.2"><path d="${SPHINX}" transform="scale(2.5)"/></g>
 <path d="M0 740Q400 700 800 740T1600 730V800H0Z" fill="#0a1514"/>`},
nile(c){
 const temple=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="#16253a" stroke="rgba(190,215,255,.6)" stroke-width="2"><path d="M-170 0V-170H-40L-20 0Z"/><path d="M170 0V-170H40L20 0Z"/><path d="M-190 -170Q-190 -190 -166 -196H-44Q-30 -190 -30 -170Z"/><path d="M190 -170Q190 -190 166 -196H44Q30 -190 30 -170Z"/>${[-100,-60,60,100].map((cx,i)=>`<rect x="${cx-7}" y="-120" width="14" height="120" fill="#1d3150" stroke="none"/>`).join('')}<path d="M-30 0V-110H30V0Z" fill="#fbe6a8" opacity=".85" stroke="none"/></g>`;
 return `<defs>${grad('s3bg',[[0,'#02060e'],[.5,'#0b2140'],[.62,'#2c4d7d'],[1,'#0a1830']])}${grad('s3w',[[0,'#173C67'],[1,'#050c1a']])}${rgrad('s3m',[[0,'#fff'],[.3,'#dfeaff',.7],[1,'#8db8ee',0]])}<filter id="s3b"><feGaussianBlur stdDeviation="2.4"/></filter></defs>
 <rect width="1600" height="800" fill="url(#s3bg)"/>${stars(70,360,5)}
 <circle cx="1120" cy="190" r="250" fill="url(#s3m)" opacity=".6"/><circle cx="1120" cy="190" r="52" fill="#f4f8ff"/>
 <g transform="translate(0 700) scale(1 -1)" opacity=".4" filter="url(#s3b)">${temple(800,0,1.55)}${SEATED(300,-80,.9,'#16253a','rgba(190,215,255,.6)')}</g>
 <rect y="470" width="1600" height="330" fill="url(#s3w)" opacity=".9"/>
 <g>${temple(800,470,1.55)}${SEATED(280,174,.95,'#14233a','rgba(190,215,255,.7)')}${SEATED(1290,174,.95,'#14233a','rgba(190,215,255,.7)')}</g>
 <path d="M0 470H1600" stroke="rgba(190,215,255,.4)"/>
 ${[...Array(9)].map((_,i)=>`<path d="M${60+i*180} ${520+(i%3)*50}q40 -8 80 0t80 0" fill="none" stroke="#9cc4f2" stroke-width="1.6" stroke-dasharray="14 18" opacity=".5" style="animation:march ${6+i%3}s linear infinite"/>`).join('')}
 <g transform="translate(1180 640)"><path d="M-70 0Q0 30 70 0L56 -20H-56Z" fill="#0b1626" stroke="#9cc4f2" stroke-width="2"/><path d="M0 -20V-130" stroke="#9cc4f2" stroke-width="3"/><path d="M0 -128Q70 -100 52 -30H0Z" fill="#cfe0ff" opacity=".85"/></g>`},
obelisk(c){
 const obe=(x,h,w,flip)=>`<g transform="translate(${x} 620)"><path d="M${-w} 0L${-w*.66} ${-h}L0 ${-h-w*1.5}L${w*.66} ${-h}L${w} 0Z" fill="url(#s4o)" stroke="#fff0b8" stroke-width="2.4"/><path d="M${-w*.66} ${-h}L0 ${-h-w*1.5}L${w*.66} ${-h}Z" fill="#E4C77D"/>${[...Array(10)].map((_,i)=>use(GL[(i+flip)%10],-w*.4,-h+30+i*(h-60)/10,w*.8,'glyph',i)).join('')}</g>`;
 return `<defs>${grad('s4bg',[[0,'#0d0a06'],[.5,'#3a2410'],[.78,'#c98b33'],[1,'#f1cf85']])}${grad('s4o',[[0,'#1a1208'],[.55,'#8a6a32'],[1,'#d9b668']],1,0)}${grad('s4s',[[0,'#7a5a25'],[1,'#120d07']])}${rgrad('s4g',[[0,'#fff3c8'],[.5,'#E4C77D',.5],[1,'#E4C77D',0]])}</defs>
 <rect width="1600" height="800" fill="url(#s4bg)"/><circle cx="800" cy="520" r="400" fill="url(#s4g)" opacity=".8"/>
 ${obe(250,470,56,0)}${obe(1350,470,56,3)}
 <g transform="translate(800 620)"><path d="M-190 0V-300Q-190 -420 0 -420Q190 -420 190 -300V0Z" fill="#17110a" stroke="#E4C77D" stroke-width="3"/><path d="M-150 0V-290Q-150 -380 0 -380Q150 -380 150 -290V0Z" fill="#0a0704" stroke="rgba(228,199,125,.6)" stroke-width="2"/><path d="M0 -380V0" stroke="#E4C77D" stroke-width="2.4"/><g transform="translate(-28 -230)" style="stroke:#E4C77D;stroke-width:2.2;fill:none"><use href="#g-ankh" width="56" height="56" style="stroke:#fff0b8;stroke-width:2.2;fill:none" class="glyph"/></g>${[-110,110].map(x=>`<circle cx="${x}" cy="-150" r="6" fill="#E4C77D"/>`).join('')}</g>
 ${ANUBIS(560,620,1.5,'#0b0805','rgba(255,226,150,.85)')}<g transform="translate(1240 620) scale(-1 1)">${ANUBIS(0,0,1.5,'#0b0805','rgba(255,226,150,.85)')}</g>
 <path d="M0 620H1600V800H0Z" fill="url(#s4s)"/>${[...Array(5)].map((_,i)=>`<path d="M${520-i*60} ${630+i*28}H${1080+i*60}" stroke="rgba(255,226,150,.35)" stroke-width="2"/>`).join('')}
 ${[0,1,2].map(i=>`<g transform="translate(${180+i*80} 700)"><path d="M-16 0Q-24 -36 -10 -52H10Q24 -36 16 0Z" fill="#2a1a0a" stroke="#B58A45"/></g>`).join('')}`},
lab(c){
 return `<defs>${grad('s5bg',[[0,'#07090c'],[.55,'#2a1d12'],[1,'#7a4f1c']])}${grad('s5g',[[0,'#3a2a18'],[1,'#0e0a06']])}${rgrad('s5l',[[0,'#fff1c0',.9],[.4,'#ffbf5a',.35],[1,'#ffbf5a',0]])}${grad('s5scr',[[0,'#8ff5e8'],[1,'#277C78']])}</defs>
 <rect width="1600" height="800" fill="url(#s5bg)"/>${stars(50,300,2)}
 <path d="M0 520H1600V800H0Z" fill="url(#s5g)"/>
 <path d="M300 640H1300L1400 800H200Z" fill="#0b0705" stroke="rgba(255,191,90,.55)" stroke-width="2"/>
 ${[...Array(7)].map((_,i)=>`<path d="M${300-i*14+i*0} ${640+i*0}L${200+i*0} 800" stroke="none"/><path d="M${290+i*115} 640L${190+i*172} 800" stroke="rgba(255,226,150,.35)" stroke-width="1.4" stroke-dasharray="6 6"/>`).join('')}${[0,1,2].map(i=>`<path d="M${290-i*30} ${690+i*34}H${1310+i*30}" stroke="rgba(255,226,150,.35)" stroke-width="1.4" stroke-dasharray="6 6"/>`).join('')}
 <g transform="translate(820 600)"><path d="M-120 0V-260Q-120 -330 0 -330Q120 -330 120 -260V0Z" fill="#241a10" stroke="#E4C77D" stroke-width="3"/><path d="M-120 -40H120M-120 -100H120" stroke="rgba(0,0,0,.35)" stroke-width="2"/><g transform="translate(-60 -250)" style="color:#ffd48a"><use href="#g-scarab" width="120" height="120" class="glyph" style="stroke:#ffd48a;stroke-width:1.4;opacity:.9;animation-duration:5s"/></g></g>
 <g transform="translate(300 600)"><path d="M-170 0L0 -200L170 0Z" fill="#c9b27a" opacity=".85" stroke="#4a3010" stroke-width="2"/><path d="M-170 0L0 -200V0Z" fill="#9c8650" opacity=".9"/><path d="M-90 0L-30 -90H30L60 0Z" fill="#ffbf5a" opacity=".9"/><circle cx="0" cy="-40" r="120" fill="url(#s5l)"/></g>
 <g transform="translate(1260 590)"><path d="M-90 0H90M-70 0V70M70 0V70" stroke="#6b4a1b" stroke-width="8" stroke-linecap="round"/><rect x="-60" y="-70" width="120" height="70" rx="6" fill="#0a1112" stroke="#B58A45" stroke-width="3"/><rect x="-52" y="-62" width="104" height="54" fill="url(#s5scr)" opacity=".85"/>${[0,1,2,3].map(i=>`<path d="M-44 ${-52+i*11}h${30+((i*37)%50)}" stroke="#04302d" stroke-width="3" stroke-linecap="round"/>`).join('')}<path d="M-72 8H72L84 22H-84Z" fill="#14201f" stroke="#B58A45" stroke-width="2"/><circle cx="0" cy="-30" r="150" fill="#8ff5e8" opacity=".12"/></g>
 <g transform="translate(1030 560)" opacity=".9"><path d="M0 0L60 -100L120 0Z" fill="none" stroke="#8ff5e8" stroke-width="2"><animateTransform attributeName="transform" type="translate" values="0 0;0 -14;0 0" dur="4s" repeatCount="indefinite"/></path><path d="M60 -100V0M25 -42H95" stroke="#8ff5e8" stroke-width="1.2" fill="none" opacity=".7"/></g>
 ${[[520,520],[1130,500]].map(([x,y])=>`<g transform="translate(${x} ${y})"><circle r="120" fill="url(#s5l)"/><path d="M0 0V120" stroke="#2a1a08" stroke-width="5"/><circle r="10" fill="#fff1c0"/></g>`).join('')}`},
maat(c){
 const links=[...Array(11)].map((_,i)=>{const x=60+i*148;return `<g transform="translate(${x} 70)"><rect width="116" height="62" rx="31" fill="#0a1a3d" stroke="#a9c2ff" stroke-width="2.4"/><rect x="8" y="8" width="100" height="46" rx="23" fill="none" stroke="#a9c2ff" stroke-opacity=".4"/>${use(GL[i%10],38,12,40,'glyph',i)}</g>${i<10?`<path d="M${x+116} 101H${x+148}" stroke="#a9c2ff" stroke-width="3"/>`:''}`}).join('');
 return `<defs>${grad('s6bg',[[0,'#02050f'],[.5,'#091a3d'],[1,'#173C67']])}${rgrad('s6g',[[0,'#cfe0ff',.8],[.5,'#6d95ee',.25],[1,'#6d95ee',0]])}${grad('s6f',[[0,'#0d2347'],[1,'#030712']])}</defs>
 <rect width="1600" height="800" fill="url(#s6bg)"/>${stars(60,300,4)}<circle cx="800" cy="400" r="430" fill="url(#s6g)"/>
 ${links}
 <path d="M0 650H1600V800H0Z" fill="url(#s6f)"/><path d="M0 650H1600" stroke="rgba(169,194,255,.5)"/>
 <g transform="translate(800 650)" stroke="#E4C77D" fill="none" stroke-width="5" stroke-linecap="round"><path d="M-70 0H70M0 0V-440"/><circle cy="-450" r="16" fill="#E4C77D"/><path d="M-330 -380H330" stroke-width="7"/>
   <g class="wing-sway" style="transform-origin:0 -380px"><path d="M-300 -380L-390 -230M-300 -380L-210 -230M-390 -230H-210" stroke-width="2.4"/><path d="M-440 -230Q-300 -150 -160 -230Z" fill="#1a3a78" stroke-width="4"/><g transform="translate(-340 -300)"><rect width="80" height="80" rx="6" fill="#274b99" stroke="#cfe0ff" stroke-width="3"/><path d="M0 0L16 -14H96L80 0M80 0L96 -14V66L80 80" stroke="#cfe0ff" stroke-width="2.4"/></g>
   <path d="M300 -380L210 -230M300 -380L390 -230M210 -230H390" stroke-width="2.4"/><path d="M160 -230Q300 -150 440 -230Z" fill="#1a3a78" stroke-width="4"/><g transform="translate(260 -420) scale(1.5)" style="color:#fff"><use href="#g-feather" width="60" height="60" style="stroke:#fff0b8;stroke-width:1.6;fill:rgba(255,240,184,.25)"/></g></g></g>
 ${ANUBIS(1180,650,1.55,'#050a18','rgba(169,194,255,.9)')}`},
garden(c){
 return `<defs>${grad('s7bg',[[0,'#080b17'],[.4,'#26233a'],[.7,'#9a5a55'],[1,'#f2b98e']])}${grad('s7w',[[0,'#2c3a55'],[1,'#0b1020']])}${rgrad('s7m',[[0,'#fff6e8'],[.4,'#ffd9b8',.55],[1,'#ffd9b8',0]])}${rgrad('s7l',[[0,'#fff1c0',.9],[.5,'#ffbf5a',.3],[1,'#ffbf5a',0]])}</defs>
 <rect width="1600" height="800" fill="url(#s7bg)"/>${stars(50,300,6)}
 <circle cx="420" cy="230" r="260" fill="url(#s7m)" opacity=".7"/><circle cx="420" cy="230" r="64" fill="#fff6e8"/>
 <g transform="translate(1150 540)" fill="#0f0d18" stroke="rgba(255,217,184,.55)" stroke-width="2"><path d="M-220 0V-160H220V0Z"/><path d="M-250 -160H250L220 -200H-220Z"/>${[-160,-80,0,80,160].map(x=>`<rect x="${x-9}" y="-130" width="18" height="130" fill="#171425"/>`).join('')}${[-120,-40,40,120].map(x=>`<rect x="${x-18}" y="-110" width="36" height="70" rx="4" fill="#ffbf5a" opacity=".6" stroke="none"/>`).join('')}</g>
 <rect y="540" width="1600" height="260" fill="url(#s7w)"/><path d="M0 540H1600" stroke="rgba(255,217,184,.35)"/>
 <g transform="translate(0 1080) scale(1 -1)" opacity=".25"><circle cx="420" cy="230" r="64" fill="#fff6e8" transform="translate(0 0)"/></g>
 ${[...Array(8)].map((_,i)=>`<path d="M${40+i*200} ${600+(i%3)*45}q36 -7 72 0t72 0" fill="none" stroke="#ffd9b8" stroke-width="1.4" stroke-dasharray="12 16" opacity=".4" style="animation:march ${7+i%3}s linear infinite"/>`).join('')}
 <g stroke-linecap="round">${reeds(-20,560,640,30,'#1d3a34')}${reeds(1060,1620,650,30,'#17322d')}</g>
 ${lotus(300,690,1.5,'#f6c7d3','#8a3a52')}${lotus(520,730,1.1,'#f6c7d3','#8a3a52')}${lotus(1000,715,1.3,'#f6c7d3','#8a3a52')}${lotus(720,745,.9,'#fff0f3','#8a3a52')}
 <g transform="translate(850 600)"><rect x="-62" y="-20" width="124" height="40" fill="#1a1626" stroke="#ffd9b8" stroke-width="2"/>${BASTET(0,-20,1.55,'#0f0d18','rgba(255,217,184,.9)')}<circle cx="70" cy="-120" r="90" fill="url(#s7l)"/><path d="M70 -126V-60" stroke="#ffd9b8" stroke-width="3"/><circle cx="70" cy="-132" r="9" fill="#fff1c0"/></g>
 ${[...Array(26)].map((_,i)=>`<circle cx="${rnd()*1600}" cy="${380+rnd()*300}" r="${1.6+rnd()*2}" fill="#fff1c0" class="twinkle" style="--i:${i%11};filter:drop-shadow(0 0 6px #ffd48a)"/>`).join('')}`}
};

/* ---------- 10. RENDERIZADO DE CONTENIDO ---------- */
const ic=id=>`<svg viewBox="0 0 40 40" aria-hidden="true"><use href="#${id}"/></svg>`;
let galleryId=0;
function renderItems(items,keyPath){
  let out='',buf=[];const flush=()=>{if(buf.length){const gid='g'+(++galleryId);out+=`<div class="gallery ${buf.length===1?'single':''}">${buf.map(it=>frame(it.img,it.t||it.title,it.s||it.cap,gid)).join('')}</div>`;buf=[]}};
  items.forEach(it=>{
    if(it&&it.img){buf.push(it);return}
    flush();
    if(typeof it==='string')out+=`<p>${esc(it)}</p>`;
    else if(it.h)out+=`<h4>${esc(it.h)}</h4>`;
    else if(it.list)out+=`<ul>${it.list.map(l=>`<li>${esc(l)}</li>`).join('')}</ul>`;
    else if(it.code!=null)out+=termBlock(it.title||it.lang||'código',it.code,false);
    else if(it.cmd!=null)out+=termBlock(it.title||'terminal',`$ ${it.cmd}`+(it.out?`\n${it.out}`:''),true,it.explain);
    else if(it.compare)out+=compareBlock(it.compare);
    else if(it.sources)out+=`<div class="chron-sources"><h4>Bibliografía y webgrafía</h4><ul>${it.sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a><span>${esc(s.why||'')}</span></li>`).join('')}</ul></div>`;
  });flush();return out;
}
function termBlock(title,code,prompt,explain){
  const lines=esc(code).split('\n').map(l=>prompt&&l.startsWith('$ ')?`<span class="p">$ </span>${l.slice(2)}`:l).join('\n');
  return `<div class="term"><div class="term-bar"><i></i><i></i><i></i><span>${esc(title)}</span><button class="copy" type="button" data-copy="${esc(code.replace(/^\$ /gm,''))}" aria-label="Copiar al portapapeles">Copiar</button></div><pre><code>${lines}</code></pre>${explain?`<div class="cmd-explain">${esc(explain)}</div>`:''}</div>`;
}
function frame(key,title,cap,gid){
  const src=IMGS[key]||key; const real=!!IMGS[key];
  return `<figure class="frame"><button class="shot" type="button" data-k="${esc(key)}" data-g="${gid}" aria-label="Ampliar captura: ${esc(title||'')}"><img src="${src}" alt="${real?'Captura real: ':''}${esc(title||'')}" loading="lazy" decoding="async"><span class="zoom-ic"><svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="6"/><path d="M15 15l5 5M10 7v6M7 10h6"/></svg></span></button><figcaption class="${real?'real':''}"><b>${esc(title||'')}</b>${esc(cap||'')}</figcaption></figure>`;
}
function compareBlock(c){
  const a=IMGS[c.before]||c.before,b=IMGS[c.after]||c.after,l=c.labels||['Antes','Después'];
  return `<figure class="frame"><div class="cmp" data-cmp><img src="${a}" alt="${esc(l[0])}"><div class="after"><img src="${b}" alt="${esc(l[1])}"></div><div class="bar"></div><span class="tag" style="left:10px">${esc(l[0])}</span><span class="tag" style="right:10px">${esc(l[1])}</span><input type="range" min="0" max="100" value="50" aria-label="Comparar ${esc(l[0])} y ${esc(l[1])}"></div><figcaption><b>Comparación</b>${esc(c.cap||'')}</figcaption></figure>`;
}
function slot(n,key,items,path,opts={}){
  const m=SLOT_META[key];
  let body;
  if(key==='ps'){
    const p=(items&&items.problemas)||[],s=(items&&items.soluciones)||[];
    if(!p.length&&!s.length)return '';
    body=`<div class="ps-grid">${p.length?`<div class="ps"><h4>Problemas encontrados</h4>${renderItems(p)}</div>`:''}${s.length?`<div class="ps"><h4>Soluciones</h4>${renderItems(s)}</div>`:''}</div>`;
  }else{
    if(!Array.isArray(items)||!items.length)return '';
    body=renderItems(items);
  }
  return `<section class="slot slot--${key}" id="c${n}-${opts.id||key}" aria-labelledby="c${n}-${opts.id||key}-h"><div class="slot-label">${ic(SLOT_ICON[key])}<small>${m[1]}</small><h3 id="c${n}-${opts.id||key}-h">${m[0]}</h3></div><div class="slot-content">${body}</div></section>`;
}
function buildChamber(c){
  const n=c.n,data=CONTENT.camaras[n]||{};const sub=data.subtitle||c.sub;
  let body='';
  if(c.kind==='tema'){
    const keys=['explicacion','desarrollo',...(n===1?['situacion']:[]),'comandos','codigo','capturas','resultados','ps'].filter(k=>{
      if(k==='situacion')return Array.isArray(CONTENT.situacion)&&CONTENT.situacion.length>0;
      if(k==='ps')return !!((data.problemas&&data.problemas.length)||(data.soluciones&&data.soluciones.length));
      return Array.isArray(data[k])&&data[k].length>0;
    });
    if(keys.length)body+=`<ul class="ch-nav" aria-label="Secciones de la cámara">${keys.map(k=>`<li><a href="#c${n}-${k}" data-slot>${SLOT_META[k][0]}</a></li>`).join('')}</ul>`;
    keys.forEach(k=>{body+=k==='situacion'?slot(n,k,CONTENT.situacion,'CONTENT'):slot(n,k,k==='ps'?data:data[k],`camaras[${n}]`)});
    if(c.xref)body+=`<div class="slot" style="border-top:1px solid var(--line)"><div class="slot-label">${ic('i-lab')}<small>Laboratorio relacionado</small><h3>Evidencias vinculadas</h3></div><div class="slot-content"><p>Las ejecuciones reales de este tema se encuentran en un laboratorio.</p><button class="xref" type="button" data-open="${c.xref.n}" data-lab="${c.xref.lab}">${c.xref.t} →</button></div></div>`;
  }else if(c.kind==='labs'){
    const labs=c.labs.map(id=>LABS.find(l=>l.id===id));
    body+=`<ul class="lab-tabs" role="tablist" aria-label="Laboratorios de esta cámara">${labs.map((l,i)=>`<li><button type="button" role="tab" id="tab-${l.id}" aria-controls="lab-${l.id}" aria-selected="${i===0}" data-lab-tab="${l.id}">${esc(l.title)}</button></li>`).join('')}</ul>`;
    labs.forEach((l,i)=>{
      const T=(CONTENT.labsText||{})[l.id]||{};
      const gid='g'+(++galleryId);
      const shots=l.shots.map(s=>({img:s.img,t:s.t,s:s.s})).concat(T.capturas||[]);
      const cap=shots.length?renderItems(shots):'';
      body+=`<div class="lab-panel" role="tabpanel" id="lab-${l.id}" aria-labelledby="tab-${l.id}" ${i?'hidden':''}>
        <div class="lab-meta">${l.meta.map(m=>`<span>${esc(m[0])}: <b>${esc(m[1])}</b></span>`).join('')}${shots.length?`<span>Capturas: <b>${shots.length}</b></span>`:''}</div>
        ${slot(n,'explicacion',T.explicacion,`labsText.${l.id}`,{id:l.id+'-explicacion'})}
        ${slot(n,'comandos',T.comandos,`labsText.${l.id}`,{id:l.id+'-comandos'})}
        ${shots.length?`<section class="slot slot--capturas" id="c${n}-${l.id}-capturas"><div class="slot-label">${ic('i-capturas')}<small>Evidencias</small><h3>Capturas de ejecuciones reales</h3></div><div class="slot-content">${cap}</div></section>`:''}
        ${slot(n,'resultados',T.resultados,`labsText.${l.id}`,{id:l.id+'-resultados'})}
        ${slot(n,'ps',T,`labsText.${l.id}`,{id:l.id+'-ps'})}
      </div>`;
    });
  }else{
    const items=CONTENT.cronicas;
    body+=`<div class="chron"><ul class="chron-index" aria-label="Crónicas">${items.map((it,i)=>`<li><a href="#c7-${it.id}" data-slot ${i===0?'class="on"':''}>${esc(it.title)}</a></li>`).join('')}</ul><div>${items.map((it,i)=>`<article class="chron-item" id="c7-${it.id}"><span class="no">Crónica ${String(i+1).padStart(2,'0')}</span><h3>${esc(it.title)}</h3>${it.body&&it.body.length?renderItems(it.body):''}${it.sources&&it.sources.length?renderItems([{sources:it.sources}]):''}</article>`).join('')}</div></div>`;
  }
  const prev=CH[(n+5)%7],next=CH[n%7];
  return `<article class="chamber" id="ch${n}" data-n="${n}" tabindex="-1" aria-hidden="true" aria-labelledby="ch${n}t" style="--bg:${c.bg};--accent:${c.accent}">
    <div class="ch-bar"><button class="ch-back" type="button" data-act="map"><svg viewBox="0 0 20 20"><path d="M12 4L5 10l7 6M5 10h12"/></svg>Volver al mapa</button><span class="ch-crumb">${esc(CONFIG.title)} · ${c.name}</span></div>
    <div class="ch-scene"><svg class="bg" viewBox="0 0 1600 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${SCENES[c.scene](c)}</svg>
      <div class="ch-title"><span class="roman" aria-hidden="true">${c.roman}</span><div class="no">${c.name}</div><h2 id="ch${n}t">${esc(c.title)}</h2><p>${esc(sub)}</p></div></div>
    <div class="ch-body">${body}</div>
    <div class="ch-foot"><button class="btn" type="button" data-open="${prev.n}">← ${prev.name}</button><button class="btn ghost" type="button" data-act="map">Mapa</button><button class="btn" type="button" data-open="${next.n}">${next.name} →</button></div>
  </article>`;
}
function buildStelae(){
  return `<div class="knowledge-grid">${CONTENT.intro.map((s,i)=>`<article class="knowledge-card reveal">
    <span class="knowledge-no">${['01','02','03','04','05'][i]}</span>
    <div class="knowledge-mark" aria-hidden="true">${['𓂀','𓆣','𓊹','𓋹','𓇳'][i]}</div>
    <h3>${esc(s.title)}</h3>
    <div class="knowledge-body">${s.body&&s.body.length?renderItems(s.body):''}</div>
  </article>`).join('')}</div>`;
}
