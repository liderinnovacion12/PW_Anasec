import { About } from "@/components/sections/about";
import { Explore } from "@/components/sections/explore";
import { FiguresStrip } from "@/components/sections/figures-strip";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";

/** Portada: solo lo esencial. El resto vive en sus propias páginas. */
export default function Home() {
  return (
    <>
      <Hero />
      <FiguresStrip />
      <About />
      <Explore />
      <FinalCta />
    </>
  );
}
