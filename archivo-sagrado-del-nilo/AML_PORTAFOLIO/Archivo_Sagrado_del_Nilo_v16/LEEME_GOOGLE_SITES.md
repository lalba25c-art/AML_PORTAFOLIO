# El Archivo Sagrado del Nilo · Guía de uso e integración

## Archivos
- `dist/index.html` → experiencia completa (CSS, JS y SVG integrados); los archivos de música y las imágenes se sirven desde `dist/assets/`. Sin Three.js/GSAP: todo en SVG + Canvas 2D + WebAudio.
- `src/` → fuentes separadas (`part1_css.css`, `part2_body.html`, `part3*.js`) y `build.py` (`python3 src/build.py` regenera `dist/index.html`).
- `assets/` → fotos de Sadchuruzen y capturas optimizadas (webp).
- `evidencias_clasificadas/` → clasificación de recursos (ver abajo).

## Cómo rellenar los contenidos
Edita `src/part3a_data.js`, bloque `CONTENT` (y `LABS` para capturas). Los apartados sin contenido documentado se ocultan automáticamente para que no aparezcan espacios vacíos ni enlaces sin destino. Elementos admitidos: texto, `{h}`, `{list}`, `{code}`, `{cmd,out,explain}`, `{img,cap}`, `{compare}`. Después ejecuta `python3 src/build.py`.
Para añadir una captura nueva: copia el `.webp` a `assets/` con prefijo `ev_` y úsala por su nombre sin `ev_` ni extensión.

## Integrar en Google Sites
**Opción A (rápida):** Insertar → Insertar (Embed) → pestaña «Código para insertar» → pega el contenido de `dist/index.html` → Insertar. Pon el bloque a ancho completo y cuanto más alto mejor (recomendado 100 % de ancho y ≥ 800 px de alto). Si Google rechaza el tamaño (~1,3 MB), usa la B.
**Opción B (recomendada):** publica `dist/index.html` en un alojamiento HTTPS (GitHub Pages, Netlify…) → Insertar → pestaña «Por URL» → pega la URL.
Consejo: en Sites, usa una página con diseño de una sola sección sin cabecera para que la experiencia ocupe toda la ventana.

## Chatbot de Sadchuruzen
Funciona ya con respuestas locales (KB en `part3d_audio_chat.js`: mapa, cámaras, prácticas, evidencias, comandos Docker/John, CyberChef, crónicas, volver). Los textos académicos que añadas a `CONTENT` se usan automáticamente en las respuestas.
Para conectar una IA externa: en `CONFIG.chatEndpoint` pon la URL de tu servicio (POST JSON `{message,history,knowledge}` → `{reply}`). Si falla o no está configurado, vuelve a las respuestas locales. **No pongas claves de API en el HTML**: usa un servidor intermedio.

## Limitaciones en Google Sites (y alternativas)
1. Se muestra dentro de un iframe: no controla menú, cabecera ni fondo de Sites. Alternativa: página limpia sin cabecera, o enlazar a la URL del alojamiento en pantalla completa.
2. Música: los navegadores exigen un clic; por eso se activa con el botón (no hay autoplay). Hay que publicar también `dist/assets/audio/` junto al HTML.
3. El portapapeles y el historial (`#camara-N`) pueden estar restringidos en iframes: hay alternativa de copiado y el enlace directo es opcional.
4. Rueda del ratón: con el puntero sobre el iframe, la experiencia captura el desplazamiento; al llegar al final, la página de Sites continúa.
5. Google Fonts es externa: si no carga se usan fuentes serif del sistema.
6. No se usa WebGL: no hay riesgo en móviles; el efecto 3D es parallax por capas y perspectiva CSS. Con «reducir movimiento» se desactivan parallax, partículas y transiciones.

## Clasificación de recursos
- **Evidencias reales (39)**: capturas de terminales, CyberChef, CPD Arena, OpenMediaVault, John the Ripper y Docker, en `evidencias_clasificadas/evidencias_reales/` (originales PNG).
- **Excluidas**: logotipo de Docker (se repite en cada página), clipart «Backup», diapositivas de los Temas 1–4 y de Docker_2 (material didáctico del profesor).
- **Sadchuruzen**: `_SADCHURUZEN_foto_original_limpia.png` (usada) y la captura de Facebook (con interfaz, no usada).
- **Sin imágenes egipcias de referencia**: solo llegaron las 2 fotos de Sadchuruzen. El universo visual es ilustración vectorial original por código.
- Revisar: la captura `postgres_run_variables` muestra una contraseña de laboratorio en claro; conviene difuminarla. La Ficha de AulaCoin no tiene capturas.

---
## Ampliación v2 · Expedición (qué hay de nuevo)
- **«Iniciar expedición»** (en el mapa): zoom al mapa → historia en 4 escenas → mundo explorable (arrastra, flechas, rueda, minimapa).
- **Pirámides con guardiana y reto** (banco de preguntas en `src/part3f_content.js`, objeto `QUIZ`): 5 tipos (opción múltiple, V/F, comando, ordenar, escenario). Si fallas: pista y segundo intento; nunca se bloquea el contenido («Entrar de todos modos»).
- **Apertura cinematográfica** «DESCIFRANDO EL MISTERIO» con dato curioso real y verificable (`FACTS`).
- **Sadchuruzen** con el diseño de la imagen de referencia, estados de ánimo, pistas y diario. Respuestas programadas (no es una IA externa).
- **Habitación de objetos perdidos** (10 fichas), **diario de expedición**, **ascenso a la 7.ª pirámide** y pergaminos.
- **Música por zonas** (Web Audio, capas de flauta, pad, pulso, mecanismos); progreso en `localStorage`.
- Sigue siendo un único `index.html`: válido para GitHub Pages y para incrustar en Google Sites.

### Pendiente de que aportes
- Textos de las crónicas (`CONTENT.cronicas[i].body`) y fotografía para ajustar el retrato de la cumbre.
- No se incluyen noticias de actualidad (requieren fuente, fecha y enlace verificados).


## Navegación editorial v11
La experiencia contiene siete cámaras. La Cámara 7, «Crónicas del explorador», reúne las tres reflexiones: ciberseguridad; gratitud, agradecimiento y perdón; y charla de Adrián. La charla no debe mantenerse como página independiente en la navegación de Google Sites. Si se usa el menú lateral de Sites mostrado en las capturas, elimina allí la página «Charla» y deja las tres entradas dentro de «Crónicas del explorador» (el menú de Sites se administra fuera de este HTML). El índice duplicado bajo el mapa ya no se genera: el mapa conserva su lista accesible de siete cámaras.
