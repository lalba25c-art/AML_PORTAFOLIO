/* ============================================================
   app.js · Lógica de la experiencia (sin dependencias)
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const A = window.ART, CFG = window.CONFIG, AS = window.ASSETS || { evidence: [], sadchuruzen: {} };
  const CH = window.CHAMBERS, CT = window.CONTENT, EV = AS.evidence;
  const safe = fn => { try { return fn(); } catch (e) { return undefined; } };
  const store = { get: k => safe(() => localStorage.getItem(k)), set: (k, v) => safe(() => localStorage.setItem(k, v)) };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const html = document.documentElement;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fine = matchMedia('(pointer:fine)').matches;
  const lite = (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2 || /[?&]lite\b/.test(location.search);
  let reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || store.get('asn-rm') === '1';
  const setRM = v => { reduced = v; html.classList.toggle('rm', v); store.set('asn-rm', v ? '1' : '0'); };
  setRM(reduced);

  /* ---------- Iconos ---------- */
  const I = {
    note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    spk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13"/></svg>',
    mute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4z"/><path d="M22 9l-6 6M16 9l6 6"/></svg>',
    full: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    motion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c3-6 6-6 9 0s6 6 9 0"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    min: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 12h12"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>'
  };
  const glyph = (n, c = '') => `<svg viewBox="0 0 40 60" aria-hidden="true" class="${c}"><use href="#g-${n}"/></svg>`;
  const pad2 = n => String(n).padStart(2, '0');

  /* ============================================================
     AUDIO (Web Audio: música egipcia sintetizada, viento y SFX)
     ============================================================ */
  const AUD = {
    ctx: null, on: false, muted: false, vol: .6, timer: null, next: 0, step: 0, note: 0, ext: null,
    init() {
      if (this.ctx) return true;
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
      try { this.ctx = new AC(); } catch (e) { return false; }
      const c = this.ctx;
      this.master = c.createGain(); this.master.gain.value = this.muted ? 0 : this.vol;
      const comp = c.createDynamicsCompressor(); this.master.connect(comp); comp.connect(c.destination);
      this.mus = c.createGain(); this.mus.gain.value = 0; this.mus.connect(this.master);
      this.windG = c.createGain(); this.windG.gain.value = 0; this.windG.connect(this.master);
      this.sfx = c.createGain(); this.sfx.gain.value = .9; this.sfx.connect(this.master);
      // reverb
      const len = c.sampleRate * 2.6, ir = c.createBuffer(2, len, c.sampleRate);
      for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
      this.rev = c.createConvolver(); this.rev.buffer = ir; this.revG = c.createGain(); this.revG.gain.value = .55; this.rev.connect(this.revG); this.revG.connect(this.master);
      // drone (re - la - re, escala frigia dominante)
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 360; lp.Q.value = .7;
      const lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = .06; lg.gain.value = 140; lfo.connect(lg); lg.connect(lp.frequency); lfo.start();
      const dg = c.createGain(); dg.gain.value = .11; lp.connect(dg); dg.connect(this.mus); dg.connect(this.rev);
      [[73.42, 'sawtooth', 0], [110, 'sawtooth', 6], [36.71, 'sine', 0], [146.83, 'triangle', -5]].forEach(([f, t, d]) => { const o = c.createOscillator(); o.type = t; o.frequency.value = f; o.detune.value = d; o.connect(lp); o.start(); });
      // viento
      const nb = c.createBuffer(1, c.sampleRate * 4, c.sampleRate), nd = nb.getChannelData(0); let b = 0;
      for (let i = 0; i < nd.length; i++) { b = (b + .02 * (Math.random() * 2 - 1)) / 1.02; nd[i] = b * 3.5; }
      this.noiseBuf = nb;
      const ws = c.createBufferSource(); ws.buffer = nb; ws.loop = true;
      const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 520; bp.Q.value = .9;
      const wl = c.createOscillator(), wlg = c.createGain(); wl.frequency.value = .11; wlg.gain.value = 260; wl.connect(wlg); wlg.connect(bp.frequency); wl.start();
      const wg2 = c.createGain(); wg2.gain.value = .5; ws.connect(bp); bp.connect(wg2); wg2.connect(this.windG); ws.start();
      return true;
    },
    ramp(g, v, t = .8) { const c = this.ctx; g.gain.cancelScheduledValues(c.currentTime); g.gain.setTargetAtTime(v, c.currentTime, t / 3); },
    async toggleMusic() {
      if (!this.init()) { toast('Tu navegador no permite audio.'); return false; }
      try { await this.ctx.resume(); } catch (e) { }
      this.on = !this.on;
      if (this.on) {
        this.tryExternal();
        this.ramp(this.mus, .9, 1.6); this.ramp(this.windG, .55, 2.4);
        this.next = this.ctx.currentTime + .2; this.step = 0; this.sched();
        this.timer = setInterval(() => this.sched(), 250);
      } else { this.ramp(this.mus, 0, .8); this.ramp(this.windG, 0, 1); clearInterval(this.timer); if (this.ext) this.ext.pause(); }
      return this.on;
    },
    tryExternal() {
      if (!CFG.musicUrl || this.ext) { if (this.ext) this.ext.play().catch(() => { }); return; }
      try {
        const a = new Audio(); a.crossOrigin = 'anonymous'; a.loop = true; a.src = CFG.musicUrl; this.ext = a;
        a.addEventListener('error', () => { this.ext = null; toast('No se pudo cargar la pista externa; uso la música sintetizada.'); });
        const s = this.ctx.createMediaElementSource(a); s.connect(this.mus); a.play().catch(() => { });
      } catch (e) { }
    },
    setMuted(m) { this.muted = m; if (this.ctx) this.ramp(this.master, m ? 0 : this.vol, .15); },
    setVol(v) { this.vol = v; if (this.ctx && !this.muted) this.ramp(this.master, v, .1); },
    // escala frigia dominante sobre re: D Eb F# G A Bb C
    freq(deg) { const sc = [0, 1, 4, 5, 7, 8, 10]; const o = Math.floor(deg / 7), i = ((deg % 7) + 7) % 7; return 146.83 * Math.pow(2, (sc[i] + 12 * o) / 12) * 2; },
    pluck(f, t, dur = 1.6, g = .16) {
      const c = this.ctx; const o = c.createOscillator(), o2 = c.createOscillator(), e = c.createGain(), fl = c.createBiquadFilter();
      o.type = 'triangle'; o2.type = 'sine'; o.frequency.value = f; o2.frequency.value = f * 2.005; fl.type = 'lowpass'; fl.frequency.setValueAtTime(3200, t); fl.frequency.exponentialRampToValueAtTime(700, t + dur);
      e.gain.setValueAtTime(0, t); e.gain.linearRampToValueAtTime(g, t + .006); e.gain.exponentialRampToValueAtTime(.0001, t + dur);
      const e2 = c.createGain(); e2.gain.value = .35; o.connect(fl); o2.connect(e2); e2.connect(fl); fl.connect(e); e.connect(this.mus); e.connect(this.rev);
      o.start(t); o2.start(t); o.stop(t + dur + .1); o2.stop(t + dur + .1);
    },
    drum(t, g = .22, pitch = 120) {
      const c = this.ctx, o = c.createOscillator(), e = c.createGain();
      o.frequency.setValueAtTime(pitch, t); o.frequency.exponentialRampToValueAtTime(pitch * .42, t + .28); e.gain.setValueAtTime(g, t); e.gain.exponentialRampToValueAtTime(.0001, t + .38);
      o.connect(e); e.connect(this.mus); e.connect(this.rev); o.start(t); o.stop(t + .45);
      const n = c.createBufferSource(); n.buffer = this.noiseBuf; const nf = c.createBiquadFilter(); nf.type = 'lowpass'; nf.frequency.value = 900; const ne = c.createGain(); ne.gain.setValueAtTime(g * .5, t); ne.gain.exponentialRampToValueAtTime(.0001, t + .07);
      n.connect(nf); nf.connect(ne); ne.connect(this.mus); n.start(t, Math.random() * 2); n.stop(t + .1);
    },
    sched() {
      if (!this.on) return; const c = this.ctx, beat = .86;
      while (this.next < c.currentTime + 1.2) {
        const s = this.step % 16;
        if (s === 0 || s === 8) this.drum(this.next, .26, 112);
        if (s === 6 || s === 14) this.drum(this.next, .12, 160);
        if (s % 2 === 0 && Math.random() < .72) {
          const r = Math.random(); this.note = clamp(this.note + (r < .35 ? -1 : r < .7 ? 1 : r < .85 ? -2 : 2), -1, 8);
          const f = this.freq(this.note); this.pluck(f, this.next, 1.4 + Math.random(), .14);
          if (Math.random() < .22) this.pluck(this.freq(this.note + 1), this.next + beat * .25, .7, .08);
        }
        this.next += beat / 2; this.step++;
      }
    },
    /* efectos de interacción */
    can() { return this.ctx && !this.muted && this.ctx.state === 'running'; },
    tick() { if (!this.can()) return; const c = this.ctx, t = c.currentTime, o = c.createOscillator(), e = c.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(1180, t); o.frequency.exponentialRampToValueAtTime(1560, t + .09); e.gain.setValueAtTime(.0001, t); e.gain.linearRampToValueAtTime(.05, t + .01); e.gain.exponentialRampToValueAtTime(.0001, t + .22); o.connect(e); e.connect(this.sfx); e.connect(this.rev); o.start(t); o.stop(t + .25); },
    click() { if (!this.can()) return; const t = this.ctx.currentTime; this.sfxNote(523.25, t, .5, .09); this.sfxNote(783.99, t + .05, .6, .06); },
    chime() { if (!this.can()) return; const t = this.ctx.currentTime; [659.25, 987.77, 1318.5].forEach((f, i) => this.sfxNote(f, t + i * .09, .9, .06)); },
    sfxNote(f, t, d, g) { const c = this.ctx, o = c.createOscillator(), e = c.createGain(); o.type = 'triangle'; o.frequency.value = f; e.gain.setValueAtTime(g, t); e.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(e); e.connect(this.sfx); e.connect(this.rev); o.start(t); o.stop(t + d + .05); },
    open() {
      if (!this.can()) return; const c = this.ctx, t = c.currentTime, n = c.createBufferSource(); n.buffer = this.noiseBuf; const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(420, t); f.frequency.exponentialRampToValueAtTime(70, t + 1.2); const e = c.createGain(); e.gain.setValueAtTime(.0001, t); e.gain.linearRampToValueAtTime(.55, t + .12); e.gain.exponentialRampToValueAtTime(.0001, t + 1.3);
      n.connect(f); f.connect(e); e.connect(this.sfx); n.start(t, Math.random() * 2); n.stop(t + 1.4);
      const o = c.createOscillator(), og = c.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(70, t); o.frequency.exponentialRampToValueAtTime(38, t + 1); og.gain.setValueAtTime(.3, t); og.gain.exponentialRampToValueAtTime(.0001, t + 1.1); o.connect(og); og.connect(this.sfx); o.start(t); o.stop(t + 1.2);
      [293.66, 440, 587.33, 880].forEach((fr, i) => this.sfxNote(fr, t + .55 + i * .11, 1.6, .07));
    }
  };

  /* ---------- Toast ---------- */
  let tt; function toast(msg, ms = 4200) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), ms); }

  /* ============================================================
     CONSTRUCCIÓN DE LA PÁGINA
     ============================================================ */
  document.body.insertAdjacentHTML('afterbegin', A.sprite());
  document.title = CFG.title + ' · ' + CFG.kicker;
  if (!CFG.showSlotHints) document.body.classList.add('nohints');

  /* Herramientas (audio, movimiento, pantalla completa) */
  const tools = $('#tools');
  tools.innerHTML = `
    <button class="ibtn" id="bMusic" aria-pressed="false" aria-label="Activar música ambiental" title="Música ambiental">${I.note}</button>
    <input class="vol" id="vol" type="range" min="0" max="100" value="60" aria-label="Volumen" title="Volumen">
    <button class="ibtn" id="bMute" aria-pressed="false" aria-label="Silenciar todos los sonidos" title="Silenciar todo">${I.spk}</button>
    <button class="ibtn" id="bRM" aria-pressed="${reduced}" aria-label="Reducir movimiento" title="Reducir movimiento">${I.motion}</button>
    <button class="ibtn" id="bFull" aria-label="Pantalla completa" title="Pantalla completa / abrir en pestaña">${I.full}</button>`;
  const bMusic = $('#bMusic'), bMute = $('#bMute');
  bMusic.onclick = async () => {
    const on = await AUD.toggleMusic(); bMusic.setAttribute('aria-pressed', on); bMusic.innerHTML = on ? I.pause : I.note;
    bMusic.setAttribute('aria-label', on ? 'Pausar música ambiental' : 'Activar música ambiental'); AUD.click();
    if (on && AUD.muted) toast('El sonido está silenciado: pulsa el altavoz para oírlo.');
  };
  bMute.onclick = () => { const m = !AUD.muted; AUD.setMuted(m); bMute.setAttribute('aria-pressed', m); bMute.innerHTML = m ? I.mute : I.spk; bMute.setAttribute('aria-label', m ? 'Reactivar el sonido' : 'Silenciar todos los sonidos'); $('#vol').disabled = m; };
  $('#vol').oninput = e => AUD.setVol(e.target.value / 100);
  $('#bRM').onclick = e => { setRM(!reduced); e.currentTarget.setAttribute('aria-pressed', reduced); toast(reduced ? 'Movimiento reducido activado.' : 'Movimiento completo activado.'); };
  $('#bFull').onclick = () => {
    const el = html, req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    if (req) { Promise.resolve(safe(() => req.call(el))).catch(() => { window.open(location.href.split('#')[0], '_blank', 'noopener'); }); }
    else window.open(location.href.split('#')[0], '_blank', 'noopener');
  };
  $('#brandIco').innerHTML = glyph('ankh');

  /* ---------- Portada ---------- */
  const heroEl = $('#heroLayers');
  A.hero().forEach(l => { const d = document.createElement('div'); d.className = 'layer ' + (l.cls || ''); d.dataset.d = l.d; d.innerHTML = l.html; heroEl.appendChild(d); });
  if (CFG.art.heroBackground) $('#heroBg').style.backgroundImage = `url("${CFG.art.heroBackground}")`;
  $('#kicker').textContent = CFG.kicker; $('#sub').textContent = CFG.subtitle;
  const words = CFG.title.split(' ');
  $('#title').innerHTML = words.map((w, i) => `<span class="w"><span>${i >= 1 && i < words.length - 1 && /sagrado|archivo/i.test(w) ? '<em>' + esc(w) + '</em>' : esc(w)}</span></span>`).join(' ');
  $('#title').setAttribute('aria-label', CFG.title);
  $('#heroMeta').innerHTML = `Explorador<b>${esc(CFG.author)}</b>`;

  function introPlay() {
    const veil = $('#introVeil'); veil.classList.add('gone');
    const D = reduced ? 1 : 1;
    $$('#title .w>span').forEach((s, i) => s.animate([{ transform: 'translateY(110%)' }, { transform: 'none' }], { duration: reduced ? 1 : 1300, delay: reduced ? 0 : 500 + i * 160, easing: 'cubic-bezier(.22,.8,.2,1)', fill: 'forwards' }));
    [['#kicker', 300], ['#sub', 1500], ['#cta', 1900], ['#heroMeta', 2200], ['#scrollHint', 2400]].forEach(([s, d]) => $(s).animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: reduced ? 1 : 1100, delay: reduced ? 0 : d, easing: 'ease-out', fill: 'forwards' }));
    setTimeout(() => $('#guide').classList.add('ready'), reduced ? 0 : 2600);
    setTimeout(() => guideSay('Soy ' + CFG.guideName + '. ¿Te acompaño por el archivo?'), reduced ? 800 : 5200);
  }

  /* ---------- Inscripción (sección académica previa al mapa) ---------- */
  const INTRO = [
    ['I', 'Qué es la asignatura', 'asignatura', 'sun', 'Espacio preparado para explicar qué es Seguridad Informática.'],
    ['II', 'En qué consiste la formación', 'formacion', 'djed', 'Espacio preparado para describir la formación del ciclo.'],
    ['III', 'Lo trabajado en la primera evaluación', 'evaluacion', 'scarab', 'Espacio preparado para el resumen académico de la primera evaluación.'],
    ['IV', 'Qué representa el portafolio', 'portafolio', 'eye', 'Espacio preparado para explicar el sentido de este portafolio.'],
    ['V', 'Qué encontrarás en la exploración', 'exploracion', 'ankh', 'Espacio preparado para presentar el recorrido.']
  ];
  const REAL = ['Tema 1 · Conceptos', 'Tema 2 · Criptografía', 'Tema 3 · Seguridad pasiva: equipos', 'Tema 4 · Seguridad pasiva: almacenamiento', 'Docker', 'CyberChef', 'John the Ripper', 'CPD Arena', 'OpenMediaVault', 'AulaCoin'];
  const slot = (tag, hint, lines = true) => `<div class="slot" data-slot><div class="tag">${glyph('ankh')}<span>${esc(tag)}</span></div><p>${esc(hint)}</p>${lines ? '<div class="lines" aria-hidden="true"><i></i><i></i><i></i></div>' : ''}</div>`;
  $('#stelae').innerHTML = INTRO.map(([n, t, k, g, h], i) => {
    const txt = CT.intro[k];
    const extra = k === 'evaluacion' ? `<div class="index-real" aria-label="Documentos y prácticas incorporados al archivo">${REAL.map(r => `<span>${esc(r)}</span>`).join('')}</div>`
      : k === 'exploracion' ? `<div class="index-real">${CH.map(c => `<span>${pad2(c.n)} · ${esc(c.title)}</span>`).join('')}</div>` : '';
    return `<article class="stele reveal"><div class="num" aria-hidden="true">${n}</div><div><h3>${glyph(g)}<span>${esc(t)}</span></h3><div class="body">${txt ? `<div class="rich">${txt}</div>` : slot('Inscripción pendiente', h)}${extra}</div></div></article>`;
  }).join('');

  $('#inscFrieze').innerHTML = '<svg viewBox="0 0 1600 78" preserveAspectRatio="xMidYMid slice">' + Array.from({ length: 26 }, (_, i) => A.gly(A.GN[(i * 3) % A.GN.length], 14 + i * 62, 12, 54, i % 4 === 1 ? '#277C78' : '#E4C77D', 'glw', `style="animation-delay:${(i * .5 % 6).toFixed(1)}s"`)).join('') + '</svg>';
  /* ---------- Mapa ---------- */
  const mapHost = $('#mapHost'); mapHost.innerHTML = A.mapSVG().replace(/CÁMARA_(\d)/g, (m, n) => `Cámara ${pad2(n)}: ${CH[n - 1].title}`);
  $('#legend').innerHTML = CH.map(c => `<a href="#camara-${c.n}" data-n="${c.n}"><b>${pad2(c.n)}</b>${esc(c.title.length > 34 ? c.over : c.title)}</a>`).join('');
  const tip = $('#maptip'), rel = $('#mapRel');
  const SECRETS = { a: 'Lugar secreto · Todo archivo valioso guarda copias de seguridad.', b: 'Lugar secreto · La clave privada es tu dinero: no se comparte.', c: 'Lugar secreto · Pregunta «ayuda» a ' + CFG.guideName + '.' };
  $$('.secret').forEach(s => { const go = () => { toast(SECRETS[s.dataset.secret]); AUD.chime(); }; s.addEventListener('click', go); s.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } }); });
  function showTip(p) {
    const n = +p.dataset.n, c = CH[n - 1], r = p.getBoundingClientRect(), rr = rel.getBoundingClientRect();
    tip.innerHTML = `<small>Cámara ${pad2(n)} · ${esc(c.over)}</small><b>${esc(c.epi)}</b><em>${esc(c.title)}</em><em style="color:var(--lum)">Pulsa para explorar →</em>`;
    tip.style.left = clamp(r.left + r.width / 2 - rr.left, 140, rr.width - 140) + 'px'; tip.style.top = (r.top - rr.top + 14) + 'px'; tip.classList.add('show'); AUD.tick();
  }
  const hideTip = () => tip.classList.remove('show');
  $$('.pyr').forEach(p => {
    const n = +p.dataset.n;
    p.addEventListener('pointerenter', () => showTip(p)); p.addEventListener('pointerleave', hideTip);
    p.addEventListener('focus', () => showTip(p)); p.addEventListener('blur', hideTip);
    p.addEventListener('click', e => { const r = p.getBoundingClientRect(); openChamber(n, { x: r.left + r.width / 2, y: r.top + r.height / 2, el: p }); });
    p.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); p.dispatchEvent(new MouseEvent('click')); } });
  });
  $$('#legend a').forEach(a => {
    const n = +a.dataset.n, p = $(`.pyr[data-n="${n}"]`);
    a.addEventListener('mouseenter', () => p.classList.add('hot')); a.addEventListener('mouseleave', () => p.classList.remove('hot'));
    a.addEventListener('focus', () => p.classList.add('hot')); a.addEventListener('blur', () => p.classList.remove('hot'));
    a.addEventListener('click', e => { e.preventDefault(); openChamber(n, { x: innerWidth / 2, y: innerHeight / 2, el: a }); });
  });
  const stage = $('#mapStage'), tilt = $('#mapTilt'); let mm = { x: 0, y: 0 };
  stage.addEventListener('pointermove', e => { if (reduced || !fine) return; const r = stage.getBoundingClientRect(); mm.x = (e.clientX - r.left) / r.width - .5; mm.y = (e.clientY - r.top) / r.height - .5; tilt.style.transform = `rotateX(${(-mm.y * 3.4).toFixed(2)}deg) rotateY(${(mm.x * 4.6).toFixed(2)}deg)`; $$('.ml').forEach(g => { const d = +g.dataset.d; g.style.transform = `translate(${mm.x * d * -2}px,${mm.y * d * -2}px)`; }); });
  stage.addEventListener('pointerleave', () => { tilt.style.transform = ''; $$('.ml').forEach(g => g.style.transform = ''); });
  // trazado de la ruta
  const routeMask = $('#routeLit'); if (routeMask) { routeMask.style.transition = 'none'; }

  /* ============================================================
     SCROLL: progreso, parallax, cámara que avanza
     ============================================================ */
  const hero = $('#portada'), layers = $$('#heroLayers .layer'), heroUI = $('#heroUI'), bar = $('#bar'), prog = $('#progress');
  let mx = 0, my = 0, tx = 0, ty = 0, hp = 0, ticking = false, heroVisible = true;
  const secs = $$('[data-sec]'), dots = $$('.dots a');
  document.addEventListener('pointermove', e => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; }, { passive: true });
  function frame() {
    mx += (tx - mx) * .06; my += (ty - my) * .06;
    const range = hero.offsetHeight - innerHeight; hp = clamp(scrollY / Math.max(1, range), 0, 1);
    if (heroVisible && !reduced) {
      layers.forEach(l => { const d = +l.dataset.d; l.style.transform = `translate3d(${(-mx * d * 60).toFixed(1)}px,${(-my * d * 34 - hp * d * 80).toFixed(1)}px,0) scale(${(1 + hp * d * .7).toFixed(4)})`; l.style.transformOrigin = '50% 74%'; });
      heroUI.style.opacity = clamp(1 - hp * 1.8, 0, 1); heroUI.style.transform = `translateY(${hp * -40}px)`;
      $('#heroFade').style.opacity = clamp((hp - .55) * 2.2, 0, 1);
    } else if (reduced) { heroUI.style.opacity = 1; heroUI.style.transform = ''; layers.forEach(l => l.style.transform = ''); }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  function onScroll() {
    const h = document.documentElement.scrollHeight - innerHeight; prog.style.transform = `scaleX(${clamp(scrollY / Math.max(1, h), 0, 1)})`;
    bar.classList.toggle('solid', scrollY > 40);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  new IntersectionObserver(es => es.forEach(e => heroVisible = e.isIntersecting), { threshold: 0 }).observe(hero);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal,.carve').forEach(el => io.observe(el));
  const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { dots.forEach(d => d.classList.toggle('on', d.getAttribute('href') === '#' + e.target.id)); } }), { threshold: .35 });
  secs.forEach(s => so.observe(s));
  // ruta iluminada al ver el mapa
  new IntersectionObserver((es, ob) => es.forEach(e => { if (e.isIntersecting) { const m = $('#rdraw'); if (m) { m.style.transition = reduced ? 'none' : 'stroke-dashoffset 5s ease-in-out'; m.style.strokeDashoffset = 0; } ob.disconnect(); } }), { threshold: .3 }).observe(stage);
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const h = a.getAttribute('href'); if (h.length > 1 && !h.startsWith('#camara-') && $(h)) { e.preventDefault(); $(h).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); } }));

  /* ---------- Partículas de arena y polvo dorado ---------- */
  (function sand() {
    const cv = $('#sand'), ctx = cv.getContext('2d'); if (!ctx) return;
    let W, H, P = [], dpr = Math.min(devicePixelRatio || 1, 1.5);
    const N = lite ? 36 : (innerWidth < 700 ? 55 : 120);
    function size() { W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); addEventListener('resize', size);
    for (let i = 0; i < N; i++) P.push({ x: Math.random() * 2000, y: Math.random() * 1200, z: Math.random(), g: Math.random() < .22, p: Math.random() * 6 });
    let t = 0;
    (function draw() {
      requestAnimationFrame(draw);
      if (!heroVisible || document.hidden) return; t += .016;
      ctx.clearRect(0, 0, W, H);
      for (const p of P) {
        if (!reduced) { p.x += (.5 + p.z * 2.6) * (1 + Math.sin(t * .6) * .25); p.y += Math.sin(t + p.p) * .3 - .04; }
        if (p.x > W + 10) { p.x = -10; p.y = Math.random() * H; } if (p.y > H) p.y = 0; if (p.y < 0) p.y = H;
        const s = .6 + p.z * 2.1;
        if (p.g) { ctx.fillStyle = `rgba(255,236,170,${.25 + .45 * Math.abs(Math.sin(t * 1.3 + p.p))})`; ctx.shadowColor = '#e4c77d'; ctx.shadowBlur = 8; ctx.beginPath(); ctx.arc(p.x % W, p.y, s * .9, 0, 6.3); ctx.fill(); ctx.shadowBlur = 0; }
        else { ctx.fillStyle = `rgba(231,205,150,${.15 + p.z * .35})`; ctx.fillRect(p.x % W, p.y, s * 1.6, s * .8); }
      }
    })();
  })();

  /* ---------- Cursor reactivo y botones magnéticos ---------- */
  if (fine) {
    const c = $('#cur'), d = $('#curd'); let cx = 0, cy = 0, px = 0, py = 0;
    document.addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; c.classList.add('on'); d.classList.add('on'); d.style.transform = `translate(${px}px,${py}px)`; }, { passive: true });
    (function loop() { cx += (px - cx) * .16; cy += (py - cy) * .16; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener('pointerover', e => { c.classList.toggle('big', !!e.target.closest('a,button,.pyr,.frame,.secret,input')); });
    document.addEventListener('pointerleave', () => { c.classList.remove('on'); d.classList.remove('on'); });
    document.addEventListener('pointermove', e => { if (reduced) return; $$('.mag').forEach(m => { const r = m.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2), dist = Math.hypot(dx, dy); m.style.transform = dist < 110 ? `translate(${dx * .22}px,${dy * .28}px)` : ''; }); }, { passive: true });
  }
  document.addEventListener('click', e => { const t = e.target.closest('button,a,.pyr'); if (t && !t.closest('#chat') && !t.classList.contains('pyr')) AUD.click(); }, true);

  /* ============================================================
     CÁMARAS
     ============================================================ */
  const cam = $('#cam'), veil = $('#veil'); let current = 0, busy = false, lastFocus = null;
  veil.innerHTML = `<div class="d dl">${A.doorPanel(0)}</div><div class="d dr">${A.doorPanel(1)}</div><div class="flash"></div>`;
  const wait = ms => new Promise(r => setTimeout(r, reduced ? 0 : ms));

  const blk = (i, key, inner) => { const [t] = window.BLOCKS[key]; return `<section class="blk reveal" aria-labelledby="b-${i}"><div class="bl"><div class="k">${pad2(i)} · ${key}</div><h2 id="b-${i}">${esc(t)}</h2>${glyph(A.GN[i * 3 % A.GN.length])}</div><div class="bc">${inner}</div></section>`; };
  const slotFor = key => { const [t, h] = window.BLOCKS[key]; return slot('Espacio preparado · ' + t, h); };
  const termSlot = (h = 'Espacio preparado para los comandos, su explicación y la salida obtenida.') => `<div class="term" data-slot><div class="term-h"><i></i><i></i><i></i><span>terminal · espacio preparado</span></div><pre><span class="p">$ </span><span class="cursor-b"></span></pre><div class="ex">${esc(h)}</div></div>`;
  const termFill = (c, i) => `<div class="term"><div class="term-h"><i></i><i></i><i></i><span>${esc(c.titulo || 'terminal')}</span><button data-copy="${esc(c.comando || '')}">Copiar</button></div><pre><span class="p">$ </span>${esc(c.comando || '')}${c.salida ? '\n<span class="o">' + esc(c.salida) + '</span>' : ''}</pre>${c.explicacion ? `<div class="ex">${c.explicacion}</div>` : ''}</div>`;
  const frames = (items, gid) => `<div class="gal" data-gid="${gid}">${items.map((e, i) => `<button class="frame" data-i="${i}" aria-label="Ampliar: ${esc(e.cap)}"><span class="in"><img src="${e.src}" alt="${esc(e.cap)}" loading="lazy" decoding="async"></span><span class="zoom">${I.zoom}</span><span class="cap">${esc(e.cap)}</span></button>`).join('')}</div>`;
  const galSlot = () => `<div class="gal" data-slot>${[0, 1, 2].map(() => `<div class="frame" style="cursor:default"><span class="in" style="display:grid;place-items:center;color:#b58a45;aspect-ratio:16/10;background:repeating-linear-gradient(45deg,#0a1211 0 14px,#0d1a18 14px 28px)">${glyph('eye')}</span><span class="cap">Espacio preparado para una captura real</span></div>`).join('')}</div>`;
  const GAL = {}; // galerías activas para el lightbox
  const compare = (a, b, la, lb) => `<div class="cmp" data-cmp><div class="pane"><img src="${b.src}" alt="${esc(b.cap)}"><div class="top"><img src="${a.src}" alt="${esc(a.cap)}" style="position:absolute"></div><span class="tagl a">${esc(la)}</span><span class="tagl b">${esc(lb)}</span><div class="hnd"></div><input type="range" min="0" max="100" value="50" aria-label="Comparar: ${esc(la)} frente a ${esc(lb)}"></div></div><div class="cmp-cap"><span>◀ ${esc(a.cap)}</span><span>${esc(b.cap)} ▶</span></div>`;
  const evOf = (lab, cam) => EV.filter(e => (!lab || e.lab === lab) && (!cam || e.cam === cam));
  let gidc = 0;
  const gallery = items => { const id = 'g' + (++gidc); GAL[id] = items; return frames(items, id); };

  function renderLab(L, i) {
    const d = CT.c5[L.id] || {}, items = evOf(L.id).concat((d.capturas || []).map(c => ({ src: c.src, cap: c.cap || '' })));
    const find = id => EV.find(e => e.id === id);
    let extra = '';
    if (L.id === 'john' && find('jr-nohash') && find('jr-crypt')) extra = `<div><div class="sub-k">Antes y después · el formato importa</div>${compare(find('jr-nohash'), find('jr-crypt'), 'Sin --format', 'Con --format=crypt')}</div>`;
    const cmds = d.comandos && d.comandos.length ? d.comandos.map(termFill).join('') : termSlot('Espacio preparado: comandos de esta práctica, qué hace cada uno y la salida.');
    return `<article class="lab reveal" id="lab-${L.id}"><header class="lab-h"><span class="id">LABORATORIO ${pad2(i + 1)}</span><h2>${esc(L.title)}</h2><p>${esc(L.src)}</p></header><div class="lab-g">
      <div><div class="sub-k">Descripción de la práctica</div>${d.explicacion ? `<div class="rich">${d.explicacion}</div>` : slot('Espacio preparado · explicación completa', 'Objetivo, desarrollo paso a paso y conclusiones de esta práctica.')}</div>
      <div><div class="sub-k">Comandos</div>${cmds}</div>
      ${extra}
      <div><div class="sub-k">Evidencias · ejecuciones reales (${items.length})</div>${items.length ? gallery(items) : galSlot()}</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px">${['resultados', 'problemas', 'soluciones'].map(k => d[k] ? `<div><div class="sub-k">${esc(window.BLOCKS[k][0])}</div><div class="rich">${d[k]}</div></div>` : `<div>${slot(window.BLOCKS[k][0], window.BLOCKS[k][1], false)}</div>`).join('')}</div>
    </div></article>`;
  }
  function renderChron() {
    const first = window.CHRONICLES[0][0];
    return `<div class="chron reveal"><div class="shelf" role="tablist" aria-label="Apartados de las crónicas">${window.CHRONICLES.map(([k, t, g], i) => `<button role="tab" id="t-${k}" aria-selected="${i === 0}" aria-controls="p-${k}" data-k="${k}">${glyph(g)}<span>${esc(t)}</span></button>`).join('')}</div>
      <div>${window.CHRONICLES.map(([k, t], i) => `<div class="scroll-p" role="tabpanel" id="p-${k}" aria-labelledby="t-${k}" ${i ? 'hidden' : ''}><h3>${esc(t)}</h3>${CT.c7[k] ? `<div class="rich">${CT.c7[k]}</div>` : slot('Crónica pendiente', 'Espacio preparado para la reflexión personal completa de este apartado. Los textos definitivos se incorporarán más adelante.')}</div>`).join('')}</div></div>`;
  }
  function renderChamber(n) {
    const c = CH[n - 1], d = CT[c.id] || {};
    cam.style.setProperty('--accent', c.hue);
    $('#camScene').innerHTML = A.SCENES[n]();
    $('#camTitle').innerHTML = `<div class="o">Cámara ${pad2(n)} · ${esc(c.over)}</div><h1 id="camT" tabindex="-1">${esc(c.title)}</h1><div class="epi">${esc(c.epi)}</div><div class="num" aria-hidden="true">${pad2(n)}</div>`;
    let body = `<p class="lead reveal">${esc(c.lead)}</p>`;
    if (c.labs) body += window.LABS.map(renderLab).join('');
    else if (c.chronicles) body += `<div style="margin-top:46px">${renderChron()}</div>`;
    else body += c.blocks.map((k, i) => {
      let inner;
      if (k === 'capturas') { const items = evOf(null, n).concat((d.capturas || []).map(x => ({ src: x.src, cap: x.cap || '' }))); inner = items.length ? gallery(items) : galSlot(); if (n === 6 && items.length) inner += `<p class="mosaic-note">Capturas de CyberChef del examen práctico (Vigenère, Frequency distribution y ROT13). Las evidencias de AulaCoin se añadirán aquí.</p>`; }
      else if (k === 'comandos') inner = d.comandos && d.comandos.length ? d.comandos.map(termFill).join('') : termSlot();
      else inner = d[k] ? `<div class="rich">${d[k]}</div>` : slotFor(k);
      return blk(i + 1, k, inner);
    }).join('');
    $('#camBody').innerHTML = body;
    $('#camNav').innerHTML = CH.map(x => `<button data-n="${x.n}" aria-label="Cámara ${pad2(x.n)}: ${esc(x.title)}" title="${esc(x.title)}" ${x.n === n ? 'aria-current="true"' : ''}>${pad2(x.n)}</button>`).join('');
    $('#camPrev').style.visibility = n > 1 ? 'visible' : 'hidden'; $('#camNext').style.visibility = n < CH.length ? 'visible' : 'hidden';
    $('#camPrev span').textContent = n > 1 ? `Cámara ${pad2(n - 1)}` : ''; $('#camNext span').textContent = n < CH.length ? `Cámara ${pad2(n + 1)}` : '';
    $$('.reveal', cam).forEach(el => ro.observe(el));
    $$('[data-cmp]', cam).forEach(el => { const inp = $('input', el); inp.oninput = () => el.style.setProperty('--p', inp.value + '%'); });
    $$('.shelf button', cam).forEach(b => b.onclick = () => { $$('.shelf button', cam).forEach(x => x.setAttribute('aria-selected', x === b)); $$('.scroll-p', cam).forEach(p => p.hidden = p.id !== 'p-' + b.dataset.k); AUD.chime(); });
    $$('.shelf', cam).forEach(sh => sh.onkeydown = e => { if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return; const b = $$('button', sh), i = b.indexOf(document.activeElement); const nx = b[(i + (/Down|Right/.test(e.key) ? 1 : -1) + b.length) % b.length]; nx.focus(); nx.click(); e.preventDefault(); });
    cam.scrollTop = 0; current = n;
  }
  const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }), { root: cam, threshold: .08 });

  cam.addEventListener('scroll', () => { if (reduced) return; const y = cam.scrollTop; const s = $('#camScene'); s.style.transform = `translateY(${y * .32}px) scale(${1 + Math.min(y, 600) / 3600})`; $('#camTitle').style.transform = `translateY(${y * .12}px)`; $('#camTitle').style.opacity = clamp(1 - y / 620, 0, 1); }, { passive: true });
  cam.addEventListener('click', e => {
    const f = e.target.closest('.frame[data-i]'); if (f) { const g = f.parentElement.dataset.gid; openLB(GAL[g], +f.dataset.i); return; }
    const n = e.target.closest('#camNav button'); if (n) { openChamber(+n.dataset.n, { x: innerWidth / 2, y: innerHeight / 2 }); return; }
    const cp = e.target.closest('[data-copy]'); if (cp) { safe(() => navigator.clipboard.writeText(cp.dataset.copy)); cp.textContent = 'Copiado'; setTimeout(() => cp.textContent = 'Copiar', 1400); }
  });
  cam.addEventListener('error', e => { if (e.target.tagName === 'IMG') { e.target.alt = 'La imagen no se pudo cargar'; e.target.style.opacity = .3; } }, true);
  $('#camBack').onclick = () => closeChamber();
  $('#camPrev').onclick = () => openChamber(current - 1, { x: innerWidth * .1, y: innerHeight / 2 });
  $('#camNext').onclick = () => openChamber(current + 1, { x: innerWidth * .9, y: innerHeight / 2 });
  $('#camMap').onclick = () => closeChamber();

  async function openChamber(n, o = {}) {
    if (busy || n < 1 || n > CH.length) return; busy = true;
    const wasOpen = cam.classList.contains('open'); if (!wasOpen) lastFocus = o.el || document.activeElement;
    veil.style.setProperty('--fx', ((o.x || innerWidth / 2) / innerWidth * 100) + '%'); veil.style.setProperty('--fy', ((o.y || innerHeight / 2) / innerHeight * 100) + '%');
    AUD.open(); hideTip();
    veil.classList.add('on'); await wait(30); veil.classList.add('closed'); await wait(720);
    renderChamber(n);
    if (!wasOpen) { cam.classList.add('open'); document.body.classList.add('lock'); $('#main').inert = true; $('#camTools').appendChild(tools); }
    veil.classList.add('flashon'); await wait(120); veil.classList.remove('closed'); await wait(600); veil.classList.remove('flashon');
    await wait(150); veil.classList.remove('on');
    $('#camT').focus({ preventScroll: true }); busy = false;
    safe(() => history.replaceState(null, '', '#camara-' + n));
    if (!wasOpen || true) guideSay(`Cámara ${pad2(n)}: ${CH[n - 1].epi}. ¿Necesitas ayuda para orientarte?`, 6000);
  }
  async function closeChamber() {
    if (busy || !cam.classList.contains('open')) return; busy = true; AUD.open();
    veil.classList.add('on'); await wait(30); veil.classList.add('closed'); await wait(720);
    cam.classList.remove('open'); document.body.classList.remove('lock'); $('#main').inert = false; $('#bar').appendChild(tools);
    $$('.reveal', cam).forEach(el => ro.unobserve(el));
    const m = $('#mapa'); if (m) m.scrollIntoView({ behavior: 'auto', block: 'start' });
    veil.classList.add('flashon'); await wait(100); veil.classList.remove('closed'); await wait(650); veil.classList.remove('flashon'); await wait(100); veil.classList.remove('on');
    safe(() => history.replaceState(null, '', location.pathname + location.search));
    if (lastFocus && lastFocus.focus) safe(() => lastFocus.focus({ preventScroll: true })); busy = false;
  }
  function route() { const m = /^#camara-(\d)$/.exec(location.hash); if (m && +m[1] >= 1 && +m[1] <= 7 && !cam.classList.contains('open')) openChamber(+m[1], {}); }
  addEventListener('hashchange', route);

  /* ---------- Lightbox: zoom, arrastre y galería ---------- */
  const lb = $('#lb'), lbImg = $('#lbImg'), lbSt = $('#lbStage'); let lbItems = [], lbI = 0, Z = { z: 1, x: 0, y: 0 }, drag = null, moved = false;
  const zApply = () => { lbImg.style.transform = `translate(${Z.x}px,${Z.y}px) scale(${Z.z})`; lbSt.classList.toggle('z', Z.z > 1); };
  function showLB() { const e = lbItems[lbI]; lbImg.src = e.src; lbImg.alt = e.cap; $('#lbCap').textContent = e.cap; $('#lbCount').textContent = `${lbI + 1} / ${lbItems.length}`; Z = { z: 1, x: 0, y: 0 }; zApply(); $('#lbPrev').style.display = $('#lbNext').style.display = lbItems.length > 1 ? '' : 'none'; }
  function openLB(items, i) { lbItems = items; lbI = i; lb.classList.add('open'); showLB(); $('#lbClose').focus(); AUD.click(); }
  function closeLB() { lb.classList.remove('open'); lbImg.removeAttribute('src'); }
  $('#lbClose').onclick = closeLB; $('#lbPrev').onclick = () => { lbI = (lbI - 1 + lbItems.length) % lbItems.length; showLB(); }; $('#lbNext').onclick = () => { lbI = (lbI + 1) % lbItems.length; showLB(); };
  lbSt.addEventListener('pointerdown', e => { drag = { x: e.clientX - Z.x, y: e.clientY - Z.y }; moved = false; lbSt.setPointerCapture(e.pointerId); });
  lbSt.addEventListener('pointermove', e => { if (!drag || Z.z <= 1) return; moved = true; Z.x = e.clientX - drag.x; Z.y = e.clientY - drag.y; zApply(); });
  lbSt.addEventListener('pointerup', e => { drag = null; if (!moved) { if (e.target === lbSt && Z.z === 1) { closeLB(); return; } if (Z.z === 1) { const r = lbImg.getBoundingClientRect(); Z = { z: 2.4, x: -(e.clientX - r.left - r.width / 2) * 1.4, y: -(e.clientY - r.top - r.height / 2) * 1.4 }; } else Z = { z: 1, x: 0, y: 0 }; zApply(); } });
  lbSt.addEventListener('wheel', e => { e.preventDefault(); Z.z = clamp(Z.z * (e.deltaY < 0 ? 1.15 : .87), 1, 6); if (Z.z === 1) { Z.x = Z.y = 0; } zApply(); }, { passive: false });
  $('#lbZoom').onclick = () => { Z = Z.z === 1 ? { z: 2.4, x: 0, y: 0 } : { z: 1, x: 0, y: 0 }; zApply(); };

  /* ---------- Teclado global ---------- */
  document.addEventListener('keydown', e => {
    if (lb.classList.contains('open')) { if (e.key === 'Escape') closeLB(); else if (e.key === 'ArrowLeft') $('#lbPrev').click(); else if (e.key === 'ArrowRight') $('#lbNext').click(); else if (e.key === '+' || e.key === '=') { Z.z = clamp(Z.z * 1.25, 1, 6); zApply(); } else if (e.key === '-') { Z.z = clamp(Z.z / 1.25, 1, 6); if (Z.z === 1) Z.x = Z.y = 0; zApply(); } else if (e.key === 'Tab') { const f = $$('button', lb).filter(b => b.offsetParent); if (!f.length) return; const i = f.indexOf(document.activeElement); const nx = e.shiftKey ? f[(i - 1 + f.length) % f.length] : f[(i + 1) % f.length]; nx.focus(); e.preventDefault(); } return; }
    if (e.key === 'Escape') { if (chat.classList.contains('open') && chat.contains(document.activeElement)) { chatClose(); return; } if (cam.classList.contains('open')) closeChamber(); return; }
    if (cam.classList.contains('open') && e.key === 'Tab') { const f = $$('a[href],button,input,[tabindex="0"]', cam).concat($$('button,input', tools)).filter(x => !x.disabled && x.offsetParent !== null); if (!f.length) return; const i = f.indexOf(document.activeElement), last = f.length - 1; if (e.shiftKey && (i <= 0)) { f[last].focus(); e.preventDefault(); } else if (!e.shiftKey && i === last) { f[0].focus(); e.preventDefault(); } }
  });

  /* ============================================================
     GUÍA SADCHURUZEN + CHATBOT (base de conocimiento local)
     ============================================================ */
  const S = AS.sadchuruzen, chat = $('#chat'), cBody = $('#cBody'), cIn = $('#cIn'), launch = $('#gLaunch'), hello = $('#gHello'); let hist = [], greeted = false, helloT;
  $('#gImg').src = S.avatar || ''; $('#cAv').src = S.avatar || '';
  $('#gAmu').innerHTML = glyph('ankh');
  $('#cName').textContent = CFG.guideName;
  $('#cQuick').innerHTML = window.QUICK.map(q => `<button type="button">${esc(q)}</button>`).join('');
  $('#cSend').innerHTML = I.send; $('#cMin').innerHTML = I.min; $('#cClose').innerHTML = I.close;
  function guideSay(t, ms = 7000) { if (chat.classList.contains('open')) return; hello.textContent = t; hello.classList.add('show'); clearTimeout(helloT); helloT = setTimeout(() => hello.classList.remove('show'), ms); }
  hello.onclick = () => chatOpen();
  function chatOpen() {
    chat.classList.add('open'); chat.classList.remove('min'); launch.setAttribute('aria-expanded', 'true'); hello.classList.remove('show'); $('#guide').style.visibility = innerWidth < 641 ? 'hidden' : 'visible'; $('#guide').style.opacity = innerWidth < 641 ? 0 : 1;
    AUD.chime();
    if (!greeted) { greeted = true; botSay(`Saludos, explorador. Soy <b>${esc(CFG.guideName)}</b>, guardián de este archivo. Puedo orientarte por el mapa, decirte qué guarda cada pirámide y explicarte los comandos de las prácticas.`, [{ t: 'sec', id: 'mapa', l: 'Ir al mapa' }], 300); }
    setTimeout(() => cIn.focus(), 450);
  }
  function chatClose() { chat.classList.remove('open'); launch.setAttribute('aria-expanded', 'false'); $('#guide').style.visibility = 'visible'; $('#guide').style.opacity = 1; launch.focus(); }
  launch.onclick = () => chat.classList.contains('open') ? chatClose() : chatOpen();
  $('#cClose').onclick = chatClose; $('#cMin').onclick = () => { chat.classList.toggle('min'); $('#cMin').setAttribute('aria-label', chat.classList.contains('min') ? 'Expandir chat' : 'Minimizar chat'); };
  const addMsg = (who, inner) => { const m = document.createElement('div'); m.className = 'm ' + who; m.innerHTML = (who === 'bot' ? `<span class="a"><img src="${S.avatar || ''}" alt=""></span>` : '') + `<div class="bub">${inner}</div>`; cBody.appendChild(m); cBody.scrollTop = cBody.scrollHeight; return m; };
  function actionsHTML(go) { return go && go.length ? `<div class="acts">${go.map((a, i) => `<button type="button" data-a='${esc(JSON.stringify(a))}'>${esc(a.l)}</button>`).join('')}</div>` : ''; }
  function botSay(text, go, delay = 600) {
    const m = addMsg('bot', '<div class="typing" aria-label="Escribiendo"><i></i><i></i><i></i></div>');
    return new Promise(r => setTimeout(() => { $('.bub', m).innerHTML = text + actionsHTML(go); cBody.scrollTop = cBody.scrollHeight; AUD.chime(); hist.push({ role: 'assistant', content: text }); r(); }, reduced ? 0 : delay));
  }
  cBody.addEventListener('click', e => { const b = e.target.closest('[data-a]'); if (!b) return; const a = JSON.parse(b.dataset.a); doAction(a); });
  function doAction(a) {
    if (a.t === 'cam') { if (innerWidth < 641) chatClose(); openChamber(a.n, { x: innerWidth / 2, y: innerHeight / 2 }); }
    else if (a.t === 'map') { if (cam.classList.contains('open')) closeChamber(); else $('#mapa').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); if (innerWidth < 641) chatClose(); }
    else if (a.t === 'sec') { const go = () => $('#' + a.id).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); if (cam.classList.contains('open')) closeChamber().then(() => setTimeout(go, 100)); else go(); if (innerWidth < 641) chatClose(); }
  }
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[¿?¡!.,;:()«»"']/g, ' ').replace(/\s+/g, ' ').trim();
  function localAnswer(q) {
    const t = ' ' + norm(q) + ' ', toks = t.trim().split(' '); let best = null, bs = 0;
    window.KB.forEach(en => {
      let s = 0;
      en.k.forEach(kw => { const k = norm(kw); if (!k) return; if (k.includes(' ')) { if (t.includes(' ' + k + ' ') || t.includes(' ' + k)) s += k.length * 2; } else if (toks.includes(k)) s += k.length + 1; else if (k.length >= 6 && toks.some(w => w.length >= 5 && (w.startsWith(k.slice(0, -1)) || k.startsWith(w.slice(0, -1))))) s += k.length - 2; });
      if (s > bs) { bs = s; best = en; }
    });
    if (best && bs >= 3) return { a: best.a, go: best.go };
    return { a: 'Aún no tengo esa información en mi base de conocimiento local. Puedo ayudarte con la <b>asignatura</b>, el <b>mapa</b>, el contenido de cada <b>cámara</b>, las <b>prácticas</b>, las <b>evidencias</b>, <b>CyberChef</b> o el significado de los <b>comandos</b> (docker, john…). Cuando se incorporen los textos académicos completos, sabré responder con más detalle.', go: [{ t: 'cam', n: 5, l: 'Ver prácticas' }, { t: 'sec', id: 'mapa', l: 'Ver el mapa' }] };
  }
  async function reply(q) {
    if (CFG.chat.endpoint) {
      try {
        const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), CFG.chat.timeoutMs || 12000);
        const r = await fetch(CFG.chat.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: q, history: hist.slice(-8), knowledge: window.KB.map(k => ({ keywords: k.k, answer: k.a })) }), signal: ctl.signal }); clearTimeout(to);
        const j = await r.json(); if (j && j.reply) return { a: esc(j.reply).replace(/\n/g, '<br>'), go: j.actions };
      } catch (e) { /* si el servicio falla, se usa la base local */ }
    }
    return localAnswer(q);
  }
  async function send(q) {
    q = q.trim(); if (!q) return; addMsg('me', esc(q)); hist.push({ role: 'user', content: q }); cIn.value = '';
    const m = addMsg('bot', '<div class="typing"><i></i><i></i><i></i></div>');
    const [r] = await Promise.all([reply(q), new Promise(res => setTimeout(res, reduced ? 0 : 550 + Math.random() * 450))]);
    $('.bub', m).innerHTML = r.a + actionsHTML(r.go); cBody.scrollTop = cBody.scrollHeight; hist.push({ role: 'assistant', content: r.a }); AUD.chime();
  }
  $('#cForm').onsubmit = e => { e.preventDefault(); send(cIn.value); };
  $('#cQuick').onclick = e => { const b = e.target.closest('button'); if (b) send(b.textContent); };

  /* ---------- Arranque ---------- */
  const start = () => { setTimeout(introPlay, reduced ? 50 : 900); route(); };
  if (document.readyState === 'complete') start(); else addEventListener('load', start);
  setTimeout(() => { if (!$('#introVeil').classList.contains('gone')) start(); }, 4000);
  window.ASN = { open: openChamber, close: closeChamber, chat: { open: chatOpen, send }, audio: AUD, answer: localAnswer };
})();
