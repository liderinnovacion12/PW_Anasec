"use client";

import { useEffect, useState } from "react";
import { SECTION_IDS, type SectionId } from "@/lib/site";

/** Devuelve la sección visible (la última cuyo borde superior ya pasó ~40 % de la ventana). */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("inicio");

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current: SectionId = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return active;
}
