/* ============================================================
   data.js · CONFIGURACIÓN, CÁMARAS, CONTENIDO y BASE DE CONOCIMIENTO
   Aquí es donde se integran los textos académicos reales.
   ============================================================ */
window.CONFIG = {
  title: 'El Archivo Sagrado del Nilo',
  kicker: 'Seguridad Informática · 2.º SMR',
  subtitle: 'Portafolio de exploración',          // ← texto provisional, se sustituirá
  author: 'Laura Sofía Alba Medina',               // ← editable
  guideName: 'SADCHURUZEN',
  showSlotHints: true,                             // false = oculta los avisos de «espacio preparado»
  /* Audio: por defecto se sintetiza con Web Audio (sin archivos). Para usar una pista real:
     musicUrl: 'https://…/musica.mp3'  (debe permitir CORS y ser HTTPS). Si falla, vuelve a la síntesis. */
  musicUrl: '', windUrl: '',
  /* Arte: para sustituir la ilustración vectorial por tus imágenes de referencia, indica una URL/data-URI.
     Ejemplo: art: { heroBackground: 'https://…/portada.jpg' } (se muestra detrás de las capas). */
  art: { heroBackground: '' },
  /* Chatbot: si algún día se conecta un servicio, indica aquí su URL (ver LEEME). Vacío = solo base local. */
  chat: { endpoint: '', timeoutMs: 12000 }
};

/* Cámaras. `blocks` define qué espacios de contenido tiene cada una. */
window.CHAMBERS = [
  { n: 1, id: 'c1', over: 'Tema 1', title: 'Conceptos sobre Seguridad Informática', epi: 'La Puerta del Desierto', glyph: 'ankh', hue: '#E4C77D',
    lead: 'El umbral del archivo: dónde empieza todo.',
    blocks: ['explicacion', 'actividades', 'capturas', 'resultados', 'reflexion'] },
  { n: 2, id: 'c2', over: 'Tema 2', title: 'Criptografía', epi: 'La Sala de los Códices', glyph: 'reed', hue: '#8fb4d9',
    lead: 'Escrituras ocultas, claves y mensajes cifrados.',
    blocks: ['explicacion', 'actividades', 'comandos', 'capturas', 'resultados', 'reflexion'] },
  { n: 3, id: 'c3', over: 'Tema 3', title: 'Seguridad Pasiva: Equipos', epi: 'El Gran Salón de las Columnas', glyph: 'djed', hue: '#6fd0c4',
    lead: 'El centro de proceso de datos, sus salas y sus protecciones.',
    blocks: ['explicacion', 'actividades', 'capturas', 'resultados', 'reflexion'] },
  { n: 4, id: 'c4', over: 'Tema 4', title: 'Seguridad Pasiva: Almacenamiento', epi: 'La Cámara del Tesoro', glyph: 'scarab', hue: '#c9d68a',
    lead: 'Estrategias de almacenamiento: integridad y disponibilidad de los datos.',
    blocks: ['explicacion', 'actividades', 'comandos', 'capturas', 'resultados', 'reflexion'] },
  { n: 5, id: 'c5', over: 'Prácticas y laboratorios', title: 'Prácticas y laboratorios', epi: 'El Laboratorio Arqueológico', glyph: 'eye', hue: '#f0c26a', labs: true,
    lead: 'Cada práctica es una excavación: comandos, ejecución real y resultado.',
    blocks: [] },
  { n: 6, id: 'c6', over: 'Blockchain y criptografía', title: 'Blockchain, criptografía y actividades relacionadas', epi: 'La Cámara de las Cadenas', glyph: 'feather', hue: '#a9c4e8',
    lead: 'Hashes, firmas, bloques encadenados y la pizarra de CyberChef.',
    blocks: ['explicacion', 'actividades', 'comandos', 'capturas', 'resultados', 'problemas', 'soluciones', 'reflexion'] },
  { n: 7, id: 'c7', over: 'Crónicas del explorador', title: 'Crónicas del explorador', epi: 'El Jardín del Nilo', glyph: 'water', hue: '#f3d9a2', chronicles: true,
    lead: 'Un espacio íntimo para recordar, agradecer y pensar.',
    blocks: [] }
];

