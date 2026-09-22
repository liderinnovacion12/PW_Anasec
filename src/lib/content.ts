import {
  Activity,
  BookOpen,
  Brain,
  Cable,
  Cctv,
  Cloud,
  Cpu,
  Database,
  DatabaseBackup,
  GraduationCap,
  Handshake,
  Headphones,
  Landmark,
  Layers,
  Lightbulb,
  Lock,
  type LucideIcon,
  Map as MapIcon,
  MonitorCog,
  Network,
  RadioTower,
  Scale,
  Search,
  ShieldCheck,
  Sun,
  Truck,
  Users,
  Wifi,
} from "lucide-react";

/* Todo el contenido proviene del Brochure ANASEC 2026.
   Cualquier dato sin respaldo en el brochure se marca como `pendiente`. */

/* ------------------------------------------------------------ */
/* Cinco líneas estratégicas                                     */
/* ------------------------------------------------------------ */
export type Capability = {
  n: string;
  id: "infra" | "academica" | "formacion" | "ciber" | "logistica";
  title: string;
  short: string;
  description: string;
  services: string[];
  icon: LucideIcon;
  gradient: string;
};

export const CAPABILITIES: Capability[] = [
  {
    n: "01",
    id: "infra",
    title: "Infraestructura Tecnológica y Telecomunicaciones",
    short: "Infraestructura y telecomunicaciones",
    description:
      "Despliegue, diseño e instalación de redes de fibra óptica, desarrollo de proyectos Smart Cities, centros de cómputo y soluciones avanzadas de conectividad en la nube y redes canalizadas.",
    services: ["Fibra óptica", "Smart Cities", "Centros de cómputo", "Conectividad en la nube", "Redes canalizadas"],
    icon: Cable,
    gradient: "linear-gradient(160deg,#0b1f4d 0%,#12408a 55%,#137ec6 100%)",
  },
  {
    n: "02",
    id: "academica",
    title: "Innovación Académica y Plataformas de Formación",
    short: "Innovación académica y plataformas",
    description:
      "Creación, administración e integración de sistemas de gestión del aprendizaje (LMS), desarrollo de software a la medida y asesoría pedagógica para contenidos virtuales.",
    services: ["Sistemas LMS", "Software a la medida", "Asesoría pedagógica", "Contenidos virtuales"],
    icon: BookOpen,
    gradient: "linear-gradient(160deg,#0d2a5e 0%,#0f6aa8 50%,#13a1a9 100%)",
  },
  {
    n: "03",
    id: "formacion",
    title: "Formación y Desarrollo de Capacidades",
    short: "Formación y desarrollo de capacidades",
    description:
      "Programas de capacitación especializada en tecnologías emergentes, habilidades STEM, competencias para el trabajo y formación continua.",
    services: ["Tecnologías emergentes", "Habilidades STEM", "Competencias para el trabajo", "Formación continua"],
    icon: GraduationCap,
    gradient: "linear-gradient(160deg,#0c3560 0%,#0e7c93 52%,#3fae6a 100%)",
  },
  {
    n: "04",
    id: "ciber",
    title: "Ciberseguridad y Continuidad de Negocio",
    short: "Ciberseguridad y continuidad",
    description:
      "Servicios de protección de la información, administración de bases de datos, auditoría y respaldo en centros de procesamiento para mitigar riesgos informáticos y garantizar la operatividad institucional.",
    services: ["Protección de la información", "Bases de datos", "Auditoría", "Respaldo en centros de procesamiento"],
    icon: ShieldCheck,
    gradient: "linear-gradient(160deg,#060f2b 0%,#0f2f6b 55%,#1a5fa8 100%)",
  },
  {
    n: "05",
    id: "logistica",
    title: "Gestión Logística e Interinstitucional",
    short: "Logística e interinstitucional",
    description:
      "Estructuración y gerencia de convenios interadministrativos, provisión de insumos tecnológicos, eventos corporativos y soporte BPO y mesa de ayuda especializada.",
    services: ["Convenios interadministrativos", "Insumos tecnológicos", "Eventos corporativos", "BPO y mesa de ayuda"],
    icon: Truck,
    gradient: "linear-gradient(160deg,#0f3b58 0%,#1b7a6e 52%,#66be56 100%)",
  },
];

