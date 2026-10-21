"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { LOGISTICS_GROUPS, LOGISTICS_WORDS } from "@/lib/content";

const SIZES = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl"];
const WEIGHTS = ["font-medium", "font-semibold", "font-bold"];
const TONES = ["text-fg2", "text-fg", "text-accent"];
const seeded = (i: number, n: number) => Math.floor((Math.sin(i * 999) * 0.5 + 0.5) * n);

export function Logistics() {
  return (
    <section id="logistica" aria-labelledby="log-title" className="section-pad relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,var(--bg-3),transparent_70%)]" />
      <div className="container-x relative">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="11 · Gestión logística e interinstitucional"
            title="De la estrategia a la ejecución."
            titleId="log-title"
            highlight={["ejecución."]}
          />
          <Reveal delay={0.15} className="max-w-sm">
            <p className="lead !text-[0.98rem]">
              Congresos, simposios y encuentros institucionales, producidos de principio a fin con el mismo rigor que un
              proyecto de infraestructura.
            </p>
          </Reveal>
        </div>

        {/* nube de servicios */}
        <Reveal delay={0.1} className="glass mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-x-5 gap-y-4 rounded-[32px] px-6 py-10 sm:px-12 sm:py-14">
          {LOGISTICS_WORDS.map((w, i) => (
            <span
              key={w}
              className={`${SIZES[seeded(i, SIZES.length)]} ${WEIGHTS[seeded(i + 7, WEIGHTS.length)]} ${TONES[seeded(i + 13, TONES.length)]} cursor-default leading-none tracking-tight transition-colors hover:text-accent`}
            >
              {w}
            </span>
          ))}
        </Reveal>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LOGISTICS_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line p-6 transition-colors duration-500 hover:border-accent/50">
                <span className="font-mono text-xs text-fg3">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[1.02rem] font-bold leading-tight tracking-tight">{g.title}</h3>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-fg3">{g.text}</p>
                <span className="mt-4 flex items-center gap-1.5 text-[0.72rem] font-semibold text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {g.items.length} servicios <ArrowRight className="h-3 w-3" aria-hidden />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
