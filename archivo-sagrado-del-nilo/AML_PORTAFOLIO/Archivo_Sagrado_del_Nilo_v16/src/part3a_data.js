/* =========================================================
   EL ARCHIVO SAGRADO DEL NILO · Motor de la experiencia
   Sin dependencias externas: SVG + Canvas 2D + WebAudio + JS puro.
   ---------------------------------------------------------
   ► ZONA EDITABLE: CONFIG y CONTENT (justo debajo).
     Aquí se integran los textos académicos, comandos, código,
     capturas y reflexiones. Mientras un campo esté vacío ([]),
     la cámara muestra un "sello pendiente" claramente marcado.
   ========================================================= */
(function(){'use strict';

/* ---------- 1. CONFIGURACIÓN ---------- */
const CONFIG={
  title:'El Archivo Sagrado del Nilo',          // título provisional (se sustituirá por el definitivo)
  author:'Laura Sofía Alba Medina',
  course:'Seguridad Informática · 2.º SMR',
  guideName:'Sadchuruzen',
  /* Chatbot: si pones aquí la URL de un servicio propio (POST JSON {message,history,knowledge} → {reply}),
     la guía lo usará. Si está vacío o falla, responde con la base de conocimiento local (KB) de este archivo. */
  chatEndpoint:'',
  musicTracks:{}   // opcional: {portada:'assets/audio/portada.mp3', mapa:'…', c1:'…', default:'…'} (solo pistas con licencia)
};

/* ---------- 2. CONTENIDO ACADÉMICO (a rellenar) ----------
   Cada campo acepta una lista de elementos:
     "Texto"                                   → párrafo
     {h:"Subtítulo"}                           → subtítulo
     {list:["a","b"]}                          → lista
     {code:"...", lang:"bash", title:"x.sh"}   → bloque de código con botón copiar
     {cmd:"docker ps", out:"...", explain:"…"} → comando + salida + explicación
     {img:"clave_de_IMGS", cap:"…", title:"…"} → captura enmarcada con zoom
     {compare:{before:"clave",after:"clave",labels:["Antes","Después"],cap:"…"}}
*/
const CONTENT={
  situacion:[
    {h:'Mi reflexión sobre la ciberseguridad actual'},
    'La tecnología está cada vez más presente en nuestra vida y dependemos de ella para comunicarnos, estudiar, trabajar y guardar información. Esa comodidad también implica responsabilidades: nuestros datos tienen valor y debemos pensar qué compartimos, dónde lo guardamos y quién puede acceder.',
    'Me parece importante no confiarse ni pensar que un sistema está completamente protegido. La seguridad necesita formación, prevención y atención constante. No basta con reaccionar cuando ya ha ocurrido un problema.',
    'Esta reflexión conecta la seguridad informática con la vida cotidiana: las decisiones pequeñas, como utilizar contraseñas cuidadas, desconfiar de mensajes sospechosos y mantener los dispositivos actualizados, también forman parte de la protección.'
  ],
  intro:[
    {key:'asignatura',title:'La seguridad como responsabilidad',body:[
      'La seguridad informática protege la información durante su almacenamiento, procesamiento y transmisión. No consiste únicamente en instalar un programa: implica cuidar los equipos, las aplicaciones, los datos y las comunicaciones.',
      'A lo largo del curso he entendido que no existe una seguridad absoluta. Siempre pueden aparecer riesgos nuevos y, además de herramientas, hacen falta formación, planificación y recursos.'
    ]},
    {key:'formacion',title:'Los pilares que sostienen el archivo',body:[
      {h:'Temas esenciales del recorrido'},
      {list:['Firewall, mecanismos de defensa y seguridad activa.','Criptografía, PKI, certificados e integridad.','Seguridad física, controles de acceso y protección del CPD.','Almacenamiento, RAID y redundancia.','Copias de seguridad y protección de datos.','Imágenes, contenedores, servicios, redes, puertos y volúmenes con Docker.','Protección de claves y acceso autorizado.']},
      'Estos contenidos se conectan entre sí: proteger un sistema exige prevenir, detectar, controlar el acceso y poder recuperar la información.'
    ]},
    {key:'evaluacion',title:'De la teoría a las prácticas',body:[
      'El portafolio reúne los contenidos estudiados y las actividades realizadas: comandos, configuraciones, pruebas, capturas y resultados. Las evidencias muestran el trabajo desarrollado en los entornos de práctica, no ejemplos inventados.',
      'Docker, CyberChef, GPG/PGP, Linux, John the Ripper, CPD Arena y OpenMediaVault me han permitido acercarme a situaciones técnicas diferentes y comprender mejor para qué sirve cada herramienta.'
    ]},
    {key:'portafolio',title:'Lo que he aprendido sobre proteger',body:[
      'Me quedo con la idea de que la seguridad no depende de una única barrera. Hay que combinar medidas físicas y lógicas, seguridad activa y pasiva, copias de seguridad, control de acceso y buenas prácticas.',
      'También he aprendido que una medida puede reducir el riesgo, pero no garantiza que nunca vaya a ocurrir un incidente. Por eso es importante revisar, actualizar y saber cómo responder.'
    ]},
    {key:'explorar',title:'Un recorrido con una parte personal',body:[
      'Las siete cámaras organizan el aprendizaje técnico. La última reúne únicamente tres crónicas personales: ciberseguridad, gratitud, agradecimiento y perdón, y la charla de Adrián.',
      'El objetivo no es solo mostrar lo que he estudiado, sino también dejar constancia de lo que me ha hecho pensar, de las dificultades que he encontrado y de cómo he ido avanzando.'
    ]}
  ],
  camaras:{
    1:{subtitle:'Conceptos sobre Seguridad Informática',explicacion:[],desarrollo:[],comandos:[],codigo:[],capturas:[],resultados:[],problemas:[],soluciones:[],reflexion:[]},
    2:{subtitle:'Criptografía',explicacion:[],desarrollo:[],comandos:[],codigo:[],capturas:[],resultados:[],problemas:[],soluciones:[],reflexion:[]},
    3:{subtitle:'Seguridad pasiva: equipos',explicacion:[],desarrollo:[],comandos:[],codigo:[],capturas:[],resultados:[],problemas:[],soluciones:[],reflexion:[]},
    4:{subtitle:'Seguridad pasiva: almacenamiento',explicacion:[],desarrollo:[],comandos:[],codigo:[],capturas:[],resultados:[],problemas:[],soluciones:[],reflexion:[]},
    /* Cámaras 5 y 6: laboratorios. Cada laboratorio tiene sus propios campos y sus capturas REALES (ver LABS). */
    7:{subtitle:'Experiencias y reflexiones personales'}
  },
  labsText:{ /* textos por laboratorio: labsText.docker={explicacion:[...],comandos:[...],resultados:[...],problemas:[...],soluciones:[...],reflexion:[...]} */ },
  cronicas:[
    {id:'ciberseguridad',title:'Ciberseguridad: una responsabilidad que también forma parte de mi vida',body:[
      'Al comenzar a estudiar Seguridad Informática pensaba sobre todo en programas, contraseñas, virus y herramientas para proteger un ordenador. A medida que hemos avanzado, he comprendido que la ciberseguridad es bastante más amplia: también tiene que ver con las personas, con la información que compartimos y con las decisiones que tomamos cada día.',
      'En clase hemos trabajado la confidencialidad, la integridad y la disponibilidad. Ahora puedo relacionar esos conceptos con situaciones cotidianas: que nadie entre en una cuenta sin permiso, que un archivo no se modifique sin que lo sepamos y que un servicio siga funcionando cuando lo necesitamos. También he visto que una contraseña por sí sola no siempre es suficiente y que medidas como la autenticación en dos pasos, las actualizaciones y las copias de seguridad reducen riesgos.',
      'Las prácticas me han ayudado a entenderlo de una manera más real. Con John the Ripper observé por qué importa el formato de un hash y cómo una contraseña débil puede recuperarse en un entorno de laboratorio. Con Lynis revisé el estado de un sistema y aprendí que un informe no se debe mirar solo por el número de avisos: hay que interpretar cada resultado y decidir qué conviene corregir. En Docker, OpenMediaVault y CPD Arena también comprobé que la seguridad depende de muchas piezas: permisos, configuración, almacenamiento, copias y protección física. La visita a la sala de equipos del RAG me ayudó a relacionar el temario del CPD con un espacio real. Al observar la distribución de los equipos y el cableado entendí que mantener las conexiones identificadas y ordenadas no es solo una cuestión estética: facilita el mantenimiento y ayuda a localizar averías.',
      'Mi conclusión es que no existe un sistema completamente invulnerable. Lo importante es reducir las posibilidades de que ocurra un incidente, detectarlo a tiempo y estar preparados para recuperarnos. Como futura técnica de SMR, quiero quedarme con esa forma de trabajar: observar, comprobar, documentar y no dar por hecho que algo está seguro solo porque parece funcionar.'
    ],sources:[
      {title:'ENISA · Threat Landscape 2026',url:'https://www.enisa.europa.eu/publications/enisa-threat-landscape-2026',why:'Panorama actualizado de amenazas, ransomware, ataques DDoS y riesgos relacionados con la dependencia de servicios digitales.'},
      {title:'INCIBE · Consejos para evitar riesgos en línea',url:'https://www.incibe.es/ciudadania',why:'Recomendaciones prácticas sobre contraseñas, doble factor, actualizaciones y copias de seguridad.'},
      {title:'ENISA · Threat Landscape 2025',url:'https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025',why:'Informe europeo que analiza incidentes y técnicas de acceso inicial como el phishing.'}
    ]},
    {id:'gratitud',title:'Gratitud, agradecimiento y perdón: aprender también fuera del aula',body:[
      'Para mí, la gratitud no siempre es sencilla. A veces cuesta agradecer cuando algo que deseas muchísimo no sucede, incluso después de haber luchado por ello de una manera honrada, honesta, dedicada y apasionada. En esos momentos, escuchar «agradece porque luego lo verás» puede sentirse como una forma demasiado fácil de intentar soltar algo que todavía duele.',
      'Con el tiempo he pensado que agradecer no significa fingir que todo está bien ni dejar de reconocer una decepción. Puedo aceptar que algo no salió como esperaba y, aun así, reconocer lo que sí tengo y lo que he vivido. Lo noto especialmente cuando algo cotidiano deja de ser sencillo: entonces valoro aspectos que normalmente doy por hechos y que, cuando todo va bien, casi no me detengo a reconocer.',
      'También he reflexionado sobre pedir perdón. A veces puede costar más que pedir permiso porque implica reconocer que nos hemos equivocado, dejar a un lado el orgullo y aceptar que nuestras acciones pueden afectar a otra persona. Para mí, pedir perdón tiene sentido cuando nace de un arrepentimiento sincero y va acompañado de la intención de actuar de otra manera; no cuando se utiliza únicamente para terminar una discusión.',
      'Relaciono estas ideas con mi manera de aprender. En SMR no todo sale a la primera: hay comandos que fallan, configuraciones que hay que revisar y momentos en los que una se siente insegura. He aprendido que reconocer un error no significa no ser capaz, sino tener la oportunidad de corregirlo. La paciencia, la humildad para pedir ayuda y el agradecimiento a quienes nos acompañan también forman parte de crecer.'
    ],sources:[
      {title:'Greater Good Science Center · What Is Gratitude?',url:'https://greatergood.berkeley.edu/topic/gratitude/definition',why:'Explica la gratitud como una práctica de reconocimiento y valoración, sin reducirla a negar las dificultades.'},
      {title:'Greater Good Science Center · Forgiveness',url:'https://greatergood.berkeley.edu/topic/forgiveness/definition',why:'Material divulgativo sobre el perdón, sus procesos y la diferencia entre perdonar y justificar una conducta.'}
    ]},
    {id:'adrian',title:'La charla de Adrián · 5 de octubre de 2026: inteligencia artificial, creatividad y datos',body:[
      'El 5 de octubre de 2026 recibimos la charla de Adrián. Para mí fue una oportunidad de escuchar una experiencia profesional distinta y ver aplicaciones de la inteligencia artificial que van más allá de utilizar un chat para hacer preguntas. Aunque no llegamos a programar durante la sesión por falta de tiempo, me resultó interesante conocer proyectos y formas de trabajar con esta tecnología.',
      'Uno de los ejemplos que más me llamó la atención fue el de los mapas musicales: transformar notas que aparecen en una imagen en información que un sistema pueda interpretar y utilizar para crear ritmos o beats. Me hizo pensar que una idea artística también puede convertirse en datos y que la tecnología puede conectar ámbitos que, en principio, parecen muy diferentes, como la música, las imágenes y la programación.',
      'También me sorprendió la relación entre la inteligencia artificial y los juegos en los que hay que tomar decisiones. Entendí que la IA puede participar en procesos de reconocimiento, clasificación y elección de acciones; no se limita a responder mensajes. Su funcionamiento depende de cómo se diseña el sistema y, especialmente, de los datos que recibe.',
      'El ejemplo de reconocer perros y gatos me ayudó a comprender una de sus limitaciones. Si un modelo se entrena con pocos ejemplos o con imágenes demasiado parecidas, puede equivocarse cuando aparece un animal diferente de los que ha visto. Por eso no debemos tratar sus resultados como verdades absolutas: importa la calidad, la variedad y el contexto de los datos.',
      'Esta idea también la relacioné con el taller de reconocimiento de números manuscritos, donde pudimos acercarnos a un modelo capaz de identificar cifras escritas a mano y a su ejecución en el navegador mediante ONNX. La predicción no aparece porque el ordenador lea como una persona, sino porque el modelo compara patrones aprendidos y calcula cuál parece corresponderse con el ejemplo.',
      'Me llevo de la charla una idea que considero importante para mi formación: la inteligencia artificial puede ser una herramienta muy útil y creativa, pero necesita criterio humano. Hay que revisar sus resultados, conocer sus límites y pensar de dónde proceden los datos. La tecnología ayuda, pero comprender lo que hace y asumir la responsabilidad de utilizarla sigue siendo cosa nuestra.'
    ],sources:[
      {title:'NIST · Artificial Intelligence Risk Management Framework',url:'https://www.nist.gov/itl/ai-risk-management-framework',why:'Marco para identificar y gestionar riesgos asociados al diseño, desarrollo y uso de sistemas de inteligencia artificial.'},
      {title:'NIST · AI Risk Management Framework Playbook',url:'https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook',why:'Orientaciones para evaluar sistemas de IA, sus datos, su contexto y su fiabilidad.'},
      {title:'ONNX · Open Neural Network Exchange',url:'https://onnx.ai/',why:'Documentación del formato abierto que facilita representar y ejecutar modelos de aprendizaje automático en distintos entornos.'}
    ]}
  ]
};
/* CONTENIDO ACADÉMICO RECONSTRUIDO DESDE LOS PDF Y LAS PRÁCTICAS ENTREGADAS */
CONTENT.situacion=[
  {h:'Situación actual en la ciberseguridad'},
  'La ciberseguridad cambia continuamente porque también cambian las herramientas, los servicios y las formas de atacar. Para entender el momento actual no basta con enumerar virus: hay que observar qué técnicas se utilizan, qué organizaciones se ven afectadas y qué consecuencias puede tener una interrupción.',
  {h:'Qué está destacando en los informes recientes'},
  {list:[
    'ENISA publicó el 22 de septiembre de 2026 su Threat Landscape 2026, basado en incidentes observados durante 2025. El informe señala que el ransomware sigue siendo una de las amenazas de mayor impacto a corto plazo y que los ataques DDoS continúan afectando a entidades esenciales.',
    'El mismo informe advierte de que la administración pública sigue siendo uno de los sectores más atacados y de que la inteligencia artificial puede facilitar algunas operaciones maliciosas, por ejemplo mediante contenidos sintéticos o campañas de engaño.',
    'El informe europeo de 2025 ya situaba el phishing como una de las principales vías de acceso inicial. Esto demuestra que el factor humano sigue siendo importante: un mensaje convincente puede llevar a una persona a entregar credenciales o abrir un enlace peligroso.'
  ]},
  {h:'Cómo lo relaciono con lo que hemos estudiado'},
  'Estos datos conectan con los contenidos del Tema 1: confidencialidad, integridad y disponibilidad. Un ataque de ransomware puede impedir el acceso a los archivos; el phishing puede facilitar el robo de credenciales; y una vulnerabilidad sin corregir puede convertirse en una puerta de entrada. Por eso tienen sentido las medidas que hemos practicado: actualizar, limitar permisos, revisar servicios, utilizar autenticación adicional, monitorizar y mantener copias que permitan recuperar la información.',
  'Mi conclusión es que la seguridad no consiste en instalar una herramienta y olvidarse. Hay que mantenerse informado, comprobar las configuraciones y actuar con criterio. Como estudiante de SMR, me parece importante aprender a explicar por qué aplicamos una medida y qué riesgo intenta reducir, no limitarme a memorizar el nombre de un programa.',
  {sources:[
    {title:'ENISA · Threat Landscape 2026 (22 de septiembre de 2026)',url:'https://www.enisa.europa.eu/publications/enisa-threat-landscape-2026',why:'Informe reciente de la Agencia de la Unión Europea para la Ciberseguridad sobre incidentes y amenazas observados durante 2025.'},
    {title:'ENISA · Comunicado sobre el Threat Landscape 2026',url:'https://www.enisa.europa.eu/news/exploring-the-evolution-of-the-cyber-threat-landscape-how-dependencies-weaken-our-digital-resilience',why:'Resumen de ransomware, DDoS, ataques a la administración pública y uso malicioso de IA.'},
    {title:'INCIBE · Ciudadanía',url:'https://www.incibe.es/ciudadania',why:'Recursos y recomendaciones para proteger cuentas, dispositivos y datos personales.'}
  ]}
];
CONTENT.camaras[1]={subtitle:'Conceptos sobre Seguridad Informática',explicacion:[
{h:'Importancia de la seguridad informática'},'La seguridad informática intenta proteger el almacenamiento, el procesamiento y la transmisión de información digital. Hoy dependemos de sistemas informáticos para las cuentas bancarias, el comercio, la energía, los satélites, la sanidad, la justicia y las comunicaciones. La información puede ser privada, como una conversación o un contrato, o pública, como una web que debe estar disponible.',
{h:'Objetivos de seguridad'}, {list:['Confidencialidad: solo utilizan la información las personas o máquinas autorizadas. Se apoya en autenticación, autorización y cifrado.','Integridad: los datos se mantienen como espera el usuario y no se alteran sin consentimiento.','Disponibilidad: los usuarios acceden a los servicios con normalidad en el horario establecido.','No repudio: se intenta evitar que una de las partes niegue su participación en una comunicación o transacción.']},
{h:'Qué debemos proteger'}, {list:['Equipos: evitar robos, manipulación de componentes e introducción de equipos no autorizados; aplicar mantenimiento preventivo. En portátiles, cifrar el disco y proteger las cuentas de administración.','Aplicaciones: impedir instalaciones no autorizadas, limitar privilegios y controlar el autoarranque de medios extraíbles.','Datos: son el activo más importante porque no se pueden volver a comprar si desaparecen. Se protegen con almacenamiento redundante y cifrado.','Comunicaciones: proteger la información que circula entre equipos y evitar accesos o modificaciones no autorizadas.']},
{h:'Seguridad física, lógica, activa y pasiva'}, {list:['Seguridad física: protege frente a desastres naturales, robos y fallos de suministro.','Seguridad lógica: protege frente a virus, troyanos, pérdida de datos y ataques a aplicaciones y servidores.','Seguridad activa: intenta prevenir o detectar ataques mediante contraseñas, listas de control de acceso, antivirus, firewall, monitorización, firmas y certificados.','Seguridad pasiva: permite recuperarse cuando ocurre un incidente; incluye redundancia, SAI y copias de seguridad.']},
{h:'Vulnerabilidades y malware'},'Una vulnerabilidad es un defecto de una aplicación que puede aprovechar un atacante. Un exploit utiliza esa debilidad para realizar una operación no autorizada. Puede existir un parche, una solución temporal o una vulnerabilidad todavía no reconocida por el proveedor.',{list:['Virus: pueden dejar inservible un ordenador y actuar en un momento determinado.','Gusanos: se propagan y consumen recursos de disco, memoria o red.','Troyanos: pueden abrir puertas traseras para que otra persona controle el equipo.']},
{h:'Tipos de ataque'}, {list:['Interrupción: impide que un servicio esté disponible.','Interceptación: permite copiar información transmitida.','Modificación: altera la información antes de llegar al destino.','Fabricación: el atacante se hace pasar por el destino o crea información falsa.','Ingeniería social y phishing: engañan al usuario para conseguir datos o credenciales.','Keyloggers: registran las teclas pulsadas.','Fuerza bruta: prueba combinaciones de claves; se dificulta con contraseñas robustas, límites de intentos y bloqueos.','Spoofing: permite hacerse pasar por otro equipo.','Sniffing: captura tráfico de red.','DoS y DDoS: saturan un servicio para dejarlo fuera de servicio.']},
{h:'Tipos de atacantes'},'Los apuntes diferencian hacker, cracker, script kiddie, programadores de malware, sniffers y ciberterroristas. La diferencia está en sus conocimientos, motivaciones y finalidad del ataque.',{h:'Buenas prácticas'}, {list:['Identificar los activos que hay que proteger y revisar las copias de seguridad.','Mantener planes de actuación ante catástrofes y revisarlos con regularidad.','Instalar solo lo necesario y revisar que los usuarios no tengan más permisos de los imprescindibles.','Estar al día de los informes de seguridad y aplicar las actualizaciones correspondientes.']}
],desarrollo:['El tema comienza explicando por qué la información necesita protección y después diferencia los objetivos de seguridad, los activos, los tipos de seguridad, las vulnerabilidades y las técnicas de ataque. Primero hay que identificar qué se quiere proteger y qué amenazas pueden afectarlo; después se eligen medidas adecuadas teniendo en cuenta el presupuesto y la formación.'],resultados:['La seguridad informática no es una única herramienta. Se consigue combinando medidas físicas y lógicas, prevención, control de acceso, protección de comunicaciones y capacidad de recuperación.','La información tiene más valor que el propio equipo: un ordenador puede sustituirse, pero los datos perdidos pueden no recuperarse.']};
CONTENT.camaras[2]={subtitle:'Criptografía',explicacion:[
{h:'Qué es y por qué se utiliza'},'Criptografía procede del griego: cripta significa escondido y grafía, escritura. Estudia la escritura oculta y cómo interpretar mensajes cifrados. Se cifra para proteger información cuando se comparte por redes que pueden ser interceptadas o cuando los equipos y servicios pueden ser atacados.',
{h:'Historia y cifrados clásicos'},'Los apuntes presentan métodos antiguos, el cifrado César —que desplaza cada letra un número fijo de posiciones— y la máquina Enigma. Estos ejemplos permiten entender que un mensaje puede transformarse para que no se lea directamente.',
{h:'Claves, fuerza bruta y criptoanálisis'},'La clave controla el cifrado. Un ataque de fuerza bruta prueba combinaciones posibles. Para dificultarlo se recomienda utilizar claves largas, mezclar tipos de caracteres, evitar palabras fáciles, cambiar las claves y detectar intentos fallidos repetidos. El criptoanálisis estudia los sistemas para encontrar debilidades en las claves, algoritmos o implementaciones.',
{h:'Criptografía simétrica'},'Utiliza la misma clave para cifrar y descifrar. Es eficiente y rápida. En los apuntes aparecen DES, 3DES, AES, Blowfish e IDEA. Su principal dificultad es compartir la clave de forma segura y gestionar las claves almacenadas.',
{h:'Criptografía asimétrica'},'Utiliza dos claves matemáticamente relacionadas: una pública y otra privada. La pública se puede compartir; la privada debe mantenerse protegida. Resuelve el problema de distribuir una clave secreta, pero es menos eficiente y obliga a proteger el llavero donde se guardan las claves privadas. Se estudian tarjetas inteligentes de memoria y procesadoras, de contacto y sin contacto.',
{h:'Esquema híbrido'},'La criptografía asimétrica se utiliza al inicio para acordar una clave simétrica. Después se emplea cifrado simétrico durante la transmisión porque es más rápido. La clave de sesión puede cambiarse periódicamente.',
{h:'Hash, firma y certificado digital'},'Una función hash genera un resumen del documento y sirve para comprobar su integridad. En el temario aparecen MD5 y SHA. Una firma digital permite comprobar procedencia e integridad: el emisor firma el resumen con su clave privada y el receptor verifica con la clave pública. Si además queremos confidencialidad, el documento se cifra para el destinatario.',
{h:'PKI y DNIe'},'La infraestructura de clave pública (PKI) organiza la confianza mediante autoridades de certificación (CA), registro (RA) y validación (VA), además de repositorios de certificados y listas de revocación. El DNIe incorpora un chip con datos de identificación, datos biométricos y claves asimétricas; las claves para firmar y cifrar son distintas.'
],desarrollo:[
{h:'Práctica de criptografía clásica · 30/09/2026'},'La actividad se realizó en LliureX o Kali utilizando CyberChef. El objetivo era entender algoritmo, clave, cifrado y descifrado y comprobar por qué los cifrados clásicos se rompen con facilidad.',
{h:'César a mano'},'Con clave 3 se descifró «LA SEGURIDAD ES UN PROCESO NO UN PRODUCTO». Después se cifró el nombre completo con clave 7 y se anotó el resultado «Shbyh Zvmíh Hsih Tlkpuh».',
{h:'Ataque por fuerza bruta'},'La clave encontrada fue 15 y el texto en claro «EL CIFRADO CESAR SE ROMPE EN SEGUNDOS». En la respuesta se indicó que, probando en orden, se necesitarían como máximo 15 intentos para ese caso.',
{h:'Vigenère y análisis de frecuencias'},'Con CyberChef y la clave CLAVE se obtuvo «LA CRIPTOGRAFIA PROTEGE LA CONFIDENCIALIDAD DE LA INFORMACION». En el texto largo cifrado con César, la letra más frecuente era J; comparándola con la E del castellano se dedujo un desplazamiento de cinco posiciones. La frase recuperada explica que la criptografía protege la información para que solo las personas autorizadas puedan leerla.',
{h:'Hash y GPG en Linux'},'La actividad de hash pide descargar SetupCrypTool_1_4_42_es.exe mediante wget y comparar su SHA-256 con el valor indicado en el documento: 62f0681356e9b3a9cb32a13eccd8a61d9deb0a108ce17c8914668e7460601eab. En mi resultado la firma obtenida no coincidió con la indicada; expliqué que el archivo pudo haberse corrompido o modificado durante la descarga. La segunda parte pide cifrar un fichero con GPG simétrico, comparar los ficheros y descifrarlo sin borrar el original.'
],comandos:[
{cmd:'md5sum NOMBREARCHIVO',explain:'Calcula el resumen MD5 del archivo para compararlo con el valor esperado.'},{cmd:'wget https://www.cryptool.org/ct1download/SetupCrypTool_1_4_42_es.exe',explain:'Descarga el ejecutable indicado en la actividad.'},{cmd:'sha256sum SetupCrypTool_1_4_42_es.exe',explain:'Calcula el SHA-256 para compararlo con la firma facilitada en la ficha.'},{cmd:'gpg -a --symmetric fichero.txt',explain:'Cifra el fichero con una contraseña y genera salida ASCII.'},{cmd:'gpg --decrypt texto.txt.asc > resultado',explain:'Descifra el fichero y guarda el contenido en un nuevo archivo llamado resultado, conservando el original.'},{cmd:'ls -l',explain:'Permite comparar los archivos y observar sus nombres, tamaños y extensiones.'},{cmd:'gpg --gen-key',explain:'Genera un par de claves.'},{cmd:'gpg -k',explain:'Consulta las claves del llavero.'},{cmd:'gpg --export <alias> > publica.gpg',explain:'Exporta una clave pública.'},{cmd:'gpg --import publica.gpg',explain:'Importa una clave pública.'},{cmd:'gpg --fingerprint',explain:'Muestra la huella de las claves.'},{cmd:'gpg -a --encrypt --recipient <alias> mensaje',explain:'Cifra un mensaje para el destinatario.'},{cmd:'gpg -a --decrypt mensaje.asc',explain:'Descifra el mensaje con la clave privada.'},{cmd:'gpg -a --detach-sign mensaje',explain:'Genera una firma separada.'},{cmd:'gpg -a --clearsign mensaje',explain:'Firma y conserva el texto legible.'},{cmd:'gpg --verify mensaje.asc',explain:'Verifica una firma con la clave pública del emisor.'}
],capturas:[{img:'crypto_classic_p02',t:'Práctica de criptografía clásica · César',s:'Documento de la autora · 30/09/2026'},{img:'crypto_classic_p03',t:'Práctica de criptografía clásica · fuerza bruta y Vigenère',s:'Documento de la autora · 30/09/2026'},{img:'gpg_md5_p03',t:'Actividad GPG y MD5 en Linux',s:'Documento de la autora · Seguridad Informática'}],resultados:['La práctica de César demuestra que un cifrado con pocas claves posibles puede probarse rápidamente. El análisis de frecuencias permite deducir desplazamientos cuando las letras mantienen un patrón. En la actividad de GPG y SHA-256, el hash obtenido no coincidió con el facilitado en la ficha; por eso no di el archivo por íntegro.','En mis respuestas expliqué que el algoritmo es el conjunto de pasos para cifrar y la clave es el patrón utilizado. La clave es lo que debe mantenerse en secreto, no el algoritmo.']};
CONTENT.camaras[3]={subtitle:'Seguridad pasiva: equipos',explicacion:[
{h:'Ubicación del CPD'},'Los servidores suelen reunirse en una sala específica llamada CPD (centro de proceso de datos), centro de cálculo, DataCenter, sala fría o pecera. Centralizar los equipos permite ahorrar en protección y mantenimiento, optimizar las comunicaciones y aprovechar mejor los recursos humanos.',
{h:'Plan de recuperación ante desastres'},'Debe actualizarse cuando cambia el CPD e incluir el hardware instalado y alternativo, los sistemas operativos y aplicaciones con sus versiones y configuraciones, los datos, el almacenamiento y los procedimientos de respaldo.',
{h:'Protección del edificio y de la sala'}, {list:['Elegir una zona con baja probabilidad de accidentes naturales y alejada de ríos, playas, presas, aeropuertos, autopistas y actividades peligrosas.','Valorar la planta: la planta baja está expuesta a sabotajes, los sótanos a inundaciones y las plantas superiores a otros riesgos.','Disponer de accesos controlados, pasillos anchos, falso suelo y techo, paredes fáciles de limpiar y mobiliario ignífugo.','Instalar detección de humo y sistemas automáticos de extinción.']},
{h:'Aislamiento y ventilación'},'Los equipos deben protegerse de temperatura, humedad, interferencias electromagnéticas y ruido. Los CPD suelen carecer de ventanas y utilizan climatización, a menudo duplicada. Se organizan pasillos fríos y calientes para controlar el flujo de aire.',
{h:'Suministro eléctrico y comunicaciones'},'Conviene disponer de suministradores redundantes. El suministro eléctrico del CPD debe estar separado del resto de la empresa; los sistemas críticos pueden contar con generadores. El segundo proveedor de comunicaciones debería utilizar una tecnología diferente.',
{h:'Control de acceso'},'El acceso debe limitarse a especialistas autorizados. Se pueden combinar contraseñas, tarjetas con horarios y caducidad, Touch Memories, biometría, vigilantes, sensores de presencia y videovigilancia CCTV o IP.',
{h:'Climatización y centro de respaldo'},'El material presenta refrigeración por falso suelo, climatización InRow entre racks, puertas traseras para reducir la carga térmica y cerramientos de pasillos fríos o calientes. Un centro de respaldo debe estar físicamente alejado, disponer de configuración y datos replicados y tener documentados los procedimientos de conmutación y recuperación.',
{h:'SAI / UPS'},'Un SAI utiliza baterías para mantener los equipos durante un corte eléctrico y puede estabilizar la corriente y proteger frente a picos de tensión. El tipo stand-by activa las baterías al detectar un corte; el tipo on-line alimenta los equipos a través del SAI. El software permite monitorizar eventos, configurar triggers para suspender o apagar equipos, enviar avisos y comprobar el desgaste de las baterías.'
],desarrollo:['El tema desarrolla la protección física del centro de datos y la continuidad del servicio. No basta con tener servidores: también hay que elegir su ubicación, controlar el acceso, mantener temperatura y humedad adecuadas, asegurar electricidad y comunicaciones y preparar un plan para cuando algo falle.','La práctica CPD Arena permite aplicar estos criterios y comprobar cómo responde una configuración ante riadas, picos de tensión, olas de calor, incendios, apagones, robos y ausencia del responsable.','La visita a la sala de equipos del RAG me ayudó a relacionar el tema con un entorno real. Al principio el cableado podía parecer desordenado, pero al observar cómo estaban distribuidos los equipos entendí por qué mantener las conexiones identificadas y organizadas facilita el mantenimiento y la localización de averías.'],resultados:['La protección del CPD necesita varias capas. Una cámara puede registrar un robo, pero no impide por sí sola que alguien entre; un SAI puede cubrir un microcorte, pero no mantiene indefinidamente el servicio durante un apagón largo.','La continuidad depende de combinar medidas preventivas, redundancia, mantenimiento y un plan de recuperación que no esté guardado únicamente en el servidor que podría fallar.']};
CONTENT.camaras[4]={subtitle:'Seguridad pasiva: almacenamiento',explicacion:[
{h:'Por qué los datos son lo más importante'},'Los equipos y los sistemas operativos se pueden sustituir o volver a instalar, pero los datos de una empresa son únicos. Por eso se busca mejorar su integridad y disponibilidad mediante mejores discos, servidores especializados, servicios de respaldo y replicación.',
{h:'Rendimiento, disponibilidad y accesibilidad'}, {list:['Rendimiento: mejorar la velocidad de lectura y escritura mediante equipos y arquitecturas adecuadas.','Disponibilidad: utilizar sistemas redundantes o paralelos para que un fallo no detenga el servicio.','Accesibilidad: mantener la información duplicada y en un lugar seguro para recuperarla cuando sea necesario.']},
{h:'RAID'},'RAID (Redundant Array of Independent Disks) agrupa varios discos para obtener más capacidad, rendimiento o tolerancia a fallos.',{list:['RAID 0: distribuye bloques entre discos (striping). Aumenta capacidad y rendimiento, pero si falla un disco se pierde el conjunto. No aporta redundancia.','RAID 1: mantiene una copia espejo en dos discos. Tolera el fallo de uno, pero la capacidad útil se reduce.','RAID 5: distribuye datos y paridad entre al menos tres discos. Puede soportar el fallo de un disco; la capacidad equivalente a uno se utiliza para paridad.']},'RAID no sustituye a las copias de seguridad: no protege por sí solo frente a borrados, malware, robo o destrucción del servidor.',
{h:'NAS, SAN y clústeres'},'NAS (Network Attached Storage) comparte almacenamiento por red mediante protocolos como CIFS/SMB, NFS, FTP o TFTP. SAN (Storage Area Network) separa el tráfico de almacenamiento del tráfico de usuario y se utiliza cuando se necesita mayor rendimiento y capacidad. Los clústeres agrupan servidores que trabajan como si fueran uno y pueden buscar alta disponibilidad, alto rendimiento, balanceo de carga o escalabilidad.',
{h:'Nube y P2P'},'La nube permite sincronizar carpetas y acceder a archivos desde diferentes dispositivos. Tiene ventajas de acceso y continuidad, pero la información queda bajo la infraestructura del proveedor; por eso es importante controlar permisos y cifrar los archivos sensibles.',
{h:'Copias de seguridad'},'Un backup copia los archivos y datos de usuario o empresa. Una imagen del sistema incluye además el sistema operativo y las aplicaciones instaladas. Hay que decidir qué datos salvar, con qué frecuencia, en qué soporte y dónde conservar la copia.',{list:['Completa: copia todos los archivos seleccionados.','Diferencial: copia lo cambiado desde la última copia completa.','Incremental: copia lo cambiado desde la última copia realizada; para restaurar se necesita la completa y las incrementales posteriores.']},
'Los soportes contemplados incluyen cintas, discos duros, unidades flash, CD/DVD y SSD. Las copias deben guardarse separadas del equipo original y bajo control de acceso; cuando sea posible, en otra ubicación y en armarios ignífugos.',
{h:'Imagen del sistema, LiveCD y restauración'},'Una imagen es un volcado del disco con el sistema operativo, aplicaciones y datos. Puede ser lenta y suele restaurarse como una unidad completa. Un LiveCD/LiveUSB permite arrancar un sistema sin instalarlo y trabajar directamente sobre el disco. Los sistemas de congelación y los puntos de restauración permiten volver a un estado anterior; en Windows, los puntos de restauración protegen principalmente ejecutables y configuración, no los documentos personales.',
{h:'Optimización de discos'},'El tema incluye operaciones para discos duros y SSD: comprobar el modo AHCI, verificar que el sistema reconoce la unidad como SSD, evitar la desfragmentación de SSD y revisar indexación y paginación según las características del equipo.'
],desarrollo:['La práctica de Windows Server 2008 propone añadir discos, inicializarlos desde Administración de discos y crear configuraciones RAID 1, RAID 0 y RAID 5. También se estudia romper un espejo y ampliar un volumen.','En OpenMediaVault se monta un NAS en VirtualBox para que Windows Server 2022 pueda utilizarlo como destino de copias de seguridad.'],resultados:['La redundancia mejora la disponibilidad, pero no reemplaza al backup. Para proteger los datos hay que combinar RAID, copias periódicas y almacenamiento separado.','Un NAS dedicado permite centralizar las copias y administrarlas sin depender del ordenador personal de un usuario.']};
CONTENT.labsText={
 docker:{explicacion:[{h:'Qué es Docker'},'Docker es un proyecto de código abierto que automatiza el despliegue de aplicaciones dentro de contenedores. Un contenedor empaqueta lo necesario para ejecutar procesos —código, bibliotecas y dependencias— y permite que el entorno funcione de forma consistente en distintas plataformas.',{h:'Contenedores y máquinas virtuales'},'Una máquina virtual virtualiza el hardware y ejecuta un sistema operativo completo. Un contenedor comparte el kernel del host, por eso suele ser más ligero, arranca más rápido y consume menos recursos. El temario lo relaciona con modernización de aplicaciones, servicios en la nube y microservicios.',{h:'Arquitectura, instalación y verificación'},'La documentación presenta el motor Docker y el uso del cliente desde la terminal. En Kali se propone iniciar el servicio, ejecutar hello-world y comprobar el estado con systemctl.',{h:'Imágenes, repositorios y contenedores'},'Las imágenes son plantillas que se descargan de un repositorio como Docker Hub. docker pull descarga una imagen; docker run la descarga si hace falta y crea/ejecuta un contenedor. Las etiquetas (tags) permiten elegir una variante, por ejemplo alpine o latest.',{h:'Ciclo de vida y modos de ejecución'},'Los contenedores interactivos se crean con -i y -t; al escribir exit se detienen. Con -d se ejecutan en segundo plano. Se pueden detener, arrancar, borrar y consultar. docker exec ejecuta comandos dentro de un contenedor; attach conecta con la salida de un proceso interactivo; logs muestra registros; kill detiene inmediatamente.',{h:'Prácticas realizadas'},'La actividad interactiva utiliza Fedora para crear un contenedor, consultar información del sistema, salir, comprobar su estado, arrancarlo de nuevo y detenerlo desde otra terminal. Las evidencias del proyecto también muestran contenedores Debian y Nginx, consulta de logs, procesos, estadísticas, inspección de imágenes y copia de ficheros.'],comandos:[{cmd:'sudo docker run --name fedora2 -it fedora',explain:'Crea y abre el contenedor interactivo fedora2, tal como aparece en la práctica.'},{cmd:'sudo service docker start',explain:'Inicia el servicio Docker en el entorno de la práctica.'},{cmd:'sudo docker run hello-world',explain:'Comprueba que Docker puede descargar y ejecutar una imagen de prueba.'},{cmd:'systemctl status docker',explain:'Comprueba el estado del servicio Docker.'},{cmd:'sudo docker ps',explain:'Muestra los contenedores activos.'},{cmd:'sudo docker images',explain:'Muestra las imágenes descargadas.'},{cmd:'sudo docker run busybox',explain:'Ejecuta un contenedor BusyBox.'},{cmd:'sudo docker ps -a',explain:'Muestra todos los contenedores que se han ejecutado.'},{cmd:'sudo docker ps -a -q',explain:'Muestra solo los identificadores de los contenedores.'},{cmd:'sudo docker ps -n 2',explain:'Muestra los dos últimos contenedores lanzados.'},{cmd:'systemctl status docker',explain:'Comprueba el estado del servicio.'},{cmd:'docker version',explain:'Muestra las versiones del cliente y del motor.'},{cmd:'docker images',explain:'Lista las imágenes descargadas.'},{cmd:'docker pull ubuntu',explain:'Descarga una imagen sin crear un contenedor.'},{cmd:'docker run --name ubuntu1 ubuntu',explain:'Crea y ejecuta un contenedor con nombre.'},{cmd:'docker run --name ubuntu2 -it ubuntu',explain:'Crea un contenedor interactivo con terminal.'},{cmd:'docker run --name nginx1 -d nginx',explain:'Ejecuta Nginx en segundo plano.'},{cmd:'docker ps',explain:'Muestra los contenedores en ejecución.'},{cmd:'docker ps -a',explain:'Muestra también los contenedores detenidos.'},{cmd:'sudo docker start fedora2',explain:'Arranca de nuevo el contenedor fedora2.'},{cmd:'sudo docker stop fedora2',explain:'Detiene fedora2 desde otra terminal.'},{cmd:'docker attach ubuntu10',explain:'Conecta la terminal a la salida del proceso principal de un contenedor interactivo.'},{cmd:'docker rm apache2',explain:'Elimina un contenedor detenido.'},{cmd:'docker rmi httpd',explain:'Elimina una imagen que no esté siendo utilizada.'},{cmd:'docker stop fedora1',explain:'Detiene el contenedor de forma ordenada.'},{cmd:'docker logs nginx10',explain:'Consulta los registros del contenedor.'},{cmd:'docker top nginx10',explain:'Muestra los procesos del contenedor.'},{cmd:'docker stats nginx10',explain:'Muestra estadísticas de uso de recursos.'},{cmd:'docker kill nginx10',explain:'Envía una señal de parada inmediata.'},{cmd:'docker inspect node',explain:'Muestra información detallada de la imagen o contenedor.'},{cmd:'docker cp fichero.txt nginx10:/tmp',explain:'Copia un archivo del host al contenedor.'},{cmd:'docker exec nginx10 ls /tmp',explain:'Ejecuta un comando dentro del contenedor en marcha.'}],resultados:['Las capturas documentan ejecución y estado de contenedores, logs, procesos, estadísticas, parada, descarga de Node, inspección y copia de ficheros. Una imagen sirve como plantilla y un contenedor es una instancia creada a partir de ella.'],problemas:['Algunos comandos requieren permisos de administrador o sudo.'],soluciones:['Comprobar el servicio Docker, usar los permisos adecuados y verificar el nombre exacto del contenedor antes de utilizar exec, logs, top, stats o cp.']},
 variables:{explicacion:['La práctica utiliza Docker y PostgreSQL para trabajar con variables de entorno al crear un contenedor. Las variables permiten pasar parámetros de configuración al proceso del contenedor sin modificar la imagen. Las evidencias incluyen el arranque con variables y el acceso a PostgreSQL para consultar las bases de datos.'],comandos:[{cmd:'docker run -e POSTGRES_USER=usuario -e POSTGRES_PASSWORD=contraseña -e POSTGRES_DB=prueba postgres',explain:'Estructura de ejemplo para pasar variables al contenedor PostgreSQL; utiliza las credenciales de laboratorio, nunca credenciales reales.'},{cmd:'docker exec -it <contenedor> psql -U <usuario> -d <base_de_datos>',explain:'Abre la consola de PostgreSQL dentro del contenedor.'}],resultados:['Las capturas documentan el arranque de PostgreSQL con variables de entorno y la consulta de las bases de datos desde psql.'],problemas:['Una contraseña de laboratorio aparece en una captura en texto claro.'],soluciones:['Utilizar credenciales exclusivas para prácticas, no publicarlas y cambiarlas si se han compartido fuera del entorno de clase.']},
 cpd:{explicacion:['CPD Arena · Misión 1 consiste en diseñar ubicación, planta, equipamiento y servicios de un centro de proceso de datos y comprobar la configuración mediante pruebas de estrés. Los incidentes de la simulación incluyen riada, ausencia del responsable, rayo y pico de tensión, ola de calor, incendio, apagón de 40 minutos, microcorte eléctrico y robo de datos sensibles.'],resultados:['En la prueba 1 el informe registra 4 de 8 incidentes superados sin daños, 534 puntos y 32.750 € gastados. Se superaron la riada, el rayo y pico de tensión, la ola de calor y el microcorte; hubo daños en la ausencia del responsable, el incendio, el apagón largo y el robo de datos sensibles.','En la prueba de estrés nº 3 se registran 4 de 8 incidentes superados sin daños, 566 puntos y 33.450 € gastados. La simulación muestra que una configuración puede resistir algunos incidentes y seguir teniendo puntos débiles.'],problemas:['El plan de recuperación estaba guardado en el propio servidor que cayó.','La sala no tenía un sistema automático de extinción ante el incendio.','La autonomía del SAI no cubría un apagón de 40 minutos.','El control de acceso no era suficiente frente al robo de discos con datos sensibles.'],soluciones:['Mantener el plan de recuperación fuera del servidor principal.','Instalar detección y extinción adecuadas al riesgo de la sala.','Dimensionar el SAI para permitir una parada controlada y contar con generación de respaldo cuando se necesite continuidad prolongada.','Reforzar el control de acceso con medidas acordes a la sensibilidad de los datos.']},
 omv:{explicacion:['Tarea 1 · NAS con OpenMediaVault 8 en VirtualBox. El NAS se prepara como destino de las copias que se realizarán desde Windows Server 2022 con Cobian Reflector. La práctica se organiza en dos sesiones de 50 minutos.','Se crea la red NAT RedCopias y dos máquinas virtuales: OpenMediaVault con 192.168.50.10/24 y Windows Server 2022 con 192.168.50.20/24. La VM de OMV utiliza Debian de 64 bits, 2048 MB de memoria, 2 CPU, un disco de sistema de 8 GB y tres discos de datos de 2 GB.','Se instala OMV 8 en el disco de sistema de 8 GB, se configura la IP fija, se accede desde el navegador y se instalan los complementos openmediavault-md y FTP. Después se crea RAID 5 md0 con los tres discos de datos, se formatea en EXT4, se monta, se crea el usuario y la carpeta CopiasSeguridad y se habilitan los servicios SMB y FTP.'],comandos:[{cmd:'ip addr',explain:'Comprueba interfaces y direcciones IP en Linux.'},{cmd:'ip route',explain:'Muestra la ruta por defecto y las rutas de red.'},{cmd:'ping 192.168.50.10',explain:'Comprueba la conectividad desde Windows Server hacia el NAS.'}],resultados:['La práctica prepara el RAID 5 md0 con tres discos de datos, crea un sistema de archivos EXT4, monta el volumen, configura un usuario y la carpeta compartida CopiasSeguridad con permisos y servicios SMB y FTP.','Windows Server 2022 debe poder leer y escribir en la carpeta compartida. En OMV los cambios pendientes no se aplican hasta pulsar «Aplicar».'],problemas:['El disco sda corresponde al sistema y no debe borrarse al preparar los discos de datos.','OMV 8 necesita el complemento openmediavault-md para gestionar RAID por software.'],soluciones:['Identificar los discos por su función antes de modificarlos. Instalar el complemento correcto y comprobar el estado clean del RAID antes de crear el sistema de archivos.']},
 john:{explicacion:['La práctica PE4 utiliza John the Ripper en Kali Linux para trabajar con hashes de contraseñas en un entorno de laboratorio autorizado. Las capturas muestran la ejecución de la herramienta, la consulta de resultados y una prueba de rendimiento.'],comandos:[{cmd:'john --format=crypt password.hashes',explain:'Ejecuta John the Ripper indicando el formato crypt del archivo de hashes de la práctica.'},{cmd:'john --show password.hashes',explain:'Muestra las contraseñas recuperadas en el laboratorio.'},{cmd:'john --test',explain:'Realiza una prueba de rendimiento.'}],resultados:['Las evidencias incluidas corresponden a la ejecución de John the Ripper, la consulta con --show y la prueba --test.'],problemas:['El tiempo de ejecución depende del formato, el coste del hash y los recursos disponibles.'],soluciones:['Comprobar el formato del hash y utilizar la herramienta únicamente sobre archivos de práctica o sistemas autorizados.']},
 lynis:{explicacion:['A1 · Lynis. La actividad consiste en actualizar el sistema, instalar Lynis y realizar una auditoría de seguridad en Debian/Kali. El informe se interpreta revisando colores, warnings, sugerencias y comprobaciones.','En el análisis realizado se obtuvo un warning en criptografía porque la comprobación de certificados SSL tardó algo más de 20 segundos. El informe no identificó un problema de gravedad suficiente para considerarlo un riesgo.','El informe presentó 38 sugerencias. Entre las seleccionadas se encuentran revisar herramientas que automatizan tareas, comprobar procesos que mantienen abiertos archivos eliminados y valorar una herramienta de actualización automática de paquetes.','La actividad analiza libpam-tmpdir, apt-listbugs, apt-listchanges, needrestart y fail2ban. Fail2ban revisa logs y puede bloquear temporalmente direcciones IP tras intentos repetidos de acceso.','En la comprobación del arranque, la protección por contraseña mostró NINGUNO. En la sección del kernel apareció OK y los permisos de /etc/sudoers también aparecieron como OK.'],comandos:[{cmd:'sudo apt update',explain:'Actualiza la información de los repositorios.'},{cmd:'sudo apt install lynis',explain:'Instala Lynis.'},{cmd:'sudo lynis audit system',explain:'Ejecuta una auditoría de seguridad del sistema.'}],resultados:['El resultado documentado fue un warning relacionado con el tiempo de comprobación de certificados SSL, 38 sugerencias y comprobaciones OK para el kernel y los permisos de /etc/sudoers.','La ausencia de contraseña en el gestor de arranque supone un riesgo si alguien obtiene acceso físico y puede modificar los parámetros de inicio.'],problemas:['El gestor de arranque no tenía protección por contraseña.'],soluciones:['Valorar una contraseña de protección para el arranque y revisar cada sugerencia antes de aplicar cambios.']},
 blockchain:{explicacion:['Blockchain se presenta como un libro de cuentas distribuido. Las copias de la cadena se comparan entre participantes sin depender de un único intermediario. Sus seis ingredientes son hash, bloque, cadena, minado, red y firmas.','El hash es la huella digital de los datos; cada bloque apunta al anterior; minar exige trabajo; la red mantiene copias; las firmas demuestran que una operación ha sido autorizada por quien controla la clave privada.','Si se modifica una letra, cambia el hash. Como el siguiente bloque guarda el hash anterior, la alteración rompe los enlaces posteriores. El minado busca un hash que cumpla una condición de dificultad, por ejemplo comenzar por varios ceros. El consenso acepta la cadena válida con mayor trabajo acumulado.','El documento también explica el riesgo de que una entidad controle más de la mitad de la potencia de minado. El monedero administra claves: la privada debe permanecer secreta, la pública puede compartirse y la dirección se deriva de la pública.'],desarrollo:[{h:'Sesión 1 · Bloques, hash y minado'},'En la ficha se escribe el nombre en dos textos y se cambia una letra para observar cómo cambia la huella. Después se mina un bloque probando valores hasta que el hash comienza por varios ceros. También se comprueba que cada bloque guarda el hash del anterior.',{h:'Sesión 2 · AulaCoin'},'La segunda sesión utiliza la criptomoneda de clase para crear un monedero, minar, enviar pagos y observar retos hacker. La clave privada y la frase de recuperación no deben compartirse.','En la ficha se anotó una potencia propia de 1,25 MH/s, potencia total de red de 13,28 MH/s, dificultad de 27 bits y saldo de 25 AC al inicio. La actividad observa cómo aumenta la dificultad cuando más alumnos minan.','Un pago no se confirma en el momento de enviarlo: queda pendiente hasta que un minero incluya la transacción en un bloque y la red la confirme.'],resultados:['La actividad permite observar el efecto avalancha: un cambio pequeño modifica el hash. También muestra que la cadena depende de los enlaces entre bloques y del consenso.','En las preguntas de salida se reconoce que la clave privada da control sobre los fondos, que el pago necesita confirmación y que modificar un bloque antiguo invalida los enlaces siguientes.'],problemas:['Si se comparte la clave privada o la frase de recuperación, otra persona podría controlar el monedero.','Un pago enviado puede permanecer pendiente hasta que se mine el bloque que lo incluye.'],soluciones:['No escribir ni compartir la clave privada o la frase de recuperación. Comprobar el destinatario y la dirección antes de enviar y esperar las confirmaciones de la red.']},
 cyberchef:{explicacion:['CyberChef permite encadenar operaciones sobre datos mediante recetas. En las evidencias del examen práctico aparecen Vigenère Decode, Frequency distribution y ROT13. Estas operaciones permiten recuperar mensajes cifrados clásicos y analizar patrones. Base64 es una codificación, no un cifrado seguro, porque puede revertirse sin una clave secreta.'],resultados:['Las capturas muestran el uso de recetas de CyberChef para descifrar Vigenère, analizar frecuencias y aplicar ROT13.']}
};
CONTENT.cronicas=[
{id:'ciberseguridad',title:'Ciberseguridad: una responsabilidad que también forma parte de mi vida',body:[
'Cuando empecé esta asignatura, asociaba la seguridad informática sobre todo con contraseñas, antivirus y programas para proteger un ordenador. Ahora la veo de una forma más amplia. Casi todo lo que hacemos deja información: hablamos, estudiamos, guardamos fotografías, entramos en cuentas y compartimos documentos. Por eso proteger los datos no es algo que afecte únicamente a las empresas o a los técnicos; también forma parte de nuestra vida diaria.',
'Los conceptos de confidencialidad, integridad y disponibilidad me han ayudado a ordenar esta idea. La confidencialidad significa que mis datos no deben estar al alcance de cualquiera; la integridad, que no se cambien sin autorización; y la disponibilidad, que pueda acceder a ellos cuando los necesito. También he comprendido que la seguridad no se consigue instalando una sola herramienta. Hay que combinar contraseñas cuidadas, permisos adecuados, actualizaciones, copias de seguridad y atención ante mensajes o enlaces sospechosos.',
'Las prácticas me han permitido pasar de la explicación a la comprobación. Con Lynis aprendí a leer un informe de auditoría y a no confundir una sugerencia con una vulnerabilidad confirmada. Con John the Ripper entendí por qué es importante conocer el formato de un hash y trabajar siempre con archivos de laboratorio autorizados. Docker me enseñó que también hay que revisar qué se ejecuta, con qué permisos y qué información se comparte. En CPD Arena pude relacionar la continuidad de un servicio con la protección física, la electricidad, la climatización y los planes de recuperación.',
'La visita a la sala de equipos del RAG fue especialmente útil para conectar el tema del CPD con un espacio real. Ver los equipos y sus conexiones me hizo fijarme en algo que a veces parece secundario: identificar y ordenar el cableado facilita las tareas de mantenimiento y ayuda a localizar una avería sin perder tiempo. También me hizo comprender que la seguridad física y la organización del entorno forman parte del trabajo técnico.',
'Al revisar la actualidad, me llamó la atención que los riesgos no se quedan quietos. ENISA recoge amenazas como el ransomware y los ataques DDoS, y también advierte de que la inteligencia artificial puede utilizarse para apoyar actividades maliciosas. Esto me hace pensar que estudiar seguridad no consiste en aprender una lista cerrada de ataques, sino en mantener la curiosidad, contrastar información y saber justificar las medidas que aplicamos.',
'Mi conclusión es que no existe un sistema completamente invulnerable. Lo que sí podemos hacer es reducir riesgos, detectar señales a tiempo y prepararnos para recuperarnos. Como estudiante de segundo de SMR, quiero llevarme esa forma de trabajar: observar, comprobar, documentar y explicar por qué una decisión técnica tiene sentido, en lugar de dar por seguro algo solo porque aparentemente funciona.'
],sources:[
{title:'ENISA · Threat Landscape 2026 (22 de septiembre de 2026)',url:'https://www.enisa.europa.eu/publications/enisa-threat-landscape-2026',why:'Informe europeo que analiza incidentes observados durante 2025 y permite contextualizar amenazas como ransomware y DDoS.'},
{title:'ENISA · Evolución del panorama de amenazas (22 de septiembre de 2026)',url:'https://www.enisa.europa.eu/news/exploring-the-evolution-of-the-cyber-threat-landscape-how-dependencies-weaken-our-digital-resilience',why:'Resumen de las principales conclusiones del informe y de los riesgos derivados de las dependencias digitales y del uso malicioso de IA.'},
{title:'INCIBE · Ciudadanía',url:'https://www.incibe.es/ciudadania',why:'Consejos prácticos para proteger dispositivos, cuentas, datos personales y navegación.'}
]},
{id:'gratitud',title:'Gratitud, agradecimiento y perdón: aprender también fuera del aula',body:[
'Para mí, la gratitud no siempre es sencilla. A veces cuesta agradecer cuando algo que deseas mucho no sucede, incluso después de haberlo intentado con dedicación y de haber puesto lo mejor de una misma. En esos momentos, decir simplemente «agradece y sigue adelante» puede quedarse corto, porque no hace desaparecer la decepción ni responde a todas las preguntas que una tiene.',
'Con el tiempo he ido entendiendo que agradecer no significa fingir que todo está bien, negar lo que duele o conformarse con cualquier situación. Puedo reconocer que algo no salió como esperaba y, al mismo tiempo, valorar lo que sí tengo, las oportunidades que he vivido y las personas que me han acompañado. Para mí, la gratitud tiene más sentido cuando nace de una reflexión sincera y no de una obligación.',
'También he pensado en el perdón. Pedir perdón requiere reconocer que nos hemos equivocado y aceptar que nuestras acciones pueden afectar a otras personas. No debería ser una palabra que se utiliza únicamente para terminar una discusión; tiene que ir acompañada de responsabilidad y de la intención de actuar de otra manera. Y perdonar tampoco significa justificar lo que estuvo mal, olvidar lo sucedido ni permitir que se repita.',
'Esta reflexión me recuerda que aprender no ocurre solamente cuando estudiamos un tema o conseguimos que un comando funcione. También aprendemos cuando revisamos nuestras decisiones, reconocemos nuestros errores y tratamos a los demás con más comprensión. En clase, como en la vida, no siempre sale todo a la primera. Saber rectificar, agradecer la ayuda y pedir disculpas cuando corresponde también demuestra madurez.',
'No quiero presentar la gratitud como una respuesta automática para cualquier dificultad. Para mí es una manera de mirar lo vivido con honestidad: reconocer lo bueno sin negar lo difícil, agradecer sin sentir que debo dejar de aspirar a más y entender el perdón como un proceso que necesita sinceridad, respeto y tiempo.'
],sources:[
{title:'Greater Good Science Center · Why Gratitude Is Good',url:'https://greatergood.berkeley.edu/article/item/why_gratitude_is_good',why:'Explica la gratitud desde la investigación y distingue agradecer de fingir que todo es perfecto.'},
{title:'Greater Good Science Center · What Is Forgiveness?',url:'https://greatergood.berkeley.edu/article/item/what_is_forgiveness',why:'Ayuda a profundizar en el perdón como proceso personal, sin confundirlo con justificar el daño o reconciliarse obligatoriamente.'},
{title:'American Psychological Association · Forgiveness',url:'https://www.apa.org/topics/forgiveness',why:'Define el perdón y aclara que no equivale a excusar una conducta ni a retomar una relación.'}
]},
{id:'adrian',title:'La charla de Adrián: inteligencia artificial, creatividad y aprendizaje',body:[
'El 5 de octubre de 2026 recibimos la charla de Adrián. Me resultó interesante porque nos acercó a una forma de trabajar con tecnología que va más allá de utilizar una aplicación ya preparada. Nos habló de proyectos y ejemplos en los que la inteligencia artificial se relaciona con imágenes, música, datos y decisiones. Aunque por falta de tiempo no llegamos a programar durante la sesión, los ejemplos me ayudaron a imaginar cómo se pueden llevar esas ideas a un proyecto real.',
'Uno de los ejemplos que más me llamó la atención fue el de los mapas musicales: partir de notas representadas en una imagen, convertir esa información en datos y utilizarla para generar ritmos o beats. Me hizo pensar que una imagen no tiene por qué quedarse en algo que solo miramos; también puede analizarse y transformarse en información con la que trabajar.',
'También hablamos de juegos y de sistemas que toman decisiones. Eso me ayudó a entender que la inteligencia artificial no se limita a un chat que contesta preguntas. Puede reconocer patrones, clasificar imágenes o seleccionar una respuesta a partir de lo que ha aprendido. El ejemplo de perros y gatos me pareció muy claro: si un modelo se entrena con imágenes poco variadas, puede fallar cuando se encuentra con un animal que no se parece a los ejemplos que conoce. Por eso los datos de entrenamiento importan tanto como el propio modelo.',
'El taller de reconocimiento de números manuscritos me permitió relacionar esa explicación con una demostración práctica. El sistema analizaba una imagen y proponía qué número aparecía. También se comentó ONNX, que permite representar modelos para utilizarlos en distintos entornos compatibles. Me pareció interesante comprobar que algo que parece tan sencillo como reconocer un número necesita un proceso previo de entrenamiento y una forma de ejecutar el modelo.',
'Lo que me llevo de la charla es que la inteligencia artificial puede conectar creatividad y tecnología, pero sus resultados no deben aceptarse sin revisarlos. Si los datos son incompletos o poco representativos, el sistema puede equivocarse. Como estudiante de SMR, me parece importante aprender a utilizar estas herramientas, pero también comprender sus límites, comprobar sus resultados y no confundir una predicción con una verdad absoluta.'
],sources:[
{title:'ONNX · Introduction to ONNX',url:'https://onnx.ai/onnx/intro/',why:'Documentación oficial para entender qué es ONNX y cómo facilita representar y utilizar modelos de aprendizaje automático en distintos entornos.'},
{title:'Google for Developers · Data quality and interpretation',url:'https://developers.google.com/machine-learning/guides/data-traps/quality',why:'Explica cómo los errores, la falta de calidad o los sesgos en los datos pueden afectar a los resultados de un modelo.'},
{title:'Google for Developers · Identifying bias',url:'https://developers.google.com/machine-learning/crash-course/fairness/identifying-bias',why:'Amplía la importancia de que los datos representen situaciones variadas y de revisar posibles sesgos.'}
]}
];

/* ---------- 3. EVIDENCIAS REALES (capturas auténticas extraídas de tus documentos) ----------
   Solo capturas de terminales, herramientas y configuraciones. Excluidos: logotipos de Docker/colegio,
   clipart (nube "Backup") y las diapositivas didácticas del profesor. */
const IMGS=/*EVIDENCE_IMGS*/{};
const SRC={
  exa:'Examen práctico: Docker y CyberChef · 14/10/26',
  dkr:'Prácticas sobre Docker (logs, top, stats, kill, inspect, cp)',
  var:'Prácticas Docker: variables de entorno',
  cpd:'CPD Arena · Misión 1',
  omv:'Tarea 1 · NAS con OpenMediaVault',
  pe4:'PE4 · John the Ripper'
};
const LABS=[
 {id:'docker',icon:'i-comandos',title:'Docker: contenedores',cam:5,
  meta:[['Documentos','Prácticas sobre Docker · Examen práctico'],['Herramienta','Docker en Kali Linux']],
  shots:[
   {img:'docker_run_debian',t:'docker run --name debian1 -it debian',s:SRC.exa},
   {img:'docker_ps_ultimo',t:'docker ps · docker ps -n 1',s:SRC.exa},
   {img:'docker_run_nginx200',t:'docker run --name nginx200 -d nginx · docker images',s:SRC.exa},
   {img:'docker_logs_nginx10',t:'docker logs nginx10',s:SRC.dkr},
   {img:'docker_top_nginx10',t:'docker top nginx10 (y docker exec en paralelo)',s:SRC.dkr},
   {img:'docker_stats_nginx10',t:'docker stats nginx10',s:SRC.dkr},
   {img:'docker_kill_nginx10',t:'docker kill nginx10',s:SRC.dkr},
   {img:'docker_pull_node',t:'docker pull node',s:SRC.dkr},
   {img:'docker_inspect_node_grep',t:'docker inspect node | grep NODE_VERSION',s:SRC.dkr},
   {img:'docker_cp_fichero',t:'docker cp fichero.txt nginx10:/tmp',s:SRC.dkr},
   {img:'docker_start_exec_ls_tmp',t:'docker start nginx10 · docker exec nginx10 ls /tmp',s:SRC.dkr}
  ]},
 {id:'variables',icon:'i-codigo',title:'Docker: variables de entorno',cam:5,
  meta:[['Documento','AML Prácticas Docker · Variables'],['Herramienta','Docker + PostgreSQL']],
  shots:[
   {img:'postgres_run_variables',t:'docker run con variables de entorno (-e)',s:SRC.var,note:'Revisa esta captura: muestra una contraseña de laboratorio en claro.'},
   {img:'postgres_psql_listado',t:'psql: listado de bases de datos',s:SRC.var}
  ]},
 {id:'cpd',icon:'i-lab',title:'CPD Arena',cam:5,
  meta:[['Documento','Misión 1 · Construye tu CPD'],['Autora','Laura Sofía Alba Medina']],
  shots:[
   {img:'cpd_arena_inicio',t:'CPD Arena · pantalla de inicio',s:SRC.cpd},
   {img:'cpd_equip_acceso',t:'Equipamiento y servicios · control de acceso',s:SRC.cpd},
   {img:'cpd_equip_copias',t:'Equipamiento y servicios · copias de seguridad',s:SRC.cpd},
   {img:'cpd_equip_generador',t:'Equipamiento y servicios · grupo electrógeno',s:SRC.cpd},
   {img:'cpd_equip_plan',t:'Equipamiento y servicios · plan de recuperación',s:SRC.cpd},
   {img:'cpd_prueba_estres_1',t:'Prueba de estrés nº 1',s:SRC.cpd},
   {img:'cpd_prueba_estres_2',t:'Prueba de estrés nº 2',s:SRC.cpd},
   {img:'cpd_resultado_final',t:'Configuración final del CPD',s:SRC.cpd}
  ]},
 {id:'omv',icon:'i-lab',title:'NAS con OpenMediaVault',cam:5,
  meta:[['Documento','Tarea 1 · NAS con OpenMediaVault 8'],['Entorno','VirtualBox · Red NAT']],
  shots:[
   {img:'omv_p04a',t:'Captura del documento · pág. 4',s:SRC.omv},{img:'omv_p04b',t:'Captura del documento · pág. 4',s:SRC.omv},
   {img:'omv_p07',t:'Captura del documento · pág. 7',s:SRC.omv},{img:'omv_p08a',t:'Captura del documento · pág. 8',s:SRC.omv},
   {img:'omv_p11a',t:'Captura del documento · pág. 11',s:SRC.omv},{img:'omv_p11b',t:'Captura del documento · pág. 11',s:SRC.omv},
   {img:'omv_p12',t:'Captura del documento · pág. 12',s:SRC.omv},{img:'omv_p13b',t:'Captura del documento · pág. 13',s:SRC.omv},
   {img:'omv_p14a',t:'Captura del documento · pág. 14',s:SRC.omv},{img:'omv_p15',t:'Captura del documento · pág. 15',s:SRC.omv},
   {img:'omv_p16',t:'Terminal de OMV · pág. 16',s:SRC.omv},{img:'omv_p19',t:'Terminal de OMV · pág. 19',s:SRC.omv}
  ]},
 {id:'john',icon:'i-comandos',title:'John the Ripper',cam:5,
  meta:[['Documento','PE4 · Alba Medina, Laura Sofía'],['Herramienta','John the Ripper en Kali Linux']],
  shots:[
   {img:'john_crack',t:'john --format=crypt password.hashes',s:SRC.pe4},
   {img:'john_show',t:'john --show password.hashes',s:SRC.pe4},
   {img:'john_test',t:'john --test',s:SRC.pe4}
  ]},
 {id:'lynis',icon:'i-comandos',title:'Auditoría de seguridad con Lynis',cam:5,meta:[['Documento','A1 · Lynis'],['Entorno','Debian / Kali Linux']],shots:[{img:'lynis_p03',t:'Auditoría Lynis · página 3',s:'A1 Lynis · Laura Sofía Alba Medina'},{img:'lynis_p04',t:'Resultado y warnings · página 4',s:'A1 Lynis · Laura Sofía Alba Medina'},]},
 {id:'blockchain',icon:'i-resultados',title:'Blockchain · AulaCoin',cam:6,
  meta:[['Documento','Blockchain · Sesión 2 · Ficha del alumno'],['Entorno','Navegador de LliureX']],
  shots:[],shotsNote:'La ficha de AulaCoin no contiene capturas de pantalla: este espacio está listo para las evidencias de monedero, minería, pagos y retos hacker cuando se incorporen.'},
 {id:'cyberchef',icon:'i-codigo',title:'Criptografía · CyberChef',cam:6,
  meta:[['Documento',SRC.exa],['Herramienta','CyberChef (GCHQ)']],
  shots:[
   {img:'cyberchef_vigenere',t:'CyberChef · receta Vigenère Decode',s:SRC.exa},
   {img:'cyberchef_frecuencias',t:'CyberChef · Frequency distribution',s:SRC.exa},
   {img:'cyberchef_rot13',t:'CyberChef · ROT13',s:SRC.exa}
  ]}
];

/* ---------- 4. LAS SIETE CÁMARAS ---------- */
const CH=[
 {n:1,roman:'I',  name:'Cámara 01',title:'Tema 1',  sub:'Conceptos sobre Seguridad Informática', kind:'tema',scene:'hall',  accent:'#E4C77D',bg:'#0b1512',sig:'sig-1',px:330, py:830,col:['#E4C77D','#B58A45','#7a5a25']},
 {n:2,roman:'II', name:'Cámara 02',title:'Tema 2',  sub:'Criptografía',                          kind:'tema',scene:'sphinx',accent:'#5fc4bd',bg:'#08171a',sig:'sig-2',px:1235,py:790,col:['#7fe0d8','#277C78','#124b49'],xref:{n:6,lab:'cyberchef',t:'Ver las prácticas de CyberChef'}},
 {n:3,roman:'III',name:'Cámara 03',title:'Tema 3',  sub:'Seguridad pasiva: equipos',             kind:'tema',scene:'nile',  accent:'#8db8ee',bg:'#08121f',sig:'sig-3',px:640, py:655,col:['#9cc4f2','#2c5f9a','#173C67'],xref:{n:5,lab:'cpd',t:'Ver el laboratorio CPD Arena'}},
 {n:4,roman:'IV', name:'Cámara 04',title:'Tema 4',  sub:'Seguridad pasiva: almacenamiento',      kind:'tema',scene:'obelisk',accent:'#E4C77D',bg:'#140f09',sig:'sig-4',px:1275,py:560,col:['#F5EAD5','#D8BD8C','#8e6c36'],xref:{n:5,lab:'omv',t:'Ver el laboratorio NAS con OpenMediaVault'}},
 {n:5,roman:'V',  name:'Cámara 05',title:'Prácticas y laboratorios',sub:'Laboratorios arqueológicos y cámaras tecnológicas',kind:'labs',scene:'lab',accent:'#f0b45f',bg:'#120d09',sig:'sig-5',px:420, py:470,col:['#ffd48a','#c98b33','#7c4f16'],labs:['docker','variables','cpd','omv','john','lynis']},
 {n:6,roman:'VI', name:'Cámara 06',title:'Blockchain y criptografía',sub:'Actividades relacionadas, cuando corresponda',kind:'labs',scene:'maat',accent:'#9db8ff',bg:'#070d1c',sig:'sig-6',px:1140,py:330,col:['#a9c2ff','#3a63b8','#173C67'],labs:['blockchain','cyberchef']},
 {n:7,roman:'VII',name:'Cámara 07',title:'Crónicas del explorador',sub:'Experiencias y reflexiones personales',kind:'chron',scene:'garden',accent:'#f2c9a0',bg:'#0b1214',sig:'sig-7',px:640, py:215,col:['#ffe0bf','#c2855a','#6b3f2a']}
];
const SLOT_ICON={explicacion:'i-explicacion',desarrollo:'i-desarrollo',comandos:'i-comandos',codigo:'i-codigo',capturas:'i-capturas',resultados:'i-resultados',ps:'i-problemas',reflexion:'i-reflexion',situacion:'i-explicacion'};
const SLOT_META={
  explicacion:['Explicaciones completas','Teoría'],
  desarrollo:['Desarrollo de las actividades','Proceso'],
  comandos:['Comandos','Terminal'],
  codigo:['Fragmentos de código','Configuración'],
  capturas:['Capturas de pantalla','Evidencias'],
  resultados:['Resultados','Hallazgos'],
  ps:['Problemas y soluciones','Diario técnico'],
  reflexion:['Reflexiones personales','Aprendizaje'],
  situacion:['Situación actual en la ciberseguridad','Actualidad']
};
const PEND={
  explicacion:'Aquí se integrará la explicación completa del contenido, con todo el desarrollo teórico.',
  desarrollo:'Aquí se narrará, paso a paso, cómo se desarrolló cada actividad.',
  comandos:'Aquí aparecerá cada comando ejecutado, con su explicación y su salida.',
  codigo:'Aquí se incorporarán los fragmentos de código y archivos de configuración.',
  capturas:'Aquí se colocarán las capturas originales de las ejecuciones reales.',
  resultados:'Aquí se expondrá el resultado obtenido en cada actividad.',
  problemas:'Problemas encontrados durante el trabajo.',
  soluciones:'Cómo se resolvió cada problema.',
  reflexion:'Las tres crónicas personales están reunidas exclusivamente en la Cámara 7.',
  situacion:'Aquí se resumirá la situación actual de la ciberseguridad, con datos y noticias citando fuente y fecha.'
};

/* ---------- 5. UTILIDADES ---------- */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v)), lerp=(a,b,t)=>a+(b-a)*t, sstep=(a,b,x)=>{x=clamp((x-a)/(b-a),0,1);return x*x*(3-2*x)};
const rnd=(function(){let s=11;return function(){s=(s*16807)%2147483647;return (s-1)/2147483646}})();
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mq=q=>{try{return matchMedia(q).matches}catch(e){return false}};
const REDUCED=mq('(prefers-reduced-motion: reduce)');
const FINE=mq('(hover:hover) and (pointer:fine)');
const safe=(fn,fb)=>{try{return fn()}catch(e){return fb}};
const GL=['ankh','eye','scarab','feather','djed','was','sun','water','lotus','cobra'];
const use=(id,x,y,s,cls,i)=>`<use href="#g-${id}" x="${x}" y="${y}" width="${s}" height="${s}" class="${cls||'glyph'}" style="--i:${i||0}"/>`;
const grad=(id,stops,x2=0,y2=1,x1=0,y1=0)=>`<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(s=>`<stop offset="${s[0]}" stop-color="${s[1]}"${s[2]!=null?` stop-opacity="${s[2]}"`:''}/>`).join('')}</linearGradient>`;
const rgrad=(id,stops,cx=.5,cy=.5,r=.5)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(s=>`<stop offset="${s[0]}" stop-color="${s[1]}"${s[2]!=null?` stop-opacity="${s[2]}"`:''}/>`).join('')}</radialGradient>`;

/* ---------- 6. FORMAS REUTILIZABLES (siluetas egipcias) ---------- */
const feather=(L,w)=>`M0 0C${L*.25} ${-w} ${L*.8} ${-w*.95} ${L} 0C${L*.8} ${w*.95} ${L*.25} ${w} 0 0Z`;
const pyrShape=(x,y,w,h,f1,f2,extra='')=>`<g ${extra}><polygon points="${x-w/2},${y} ${x},${y-h} ${x-w*.04},${y+w*.12}" fill="${f1}"/><polygon points="${x},${y-h} ${x+w/2},${y+w*.02} ${x-w*.04},${y+w*.12}" fill="${f2}"/></g>`;
const SPHINX='M300 0L296-28Q260-44 200-46Q165-48 150-58Q142-80 128-98Q112-114 92-108Q72-100 70-78L66-62Q74-52 84-46L70-32L0-22L0 0Z';
const SEATED=(x,y,s,fill,rim)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}" stroke="${rim}" stroke-width="2"><path d="M30 180h140v130H30z" opacity=".85"/><path d="M78 6h44l14 24v34l-10 16h-52l-10-16V30z"/><path d="M62 82h76l18 22v88H44v-88z"/><path d="M44 190h112v40H44z"/><path d="M50 230h42v74H50zM108 230h42v74h-42z"/><path d="M30 292h70v18H30zM100 292h70v18h-70z"/><path d="M92 82v-6h16v6" /><path d="M100 4q-7 8 0 20q7-12 0-20" fill="${rim}" stroke="none"/></g>`;
const ANUBIS=(x,y,s,fill,rim)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}" stroke="${rim}" stroke-width="2.2" stroke-linejoin="round"><path d="M30 178L30 120Q22 100 30 82Q34 70 38 58L30 6L48 40Q56 34 66 38L76 4L78 46Q86 54 94 60L98 66L90 72L76 74Q70 80 70 90Q74 110 74 130L78 150Q80 165 72 178Z" transform="translate(-50 -178)"/><path d="M-62 0h100" stroke="none"/></g>`;
const BASTET=(x,y,s,fill,rim)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="${fill}" stroke="${rim}" stroke-width="2.2" stroke-linejoin="round"><path d="M26 168Q14 150 22 120Q26 98 34 82Q28 70 30 56L28 24L42 38Q50 34 58 38L72 24L70 56Q72 70 66 82Q76 100 78 124Q82 150 74 168Z" transform="translate(-50 -168)"/><path d="M26 -8q34 -4 26 -42" fill="none" transform="translate(-6 0)"/></g>`;

/* ---------- 7. ESCENA DE LA PORTADA ---------- */
function buildGoddess(){
  const wing=s=>{
    const tiers=[{L:640,w:44,n:11,a0:-64,a1:30,f:'url(#gwA)'},{L:470,w:40,n:11,a0:-54,a1:44,f:'url(#gwB)'},{L:300,w:36,n:10,a0:-42,a1:56,f:'url(#gwC)'}];
    let o='';
    tiers.forEach((t,ti)=>{for(let i=0;i<t.n;i++){const k=i/(t.n-1),a=t.a0+(t.a1-t.a0)*k,L=t.L*(1-.17*Math.abs(k-.42));
      o+=`<path d="${feather(L,t.w)}" transform="translate(${s*60} -508) scale(${s} 1) rotate(${a})" fill="${t.f}" stroke="rgba(255,236,180,.65)" stroke-width="1.6"/>`;
      o+=`<path d="M0 0L${L*.95} 0" transform="translate(${s*60} -508) scale(${s} 1) rotate(${a})" stroke="rgba(255,240,190,.28)" stroke-width="1.2" fill="none"/>`;}});
    return `<g class="wing-sway">${o}</g>`;
  };
  const pleats=[...Array(9)].map((_,i)=>`<path d="M${-34+i*8.5} -372 Q${-34+i*8.5+(i-4)*1.5} -200 ${-30+i*7.5} -26" stroke="rgba(120,86,30,.35)" stroke-width="1.3" fill="none"/>`).join('');
  return `
  <defs>
    ${grad('gwA',[[0,'#0e2f55'],[.6,'#173C67'],[1,'#277C78']],1,0)}
    ${grad('gwB',[[0,'#1d6a68'],[1,'#3fa7a0']],1,0)}
    ${grad('gwC',[[0,'#8e6a2c'],[.6,'#E4C77D'],[1,'#fff0b8']],1,0)}
    ${grad('gDress',[[0,'#fff3cf'],[.5,'#e9d29a'],[1,'#a98038']],1,0)}
    ${grad('gSkin',[[0,'#e8c98f'],[1,'#b98d4b']],0,1)}
    ${rgrad('gHalo',[[0,'#fff8d8',1],[.35,'#ffe9a6',.75],[.7,'#E4C77D',.18],[1,'#E4C77D',0]])}
    ${rgrad('gDisk',[[0,'#fffbe6'],[.6,'#ffe08f'],[1,'#c98b33']])}
    ${grad('gFloor',[[0,'#E4C77D',.5],[1,'#E4C77D',0]],0,1)}
    <filter id="gGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <g transform="translate(800 872)">
    <ellipse cx="0" cy="8" rx="330" ry="26" fill="url(#gFloor)"/>
    <circle cx="0" cy="-560" r="420" fill="url(#gHalo)" opacity=".9"/>
    <g class="halo-ring" opacity=".7"><circle cx="0" cy="-640" r="208" fill="none" stroke="#E4C77D" stroke-width="1.6" stroke-dasharray="2 9"/><circle cx="0" cy="-640" r="236" fill="none" stroke="#E4C77D" stroke-width="1" opacity=".6"/>
      ${[...Array(24)].map((_,i)=>{const a=i*15*Math.PI/180;return `<path d="M${Math.cos(a)*236} ${-640+Math.sin(a)*236}L${Math.cos(a)*252} ${-640+Math.sin(a)*252}" stroke="#E4C77D" stroke-width="2"/>`}).join('')}</g>
    ${wing(-1)}${wing(1)}
    <g filter="url(#gGlow)">
      <path d="M-56 -520L56 -520Q64 -420 50 -330L40 -22L-40 -22L-50 -330Q-64 -420 -56 -520Z" fill="url(#gDress)" stroke="#fff0b8" stroke-width="1.5"/>
      ${pleats}
      <path d="M-52 -380Q0 -362 52 -380L50 -356Q0 -338 -50 -356Z" fill="#173C67" stroke="#E4C77D" stroke-width="2"/>
      <path d="M-46 -30Q0 -14 46 -30L44 -10Q0 6 -44 -10Z" fill="#B58A45" stroke="#fff0b8"/>
      <path d="M-56 -516L-86 -328L-70 -322L-44 -500Z" fill="url(#gSkin)"/><path d="M56 -516L86 -328L70 -322L44 -500Z" fill="url(#gSkin)"/>
      <g transform="translate(-92 -392)" fill="none" stroke="#fff0b8" stroke-width="5" stroke-linecap="round"><ellipse cx="0" cy="-22" rx="11" ry="15"/><path d="M0 -7V44M-15 6h30"/></g>
      <g transform="translate(92 -394)" fill="none" stroke="#fff0b8" stroke-width="5" stroke-linecap="round"><path d="M0 70V-34M-9 70h18M0 -34q-12-3-14-15q8 3 14 3q6 0 14-3q-2 12-14 15"/></g>
      <rect x="-13" y="-566" width="26" height="40" fill="url(#gSkin)"/>
      <g fill="none" stroke-width="9" stroke-linecap="round"><path d="M-66 -532Q0 -490 66 -532" stroke="#173C67"/><path d="M-76 -520Q0 -470 76 -520" stroke="#277C78"/><path d="M-86 -508Q0 -450 86 -508" stroke="#E4C77D"/></g>
      <path d="M-30 -590Q-34 -640 0 -652Q34 -640 30 -590L34 -520L-34 -520Z" fill="#0a1514" stroke="#E4C77D" stroke-width="1.5"/>
      ${[...Array(6)].map((_,i)=>`<path d="M${-26+i*10.4} -640L${-30+i*12} -524" stroke="#B58A45" stroke-width="1.4" opacity=".7"/>`).join('')}
      <ellipse cx="0" cy="-596" rx="21" ry="29" fill="url(#gSkin)"/>
      <path d="M-14 -602Q-8 -607 -2 -602M2 -602Q8 -607 14 -602M-16 -603h-8M16 -603h8" stroke="#0a1514" stroke-width="2.6" stroke-linecap="round" fill="none"/>
      <path d="M-5 -582Q0 -578 5 -582" stroke="#8e3a2a" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M0 -630q-6 -4 0 -14q6 10 0 14" fill="#E4C77D"/>
      <path d="M-26 -668Q-96 -690 -92 -756Q-70 -724 -22 -712Z" fill="#E4C77D" stroke="#fff0b8" stroke-width="1.5"/><path d="M26 -668Q96 -690 92 -756Q70 -724 22 -712Z" fill="#E4C77D" stroke="#fff0b8" stroke-width="1.5"/>
      <circle cx="0" cy="-724" r="38" fill="url(#gDisk)" stroke="#fff0b8" stroke-width="2"/>
    </g>
  </g>`;
}
function buildPylon(){
  const gl=[];let k=0;
  [78,160,242,324].forEach((x,ci)=>{for(let y=240,r=0;y<820;y+=58,r++){const id=GL[(ci*3+r)%GL.length];gl.push(use(id,x,y,38,'glyph',k++%12))}});
  return `<defs>
    ${grad('pyF',[[0,'#05090a'],[.55,'#14201d'],[.9,'#6e5326'],[1,'#d9b668']],1,0)}
    ${grad('pyT',[[0,'#0b1514'],[1,'#3a2c14']],0,1)}
  </defs>
  <g>
    <path d="M-40 900V146H330L420 900Z" fill="url(#pyF)"/>
    <path d="M-40 146H330L420 900" fill="none" stroke="rgba(255,226,150,.55)" stroke-width="2.4"/>
    <path d="M-60 150Q-60 118 -20 108H362Q404 118 404 152Z" fill="url(#pyT)" stroke="#E4C77D" stroke-width="2.4"/>
    <path d="M-40 164H340" stroke="rgba(228,199,125,.55)" stroke-width="2"/>
    ${[...Array(8)].map((_,i)=>`<path d="M-30 ${176+i*9}H${334+i*.5}" stroke="rgba(0,0,0,.25)" stroke-width="1"/>`).join('')}
    <rect x="30" y="196" width="312" height="640" fill="rgba(0,0,0,.18)" stroke="rgba(228,199,125,.3)"/>
    ${[...Array(10)].map((_,i)=>`<path d="M-40 ${210+i*66}H${300+i*7}" stroke="rgba(0,0,0,.2)" stroke-width="1.4"/>`).join('')}
    ${gl.join('')}
    <path d="M380 150V900" stroke="rgba(255,236,170,.55)" stroke-width="4" opacity=".7"/>
  </g>`;
}
function buildSky(){
  const stars=[...Array(70)].map((_,i)=>`<circle cx="${rnd()*1600}" cy="${rnd()*430}" r="${.5+rnd()*1.4}" fill="#fff6dc" class="twinkle" style="--i:${i%11}"/>`).join('');
  return `<defs>
    ${grad('sk',[[0,'#04080a'],[.28,'#0a1c1c'],[.5,'#1a4a47'],[.66,'#7a6a3a'],[.78,'#E4C77D'],[1,'#f3dca0']])}
    ${rgrad('sunG',[[0,'#ffffff',1],[.12,'#fff3c8',1],[.3,'#ffe08f',.55],[.65,'#E4C77D',.14],[1,'#E4C77D',0]])}
  </defs>
  <rect width="1600" height="900" fill="url(#sk)"/>${stars}
  <circle cx="800" cy="690" r="620" fill="url(#sunG)"/><circle cx="800" cy="690" r="86" fill="#fffbe9"/>
  <path d="M0 690H1600" stroke="#fff3c8" stroke-width="2" opacity=".4"/>`;
}
function buildFar(){
  const c1='#1f4f4a',c2='#0e2a2a',l1='#e8c879';
  return `<defs>${grad('haze',[[0,'#E4C77D',0],[1,'#E4C77D',.5]])}${grad('pf1',[[0,'#7b6a3d'],[1,'#274c46']])}${grad('pf2',[[0,'#173a37'],[1,'#0a1b1b']])}</defs>
  <g opacity=".95">
    ${pyrShape(470,700,330,230,'url(#pf1)','url(#pf2)')}
    ${pyrShape(650,704,230,160,'url(#pf1)','url(#pf2)')}
    ${pyrShape(790,706,150,100,'url(#pf1)','url(#pf2)')}
    <path d="M470 470L436 704" stroke="${l1}" stroke-width="1.6" opacity=".7"/><path d="M650 544L618 704" stroke="${l1}" stroke-width="1.4" opacity=".6"/>
    <g transform="translate(1030 706)" fill="#14302e" stroke="${l1}" stroke-width="1.4" stroke-opacity=".55"><path d="${SPHINX}" transform="scale(1.05)"/></g>
    ${pyrShape(1290,704,200,130,'url(#pf1)','url(#pf2)')}
    <path d="M0 690H1600V710H0Z" fill="url(#haze)"/>
  </g>`;
}
function buildDunes(){
  return `<defs>${grad('d1',[[0,'#2b6b66'],[1,'#0e2a29']])}${grad('d2',[[0,'#b89246'],[.4,'#4a4a2c'],[1,'#10201e']])}${grad('d3',[[0,'#d8bd8c'],[.25,'#8a6a32'],[1,'#0b1514']])}${grad('nileG',[[0,'#277C78'],[.5,'#fff0b8'],[1,'#277C78']],1,0)}</defs>
  <path d="M0 720Q180 686 380 716T760 706T1180 714T1600 700V900H0Z" fill="url(#d1)"/>
  <path class="river-glint" d="M0 744Q260 722 560 748T1160 742T1600 736V754Q1300 762 1000 756T500 764T0 758Z" fill="url(#nileG)" opacity=".8"/>
  <path d="M0 780Q200 744 460 776T980 768T1600 772V900H0Z" fill="url(#d2)"/>
  <path d="M0 780Q200 744 460 776T980 768T1600 772" fill="none" stroke="rgba(255,226,150,.6)" stroke-width="2"/>
  <path d="M-20 840Q220 800 520 838T1120 828T1640 830V900H-20Z" fill="url(#d3)" opacity=".92"/>
  <path d="M-20 840Q220 800 520 838T1120 828T1640 830" fill="none" stroke="rgba(255,236,170,.5)" stroke-width="2"/>`;
}
function buildAvenue(){
  const sph=[];
  for(let i=0;i<6;i++){const t=i/5,y=860-t*128,s=1-t*.74,xo=250*s+34;
    [-1,1].forEach(sg=>sph.push(`<g transform="translate(${800+sg*(xo+80*s)} ${y}) scale(${sg*s})" fill="#101b19" stroke="rgba(255,226,150,.55)" stroke-width="${2/s*.7}"><path d="${SPHINX}" transform="scale(.42)"/></g>`));}
  const obe=(x,h,s)=>`<g transform="translate(${x} 790)"><path d="M${-16*s} 0L${-11*s} ${-h}L0 ${-h-34*s}L${11*s} ${-h}L${16*s} 0Z" fill="#14231f" stroke="#E4C77D" stroke-width="2"/><path d="M${-11*s} ${-h}L0 ${-h-34*s}L${11*s} ${-h}Z" fill="#E4C77D" opacity=".85"/>${[0,1,2,3,4].map(i=>use(GL[(i*2)%10],-8*s,-h+40+i*64,16*s,'glyph',i)).join('')}</g>`;
  return `<defs>${grad('av',[[0,'#fff3c8',.95],[.5,'#c9a45a',.55],[1,'#2b2210',.9]])}</defs>
  <path d="M770 706L830 706L1290 900H310Z" fill="url(#av)"/>
  ${[...Array(9)].map((_,i)=>{const t=i/8,y=706+Math.pow(t,1.6)*194;return `<path d="M${800-30-Math.pow(t,1.6)*490} ${y}H${800+30+Math.pow(t,1.6)*490}" stroke="rgba(60,40,10,.35)" stroke-width="${1+t*2}"/>`}).join('')}
  <path d="M800 706L800 900" stroke="rgba(60,40,10,.2)"/>
  ${sph.join('')}${obe(300,300,1.2)}${obe(1300,300,1.2)}`;
}

/* ---------- 8. MAPA ILUSTRADO ---------- */
function catmull(pts){let d=`M${pts[0][0]} ${pts[0][1]}`;for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;
  d+=` C${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)} ${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)},${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)} ${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)},${p2[0]} ${p2[1]}`}return d}
const NILE='M930 1020C880 920 1010 840 960 740S850 590 930 490S1060 350 990 250S930 160 950 96';
function pyramidMap(c,i){
  const sc=.78+c.py/1000*.5, w=210*sc, h=170*sc, x=c.px, y=c.py;
  const id='pm'+c.n, [a,b,d]=c.col;
  const L=[x-w/2,y], F=[x-w*.05,y+w*.17], R=[x+w/2,y-w*.03], A=[x,y-h];
  const course=(t)=>{const lx=L[0]+(A[0]-L[0])*t,ly=L[1]+(A[1]-L[1])*t,fx=F[0]+(A[0]-F[0])*t,fy=F[1]+(A[1]-F[1])*t,rx=R[0]+(A[0]-R[0])*t,ry=R[1]+(A[1]-R[1])*t;return `<path d="M${lx} ${ly}L${fx} ${fy}L${rx} ${ry}" fill="none" stroke="rgba(30,18,4,.28)" stroke-width="1.2"/>`};
  const plateY=y+w*.17+34;
  return `<g class="pyr" data-n="${c.n}" tabindex="0" role="button" aria-label="${c.name}: ${esc(c.title)}. ${esc(c.sub)}. Pulsa para entrar.">
    <defs>${grad(id+'l',[[0,a],[1,b]],.2,1)}${grad(id+'r',[[0,b],[1,d]],.4,1)}${rgrad(id+'h',[[0,a,.95],[.5,a,.28],[1,a,0]])}</defs>
    <circle class="pulse" cx="${x}" cy="${y+w*.06}" r="${w*.42}" style="--i:${i}"/><circle class="pulse" cx="${x}" cy="${y+w*.06}" r="${w*.42}" style="--i:${i+3}"/>
    <ellipse cx="${x+w*.18}" cy="${y+w*.12}" rx="${w*.6}" ry="${w*.12}" fill="rgba(25,14,2,.45)"/>
    <ellipse class="halo" cx="${x}" cy="${y-h*.32}" rx="${w*.95}" ry="${h*.8}" fill="url(#${id}h)"/>
    <g class="lift">
      <polygon class="face-l" points="${L},${A},${F}" fill="url(#${id}l)" stroke="#2a1a06" stroke-width="1.5" stroke-linejoin="round"/>
      <polygon class="face-r" points="${A},${R},${F}" fill="url(#${id}r)" stroke="#2a1a06" stroke-width="1.5" stroke-linejoin="round"/>
      ${[.2,.4,.6,.8].map(course).join('')}
      <path class="edge" d="M${A}L${F}" stroke="#fff3c8" stroke-width="2.2" opacity=".85"/>
      <path d="M${x-w*.05} ${y-h-12}l-8 -14 8 -14 8 14z" fill="#fff3c8" stroke="#2a1a06" stroke-width="1.2" class="bob"><animateTransform attributeName="transform" type="translate" values="0 0;0 -7;0 0" dur="3.2s" repeatCount="indefinite" begin="${i*.3}s"/></path>
    </g>
    <g class="label">
      <rect x="${x-34}" y="${plateY-16}" width="68" height="28" rx="14" fill="#f0e0b3" stroke="#6b4a1b" stroke-width="2"/><rect x="${x-29}" y="${plateY-11}" width="58" height="18" rx="9" fill="none" stroke="#b58a45" stroke-width="1"/>
      <text x="${x}" y="${plateY+4}" text-anchor="middle" class="map-cap" style="font-size:15px;fill:#4a3010;letter-spacing:.12em">${c.roman}</text>
      <text x="${x}" y="${plateY+38}" text-anchor="middle" class="mp-label">${c.name.toUpperCase()}</text>
      <text x="${x}" y="${plateY+62}" text-anchor="middle" class="mp-sub">${esc(c.title)}</text>
      <text x="${x}" y="${plateY+86}" text-anchor="middle" class="mp-sub hint" style="font-size:16px;fill:#ffe9a6">▸ pulsa para entrar</text>
    </g>
    <ellipse class="ring-focus" cx="${x}" cy="${y-h*.3}" rx="${w*.62}" ry="${h*.74}"/>
    <rect x="${x-w*.66}" y="${y-h-30}" width="${w*1.32}" height="${h+w*.17+150}" fill="transparent"/>
  </g>`;
}
function buildMap(){
  const dunes=[...Array(150)].map(()=>{const x=rnd()*1600,y=90+rnd()*880,s=8+rnd()*16;if(Math.abs(x-(960-(y-500)*.04))<110)return'';return `<path d="M${x} ${y}q${s} ${-s*.7} ${s*2} 0" fill="none" stroke="#7b5a20" stroke-width="1.4" opacity="${.18+rnd()*.28}" stroke-linecap="round"/>`}).join('');
  const waves=[...Array(34)].map((_,i)=>`<path d="M${i*50-10} ${28+(i%3)*12}q12 -9 25 0t25 0" fill="none" stroke="#fff" stroke-width="1.3" opacity=".35"/>`).join('');
  const pts=CH.map(c=>[c.px,c.py+30]);
  const route=catmull(pts);
  const palms=(x,y)=>`<g transform="translate(${x} ${y})" stroke="#2a3a1a" stroke-width="2" fill="#2f5a34">${[-1,0,1].map((k,j)=>`<g transform="translate(${k*34} ${j%2*10})"><path d="M0 0Q4 -24 0 -44" fill="none" stroke="#5b3d12" stroke-width="4"/>${[-70,-35,0,35,70].map(a=>`<path d="M0 -44Q${Math.sin(a*Math.PI/180)*22} ${-62-Math.cos(a*Math.PI/180)*6} ${Math.sin(a*Math.PI/180)*34} ${-44+Math.abs(a)*.28}" fill="none" stroke="#2f5a34" stroke-width="3.2" stroke-linecap="round"/>`).join('')}</g>`).join('')}</g>`;
  const temple=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="#cfb27a" stroke="#4a3010" stroke-width="1.6"><path d="M-44 0h88v-8h-88z"/><path d="M-40 -8h80v-6h-80z"/>${[-30,-10,10,30].map(c=>`<rect x="${c-4}" y="-44" width="8" height="30"/>`).join('')}<path d="M-46 -44h92l-8 -10h-76z"/></g>`;
  const secret=(x,y)=>`<g transform="translate(${x} ${y})"><circle r="34" fill="rgba(80,50,10,.12)" stroke="#5b3d12" stroke-width="2" stroke-dasharray="4 6"/><g stroke="#5b3d12" stroke-width="2" fill="none"><use href="#g-eye" x="-18" y="-18" width="36" height="36" style="stroke:#5b3d12"/></g></g>`;
  const compass=`<g transform="translate(1455 905)"><circle r="62" fill="rgba(240,224,179,.5)" stroke="#5b3d12" stroke-width="2"/><circle r="50" fill="none" stroke="#5b3d12" stroke-width="1" stroke-dasharray="2 5"/><path d="M0 -92L10 -10L0 0L-10 -10Z" fill="#7a2a1a" stroke="#2a1a06"/><path d="M0 92L10 10L0 0L-10 10Z" fill="#c9b27a" stroke="#2a1a06"/><path d="M-92 0L-10 -10L0 0L-10 10Z" fill="#c9b27a" stroke="#2a1a06"/><path d="M92 0L10 -10L0 0L10 10Z" fill="#c9b27a" stroke="#2a1a06"/><text y="-100" text-anchor="middle" class="map-cap" style="font-size:20px">N</text><text y="118" text-anchor="middle" class="map-cap" style="font-size:16px">S</text><text x="-108" y="6" text-anchor="middle" class="map-cap" style="font-size:16px">O</text><text x="108" y="6" text-anchor="middle" class="map-cap" style="font-size:16px">E</text></g>`;
  return `<defs>
    ${rgrad('pg',[[0,'#ecd7a4'],[.7,'#d4b57a'],[1,'#a67f42']],.5,.45,.75)}
    ${grad('sea',[[0,'#173C67',.8],[1,'#2d6b93',.35]])}
    ${grad('nl',[[0,'#1f7c86'],[.5,'#5cc7bf'],[1,'#1f7c86']],1,0)}
    <filter id="paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .02" numOctaves="5" seed="8" result="n"/><feColorMatrix in="n" values="0 0 0 0 .35 0 0 0 0 .22 0 0 0 0 .08 0 0 0 .55 -.12"/></filter>
    <filter id="fibers"><feTurbulence type="fractalNoise" baseFrequency=".9 .05" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 .3 0 0 0 0 .2 0 0 0 0 .08 0 0 0 .5 -.15"/></filter>
    ${rgrad('burn',[[.55,'#000',0],[1,'#3a2208',.62]],.5,.5,.78)}
    <filter id="ds"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#2a1a06" flood-opacity=".5"/></filter>
  </defs>
  <g id="mpBase">
    <rect x="-40" y="-30" width="1680" height="1060" fill="url(#pg)"/>
    <rect x="-40" y="-30" width="1680" height="1060" filter="url(#paper)" opacity=".75"/>
    <rect x="-40" y="-30" width="1680" height="1060" filter="url(#fibers)" opacity=".35"/>
    <path d="M-40 -30H1640V52Q1500 80 1380 58T1120 66T820 52T520 70T240 52T-40 70Z" fill="url(#sea)"/>${waves}
    <path d="M1540 -30H1640V1030H1580Q1540 800 1560 520T1540 -30Z" fill="url(#sea)" opacity=".85"/>
    <text x="520" y="40" class="map-cap-i" style="font-size:22px;fill:#e6edf5;opacity:.85;letter-spacing:.3em">MAR MEDITERRÁNEO</text>
    <text transform="translate(1612 560) rotate(90)" class="map-cap-i" style="font-size:20px;fill:#e6edf5;opacity:.85;letter-spacing:.3em">MAR ROJO</text>
    ${dunes}
    <path d="M60 330Q260 250 470 322T860 300" fill="none" stroke="#8a6628" stroke-width="2" opacity=".35"/><path d="M1080 880Q1280 830 1480 870" fill="none" stroke="#8a6628" stroke-width="2" opacity=".3"/>
    <path d="${NILE}" fill="none" stroke="#7d9b57" stroke-width="170" opacity=".28" stroke-linecap="round"/>
    <path d="${NILE}" fill="none" stroke="#5f8a4a" stroke-width="84" opacity=".32" stroke-linecap="round"/>
    <path d="M950 96C910 70 860 60 830 40M950 96C940 70 940 56 944 36M950 96C975 74 1010 62 1040 40M950 96C990 90 1040 84 1100 62M950 96C900 96 850 90 800 74" fill="none" stroke="#2f8f95" stroke-width="9" stroke-linecap="round"/>
    <path d="${NILE}" fill="none" stroke="#1d6f78" stroke-width="40" stroke-linecap="round"/>
    <path d="${NILE}" fill="none" stroke="url(#nl)" stroke-width="30" stroke-linecap="round"/>
    <path class="nile-flow" d="${NILE}" fill="none" stroke="#e8fffb" stroke-width="3" opacity=".7" stroke-linecap="round"/>
    <text transform="translate(985 880) rotate(-70)" class="map-cap-i" style="font-size:24px;fill:#e8fffb;letter-spacing:.35em;paint-order:stroke;stroke:#1d6f78;stroke-width:3px">RÍO NILO</text>
  </g>
  <g id="mpMid">
    <ellipse cx="170" cy="680" rx="84" ry="40" fill="#3da9a1" stroke="#1d6f78" stroke-width="3" opacity=".9"/><ellipse cx="160" cy="676" rx="52" ry="20" fill="#7fe0d8" opacity=".6"/>${palms(130,664)}${palms(220,700)}
    <text x="170" y="750" text-anchor="middle" class="map-cap-i" style="font-size:20px">Oasis de las Palmas</text>
    <g transform="translate(70 250)"><g fill="#c8a966" stroke="#4a3010" stroke-width="2" filter="url(#ds)"><path d="${SPHINX}" transform="scale(.62) translate(0 0)"/></g>
      <g transform="translate(130 -4)">${pyrShape(0,0,70,52,'#d9b668','#8a6628','stroke="#4a3010" stroke-width="1.4"')}${pyrShape(58,8,48,36,'#d9b668','#8a6628','stroke="#4a3010" stroke-width="1.4"')}</g>
      <text x="40" y="44" class="map-cap-i" style="font-size:20px">La Esfinge y Guiza</text></g>
    ${temple(1390,440,1.15)}<text x="1390" y="462" text-anchor="middle" class="map-cap-i" style="font-size:19px">Templo olvidado</text>
    ${temple(140,500,.9)}${temple(1370,900,.9)}${temple(780,880,.8)}
    ${secret(1390,175)}${secret(110,850)}${secret(1440,690)}${secret(800,330)}
    <text x="1390" y="236" text-anchor="middle" class="map-cap-i" style="font-size:18px">lugar secreto</text>
    ${compass}
    <g transform="translate(52 920)"><rect width="300" height="64" rx="4" fill="rgba(240,224,179,.55)" stroke="#5b3d12" stroke-width="1.6"/><path d="M14 40h240M14 34v12M74 34v12M134 34v12M194 34v12M254 34v12" stroke="#5b3d12" stroke-width="2"/><text x="14" y="24" class="map-cap" style="font-size:13px">ESCALA · CODOS REALES</text></g>
  </g>
  <path class="route" id="routePath" d="${route}"/>
  ${REDUCED?'':`<g id="walker"><circle r="9" fill="#fff3c8" filter="url(#ds)"/><circle r="17" fill="none" stroke="#fff3c8" opacity=".5"/><animateMotion dur="46s" repeatCount="indefinite" path="${route}"/></g>`}
  <g id="mpFg">${CH.map(pyramidMap).join('')}</g>`;
}