/* ------------------------------------------------------------ */
/* Portafolio tecnológico                                        */
/* ------------------------------------------------------------ */
export type PortfolioItem = {
  id: "scd" | "software" | "datacenter" | "smart";
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
  projectType: string;
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "scd",
    title: "Servicios Ciudadanos Digitales",
    description:
      "Operación, soporte y evolución de plataformas del ecosistema GOV.CO, Mi Colombia Digital e interoperabilidad.",
    items: ["Operación", "Soporte", "Evolución de plataformas GOV.CO", "Mi Colombia Digital", "Interoperabilidad"],
    icon: Landmark,
    projectType: "Servicios ciudadanos digitales",
  },
  {
    id: "software",
    title: "Desarrollo de Software e Inteligencia Artificial",
    description:
      "Modelos predictivos, analítica de datos, herramientas RPA, algoritmos de Machine Learning y automatización de trámites.",
    items: ["Modelos predictivos", "Analítica de datos", "RPA", "Machine Learning", "Automatización de trámites"],
    icon: Brain,
    projectType: "Desarrollo de software e inteligencia artificial",
  },
  {
    id: "datacenter",
    title: "Ciberseguridad y Datacenter",
    description:
      "Servicios de Hosting, Colocation, respaldos en la nube, ciberseguridad, mesas de ayuda (Help Desk) y soluciones BPO/Contact Center.",
    items: ["Hosting", "Colocation", "Backups", "Ciberseguridad", "Help Desk", "BPO / Contact Center"],
    icon: Database,
    projectType: "Ciberseguridad y datacenter",
  },
  {
    id: "smart",
    title: "Smart Cities e IoT",
    description:
      "Soluciones de analítica para ciudades inteligentes, Internet de las cosas e integración de cámaras de videovigilancia.",
    items: ["Analítica urbana", "Internet de las cosas", "Integración de cámaras", "Videovigilancia"],
    icon: Wifi,
    projectType: "Smart Cities e IoT",
  },
];

/* ------------------------------------------------------------ */
/* ANASEC Digital Network                                        */
/* ------------------------------------------------------------ */
export type NetworkNodeId = "tecnologia" | "infraestructura" | "innovacion" | "talento" | "seguridad" | "territorio";

export type NetworkNode = {
  id: NetworkNodeId;
  label: string;
  icon: LucideIcon;
  summary: string;
  chain: string[];
};

export const NETWORK_NODES: NetworkNode[] = [
  {
    id: "tecnologia",
    label: "Tecnología",
    icon: Cpu,
    summary:
      "Plataformas, datos e inteligencia artificial puestos al servicio de la gestión pública y de las ciudades.",
    chain: ["Tecnología", "Smart Cities", "IoT", "Datos", "IA", "Decisiones", "Impacto territorial"],
  },
  {
    id: "seguridad",
    label: "Seguridad",
    icon: ShieldCheck,
    summary: "Protección de la información, respaldo y continuidad para garantizar la operatividad institucional.",
    chain: ["Datos", "Ciberseguridad", "Monitoreo", "Respaldo", "Continuidad de negocio", "Operatividad institucional"],
  },
  {
    id: "infraestructura",
    label: "Infraestructura",
    icon: Cable,
    summary: "Fibra óptica, centros de datos, centros de control y obras civiles especializadas a escala nacional.",
    chain: ["Infraestructura", "Fibra óptica", "FTTH · GPON", "Centros de datos", "NOC 24/7", "Territorios conectados"],
  },
  {
    id: "territorio",
    label: "Territorio",
    icon: MapIcon,
    summary: "Ministerios, gobernaciones y alcaldías como aliados para llevar soluciones a todas las regiones.",
    chain: [
      "Territorio",
      "Entidades públicas",
      "Convenios interadministrativos",
      "Ejecución end-to-end",
      "Presencia nacional",
      "Impacto territorial",
    ],
  },
  {
    id: "talento",
    label: "Talento",
    icon: Users,
    summary: "Formación TIC, habilidades STEM e inclusión social para que las comunidades se apropien de la tecnología.",
    chain: ["Talento", "Formación TIC", "STEM y habilidades digitales", "Plataformas LMS", "Inclusión social", "Desarrollo regional"],
  },
  {
    id: "innovacion",
    label: "Innovación",
    icon: Lightbulb,
    summary: "Investigación, software a la medida y automatización que convierten retos del Estado en proyectos ejecutables.",
    chain: [
      "Innovación",
      "I+D con universidades",
      "Software a la medida",
      "Machine Learning y RPA",
      "Automatización de trámites",
      "Gobierno digital",
    ],
  },
];

