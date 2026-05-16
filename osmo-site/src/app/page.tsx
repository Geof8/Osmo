"use client";

import { useState, useCallback } from "react";
import Strip from "@/components/Strip";
import Navbar from "@/components/Navbar";
import SplitOverlay from "@/components/SplitOverlay";
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
  const [heroRevealed, setHeroRevealed] = useState(false);
  const { remaining, soldOut } = useWaitlistCount();

  const handleOverlayComplete = useCallback(() => {
    setHeroRevealed(true);
  }, []);

  return (
    <>
      <SplitOverlay onComplete={handleOverlayComplete} />
      <Strip />
      <Navbar remaining={remaining} soldOut={soldOut} />
      <main>
        <Hero revealed={heroRevealed} remaining={remaining} soldOut={soldOut} />
        <Marquee />
        <WhyYouSuffer />
        <Formula />
        <HowItWorks />
        <SocialProof />
        <ClosingCTA remaining={remaining} soldOut={soldOut} />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
