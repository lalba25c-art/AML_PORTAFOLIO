/* ---------- 16. CONTENIDO DE LA EXPEDICIÓN: guardianas, retos, objetos, datos ---------- */
const ST=(inner,extra='')=>`<svg viewBox="0 0 300 300" aria-hidden="true" ${extra}>${inner}</svg>`;
const GUARD=[
 {n:1,place:'La Puerta del Desierto',name:'La Esfinge del Umbral',role:'Guardiana · Conceptos de seguridad informática',gl:'#ffe9a8',ga:'#B58A45',
  art:()=>ST(`<defs>${grad('gs1',[[0,'#f0d38a'],[1,'#8a6428']])}</defs><g transform="translate(-6 232) scale(.99)" fill="url(#gs1)" stroke="#fff3c8" stroke-width="1.2"><path d="${SPHINX}"/></g><use href="#g-eye" x="118" y="40" width="64" height="64" class="glyph" style="animation:none;opacity:.9"/>`),
  intro:'Alto, viajera. Soy la Esfinge del Umbral. Antes de cruzar esta puerta debes demostrar que comprendes los cimientos de la seguridad informática. No temas: quien se equivoca aprende, y quien aprende puede volver a intentarlo.',
  ok:['Tu mente es firme como la piedra. Sigamos.','Correcto. El umbral te reconoce.'],ko:['No es esa. Mira de nuevo el enigma.','Todavía no, viajera. Escucha con atención.'],win:'Has respondido con sabiduría. La puerta del desierto se abre ante ti.'},
 {n:2,place:'La Sala de los Códices',name:'La Escriba de Thot',role:'Guardiana · Criptografía',gl:'#9ff0e6',ga:'#277C78',
  art:()=>ST(`${SEATED(150,250,1.05,'#0f2e2c','#7fe0d8')}<use href="#g-feather" x="196" y="30" width="60" height="60" class="glyph" style="animation:none"/><path d="M60 270h180M80 282h140" stroke="#7fe0d8" stroke-width="1.5" opacity=".6"/>`),
  intro:'Los códices guardan mensajes que solo pueden leer quienes poseen la clave. Soy la Escriba de Thot. Demuéstrame que sabes cómo se protege un secreto y cómo se comprueba que nadie lo ha alterado.',
  ok:['Bien escrito. Thot sonríe.','Has leído entre líneas. Correcto.'],ko:['Esa clave no abre este código.','Relee el mensaje con calma.'],win:'El código se revela. Puedes entrar en la Sala de los Códices.'},
 {n:3,place:'El Gran Salón de las Columnas',name:'El Arquitecto de Ra',role:'Guardián · Seguridad pasiva: equipos',gl:'#cfe3ff',ga:'#2c5f9a',
  art:()=>ST(`<g fill="#10253f" stroke="#9cc4f2" stroke-width="2"><rect x="62" y="70" width="34" height="190"/><rect x="132" y="50" width="36" height="210"/><rect x="204" y="70" width="34" height="190"/><rect x="48" y="58" width="62" height="16"/><rect x="118" y="38" width="64" height="16"/><rect x="190" y="58" width="62" height="16"/></g><use href="#g-sun" x="116" y="-6" width="68" height="68" class="glyph" style="animation:none"/><path d="M40 262h220" stroke="#9cc4f2" stroke-width="3"/>`),
  intro:'Cada columna sostiene un techo, y cada techo protege máquinas que no pueden detenerse. Soy el Arquitecto de Ra. Dime cómo se protege un equipo del mundo físico y te dejaré pasar.',
  ok:['Bien calculado. La estructura aguanta.','Exacto. Sólido como una columna.'],ko:['Esa columna no soporta el peso. Revisa tu plano.','Replantéalo, explorador.'],win:'Tu diseño es sólido. El Gran Salón se abre.'},
 {n:4,place:'La Cámara del Tesoro',name:'La Custodia del Escarabajo',role:'Guardiana · Seguridad pasiva: almacenamiento',gl:'#ffe9a8',ga:'#8e6c36',
  art:()=>ST(`<g transform="translate(150 160)"><ellipse rx="70" ry="82" fill="#1a3d36" stroke="#E4C77D" stroke-width="3"/><path d="M0-82V82M-70 0h140" stroke="#E4C77D" stroke-width="2" opacity=".7"/><ellipse cx="0" cy="-92" rx="26" ry="18" fill="#1a3d36" stroke="#E4C77D" stroke-width="3"/><path d="M-70 -20q-40-30-52-8M70 -20q40-30 52-8M-66 30q-44 4-48 30M66 30q44 4 48 30" stroke="#E4C77D" stroke-width="3" fill="none"/></g><circle cx="150" cy="250" r="24" fill="#E4C77D" opacity=".25"/>`),
  intro:'El tesoro más valioso es lo que no se pierde. Soy la Custodia del Escarabajo y vigilo discos, copias y espejos. Si sabes cómo conservar los datos, podrás ver el tesoro.',
  ok:['Bien guardado. Nada se pierde.','Correcto. El tesoro está a salvo.'],ko:['Cuidado: así se perderían datos.','No es esa copia. Inténtalo otra vez.'],win:'Los discos se alinean. La Cámara del Tesoro es tuya.'},
 {n:5,place:'El Laboratorio Arqueológico',name:'El Autómata de Anubis',role:'Guardián · Prácticas y laboratorios',gl:'#ffd48a',ga:'#c98b33',
  art:()=>ST(`${ANUBIS(150,262,1.0,'#241408','#f0b45f')}<g transform="translate(228 70)" fill="none" stroke="#ffd48a" stroke-width="3"><circle r="22"/><circle r="8"/><path d="M0-30v10M0 20v10M-30 0h10M20 0h10M-21-21l7 7M14 14l7 7M21-21l-7 7M-14 14l-7 7"/></g>`),
  intro:'Mecanismo antiguo, ejecución exacta. Soy el Autómata de Anubis. Aquí se prueban comandos, contenedores y contraseñas. Demuestra que sabes qué hace cada instrucción.',
  ok:['Comando aceptado. Ejecución correcta.','Resultado esperado. Continuando.'],ko:['Error de ejecución. Revisa la sintaxis.','Salida inesperada. Depura e inténtalo de nuevo.'],win:'Prueba superada. El laboratorio se desbloquea.'},
 {n:6,place:'La Cámara de las Cadenas',name:'La Tejedora de los Bloques',role:'Guardiana · Blockchain y criptografía',gl:'#c9d8ff',ga:'#3a63b8',
  art:()=>ST(`<g fill="none" stroke="#a9c2ff" stroke-width="7"><rect x="40" y="110" width="70" height="40" rx="20"/><rect x="95" y="150" width="40" height="70" rx="20" transform="rotate(0)"/><rect x="130" y="110" width="70" height="40" rx="20"/><rect x="190" y="150" width="40" height="70" rx="20"/><rect x="215" y="110" width="50" height="40" rx="20"/></g><g fill="#173C67" stroke="#E4C77D" stroke-width="2"><rect x="100" y="38" width="100" height="44" rx="4"/></g><text x="150" y="66" text-anchor="middle" font-family="monospace" font-size="16" fill="#E4C77D">0x9f3a…</text>`),
  intro:'Cada bloque se enlaza al anterior con un hilo que nadie puede romper sin que se note. Soy la Tejedora de los Bloques. Muéstrame que entiendes cómo se teje una cadena de confianza.',
  ok:['El hilo aguanta. Bien tejido.','Bloque válido. Sigue la cadena.'],ko:['El hash no coincide. Vuelve a mirarlo.','Un eslabón falla. Inténtalo de nuevo.'],win:'La cadena queda sellada. Puedes pasar.'},
 {n:7,place:'La Cumbre de los Pergaminos',name:'El Santuario',role:'Cumbre · Crónicas personales',gl:'#ffe0bf',ga:'#c2855a',art:()=>ST(`<use href="#g-lotus" x="90" y="90" width="120" height="120" class="glyph" style="animation:none"/>`),intro:'',ok:[],ko:[],win:''}
];

