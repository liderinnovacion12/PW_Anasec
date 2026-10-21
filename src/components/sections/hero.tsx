"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Network } from "lucide-react";
import { BrandCorners } from "@/components/ui/brand-corners";
import { Counter } from "@/components/ui/counter";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { SITE } from "@/lib/site";

const KPIS = [
  { value: <Counter to={34} prefix="+" />, label: "Contratos ejecutados" },
  { value: <Counter to={150000} prefix="+$" duration={2.6} />, label: "Millones COP gestionados" },
  { value: "Cobertura nacional", label: "Presencia en el territorio" },
  { value: "Economía mixta", label: "Estado + sector privado" },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="surface-dark relative isolate min-h-[100svh] overflow-hidden pb-24 pt-[104px] lg:pt-[112px]"
    >
      {/* fondo: el video es el protagonista; solo un velo suave para legibilidad */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--bg),var(--bg-2))]" />
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          src="/video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(5_13_30/0.62)_0%,rgb(5_13_30/0.22)_48%,transparent_80%),linear-gradient(0deg,rgb(5_13_30/0.7)_0%,transparent_38%),linear-gradient(180deg,rgb(5_13_30/0.45)_0%,transparent_22%)]" />
      </div>
      <BrandCorners />

      <div className="container-x relative flex items-center lg:min-h-[calc(100svh-340px)]">
        {/* texto */}
        <div className="relative z-10 max-w-[640px]">
          <Reveal>
            <span className="eyebrow">{SITE.concept}</span>
          </Reveal>
          <TextReveal
            as="h1"
            text="Transformamos desafíos en soluciones que hacen avanzar a Colombia."
            highlight={["soluciones", "Colombia"]}
            className="h-display mt-6"
            delay={0.15}
          />
          <Reveal delay={0.7} className="mt-7">
            <p id="hero-title" className="lead max-w-xl">
              ANASEC articula tecnología, infraestructura, innovación y capacidades institucionales para desarrollar
              proyectos de alto impacto en todo el territorio nacional.
            </p>
          </Reveal>
          <Reveal delay={0.85} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="#soluciones" className="btn btn-primary">
                Conoce nuestras soluciones
                <ArrowRight className="arrow h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contacto" className="btn btn-ghost">
                Habla con ANASEC
                <ArrowUpRight className="arrow h-4 w-4" />
              </a>
            </Magnetic>
          </Reveal>
          <Reveal delay={1} className="mt-8">
            <a
              href="#network"
              className="group inline-flex items-center gap-3 rounded-full py-2 text-sm font-medium text-fg2 transition-colors hover:text-accent"
            >
              <span className="relative grid h-9 w-9 place-items-center rounded-full border border-line-strong">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/20 [animation-duration:2.6s]" />
                <Network className="relative h-4 w-4 text-accent" />
              </span>
              Explora <strong className="font-semibold text-fg group-hover:text-accent">ANASEC Digital Network</strong>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

      </div>

      <div className="container-x relative mt-14">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {KPIS.map((k, i) => (
            <li key={k.label} className="glass rounded-2xl px-4 py-3 backdrop-blur-md">
              <motion.div initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <p className="text-[1.4rem] font-bold leading-none tracking-tight text-fg">{k.value}</p>
                <p className="mt-1.5 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-fg3">{k.label}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-fg3 lg:flex">
        Explorar
        <span className="relative h-9 w-px overflow-hidden bg-line-strong">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-accent"
            animate={{ y: [-12, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
