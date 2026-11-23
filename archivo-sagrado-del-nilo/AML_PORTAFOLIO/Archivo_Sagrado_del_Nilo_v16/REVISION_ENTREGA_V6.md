# Revisión de entrega · El Archivo Sagrado del Nilo · v6

## Cambios realizados en esta revisión

1. **Laberinto del Tesoro (minijuego 4):** se añadió navegación con ratón mediante clic en una casilla transitable. El juego calcula una ruta por el laberinto y desplaza al explorador paso a paso. Se mantienen teclado, WASD, gestos táctiles y cruceta.
2. **Combate final (minijuego 7):** se añadió un control de ratón más claro: clic en la mitad inferior de la arena para recolocar al explorador y clic/ mantener en la mitad superior para disparar. Se mantienen teclado y controles táctiles.
3. **Instrucciones en pantalla:** se actualizaron para explicar los nuevos controles.
4. **Construcción:** `src/build.py` crea ahora automáticamente la carpeta `dist/` si no existe. También se regeneró `dist/index.html` y se sincronizó `index.html` de la raíz con esa versión.
5. **Documentación:** se mantiene explícito que las licencias de las cinco pistas no están verificadas y que no deben publicarse hasta confirmar permisos o sustituirlas.

## Comprobaciones realizadas en esta revisión

- Construcción desde `src/build.py`: correcta; genera `dist/index.html` (aprox. 1,85 MB).
- Sintaxis del JavaScript concatenado: correcta con `node --check`.
- Integridad técnica de los cinco MP3: `ffprobe` puede leer los cinco archivos y extraer sus duraciones.
- Revisión del código de controles de los minijuegos 4 y 7.
- La carpeta `dist/` se genera incluso si no existía previamente.

## Pendiente / límites que no se deben ocultar

- No he podido realizar una partida interactiva completa en un navegador real en este entorno. Por tanto, los nuevos controles de ratón están implementados y revisados en código, pero requieren una prueba manual final en Chrome/Edge.
- No puedo escuchar el resultado acústico desde este entorno. Que los MP3 sean legibles y que el reproductor avance no sustituye una escucha humana.
- Las licencias de las cinco pistas siguen sin verificarse. No publicar en GitHub Pages ni compartir públicamente el sitio con esas pistas hasta obtener permiso o reemplazarlas por música con licencia compatible.
- No he inventado las crónicas personales, la reflexión autobiográfica, noticias ni fuentes de actualidad que dependen de información de la autora.
- Avatares y guardianas siguen siendo ilustraciones vectoriales provisionales; un rediseño artístico profesional exigiría nuevos recursos gráficos.
- No se ha probado en dispositivos físicos ni con lector de pantalla.

## Recomendación inmediata antes de entregar

1. Abrir `index.html` en Chrome o Edge.
2. Completar al menos una partida de los minijuegos 4 y 7 con ratón y otra con pantalla táctil.
3. Probar una derrota y una victoria en cada uno.
4. Escuchar música con volumen moderado y comprobar pausa, reanudación y cambios de zona.
5. Si se va a publicar, reemplazar o licenciar las cinco pistas y revisar los apartados personales pendientes.

La entrega incluye código fuente, recursos, documentación, `index.html` y `dist/index.html`.


## Actualización v7 — música integrada
Se incorporaron las pistas de audio adjuntas, con asignación por zona y controles existentes. Las cuatro pistas AAC de larga duración se optimizaron a fragmentos de 8 minutos para evitar un paquete web excesivamente pesado. Consultar `assets/audio/LICENCIAS.md`: permisos de publicación aún no verificados.


## Corrección v8 — rutas de audio en publicación
Se actualizó `src/build.py` para copiar `assets/audio/` a `dist/assets/audio/` cada vez que se compila. Así, el `index.html` generado dentro de `dist/` encuentra las pistas usando sus rutas relativas. Verificación: compilación finalizada y 10 pistas presentes en `dist/assets/audio/`.


## Actualización v10 — contenido y controles
Se eliminó el slider secundario de efectos y se conservó el control principal de volumen musical. Se rediseñó la introducción en tarjetas editoriales y se completaron las crónicas con las reflexiones recuperadas de la autora. La charla de Adrián, el aprendizaje sobre sesgos/limitaciones de datos y el taller de números manuscritos se mantienen en apartados separados. El contenido personal se ha editado respetando las ideas compartidas; no se presenta como cita textual.


## Actualización v11 — estructura editorial y compañera

