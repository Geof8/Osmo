"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/ui/FadeUp";
import IngredientCard from "@/components/ui/IngredientCard";
import MobileCardCarousel from "@/components/ui/MobileCardCarousel";
import MolecularAnimation from "@/components/ui/MolecularAnimation";
import { useInView } from "@/hooks/useInView";
import { FONTS, INGREDIENTS, STAMPS } from "@/lib/constants";

export default function Formula() {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <section
      id="formule"
      className="scroll-mt-20 relative z-[5]"
      style={{ background: "#111111", padding: "clamp(56px, 9vw, 100px) 0" }}
    >
      <div ref={ref} className="max-w-[1180px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <div
            className="mb-3"
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#999999",
            }}
          >
            La formule
          </div>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontWeight: 800,
              fontSize: "clamp(28px, 7vw, 72px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
          >
            {["Cinq", "actifs."].map((word, i) => (
              <motion.span
                key={i}
                style={{ display: "inline-block", marginRight: i === 0 ? "0.3em" : 0 }}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            {["Une", "équation."].map((word, i) => (
              <motion.span
                key={i + 2}
                style={{ display: "inline-block", marginRight: i === 0 ? "0.3em" : 0 }}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            className="mt-8"
            style={{
              fontFamily: FONTS.body,
              fontSize: "clamp(14px, 3.4vw, 16px)",
              lineHeight: 1.65,
              color: "#AAAAAA",
              maxWidth: 380,
              fontWeight: 400,
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Chaque ingr&eacute;dient a &eacute;t&eacute; s&eacute;lectionn&eacute; pour un r&ocirc;le pr&eacute;cis.
            <br />
            Rien de superflu. Tout est dos&eacute;.
          </motion.p>
          </div>

          <div className="hidden lg:flex justify-center">
            <MolecularAnimation />
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-14">
          {/* Mobile: Framer Motion swipe carousel — amber kept on active dot (per spec) */}
          <MobileCardCarousel
            items={INGREDIENTS}
            renderItem={(a, i) => <IngredientCard a={a} index={i} />}
            getKey={(a) => a.name}
            ariaLabel="Cinq actifs — fiches ingrédients"
            dotColor="#C8963E"
            dotInactiveColor="#2A2A2A"
          />

          {/* Tablet / Desktop: grid (unchanged at md and lg) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INGREDIENTS.map((a, i) => (
              <IngredientCard key={a.name} a={a} index={i} />
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div
              className="mt-8 lg:mt-10 pt-6 flex justify-between gap-8 flex-wrap items-center"
              style={{ borderTop: "1px solid #2A2A2A" }}
            >
              <div
                className="flex gap-5 sm:gap-7 flex-wrap"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                }}
              >
                {STAMPS.map((s) => (
                  <span key={s} className="inline-flex items-center gap-2">
                    <span className="w-[5px] h-[5px] bg-white rounded-full" aria-hidden="true" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
