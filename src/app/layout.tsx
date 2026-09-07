import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/landing/header";
import Footer from "./components/landing/footer";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jos TechFest 2026 — AI x Industry: Automating the Future of Work",
  description:
    "Join Africa's most energetic tech event. Two days of keynotes, workshops, networking, and hands-on sessions in Jos, Plateau State — 26 November 2026.",
  openGraph: {
    title: "Jos TechFest 2026",
    description: "AI x Industry: Automating the Future of Work",
    siteName: "Jos TechFest",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-[var(--font-inter)] bg-slate-950 text-slate-400 antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