/** Relación entre pares de nodos (clave: ids ordenados alfabéticamente y unidos con "|"). */
export const NETWORK_RELATIONS: Record<string, string> = {
  "infraestructura|tecnologia":
    "Las plataformas digitales se apoyan en redes de fibra, centros de datos y conectividad en la nube.",
  "innovacion|tecnologia": "La tecnología se convierte en software a la medida, analítica e IA aplicada a trámites y servicios.",
  "talento|tecnologia": "Las personas adoptan la tecnología mediante formación TIC, STEM y plataformas de aprendizaje (LMS).",
  "seguridad|tecnologia": "Cada plataforma opera con protección de la información, respaldo y continuidad de negocio.",
  "tecnologia|territorio": "Las soluciones llegan a ciudades y regiones: Smart Cities, IoT y servicios ciudadanos digitales.",
  "infraestructura|innovacion": "La conectividad y el cómputo habilitan modelos predictivos, RPA y nuevos servicios.",
  "infraestructura|talento": "Las redes permiten llevar formación y plataformas educativas a más comunidades.",
  "infraestructura|seguridad": "Centros de datos, centros de control 24/7 y respaldos sostienen la operación continua.",
  "infraestructura|territorio": "Fibra óptica, canalizaciones y energía solar conectan los territorios.",
  "innovacion|talento": "La investigación y el desarrollo se convierten en apropiación tecnológica, en alianza con universidades.",
  "innovacion|seguridad": "Los nuevos desarrollos incorporan protección de datos y auditoría desde su diseño.",
  "innovacion|territorio": "Las soluciones se adaptan a las necesidades de cada entidad y de cada territorio.",
  "seguridad|talento": "Las capacidades de las personas fortalecen la seguridad y la continuidad institucional.",
  "talento|territorio": "La formación y la inclusión social llevan oportunidades a poblaciones de todo el país.",
  "seguridad|territorio": "La continuidad de los servicios garantiza la operatividad de las entidades territoriales.",
};

export const relationKey = (a: NetworkNodeId, b: NetworkNodeId) => [a, b].sort().join("|");

/* ------------------------------------------------------------ */
/* Infraestructura y telecomunicaciones                          */
/* ------------------------------------------------------------ */
export type InfraItem = { title: string; text: string; icon: LucideIcon };
export const INFRA_ITEMS: InfraItem[] = [
  {
    title: "Fibra óptica",
    text: "Diseño, suministro, instalación y mantenimiento de redes de fibra óptica terrestre y subfluvial a escala masiva.",
    icon: Cable,
  },
  { title: "FTTH", text: "Redes de fibra hasta el hogar para llevar conectividad a las personas y sus hogares.", icon: Wifi },
  { title: "GPON", text: "Tecnología de red óptica pasiva para distribuir fibra a gran escala.", icon: Network },
  { title: "OLT", text: "Terminal de línea óptica: el equipo de cabecera de la red de fibra.", icon: Layers },
  { title: "ONT", text: "Terminal de red óptica: el punto donde la fibra llega al usuario.", icon: RadioTower },
  {
    title: "CCTV",
    text: "Implementación e integración de cámaras de seguridad y proyectos CCTV, como los desarrollados para CODALTEC, Jamundí y Buenaventura.",
    icon: Cctv,
  },
  {
    title: "SIES",
    text: "Sistemas de seguridad y Centros Automáticos de Despacho integrados a los proyectos de videovigilancia.",
    icon: ShieldCheck,
  },
  {
    title: "NOC",
    text: "Operación y soporte 24/7 para torres de comunicaciones y centros de procesamiento de datos.",
    icon: MonitorCog,
  },
  {
    title: "Centros de datos",
    text: "Centros de cómputo, servicios de Hosting y Colocation para alojar la operación de las entidades.",
    icon: Database,
  },
  {
    title: "Obras civiles especializadas",
    text: "Construcción de canalizaciones y adecuaciones eléctricas para el despliegue de redes.",
    icon: Activity,
  },
  {
    title: "Energía solar",
    text: "Proyectos de energía solar y otras fuentes renovables.",
    icon: Sun,
  },
];

