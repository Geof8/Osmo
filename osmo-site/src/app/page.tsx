"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import CaptureModal from "@/components/CaptureModal";
import Hero from "@/components/sections/Hero";
import Empathy from "@/components/sections/Empathy";
import HowItWorks from "@/components/sections/HowItWorks";
import Ingredients from "@/components/sections/Ingredients";
import ClosingCTA from "@/components/sections/ClosingCTA";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [source, setSource] = useState("homepage_hero");

  const openModal = (src: string = "homepage_hero") => {
    setSource(src);
    setModalOpen(true);
  };

  return (
    <>
      <Navbar onOpenModal={() => openModal("navbar")} />
      <main>
        <Hero onOpenModal={() => openModal("homepage_hero")} />
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