/* Bancos de preguntas · tipos: mc, tf, cmd, order, scn · dificultad 1–3 */
const QUIZ={
1:[
 {t:'mc',d:1,q:'¿Qué propiedad de la información garantiza que solo accedan a ella las personas autorizadas?',o:['Confidencialidad','Integridad','Disponibilidad','Redundancia'],a:0,h:'Piensa en la palabra «secreto».',e:'La confidencialidad evita accesos no autorizados. Junto con la integridad y la disponibilidad forma la tríada CID, base de la seguridad informática.'},
 {t:'tf',d:1,q:'La seguridad pasiva intenta minimizar el daño cuando ya se ha producido un incidente.',a:true,h:'«Pasiva» actúa después, para recuperarse.',e:'Verdadero. La seguridad activa previene (contraseñas, antivirus, cifrado) y la pasiva reduce el impacto (copias de seguridad, SAI, RAID).'},
 {t:'mc',d:2,q:'¿Cuál de estas medidas es de seguridad ACTIVA?',o:['Usar un antivirus actualizado','Hacer una copia de seguridad','Instalar un SAI','Montar un RAID 1'],a:0,h:'La activa intenta evitar que el problema ocurra.',e:'El antivirus previene infecciones. Copias, SAI y RAID son medidas pasivas: reducen las consecuencias.'},
 {t:'scn',d:2,q:'Un empleado recibe un correo urgente de su «banco» con un enlace para confirmar su contraseña. ¿Qué debe hacer?',o:['No pulsar el enlace y avisar al responsable de seguridad','Pulsar rápido para evitar que le bloqueen la cuenta','Reenviarlo a todos sus compañeros','Responder con su contraseña por si acaso'],a:0,h:'Desconfía de la urgencia y de los enlaces inesperados.',e:'Es un intento de phishing: suplanta a una entidad para robar credenciales. Lo correcto es no interactuar y comunicarlo.'},
 {t:'cmd',d:2,q:'¿Qué comando de Linux muestra las direcciones IP de las interfaces de red?',o:['ip a','ls -l','chmod 755','cat /etc/hosts.deny'],a:0,mono:true,h:'La palabra inglesa «address» empieza por «a».',e:'ip a (o ip addr) lista interfaces y direcciones. Conocer la red de un equipo es el primer paso para protegerla.'},
 {t:'order',d:3,q:'Ordena las fases básicas de un análisis de riesgos.',o:['Identificar los activos','Detectar amenazas y vulnerabilidades','Evaluar el riesgo','Aplicar contramedidas'],h:'Primero sabes qué proteges; al final, cómo lo proteges.',e:'Se identifican activos, se detectan amenazas y vulnerabilidades, se evalúa el riesgo y finalmente se aplican contramedidas.'},
 {t:'mc',d:3,q:'¿Qué es una vulnerabilidad?',o:['Una debilidad de un sistema que puede ser explotada','Un programa que borra ficheros','Un tipo de copia de seguridad','Una contraseña cifrada'],a:0,h:'No es el ataque, es la puerta que queda abierta.',e:'Una vulnerabilidad es un punto débil. Una amenaza es lo que podría explotarla.'}
],
2:[
 {t:'mc',d:1,q:'En la criptografía simétrica…',o:['Se usa la misma clave para cifrar y descifrar','Se usan dos claves distintas','No se necesita ninguna clave','Solo se puede cifrar, no descifrar'],a:0,h:'«Simétrica» sugiere que ambos lados son iguales.',e:'Misma clave en ambos extremos: es rápida, pero obliga a compartir la clave de forma segura (ejemplo: AES).'},
 {t:'tf',d:1,q:'Un hash es reversible: a partir de él se puede recuperar el mensaje original.',a:false,h:'Piensa en una huella dactilar.',e:'Falso. Una función hash es de un solo sentido: sirve para comprobar integridad, no para recuperar datos.'},
 {t:'mc',d:2,q:'Para enviarle a Ana un mensaje cifrado con criptografía asimétrica, ¿qué clave usas para cifrarlo?',o:['La clave pública de Ana','La clave privada de Ana','Tu clave privada','Ninguna: basta un hash'],a:0,h:'La clave que cualquiera puede conocer es la pública.',e:'Se cifra con la pública de Ana y solo ella, con su privada, puede descifrar.'},
 {t:'cmd',d:2,q:'¿Qué comando calcula el hash SHA-256 de un fichero en Linux?',o:['sha256sum archivo.txt','encrypt256 archivo.txt','sha-256 -c archivo.txt','gpg -sha archivo.txt'],a:0,mono:true,h:'El nombre del algoritmo y «sum» de «suma de comprobación».',e:'sha256sum muestra el hash de 64 caracteres hexadecimales. Si el fichero cambia un solo bit, el hash cambia por completo.'},
 {t:'mc',d:2,q:'Cifrado César con desplazamiento 3: ¿en qué letra se convierte la A?',o:['D','C','B','Z'],a:0,h:'Cuenta tres letras desde la A: B, C…',e:'A→D, B→E, C→F… Es un cifrado de sustitución muy sencillo y fácil de romper.'},
 {t:'scn',d:3,q:'Descargas un instalador cuya web publica su SHA-256. Al calcularlo, no coincide. ¿Qué indica?',o:['Que el fichero puede estar alterado o dañado: no debes ejecutarlo','Que todo es normal','Que el hash está cifrado','Que tu equipo tiene un SAI defectuoso'],a:0,h:'Un solo bit distinto cambia todo el hash.',e:'Si el hash difiere, el fichero no es el original: descarga corrupta o manipulación. Se descarta y se vuelve a descargar de una fuente fiable.'},
 {t:'order',d:3,q:'Ordena el proceso de una firma digital.',o:['Se calcula el hash del mensaje','Se cifra el hash con la clave privada del emisor','Se envía el mensaje junto con la firma','El receptor verifica la firma con la clave pública'],h:'Primero se resume, luego se firma, luego se envía y se verifica.',e:'La firma garantiza autenticidad e integridad: solo el titular de la clave privada puede producirla y cualquiera puede verificarla.'}
],
3:[
 {t:'mc',d:1,q:'¿Para qué sirve un SAI (UPS)?',o:['Para dar energía durante un corte y proteger de variaciones eléctricas','Para enfriar el servidor','Para cifrar el disco','Para filtrar el tráfico de red'],a:0,h:'Las siglas significan «sistema de alimentación ininterrumpida».',e:'El SAI mantiene el equipo encendido unos minutos y permite un apagado ordenado, además de estabilizar la tensión.'},
 {t:'tf',d:1,q:'Un centro de proceso de datos necesita control de temperatura y humedad.',a:true,h:'Las máquinas también sufren el calor.',e:'Verdadero. El sobrecalentamiento y la humedad degradan o averían el hardware.'},
 {t:'mc',d:2,q:'¿Para qué sirven las fuentes de alimentación redundantes de un servidor?',o:['Para que siga funcionando si falla una de ellas','Para ir más rápido','Para cifrar datos','Para ahorrar espacio de disco'],a:0,h:'Redundante = repuesto en marcha.',e:'Con dos fuentes, el fallo de una no apaga el servidor. Es una medida de disponibilidad.'},
 {t:'scn',d:2,q:'Un servidor se apaga solo cada tarde en una sala sin climatización. ¿Cuál es la causa más probable y su solución?',o:['Sobrecalentamiento: climatizar y controlar la temperatura','Falta de antivirus: instalar uno','Ataque de phishing: formar al personal','Disco lleno: borrar ficheros'],a:0,h:'¿Qué ocurre en una sala cerrada cuando sube la temperatura?',e:'El calor activa las protecciones térmicas. Se resuelve con climatización, buena ventilación y sensores de temperatura.'},
 {t:'cmd',d:2,q:'¿Qué comando muestra en tiempo real el uso de CPU y memoria por proceso?',o:['top','ls','mkdir','echo'],a:0,mono:true,h:'Muestra los procesos «de arriba», los que más consumen.',e:'top se actualiza continuamente y permite detectar procesos que saturan el equipo.'},
 {t:'order',d:3,q:'Ordena lo que ocurre ante un corte de suministro eléctrico con SAI y grupo electrógeno.',o:['Falla el suministro eléctrico','El SAI pasa a alimentar con sus baterías','Arranca el grupo electrógeno','La alimentación vuelve a ser estable'],h:'El SAI cubre el hueco mientras el generador arranca.',e:'El SAI cubre los primeros minutos y el grupo electrógeno toma el relevo para largas interrupciones.'},
 {t:'mc',d:3,q:'En un armario rack, ¿qué es 1U?',o:['Una unidad de altura de 44,45 mm','Un gigabit por segundo','Un tipo de cable','Un nivel de RAID'],a:0,h:'Es una medida de altura.',e:'Un servidor de 2U ocupa dos unidades de rack: unos 89 mm de altura.'}
],
4:[
 {t:'mc',d:1,q:'¿Qué hace un RAID 1?',o:['Duplica los datos en dos discos (espejo)','Reparte los datos sin redundancia','Cifra los datos','Comprime los datos'],a:0,h:'Piensa en un espejo.',e:'En RAID 1 cada disco es copia del otro: si uno falla, el otro conserva todos los datos.'},
 {t:'tf',d:1,q:'RAID 0 ofrece tolerancia al fallo de un disco.',a:false,h:'Solo busca velocidad.',e:'Falso. RAID 0 reparte datos para ganar rendimiento, pero si un disco falla se pierde todo.'},
 {t:'mc',d:2,q:'¿En qué consiste la regla de copias 3-2-1?',o:['3 copias, en 2 soportes distintos, 1 fuera del lugar principal','3 discos, 2 usuarios, 1 contraseña','3 servidores, 2 SAI, 1 antivirus','3 hashes, 2 claves, 1 firma'],a:0,h:'Los tres números cuentan copias, soportes y ubicaciones.',e:'Diversificar copias, soportes y ubicación reduce el riesgo de perderlo todo en un incidente.'},
 {t:'mc',d:2,q:'Una copia de seguridad incremental guarda…',o:['Solo lo que cambió desde la última copia','Todo el sistema siempre','Solo los ficheros borrados','Únicamente las contraseñas'],a:0,h:'«Incremento» = lo nuevo.',e:'Es rápida y ocupa poco, pero para restaurar se necesita la copia completa y la cadena de incrementales.'},
 {t:'scn',d:3,q:'Un NAS con RAID 5 de cuatro discos pierde un disco. ¿Qué es lo más adecuado?',o:['Sustituir el disco cuanto antes y reconstruir, sabiendo que el RAID no sustituye a la copia de seguridad','Ignorarlo: RAID 5 no puede fallar','Formatear los otros tres discos','Apagar el NAS un mes'],a:0,h:'El sistema sigue funcionando, pero en modo degradado.',e:'RAID 5 tolera un fallo. Mientras está degradado, un segundo fallo sería catastrófico, por eso se repara de inmediato.'},
 {t:'order',d:3,q:'Ordena la recuperación de un RAID 1 tras fallar un disco.',o:['Detectar el fallo','Sustituir el disco averiado','Reconstruir el espejo','Verificar que el RAID vuelve a estar sano'],h:'Primero se avisa, luego se repara y se comprueba.',e:'Tras reconstruir el espejo, se comprueba el estado para confirmar que la redundancia está restablecida.'},
 {t:'mc',d:2,q:'¿Qué significa NAS?',o:['Network Attached Storage','Native Access System','Network Antivirus Service','Node Authentication Standard'],a:0,h:'Es almacenamiento conectado a la red.',e:'Un NAS ofrece almacenamiento compartido por red; en las prácticas se montó uno con OpenMediaVault.'}
],
5:[
 {t:'cmd',d:1,q:'¿Qué comando lista los contenedores Docker en ejecución?',o:['docker ps','docker images','docker pull','docker kill'],a:0,mono:true,h:'«ps» viene de «process status».',e:'docker ps muestra los contenedores activos; con -a, también los parados.'},
 {t:'tf',d:1,q:'Un contenedor incluye un sistema operativo completo con su propio núcleo.',a:false,h:'Son ligeros porque comparten algo con el anfitrión.',e:'Falso. Los contenedores comparten el núcleo del sistema anfitrión, por eso son más ligeros que una máquina virtual.'},
 {t:'cmd',d:2,q:'¿Qué comando descarga una imagen sin crear ningún contenedor?',o:['docker pull nginx','docker run nginx','docker start nginx','docker exec nginx'],a:0,mono:true,h:'En inglés, «pull» es «tirar de»: traer algo hacia ti.',e:'docker pull descarga la imagen; docker run la descarga si falta y además crea y arranca el contenedor.'},
 {t:'mc',d:2,q:'¿Qué hace la opción -d en docker run?',o:['Ejecuta el contenedor en segundo plano','Lo borra al terminar','Muestra la versión','Descarga la imagen'],a:0,h:'La d viene de «detached».',e:'Con -d el contenedor funciona «desacoplado» de la terminal.'},
 {t:'mc',d:2,q:'¿Para qué se usa John the Ripper en una práctica de seguridad?',o:['Para auditar la fortaleza de contraseñas a partir de sus hashes','Para montar un RAID','Para crear contenedores','Para enfriar servidores'],a:0,h:'Su misión es comprobar qué tan débil es una contraseña.',e:'Es una herramienta de auditoría: permite detectar contraseñas débiles antes de que lo haga un atacante.'},
 {t:'scn',d:3,q:'Al ejecutar docker ps aparece «permission denied» al conectar con el demonio. ¿Qué es lo más razonable?',o:['Usar sudo o añadir el usuario al grupo docker','Reinstalar el sistema operativo','Desactivar el cortafuegos','Borrar todas las imágenes'],a:0,h:'Se trata de privilegios.',e:'El usuario no tiene permisos sobre el socket de Docker: se usa sudo o se le añade al grupo docker.'},
 {t:'order',d:3,q:'Ordena un flujo básico para lanzar un servidor nginx.',o:['docker pull nginx','docker run -d --name web nginx','docker ps','docker logs web'],h:'Descargar, ejecutar, comprobar, consultar el registro.',e:'Descargas la imagen, lanzas el contenedor en segundo plano, compruebas que corre y revisas su salida.'},
 {t:'cmd',d:2,q:'En Linux, ¿cómo se muestra el valor de la variable NOMBRE?',o:['echo $NOMBRE','print NOMBRE','show %NOMBRE%','ls NOMBRE'],a:0,mono:true,h:'El símbolo de dólar precede al nombre de la variable.',e:'echo $NOMBRE imprime el contenido de la variable de entorno.'}
],
6:[
 {t:'mc',d:1,q:'En una cadena de bloques, cada bloque contiene…',o:['El hash del bloque anterior','Solo contraseñas','Una copia del sistema operativo','Un antivirus'],a:0,h:'Es lo que «encadena» los bloques.',e:'El enlace al hash anterior hace que alterar un bloque antiguo rompa toda la cadena posterior.'},
 {t:'tf',d:1,q:'Si se modifica un bloque antiguo, su hash cambia y deja de coincidir con el enlace del siguiente.',a:true,h:'Un solo bit cambia todo el hash.',e:'Verdadero. Por eso la cadena es resistente a manipulaciones.'},
 {t:'mc',d:2,q:'¿Qué función cumple el hash de un bloque?',o:['Es su huella única de integridad','Cifra el contenido','Guarda las claves privadas','Acelera la red'],a:0,h:'Resume el contenido.',e:'El hash identifica el contenido: si el bloque cambia, su hash también.'},
 {t:'scn',d:2,q:'Alguien altera una transacción de un bloque ya enlazado. ¿Qué ocurre?',o:['El hash del bloque cambia y no coincide con el siguiente: se detecta','Nada, la cadena lo acepta','El bloque se cifra solo','La cadena se borra'],a:0,h:'Piensa en el eslabón que se rompe.',e:'Al cambiar el contenido cambia el hash; el bloque siguiente guardaba el antiguo, así que se detecta la inconsistencia.'},
 {t:'order',d:3,q:'Ordena la creación de un nuevo bloque.',o:['Se reúnen las transacciones','Se incluye el hash del bloque anterior','Se calcula el hash del nuevo bloque','Se añade a la cadena'],h:'Primero los datos, luego el enlace, luego el sello.',e:'Un bloque reúne datos, apunta al anterior, se sella con su hash y entonces se une a la cadena.'},
 {t:'mc',d:2,q:'¿Para qué sirve CyberChef?',o:['Para codificar, decodificar y analizar datos mediante «recetas»','Para montar servidores NAS','Para enfriar un CPD','Para crear contenedores'],a:0,h:'Es una navaja suiza de datos.',e:'Permite encadenar operaciones (Base64, hashes, XOR…) y comprobar resultados paso a paso.'},
 {t:'tf',d:2,q:'Base64 es un método de cifrado seguro.',a:false,h:'Cualquiera puede revertirlo sin clave.',e:'Falso. Base64 es una codificación: cambia la representación, no protege la información.'}
]};

