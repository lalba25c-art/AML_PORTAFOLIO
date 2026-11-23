/* ---------- 12. AUDIO: música, viento y efectos (WebAudio, sin archivos externos) ---------- */
const aud={ctx:null,master:null,music:null,wind:null,fx:null,rev:null,on:false,muted:false,vol:.6,timer:null,next:0,step:0,ready:false,
  // Escala Hijaz sobre Re (aire egipcio/oriental)
  N:[146.83,155.56,185.00,196.00,220.00,233.08,277.18,293.66,311.13,369.99,392.00,440.00],idx:7,
  init(){
    if(this.ctx)return true;
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;
    try{this.ctx=new AC()}catch(e){return false}
    const c=this.ctx;
    this.master=c.createGain();const comp=c.createDynamicsCompressor();this.master.connect(comp);comp.connect(c.destination);this.setVol();
    // reverb sintética
    const len=c.sampleRate*3,ib=c.createBuffer(2,len,c.sampleRate);for(let ch=0;ch<2;ch++){const d=ib.getChannelData(ch);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6)}
    this.rev=c.createConvolver();this.rev.buffer=ib;const rg=c.createGain();rg.gain.value=.5;this.rev.connect(rg);rg.connect(this.master);
    this.music=c.createGain();this.music.gain.value=0;this.music.connect(this.master);this.music.connect(this.rev);
    this.fx=c.createGain();this.fx.gain.value=.7;this.fx.connect(this.master);const fr=c.createGain();fr.gain.value=.35;this.fx.connect(fr);fr.connect(this.rev);
    // bordón (drone) Re + La
    [[73.42,'sine',.16],[110,'triangle',.07],[146.83,'sine',.05]].forEach(([f,t,g],i)=>{const o=c.createOscillator();o.type=t;o.frequency.value=f;o.detune.value=(i-1)*4;const og=c.createGain();og.gain.value=g;
      const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=.05+i*.03;lg.gain.value=g*.4;lfo.connect(lg);lg.connect(og.gain);o.connect(og);og.connect(this.music);o.start();lfo.start()});
    // viento del desierto
    const nb=c.createBuffer(1,c.sampleRate*3,c.sampleRate),nd=nb.getChannelData(0);let b0=0;for(let i=0;i<nd.length;i++){b0=.98*b0+.02*(Math.random()*2-1);nd[i]=b0*9}
    const ns=c.createBufferSource();ns.buffer=nb;ns.loop=true;const bp=c.createBiquadFilter();bp.type='bandpass';bp.Q.value=.7;bp.frequency.value=520;
    const lf=c.createOscillator(),lfg=c.createGain();lf.frequency.value=.07;lfg.gain.value=260;lf.connect(lfg);lfg.connect(bp.frequency);
    this.wind=c.createGain();this.wind.gain.value=0;ns.connect(bp);bp.connect(this.wind);this.wind.connect(this.master);ns.start();lf.start();
    this.ready=true;return true;
  },
  setVol(){if(!this.master)return;const g=this.muted?0:Math.pow(this.vol,1.6)*.95;this.master.gain.setTargetAtTime(g,this.ctx.currentTime,.05)},
  start(){
    if(!this.init())return false;
    this.ctx.resume&&this.ctx.resume();this.on=true;const t=this.ctx.currentTime;
    this.music.gain.cancelScheduleAndHoldAtTime?this.music.gain.cancelScheduledValues(t):0;
    this.music.gain.setTargetAtTime(.9,t,1.6);this.wind.gain.setTargetAtTime(.22,t,2);
    this.next=t+.2;this.step=0;clearInterval(this.timer);this.timer=setInterval(()=>this.sched(),220);return true;
  },
  stop(){if(!this.ctx)return;this.on=false;const t=this.ctx.currentTime;this.music.gain.setTargetAtTime(0,t,.5);this.wind.gain.setTargetAtTime(0,t,.8);clearInterval(this.timer);this.timer=null},
  sched(){
    const c=this.ctx,B=.42;
    while(this.next<c.currentTime+1.1){
      const t=this.next,s=this.step%16;
      // percusión (darbuka suave): dum . tek . | tek . dum tek
      if([0,6,10].includes(s))this.dum(t);if([4,8,12,14].includes(s))this.tek(t);
      // melodía generativa
      if(s%2===0&&Math.random()<.62){const w=Math.random();let d=w<.45?0:w<.8?(Math.random()<.5?1:-1):(Math.random()<.5?2:-2);
        if(s===0&&Math.random()<.6)this.idx=Math.random()<.5?7:4;else this.idx=clamp(this.idx+d,0,this.N.length-1);
        this.pluck(t,this.N[this.idx],B*(Math.random()<.3?3:2));
        if(Math.random()<.18&&this.idx<this.N.length-1)this.pluck(t-.07,this.N[this.idx+1],.2,.35);}
      this.next+=B;this.step++;
    }
  },
  pluck(t,f,d,v=1){const c=this.ctx,o=c.createOscillator(),o2=c.createOscillator(),g=c.createGain(),lp=c.createBiquadFilter();
    o.type='triangle';o2.type='sine';o.frequency.value=f;o2.frequency.value=f*2;lp.type='lowpass';lp.frequency.setValueAtTime(3200,t);lp.frequency.exponentialRampToValueAtTime(500,t+d+.8);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.2*v,t+.006);g.gain.exponentialRampToValueAtTime(.0008,t+d+1.2);
    o.connect(lp);o2.connect(lp);lp.connect(g);g.connect(this.music);o.start(t);o2.start(t);o.stop(t+d+1.4);o2.stop(t+d+1.4)},
  dum(t){const c=this.ctx,o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(52,t+.14);g.gain.setValueAtTime(.34,t);g.gain.exponentialRampToValueAtTime(.001,t+.32);o.connect(g);g.connect(this.music);o.start(t);o.stop(t+.35)},
  tek(t){const c=this.ctx,b=c.createBuffer(1,c.sampleRate*.06,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);
    const s=c.createBufferSource();s.buffer=b;const hp=c.createBiquadFilter();hp.type='highpass';hp.frequency.value=1800;const g=c.createGain();g.gain.value=.09;s.connect(hp);hp.connect(g);g.connect(this.music);s.start(t)},
  // efectos de interacción
  tone(f,d,type='sine',v=.2,f2){if(!this.ready||this.muted)return;const c=this.ctx,t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0008,t+d);o.connect(g);g.connect(this.fx);o.start(t);o.stop(t+d+.05)},
  noise(d,f0,f1,v=.4){if(!this.ready||this.muted)return;const c=this.ctx,t=c.currentTime,b=c.createBuffer(1,c.sampleRate*d,c.sampleRate),dt=b.getChannelData(0);for(let i=0;i<dt.length;i++)dt[i]=Math.random()*2-1;
    const s=c.createBufferSource();s.buffer=b;const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.setValueAtTime(f0,t);lp.frequency.exponentialRampToValueAtTime(f1,t+d);const g=c.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+d*.2);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(lp);lp.connect(g);g.connect(this.fx);s.start(t)},
  visibility(){if(!this.ctx)return;if(document.hidden)this.ctx.suspend&&this.ctx.suspend();else if(this.on||!this.muted)this.ctx.resume&&this.ctx.resume()}
};
let lastHover=0;
const sfx={
  click(){aud.tone(660,.5,'sine',.16);aud.tone(990,.6,'sine',.07)},
  hover(){const n=performance.now();if(n-lastHover<140)return;lastHover=n;aud.tone(1320,.12,'sine',.035)},
  open(){aud.noise(1.5,420,60,.55);aud.tone(52,1.3,'sine',.3,38);setTimeout(()=>{aud.tone(440,.9,'sine',.07,880);aud.tone(660,1.1,'sine',.05,1320)},350)},
  close(){aud.noise(1,300,60,.35);aud.tone(300,.7,'sine',.07,150)},
  chat(){aud.tone(520,.16,'sine',.1,780)},
  reveal(){}
};
function initAudioUI(){
  const bm=$('#btnMusic'),bu=$('#btnMute'),vol=$('#vol');
  bm.classList.add('attn');
  const refresh=()=>{bm.setAttribute('aria-pressed',String(aud.on));bm.setAttribute('aria-label',aud.on?'Pausar música ambiental':'Activar música ambiental');app.classList.toggle('music-on',aud.on&&!aud.muted);
    bu.setAttribute('aria-pressed',String(aud.muted));bu.setAttribute('aria-label',aud.muted?'Activar sonido':'Silenciar todos los sonidos')};
  bm.addEventListener('click',()=>{
    bm.classList.remove('attn');
    if(aud.on){aud.stop()}
    else{
      if(!aud.start()){bm.title='Tu navegador no permite audio en este contexto';bm.setAttribute('aria-label','Audio no disponible');return}
      if(aud.muted){aud.muted=false}aud.setVol();sfx.click();
    }
    refresh();
  });
  bu.addEventListener('click',()=>{if(!aud.init()){bu.setAttribute('aria-pressed',String(!aud.muted));aud.muted=!aud.muted;refresh();return}aud.muted=!aud.muted;aud.setVol();if(!aud.muted)aud.ctx.resume();refresh()});
  vol.addEventListener('input',()=>{aud.vol=vol.value/100;aud.setVol()});
  refresh();
}

