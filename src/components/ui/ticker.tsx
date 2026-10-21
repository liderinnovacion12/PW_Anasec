"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

/** Cinta de palabras que se desplaza con el scroll (divisor entre bloques de la página). */
export function Ticker({ words, reverse = false }: { words: string[]; reverse?: boolean }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const raw = useTransform(scrollYProgress, [0, 1], reverse ? ["-60%", "0%"] : ["0%", "-60%"]);
  const x = useSpring(raw, { stiffness: 70, damping: 24 });
  const loop = [...words, ...words, ...words, ...words];

  return (
    <div aria-hidden className="overflow-hidden border-y border-line py-3 sm:py-4">
      <motion.div style={reduce ? undefined : { x }} className="flex w-max items-center whitespace-nowrap">
        {loop.map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`px-5 text-[clamp(1.6rem,4.5vw,3.4rem)] font-extrabold uppercase leading-none tracking-tighter ${
                i % 2 ? "text-grad" : "text-transparent [-webkit-text-stroke:1.2px_var(--line-strong)]"
              }`}
            >
              {w}
            </span>
            <span className="text-fg3">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
