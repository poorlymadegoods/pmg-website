import type { Metadata } from "next";
import localFont from "next/font/local";
import { Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Grain from "@/components/Grain";
import RevealManager from "@/components/RevealManager";

const stencil = localFont({
  src: "./fonts/HitchRoute-Stencil.otf",
  variable: "--font-stencil",
  display: "swap",
  fallback: ["Arial Narrow", "Impact"],
});

const grotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Poorly Made Goods — Full-grain leather, hand-made in Chicago",
    template: "%s — Poorly Made Goods",
  },
  description:
    "Hand-cut, saddle-stitched, full-grain leather goods made one piece at a time in Chicago. Est. 2016.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="forest"
      className={`${stencil.variable} ${grotesk.variable} ${mono.variable}`}
    >
      <body>
        <RevealManager />
        {children}
        <Grain />
      </body>
    </html>
  );
}
