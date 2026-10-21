import { Award, Handshake, Landmark, Layers } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { ALLIES, CAPABILITIES } from "@/lib/content";

const ALLY_COUNT = ALLIES.reduce((n, g) => n + g.items.length, 0);

const FIGURES = [
  { icon: Award, value: 34, prefix: "+", suffix: "", label: "Contratos ejecutados" },
  { icon: Landmark, value: 150000, prefix: "+$", suffix: " M", label: "Millones COP gestionados" },
  { icon: Layers, value: CAPABILITIES.length, prefix: "", suffix: "", label: "Líneas estratégicas" },
  { icon: Handshake, value: ALLY_COUNT, prefix: "+", suffix: "", label: "Clientes y aliados" },
];

/** Banda de cifras clave (patrón "indicadores" de ISA), justo después del hero. */
export function FiguresStrip() {
  return (
    <section aria-label="ANASEC en cifras" className="relative border-y border-line bg-bg2">
      <div className="container-x">
        <ul className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
          {FIGURES.map((f, i) => (
            <li key={f.label} className="px-2 py-8 sm:px-6">
              <Reveal delay={i * 0.08} y={16} className="flex items-center gap-4">
                <f.icon className="h-9 w-9 shrink-0 text-accent" strokeWidth={1.4} aria-hidden />
                <div>
                  <Counter to={f.value} prefix={f.prefix} suffix={f.suffix} className="text-2xl font-bold tracking-tight text-fg sm:text-3xl" />
                  <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-fg3">{f.label}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