/* Datos curiosos reales (sin cifras dudosas) */
const FACTS=[
 {t:'En 1947, un equipo de la Universidad de Harvard encontró una polilla atrapada en un relé del Harvard Mark II. Se pegó en el cuaderno de registro como el primer «bug» documentado.',s:'Anécdota recogida en el cuaderno del Mark II, atribuida a Grace Hopper y su equipo.'},
 {t:'El primer virus para PC que se propagó de forma amplia, «Brain», apareció en 1986 y lo crearon dos hermanos pakistaníes.',s:'Historia de los virus informáticos.'},
 {t:'Una función hash SHA-256 siempre devuelve 256 bits, es decir, 64 caracteres hexadecimales, sea cual sea el tamaño de la entrada.',s:'Estándar SHA-2.'},
 {t:'El cifrado César se atribuye a Julio César, que desplazaba las letras tres posiciones según relata Suetonio.',s:'Suetonio, Vida de los doce césares.'},
 {t:'El bloque génesis de Bitcoin se minó el 3 de enero de 2009 y el documento original de Satoshi Nakamoto se publicó en 2008.',s:'Bitcoin: A Peer-to-Peer Electronic Cash System.'},
 {t:'La Piedra de Rosetta, con el mismo texto en tres escrituras, fue clave para que Champollion descifrara los jeroglíficos en 1822.',s:'Museo Británico.'},
 {t:'La regla de copias 3-2-1 recomienda tener tres copias, en dos soportes distintos y una fuera del lugar principal.',s:'Buena práctica de copias de seguridad.'},
 {t:'El principio de Kerckhoffs (1883) dice que la seguridad de un sistema criptográfico debe depender solo de la clave, no del secreto del algoritmo.',s:'Auguste Kerckhoffs, La cryptographie militaire.'},
 {t:'La palabra «RAID» procede de un artículo de Patterson, Gibson y Katz (Universidad de Berkeley, 1987-88) sobre matrices redundantes de discos baratos.',s:'Patterson, Gibson y Katz.'},
 {t:'En 1988, el gusano Morris se convirtió en uno de los primeros gusanos de Internet y llevó a crear el primer equipo de respuesta ante emergencias informáticas (CERT).',s:'CERT/CC, Universidad Carnegie Mellon.'}
];
/* Datos asociados a cada cámara (para el desbloqueo) */
const FACT_BY_CH={1:1,2:5,3:6,4:6,5:2,6:4};
FACT_BY_CH[1]=0;FACT_BY_CH[2]=7;FACT_BY_CH[3]=2;FACT_BY_CH[4]=6;FACT_BY_CH[5]=1;FACT_BY_CH[6]=4;

