"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useActiveSection } from "@/hooks/use-active-section";
import { STEPS } from "@/lib/site";

/** Indicador de la experiencia: 01 INTRO … 07 CONTACTO. */
export function ProgressRail() {
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const idx = Math.max(
    0,
    STEPS.findIndex((s) => s.sections.includes(active)),
  );
  const step = STEPS[idx];

  return (
    <>
      {/* barra superior (todas las pantallas) */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[image:var(--grad-brand)]"
        style={{ scaleX: smooth }}
      />

      {/* riel lateral (escritorio) */}
      <nav aria-label="Progreso de la experiencia" className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:block xl:right-5">
        <ol className="relative flex flex-col items-end gap-1">
          <span aria-hidden className="absolute right-[15px] top-4 bottom-4 w-px bg-line" />
          <motion.span
            aria-hidden
            className="absolute right-[15px] top-4 bottom-4 w-px origin-top bg-[image:var(--grad-brand)]"
            style={{ scaleY: smooth }}
          />
          {STEPS.map((s, i) => {
            const on = i === idx;
            return (
              <li key={s.n}>
                <a
                  href={s.href}
                  aria-label={`${s.n} ${s.label}`}
                  aria-current={on ? "step" : undefined}
                  className="group relative flex h-8 items-center justify-end gap-3 pr-1"
                >
                  <span
                    className={`glass rounded-full px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] transition-all duration-300 ${
                      on ? "text-accent opacity-0 2xl:opacity-100" : "text-fg2 opacity-0"
                    } translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ${
                      on ? "2xl:translate-x-0" : ""
                    }`}
                  >
                    {s.n} {s.label}
                  </span>
                  <span
                    className={`relative grid h-[14px] w-[14px] place-items-center rounded-full border transition-all duration-500 ${
                      on
                        ? "border-accent bg-accent shadow-[0_0_0_5px_rgb(var(--rgb-glow)/0.18)]"
                        : i < idx
                          ? "border-accent bg-bg"
                          : "border-line-strong bg-bg"
                    }`}
                    style={{ borderColor: on || i < idx ? undefined : "var(--line-strong)" }}
                  />
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* insignia inferior (móvil / tablet): opaca y compacta para no "fantasmear" sobre el contenido */}
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-line-strong bg-[var(--surface)] px-3 py-1.5 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-fg2 shadow-[var(--shadow)] lg:hidden"
      >
        <span className="text-accent">{step.n}</span>/07
      </div>
    </>
  );
}
