import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import MouseMoveEffect from "@/components/mouse-move-effect";
import LoadingScreen from "@/components/loading-screen";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Timo Heman | Fullstack Developer",
  description: "Showcase of my skill, experience and projects",
  metadataBase: new URL("https://timotech.vercel.app"),
  openGraph: {
    type: "website",
    images: ["og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "timotech.vercel.app",
    creator: "@timo__tech",
    title: "Timo Heman | Fullstack Developer",
    description: "Showcase of my skill, experience and projects",
    images: ["og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
      >
        <LoadingScreen />
        <MouseMoveEffect />
        <Navbar />
        <main>{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
