// A woven RFID festival wristband, built in three.js: sublimated polyester strap, PVC tag threaded
// through two slots, one-way slider lock and a loose tail. Units are centimetres.
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export const DIM = { strapW: 1.5, strapT: 0.055, rx: 3.3, ry: 2.75, cardL: 3.8, cardW: 2.5, cardT: 0.08 };

const MARK_RING = "M143 338.5a173.5 173.5 0 1 0 347 0a173.5 173.5 0 1 0 -347 0ZM224.5 338.5a100 103.5 0 1 0 200 0a100 103.5 0 1 0 -200 0Z";

export const PRINTS = {
  ink: { strap: "#191310", weave: "#2a221d", ink: "#ECEBDB", second: "#FB5B37", stitch: "#ECEBDB", card: "#FB5B37", cardInk: "#ECEBDB", lock: "#FB5B37" },
  orange: { strap: "#F2552F", weave: "#d94a28", ink: "#191310", second: "#ECEBDB", stitch: "#191310", card: "#ECEBDB", cardInk: "#191310", lock: "#191310" },
  green: { strap: "#1FB95C", weave: "#1a9f4f", ink: "#0F1A12", second: "#ECEBDB", stitch: "#0F1A12", card: "#191310", cardInk: "#23C865", lock: "#ECEBDB" },
  cream: { strap: "#E9E6D6", weave: "#d8d4c2", ink: "#191310", second: "#FB5B37", stitch: "#FB5B37", card: "#191310", cardInk: "#ECEBDB", lock: "#FB5B37" },
};

function drawMark(ctx, x, y, size, color, bg) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 480, size / 480);
  ctx.translate(-87, -98.5);
  ctx.fillStyle = color;
  ctx.fill(new Path2D(MARK_RING), "evenodd");
  ctx.fillRect(432, 172, 79, 334);
  ctx.fillStyle = bg;
  ctx.fillRect(400, 328, 57, 21);
  ctx.fillRect(479, 328, 45, 21);
  ctx.restore();
}

function drawWordmark(ctx, wm, x, y, h, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(h / wm.h, h / wm.h);
  ctx.fillStyle = color;
  ctx.fill(new Path2D(wm.d), "evenodd");
  ctx.restore();
  return (wm.w / wm.h) * h;
}