/* ===== REVISIÓN EDITORIAL v15 · voz de la autora =====
   No sustituye las evidencias ni añade prácticas no realizadas.
   Reescribe la explicación como recorrido de aprendizaje y reflexión personal.
*/
CONFIG.showSlotHints = false;

CONTENT.intro = [
 {key:'asignatura',title:'Entrar en el mundo de la seguridad informática',body:[
  'Al principio, cuando escuchaba hablar de seguridad informática, pensaba principalmente en proteger un ordenador, poner una contraseña o instalar un antivirus. A medida que hemos ido avanzando en la evaluación, me he dado cuenta de que el tema es bastante más amplio. Hoy prácticamente todo está conectado de una manera u otra: nuestras cuentas, los documentos, las comunicaciones, los servicios de una empresa e incluso sistemas de los que depende una ciudad.',
  'Por eso, estudiar seguridad no consiste solamente en aprender nombres de herramientas. También hay que entender qué estamos protegiendo, qué puede salir mal y qué podemos hacer para evitarlo o recuperarnos si ocurre.'
 ]},
 {key:'formacion',title:'Lo que hemos ido descubriendo',body:[
  {h:'Los contenidos que han acompañado esta evaluación'},
  {list:['Los conceptos básicos de seguridad informática y las formas de proteger la información.','La criptografía y las distintas maneras de ocultar, comprobar y compartir información de forma segura.','La protección física de los equipos y de los centros de procesamiento de datos.','La seguridad del almacenamiento, la redundancia y las copias de seguridad.','El trabajo con Docker y sus contenedores.','Las prácticas con Linux, Lynis, John the Ripper, CyberChef, Blockchain y OpenMediaVault.']},
  'No quiero presentar estos contenidos como una lista que simplemente hay que memorizar. Lo interesante ha sido ir encontrando la relación entre ellos y comprobar que, en un sistema real, una sola medida no suele ser suficiente.'
 ]},
 {key:'evaluacion',title:'De los apuntes a lo que hemos hecho',body:[
  'Durante la evaluación hemos ido alternando explicaciones, actividades y prácticas. Algunas veces empezábamos con un concepto que parecía bastante abstracto y después, al utilizar una herramienta o ver un ejemplo, era más fácil imaginar para qué servía.',
  'En Docker, por ejemplo, la analogía con los contenedores de transporte me ayudó a entender la idea de empaquetar lo necesario para que una aplicación funcione en distintos entornos. En CPD Arena pude comprobar que un centro de datos no depende solamente de los servidores, sino también de la electricidad, la refrigeración, el acceso y la planificación. Con Lynis y John the Ripper pasé a observar resultados concretos y a interpretar qué nos estaban diciendo.'
 ]},
 {key:'portafolio',title:'Qué quiero dejar reflejado',body:[
  'Este archivo reúne lo que hemos trabajado, las evidencias de las actividades y las ideas que me he ido llevando durante el proceso. No pretendo repetir los apuntes del profesor ni convertir cada cámara en un tema de libro. Quiero explicar los puntos que considero importantes, contar qué hicimos y dejar claro qué entendí de cada experiencia.',
  'También quiero reconocer que no todo se comprende a la primera. Hay conceptos que necesitan práctica, pruebas y volver a revisar lo que hemos hecho. Para mí, esa parte también forma parte de aprender SMR.'
 ]},
 {key:'explorar',title:'Un recorrido que también es personal',body:[
  'Las cámaras organizan los contenidos y las prácticas de esta evaluación. La última está reservada para las reflexiones que van más allá de una explicación técnica: la situación actual de la ciberseguridad, la gratitud, el agradecimiento y el perdón, y la charla de Adrián.',
  'La idea es que quien entre pueda ver no solamente qué herramientas hemos utilizado, sino también qué preguntas me han surgido, qué me ha llamado la atención y cómo relaciono lo aprendido con el mundo que tenemos fuera del aula.'
 ]}
];

