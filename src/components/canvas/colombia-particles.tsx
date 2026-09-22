"use client";

import { useEffect, useRef } from "react";
import { HERO_CITIES, MAP_ASPECT, OUTLINE, pointInOutline, type Pt } from "@/lib/colombia";

type P = { bx: number; by: number; x: number; y: number; vx: number; vy: number; depth: number; ph: number; s: number };

/** Colombia dibujada con partículas, malla de conexiones, nodos-ciudad y paquetes de datos. */
export function ColombiaParticles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const host = canvas.parentElement as HTMLElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let pts: P[] = [];
    let edges: [number, number][] = [];
    const mouse = { x: 0, y: 0, active: false, nx: 0.5, ny: 0.5, sx: 0.5, sy: 0.5 };
    let col = { dot: "19 42 90", line: "19 126 198", node: "38 119 58", glow: "19 126 198" };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      const g = (v: string, d: string) => cs.getPropertyValue(v).trim() || d;
      col = {
        dot: g("--rgb-dot", col.dot),
        line: g("--rgb-line", col.line),
        node: g("--rgb-node", col.node),
        glow: g("--rgb-glow", col.glow),
      };
    };
    readColors();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });

    const build = () => {
      const rect = host.getBoundingClientRect();
      W = Math.max(280, rect.width);
      H = W * MAP_ASPECT;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const g = W < 520 ? 0.036 : 0.027; // separación de la malla (espacio normalizado)
      const list: P[] = [];
      const add = (x: number, y: number, s: number) =>
        list.push({ bx: x * W, by: y * H, x: x * W, y: y * H, vx: 0, vy: 0, depth: 0.4 + Math.random() * 1.1, ph: Math.random() * 6.28, s });
      // relleno con malla hexagonal jitter
      let row = 0;
      for (let y = 0.02; y < 1; y += g * 0.866, row++) {
        for (let x = 0.02 + (row % 2 ? g / 2 : 0); x < 1; x += g) {
          const jx = x + (Math.random() - 0.5) * g * 0.45;
          const jy = y + (Math.random() - 0.5) * g * 0.45;
          if (pointInOutline(jx, jy)) add(jx, jy, 1 + Math.random() * 0.9);
        }
      }
      // contorno más denso
      for (let i = 0; i < OUTLINE.length; i++) {
        const [x0, y0] = OUTLINE[i];
        const [x1, y1] = OUTLINE[(i + 1) % OUTLINE.length];
        const len = Math.hypot(x1 - x0, (y1 - y0) * MAP_ASPECT);
        const n = Math.max(1, Math.round(len / (g * 0.5)));
        for (let k = 0; k < n; k++) add(x0 + ((x1 - x0) * k) / n, y0 + ((y1 - y0) * k) / n, 1.5);
      }
      pts = list;

      // aristas: vecinos cercanos vía hash espacial
      const cell = g * 1.6 * W;
      const hash = new Map<string, number[]>();
      pts.forEach((p, i) => {
        const k = `${Math.floor(p.bx / cell)},${Math.floor(p.by / cell)}`;
        (hash.get(k) ?? hash.set(k, []).get(k)!).push(i);
      });
      const es: [number, number][] = [];
      const maxD = g * 1.55 * W;
      pts.forEach((p, i) => {
        const cx = Math.floor(p.bx / cell);
        const cy = Math.floor(p.by / cell);
        const near: { j: number; d: number }[] = [];
        for (let dx = -1; dx <= 1; dx++)
          for (let dy = -1; dy <= 1; dy++)
            for (const j of hash.get(`${cx + dx},${cy + dy}`) ?? []) {
              if (j <= i) continue;
              const d = Math.hypot(pts[j].bx - p.bx, pts[j].by - p.by);
              if (d < maxD) near.push({ j, d });
            }
        near.sort((a, b) => a.d - b.d);
        near.slice(0, 3).forEach((n) => es.push([i, n.j]));
      });
      edges = es;
    };

    // rutas: Bogotá → resto de ciudades (arcos con curvatura)
    const cities = HERO_CITIES.map((c) => ({ ...c }));
    const hub = cities.find((c) => c.hub)!;
    const routes = cities
      .filter((c) => !c.hub)
      .map((c, i) => ({ to: c, u: (i * 0.137) % 1, speed: 0.0011 + (i % 4) * 0.00035 }));
    const bez = (a: Pt, b: Pt, u: number): [number, number] => {
      const mx = (a[0] + b[0]) / 2;
      const my = (a[1] + b[1]) / 2 - Math.hypot(b[0] - a[0], (b[1] - a[1])) * 0.22;
      const iu = 1 - u;
      return [iu * iu * a[0] * W + 2 * iu * u * mx * W + u * u * b[0] * W, iu * iu * a[1] * H + 2 * iu * u * my * H + u * u * b[1] * H];
    };

    let last = performance.now();
    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(now - last, 50);
      last = now;
      // suavizado del puntero (parallax)
      mouse.sx += (mouse.nx - mouse.sx) * 0.06;
      mouse.sy += (mouse.ny - mouse.sy) * 0.06;
      const px = (mouse.sx - 0.5) * 22;
      const py = (mouse.sy - 0.5) * 22;
      const R = Math.min(W, 620) * 0.2;

      for (const p of pts) {
        let tx = p.bx;
        let ty = p.by;
        if (mouse.active) {
          const dx = p.bx - mouse.x;
          const dy = p.by - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < R && d > 0.01) {
            const f = (1 - d / R) ** 2 * 26;
            tx += (dx / d) * f;
            ty += (dy / d) * f;
          }
        }
        p.vx += (tx - p.x) * 0.09;
        p.vy += (ty - p.y) * 0.09;
        p.vx *= 0.8;
        p.vy *= 0.8;
        p.x += p.vx;
        p.y += p.vy;
      }

      ctx.clearRect(0, 0, W, H);
      const t = now * 0.001;
      // onda de "escaneo" diagonal
      const wave = ((t * 0.12) % 1.6) - 0.3;

      // aristas base
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = `rgb(${col.line} / 0.13)`;
      ctx.beginPath();
      for (const [i, j] of edges) {
        const a = pts[i];
        const b = pts[j];
        ctx.moveTo(a.x + px * a.depth * 0.5, a.y + py * a.depth * 0.5);
        ctx.lineTo(b.x + px * b.depth * 0.5, b.y + py * b.depth * 0.5);
      }
      ctx.stroke();
      // aristas resaltadas por la onda
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = `rgb(${col.line} / 0.5)`;
      ctx.beginPath();
      for (const [i, j] of edges) {
        const a = pts[i];
        const b = pts[j];
        const pos = ((a.bx + b.bx) / (2 * W)) * 0.6 + ((a.by + b.by) / (2 * H)) * 0.4;
        if (Math.abs(pos - wave) < 0.05) {
          ctx.moveTo(a.x + px * a.depth * 0.5, a.y + py * a.depth * 0.5);
          ctx.lineTo(b.x + px * b.depth * 0.5, b.y + py * b.depth * 0.5);
        }
      }
      ctx.stroke();

      // partículas
      for (const p of pts) {
        const tw = 0.55 + 0.45 * Math.sin(t * 1.6 + p.ph);
        ctx.fillStyle = `rgb(${col.dot} / ${(0.34 + 0.4 * tw * (p.s > 1.4 ? 1 : 0.7)).toFixed(3)})`;
        const s = p.s;
        ctx.fillRect(p.x + px * p.depth * 0.5 - s / 2, p.y + py * p.depth * 0.5 - s / 2, s, s);
      }

      // rutas + paquetes
      const hubPos: Pt = hub.p;
      ctx.setLineDash([3, 6]);
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = `rgb(${col.glow} / 0.28)`;
      for (const r of routes) {
        ctx.beginPath();
        for (let k = 0; k <= 24; k++) {
          const [x, y] = bez(hubPos, r.to.p, k / 24);
          if (k) ctx.lineTo(x + px * 0.9, y + py * 0.9);
          else ctx.moveTo(x + px * 0.9, y + py * 0.9);
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);
      for (const r of routes) {
        r.u = (r.u + r.speed * dt) % 1;
        for (let k = 0; k < 6; k++) {
          const uu = r.u - k * 0.012;
          if (uu < 0) continue;
          const [x, y] = bez(hubPos, r.to.p, uu);
          ctx.fillStyle = `rgb(${col.glow} / ${(0.9 - k * 0.15).toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(x + px * 0.9, y + py * 0.9, 2.2 - k * 0.25, 0, 6.283);
          ctx.fill();
        }
      }

      // nodos ciudad
      for (const c of cities) {
        const x = c.p[0] * W + px * 0.9;
        const y = c.p[1] * H + py * 0.9;
        const pulse = (t * 0.6 + c.p[0] * 3) % 1;
        ctx.strokeStyle = `rgb(${col.node} / ${(0.55 * (1 - pulse)).toFixed(3)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(x, y, (c.hub ? 7 : 4) + pulse * (c.hub ? 20 : 12), 0, 6.283);
        ctx.stroke();
        ctx.fillStyle = `rgb(${col.node})`;
        ctx.beginPath();
        ctx.arc(x, y, c.hub ? 4.2 : 2.6, 0, 6.283);
        ctx.fill();
        ctx.fillStyle = `rgb(${col.glow} / 0.9)`;
        ctx.beginPath();
        ctx.arc(x, y, c.hub ? 1.6 : 1, 0, 6.283);
        ctx.fill();
      }

      if (!reduce && visible) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf && visible) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    build();
    if (reduce) {
      frame(performance.now());
    } else {
      start();
    }

    let rt: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        build();
        if (reduce) frame(performance.now());
      }, 120);
    });
    ro.observe(host);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !reduce) start();
      },
      { threshold: 0 },
    );
    io.observe(host);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = canvas.getBoundingClientRect();
      const inside = e.clientX > r.left - 60 && e.clientX < r.right + 60 && e.clientY > r.top - 60 && e.clientY < r.bottom + 60;
      mouse.active = inside;
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.nx = Math.min(1, Math.max(0, mouse.x / r.width));
      mouse.ny = Math.min(1, Math.max(0, mouse.y / r.height));
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.nx = 0.5;
      mouse.ny = 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      role="img"
      aria-label="Mapa digital de Colombia formado por una red de nodos conectados entre las principales ciudades"
    />
  );
}
