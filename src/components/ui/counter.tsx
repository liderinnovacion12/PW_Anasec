"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

const fmt = new Intl.NumberFormat("es-CO");

/** Contador animado que arranca al entrar en pantalla. */
export function Counter({ to, prefix = "", suffix = "", duration = 2.2, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={className} role="text" aria-label={`${prefix}${fmt.format(to)}${suffix}`}>
      <span aria-hidden>
        {prefix}
        {fmt.format(val)}
        {suffix}
      </span>
    </span>
  );
}