/* ---------- 13. GUÍA SADCHURUZEN: chatbot funcional con base de conocimiento local ---------- */
const nrm=s=>String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9ñ\s\.\-:\/]/g,' ').replace(/\s+/g,' ').trim();
const hasAny=(q,list)=>list.some(w=>q.includes(w));
const filled=a=>a&&a.length;
const introText=(i)=>{const b=CONTENT.intro[i].body;return filled(b)?b.filter(x=>typeof x==='string'):null};
const openAct=(n,lab,t)=>[t||('Abrir '+CH[n-1].name),()=>openChamber(n,{lab})];
const goAct=(id,t)=>[t,()=>goto(id)];
const labShots=id=>LABS.find(l=>l.id===id).shots.length;
const CMD={
 'docker':'<b>Docker</b> es una plataforma para ejecutar aplicaciones en <i>contenedores</i>: entornos aislados y ligeros que comparten el núcleo del sistema. En las prácticas aparecen <code>run</code>, <code>ps</code>, <code>images</code>, <code>logs</code>, <code>top</code>, <code>stats</code>, <code>kill</code>, <code>inspect</code>, <code>cp</code>, <code>exec</code> y <code>pull</code>. Pregúntame por cualquiera de ellos.',
 'run':'<code>docker run</code> crea y arranca un contenedor a partir de una imagen (la descarga si no la tiene). Opciones habituales: <code>-d</code> en segundo plano, <code>-it</code> interactivo con terminal, <code>--name</code> le pone nombre y <code>-e VAR=valor</code> define una variable de entorno. Ej.: <code>docker run -d --name nginx10 nginx</code>.',
 'ps':'<code>docker ps</code> lista los contenedores en ejecución. Con <code>-a</code> muestra también los parados y con <code>-n 1</code> solo el último contenedor lanzado.',
 'images':'<code>docker images</code> muestra las imágenes descargadas en el equipo. Con una tubería, <code>docker images | grep node</code>, filtra solo las líneas que contienen «node».',
 'logs':'<code>docker logs nombre</code> muestra lo que el contenedor ha escrito en su salida estándar. En un nginx, por ejemplo, aparecen las peticiones que ha recibido.',
 'top':'<code>docker top nombre</code> lista los procesos que se están ejecutando dentro del contenedor, como un <code>ps</code> del contenedor.',
 'stats':'<code>docker stats nombre</code> muestra en vivo el consumo del contenedor: CPU, memoria, red y entrada/salida de disco.',
 'kill':'<code>docker kill nombre</code> envía una señal de terminación inmediata (SIGKILL) al contenedor. <code>docker stop</code>, en cambio, le pide parar con calma (SIGTERM) y espera un tiempo.',
 'inspect':'<code>docker inspect</code> devuelve en JSON toda la configuración de una imagen o contenedor. Filtrando con <code>| grep NODE_VERSION</code> se localiza un dato concreto, como la versión de Node de la imagen.',
 'cp':'<code>docker cp</code> copia ficheros entre el equipo anfitrión y un contenedor. Ej.: <code>docker cp fichero.txt nginx10:/tmp</code> lo copia a la carpeta /tmp del contenedor.',
 'exec':'<code>docker exec -it nombre bash</code> abre una terminal dentro de un contenedor que ya está en marcha; sin <code>-it</code> ejecuta un único comando, como <code>docker exec nginx10 ls /tmp</code>.',
 'pull':'<code>docker pull imagen</code> descarga una imagen desde el repositorio (Docker Hub) sin crear ningún contenedor.',
 'start':'<code>docker start nombre</code> vuelve a arrancar un contenedor que estaba parado, conservando su contenido.',
 'sudo':'<code>sudo</code> ejecuta un comando con privilegios de administrador. En Docker hace falta cuando tu usuario no pertenece al grupo docker; sin él aparece «permission denied» al hablar con el demonio.',
 'grep':'<code>grep</code> filtra las líneas que contienen un texto. Con una tubería (<code>|</code>) recibe la salida de otro comando y deja solo lo que te interesa.',
 'psql':'<code>psql</code> es el cliente de línea de comandos de PostgreSQL. Dentro, <code>\\l</code> lista las bases de datos y <code>\\q</code> sale.',
 'john':'<b>John the Ripper</b> es una herramienta de auditoría de contraseñas: compara hashes con candidatos para comprobar su fortaleza. Con <code>john fichero</code> lanza el análisis, con <code>--format=</code> indicas el tipo de hash, con <code>--show</code> muestra las ya descubiertas y con <code>--test</code> mide el rendimiento. Úsalo solo en entornos de laboratorio autorizados.'
};
const KB=[
 {id:'hola',m:q=>hasAny(q,['hola','buenas','hey','quien eres','como te llamas','presentate','eres tu']),r:()=>({h:`Soy <b>Sadchuruzen</b>, guardiana de este archivo y tu compañera de expedición. Puedo orientarte por el mapa, contarte qué guarda cada pirámide, decirte dónde están las evidencias y explicarte comandos como <code>docker</code> o <code>john</code>. ¿Por dónde empezamos?`})},
 {id:'asig',m:q=>hasAny(q,['que es la asignatura','asignatura','seguridad informatica','materia']),r:()=>{const t=introText(0);return t?{h:t.map(p=>`<p>${esc(p)}</p>`).join('')}:{h:`El texto académico completo sobre la asignatura todavía no se ha inscrito en el archivo; tiene reservado su espacio en la <b>Gran inscripción</b>. Lo que sí sé es el marco: esto es el portafolio de <b>Seguridad Informática</b> de 2.º de Grado Medio de Sistemas Microinformáticos y Redes.`,a:[goAct('inscripcion','Ir a la inscripción')]}}},
 {id:'form',m:q=>hasAny(q,['formacion','smr','ciclo','grado medio','en que consiste']),r:()=>{const t=introText(1);return t?{h:t.map(p=>`<p>${esc(p)}</p>`).join('')}:{h:`La explicación de la formación aún no está inscrita. Está prevista en la Gran inscripción. El marco: 2.º de Grado Medio de Sistemas Microinformáticos y Redes (SMR).`,a:[goAct('inscripcion','Ver la inscripción')]}}},
 {id:'eval',m:q=>hasAny(q,['primera evaluacion','evaluacion','1.a eval','trimestre']),r:()=>{const t=introText(2);return t?{h:t.map(p=>`<p>${esc(p)}</p>`).join('')}:{h:`El resumen de la primera evaluación todavía no se ha incorporado. Mientras tanto, los temas trabajados tienen cada uno su cámara: Tema 1 a Tema 4, más prácticas, blockchain y crónicas.`,a:[goAct('mapa','Ir al mapa')]}}},
 {id:'port',m:q=>hasAny(q,['portafolio','portfolio','que representa']),r:()=>{const t=introText(3);return t?{h:t.map(p=>`<p>${esc(p)}</p>`).join('')}:{h:`Este portafolio es el archivo de trabajo de <b>${esc(CONFIG.author)}</b> en Seguridad Informática: siete cámaras con la teoría, las prácticas, las evidencias y las reflexiones personales. El texto explicativo definitivo se inscribirá en la Gran inscripción.`,a:[goAct('inscripcion','Ver la inscripción')]}}},
 {id:'mapa',m:q=>hasAny(q,['mapa','navegar','explorar','como empiezo','como uso','como funciona','moverme','recorrido']),r:()=>({h:`<p>Baja con la rueda o el dedo hasta el <b>mapa</b>. Cada <b>pirámide</b> es la puerta de una cámara: acércate y se ilumina; pulsa para entrar.</p><ul><li>Con teclado: <code>Tab</code> para recorrer las pirámides y <code>Enter</code> para entrar.</li><li>En el móvil, desliza el mapa a los lados.</li><li>Debajo del mapa hay un índice en lista.</li><li>Para volver: «Volver al mapa» o <code>Esc</code>.</li></ul>`,a:[goAct('mapa','Ir al mapa')]})},
 {id:'pir',m:q=>hasAny(q,['piramide','camara','que contiene','que hay en','cada piramide','capitulo','contenido']),r:()=>({h:`<p>Siete cámaras:</p><ul>${CH.map(c=>`<li><b>${c.name}</b> · ${esc(c.title)}${c.n<5?` — ${esc(c.sub)}`:''}</li>`).join('')}</ul><p>Los contenidos académicos de los Temas 1–4 y los laboratorios están desarrollados en sus cámaras. La Cámara 7 reúne las tres crónicas personales.</p>`,a:CH.map(c=>openAct(c.n,null,String(c.n).padStart(2,'0')))})},
 {id:'prac',m:q=>hasAny(q,['practica','laboratorio','que se hizo','que hicisteis','que hizo','actividades']),r:()=>({h:`<p>Los laboratorios con evidencias reales son:</p><ul>${LABS.map(l=>`<li><b>${esc(l.title)}</b> · Cámara ${String(l.cam).padStart(2,'0')}${l.shots.length?` (${l.shots.length} capturas)`:' (espacio preparado)'}</li>`).join('')}</ul>`,a:[openAct(5),openAct(6)]})},
 {id:'cmds',m:q=>hasAny(q,['comando','significan','que hace']),r:()=>({h:`Dime qué comando quieres entender: <code>docker run</code>, <code>ps</code>, <code>images</code>, <code>logs</code>, <code>top</code>, <code>stats</code>, <code>kill</code>, <code>inspect</code>, <code>cp</code>, <code>exec</code>, <code>pull</code>, <code>start</code>, <code>sudo</code>, <code>grep</code>, <code>psql</code> o <code>john</code>.`})},
 {id:'cyber',m:q=>hasAny(q,['cyberchef','cyber chef','vigenere','cesar','rot13','frecuencia']),r:()=>({h:`<b>CyberChef</b> es una herramienta web (de GCHQ) para cifrar, descifrar y transformar datos encadenando «recetas». En el examen práctico del 14/10/26 se usó con <b>Vigenère</b> (clave SMR), <b>César</b> deducido con <i>Frequency distribution</i> y <b>ROT13</b>. Esas capturas están en la Cámara 06.`,a:[openAct(6,'cyberchef','Ver CyberChef')]})},
 {id:'bc',m:q=>hasAny(q,['blockchain','aulacoin','criptomoneda','minar','monedero','cripto']),r:()=>({h:`<b>AulaCoin</b> fue la práctica de blockchain de la sesión 2: crear un monedero, minar, pagar a un compañero y lanzar «retos hacker» contra la red. Su espacio está en la Cámara 06; la ficha no incluye capturas, así que está preparado para incorporarlas.`,a:[openAct(6,'blockchain','Ir a AulaCoin')]})},
 {id:'cpd',m:q=>hasAny(q,['cpd','centro de proceso','arena','prueba de estres']),r:()=>({h:`<b>CPD Arena</b> (Misión 1 · Construye tu CPD) consiste en diseñar un centro de proceso de datos y someterlo a pruebas de estrés. Encontrarás ${labShots('cpd')} capturas reales en la Cámara 05; el contenido teórico relacionado pertenece al Tema 3.`,a:[openAct(5,'cpd','Ver CPD Arena'),openAct(3)]})},
 {id:'omv',m:q=>hasAny(q,['omv','openmediavault','nas','raid','copias de seguridad','virtualbox']),r:()=>({h:`La tarea <b>NAS con OpenMediaVault</b> monta un NAS en VirtualBox (RAID 5, carpeta compartida por SMB y FTP) como destino de copias de seguridad. Hay ${labShots('omv')} capturas en la Cámara 05; la teoría está en el Tema 4.`,a:[openAct(5,'omv','Ver el NAS'),openAct(4)]})},
 {id:'john',m:q=>hasAny(q,['john the ripper','john','hash','contrasena','password']),r:()=>({h:CMD.john+`<p>Las ${labShots('john')} capturas están en la Cámara 05.</p>`,a:[openAct(5,'john','Ver John the Ripper')]})},
 {id:'evid',m:q=>hasAny(q,['evidencia','captura','pantallazo','donde encuentro','donde estan','imagenes']),r:()=>({h:`Las <b>evidencias</b> son capturas reales de terminales y herramientas. Están en los laboratorios de la <b>Cámara 05</b> (Docker, CPD Arena, OpenMediaVault, John the Ripper y Lynis), la <b>Cámara 02</b> (criptografía clásica y GPG/MD5) y la <b>Cámara 06</b> (CyberChef). Haz clic en una captura para ampliarla: dentro, rueda para el zoom y flechas para cambiar de imagen.`,a:[openAct(5),openAct(6)]})},
 {id:'cron',m:q=>hasAny(q,['cronica','reflexion','gratitud','perdon','adrian','explorador','personal']),r:()=>({h:`<p>La <b>Cámara 07</b> reúne las crónicas del explorador:</p><ul>${CONTENT.cronicas.map(c=>`<li>${esc(c.title)}</li>`).join('')}</ul><p>Las tres crónicas ya están reunidas en esa cámara: ciberseguridad, gratitud y perdón, y la charla de Adrián.</p>`,a:[openAct(7)]})},
 {id:'vol',m:q=>hasAny(q,['volver','regresar','salir','atras']),r:()=>({h:`Pulsa <b>Volver al mapa</b> (arriba a la izquierda de cada cámara), la tecla <code>Esc</code>, o usa la navegación lateral. Tu posición en el mapa se conserva.`,a:[goAct('mapa','Volver al mapa')]})},
 {id:'son',m:q=>hasAny(q,['musica','sonido','audio','volumen','silenciar','viento']),r:()=>({h:`Arriba a la derecha tienes los controles: <b>reproducir/pausar</b> la música ambiental (también activa el viento del desierto), el <b>volumen de la música</b> y el botón de <b>silenciar todo</b>. El sonido no empieza solo: lo activas tú.`})},
 {id:'aut',m:q=>hasAny(q,['autor','quien hizo','quien lo hizo','de quien es']),r:()=>({h:`Este portafolio pertenece a <b>${esc(CONFIG.author)}</b>, 2.º SMR.`})},
 {id:'gra',m:q=>hasAny(q,['gracias','genial','perfecto','vale']),r:()=>({h:'¡Para eso estoy! Si necesitas algo más del recorrido, aquí sigo vigilando el archivo.'})}
];
Object.keys(CMD).forEach(k=>{
  KB.splice(KB.length-6,0,{id:'cmd-'+k,m:q=>{
    if(k==='docker')return /\bdocker\b/.test(q)&&!/docker (run|ps|images|logs|top|stats|kill|inspect|cp|exec|pull|start)/.test(q)&&!hasAny(q,['practica','laboratorio']);
    if(k==='john')return false;
    const re=new RegExp('\\b'+k+'\\b');
    return new RegExp('docker '+k+'\\b').test(q)||(re.test(q)&&hasAny(q,['comando','significa','hace','sirve','docker','para que']));
  },r:()=>({h:CMD[k]})});
});
function knowledgeSnapshot(){return{config:{title:CONFIG.title,author:CONFIG.author},chambers:CH.map(c=>({n:c.n,title:c.title,sub:c.sub})),labs:LABS.map(l=>({id:l.id,title:l.title,captures:l.shots.length})),content:CONTENT}}
const hist=[];
function answerLocal(text){
  const q=nrm(text);
  for(const e of KB){try{if(e.m(q))return e.r()}catch(err){}}
  return{h:`Todavía no tengo ese conocimiento en mi base. Puedo ayudarte con: el <b>mapa</b>, el contenido de cada <b>cámara</b>, las <b>prácticas</b> y sus <b>evidencias</b>, el significado de los <b>comandos</b> (docker, john…), <b>CyberChef</b>, las <b>crónicas</b> y cómo <b>volver al mapa</b>.`};
}
async function askRemote(q){
  if(!CONFIG.chatEndpoint)return null;
  try{const ctl=new AbortController();const to=setTimeout(()=>ctl.abort(),9000);
    const r=await fetch(CONFIG.chatEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,history:hist.slice(-8),knowledge:knowledgeSnapshot()}),signal:ctl.signal});clearTimeout(to);
    if(!r.ok)throw new Error('http');const j=await r.json();return j&&j.reply?{h:`<p>${esc(j.reply)}</p>`}:null}catch(e){return null}
}
const guide={open:false,min:false,started:false,
  el:$('#gPanel'),msgs:$('#gMsgs'),launch:$('#gLaunch'),input:$('#gInput'),
  say(role,html,acts){
    const d=document.createElement('div');d.className='msg '+(role==='me'?'me':'bot');
    d.innerHTML=(role==='me'?'':`<div class="mav"><img src="${$('.g-head .av img').src}" alt=""></div>`)+`<div class="bub">${html}</div>`;
    if(acts&&acts.length){const w=document.createElement('div');w.className='acts';acts.forEach(a=>{const b=document.createElement('button');b.type='button';b.textContent=a[0];b.addEventListener('click',()=>{sfx.click();a[1]();if(innerWidth<700&&!/Volver|mapa/i.test(a[0])===false){}});w.appendChild(b)});$('.bub',d).appendChild(w)}
    this.msgs.appendChild(d);this.msgs.scrollTop=this.msgs.scrollHeight;return d;
  },
  async ask(text){
    text=text.trim();if(!text)return;this.say('me',esc(text));hist.push({role:'user',text});sfx.chat();
    const ty=this.say('bot','<span class="typing" aria-label="Sadchuruzen está escribiendo"><i></i><i></i><i></i></span>');
    const t0=performance.now();let ans=await askRemote(text);if(!ans)ans=answerLocal(text);
    const wait=Math.max(0,480+Math.min(700,(ans.h||'').length*1.2)-(performance.now()-t0));
    setTimeout(()=>{ty.remove();this.say('bot',ans.h,ans.a);hist.push({role:'assistant',text:ans.h.replace(/<[^>]+>/g,'')});sfx.chat()},wait);
  },
  show(){
    this.open=true;this.min=false;this.el.classList.add('open');this.el.classList.remove('min');this.el.setAttribute('aria-hidden','false');this.launch.setAttribute('aria-expanded','true');$('#gTip').classList.remove('show');comp.mood&&comp.mood('happy',2500);
    if(!this.started){this.started=true;this.say('bot',`¡Hey, yuhú! Soy <b>Sadchuruzen</b>, tu guardiana y compañera de expedición. ¿Listos para la aventura?`)}
    setTimeout(()=>this.input.focus({preventScroll:true}),350);
  },
  close(){this.open=false;this.el.classList.remove('open');this.el.setAttribute('aria-hidden','true');this.launch.setAttribute('aria-expanded','false');try{this.launch.focus({preventScroll:true})}catch(e){}},
  toggleMin(){this.min=!this.min;this.el.classList.toggle('min',this.min);$('#gMin').setAttribute('aria-label',this.min?'Expandir conversación':'Minimizar conversación');$('#gMinIc').setAttribute('d',this.min?'M5 9l7 7 7-7':'M5 15l7-7 7 7')}
};
function initGuide(){
  const chips=['¿Qué es la asignatura?','¿Cómo exploro el mapa?','¿Qué hay en cada pirámide?','¿Qué prácticas se hicieron?','¿Qué significa docker run?','¿Dónde están las evidencias?','¿Qué es CyberChef?','¿Qué hay en las crónicas?','¿Cómo vuelvo al mapa?'];
  $('#gChips').innerHTML=chips.map(c=>`<button type="button">${c}</button>`).join('');
  $('#gChips').addEventListener('click',e=>{const b=e.target.closest('button');if(b){sfx.click();if(!guide.open)guide.show();guide.ask(b.textContent)}});
  guide.launch.addEventListener('click',()=>{sfx.click();guide.open?guide.close():guide.show()});
  $('#gClose').addEventListener('click',()=>{sfx.click();guide.close()});
  $('#gMin').addEventListener('click',()=>{sfx.click();guide.toggleMin()});
  $('#gForm').addEventListener('submit',e=>{e.preventDefault();const v=guide.input.value;guide.input.value='';guide.ask(v)});
  guide.launch.classList.add('ready');
  // saludo discreto tras la entrada
  setTimeout(()=>{if(!guide.open&&!guide.started&&!$('#story.ov-on'))comp.tip('¡Hola, exploradora! Soy Sadchuruzen. Estoy preparada para descubrir los secretos del Nilo contigo.',6500)},5200);
}

