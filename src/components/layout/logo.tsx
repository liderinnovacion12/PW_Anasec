import Image from "next/image";

/** Logo ANASEC del brochure. La variante clara se usa sobre fondos oscuros. */
export function Logo({ className = "h-8 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <>
      <Image
        src="/logos/anasec-logo-full.png"
        alt="ANASEC, Agencia Nacional de Servicios del Estado Colombiano"
        width={1197}
        height={264}
        priority={priority}
        unoptimized
        className={`${className} block [[data-theme=dark]_&]:hidden [.surface-dark_&]:hidden [.on-video_&]:hidden`}
      />
      <Image
        src="/logos/anasec-logo-full-dark.png"
        alt=""
        aria-hidden
        width={1197}
        height={264}
        priority={priority}
        unoptimized
        className={`${className} hidden [[data-theme=dark]_&]:block [.surface-dark_&]:block [.on-video_&]:block [.on-video_&]:drop-shadow-[0_2px_12px_rgb(0_0_0/0.55)]`}
      />
    </>
  );
}
