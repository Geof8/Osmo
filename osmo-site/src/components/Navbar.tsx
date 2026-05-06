"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-osmo-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-0.5">
          <span className="font-display text-2xl font-black tracking-tighter text-osmo-text">
            Osm
          </span>
          <span className="relative font-display text-2xl font-black tracking-tighter text-osmo-text">
            <span className="absolute -top-1.5 left-[0.15em] w-1.5 h-1.5 rounded-full bg-osmo-accent" />
            o
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-body font-medium text-osmo-muted">
          <Link
            href="/produit"
            className="hover:text-osmo-text transition-colors"
          >
            Produit
          </Link>
          <Link href="/faq" className="hover:text-osmo-text transition-colors">
            FAQ
          </Link>
        </div>

        <button
          onClick={onOpenModal}
          className="bg-osmo-accent hover:bg-osmo-accent-hover text-white text-sm font-medium px-5 py-2.5 transition-colors"
        >
          Pré-commander — 25€
        </button>
      </div>
    </motion.nav>
  );
}
