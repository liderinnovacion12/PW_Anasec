"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { NAV_LINKS } from "@/lib/site";

const TILES = NAV_LINKS.filter((l) => l.href !== "/");

/** Portada: en lugar de mostrar todo, cada bloque lleva a su propia página. */
export function Explore() {
  return (
    <section id="explorar" aria-labelledby="explore-title" className="section-pad relative">
      <div className="container-x">
        <SectionHeading eyebrow="Explora ANASEC" title="Elige por dónde empezar." titleId="explore-title" highlight={["empezar."]} />

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map((t, i) => (
            <li key={t.href}>
              <Reveal delay={(i % 3) * 0.08} y={20} className="h-full">
                <Link
                  href={t.href}
                  className="glass group relative flex h-full min-h-[168px] flex-col justify-between overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[var(--shadow)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-[image:var(--grad-brand)] opacity-[0.92] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                  />
                  <span className="relative flex items-start justify-between">
                    <span className="font-mono text-xs text-fg3 transition-colors group-hover:text-white/80">{String(i + 1).padStart(2, "0")}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-fg transition-all duration-500 group-hover:rotate-45 group-hover:border-white/60 group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </span>
                  <span className="relative mt-8 block">
                    <span className="block text-[1.6rem] font-bold leading-tight tracking-tight text-fg transition-colors group-hover:text-white">{t.label}</span>
                    <span className="mt-1.5 block text-[0.86rem] leading-snug text-fg2 transition-colors group-hover:text-white/85">{t.text}</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