/* Objetos de la habitación de objetos perdidos */
const ICO=(i,c='#E4C77D')=>`<svg viewBox="0 0 64 64" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i}</svg>`;
const ARTIFACTS=[
 {id:'disco',name:'Disco duro de piedra',ch:4,fn:'Almacena datos de forma persistente en platos giratorios.',sec:'Si falla, se pierde la información: por eso existen copias de seguridad y RAID.',svg:()=>ICO('<rect x="10" y="12" width="44" height="40" rx="5"/><circle cx="30" cy="32" r="12"/><circle cx="30" cy="32" r="3"/><path d="M44 18l-6 10"/>')},
 {id:'usb',name:'Llave USB solar',ch:1,fn:'Soporte portátil para transportar ficheros.',sec:'Puede introducir malware o perder datos si se extravía: conviene cifrarla y analizarla.',svg:()=>ICO('<rect x="22" y="6" width="20" height="16"/><rect x="16" y="22" width="32" height="34" rx="4"/><path d="M28 12h2M34 12h2"/><circle cx="32" cy="40" r="5"/>')},
 {id:'rack',name:'Rack del templo',ch:3,fn:'Armario normalizado que aloja servidores y equipos de red.',sec:'Su ubicación, refrigeración y control de acceso son parte de la seguridad física.',svg:()=>ICO('<rect x="14" y="6" width="36" height="52" rx="3"/><path d="M14 18h36M14 30h36M14 42h36"/><circle cx="22" cy="12" r="1.5"/><circle cx="22" cy="24" r="1.5"/><circle cx="22" cy="36" r="1.5"/><circle cx="22" cy="48" r="1.5"/>')},
 {id:'llave',name:'Llave criptográfica',ch:2,fn:'Cadena secreta que permite cifrar, descifrar o firmar.',sec:'Si se filtra la clave privada, se pierde la confidencialidad: debe custodiarse.',svg:()=>ICO('<circle cx="20" cy="32" r="12"/><circle cx="20" cy="32" r="4"/><path d="M32 32h24M48 32v10M54 32v7"/>')},
 {id:'papiro',name:'Pergamino cifrado',ch:2,fn:'Mensaje ilegible sin la clave de descifrado.',sec:'Ilustra el cifrado: proteger el contenido aunque alguien lo intercepte.',svg:()=>ICO('<path d="M16 10h30a6 6 0 0 1 6 6v36H22a6 6 0 0 1-6-6Z"/><path d="M24 22h20M24 30h20M24 38h12"/><path d="M52 52a6 6 0 1 1-6 6"/>')},
 {id:'escarabajo',name:'Escarabajo digital corrupto',ch:5,fn:'Símbolo de un programa malicioso que se multiplica y corrompe ficheros.',sec:'Representa el malware; se combate con antivirus, actualizaciones y prudencia.',svg:()=>ICO('<ellipse cx="32" cy="36" rx="14" ry="18"/><path d="M32 18v36M20 30h-10M44 30h10M20 44h-10M44 44h10M26 18l-4-8M38 18l4-8"/>','#ff8aa8')},
 {id:'amuleto',name:'Amuleto de copia de seguridad',ch:4,fn:'Réplica protegida de los datos en otro lugar.',sec:'Regla 3-2-1: tres copias, dos soportes y una fuera del sitio.',svg:()=>ICO('<path d="M32 6l20 8v16c0 14-9 22-20 28C21 52 12 44 12 30V14Z"/><path d="M24 32l6 6 10-12"/>')},
 {id:'sello',name:'Sello hash',ch:6,fn:'Huella única que resume el contenido de un dato.',sec:'Permite comprobar integridad: si el dato cambia, el sello cambia.',svg:()=>ICO('<circle cx="32" cy="32" r="22"/><path d="M22 26h20M22 32h20M22 38h20M28 20l-3 24M39 20l-3 24"/>')},
 {id:'muro',name:'Ladrillo cortafuegos',ch:1,fn:'Filtra el tráfico permitido y bloquea el no deseado.',sec:'Primera barrera de una red: aplica reglas de entrada y salida.',svg:()=>ICO('<rect x="8" y="14" width="48" height="36"/><path d="M8 26h48M8 38h48M24 14v12M40 26v12M24 38v12"/>')},
 {id:'cable',name:'Cable de red sagrado',ch:3,fn:'Transmite datos entre equipos como un canal de energía.',sec:'Un cable accesible puede ser interceptado: la seguridad física importa.',svg:()=>ICO('<rect x="8" y="22" width="14" height="20" rx="2"/><rect x="42" y="22" width="14" height="20" rx="2"/><path d="M22 32h20"/><path d="M12 28v-4M16 28v-4M46 28v-4M50 28v-4"/>')}
];

