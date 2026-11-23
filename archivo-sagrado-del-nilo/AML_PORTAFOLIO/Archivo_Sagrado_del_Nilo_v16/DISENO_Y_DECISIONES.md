# El Archivo Sagrado del Nilo · v3 — Diseño, decisiones y estado real

## 1. Cómo ejecutarlo
- Abre `dist/index.html` (o `index.html` de la raíz) en el navegador. Es un único archivo: sirve para GitHub Pages y para incrustar en Google Sites.
- Código fuente en `src/` (`python3 src/build.py` regenera `dist/index.html`). Copias de seguridad: `versiones/` (`index_v1_estable.html`, `index_v2_estable.html` y `src_v2_estable/`).
- Datos editables: `CONFIG`, `CONTENT` (textos académicos y crónicas) en `src/part3a_data.js`; preguntas, guardianas, reliquias, misiones e índice en `src/part3f_content.js`.

## 2. Contradicciones y decisiones de criterio (señaladas antes de implementar)
1. **Retos vs. «todo accesible»**. El enunciado pide guardianas con pruebas y, a la vez, que cualquier apartado académico se alcance sin superarlas. Decisión: las *pirámides* (mundo y mapa) abren la prueba; el *índice de la bitácora*, el diario, el carril lateral y los botones internos abren el contenido directamente. Además, cada prueba tiene «Entrar de todos modos». Nada se bloquea.
2. **10 apartados obligatorios vs. 7 pirámides**. Mapeo: Conceptos → I · Docker, Proyectos y prácticas, Ubicación del CPD → V · Criptografía → II · Blockchain → VI · Seguridad pasiva → III (equipos) y IV (almacenamiento) · Situación actual → I (nuevo hueco «pendiente») · Charla y Reflexión final → VII.
3. **«Charla» es a la vez apartado académico y reflexión.** Se conserva como crónica «La charla de Adrián» dentro de la Cumbre y se enlaza desde el índice.
4. **Reflexiones agrupadas**: se retiraron los huecos de reflexión de las cámaras I–VI y se sustituyeron por un enlace a la Cumbre. Si alguna vez rellenas `reflexion` en `CONTENT`, el texto aparece automáticamente en la Cumbre (no se pierde).
5. **Opiniones de jugadores (Reddit)**: no pude acceder a hilos de Reddit desde aquí. Usé artículos y estudios accesibles (ver §7). Es una limitación declarada, no una cita inventada.

## 3. Referencias visuales (Pinterest) — qué se conserva, sustituye, rediseña y añade
- **Conservado**: paleta oro/turquesa/lapislázuli, mapa de siete pirámides, estructura de cámaras, evidencias, chat.
- **Sustituido**: la diosa de la portada → **Ojo de Horus 3D** con candado (sigue el cursor, parpadea, se cierra al pulsarlo).
- **Rediseñado**: mundo con luz de «hora dorada», grano de pintura sutil, pirámides con silueta propia.
- **Nuevo**: estatua de Bastet (gato negro) y escarabajos corruptos como guiños de las referencias. No se incrustaron imágenes de Pinterest (derechos de terceros).

## 4. Las siete pirámides (identidad propia)
I clásica dorada con ojo · II escalonada turquesa (Djoser) · III truncada lapislázuli con pórtico de columnas · IV acodada marfil con escarabajo · V cónica ámbar con cúpula de observatorio · VI hecha de bloques con hashes (cadena) · VII esbelta, con aguja y baliza. Cada guardiana tiene medallón, voz y reacciones propias.

## 5. Sadchuruzen
- Retrato circular = tu diseño de referencia (sin tocar).
- **Cuerpo entero (nuevo, provisional)**: sprite SVG articulado dibujado a partir de la referencia (cachorro Shar Pei chocolate, tocado dorado con gema turquesa, pectoral con turquesas). Patas, codos, cabeza, orejas y cola son piezas independientes. Poses reales: *caminar, correr, sentarse, tumbarse, dormir, olfatear, mirar, alegría y subir*.
- Dónde se ve: te acompaña en el mundo (camina/corre al mover la cámara, se sienta, se tumba y duerme si no haces nada, olfatea objetos, salta al recoger reliquias) y sube la séptima pirámide **escalón a escalón** con patas alternadas.
- **Lo que falta y cómo resolverlo**: un spritesheet dibujado por un artista (u hojas de poses a partir de más fotos de ella) la haría más fiel. Solo habría que sustituir `dogSVG()` en `src/part3i_sprite.js`; todo el sistema de poses ya está listo.

