import Image from "next/image";

/** Logo ANASEC del brochure. La variante clara se usa sobre fondos oscuros. */
export function Logo({ className = "h-8 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <>
      <Image
        src="/logos/anasec-logo.png"
        alt="ANASEC"
        width={1400}
        height={184}
        priority={priority}
        unoptimized
        className={`${className} block [[data-theme=dark]_&]:hidden [.surface-dark_&]:hidden`}
      />
      <Image
        src="/logos/anasec-logo-dark.png"
        alt=""
        aria-hidden
        width={1400}
        height={184}
        priority={priority}
        unoptimized
        className={`${className} hidden [[data-theme=dark]_&]:block [.surface-dark_&]:block`}
      />
    </>
  );
}
