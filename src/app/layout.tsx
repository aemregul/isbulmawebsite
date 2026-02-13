import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Kolay İş Buluyorum - İş İlanları Platformu",
    template: "%s | Kolay İş Buluyorum",
  },
  description: "Gençler ile işverenleri buluşturarak istihdamı artıran, yeni nesil iş platformu.",
  keywords: "iş ilanları, kariyer, istihdam, stajyer, part-time, wincoi, iş ara, iş bul",
  authors: [{ name: "Kolay İş Buluyorum" }],
  creator: "Kolay İş Buluyorum",
  metadataBase: new URL("https://isbulmawebsite.vercel.app"),
  openGraph: {
    title: "Kolay İş Buluyorum - İş İlanları Platformu",
    description: "Gençler ile işverenleri buluşturarak istihdamı artıran, yeni nesil iş platformu.",
    type: "website",
    locale: "tr_TR",
    siteName: "Kolay İş Buluyorum",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kolay İş Buluyorum - İş İlanları Platformu",
    description: "Gençler ile işverenleri buluşturarak istihdamı artıran, yeni nesil iş platformu.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
