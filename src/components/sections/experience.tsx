"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Landmark, MapPinned, ShieldCheck } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const GROWTH = [22, 34, 41, 58, 70, 82, 100];

function GrowthChart() {
  const reduce = useReducedMotion();
  const w = 600;
  const h = 200;
  const max = 100;
  const step = w / (GROWTH.length - 1);
  const pts = GROWTH.map((v, i) => [i * step, h - (v / max) * (h - 24) - 12] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" role="img" aria-label="Gráfica de crecimiento del impacto de ANASEC en la ejecución de proyectos">
      <defs>
        <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="growth-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#132a5a" />
          <stop offset="1" stopColor="#66be56" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="var(--line)" strokeWidth="1" />
      ))}
      <motion.path
        d={area}
        fill="url(#growth-fill)"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, delay: 0.4 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="url(#growth-stroke)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {pts.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="4.5"
          fill="var(--bg)"
          stroke="var(--accent)"
          strokeWidth="2.4"
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
        />
      ))}
    </svg>
  );
}

const CARDS = [
  { icon: Award, value: 34, prefix: "+", suffix: "", label: "Contratos ejecutados", note: "Inscritos en el Registro Único de Proponentes (RUP)." },
  { icon: Landmark, value: 150000, prefix: "+$", suffix: " M", label: "Millones COP gestionados", note: "Presupuesto total gestionado en tecnología, conectividad e infraestructura." },
];

export function Experience() {
  return (
    <section id="experiencia" aria-labelledby="exp-title" className="section-pad relative">
      <div className="container-x">
        <SectionHeading eyebrow="12 · Experiencia probada" title="Experiencia que se puede medir." titleId="exp-title" highlight={["medir."]} />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1fr_1.2fr]">
          {CARDS.map((c) => (
            <Reveal key={c.label}>
              <article className="glass flex h-full flex-col justify-between rounded-3xl p-7 sm:p-8">
                <c.icon className="h-8 w-8 text-accent" strokeWidth={1.5} aria-hidden />
                <div className="mt-8">
                  <Counter to={c.value} prefix={c.prefix} suffix={c.suffix} className="text-4xl font-bold tracking-tight text-fg sm:text-5xl" />
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-fg2">{c.label}</p>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-fg3">{c.note}</p>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.1} className="grid grid-cols-2 gap-5">
            <article className="glass flex flex-col justify-between rounded-3xl p-6">
              <MapPinned className="h-7 w-7 text-accent" strokeWidth={1.5} aria-hidden />
              <div className="mt-6">
                <p className="text-lg font-bold leading-tight tracking-tight text-fg">Presencia nacional</p>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-fg3">Soluciones para ministerios, alcaldías, gobernaciones y empresas de servicios públicos.</p>
              </div>
            </article>
            <article className="glass flex flex-col justify-between rounded-3xl p-6">
              <ShieldCheck className="h-7 w-7 text-accent" strokeWidth={1.5} aria-hidden />
              <div className="mt-6">
                <p className="text-lg font-bold leading-tight tracking-tight text-fg">Economía mixta</p>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-fg3">Solidez jurídica y vocación de permanencia para alianzas de largo plazo.</p>
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="glass mt-6 rounded-3xl p-7 sm:p-9">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow !before:hidden">Fortaleza institucional</p>
              <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-fg2">
                Capacidad operativa y financiera acumulada en la formulación, consultoría integral, gerencia y ejecución de
                proyectos en todo el territorio nacional.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <GrowthChart />
            <p className="mt-3 text-center text-[0.68rem] uppercase tracking-[0.14em] text-fg3">
              Representación ilustrativa de la trayectoria de ejecución
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
