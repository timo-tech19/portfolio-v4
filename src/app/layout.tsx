import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://timotech.dev"),
  title: "Timo Heman | Fullstack Developer & Product Thinker",
  description:
    "Fullstack developer who builds software that starts with people. React, Next.js, TypeScript, Node.js. Shipping products across three continents, remotely.",
  keywords: [
    "fullstack developer",
    "web developer",
    "react developer",
    "next.js developer",
    "typescript",
    "node.js",
    "portfolio",
  ],
  authors: [{ name: "Timo Heman" }],
  creator: "Timo Heman",
  openGraph: {
    type: "website",
    title: "Timo Heman | Fullstack Developer & Product Thinker",
    description:
      "Fullstack developer who builds software that starts with people. React, Next.js, TypeScript.",
    siteName: "timotech.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timo Heman | Fullstack Developer & Product Thinker",
    description:
      "Fullstack developer who builds software that starts with people. React, Next.js, TypeScript.",
    creator: "@timo__tech",
    images: ["/og-image.png"],
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
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <GrainOverlay />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
