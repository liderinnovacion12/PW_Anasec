"use client";

import { useEffect, useRef } from "react";

/** Red de nodos que flotan y se conectan entre sí y con el puntero (fondo del CTA final). */
export function NetworkBackground({ className = "" }: { className?: string }) {
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
    let raf = 0;
    let visible = true;
    type N = { x: number; y: number; vx: number; vy: number; r: number; g: boolean };
    let nodes: N[] = [];
    const m = { x: -999, y: -999 };

    const build = () => {
      const r = host.getBoundingClientRect();
      W = r.width;
      H = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, Math.max(28, (W * H) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 1 + Math.random() * 1.8,
        g: Math.random() < 0.18,
      }));
    };

    /* colores del tema vigente (--rgb-line / --rgb-node / --rgb-dot) */
    let cLine = "92 192 245";
    let cNode = "102 190 86";
    let cDot = "150 200 255";
    const readColors = () => {
      const cs = getComputedStyle(host);
      cLine = cs.getPropertyValue("--rgb-line").trim() || cLine;
      cNode = cs.getPropertyValue("--rgb-node").trim() || cNode;
      cDot = cs.getPropertyValue("--rgb-dot").trim() || cDot;
    };
    readColors();
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });

    const LINK = () => (W < 640 ? 110 : 150);

    const draw = () => {
      raf = 0;
      ctx.clearRect(0, 0, W, H);
      const L = LINK();
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = W + 10;
        if (n.x > W + 10) n.x = -10;
        if (n.y < -10) n.y = H + 10;
        if (n.y > H + 10) n.y = -10;
      }
      ctx.lineWidth = 0.7;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < L) {
            ctx.strokeStyle = `rgb(${cLine} / ${(1 - d / L) * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - m.x, a.y - m.y);
        if (dm < L * 1.5) {
          ctx.strokeStyle = `rgb(${cNode} / ${(1 - dm / (L * 1.5)) * 0.65})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
          ctx.lineWidth = 0.7;
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n.g ? `rgb(${cNode} / 0.95)` : `rgb(${cDot} / 0.7)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, 6.283);
        ctx.fill();
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    };

    build();
    if (reduce) draw();
    else raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw();
    });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce && !raf) raf = requestAnimationFrame(draw);
    });
    io.observe(host);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
    };
    const onLeave = () => {
      m.x = m.y = -999;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