## 6. Música
- No se han usado las seis canciones de referencia (no hay licencia verificada y no se manipulan grabaciones protegidas).
- **Composición original generativa** en Web Audio: escala hijaz, flautas con vibrato, pads, percusión de darbuka, pulsos electrónicos discretos, mecanismos, y un **coro vocal sintetizado «aaaah»** (formantes de vocal, vibrato, ataque lento) con reverberación de templo. Cada zona tiene su perfil (portada, mapa, mundo, reto, desbloqueo, cámaras I–VII, sala secreta) con transición suave (duck + cross-fade). Verificado por renderizado offline (señal sin NaN ni saturación; con coro > sin coro).
- **Limitación honesta**: un coro sintetizado no iguala a una grabación humana. Para conseguir el sonido de tu 7.ª referencia hay que **licenciar o grabar** un coro: coloca pistas con licencia en `assets/audio/` y enlázalas en `CONFIG.musicTracks` (`{portada:'assets/audio/x.mp3', mapa:'…', c1:'…', default:'…'}`). El gancho hace cross-fade entre pistas; no está probado con archivos reales porque no hay ninguno.

## 7. Investigación (resumen, sin inventar)
- *Cozy games* (Mozilla): baja presión, mecánicas indulgentes, ritmo pausado, sentido de pertenencia; críticas: no son accesibles por defecto y las pistas solo-audio excluyen. → Fallar no penaliza, siempre hay «volver», las señales sonoras tienen equivalente visual.
- *Club Penguin* (The Gamer): atractivos citados: mapa con secretos, minijuegos, coleccionables y eventos. → Mundo con zonas y secretos, reliquias con historia, misiones opcionales. Críticas: coste y comunidad menguante → no hay elementos sociales ficticios.
- *Integración intrínseca* (Habgood, 2007): el aprendizaje funciona mejor dentro de la mecánica que como «recompensa». → purificar un escarabajo = detectar malware; el sello hash muestra un SHA-256 real; la subida y las pruebas se ligan a cada tema.
Fuentes: blog.mozilla.org/en/internet-culture/cozy-games/ · thegamer.com/club-penguin-needs-comeback/ · eprints.nottingham.ac.uk/10385/1/Habgood_2007_Final.pdf

## 8. Matriz de criterios de aceptación
| Criterio | Estado | Verificación |
|---|---|---|
| Portada con Ojo de Horus | ✅ | capturas 1920/1366/1024/390 |
| Sadchuruzen con animaciones corporales | ✅ (sprite provisional) | cuadrícula de 10 poses + pruebas en mundo |
| Subida de escaleras con movimiento real | ✅ | posiciones por fotograma, patas alternas, perro sigue |
| Música distinta por zona | ✅ (sintética) | `aud.mood` verificado en portada, mapa, mundo, reto, cámara, sala; render offline |
| 7 pirámides diferenciadas | ✅ | captura del mundo |
| Apartados académicos accesibles | ✅ | 11 botones del índice probados |
| Índice y mapa sincronizados | ✅ | marcas ✓ en mapa, índice, diario, carril |
| Proyectos y prácticas conservados | ✅ | cámaras V y VI intactas |
| Reflexiones en una sola sección | ✅ | 0 huecos de reflexión en I–VI |
| Navegación y cuestionarios | ✅ | prueba completa (fallo, pista, reintento, pase, apertura) |
| Adaptable | ✅ | 2560, 1920, 1366, 1024, 768, 390, 844×390 sin desbordes |

## 9. Pendiente (no simulado)
- Textos de las crónicas y de «Situación actual en la ciberseguridad» (huecos marcados como pendientes). No se incluyen noticias: requieren fuente, fecha y enlace.
- Fotografía para afinar el retrato de la cumbre.
- Sprite de Sadchuruzen definitivo y coro grabado/licenciado (ver §5 y §6).
- Cámaras I–VII siguen compartiendo plantilla de contenido; sus escenas SVG ya difieren.
- No se hicieron pruebas en dispositivos físicos ni con lector de pantalla; solo emulación en Chromium.


---
## v4 · Música real, creación de explorador y rediseño de la Archivera

