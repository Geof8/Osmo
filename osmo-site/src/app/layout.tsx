import type { Metadata } from "next";
import { Barlow_Condensed, Inter, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
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
    "Complexe d'électrolytes formulé pour récupérer vite après une soirée alcoolisée, une semaine chargée, ou les deux. Pré-commandez au tarif fondateur.",
  openGraph: {
    title: "OSMO Recovery — Le lendemain matin, tu assures.",
    description:
      "Complexe d'électrolytes formulé pour récupérer vite après une soirée alcoolisée. Tarif fondateur : 15€.",
    url: "https://osmolab.fr",
    siteName: "OSMO Lab",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${barlowCondensed.variable} ${inter.variable} ${ibmPlexMono.variable} ${playfairDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
