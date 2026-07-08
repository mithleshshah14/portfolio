import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mithlesh Shah — SaaS Founder & Engineer",
  description:
    "Founder of HuntWise AI and VisaHunt — two live SaaS products helping people land jobs worldwide. Built solo, end to end: product, code, and growth.",
  openGraph: {
    title: "Mithlesh Shah — SaaS Founder & Engineer",
    description:
      "Founder of HuntWise AI and VisaHunt — two live SaaS products helping people land jobs worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
