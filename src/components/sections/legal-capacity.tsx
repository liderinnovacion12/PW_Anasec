"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { END_TO_END, LEGAL_ITEMS } from "@/lib/content";

export function LegalCapacity() {
  return (
    <section id="capacidad" aria-labelledby="legal-title" className="section-pad relative overflow-hidden bg-bg2">
      <div className="container-x">
        <SectionHeading
          eyebrow="13 · Respaldo jurídico y capacidad de contratación"
          title="Capacidad institucional para ejecutar."
          titleId="legal-title"
          highlight={["ejecutar."]}
        >
          A través de nuestro marco estatutario, ANASEC está plenamente habilitada para actuar como aliado estratégico de
          las entidades territoriales y nacionales.
        </SectionHeading>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEGAL_ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.08}>
              <article className="group relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-line p-6 transition-colors duration-500 hover:border-accent/50">
                <span
                  aria-hidden
                  className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-[image:var(--grad-brand)] transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--glass)] text-accent">
                  <it.icon className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                </span>
                <div>
                  <h3 className="text-[0.96rem] font-bold leading-tight tracking-tight">{it.title}</h3>
                  <p className="mt-1.5 text-[0.82rem] leading-relaxed text-fg3">{it.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* soluciones end-to-end */}
        <Reveal delay={0.2} className="glass mt-14 rounded-[32px] p-7 sm:p-10">
          <p className="eyebrow !before:hidden">Soluciones end-to-end</p>
          <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-fg2">
            Alcance operativo integral que abarca desde la consultoría, formulación, diseño e integración, hasta la
            consecución de licencias, instalación, soporte técnico y mantenimiento.
          </p>
          <ol className="mt-8 flex flex-wrap items-center gap-x-1 gap-y-4" aria-label="Ciclo de ejecución end-to-end">
            {END_TO_END.map((step, i) => (
              <li key={step} className="flex items-center gap-1">
                {i > 0 && <ArrowRight className="mx-1 h-4 w-4 shrink-0 text-fg3" aria-hidden />}
                <span className="glass whitespace-nowrap rounded-full px-4 py-2 text-[0.78rem] font-semibold text-fg">
                  <span className="mr-1.5 font-mono text-[0.66rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
