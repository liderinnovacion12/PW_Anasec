"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Barra superior de progreso de lectura. */
export function ProgressRail() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[image:var(--grad-brand)]"
      style={{ scaleX: smooth }}
    />
  );
}
