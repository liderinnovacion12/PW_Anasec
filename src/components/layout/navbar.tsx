"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { NAV_LINKS, SITE } from "@/lib/site";
import { Magnetic } from "@/components/ui/magnetic";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const burger = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burger.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => firstLink.current?.focus(), 80);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-line bg-[var(--glass-strong)] shadow-[0_10px_40px_-20px_rgba(19,42,90,0.35)] backdrop-blur-xl backdrop-saturate-150"
            : "on-video border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <a href="#inicio" aria-label="ANASEC, ir al inicio" className="relative z-10 shrink-0">
            <Logo className="h-11 w-auto sm:h-12" priority />
          </a>

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((l) => {
                const on = l.sections.includes(active);
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      aria-current={on ? "true" : undefined}
                      className={`group relative block rounded-full px-4 py-2 text-[0.86rem] font-medium transition-colors ${
                        on ? "text-fg" : "text-fg2 hover:text-fg"
                      }`}
                    >
                      {l.label}
                      <span
                        className={`absolute inset-x-4 -bottom-0.5 h-[2px] origin-left rounded-full bg-[image:var(--grad-brand)] transition-transform duration-500 ${
                          on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden xl:block">
              <Magnetic>
                <a href="#contacto" className="btn btn-primary !min-h-11 !px-5 text-[0.86rem]">
                  Construyamos juntos
                  <ArrowUpRight className="arrow h-4 w-4" />
                </a>
              </Magnetic>
            </div>
            <button
              ref={burger}
              type="button"
              className="glass grid h-11 w-11 place-items-center rounded-full xl:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[var(--bg)]/95 px-6 pb-10 pt-28 backdrop-blur-2xl xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={l.sections.includes(active) ? "true" : undefined}
                    className="flex min-h-[60px] items-baseline gap-4 border-b border-line py-3 text-[1.7rem] font-semibold tracking-tight aria-[current=true]:text-accent"
                  >
                    <span className="font-mono text-xs text-fg3">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4">
              <a href="#contacto" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Construyamos juntos
                <ArrowUpRight className="arrow h-4 w-4" />
              </a>
              <p className="text-sm text-fg3">
                {SITE.phone} · {SITE.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
