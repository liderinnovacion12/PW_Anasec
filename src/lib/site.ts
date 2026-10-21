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

/** Páginas del sitio (la portada solo resume lo más importante). */
export const NAV_LINKS: { label: string; href: string; text: string }[] = [
  { label: "Inicio", href: "/", text: "Portada" },
  { label: "Nosotros", href: "/nosotros", text: "Misión y visión 2030" },
  { label: "Soluciones", href: "/soluciones", text: "Líneas estratégicas y portafolio tecnológico" },
  { label: "Tecnología", href: "/tecnologia", text: "Red digital, Smart Cities, infraestructura, ciberseguridad, formación y logística" },
  { label: "Experiencia", href: "/experiencia", text: "Cifras, trayectoria y capacidad jurídica" },
  { label: "Aliados", href: "/aliados", text: "Clientes y aliados en todo el país" },
  { label: "Contacto", href: "/contacto", text: "Cuéntanos tu proyecto" },
];
