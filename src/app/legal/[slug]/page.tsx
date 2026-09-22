import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandCorners } from "@/components/ui/brand-corners";
import { getLegalDoc, LEGAL_DOCS } from "@/lib/legal";

export function generateStaticParams() {
  return LEGAL_DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return { title: doc.title, robots: { index: true, follow: true } };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <section className="relative overflow-hidden pb-24 pt-[132px] sm:pt-[152px]">
      <BrandCorners />
      <div className="container-x relative max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-fg2 transition-colors hover:text-accent">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>
        <h1 className="h-section mt-6">{doc.title}</h1>
        <p className="eyebrow mt-4 !before:hidden">Actualizado en {doc.updated}</p>

        <div className="mt-10 space-y-9">
          {doc.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-lg font-bold tracking-tight">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="lead mt-3 !text-[0.95rem]">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
