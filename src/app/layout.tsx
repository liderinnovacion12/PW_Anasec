import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Montserrat } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ProgressRail } from "@/components/layout/progress-rail";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SITE } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const title = "ANASEC | Tecnología que conecta, transforma y hace posible el futuro";
const description =
  "ANASEC — Agencia Nacional de Servicios del Estado Colombiano. Corporación de economía mixta que articula infraestructura tecnológica, Smart Cities, ciberseguridad, gobierno digital, formación TIC y gestión logística para entidades públicas en todo el territorio nacional.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: "%s | ANASEC",
  },
  description,
  keywords: [
    "ANASEC",
    "Agencia Nacional de Servicios del Estado Colombiano",
    "tecnología Colombia",
    "infraestructura tecnológica",
    "Smart Cities Colombia",
    "ciberseguridad Colombia",
    "gobierno digital",
    "IoT",
    "fibra óptica",
    "desarrollo de software",
    "inteligencia artificial",
    "formación tecnológica",
    "gestión logística",
    "proyectos tecnológicos para entidades públicas",
    "economía mixta",
  ],
  authors: [{ name: "ANASEC" }],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE.url,
    siteName: "ANASEC",
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ANASEC — Agencia Nacional de Servicios del Estado Colombiano" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf3f8" },
    { media: "(prefers-color-scheme: dark)", color: "#050d1e" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentOrganization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      alternateName: SITE.legalName,
      legalName: SITE.legalName,
      url: SITE.url,
      logo: `${SITE.url}/logos/anasec-logo-full.png`,
      image: `${SITE.url}/og.png`,
      email: SITE.email,
      telephone: SITE.phone,
      taxID: SITE.nit,
      description,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.street,
        addressLocality: "Bogotá D.C.",
        addressCountry: "CO",
      },
      areaServed: "CO",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: "es-CO",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${montserrat.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Saltar al contenido
          </a>
          <Navbar />
          <ProgressRail />
          <div id="main" className="flex flex-1 flex-col">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
