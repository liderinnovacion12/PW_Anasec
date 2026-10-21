"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { CYBER_SERVICES, CYBER_STAGES } from "@/lib/content";

export function Cybersecurity() {
  const reduce = useReducedMotion();

  return (
    <section id="ciberseguridad" aria-labelledby="ciber-title" className="section-pad relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand-blue/18 blur-[140px]" />
        <div className="absolute bottom-0 right-[8%] h-[380px] w-[380px] rounded-full bg-brand-green/12 blur-[130px]" />
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">09 · Ciberseguridad y continuidad de negocio</span>
          </Reveal>
          <TextReveal
            as="h2"
            text="Protegemos la continuidad de lo que importa."
            id="ciber-title"
            highlight={["continuidad"]}
            className="h-section mt-5"
          />
          <Reveal delay={0.15}>
            <p className="lead mt-6">
              Protección de la información, monitoreo permanente y respaldo operativo para garantizar la operatividad
              institucional frente a cualquier riesgo informático.
            </p>
          </Reveal>
        </div>

        {/* flujo Datos → Continuidad */}
        <div className="mx-auto mt-7 max-w-3xl lg:mt-20">
          <ol className="relative">
            <div aria-hidden className="absolute bottom-6 left-7 top-6 w-px bg-line">
              <motion.div
                className="w-px origin-top bg-gradient-to-b from-brand-blue via-brand-teal to-brand-green"
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: "100%" }}
              />
            </div>
            {CYBER_STAGES.map((s, i) => (
              <li key={s.id} className="relative flex items-start gap-6 pb-10 last:pb-0">
                <Reveal delay={i * 0.1} className="relative z-10 shrink-0">
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-line-strong bg-[var(--glass)] backdrop-blur-md">
                    <s.icon className="h-6 w-6 text-[#5cc0f5]" strokeWidth={1.6} aria-hidden />
                    {i < CYBER_STAGES.length - 1 && !reduce && (
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 animate-bounce text-[#5cc0f5]/50">
                        <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    )}
                  </span>
                </Reveal>
                <Reveal delay={i * 0.1 + 0.08} className="flex-1 rounded-2xl border border-line bg-[var(--glass)] px-6 py-5 backdrop-blur-md">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[#5cc0f5]">
                    {String(i + 1).padStart(2, "0")} · {s.label}
                  </p>
                  <p className="mt-2 text-[0.94rem] leading-relaxed text-fg2">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* servicios como "dashboard" */}
        <Reveal delay={0.2} className="mx-auto mt-7 max-w-4xl">
          <div className="grid grid-cols-2 gap-3 rounded-3xl border border-line bg-[var(--glass)] p-5 backdrop-blur-md sm:grid-cols-4 sm:p-7">
            {CYBER_SERVICES.map((s, i) => (
              <div
                key={s.label}
                className="group flex flex-col items-center gap-2.5 rounded-2xl px-3 py-5 text-center transition-colors hover:bg-[var(--glass)]"
              >
                <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-line bg-[var(--glass)]">
                  <s.icon className="h-5 w-5 text-fg2 transition-colors group-hover:text-[#7bd36a]" strokeWidth={1.6} aria-hidden />
                  <span
                    aria-hidden
                    className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#7bd36a]"
                    style={{ animation: `blink ${1.6 + (i % 3) * 0.5}s ease-in-out ${i * 0.2}s infinite` }}
                  />
                </span>
                <span className="text-[0.72rem] font-medium leading-tight text-fg2">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
