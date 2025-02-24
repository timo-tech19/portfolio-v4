"use client";

import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col-reverse items-center justify-center space-y-8 py-12 md:flex-row md:justify-between md:space-y-0 md:py-12 lg:py-16">
      <motion.div
        className="flex flex-col items-center text-center md:items-start md:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Fullstack Developer
          <br />
          <span className="text-primary font-light sm:text-4xl md:text-5xl lg:text-6xl">
            Timo Heman
          </span>
        </h1>
        <p className="mt-4 max-w-[42rem] leading-normal text-muted-foreground text-sm sm:text-base md:text-lg">
          A customer-first, product-oriented programmer, building innovative
          solutions for the web and mobile. Let&apos;s create something amazing
          together.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="#projects">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/timo-resume.pdf" download>
              Download My Resume
              <Download className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </motion.div>
      <motion.div
        className="mb-8 md:mb-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Image
          src="/hero.png"
          alt="Timo"
          width={600}
          height={600}
          // className="rounded-full border-4 border-primary"
        />
      </motion.div>
    </section>
  );
}
