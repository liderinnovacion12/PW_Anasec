"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";

export function FinalCta() {
  return (
    <section id="cta" aria-labelledby="cta-title" className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(19,126,198,0.16),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent,var(--bg-2)_92%)]" />

      <div className="container-x relative text-center">
        <Reveal>
          <span className="eyebrow mx-auto justify-center !text-accent2">15 · Empecemos</span>
        </Reveal>
        <TextReveal
          as="h2"
          id="cta-title"
          text="El próximo gran proyecto puede comenzar aquí."
          highlight={["proyecto"]}
          className="h-display mx-auto mt-6 max-w-4xl"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-xl text-[1.05rem] leading-relaxed text-fg2">
            Conectemos capacidades, tecnología e innovación para convertir desafíos en soluciones ejecutables.
          </p>
        </Reveal>
        <Reveal delay={0.35} className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Link href="/contacto" className="btn btn-primary">
              Conversemos
              <ArrowRight className="arrow h-4 w-4" />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/soluciones" className="btn btn-ghost backdrop-blur-md">
              Conocer soluciones
              <ArrowUpRight className="arrow h-4 w-4" />
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