**Qué cambia**
- **Banda sonora real** (`assets/audio/`, 5 pistas; las dos copias de «Isis» eran idénticas). Una pista por zona, en bucle (fundido de 3,6 s antes del final), fundido cruzado entre zonas, una sola pista activa (la saliente solo dura el fundido), volumen de música y de efectos por separado, silencio, pausa/reanudar, preferencias guardadas y arranque tras el primer gesto. Mapa zona→pista en `src/part3j_music.js` (`ZONES`). Se corrigió un fallo: tras pausar, la música no se reanudaba.
- **Creación del explorador** (`src/part3l_avatars.js`): flujo historia → creador → llegada animada → mundo. 5 pasos (nombre; presentación opcional mujer/hombre/prefiero no decirlo; galería de 10 avatares —5 personas, perro, gata, ibis, cría de esfinge, escarabajo—; apariencia; vestuario/adornos/amuletos; confirmar). La presentación solo ordena sugerencias; no limita nada. Perfil en localStorage; botón de perfil siempre visible para editarlo; «Reiniciar expedición» conserva el perfil y «Borrar todo» lo elimina.
- **El avatar aparece** en: botón de perfil (mapa y cámaras), mundo (camina con la cámara y celebra al recoger reliquias), diálogo de los guardianes, apertura de cámara (celebración), subida a la Cumbre, diario y llegada cinematográfica.
- **La Archivera** (`src/part3k_heroina.js`): rediseño completo del retrato femenino (antes en la Cumbre; no había figura femenina en la portada, que tiene el Ojo de Horus). Ilustración vectorial original inspirada en tu referencia: ojos con kohl y sombra turquesa, melena con reflejos, diadema con cobra, collar wesekh, pendientes, luz de luna. Animada: parpadeo, mirada que sigue al cursor, cabeceo, cabello y respiración, destellos, sonrisa al acercarse y reverencia con frase al pulsarla.

**Limitaciones honestas**
- Las pistas **no tienen licencia verificada** (ver `assets/audio/LICENCIAS.md`). Hay 5 pistas para ~15 zonas: ninguna zona contigua repite pista, pero hay zonas que comparten.
- Los 10 avatares son un rig SVG propio (calidad de ilustración vectorial, no de artista); la Archivera es la pieza de mayor detalle. Los avatares de cuerpo entero no tienen la misma finura.
- Probado con Chromium en 7 resoluciones; no en móvil real ni con lector de pantalla. En 844×390 (apaisado) el creador es utilizable pero ajustado.
- Faltan: crónicas y «Situación actual» (textos de la autora), fotografía para el retrato, spritesheet definitivo de Sadchuruzen. Las fases de templos jugables con combate/minijuegos del brief grande **no están hechas** en esta entrega.

## v5 · Los siete templos jugables (entrega final)

### Qué se ha implementado (código en `src/part3m_temples.js`, `part3n_minigames.js`, `part1e_temples.css`)
Cada cámara 1-6 se abre ahora como **templo**: entrada cinematográfica (pirámide con zoom, puertas que se abren, la exploradora y el perro entran; botón *Saltar*) → interior oscuro con niebla, polvo y antorchas con parallax al mover el puntero → aparición de la guardiana (ojos, barra de vida, estados *Vigilante/Furioso/Debilitado*) → **diálogo ramificado** (3 decisiones: pregunta de contexto, pedir pista = +1 vida, o aceptar el desafío = guardiana más difícil y doble recompensa) → **minijuego propio** → **quiz académico** de la guardiana → **purificación** (la guardiana se libera, vuelve la luz) → escena de desbloqueo → cámara académica (todo el contenido anterior intacto).
| Templo | Escenario | Minijuego (habilidad) |
|---|---|---|
| 1 Puerta del Desierto | pilonos y esfinges | Defensa del Umbral: amenazas que caen vs. elementos legítimos (reflejos) |
| 2 Sala de los Códices | biblioteca de papiros | Descifra el códice: César con disco y tiempo de tinta (lógica) |
| 3 Gran Salón de las Columnas | hipóstilo con racks | Sala de máquinas: medida correcta para cada peligro (seguridad pasiva) |
| 4 Cámara del Tesoro | cofres y ánforas | Laberinto: 3 copias, trampas por turnos, escarabajos que patrullan y persiguen (BFS) |
| 5 Laboratorio | engranajes giratorios | Circuito: girar losas mientras el autómata sabotea |
| 6 Cámara de las Cadenas | bloques flotantes con hash | Forja de bloques: memoria de secuencias con cadena de hashes |
| 7 Cumbre | luna, escalinata, altar | Combate final tras la escalada: Sombra del Olvido, 3 fases, súbditos, escudo, esquivar y disparar luz |
Ayudas: tras 2 derrotas aparece **modo asistido**; siempre hay *Reintentar*, *Saltar minijuego* y *Entrar sin prueba*; Esc/«Salir del templo» vuelve al mapa. Recompensa: «puntos de expedición» (`P.d.coins`). El índice académico sigue abriendo cada cámara sin retos. Controles: teclado, ratón y táctil (cruceta en pantallas táctiles).

