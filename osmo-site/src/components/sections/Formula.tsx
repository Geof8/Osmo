"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/ui/FadeUp";
import IngredientCard from "@/components/ui/IngredientCard";
import MolecularAnimation from "@/components/ui/MolecularAnimation";
import { useInView } from "@/hooks/useInView";
import { FONTS, INGREDIENTS, STAMPS } from "@/lib/constants";

export default function Formula() {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <section
      id="formule"
      className="scroll-mt-20 relative z-[5]"
      style={{ background: "#111111", padding: "clamp(40px, 7vw, 48px) 0 clamp(56px, 9vw, 80px)" }}
    >
      <div ref={ref} className="max-w-[1380px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
          <div
            className="mb-2"
            style={{
              fontFamily: FONTS.mono,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#AAAAAA",
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
            className="mt-5"
            style={{ fontSize: "clamp(14px, 3.4vw, 15px)", lineHeight: 1.65, color: "#AAAAAA", maxWidth: 380 }}
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

        <div className="mt-10 sm:mt-14 lg:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {INGREDIENTS.map((a, i) => (
              <IngredientCard key={a.name} a={a} index={i} />
            ))}
          </div>

          <FadeUp delay={0.3}>
            <div
              className="mt-5 lg:mt-6 pt-4 flex justify-between gap-8 flex-wrap items-center"
              style={{ borderTop: "1px solid #333333" }}
            >
              <div
                className="flex gap-5 sm:gap-7 flex-wrap"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                }}
              >
                {STAMPS.map((s) => (
                  <span key={s} className="inline-flex items-center gap-2">
                    <span className="w-[6px] h-[6px] bg-[#C8963E] rounded-full" aria-hidden="true" />
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