function weaveNormalMap() {
  const S = 128, c = document.createElement("canvas");
  c.width = c.height = S;
  const ctx = c.getContext("2d"), img = ctx.createImageData(S, S);
  const h = (x, y) => {
    x = ((x % S) + S) % S; y = ((y % S) + S) % S;
    const rib = Math.pow(Math.abs(Math.sin((Math.PI * x * 8) / S)), 0.6);
    const row = Math.floor((x * 8) / S) % 2;
    const warp = 0.22 * Math.sin((2 * Math.PI * y * 16) / S + row * Math.PI);
    return rib * 0.8 + warp;
  };
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const dx = (h(x + 1, y) - h(x - 1, y)) * 1.6, dy = (h(x, y + 1) - h(x, y - 1)) * 1.6;
    const l = Math.hypot(dx, dy, 1), i = (y * S + x) * 4;
    img.data[i] = (-dx / l * 0.5 + 0.5) * 255;
    img.data[i + 1] = (dy / l * 0.5 + 0.5) * 255;
    img.data[i + 2] = (1 / l * 0.5 + 0.5) * 255;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

function strapTexture(len, p, wm, font, maxW) {
  const W = maxW, H = Math.round((W * DIM.strapW) / len), pu = W / len;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d");
  ctx.fillStyle = p.strap;
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 0.07;
  ctx.fillStyle = "#fff";
  for (let x = 0; x < W; x += 3) ctx.fillRect(x, 0, 1, H);
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = "#000";
  for (let y = 0; y < H; y += 2) ctx.fillRect(0, y, W, 1);
  ctx.globalAlpha = 1;
  const edge = H * 0.075;
  ctx.fillStyle = p.weave;
  ctx.fillRect(0, 0, W, edge);
  ctx.fillRect(0, H - edge, W, edge);
  ctx.strokeStyle = p.stitch;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = Math.max(1.5, H * 0.018);
  ctx.setLineDash([0.13 * pu, 0.07 * pu]);
  for (const y of [H * 0.12, H * 0.88]) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  const period = 7.6 * pu, wmH = H * 0.4;
  ctx.textBaseline = "middle";
  ctx.font = `800 ${Math.round(H * 0.17)}px ${font}`;
  if ("letterSpacing" in ctx) ctx.letterSpacing = `${Math.round(H * 0.035)}px`;
  for (let x0 = 0.9 * pu; x0 < W; x0 += period) {
    const ww = drawWordmark(ctx, wm, x0, H / 2 - wmH * 0.62, wmH, p.ink);
    let x = x0 + ww + 0.5 * pu;
    drawMark(ctx, x, H / 2 - H * 0.14, H * 0.28, p.second, p.strap);
    x += H * 0.28 + 0.45 * pu;
    ctx.fillStyle = p.ink;
    ctx.fillText("KILELE NIGHTS", x, H / 2 - H * 0.105);
    ctx.fillStyle = p.second;
    ctx.fillText("NAIROBI · 14 NOV 2026", x, H / 2 + H * 0.12);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// The brand lockup at the v1 proportions: tile T, mark 0.75T inside it, wordmark 0.566T tall,
// its ascender 0.253T below the tile top, 0.158T after the tile.
function drawLockup(ctx, wm, x, y, T, tile, mark, word) {
  ctx.fillStyle = tile;
  roundRect(ctx, x, y, T, T, T * 0.18);
  ctx.fill();
  drawMark(ctx, x + T * 0.125, y + T * 0.125, T * 0.75, mark, tile);
  drawWordmark(ctx, wm, x + T * 1.158, y + T * 0.253, T * 0.566, word);
  return T * (1.158 + 0.566 * (wm.w / wm.h));
}

// EMV-style contactless symbol: four arcs on one centre, right edge at x, centred on y.
function drawContactless(ctx, x, y, height, color) {
  const half = 0.9, R = height / 2 / Math.sin(half), w = height * 0.11;
  const cxA = x - R - w / 2;
  ctx.strokeStyle = color;
  ctx.lineWidth = w;
  ctx.lineCap = "round";
  for (const k of [0.25, 0.5, 0.75, 1]) {
    ctx.beginPath();
    ctx.arc(cxA, y, R * k, -half, half);
    ctx.stroke();
  }
}

function cardTexture(p, wm, font) {
  const u = 420, W = Math.round(DIM.cardL * u), H = Math.round(DIM.cardW * u);
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d");
  ctx.fillStyle = p.card;
  ctx.fillRect(0, 0, W, H);

  // Print area: between the two slots (the strap covers the rest), on a 0.22 cm margin.
  const xl = W / 2 - 1.16 * u, xr = W / 2 + 1.16 * u, top = 0.5 * u, base = H - 0.3 * u;
  ctx.textBaseline = "middle";
  ctx.fillStyle = p.cardInk;
  ctx.font = `700 ${Math.round(0.13 * u)}px ${font}`;
  if ("letterSpacing" in ctx) ctx.letterSpacing = `${Math.round(0.013 * u)}px`;
  ctx.fillText("KILELE NIGHTS", xl, top);
  drawContactless(ctx, xr, top, 0.36 * u, p.cardInk);

  const T = 0.8 * u;
  drawLockup(ctx, wm, xl, H / 2 - T / 2 + 0.04 * u, T, p.cardInk, p.card, p.cardInk);

  ctx.textBaseline = "alphabetic";
  ctx.font = `600 ${Math.round(0.15 * u)}px ${font}`;
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
  ctx.fillText("Tap to pay", xl, base);
  ctx.globalAlpha = 0.75;
  ctx.textAlign = "right";
  ctx.font = `600 ${Math.round(0.15 * u)}px ${font}`;
  ctx.fillText("B1310", xr, base);
  ctx.textAlign = "left";
  ctx.globalAlpha = 0.045;
  ctx.fillStyle = "#000";
  for (let i = 0; i < 2600; i++) ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2);
  ctx.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function centerline() {
  const { rx, ry, strapT: t, cardL, cardT } = DIM;
  const YT = ry, L = t * 1.1, H = t + cardT, E = cardL / 2, SC = E - 0.42;
  const pts = [
    [-0.32, -ry, 0], [0.25, -ry, 0], [0.75, -ry + 0.02, 0],
    [1.6, -ry + 0.24, 0], [2.5, -1.9, 0], [3.1, -0.9, 0], [rx, 0.2, 0], [3.15, 1.3, 0], [2.72, 2.2, 0], [2.25, YT - 0.04, 0],
    [E + 0.16, YT + 0.04, 0], [E + 0.06, YT + H - 0.01, 0], [E - 0.06, YT + H + 0.002, 0], [SC + 0.1, YT + H, 0],
    [SC, YT + H * 0.5, 0], [SC - 0.1, YT + 0.002, 0], [SC - 0.45, YT, 0], [0.35, YT, 0],
    [-0.35, YT, 0], [-(SC - 0.45), YT, 0], [-(SC - 0.1), YT + 0.002, 0], [-SC, YT + H * 0.5, 0], [-(SC + 0.1), YT + H, 0],
    [-(E - 0.06), YT + H + 0.002, 0], [-(E + 0.06), YT + H - 0.01, 0], [-(E + 0.16), YT + 0.04, 0],
    [-2.25, YT - 0.04, 0], [-2.72, 2.2, 0], [-3.15, 1.3, 0], [-rx, 0.2, 0], [-3.1, -0.9, 0], [-2.5, -1.9, 0], [-1.6, -ry + 0.22, 0],
    [-0.8, -ry - L * 0.6, 0], [-0.25, -ry - L, 0], [0.6, -ry - L, 0],
    [1.25, -ry - L - 0.06, 0.04], [1.95, -ry - 0.3, 0.12], [2.45, -ry - 0.85, 0.26], [2.6, -ry - 1.55, 0.42],
  ];
  return new THREE.CatmullRomCurve3(pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)), false, "centripetal");
}

function strapGeometry(curve, N) {
  const { strapW: w, strapT: t } = DIM;
  const r = t / 2, hw = w / 2, M = 10, E = 6;
  const top = [], bot = [], edgeR = [], edgeL = [];
  for (let j = 0; j <= M; j++) { const a = -hw + r + (j / M) * (w - 2 * r); top.push([a, r, 0, 1, (a + hw) / w]); }
  for (let j = 0; j <= E; j++) { const g = Math.PI / 2 - (j / E) * Math.PI; edgeR.push([hw - r + r * Math.cos(g), r * Math.sin(g), Math.cos(g), Math.sin(g), j / E]); }
  for (let j = 0; j <= M; j++) { const a = hw - r - (j / M) * (w - 2 * r); bot.push([a, -r, 0, -1, (a + hw) / w]); }
  for (let j = 0; j <= E; j++) { const g = -Math.PI / 2 - (j / E) * Math.PI; edgeL.push([-hw + r + r * Math.cos(g), r * Math.sin(g), Math.cos(g), Math.sin(g), j / E]); }
  const parts = [[top, 0], [bot, 1], [edgeR, 2], [edgeL, 2]];

  const frames = [], len = curve.getLength();
  let tailStart = 1;
  for (let i = 0; i <= N; i++) {
    const u = i / N, P = curve.getPointAt(u), T = curve.getTangentAt(u);
    if (tailStart === 1 && i > N * 0.6 && P.x > 0.6 && P.y < -DIM.ry) tailStart = u;
    frames.push({ u, P, T });
  }
  const Z = new THREE.Vector3(0, 0, 1);
  for (const f of frames) {
    const twist = f.u > tailStart ? THREE.MathUtils.smoothstep(f.u, tailStart, 1) * 0.42 : 0;
    const Wv = Z.clone().applyAxisAngle(f.T, twist);
    f.N = new THREE.Vector3().crossVectors(f.T, Wv).normalize();
    f.W = new THREE.Vector3().crossVectors(f.N, f.T).normalize();
  }

  const pos = [], nor = [], uv = [], idx = [], geo = new THREE.BufferGeometry();
  let base = 0, start = 0;
  for (const [prof, mat] of parts) {
    const K = prof.length;
    for (const f of frames) for (const [pw, pn, nw, nn, v] of prof) {
      pos.push(f.P.x + f.W.x * pw + f.N.x * pn, f.P.y + f.W.y * pw + f.N.y * pn, f.P.z + f.W.z * pw + f.N.z * pn);
      nor.push(f.W.x * nw + f.N.x * nn, f.W.y * nw + f.N.y * nn, f.W.z * nw + f.N.z * nn);
      uv.push(1 - f.u, 1 - v);
    }
    for (let i = 0; i < N; i++) for (let j = 0; j < K - 1; j++) {
      const a = base + i * K + j, b = a + K, c = a + 1, d = b + 1;
      idx.push(a, b, c, c, b, d);
    }
    geo.addGroup(start, idx.length - start, mat);
    start = idx.length;
    base += frames.length * K;
  }
  const last = frames[frames.length - 1], ring = [...top, ...edgeR.slice(1), ...bot.slice(1), ...edgeL.slice(1, -1)];
  const center = base;
  pos.push(last.P.x, last.P.y, last.P.z); nor.push(last.T.x, last.T.y, last.T.z); uv.push(1, 0.5);
  for (const [pw, pn] of ring) {
    pos.push(last.P.x + last.W.x * pw + last.N.x * pn, last.P.y + last.W.y * pw + last.N.y * pn, last.P.z + last.W.z * pw + last.N.z * pn);
    nor.push(last.T.x, last.T.y, last.T.z); uv.push(1, 0.5);
  }
  for (let k = 0; k < ring.length; k++) idx.push(center, center + 1 + ((k + 1) % ring.length), center + 1 + k);
  geo.addGroup(start, idx.length - start, 2);

  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  return { geo, len };
}

function cardShape() {
  const { cardL: L, cardW: W } = DIM, r = 0.3, x0 = -L / 2, y0 = -W / 2;
  const s = new THREE.Shape();
  s.moveTo(x0 + r, y0);
  s.lineTo(x0 + L - r, y0); s.absarc(x0 + L - r, y0 + r, r, -Math.PI / 2, 0);
  s.lineTo(x0 + L, y0 + W - r); s.absarc(x0 + L - r, y0 + W - r, r, 0, Math.PI / 2);
  s.lineTo(x0 + r, y0 + W); s.absarc(x0 + r, y0 + W - r, r, Math.PI / 2, Math.PI);
  s.lineTo(x0, y0 + r); s.absarc(x0 + r, y0 + r, r, Math.PI, Math.PI * 1.5);
  const SC = L / 2 - 0.42, sw = 0.1, sh = 0.83;
  for (const cx of [SC, -SC]) {
    const h = new THREE.Path();
    h.moveTo(cx - sw, -sh + sw);
    h.absarc(cx, -sh + sw, sw, Math.PI, 0, false);
    h.lineTo(cx + sw, sh - sw);
    h.absarc(cx, sh - sw, sw, 0, Math.PI, false);
    h.lineTo(cx - sw, -sh + sw);
    s.holes.push(h);
  }
  return s;
}

export async function buildBand(printName = "ink", { font = "sans-serif", wordmarkUrl = "assets/wordmark.json", maxTex = 8192 } = {}) {
  const p = PRINTS[printName];
  const wm = await (await fetch(wordmarkUrl)).json();
  const group = new THREE.Group();
  const curve = centerline();
  const { geo, len } = strapGeometry(curve, 1600);
  const normal = weaveNormalMap();
  normal.repeat.set(len / 0.32, DIM.strapW / 0.32);
  const fabric = (color, map = null) => new THREE.MeshPhysicalMaterial({
    color, map, normalMap: normal, normalScale: new THREE.Vector2(0.55, 0.55),
    roughness: 0.78, sheen: 0.8, sheenRoughness: 0.5, sheenColor: new THREE.Color(0.5, 0.5, 0.5), envMapIntensity: 0.55,
  });
  const outer = fabric(0xffffff, strapTexture(len, p, wm, font, maxTex));
  const inner = fabric(new THREE.Color(p.weave).multiplyScalar(1.1));
  inner.roughness = 0.92;
  inner.envMapIntensity = 0.3;
  const strap = new THREE.Mesh(geo, [outer, inner, inner]);
  strap.castShadow = strap.receiveShadow = true;
  group.add(strap);

  const shape = cardShape();
  const body = new THREE.ExtrudeGeometry(shape, { depth: DIM.cardT - 0.024, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3, curveSegments: 24 });
  body.rotateX(-Math.PI / 2);
  body.computeBoundingBox();
  const yBottom = DIM.ry + DIM.strapT / 2;
  body.translate(0, yBottom - body.boundingBox.min.y, 0);
  body.computeBoundingBox();
  const pvc = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(p.card).lerp(new THREE.Color("#ffffff"), 0.08), roughness: 0.45, clearcoat: 0.4, clearcoatRoughness: 0.25, envMapIntensity: 0.6 });
  const cardBody = new THREE.Mesh(body, pvc);
  cardBody.castShadow = cardBody.receiveShadow = true;
  group.add(cardBody);

  const face = new THREE.ShapeGeometry(shape, 24);
  const fp = face.attributes.position, fuv = face.attributes.uv;
  for (let i = 0; i < fp.count; i++) fuv.setXY(i, (fp.getX(i) + DIM.cardL / 2) / DIM.cardL, (fp.getY(i) + DIM.cardW / 2) / DIM.cardW);
  face.rotateX(-Math.PI / 2);
  face.translate(0, body.boundingBox.max.y + 0.0012, 0);
  const print = new THREE.MeshPhysicalMaterial({ map: cardTexture(p, wm, font), roughness: 0.42, clearcoat: 0.45, clearcoatRoughness: 0.2, envMapIntensity: 0.6 });
  const cardFace = new THREE.Mesh(face, print);
  cardFace.receiveShadow = true;
  group.add(cardFace);

  const L = DIM.strapT * 1.1;
  const lock = new THREE.Mesh(new RoundedBoxGeometry(0.95, 0.34, 1.82, 5, 0.1), new THREE.MeshPhysicalMaterial({ color: p.lock, roughness: 0.34, clearcoat: 0.5, clearcoatRoughness: 0.2, envMapIntensity: 0.6 }));
  lock.position.set(0.02, -DIM.ry - L / 2, 0);
  lock.castShadow = lock.receiveShadow = true;
  group.add(lock);
  const mouthMat = new THREE.MeshBasicMaterial({ color: 0x0b0806 });
  for (const sx of [-1, 1]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1.62, 0.16), mouthMat);
    m.rotation.y = (sx * Math.PI) / 2;
    m.position.set(0.02 + sx * 0.4755, -DIM.ry - L / 2, 0);
    group.add(m);
  }
  const ridgeMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(p.lock).multiplyScalar(0.82), roughness: 0.4 });
  for (const dx of [-0.2, 0, 0.2]) {
    const ridge = new THREE.Mesh(new RoundedBoxGeometry(0.07, 0.04, 1.3, 2, 0.02), ridgeMat);
    ridge.position.set(0.02 + dx, -DIM.ry - L / 2 - 0.17, 0);
    group.add(ridge);
  }

  group.userData.cardCenter = new THREE.Vector3(0, body.boundingBox.max.y, 0);
  group.userData.lockCenter = lock.position.clone();
  return group;
}

