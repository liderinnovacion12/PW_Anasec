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
    headline: "Impulsar el desarrollo sostenible regional y nacional",
    icon: Target,
    text: "Impulsar el desarrollo sostenible regional y nacional mediante la formulación, estructuración y ejecución integral de proyectos de alto impacto en tecnología, infraestructura avanzada, formación y gestión logística.",
    chips: ["Tecnología", "Infraestructura avanzada", "Formación", "Gestión logística"],
  },
  {
    key: "transformacion",
    tag: "Transformación",
    year: "En marcha",
    label: "Cómo lo hacemos",
    headline: "Articulamos las capacidades de los sectores público y privado",
    icon: Rocket,
    text: "Articulamos las capacidades de los sectores público y privado mediante soluciones innovadoras, eficientes y normativamente rigurosas que cierran brechas tecnológicas, fortalecen las capacidades institucionales y transforman la calidad de vida de las comunidades en todo el territorio colombiano.",
    chips: ["Cierran brechas tecnológicas", "Fortalecen capacidades institucionales", "Transforman la calidad de vida"],
  },
  {
    key: "2030",
    tag: "2030",
    year: "2030",
    label: "Visión 2030",
    headline: "Consolidarnos como el aliado estratégico e interinstitucional de referencia a nivel nacional",
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
  const dotLeft = useTransform(fill, (v) => `${v * 100}%`);
  const year = useTransform(scrollYProgress, [0, 1], [2026, 2030]);
  const [yr, setYr] = useState(2026);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(v < 0.02 ? -1 : v < 0.4 ? 0 : v < 0.75 ? 1 : 2);
  });
  useMotionValueEvent(year, "change", (v) => setYr(Math.round(v)));

  const { scrollYProgress: secP } = useScroll({ target: sec, offset: ["start end", "end start"] });
  const bigY = useTransform(secP, [0, 1], [80, -80]);

  return (
    <section ref={sec} id="vision" aria-label="Misión y visión 2030" className="section-pad relative overflow-hidden bg-bg2/55" style={{ paddingTop: "clamp(40px, 6vw, 80px)" }}>
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

        <div ref={wrap} className="relative mt-7 lg:mt-7">
          {/* línea de tiempo · escritorio */}
          <div aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-line-strong lg:block">
            <motion.div className="h-full origin-left bg-[image:var(--grad-brand)]" style={{ scaleX: reduce ? 1 : fill, height: 3, marginTop: -1 }} />
            {!reduce && (
              <motion.span
                className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green shadow-[0_0_0_6px_rgb(var(--rgb-glow)/0.2),0_0_22px_var(--green)]"
                style={{ left: dotLeft }}
              />
            )}
          </div>
          {/* línea de tiempo · móvil */}
          <div aria-hidden className="absolute bottom-0 left-[27px] top-2 w-px bg-line-strong lg:hidden">
            <motion.div className="h-full w-[3px] origin-top bg-[image:var(--grad-brand)]" style={{ scaleY: reduce ? 1 : fill, marginLeft: -1 }} />
          </div>

          <ol className="grid gap-12 lg:grid-cols-3 lg:gap-8">
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
                    <motion.span
                      animate={reduce ? undefined : { x: on ? 0 : -6, opacity: on ? 1 : 0.55 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className={`hidden rounded-full bg-bg2 py-1.5 pl-3 pr-4 text-base font-bold uppercase tracking-[0.14em] lg:block ${on ? "text-grad" : "text-fg2"}`}
                    >
                      {s.tag}
                    </motion.span>
                  </div>

                  <motion.article
                    initial={reduce ? false : { opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    whileHover={reduce ? undefined : { y: -8 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`glass group relative h-full overflow-hidden rounded-3xl p-7 transition-[box-shadow,border-color] duration-700 sm:p-6 ${
                      on ? "!border-accent/50 shadow-[0_30px_70px_-30px_rgba(19,126,198,0.55)]" : "shadow-[var(--shadow)]"
                    }`}
                  >
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-[image:var(--grad-brand)]" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-6 -top-8 select-none text-[7.5rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_var(--line-strong)] transition-transform duration-700 group-hover:scale-110"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--grad-brand)] text-white shadow-[0_10px_24px_-10px_rgba(19,126,198,0.8)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                        <s.icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                      </span>
                      <p className="text-[0.78rem] font-bold uppercase tracking-[0.2em] text-accent">{s.label}</p>
                    </div>
                    <p className="relative mt-6 text-[1.35rem] font-bold leading-[1.2] tracking-tight text-fg sm:text-[1.5rem]">
                      <span className="text-grad">{s.headline}</span>
                    </p>
                    <p className="relative mt-4 text-[0.92rem] leading-[1.7] text-fg2">{s.text.slice(s.headline.length).replace(/^\s+/, "")}</p>
                    <ul className="relative mt-6 flex flex-wrap gap-2">
                      {s.chips.map((c, k) => (
                        <motion.li
                          key={c}
                          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + k * 0.1, duration: 0.5 }}
                          className="rounded-full border border-line-strong bg-[var(--glass)] px-3 py-1.5 text-[0.74rem] font-semibold text-fg2 transition-colors hover:border-accent hover:bg-[image:var(--grad-brand)] hover:text-white"
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

        <Reveal className="mt-7 flex items-center justify-center gap-6 lg:mt-20">
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
