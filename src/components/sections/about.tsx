"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Cable, Cpu, Handshake, Landmark, Lightbulb, Sparkles, Users, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { NetworkBackground } from "@/components/canvas/network-bg";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";

const PARTS: { label: string; icon: LucideIcon }[] = [
  { label: "Estado", icon: Landmark },
  { label: "Tecnología", icon: Cpu },
  { label: "Infraestructura", icon: Cable },
  { label: "Innovación", icon: Lightbulb },
  { label: "Talento", icon: Users },
];

/* posición horizontal (%) de los 6 nodos del diagrama de escritorio */
const XS = [8.2, 25.6, 43, 60.4, 77.8, 95];

const RIBBON = ["Estado", "Tecnología", "Infraestructura", "Innovación", "Talento", "Impacto"];

/** Fondo vivo: red de nodos, rejilla y resplandores que se desplazan con el scroll. */
function LiveBackground({ progress, reduce }: { progress: MotionValue<number>; reduce: boolean }) {
  const blueX = useTransform(progress, [0, 1], ["-15%", "60%"]);
  const blueY = useTransform(progress, [0, 1], ["0%", "60%"]);
  const greenX = useTransform(progress, [0, 1], ["75%", "0%"]);
  const greenY = useTransform(progress, [0, 1], ["65%", "0%"]);
  const gridY = useTransform(progress, [0, 1], [0, -180]);
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-bg2">
      <motion.div style={reduce ? undefined : { y: gridY }} className="grid-bg absolute inset-x-0 -top-40 bottom-[-180px] opacity-80" />
      <motion.div style={reduce ? undefined : { left: blueX, top: blueY }} className="absolute h-[560px] w-[560px] rounded-full bg-brand-blue/30 blur-[120px]" />
      <motion.div style={reduce ? undefined : { left: greenX, top: greenY }} className="absolute h-[480px] w-[480px] rounded-full bg-brand-green/25 blur-[120px]" />
      {!reduce && <NetworkBackground className="absolute inset-0 opacity-60" />}
    </div>
  );
}

