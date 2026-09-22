"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Orbit } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { NETWORK_NODES, NETWORK_RELATIONS, relationKey, type NetworkNodeId } from "@/lib/content";

const RADIUS = 38;
const angle = (i: number) => (-90 + i * (360 / NETWORK_NODES.length)) * (Math.PI / 180);
const POS = NETWORK_NODES.map((_, i) => ({
  x: 50 + RADIUS * Math.cos(angle(i)),
  y: 50 + RADIUS * Math.sin(angle(i)),
}));
const byId = new Map(NETWORK_NODES.map((n, i) => [n.id, i]));

export function DigitalNetwork() {
  const reduce = useReducedMotion();
  const [selId, setSelId] = useState<NetworkNodeId>("tecnologia");
  const selIndex = byId.get(selId)!;
  const selected = NETWORK_NODES[selIndex];

  const relations = useMemo(
    () =>
      NETWORK_NODES.filter((n) => n.id !== selId).map((n) => ({
        node: n,
        text: NETWORK_RELATIONS[relationKey(selId, n.id)],
      })),
    [selId],
  );

  return (
    <section id="network" aria-labelledby="net-title" className="section-pad relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--bg-3),transparent_72%)]" />
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-50" />

      <div className="container-x">
        <SectionHeading eyebrow="06 · La experiencia ANASEC" title="ANASEC Digital Network" highlight={["Network"]} align="center">
          No solamente ejecutamos proyectos: conectamos capacidades para hacerlos posibles. Selecciona un nodo y descubre
          cómo esa capacidad se articula con las demás, hasta convertirse en impacto territorial.
        </SectionHeading>

        <div className="mt-16 grid items-center gap-10 lg:mt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-14 xl:gap-20">
          {/* DIAGRAMA */}
          <Reveal className="relative mx-auto aspect-square w-full max-w-[500px]">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
              {/* rayos tenues desde el centro */}
              {POS.map((p, i) => (
                <line key={`h${i}`} x1={50} y1={50} x2={p.x} y2={p.y} stroke="var(--line-strong)" strokeWidth="0.4" />
              ))}
              {/* conexiones activas desde el nodo seleccionado */}
              {POS.map((p, i) => {
                if (i === selIndex) return null;
                const from = POS[selIndex];
                return (
                  <line
                    key={`s${i}`}
                    x1={from.x}
                    y1={from.y}
                    x2={p.x}
                    y2={p.y}
                    stroke="var(--accent)"
                    strokeOpacity="0.55"
                    strokeWidth="0.5"
                    className={reduce ? undefined : "dash-flow"}
                  />
                );
              })}
              <line x1={50} y1={50} x2={POS[selIndex].x} y2={POS[selIndex].y} stroke="var(--accent-2)" strokeWidth="0.7" />
            </svg>

            {/* núcleo ANASEC */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span aria-hidden className="absolute inset-0 -m-3 animate-ping rounded-full bg-accent/15 [animation-duration:3s]" />
              <span className="glass relative grid h-[76px] w-[76px] place-items-center rounded-full shadow-[var(--shadow)] sm:h-[92px] sm:w-[92px]">
                <Orbit className="h-7 w-7 text-accent sm:h-8 sm:w-8" strokeWidth={1.5} aria-hidden />
              </span>
            </div>

            {/* nodos */}
            {NETWORK_NODES.map((n, i) => {
              const on = n.id === selId;
              const p = POS[i];
              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setSelId(n.id)}
                  aria-pressed={on}
                  aria-label={`${n.label}: ${n.summary}`}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 outline-offset-4"
                >
                  <span
                    className={`relative grid h-[62px] w-[62px] place-items-center rounded-full border transition-all duration-500 sm:h-[76px] sm:w-[76px] ${
                      on
                        ? "scale-110 border-transparent bg-[image:var(--grad-brand)] text-white shadow-[0_14px_34px_-10px_rgba(19,126,198,0.75)]"
                        : "glass text-fg2 hover:scale-105 hover:text-accent"
                    }`}
                  >
                    <n.icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span
                    className={`pointer-events-none absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-[0.14em] transition-colors sm:text-[0.68rem] ${
                      on ? "font-semibold text-accent" : "text-fg3"
                    }`}
                  >
                    {n.label}
                  </span>
                </button>
              );
            })}
          </Reveal>

          {/* PANEL */}
          <motion.div
            key={selId}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-[32px] p-7 shadow-[var(--shadow)] sm:p-9"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[image:var(--grad-brand)] text-white">
                <selected.icon className="h-7 w-7" strokeWidth={1.6} aria-hidden />
              </span>
              <div>
                <p className="eyebrow !before:hidden">Nodo seleccionado</p>
                <h3 id="net-title" className="mt-1 text-[1.5rem] font-bold leading-tight tracking-tight">
                  {selected.label}
                </h3>
              </div>
            </div>
            <p className="mt-5 text-[0.96rem] leading-relaxed text-fg2">{selected.summary}</p>

            <h4 className="eyebrow mt-8">Se conecta con</h4>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {relations.map(({ node, text }) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelId(node.id)}
                  className="group flex items-start gap-3 rounded-2xl border border-line px-4 py-3 text-left transition-colors hover:border-accent/50 hover:bg-[var(--glass)]"
                >
                  <node.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.8} aria-hidden />
                  <span>
                    <span className="block text-[0.78rem] font-semibold text-fg">{node.label}</span>
                    <span className="mt-0.5 block text-[0.78rem] leading-snug text-fg3">{text}</span>
                  </span>
                </button>
              ))}
            </div>

            <h4 className="eyebrow mt-8">Recorrido: de la capacidad al impacto</h4>
            <ol className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-3" aria-label={`Recorrido desde ${selected.label} hasta el impacto territorial`}>
              {selected.chain.map((step, i) => (
                <li key={step} className="flex items-center gap-1.5">
                  {i > 0 && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-fg3" aria-hidden />}
                  <span
                    className={`rounded-full px-3 py-1.5 text-[0.72rem] font-medium leading-none ${
                      i === selected.chain.length - 1
                        ? "bg-[image:var(--grad-brand)] text-white"
                        : i === 0
                          ? "border border-accent text-accent"
                          : "border border-line-strong text-fg2"
                    }`}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
