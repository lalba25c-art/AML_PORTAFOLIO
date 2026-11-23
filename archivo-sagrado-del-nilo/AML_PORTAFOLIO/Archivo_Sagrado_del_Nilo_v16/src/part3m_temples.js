/* ---------- 24. SISTEMA DE TEMPLOS ----------
   Entrada cinematográfica → interior oscuro con niebla → aparición del guardián → diálogo ramificado (pista / desafío) →
   MINIJUEGO propio del templo (combate con estados y vida del guardián) → prueba académica (quiz real) → purificación
   (el guardián se libera, vuelve la luz) → desbloqueo y recompensa. El índice académico sigue abriendo todo sin retos. */
const TP={n:0,on:false,opts:null,phase:'',hint:false,hard:false,fails:0,assist:false,cleanup:[],dust:0,final:false,onDone:null};
const TPL=[null,
 {sk:['#2a1a3a','#e08a4a'],pal:'#E4C77D',narr:'El viento del desierto silba entre dos pilonos gigantes. Algo te observa desde la piedra.',pre:'La puerta no se abrirá sola.'},
 {sk:['#0a1d24','#2b6f73'],pal:'#7fe0d8',narr:'Miles de papiros susurran a la vez. Las letras se mueven cuando no las miras.',pre:'Los códices esperan tu respuesta.'},
 {sk:['#0a1428','#3a5fa0'],pal:'#9cc4f2',narr:'Columnas colosales sostienen un techo que no se ve. Los racks de la sala zumban en la penumbra.',pre:'Que empiece la inspección.'},
 {sk:['#241406','#b9822f'],pal:'#F5EAD5',narr:'El oro guarda silencio. Entre cofres y ánforas, un caparazón enorme se despierta.',pre:'Que comience la custodia.'},
 {sk:['#1c0f06','#c8742a'],pal:'#ffd48a',narr:'Engranajes gigantes giran sin descanso. Un autómata de bronce gira la cabeza hacia ti.',pre:'Pon a prueba tu ingenio.'},
 {sk:['#070b1e','#2c3f86'],pal:'#a9c2ff',narr:'Cadenas de luz cruzan el vacío uniendo bloques flotantes. Cada eslabón recuerda al anterior.',pre:'Que el telar empiece.'},
 {sk:['#0d0a1c','#a8605a'],pal:'#ffe0bf',narr:'En la cima no hay techo: solo estrellas, una luna enorme y una sombra que no quiere ser olvidada.',pre:'La última luz está en tus manos.'}];
