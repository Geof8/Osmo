import type { Metadata } from "next";
import { Barlow, DM_Sans } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OSMO Recovery — Le lendemain matin, tu assures.",
  description:
    "Complexe d'électrolytes formulé pour récupérer vite après une soirée alcoolisée, une semaine chargée, ou les deux. Pré-commandez au tarif fondateur.",
  openGraph: {
    title: "OSMO Recovery — Le lendemain matin, tu assures.",
    description:
      "Complexe d'électrolytes formulé pour récupérer vite après une soirée alcoolisée. Tarif fondateur : 25€.",
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
    <html lang="fr" className={`${barlow.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
