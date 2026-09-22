"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { NetworkBackground } from "@/components/canvas/network-bg";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";

export function FinalCta() {
  return (
    <section id="cta" aria-labelledby="cta-title" className="surface-dark relative isolate overflow-hidden py-24 sm:py-32 lg:py-40">
      <NetworkBackground className="absolute inset-0 -z-10 h-full w-full opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(19,126,198,0.22),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,var(--bg)_92%)]" />

      <div className="container-x relative text-center">
        <Reveal>
          <span className="eyebrow mx-auto justify-center !text-[#7bd36a]">15 · Empecemos</span>
        </Reveal>
        <TextReveal
          as="h2"
          id="cta-title"
          text="El próximo gran proyecto puede comenzar aquí."
          highlight={["proyecto"]}
          className="h-display mx-auto mt-6 max-w-4xl text-white"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-xl text-[1.05rem] leading-relaxed text-white/70">
            Conectemos capacidades, tecnología e innovación para convertir desafíos en soluciones ejecutables.
          </p>
        </Reveal>
        <Reveal delay={0.35} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a href="#contacto" className="btn btn-primary">
              Conversemos
              <ArrowRight className="arrow h-4 w-4" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#soluciones" className="btn border border-white/25 bg-white/5 text-white backdrop-blur-md hover:border-white/50">
              Conocer soluciones
              <ArrowUpRight className="arrow h-4 w-4" />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
