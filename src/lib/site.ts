export const SITE = {
  name: "ANASEC",
  legalName: "Agencia Nacional de Servicios del Estado Colombiano",
  type: "Corporación de Economía Mixta",
  nit: "902.074.723-6",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.corporacionanasec.org",
  email: "info@corporacionanasec.org",
  phone: "+57 318 344 1613",
  phoneHref: "tel:+573183441613",
  web: "www.corporacionanasec.org",
  street: "Carrera 14 No. 76-25",
  city: "Bogotá D.C., Colombia",
  concept: "Tecnología que conecta, transforma y hace posible el futuro",
} as const;

export const MAPS_QUERY = encodeURIComponent(`${SITE.street}, Bogotá D.C., Colombia`);

/** Secciones que componen la experiencia (orden de aparición). */
export const SECTION_IDS = [
  "inicio",
  "anasec",
  "vision",
  "soluciones",
  "portafolio",
  "network",
  "smart-cities",
  "infraestructura",
  "ciberseguridad",
  "formacion",
  "logistica",
  "experiencia",
  "capacidad",
  "aliados",
  "cta",
  "contacto",
] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/** Los 7 pasos de la experiencia, con las secciones que agrupa cada uno. */
export const STEPS: { n: string; label: string; href: string; sections: SectionId[] }[] = [
  { n: "01", label: "Intro", href: "#inicio", sections: ["inicio"] },
  { n: "02", label: "ANASEC", href: "#anasec", sections: ["anasec", "vision"] },
  { n: "03", label: "Soluciones", href: "#soluciones", sections: ["soluciones", "portafolio"] },
  {
    n: "04",
    label: "Tecnología",
    href: "#network",
    sections: ["network", "smart-cities", "infraestructura", "ciberseguridad", "formacion", "logistica"],
  },
  { n: "05", label: "Experiencia", href: "#experiencia", sections: ["experiencia", "capacidad"] },
  { n: "06", label: "Aliados", href: "#aliados", sections: ["aliados"] },
  { n: "07", label: "Contacto", href: "#contacto", sections: ["cta", "contacto"] },
];

export const NAV_LINKS: { label: string; href: string; sections: SectionId[] }[] = [
  { label: "Inicio", href: "#inicio", sections: ["inicio"] },
  { label: "Quiénes somos", href: "#anasec", sections: ["anasec", "vision"] },
  { label: "Soluciones", href: "#soluciones", sections: ["soluciones", "portafolio"] },
  {
    label: "Capacidades",
    href: "#network",
    sections: ["network", "smart-cities", "infraestructura", "ciberseguridad", "formacion", "logistica"],
  },
  { label: "Experiencia", href: "#experiencia", sections: ["experiencia", "capacidad"] },
  { label: "Aliados", href: "#aliados", sections: ["aliados"] },
  { label: "Contacto", href: "#contacto", sections: ["cta", "contacto"] },
];