/* Pistas por tipo de pregunta (nunca revelan la respuesta) */
const HINT_GEN={mc:'Descarta primero las opciones que claramente no encajan.',tf:'Fíjate en las palabras absolutas, como «siempre» o «nunca».',cmd:'Recuerda para qué sirve cada comando que usamos en el laboratorio.',order:'Piensa qué tiene que existir antes de dar el siguiente paso.',scn:'Elige la opción que reduce el riesgo sin causar nuevos problemas.'};

/* Índice de la bitácora (réplica de la navegación del Google Site) → cámara, laboratorio y apartado */
const ACAD=[
 {t:'Conceptos de Seguridad Informática',n:1},
 {t:'Situación actual en la ciberseguridad',n:1,anchor:'#c1-situacion'},
 {t:'Docker',n:5,lab:'docker'},
 {t:'Criptografía',n:2},
 {t:'Blockchain',n:6,lab:'blockchain'},
 {t:'Seguridad pasiva',n:3,alt:[['Equipos',3],['Almacenamiento',4]]},
 {t:'Ubicación del CPD',n:3,anchor:'#c3-explicacion'},
 {t:'Proyectos y prácticas',n:5},
 {t:'Reflexiones del explorador',n:7,chron:'ciberseguridad'}
];

/* Descripción narrativa y lugar de hallazgo de cada reliquia */
const A_EXTRA={
 disco:{story:'Los escribas guardaban los registros del templo en platos de piedra que giraban sin descanso. El tiempo no borró lo que latía en su interior.'},
 usb:{story:'Un pequeño talismán solar que viajaba de mano en mano llevando mensajes. Nadie sabía qué traía de vuelta.'},
 rack:{story:'Los arquitectos de Ra incrustaron armarios de servidores en los muros del templo para que su luz no se apagara jamás.'},
 llave:{story:'Una llave que no abre puertas de madera, sino secretos. Quien la pierde, pierde también lo que protegía.'},
 papiro:{story:'Un pergamino escrito en un lenguaje que solo la clave correcta puede leer. Bajo la arena esperaba a quien supiera buscar.'},
 escarabajo:{story:'Un escarabajo sagrado corrompido por una amenaza antigua. Al purificarlo recuperó su brillo dorado.'},
 amuleto:{story:'Protege lo que importa guardando una réplica lejos del peligro. Los sabios decían: nunca confíes en una sola copia.'},
 sello:{story:'Cada documento del archivo llevaba un sello único: si alguien lo alteraba, la huella cambiaba y la trampa quedaba al descubierto.'},
 muro:{story:'Un ladrillo del gran muro que protege la entrada al archivo. Deja pasar solo a quien tiene permiso.'},
 cable:{story:'Por estos canales de energía viajaban los mensajes entre templos, más rápido que cualquier mensajero.'}
};
ARTIFACTS.forEach(a=>Object.assign(a,A_EXTRA[a.id]||{}));
const FRAG=(k)=>({id:'frag'+k,w:true,name:`Fragmento de clave ${k}/3`,ch:2,fn:'Una parte de una clave secreta partida en tres.',sec:'Una clave repartida en varias partes obliga a custodiar cada una: si falta una, no sirve.',story:'Un trozo de una clave antigua. Dicen que solo reunida con sus hermanas vuelve a abrir algo.',svg:()=>ICO(`<path d="M14 18l22-8 14 14-10 24-26-4Z"/><path d="M24 24l12-4M22 34l16 2" opacity=".6"/><text x="30" y="38" font-size="14" fill="#E4C77D" stroke="none" font-family="Cinzel,serif">${k}</text>`)});
ARTIFACTS.push(FRAG(1),FRAG(2),FRAG(3),{id:'clave',w:true,name:'Clave del Archivo',ch:2,fn:'Clave reconstruida a partir de tres fragmentos.',sec:'Reunir todas las partes de una clave es tan importante como protegerla.',story:'Los tres fragmentos encajan con un chasquido. La clave del Archivo vuelve a estar completa.',svg:()=>ICO('<circle cx="20" cy="32" r="12"/><circle cx="20" cy="32" r="4"/><path d="M32 32h24M48 32v10M54 32v7"/><path d="M8 12l6 6M56 12l-6 6M32 6v8" stroke="#ffe29a"/>','#ffe29a')});
const CORE=()=>ARTIFACTS.filter(a=>!a.w);
const MISSIONS=[
 {id:'estela',t:'Restaurar la estela',d:'Retira la arena de la estela del desierto con el pincel (3 pasadas).',ok:()=>(P.d.sand.n|0)>=3},
 {id:'bicho',t:'Detectar una amenaza informática',d:'Purifica el escarabajo digital corrupto del camino.',ok:()=>!!P.d.purged},
 {id:'sello',t:'Activar un sello hash',d:'Pulsa el sello y observa la huella SHA-256 real.',ok:()=>!!P.d.items.sello},
 {id:'clave',t:'Reconstruir la clave rota',d:'Encuentra los 3 fragmentos de clave escondidos en el mundo.',ok:()=>!!P.d.items.clave},
 {id:'sala',t:'Descubrir la sala secreta',d:'Hay un resplandor bajo la arena, más allá de la séptima pirámide.',ok:()=>!!P.d.room},
 {id:'rel',t:'Recoger las 10 reliquias',d:'Reúne todos los objetos perdidos de la sala secreta y el mundo.',ok:()=>CORE().every(a=>P.d.items[a.id])}
];