- La Cámara 7 / Crónicas del explorador contiene exactamente tres entradas: ciberseguridad; gratitud, agradecimiento y perdón; charla de Adrián.
- La charla de Adrián se integra como una crónica dentro de la Cámara 7; se elimina su acceso como página/apartado independiente.
- La reflexión de ciberseguridad se retira del contenido del Tema 1 para evitar mezclar opinión personal con el desarrollo académico. El Tema 1 conserva sus apartados técnicos.
- Se elimina el índice académico repetido que se insertaba debajo del mapa. El mapa conserva el índice accesible de las siete cámaras como índice principal.
- Sadchuruzen conserva el retrato circular, el aro, los destellos, el indicador y las reacciones existentes; se añade un movimiento suave de flotación y respiración al retrato, y se conserva el seguimiento del cursor mediante variables CSS.
- Limitación: el recurso visual actual es un retrato circular, no un sprite de cuerpo completo; por eso la animación añadida es sutil y no simula patas, cola o una caminata que la imagen no permite representar fielmente.


## v12 · Cierre de contenido académico
Se completaron las cámaras técnicas y los laboratorios a partir de los documentos de clase y prácticas disponibles. Las tres reflexiones están agrupadas únicamente en la Cámara 7. La charla de Adrián se integra en esa tercera entrada y no tiene página propia. Se restauró el GIF animado original de Sadchuruzen y se mantuvo el sprite de cuerpo entero en el mundo. La sección de actualidad no incluye titulares porque no se recuperaron las noticias originales con sus fechas y enlaces.

Pruebas realizadas en esta entrega: compilación HTML correcta, sintaxis JavaScript correcta con `node --check`, GIF incluido en línea y 11 recursos de audio copiados a `dist/assets/audio`. No se ha realizado prueba humana completa en navegador.


## Actualización v13 — crónicas, fuentes y navegación

- La Cámara VII queda organizada en tres crónicas, tal como establece la estructura editorial: ciberseguridad; gratitud, agradecimiento y perdón; y charla de Adrián.
- La charla indica expresamente que se realizó el **5 de octubre de 2026**. Se mantienen los ejemplos que la autora compartió sobre mapas musicales, datos, reconocimiento de imágenes, juegos y el taller de números manuscritos/ONNX.
- Cada crónica termina con bibliografía o webgrafía comentada, con enlaces externos y una breve explicación de la relación con la reflexión.
- «Situación actual en la ciberseguridad» se completa con el informe ENISA Threat Landscape 2026, publicado el 22 de septiembre de 2026, y se conecta con los conceptos del Tema 1. No se presentan como propias noticias anteriores cuyos enlaces no se han podido recuperar.
- Se amplían las áreas pulsables y los estados de foco/teclado de los enlaces de navegación y controles de las cámaras.
- Verificación técnica: compilación correcta y sintaxis JavaScript comprobada con `node --check`. La automatización del navegador de este entorno bloqueó la navegación local, por lo que la prueba manual final de clics en Chrome/Edge sigue siendo necesaria antes de publicar.


## Actualización v14 · revisión solicitada por Laura

- Se eliminaron las capturas de Lynis de las páginas 5–8 porque mostraban iconos de error dentro de las imágenes. Se conservaron las capturas limpias de las páginas 3 y 4 y se retiraron también los cuatro archivos de imagen del paquete.
- Se corrigió el renderizado de apartados vacíos: si no hay contenido documentado, el apartado no se muestra y tampoco aparece como enlace de navegación. Se eliminaron los textos de «sello pendiente» de los contenidos visibles.
- Se revisaron las tres crónicas y se añadieron bibliografía/webgrafía comentada al final de cada una. La charla de Adrián aparece fechada el 5 de octubre de 2026. Se han mantenido las experiencias que constan en el proyecto y no se han inventado titulares ni anécdotas.
- Se ajustó la alineación justificada de los párrafos y listas de contenido académico y reflexivo, con separación de palabras para mejorar la lectura en español.
- El botón del diario de la esquina superior derecha ahora permanece fijo y tiene un área de pulsación mayor. Se amplió el área de interacción de los botones de navegación entre cámaras y se corrigió el cálculo del desplazamiento de los enlaces internos para que el encabezado no tape el apartado seleccionado.
- Compilación: correcta. JavaScript: comprobado con `node --check`. Referencias de imágenes usadas en el contenido: 44, todas con archivo correspondiente. La prueba de navegador automatizada fue bloqueada por la política del entorno; por ello no se declara una prueba de clics completa en navegador real.
