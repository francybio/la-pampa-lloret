/* ==========================================================
   LA PAMPA — interacciones
   Portada: la pampa al atardecer en canvas, miles de briznas
   de pasto que el cursor peina como viento y un gaucho a
   caballo cruzando el horizonte. La brasa: carbones que
   respiran y se avivan al pasar el cursor, con chispas.
   «¿Cuánta carne pedimos?»: según comensales y hambre propone
   cortes reales de la carta con sus gramos y su precio, y los
   deja caer sobre una tabla. La carta: cuero con el título de
   cada sección marcado a fuego con un hierro (humo y quemado).
   ========================================================== */
(() => {
'use strict';

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const STATIC = /[?&]static\b/.test(location.search);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || STATIC;
const fine = matchMedia('(pointer: fine)').matches;
const IMG = (f) => 'assets/img/' + f;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
document.documentElement.classList.add('js');

/* ----------------------------------------------------------
   IDIOMAS · castellano por defecto, ?lang=xx, se recuerda
   ---------------------------------------------------------- */
const I18N = window.LP_I18N || { langs: [{ c: 'es', n: 'Castellano', loc: 'es-ES' }], ui: { es: {} } };
const CARTA = window.LP_CARTA || [];
const LANGS = I18N.langs, CODES = LANGS.map((l) => l.c), LANG_KEY = 'pampa-lang';
const store = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };
let lang = [new URLSearchParams(location.search).get('lang'), store.get(LANG_KEY)].find((c) => CODES.includes(c)) || 'es';
const li = () => Math.max(0, CODES.indexOf(lang));
const t = (k, vars) => {
  let s = (I18N.ui[lang] && I18N.ui[lang][k]) ?? (I18N.ui.es && I18N.ui.es[k]) ?? k;
  if (vars) for (const v in vars) s = s.split('{' + v + '}').join(vars[v]);
  return s;
};
const loc = () => (LANGS.find((l) => l.c === lang) || LANGS[0]).loc;
const money = (p) => { try { return new Intl.NumberFormat(loc(), { style: 'currency', currency: 'EUR', minimumFractionDigits: p % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(p); } catch (e) { return p + ' €'; } };
const grams = (g) => { try { return g >= 1000 ? new Intl.NumberFormat(loc(), { maximumFractionDigits: 1 }).format(g / 1000) + ' kg' : g + ' g'; } catch (e) { return g + ' g'; } };
const onLang = [];
function paintSwitches() {
  const cur = LANGS.find((l) => l.c === lang);
  $$('[data-lang-switch]').forEach((box) => {
    box.innerHTML = `<button class="lang__btn" type="button" aria-expanded="false" aria-label="${t('lang.change')} (${cur.n})"><i class="ph-bold ph-globe-simple" aria-hidden="true"></i><span>${cur.c.toUpperCase()}</span><i class="ph-bold ph-caret-down" aria-hidden="true"></i></button>
      <ul class="lang__menu" hidden>${LANGS.map((l) => `<li><button type="button" lang="${l.c}" data-set-lang="${l.c}"${l.c === lang ? ' aria-current="true"' : ''}><b>${l.c.toUpperCase()}</b>${l.n}</button></li>`).join('')}</ul>`;
  });
  $$('[data-lang-list]').forEach((box) => {
    box.innerHTML = `<span>${t('lang.label')}</span>` + LANGS.map((l) => `<button type="button" lang="${l.c}" data-set-lang="${l.c}"${l.c === lang ? ' aria-current="true"' : ''}>${l.n}</button>`).join('');
  });
}
function applyLang() {
  document.documentElement.lang = lang;
  document.title = t('meta.title');
  const md = $('#metaDesc'); if (md) md.setAttribute('content', t('meta.desc'));
  $$('[data-i18n]').forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
  $$('[data-i18n-attr]').forEach((el) => el.dataset.i18nAttr.split(';').forEach((p) => {
    const [a, k] = p.split(':'); if (a && k) el.setAttribute(a.trim(), t(k.trim()));
  }));
  paintSwitches();
  onLang.forEach((f) => f());
}
function setLang(c) {
  if (!CODES.includes(c) || c === lang) return;
  lang = c; store.set(LANG_KEY, c);
  try { const u = new URL(location.href); if (c === 'es') u.searchParams.delete('lang'); else u.searchParams.set('lang', c); history.replaceState(history.state, '', u); } catch (e) {}
  applyLang();
}
const closeLangMenus = () => $$('.lang__menu:not([hidden])').forEach((m) => { m.hidden = true; m.previousElementSibling.setAttribute('aria-expanded', 'false'); });
document.addEventListener('click', (e) => {
  const sw = e.target.closest('.lang__btn');
  if (sw) {
    const m = sw.nextElementSibling, open = m.hidden;
    closeLangMenus(); m.hidden = !open; sw.setAttribute('aria-expanded', String(open));
    if (open) { const c = m.querySelector('[aria-current]'); if (c) c.focus(); }
    return;
  }
  const set = e.target.closest('[data-set-lang]');
  if (set) { const box = set.closest('[data-lang-switch]'); closeLangMenus(); setLang(set.dataset.setLang); if (box) { const b = box.querySelector('.lang__btn'); if (b) b.focus(); } return; }
  if (!e.target.closest('.lang__menu')) closeLangMenus();
});
document.addEventListener('keydown', (e) => {
  const m = $('.lang__menu:not([hidden])'); if (!m) return;
  const items = $$('button', m), i = items.indexOf(document.activeElement);
  if (e.key === 'Escape') { closeLangMenus(); m.previousElementSibling.focus(); }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus(); }
});
document.addEventListener('focusin', (e) => { const m = $('.lang__menu:not([hidden])'); if (m && !m.parentNode.contains(e.target)) closeLangMenus(); });

/* ----------------------------------------------------------
   NAV, desplazamiento suave y apariciones
   ---------------------------------------------------------- */
const nav = $('#nav'), burger = $('#burger'), drawer = $('#drawer');
const setSolid = () => nav.classList.toggle('is-solid', scrollY > 60);
addEventListener('scroll', setSolid, { passive: true }); setSolid();
const toggleDrawer = (open) => { burger.setAttribute('aria-expanded', String(open)); drawer.hidden = !open; document.documentElement.style.overflow = open ? 'hidden' : ''; };
burger.addEventListener('click', () => toggleDrawer(burger.getAttribute('aria-expanded') !== 'true'));
drawer.addEventListener('click', (e) => { if (e.target.closest('a')) toggleDrawer(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) { toggleDrawer(false); burger.focus(); } });
if ('IntersectionObserver' in window) {
  const links = $$('.nav__links a');
  const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) links.forEach((a) => a.classList.toggle('is-on', a.getAttribute('href') === '#' + en.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  ['casa', 'brasa', 'cuenta', 'carta', 'fotos', 'visita'].forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}
let lenis = null;
if (!reduced && typeof window.Lenis !== 'undefined') {
  lenis = new Lenis({ lerp: 0.12 });
  const raf = (tm) => { lenis.raf(tm); requestAnimationFrame(raf); }; requestAnimationFrame(raf);
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]'); if (!a) return;
  const id = a.getAttribute('href'); if (id.length < 2) return;
  const target = document.querySelector(id); if (!target) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(target, { offset: id === '#pampa' ? 0 : -54 }); else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
});
const reveals = $$('.reveal');
if ('IntersectionObserver' in window && !reduced) {
  const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((r) => io.observe(r));
  const check = () => reveals.forEach((r) => { if (!r.classList.contains('is-in') && r.getBoundingClientRect().top < innerHeight * .95) r.classList.add('is-in'); });
  addEventListener('scroll', check, { passive: true }); setTimeout(check, 400);
} else reveals.forEach((r) => r.classList.add('is-in'));
const visibleWatch = (el, cb) => { if ('IntersectionObserver' in window) new IntersectionObserver(([en]) => cb(en.isIntersecting)).observe(el); else cb(true); };

/* años desde 1982 */
const paintYears = () => { const y = new Date().getFullYear(); $('#casaH').innerHTML = t('casa.h', { n: y - 1982 }); };
onLang.push(paintYears);
const paintHint = () => { const h = $('[data-hint]'); if (h) h.textContent = t(fine ? 'hero.hint' : 'hero.hintTouch'); };
onLang.push(paintHint);

/* ----------------------------------------------------------
   PORTADA · la pampa y el viento
   ---------------------------------------------------------- */
(function pampa() {
  const hero = $('#pampa'), cv = $('#pampaCv'); if (!cv) return;
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, dpr = 1, blades = [], visible = true, horizon = 0;
  const wind = { x: -1, y: 0, vx: 0, str: 0 };
  let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  function build() {
    dpr = Math.min(devicePixelRatio || 1, 1.6);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    horizon = H * .7;
    seed = 11; blades = [];
    const n = Math.round(clamp(W * (H - horizon) / 90, 500, 2600));
    for (let i = 0; i < n; i++) {
      const depth = Math.pow(rnd(), 1.6); // 0 lejos, 1 cerca
      const y = horizon + depth * (H - horizon) + 6;
      blades.push({ x: rnd() * (W + 40) - 20, y, h: (10 + depth * 70) * (.6 + rnd() * .7), w: .6 + depth * 2.2, d: depth, ph: rnd() * 6.28, bend: 0, v: 0, hue: rnd() });
    }
    blades.sort((a, b) => a.y - b.y);
  }
  function sky(tt) {
    const g = ctx.createLinearGradient(0, 0, 0, horizon);
    g.addColorStop(0, '#2A1B2E'); g.addColorStop(.45, '#6B3B3A'); g.addColorStop(.85, '#D07A3E'); g.addColorStop(1, '#F0B04C');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, horizon + 2);
    // sol
    const sx = W * .72, sy = horizon - H * .02, sr = Math.min(W, H) * .09;
    const sg = ctx.createRadialGradient(sx, sy, sr * .2, sx, sy, sr * 4);
    sg.addColorStop(0, 'rgba(255,214,140,.9)'); sg.addColorStop(.25, 'rgba(255,170,80,.35)'); sg.addColorStop(1, 'rgba(255,150,60,0)');
    ctx.fillStyle = sg; ctx.fillRect(0, 0, W, horizon + 2);
    ctx.fillStyle = '#FFD58A'; ctx.beginPath(); ctx.arc(sx, sy, sr, Math.PI, 0); ctx.fill();
    // lomas lejanas
    ctx.fillStyle = 'rgba(60,32,22,.55)';
    ctx.beginPath(); ctx.moveTo(0, horizon);
    for (let x = 0; x <= W; x += 20) ctx.lineTo(x, horizon - 10 - Math.sin(x / 260) * 8 - Math.sin(x / 90 + 1) * 3);
    ctx.lineTo(W, horizon + 4); ctx.lineTo(0, horizon + 4); ctx.fill();
  }
  // el gaucho a caballo (silueta)
  function rider(tt) {
    const k = ((tt * .018) % 1.3) - .15, x = k * W, y = horizon - 4, s = clamp(W / 1400, .55, 1.1);
    const gal = Math.sin(tt * 9) * 2.2;
    ctx.save(); ctx.translate(x, y + gal * .4); ctx.scale(s, s); ctx.fillStyle = 'rgba(30,16,12,.92)';
    ctx.beginPath();
    ctx.ellipse(0, -26, 22, 10, 0, 0, 6.283); // cuerpo
    ctx.moveTo(18, -30); ctx.lineTo(32, -46 + gal); ctx.lineTo(38, -44 + gal); ctx.lineTo(30, -28); // cuello y cabeza
    ctx.fill();
    ctx.strokeStyle = 'rgba(30,16,12,.92)'; ctx.lineWidth = 3.4; ctx.lineCap = 'round';
    const l = Math.sin(tt * 9) * 9;
    [[-14, l], [-8, -l], [12, -l], [17, l]].forEach(([lx, a]) => { ctx.beginPath(); ctx.moveTo(lx, -20); ctx.lineTo(lx + a * .6, -2); ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(-22, -28); ctx.quadraticCurveTo(-34, -30 + gal, -36, -18); ctx.stroke(); // cola
    // jinete
    ctx.fillRect(-4, -54, 8, 22);
    ctx.beginPath(); ctx.arc(0, -58, 5, 0, 6.283); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, -62, 11, 2.6, 0, 0, 6.283); ctx.fill(); // sombrero
    ctx.fillRect(-4, -68, 8, 6);
    ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(4, -48); ctx.quadraticCurveTo(26, -80 + gal * 3, 10, -92); ctx.stroke(); // lazo
    ctx.beginPath(); ctx.ellipse(8, -96, 9, 5, .4, 0, 6.283); ctx.stroke();
    ctx.restore();
  }
  function draw(tt, dt) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    sky(tt);
    if (!reduced) rider(tt);
    // suelo
    const gg = ctx.createLinearGradient(0, horizon, 0, H);
    gg.addColorStop(0, '#8A6A2E'); gg.addColorStop(1, '#2A1C0E');
    ctx.fillStyle = gg; ctx.fillRect(0, horizon, W, H - horizon);
    wind.str *= Math.pow(.25, dt); wind.vx *= Math.pow(.2, dt);
    const base = Math.sin(tt * .7) * .18 + Math.sin(tt * 1.9) * .06;
    ctx.lineCap = 'round';
    for (let i = 0; i < blades.length; i++) {
      const b = blades[i];
      const dx = b.x - wind.x, dy = (b.y - b.h * .5) - wind.y;
      const near = Math.exp(-(dx * dx + dy * dy * 2.5) / (16000 + b.d * 22000));
      const target = base + Math.sin(tt * 2.2 + b.x * .012 + b.ph) * .07 + near * clamp(wind.vx * .006, -1.3, 1.3) + near * wind.str * .25 * Math.sign(dx || 1);
      if (!reduced) { b.v += (target - b.bend) * 26 * dt; b.v *= Math.pow(.02, dt); b.bend += b.v * dt * 6; } else b.bend = base;
      const ang = b.bend * (.6 + b.d * .6), tipx = b.x + Math.sin(ang) * b.h, tipy = b.y - Math.cos(ang) * b.h;
      const light = .35 + b.d * .45 + b.hue * .2;
      ctx.strokeStyle = `rgb(${(150 + 70 * light) | 0},${(105 + 60 * light) | 0},${(40 + 20 * b.hue) | 0})`;
      ctx.lineWidth = b.w;
      ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.quadraticCurveTo(b.x + Math.sin(ang) * b.h * .3, b.y - b.h * .55, tipx, tipy); ctx.stroke();
    }
  }
  build(); addEventListener('resize', build);
  let px = null;
  hero.addEventListener('pointermove', (e) => {
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    if (px !== null) { wind.vx = lerp(wind.vx, (x - px) * 40, .4); wind.str = clamp(wind.str + Math.abs(x - px) * .02, 0, 3); }
    px = x; wind.x = x; wind.y = Math.max(y, horizon);
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { px = null; });
  visibleWatch(hero, (v) => { visible = v; });
  if (reduced) { draw(0, .016); return; }
  let last = performance.now();
  const tick = (now) => {
    requestAnimationFrame(tick);
    const dt = clamp((now - last) / 1000, .001, .05); last = now;
    if (!visible || document.hidden) return;
    draw(now / 1000, dt);
  };
  requestAnimationFrame(tick);
})();

/* ----------------------------------------------------------
   LA BRASA · carbones que se avivan
   ---------------------------------------------------------- */
(function embers() {
  const sec = $('#brasa'), cv = $('#embersCv'); if (!cv) return;
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, dpr = 1, coals = [], sparks = [], visible = false, mx = -999, my = -999;
  let seed = 5; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  function build() {
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    seed = 5; coals = [];
    const n = Math.round(clamp(W * H / 1500, 120, 700));
    for (let i = 0; i < n; i++) {
      const y = H * .25 + Math.pow(rnd(), .7) * H * .8;
      const r = (6 + rnd() * 18) * (.5 + y / H * .7);
      coals.push({ x: rnd() * W, y, r, ph: rnd() * 6.28, sp: .5 + rnd() * 1.5, heat: .2 + rnd() * .3, rot: rnd() * 3, sides: 5 + ((rnd() * 3) | 0) });
    }
    coals.sort((a, b) => a.y - b.y);
  }
  const glow = (h) => { const r = 120 + 135 * clamp(h * 1.2, 0, 1), g = 30 + 150 * clamp(h - .25, 0, 1), b = 10 + 60 * clamp(h - .7, 0, 1); return `rgb(${r | 0},${g | 0},${b | 0})`; };
  function poly(c) { ctx.beginPath(); for (let k = 0; k < c.sides; k++) { const a = c.rot + k / c.sides * 6.283, rr = c.r * (.75 + ((k * 7 + c.sides) % 3) * .12); const x = c.x + Math.cos(a) * rr, y = c.y + Math.sin(a) * rr * .7; if (k) ctx.lineTo(x, y); else ctx.moveTo(x, y); } ctx.closePath(); }
  function draw(tt, dt) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, 'rgba(26,18,12,0)'); bg.addColorStop(.5, 'rgba(60,20,8,.5)'); bg.addColorStop(1, 'rgba(120,35,10,.6)');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    for (const c of coals) {
      const dx = c.x - mx, dy = c.y - my, near = Math.exp(-(dx * dx + dy * dy) / 9000);
      c.heat = clamp(c.heat + near * dt * 3 - dt * .25, .15, 1.2);
      const h = c.heat * (.75 + .25 * Math.sin(tt * c.sp + c.ph));
      poly(c); ctx.fillStyle = '#1C120D'; ctx.fill();
      ctx.save(); poly(c); ctx.clip();
      const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
      g.addColorStop(0, glow(h)); g.addColorStop(.7, glow(h * .5)); g.addColorStop(1, 'rgba(20,10,6,.9)');
      ctx.fillStyle = g; ctx.fillRect(c.x - c.r, c.y - c.r, c.r * 2, c.r * 2);
      ctx.restore();
      if (near > .4 && Math.random() < dt * 12 && sparks.length < 160) sparks.push({ x: c.x, y: c.y, vx: (Math.random() - .5) * 40, vy: -60 - Math.random() * 90, life: 0, max: .8 + Math.random() * 1.2 });
    }
    if (Math.random() < dt * 4 && sparks.length < 160) { const c = coals[(Math.random() * coals.length) | 0]; sparks.push({ x: c.x, y: c.y, vx: (Math.random() - .5) * 20, vy: -40 - Math.random() * 50, life: 0, max: 1 + Math.random() }); }
    ctx.globalCompositeOperation = 'lighter';
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i]; s.life += dt; if (s.life > s.max) { sparks.splice(i, 1); continue; }
      s.vy -= 20 * dt; s.x += s.vx * dt + Math.sin(s.life * 9) * .4; s.y += s.vy * dt;
      const a = 1 - s.life / s.max;
      ctx.fillStyle = `rgba(255,${(150 + 80 * a) | 0},60,${a})`; ctx.beginPath(); ctx.arc(s.x, s.y, 1.4, 0, 6.283); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  }
  build(); addEventListener('resize', build);
  sec.addEventListener('pointermove', (e) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; }, { passive: true });
  sec.addEventListener('pointerleave', () => { mx = my = -999; });
  visibleWatch(sec, (v) => { visible = v; });
  if (reduced) { draw(0, .016); return; }
  let last = performance.now();
  const tick = (now) => { requestAnimationFrame(tick); const dt = clamp((now - last) / 1000, .001, .05); last = now; if (!visible || document.hidden) return; draw(now / 1000, dt); };
  requestAnimationFrame(tick);
})();

