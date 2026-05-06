"use client";

import { useState, useCallback } from "react";
import Strip from "@/components/Strip";
import Navbar from "@/components/Navbar";
import SplitOverlay from "@/components/SplitOverlay";
import CaptureModal from "@/components/CaptureModal";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/Marquee";
import Empathy from "@/components/sections/Empathy";
import HowItWorks from "@/components/sections/HowItWorks";
import Ingredients from "@/components/sections/Ingredients";
import ClosingCTA from "@/components/sections/ClosingCTA";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [source, setSource] = useState("homepage_hero");
  const [heroRevealed, setHeroRevealed] = useState(false);

  const openModal = (src: string = "homepage_hero") => {
    setSource(src);
    setModalOpen(true);
  };

  const handleOverlayComplete = useCallback(() => {
    setHeroRevealed(true);
  }, []);

  return (
    <>
      <SplitOverlay onComplete={handleOverlayComplete} />
      <Strip />
      <Navbar onOpenModal={() => openModal("navbar")} />
      <main>
        <Hero onOpenModal={() => openModal("homepage_hero")} revealed={heroRevealed} />
        <Marquee />
        <Empathy />
        <HowItWorks />
        <Ingredients />
        <ClosingCTA onOpenModal={() => openModal("homepage_cta")} />
        <FAQ />
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
