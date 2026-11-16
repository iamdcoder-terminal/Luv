/* =========================================================
   EROSPHERE · THE COURT OF LOVE  —  behaviour & animation
   (Everything personal is in config.js — you rarely need this file.)
   ========================================================= */
(function () {
  'use strict';
  var C = window.CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var rand = function (a, b) { return a + Math.random() * (b - a); };
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- names ---------- */
  $$('[data-her]').forEach(function (e) { e.textContent = C.herName || 'My Love'; });
  $$('[data-you]').forEach(function (e) { e.textContent = C.yourName || 'Me'; });

  /* =========================================================
     1. THE SCENE — moon, floating islands, waterfalls
     ========================================================= */
  var DEFS = '<defs>' +
    '<radialGradient id="moonG" cx=".4" cy=".35" r=".85"><stop offset="0" stop-color="#fffaf2"/><stop offset=".6" stop-color="#f9dfe2"/><stop offset="1" stop-color="#e6b4ca"/></radialGradient>' +
    '<radialGradient id="moonGlow"><stop offset="0" stop-color="#fff3ee" stop-opacity=".95"/><stop offset=".42" stop-color="#ffd6e4" stop-opacity=".42"/><stop offset="1" stop-color="#ffd6e4" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="rock" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b9a0bd"/><stop offset=".5" stop-color="#8b6d93"/><stop offset="1" stop-color="#5d4673"/></linearGradient>' +
    '<linearGradient id="rockLight" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffd7e6" stop-opacity="0"/><stop offset=".65" stop-color="#ffd7e6" stop-opacity="0"/><stop offset="1" stop-color="#ffd7e6" stop-opacity=".4"/></linearGradient>' +
    '<linearGradient id="grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ccb8d"/><stop offset="1" stop-color="#4f8a6a"/></linearGradient>' +
    '<linearGradient id="marble" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff7f4"/><stop offset="1" stop-color="#e8c6d3"/></linearGradient>' +
    '<linearGradient id="wfBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset=".7" stop-color="#eaf2ff" stop-opacity=".36"/><stop offset="1" stop-color="#eaf2ff" stop-opacity="0"/></linearGradient>' +
    '<radialGradient id="mist"><stop offset="0" stop-color="#fff" stop-opacity=".92"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="warm"><stop offset="0" stop-color="#fff0b0"/><stop offset="1" stop-color="#ffb35e" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="warmWin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffeaa8"/><stop offset="1" stop-color="#ff9f5a"/></linearGradient>' +
    '<radialGradient id="blossom"><stop offset="0" stop-color="#ffe6ef"/><stop offset="1" stop-color="#ff9fc0"/></radialGradient>' +
    '<filter id="glowF" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3"/></filter>' +
    '</defs>';

  function waterfall(x, len, w) {
    var n = 7, s = '<g transform="translate(' + x + ' 16)">';
    s += '<rect x="' + (-w / 2) + '" y="0" width="' + w + '" height="' + len + '" rx="' + (w / 2) + '" fill="url(#wfBody)"/>';
    for (var i = 0; i < n; i++) {
      var lx = (-w / 2 + (i + 0.5) * w / n).toFixed(1), a = 10 + ((i * 7) % 9), b = 16 + ((i * 5) % 13);
      s += '<line class="wfl" x1="' + lx + '" y1="0" x2="' + lx + '" y2="' + (len * 0.93).toFixed(0) + '" stroke-dasharray="' + a + ' ' + b +
        '" style="--p:' + (a + b) + ';animation-duration:' + (0.9 + (i % 4) * 0.22).toFixed(2) + 's;animation-delay:-' + (i * 0.31).toFixed(2) + 's"/>';
    }
    s += '<ellipse class="mist" cx="0" cy="3" rx="' + (w * 0.95) + '" ry="' + (w * 0.3) + '" fill="url(#mist)"/>';
    s += '<ellipse class="mist" cx="0" cy="' + len + '" rx="' + (w * 1.9) + '" ry="' + (w * 0.7) + '" fill="url(#mist)" style="animation-delay:-1.4s"/>';
    for (var d = 0; d < 9; d++) {
      s += '<circle class="drop" r="' + (1.3 + Math.random() * 1.6).toFixed(1) + '" cx="' + ((Math.random() * 2 - 1) * w * 0.4).toFixed(1) + '" cy="0" style="--dx:' +
        ((Math.random() * 2 - 1) * w * 1.6).toFixed(1) + 'px;--len:' + (len * 0.95).toFixed(0) + ';animation-delay:-' + (Math.random() * 1.7).toFixed(2) + 's;animation-duration:' + (1.3 + Math.random() * 0.9).toFixed(2) + 's"/>';
    }
    return s + '</g>';
  }

  function temple(type) {
    var s = '<g transform="translate(0 -26)">';
    s += '<rect x="-72" y="-68" width="144" height="53" fill="url(#warmWin)" opacity=".95"/>';
    s += '<ellipse cx="0" cy="-42" rx="96" ry="42" fill="url(#warm)" opacity=".6" filter="url(#glowF)"/>';
    s += '<rect x="-98" y="-7" width="196" height="8" rx="2" fill="url(#marble)"/><rect x="-90" y="-15" width="180" height="8" rx="2" fill="url(#marble)"/>';
    for (var i = 0; i < 8; i++) {
      var cx = -77 + i * 22;
      s += '<rect x="' + (cx - 4.5) + '" y="-68" width="9" height="53" fill="url(#marble)"/><rect x="' + (cx - 6.5) + '" y="-71" width="13" height="4" fill="#fff6f4"/><rect x="' + (cx - 6.5) + '" y="-17" width="13" height="3" fill="#e5c2cf"/>';
    }
    s += '<rect x="-92" y="-83" width="184" height="12" fill="url(#marble)" stroke="#e5c2cf" stroke-width=".8"/>';
    if (type === 'dome') {
      s += '<rect x="-36" y="-102" width="72" height="19" fill="url(#marble)" stroke="#e5c2cf" stroke-width=".8"/>';
      s += '<path d="M-36,-102 C-36,-152 36,-152 36,-102Z" fill="url(#marble)" stroke="#e5c2cf" stroke-width=".8"/>';
      s += '<path d="M-20,-108 C-18,-130 -6,-140 0,-140" stroke="#fff" stroke-opacity=".7" stroke-width="3" fill="none" stroke-linecap="round"/>';
      s += '<line x1="0" y1="-148" x2="0" y2="-168" stroke="#f3d6a0" stroke-width="2.4"/><circle cx="0" cy="-170" r="3.4" fill="#ffe7a8"/>';
      s += '<rect x="-96" y="-98" width="28" height="15" fill="url(#marble)"/><path d="M-96,-98 C-96,-122 -68,-122 -68,-98Z" fill="url(#marble)"/>';
      s += '<rect x="68" y="-98" width="28" height="15" fill="url(#marble)"/><path d="M68,-98 C68,-122 96,-122 96,-98Z" fill="url(#marble)"/>';
    } else {
      s += '<path d="M-98,-83 L0,-122 L98,-83Z" fill="url(#marble)" stroke="#e5c2cf" stroke-width="1"/>';
      s += '<path d="M-74,-86 L0,-114 L74,-86Z" fill="#f4d4de" opacity=".75"/>';
      s += '<circle cx="0" cy="-98" r="6" fill="#ffe7a8" opacity=".9"/>';
    }
    for (var l = 0; l < 5; l++) s += '<circle cx="' + (-80 + l * 40) + '" cy="-4" r="2.6" fill="#ffd27a" filter="url(#glowF)"/>';
    return s + '</g>';
  }

  function blossomTree(x, k) {
    return '<g transform="translate(' + x + ' -24) scale(' + k + ')"><g class="sway">' +
      '<path d="M0,0 C1,-18 -3,-30 -5,-44 M-1,-22 C8,-32 14,-38 20,-46 M-3,-34 C-10,-40 -16,-44 -22,-46" stroke="#6b4150" stroke-width="5" stroke-linecap="round" fill="none"/>' +
      '<circle cx="-6" cy="-58" r="20" fill="url(#blossom)"/><circle cx="14" cy="-60" r="17" fill="#ffb3cc"/><circle cx="-24" cy="-52" r="15" fill="#ffc7da"/>' +
      '<circle cx="22" cy="-46" r="12" fill="#ff9fc0"/><circle cx="0" cy="-74" r="13" fill="#ffd5e3"/></g></g>';
  }
  function bush(x, k) {
    return '<g transform="translate(' + x + ' -24) scale(' + k + ')"><circle cx="0" cy="-8" r="14" fill="#5f9a78"/><circle cx="14" cy="-5" r="11" fill="#6fae85"/><circle cx="-13" cy="-4" r="10" fill="#4f8a6a"/>' +
      '<circle cx="4" cy="-16" r="4" fill="#ff9fc0"/><circle cx="-8" cy="-10" r="3" fill="#ffc7da"/></g>';
  }

  function island(o) {
    var sx = (o.flip ? -1 : 1) * o.s;
    var g = '<g transform="translate(' + o.x + ' ' + o.y + ') scale(' + sx + ' ' + o.s + ')"' + (o.far ? ' opacity=".82"' : '') + '>' +
      '<g class="floaty" style="animation-duration:' + o.dur + 's;animation-delay:-' + (o.delay || 0) + 's">';
    // rock body
    g += '<path d="M-178,2 C-186,30 -160,60 -128,88 C-104,112 -88,150 -58,186 C-38,214 -14,236 0,254 C14,236 38,214 58,186 C88,150 104,112 128,88 C160,60 186,30 178,2Z" fill="url(#rock)"/>';
    g += '<path d="M-178,2 C-186,30 -160,60 -128,88 C-104,112 -88,150 -58,186 C-38,214 -14,236 0,254 C14,236 38,214 58,186 C88,150 104,112 128,88 C160,60 186,30 178,2Z" fill="url(#rockLight)"/>';
    g += '<path d="M-120,56 C-92,100 -62,150 -30,204 M-62,38 C-42,88 -22,140 -8,196 M40,46 C52,100 42,150 30,206 M104,58 C92,100 72,142 50,192" stroke="#4d3862" stroke-opacity=".32" fill="none" stroke-width="3" stroke-linecap="round"/>';
    // hanging vines
    [-150, -108, 112, 152].forEach(function (vx, i) {
      g += '<path d="M' + vx + ',16 C' + (vx - 5) + ',34 ' + (vx + 5) + ',52 ' + vx + ',' + (62 + i * 6) + '" stroke="#5f9a78" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<circle cx="' + (vx + 3) + '" cy="' + (36 + i * 2) + '" r="4" fill="#6fae85"/><circle cx="' + (vx - 3) + '" cy="' + (52 + i * 3) + '" r="3.4" fill="#ff9fc0"/>';
    });
    if (o.wf) g += waterfall(o.wf.x, o.wf.len, o.wf.w);
    // grass lip
    g += '<path d="M-184,4 C-172,-14 -122,-30 -60,-33 C-20,-35 20,-35 60,-33 C122,-30 172,-14 184,4 C150,16 100,24 0,26 C-100,24 -150,16 -184,4Z" fill="url(#grass)"/>';
    if (!o.far) {
      g += blossomTree(-142, 1.05) + bush(-112, 1) + bush(122, .95) + blossomTree(150, .85);
    } else {
      g += blossomTree(-120, .9) + bush(128, .9);
    }
    g += temple(o.type);
    return g + '</g></g>';
  }

  var LAYOUTS = {
    land: { vb: '0 0 1600 900', par: 'xMidYMid slice', moon: { x: 800, y: 190, r: 108 }, islands: [
      { x: 1275, y: 292, s: 1.02, type: 'pediment', wf: { x: 96, len: 340, w: 32 }, dur: 9, delay: 0 },
      { x: 1338, y: 622, s: .72, type: 'dome', wf: { x: -86, len: 210, w: 24 }, dur: 11, delay: 3, flip: true },
      { x: 470, y: 418, s: .64, type: 'dome', wf: { x: 92, len: 270, w: 26 }, dur: 10, delay: 5 },
      { x: 1010, y: 470, s: .2, type: 'pediment', far: true, dur: 8, delay: 2 },
      { x: 236, y: 548, s: .2, type: 'dome', far: true, dur: 12, delay: 6 }
    ] },
    port: { vb: '0 0 600 1200', par: 'xMidYMin slice', moon: { x: 300, y: 215, r: 82 }, islands: [
      { x: 462, y: 430, s: .62, type: 'pediment', wf: { x: 96, len: 290, w: 30 }, dur: 9, delay: 0 },
      { x: 138, y: 735, s: .56, type: 'dome', wf: { x: 90, len: 230, w: 28 }, dur: 11, delay: 4 },
      { x: 470, y: 995, s: .48, type: 'pediment', wf: { x: -90, len: 190, w: 24 }, dur: 10, delay: 2, flip: true },
      { x: 250, y: 585, s: .17, type: 'dome', far: true, dur: 8, delay: 1 }
    ] }
  };

  var currentLayout = '';
  function buildScene() {
    var key = (innerWidth / innerHeight) < 0.95 ? 'port' : 'land';
    if (key === currentLayout) return;
    currentLayout = key;
    var L = LAYOUTS[key], svg = $('#sceneSvg'), m = L.moon, s = DEFS;
    svg.setAttribute('viewBox', L.vb);
    svg.setAttribute('preserveAspectRatio', L.par);
    // sparkles in the sky
    var vbw = key === 'land' ? 1600 : 600, vbh = key === 'land' ? 520 : 800;
    for (var i = 0; i < 26; i++) {
      s += '<circle class="twinkle" cx="' + rand(10, vbw - 10).toFixed(0) + '" cy="' + rand(10, vbh).toFixed(0) + '" r="' + rand(1, 2.2).toFixed(1) + '" fill="#fff" style="animation-delay:-' + rand(0, 3).toFixed(1) + 's;animation-duration:' + rand(2.4, 4.6).toFixed(1) + 's"/>';
    }
    // moon
    s += '<circle class="moon-glow" cx="' + m.x + '" cy="' + m.y + '" r="' + (m.r * 1.9) + '" fill="url(#moonGlow)"/>';
    s += '<circle cx="' + m.x + '" cy="' + m.y + '" r="' + m.r + '" fill="url(#moonG)" stroke="#fff" stroke-opacity=".55" stroke-width="2.5"/>';
    [[-.3, -.25, .22], [.25, .12, .3], [-.12, .38, .16], [.42, -.34, .13], [-.46, .1, .1]].forEach(function (c) {
      s += '<circle cx="' + (m.x + c[0] * m.r) + '" cy="' + (m.y + c[1] * m.r) + '" r="' + (c[2] * m.r) + '" fill="#d9a9bf" opacity=".26"/>';
    });
    // far islands first
    L.islands.filter(function (o) { return o.far; }).forEach(function (o) { s += island(o); });
    L.islands.filter(function (o) { return !o.far; }).forEach(function (o) { s += island(o); });
    svg.innerHTML = s;
  }
  buildScene();
  var rzT; addEventListener('resize', function () { clearTimeout(rzT); rzT = setTimeout(buildScene, 200); });

  /* =========================================================
     2. FRAME — marble columns, ivy, roses, cupids, laurels
     ========================================================= */
  function leaf(x, y, a, k, col) {
    return '<path d="M0,0 C6,-8 16,-8 22,0 C16,8 6,8 0,0Z" transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + a.toFixed(0) + ') scale(' + k.toFixed(2) + ')" fill="' + col + '"/>';
  }
  function buildColumn(el) {
    var greens = ['#4f8a5e', '#6fa774', '#3f7a58', '#5c9a6a'];
    var iv = '<g class="ivy-sway">';
    var strands = [{ x0: 126, y0: 118, h: 560, amp: 13 }, { x0: 140, y0: 150, h: 330, amp: 10 }];
    strands.forEach(function (st) {
      var d = 'M' + st.x0 + ',' + st.y0;
      for (var t = 0; t <= 1.001; t += 0.05) d += ' L' + (st.x0 + Math.sin(t * 10) * st.amp).toFixed(1) + ',' + (st.y0 + t * st.h).toFixed(1);
      iv += '<path d="' + d + '" stroke="#3f6b4f" stroke-width="2.4" fill="none" stroke-linejoin="round"/>';
      for (var j = 0; j < st.h / 15; j++) {
        var tt = j * 15 / st.h, px = st.x0 + Math.sin(tt * 10) * st.amp, py = st.y0 + j * 15;
        iv += leaf(px, py, rand(-70, 70) + (j % 2 ? 150 : -20), rand(.7, 1.25), greens[j % 4]);
        if (j % 9 === 4) iv += '<circle cx="' + (px + rand(-6, 6)).toFixed(1) + '" cy="' + py + '" r="4.6" fill="#ffb3cc"/><circle cx="' + px.toFixed(1) + '" cy="' + py + '" r="1.6" fill="#ff7fa8"/>';
      }
    });
    iv += '</g>';
    var flutes = '';
    for (var f = 0; f < 6; f++) flutes += '<line x1="' + (32 + f * 16) + '" y1="136" x2="' + (32 + f * 16) + '" y2="900" stroke="#b5788f" stroke-opacity=".28" stroke-width="3"/><line x1="' + (35 + f * 16) + '" y1="136" x2="' + (35 + f * 16) + '" y2="900" stroke="#fff" stroke-opacity=".55" stroke-width="2"/>';
    el.innerHTML = '<svg viewBox="0 0 170 900" preserveAspectRatio="none"><defs>' +
      '<linearGradient id="colG" x1="0" x2="1"><stop offset="0" stop-color="#fff8f5"/><stop offset=".55" stop-color="#f6dbe4"/><stop offset="1" stop-color="#d4a2b8"/></linearGradient></defs>' +
      '<rect x="20" y="130" width="104" height="780" fill="url(#colG)"/>' + flutes +
      '<rect x="4" y="68" width="136" height="18" rx="3" fill="url(#colG)" stroke="#dcb0c1"/>' +
      '<path d="M12,86 C12,116 34,124 40,132 L104,132 C110,124 132,116 132,86Z" fill="url(#colG)" stroke="#dcb0c1"/>' +
      '<circle cx="24" cy="104" r="13" fill="url(#colG)" stroke="#d3a3b7"/><circle cx="24" cy="104" r="6" fill="none" stroke="#c78fa8" stroke-width="2"/>' +
      '<circle cx="120" cy="104" r="13" fill="url(#colG)" stroke="#d3a3b7"/><circle cx="120" cy="104" r="6" fill="none" stroke="#c78fa8" stroke-width="2"/>' +
      '<rect x="14" y="128" width="116" height="8" rx="2" fill="url(#colG)" stroke="#dcb0c1"/>' + iv + '</svg>';
  }
  function rose(cx, cy, r) {
    var s = '<g class="rose-bob" style="animation-delay:-' + rand(0, 5).toFixed(1) + 's"><g transform="translate(' + cx + ' ' + cy + ')">';
    var i;
    for (i = 0; i < 5; i++) s += leaf(0, 0, i * 72 + rand(-14, 14) - 20, r / 15, i % 2 ? '#3f7a58' : '#4f8a5e');
    for (i = 0; i < 6; i++) s += '<ellipse cx="0" cy="' + (-r * .42).toFixed(1) + '" rx="' + (r * .52).toFixed(1) + '" ry="' + (r * .56).toFixed(1) + '" transform="rotate(' + (i * 60 + rand(-8, 8)).toFixed(0) + ')" fill="url(#rA)" stroke="#9c1747" stroke-opacity=".35"/>';
    for (i = 0; i < 5; i++) s += '<ellipse cx="0" cy="' + (-r * .28).toFixed(1) + '" rx="' + (r * .36).toFixed(1) + '" ry="' + (r * .4).toFixed(1) + '" transform="rotate(' + (i * 72 + 18) + ')" fill="url(#rB)" stroke="#8c1040" stroke-opacity=".35"/>';
    for (i = 0; i < 4; i++) s += '<ellipse cx="0" cy="' + (-r * .14).toFixed(1) + '" rx="' + (r * .22).toFixed(1) + '" ry="' + (r * .26).toFixed(1) + '" transform="rotate(' + (i * 90 + 30) + ')" fill="url(#rC)"/>';
    s += '<path d="M' + (-r * .09).toFixed(1) + ',0 a' + (r * .09).toFixed(1) + ',' + (r * .09).toFixed(1) + ' 0 1,1 ' + (r * .18).toFixed(1) + ',0 a' + (r * .14).toFixed(1) + ',' + (r * .14).toFixed(1) + ' 0 1,1 ' + (-r * .26).toFixed(1) + ',' + (-r * .04).toFixed(1) + '" fill="none" stroke="#6d0c33" stroke-opacity=".65" stroke-width="1.3"/>';
    return s + '</g></g>';
  }
  function buildRoses(el) {
    var s = '<svg viewBox="0 0 500 300"><defs>' +
      '<radialGradient id="rA" cx=".5" cy=".7"><stop offset="0" stop-color="#ff9ec0"/><stop offset="1" stop-color="#e0407a"/></radialGradient>' +
      '<radialGradient id="rB" cx=".5" cy=".7"><stop offset="0" stop-color="#ff6f9f"/><stop offset="1" stop-color="#c2185b"/></radialGradient>' +
      '<radialGradient id="rC" cx=".5" cy=".7"><stop offset="0" stop-color="#e03a73"/><stop offset="1" stop-color="#7d0f3a"/></radialGradient>' +
      '<linearGradient id="ledge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff7f5"/><stop offset="1" stop-color="#e7c3d0"/></linearGradient></defs>';
    s += '<path d="M-10,262 L360,250 L330,320 L-10,320Z" fill="url(#ledge)" opacity=".96"/><path d="M-10,262 L360,250" stroke="#fff" stroke-width="3" opacity=".8"/>';
    var spots = [[40, 120, 22], [86, 176, 26], [30, 214, 34], [120, 236, 40], [200, 258, 30], [62, 262, 44], [150, 196, 24], [262, 270, 22], [14, 70, 18]];
    for (var i = 0; i < 16; i++) s += leaf(rand(-10, 280), rand(190, 280), rand(-170, 10), rand(1.4, 2.2), i % 2 ? '#3f7a58' : '#56926a');
    spots.forEach(function (p) { s += rose(p[0], p[1], p[2]); });
    el.innerHTML = s + '</svg>';
  }

  function cupidSVG() {
    var M = 'url(#cupM)', O = '#c08aa3';
    function el(cx, cy, rx, ry, rot) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '"' + (rot ? ' transform="rotate(' + rot + ' ' + cx + ' ' + cy + ')"' : '') + '/>'; }
    return '<svg viewBox="0 0 270 240"><defs><linearGradient id="cupM" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffefd"/><stop offset=".55" stop-color="#fbe7ee"/><stop offset="1" stop-color="#e2b5c8"/></linearGradient>' +
      '<filter id="cg" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="5"/></filter></defs><g class="bob">' +
      // wings
      '<g fill="' + M + '" stroke="' + O + '" stroke-width="1.5" stroke-linejoin="round">' +
      '<path d="M120,106 C100,56 58,34 16,44 C32,48 40,56 38,66 C24,64 14,72 22,84 C10,88 10,100 24,104 C18,114 28,124 42,120 C62,128 94,126 120,118Z"/>' +
      '<path d="M124,116 C108,94 78,86 48,94 C58,98 60,104 55,110 C46,110 42,119 52,124 C72,128 102,128 124,124Z"/></g>' +
      '<path d="M56,56 C80,68 102,90 116,108 M38,72 C64,82 90,102 112,118 M28,90 C56,100 84,112 110,122" stroke="#d6a6bc" stroke-width="1.5" fill="none"/>' +
      // back leg
      '<g fill="' + M + '" stroke="' + O + '" stroke-width="1.5">' + el(112, 158, 12, 22, 20) + el(100, 186, 9.5, 18, 35) + el(90, 201, 9.5, 5.5, 30) +
      // torso
      el(124, 128, 27, 34, -8) +
      // front leg
      el(140, 160, 12, 22, -30) + el(164, 177, 9.5, 17, -55) + el(179, 187, 9.5, 5.5, -35) + '</g>' +
      '<path d="M98,146 C112,178 148,178 158,148 C142,162 114,162 98,146Z" fill="#ffc9db" stroke="#e48fb0" stroke-width="1.3"/>' +
      '<path d="M108,104 C122,118 136,134 150,152" stroke="#ffb3cc" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>' +
      // hair + head
      '<g fill="#fff0ec" stroke="' + O + '" stroke-width="1.4"><circle cx="124" cy="63" r="10.5"/><circle cx="139" cy="55" r="10.5"/><circle cx="155" cy="60" r="10"/><circle cx="119" cy="80" r="9.5"/><circle cx="160" cy="77" r="8"/></g>' +
      '<circle cx="140" cy="82" r="25" fill="' + M + '" stroke="' + O + '" stroke-width="1.5"/>' +
      '<g fill="#fff0ec" stroke="' + O + '" stroke-width="1.3"><circle cx="130" cy="62" r="6.5"/><circle cx="144" cy="59" r="6.5"/><circle cx="156" cy="64" r="5.5"/></g>' +
      '<path d="M146,82 q4.5,-5 9,0" stroke="#a9607d" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="156" cy="92" r="5" fill="#ff9fbd" opacity=".55"/><path d="M147,96 q4.5,3.5 9,0" stroke="#d1698f" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
      // arms
      '<g fill="' + M + '" stroke="' + O + '" stroke-width="1.5">' + el(180, 104, 44, 9, -4) + '<circle cx="224" cy="101" r="8"/>' + el(137, 103, 19, 8.5, -55) + '<circle cx="146" cy="92" r="7.5"/></g>' +
      // bow, string, arrow
      '<path d="M206,48 C238,84 238,122 206,156" stroke="#f0c878" stroke-width="5.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M206,48 L146,92 L206,156" stroke="#fff" stroke-width="1.8" fill="none"/>' +
      '<line x1="146" y1="92" x2="248" y2="101" stroke="#f0c878" stroke-width="3.2" stroke-linecap="round"/>' +
      '<path d="M146,92 l-13,-7 M146,92 l-13,9 M153,93 l-11,-7 M153,93 l-11,9" stroke="#ff9fbd" stroke-width="2.6" stroke-linecap="round"/>' +
      '<g class="arrow-glow"><circle cx="254" cy="101" r="10" fill="#ff7fa8" filter="url(#cg)"/></g>' +
      '<path d="M254,110 C243,103 241,95 247,92 C250,91 253,93 254,96 C255,93 258,91 261,92 C267,95 265,103 254,110Z" fill="#ff5c93" stroke="#fff" stroke-width="1.1"/>' +
      '</g></svg>';
  }
  function laurelSVG() {
    var P = [[74, 96], [22, 84], [8, 40], [36, 6]];
    function bez(t) {
      var u = 1 - t;
      return {
        x: u * u * u * P[0][0] + 3 * u * u * t * P[1][0] + 3 * u * t * t * P[2][0] + t * t * t * P[3][0],
        y: u * u * u * P[0][1] + 3 * u * u * t * P[1][1] + 3 * u * t * t * P[2][1] + t * t * t * P[3][1]
      };
    }
    var s = '<svg viewBox="0 0 100 100"><defs><linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3c9"/><stop offset="1" stop-color="#e1b765"/></linearGradient></defs>';
    s += '<path d="M' + P[0] + ' C' + P[1] + ' ' + P[2] + ' ' + P[3] + '" fill="none" stroke="#d8ab5a" stroke-width="1.6" stroke-linecap="round"/>';
    for (var i = 0; i < 9; i++) {
      var t = 0.06 + i * 0.105, p = bez(t), q = bez(Math.min(1, t + 0.02)), ang = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI, k = 0.9 + (1 - Math.abs(t - .5)) * .6;
      [-1, 1].forEach(function (side) {
        s += '<path d="M0,0 C4,-5.5 11,-5.5 16,0 C11,5.5 4,5.5 0,0Z" transform="translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') rotate(' + (ang + side * 50).toFixed(0) + ') scale(' + k.toFixed(2) + ')" fill="url(#gold)" stroke="#c9a04e" stroke-width=".4"/>';
      });
    }
    return s + '</svg>';
  }

  $$('.frame').forEach(buildColumn);
  $$('.roses').forEach(buildRoses);
  $$('.cupid').forEach(function (e) { e.innerHTML = cupidSVG(); });
  $$('.laurel').forEach(function (e) { e.innerHTML = laurelSVG(); });

  /* ---------- flying birds ---------- */
  (function birds() {
    var layer = $('#birdLayer'), n = innerWidth < 700 ? 4 : 7;
    for (var i = 0; i < n; i++) {
      var t = rand(30, 55), d = document.createElement('div');
      d.className = 'bird';
      d.style.setProperty('--y', rand(6, 46).toFixed(0) + '%');
      d.style.setProperty('--s', rand(26, 58).toFixed(0) + 'px');
      d.style.setProperty('--t', t.toFixed(0) + 's');
      d.style.setProperty('--dl', '-' + rand(0, t).toFixed(1) + 's');
      var dur = rand(.55, .9).toFixed(2);
      d.innerHTML = '<svg viewBox="0 0 44 22"><path fill="none" stroke="#5b2a49" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M2,14 Q12,2 22,13 Q32,2 42,14">' +
        '<animate attributeName="d" dur="' + dur + 's" repeatCount="indefinite" values="M2,14 Q12,2 22,13 Q32,2 42,14;M2,8 Q12,10 22,13 Q32,10 42,8;M2,14 Q12,2 22,13 Q32,2 42,14"/></path></svg>';
      layer.appendChild(d);
    }
  })();

  /* =========================================================
     3. FX CANVAS — cherry blossoms, rose petals, sparkles, hearts
     ========================================================= */
  var FX = (function () {
    var cv = $('#fx'), g = cv.getContext('2d'), W = 0, H = 0;
    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize(); addEventListener('resize', resize);

    function sprite(stops) {
      var s = 72, c = document.createElement('canvas'); c.width = c.height = s;
      var x = c.getContext('2d'); x.translate(s / 2, s / 2);
      var r = s * .42, gr = x.createLinearGradient(0, -r, 0, r);
      stops.forEach(function (a) { gr.addColorStop(a[0], a[1]); });
      x.fillStyle = gr; x.shadowColor = 'rgba(255,140,180,.55)'; x.shadowBlur = 6;
      x.beginPath(); x.moveTo(0, -r);
      x.bezierCurveTo(r * .95, -r * .62, r * .92, r * .72, r * .2, r);
      x.quadraticCurveTo(0, r * .72, -r * .2, r);
      x.bezierCurveTo(-r * .92, r * .72, -r * .95, -r * .62, 0, -r);
      x.fill(); x.shadowBlur = 0;
      x.strokeStyle = 'rgba(255,255,255,.42)'; x.lineWidth = 1.4;
      x.beginPath(); x.moveTo(0, -r * .9); x.lineTo(0, r * .35); x.stroke();
      return c;
    }
    var SP = [
      sprite([[0, '#fff6f9'], [.5, '#ffc7da'], [1, '#ff9fc0']]),
      sprite([[0, '#ffffff'], [.6, '#ffdbe7'], [1, '#ffb3cc']]),
      sprite([[0, '#ff7aa6'], [.6, '#e0306f'], [1, '#a3124e']])
    ];

    function mkPetal(init) {
      var rose = Math.random() < .16;
      return {
        img: rose ? SP[2] : SP[Math.random() < .5 ? 0 : 1],
        x: rand(-40, W + 40), y: init ? rand(-20, H) : rand(-60, -20),
        size: rose ? rand(11, 17) : rand(12, 24), vy: rand(.55, 1.35), vx: rand(-.15, .45),
        sway: rand(.6, 1.7), phase: rand(0, 6.28), amp: rand(.25, 1), rot: rand(0, 6.28), vr: rand(-.025, .025),
        flip: rand(0, 6.28), vf: rand(.025, .07), a: rand(.7, 1)
      };
    }
    var N = reduceMotion ? 14 : (innerWidth < 700 ? 26 : 58);
    var petals = []; for (var i = 0; i < N; i++) petals.push(mkPetal(true));
    var sparks = []; for (i = 0; i < (innerWidth < 700 ? 16 : 34); i++) sparks.push({ x: rand(0, 1), y: rand(0, 1), s: rand(2, 5), p: rand(0, 6.28), v: rand(.6, 1.6) });
    var bursts = [], hearts = [];
    var ptr = { x: -999, y: -999, on: false }, ptrT;
    addEventListener('pointermove', function (e) {
      ptr.x = e.clientX; ptr.y = e.clientY; ptr.on = true; clearTimeout(ptrT); ptrT = setTimeout(function () { ptr.on = false; }, 700);
      if (e.pointerType === 'mouse' && Math.random() < .07 && !reduceMotion) hearts.push({ x: e.clientX, y: e.clientY, vx: rand(-.3, .3), vy: rand(-.9, -.4), s: rand(3, 6), life: 1, c: Math.random() < .5 ? '#ff7fa8' : '#ffc2d6' });
    }, { passive: true });

    function star(x, y, s) {
      g.beginPath(); g.moveTo(x, y - s); g.quadraticCurveTo(x, y, x + s, y); g.quadraticCurveTo(x, y, x, y + s);
      g.quadraticCurveTo(x, y, x - s, y); g.quadraticCurveTo(x, y, x, y - s); g.fill();
    }
    function heart(x, y, s, col, a) {
      g.globalAlpha = a; g.fillStyle = col; g.beginPath(); g.moveTo(x, y + s * .35);
      g.bezierCurveTo(x - s * 1.1, y - s * .3, x - s * .6, y - s * 1.1, x, y - s * .45);
      g.bezierCurveTo(x + s * .6, y - s * 1.1, x + s * 1.1, y - s * .3, x, y + s * .35); g.fill();
    }
    function drawP(img, x, y, size, rot, flip, a) {
      g.globalAlpha = a; g.save(); g.translate(x, y); g.rotate(rot); g.scale(.3 + .7 * Math.abs(Math.cos(flip)), 1);
      g.drawImage(img, -size / 2, -size / 2, size, size); g.restore();
    }

    var last = performance.now();
    function frame(now) {
      var dt = Math.min(2.5, (now - last) / 16.667); last = now;
      g.clearRect(0, 0, W, H);
      var t = now / 1000, wind = Math.sin(t * .35) * .3 + .45;
      // sparkles
      g.fillStyle = '#fff';
      sparks.forEach(function (p) { var a = .25 + .75 * Math.abs(Math.sin(t * p.v + p.p)); g.globalAlpha = a * .85; star(p.x * W, p.y * H, p.s * (.6 + a * .6)); });
      // ambient petals
      petals.forEach(function (p, idx) {
        p.phase += .012 * p.sway * dt;
        p.x += (p.vx + wind * .9 + Math.sin(p.phase) * p.amp) * dt;
        p.y += p.vy * dt; p.rot += p.vr * dt; p.flip += p.vf * dt;
        if (ptr.on && !reduceMotion) {
          var dx = p.x - ptr.x, dy = p.y - ptr.y, d2 = dx * dx + dy * dy;
          if (d2 < 15000) { var f = (1 - d2 / 15000) * 2.4, d = Math.sqrt(d2) + 1; p.x += dx / d * f * dt; p.y += dy / d * f * dt * .6; p.vr += (dx > 0 ? 1 : -1) * .0006; }
        }
        if (p.y > H + 30 || p.x > W + 50) { var np = mkPetal(false); if (p.x > W + 50) { np.x = -30; np.y = rand(-20, H * .6); } petals[idx] = np; return; }
        drawP(p.img, p.x, p.y, p.size, p.rot, p.flip, p.a);
      });
      // burst petals
      for (var i = bursts.length - 1; i >= 0; i--) {
        var b = bursts[i]; b.vy += .045 * dt; b.vx *= Math.pow(.985, dt); b.vy *= Math.pow(.992, dt);
        b.x += (b.vx + Math.sin(b.life * 9 + b.ph) * .5) * dt; b.y += b.vy * dt; b.rot += b.vr * dt; b.flip += b.vf * dt; b.life -= b.fade * dt;
        if (b.life <= 0 || b.y > H + 40) { bursts.splice(i, 1); continue; }
        drawP(b.img, b.x, b.y, b.size, b.rot, b.flip, Math.min(1, b.life * 1.6));
      }
      // hearts
      for (i = hearts.length - 1; i >= 0; i--) {
        var h = hearts[i]; h.x += h.vx * dt + Math.sin(h.life * 8) * .3; h.y += h.vy * dt; h.life -= .012 * dt;
        if (h.life <= 0) { hearts.splice(i, 1); continue; }
        heart(h.x, h.y, h.s, h.c, Math.min(1, h.life * 1.4));
      }
      g.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    return {
      burst: function (x, y, n) {
        n = reduceMotion ? Math.ceil(n / 3) : n;
        for (var k = 0; k < n; k++) {
          var a = rand(0, 6.28), sp = rand(2, 7.5);
          bursts.push({ img: SP[Math.random() < .2 ? 2 : (Math.random() < .5 ? 0 : 1)], x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2, size: rand(12, 26), rot: rand(0, 6.28), vr: rand(-.1, .1), flip: rand(0, 6), vf: rand(.05, .12), life: rand(.9, 1.6), fade: .006, ph: rand(0, 6) });
        }
        this.hearts(x, y, Math.ceil(n / 4));
      },
      hearts: function (x, y, n) {
        for (var k = 0; k < n; k++) hearts.push({ x: x + rand(-14, 14), y: y + rand(-8, 8), vx: rand(-.7, .7), vy: rand(-1.8, -.7), s: rand(5, 11), life: rand(.8, 1.3), c: ['#ff5c93', '#ff7fa8', '#ffb0cb', '#fff'][Math.floor(Math.random() * 4)] });
      },
      rain: function (n) {
        n = reduceMotion ? Math.ceil(n / 3) : n;
        for (var k = 0; k < n; k++) bursts.push({ img: SP[Math.random() < .25 ? 2 : (Math.random() < .5 ? 0 : 1)], x: rand(0, W), y: rand(-200, -20), vx: rand(-.3, .9), vy: rand(1.2, 3), size: rand(14, 26), rot: rand(0, 6.28), vr: rand(-.05, .05), flip: rand(0, 6), vf: rand(.04, .1), life: rand(2.4, 3.6), fade: .0032, ph: rand(0, 6) });
      }
    };
  })();

  document.addEventListener('pointerdown', function (e) {
    if (e.target.closest('button,a,input,.modal,.dock,.nav')) return;
    FX.hearts(e.clientX, e.clientY, 5);
  });

  /* =========================================================
     4. SOUND — your song + synthesized birds & waterfall
     ========================================================= */
  var Snd = (function () {
    var ctx, master, birdBus, water, natureOn = true, musicOn = true, chirpT, started = false, songBad = false;
    var song = new Audio(); song.loop = true; song.preload = 'auto'; song.volume = 0;
    song.src = C.songPath || 'audio/our-song.mp3';
    var dock = { music: $('#musicBtn'), nature: $('#natureBtn'), pick: $('#pickBtn'), file: $('#songFile') };

    song.addEventListener('error', function () {
      songBad = true; dock.pick.hidden = false; dock.music.classList.add('off');
      var h = $('#gateHint'); h.hidden = false;
      h.textContent = 'No song found at “' + (C.songPath || 'audio/our-song.mp3') + '” yet — after you enter, tap the folder button to pick one.';
    });
    song.addEventListener('playing', function () { songBad = false; dock.music.classList.remove('off'); dock.music.classList.add('playing'); });
    song.addEventListener('pause', function () { dock.music.classList.remove('playing'); });

    function fadeSong(to, ms) {
      var from = song.volume, t0 = performance.now();
      (function step(now) {
        var k = Math.min(1, (now - t0) / ms); song.volume = Math.max(0, Math.min(1, from + (to - from) * k));
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    }

    function init() {
      if (ctx) return;
      var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      ctx = new AC();
      master = ctx.createGain(); master.gain.value = 1; master.connect(ctx.destination);
      var delay = ctx.createDelay(); delay.delayTime.value = .17;
      var fb = ctx.createGain(); fb.gain.value = .27; var wet = ctx.createGain(); wet.gain.value = .32;
      birdBus = ctx.createGain(); birdBus.gain.value = natureOn ? 1 : 0;
      birdBus.connect(master); birdBus.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(master);
      // waterfall = softly filtered pink noise
      var len = ctx.sampleRate * 3, buf = ctx.createBuffer(2, len, ctx.sampleRate);
      for (var ch = 0; ch < 2; ch++) {
        var d = buf.getChannelData(ch), b0 = 0, b1 = 0, b2 = 0;
        for (var i = 0; i < len; i++) { var w = Math.random() * 2 - 1; b0 = .99765 * b0 + w * .099046; b1 = .963 * b1 + w * .2965164; b2 = .57 * b2 + w * 1.0526913; d[i] = (b0 + b1 + b2 + w * .1848) * .11; }
      }
      var src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
      var bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 950; bp.Q.value = .35;
      var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3600;
      water = ctx.createGain(); water.gain.value = 0;
      src.connect(bp); bp.connect(lp); lp.connect(water); water.connect(master); src.start();
      var lfo = ctx.createOscillator(); lfo.frequency.value = .17; var lg = ctx.createGain(); lg.gain.value = .05;
      lfo.connect(lg); lg.connect(water.gain); lfo.start();
    }

    function chirp() {
      if (!ctx || !natureOn || ctx.state !== 'running') return;
      var kind = Math.random(), t = ctx.currentTime + .02;
      var pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      var out = ctx.createGain(); out.gain.value = rand(.05, .11);
      if (pan) { pan.pan.value = rand(-.9, .9); out.connect(pan); pan.connect(birdBus); } else out.connect(birdBus);
      var base = rand(2300, 4300), i;
      if (kind < .5) {                        // tweet-tweet
        var n = 2 + Math.floor(Math.random() * 4);
        for (i = 0; i < n; i++) {
          var dur = rand(.05, .11), f1 = base * rand(.92, 1.15), f2 = f1 * (Math.random() < .5 ? 1.4 : .72);
          note(f1, f2, t, dur, out); t += dur + rand(.04, .09);
        }
      } else if (kind < .8) {                 // trill
        var o = ctx.createOscillator(), m = ctx.createOscillator(), mg = ctx.createGain(), e = ctx.createGain(), d2 = rand(.35, .7);
        o.type = 'sine'; o.frequency.setValueAtTime(base, t); o.frequency.linearRampToValueAtTime(base * rand(.85, 1.25), t + d2);
        m.frequency.value = rand(20, 34); mg.gain.value = rand(240, 520); m.connect(mg); mg.connect(o.frequency);
        e.gain.setValueAtTime(.0001, t); e.gain.exponentialRampToValueAtTime(1, t + .05); e.gain.exponentialRampToValueAtTime(.0001, t + d2);
        o.connect(e); e.connect(out); o.start(t); m.start(t); o.stop(t + d2 + .05); m.stop(t + d2 + .05);
      } else {                                // soft two-note call
        var low = rand(1300, 1900);
        note(low * 1.25, low * 1.1, t, .16, out); note(low, low * .8, t + .26, .22, out);
      }
    }
    function note(f1, f2, t, dur, out) {
      var o = ctx.createOscillator(), e = ctx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(Math.max(200, f2), t + dur);
      e.gain.setValueAtTime(.0001, t); e.gain.exponentialRampToValueAtTime(1, t + .012); e.gain.exponentialRampToValueAtTime(.0001, t + dur);
      o.connect(e); e.connect(out); o.start(t); o.stop(t + dur + .03);
    }
    function loop() {
      clearTimeout(chirpT);
      if (!natureOn) return;
      var n = Math.random() < .35 ? 2 + Math.floor(Math.random() * 2) : 1;
      for (var i = 0; i < n; i++) setTimeout(chirp, i * rand(220, 650));
      chirpT = setTimeout(loop, rand(1600, 4800));
    }

    function applyNature() {
      if (!ctx) return;
      var now = ctx.currentTime;
      birdBus.gain.setTargetAtTime(natureOn ? 1 : 0, now, .3);
      water.gain.setTargetAtTime(natureOn ? .55 : 0, now, .6);
      if (natureOn) loop(); else clearTimeout(chirpT);
    }
    function setMusic(on) {
      musicOn = on;
      dock.music.classList.toggle('off', !on);
      if (on) { var p = song.play(); if (p && p.catch) p.catch(function () { }); fadeSong(.9, 2500); }
      else { fadeSong(0, 500); setTimeout(function () { if (!musicOn) song.pause(); }, 550); }
    }
    function setNature(on) {
      natureOn = on; dock.nature.classList.toggle('off', !on); applyNature();
    }

    dock.music.addEventListener('click', function () {
      if (!started) return;
      if (songBad) { dock.file.click(); return; }
      setMusic(!musicOn);
    });
    dock.nature.addEventListener('click', function () { if (started) setNature(!natureOn); });
    dock.pick.addEventListener('click', function () { dock.file.click(); });
    dock.file.addEventListener('change', function () {
      var f = dock.file.files && dock.file.files[0]; if (!f) return;
      song.src = URL.createObjectURL(f); songBad = false; musicOn = true; dock.music.classList.remove('off');
      var p = song.play(); if (p && p.catch) p.catch(function () { }); fadeSong(.9, 2000);
    });

    return {
      start: function () {
        if (started) return; started = true;
        try { init(); if (ctx && ctx.state === 'suspended') ctx.resume(); applyNature(); } catch (e) { }
        if (!songBad) { var p = song.play(); if (p && p.catch) p.catch(function () { }); fadeSong(.9, 3500); }
      }
    };
  })();

  /* =========================================================
     5. PAGE: gate, nav, reveal, gallery, story, rituals, match
     ========================================================= */
  var body = document.body;
  $('#enterBtn').addEventListener('click', function () {
    body.classList.add('entered'); body.classList.remove('locked');
    Snd.start(); FX.burst(innerWidth / 2, innerHeight / 2, 46); FX.rain(26);
    window.scrollTo(0, 0);
  });

  // nav
  var burger = $('#burger'), links = $('#navLinks');
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('open'); burger.setAttribute('aria-expanded', open);
  });
  $$('#navLinks a').forEach(function (a) { a.addEventListener('click', function () { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }); });
  var secs = $$('main section'), navA = $$('#navLinks a[data-sec]');
  function setActive() {
    var y = innerHeight * .4, cur = 'home';
    secs.forEach(function (s) { if (s.getBoundingClientRect().top <= y) cur = s.id; });
    if (cur === 'forever') cur = 'match';
    navA.forEach(function (a) { a.classList.toggle('active', a.dataset.sec === cur); });
  }
  addEventListener('scroll', setActive, { passive: true }); setActive();

  // reveal on scroll
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); if (e.target.classList.contains('match')) countUp(); } });
  }, { threshold: .18 });
  function watch() { $$('.reveal').forEach(function (el) { io.observe(el); }); }

  // days together
  var start = new Date((C.startDate || '2026-07-17') + 'T00:00:00');
  function monthsBetween(a, b) { var m = (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth(); if (b.getDate() < a.getDate()) m--; return Math.max(0, m); }
  (function heroCount() {
    var now = new Date(), days = Math.max(0, Math.floor((now - start) / 864e5)), m = monthsBetween(start, now);
    $('#heroCount').textContent = '♥  ' + m + ' month' + (m === 1 ? '' : 's') + ' · ' + days + ' days of us  ♥';
  })();
  (function counter() {
    function pad(n) { return String(n); }
    function tick() {
      var d = Math.max(0, Date.now() - start.getTime()), s = Math.floor(d / 1000);
      $('#cDays').textContent = pad(Math.floor(s / 86400)); $('#cHours').textContent = pad(Math.floor(s % 86400 / 3600));
      $('#cMins').textContent = pad(Math.floor(s % 3600 / 60)); $('#cSecs').textContent = pad(s % 60);
    }
    tick(); setInterval(tick, 1000);
  })();

  // gallery + lightbox
  var photos = C.photos || [], gal = $('#gallery'), lbI = 0;
  photos.forEach(function (p, i) {
    var b = document.createElement('button'); b.className = 'photo reveal'; b.type = 'button'; b.style.setProperty('--rd', (i % 4) * .12 + 's');
    b.setAttribute('aria-label', 'Open photo: ' + p.caption);
    b.innerHTML = '<div class="pf"><img loading="lazy" alt=""><span class="cap"></span></div>';
    $('img', b).src = p.src; $('img', b).alt = p.caption; $('.cap', b).textContent = p.caption;
    b.addEventListener('click', function () { openLB(i); });
    gal.appendChild(b);
  });
  var lb = $('#lightbox');
  function showLB() { $('#lbImg').src = photos[lbI].src; $('#lbImg').alt = photos[lbI].caption; $('#lbCap').textContent = photos[lbI].caption; }
  function openLB(i) { lbI = i; showLB(); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); FX.hearts(innerWidth / 2, innerHeight / 2, 8); }
  function stepLB(d) { lbI = (lbI + d + photos.length) % photos.length; showLB(); }
  $('#lbPrev').addEventListener('click', function (e) { e.stopPropagation(); stepLB(-1); });
  $('#lbNext').addEventListener('click', function (e) { e.stopPropagation(); stepLB(1); });
  var tx = 0;
  lb.addEventListener('touchstart', function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) stepLB(dx < 0 ? 1 : -1); }, { passive: true });

  // modals
  function closeModals() { $$('.modal.open').forEach(function (m) { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); }); }
  $$('.modal').forEach(function (m) { m.addEventListener('click', function (e) { if (e.target === m) closeModals(); }); });
  $$('[data-close]').forEach(function (b) { b.addEventListener('click', closeModals); });
  addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModals();
    if (lb.classList.contains('open')) { if (e.key === 'ArrowLeft') stepLB(-1); if (e.key === 'ArrowRight') stepLB(1); }
  });

  // love letter
  var letter = $('#letter');
  var lbody = $('#letterBody');
  (C.letter || []).forEach(function (t, i) {
    var p = document.createElement('p'); p.style.setProperty('--i', i);
    p.textContent = t.replace(/\{her\}/g, C.herName).replace(/\{you\}/g, C.yourName); lbody.appendChild(p);
  });
  $$('[data-open-letter]').forEach(function (b) {
    b.addEventListener('click', function () {
      links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
      letter.classList.remove('open'); void letter.offsetWidth;
      letter.classList.add('open'); letter.setAttribute('aria-hidden', 'false'); FX.rain(18);
    });
  });

  // love stories timeline
  var tl = $('#timeline'), roman = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  var line = document.createElement('div'); line.className = 'tl-line'; tl.appendChild(line);
  (C.chapters || []).forEach(function (c, i) {
    var d = new Date(start); d.setMonth(d.getMonth() + i);
    var el = document.createElement('div'); el.className = 'chapter reveal' + (i % 2 ? ' right' : '');
    el.innerHTML = '<span class="node"><svg><use href="#i-heart"/></svg></span><div class="glass"><div class="when"></div><h3></h3><p></p></div>';
    $('.when', el).textContent = 'Month ' + (roman[i] || (i + 1)) + ' · ' + d.toLocaleDateString('en', { month: 'short', year: 'numeric' });
    $('h3', el).textContent = c.title; $('p', el).textContent = c.text;
    tl.appendChild(el);
  });

  // rituals
  function lantern(text) {
    var el = document.createElement('div'); el.className = 'lantern';
    el.style.left = rand(10, 82) + 'vw'; el.style.setProperty('--dx', rand(-70, 70) + 'px'); el.style.setProperty('--t', rand(10, 14) + 's');
    el.appendChild(document.createElement('i'));
    if (text) { var s = document.createElement('span'); s.textContent = text; el.appendChild(s); }
    document.body.appendChild(el);
    el.addEventListener('animationend', function (e) { if (e.target === el) el.remove(); });
  }
  $('#wishForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var inp = $('#wishInput'), v = inp.value.trim();
    lantern(v || 'Forever with you'); inp.value = '';
    if (!v) lantern(''); FX.hearts(innerWidth / 2, innerHeight * .8, 6);
  });
  var blessed = 0;
  $('#blessBtn').addEventListener('click', function (e) {
    blessed++; FX.rain(60); FX.burst(e.clientX, e.clientY, 22);
    $('#blessNote').textContent = 'Blessings sent: ' + blessed + ' ✦';
  });
  var vowI = -1;
  $('#vowBtn').addEventListener('click', function (e) {
    var v = C.vows || []; if (!v.length) return;
    var i; do { i = Math.floor(Math.random() * v.length); } while (v.length > 1 && i === vowI); vowI = i;
    var el = $('#vowText'); el.classList.remove('show');
    setTimeout(function () { el.textContent = '“' + v[i] + '”'; el.classList.add('show'); }, 250);
    FX.hearts(e.clientX, e.clientY, 8);
  });

  // find your match
  (function constellation() {
    var N = 18, pts = [], i;
    for (i = 0; i < N; i++) {
      var t = i / N * Math.PI * 2, x = 16 * Math.pow(Math.sin(t), 3), y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      pts.push([200 + x * 10.5, 170 + y * 10.5]);
    }
    var s = '<svg viewBox="0 0 400 380"><defs><linearGradient id="cnG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd0e0"/><stop offset="1" stop-color="#ff7fa8"/></linearGradient></defs>';
    s += '<path class="cn-line" d="M' + pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' L') + ' Z"/>';
    pts.forEach(function (p, k) { s += '<circle class="cn-star" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (k % 3 === 0 ? 5 : 3.4) + '" style="--sd:' + (.4 + k * .22).toFixed(2) + 's"/>'; });
    for (i = 0; i < 22; i++) s += '<circle class="twinkle" cx="' + rand(10, 390).toFixed(0) + '" cy="' + rand(10, 370).toFixed(0) + '" r="' + rand(.8, 1.8).toFixed(1) + '" fill="#fff" style="animation-delay:-' + rand(0, 3).toFixed(1) + 's"/>';
    s += '<path class="twinkle" d="M200,196 C176,176 176,150 192,148 C198,147 200,152 200,156 C200,152 202,147 208,148 C224,150 224,176 200,196Z" fill="#ff7fa8" style="animation-duration:1.6s"/>';
    $('#constellation').innerHTML = s + '</svg>';
  })();
  var counted = false;
  function countUp() {
    if (counted) return; counted = true;
    var el = $('#meterNum'), t0 = performance.now(), dur = 2600;
    (function step(now) {
      var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(e * 100); if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  $('#destinyBtn').addEventListener('click', function (e) {
    var el = $('#destinyText');
    el.textContent = 'Soulmates, found. Written in the stars — and sealed with every heartbeat. ' + (C.yourName || '') + ' ♥ ' + (C.herName || '');
    el.classList.add('show'); FX.burst(e.clientX, e.clientY, 40); FX.rain(30);
  });

  // sound buttons live in the nav bar on phones/tablets
  var dockEl = $('#dock'), slot = $('#dockSlot');
  function placeDock() {
    if (innerWidth <= 960) { if (dockEl.parentNode !== slot) { slot.appendChild(dockEl); dockEl.classList.add('in-nav'); } }
    else if (dockEl.parentNode !== document.body) { document.body.appendChild(dockEl); dockEl.classList.remove('in-nav'); }
  }
  placeDock(); addEventListener('resize', placeDock);

  // anniversary headline follows your start date
  (function () {
    var m = monthsBetween(start, new Date()), t = $('#foreverTitle');
    t.textContent = m >= 1 ? 'Happy ' + m + (m === 1 ? ' Month' : ' Months') : 'Happy Anniversary';
  })();

  watch();
})();
