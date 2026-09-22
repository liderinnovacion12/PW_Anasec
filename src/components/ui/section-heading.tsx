import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { TextReveal } from "./text-reveal";

type Props = {
  eyebrow: string;
  title: string;
  titleId?: string;
  highlight?: string[];
  children?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, titleId, highlight, children, align = "left", as = "h2", className = "" }: Props) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-4xl ${className}`}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <TextReveal text={title} id={titleId} highlight={highlight} as={as} className="h-section mt-5" />
      {children ? (
        <Reveal delay={0.15} className="mt-6">
          <div className={`lead max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>{children}</div>
        </Reveal>
      ) : null}
    </div>
  );
}
