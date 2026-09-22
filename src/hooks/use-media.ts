"use client";

import { useSyncExternalStore } from "react";

/** Suscripción segura a media queries (SSR = false). */
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useReducedMotionPref = () => useMedia("(prefers-reduced-motion: reduce)");