/* Títulos y ayudas de cada tipo de bloque */
window.BLOCKS = {
  explicacion: ['Explicación completa', 'Desarrolla aquí la explicación académica completa de este apartado.'],
  actividades: ['Desarrollo de las actividades', 'Cuenta paso a paso qué se hizo, en qué orden y con qué herramientas.'],
  comandos: ['Comandos y código', 'Cada comando con su explicación y la salida obtenida.'],
  capturas: ['Evidencias', 'Capturas reales de ejecuciones: terminales, configuraciones y herramientas.'],
  resultados: ['Resultados obtenidos', 'Qué salió, qué se comprobó y cómo se verificó.'],
  problemas: ['Problemas encontrados', 'Errores, bloqueos y comportamientos inesperados.'],
  soluciones: ['Soluciones', 'Cómo se resolvió cada problema y qué se aprendió.'],
  reflexion: ['Reflexión personal', 'Qué significó este apartado para quien lo exploró.']
};

/* Laboratorios de la Cámara 05 (nombres tomados de los documentos entregados) */
window.LABS = [
  { id: 'docker', title: 'Docker · contenedores', src: 'Examen práctico y prácticas: logs, top, stats, kill, pull, inspect y cp' },
  { id: 'postgres', title: 'Docker · variables de entorno', src: 'Contenedor PostgreSQL con POSTGRES_USER, POSTGRES_PASSWORD y POSTGRES_DB' },
  { id: 'john', title: 'John the Ripper', src: 'Prueba de rendimiento y descifrado de hashes' },
  { id: 'cpd', title: 'CPD Arena', src: 'Misión «Construye tu CPD»: tres pruebas de estrés' },
  { id: 'omv', title: 'NAS con OpenMediaVault', src: 'Tarea 1 · VirtualBox, RAID 5, carpeta compartida, SMB y FTP' }
];

/* Apartados de las Crónicas del explorador */
window.CHRONICLES = [
  ['gratitud', 'Gratitud', 'sun'], ['perdon', 'Perdón', 'water'], ['madurez', 'Madurez personal y aprendizaje', 'feather'],
  ['tecnologia', 'Tecnología y vida cotidiana', 'djed'], ['adrian', 'La charla de Adrián', 'bird'], ['ia', 'Inteligencia artificial y empleo', 'eye'],
  ['musica', 'Música, mapas y datos', 'reed'], ['numeros', 'Taller de reconocimiento de números manuscritos', 'scarab'],
  ['servidores', 'Visita a la sala de equipos y servidores', 'ankh'], ['cableado', 'Organización de los equipos y el cableado', 'was'],
  ['presion', 'Experiencias prácticas y aprendizaje bajo presión', 'sun']
];

/* ============================================================
   CONTENIDO REAL (rellenar aquí). Cada campo vacío muestra un
   «espacio preparado». Admite HTML. Ejemplo:
   CONTENT.c1.explicacion = '<p>Texto…</p>';
   CONTENT.c2.comandos = [{ titulo:'Cifrado César', comando:'echo HOLA | tr A-Z D-ZA-C', explicacion:'…', salida:'KROD' }];
   CONTENT.c1.capturas = [{ src:'https://…/captura.png', cap:'Descripción', antes:'' }];
   ============================================================ */
window.CONTENT = {
  intro: { asignatura: '', formacion: '', evaluacion: '', portafolio: '', exploracion: '' },
  c1: {}, c2: {}, c3: {}, c4: {}, c5: { docker: {}, postgres: {}, john: {}, cpd: {}, omv: {} }, c6: {},
  c7: { gratitud: '', perdon: '', madurez: '', tecnologia: '', adrian: '', ia: '', musica: '', numeros: '', servidores: '', cableado: '', presion: '' }
};

/* ============================================================
   BASE DE CONOCIMIENTO DE LA GUÍA (respuestas locales).
   Añade entradas con { k:[palabras clave sin tildes], a:'respuesta HTML', go:[acciones] }.
   Acciones: {t:'cam',n:5,l:'Ir a la Cámara 05'} · {t:'map',l:'Volver al mapa'} · {t:'sec',id:'inscripcion',l:'…'}
   ============================================================ */
