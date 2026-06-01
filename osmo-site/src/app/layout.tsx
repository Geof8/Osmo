import type { Metadata } from "next";
import { Fraunces, DM_Sans, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import Providers from "./Providers";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OSMO Recovery — Le lendemain matin, tu assures.",
  description:
    "Complexe d'électrolytes formulé pour récupérer vite après une soirée alcoolisée, une semaine chargée, ou les deux. Pré-commandez au tarif Early Adopter.",
  openGraph: {
    title: "OSMO Recovery — Le lendemain matin, tu assures.",
    description:
      "Complexe d'électrolytes formulé pour récupérer vite après une soirée alcoolisée. Tarif Early Adopter : 25€.",
    url: "https://osmolab.fr",
    siteName: "OSMO Lab",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${dmSans.variable} ${ibmPlexMono.variable} ${playfairDisplay.variable}`}
    >
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
