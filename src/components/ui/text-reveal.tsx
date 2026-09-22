"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  id?: string;
  className?: string;
  /** palabras que se pintan con el degradado de marca */
  highlight?: string[];
  delay?: number;
  stagger?: number;
};

const strip = (w: string) => w.replace(/[.,;:!?¿¡"“”]/g, "");

/** Revela un titular palabra por palabra con máscara. */
export function TextReveal({ text, as: Tag = "h2", id, className, highlight = [], delay = 0, stagger = 0.045 }: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const hl = new Set(highlight.map((h) => h.toLowerCase()));
  return (
    <Tag id={id} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${hl.has(strip(w).toLowerCase()) ? "text-grad" : ""}`}
            initial={reduce ? false : { y: "110%", rotate: 3 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.85, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