/* ----------------------------------------------------------
   ¿CUÁNTA CARNE PEDIMOS?
   cortes con peso de la carta: [sección, índice, gramos, hueso]
   ---------------------------------------------------------- */
const CUTS = [
  ['hueso', 3, 1200, 1], ['hueso', 2, 1000, 1], ['hueso', 1, 1000, 1], ['hueso', 0, 600, 1],
  ['parrilla', 4, 400, 0], ['parrilla', 0, 300, 0], ['parrilla', 3, 300, 0], ['chef', 1, 300, 0],
  ['parrilla', 1, 250, 0], ['chef', 0, 250, 0], ['parrilla', 8, 200, 0]
];
const item = (sec, i) => { const s = CARTA.find((x) => x.id === sec); return s ? s.items[i] : null; };
const HUNGER = [280, 380, 500];
let people = 2, hunger = 1;
function propose(n, per) {
  let need = n * per; const out = [];
  // para grupos, un corte con hueso de los de compartir; luego cortes variados
  const big = n >= 4 ? CUTS.filter((c) => c[3] && c[2] >= 1000) : n >= 2 ? CUTS.filter((c) => c[3] && c[2] <= 600) : [];
  if (big.length && need >= big[big.length - 1][2] * .9) { const b = n >= 6 ? big[0] : big[Math.min(1, big.length - 1)]; out.push(b); need -= b[2]; }
  const singles = CUTS.filter((c) => !c[3]);
  let k = 0;
  while (need > 120 && k < 14) { const c = singles[k % singles.length]; out.push(c); need -= c[2]; k++; }
  if (n >= 2 && !out.some((c) => c[0] === 'parrilla' && c[1] === 8)) out.push(CUTS[CUTS.length - 1]);
  return out;
}
function paintCuenta(animate) {
  const per = HUNGER[hunger], plan = propose(people, per);
  $('#cPeople').textContent = people;
  $('#cTarget').textContent = t('cuenta.target', { g: per });
  $('#hunger').innerHTML = [0, 1, 2].map((h) => `<button type="button" role="radio" aria-checked="${h === hunger}" data-h="${h}">${esc(t('cuenta.h' + h))}</button>`).join('');
  // agrupar
  const map = new Map(); plan.forEach((c) => { const k = c[0] + c[1]; map.set(k, { c, q: (map.get(k) || { q: 0 }).q + 1 }); });
  let g = 0, eur = 0, ask = false;
  $('#plan').innerHTML = [...map.values()].map(({ c, q }) => {
    const it = item(c[0], c[1]); if (!it) return '';
    g += c[2] * q; if (it[0] == null) ask = true; else eur += it[0] * q;
    return `<li><b>${q}×</b><span>${esc(it[1][li()])}<small>${esc(grams(c[2]))}${q > 1 ? ' × ' + q : ''}</small></span><em>${it[0] == null ? esc(t('cuenta.ask')) : esc(money(it[0] * q))}</em></li>`;
  }).join('');
  $('#cGrams').textContent = grams(g);
  $('#cPrice').textContent = money(Math.round(eur * 100) / 100) + (ask ? ' +' : '');
  $('#cEach').textContent = money(Math.round(eur / people * 100) / 100) + ' ' + t('cuenta.each');
  // la tabla
  const tabla = $('#tabla'), w = tabla.clientWidth || 400, h = tabla.clientHeight || 170;
  tabla.innerHTML = plan.map((c, i) => {
    const sz = clamp(Math.sqrt(c[2]) * (c[3] ? 2.6 : 3.2), 34, 110), cols = Math.ceil(Math.sqrt(plan.length * 2.2)), row = Math.floor(i / cols), col = i % cols;
    const x = clamp((col + .5) / cols * w - sz / 2 + (row % 2 ? 14 : -6), 6, w - sz - 6), y = clamp(16 + row * (h - 30) / Math.max(1, Math.ceil(plan.length / cols)), 8, h - sz * .7 - 8);
    const veg = c[0] === 'parrilla' && c[1] === 8;
    return `<span class="cut${c[3] ? ' is-bone' : ''}${veg ? ' is-veg' : ''}${animate && !reduced ? ' is-in' : ''}" style="left:${x.toFixed(0)}px;top:${y.toFixed(0)}px;width:${sz.toFixed(0)}px;height:${(sz * .66).toFixed(0)}px;transform:rotate(${((i * 37) % 50 - 25)}deg);animation-delay:${i * 70}ms"></span>`;
  }).join('');
}
$('#cLess').addEventListener('click', () => { people = Math.max(1, people - 1); paintCuenta(true); });
$('#cMore').addEventListener('click', () => { people = Math.min(14, people + 1); paintCuenta(true); });
$('#hunger').addEventListener('click', (e) => { const b = e.target.closest('[data-h]'); if (b) { hunger = +b.dataset.h; paintCuenta(true); } });
$('#hunger').addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); hunger = clamp(hunger + (e.key === 'ArrowRight' ? 1 : -1), 0, 2); paintCuenta(true); $(`[data-h="${hunger}"]`).focus(); } });
onLang.push(() => paintCuenta(false));
addEventListener('resize', () => paintCuenta(false));

