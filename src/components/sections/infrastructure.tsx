"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { INFRA_ITEMS } from "@/lib/content";

/** Línea de fibra óptica que recorre la sección y "enciende" cada nodo de servicio. */
function FiberLine() {
  const reduce = useReducedMotion();
  const n = INFRA_ITEMS.length;
  const xs = Array.from({ length: n }, (_, i) => 40 + i * ((1200 - 80) / (n - 1)));
  const d = xs
    .map((x, i) => {
      const y = i % 2 === 0 ? 40 : 90;
      return `${i ? "L" : "M"}${x} ${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 1200 130" preserveAspectRatio="none" className="absolute inset-x-0 top-0 hidden h-[130px] w-full lg:block" aria-hidden>
      <defs>
        <linearGradient id="fiber-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#132a5a" />
          <stop offset="0.5" stopColor="#137ec6" />
          <stop offset="1" stopColor="#66be56" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        fill="none"
        stroke="var(--line-strong)"
        strokeWidth="2"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {!reduce && (
        <motion.circle r="4.5" fill="url(#fiber-g)">
          <animateMotion dur="5s" repeatCount="indefinite" path={d} />
        </motion.circle>
      )}
      {xs.map((x, i) => (
        <circle key={i} cx={x} cy={i % 2 === 0 ? 40 : 90} r="3" fill="var(--accent)" />
      ))}
    </svg>
  );
}

export function Infrastructure() {
  return (
    <section id="infraestructura" aria-labelledby="infra-title" className="section-pad relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-1/3 h-[420px] w-[420px] rounded-full bg-brand-teal/12 blur-[120px]" />
      <div className="container-x">
        <SectionHeading
          eyebrow="08 · Infraestructura y telecomunicaciones"
          title="La infraestructura que sostiene lo digital."
          titleId="infra-title"
          highlight={["digital."]}
        >
          Desde la fibra óptica hasta los centros de control: el despliegue físico que hace posible cada servicio
          digital de ANASEC en el territorio nacional.
        </SectionHeading>

        <div className="relative mt-7 lg:mt-7">
          <FiberLine />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:pt-[130px]">
            {INFRA_ITEMS.map((it, i) => (
              <Reveal key={it.title} delay={(i % 6) * 0.06}>
                <article className="glass group flex h-full flex-col items-start gap-3 rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:border-accent/50">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--grad-brand)] text-white transition-transform duration-500 group-hover:scale-110">
                    <it.icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                  </span>
                  <h3 className="text-[0.92rem] font-bold leading-tight tracking-tight">{it.title}</h3>
                  <p className="text-[0.78rem] leading-relaxed text-fg3">{it.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
