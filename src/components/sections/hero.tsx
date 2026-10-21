"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Network } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandCorners } from "@/components/ui/brand-corners";
import { Counter } from "@/components/ui/counter";
import { Magnetic } from "@/components/ui/magnetic";
import { SITE } from "@/lib/site";

const LOOP = 10; // duración del video en segundos

/** Textos que aparecen y se mueven de lugar a medida que avanza el video. */
const CUES = [
  {
    from: 0.4,
    to: 3.4,
    pos: "left-0 bottom-0 md:bottom-[22%] md:max-w-[34rem]",
    eyebrow: SITE.concept,
    text: "Transformamos desafíos",
    size: "text-[clamp(2rem,5.2vw,4.6rem)]",
  },
  {
    from: 3.5,
    to: 6.4,
    pos: "left-0 bottom-0 md:left-auto md:right-0 md:top-[30%] md:bottom-auto md:max-w-[30rem] md:text-right",
    text: "en soluciones",
    size: "text-[clamp(2rem,5.2vw,4.6rem)]",
    grad: true,
  },
  {
    from: 6.5,
    to: 9.8,
    pos: "left-0 bottom-0 md:bottom-[22%] md:max-w-[36rem]",
    text: "que hacen avanzar a Colombia.",
    size: "text-[clamp(1.8rem,4.4vw,3.8rem)]",
    lead:
      "ANASEC articula tecnología, infraestructura, innovación y capacidades institucionales para desarrollar proyectos de alto impacto en todo el territorio nacional.",
  },
] as const;

const KPIS = [
  { value: <Counter to={34} prefix="+" />, label: "Contratos ejecutados" },
  { value: <Counter to={150000} prefix="+$" duration={2.6} />, label: "Millones COP gestionados" },
  { value: "Cobertura nacional", label: "Presencia en el territorio" },
  { value: "Economía mixta", label: "Estado + sector privado" },
];

const shadow = "[text-shadow:0_2px_28px_rgb(0_0_0/0.6)]";

export function Hero() {
  const reduce = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [t, setT] = useState(0);

  // Reloj sincronizado con el video; si no se reproduce (autoplay bloqueado), avanza solo.
  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const v = video.current;
      const playing = v && !v.paused && v.readyState > 2;
      setT(playing ? v.currentTime : ((performance.now() - start) / 1000) % LOOP);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const cue = CUES.find((c) => t >= c.from && t < c.to);

  return (
    <section id="inicio" aria-labelledby="hero-title" className="surface-dark relative isolate min-h-[100svh] overflow-hidden">
      {/* fondo: el video es el protagonista; solo un velo suave para legibilidad */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--bg),var(--bg-2))]" />
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          src="/video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(5_13_30/0.72)_0%,transparent_34%),linear-gradient(180deg,rgb(5_13_30/0.5)_0%,transparent_22%)]" />
      </div>
      <BrandCorners />

      <h1 id="hero-title" className="sr-only">
        Transformamos desafíos en soluciones que hacen avanzar a Colombia. {SITE.concept}.
      </h1>

      {/* textos que van apareciendo con el video */}
      <div className="container-x pointer-events-none absolute inset-x-0 top-[96px] bottom-[210px] sm:bottom-[190px] md:bottom-[170px]">
        {reduce ? (
          <div className="flex h-full max-w-xl flex-col justify-end">
            <p className={`h-display ${shadow}`} aria-hidden>
              Transformamos desafíos en soluciones que hacen avanzar a Colombia.
            </p>
            <p className="lead mt-5">{CUES[2].lead}</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {cue && (
              <motion.div
                key={cue.from}
                aria-hidden
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute ${cue.pos}`}
              >
                {"eyebrow" in cue && <span className="eyebrow">{cue.eyebrow}</span>}
                <p className={`mt-4 font-bold leading-[1.02] tracking-[-0.035em] ${cue.size} ${"grad" in cue ? "text-grad [filter:drop-shadow(0_2px_16px_rgb(0_0_0/0.5))]" : `text-white ${shadow}`}`}>
                  {cue.text}
                </p>
                {"lead" in cue && <p className={`lead mt-5 max-w-md !text-white/85 ${shadow}`}>{cue.lead}</p>}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* barra fija inferior: acciones + indicadores */}
      <div className="container-x absolute inset-x-0 bottom-0 z-10 pb-6 sm:pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <Magnetic>
            <a href="#soluciones" className="btn btn-primary">
              Conoce nuestras soluciones
              <ArrowRight className="arrow h-4 w-4" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contacto" className="btn btn-ghost backdrop-blur-md">
              Habla con ANASEC
              <ArrowUpRight className="arrow h-4 w-4" />
            </a>
          </Magnetic>
          <a href="#network" className="group ml-1 hidden items-center gap-2 text-sm font-medium text-fg2 transition-colors hover:text-accent lg:inline-flex">
            <Network className="h-4 w-4 text-accent" />
            Explora <strong className="font-semibold text-fg group-hover:text-accent">ANASEC Digital Network</strong>
          </a>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          {KPIS.map((k) => (
            <li key={k.label} className="glass rounded-xl px-3.5 py-2.5 backdrop-blur-md">
              <p className="text-[1.1rem] font-bold leading-none tracking-tight text-fg">{k.value}</p>
              <p className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-fg3">{k.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
