"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Flag, Rocket, Target } from "lucide-react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const STATIONS = [
  {
    key: "hoy",
    tag: "Hoy",
    year: "2026",
    label: "Misión",
    icon: Target,
    text: "Impulsar el desarrollo sostenible regional y nacional mediante la formulación, estructuración y ejecución integral de proyectos de alto impacto en tecnología, infraestructura avanzada, formación y gestión logística.",
    chips: ["Tecnología", "Infraestructura avanzada", "Formación", "Gestión logística"],
  },
  {
    key: "transformacion",
    tag: "Transformación",
    year: "En marcha",
    label: "Cómo lo hacemos",
    icon: Rocket,
    text: "Articulamos las capacidades de los sectores público y privado mediante soluciones innovadoras, eficientes y normativamente rigurosas que cierran brechas tecnológicas, fortalecen las capacidades institucionales y transforman la calidad de vida de las comunidades en todo el territorio colombiano.",
    chips: ["Cierran brechas tecnológicas", "Fortalecen capacidades institucionales", "Transforman la calidad de vida"],
  },
  {
    key: "2030",
    tag: "2030",
    year: "2030",
    label: "Visión 2030",
    icon: Flag,
    text: "Consolidarnos como el aliado estratégico e interinstitucional de referencia a nivel nacional para ministerios, gobernaciones, alcaldías y entidades del sector público en la implementación de soluciones transversales de gobierno digital, modernización tecnológica e inclusión social.",
    chips: ["Excelencia técnica", "Transparencia operativa", "Impacto medible"],
  },
];

export function Vision() {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const sec = useRef<HTMLElement>(null);
  const [step, setStep] = useState(reduce ? 2 : -1);

  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 75%", "end 55%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const year = useTransform(scrollYProgress, [0, 1], [2026, 2030]);
  const [yr, setYr] = useState(2026);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(v < 0.02 ? -1 : v < 0.4 ? 0 : v < 0.75 ? 1 : 2);
  });
  useMotionValueEvent(year, "change", (v) => setYr(Math.round(v)));

  const { scrollYProgress: secP } = useScroll({ target: sec, offset: ["start end", "end start"] });
  const bigY = useTransform(secP, [0, 1], [80, -80]);

  return (
    <section ref={sec} id="vision" aria-label="Misión y visión 2030" className="section-pad relative overflow-hidden bg-bg2">
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: bigY }}
        className="pointer-events-none absolute -right-6 top-6 select-none text-[clamp(9rem,26vw,24rem)] font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_var(--line-strong)]"
      >
        2030
      </motion.div>

      <div className="container-x relative">
        <SectionHeading eyebrow="03 · Misión y visión" title="Una visión construida para 2030" highlight={["2030"]}>
          Del trabajo de hoy a la transformación del territorio: una ruta pensada para convertir los retos del Estado en
          proyectos ejecutables, sostenibles y con un impacto medible en el desarrollo del país.
        </SectionHeading>

        <div ref={wrap} className="relative mt-16 lg:mt-24">
          {/* línea de tiempo · escritorio */}
          <div aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-line-strong lg:block">
            <motion.div className="h-full origin-left bg-[image:var(--grad-brand)]" style={{ scaleX: reduce ? 1 : fill, height: 3, marginTop: -1 }} />
          </div>
          {/* línea de tiempo · móvil */}
          <div aria-hidden className="absolute bottom-0 left-[27px] top-2 w-px bg-line-strong lg:hidden">
            <motion.div className="h-full w-[3px] origin-top bg-[image:var(--grad-brand)]" style={{ scaleY: reduce ? 1 : fill, marginLeft: -1 }} />
          </div>

          <ol className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            {STATIONS.map((s, i) => {
              const on = i <= step;
              return (
                <li key={s.key} className="relative pl-[76px] lg:pl-0 lg:pt-[84px]">
                  {/* estación */}
                  <div className="absolute left-0 top-0 flex items-center gap-4 lg:left-0">
                    <span
                      className={`relative grid h-14 w-14 place-items-center rounded-full border transition-all duration-700 ${
                        on
                          ? "border-transparent bg-[image:var(--grad-brand)] text-white shadow-[0_0_0_8px_rgb(var(--rgb-glow)/0.14),0_14px_30px_-10px_rgba(19,126,198,0.7)]"
                          : "glass text-fg3"
                      }`}
                    >
                      <s.icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                      {on && i === step && !reduce && (
                        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-brand-blue/30 [animation-duration:2.4s]" />
                      )}
                    </span>
                    <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-fg2 lg:block">{s.tag}</span>
                  </div>

                  <motion.article
                    initial={reduce ? false : { opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`glass h-full rounded-3xl p-7 shadow-[var(--shadow)] transition-colors duration-700 sm:p-8 ${
                      on ? "!border-accent/40" : ""
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent">{s.label}</p>
                      <p className="font-mono text-xs text-fg3 lg:hidden">{s.tag}</p>
                    </div>
                    <p className="mt-4 text-[0.98rem] leading-[1.75] text-fg2">{s.text}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {s.chips.map((c, k) => (
                        <motion.li
                          key={c}
                          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + k * 0.1, duration: 0.5 }}
                          className="rounded-full border border-line-strong px-3 py-1.5 text-[0.74rem] font-medium text-fg2 transition-colors hover:border-accent hover:text-accent"
                        >
                          {c}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-16 flex items-center justify-center gap-6 lg:mt-20">
          <span className="font-mono text-sm tracking-[0.2em] text-fg3">HOY</span>
          <span aria-hidden className="text-4xl font-bold tabular-nums tracking-tight text-grad sm:text-6xl">
            {yr}
          </span>
          <span className="font-mono text-sm tracking-[0.2em] text-fg3">2030</span>
        </Reveal>
      </div>
    </section>
  );
}
