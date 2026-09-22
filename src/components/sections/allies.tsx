"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ALLIES } from "@/lib/content";

function Row({ items, reverse, dur }: { items: (typeof ALLIES)[number]["items"]; reverse?: boolean; dur: number }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee no-scrollbar relative overflow-x-auto [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] sm:overflow-hidden">
      <div className={`marquee-track ${reverse ? "rev" : ""}`} style={{ ["--dur" as string]: `${dur}s` }}>
        {loop.map((a, i) => (
          <div key={`${a.name}-${i}`} className="group mx-3 flex h-28 w-48 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-[var(--surface)] px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[var(--shadow)]">
            <Image
              src={`/logos/${a.logo}.png`}
              alt={a.name}
              width={200}
              height={90}
              unoptimized
              className="h-12 w-auto max-w-[140px] object-contain opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
            <span className="sr-only">{a.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Allies() {
  return (
    <section id="aliados" aria-labelledby="allies-title" className="section-pad relative overflow-hidden">
      <div className="container-x">
        <SectionHeading
          eyebrow="14 · Clientes y aliados"
          title="Una red de confianza construida en Colombia."
          titleId="allies-title"
          highlight={["confianza", "Colombia."]}
          align="center"
        />
      </div>

      <div className="mt-14 flex flex-col gap-6">
        {ALLIES.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.1}>
            <p className="container-x mb-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg3">{group.category}</p>
            <Row items={group.items} reverse={i % 2 === 1} dur={28 + group.items.length * 4} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
