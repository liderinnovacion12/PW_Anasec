"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CAPABILITIES, type Capability } from "@/lib/content";

const LINKS: Record<Capability["id"], string> = {
  infra: "/tecnologia#infraestructura",
  academica: "/tecnologia#formacion",
  formacion: "/tecnologia#formacion",
  ciber: "/tecnologia#ciberseguridad",
  logistica: "/tecnologia#logistica",
};

/** Ilustración animada (SVG + CSS) de cada línea; solo se anima cuando está activa. */
function CapArt({ id, active }: { id: Capability["id"]; active: boolean }) {
  const run = active ? "running" : "paused";
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 320"
      className={`pointer-events-none absolute -bottom-6 -right-6 h-[300px] w-[300px] transition-opacity duration-700 ${active ? "opacity-100" : "opacity-0"}`}
      fill="none"
    >
      {id === "infra" && (
        <g stroke="#fff" strokeOpacity="0.55" strokeWidth="1.4">
          {[60, 110, 160, 210, 260].map((y, i) => (
            <g key={y}>
              <path d={`M0 ${y} C 90 ${y - 30}, 170 ${y + 30}, 320 ${y - 10}`} strokeOpacity="0.25" />
              <path
                d={`M0 ${y} C 90 ${y - 30}, 170 ${y + 30}, 320 ${y - 10}`}
                strokeDasharray="6 22"
                style={{ animation: `flow ${1.2 + i * 0.25}s linear infinite`, animationPlayState: run }}
              />
              <circle cx={40 + i * 55} cy={y - 8 + (i % 2) * 6} r="3.2" fill="#66be56" stroke="none" />
            </g>
          ))}
        </g>
      )}
      {id === "academica" && (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x="90"
              y={70 + i * 34}
              width={180 - (i % 3) * 40}
              height="14"
              rx="7"
              fill="#fff"
              fillOpacity={0.22 + (i % 2) * 0.12}
              style={{ transformOrigin: "90px 0", animation: `eq ${2.2 + i * 0.3}s ease-in-out infinite`, animationPlayState: run, transformBox: "fill-box" }}
            />
          ))}
          <text x="60" y="60" fill="#fff" fillOpacity="0.5" fontSize="30" fontFamily="monospace">{"</>"}</text>
        </g>
      )}
      {id === "formacion" && (
        <g fill="#fff">
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={60 + i * 42}
              y={250 - (i + 1) * 40}
              width="30"
              height={(i + 1) * 40}
              rx="6"
              fillOpacity={0.18 + i * 0.07}
              style={{ transformOrigin: "50% 100%", transformBox: "fill-box", animation: `eq ${2.6}s ease-in-out ${i * 0.25}s infinite`, animationPlayState: run }}
            />
          ))}
        </g>
      )}
      {id === "ciber" && (
        <g stroke="#fff" strokeWidth="1.3">
          {[50, 90, 130].map((r, i) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              strokeOpacity="0.28"
              style={{ transformOrigin: "200px 200px", animation: `pulse-ring ${3.2}s ease-out ${i * 0.9}s infinite`, animationPlayState: run }}
            />
          ))}
          <path d="M200 140 l46 18 v34 c0 30-22 48-46 58 c-24-10-46-28-46-58 v-34z" fill="#fff" fillOpacity="0.14" strokeOpacity="0.7" />
          <path d="M180 200 l14 14 l28-30" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {id === "logistica" && (
        <g stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2">
          <circle cx="200" cy="200" r="46" />
          <circle cx="200" cy="200" r="88" />
          <circle cx="200" cy="200" r="130" />
          <circle cx="200" cy="200" r="10" fill="#fff" stroke="none" fillOpacity="0.85" />
          {[46, 88, 130].map((r, i) => (
            <g key={r} style={{ transformOrigin: "200px 200px", animation: `sweep ${10 + i * 6}s linear infinite ${i % 2 ? "reverse" : ""}`, animationPlayState: run }}>
              <circle cx={200 + r} cy="200" r="6" fill="#66be56" stroke="none" />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

export function Capabilities() {
  const [active, setActive] = useState(0);

  return (
    <section id="soluciones" aria-labelledby="cap-title" className="section-pad relative">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="04 · Líneas estratégicas de solución" title="Cinco capacidades. Una visión integral." highlight={["integral."]} />
          <Reveal delay={0.2} className="max-w-sm">
            <p className="lead !text-[0.98rem]">
              Explora cada capacidad: pasa el cursor, usa el teclado o toca una tarjeta para descubrir sus servicios.
            </p>
          </Reveal>
        </div>
        <h2 id="cap-title" className="sr-only">
          Líneas estratégicas de solución
        </h2>

        {/* ESCRITORIO — paneles que se expanden */}
        <Reveal delay={0.1} className="mt-7 hidden h-[520px] gap-3 lg:flex">
          {CAPABILITIES.map((c, i) => {
            const on = i === active;
            return (
              <article
                key={c.id}
                onMouseEnter={() => setActive(i)}
                className="group relative min-w-0 overflow-hidden rounded-[28px] text-white shadow-[var(--shadow)] transition-[flex] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ flex: on ? 4.2 : 1, background: c.gradient }}
              >
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.22),transparent_55%)]" />
                <div aria-hidden className={`grid-bg absolute inset-0 opacity-30 mix-blend-overlay`} style={{ ["--line" as string]: "rgba(255,255,255,0.35)" }} />
                <CapArt id={c.id} active={on} />

                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`cap-${c.id}`}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="absolute inset-0 z-10 h-full w-full rounded-[28px] text-left outline-offset-[-4px]"
                >
                  <span className="sr-only">
                    {c.n} {c.title}
                  </span>
                </button>

                {/* estado colapsado */}
                <div
                  className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-8 transition-opacity duration-500 ${on ? "opacity-0" : "opacity-100 delay-300"}`}
                >
                  <span className="font-mono text-sm tracking-[0.2em] text-white/80">{c.n}</span>
                  <span className="[writing-mode:vertical-rl] rotate-180 text-[1.05rem] font-semibold tracking-tight">{c.short}</span>
                  <c.icon className="h-7 w-7 text-white/85" strokeWidth={1.5} aria-hidden />
                </div>

                {/* estado expandido */}
                <div
                  id={`cap-${c.id}`}
                  className={`pointer-events-none absolute inset-y-0 left-0 z-20 flex w-[min(460px,100%)] flex-col justify-between p-9 transition-all duration-700 ${
                    on ? "translate-x-0 opacity-100 delay-300" : "-translate-x-4 opacity-0"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm tracking-[0.2em] text-white/80">{c.n}</span>
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur-md">
                      <c.icon className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[1.85rem] font-bold leading-[1.1] tracking-tight">{c.title}</h3>
                    <p className="mt-4 text-[0.95rem] leading-relaxed text-white/85">{c.description}</p>
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Servicios relacionados">
                      {c.services.map((s) => (
                        <li key={s} className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[0.72rem] font-medium backdrop-blur-sm">
                          {s}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={LINKS[c.id]}
                      className="pointer-events-auto relative z-30 mt-7 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
                    >
                      Explorar capacidad <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </Reveal>

        {/* MÓVIL / TABLET — acordeón vertical */}
        <div className="mt-12 flex flex-col gap-3 lg:hidden">
          {CAPABILITIES.map((c, i) => {
            const on = i === active;
            return (
              <Reveal key={c.id} delay={i * 0.05}>
                <article className="relative overflow-hidden rounded-3xl text-white shadow-[var(--shadow)]" style={{ background: c.gradient }}>
                  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.2),transparent_60%)]" />
                  <CapArt id={c.id} active={on} />
                  <h3 className="relative">
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={`capm-${c.id}`}
                      onClick={() => setActive(on ? -1 : i)}
                      className="flex min-h-[76px] w-full items-center gap-4 p-5 text-left"
                    >
                      <span className="font-mono text-sm tracking-[0.18em] text-white/80">{c.n}</span>
                      <span className="flex-1 text-[1.08rem] font-semibold leading-tight tracking-tight">{c.title}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-500 ${on ? "rotate-180" : ""}`} />
                    </button>
                  </h3>
                  <div
                    id={`capm-${c.id}`}
                    className={`relative grid transition-[grid-template-rows] duration-500 ease-out ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-6">
                        <p className="max-w-[92%] text-[0.94rem] leading-relaxed text-white/88">{c.description}</p>
                        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Servicios relacionados">
                          {c.services.map((s) => (
                            <li key={s} className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[0.72rem] font-medium">
                              {s}
                            </li>
                          ))}
                        </ul>
                        <Link href={LINKS[c.id]} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
                          Explorar capacidad <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
