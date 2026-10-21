import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Vision } from "@/components/sections/vision";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Misión y visión 2030 de ANASEC, Agencia Nacional de Servicios del Estado Colombiano.",
};

export default function Page() {
  return (
    <PageShell>
      <Vision />
    </PageShell>
  );
}
