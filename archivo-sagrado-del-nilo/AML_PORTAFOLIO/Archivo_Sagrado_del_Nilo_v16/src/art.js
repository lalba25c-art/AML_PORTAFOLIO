/* ============================================================
   art.js · Escenas SVG originales generadas por código.
   Ningún recurso externo. Todo es vectorial y reemplazable
   (ver CONFIG.art en data.js para sustituir por imágenes propias).
   ============================================================ */
(function () {
  const C = { obs: '#090D0E', deep: '#102522', temple: '#173B35', turq: '#277C78', gold: '#B58A45', lum: '#E4C77D', sand: '#D8BD8C', ivory: '#F5EAD5', lapis: '#173C67' };
  let seed = 11;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const R = (a, b) => a + (b - a) * rnd();
  const f = n => Math.round(n * 10) / 10;

  /* ---------- Glifos (sprite) ---------- */
  const GL = {
    ankh: '<ellipse cx="20" cy="15" rx="9" ry="12"/><path d="M20 27V57M7 31H33"/>',
    eye: '<path d="M3 28Q20 12 37 28Q20 42 3 28Z"/><circle cx="20" cy="28" r="5" fill="currentColor"/><path d="M5 19Q20 6 35 19M13 38Q11 48 6 52M22 39Q25 48 31 50"/>',
    feather: '<path d="M20 4C31 18 31 40 20 56C9 40 9 18 20 4Z"/><path d="M20 8V58M20 22L27 17M20 32L28 26M20 22L13 17M20 32L12 26"/>',
    djed: '<path d="M20 56V10M12 56H28M10 18H30M12 27H28M10 36H30M12 45H28"/><path d="M14 10Q20 3 26 10"/>',
    scarab: '<ellipse cx="20" cy="34" rx="10" ry="14"/><circle cx="20" cy="15" r="5"/><path d="M20 20V48M10 28Q2 24 3 18M30 28Q38 24 37 18M10 38Q2 40 3 46M30 38Q38 40 37 46M9 33H1M31 33H39"/>',
    water: '<path d="M3 16l6-5 6 5 6-5 6 5 6-5 4 3M3 30l6-5 6 5 6-5 6 5 6-5 4 3M3 44l6-5 6 5 6-5 6 5 6-5 4 3"/>',
    sun: '<circle cx="20" cy="30" r="14"/><circle cx="20" cy="30" r="3" fill="currentColor"/><path d="M20 6V12M20 48V54M3 30H9M31 30H37"/>',
    reed: '<path d="M20 56V30M20 30C10 26 8 14 12 4C18 10 22 20 20 30ZM20 36C30 32 33 22 31 12C24 17 19 26 20 36Z"/>',
    was: '<path d="M20 56V14M20 14L10 6M20 14L26 8L30 12M14 56H26"/>',
    bird: '<path d="M8 40C8 24 20 14 30 20L36 18L32 26C34 36 26 46 16 46L12 56M16 46L22 56"/><circle cx="29" cy="22" r="1.6" fill="currentColor"/>'
  };
  const GN = Object.keys(GL);
  function sprite() {
    return '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
      GN.map(k => `<symbol id="g-${k}" viewBox="0 0 40 60"><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">${GL[k]}</g></symbol>`).join('') +
      '</defs></svg>';
  }
  const gly = (n, x, y, h, col, cls = '', extra = '') => `<use href="#g-${n}" x="${f(x)}" y="${f(y)}" width="${f(h * .667)}" height="${f(h)}" style="color:${col}" class="${cls}" ${extra}/>`;

  /* ---------- Alas (plumas) ---------- */
  const feather = (len, w) => `M0 0C${w} ${-len * .22} ${w * .9} ${-len * .8} 0 ${-len}C${-w * .9} ${-len * .8} ${-w} ${-len * .22} 0 0Z`;
  function wing(p, o = {}) {
    const rows = o.rows || [
      { n: 13, l0: 205, l1: 380, w: 21, fill: `url(#${p}wl)`, a0: 12, a1: 122 },
      { n: 12, l0: 130, l1: 250, w: 19, fill: `url(#${p}wt)`, a0: 18, a1: 116 },
      { n: 11, l0: 78, l1: 150, w: 17, fill: `url(#${p}wg)`, a0: 24, a1: 110 }
    ];
    let s = '';
    rows.forEach(r => {
      for (let i = 0; i < r.n; i++) {
        const t = i / (r.n - 1), a = r.a0 + (r.a1 - r.a0) * t, l = r.l0 + (r.l1 - r.l0) * Math.pow(t, .8);
        s += `<path d="${feather(l, r.w)}" transform="rotate(${f(a)})" fill="${r.fill}" stroke="${C.lum}" stroke-width="1.3" stroke-opacity=".75"/>`;
        s += `<path d="M0 -6V${f(-l * .86)}" transform="rotate(${f(a)})" stroke="${C.lum}" stroke-width=".7" stroke-opacity=".4" fill="none"/>`;
      }
    });
    return s;
  }
  function wingDefs(p) {
    return `<linearGradient id="${p}wl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#0f2f55"/><stop offset=".6" stop-color="${C.lapis}"/><stop offset="1" stop-color="#2d6a8c"/></linearGradient>
    <linearGradient id="${p}wt" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#14403d"/><stop offset=".6" stop-color="${C.turq}"/><stop offset="1" stop-color="#58b3a6"/></linearGradient>
    <linearGradient id="${p}wg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7a5827"/><stop offset=".55" stop-color="${C.gold}"/><stop offset="1" stop-color="${C.lum}"/></linearGradient>`;
  }

  /* ---------- Diosa alada (Isis/Hathor estilizada, original) ---------- */
  function goddess(p = 'gd') {
    const rows = (s) => `<g transform="scale(${s},1)">${wing(p)}</g>`;
    const beads = (rx, ry, y, col, w = 7) => `<path d="M${-rx} ${y}A${rx} ${ry} 0 0 0 ${rx} ${y}" fill="none" stroke="${col}" stroke-width="${w}" stroke-dasharray="${w * .9} ${w * .55}" stroke-linecap="round"/>`;
    return `<defs>${wingDefs(p)}
      <linearGradient id="${p}skin" x1="0" x2="1"><stop offset="0" stop-color="#d49a5e"/><stop offset=".5" stop-color="#e8b878"/><stop offset="1" stop-color="#a8703c"/></linearGradient>
      <linearGradient id="${p}tun" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#c9ae7c"/><stop offset=".45" stop-color="${C.ivory}"/><stop offset="1" stop-color="#b79a68"/></linearGradient>
      <radialGradient id="${p}disk" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6d2"/><stop offset=".55" stop-color="${C.lum}"/><stop offset="1" stop-color="${C.gold}"/></radialGradient>
      <radialGradient id="${p}aura" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${C.lum}" stop-opacity=".55"/><stop offset=".6" stop-color="${C.lum}" stop-opacity=".12"/><stop offset="1" stop-color="${C.lum}" stop-opacity="0"/></radialGradient>
      <filter id="${p}glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter></defs>
    <circle cx="0" cy="-470" r="520" fill="url(#${p}aura)"/>
    <g class="wings" transform="translate(0,-538)">
      <g filter="url(#${p}glow)" opacity=".5"><g>${wing(p)}</g><g transform="scale(-1,1)">${wing(p)}</g></g>
      <g>${wing(p)}</g><g transform="scale(-1,1)">${wing(p)}</g>
    </g>
    <!-- vestido -->
    <path d="M-60 -540L60 -540C72 -420 68 -200 60 -14L-60 -14C-68 -200 -72 -420 -60 -540Z" fill="url(#${p}tun)" stroke="${C.lum}" stroke-width="1.5"/>
    ${[-40, -26, -13, 0, 13, 26, 40].map(x => `<path d="M${x} -520C${x * 1.05} -360 ${x * 1.08} -180 ${x * 1.04} -16" stroke="#8a6c3a" stroke-opacity=".28" stroke-width="1.4" fill="none"/>`).join('')}
    <path d="M-66 -332H66L64 -306H-64Z" fill="${C.lapis}" stroke="${C.lum}" stroke-width="1.4"/>
    ${[-48, -24, 0, 24, 48].map(x => gly('ankh', x - 7, -330, 22, C.lum)).join('')}
    <path d="M-60 -34H60V-14H-60Z" fill="${C.turq}" stroke="${C.lum}" stroke-width="1.2"/>
    <path d="M-60 -48H60V-40H-60Z" fill="${C.gold}"/>
    <!-- brazos y ankh -->
    <path d="M62 -536C86 -470 100 -380 106 -300" stroke="url(#${p}skin)" stroke-width="17" fill="none" stroke-linecap="round"/>
    <path d="M-62 -536C-86 -470 -100 -380 -106 -300" stroke="url(#${p}skin)" stroke-width="17" fill="none" stroke-linecap="round"/>
    <rect x="97" y="-372" width="19" height="9" rx="3" fill="${C.lum}"/><rect x="-116" y="-372" width="19" height="9" rx="3" fill="${C.lum}"/>
    <g transform="translate(106,-300)"><ellipse cx="0" cy="-58" rx="17" ry="24" fill="none" stroke="${C.lum}" stroke-width="7"/><path d="M0 -34V50M-26 -14H26" stroke="${C.lum}" stroke-width="7" stroke-linecap="round" fill="none"/><circle r="9" fill="url(#${p}skin)"/></g>
    <g transform="translate(-106,-300)"><path d="M0 60V-110" stroke="${C.lum}" stroke-width="6" stroke-linecap="round"/><path d="M0 -110L-16 -126M0 -110L10 -122L18 -116" stroke="${C.lum}" stroke-width="6" stroke-linecap="round" fill="none"/><circle r="9" fill="url(#${p}skin)"/></g>
    <!-- cuello, collar usekh -->
    <rect x="-15" y="-596" width="30" height="64" rx="10" fill="url(#${p}skin)"/>
    ${beads(66, 62, -548, C.lapis, 9)}${beads(76, 72, -544, C.turq, 8)}${beads(86, 82, -540, C.gold, 9)}${beads(97, 92, -536, C.lum, 6)}
    <!-- peluca tripartita -->
    <path d="M-48 -700C-62 -660 -70 -600 -86 -536L-52 -540C-50 -590 -46 -630 -40 -656Z" fill="#0b1013" stroke="${C.lum}" stroke-width="1.2"/>
    <path d="M48 -700C62 -660 70 -600 86 -536L52 -540C50 -590 46 -630 40 -656Z" fill="#0b1013" stroke="${C.lum}" stroke-width="1.2"/>
    ${[-566, -586, -606, -626].map(y => `<path d="M-84 ${y}L-60 ${y + 1}M84 ${y}L60 ${y + 1}" stroke="${C.lum}" stroke-width="3"/>`).join('')}
    <!-- rostro -->
    <ellipse cx="0" cy="-648" rx="41" ry="52" fill="url(#${p}skin)"/>
    <path d="M-44 -668C-40 -712 40 -712 44 -668C26 -690 -26 -690 -44 -668Z" fill="#0b1013"/>
    <path d="M-44 -672H44" stroke="${C.lum}" stroke-width="5"/>
    <g fill="#fbf1da"><path d="M-33 -654Q-20 -664 -7 -654Q-20 -646 -33 -654Z"/><path d="M33 -654Q20 -664 7 -654Q20 -646 33 -654Z"/></g>
    <g fill="#111"><circle cx="-20" cy="-654" r="4.2"/><circle cx="20" cy="-654" r="4.2"/></g>
    <path d="M-38 -656L-56 -650M-34 -652L-54 -642M38 -656L56 -650M34 -652L54 -642" stroke="#0b1013" stroke-width="3" stroke-linecap="round" fill="none"/>
    <path d="M-34 -668Q-20 -676 -6 -668M34 -668Q20 -676 6 -668" stroke="#0b1013" stroke-width="3" fill="none"/>
    <path d="M0 -652L-3 -632Q0 -629 3 -632Z" fill="#a8703c"/>
    <path d="M-10 -618Q0 -612 10 -618Q0 -608 -10 -618Z" fill="#8c3a2e"/>
    <!-- tocado: cuernos + disco solar + uraeus -->
    <path d="M-12 -706C-70 -716 -94 -770 -62 -812C-80 -772 -52 -742 -8 -724Z" fill="${C.gold}" stroke="${C.lum}" stroke-width="2"/>
    <path d="M12 -706C70 -716 94 -770 62 -812C80 -772 52 -742 8 -724Z" fill="${C.gold}" stroke="${C.lum}" stroke-width="2"/>
    <circle cx="0" cy="-786" r="62" fill="${C.lum}" opacity=".35" filter="url(#${p}glow)"/>
    <circle class="disk" cx="0" cy="-786" r="40" fill="url(#${p}disk)" stroke="#fff3c8" stroke-width="1.5"/>
    <path d="M0 -706C-6 -716 -6 -726 0 -732C6 -726 6 -716 0 -706Z" fill="${C.lum}"/>
    <path d="M-38 -14l-12 16H-26ZM38 -14l12 16H26Z" fill="${C.gold}"/>`;
  }

  /* ---------- Sol alado (Behdet) para frisos ---------- */
  function wingedSun(p, w = 360) {
    const k = w / 360;
    return `<defs>${wingDefs(p)}<radialGradient id="${p}d" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6d2"/><stop offset=".6" stop-color="${C.lum}"/><stop offset="1" stop-color="${C.gold}"/></radialGradient></defs>
    <g transform="scale(${k})">
      <g transform="translate(-26,0) rotate(-72)">${wing(p, { rows: [{ n: 9, l0: 70, l1: 150, w: 13, fill: `url(#${p}wl)`, a0: 0, a1: 70 }, { n: 8, l0: 50, l1: 100, w: 11, fill: `url(#${p}wg)`, a0: 6, a1: 62 }] })}</g>
      <g transform="translate(26,0) scale(-1,1) rotate(-72)">${wing(p, { rows: [{ n: 9, l0: 70, l1: 150, w: 13, fill: `url(#${p}wl)`, a0: 0, a1: 70 }, { n: 8, l0: 50, l1: 100, w: 11, fill: `url(#${p}wg)`, a0: 6, a1: 62 }] })}</g>
      <circle r="28" fill="url(#${p}d)" stroke="#fff3c8"/><circle r="19" fill="none" stroke="${C.gold}" stroke-opacity=".6" stroke-width="1.5"/>
    </g>`;
  }

  /* ---------- Piezas arquitectónicas ---------- */
  function column(x, w, top, bot, id, glyphs = true, tint = C.turq) {
    const h = bot - top;
    let s = `<g>
    <rect x="${x}" y="${top + 100}" width="${w}" height="${h - 100}" fill="url(#${id}sh)"/>`;
    for (let i = 1; i < 8; i++) s += `<path d="M${f(x + w * i / 8)} ${top + 104}V${bot}" stroke="#000" stroke-opacity=".28" stroke-width="2"/>`;
    s += `<rect x="${x - 6}" y="${top + 98}" width="${w + 12}" height="14" fill="${C.gold}"/><rect x="${x - 6}" y="${top + 112}" width="${w + 12}" height="8" fill="${tint}"/>
    <path d="M${x} ${top + 98}C${x - w * .12} ${top + 62} ${x - w * .34} ${top + 40} ${x - w * .28} ${top + 14}L${x + w * 1.28} ${top + 14}C${x + w * 1.34} ${top + 40} ${x + w * 1.12} ${top + 62} ${x + w} ${top + 98}Z" fill="url(#${id}cap)"/>
    <rect x="${x - w * .4}" y="${top}" width="${w * 1.8}" height="16" fill="${C.gold}"/><rect x="${x - w * .4}" y="${top + 16}" width="${w * 1.8}" height="6" fill="#000" opacity=".4"/>
    <rect x="${x - 12}" y="${bot - 26}" width="${w + 24}" height="26" fill="#08100f"/><path d="M${x - 12} ${bot - 26}H${x + w + 12}" stroke="${C.gold}" stroke-width="2"/>`;
    if (glyphs) {
      const n = Math.floor((h - 260) / (w * 1.1));
      for (let i = 0; i < n; i++) s += gly(GN[(i * 3 + Math.floor(x)) % GN.length], x + w * .22, top + 150 + i * w * 1.1, w * .62, C.lum, 'glw', `style="color:${C.lum};animation-delay:${f((i * .7 + x % 3) % 6)}s"`);
    }
    return s + '</g>';
  }
  const colDefs = id => `<linearGradient id="${id}sh" x1="0" x2="1"><stop offset="0" stop-color="#2a4a42"/><stop offset=".25" stop-color="#17302b"/><stop offset=".7" stop-color="#0d1c1a"/><stop offset="1" stop-color="#070c0c"/></linearGradient>
  <linearGradient id="${id}cap" x1="0" x2="1"><stop offset="0" stop-color="#2b5a50"/><stop offset=".5" stop-color="#173B35"/><stop offset="1" stop-color="#0a1614"/></linearGradient>`;

  function pyramid(x, y, w, h, id, lit = `url(#${id}L)`, shade = `url(#${id}S)`) {
    const hw = w / 2, ax = x, ay = y - h;
    let c = '';
    for (let i = 1; i < 7; i++) { const t = i / 7, yy = y - h * t, off = hw * (1 - t); c += `<path d="M${f(x - off)} ${f(yy)}H${f(x + off)}" stroke="#000" stroke-opacity=".13" stroke-width="1"/>`; }
    return `<polygon points="${x - hw},${y} ${ax},${ay} ${x},${y}" fill="${lit}"/><polygon points="${ax},${ay} ${x + hw},${y} ${x},${y}" fill="${shade}"/>${c}<polygon points="${ax},${ay} ${f(ax - w * .045)},${f(ay + h * .12)} ${f(ax + w * .045)},${f(ay + h * .12)}" fill="${C.lum}"/>`;
  }
  const pyrDefs = (id, a = C.sand, b = C.gold, s1 = '#1d3a36', s2 = '#0b1514') => `<linearGradient id="${id}L" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><linearGradient id="${id}S" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${s1}"/><stop offset="1" stop-color="${s2}"/></linearGradient>`;

  const sphinxPath = 'M0 0V-30Q8 -52 40 -58L150 -62Q176 -64 186 -76L192 -100L186 -114L200 -124Q222 -130 238 -120L245 -108L247 -96L242 -84L236 -72L242 -58L282 -24L284 0Z';
  const sphinx = (x, y, s, fill = '#0a1312', rim = C.lum) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="${sphinxPath}" fill="${fill}" stroke="${rim}" stroke-width="${1.4 / s}" stroke-opacity=".55"/><path d="M186 -114L170 -78L192 -72L200 -124Z" fill="#0f1c1a" stroke="${rim}" stroke-width="${1 / s}" stroke-opacity=".4"/><path d="M236 -84Q250 -64 240 -54" stroke="${rim}" stroke-opacity=".5" fill="none" stroke-width="${1.2 / s}"/></g>`;

  const obelisk = (x, y, w, h, fill = '#0c1716', rim = C.lum) => `<g><polygon points="${x - w / 2},${y} ${x - w * .34},${y - h} ${x + w * .34},${y - h} ${x + w / 2},${y}" fill="${fill}" stroke="${rim}" stroke-opacity=".5" stroke-width="1.2"/><polygon points="${x - w * .34},${y - h} ${x},${y - h - w * .7} ${x + w * .34},${y - h}" fill="${C.gold}" opacity=".9"/>${[.2, .4, .6, .8].map(t => gly(GN[Math.floor(t * 10) % GN.length], x - w * .14, y - h * t - 8, w * .5, rim, 'glw')).join('')}</g>`;

  const palm = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0C4 -30 -2 -60 6 -92" stroke="#2a1d0f" stroke-width="6" fill="none"/>${[-70, -40, -10, 25, 55, 85].map(a => `<path d="M6 -92Q${f(40 * Math.cos((a - 90) * Math.PI / 180) + 6)} ${f(-92 + 36 * Math.sin((a - 90) * Math.PI / 180) - 14)} ${f(66 * Math.cos((a - 90) * Math.PI / 180) + 6)} ${f(-92 + 56 * Math.sin((a - 90) * Math.PI / 180) + 24)}" stroke="#2e6a4a" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
  const lotus = (x, y, s = 1, col = C.ivory) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0C-18 -6 -24 -24 -18 -40C-8 -28 -2 -14 0 0ZM0 0C18 -6 24 -24 18 -40C8 -28 2 -14 0 0ZM0 0C-8 -14 -6 -42 0 -56C6 -42 8 -14 0 0Z" fill="${col}" stroke="${C.lum}" stroke-width="1"/><ellipse cx="0" cy="2" rx="26" ry="5" fill="#1e6b56" opacity=".8"/></g>`;

  /* ---------- Cielo estrellado ---------- */
  const stars = (n, w, h, maxY) => { let s = ''; for (let i = 0; i < n; i++) s += `<circle cx="${f(R(0, w))}" cy="${f(R(0, maxY))}" r="${f(R(.4, 1.5))}" fill="#fff" opacity="${f(R(.2, .8))}" class="tw" style="animation-delay:${f(R(0, 5))}s"/>`; return s; };

  /* ============================================================
     PORTADA: capas con profundidad (parallax + empuje de cámara)
     ============================================================ */
  function hero() {
    seed = 5;
    const L = [];
    // 0 cielo + estrellas + sol
    L.push({ d: .05, html: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
      <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05090a"/><stop offset=".35" stop-color="#0c1f1e"/><stop offset=".62" stop-color="#1a4d49"/><stop offset=".8" stop-color="#8a7a46"/><stop offset=".9" stop-color="${C.lum}"/><stop offset="1" stop-color="${C.sand}"/></linearGradient>
      <radialGradient id="hSun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff4c9"/><stop offset=".12" stop-color="${C.lum}"/><stop offset=".45" stop-color="${C.lum}" stop-opacity=".22"/><stop offset="1" stop-color="${C.lum}" stop-opacity="0"/></radialGradient></defs>
      <rect width="1600" height="900" fill="url(#hSky)"/>${stars(120, 1600, 900, 420)}
      <circle cx="800" cy="640" r="560" fill="url(#hSun)"/><circle cx="800" cy="640" r="62" fill="#fff4c9" opacity=".95"/></svg>` });
    // 1 rayos de luz volumétricos (CSS)
    L.push({ d: .08, html: '<div class="rays" aria-hidden="true"></div>' });
    // 2 dunas lejanas + pirámides
    L.push({ d: .16, html: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${pyrDefs('hp', '#f1d79a', '#b58a45', '#1b4a45', '#0b1b1a')}
      <linearGradient id="hHaze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.lum}" stop-opacity="0"/><stop offset="1" stop-color="${C.lum}" stop-opacity=".55"/></linearGradient>
      <linearGradient id="hDune" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b5b52"/><stop offset="1" stop-color="#0d1f1d"/></linearGradient></defs>
      <path d="M0 640C180 606 330 618 520 634S800 612 1010 628 1420 612 1600 632V900H0Z" fill="url(#hDune)"/>
      <g opacity=".9">${pyramid(1010, 640, 380, 220, 'hp')}${pyramid(1245, 640, 250, 150, 'hp')}${pyramid(1405, 640, 150, 92, 'hp')}${pyramid(520, 640, 200, 112, 'hp')}${pyramid(380, 640, 120, 66, 'hp')}</g>
      <rect y="470" width="1600" height="180" fill="url(#hHaze)"/></svg>` });
    // 3 Nilo, esfinge, obeliscos, falúa
    L.push({ d: .3, html: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
      <linearGradient id="hRiver" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0d58f"/><stop offset=".25" stop-color="#3f9b94"/><stop offset="1" stop-color="#0c3a3b"/></linearGradient>
      <linearGradient id="hRef" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2c0" stop-opacity=".95"/><stop offset="1" stop-color="${C.lum}" stop-opacity="0"/></linearGradient></defs>
      <path d="M0 694C260 668 560 706 860 690S1360 672 1600 694V790C1330 808 1020 782 760 800S240 792 0 800Z" fill="url(#hRiver)"/>
      <path d="M770 696H830L880 790H720Z" fill="url(#hRef)" opacity=".8"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${700 + i * 14} ${700 + i * 13}H${900 - i * 14}" stroke="#fff6d2" stroke-opacity=".5" stroke-width="2" class="shim" style="animation-delay:${i * .35}s"/>`).join('')}
      <g transform="translate(1180 724)"><path d="M-34 8L34 8L24 20H-24Z" fill="#0a1110"/><path d="M-2 6V-58L26 4Z" fill="#e7d3a0" opacity=".95"/><path d="M-4 6V-44L-26 4Z" fill="#cdb27a" opacity=".9"/></g>
      ${obelisk(170, 692, 46, 250)}${obelisk(1460, 686, 40, 210)}
      ${sphinx(300, 700, 1.05)}
      <path d="M0 690Q400 672 800 690T1600 690" stroke="${C.lum}" stroke-opacity=".35" fill="none"/></svg>` });
    // 4 diosa
    L.push({ d: .42, cls: 'goddess', html: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Diosa alada guardiana del archivo, con disco solar y alas desplegadas"><g transform="translate(800 676) scale(.66)">${goddess('gd')}</g></svg>` });
    // 5 templo frontal
    const colsL = [[-30, 150, 'a'], [240, 92, 'b']], colsR = [[1480, 150, 'c'], [1268, 92, 'd']];
    L.push({ d: .7, cls: 'front', html: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${['a', 'b', 'c', 'd'].map(colDefs).join('')}
      <linearGradient id="hLin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1a18"/><stop offset="1" stop-color="#050909"/></linearGradient>
      <linearGradient id="hSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2f1c"/><stop offset=".4" stop-color="#1b1a12"/><stop offset="1" stop-color="#07090a"/></linearGradient></defs>
      ${colsL.concat(colsR).map(c => column(c[0], c[1], -40, 900, c[2], true, c[0] > 700 ? C.lapis : C.turq)).join('')}
      <path d="M0 0H1600V92H0Z" fill="url(#hLin)"/><path d="M0 92H1600" stroke="${C.gold}" stroke-width="3"/><path d="M0 100H1600" stroke="${C.lum}" stroke-opacity=".3"/>
      ${Array.from({ length: 24 }, (_, i) => gly(GN[(i * 5) % GN.length], 22 + i * 66, 20, 50, i % 3 === 0 ? C.turq : C.lum, 'glw', `style="animation-delay:${f(i * .45 % 7)}s"`)).join('')}
      <g transform="translate(800 62)">${wingedSun('hw', 430)}</g>
      <path d="M0 790C260 748 520 770 800 756S1360 744 1600 774V900H0Z" fill="url(#hSand)"/><path d="M0 790C260 748 520 770 800 756S1360 744 1600 774" stroke="${C.lum}" stroke-opacity=".45" fill="none"/>
      <path d="M0 850C300 820 700 850 1000 830S1450 820 1600 846V900H0Z" fill="#050808"/></svg>` });
    return L;
  }

  /* ============================================================
     MAPA ILUSTRADO
     ============================================================ */
  const PYR = [
    { n: 1, x: 250, y: 770, s: 1.05, a: '#f1d79a', b: '#b58a45', g: 'ankh' },
    { n: 2, x: 440, y: 420, s: 1.0, a: '#8fb4d9', b: '#2b5b8a', g: 'reed' },
    { n: 3, x: 700, y: 560, s: 1.15, a: '#9fe0d2', b: '#277c78', g: 'djed' },
    { n: 4, x: 965, y: 810, s: 1.0, a: '#d9d09a', b: '#6f8f4a', g: 'scarab' },
    { n: 5, x: 1180, y: 345, s: 1.2, a: '#f0c26a', b: '#a8651f', g: 'eye' },
    { n: 6, x: 1340, y: 680, s: 1.05, a: '#a9c4e8', b: '#173c67', g: 'feather' },
    { n: 7, x: 1490, y: 290, s: .95, a: '#f5eac8', b: '#4aa395', g: 'water' }
  ];
  function dunes(n, x0, y0, x1, y1) { let s = ''; for (let i = 0; i < n; i++) { const x = R(x0, x1), y = R(y0, y1), w = R(24, 70); s += `<path d="M${f(x)} ${f(y)}q${f(w * .3)} ${f(-w * .28)} ${f(w * .6)} 0t${f(w * .5)} ${f(w * .04)}" stroke="#7a5a2a" stroke-opacity=".38" stroke-width="1.4" fill="none"/>`; } return s; }
  function mapSVG() {
    seed = 21;
    const river = 'M-40 722C170 700 250 560 470 556S740 690 960 660 1230 470 1450 470 1640 500 1660 500';
    const route = 'M250 770C300 650 330 520 440 410S600 550 700 548S860 720 965 800S1110 420 1180 334S1280 640 1340 670S1420 370 1490 280';
    return `<svg id="mapSvg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" role="group" aria-label="Mapa ilustrado del Antiguo Egipto con siete pirámides que dan acceso a las cámaras">
    <defs>
      <radialGradient id="mPap" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="#ecd9ab"/><stop offset=".6" stop-color="#d1ad70"/><stop offset="1" stop-color="#8a6431"/></radialGradient>
      <linearGradient id="mNile" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#173c67"/><stop offset=".5" stop-color="#277c78"/><stop offset="1" stop-color="#2f9a92"/></linearGradient>
      <filter id="mPaper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .02" numOctaves="4" seed="3"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .22  0 0 0 0 .08  0 0 0 .55 0"/></filter>
      <filter id="mEdge"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="3" seed="8" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="26"/></filter>
      <filter id="mGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7"/></filter>
      ${PYR.map(p => pyrDefs('mp' + p.n, p.a, p.b, '#1b3a36', '#07100f')).join('')}
      <clipPath id="mClip"><rect x="30" y="30" width="1540" height="840" rx="22"/></clipPath>
    </defs>
    <rect width="1600" height="900" fill="#0a1110"/>
    <g filter="url(#mEdge)"><rect x="30" y="30" width="1540" height="840" rx="22" fill="url(#mPap)"/></g>
    <g clip-path="url(#mClip)">
      <rect width="1600" height="900" filter="url(#mPaper)" opacity=".9" style="mix-blend-mode:multiply"/>
      <g class="ml" data-d="3">${dunes(150, 40, 60, 1560, 860)}</g>
      <!-- mar -->
      <path d="M1180 30H1570V260C1500 230 1450 250 1380 220S1250 190 1180 30Z" fill="#1d5878" opacity=".55"/>
      <g class="ml" data-d="6">
      <!-- Nilo -->
      <path d="${river}" stroke="#0b2f45" stroke-width="64" fill="none" stroke-linecap="round" opacity=".5" transform="translate(0 6)"/>
      <path d="${river}" stroke="url(#mNile)" stroke-width="56" fill="none" stroke-linecap="round"/>
      <path d="${river}" stroke="#bfe6df" stroke-opacity=".35" stroke-width="3" stroke-dasharray="2 14" fill="none" class="flow"/>
      <path d="M1450 470C1500 440 1540 390 1580 360M1450 470C1510 480 1560 470 1600 440M1450 470C1500 520 1550 540 1600 540" stroke="url(#mNile)" stroke-width="18" fill="none" stroke-linecap="round" opacity=".9"/>
      </g>
      ${palm(150, 300, .8)}${palm(178, 312, .6)}<ellipse cx="170" cy="318" rx="46" ry="14" fill="#2f9a92" opacity=".8"/>
      ${palm(870, 262, .7)}${palm(896, 272, .55)}<ellipse cx="886" cy="278" rx="40" ry="12" fill="#2f9a92" opacity=".8"/>
      ${palm(1150, 800, .6)}<ellipse cx="1160" cy="812" rx="34" ry="10" fill="#2f9a92" opacity=".8"/>
      <!-- Giza: meseta con esfinge -->
      <g opacity=".92"><g transform="translate(560 306)">${pyramid(0, 0, 70, 46, 'mp3')}${pyramid(60, 0, 46, 30, 'mp3')}</g>${sphinx(634, 322, .2, '#5b3d16', '#e4c77d')}</g>
      <!-- templos -->
      ${[[330, 250], [780, 840], [1040, 262], [1420, 770]].map(t => `<g transform="translate(${t[0]} ${t[1]})" opacity=".92"><path d="M-28 0V-26L-18 -34V0ZM28 0V-26L18 -34V0ZM-18 0V-18H18V0Z" fill="#6b4a1d" stroke="#3b280f" stroke-width="1.4"/><path d="M-10 0V-14M0 0V-14M10 0V-14" stroke="#3b280f" stroke-width="3"/><path d="M-30 0H30" stroke="#3b280f" stroke-width="2"/></g>`).join('')}
      <!-- ruta de exploración -->
      <path id="route" d="${route}" stroke="#3b280f" stroke-width="3.2" stroke-dasharray="3 13" stroke-linecap="round" fill="none" opacity=".85"/>
      <mask id="rmask" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="900"><path id="rdraw" d="${route}" stroke="#fff" stroke-width="16" fill="none" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></mask>
      <path id="routeLit" d="${route}" stroke="${C.lum}" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round" fill="none" class="routeLit" mask="url(#rmask)" style="filter:drop-shadow(0 0 5px ${C.lum})"/>
      <!-- entrada -->
      <g transform="translate(120 820)"><path d="M-22 0V-34H22V0ZM-12 0V-22H12V0Z" fill="#2a1d0f" stroke="${C.lum}" stroke-width="1.5"/><text y="22" text-anchor="middle" class="mapTxt" font-size="15">ENTRADA</text></g>
      <!-- secretos -->
      ${[[95, 130, 'a'], [1010, 540, 'b'], [1530, 790, 'c']].map(s => `<g class="secret" data-secret="${s[2]}" transform="translate(${s[0]} ${s[1]})" tabindex="0" role="button" aria-label="Lugar secreto ${s[2]}"><circle r="22" fill="${C.lum}" opacity=".18" class="pulse"/>${gly('eye', -9, -14, 28, '#3b280f')}</g>`).join('')}
      <!-- rosa de los vientos -->
      <g transform="translate(1440 790)" opacity=".9"><circle r="56" fill="none" stroke="#3b280f" stroke-width="1.6"/><circle r="44" fill="none" stroke="#3b280f" stroke-width="1" stroke-dasharray="3 5"/><path d="M0 -72L10 -10L72 0L10 10L0 72L-10 10L-72 0L-10 -10Z" fill="#3b280f" opacity=".85"/><path d="M0 -50L6 -6L50 0L6 6L0 50L-6 6L-50 0L-6 -6Z" fill="${C.lum}"/><text y="-80" text-anchor="middle" class="mapTxt" font-size="22">N</text></g>
      <!-- rótulos -->
      <text x="760" y="640" class="mapTxt it" font-size="19" transform="rotate(-18 760 640)">Río Nilo</text>
      <text x="1330" y="150" class="mapTxt it" font-size="17">Mar</text>
      <text x="620" y="352" class="mapTxt it" font-size="14">Meseta de Guiza</text>
      <text x="170" y="360" class="mapTxt it" font-size="14">Oasis</text>
      <text x="850" y="306" class="mapTxt it" font-size="14">Oasis</text>
      <text x="800" y="104" text-anchor="middle" class="mapTxt" font-size="26" letter-spacing="8">MAPA DE LAS CÁMARAS</text>
      <path d="M560 118H1040" stroke="#3b280f" stroke-opacity=".6"/>
    </g>
    <rect x="30" y="30" width="1540" height="840" rx="22" fill="none" stroke="${C.gold}" stroke-width="4"/>
    <rect x="44" y="44" width="1512" height="812" rx="16" fill="none" stroke="#3b280f" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="14 6"/>
    <!-- pirámides -->
    <g id="mapPyrs">${PYR.map(p => {
      const w = 140 * p.s, h = 118 * p.s;
      return `<g class="pyr" data-n="${p.n}" transform="translate(${p.x} ${p.y})" tabindex="0" role="button" aria-label="CÁMARA_${p.n}">
        <g class="pyr-in">
          <ellipse cx="0" cy="6" rx="${w * .62}" ry="9" fill="#000" opacity=".35"/>
          <ellipse class="pyr-halo" cx="0" cy="${-h * .45}" rx="${w * .8}" ry="${h * .8}" fill="${C.lum}" filter="url(#mGlow)" opacity="0"/>
          <g class="pyr-body">${pyramid(0, 0, w, h, 'mp' + p.n)}</g>
          <g class="pyr-sig" transform="translate(0 ${-h - 30})">${gly(p.g, -11, -22, 32, C.lum)}</g>
          <g class="pyr-badge" transform="translate(0 20)"><rect x="-22" y="-2" width="44" height="22" rx="11" fill="#0b1413" stroke="${C.lum}" stroke-width="1.6"/><text y="14" text-anchor="middle" font-size="13" fill="${C.lum}" font-family="Cinzel,Georgia,serif" font-weight="700">${String(p.n).padStart(2, '0')}</text></g>
          <circle class="pyr-ping" cx="0" cy="${-h * .3}" r="8" fill="none" stroke="${C.lum}" stroke-width="2"/>
        </g></g>`;
    }).join('')}</g>
    </svg>`;
  }

  /* ============================================================
     ESCENARIOS DE LAS CÁMARAS (cada una con identidad propia)
     ============================================================ */
  function sceneBase(id, c1, c2, c3, inner, w = 1600, h = 760) {
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
      <linearGradient id="${id}bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset=".6" stop-color="${c2}"/><stop offset="1" stop-color="${c3}"/></linearGradient>
      <radialGradient id="${id}gl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${C.lum}" stop-opacity=".7"/><stop offset="1" stop-color="${C.lum}" stop-opacity="0"/></radialGradient>
      ${['a', 'b', 'c', 'd'].map(k => colDefs(id + k)).join('')}${pyrDefs(id + 'p')}</defs>
      <rect width="${w}" height="${h}" fill="url(#${id}bg)"/>${inner}</svg>`;
  }
  const floor = (id, y, w = 1600, h = 760, col = '#06100f') => `<path d="M0 ${y}H${w}V${h}H0Z" fill="${col}"/><path d="M0 ${y}H${w}" stroke="${C.lum}" stroke-opacity=".5"/>`;
  const frieze = (y, w = 1600, col = C.lum, step = 64) => Array.from({ length: Math.ceil(w / step) }, (_, i) => gly(GN[(i * 7 + Math.floor(y)) % GN.length], 12 + i * step, y, 38, col, 'glw', `style="animation-delay:${f(i * .4 % 6)}s"`)).join('');

  const SCENES = {
    1: () => { seed = 31; return sceneBase('s1', '#06100f', '#17493f', '#d9b86a', `${stars(70, 1600, 760, 250)}<circle cx="800" cy="470" r="360" fill="url(#s1gl)"/>
      <g opacity=".9">${pyramid(620, 520, 280, 170, 's1p')}${pyramid(980, 520, 380, 230, 's1p')}${pyramid(1220, 520, 180, 110, 's1p')}</g>${floor('s1', 520)}
      ${[0, 1].map(i => column(i ? 1190 : 210, 130, 0, 760, 's1' + 'ab'[i], true, i ? C.lapis : C.turq)).join('')}
      <path d="M340 0H1190V84H340Z" fill="#0b1615"/><path d="M340 84H1190" stroke="${C.gold}" stroke-width="3"/>${frieze(22, 1600, C.lum, 62).replace(/x="(\d+(\.\d)?)"/g, (m, x) => +x > 340 && +x < 1170 ? m : 'x="-99"')}
      <g transform="translate(800 330)"><circle r="86" fill="${C.lum}" opacity=".25"/>${gly('ankh', -34, -80, 150, C.lum, 'glw')}</g>
      ${sphinx(150, 560, .7)}`); },
    2: () => { seed = 41; let wheel = ''; for (let r = 0; r < 3; r++) { const n = 12 + r * 6, rad = 90 + r * 62; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; wheel += `<g transform="translate(${f(Math.cos(a) * rad)} ${f(Math.sin(a) * rad)}) rotate(${f(a * 180 / Math.PI + 90)})">${gly(GN[(i + r) % GN.length], -9, -14, 28, r === 1 ? C.turq : C.lum)}</g>`; } wheel = wheel.replace(/(<g transform="translate)/, '$1'); }
      return sceneBase('s2', '#050b14', C.lapis, '#0a1a2c', `${stars(90, 1600, 760, 380)}
      ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `<rect x="${i * 170 - 10}" y="0" width="150" height="760" fill="${i % 2 ? '#0d2036' : '#0a1a2c'}"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(j => gly(GN[(i * 3 + j * 5) % GN.length], i * 170 + 52, 30 + j * 76, 46, j % 4 == 2 ? C.lum : '#4f7fae', 'glw', `style="opacity:.55;animation-delay:${f((i + j) % 7)}s"`)).join('')}`).join('')}
      <rect width="1600" height="760" fill="url(#s2bg)" opacity=".55"/>
      <g transform="translate(800 380)"><circle r="340" fill="url(#s2gl)" opacity=".5"/><g class="spin">${wheel}<circle r="82" fill="none" stroke="${C.lum}" stroke-width="2"/><circle r="152" fill="none" stroke="${C.gold}" stroke-width="1.5" stroke-dasharray="4 8"/><circle r="214" fill="none" stroke="${C.lum}" stroke-width="2"/><circle r="282" fill="none" stroke="${C.gold}" stroke-width="1.5"/></g>${gly('eye', -22, -32, 64, C.lum)}</g>`); },
    3: () => { seed = 51; let cols = ''; for (let i = 0; i < 7; i++) { const t = i / 6, x = 800 - 640 * (1 - t * .78), s = 1 - t * .62; }
      let rows = ''; [[0, 1], [1, -1]].forEach(([_, sg]) => {});
      const sizes = [[40, 150, 0], [230, 110, 80], [380, 84, 150], [490, 62, 205], [572, 46, 245]];
      sizes.forEach((c, i) => { rows += column(c[0], c[1], c[2], 760 - c[2] * .2, 's3' + 'abcd'[i % 4], true, C.turq); rows += column(1600 - c[0] - c[1], c[1], c[2], 760 - c[2] * .2, 's3' + 'abcd'[(i + 1) % 4], true, C.turq); });
      return sceneBase('s3', '#04100f', '#0d3a37', '#05161a', `<rect x="600" y="140" width="400" height="560" fill="${C.turq}" opacity=".16"/><circle cx="800" cy="420" r="300" fill="url(#s3gl)" opacity=".4"/>${rows}
      <path d="M600 640H1000V760H600Z" fill="#071918"/>${[0, 1, 2].map(i => `<rect x="${640 + i * 110}" y="${590 - i * 18}" width="70" height="150" rx="4" fill="#0b2a29" stroke="${C.turq}" stroke-width="2"/>${[0, 1, 2, 3].map(j => `<rect x="${648 + i * 110}" y="${600 - i * 18 + j * 34}" width="54" height="8" fill="${C.turq}" opacity=".8"/><circle cx="${690 + i * 110}" cy="${604 - i * 18 + j * 34}" r="2.5" fill="${C.lum}" class="tw" style="animation-delay:${j * .6}s"/>`).join('')}`).join('')}
      <path d="M0 760L600 640M1600 760L1000 640" stroke="${C.turq}" stroke-opacity=".3"/>`); },
    4: () => { seed = 61; return sceneBase('s4', '#050a08', '#10301f', '#070d0a', `<circle cx="800" cy="360" r="320" fill="url(#s4gl)" opacity=".4"/>
      ${[0, 1, 2].map(i => `<g transform="translate(${470 + i * 330} 0)">${column(-60, 120, 70, 640, 's4' + 'abc'[i], false, C.gold)}${gly(['scarab', 'eye', 'djed'][i], -26, 250, 90, C.lum, 'glw')}</g>`).join('')}
      <path d="M300 640H1300V760H300Z" fill="#0a120d"/><path d="M300 640H1300" stroke="${C.gold}" stroke-width="3"/>
      <g transform="translate(800 520)"><rect x="-86" y="-70" width="172" height="110" rx="10" fill="#2a1d0c" stroke="${C.lum}" stroke-width="3"/><path d="M-86 -30H86" stroke="${C.lum}" stroke-width="2"/><rect x="-14" y="-40" width="28" height="30" rx="4" fill="${C.lum}"/><circle cx="0" cy="-26" r="5" fill="#2a1d0c"/></g>
      <path d="M0 80H1600M0 650H1600" stroke="${C.gold}" stroke-opacity=".3"/>${frieze(20, 1600, C.gold, 70)}`); },
    5: () => { seed = 71; let grid = ''; for (let i = 0; i <= 16; i++) grid += `<path d="M${i * 100} 500V760M0 ${500 + i * 16.2}H1600" stroke="${C.lum}" stroke-opacity=".14"/>`;
      return sceneBase('s5', '#080b09', '#1f3a22', '#0a0f0b', `${stars(40, 1600, 760, 200)}<circle cx="1180" cy="240" r="260" fill="url(#s5gl)" opacity=".5"/>
      <path d="M0 500H1600V760H0Z" fill="#0b130d"/>${grid}
      <g transform="translate(240 430)"><rect x="0" y="-130" width="440" height="270" rx="10" fill="#071010" stroke="${C.lum}" stroke-width="3"/><rect x="0" y="-130" width="440" height="30" rx="10" fill="#10282a"/><circle cx="20" cy="-115" r="5" fill="#d4584c"/><circle cx="40" cy="-115" r="5" fill="${C.lum}"/><circle cx="60" cy="-115" r="5" fill="#59b37a"/>
        <text x="24" y="-60" font-family="monospace" font-size="22" fill="${C.lum}">$ docker ps</text><text x="24" y="-24" font-family="monospace" font-size="22" fill="#59b37a">▍</text></g>
      ${gly('scarab', 940, 180, 170, C.lum, 'glw')}${gly('eye', 1100, 140, 120, C.turq, 'glw')}${gly('ankh', 1240, 160, 130, C.lum, 'glw')}
      <g transform="translate(1120 560)"><path d="M-90 0L0 -110L90 0Z" fill="none" stroke="${C.lum}" stroke-opacity=".7" stroke-width="2" stroke-dasharray="6 6"/>${pyramid(0, 0, 150, 94, 's5p')}</g>
      <path d="M700 620l90-30M860 600l60 20" stroke="#8a6b3a" stroke-width="6"/><circle cx="720" cy="690" r="26" fill="#2a1d0c" stroke="${C.lum}"/><path d="M700 690h40M720 670v40" stroke="${C.lum}"/>
      ${frieze(18, 1600, C.turq, 80)}`); },
    6: () => { seed = 81; let chain = ''; for (let i = 0; i < 6; i++) { const x = 180 + i * 250; chain += `<g transform="translate(${x} 400)"><rect x="-84" y="-60" width="168" height="120" rx="60" fill="#0a1d33" stroke="${C.lum}" stroke-width="3"/><rect x="-70" y="-46" width="140" height="92" rx="46" fill="none" stroke="${C.gold}" stroke-opacity=".6"/>${gly(GN[(i * 3 + 1) % GN.length], -9, -20, 40, C.lum)}${gly(GN[(i * 3 + 4) % GN.length], 10, -20, 40, C.turq)}<text y="42" text-anchor="middle" font-family="monospace" font-size="13" fill="${C.lum}" opacity=".8">#${(i * 2654435 % 65536).toString(16).padStart(4, '0')}</text></g>${i < 5 ? `<path d="M${x + 84} 400H${x + 166}" stroke="${C.lum}" stroke-width="6" stroke-dasharray="14 8" class="flow"/>` : ''}`; }
      return sceneBase('s6', '#05080f', '#0c2342', '#050a14', `${stars(100, 1600, 760, 340)}<circle cx="800" cy="400" r="460" fill="url(#s6gl)" opacity=".28"/>${obelisk(110, 700, 54, 420, '#0a1a2e')}${obelisk(1490, 700, 54, 420, '#0a1a2e')}${chain}${floor('s6', 640, 1600, 760, '#050a14')}${frieze(690, 1600, C.turq, 64)}${gly('eye', 760, 90, 90, C.lum, 'glw')}`); },
    7: () => { seed = 91; let reeds = ''; for (let i = 0; i < 40; i++) { const x = R(0, 1600), h = R(120, 300); reeds += `<path d="M${f(x)} 760Q${f(x + R(-20, 20))} ${f(760 - h / 2)} ${f(x + R(-30, 30))} ${f(760 - h)}" stroke="#2e7a58" stroke-opacity=".8" stroke-width="3" fill="none"/>`; }
      return sceneBase('s7', '#1c2748', '#c9805a', '#f3d9a2', `${stars(50, 1600, 760, 180)}<circle cx="1050" cy="470" r="200" fill="#fff0c4" opacity=".85"/><circle cx="1050" cy="470" r="420" fill="url(#s7gl)" opacity=".6"/>
      <g opacity=".85">${pyramid(380, 520, 300, 180, 's7p')}${pyramid(620, 520, 160, 96, 's7p')}</g>
      <path d="M0 520H1600V760H0Z" fill="#1f6d6a"/><path d="M0 520H1600V560H0Z" fill="#79c9bf" opacity=".5"/>
      ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${700 + i * 36} ${540 + i * 22}H${1400 - i * 36}" stroke="#fff3cf" stroke-opacity=".6" stroke-width="2" class="shim" style="animation-delay:${i * .4}s"/>`).join('')}
      ${lotus(260, 640, 1.8)}${lotus(520, 690, 1.3, '#ffd9e6')}${lotus(1180, 650, 1.5)}${lotus(1380, 700, 1.1, '#ffd9e6')}${reeds}
      <g transform="translate(120 760)">${column(0, 100, -540, 0, 's7a', false, C.gold)}</g>${palm(1500, 720, 1.5)}${palm(1450, 740, 1.1)}
      <path d="M0 0H1600V40H0Z" fill="#0d1a2c" opacity=".7"/>`); }
  };

  /* ---------- Puertas para la transición ---------- */
  function doorPanel(side) {
    return `<svg viewBox="0 0 400 900" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="dp${side}" x1="${side ? 1 : 0}" x2="${side ? 0 : 1}"><stop offset="0" stop-color="#173B35"/><stop offset=".6" stop-color="#0c1c1a"/><stop offset="1" stop-color="#06100f"/></linearGradient></defs>
    <rect width="400" height="900" fill="url(#dp${side})"/><path d="M${side ? 8 : 392} 0V900" stroke="${C.lum}" stroke-width="5"/><rect x="${side ? 60 : 30}" y="80" width="310" height="740" fill="none" stroke="${C.gold}" stroke-opacity=".6" stroke-width="2"/>
    ${Array.from({ length: 7 }, (_, i) => gly(GN[(i * 3 + side) % GN.length], 150, 130 + i * 95, 62, C.lum, '', '')).join('')}</svg>`;
  }
  const mini = (n, col = C.lum) => `<svg viewBox="0 0 40 60" width="1em" height="1.5em" aria-hidden="true" style="color:${col}">${'<use href="#g-' + n + '"/>'}</svg>`;

  window.ART = { C, GN, sprite, hero, mapSVG, PYR, SCENES, doorPanel, goddess, wingedSun, gly, mini, pyramid, pyrDefs, sphinx };
})();
