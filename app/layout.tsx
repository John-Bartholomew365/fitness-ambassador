import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}