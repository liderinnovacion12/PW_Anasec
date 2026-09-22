"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Building2, Info } from "lucide-react";
import { useId, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SMART_CAPABILITIES, TERRITORIES } from "@/lib/colombia";
import { OUTLINE } from "@/lib/colombia";

const W = 640;
const path = OUTLINE.map(([x, y], i) => `${i ? "L" : "M"}${(x * W).toFixed(1)} ${(y * W).toFixed(1)}`).join("") + "Z";

export function SmartCities() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(TERRITORIES[0].id);
  const territory = TERRITORIES.find((t) => t.id === active)!;
  const tipId = useId();

  return (
    <section id="smart-cities" aria-labelledby="sc-title" className="section-pad relative overflow-hidden bg-bg2">
      <div className="container-x">
        <SectionHeading
          eyebrow="07 · Smart Cities e IoT"
          title="Ciudades más inteligentes. Territorios más conectados."
          titleId="sc-title"
          highlight={["inteligentes.", "conectados."]}
        >
          Un vistazo a las regiones donde ANASEC despliega soluciones de conectividad, IoT y videovigilancia. Explora el
          mapa para conocer las entidades y capacidades presentes en cada territorio.
        </SectionHeading>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* MAPA */}
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
            <svg viewBox={`0 0 ${W} ${W}`} className="w-full" role="group" aria-label="Mapa de Colombia con territorios donde ANASEC tiene presencia">
              <defs>
                <radialGradient id="sc-glow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={W / 2} cy={W * 0.42} r={W * 0.5} fill="url(#sc-glow)" />
              <path d={path} fill="var(--bg)" stroke="var(--line-strong)" strokeWidth="1.4" />
              <path d={path} fill="none" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="0.6" strokeDasharray="1 5" />

              {TERRITORIES.map((t) => {
                const on = t.id === active;
                const x = t.p[0] * W;
                const y = t.p[1] * W;
                return (
                  <g key={t.id} className="cursor-pointer" onClick={() => setActive(t.id)}>
                    {on && !reduce && (
                      <circle cx={x} cy={y} r="9" fill="none" stroke="var(--accent)" strokeWidth="1.4">
                        <animate attributeName="r" values="7;20;7" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle cx={x} cy={y} r={on ? 8 : 5.5} fill={on ? "var(--accent)" : "var(--accent-2)"} fillOpacity={on ? 1 : 0.75} stroke="var(--bg)" strokeWidth="2" />
                    <circle cx={x} cy={y} r="16" fill="transparent" tabIndex={0} role="button" aria-label={t.name} aria-describedby={on ? tipId : undefined}
                      aria-pressed={on} onFocus={() => setActive(t.id)}
                      className="outline-offset-4" />
                  </g>
                );
              })}
            </svg>

            <motion.div
              key={territory.id}
              id={tipId}
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="glass pointer-events-none absolute left-1/2 top-2 w-[min(260px,80%)] -translate-x-1/2 rounded-2xl p-4 text-center shadow-[var(--shadow)] sm:left-3 sm:top-3 sm:translate-x-0 sm:text-left"
            >
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-accent">{territory.region}</p>
              <p className="mt-1 text-sm font-bold leading-tight">{territory.name}</p>
            </motion.div>
          </Reveal>

          {/* DETALLE */}
          <div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Territorios">
              {TERRITORIES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={t.id === active}
                  onClick={() => setActive(t.id)}
                  className={`rounded-full border px-3.5 py-2 text-[0.78rem] font-medium transition-colors ${
                    t.id === active ? "border-transparent bg-[image:var(--grad-brand)] text-white" : "border-line-strong text-fg2 hover:border-accent hover:text-accent"
                  }`}
                >
                  {t.name.split(",")[0].split(" y ")[0]}
                </button>
              ))}
            </div>

            <motion.div
              key={territory.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="glass mt-6 rounded-3xl p-7 sm:p-8"
            >
              <h3 className="text-[1.3rem] font-bold tracking-tight">{territory.name}</h3>

              <h4 className="eyebrow mt-6">Capacidades presentes</h4>
              <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {SMART_CAPABILITIES.map((c) => {
                  const has = c.id === "cctv" ? !!territory.cctv : true;
                  return (
                    <li
                      key={c.id}
                      title={c.text}
                      className={`rounded-xl border px-3 py-2 text-center text-[0.72rem] font-medium ${
                        has ? "border-accent/40 bg-[var(--glass)] text-fg" : "border-line text-fg3 opacity-50"
                      }`}
                    >
                      {c.label}
                    </li>
                  );
                })}
              </ul>

              {territory.entities.length > 0 && (
                <>
                  <h4 className="eyebrow mt-6">Entidades vinculadas</h4>
                  <ul className="mt-3 space-y-2">
                    {territory.entities.map((e) => (
                      <li key={e} className="flex items-start gap-2.5 text-[0.86rem] text-fg2">
                        <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                        {e}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {territory.cctv && (
                <p className="mt-6 rounded-xl border border-line bg-[var(--glass)] px-4 py-3 text-[0.82rem] leading-relaxed text-fg2">
                  {territory.cctv}
                </p>
              )}

              {territory.pendiente && (
                <p className="mt-5 flex items-start gap-2 text-[0.76rem] leading-relaxed text-fg3">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  Detalle ampliado del despliegue en este territorio, próximamente.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
