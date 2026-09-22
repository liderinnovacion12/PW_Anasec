/** Motivo de triángulos diagonales del brochure (esquinas). */
export function BrandCorners({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute right-0 top-0 h-auto w-[34vw] max-w-[380px] min-w-[150px]" viewBox="0 0 124 111" fill="none">
        <defs>
          <linearGradient id="bc-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#66be56" />
            <stop offset="1" stopColor="#137ec6" />
          </linearGradient>
          <linearGradient id="bc-n" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1a3f71" />
            <stop offset="1" stopColor="#132a5a" />
          </linearGradient>
        </defs>
        <polygon points="34,26 124,26 124,111" fill="url(#bc-g)" opacity="0.92" />
        <polygon points="0,0 124,0 124,87" fill="url(#bc-n)" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 h-auto w-[34vw] max-w-[380px] min-w-[150px] rotate-180"
        viewBox="0 0 124 111"
        fill="none"
      >
        <polygon points="34,26 124,26 124,111" fill="url(#bc-g)" opacity="0.92" />
        <polygon points="0,0 124,0 124,87" fill="url(#bc-n)" />
      </svg>
    </div>
  );
}
