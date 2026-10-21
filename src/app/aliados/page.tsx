import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Allies } from "@/components/sections/allies";
import { Ticker } from "@/components/ui/ticker";

export const metadata: Metadata = {
  title: "Aliados",
  description: "Clientes y aliados de ANASEC: una red de confianza construida en Colombia.",
};

export default function Page() {
  return (
    <PageShell>
      <Allies />
      <Ticker reverse words={["Gobierno digital", "Infraestructura", "Innovación", "Talento", "Impacto"]} />
    </PageShell>
  );
}
