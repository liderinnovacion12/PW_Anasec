# ANASEC — sitio web corporativo

Sitio web de **ANASEC** (Agencia Nacional de Servicios del Estado Colombiano — Corporación de Economía Mixta),
construido sobre el contenido y la identidad visual del *Brochure ANASEC 2026*.

Doble nivel de navegación: contenido corporativo tradicional (navbar, secciones) + una experiencia
central interactiva, **ANASEC Digital Network**, que conecta las seis capacidades de la organización
(Tecnología, Infraestructura, Innovación, Talento, Seguridad, Territorio).

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4
- Framer Motion (scroll-reveal, contadores, transiciones)
- Canvas 2D para el mapa de partículas de Colombia y la red del CTA final
- `next-themes` para modo claro/oscuro con transición de círculo expansivo (View Transitions API)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

## Estructura

- `src/app` — rutas (home, páginas legales, sitemap/robots/manifest)
- `src/components/sections` — una sección por bloque del brief (hero, quiénes somos, visión,
  capacidades, portafolio, ANASEC Digital Network, smart cities, infraestructura, ciberseguridad,
  formación, logística, experiencia, respaldo jurídico, aliados, CTA final, contacto)
- `src/components/canvas` — visualizaciones en Canvas (mapa de Colombia, red de nodos)
- `src/components/ui` / `src/components/layout` — primitivas reutilizables (reveal, contador,
  botón magnético, navbar, footer, indicador de progreso de la experiencia)
- `src/lib/content.ts`, `src/lib/colombia.ts`, `src/lib/legal.ts` — todo el contenido textual,
  tomado exclusivamente del brochure. Los puntos sin dato en el brochure quedan marcados como
  pendientes en vez de inventarse.
- `public/logos` — logo de ANASEC y logos de aliados, extraídos del PDF del brochure con canal alfa.

## Notas de contenido

Todas las cifras, servicios, clientes y textos provienen del *Brochure ANASEC 2026*. La gráfica de
crecimiento en "Experiencia" es una representación ilustrativa (así se indica en el propio sitio), no
una cifra del brochure. Las páginas legales (`/legal/*`) usan lenguaje institucional genérico hasta que
ANASEC provea el texto jurídico definitivo.
