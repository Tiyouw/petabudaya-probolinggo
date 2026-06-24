import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PetaBudaya Probolinggo — Jelajah Budaya Probolinggo",
  description:
    "Peta interaktif cagar budaya, warisan budaya tak benda, dan objek pemajuan kebudayaan Kabupaten Probolinggo oleh Dinas Pendidikan dan Kebudayaan.",
  keywords: [
    "PetaBudaya",
    "Probolinggo",
    "Cagar Budaya",
    "WBTB",
    "Warisan Budaya Tak Benda",
    "OPK",
    "Kebudayaan",
    "Jawa Timur",
  ],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "PetaBudaya Probolinggo",
    description: "Jelajah budaya Kabupaten Probolinggo melalui peta interaktif.",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "https://petabudaya-probolinggo.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfairDisplay.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-[#FAF5EE] text-[#1C0F08]">
        {/* Skip to content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#C0392B] focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
        >
          Lewati ke konten utama
        </a>

        <Sidebar />
        <main id="main-content" className="flex-1 pb-16 md:pb-0" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