CONTENT.situacion = [
 {h:'Vivimos en dos mundos que ya forman parte de nuestra vida'},
 'Hoy en día vivimos tanto en el mundo material como en el mundo cibernético. Son dos espacios distintos y, aunque a veces los tratemos como si fueran lo mismo, no funcionan de la misma manera. En el mundo físico tenemos calles, edificios, normas, puertas y cerraduras. En el mundo digital también existen unas reglas que permiten que todo funcione: protocolos, puertos, servidores, permisos, agentes y sistemas que se comunican entre sí. La diferencia es que muchas veces no vemos todo lo que hay detrás de una acción tan sencilla como enviar un mensaje, entrar en una cuenta o realizar un pago.',
 'Lo interesante —y también lo preocupante— es que cada vez dependemos más de ese segundo mundo. Ya no se trata solamente de utilizar un ordenador para estudiar o trabajar. Hay servicios esenciales, empresas, hospitales, transportes, bancos y administraciones que necesitan que sus sistemas estén disponibles. Por eso, cuando algo falla, las consecuencias pueden salir de la pantalla y afectar directamente a nuestra vida cotidiana.',
 {h:'La brecha entre quienes han podido adaptarse y quienes se están quedando atrás'},
 'Una de las cosas que más me preocupa es el impacto que está teniendo este cambio en las generaciones que no han crecido rodeadas de tecnología. A medida que todo avanza, algunas personas encuentran más dificultades para entender cómo funcionan las aplicaciones, los trámites digitales o las medidas básicas de protección. No pienso que sea una cuestión de capacidad ni que las personas mayores no puedan aprender; el problema es que el ritmo al que aparecen herramientas nuevas puede dejar a mucha gente sin tiempo, acompañamiento o formación suficiente.',
 'Y esto sí puede convertirse en un problema grave. Una persona que no sabe reconocer una página falsa, comprobar quién le escribe o identificar una llamada sospechosa puede caer con más facilidad en estafas, suplantaciones de identidad, robo de datos o engaños que cada vez parecen más creíbles. A veces se habla de la brecha digital como si solamente significara no tener conexión a internet, pero también existe cuando una persona tiene un dispositivo y, aun así, no dispone de los conocimientos necesarios para utilizarlo con seguridad.',
 'Quienes estamos en medio intentamos seguir el ritmo, pero tampoco es sencillo. La tecnología está avanzando de una forma abismal, con cambios que parecen llegar antes de que hayamos terminado de comprender los anteriores. No podemos saberlo todo ni aprender al mismo ritmo al que se desarrollan estas herramientas. Precisamente por eso están apareciendo nuevos campos de estudio y especializaciones que buscan comprender mejor la inteligencia artificial, la protección de datos, la seguridad de las redes, la automatización y las consecuencias sociales de todo este desarrollo.',
 {h:'Desde los primeros pasos de la informática hasta la inteligencia artificial'},
 'A veces hablamos de la inteligencia artificial como si hubiera aparecido de repente, pero detrás hay un recorrido muy largo. Me llama la atención recordar a Ada Lovelace, que escribió un algoritmo para la Máquina Analítica de Charles Babbage cuando aquella máquina todavía no se había construido. Es decir, fue capaz de imaginar cómo podía programarse una máquina antes de que existieran los ordenadores que hoy conocemos. Si pensamos en ese punto de partida y lo comparamos con los sistemas actuales, se entiende mejor la dimensión del camino que ha recorrido el ser humano.',
 'La inteligencia artificial puede ser una herramienta extraordinaria. Nos puede ayudar a investigar, traducir, programar, analizar imágenes, automatizar tareas y encontrar soluciones. Pero también depende de cómo la utilicemos y de las decisiones que tomemos al incorporarla a nuestra vida. No todo lo que genera es correcto, no siempre comprende el contexto y no deberíamos aceptar una respuesta únicamente porque esté bien redactada o parezca convincente.',
 'Hay algo que me preocupa especialmente: cuanto más fácil tenemos la información, más parece que algunas personas huyen de leer, contrastar y dedicar tiempo a comprender. Nos acostumbramos a recibir respuestas rápidas y podemos terminar perdiendo la paciencia para investigar por nuestra cuenta. No quiero decir que esto les ocurra a todos los jóvenes ni que yo esté fuera de ese problema. También formo parte de esta sociedad y sé que es fácil acostumbrarse a que una herramienta haga en segundos algo que antes requería tiempo. Pero precisamente por eso creo que tenemos que preguntarnos qué estamos dejando de practicar cuando delegamos absolutamente todo.',
 'La tecnología puede facilitar el aprendizaje, pero no debería sustituirlo. Si una IA nos da una explicación, todavía tenemos que entenderla, comprobar si es correcta y ser capaces de explicarla con nuestras propias palabras. Si nos resuelve una actividad, deberíamos utilizar ese resultado para aprender y no simplemente para entregar algo que no sabríamos defender. Para mí, esa diferencia es fundamental: utilizar una herramienta no es lo mismo que dejar de pensar.',
 {h:'El reloj del fin del mundo y las decisiones que estamos tomando'},
 'También me llama la atención el reloj del fin del mundo, conocido como Doomsday Clock. En 2026 se situó a 85 segundos de la medianoche, la posición más cercana a ese punto desde que existe. Es importante entender que no es un reloj que anuncie una fecha real para el final de la humanidad. Es un símbolo creado por científicos para representar el nivel de riesgo que, según su evaluación, afrontamos por amenazas como las armas nucleares, el cambio climático, los riesgos biológicos y las tecnologías disruptivas, incluida la inteligencia artificial. Aun así, que esté tan cerca de la medianoche es una advertencia que invita a tomarse en serio las decisiones que estamos dejando en manos de gobiernos, empresas y personas.',
 'No podemos hablar de estos riesgos como si fueran algo que solamente afecta a otros. La tecnología tiene consecuencias y, cuando se utiliza sin responsabilidad, puede amplificar problemas que ya existían. Me preocupa que los sistemas de IA puedan utilizarse para manipular, engañar, influir en decisiones personales o generar contenidos que afecten al bienestar de alguien. También me surgen preguntas sobre los sistemas que parecen tomar decisiones inesperadas: ¿qué parte de su funcionamiento no estamos comprendiendo?, ¿qué estamos midiendo mal?, ¿qué límites no hemos definido con suficiente claridad? No significa que una IA tenga voluntad propia como una persona, pero sí que sistemas complejos pueden producir resultados difíciles de anticipar y que necesitan evaluación y supervisión.',
 {h:'Cuando una incidencia digital afecta a todo un país'},
 'Un caso reciente que me hizo ver hasta qué punto dependemos de estas infraestructuras ocurrió en Estados Unidos el 13 de noviembre de 2026. La Administración Federal de Aviación (FAA) tuvo una incidencia técnica en su red de comunicaciones. La inestabilidad afectó a sistemas utilizados para las comunicaciones y los datos de radar, y se decidió detener temporalmente las operaciones aéreas en todo el país como medida de precaución. Me parece un ejemplo muy claro de cómo un problema que comienza en una infraestructura tecnológica puede afectar a vuelos, pasajeros, aerolíneas, empresas y a una parte importante de la actividad económica.',
 'También es importante explicar bien lo ocurrido: la FAA informó de una incidencia técnica y de una investigación sobre el origen de la inestabilidad; no confirmó que se tratara de un ciberataque. Aun así, el caso demuestra que la disponibilidad es tan importante como la confidencialidad. No basta con proteger los datos si los sistemas que los transmiten dejan de funcionar cuando más se necesitan. En SMR estudiamos conceptos como redes, protocolos, servicios y servidores, y este tipo de situaciones ayuda a entender por qué todo eso tiene consecuencias reales.',
 {h:'La competencia por los chips y el control de la tecnología'},
 'Otro tema que me parece interesante es la competencia entre Estados Unidos y China por los semiconductores y los chips avanzados que se utilizan para desarrollar inteligencia artificial. No es simplemente una discusión sobre quién fabrica el componente más potente. Los chips necesitan maquinaria especializada, materiales, empresas, centros de datos, energía y cadenas de suministro internacionales. Por eso esta competencia tiene consecuencias económicas, industriales y también políticas. Quien consiga controlar partes importantes de esa cadena puede tener una ventaja en el desarrollo de nuevas tecnologías.',
 'Esto me hace pensar en algo que a veces olvidamos: detrás de una aplicación de IA no hay magia. Hay hardware, centros de datos, redes, electricidad, refrigeración, almacenamiento y personas que diseñan, mantienen y supervisan los sistemas. Cuanto más dependemos de estas herramientas, más importante resulta comprender también la infraestructura que las hace posibles.',
 {h:'No se trata de detener el avance, sino de aprender a convivir con él'},
 'Quiero que la tecnología avance, porque también nos está abriendo oportunidades que antes eran difíciles de imaginar. Pero no creo que debamos darle libertad absoluta sin establecer límites, responsabilidades y leyes que protejan a las personas y sus datos. Necesitamos normas que se puedan aplicar, supervisión, transparencia y formación. Y también necesitamos que las personas sepan a quién acudir cuando sufren un fraude o cuando no entienden cómo se están utilizando sus datos.',
 'Me parece especialmente interesante la idea de los cobots y de la colaboración entre personas y máquinas. No quiero que la tecnología haga absolutamente todo por nosotros, sino que nos ayude a hacer mejor nuestro trabajo. Podemos apoyarnos en una herramienta para analizar información, automatizar una tarea o detectar un problema, pero tenemos que conservar la capacidad de decidir, revisar y asumir la responsabilidad del resultado. La colaboración tiene sentido cuando ambas partes aportan algo y la persona sigue comprendiendo lo que está ocurriendo.',
 'Después de estudiar estos contenidos, veo la ciberseguridad de una forma mucho más amplia. Ya no la relaciono únicamente con instalar un antivirus o crear una contraseña complicada. También significa proteger a quienes tienen menos conocimientos digitales, mantener servicios esenciales, comprender las redes que utilizamos, revisar la información que recibimos y pensar en las consecuencias de las tecnologías que incorporamos. No podemos parar el mundo digital ni conocerlo todo, pero sí podemos prepararnos mejor para vivir en él. Y creo que esa es una de las responsabilidades que también tenemos quienes nos estamos formando en Sistemas Microinformáticos y Redes.',
 {sources:[
  {title:'Bulletin of the Atomic Scientists · 2026 Doomsday Clock Statement',url:'https://thebulletin.org/doomsday-clock/2026-statement/',why:'Fuente del reloj del fin del mundo de 2026 y de su significado como indicador simbólico de riesgos globales, no como predicción de una fecha.'},
  {title:'Federal Aviation Administration · Nationwide Ground Stop: Questions and Answers (15 de noviembre de 2026)',url:'https://www.faa.gov/newsroom/nationwide-ground-stop-questions-and-answers',why:'Explica la incidencia técnica del 13 de noviembre, la inestabilidad de la red de comunicaciones y la decisión de detener temporalmente las operaciones aéreas.'},
  {title:'UNESCO · Ada Lovelace (1815–1852)',url:'https://www.unesco.org/en/virtual-science-museum/women-science/ada-lovelace',why:'Contextualiza el algoritmo publicado por Ada Lovelace para la Máquina Analítica y su importancia en la historia de la programación.'},
  {title:'International AI Safety Report 2026',url:'https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026',why:'Revisa las capacidades, limitaciones, fallos, riesgos emergentes y medidas de supervisión de los sistemas de IA de propósito general.'},
  {title:'U.S.-China Economic and Security Review Commission · 2026 Executive Summary',url:'https://www.uscc.gov/sites/default/files/2026-11/2026_Executive_Summary.pdf',why:'Analiza la competencia tecnológica entre Estados Unidos y China, la cadena de semiconductores y los componentes necesarios para la IA.'},
  {title:'Comisión Europea · Digital Skills and Jobs Platform',url:'https://digital-skills-jobs.europa.eu/en',why:'Recursos sobre competencias digitales, formación y reducción de la brecha de conocimientos.'},
  {title:'INCIBE · Ciudadanía',url:'https://www.incibe.es/ciudadania',why:'Consejos y recursos para reconocer fraudes, proteger cuentas y cuidar los datos personales.'}
 ]}
];

