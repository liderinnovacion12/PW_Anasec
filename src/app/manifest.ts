import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ANASEC — Agencia Nacional de Servicios del Estado Colombiano",
    short_name: "ANASEC",
    description: "Tecnología que conecta, transforma y hace posible el futuro.",
    start_url: "/",
    display: "standalone",
    background_color: "#edf3f8",
    theme_color: "#132a5a",
    lang: "es-CO",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
