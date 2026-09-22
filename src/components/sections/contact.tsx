"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROJECT_TYPES } from "@/lib/content";
import { MAPS_QUERY, SITE } from "@/lib/site";

type Fields = { name: string; org: string; email: string; phone: string; project: string; message: string };
const EMPTY: Fields = { name: "", org: "", email: "", phone: "", project: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPreset = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setValues((v) => ({ ...v, project: detail }));
      document.getElementById("f-message")?.focus();
    };
    window.addEventListener("anasec:project-type", onPreset);
    return () => window.removeEventListener("anasec:project-type", onPreset);
  }, []);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const validate = (): boolean => {
    const next: Partial<Fields> = {};
    if (!values.name.trim()) next.name = "Ingresa tu nombre completo.";
    if (!values.org.trim()) next.org = "Ingresa tu entidad o empresa.";
    if (!EMAIL_RE.test(values.email)) next.email = "Ingresa un correo electrónico válido.";
    if (!values.project) next.project = "Selecciona el tipo de proyecto.";
    if (!values.message.trim() || values.message.trim().length < 10) next.message = "Cuéntanos brevemente tu proyecto (mínimo 10 caracteres).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      liveRef.current?.focus();
      return;
    }
    const subject = `Solicitud de proyecto — ${values.project}`;
    const body = [
      `Nombre: ${values.name}`,
      `Entidad / Empresa: ${values.org}`,
      `Correo: ${values.email}`,
      values.phone ? `Teléfono: ${values.phone}` : null,
      `Tipo de proyecto: ${values.project}`,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
    setValues(EMPTY);
  };

  return (
    <section id="contacto" aria-labelledby="contact-title" className="section-pad relative overflow-hidden bg-bg2">
      <div className="container-x">
        <SectionHeading eyebrow="Contacto" title="Hablemos de tu próximo proyecto" titleId="contact-title" highlight={["proyecto"]} />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* INFO + MAPA */}
          <Reveal className="flex flex-col gap-6">
            <div className="glass rounded-3xl p-7 sm:p-8">
              <p className="text-lg font-bold tracking-tight">{SITE.name}</p>
              <p className="text-sm text-fg3">{SITE.legalName}</p>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span className="text-fg2">
                    {SITE.street}
                    <br />
                    {SITE.city}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <a href={SITE.phoneHref} className="text-fg2 transition-colors hover:text-accent">
                    {SITE.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <a href={`mailto:${SITE.email}`} className="break-all text-fg2 transition-colors hover:text-accent">
                    {SITE.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span className="text-fg2">Lunes a viernes, horario de oficina</span>
                </li>
              </ul>
              <a
                href={SITE.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
              >
                {SITE.web} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="glass overflow-hidden rounded-3xl">
              <iframe
                title={`Mapa de ubicación — ${SITE.street}, Bogotá D.C.`}
                src={`https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[260px] w-full grayscale-[15%]"
              />
            </div>
          </Reveal>

          {/* FORMULARIO */}
          <Reveal delay={0.1} className="glass relative overflow-hidden rounded-3xl p-7 sm:p-9">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[380px] flex-col items-center justify-center text-center"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-[image:var(--grad-brand)] text-white">
                    <Check className="h-8 w-8" aria-hidden />
                  </span>
                  <p className="mt-6 text-xl font-bold tracking-tight">Tu cliente de correo se ha abierto</p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg3">
                    Revisa el mensaje prellenado hacia {SITE.email} y confírmalo desde tu correo para completar el envío.
                  </p>
                  <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-8">
                    Enviar otra solicitud
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                  <div ref={liveRef} tabIndex={-1} aria-live="polite" className="sr-only">
                    {Object.values(errors).filter(Boolean).length > 0 ? "El formulario tiene campos por corregir." : ""}
                  </div>

                  <Field label="Nombre" htmlFor="f-name" error={errors.name}>
                    <input id="f-name" name="name" autoComplete="name" className="field" value={values.name} onChange={set("name")} aria-invalid={!!errors.name} required />
                  </Field>
                  <Field label="Entidad / Empresa" htmlFor="f-org" error={errors.org}>
                    <input id="f-org" name="org" autoComplete="organization" className="field" value={values.org} onChange={set("org")} aria-invalid={!!errors.org} required />
                  </Field>
                  <Field label="Correo" htmlFor="f-email" error={errors.email}>
                    <input id="f-email" name="email" type="email" autoComplete="email" className="field" value={values.email} onChange={set("email")} aria-invalid={!!errors.email} required />
                  </Field>
                  <Field label="Teléfono" htmlFor="f-phone" hint="opcional">
                    <input id="f-phone" name="phone" type="tel" autoComplete="tel" className="field" value={values.phone} onChange={set("phone")} />
                  </Field>
                  <Field label="Tipo de proyecto" htmlFor="f-project" error={errors.project} className="sm:col-span-2">
                    <select id="f-project" name="project" className="field" value={values.project} onChange={set("project")} aria-invalid={!!errors.project} required>
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Mensaje" htmlFor="f-message" error={errors.message} className="sm:col-span-2">
                    <textarea
                      id="f-message"
                      name="message"
                      rows={5}
                      className="field resize-y"
                      value={values.message}
                      onChange={set("message")}
                      aria-invalid={!!errors.message}
                      required
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <button type="submit" className="btn btn-primary w-full sm:w-auto">
                      Enviar solicitud
                      <Send className="arrow h-4 w-4" />
                    </button>
                    <p className="mt-3 text-xs leading-relaxed text-fg3">
                      Al enviar, se abrirá tu cliente de correo con el mensaje redactado hacia {SITE.email}.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-fg2">
        {label}
        {hint && <span className="ml-1.5 text-xs font-normal text-fg3">({hint})</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-[#d64545]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