CONTENT.camaras[1] = {
 subtitle:'Conceptos sobre Seguridad Informática',
 explicacion:[
  {h:'Por qué empezamos hablando de seguridad'},
  'Lo primero que hemos trabajado es por qué la seguridad informática importa tanto. Hoy utilizamos sistemas digitales para operaciones que afectan directamente a nuestra vida: cuentas bancarias, compras, comunicaciones, servicios públicos y empresas. Si esa información se pierde, se modifica o llega a quien no debe, las consecuencias pueden ir mucho más allá de un ordenador que deja de funcionar.',
  {h:'Las ideas que me ayudan a entenderla'},
  'Durante el tema hemos trabajado varios objetivos que se relacionan entre sí. La confidencialidad consiste en que la información solo llegue a quien tiene permiso; la integridad, en que no se modifique sin autorización; y la disponibilidad, en que podamos utilizarla cuando la necesitamos. También aparece el no repudio, que busca que una persona no pueda negar una acción que ha realizado. Me parece importante entenderlos como partes de un mismo problema y no como definiciones separadas.',
  {h:'No todo se protege de la misma manera'},
  'Una cosa que me quedó clara es que no basta con proteger los archivos. También hay que pensar en los equipos, las aplicaciones, las comunicaciones y el lugar donde están instalados. Por eso distinguimos entre seguridad física y lógica, y entre medidas activas y pasivas. Un firewall o un antivirus ayudan a prevenir o detectar; una copia de seguridad o un SAI nos permiten reducir las consecuencias y recuperarnos.',
  {h:'Amenazas, vulnerabilidades y riesgos'},
  'También hemos aprendido a diferenciar una amenaza de una vulnerabilidad. Una amenaza es aquello que puede causar daño; una vulnerabilidad es una debilidad que puede aprovecharse; y el riesgo depende de la posibilidad de que ocurra y del impacto que tendría. Esta diferencia me parece útil porque no todo aviso significa que el equipo esté atacado, pero tampoco conviene ignorar una debilidad solo porque todavía no haya ocurrido nada.',
  {h:'Lo que me llevo del tema'},
  'Me quedo con que la seguridad no es algo que se instala una vez y se olvida. Hay que revisar, actualizar, limitar permisos, formar a los usuarios y preparar una forma de responder cuando algo falla. También he entendido que la seguridad total no existe: lo que buscamos es reducir riesgos y estar preparados.'
 ],
 desarrollo:[
  'Este primer tema nos dio el punto de partida para entender por qué necesitamos proteger la información y qué partes de un sistema pueden quedar expuestas. A partir de ahí fuimos relacionando los conceptos con ejemplos cotidianos, como una cuenta a la que no debería entrar otra persona o un servicio que necesitamos que siga funcionando.',
  'La parte que considero más importante es aprender a mirar un problema desde varios lados: quién puede acceder, si los datos pueden cambiar, si el servicio seguirá disponible y qué haríamos para recuperarnos.'
 ],
 resultados:[
  'Al terminar el tema puedo distinguir mejor qué intenta proteger cada medida y por qué una única herramienta no resuelve todos los problemas.',
  'También me ha servido para comprender el vocabulario que después aparece en las prácticas: permisos, accesos, vulnerabilidades, registros, copias, servicios y disponibilidad.'
 ],
 problemas:['Al principio es fácil confundir amenaza, vulnerabilidad y riesgo, o pensar que seguridad activa y pasiva significan lo mismo.'],
 soluciones:['Relacionar cada concepto con un ejemplo concreto: una vulnerabilidad es la debilidad, la amenaza puede aprovecharla y el riesgo depende de la probabilidad y del impacto. Para las medidas, pensar si previenen/detectan o si ayudan a resistir/recuperarse.']
};

