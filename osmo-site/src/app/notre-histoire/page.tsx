"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Strip from "@/components/Strip";
import CaptureModal from "@/components/CaptureModal";
import FadeUp from "@/components/FadeUp";
import CountUp from "@/components/CountUp";
import { FONTS } from "@/lib/constants";
import { useInView } from "@/hooks/useInView";

function WordByWord({ text }: { text: string }) {
  const [ref, isInView] = useInView<HTMLParagraphElement>({ margin: "-60px" });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="text-center"
      style={{
        fontFamily: FONTS.display,
        fontWeight: 900,
        fontSize: "clamp(28px, 5vw, 48px)",
        letterSpacing: "-0.03em",
        lineHeight: 1.1,
        color: "var(--amber)",
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{
            duration: 0.35,
            delay: i * 0.08,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export default function NotreHistoire() {
  const [modalOpen, setModalOpen] = useState(false);
  const [source, setSource] = useState("notre_histoire");

  const openModal = (src: string = "notre_histoire") => {
    setSource(src);
    setModalOpen(true);
  };

  return (
    <>
      <Strip />
      <Navbar onOpenModal={() => openModal("navbar")} />
      <main>
        {/* Hero */}
        <section
          className="bg-[var(--paper)]"
          style={{ padding: "clamp(80px, 12vw, 160px) 0 clamp(30px, 4vw, 50px)" }}
        >
          <div className="max-w-[760px] mx-auto px-5 sm:px-10">
            <FadeUp>
              <h1
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 900,
                  fontSize: "clamp(42px, 7vw, 72px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                Pourquoi OSMO existe.
              </h1>
            </FadeUp>
            <FadeUp delay={0.15}>
              <p
                className="mt-8"
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 600,
                  fontStyle: "italic",
                  fontSize: "clamp(18px, 2.5vw, 24px)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                  color: "var(--amber)",
                }}
              >
                Janvier 2025. La marque d&apos;électrolytes que j&apos;utilisais
                tombe en rupture de stock. Une question s&apos;impose :
                pourquoi personne ne fait ça sérieusement ?
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Section 1 — Le problème */}
        <section className="bg-[var(--paper)]" style={{ padding: "clamp(60px, 8vw, 100px) 0" }}>
          <div className="max-w-[760px] mx-auto px-5 sm:px-10">
            <FadeUp>
              <span
                className="block mb-4 text-[var(--ink-2)]"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                01 — Le problème
              </span>
              <p
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 500,
                  fontSize: "clamp(20px, 3vw, 28px)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                }}
              >
                Le Doliprane abime le foie. Les électrolytes
                du commerce sont sous-dosés, trop sucrés, pensés
                pour le sport. Rien n&apos;était conçu pour quelqu&apos;un
                qui boit socialement et doit assurer le lendemain.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Section 2 — La recherche */}
        <section
          className="bg-[var(--paper-2)]"
          style={{ padding: "clamp(60px, 8vw, 100px) 0" }}
        >
          <div className="max-w-[760px] mx-auto px-5 sm:px-10">
            <FadeUp>
              <span
                className="block mb-4 text-[var(--ink-2)]"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                02 — La recherche
              </span>
              <p
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 500,
                  fontSize: "clamp(20px, 3vw, 28px)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                }}
              >
                Un an et demi d&apos;études scientifiques, d&apos;avis médicaux,
                de tests. J&apos;ai compris le rôle de chaque sel minéral —
                sodium, potassium, magnésium — ces composants de base
                du corps humain qu&apos;on néglige et qui sont pourtant
                à la base de tout. C&apos;est aussi comme ça que j&apos;ai découvert
                la NAC, un acide aminé méconnu du grand public mais utilisé
                en milieu hospitalier pour les crises hépatiques.
                Discret. Puissant. On l&apos;a intégré à la formule.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Section 3 — 29 versions */}
        <section className="bg-[var(--paper)]" style={{ padding: "clamp(60px, 8vw, 100px) 0" }}>
          <div className="max-w-[760px] mx-auto px-5 sm:px-10">
            <FadeUp>
              <span
                className="block mb-4 text-[var(--ink-2)]"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                03 — 29 versions
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 900,
                  fontSize: "clamp(100px, 18vw, 200px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "var(--amber)",
                }}
              >
                <CountUp target={29} duration={1.5} />
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p
                className="mt-6"
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 500,
                  fontSize: "clamp(20px, 3vw, 28px)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                }}
              >
                Gélules d&apos;abord, puis poudre. Dosages ajustés,
                goût reformulé. Testé sur moi d&apos;abord, puis sur
                la famille, des amis, des collègues.
                Le retour le plus fréquent :
                &laquo;&nbsp;Dès que c&apos;est dispo, tu m&apos;en mets de côté.&nbsp;&raquo;
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Section 4 — Aujourd'hui */}
        <section
          className="bg-[var(--paper-2)]"
          style={{ padding: "clamp(60px, 8vw, 100px) 0" }}
        >
          <div className="max-w-[760px] mx-auto px-5 sm:px-10">
            <FadeUp>
              <span
                className="block mb-4 text-[var(--ink-2)]"
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                04 — Aujourd&apos;hui
              </span>
              <p
                style={{
                  fontFamily: FONTS.display,
                  fontWeight: 500,
                  fontSize: "clamp(20px, 3vw, 28px)",
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                }}
              >
                500 places fondateurs. Le stock sera commandé
                quand la demande sera confirmée — pas avant.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Closing */}
        <section
          className="bg-[var(--paper)]"
          style={{ padding: "clamp(80px, 12vw, 140px) 0 clamp(60px, 8vw, 100px)" }}
        >
          <div className="max-w-[760px] mx-auto px-5 sm:px-10">
            <WordByWord text="Si tu lis ça, tu fais peut-être partie des 500." />

            <FadeUp delay={0.6}>
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => openModal("notre_histoire_cta")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 min-h-[52px] bg-[var(--amber)] text-white border border-[var(--amber)] hover:bg-[var(--ink)] hover:border-[var(--ink)] transition-colors duration-200 active:scale-[0.97]"
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Réserver mon accès prioritaire
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
      <CaptureModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        source={source}
      />
    </>
  );
}
