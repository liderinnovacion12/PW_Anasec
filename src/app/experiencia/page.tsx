import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Experience } from "@/components/sections/experience";
import { LegalCapacity } from "@/components/sections/legal-capacity";

export const metadata: Metadata = {
  title: "Experiencia",
  description: "Trayectoria, cifras y capacidad jurídica de ANASEC en la ejecución de proyectos para el Estado.",
};

export default function Page() {
  return (
    <PageShell>
      <Experience />
      <LegalCapacity />
    </PageShell>
  );
}