CONTENT.camaras[2] = {
 subtitle:'Criptografía',
 explicacion:[
  {h:'De los mensajes secretos a la protección de nuestros datos'},
  'En este tema hemos conocido la criptografía como una forma de proteger información para que no pueda entenderla cualquiera que la intercepte. Me llamó la atención comprobar que no es algo nuevo: ya se utilizaban métodos para ocultar mensajes hace siglos, como el escítalo o el cifrado César. Lo interesante es ver cómo una idea tan antigua ha terminado siendo imprescindible en las comunicaciones actuales.',
  {h:'Qué cambia cuando ciframos un mensaje'},
  'La idea que me llevo es que partimos de un mensaje original, aplicamos un algoritmo y obtenemos un contenido que no se entiende directamente. La persona que recibe el mensaje necesita el mecanismo o la clave adecuada para recuperar la información. Por eso la clave es tan importante: si es fácil de adivinar o se comparte sin cuidado, la protección pierde sentido.',
  {h:'Claves, fuerza bruta y buenos hábitos'},
  'Hemos visto que un ataque de fuerza bruta consiste en probar muchas combinaciones hasta encontrar la clave. Cuanto más corta y previsible sea, menos trabajo necesita quien intenta descubrirla. Por eso se recomienda utilizar claves largas y únicas, combinar distintos tipos de caracteres y evitar nombres o palabras fáciles de relacionar con nosotros. También conviene limitar los intentos y proteger el acceso.',
  {h:'No todos los mecanismos hacen lo mismo'},
  'Durante el tema hemos diferenciado cifrado, hash y firma digital. El cifrado busca que el contenido no pueda leerse sin la clave; el hash permite comprobar si los datos han cambiado; y la firma digital ayuda a verificar quién ha firmado y que el contenido no se haya alterado. Son herramientas relacionadas, pero no sirven exactamente para lo mismo.',
  {h:'Lo que hemos puesto en práctica'},
  'Con los cifrados clásicos hemos podido observar cómo cambia un mensaje al aplicar desplazamientos o sustituciones. Después, con CyberChef, hemos trabajado recetas como ROT13, Vigenère y el análisis de frecuencias. También hemos utilizado herramientas de Linux relacionadas con GPG y MD5. Esta parte me ayudó a ver que no basta con pulsar una operación: hay que saber qué tipo de dato tenemos y qué resultado esperamos obtener.',
  'Me parece especialmente importante no confundir una codificación como Base64 con un cifrado seguro. Puede transformar la forma en que se representa un texto, pero no necesita una clave secreta para revertirlo. Entender estas diferencias evita pensar que un dato está protegido cuando realmente no lo está.'
 ],
 desarrollo:[
  'Primero trabajamos los ejemplos históricos para entender la lógica de sustituir o desplazar caracteres. Después pasamos a actividades donde había que identificar el método utilizado y recuperar el mensaje.',
  'En las prácticas digitales fuimos probando operaciones en CyberChef y herramientas de Linux. La parte importante no era solamente obtener el texto legible, sino reconocer qué operación habíamos aplicado, qué información necesitábamos y cómo comprobar que el resultado tenía sentido.'
 ],
 comandos:[
  {cmd:'gpg --gen-key',explain:'Genera un par de claves GPG para trabajar con cifrado y firma en el entorno de prácticas.'},
  {cmd:'gpg --list-keys',explain:'Muestra las claves públicas disponibles en el llavero.'},
  {cmd:'gpg --list-secret-keys',explain:'Comprueba las claves privadas almacenadas localmente; no se deben compartir.'},
  {cmd:'md5sum archivo',explain:'Calcula la huella MD5 de un archivo para comparar su contenido en la práctica. MD5 no debe utilizarse como mecanismo criptográfico moderno de seguridad.'}
 ],
 resultados:[
  'Las actividades permitieron reconocer cifrados clásicos y utilizar recetas de CyberChef para recuperar mensajes. También vimos que una pequeña modificación en los datos cambia el resultado de un hash.',
  'Me llevo la diferencia entre proteger la confidencialidad, comprobar la integridad y demostrar la autoría de una firma.'
 ],
 problemas:['Algunas operaciones pueden parecer similares, aunque una codifica, otra cifra y otra calcula una huella. También es fácil elegir una receta en el orden incorrecto.'],
 soluciones:['Antes de aplicar una operación, identificar qué se quiere conseguir: ocultar el contenido, recuperar un mensaje, comprobar cambios o verificar una firma. Después, revisar si el resultado obtenido tiene sentido.']
};

