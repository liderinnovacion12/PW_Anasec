import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cuéntanos tu proyecto: contacta a ANASEC por correo, teléfono o formulario.",
};

export default function Page() {
  return (
    <PageShell>
      <Contact />
    </PageShell>
  );
}
