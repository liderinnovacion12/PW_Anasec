import { Allies } from "@/components/sections/allies";
import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Cybersecurity } from "@/components/sections/cybersecurity";
import { DigitalNetwork } from "@/components/sections/digital-network";
import { Experience } from "@/components/sections/experience";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Infrastructure } from "@/components/sections/infrastructure";
import { LegalCapacity } from "@/components/sections/legal-capacity";
import { Logistics } from "@/components/sections/logistics";
import { Portfolio } from "@/components/sections/portfolio";
import { SmartCities } from "@/components/sections/smart-cities";
import { Training } from "@/components/sections/training";
import { Vision } from "@/components/sections/vision";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Vision />
      <Capabilities />
      <Portfolio />
      <DigitalNetwork />
      <SmartCities />
      <Infrastructure />
      <Cybersecurity />
      <Training />
      <Logistics />
      <Experience />
      <LegalCapacity />
      <Allies />
      <FinalCta />
      <Contact />
    </>
  );
}
