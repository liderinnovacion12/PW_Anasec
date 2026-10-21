import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "./logo";

const NAV = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Tecnología", href: "/tecnologia" },
  { label: "Experiencia", href: "/experiencia" },
  { label: "Aliados", href: "/aliados" },
  { label: "Contacto", href: "/contacto" },
];

const LEGAL = [
  { label: "Política de privacidad", href: "/legal/politica-de-privacidad" },
  { label: "Tratamiento de datos", href: "/legal/tratamiento-de-datos" },
  { label: "Términos y condiciones", href: "/legal/terminos-y-condiciones" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg2/80">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-[image:var(--grad-brand)] opacity-70" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="h-14 w-auto" />
          <p className="mt-5 text-sm font-semibold tracking-wide text-fg">{SITE.type}</p>
          <p className="mt-1 text-sm text-fg2">{SITE.legalName}</p>
          <p className="mt-4 font-mono text-xs tracking-wider text-fg3">NIT: {SITE.nit}</p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            Ir al inicio <ArrowUpRight className="h-4 w-4 -rotate-45" />
          </Link>
        </div>

        <nav aria-label="Enlaces del pie de página">
          <h2 className="eyebrow !before:hidden mb-5 !text-fg3">Navegación</h2>
          <ul className="space-y-3">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[0.95rem] text-fg2 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="eyebrow !before:hidden mb-5 !text-fg3">Legal</h2>
          <ul className="space-y-3">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[0.95rem] text-fg2 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-start justify-between gap-2 py-6 text-xs text-fg3 sm:flex-row sm:items-center">
          <p>© 2026 ANASEC. Todos los derechos reservados.</p>
          <p>{SITE.type} · Bogotá D.C., Colombia</p>
        </div>
      </div>
      {/* espacio para la píldora móvil */}
      <div className="h-14 lg:hidden" aria-hidden />
    </footer>
  );
}
