"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CAPABILITIES } from "@/lib/content";

type Filter = "all" | (typeof CAPABILITIES)[number]["id"];

/** Directorio filtrable por línea estratégica (patrón "Así conectamos" de ISA + etiquetas por sector de Colombia Digital). */
export function SolutionsDirectory() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduce = useReducedMotion();
  const shown = filter === "all" ? CAPABILITIES : CAPABILITIES.filter((c) => c.id === filter);

  return (
    <section id="directorio" aria-labelledby="dir-title" className="section-pad relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Directorio de soluciones"
          title="Explora lo que ANASEC conecta, por línea."
          titleId="dir-title"
          highlight={["conecta,"]}
        />

        <Reveal className="mt-10">
          <div role="group" aria-label="Filtrar por línea estratégica" className="flex flex-wrap gap-2">
            {[{ id: "all" as const, short: "Todas" }, ...CAPABILITIES].map((c) => {
              const on = filter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(c.id)}
                  className={`min-h-11 rounded-full border px-5 text-sm font-semibold transition-colors ${
                    on ? "border-transparent bg-[image:var(--grad-brand)] text-white" : "border-line-strong text-fg2 hover:border-accent/60 hover:text-fg"
                  }`}
                >
                  {c.short}
                </button>
              );
            })}
          </div>
        </Reveal>

        <ul className="mt-8 divide-y divide-line border-y border-line" aria-live="polite">
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map((c) => (
              <motion.li
                key={c.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid gap-4 py-7 md:grid-cols-[auto_1fr_1.4fr] md:items-start md:gap-8"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ background: c.gradient }}>
                  <c.icon className="h-7 w-7" strokeWidth={1.6} aria-hidden />
                </span>
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg3">Línea {c.n}</p>
                  <h3 className="mt-1 text-xl font-bold leading-tight tracking-tight">{c.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2" aria-label={`Servicios de ${c.short}`}>
                  {c.services.map((s) => (
                    <li key={s} className="rounded-full border border-line-strong px-3 py-1.5 text-[0.78rem] font-medium text-fg2">
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <a href="#contacto" className="btn btn-ghost mt-8 inline-flex">
          Solicitar una propuesta
          <ArrowUpRight className="arrow h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
