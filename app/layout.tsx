import type { Metadata } from "next";
import { Inter, Bebas_Neue, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AppWrapper from "@/components/layout/AppWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "The Fitness Ambassador | Events, Training, Gym Wears & Workout Compass Book",
  description: "Explore the official fitness portfolio of Ajisafe Sulaiman — The Fitness Ambassador. Featuring Walk2Fitness events, Jam2Fit, Afro Groove, Aerobics + Icebath, professional fitness training, FA gym wears, and Workout Compass — a practical fitness guide for transforming your body with clarity and confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${inter.variable}
          ${bebasNeue.variable}
          ${poppins.variable}
          font-sans
          antialiased
          bg-background
          text-foreground
          min-h-screen
        `}
      >
        {/* Navbar is ALWAYS visible, outside AppWrapper */}
        <Navbar />

        {/* Only page content goes inside AppWrapper */}
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}