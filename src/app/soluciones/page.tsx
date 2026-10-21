import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Capabilities } from "@/components/sections/capabilities";
import { Portfolio } from "@/components/sections/portfolio";

export const metadata: Metadata = {
  title: "Soluciones",
  description: "Cinco líneas estratégicas y portafolio tecnológico de ANASEC para entidades públicas y empresas.",
};

export default function Page() {
  return (
    <PageShell>
      <Capabilities />
      <Portfolio />
    </PageShell>
  );
}