### 3D / 2D / 2.5D (decisión)
No hay 3D real salvo el pseudo‑3D CSS del Ojo de Horus. Los templos son **2.5D** (capas SVG con parallax por puntero + niebla/polvo); minijuegos y personajes son **2D** (DOM/Canvas/SVG). Motivo: estabilidad, peso del archivo (≈1,85 MB) y compatibilidad con Google Sites/GitHub Pages sin librerías.

### Pruebas realizadas
Automáticas (Playwright/Chromium headless, sin errores JS): carga de los 7 escenarios con capturas; **victoria con bot** en los minijuegos 1, 2, 3, 5 y 6 (juego real); en el 4 y el 7 la victoria se probó con ayudas de depuración (teletransporte a los objetos / jefe con poca vida) porque el bot no esquiva; **derrota** real (vidas a 0 → pantalla de reintento) en 1, 3, 4 (el 2 y el 5 pierden por tiempo, >2 min, no esperado entero; el 6 no tiene límite de tiempo, solo pierde al fallar); flujo completo temple 1 (diálogo→juego→quiz) y temple 2 (juego→quiz→purificación→desbloqueo→cámara abierta, progreso y monedas guardados); jefe final tras la escalada → cámara 7 abierta; música audible medida por estado (currentTime avanzando, volumen, pausa/reanudar); piel del avatar aplicada a cabeza, brazos y piernas; maquetación a 1440×900, 390×844 y 844×390.
Inspección de código/visual: capturas revisadas por mí. **No** probado: dispositivos físicos reales, lector de pantalla, escuchar el audio con oídos (el sandbox no tiene salida de sonido), partidas largas de personas reales, ajuste fino de dificultad.

### Limitaciones conocidas (no resueltas)
- Licencias de las 5 pistas musicales no verificadas (`assets/audio/LICENCIAS.md`).
- Avatares y guardianas son arte vectorial propio provisional, no ilustración profesional.
- Los minijuegos 4 y 7 pueden resultar exigentes con ratón; hay modo asistido tras dos derrotas.
- SFX generados con WebAudio (puertas, pasos, golpes, reliquias): sencillos.
- En pantalla apaisada muy baja la ayuda de Sadchuruzen se reduce para no tapar los controles.


---
## v6 · Revisión de controles y preparación de entrega

- Minijuego 4: añadido movimiento con ratón por clic en una casilla, calculando una ruta por el laberinto; se mantienen teclado, WASD, cruceta y gesto táctil.
- Minijuego 7: añadido control de ratón por zonas: clic en la mitad inferior para mover al explorador y clic/ mantener en la superior para disparar. Se mantienen teclado y táctil.
- Instrucciones de ambos minijuegos actualizadas para explicar los controles.
- `src/build.py` crea `dist/` si no existe. `index.html` de raíz se sincroniza con la compilación actual.
- Comprobaciones: build correcta; `node --check` sobre el JavaScript concatenado correcto; cinco MP3 legibles por `ffprobe`.
- Pendiente de prueba humana: partidas completas con ratón/táctil, escucha real de audio, pruebas en dispositivos físicos y lector de pantalla. Licencias musicales sin verificar. Ver `REVISION_ENTREGA_V6.md`.


## Actualización v7 — ampliación de banda sonora

Se han integrado las diez pistas aportadas en esta conversación. La selección por zona se configura en `src/part3j_music.js`; las zonas principales usan ambientación distinta y se mantiene el fundido cruzado, el bucle y los controles de volumen/pausa. La pista adicional de vídeo queda incluida en la biblioteca, pero no asignada a una zona principal. Las licencias de todas las pistas continúan sin verificar; consultar `assets/audio/LICENCIAS.md` antes de publicar.


## Actualización v8 — distribución de audio
El script de compilación copia ahora `assets/audio/` dentro de `dist/assets/audio/`, manteniendo la estructura relativa que espera el reproductor. Al publicar GitHub Pages desde la carpeta `dist`, debe subirse el contenido completo de `dist`, no solo `index.html`.


