/* Mapa estilizado de Colombia: contorno simplificado (lon, lat) proyectado a un
   espacio normalizado x∈[0,1], y∈[0,1] (y hacia abajo). No es cartografía oficial. */

const LON0 = -82.4;
const LON1 = -66.6;
const LAT0 = -4.4;
const LAT1 = 13.2;

/** alto / ancho del área cartografiada */
export const MAP_ASPECT = (LAT1 - LAT0) / (LON1 - LON0);

export type Pt = [number, number];

export const project = (lon: number, lat: number): Pt => [(lon - LON0) / (LON1 - LON0), (LAT1 - lat) / (LAT1 - LAT0)];

const OUTLINE_LONLAT: Pt[] = [
  [-71.66, 12.46], [-72.2, 12.22], [-72.9, 11.6], [-73.3, 11.3], [-74.2, 11.25], [-74.85, 11.05], [-75.3, 10.75],
  [-75.55, 10.35], [-75.8, 9.7], [-75.65, 9.4], [-76.2, 9.0], [-76.5, 8.75], [-76.8, 8.35], [-76.85, 8.1],
  [-77.2, 8.3], [-77.35, 8.67], [-77.25, 8.2], [-77.5, 7.85], [-77.85, 7.55], [-77.9, 7.22], [-77.7, 6.85],
  [-77.4, 6.2], [-77.3, 5.7], [-77.5, 5.4], [-77.4, 4.6], [-77.35, 4.2], [-77.1, 3.85], [-77.5, 3.4],
  [-77.85, 2.7], [-78.35, 2.3], [-78.75, 1.85], [-78.9, 1.3], [-78.45, 1.1], [-77.9, 0.8], [-77.4, 0.45],
  [-76.6, 0.4], [-76.1, 0.3], [-75.4, -0.1], [-74.6, -0.4], [-73.8, -1.2], [-73.0, -2.0], [-72.0, -2.4],
  [-71.0, -2.5], [-70.3, -2.75], [-70.1, -3.7], [-69.95, -4.23], [-69.6, -3.0], [-69.5, -2.0], [-69.4, -1.05],
  [-69.8, 0.4], [-69.4, 1.1], [-68.4, 1.85], [-67.4, 1.6], [-66.87, 1.23], [-67.35, 2.3], [-67.6, 3.0],
  [-67.85, 3.6], [-67.7, 4.3], [-67.45, 5.2], [-67.4, 5.8], [-67.5, 6.2], [-68.3, 6.15], [-69.2, 6.15],
  [-70.1, 6.95], [-70.9, 7.0], [-71.6, 7.0], [-72.1, 7.05], [-72.4, 7.4], [-72.1, 7.9], [-72.4, 8.4],
  [-72.85, 9.0], [-73.0, 9.5], [-72.75, 10.2], [-72.5, 10.8], [-72.0, 11.5], [-71.32, 11.85], [-71.35, 12.1],
];

export const OUTLINE: Pt[] = OUTLINE_LONLAT.map(([lo, la]) => project(lo, la));

export function pointInOutline(x: number, y: number, poly: Pt[] = OUTLINE): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** Path SVG del contorno para un viewBox `w` × `w*MAP_ASPECT`. */
export function outlinePath(w: number): string {
  const h = w * MAP_ASPECT;
  return OUTLINE.map(([x, y], i) => `${i ? "L" : "M"}${(x * w).toFixed(1)} ${(y * h).toFixed(1)}`).join("") + "Z";
}

/* ------------------------- Ciudades (decorativas, hero) ------------------------- */
export const HERO_CITIES: { name: string; p: Pt; hub?: boolean }[] = [
  { name: "Bogotá", p: project(-74.07, 4.71), hub: true },
  { name: "Medellín", p: project(-75.57, 6.25) },
  { name: "Cali", p: project(-76.53, 3.45) },
  { name: "Barranquilla", p: project(-74.78, 10.96) },
  { name: "Cartagena", p: project(-75.51, 10.39) },
  { name: "Bucaramanga", p: project(-73.12, 7.12) },
  { name: "Cúcuta", p: project(-72.5, 7.89) },
  { name: "Villavicencio", p: project(-73.63, 4.15) },
  { name: "Popayán", p: project(-76.61, 2.44) },
  { name: "Pasto", p: project(-77.28, 1.21) },
  { name: "Leticia", p: project(-69.94, -4.21) },
  { name: "San Andrés", p: project(-81.72, 12.55) },
];

