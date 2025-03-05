import type { Metadata } from "next";
import { Inter, Sigmar_One, Quicksand } from "next/font/google";
import "./globals.css";
import { NameProvider } from "@/context/nameContext";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from 'react'

const inter = Inter({
  variable: "--font-inter",
  subsets: ['latin']
})

const sigmarOne = Sigmar_One({
  weight: "400",
  variable: "--font-sigmar-one",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "NFQ WOMEN'S DAY",
  description: "NFQ Women's Day",
  openGraph: {
    title: "NFQ WOMEN'S DAY",
    description: "NFQ Women's Day",
    images: [
      {
        url: "/img/preview.png",
        alt: "Preview image",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
  return (
    <html lang="en" className="no-scrollbar">
      <body className={`${inter.className} ${sigmarOne.variable} ${quicksand.variable} ${inter.variable} antialiased w-full h-full`}>
      <main className="relative w-full h-full">
        <div className="corner corner-top-left"></div>
        <div className="corner corner-top-right"></div>
        <div className="corner corner-bottom-right"></div>
        <div className="corner corner-bottom-left"></div>
        <NameProvider>{children}</NameProvider>
        <Toaster />
      </main>
      </body>
    </html>
  );
}
