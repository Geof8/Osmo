"use client";

import { useState, useCallback } from "react";
import Strip from "@/components/Strip";
import Navbar from "@/components/Navbar";
import SplitOverlay from "@/components/SplitOverlay";
import CaptureModal from "@/components/CaptureModal";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/Marquee";
import WhyYouSuffer from "@/components/sections/WhyYouSuffer";
import HowItWorks from "@/components/sections/HowItWorks";
import Formula from "@/components/sections/Formula";
import SocialProof from "@/components/sections/SocialProof";
import FAQ from "@/components/sections/FAQ";
import ClosingCTA from "@/components/sections/ClosingCTA";
import Footer from "@/components/Footer";
import { useWaitlistCount } from "@/hooks/useWaitlistCount";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [source, setSource] = useState("homepage_hero");
  const [heroRevealed, setHeroRevealed] = useState(false);
  const { remaining, soldOut } = useWaitlistCount();

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
      <Navbar onOpenModal={() => openModal("navbar")} remaining={remaining} soldOut={soldOut} />
      <main>
        <Hero onOpenModal={() => openModal("homepage_hero")} revealed={heroRevealed} remaining={remaining} soldOut={soldOut} />
        <Marquee />
        <WhyYouSuffer />
        <Formula />
        <HowItWorks />
        <SocialProof />
        <ClosingCTA onOpenModal={() => openModal("homepage_cta")} remaining={remaining} soldOut={soldOut} />
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