/* ----------------------------------------------------------
   LA CARTA · cuero marcado a fuego
   ---------------------------------------------------------- */
let curSec = 0;
const irons = $('#irons'), brandCv = $('#brandCv'), bctx = brandCv.getContext('2d');
function paintIrons() {
  irons.innerHTML = CARTA.map((s, i) => `<button type="button" role="tab" id="iron-${s.id}" aria-controls="hide" aria-selected="${i === curSec}" tabindex="${i === curSec ? 0 : -1}">${s.fire ? `<span class="f" aria-hidden="true">${'🔥'.repeat(Math.min(s.fire, 3))}</span>` : ''}${esc(s.t[li()])}</button>`).join('');
}
let brandAnim = 0;
function brand(text) {
  cancelAnimationFrame(brandAnim);
  const hh = $('#hideH');
  brandCv.style.top = hh.offsetTop + 'px'; brandCv.style.left = hh.offsetLeft + 'px';
  brandCv.style.width = hh.offsetWidth + 'px'; brandCv.style.height = hh.offsetHeight + 'px';
  const dpr = Math.min(devicePixelRatio || 1, 2), W = hh.offsetWidth, H = hh.offsetHeight;
  brandCv.width = Math.round(W * dpr); brandCv.height = Math.round(H * dpr);
  const fs = parseFloat(getComputedStyle($('#hideH')).fontSize) || 48;
  const font = `${fs}px Sancreek, Rockwell, serif`;
  // máscara del texto
  const m = document.createElement('canvas'); m.width = brandCv.width; m.height = brandCv.height;
  const mc = m.getContext('2d'); mc.setTransform(dpr, 0, 0, dpr, 0, 0); mc.font = font; mc.textBaseline = 'top'; mc.fillStyle = '#000';
  let size = fs; while (mc.measureText(text).width > W - 4 && size > 18) { size -= 2; mc.font = `${size}px Sancreek, Rockwell, serif`; }
  mc.fillText(text, 0, (H - size * 1.1) / 2);
  const smoke = [];
  const t0 = performance.now(), dur = reduced ? 1 : 900;
  const frame = (now) => {
    const k = clamp((now - t0) / dur, 0, 1), e = 1 - Math.pow(1 - k, 3);
    const c = bctx; c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, brandCv.width, brandCv.height);
    // quemado: halo marrón + núcleo oscuro, con la brasa naranja que se apaga
    c.save(); c.filter = `blur(${(3 * dpr).toFixed(1)}px)`; c.globalAlpha = .55 * e; c.drawImage(m, 0, 0); c.restore();
    c.save(); c.globalAlpha = e; c.drawImage(m, 0, 0); c.globalCompositeOperation = 'source-in';
    const hot = 1 - e;
    c.fillStyle = `rgb(${(40 + 200 * hot) | 0},${(18 + 80 * hot) | 0},${(10 + 10 * hot) | 0})`; c.fillRect(0, 0, brandCv.width, brandCv.height);
    c.restore();
    if (!reduced && k < 1 && Math.random() < .9) for (let i = 0; i < 3; i++) smoke.push({ x: Math.random() * W * .9, y: H * .55, r: 6 + Math.random() * 10, life: 0, max: .9 + Math.random() * .6 });
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    for (let i = smoke.length - 1; i >= 0; i--) {
      const s = smoke[i]; s.life += .016; if (s.life > s.max) { smoke.splice(i, 1); continue; }
      s.y -= 1.2; s.r += .5; const a = Math.sin(s.life / s.max * Math.PI) * .18;
      const g = c.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r); g.addColorStop(0, `rgba(230,220,200,${a})`); g.addColorStop(1, 'rgba(230,220,200,0)');
      c.fillStyle = g; c.fillRect(s.x - s.r, s.y - s.r, s.r * 2, s.r * 2);
    }
    if (k < 1 || smoke.length) brandAnim = requestAnimationFrame(frame);
  };
  if (document.fonts && document.fonts.load) document.fonts.load(font).then(() => { mc.clearRect(0, 0, W, H); mc.font = `${size}px Sancreek, Rockwell, serif`; mc.fillText(text, 0, (H - size * 1.1) / 2); brandAnim = requestAnimationFrame(frame); }, () => { brandAnim = requestAnimationFrame(frame); });
  else brandAnim = requestAnimationFrame(frame);
}
function paintHide(animate) {
  const s = CARTA[curSec]; if (!s) return;
  $('#hide').setAttribute('aria-labelledby', 'iron-' + s.id);
  $('#hideH').textContent = s.t[li()];
  $('#hideNote').textContent = s.note ? s.note[li()] : '';
  $('#hideList').innerHTML = s.items.map(([p, n, d, mk]) => `<li><b>${esc(n[li()])}${mk === 'v' ? `<i class="mk mk--v" title="${esc(t('carta.v'))}">V</i>` : ''}${mk === 'p' ? `<i class="mk mk--p" title="${esc(t('carta.p'))}">🐖</i>` : ''}</b><span class="pr${p == null ? ' ask' : ''}">${p == null ? esc(t('cuenta.ask')) : esc(money(p))}</span>${d ? `<small>${esc(d[li()])}</small>` : ''}</li>`).join('');
  brand(s.t[li()]);
}
function goSec(i, focus) { curSec = (i + CARTA.length) % CARTA.length; paintIrons(); paintHide(true); if (focus) $('#iron-' + CARTA[curSec].id).focus(); }
irons.addEventListener('click', (e) => { const b = e.target.closest('[role="tab"]'); if (b) goSec($$('[role="tab"]', irons).indexOf(b)); });
irons.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); goSec(curSec + (e.key === 'ArrowRight' ? 1 : -1), true); } });
let hideSeen = false;
visibleWatch($('#hide'), (v) => { if (v && !hideSeen) { hideSeen = true; brand(CARTA[curSec].t[li()]); } });
onLang.push(() => { paintIrons(); paintHide(false); });