function contactShadow() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d"), g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(0,0,0,0.55)");
  g.addColorStop(0.45, "rgba(0,0,0,0.22)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }));
  return m;
}

export function createStage(canvas, { fov = 26, distance = 24, shadowFloor = true, exposure = 1 } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = exposure * 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.035).texture;
  scene.environmentIntensity = 0.6;
  const key = new THREE.DirectionalLight(0xfff6ee, 1.7);
  key.position.set(-6, 10, 9);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  Object.assign(key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 1, far: 40 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.015;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xe8f0ff, 1.1);
  rim.position.set(7, 3, -8);
  scene.add(rim);

  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 200);
  camera.position.set(0, 0, distance);
  const rig = new THREE.Group();
  scene.add(rig);
  let floor = null;
  if (shadowFloor) { floor = contactShadow(); scene.add(floor); }

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  function fit(rect, host, size = 7.6) {
    const vh = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), vw = vh * camera.aspect;
    const cx = rect.left + rect.width / 2 - host.left, cy = rect.top + rect.height / 2 - host.top;
    return {
      x: (cx / host.width - 0.5) * vw,
      y: -(cy / host.height - 0.5) * vh,
      s: Math.min((rect.width / host.width) * vw, (rect.height / host.height) * vh) / size,
    };
  }
  const v = new THREE.Vector3();
  function project(obj, local, host) {
    v.copy(local);
    obj.localToWorld(v);
    v.project(camera);
    return { x: (v.x * 0.5 + 0.5) * host.width, y: (-v.y * 0.5 + 0.5) * host.height };
  }
  return { THREE, renderer, scene, camera, rig, key, floor, resize, fit, project, render: () => renderer.render(scene, camera) };
}
