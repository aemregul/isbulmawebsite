import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wincoi - İş İlanları Platformu",
  description: "Gençler ile işverenleri buluşturarak istihdamı artıran, yeni nesil iş platformu.",
  keywords: "iş ilanları, kariyer, istihdam, stajyer, part-time, wincoi",
  openGraph: {
    title: "Wincoi - İş İlanları Platformu",
    description: "Gençler ile işverenleri buluşturarak istihdamı artıran, yeni nesil iş platformu.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
