import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Cybersecurity } from "@/components/sections/cybersecurity";
import { DigitalNetwork } from "@/components/sections/digital-network";
import { Infrastructure } from "@/components/sections/infrastructure";
import { Logistics } from "@/components/sections/logistics";
import { SmartCities } from "@/components/sections/smart-cities";
import { Training } from "@/components/sections/training";
import { Ticker } from "@/components/ui/ticker";

export const metadata: Metadata = {
  title: "Tecnología",
  description:
    "ANASEC Digital Network, Smart Cities e IoT, infraestructura, ciberseguridad, formación TIC y gestión logística.",
};

export default function Page() {
  return (
    <PageShell>
      <DigitalNetwork />
      <Ticker words={["Conectividad", "Ciudades inteligentes", "Ciberseguridad", "Formación TIC", "Logística"]} />
      <SmartCities />
      <Infrastructure />
      <Cybersecurity />
      <Training />
      <Logistics />
    </PageShell>
  );
}
