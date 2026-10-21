"use client";

import { ArrowUpRight, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PORTFOLIO, type PortfolioItem } from "@/lib/content";

/** Ilustraciones vectoriales; se animan con hover/focus de la tarjeta (ver .art en globals.css). */
function Art({ id }: { id: PortfolioItem["id"] }) {
  const stroke = "var(--accent)";
  return (
    <svg aria-hidden viewBox="0 0 240 110" className="art h-full w-full" fill="none">
      {id === "scd" && (
        <g>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={34 + i * 32}
              y={24 + i * 12}
              width="120"
              height="58"
              rx="10"
              stroke={stroke}
              strokeOpacity={0.35 + i * 0.3}
              fill="var(--bg)"
              fillOpacity="0.6"
              style={{ animation: `float-y ${3 + i * 0.6}s ease-in-out ${i * 0.3}s infinite` }}
            />
          ))}
          <path d="M126 70l8 8 16-18" stroke="var(--accent-2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="76" cy="66" r="4" fill="var(--accent)" style={{ animation: "blink 1.6s ease-in-out infinite" }} />
        </g>
      )}
      {id === "software" && (
        <g>
          {[
            [40, 30], [40, 55], [40, 80],
            [110, 22], [110, 45], [110, 68], [110, 90],
            [180, 40], [180, 70],
          ].map(([x, y], i, all) => (
            <g key={i}>
              {i < 3 && all.slice(3, 7).map(([x2, y2], k) => <line key={k} x1={x} y1={y} x2={x2} y2={y2} stroke={stroke} strokeOpacity="0.22" />)}
              {i >= 3 && i < 7 && all.slice(7).map(([x2, y2], k) => <line key={k} x1={x} y1={y} x2={x2} y2={y2} stroke={stroke} strokeOpacity="0.22" />)}
              <circle cx={x} cy={y} r="6" fill="var(--bg)" stroke={stroke} strokeWidth="1.6" />
              <circle cx={x} cy={y} r="2.6" fill="var(--accent-2)" style={{ animation: `blink ${1.4 + (i % 4) * 0.35}s ease-in-out ${i * 0.15}s infinite` }} />
            </g>
          ))}
        </g>
      )}
      {id === "datacenter" && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="50" y={16 + i * 32} width="140" height="24" rx="6" stroke={stroke} strokeOpacity="0.55" fill="var(--bg)" fillOpacity="0.6" />
              <circle cx="66" cy={28 + i * 32} r="3" fill="var(--accent-2)" style={{ animation: `blink ${1.2 + i * 0.4}s ease-in-out infinite` }} />
              <circle cx="78" cy={28 + i * 32} r="3" fill="var(--accent)" style={{ animation: `blink ${1.8 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }} />
              <line x1="104" y1={28 + i * 32} x2="176" y2={28 + i * 32} stroke={stroke} strokeOpacity="0.35" strokeDasharray="4 6" style={{ animation: "flow 1.6s linear infinite" }} />
            </g>
          ))}
        </g>
      )}
      {id === "smart" && (
        <g>
          {[[30, 52], [58, 34], [86, 60], [114, 22], [142, 46], [170, 70], [198, 38]].map(([x, h], i) => (
            <rect key={i} x={x} y={100 - h} width="18" height={h} rx="3" stroke={stroke} strokeOpacity="0.5" fill="var(--bg)" fillOpacity="0.55" />
          ))}
          {[1, 2, 3].map((r) => (
            <path
              key={r}
              d={`M${120 - r * 18} ${26 + r * 4} a${r * 18} ${r * 18} 0 0 1 ${r * 36} 0`}
              stroke="var(--accent-2)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ animation: `blink 1.8s ease-in-out ${(3 - r) * 0.25}s infinite` }}
            />
          ))}
          <circle cx="120" cy="34" r="3" fill="var(--accent-2)" />
        </g>
      )}
    </svg>
  );
}

export function Portfolio() {
  const [sel, setSel] = useState<PortfolioItem | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (sel && !d.open) d.showModal();
    if (!sel && d.open) d.close();
  }, [sel]);

  const request = (item: PortfolioItem) => {
    try {
      sessionStorage.setItem("anasec:project-type", item.projectType);
    } catch {}
    setSel(null);
    router.push("/contacto");
  };

  return (
    <section id="portafolio" aria-labelledby="port-title" className="section-pad relative bg-bg2/55">
      <div className="container-x">
        <SectionHeading
          eyebrow="05 · Portafolio tecnológico"
          title="Soluciones que convierten la tecnología en resultados"
          highlight={["resultados"]}
        />
        <h2 id="port-title" className="sr-only">
          Portafolio tecnológico
        </h2>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {PORTFOLIO.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.1}>
              <article className="glass group relative flex h-full flex-col overflow-hidden rounded-[28px] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[var(--shadow)] focus-within:border-accent/50 sm:p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-blue/15 blur-3xl transition-opacity duration-700 group-hover:opacity-100 md:opacity-0"
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--grad-brand)] text-white shadow-[0_12px_30px_-10px_rgba(19,126,198,0.7)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <p.icon className="h-7 w-7" strokeWidth={1.6} aria-hidden />
                  </span>
                  <div className="h-[104px] w-[220px] max-w-[55%]">
                    <Art id={p.id} />
                  </div>
                </div>

                <h3 className="relative mt-6 text-[1.4rem] font-bold leading-tight tracking-tight">{p.title}</h3>
                <p className="relative mt-3 text-[0.94rem] leading-relaxed text-fg2">{p.description}</p>
                <ul className="relative mt-5 flex flex-wrap gap-2" aria-label={`Servicios de ${p.title}`}>
                  {p.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-full border border-line-strong px-3 py-1.5 text-[0.74rem] font-medium text-fg2 transition-colors group-hover:border-accent/50"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-auto pt-8">
                  <button
                    type="button"
                    onClick={() => setSel(p)}
                    aria-haspopup="dialog"
                    className="group/btn inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-semibold text-fg transition-all hover:border-transparent hover:bg-[image:var(--grad-brand)] hover:text-white"
                  >
                    Explorar solución
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <dialog
        ref={dlg}
        className="modal"
        aria-labelledby="port-dlg-title"
        onClose={() => setSel(null)}
        onClick={(e) => {
          if (e.target === dlg.current) setSel(null);
        }}
      >
        {sel && (
          <div className="relative overflow-y-auto p-7 sm:p-10">
            <button
              type="button"
              onClick={() => setSel(null)}
              aria-label="Cerrar"
              className="glass absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--grad-brand)] text-white">
              <sel.icon className="h-7 w-7" strokeWidth={1.6} aria-hidden />
            </span>
            <h3 id="port-dlg-title" className="mt-6 pr-10 text-[1.8rem] font-bold leading-tight tracking-tight">
              {sel.title}
            </h3>
            <p className="mt-4 leading-relaxed text-fg2">{sel.description}</p>
            <h4 className="eyebrow mt-8">Alcance</h4>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {sel.items.map((it) => (
                <li key={it} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-[0.92rem] font-medium">
                  <Check className="h-4 w-4 shrink-0 text-accent2" aria-hidden />
                  {it}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" onClick={() => request(sel)} className="btn btn-primary">
                Hablar con ANASEC sobre esto
                <ArrowUpRight className="arrow h-4 w-4" />
              </button>
              <button type="button" onClick={() => setSel(null)} className="btn btn-ghost">
                Volver al portafolio
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