/* ------------------------- Territorios (sección Smart Cities) ------------------------- */
/* Solo se listan entidades del brochure y su ubicación institucional conocida.
   `cctv` marca únicamente lo que el brochure declara: proyectos CCTV para
   CODALTEC, Jamundí y Buenaventura. `pendiente` deja preparado el detalle futuro. */
export type Territory = {
  id: string;
  name: string;
  region: string;
  p: Pt;
  entities: string[];
  cctv?: string;
  pendiente?: boolean;
};

export const TERRITORIES: Territory[] = [
  {
    id: "bogota",
    name: "Bogotá D.C. y Cundinamarca",
    region: "Sede principal de ANASEC",
    p: project(-74.07, 4.71),
    entities: [
      "Cancillería de Colombia",
      "Fondo Nacional del Ahorro",
      "Unidad de Planeación Minero Energética (UPME)",
      "Agencia Nacional Digital",
      "Corporación de Alta Tecnología para la Defensa (CODALTEC)",
      "Municipio de Madrid",
    ],
    cctv: "Proyecto CCTV desarrollado para CODALTEC.",
  },
  {
    id: "valle",
    name: "Cali, Valle del Cauca y Jamundí",
    region: "Suroccidente",
    p: project(-76.53, 3.45),
    entities: [
      "Alcaldía de Santiago de Cali",
      "Gobernación del Valle del Cauca",
      "Empresas Municipales de Cali (EMCALI)",
      "Empresa de Recursos Tecnológicos del Valle (ERT)",
    ],
    cctv: "Proyecto CCTV desarrollado para Jamundí.",
  },
  {
    id: "buenaventura",
    name: "Buenaventura",
    region: "Pacífico",
    p: project(-77.03, 3.88),
    entities: [],
    cctv: "Proyecto CCTV desarrollado para Buenaventura.",
  },
  {
    id: "cauca",
    name: "Popayán y Cauca",
    region: "Suroccidente",
    p: project(-76.61, 2.44),
    entities: ["Gobernación del Cauca", "Empresa de Telecomunicaciones de Popayán (EMTEL)"],
    pendiente: true,
  },
  {
    id: "eje",
    name: "Eje Cafetero y Quindío",
    region: "Centro-occidente",
    p: project(-75.68, 4.53),
    entities: ["Gobernación del Quindío", "Canal Regional Telecafé"],
    pendiente: true,
  },
  {
    id: "atlantico",
    name: "Barranquilla y Atlántico",
    region: "Caribe",
    p: project(-74.78, 10.96),
    entities: [
      "Departamento del Atlántico",
      "Corporación Autónoma Regional del Atlántico C.R.A.",
      "Municipio de Repelón",
      "Corporación Universidad de la Costa",
    ],
    pendiente: true,
  },
  {
    id: "sanandres",
    name: "San Andrés, Providencia y Santa Catalina",
    region: "Archipiélago",
    p: project(-81.72, 12.55),
    entities: ["Gobernación del Archipiélago de San Andrés, Providencia y Santa Catalina"],
    pendiente: true,
  },
];

export const SMART_CAPABILITIES = [
  { id: "conectividad", label: "Conectividad", text: "Redes de fibra óptica y soluciones avanzadas de conectividad en la nube." },
  { id: "iot", label: "IoT", text: "Internet de las cosas para ciudades y territorios más inteligentes." },
  { id: "cctv", label: "CCTV", text: "Cámaras de seguridad y proyectos de videovigilancia integrados." },
  { id: "infraestructura", label: "Infraestructura", text: "Canalizaciones, adecuaciones eléctricas y energía solar." },
  { id: "control", label: "Centros de control", text: "Centros Automáticos de Despacho y centros de control (NOC) con soporte 24/7." },
  { id: "analitica", label: "Analítica", text: "Soluciones de analítica para ciudades inteligentes y toma de decisiones." },
] as const;
