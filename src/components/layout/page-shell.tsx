import type { ReactNode } from "react";

/** Contenedor de las páginas internas: deja libre el menú fijo. */
export function PageShell({ children }: { children: ReactNode }) {
  return <div className="pt-[72px]">{children}</div>;
}
