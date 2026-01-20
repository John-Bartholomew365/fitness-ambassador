// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartProviderWrapper from "../components/loaders/CartProviderWrapper";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

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
  description:
    "Explore the official fitness portfolio of Ajisafe Sulaiman — The Fitness Ambassador. Featuring Walk2Fitness events, Jam2Fit, Afro Groove, Aerobics + Icebath, professional fitness training, FA gym wears, and Workout Compass — a practical fitness guide for transforming your body with clarity and confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* ✅ Add Head here for global favicon */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProviderWrapper>
          {children}
          {/* ✅ Global Toaster Component */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#363636',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                padding: '16px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              },
              success: {
                style: {
                  background: '#f0fdf4',
                  color: '#166534',
                  border: '1px solid #bbf7d0',
                },
                iconTheme: {
                  primary: '#16a34a',
                  secondary: '#fff',
                },
              },
              error: {
                style: {
                  background: '#fef2f2',
                  color: '#991b1b',
                  border: '1px solid #fecaca',
                },
                iconTheme: {
                  primary: '#dc2626',
                  secondary: '#fff',
                },
              },
              loading: {
                style: {
                  background: '#f8fafc',
                  color: '#475569',
                  border: '1px solid #e2e8f0',
                },
              },
            }}
          />
        </CartProviderWrapper>
      </body>
    </html>
  );
}