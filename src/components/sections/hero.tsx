"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Network } from "lucide-react";
import { ColombiaParticles } from "@/components/canvas/colombia-particles";
import { BrandCorners } from "@/components/ui/brand-corners";
import { Counter } from "@/components/ui/counter";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { SITE } from "@/lib/site";

const kpiBase = "glass relative rounded-2xl px-4 py-3 md:absolute shadow-[var(--shadow)]";

export function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ry = useSpring(useTransform(mx, [-1, 1], [-7, 7]), { stiffness: 90, damping: 18 });
  const rx = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 90, damping: 18 });

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden pb-20 pt-[104px] lg:pt-[112px]"
      onPointerMove={(e) => {
        if (reduce || e.pointerType === "touch") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
    >
      {/* fondo */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_75%_30%,var(--bg-3),transparent_70%),linear-gradient(180deg,var(--bg),var(--bg-2))]" />
        <div className="animate-orb absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-brand-blue/25 blur-[110px]" />
        <div
          className="animate-orb absolute right-[8%] top-[55%] h-[360px] w-[360px] rounded-full bg-brand-green/20 blur-[110px]"
          style={{ animationDelay: "-7s" }}
        />
        <div className="grid-bg absolute inset-0 opacity-70" />
      </div>
      <BrandCorners />

      <div className="container-x relative grid items-center gap-10 lg:min-h-[calc(100svh-180px)] lg:grid-cols-[1.02fr_1fr] lg:gap-6">
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

        {/* mapa + indicadores */}
        <div className="relative mx-auto w-full" style={{ perspective: 1200, maxWidth: "min(100%, 68svh)" }}>
          <motion.div style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative">
            <div aria-hidden className="absolute inset-[8%] -z-10 rounded-full bg-[radial-gradient(circle,rgb(var(--rgb-glow)/0.22),transparent_65%)] blur-2xl" />
            <ColombiaParticles className="block w-full" />

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 grid grid-cols-2 gap-3 md:contents"
            >
              <div className={`${kpiBase} md:left-[-6%] md:top-[9%]`}>
                <div className="animate-float">
                  <p className="text-[1.65rem] font-bold leading-none tracking-tight text-fg">
                    <Counter to={34} prefix="+" />
                  </p>
                  <p className="mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-fg3">Contratos ejecutados</p>
                </div>
              </div>
              <div className={`${kpiBase} md:right-[-4%] md:top-[40%]`}>
                <div className="animate-float" style={{ animationDelay: "-2s" }}>
                  <p className="text-[1.65rem] font-bold leading-none tracking-tight text-fg">
                    <Counter to={150000} prefix="+$" duration={2.6} />
                  </p>
                  <p className="mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-fg3">Millones COP gestionados</p>
                </div>
              </div>
              <div className={`${kpiBase} md:bottom-[13%] md:left-[-2%]`}>
                <div className="animate-float" style={{ animationDelay: "-4s" }}>
                  <p className="text-[1.05rem] font-bold leading-tight tracking-tight text-fg">Cobertura nacional</p>
                  <p className="mt-1.5 flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-fg3">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_8px_var(--green)]" /> Presencia en el territorio
                  </p>
                </div>
              </div>
              <div className={`${kpiBase} md:bottom-[2%] md:right-[8%]`}>
                <div className="animate-float" style={{ animationDelay: "-1s" }}>
                  <p className="text-[1.05rem] font-bold leading-tight tracking-tight text-fg">Economía mixta</p>
                  <p className="mt-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-fg3">Estado + sector privado</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
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