window.KB = [
  { k: ['hola', 'buenas', 'hey', 'saludos', 'buenos dias', 'buenas tardes'], a: 'Saludos, explorador. Soy <b>SADCHURUZEN</b>, guardián de este archivo. Puedo orientarte por el mapa, decirte qué guarda cada pirámide o explicarte los comandos de las prácticas.' },
  { k: ['quien eres', 'quien es sadchuruzen', 'sadchuruzen', 'tu nombre', 'guia', 'guardian', 'como te llamas'], a: 'Me llamo <b>SADCHURUZEN</b> y acompaño al visitante durante todo el recorrido. Mi base de conocimiento es <b>local</b>: respondo con el contenido de esta web, no con una inteligencia artificial conectada.' },
  { k: ['asignatura', 'seguridad informatica', 'que es la asignatura', 'de que trata', 'formacion', 'smr', 'ciclo'], a: 'La asignatura es <b>Seguridad Informática</b>, de 2.º de Grado Medio de Sistemas Microinformáticos y Redes (SMR). Los materiales de esta primera evaluación cubren: Tema 1 (conceptos), Tema 2 (criptografía), Tema 3 (seguridad pasiva: equipos), Tema 4 (seguridad pasiva: almacenamiento), Docker y prácticas de laboratorio. La explicación académica completa aparece en la sección <i>Inscripción</i> cuando se incorpore.', go: [{ t: 'sec', id: 'inscripcion', l: 'Ver la inscripción' }] },
  { k: ['mapa', 'explorar', 'como explorar', 'como navego', 'como se usa', 'como funciona', 'navegar', 'empezar', 'ayuda'], a: 'Baja hasta el <b>mapa</b>: cada pirámide es la entrada a una cámara. Pasa el cursor (o enfócala con el tabulador) para iluminarla y pulsa <b>Enter</b> o haz clic para entrar. Dentro, el botón <b>Volver al mapa</b> (o la tecla Esc) te devuelve aquí sin perder tu sitio.', go: [{ t: 'sec', id: 'mapa', l: 'Ir al mapa' }] },
  { k: ['piramide', 'piramides', 'camaras', 'que contiene', 'que hay', 'indice', 'secciones', 'contenido'], a: 'Siete pirámides, siete cámaras:<br>01 · Conceptos sobre Seguridad Informática<br>02 · Criptografía<br>03 · Seguridad pasiva: equipos<br>04 · Seguridad pasiva: almacenamiento<br>05 · Prácticas y laboratorios<br>06 · Blockchain, criptografía y actividades relacionadas<br>07 · Crónicas del explorador', go: [{ t: 'sec', id: 'mapa', l: 'Abrir el mapa' }] },
  { k: ['camara 1', 'camara 01', 'tema 1', 'conceptos'], a: 'La <b>Cámara 01</b> corresponde al Tema 1: <i>Conceptos sobre Seguridad Informática</i>.', go: [{ t: 'cam', n: 1, l: 'Entrar en la Cámara 01' }] },
  { k: ['camara 2', 'camara 02', 'tema 2'], a: 'La <b>Cámara 02</b> corresponde al Tema 2: <i>Criptografía</i>.', go: [{ t: 'cam', n: 2, l: 'Entrar en la Cámara 02' }] },
  { k: ['camara 3', 'camara 03', 'tema 3', 'cpd', 'centro de proceso', 'sala fria', 'pecera', 'equipos'], a: 'La <b>Cámara 03</b> corresponde al Tema 3: <i>Seguridad Pasiva: Equipos</i>, que trata la ubicación y protección del CPD (centro de proceso de datos). La práctica <b>CPD Arena</b> está documentada con capturas en la Cámara 05.', go: [{ t: 'cam', n: 3, l: 'Entrar en la Cámara 03' }, { t: 'cam', n: 5, l: 'Ver CPD Arena' }] },
  { k: ['camara 4', 'camara 04', 'tema 4', 'almacenamiento', 'raid', 'copias de seguridad', 'backup', 'nas'], a: 'La <b>Cámara 04</b> corresponde al Tema 4: <i>Seguridad Pasiva: Almacenamiento</i>. La práctica del <b>NAS con OpenMediaVault</b> (RAID 5, carpeta compartida, SMB y FTP) tiene sus capturas en la Cámara 05.', go: [{ t: 'cam', n: 4, l: 'Entrar en la Cámara 04' }, { t: 'cam', n: 5, l: 'Ver el NAS' }] },
  { k: ['camara 5', 'camara 05', 'practicas', 'laboratorio', 'laboratorios', 'que practicas', 'que se hizo', 'actividades'], a: 'Prácticas documentadas con capturas reales en la <b>Cámara 05</b>:<br>• Docker: contenedores (examen práctico, logs, top, stats, kill, pull, inspect, cp)<br>• Docker: variables de entorno con PostgreSQL<br>• John the Ripper<br>• CPD Arena (tres pruebas de estrés)<br>• NAS con OpenMediaVault en VirtualBox', go: [{ t: 'cam', n: 5, l: 'Entrar en la Cámara 05' }] },
  { k: ['camara 6', 'camara 06', 'blockchain', 'aulacoin', 'criptomoneda', 'bitcoin', 'monedero', 'minar'], a: 'La <b>Cámara 06</b> reúne blockchain y criptografía aplicada. La ficha de la sesión 2 trabaja <b>AulaCoin</b>: crear un monedero, minar, pagar a un compañero, lanzar «retos hacker» y ver cómo la cadena detecta un bloque modificado.', go: [{ t: 'cam', n: 6, l: 'Entrar en la Cámara 06' }] },
  { k: ['camara 7', 'camara 07', 'cronicas', 'cronica', 'reflexion', 'reflexiones', 'personal', 'gratitud', 'perdon', 'experiencias'], a: 'La <b>Cámara 07</b> son las <i>Crónicas del explorador</i>, con apartados independientes: gratitud, perdón, madurez y aprendizaje, tecnología y vida cotidiana, la charla de Adrián, inteligencia artificial y empleo, música-mapas-datos, el taller de números manuscritos, la visita a la sala de servidores, la organización del cableado y el aprendizaje bajo presión.', go: [{ t: 'cam', n: 7, l: 'Entrar en la Cámara 07' }] },
  { k: ['evidencia', 'evidencias', 'captura', 'capturas', 'pantallazo', 'donde encuentro', 'ampliar', 'zoom'], a: 'Las evidencias son capturas de ejecuciones reales. Están en la <b>Cámara 05</b> (Docker, PostgreSQL, John the Ripper, CPD Arena, OpenMediaVault) y en la <b>Cámara 06</b> (CyberChef). Haz clic en cualquiera para ampliarla; con las flechas pasas a la siguiente y con Esc cierras.', go: [{ t: 'cam', n: 5, l: 'Cámara 05' }, { t: 'cam', n: 6, l: 'Cámara 06' }] },
  { k: ['cyberchef', 'cyber chef', 'vigenere', 'cesar', 'rot13', 'frecuencia', 'cifrado', 'descifrar'], a: '<b>CyberChef</b> es una herramienta web (gchq.github.io/CyberChef) para codificar, cifrar y analizar datos encadenando operaciones («recetas»). En el examen práctico se usó para: descifrar un mensaje con <b>Vigenère</b> (clave SMR), atacar un <b>César</b> sin clave con <i>Frequency distribution</i> (la letra más repetida suele corresponder a la E en castellano) y aplicar <b>ROT13</b>. Las capturas están en la Cámara 06.', go: [{ t: 'cam', n: 6, l: 'Ver capturas de CyberChef' }] },
  { k: ['comando', 'comandos', 'que significan', 'significa', 'terminal'], a: 'Pregúntame por un comando concreto: <i>docker run, ps, images, pull, logs, top, stats, kill, inspect, cp, exec, start, attach</i>, o <i>john --test, --format=crypt, --show</i>, o <i>psql</i>.' },
  { k: ['docker'], a: '<b>Docker</b> ejecuta aplicaciones en <i>contenedores</i>: entornos aislados y ligeros que comparten el núcleo del sistema. Las prácticas de este portafolio usan Debian, nginx, node y postgres. Pregúntame por <i>docker run</i>, <i>logs</i>, <i>top</i>… y te explico cada comando.', go: [{ t: 'cam', n: 5, l: 'Ver las prácticas de Docker' }] },
  { k: ['docker run', 'run'], a: '<code>docker run</code> crea y arranca un contenedor a partir de una imagen (la descarga si no la tiene). Opciones usadas: <code>--name</code> (nombre), <code>-it</code> (terminal interactiva), <code>-d</code> (segundo plano), <code>-e</code> (variable de entorno).' },
  { k: ['docker ps', 'ps'], a: '<code>docker ps</code> lista los contenedores en ejecución; con <code>-a</code>, todos; con <code>-n 1</code>, solo el último lanzado.' },
  { k: ['docker images', 'images', 'imagenes', 'grep'], a: '<code>docker images</code> lista las imágenes descargadas. Con <code>| grep nombre</code> se filtra la salida para ver solo las líneas que contienen ese texto.' },
  { k: ['docker pull', 'pull'], a: '<code>docker pull imagen</code> descarga una imagen desde Docker Hub sin crear ningún contenedor.' },
  { k: ['docker logs', 'logs', 'registro'], a: '<code>docker logs contenedor</code> muestra lo que el contenedor ha escrito por su salida estándar: por ejemplo, las peticiones recibidas por nginx.' },
  { k: ['docker top', 'top'], a: '<code>docker top contenedor</code> muestra los procesos que se ejecutan dentro del contenedor (como el comando <code>top</code>/<code>ps</code> pero visto desde fuera).' },
  { k: ['docker stats', 'stats', 'estadisticas'], a: '<code>docker stats contenedor</code> muestra en tiempo real el consumo de CPU, memoria y red del contenedor. Se sale con Ctrl+C.' },
  { k: ['docker kill', 'kill', 'matar'], a: '<code>docker kill contenedor</code> envía una señal para terminarlo de inmediato (por defecto SIGKILL), a diferencia de <code>docker stop</code>, que lo detiene de forma ordenada.' },
  { k: ['docker inspect', 'inspect', 'node_version'], a: '<code>docker inspect</code> devuelve en JSON toda la configuración de un contenedor o imagen. Filtrado con <code>| grep NODE_VERSION</code> se ve la variable de entorno con la versión de Node.' },
  { k: ['docker cp', 'copiar'], a: '<code>docker cp fichero.txt contenedor:/tmp</code> copia un fichero entre el equipo anfitrión y el contenedor (en cualquiera de los dos sentidos).' },
  { k: ['docker exec', 'exec'], a: '<code>docker exec -it contenedor bash</code> abre una terminal dentro de un contenedor que ya está en marcha. Sin <code>-it</code> ejecuta un único comando, como <code>ls /tmp</code>.' },
  { k: ['docker start', 'start', 'attach'], a: '<code>docker start</code> vuelve a arrancar un contenedor parado; <code>docker attach</code> conecta tu terminal a su proceso principal.' },
  { k: ['postgres', 'postgresql', 'variables', 'psql', 'base de datos'], a: 'En la práctica de variables se lanza un contenedor <b>PostgreSQL</b> pasando <code>POSTGRES_USER</code>, <code>POSTGRES_PASSWORD</code> y <code>POSTGRES_DB</code>. Dentro, <code>psql -U usuario base</code> abre el cliente; <code>\\l</code> lista las bases de datos y <code>\\q</code> sale.', go: [{ t: 'cam', n: 5, l: 'Ver las capturas' }] },
  { k: ['john', 'john the ripper', 'hash', 'hashes', 'contrasena', 'password'], a: '<b>John the Ripper</b> es una herramienta de auditoría que intenta recuperar contraseñas a partir de sus hashes. <code>john --test</code> mide el rendimiento; <code>john --format=crypt fichero</code> fuerza el formato de hash; <code>john --show fichero</code> muestra las contraseñas ya descifradas. En la práctica, sin <code>--format=crypt</code> no se cargaba ningún hash.', go: [{ t: 'cam', n: 5, l: 'Ver el antes y el después' }] },
  { k: ['omv', 'openmediavault', 'virtualbox', 'smb', 'ftp', 'cobian'], a: 'La Tarea 1 monta un <b>NAS con OpenMediaVault</b> en VirtualBox: tres discos de datos en <b>RAID 5</b>, sistema de archivos, usuario, carpeta compartida publicada por <b>SMB</b> y <b>FTP</b>, y prueba desde Windows Server. Será el destino de las copias de la Tarea 2 (Cobian Reflector).', go: [{ t: 'cam', n: 5, l: 'Ver las capturas del NAS' }] },
  { k: ['cpd arena', 'prueba de estres', 'estres'], a: '<b>CPD Arena</b> es la misión «Construye tu CPD»: se configura un centro de datos y se somete a pruebas de estrés (riada, rayo, ola de calor, incendio, apagón…). Hay tres pruebas documentadas con capturas.', go: [{ t: 'cam', n: 5, l: 'Ver CPD Arena' }] },
  { k: ['volver', 'regresar', 'salir', 'atras', 'volver al mapa'], a: 'Dentro de una cámara pulsa <b>Volver al mapa</b> (arriba a la izquierda) o la tecla <b>Esc</b>. También puedes saltar directamente a otra cámara desde la barra superior.', go: [{ t: 'map', l: 'Volver al mapa' }] },
  { k: ['musica', 'sonido', 'audio', 'volumen', 'silenciar', 'mute'], a: 'Arriba a la derecha está el control de sonido: el botón ♪ activa o pausa la música ambiental, el deslizador regula el volumen y el icono del altavoz silencia todo. El navegador solo permite sonido tras una interacción, por eso empieza en silencio.' },
  { k: ['pantalla completa', 'fullscreen'], a: 'El botón de pantalla completa está en la barra superior. Si tu navegador lo bloquea dentro de Google Sites, usa la opción de abrir en una pestaña nueva.' },
  { k: ['gracias', 'genial', 'perfecto', 'vale'], a: 'A ti, explorador. Sigue avanzando: el archivo guarda mucho más.' }
];
window.QUICK = ['¿Qué es la asignatura?', '¿Cómo exploro el mapa?', '¿Qué contiene cada pirámide?', '¿Qué prácticas se hicieron?', '¿Dónde están las evidencias?', '¿Qué es CyberChef?', '¿Qué hace docker run?', '¿Cómo vuelvo al mapa?'];
