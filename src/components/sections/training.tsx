"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cpu, GraduationCap, Users2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TRAINING_ITEMS, TRAINING_VENN } from "@/lib/content";

const CIRCLES = [
  { key: "personas", label: "Personas", icon: Users2, cx: 128, cy: 128, tags: TRAINING_VENN.personas },
  { key: "conocimiento", label: "Conocimiento", icon: GraduationCap, cx: 232, cy: 128, tags: TRAINING_VENN.conocimiento },
  { key: "tecnologia", label: "Tecnología", icon: Cpu, cx: 180, cy: 210, tags: TRAINING_VENN.tecnologia },
] as const;

function Venn() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 360 310" className="mx-auto w-full max-w-[380px]" role="img" aria-label="Personas, conocimiento y tecnología se encuentran para formar talento">
      <defs>
        {["a", "b", "c"].map((id, i) => (
          <linearGradient key={id} id={`venn-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={["#137ec6", "#13a1a9", "#66be56"][i]} />
            <stop offset="1" stopColor={["#132a5a", "#0e6c78", "#3a9c48"][i]} />
          </linearGradient>
        ))}
      </defs>
      {CIRCLES.map((c, i) => (
        <motion.circle
          key={c.key}
          cx={c.cx + 20}
          cy={c.cy + 20}
          r="82"
          fill={`url(#venn-${["a", "b", "c"][i]})`}
          fillOpacity="0.24"
          stroke={`url(#venn-${["a", "b", "c"][i]})`}
          strokeWidth="1.4"
          initial={reduce ? false : { opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {CIRCLES.map((c) => (
        <g key={c.key} transform={`translate(${c.cx + 20} ${c.cy - 46})`}>
          <c.icon x="-11" y="-11" width="22" height="22" className="stroke-fg" strokeWidth={1.6} fill="none" />
        </g>
      ))}
      <text x="200" y="184" textAnchor="middle" className="fill-fg" fontSize="12" fontWeight="700" letterSpacing="0.02em">
        TALENTO
      </text>
    </svg>
  );
}

export function Training() {
  return (
    <section id="formacion" aria-labelledby="form-title" className="section-pad relative overflow-hidden bg-bg2">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="10 · Innovación académica y formación"
              title="El futuro también se construye formando talento."
              titleId="form-title"
              highlight={["talento."]}
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {TRAINING_ITEMS.map((it, i) => (
                <Reveal key={it.title} delay={i * 0.08}>
                  <article className="glass h-full rounded-2xl p-5">
                    <h3 className="text-[0.98rem] font-bold leading-tight tracking-tight">{it.title}</h3>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-fg3">{it.text}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {it.tags.map((t) => (
                        <li key={t} className="rounded-full border border-line-strong px-2.5 py-1 text-[0.66rem] font-medium text-fg2">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.15}>
            <Venn />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
