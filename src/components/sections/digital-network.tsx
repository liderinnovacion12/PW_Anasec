"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { NETWORK_NODES, NETWORK_RELATIONS, relationKey, type NetworkNodeId } from "@/lib/content";

/** ANASEC Digital Network: índice tipográfico gigante + ruta de la capacidad al impacto que se dibuja sola. */
export function DigitalNetwork() {
  const reduce = useReducedMotion();
  const [selId, setSelId] = useState<NetworkNodeId>("tecnologia");
  const selIndex = NETWORK_NODES.findIndex((n) => n.id === selId);
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
      <div className="container-x">
        <SectionHeading eyebrow="06 · La experiencia ANASEC" title="ANASEC Digital Network" titleId="net-title" highlight={["Network"]}>
          No solamente ejecutamos proyectos: conectamos capacidades para hacerlos posibles. Elige una capacidad y mira cómo
          viaja, paso a paso, hasta convertirse en impacto territorial.
        </SectionHeading>

        <div className="mt-8 grid gap-8 lg:mt-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          {/* ÍNDICE TIPOGRÁFICO */}
          <Reveal>
            <ul className="border-t border-line" role="tablist" aria-label="Capacidades de la red" aria-orientation="vertical">
              {NETWORK_NODES.map((n, i) => {
                const on = n.id === selId;
                return (
                  <li key={n.id} className="border-b border-line">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setSelId(n.id)}
                      onMouseEnter={() => setSelId(n.id)}
                      onFocus={() => setSelId(n.id)}
                      className="group relative flex w-full items-center gap-4 py-2 text-left outline-offset-[-2px] sm:gap-5 sm:py-2.5"
                    >
                      <span className={`w-8 font-mono text-sm font-semibold transition-colors ${on ? "text-accent" : "text-fg3"}`}>{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={`flex-1 text-[clamp(1.5rem,3.4vw,2.5rem)] font-extrabold uppercase leading-none tracking-tighter transition-all duration-500 ${
                          on
                            ? "translate-x-2 text-grad"
                            : "text-transparent [-webkit-text-stroke:1.3px_var(--line-strong)] group-hover:[-webkit-text-stroke-color:var(--accent)]"
                        }`}
                      >
                        {n.label}
                      </span>
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                          on ? "border-transparent bg-[image:var(--grad-brand)] text-white shadow-[0_10px_26px_-8px_rgba(19,126,198,0.8)]" : "border-line-strong text-fg3"
                        }`}
                      >
                        <n.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                      </span>
                      {on && (
                        <motion.span
                          layoutId={reduce ? undefined : "net-bar"}
                          aria-hidden
                          className="absolute inset-x-0 bottom-[-1px] h-[3px] bg-[image:var(--grad-brand)]"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* RUTA + CONEXIONES */}
          <div aria-live="polite" className="relative min-h-[340px]">
            <selected.icon aria-hidden className="pointer-events-none absolute -right-6 -top-6 h-52 w-52 text-accent opacity-[0.07]" strokeWidth={1} />
            <AnimatePresence mode="wait">
              <motion.div
                key={selId}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <p className="text-[clamp(1.15rem,1.7vw,1.4rem)] font-semibold leading-snug tracking-[-0.01em] text-fg">{selected.summary}</p>

                <div className="mt-5 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                  {/* ruta */}
                  <div>
                    <h3 className="eyebrow">Recorrido: de la capacidad al impacto</h3>
                    <ol className="relative mt-3" aria-label={`Recorrido desde ${selected.label} hasta el impacto territorial`}>
                      <motion.span
                        aria-hidden
                        className="absolute bottom-3 left-[11px] top-3 w-[2px] origin-top bg-[image:var(--grad-brand)]"
                        initial={reduce ? false : { scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.3 + selected.chain.length * 0.14, ease: "easeInOut" }}
                      />
                      {selected.chain.map((step, i) => {
                        const last = i === selected.chain.length - 1;
                        return (
                          <motion.li
                            key={step}
                            initial={reduce ? false : { opacity: 0, x: -14 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: reduce ? 0 : 0.12 + i * 0.14, duration: 0.45 }}
                            className="relative flex items-center gap-3.5 py-1.5"
                          >
                            <span
                              className={`relative grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 bg-bg ${
                                last ? "border-accent2" : "border-accent"
                              }`}
                            >
                              <span className={`h-2 w-2 rounded-full ${last ? "bg-accent2" : "bg-accent"}`} />
                              {last && !reduce && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-accent2/30 [animation-duration:2.2s]" />}
                            </span>
                            <span className={`text-[1.02rem] ${last ? "font-bold text-grad" : "font-medium text-fg"}`}>{step}</span>
                          </motion.li>
                        );
                      })}
                    </ol>
                  </div>

                  {/* conexiones */}
                  <div>
                    <h3 className="eyebrow">Se conecta con</h3>
                    <ul className="mt-3 divide-y divide-line">
                      {relations.map(({ node, text }) => (
                        <li key={node.id}>
                          <button
                            type="button"
                            onClick={() => setSelId(node.id)}
                            className="group flex w-full items-start gap-3 py-2 text-left transition-transform duration-300 hover:translate-x-1.5"
                          >
                            <node.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.8} aria-hidden />
                            <span className="flex-1">
                              <span className="block text-[0.95rem] font-bold text-fg">{node.label}</span>
                              <span className="mt-0.5 block text-[0.86rem] leading-snug text-fg2">{text}</span>
                            </span>
                            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-fg3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
