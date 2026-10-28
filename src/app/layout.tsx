import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./book.css";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["opsz"] }); // variable: covers 500 + 700
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500", "600"] });

const title = "Mithlesh Shah · Founder, Phantom Grace Technologies";
const description =
  "Founder of Phantom Grace Technologies (Gwalior): VisaHunt, HuntwiseAI, Ashviora and Silent Arc Studios, after eight years of backend engineering. Backend training for engineering teams.";

export const metadata: Metadata = {
  metadataBase: new URL("https://mithleshshah.com"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, type: "profile", url: "/", images: [{ url: "/book/og-cover.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/book/og-cover.jpg"] },
};

export const viewport: Viewport = { themeColor: "#f1e8d6" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // Font variables on <html>: book.css reads them in :root.
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