/* ------------------------------------------------------------ */
/* Ciberseguridad                                                */
/* ------------------------------------------------------------ */
export const CYBER_STAGES = [
  { id: "datos", label: "Datos", text: "Administración de bases de datos y protección de la información institucional.", icon: Database },
  {
    id: "seguridad",
    label: "Seguridad",
    text: "Servicios de ciberseguridad y auditoría para mitigar riesgos informáticos.",
    icon: Lock,
  },
  {
    id: "monitoreo",
    label: "Monitoreo",
    text: "Operación y soporte 24/7 desde centros de control (NOC) y mesas de ayuda (Help Desk).",
    icon: Search,
  },
  {
    id: "respaldo",
    label: "Respaldo",
    text: "Respaldos en la nube y en centros de procesamiento; servicios de Hosting y Colocation.",
    icon: DatabaseBackup,
  },
  {
    id: "continuidad",
    label: "Continuidad",
    text: "Continuidad de negocio para garantizar la operatividad institucional.",
    icon: Cloud,
  },
] as const;

export const CYBER_SERVICES = [
  { label: "Ciberseguridad", icon: ShieldCheck },
  { label: "Datacenter", icon: Database },
  { label: "Backups", icon: DatabaseBackup },
  { label: "Bases de datos", icon: Layers },
  { label: "Auditoría", icon: Search },
  { label: "Help Desk", icon: Headphones },
  { label: "Continuidad de negocio", icon: Cloud },
];

/* ------------------------------------------------------------ */
/* Formación e innovación inclusiva                              */
/* ------------------------------------------------------------ */
export const TRAINING_ITEMS = [
  {
    title: "Educación y Formación TIC",
    text: "Cursos especializados en software, disciplinas STEM, habilidades digitales y competencias laborales.",
    tags: ["Educación TIC", "STEM", "Habilidades digitales", "Formación laboral"],
  },
  {
    title: "Plataformas Educativas (LMS) y Consultoría Pedagógica",
    text: "Creación de contenidos digitales interactivos y sistemas de evaluación teórica-práctica.",
    tags: ["LMS", "Consultoría pedagógica"],
  },
  {
    title: "Investigación y Desarrollo (I+D)",
    text: "Proyectos de apropiación tecnológica en alianza con universidades e instituciones educativas.",
    tags: ["Investigación y desarrollo"],
  },
  {
    title: "Inclusión Social de Poblaciones Vulnerables",
    text: "Diseño e implementación de proyectos de desarrollo comunitario, paz y gestión de políticas públicas de juventud y negocios verdes.",
    tags: ["Inclusión social"],
  },
];

export const TRAINING_VENN = {
  personas: ["Inclusión social", "Formación laboral", "Habilidades digitales"],
  conocimiento: ["Educación TIC", "STEM", "Consultoría pedagógica"],
  tecnologia: ["LMS", "Investigación y desarrollo"],
};

/* ------------------------------------------------------------ */
/* Logística y eventos                                           */
/* ------------------------------------------------------------ */
export const LOGISTICS_GROUPS = [
  {
    title: "Gestión Logística End-to-End",
    text: "Organización, montaje y producción de congresos, simposios, ferias y encuentros institucionales a nivel nacional.",
    items: ["Congresos", "Simposios", "Ferias", "Encuentros institucionales"],
  },
  {
    title: "Servicios Complementarios",
    text: "Catering, escenografía, seguridad privada, transporte especial de personal y suministro de material promocional.",
    items: ["Catering", "Escenografía", "Seguridad", "Transporte", "Material promocional"],
  },
  {
    title: "Tecnología Audiovisual",
    text: "Alquiler de pantallas LED, sonido profesional, iluminación y plataformas para transmisiones híbridas y seminarios web.",
    items: ["Pantallas LED", "Sonido", "Iluminación", "Streaming"],
  },
  {
    title: "Agencia de Medios y Divulgación",
    text: "Desarrollo de acciones de comunicación estratégica, planes tácticos y pauta institucional.",
    items: ["Agencia de medios"],
  },
];

export const LOGISTICS_WORDS = [
  "Congresos",
  "Simposios",
  "Ferias",
  "Encuentros institucionales",
  "Catering",
  "Escenografía",
  "Seguridad",
  "Transporte",
  "Material promocional",
  "Pantallas LED",
  "Sonido",
  "Iluminación",
  "Streaming",
  "Agencia de medios",
];