/* Diálogos: [saludo,[x1,r1],[x2,r2],[x3,r3],lore,[x4,r4],[x5,r5]]  x1→lore · x2→pista · x3→desafío difícil · x4→combate · x5→pista */
const TALKS=[null,
 ['Alto, viajera. Soy la Esfinge del Umbral. Por esta puerta pasan archivos, personas… y amenazas. ¿Quién eres tú para cruzarla?',
  ['Soy una estudiante de seguridad informática. ¿Qué custodias?','Custodio lo que debe protegerse: la confidencialidad, la integridad y la disponibilidad. Tres pilares, y ningún atacante cree en ellos.'],
  ['Soy nueva aquí. ¿Me das una pista?','Humildad: la mejor defensa. Ten esto: lo rojo es amenaza, lo verde es legítimo. No golpees lo que te protege.'],
  ['No me asustas. Haz tu peor ataque.','¡Ja! Valentía sin prudencia es un fallo de configuración. Pero acepto: vendrán más amenazas, y más rápido.'],
  'Antes de la prueba: una amenaza es todo lo que puede dañar un activo, y una vulnerabilidad, el hueco por el que entra. Reconocerlas a tiempo es defender.',
  ['Entendido. Estoy lista.','Entonces observa el suelo: cuando una amenaza lo toque, perderás protección.'],['¿Algún consejo más?','Mira los nombres: «Copia de seguridad» o «Antivirus» jamás son enemigos.']],
 ['Los códices guardan mensajes que solo pueden leer quienes poseen la clave. Soy la Escriba de Thot. ¿Sabrías leer lo que otros esconden?',
  ['¿Cómo se esconde un mensaje?','Con un algoritmo y una clave. Cambiar letras de sitio fue el primer cifrado: el de César, tan viejo como frágil.'],
  ['Necesito ayuda para empezar.','Toma esta pista: el César solo tiene 25 claves posibles. Si las pruebas todas, una dará una palabra con sentido.'],
  ['Cifraré más rápido que tú.','Veremos si tu pluma sigue a tu orgullo: te daré cuatro códices y la tinta correrá más rápida.'],
  'Hoy el cifrado simétrico usa una misma clave para cifrar y descifrar; el asimétrico, un par: pública y privada. Y el hash comprueba que nada cambió.',
  ['Lista para descifrar.','Que la tinta no te alcance. Gira el disco hasta ver una palabra.'],['Cuéntame un truco.','Mira la palabra descifrada mientras giras: cuando se lee, esa es la clave.']],
 ['Cada columna sostiene un techo, y cada techo protege máquinas que no pueden detenerse. Soy el Arquitecto de Ra. ¿Qué amenaza a un equipo en el mundo físico?',
  ['El fuego, el calor, la humedad, la electricidad…','Bien. La seguridad pasiva no evita el ataque: reduce el daño cuando llega. Extintores, SAI, climatización.'],
  ['¿Puedes decirme qué protege de qué?','Extintor al fuego, climatización al calor, SAI a los apagones, deshumidificador a la humedad, control de acceso a los intrusos. Memorízalo.'],
  ['Pon todos los peligros que quieras.','Arrogante, pero ingenioso. Que bajen más peligros y más veloces.'],
  'El CPD es el corazón de una organización: ubicación elegida, suelo técnico, refrigeración, detección de incendios, SAI y control de accesos.',
  ['Empecemos la inspección.','Los peligros bajarán hacia los racks. Elige bien la medida o perderás un sistema.'],['¿Una última pista?','Usa las teclas 1 a 5. Y no confundas el SAI con el extintor: uno es electricidad, el otro, fuego.']],
 ['Soy la Custodia del Escarabajo y vigilo lo más valioso: los datos. Una cámara fuerte sin copias es una tumba. ¿Dónde guardas tú lo importante?',
  ['En varios sitios, con copias.','Sabia. Una copia es un segundo corazón: sin ella, un disco roto es un tesoro perdido.'],
  ['No lo sé. ¿Cómo se protege el almacenamiento?','Con redundancia (RAID), copias de seguridad y discos de reserva. Recoge las copias del laberinto: son tu llave.'],
  ['Puedo entrar sola, sin ayuda.','Entonces te vigilarán más escarabajos y habrá más trampas. Tú lo has pedido.'],
  'RAID reparte o duplica datos entre discos: RAID 1 duplica, RAID 5 reparte con paridad. Y recuerda la regla 3-2-1 de copias.',
  ['Entro al laberinto.','Recoge las tres copias y sal. Los centinelas te persiguen si te ven.'],['¿Cómo los evito?','Se detienen en las esquinas. Si te ven, huye por una bifurcación.']],
 ['Soy el Autómata de Anubis. Mis engranajes no se cansan, no se equivocan y no entienden de excusas. Aquí se ponen a prueba las prácticas: ¿has hecho algo más que leerlas?',
  ['He configurado contenedores, redes y almacenamiento.','Ya lo veremos. Una práctica es un circuito: si una pieza falla, no pasa la corriente.'],
  ['Dame una pista, por favor.','Los circuitos se resuelven desde los extremos: conecta primero la fuente y el destino, y rellena el centro.'],
  ['Puedo con todos tus engranajes.','Calibraré mis sabotajes: giraré losas más a menudo.'],
  'Docker, variables de entorno, el laboratorio del CPD, OpenMediaVault o John the Ripper: son tus prácticas, cada una un engranaje del Archivo.',
  ['Estoy lista para el circuito.','Haz fluir la corriente de izquierda a derecha. Yo la interrumpiré.'],['¿Y si me atasco?','Las losas encendidas llevan corriente: mira dónde se corta.']],
 ['Soy la Tejedora de los Bloques. Cada bloque guarda el hash del anterior: si alguien altera uno, todos lo notan. ¿Podrás tejer una cadena sin romperla?',
  ['Explícame cómo funciona una cadena.','Cada bloque contiene datos, su hash y el hash del bloque previo. Cambiar un dato cambia el hash y rompe todos los eslabones siguientes.'],
  ['¿Un consejo para no perderme?','Escucha los tonos. Cada símbolo tiene su sonido, y el oído recuerda mejor que los ojos.'],
  ['Teje todo lo que quieras.','Que así sea: las secuencias serán más largas y la tejeré más rápido.'],
  'Blockchain es un registro distribuido, inmutable por diseño y verificable por todos los nodos. Aquí no se confía en una persona, sino en las matemáticas.',
  ['Empecemos a tejer.','Repite la secuencia y forjarás un bloque tras otro.'],['¿Algo más?','Cuando una secuencia se acaba, respira antes de empezar: no hay prisa.']],
 ['Has llegado a la cumbre, exploradora. Yo soy lo que queda cuando todo se olvida: la Sombra del Olvido. Si tus archivos desaparecen, nadie recordará quién fuiste.',
  ['¿Por qué quieres que se olvide todo?','Porque lo que no se documenta se pierde. Pero tú ya has dejado huellas: prácticas, proyectos, aprendizajes.'],
  ['Estoy cansada, pero sigo.','Eso es lo que no entiendo de ti. Toma esta luz: te dará una vida extra.'],
  ['Que se vea toda tu sombra.','Mostraré mi verdadera forma: más rápida, más cruel, más oscura.'],
  'La luz que llevas son tus aprendizajes: seguridad, redes, copias, cifrado, cadenas. Disparar luz es recordar lo que sabes.',
  ['Estoy lista para el combate final.','Entonces dispara tu luz hacia mí. Yo lanzaré todo mi olvido.'],['¿Y si me protejo?','Mi escudo parpadea antes de activarse. Espera a que se apague.']]];
const TALK=TALKS.map(t=>t&&{a:{t:t[0],o:[{x:t[1][0],r:t[1][1],n:'b'},{x:t[2][0],r:t[2][1],act:'hint'},{x:t[3][0],r:t[3][1],act:'hard'}]},b:{t:t[4],o:[{x:t[5][0],r:t[5][1],act:'fight'},{x:t[6][0],r:t[6][1],act:'hint'}]}});
const BOSS={name:'La Sombra del Olvido',role:'Guardiana final · Cumbre de los Pergaminos',place:'La Cumbre',gl:'#e8d0ff',ga:'#6a3fa0',win:'La luz permanece. La Cumbre vuelve a recordar.',
 art:()=>ST(`<defs>${grad('bsh',[[0,'#3a1d58'],[1,'#0a0716']])}</defs><path d="M60 250Q40 120 150 40Q260 120 240 250L210 230L190 270L150 232L110 270L90 230Z" fill="url(#bsh)" stroke="#b58aff" stroke-width="3"/><ellipse cx="118" cy="130" rx="22" ry="14" fill="#ffd77a"/><ellipse cx="182" cy="130" rx="22" ry="14" fill="#ffd77a"/><rect x="112" y="124" width="10" height="10" fill="#000"/><rect x="178" y="124" width="10" height="10" fill="#000"/>`)};
const tpG=n=>n===7?BOSS:GUARD[n-1];