CONTENT.camaras[3] = {
 subtitle:'Seguridad pasiva: equipos y centros de datos',
 explicacion:[
  {h:'Cuando proteger un equipo significa proteger todo su entorno'},
  'En este tema hemos pasado de pensar solamente en programas y datos a fijarnos en el lugar donde se encuentran los equipos. Un servidor puede estar bien configurado y aun así dejar de funcionar si se produce un incendio, una inundación, un corte eléctrico o si alguien entra en una sala sin autorización. Por eso la seguridad física también forma parte de la seguridad informática.',
  {h:'El CPD no es solamente una habitación con servidores'},
  'Hemos conocido qué necesita un centro de procesamiento de datos para funcionar: una ubicación adecuada, control de acceso, climatización, ventilación, suministro eléctrico, comunicaciones y medidas de protección frente a incendios. También hemos visto la importancia de organizar los pasillos fríos y calientes y de contar con sistemas redundantes cuando el servicio no puede detenerse.',
  {h:'Electricidad, climatización y continuidad'},
  'Una de las cosas que me parece más fáciles de entender con ejemplos es el SAI. No es una fuente de energía infinita: permite mantener los equipos durante un tiempo cuando falla la corriente y, según la instalación, dar margen para que arranque un generador o para apagar correctamente. Si el corte dura más que la autonomía disponible, el sistema sigue teniendo un problema.',
  {h:'Acceso y recuperación'},
  'También hemos visto que una cámara, una tarjeta o una contraseña no son soluciones aisladas. El control de acceso funciona mejor cuando se combinan medidas y se limita quién puede entrar. Y el plan de recuperación tiene que estar disponible incluso si el servidor principal deja de funcionar; guardarlo únicamente en el mismo equipo que puede caer sería depender del problema para resolver el problema.',
  {h:'La visita al rack'},
  'Cuando fuimos a ver el rack que tiene el docente, nos comentó parte de su historia y pudimos relacionar lo que habíamos estudiado con equipos reales. Me hizo fijarme en cómo se organizan los dispositivos y las conexiones. A veces el cableado puede parecer un conjunto de cables sin más, pero cuando hay que mantener una instalación o localizar una avería, tenerlo identificado y ordenado ahorra tiempo y evita errores.'
 ],
 desarrollo:[
  'La actividad de CPD Arena fue la forma de llevar estos conceptos a una situación más práctica. Tuvimos que tomar decisiones sobre la ubicación, el equipamiento y los servicios del centro de datos y después comprobar cómo respondía ante distintos incidentes.',
  'La simulación nos enfrentó a situaciones como una riada, una ola de calor, un incendio, un apagón, un pico de tensión, un microcorte, la ausencia del responsable y el robo de información. Lo interesante fue comprobar que una configuración podía superar unas pruebas y fallar en otras.'
 ],
 resultados:[
  'En una de las pruebas quedaron superados 4 de los 8 incidentes sin daños, con 534 puntos y un gasto de 32.750 €. En otra prueba también se superaron 4 de 8, con 566 puntos y 33.450 €. Estos resultados me hicieron ver que gastar más no significa automáticamente que todo vaya a salir bien: importa dónde se invierte y qué riesgo se está intentando cubrir.',
  'La simulación mostró fallos relacionados con el plan de recuperación, la protección contra incendios, la autonomía del SAI y el control de acceso a los datos.'
 ],
 problemas:['El plan de recuperación estaba guardado en el servidor que podía quedar fuera de servicio.','La instalación no tenía una solución automática de extinción adecuada para el escenario de incendio.','La autonomía del SAI no era suficiente para un apagón de 40 minutos.','El control de acceso no evitaba adecuadamente el robo de discos con información sensible.'],
 soluciones:['Guardar una copia del plan de recuperación fuera del servidor principal y mantenerla actualizada.','Incorporar detección y extinción de incendios adecuadas al tipo de sala y de equipamiento.','Dimensionar el SAI para cubrir el tiempo necesario de respaldo y disponer de un generador cuando se requiera continuidad prolongada.','Reforzar el control físico y lógico de acceso a los equipos y a los soportes que contienen información sensible.']
};