/* ------------------------------------------------------------ */
/* Respaldo jurídico                                             */
/* ------------------------------------------------------------ */
export const LEGAL_ITEMS: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Economía mixta",
    text: "Estructura que articula capacidades de los sectores público y privado.",
    icon: Scale,
  },
  {
    title: "Contratación interadministrativa",
    text: "Capacidad legal para celebrar convenios o contratos interadministrativos.",
    icon: Landmark,
  },
  {
    title: "Alianzas público-privadas",
    text: "Habilitada para actuar como aliado estratégico de entidades territoriales y nacionales.",
    icon: Handshake,
  },
  {
    title: "Consultoría",
    text: "Contratos de gestión o consultoría para formular y estructurar proyectos.",
    icon: Search,
  },
  {
    title: "Gestión integral",
    text: "Gerencia y ejecución de proyectos de tecnología, conectividad e infraestructura.",
    icon: Layers,
  },
  {
    title: "Inspección, vigilancia y control",
    text: "Por parte de la Secretaría Jurídica Distrital de la Alcaldía de Bogotá.",
    icon: ShieldCheck,
  },
  {
    title: "Soluciones end-to-end",
    text: "Alcance operativo integral, desde la consultoría hasta el mantenimiento.",
    icon: Network,
  },
];

export const END_TO_END = [
  "Consultoría",
  "Formulación",
  "Diseño",
  "Integración",
  "Licencias",
  "Instalación",
  "Soporte técnico",
  "Mantenimiento",
];

/* ------------------------------------------------------------ */
/* Clientes y aliados                                            */
/* ------------------------------------------------------------ */
export type Ally = { name: string; logo: string; scale?: number };

export const ALLIES: { category: string; items: Ally[] }[] = [
  {
    category: "Entidades e instituciones nacionales",
    items: [
      { name: "Fondo Nacional del Ahorro", logo: "fna" },
      { name: "Cancillería de Colombia", logo: "cancilleria" },
      { name: "Agencia Nacional Digital", logo: "agencia-nacional-digital" },
      { name: "Unidad de Planeación Minero Energética (UPME)", logo: "upme" },
      { name: "Corporación de Alta Tecnología para la Defensa (CODALTEC)", logo: "codaltec" },
      { name: "Fundación Redprodepaz", logo: "redprodepaz" },
      { name: "Corporación Universidad de la Costa", logo: "cuc" },
      { name: "APROPIA TIC SAS", logo: "apropia-tic" },
    ],
  },
  {
    category: "Empresas públicas y descentralizadas",
    items: [
      { name: "Empresas Municipales de Cali (EMCALI E.I.C.E. E.S.P.)", logo: "emcali" },
      { name: "Empresa de Recursos Tecnológicos del Valle (ERT)", logo: "ert" },
      { name: "Empresa de Telecomunicaciones de Popayán (EMTEL)", logo: "emtel" },
      { name: "Canal Regional Telecafé", logo: "telecafe" },
    ],
  },
  {
    category: "Entes territoriales",
    items: [
      { name: "Gobernación del Cauca", logo: "gob-cauca" },
      { name: "Gobernación del Archipiélago de San Andrés, Providencia y Santa Catalina", logo: "gob-san-andres" },
      { name: "Gobernación del Quindío", logo: "gob-quindio" },
      { name: "Gobernación del Valle del Cauca", logo: "gob-valle" },
      { name: "Municipio de Madrid", logo: "madrid" },
      { name: "Departamento del Atlántico", logo: "atlantico" },
      { name: "Corporación Autónoma Regional del Atlántico C.R.A.", logo: "car" },
      { name: "Municipio de Repelón", logo: "repelon" },
      { name: "Municipio de Manaure", logo: "manaure" },
      { name: "Alianza Pública para el Desarrollo Integral - Aldesarrollo", logo: "aldesarrollo" },
      { name: "Alcaldía de Santiago de Cali", logo: "cali" },
    ],
  },
];

/* ------------------------------------------------------------ */
/* Tipos de proyecto (formulario)                                */
/* ------------------------------------------------------------ */
export const PROJECT_TYPES = [
  "Infraestructura tecnológica y telecomunicaciones",
  "Servicios ciudadanos digitales",
  "Desarrollo de software e inteligencia artificial",
  "Ciberseguridad y datacenter",
  "Smart Cities e IoT",
  "Innovación académica y formación",
  "Gestión logística y eventos",
  "Otro / aún no lo tengo definido",
];