/* ----------------------------------------------------------
   FOTOS · visor
   ---------------------------------------------------------- */
const FOTOS = ['corte-humo', 'tomahawk-cortado', 'empanadas-vino', 'pulpo', 'churrasco-romero', 'mesa-lista', 'ancho', 'tomahawk-mesa', 'ojo-bife', 'paella', 'ensalada', 'pan-alioli', 'empanadas', 'parrillada-verduras', 'flan', 'spritz', 'comedor', 'malbec', 'cocina', 'cartel'];
function paintFotos() {
  $('#mosaic').innerHTML = FOTOS.map((f, i) => `<button class="ph" type="button" data-i="${i}" aria-label="${esc(t('fotos.open') + ': ' + t('g.' + f))}"><img src="${IMG(f + '.jpg')}" alt="${esc(t('ga.' + f))}" loading="lazy"><span>${esc(t('g.' + f))}</span></button>`).join('');
}
onLang.push(paintFotos);
const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbCount = $('#lbCount');
let lbI = 0, lbFrom = null;
function lbShow(i) { lbI = (i + FOTOS.length) % FOTOS.length; const f = FOTOS[lbI]; lbImg.src = IMG(f + '.jpg'); lbImg.alt = t('ga.' + f); lbCap.textContent = t('g.' + f); lbCount.textContent = (lbI + 1) + ' / ' + FOTOS.length; }
function lbOpen(i, from) { lbFrom = from; lbShow(i); lb.hidden = false; document.documentElement.style.overflow = 'hidden'; if (lenis) lenis.stop(); $('#lbClose').focus(); }
function lbClose() { lb.hidden = true; document.documentElement.style.overflow = ''; if (lenis) lenis.start(); if (lbFrom) lbFrom.focus(); }
$('#mosaic').addEventListener('click', (e) => { const b = e.target.closest('.ph'); if (b) lbOpen(+b.dataset.i, b); });
$('#lbClose').addEventListener('click', lbClose);
$('#lbPrev').addEventListener('click', () => lbShow(lbI - 1));
$('#lbNext').addEventListener('click', () => lbShow(lbI + 1));
lb.addEventListener('click', (e) => { if (e.target === lb) lbClose(); });
addEventListener('keydown', (e) => {
  if (lb.hidden) return;
  if (e.key === 'Escape') lbClose();
  if (e.key === 'ArrowLeft') lbShow(lbI - 1);
  if (e.key === 'ArrowRight') lbShow(lbI + 1);
  if (e.key === 'Tab') { const f = $$('.lb__btn', lb); const i = f.indexOf(document.activeElement); e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus(); }
});
let sx = null;
lb.addEventListener('pointerdown', (e) => { sx = e.clientX; });
lb.addEventListener('pointerup', (e) => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) lbShow(lbI + (dx < 0 ? 1 : -1)); });

/* vídeos: se reproducen sin sonido al verlos */
if ('IntersectionObserver' in window && !reduced) {
  const io = new IntersectionObserver((ents) => ents.forEach((en) => { const v = en.target; if (en.isIntersecting) { v.preload = 'auto'; const p = v.play(); if (p) p.catch(() => {}); } else v.pause(); }), { threshold: .35 });
  $$('video[data-auto]').forEach((v) => io.observe(v));
}

/* mapa: solo si se pide */
$('#mapaLoad').addEventListener('click', () => {
  const f = document.createElement('iframe');
  f.title = t('vis.mapTitle'); f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
  f.src = 'https://maps.google.com/maps?q=La%20Pampa%20Steak%20House%2C%20Carrer%20de%20Santa%20Ll%C3%BAcia%2016%2C%20Lloret%20de%20Mar&z=17&output=embed&hl=' + lang;
  $('#mapa').replaceChildren(f);
});

applyLang();
paintCuenta(false);
})();
