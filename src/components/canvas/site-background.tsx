"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number };
type Trace = { pts: Pt[]; len: number[]; total: number; speed: number; offset: number; green: boolean };
type Tower = { x: number; h: number; phase: number };

/** Fondo global: líneas de fibra con pulsos de luz y antenas que emiten señal (como en el video del hero). */
export function SiteBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let raf = 0;
    let scroll = 0;
    let traces: Trace[] = [];
    let towers: Tower[] = [];
    let cLine = "19 126 198";
    let cNode = "38 119 58";
    let light = true;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      cLine = cs.getPropertyValue("--rgb-line").trim() || cLine;
      cNode = cs.getPropertyValue("--rgb-node").trim() || cNode;
      light = document.documentElement.getAttribute("data-theme") !== "dark";
    };

    /** Trazado tipo circuito: tramos rectos con quiebres a 45°. */
    const makeTrace = (): Trace => {
      const pts: Pt[] = [];
      let x = Math.random() < 0.5 ? -20 : Math.random() * W;
      let y = Math.random() * H * 1.6;
      pts.push({ x, y });
      const steps = 5 + Math.floor(Math.random() * 4);
      for (let i = 0; i < steps; i++) {
        const run = 90 + Math.random() * 260;
        const dir = Math.random() < 0.5 ? 1 : -1;
        x += run;
        pts.push({ x, y });
        const d = 40 + Math.random() * 110;
        x += d;
        y += dir * d;
        pts.push({ x, y });
      }
      const len: number[] = [0];
      for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
      return { pts, len, total: len[len.length - 1], speed: 40 + Math.random() * 70, offset: Math.random() * 1000, green: Math.random() < 0.28 };
    };

    const at = (t: Trace, d: number): Pt => {
      let i = 1;
      while (i < t.len.length - 1 && t.len[i] < d) i++;
      const k = (d - t.len[i - 1]) / (t.len[i] - t.len[i - 1] || 1);
      return { x: t.pts[i - 1].x + (t.pts[i].x - t.pts[i - 1].x) * k, y: t.pts[i - 1].y + (t.pts[i].y - t.pts[i - 1].y) * k };
    };

    const build = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      traces = Array.from({ length: W < 700 ? 7 : 14 }, makeTrace);
      const tc = W < 700 ? 2 : 4;
      towers = Array.from({ length: tc }, (_, i) => ({
        x: ((i + 0.5) / tc) * W + (Math.random() - 0.5) * 80,
        h: 120 + Math.random() * 120,
        phase: Math.random() * 6,
      }));
    };

    const drawTower = (tw: Tower, time: number) => {
      const base = H + 6;
      const top = base - tw.h;
      const w = 22;
      ctx.strokeStyle = `rgb(${cLine} / ${light ? 0.34 : 0.3})`;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(tw.x - w, base);
      ctx.lineTo(tw.x, top);
      ctx.lineTo(tw.x + w, base);
      for (let k = 1; k < 6; k++) {
        const y = base - (tw.h * k) / 6;
        const half = w * (1 - k / 6);
        ctx.moveTo(tw.x - half, y);
        ctx.lineTo(tw.x + half, y);
      }
      ctx.stroke();
      // ondas de señal
      for (let r = 0; r < 3; r++) {
        const p = (((time * 0.45 + tw.phase + r / 3) % 1) + 1) % 1;
        ctx.strokeStyle = `rgb(${cNode} / ${(1 - p) * (light ? 0.5 : 0.55)})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.arc(tw.x, top, 6 + p * 70, -Math.PI * 0.85, -Math.PI * 0.15);
        ctx.stroke();
      }
      ctx.fillStyle = `rgb(${cNode} / 0.95)`;
      ctx.beginPath();
      ctx.arc(tw.x, top, 2.6, 0, 6.283);
      ctx.fill();
    };

    const draw = (ms: number) => {
      const time = ms / 1000;
      ctx.clearRect(0, 0, W, H);
      const span = H * 1.6;
      const shift = ((((-scroll * 0.18) % span) + span) % span) - H * 0.3;

      for (const t of traces) {
        ctx.save();
        ctx.translate(0, shift);
        ctx.strokeStyle = `rgb(${cLine} / ${light ? 0.2 : 0.16})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(t.pts[0].x, t.pts[0].y);
        for (let i = 1; i < t.pts.length; i++) ctx.lineTo(t.pts[i].x, t.pts[i].y);
        ctx.stroke();
        ctx.fillStyle = `rgb(${cLine} / ${light ? 0.45 : 0.4})`;
        for (let i = 2; i < t.pts.length; i += 2) {
          ctx.beginPath();
          ctx.arc(t.pts[i].x, t.pts[i].y, 2, 0, 6.283);
          ctx.fill();
        }
        // pulso de luz con estela
        const head = (t.offset + time * t.speed) % (t.total + 160);
        for (let s = 0; s < 14; s++) {
          const d = head - s * 9;
          if (d < 0 || d > t.total) continue;
          const p = at(t, d);
          ctx.fillStyle = `rgb(${t.green ? cNode : cLine} / ${(1 - s / 14) * (light ? 0.85 : 0.8)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.4 - s * 0.12, 0, 6.283);
          ctx.fill();
        }
        ctx.restore();
      }

      for (const tw of towers) drawTower(tw, time);
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    readColors();
    build();
    const mo = new MutationObserver(() => {
      readColors();
      if (reduce) draw(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    const onScroll = () => {
      scroll = window.scrollY;
    };
    const onResize = () => {
      build();
      if (reduce) draw(0);
    };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(draw);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    if (reduce) draw(0);
    else raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
