import { SITE } from "@/lib/site";

/* Contenido institucional estándar. El brochure no detalla estas políticas;
   se deja preparado con lenguaje genérico y responsable hasta que ANASEC
   provea el texto jurídico definitivo. */

export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
};

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "politica-de-privacidad",
    title: "Política de privacidad",
    updated: "2026",
    sections: [
      {
        heading: "Alcance",
        body: [
          `Esta política aplica a la información recolectada a través del sitio web de ${SITE.name} (${SITE.web}), incluido el formulario de contacto.`,
        ],
      },
      {
        heading: "Información que recolectamos",
        body: [
          "A través del formulario de contacto podemos recibir: nombre, entidad o empresa, correo electrónico, teléfono, tipo de proyecto de interés y el mensaje que decidas compartir.",
        ],
      },
      {
        heading: "Uso de la información",
        body: [
          `La información suministrada se utiliza exclusivamente para dar respuesta a tu solicitud y para fines de contacto comercial o institucional con ${SITE.name}. No se vende ni se cede a terceros con fines publicitarios.`,
        ],
      },
      {
        heading: "Contacto",
        body: [`Para consultas sobre esta política, escribe a ${SITE.email} o comunícate al ${SITE.phone}.`],
      },
    ],
  },
  {
    slug: "tratamiento-de-datos",
    title: "Tratamiento de datos personales",
    updated: "2026",
    sections: [
      {
        heading: "Responsable del tratamiento",
        body: [`${SITE.legalName} (${SITE.name}), ${SITE.type}, NIT ${SITE.nit}, con domicilio en ${SITE.street}, ${SITE.city}.`],
      },
      {
        heading: "Finalidad",
        body: [
          "Los datos personales suministrados voluntariamente a través de los canales de contacto de ANASEC serán tratados para atender solicitudes de información, gestionar oportunidades de proyectos y mantener comunicación institucional.",
        ],
      },
      {
        heading: "Derechos del titular",
        body: [
          "De acuerdo con la Ley 1581 de 2012 y sus decretos reglamentarios, tienes derecho a conocer, actualizar, rectificar y suprimir tus datos personales, así como a revocar la autorización otorgada para su tratamiento.",
        ],
      },
      {
        heading: "Cómo ejercer tus derechos",
        body: [`Puedes ejercer tus derechos escribiendo a ${SITE.email}, indicando el derecho que deseas ejercer y los datos que te identifican.`],
      },
    ],
  },
  {
    slug: "terminos-y-condiciones",
    title: "Términos y condiciones",
    updated: "2026",
    sections: [
      {
        heading: "Objeto",
        body: [
          `Estos términos regulan el acceso y uso del sitio web de ${SITE.name}, ${SITE.legalName} (${SITE.type}, NIT ${SITE.nit}).`,
        ],
      },
      {
        heading: "Uso del sitio",
        body: [
          "El contenido de este sitio es de carácter informativo e institucional. Su reproducción total o parcial requiere autorización previa de ANASEC, salvo cuando la ley disponga lo contrario.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        body: [
          "La marca ANASEC, su logotipo y los contenidos publicados en este sitio son propiedad de la Corporación o de sus respectivos titulares y están protegidos por la normativa vigente en materia de propiedad intelectual.",
        ],
      },
      {
        heading: "Contacto",
        body: [`Para cualquier inquietud sobre estos términos, escribe a ${SITE.email}.`],
      },
    ],
  },
];

export const getLegalDoc = (slug: string) => LEGAL_DOCS.find((d) => d.slug === slug);