CONTENT.camaras[4] = {
 subtitle:'Seguridad pasiva: almacenamiento y recuperación',
 explicacion:[
  {h:'Por qué no podemos depender de un único disco'},
  'En este tema hemos visto que los datos pueden ser incluso más importantes que el equipo donde están guardados. Un ordenador se puede sustituir y un sistema operativo se puede volver a instalar, pero perder documentos, bases de datos o archivos de una empresa puede tener consecuencias mucho más serias. Por eso hemos trabajado distintas formas de mejorar la disponibilidad y recuperar la información.',
  {h:'RAID: varias unidades trabajando juntas'},
  'Hemos conocido RAID como una forma de agrupar discos para conseguir más rendimiento, capacidad o tolerancia a fallos, según el nivel utilizado. RAID 0 reparte los datos y puede mejorar el rendimiento, pero no protege si falla un disco. RAID 1 mantiene una copia espejo. RAID 5 distribuye datos y paridad y puede soportar el fallo de una unidad. Lo importante es no quedarse solo con el nombre: hay que saber qué ocurre cuando un disco deja de funcionar.',
  'Una idea que considero fundamental es que RAID no sustituye a una copia de seguridad. Si borramos un archivo por error, si entra un programa malicioso o si se pierde todo el servidor, la redundancia por sí sola no nos devuelve una versión anterior de los datos.',
  {h:'NAS, SAN y copias de seguridad'},
  'También hemos diferenciado NAS y SAN y hemos visto por qué una empresa puede centralizar el almacenamiento en un equipo dedicado. Un NAS permite compartir carpetas a través de la red, mientras que una SAN está pensada para conectar servidores con almacenamiento mediante una red específica. Además, hemos trabajado los tipos de copia completa, diferencial e incremental, y la diferencia entre guardar archivos y crear una imagen del sistema.',
  {h:'Lo que hemos llevado a la práctica'},
  'La actividad con OpenMediaVault me permitió ver cómo se prepara un NAS en una máquina virtual y cómo se organiza el almacenamiento para que otro equipo pueda utilizarlo como destino de copias. No era simplemente crear una carpeta: había que identificar los discos, preparar el RAID, formatear, montar el volumen, crear usuarios, ajustar permisos y habilitar los servicios de compartición.',
  'Me quedo con que una copia de seguridad solo tiene sentido si sabemos dónde está, quién puede acceder y si realmente podemos restaurarla. Guardar una copia y no comprobarla sería confiar en algo que quizá no funcione cuando más lo necesitemos.'
 ],
 desarrollo:[
  'En la parte de Windows Server se trabajaron configuraciones RAID desde Administración de discos, incluyendo la creación y modificación de volúmenes. Después, con OpenMediaVault 8 en VirtualBox, preparamos un NAS que pudiera recibir copias desde Windows Server 2022.',
  'La red de la práctica se llamó RedCopias. OpenMediaVault utilizó la dirección 192.168.50.10/24 y Windows Server 2022 la 192.168.50.20/24. Para el NAS se reservaron un disco de sistema de 8 GB y tres discos de datos de 2 GB, con los que se preparó RAID 5.'
 ],
 comandos:[
  {cmd:'ip addr',explain:'Permite comprobar las interfaces de red y las direcciones IP configuradas en Linux.'},
  {cmd:'ip route',explain:'Muestra las rutas de red y la puerta de enlace utilizada.'},
  {cmd:'ping 192.168.50.10',explain:'Comprueba la conectividad desde Windows Server hacia el NAS de OpenMediaVault.'}
 ],
 resultados:[
  'Se preparó el conjunto RAID 5 md0 con los tres discos de datos, se creó el sistema de archivos EXT4 y se montó el volumen. Después se configuraron el usuario, la carpeta CopiasSeguridad y los servicios SMB y FTP.',
  'La práctica también me hizo prestar atención a qué disco estaba modificando. El disco sda era el de sistema, por lo que no debía confundirse con las unidades destinadas al almacenamiento.'
 ],
 problemas:['Al preparar el RAID era importante no seleccionar por error el disco donde estaba instalado el sistema.','Para gestionar RAID por software en OpenMediaVault 8 era necesario instalar el complemento correspondiente.','Los cambios de configuración quedaban pendientes hasta pulsar «Aplicar».'],
 soluciones:['Identificar cada disco antes de inicializarlo o borrarlo y comprobar su capacidad y función.','Instalar el complemento openmediavault-md y verificar el estado del conjunto antes de crear el sistema de archivos.','Revisar los cambios pendientes y aplicarlos solamente después de comprobar que la configuración es correcta.']
};

CONTENT.labsText.docker = {
 explicacion:[
  {h:'La analogía que me ayudó a entender Docker'},
  'Una de las actividades que más me ha gustado de esta evaluación ha sido Docker. Al principio había conceptos que me resultaban nuevos, pero la comparación con los contenedores que se utilizan en los buques y en el transporte marítimo me ayudó bastante. Antes, cada parte del transporte utilizaba embalajes distintos y eso complicaba mover las mercancías. Al establecer un formato común, todo el proceso se volvió más sencillo. Con Docker ocurre algo parecido: se empaqueta lo necesario para que una aplicación pueda ejecutarse en un entorno preparado.',
  {h:'Qué diferencia hay con una máquina virtual'},
  'La diferencia que más me interesa es que una máquina virtual incluye un sistema operativo completo y virtualiza el hardware, mientras que un contenedor comparte el kernel del sistema anfitrión. Por eso los contenedores suelen ocupar menos recursos y arrancar más rápido. No significa que una opción sustituya siempre a la otra; depende de lo que necesitemos montar.',
  {h:'Lo que fuimos haciendo'},
  'Durante las prácticas creamos contenedores, descargamos imágenes y comprobamos cuáles estaban en ejecución y cuáles se habían detenido. También trabajamos con Fedora, Debian, Ubuntu, BusyBox, Nginx y Node. Poco a poco fuimos utilizando comandos para iniciar, detener, consultar y eliminar contenedores, además de revisar qué estaba ocurriendo dentro de ellos.',
  'Una parte que me pareció útil fue comprobar los logs, los procesos y el consumo de recursos. Así entendí que no basta con lanzar un contenedor y dar por hecho que funciona: también hay que observar su estado y revisar qué está haciendo.',
  {h:'Variables de entorno y PostgreSQL'},
  'En otra práctica utilizamos variables de entorno para configurar un contenedor de PostgreSQL. Me ayudó a entender que algunos datos de configuración se pueden pasar al crear el contenedor, sin tener que modificar la imagen. Después accedimos a PostgreSQL para consultar las bases de datos. También me hizo pensar en la importancia de no dejar contraseñas visibles en capturas o archivos que luego se comparten.'
 ],
 comandos:[
  {cmd:'sudo service docker start',explain:'Inicia el servicio Docker en el entorno de prácticas.'},
  {cmd:'sudo docker run hello-world',explain:'Comprueba que Docker puede descargar y ejecutar una imagen de prueba.'},
  {cmd:'sudo docker run --name fedora2 -it fedora',explain:'Crea y abre el contenedor interactivo utilizado en la actividad.'},
  {cmd:'docker ps -a',explain:'Permite ver tanto los contenedores activos como los que ya se han detenido.'},
  {cmd:'docker logs nginx10',explain:'Muestra los registros del contenedor para revisar qué ha ocurrido.'},
  {cmd:'docker top nginx10',explain:'Permite observar los procesos que se están ejecutando dentro del contenedor.'},
  {cmd:'docker stats nginx10',explain:'Muestra el consumo de recursos del contenedor.'},
  {cmd:'docker inspect node',explain:'Muestra información detallada sobre la imagen o el contenedor.'},
  {cmd:'docker cp fichero.txt nginx10:/tmp',explain:'Copia un archivo desde el equipo anfitrión al contenedor.'},
  {cmd:'docker exec nginx10 ls /tmp',explain:'Ejecuta un comando dentro del contenedor que está en marcha.'}
 ],
 resultados:[
  'Las evidencias muestran que pudimos crear y consultar contenedores, revisar logs y procesos, observar estadísticas, detener servicios, descargar Node, inspeccionar su configuración y copiar archivos.',
  'La diferencia entre imagen y contenedor me quedó más clara al trabajar: la imagen funciona como plantilla y el contenedor es la instancia que ponemos en marcha.'
 ],
 problemas:['Algunos comandos no funcionaban si el servicio Docker no estaba iniciado o si faltaban permisos. También era importante escribir correctamente el nombre del contenedor.'],
 soluciones:['Comprobar primero el estado del servicio, utilizar sudo cuando corresponde y consultar docker ps -a para confirmar el nombre y el estado antes de ejecutar otros comandos.']
};

CONTENT.labsText.variables = {
 explicacion:[
  'En esta actividad seguimos trabajando con Docker, pero nos centramos en cómo pasar configuración a un contenedor mediante variables de entorno. Utilizamos PostgreSQL para comprobarlo. Lo interesante es que podemos indicar valores como el usuario, la contraseña de laboratorio o el nombre de la base de datos cuando creamos el contenedor, sin tener que cambiar la imagen.',
  'Después entramos en PostgreSQL desde el contenedor y consultamos las bases de datos. Así pudimos relacionar la configuración inicial con el servicio que se estaba ejecutando.'
 ],
 comandos:[
  {cmd:'docker run -e POSTGRES_USER=usuario -e POSTGRES_PASSWORD=contraseña -e POSTGRES_DB=prueba postgres',explain:'Ejemplo de estructura para pasar variables al contenedor PostgreSQL. En una práctica real se deben utilizar credenciales de laboratorio y no reutilizarlas.'},
  {cmd:'docker exec -it <contenedor> psql -U <usuario> -d <base_de_datos>',explain:'Abre la consola de PostgreSQL dentro del contenedor indicado.'}
 ],
 resultados:['Las evidencias recogen el arranque de PostgreSQL con variables de entorno y la consulta de las bases de datos desde psql.'],
 problemas:['En una captura aparece una contraseña de laboratorio en texto claro. Es algo que conviene tener presente antes de compartir evidencias.'],
 soluciones:['Utilizar credenciales exclusivas para las prácticas, ocultarlas antes de publicar capturas y cambiarlas si se han compartido fuera del entorno de clase.']
};

CONTENT.labsText.cpd = {
 explicacion:[
  'En CPD Arena tuvimos que diseñar un centro de procesamiento de datos y comprobar si las decisiones que habíamos tomado eran suficientes ante diferentes incidentes. No se trataba solo de colocar servidores: había que pensar en el acceso, las copias, el generador, el plan de recuperación y el resto de servicios necesarios para mantener el centro funcionando.',
  'La simulación nos planteó ocho situaciones: riada, ausencia del responsable, rayo y pico de tensión, ola de calor, incendio, apagón de 40 minutos, microcorte eléctrico y robo de datos sensibles. Me pareció una forma bastante clara de ver que cada medida protege frente a riesgos concretos, pero no frente a todos.'
 ],
 resultados:[
  'En una de las pruebas conseguimos superar 4 de los 8 incidentes sin daños. El resultado fue de 534 puntos y un gasto de 32.750 €. En la prueba de estrés número 3 también se superaron 4 de 8, con 566 puntos y 33.450 € gastados.',
  'Lo que más me llamó la atención es que una instalación puede estar preparada para una situación y no para otra. Por ejemplo, tener un SAI ayuda ante un corte breve, pero no garantiza mantener el servicio durante un apagón de 40 minutos.'
 ],
 problemas:['El plan de recuperación estaba guardado en el propio servidor que podía quedar fuera de servicio.','La sala no tenía un sistema automático de extinción adecuado para el incendio simulado.','La autonomía del SAI no cubría el apagón prolongado.','El control de acceso no era suficiente para impedir el robo de discos con datos sensibles.'],
 soluciones:['Mantener el plan de recuperación en una ubicación independiente del servidor principal.','Añadir detección y extinción de incendios adecuadas al entorno.','Dimensionar el SAI y contar con un generador para cortes prolongados.','Reforzar los controles físicos y la protección de los soportes que contienen información sensible.']
};