/* ----- escenarios: 7 arquitecturas distintas (viewBox 1600×900, capas con parallax) ----- */
const tpTorch=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s||1})"><ellipse class="glw" cx="0" cy="-30" rx="60" ry="80" fill="url(#tpfg)"/><rect x="-4" y="0" width="8" height="46" fill="#3a2a18"/><path class="fl" d="M0 -4C-14 -18 -7 -34 0 -48C7 -34 14 -18 0 -4Z" fill="#ffa62a"/><path class="fl" d="M0 -6C-6 -16 -3 -24 0 -32C3 -24 6 -16 0 -6Z" fill="#fff1a8"/></g>`;
const tpDefs=pal=>`<defs>${rgrad('tpfg',[[0,'rgba(255,190,90,.55)'],[1,'rgba(255,190,90,0)']])}${rgrad('tpgl',[[0,pal+'aa'],[1,pal+'00']])}${grad('tpfl',[[0,'rgba(0,0,0,0)'],[1,'rgba(0,0,0,.55)']])}</defs>`;
const hg=(k,x,y,s,o)=>`<use href="#g-${k}" x="${x}" y="${y}" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.4" opacity="${o||.35}"/>`;
const SCN={
1(){return `${tpDefs('#E4C77D')}<rect width="1600" height="900" fill="url(#tps)"/>
 <g class="ly" style="--d:.6"><circle cx="800" cy="330" r="230" fill="url(#tpgl)"/><circle class="glw" cx="800" cy="330" r="120" fill="#ffd9a0" opacity=".9"/>
 <path d="M0 640Q300 560 560 650T1100 600T1600 650V900H0Z" fill="#6a4a2a"/><path d="M0 700Q400 630 800 700T1600 680V900H0Z" fill="#4a3320"/></g>
 <g class="ly" style="--d:1.2"><path d="M250 60L560 20L610 790L150 790Z" fill="#8a6a38" stroke="#e4c77d" stroke-width="4"/><path d="M1350 60L1040 20L990 790L1450 790Z" fill="#7a5a30" stroke="#e4c77d" stroke-width="4"/><rect x="560" y="40" width="480" height="90" fill="#6a4a28" stroke="#e4c77d" stroke-width="4"/><path d="M610 790V300Q800 190 990 300V790Z" fill="#050303"/>${[0,1,2,3,4].map(i=>hg(['eye','ankh','scarab','feather','eye'][i],250+i%2*80,120+i*120,70,.5)+hg(['ankh','eye','feather','scarab','ankh'][i],1290-i%2*80,120+i*120,70,.5)).join('')}${tpTorch(690,560,1.3)}${tpTorch(910,560,1.3)}</g>
 <g class="ly" style="--d:2"><g transform="translate(60 880) scale(2.2)" fill="#3a2a18" stroke="#e4c77d" stroke-width="2"><path d="${SPHINX}"/></g><g transform="translate(1540 880) scale(-2.2 2.2)" fill="#3a2a18" stroke="#e4c77d" stroke-width="2"><path d="${SPHINX}"/></g></g>
 <rect y="760" width="1600" height="140" fill="url(#tpfl)"/>`},
2(){const sh=(side)=>Array.from({length:6},(_,r)=>Array.from({length:9},(_,k)=>`<rect x="${side?1020+k*40+r*0:30+k*40}" y="${150+r*115}" width="${24+(k*7)%11}" height="${78+(k*13)%24}" rx="9" fill="${['#c9b987','#a98f5a','#7fe0d8'][(k+r)%3]}" opacity=".85"/>`).join('')+`<rect x="${side?1010:20}" y="${222+r*115-50}" width="380" height="9" fill="#3a2a18"/>`).join('');
 return `${tpDefs('#7fe0d8')}<rect width="1600" height="900" fill="url(#tps)"/><g class="ly" style="--d:.5">${[0,1,2,3,4,5,6].map(i=>`<path d="M${230+i*190} 200Q${325+i*190} 20 ${420+i*190} 200" fill="none" stroke="#7fe0d8" stroke-width="3" opacity=".25"/>`).join('')}<circle cx="800" cy="520" r="380" fill="url(#tpgl)"/></g>
 <g class="ly" style="--d:1.2"><rect x="0" y="0" width="460" height="900" fill="#0b2a2e" opacity=".9"/><rect x="1140" y="0" width="460" height="900" fill="#0b2a2e" opacity=".9"/>${sh(0)}${sh(1)}</g>
 <g class="ly" style="--d:1.8"><rect x="560" y="640" width="480" height="120" rx="12" fill="#3a2a18" stroke="#7fe0d8" stroke-width="3"/><path d="M640 640Q800 560 960 640Z" fill="#7fe0d8" class="glw"/><ellipse class="glw" cx="800" cy="560" rx="160" ry="80" fill="url(#tpgl)"/>${[0,1,2,3,4,5].map(i=>`<g class="flt" style="animation-delay:-${i}s">${hg(['feather','ankh','eye'][i%3],420+i*140,160+(i*47)%180,48,.7)}</g>`).join('')}</g><rect y="760" width="1600" height="140" fill="url(#tpfl)"/>`},
3(){const col=(x,s)=>`<g transform="translate(${x} 0)"><rect x="${-34*s}" y="${100-60*s}" width="${68*s}" height="${700+60*s}" fill="#10253f" stroke="#9cc4f2" stroke-width="${3*s}"/><rect x="${-52*s}" y="${100-60*s-26*s}" width="${104*s}" height="${26*s}" fill="#173c67" stroke="#9cc4f2"/><rect x="${-46*s}" y="780" width="${92*s}" height="${24*s}" fill="#173c67" stroke="#9cc4f2"/></g>`;
 return `${tpDefs('#9cc4f2')}<rect width="1600" height="900" fill="url(#tps)"/><g class="ly" style="--d:.4"><path d="M300 120L420 0H620L560 140ZM800 100L900 0H1100L1000 120Z" fill="#9cc4f2" opacity=".14"/><g>${[0,1,2,3].map(i=>`<g transform="translate(${560+i*130} 330)"><rect width="100" height="270" rx="6" fill="#0b1a30" stroke="#9cc4f2"/>${[0,1,2,3,4].map(k=>`<rect x="10" y="${16+k*50}" width="80" height="32" fill="#10253f"/><circle class="glw" style="animation-delay:-${(i+k)*.3}s" cx="76" cy="${32+k*50}" r="4" fill="${['#7be0a6','#ffd77a','#9cc4f2'][(i+k)%3]}"/>`).join('')}</g>`).join('')}</g></g>
 <g class="ly" style="--d:1">${[0,1,2].map(i=>col(300-i*92+i*60,.55+i*.12)+col(1300+i*92-i*60,.55+i*.12)).join('')}</g><g class="ly" style="--d:1.9">${col(110,1.15)}${col(1490,1.15)}${col(380,.95)}${col(1220,.95)}</g><ellipse cx="800" cy="840" rx="760" ry="60" fill="#9cc4f2" opacity=".1"/><rect y="760" width="1600" height="140" fill="url(#tpfl)"/>`},
4(){const ch=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-70" y="-60" width="140" height="60" fill="#5a3a14" stroke="#f5ead5" stroke-width="3"/><path d="M-70 -60Q0 -120 70 -60Z" fill="#7a4e1a" stroke="#f5ead5" stroke-width="3"/><rect x="-10" y="-70" width="20" height="30" fill="#E4C77D"/></g>`,
  am=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 -110Q-60 -50 -30 0H30Q60 -50 30 -110Z" fill="#8e5a22" stroke="#f5ead5" stroke-width="3"/><rect x="-14" y="-130" width="28" height="22" fill="#8e5a22" stroke="#f5ead5" stroke-width="3"/></g>`;
 return `${tpDefs('#F5EAD5')}<rect width="1600" height="900" fill="url(#tps)"/><g class="ly" style="--d:.5">${[0,1,2,3].map(i=>`<path d="M${i*420-40} 700V260Q${i*420+170} 60 ${i*420+380} 260V700" fill="#2a1a0a" stroke="#b9822f" stroke-width="4"/>`).join('')}<g transform="translate(800 330)"><circle r="150" fill="url(#tpgl)"/>${hg('scarab',-90,-90,180,.7)}</g></g>
 <g class="ly" style="--d:1.2">${ch(300,760,1.4)}${ch(470,780,1.1)}${ch(1300,760,1.4)}${ch(1140,780,1.1)}${am(120,780,1.2)}${am(220,780,1)}${am(1480,780,1.2)}${am(1380,780,1)}${tpTorch(640,540,1.3)}${tpTorch(960,540,1.3)}</g>
 <g class="ly" style="--d:1.9">${Array.from({length:60},(_,i)=>`<circle class="glw" style="animation-delay:-${(i%7)*.4}s" cx="${520+(i*53)%560}" cy="${800+(i*17)%70}" r="${6+(i%4)}" fill="#E4C77D"/>`).join('')}</g><rect y="780" width="1600" height="120" fill="url(#tpfl)"/>`},
5(){const gear=(cx,cy,r,t,cls)=>{let d='';for(let i=0;i<t;i++){const a=i/t*Math.PI*2,b=(i+.5)/t*Math.PI*2;d+=`${i?'L':'M'}${cx+Math.cos(a)*r} ${cy+Math.sin(a)*r}L${cx+Math.cos(a+.07)*(r+22)} ${cy+Math.sin(a+.07)*(r+22)}L${cx+Math.cos(b-.07)*(r+22)} ${cy+Math.sin(b-.07)*(r+22)}L${cx+Math.cos(b)*r} ${cy+Math.sin(b)*r}`}return `<g class="spin ${cls||''}"><path d="${d}Z" fill="#4a2a10" stroke="#ffd48a" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${r*.35}" fill="#1c0f06" stroke="#ffd48a" stroke-width="3"/></g>`};
 return `${tpDefs('#ffd48a')}<rect width="1600" height="900" fill="url(#tps)"/><g class="ly" style="--d:.6">${gear(260,240,150,14)}${gear(560,170,100,10,'r')}${gear(1300,260,170,16,'r')}${gear(1030,150,90,9)}<circle cx="800" cy="420" r="300" fill="url(#tpgl)"/></g>
 <g class="ly" style="--d:1.2"><g transform="translate(800 420)"><rect x="-70" y="-140" width="140" height="220" rx="16" fill="#3a2410" stroke="#ffd48a" stroke-width="3"/><rect x="-46" y="-196" width="92" height="64" rx="12" fill="#4a2c12" stroke="#ffd48a" stroke-width="3"/><circle class="glw" cx="-16" cy="-166" r="9" fill="#ffd48a"/><circle class="glw" cx="16" cy="-166" r="9" fill="#ffd48a"/><path d="M-70 -80H-150M70 -80H150" stroke="#ffd48a" stroke-width="12" stroke-linecap="round"/></g>${tpTorch(380,600,1.3)}${tpTorch(1220,600,1.3)}</g>
 <g class="ly" style="--d:1.9"><rect x="120" y="700" width="560" height="40" fill="#3a2410" stroke="#ffd48a" stroke-width="3"/><rect x="920" y="700" width="560" height="40" fill="#3a2410" stroke="#ffd48a" stroke-width="3"/>${[0,1,2,3,4].map(i=>`<rect x="${160+i*100}" y="${650-(i%2)*20}" width="40" height="${50+(i%2)*20}" rx="8" fill="${['#c9703a','#7fe0d8','#ffd48a'][i%3]}" opacity=".85"/>`).join('')}</g><rect y="780" width="1600" height="120" fill="url(#tpfl)"/>`},
6(){const bl=(x,y,s,d)=>`<g transform="translate(${x} ${y}) scale(${s})"><g class="flt" style="animation-delay:-${d}s"><rect x="-60" y="-60" width="120" height="120" rx="12" fill="#10204e" stroke="#a9c2ff" stroke-width="4"/><path d="M-60 -60L-30 -90H90L60 -60M60 -60L90 -90V30L60 60" fill="#1a2f6e" stroke="#a9c2ff" stroke-width="3"/><text x="0" y="8" text-anchor="middle" font-family="monospace" font-size="22" fill="#cfe0ff">${['0xA3F1','0x7C02','0xE91B','0x14D8','0xB60E'][d%5]}</text></g></g>`;
 return `${tpDefs('#a9c2ff')}<rect width="1600" height="900" fill="url(#tps)"/><g class="ly" style="--d:.5">${[0,1,2,3,4].map(i=>`<path d="M${100+i*350} 760V200Q${275+i*350} 60 ${450+i*350} 200V760" fill="none" stroke="#a9c2ff" stroke-width="3" opacity=".25"/>`).join('')}<circle cx="800" cy="400" r="360" fill="url(#tpgl)"/></g>
 <g class="ly" style="--d:1.2"><path d="M260 330L520 470L800 360L1080 480L1340 340" fill="none" stroke="#a9c2ff" stroke-width="5" stroke-dasharray="14 10" class="glw"/>${bl(260,330,.9,0)}${bl(520,470,1,1)}${bl(800,360,1.2,2)}${bl(1080,480,1,3)}${bl(1340,340,.9,4)}</g>
 <g class="ly" style="--d:1.9"><rect y="740" width="1600" height="160" fill="#060b20"/>${Array.from({length:14},(_,i)=>`<ellipse cx="${60+i*115}" cy="${780+(i%3)*30}" rx="${60+(i%4)*14}" ry="6" fill="none" stroke="#a9c2ff" stroke-width="2" opacity=".3"/>`).join('')}</g>`},
7(){return `${tpDefs('#ffe0bf')}<rect width="1600" height="900" fill="url(#tps)"/><g class="ly" style="--d:.3">${Array.from({length:90},(_,i)=>`<circle cx="${(i*137)%1600}" cy="${(i*61)%520}" r="${i%5?1:2}" fill="#fff" opacity="${.3+(i%4)*.15}"/>`).join('')}<circle cx="1160" cy="240" r="170" fill="#f3e3b0"/><circle cx="1160" cy="240" r="320" fill="url(#tpgl)"/></g>
 <g class="ly" style="--d:1"><path d="M0 700L420 560L800 640L1200 540L1600 660V900H0Z" fill="#2a1626"/><path d="M500 900L640 520H960L1100 900Z" fill="#4a2a36" stroke="#ffe0bf" stroke-width="3"/>${Array.from({length:9},(_,i)=>`<path d="M${540+i*6} ${900-i*42}H${1060-i*6}" stroke="#ffe0bf" stroke-width="2" opacity=".5"/>`).join('')}</g>
 <g class="ly" style="--d:1.7">${[0,1,2,3].map(i=>`<rect x="${560+i*140}" y="280" width="34" height="260" fill="#3a2230" stroke="#ffe0bf" stroke-width="2"/>`).join('')}<rect x="540" y="250" width="440" height="30" fill="#4a2a36" stroke="#ffe0bf" stroke-width="2"/>${hg('lotus',740,320,120,.8)}${tpTorch(520,540,1.2)}${tpTorch(1020,540,1.2)}</g>`}
};
const TPS_DEF=n=>`<defs>${grad('tps',[[0,TPL[n].sk[0]],[1,TPL[n].sk[1]]])}</defs>`;
function tpExterior(n){
  const c=CH[n-1].col,T=TPL[n],gl={1:'<path d="M220 700L330 700L330 600Q300 560 260 580Z" fill="#2a1a10"/>',2:'<path d="M300 300h120v200h-120z" fill="#7fe0d8" opacity=".3"/>',3:'<rect x="260" y="380" width="40" height="320" fill="#10253f"/><rect x="1300" y="380" width="40" height="320" fill="#10253f"/>',4:'<rect x="300" y="650" width="120" height="60" fill="#7a4e1a"/>',5:'<circle cx="800" cy="130" r="40" fill="none" stroke="#ffd48a" stroke-width="8"/>',6:'<path d="M400 100V500M1200 100V500" stroke="#a9c2ff" stroke-width="6" stroke-dasharray="14 8"/>',7:'<path d="M560 720L800 400L1040 720Z" fill="none" stroke="#ffe0bf" stroke-width="4"/>'}[n]||'';
  return `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${rgrad('exg',[[0,T.pal+'66'],[1,T.pal+'00']])}</defs><circle cx="1200" cy="220" r="90" fill="${T.pal}" opacity=".85"/><circle cx="1200" cy="220" r="260" fill="url(#exg)"/>
  <path d="M0 720Q400 640 800 700T1600 680V900H0Z" fill="#3a2a18"/>${gl}
  <path d="M800 140L1240 740H360Z" fill="${c[1]}" stroke="${c[0]}" stroke-width="4"/><path d="M800 140L1240 740H800Z" fill="#000" opacity=".28"/>${[0,1,2,3,4,5].map(i=>`<path d="M${800-i*66} ${230+i*95}H${800+i*66}" stroke="${c[0]}" stroke-width="2" opacity=".5"/>`).join('')}
  <rect x="740" y="590" width="120" height="150" fill="#050303"/><rect class="dl" x="740" y="590" width="60" height="150" fill="${c[2]}" stroke="${c[0]}" stroke-width="2"/><rect class="dr" x="800" y="590" width="60" height="150" fill="${c[2]}" stroke="${c[0]}" stroke-width="2"/></svg>`;
}
/* ----- núcleo ----- */
function tpClear(){TP.cleanup.forEach(f=>{try{f()}catch(e){}});TP.cleanup=[]}
function tpDustLoop(cv){
  const x=cv.getContext('2d');let W=0,H=0;const fit=()=>{W=cv.width=cv.clientWidth;H=cv.height=cv.clientHeight};fit();const ps=Array.from({length:REDUCED?0:48},()=>({x:Math.random()*W,y:Math.random()*H,v:6+Math.random()*16,s:.6+Math.random()*1.8,a:.2+Math.random()*.5}));let on=true,last=performance.now();
  const f=t=>{if(!on)return;const dt=Math.min(.05,(t-last)/1000);last=t;x.clearRect(0,0,W,H);ps.forEach(p=>{p.x+=p.v*dt*1.6;p.y-=p.v*dt*.3;if(p.x>W)p.x=0;if(p.y<0)p.y=H;x.globalAlpha=p.a;x.fillStyle=TPL[TP.n]?TPL[TP.n].pal:'#fff';x.fillRect(p.x,p.y,p.s,p.s)});TP.dust=requestAnimationFrame(f)};
  TP.dust=requestAnimationFrame(f);TP.cleanup.push(()=>{on=false;cancelAnimationFrame(TP.dust)});
}
function openTemple(n,opts){
  tpClear();opts=opts||{};Object.assign(TP,{n,on:true,opts,phase:'enter',hint:false,hard:false,fails:0,assist:false,final:!!opts.final,onDone:opts.onDone||null});
  const el=$('#temple'),g=tpG(n),T=TPL[n],c=CH[n-1];
  el.className='';el.style.setProperty('--pal',T.pal);el.style.setProperty('--dark',n===7?.55:.78);
  el.innerHTML=`<div class="tp-scene" id="tpScene"><svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${TPS_DEF(n)}${SCN[n]()}</svg><canvas class="tp-dust" aria-hidden="true"></canvas><div class="tp-fog"></div><div class="tp-fog b"></div><div class="tp-dark"></div></div>
  <button class="ov-btn" id="tpBack" type="button" style="left:14px;top:14px">← Salir del templo</button>
  <div class="tp-top" style="top:58px"><div class="tp-title">${esc(c.name)} · ${esc(g.place)}</div><div class="tp-narr" id="tpNarr" aria-live="polite"></div></div>
  <button class="ov-btn tp-skip" id="tpSkipAll" type="button">Entrar sin prueba ›</button>
  <div class="tp-actor" id="tpActor" role="img" aria-label="${esc(g.name)}">${g.art()}<div class="tp-eyes"><i></i><i></i></div><div class="tp-hp" id="tpHp" hidden><b></b></div><div class="tp-state" id="tpSt"></div></div>
  <div class="tp-pl"><div class="p" id="tpAv">${avFull(avGet(),{live:true})}</div><div class="d" id="tpDog"></div></div>
  <div class="tp-dlg" id="tpDlg" hidden><div class="who" id="tpWho"></div><div class="say" id="tpSay" aria-live="polite"></div><div class="tp-opts" id="tpOpts"></div></div>
  <div class="tp-game" id="tpGame" aria-live="polite"></div>
  <div class="tp-enter" id="tpEnter" style="--sk1:${T.sk[0]};--sk2:${T.sk[1]}"><div class="ext">${tpExterior(n)}</div><div class="cap">${esc(g.place)}</div><div class="walk"><div class="p">${avFull(avGet(),{live:false}).replace('class="ex-svg','class="ex-svg walking')}</div><div class="d" id="tpWd"></div></div><button class="ov-btn" id="tpSkipEnt" type="button" style="left:14px;bottom:14px">Saltar ›</button></div>`;
  ovShow(el);aud.setMood(n===7?'c7':'reto');
  dog.make($('#tpDog'),'sit');dog.make($('#tpWd'),'walk');tpDustLoop($('.tp-dust',el));
  const move=e=>{const r=el.getBoundingClientRect();el.style.setProperty('--px',((e.clientX-r.left)/r.width-.5)*-26);el.style.setProperty('--py',((e.clientY-r.top)/r.height-.5)*-26)};
  el.addEventListener('pointermove',move);TP.cleanup.push(()=>el.removeEventListener('pointermove',move));
  const ent=$('#tpEnter'),ts=[];const T0=(f,ms)=>ts.push(setTimeout(f,ms));TP.cleanup.push(()=>ts.forEach(clearTimeout));
  const inside=()=>{if(TP.phase!=='enter')return;TP.phase='inside';ent.classList.add('out');setTimeout(()=>ent.remove(),1100);sfx.close();tpArrive()};
  requestAnimationFrame(()=>requestAnimationFrame(()=>ent.classList.add('go')));
  T0(()=>{ent.classList.add('open');sfx.open()},900);T0(inside,3700);
  $('#tpSkipEnt').addEventListener('click',inside);
  setTimeout(()=>{try{$('#tpSkipEnt').focus({preventScroll:true})}catch(e){}},200);
  comp.tip&&comp.tip(n===7?'Esa sombra… tranquila, estoy contigo.':'Huele a polvo antiguo. ¡Estoy contigo!',3800);
}
function tpArrive(){
  const n=TP.n,T=TPL[n],ts=TP.cleanup;const nr=$('#tpNarr');if(!nr)return;nr.textContent=T.narr;nr.classList.add('on');
  const h=setTimeout(()=>{const a=$('#tpActor');if(!a)return;a.classList.add('show');comp.react&&comp.react('enemy');dogReact&&dogReact('sniff');aud.tone&&aud.tone(70,1.4,'sawtooth',.16,50);TP.phase='talk';tpTalk('a')},2400);
  ts.push(()=>clearTimeout(h));
}
function tpDlg(who,text,opts){
  const d=$('#tpDlg');if(!d)return;d.hidden=false;$('#tpWho').textContent=who;const s=$('#tpSay'),o=$('#tpOpts');o.innerHTML='';
  const stop=typeText(s,text,12);const show=()=>{o.innerHTML=opts.map((p,i)=>`<button type="button" class="tp-opt" data-i="${i}">${esc(p.x)}${p.sub?`<small>${esc(p.sub)}</small>`:''}</button>`).join('');$$('.tp-opt',o).forEach((b,i)=>b.addEventListener('click',()=>{sfx.click();opts[i].f()}));const f=$('.tp-opt',o);if(f)try{f.focus({preventScroll:true})}catch(e){}};
  const iv=setTimeout(()=>{stop();show()},REDUCED?0:Math.min(1800,text.length*12+250));TP.cleanup.push(()=>clearTimeout(iv));
  $('#tpSay').onclick=()=>{stop();clearTimeout(iv);if(!o.children.length)show()};
}
function tpTalk(id){
  const n=TP.n,g=tpG(n),nd=TALK[n][id];TP.phase='talk';
  tpDlg(g.name,nd.t,nd.o.map(p=>({x:p.x,sub:p.act==='hint'?'Obtienes una pista y una vida extra':p.act==='hard'?'Desafío: guardiana más fuerte · doble recompensa':p.act==='fight'?'Comenzar la prueba':'',f:()=>{
    tpDlg(g.name,p.r,[{x:'Continuar',f:()=>{
      if(p.act==='hint'){TP.hint=true;toast&&toast('Pista obtenida: +1 vida en el combate');comp.react&&comp.react('hint');tpTalk('go')}
      else if(p.act==='hard'){TP.hard=true;toast&&toast('Desafío aceptado: recompensa doble');tpTalk('go')}
      else if(p.act==='fight')tpStartGame();
      else tpTalk(p.n)}}]);
    const a=$('#tpActor');a&&a.classList.toggle('angry',p.act==='hard')}})));
}
TALK.forEach(t=>{if(t)t.go={t:'',o:[{x:'Aceptar el desafío',act:'fight',r:'Que así sea.'}]}});
const tpGo=n=>TPL[n].pre;
/* ----- minijuego: marco común ----- */
function tpStartGame(){
  const n=TP.n,G=GAMES[n],g=tpG(n);TP.phase='game';tpStopGame();$('#tpDlg').hidden=true;
  const gm=$('#tpGame'),lvl=TP.assist?-1:TP.hard?1:0;
  const lives0=G.lives?G.lives({pick:(a,b,h)=>lvl<0?b:lvl>0?h:a}):3,lv=lives0+(TP.hint?1:0);
  gm.classList.add('on');
  gm.innerHTML=`<div class="mg-head"><h3>${esc(G.name)}</h3><div class="mg-hud"><span class="hearts" id="mgH" aria-label="Vidas"></span><span>${esc(g.name)}</span><span class="ebar" role="progressbar" aria-label="Vida del guardián"><b id="mgE"></b></span></div></div><p class="mg-how">${G.how}</p><div class="mg-arena" id="mgA"></div>`;
  const a=$('#mgA'),hp=$('#tpHp');hp.hidden=false;$('b',hp).style.width='100%';$('#tpSt').textContent='Vigilante';$('#tpActor').classList.remove('weak','angry');
  let lives=lv,over=false,stoppers=[],started=false;
  const hearts=()=>{$('#mgH').textContent='♥'.repeat(Math.max(0,lives))+'♡'.repeat(Math.max(0,lv-lives))};hearts();
  const c={level:lvl,hint:TP.hint,over:false,
   pick:(a1,b,h)=>lvl<0?b:lvl>0?h:a1,
   listen(t,ev,fn,o){t.addEventListener(ev,fn,o);stoppers.push(()=>t.removeEventListener(ev,fn,o))},
   raf(fn){let on=true,last=performance.now();const f=now=>{if(!on||over)return;const dt=Math.min(.05,(now-last)/1000);last=now;fn(dt);requestAnimationFrame(f)};requestAnimationFrame(f);stoppers.push(()=>{on=false})},
   timer(fn,ms){const t=setTimeout(()=>{if(!over)fn()},ms);stoppers.push(()=>clearTimeout(t))},
   onStop(f){stoppers.push(f)},
   hit(fr){const pct=Math.round(clamp(1-fr,0,1)*100);$('b',hp).style.width=pct+'%';$('#mgE').style.width=pct+'%';$('#tpSt').textContent=pct<25?'Debilitado':pct<60?'Furioso':'Vigilante';const ac=$('#tpActor');ac.classList.remove('hit');void ac.offsetWidth;ac.classList.add('hit');ac.classList.toggle('weak',pct<25);dogReact&&dogReact('happy')},
   hurt(){if(over)return;lives--;hearts();arenaShake();comp.react&&comp.react('ko');if(lives<=0)c.lose()},
   win(){if(over)return;end(true)},lose(){if(over)return;end(false)}};
  const arenaShake=()=>{a.classList.remove('shake');void a.offsetWidth;a.style.animation='actHit .3s';setTimeout(()=>a.style.animation='',320)};
  $('#mgE').style.width='100%';
  const end=win=>{over=true;c.over=true;stoppers.forEach(f=>{try{f()}catch(e){}});stoppers=[];TP.stop=null;tpResult(win,lives)};
  TP.stop=()=>{over=true;c.over=true;stoppers.forEach(f=>{try{f()}catch(e){}});stoppers=[]};
  const ov=document.createElement('div');ov.className='mg-ov';ov.innerHTML=`<h4>${esc(G.name)}</h4><p>${G.skill}${TP.hard?' · <b>Modo desafío</b>':''}${TP.assist?' · <b>Modo asistido</b>':''}</p><p>${G.how}</p><div class="row"><button class="btn" id="mgGo" type="button">¡Empezar!</button></div>`;
  a.appendChild(ov);$('#mgGo').addEventListener('click',()=>{ov.remove();sfx.click();started=true;aud.setMood(n===7?'c7':'reto');G.run(a,c)});
  setTimeout(()=>{try{$('#mgGo').focus({preventScroll:true})}catch(e){}},100);
}
function tpStopGame(){if(TP.stop)TP.stop()}
function tpResult(win,lives){
  const n=TP.n,g=tpG(n),a=$('#mgA');if(!a)return;const ov=document.createElement('div');ov.className='mg-ov';
  if(win){
    const coin=100+lives*25+(TP.hard?100:0)+(TP.hint?0:25);P.d.coins=(P.d.coins|0)+coin;P.d.stats.mg=(P.d.stats.mg|0)+1;P.save();
    fx.ok();aud.fanfare&&aud.fanfare();dogReact&&dogReact('happy');playerCheer&&playerCheer(2000);
    ov.innerHTML=`<h4>¡${esc(g.name)} cede!</h4><p>Has superado la prueba de habilidad. <b>+${coin} puntos de expedición.</b></p><p>${n===7?'La Sombra se debilita… ya solo queda recordar.':'Ahora, el sello final: la prueba de sabiduría.'}</p><div class="row"><button class="btn" id="mgNext" type="button">${n===7?'Liberar la cumbre':'Continuar'}</button></div>`;
    a.appendChild(ov);$('#mgNext').addEventListener('click',()=>{sfx.click();tpAfterGame()});try{$('#mgNext').focus()}catch(e){}
  }else{
    TP.fails++;fx.bad();
    ov.innerHTML=`<h4>Has caído…</h4><p>${esc(comp.line?comp.line(g.ko||['La sombra gana esta vez.']):'Inténtalo otra vez.')} Nada se bloquea: puedes reintentarlo.</p><div class="row"><button class="btn" id="mgRe" type="button">Reintentar</button>${TP.fails>=2&&!TP.assist?'<button class="btn" id="mgAs" type="button">Modo asistido (más fácil)</button>':''}<button class="btn" id="mgSk" type="button" style="opacity:.8">${n===7?'Continuar sin combate':'Saltar el minijuego'}</button></div>`;
    a.appendChild(ov);$('#mgRe').addEventListener('click',()=>{sfx.click();tpStartGame()});const as=$('#mgAs');as&&as.addEventListener('click',()=>{TP.assist=true;sfx.click();tpStartGame()});$('#mgSk').addEventListener('click',()=>{sfx.click();tpAfterGame(true)});try{$('#mgRe').focus()}catch(e){}
  }
}
function tpAfterGame(skipped){
  const n=TP.n;$('#tpGame').classList.remove('on');
  if(n===7){tpPurify(()=>{const cb=TP.onDone;tpClose();cb&&cb()});return}
  aud.setMood('reto');
  openEncounter(n,Object.assign({},TP.opts,{direct:true,fromTemple:true}));
}
/* purificación: el guardián se libera, vuelve la luz */
function tpPurify(done){
  const el=$('#temple'),a=$('#tpActor');if(!el){done&&done();return}
  const enc=$('#encounter');if(enc)enc.style.visibility='hidden';$('#tpDlg').hidden=true;$('#tpGame').classList.remove('on');
  const hp=$('#tpHp');hp&&(hp.hidden=true);a&&a.classList.remove('hit','angry');a&&a.classList.add('free');el.classList.add('tp-lit');
  aud.fanfare&&aud.fanfare();sfx.open&&sfx.open();toast&&toast(tpG(TP.n).win);comp.react&&comp.react('unlock');dogReact&&dogReact('happy');playerCheer&&playerCheer(2600);
  const nr=$('#tpNarr');nr&&(nr.textContent=tpG(TP.n).win,nr.classList.add('on'));
  const t=setTimeout(()=>{done&&done()},2800);TP.cleanup.push(()=>clearTimeout(t));
}
function tpClose(){
  if(!TP.on)return;tpStopGame();tpClear();TP.on=false;TP.phase='';const el=$('#temple');if(el){ovHide(el);el.innerHTML=''}
  const enc=$('#encounter');if(enc)enc.style.visibility='';
}
function tpExit(){tpClose();closeEncounter&&closeEncounter();if(!state.exp&&!state.chamber)aud.setMood('mapa');else if(state.exp&&!state.chamber)aud.setMood('mundo')}
function initTemples(){
  let el=$('#temple');if(!el){el=document.createElement('div');el.id='temple';el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');el.setAttribute('aria-label','Templo');($('#encounter')||document.body).insertAdjacentElement('beforebegin',el)}
  el.addEventListener('click',e=>{const t=e.target;
    if(t.closest('#tpBack')){sfx.click();tpExit();return}
    if(t.closest('#tpSkipAll')){sfx.click();const n=TP.n,o=TP.opts;if(n===7){const cb=TP.onDone;tpClose();cb&&cb();return}P.d.pass[n]=1;P.save();tpClose();openChamber(n,Object.assign({},o,{bypass:true}))}});
  addEventListener('keydown',e=>{if(e.key!=='Escape'||!TP.on)return;const top=['#unlock','#encounter','#ficha','#journal'].some(s=>{const q=$(s);return q&&q.classList.contains('ov-on')});if(top)return;e.stopImmediatePropagation();e.preventDefault();tpExit()},true);
}