export function About() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -50]);

  return (
    <section ref={ref} id="anasec" aria-labelledby="anasec-title" className="relative isolate overflow-hidden">
      <LiveBackground progress={scrollYProgress} reduce={!!reduce} />

      {/* cinta de ecuación */}
      <div aria-hidden className="marquee border-b border-line bg-bg/60 py-4 backdrop-blur-sm [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] sm:py-5">
        <div className="marquee-track" style={{ ["--dur" as string]: "46s" }}>
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {RIBBON.map((r, i) => (
                <span key={r} className="flex items-center">
                  <span
                    className={`px-6 text-[clamp(2.2rem,6vw,4.8rem)] font-extrabold uppercase leading-none tracking-tighter ${
                      r === "Impacto" ? "text-grad" : "text-transparent [-webkit-text-stroke:1.5px_var(--line-strong)]"
                    }`}
                  >
                    {r}
                  </span>
                  <span className="text-[clamp(1.5rem,3.6vw,2.8rem)] font-light text-fg3">{i < RIBBON.length - 2 ? "+" : i === RIBBON.length - 2 ? "=" : "·"}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container-x section-pad">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* IZQUIERDA */}
          <div>
            <Reveal>
              <span className="eyebrow">02 · Quiénes somos</span>
            </Reveal>
            <TextReveal
              as="h2"
              text="Un aliado estratégico para la transformación"
              highlight={["estratégico", "transformación"]}
              className="h-section mt-5"
            />
            <div id="anasec-title" className="sr-only">
              Quiénes somos y modelo de valor
            </div>

            <Reveal delay={0.2} className="relative mx-auto mt-12 w-full max-w-[420px] lg:mx-0">
              <div aria-hidden className="absolute inset-x-[6%] bottom-0 top-[18%] rounded-t-[999px] bg-[image:var(--grad-brand)] opacity-90" />
              <div aria-hidden className="absolute -inset-3 rounded-t-[999px] border border-dashed border-line-strong" />
              {!reduce && (
                <motion.div
                  aria-hidden
                  className="absolute left-1/2 top-[8%] h-[84%] w-[92%] -translate-x-1/2 rounded-full border border-accent/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-brand-green shadow-[0_0_14px_var(--green)]" />
                </motion.div>
              )}
              <motion.div style={reduce ? undefined : { y: photoY }} className="relative">
                <Image
                  src="/persona.png"
                  alt="Profesional de ANASEC sosteniendo un libro y señalando al frente"
                  width={822}
                  height={1000}
                  sizes="(min-width:1024px) 420px, 80vw"
                  className="relative mx-auto h-auto w-[86%] drop-shadow-[0_30px_40px_rgba(6,16,40,0.35)]"
                />
              </motion.div>
              <div className="glass animate-float absolute -left-2 top-[22%] rounded-2xl px-4 py-3 shadow-[var(--shadow)] md:-left-10">
                <p className="text-2xl font-bold leading-none tracking-tight text-fg">
                  <Counter to={34} prefix="+" />
                </p>
                <p className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-fg3">Contratos ejecutados</p>
              </div>
              <div className="glass animate-float absolute -right-2 top-2 rounded-2xl px-4 py-3 shadow-[var(--shadow)] md:-right-8" style={{ animationDelay: "-2.5s" }}>
                <p className="text-xl font-bold leading-none tracking-tight text-fg">
                  <Counter to={150000} prefix="+$" suffix=" M" />
                </p>
                <p className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-fg3">COP gestionados</p>
              </div>
              <div className="glass absolute -right-2 bottom-8 max-w-[190px] rounded-2xl px-4 py-3 md:-right-8">
                <p className="text-[0.72rem] font-medium leading-snug text-fg2">
                  Pensando en el bienestar de las <strong className="text-fg">personas, sus hogares y sus instituciones.</strong>
                </p>
              </div>
            </Reveal>
          </div>

          {/* DERECHA */}
          <div className="lg:pt-6">
            <Reveal delay={0.1}>
              <p className="text-[clamp(1.25rem,2.1vw,1.7rem)] font-medium leading-[1.5] tracking-[-0.01em] text-fg">
                En respuesta a las necesidades de actualización tecnológica de los diferentes sectores del país,{" "}
                <span className="text-grad font-semibold">ANASEC se consolida como el aliado estratégico integral</span> para
                la modernización que el mercado exige.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lead mt-7">
                Mediante una estructura de economía mixta, desplegamos soluciones que abarcan desde infraestructura tecnológica
                avanzada hasta estrategias de desarrollo e innovación, pensando en el bienestar de las personas, sus hogares y
                sus instituciones.
              </p>
            </Reveal>

            {/* economía mixta */}
            <Reveal delay={0.3} className="glass mt-10 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
                <svg viewBox="0 0 260 160" className="w-full max-w-[260px] shrink-0" role="img" aria-label="Sector público y sector privado se unen en la economía mixta">
                  <defs>
                    <linearGradient id="mx-a" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#137ec6" />
                      <stop offset="1" stopColor="#13a1a9" />
                    </linearGradient>
                    <linearGradient id="mx-b" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#13a1a9" />
                      <stop offset="1" stopColor="#66be56" />
                    </linearGradient>
                    <clipPath id="mx-clip">
                      <circle cx="100" cy="80" r="62" />
                    </clipPath>
                  </defs>
                  <motion.circle
                    cx="100" cy="80" r="62" fill="url(#mx-a)" fillOpacity="0.22" stroke="url(#mx-a)" strokeWidth="1.5"
                    initial={reduce ? false : { x: -26, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.circle
                    cx="160" cy="80" r="62" fill="url(#mx-b)" fillOpacity="0.22" stroke="url(#mx-b)" strokeWidth="1.5"
                    initial={reduce ? false : { x: 26, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <g clipPath="url(#mx-clip)">
                    <circle cx="160" cy="80" r="62" fill="#66be56" fillOpacity="0.45" />
                  </g>
                  <text x="66" y="84" textAnchor="middle" className="fill-fg" fontSize="10" fontWeight="600">PÚBLICO</text>
                  <text x="194" y="84" textAnchor="middle" className="fill-fg" fontSize="10" fontWeight="600">PRIVADO</text>
                  <text x="130" y="82" textAnchor="middle" className="fill-fg" fontSize="8" fontWeight="700">ANASEC</text>
                </svg>
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent">Estructura de economía mixta</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-fg2">
                    Articulamos las capacidades de los sectores público y privado mediante soluciones innovadoras, eficientes y
                    normativamente rigurosas.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ECUACIÓN DE CAPACIDADES */}
        <div className="mt-24 lg:mt-32">
          <Reveal className="mb-10 flex items-center gap-4">
            <Sparkles className="h-5 w-5 text-accent" aria-hidden />
            <p className="eyebrow !before:hidden">Modelo de valor · cómo se conectan las capacidades</p>
          </Reveal>

          {/* escritorio */}
          <div
            className="relative hidden w-full lg:block"
            style={{ aspectRatio: "1100 / 300" }}
            role="img"
            aria-label="Estado más tecnología más infraestructura más innovación más talento igual impacto"
          >
            <svg viewBox="0 0 1100 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="eq-g" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#137ec6" />
                  <stop offset="1" stopColor="#66be56" />
                </linearGradient>
              </defs>
              {XS.slice(0, 5).map((x, i) => (
                <motion.line
                  key={`l${i}`}
                  x1={(x / 100) * 1100 + 46} y1="100" x2={(XS[i + 1] / 100) * 1100 - 46} y2="100"
                  stroke="url(#eq-g)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
                  initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.25 }}
                />
              ))}
              {XS.slice(0, 5).map((x, i) => (
                <motion.path
                  key={`a${i}`}
                  d={`M ${(x / 100) * 1100} 152 C ${(x / 100) * 1100} 268, ${(XS[5] / 100) * 1100} 268, ${(XS[5] / 100) * 1100} 152`}
                  fill="none" stroke="url(#eq-g)" strokeWidth="1.2" strokeDasharray="4 7" vectorEffect="non-scaling-stroke" className="opacity-60"
                  initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.4, delay: 1.2 + i * 0.15, ease: "easeInOut" }}
                />
              ))}
            </svg>

            {PARTS.map((p, i) => (
              <motion.div
                key={p.label}
                className="absolute top-[33.3%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3"
                style={{ left: `${XS[i]}%` }}
                initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="glass grid h-[92px] w-[92px] place-items-center rounded-full shadow-[var(--shadow)] transition-transform duration-500 hover:scale-110">
                  <p.icon className="h-8 w-8 text-accent" strokeWidth={1.5} aria-hidden />
                </span>
                <span className="absolute top-[100px] whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg2">
                  {p.label}
                </span>
              </motion.div>
            ))}
            {XS.slice(0, 5).map((x, i) => (
              <span
                key={`s${i}`}
                aria-hidden
                className="absolute top-[33.3%] -translate-x-1/2 -translate-y-1/2 px-1 text-xl font-light text-fg3"
                style={{ left: `${(x + XS[i + 1]) / 2}%` }}
              >
                {i < 4 ? "+" : "="}
              </span>
            ))}
            <motion.div
              className="absolute top-[33.3%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${XS[5]}%` }}
              initial={reduce ? false : { opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative grid h-[104px] w-[104px] place-items-center rounded-full bg-[image:var(--grad-brand)] text-center shadow-[0_18px_50px_-12px_rgba(19,126,198,0.7)]">
                <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-brand-blue/30 [animation-duration:3s]" />
                <span className="relative font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white">Impacto</span>
              </span>
            </motion.div>
          </div>

          {/* móvil / tablet */}
          <ol className="lg:hidden" aria-label="Estado más tecnología más infraestructura más innovación más talento igual impacto">
            {PARTS.map((p, i) => (
              <li key={p.label}>
                <Reveal delay={i * 0.05} className="flex items-center gap-4">
                  <span className="glass grid h-14 w-14 shrink-0 place-items-center rounded-full">
                    <p.icon className="h-6 w-6 text-accent" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="font-mono text-sm uppercase tracking-[0.16em] text-fg">{p.label}</span>
                </Reveal>
                <div aria-hidden className="ml-[27px] flex h-9 items-center border-l border-dashed border-line-strong pl-6 text-lg text-fg3">
                  {i < 4 ? "+" : "="}
                </div>
              </li>
            ))}
            <li>
              <Reveal>
                <span className="inline-flex h-16 items-center rounded-full bg-[image:var(--grad-brand)] px-8 font-mono text-sm font-bold uppercase tracking-[0.16em] text-white shadow-[0_18px_40px_-14px_rgba(19,126,198,0.7)]">
                  Impacto
                </span>
              </Reveal>
            </li>
          </ol>
          <Handshake className="sr-only" aria-hidden />
        </div>
      </div>
    </section>
  );
}