CONTENT.labsText.omv = {
 explicacion:[
  'En la práctica de OpenMediaVault montamos un NAS utilizando VirtualBox. La idea era que ese almacenamiento pudiera recibir copias de seguridad desde Windows Server 2022. Me pareció interesante porque vimos que una copia no consiste simplemente en guardar un archivo en otra carpeta: hay que preparar el almacenamiento, la red, los permisos y los servicios para que otro equipo pueda utilizarlo.',
  'Creamos la red NAT RedCopias y trabajamos con dos máquinas virtuales. OpenMediaVault utilizó la IP 192.168.50.10/24 y Windows Server 2022 la 192.168.50.20/24. En el NAS se reservó un disco de sistema de 8 GB y tres discos de datos de 2 GB cada uno.',
  'Después de instalar OMV 8, configuramos la dirección IP, accedimos desde el navegador e instalamos los complementos necesarios. Con los tres discos de datos preparamos un RAID 5, creamos el sistema de archivos EXT4, montamos el volumen y configuramos el usuario y la carpeta compartida CopiasSeguridad. También habilitamos SMB y FTP.'
 ],
 comandos:[
  {cmd:'ip addr',explain:'Comprueba las interfaces de red y las direcciones IP del sistema.'},
  {cmd:'ip route',explain:'Muestra las rutas de red configuradas.'},
  {cmd:'ping 192.168.50.10',explain:'Comprueba la conectividad con el NAS desde Windows Server.'}
 ],
 resultados:[
  'La práctica dejó preparado el conjunto RAID 5 md0, el sistema de archivos EXT4 y la carpeta compartida CopiasSeguridad con sus permisos y servicios.',
  'También aprendí a prestar atención a los cambios pendientes en OpenMediaVault: la configuración no queda aplicada hasta confirmar con el botón «Aplicar».'
 ],
 problemas:['El disco sda era el disco del sistema, por lo que no se debía seleccionar al preparar las unidades de datos.','Para gestionar RAID por software necesitábamos instalar el complemento openmediavault-md.'],
 soluciones:['Comprobar el nombre, la capacidad y la función de cada disco antes de inicializarlo. Instalar el complemento correspondiente y verificar el estado del RAID antes de crear el sistema de archivos.']
};

CONTENT.labsText.john = {
 explicacion:[
  'En la práctica PE4 utilizamos John the Ripper en Kali Linux para trabajar con hashes de contraseñas en un entorno de laboratorio. La actividad me permitió acercarme a cómo se comprueba la resistencia de una contraseña y por qué es importante saber con qué formato de hash estamos trabajando.',
  'También entendí que la herramienta no debe utilizarse sobre cuentas o archivos ajenos. En este caso trabajamos con los ficheros preparados para la práctica y con un objetivo educativo: observar el proceso y entender qué información ofrece.'
 ],
 comandos:[
  {cmd:'john --format=crypt password.hashes',explain:'Ejecuta John the Ripper indicando el formato crypt del archivo de hashes de la práctica.'},
  {cmd:'john --show password.hashes',explain:'Muestra las contraseñas que se han recuperado en el laboratorio.'},
  {cmd:'john --test',explain:'Realiza una prueba de rendimiento de la herramienta.'}
 ],
 resultados:['Las evidencias recogen la ejecución de John the Ripper, la consulta de resultados mediante --show y la prueba de rendimiento con --test.'],
 problemas:['El resultado y el tiempo necesario dependen del formato del hash, de la configuración utilizada y de los recursos del equipo.'],
 soluciones:['Comprobar el formato antes de ejecutar la herramienta y limitar las pruebas a archivos preparados para la práctica o sistemas donde tengamos autorización.']
};

CONTENT.labsText.lynis = {
 explicacion:[
  'Con Lynis realizamos una auditoría de seguridad sobre el sistema. Primero actualizamos la información de los repositorios, instalamos la herramienta y lanzamos el análisis. Después tocaba leer el informe, que es la parte que más me interesó: no basta con ver un número de sugerencias, hay que entrar en cada apartado y entender qué está indicando.',
  'En mi análisis aparecieron 38 sugerencias. También se mostró un warning relacionado con la comprobación de certificados SSL, que tardó algo más de 20 segundos. Lo importante fue revisar el contexto antes de interpretar ese aviso como un problema grave.',
  'Entre las recomendaciones que revisamos aparecían herramientas y paquetes como libpam-tmpdir, apt-listbugs, apt-listchanges, needrestart y fail2ban. Me llamó la atención fail2ban porque revisa registros y puede bloquear temporalmente direcciones IP cuando detecta repetidos intentos de acceso.',
  'También comprobamos apartados concretos del sistema. El informe indicó que el kernel estaba en estado OK y que los permisos de /etc/sudoers eran correctos. En cambio, la protección por contraseña del gestor de arranque aparecía como inexistente. Eso me hizo pensar en que la seguridad no termina cuando el sistema ya ha iniciado: también importa quién puede acceder físicamente al equipo y modificar su arranque.'
 ],
 comandos:[
  {cmd:'sudo apt update',explain:'Actualiza la información de los repositorios antes de instalar paquetes.'},
  {cmd:'sudo apt install lynis',explain:'Instala la herramienta de auditoría Lynis.'},
  {cmd:'sudo lynis audit system',explain:'Ejecuta la auditoría del sistema y genera el informe que después debemos interpretar.'}
 ],
 resultados:[
  'El análisis documentado mostró 38 sugerencias, un warning relacionado con el tiempo de comprobación de certificados SSL y comprobaciones correctas para el kernel y los permisos de /etc/sudoers.',
  'La revisión del arranque permitió detectar que no había una contraseña configurada para proteger el gestor de arranque.'
 ],
 problemas:['El gestor de arranque no tenía protección mediante contraseña.','La cantidad de sugerencias puede hacer que resulte difícil distinguir qué conviene revisar primero.'],
 soluciones:['Valorar la protección del gestor de arranque según el uso del equipo y su nivel de exposición. Revisar las sugerencias una por una, priorizando las que tengan sentido para ese sistema, en lugar de aplicar cambios sin comprenderlos.']
};

CONTENT.labsText.blockchain = {
 explicacion:[
  'Con Blockchain pasamos a trabajar una idea diferente: cómo registrar operaciones en una cadena de bloques que se mantiene distribuida entre varios participantes. Lo que más me ayudó a entenderlo fue observar que cada bloque contiene una huella o hash y una referencia al bloque anterior. Si se modifica información, cambia el hash y los enlaces dejan de coincidir.',
  'En la primera sesión trabajamos con bloques, hashes y minado. Cambiamos una pequeña parte del texto para comprobar cómo cambiaba la huella y después probamos valores hasta encontrar un hash que cumpliera la condición indicada. Así pude entender mejor por qué se necesita trabajo para minar y por qué la red debe ponerse de acuerdo sobre qué cadena acepta.',
  'En la segunda sesión utilizamos AulaCoin. Creamos un monedero, observamos la minería, enviamos pagos y revisamos los retos de la actividad. También vimos la diferencia entre clave pública y privada. La privada debe mantenerse en secreto porque quien la controla puede autorizar operaciones desde ese monedero.',
  'Me pareció importante comprobar que enviar un pago no significa que quede confirmado al instante. La transacción tiene que entrar en un bloque y recibir confirmaciones de la red. También vimos que la dificultad puede cambiar cuando aumenta la potencia de minado.'
 ],
 desarrollo:[
  'En la primera sesión comparamos dos textos y observamos el efecto de cambiar una sola letra sobre el hash. Después realizamos el proceso de minado y revisamos cómo se relaciona cada bloque con el anterior.',
  'En AulaCoin partimos de una potencia propia anotada de 1,25 MH/s, una potencia total de red de 13,28 MH/s, una dificultad de 27 bits y un saldo inicial de 25 AC. Estos valores corresponden a la simulación de clase y permiten entender cómo cambia la actividad cuando participan más mineros.'
 ],
 resultados:[
  'La actividad me permitió relacionar el hash con la integridad y comprobar que una modificación pequeña puede cambiar completamente la huella.',
  'También me quedó claro que hay que proteger la clave privada y la frase de recuperación, comprobar el destinatario antes de enviar y esperar a que la red confirme la operación.'
 ],
 problemas:['Si se pierde o se comparte la clave privada o la frase de recuperación, se puede perder el control del monedero.','Una operación puede quedar pendiente mientras espera a ser incluida y confirmada en un bloque.'],
 soluciones:['Guardar la clave privada y la frase de recuperación de forma segura y no compartirlas. Comprobar los datos del destinatario y esperar las confirmaciones antes de considerar finalizado el pago.']
};

CONTENT.labsText.cyberchef = {
 explicacion:[
  'En el examen práctico utilizamos CyberChef para trabajar con diferentes operaciones sobre mensajes. Las recetas que aparecen en las evidencias incluyen ROT13, Vigenère Decode y Frequency distribution. Lo interesante fue ir probando operaciones y comprobar cómo cambia el resultado según el método que se utiliza.',
  'También me ayudó a recordar que no todas las transformaciones protegen la información. Algunas solo cambian la forma de representar el contenido, mientras que otras requieren una clave para descifrarlo. Por eso es importante reconocer qué tenemos delante antes de elegir una operación.'
 ],
 resultados:[
  'Las capturas muestran las recetas de Vigenère Decode, el análisis de frecuencias y ROT13. Son evidencias del trabajo realizado en el examen práctico y permiten ver el proceso, no solamente el mensaje final.'
 ],
 problemas:['Si se elige una operación que no corresponde al cifrado o se aplica en un orden incorrecto, el resultado no será legible.'],
 soluciones:['Identificar primero el método utilizado, revisar los parámetros de la receta y comprobar que el texto obtenido tiene sentido.']
};

CONTENT.cronicas = [
 {id:'ciberseguridad',title:'La seguridad informática vista desde lo que hemos trabajado',body:[
  'A lo largo de esta evaluación he ido entendiendo que la seguridad informática no se aprende solamente leyendo conceptos. Es necesario observar cómo se comportan los sistemas, probar herramientas, equivocarse y revisar qué ha ocurrido. Al principio podía parecer que proteger un equipo consistía en instalar un antivirus o poner una contraseña, pero las actividades me han demostrado que hay muchas más partes implicadas.',
  'Con Lynis, por ejemplo, aprendí que una auditoría no consiste en mirar un número y dar por terminado el trabajo. El programa puede mostrar sugerencias, avisos y comprobaciones correctas, pero después tenemos que interpretar qué significa cada resultado y decidir qué conviene revisar. En John the Ripper pude observar cómo se trabaja con hashes y por qué una contraseña débil puede ser un problema. No es lo mismo guardar una contraseña de forma segura que almacenar el texto directamente, y tampoco debemos confundir un hash con un cifrado reversible.',
  'Las prácticas de Docker me ayudaron a comprender que una aplicación necesita algo más que su propio código para funcionar. Hay dependencias, librerías, configuraciones y servicios que deben estar preparados. También trabajamos con comandos para consultar contenedores, revisar registros, copiar archivos y observar procesos. Al principio algunos comandos y resultados podían resultar confusos, pero cuando los relacionaba con lo que estaba ocurriendo dentro del contenedor empezaba a tener más sentido.',
  'En CPD Arena y durante la visita a la sala del rack pude conectar la parte lógica con la infraestructura física. Un servicio depende de equipos, alimentación eléctrica, refrigeración, conexiones, organización y medidas de protección. Ver el rack y escuchar parte de su historia me ayudó a entender que detrás de los servicios digitales hay un trabajo de planificación y mantenimiento que normalmente no vemos.',
  'Con OpenMediaVault también pude acercarme a la administración del almacenamiento y a la organización de los recursos. Comprendí que compartir archivos no consiste únicamente en crear una carpeta: hay que pensar en usuarios, permisos, acceso y en cómo evitar que alguien pueda modificar o consultar aquello que no le corresponde.',
  'Lo que más valoro de esta evaluación es que he podido ir relacionando actividades que al principio parecían independientes. Una auditoría, un contenedor, una copia de seguridad, un hash o un rack forman parte de un mismo objetivo: conseguir que la información esté protegida y que los servicios sigan funcionando. Como estudiante de SMR, me quedo con la importancia de no dar nada por seguro sin comprobarlo, documentar lo que hago y buscar una explicación cuando algo no sale como esperaba.'
 ],sources:[
  {title:'INCIBE · Ciudadanía',url:'https://www.incibe.es/ciudadania',why:'Material de referencia para relacionar las prácticas con la protección cotidiana de cuentas, dispositivos y datos.'},
  {title:'ENISA · Threat Landscape 2025',url:'https://www.enisa.europa.eu/publications/enisa-threat-landscape-2025',why:'Informe europeo sobre amenazas y técnicas utilizadas en incidentes de ciberseguridad.'},
  {title:'Docker Docs · What is a container?',url:'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/',why:'Documentación oficial para ampliar la explicación de los contenedores trabajados en clase.'},
  {title:'OpenMediaVault · Documentation',url:'https://docs.openmediavault.org/',why:'Documentación del sistema utilizado en la práctica de almacenamiento y compartición de recursos.'}
 ]},
 {id:'gratitud',title:'Gratitud, agradecimiento y perdón: también se aprende fuera del aula',body:[
  'Hay una frase que me ha hecho pensar: es más fácil agradecer que pedir perdón, aunque también se suele decir que es más fácil pedir permiso que pedir perdón. Puede parecer una contradicción, pero creo que las dos expresiones hablan de algo parecido: reconocer lo que hacemos, aceptar nuestras decisiones y entender que no siempre es sencillo asumir las consecuencias.',
  'Muchas veces aceptar un error cuesta porque tenemos que dejar a un lado el orgullo y reconocer que quizá no actuamos de la mejor manera. Pedir perdón no debería ser solamente decir unas palabras para que una situación termine. Para mí, tiene sentido cuando somos conscientes de lo que hemos hecho, entendemos cómo ha podido afectar a otra persona y tratamos de no repetirlo. Tampoco significa que todo se arregle automáticamente; hay situaciones en las que hace falta tiempo y demostrar con hechos que realmente queremos cambiar.',
  'Con el agradecimiento ocurre algo distinto, pero también relacionado. A veces damos por hecho cosas que forman parte de nuestra vida: tener acceso a determinados recursos, contar con personas que nos enseñan, poder estudiar o disponer de herramientas para practicar. Cuando algo de eso falta, es cuando nos damos cuenta de cuánto lo valorábamos. No creo que agradecer signifique conformarse o dejar de querer mejorar. Se puede estar agradecida por una oportunidad y, al mismo tiempo, reconocer que todavía queda mucho por aprender.',
  'Durante esta evaluación hubo momentos en los que pude ver el contenido de clase de otra manera. Cuando fuimos a la habitación donde está el rack, el docente nos contó parte de su historia. Para mí fue interesante porque hasta ese momento había estudiado los centros de procesamiento de datos desde los conceptos, los componentes y las medidas de seguridad. Al estar delante de los equipos y escuchar cómo se había ido construyendo y organizando ese espacio, pude imaginar mejor todo el trabajo que hay detrás. No es simplemente colocar servidores en un armario: hay decisiones, conexiones, mantenimiento, organización y una responsabilidad para que los servicios puedan seguir funcionando.',
  'También me gustó mucho la parte de Docker. Una de las cosas que más me ayudó fue la comparación con los contenedores que se utilizan en los buques y en el transporte marítimo. Antes sabía que trasladar una aplicación de un entorno a otro podía dar problemas porque no siempre tenía las mismas dependencias o configuraciones. La analogía me permitió imaginarlo de una forma mucho más sencilla: igual que un contenedor de mercancías facilita que la carga se transporte de manera organizada, Docker permite empaquetar una aplicación con lo que necesita para ejecutarse. Después, al trabajar con los comandos y los contenedores, esa comparación dejó de ser solamente una explicación y empezó a tener sentido en la práctica.',
  'Creo que por eso Docker ha sido una de las actividades que más me han gustado. No era únicamente aprender comandos nuevos, sino descubrir conceptos que para mí eran desconocidos y encontrar una manera de comprenderlos. Me gusta cuando una explicación conecta algo técnico con una situación que ya conocemos, porque hace que el aprendizaje sea más cercano y que después sea más fácil recordar por qué funciona de esa manera.',
  'Todo esto también me hace pensar en lo que puede venir en los próximos años. Se están desarrollando tecnologías que pueden cambiar la forma en que interactuamos con los dispositivos: gafas inteligentes, realidad aumentada, entornos más inmersivos y propuestas de equipos que no dependan tanto de una pantalla tradicional. El año pasado asistí al Congreso de Ciudades Inteligentes en el COI y algunas de las ideas que conocí allí me hicieron ver que la tecnología no se queda dentro de un ordenador. Puede formar parte de los edificios, del transporte, de la gestión de una ciudad y de muchos servicios que utilizamos sin detenernos a pensar en cómo funcionan.',
  'Al relacionar todo esto con la gratitud, pienso que aprender también depende de las oportunidades que tenemos y de las personas que comparten sus conocimientos. Una explicación, una demostración o una visita pueden cambiar la forma en que entendemos un tema. A veces no nos damos cuenta en ese mismo momento, pero después, cuando nos encontramos con una situación parecida, recordamos lo que vimos y comprendemos por qué fue importante.',
  'No quiero decir que todo haya sido sencillo ni que siempre haya sabido resolver las actividades a la primera. También ha habido dudas, errores y momentos en los que he tenido que volver atrás para revisar lo que estaba haciendo. Pero creo que ahí también está una parte importante del aprendizaje: reconocer que no sabemos algo, pedir ayuda cuando hace falta, agradecer a quien nos orienta y continuar intentándolo. Para mí, eso también es crecer, tanto en lo académico como en lo personal.',
  'Al final, agradecer y pedir perdón tienen algo en común: los dos requieren reconocer a los demás. Agradecer es valorar lo que recibimos y pedir perdón es aceptar que nuestras acciones pueden afectar a otras personas. No siempre es fácil, pero creo que ambas cosas dicen mucho de cómo queremos convivir y de la responsabilidad con la que afrontamos nuestras decisiones.'
 ],sources:[
  {title:'Greater Good Science Center · What Is Gratitude?',url:'https://greatergood.berkeley.edu/topic/gratitude/definition',why:'Recurso divulgativo sobre la gratitud, el reconocimiento y la valoración de las experiencias y relaciones.'},
  {title:'Greater Good Science Center · Forgiveness',url:'https://greatergood.berkeley.edu/topic/forgiveness/definition',why:'Explica el perdón como un proceso personal y la diferencia entre perdonar y justificar una conducta.'},
  {title:'Docker Docs · What is a container?',url:'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/',why:'Documentación oficial utilizada para contrastar la analogía de los contenedores marítimos con los contenedores de software.'}
 ]},
 {id:'adrian',title:'La charla de Adrián · Inteligencia artificial, creatividad y datos',body:[
  'El 5 de octubre de 2026 recibimos una charla impartida por Adrián, estudiante e ingeniero informático de la Universidad de Alicante. Fue una oportunidad para conocer ejemplos de inteligencia artificial desde una perspectiva más práctica y escuchar cómo se pueden aplicar estas tecnologías en ámbitos que, en principio, parecen muy diferentes.',
  'Uno de los ejemplos que más me llamó la atención fue el de los mapas musicales. Me pareció curioso que unas notas representadas en una imagen pudieran convertirse en información que después se utiliza para generar ritmos o beats. Es una forma de conectar la parte visual con la música y la programación. Me hizo pensar que, detrás de una actividad creativa, también puede haber un proceso de reconocimiento, interpretación y transformación de datos.',
  'También vimos ejemplos relacionados con el reconocimiento de imágenes, como distinguir perros y gatos. Esto me ayudó a pensar en la importancia de los datos que se utilizan para entrenar un modelo. Si los ejemplos no son suficientes o no representan bien los casos que pueden aparecer después, el sistema puede equivocarse. Por eso no basta con decir que una IA reconoce imágenes: también hay que preguntarse con qué información ha aprendido y en qué situaciones puede fallar.',
  'Otro de los ejemplos fue el reconocimiento de números manuscritos. El sistema recibía una imagen y trataba de identificar qué cifra aparecía. Me resultó interesante porque para una persona puede parecer algo muy sencillo, pero para un sistema informático implica transformar la imagen en datos, procesarlos y calcular qué resultado tiene más posibilidades de ser correcto.',
  'También conocimos ONNX, que permite representar modelos de aprendizaje automático para utilizarlos en distintos entornos compatibles. Me llamó la atención porque muestra que desarrollar un modelo es solo una parte del trabajo; después hay que encontrar la forma de integrarlo y ejecutarlo donde realmente se necesita.',
  'La charla me dejó pensando en que la inteligencia artificial no se limita a generar textos o responder preguntas. Puede trabajar con imágenes, música, patrones y muchos otros tipos de información. Pero también creo que tenemos que aprender a revisar sus resultados. Una respuesta puede parecer correcta y, aun así, contener errores. Por eso no deberíamos dejar de utilizar nuestro propio criterio ni aceptar todo sin comprobarlo.',
  'Me habría gustado disponer de más tiempo para profundizar en algunos ejemplos y probar más cosas, pero aun así fue una sesión que me permitió descubrir posibilidades que no había relacionado con la programación. Me quedo con la idea de que la IA puede ser una herramienta de apoyo para crear, investigar y resolver problemas, siempre que sepamos qué estamos haciendo y no deleguemos completamente nuestro pensamiento.'
 ]}
];
/* ===== FIN DE LA REVISIÓN EDITORIAL v15 ===== */
