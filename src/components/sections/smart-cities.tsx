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
    <section id="smart-cities" aria-labelledby="sc-title" className="section-pad relative overflow-hidden bg-bg2/55">
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

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* MAPA */}
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
            <svg viewBox={`0 0 ${W} ${W}`} className="w-full" role="group" aria-label="Mapa de Colombia con territorios donde ANASEC tiene presencia">
              <defs>
                <radialGradient id="sc-glow" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="sc-fill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#137ec6" stopOpacity="0.28" />
                  <stop offset="1" stopColor="#66be56" stopOpacity="0.32" />
                </linearGradient>
                <linearGradient id="sc-sweep" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#66be56" stopOpacity="0" />
                  <stop offset="1" stopColor="#66be56" stopOpacity="0.55" />
                </linearGradient>
                <clipPath id="sc-clip">
                  <path d={path} />
                </clipPath>
              </defs>
              <circle cx={W / 2} cy={W * 0.42} r={W * 0.5} fill="url(#sc-glow)" />
              {!reduce && (
                <circle cx={W / 2} cy={W * 0.45} r={W * 0.44} fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeDasharray="3 9">
                  <animateTransform attributeName="transform" type="rotate" from={`0 ${W / 2} ${W * 0.45}`} to={`360 ${W / 2} ${W * 0.45}`} dur="50s" repeatCount="indefinite" />
                </circle>
              )}
              <path d={path} fill="url(#sc-fill)" stroke="var(--accent)" strokeOpacity="0.7" strokeWidth="1.6" />
              <path d={path} fill="none" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="0.6" strokeDasharray="1 5" />

              {/* radar que barre el territorio */}
              {!reduce && (
                <g clipPath="url(#sc-clip)">
                  <g style={{ transformOrigin: `${W / 2}px ${W * 0.45}px`, animation: "sweep 7s linear infinite" }}>
                    <path d={`M${W / 2} ${W * 0.45} L${W / 2 + W * 0.6} ${W * 0.45 - W * 0.12} L${W / 2 + W * 0.6} ${W * 0.45} Z`} fill="url(#sc-sweep)" />
                  </g>
                </g>
              )}

              {/* conexiones desde el territorio activo */}
              {TERRITORIES.filter((t) => t.id !== active).map((t) => (
                <line
                  key={`l-${t.id}`}
                  x1={territory.p[0] * W}
                  y1={territory.p[1] * W}
                  x2={t.p[0] * W}
                  y2={t.p[1] * W}
                  stroke="var(--accent-2)"
                  strokeOpacity="0.7"
                  strokeWidth="1.4"
                  className={reduce ? "" : "dash-flow"}
                />
              ))}

              {TERRITORIES.map((t, i) => {
                const on = t.id === active;
                const x = t.p[0] * W;
                const y = t.p[1] * W;
                return (
                  <g key={t.id} className="cursor-pointer" onClick={() => setActive(t.id)}>
                    {!reduce && (
                      <circle cx={x} cy={y} r="8" fill="none" stroke={on ? "var(--accent)" : "var(--accent-2)"} strokeWidth="1.4">
                        <animate attributeName="r" values={on ? "8;26;8" : "6;16;6"} dur={on ? "2s" : "3.2s"} begin={`${i * 0.4}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0;0.8" dur={on ? "2s" : "3.2s"} begin={`${i * 0.4}s`} repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle cx={x} cy={y} r={on ? 10 : 6.5} fill={on ? "var(--accent)" : "var(--accent-2)"} stroke="var(--bg)" strokeWidth="2.5" style={{ filter: "drop-shadow(0 0 8px var(--accent))" }} />
                    {on && (
                      <text x={x} y={y - 18} textAnchor="middle" className="fill-fg" fontSize="15" fontWeight="700" style={{ paintOrder: "stroke", stroke: "var(--bg)", strokeWidth: 4 }}>
                        {t.name.split(",")[0].split(" y ")[0]}
                      </text>
                    )}
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
                  className={`rounded-full border px-4 py-2.5 text-[0.82rem] font-semibold transition-all duration-300 ${
                    t.id === active ? "-translate-y-0.5 border-transparent bg-[image:var(--grad-brand)] text-white shadow-[0_12px_28px_-10px_rgba(19,126,198,0.7)]" : "border-line-strong text-fg2 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
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
              className="glass relative mt-6 overflow-hidden rounded-3xl p-7 shadow-[0_30px_70px_-34px_rgba(19,126,198,0.55)] sm:p-6"
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-[image:var(--grad-brand)]" />
              <h3 className="text-[1.6rem] font-bold leading-tight tracking-tight"><span className="text-grad">{territory.name}</span></h3>

              <h4 className="eyebrow mt-6">Capacidades presentes</h4>
              <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {SMART_CAPABILITIES.map((c) => {
                  const has = c.id === "cctv" ? !!territory.cctv : true;
                  return (
                    <li
                      key={c.id}
                      title={c.text}
                      className={`rounded-xl border px-3 py-2 text-center text-[0.72rem] font-medium ${
                        has ? "border-accent/50 bg-[var(--glass)] font-semibold text-fg hover:-translate-y-0.5 hover:bg-[image:var(--grad-brand)] hover:text-white" : "border-line text-fg3 opacity-50"
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