## Actualización v10 — contenido personal y limpieza de portada

- Se completaron las crónicas personales con las reflexiones recuperadas sobre gratitud, perdón, tecnología y ciberseguridad, la charla de Adrián, IA y datos, el taller de números manuscritos, la visita al RAG, la organización del cableado y el aprendizaje bajo presión.
- Se incorporó una introducción diferenciada sobre los pilares técnicos elegidos: firewall y defensa, criptografía/PKI/certificados, protección física y CPD, almacenamiento/RAID, copias, Docker y protección de claves.
- La zona de introducción se rediseñó como una cartografía de cinco tarjetas editoriales, evitando bloques genéricos repetidos.
- Se eliminó el segundo control deslizante de volumen (efectos), que no ofrecía una función clara para la usuaria. Se conserva un único control de volumen musical, el botón de reproducción/pausa y el silencio general.
- Las reflexiones se redactaron a partir de ideas expresadas por la autora en conversaciones anteriores; las formulaciones son una edición para el portafolio, no citas literales.


## Actualización v11 — estructura editorial y compañera

- La Cámara 7 / Crónicas del explorador contiene exactamente tres entradas: ciberseguridad; gratitud, agradecimiento y perdón; charla de Adrián.
- La charla de Adrián se integra como una crónica dentro de la Cámara 7; se elimina su acceso como página/apartado independiente.
- La reflexión de ciberseguridad se retira del contenido del Tema 1 para evitar mezclar opinión personal con el desarrollo académico. El Tema 1 conserva sus apartados técnicos.
- Se elimina el índice académico repetido que se insertaba debajo del mapa. El mapa conserva el índice accesible de las siete cámaras como índice principal.
- Sadchuruzen conserva el retrato circular, el aro, los destellos, el indicador y las reacciones existentes; se añade un movimiento suave de flotación y respiración al retrato, y se conserva el seguimiento del cursor mediante variables CSS.
- Limitación: el recurso visual actual es un retrato circular, no un sprite de cuerpo completo; por eso la animación añadida es sutil y no simula patas, cola o una caminata que la imagen no permite representar fielmente.


## v12 · Reconstrucción académica y compañera animada

- Se completaron los contenidos de los Temas 1–4 a partir de los PDF de clase, manteniendo sus conceptos y organización: objetivos de seguridad, activos, amenazas y ataques; criptografía simétrica/asimétrica, hash, firma y PKI; CPD, protección, climatización, SAI y centro de respaldo; RAID, NAS/SAN, clústeres, copias e imágenes.
- Se ampliaron los laboratorios de Docker, variables de entorno/PostgreSQL, CPD Arena, OpenMediaVault 8, John the Ripper, Lynis, Blockchain/AulaCoin y CyberChef. Se incorporaron capturas auténticas del PDF de Lynis y de las prácticas de criptografía clásica y GPG/MD5.
- CPD Arena conserva los resultados documentados: prueba 1, 4/8 incidentes superados sin daños, 534 puntos y 32.750 €; prueba 3, 4/8, 566 puntos y 33.450 €.
- Lynis conserva los resultados documentados: un warning de tiempo de comprobación SSL, 38 sugerencias, kernel OK y permisos de /etc/sudoers OK; protección por contraseña del arranque indicada como NINGUNO.
- Las reflexiones se reducen a tres entradas en Cámara 7: ciberseguridad; gratitud, agradecimiento y perdón; charla de Adrián. No se muestran bloques ni reflexiones dentro de los Temas 1–6. La charla no tiene página independiente.
- La sección «Situación actual en la ciberseguridad» está dentro del Tema 1. Los titulares, fechas y enlaces de las noticias anteriores no aparecen en los documentos recuperados para esta reconstrucción; no se han sustituido por noticias inventadas.
- Sadchuruzen recupera el GIF animado original de la compañera que ya se había creado en el proyecto, conserva el marco, el halo, los destellos y las reacciones CSS. En el mundo se mantiene el sprite SVG articulado de cuerpo entero con caminar, correr, sentarse, tumbarse, olfatear, celebrar y subir escaleras.
- La navegación del índice incluye conceptos, situación actual, Docker, criptografía, Blockchain, seguridad pasiva, ubicación del CPD, prácticas y acceso único a las reflexiones.
