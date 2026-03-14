"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Download, Send } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PERSONAL } from "@/lib/constants";
import { KineticText } from "@/components/ui/kinetic-text";
import { MagneticButton } from "@/components/ui/magnetic-button";

// Lazy load the 3D scene — no SSR
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at center, #111113 0%, #09090b 70%)",
      }}
    />
  ),
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Fade out content on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(contentRef.current, {
      opacity: 0,
      y: -100,
      scale: 0.95,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="chapter relative flex items-center justify-center"
      aria-label="Introduction"
    >
      {/* 3D Background */}
      <HeroScene />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.div
          className="mb-6 flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <div className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs tracking-widest text-accent uppercase">
            {PERSONAL.role}
          </span>
          <div className="h-px w-8 bg-accent" />
        </motion.div>

        {/* Main headline */}
        <KineticText
          text={PERSONAL.tagline}
          as="h1"
          animation="words"
          center
          className="font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl"
          delay={2}
          stagger={0.08}
        />

        {/* Name */}
        <motion.p
          className="mt-6 font-mono text-lg text-text-secondary md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          {PERSONAL.name}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          className="mt-2 max-w-md text-sm text-text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8 }}
        >
          {PERSONAL.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
        >
          <MagneticButton
            variant="primary"
            onClick={() => {
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Send size={16} />
            Start a conversation
          </MagneticButton>

          <MagneticButton variant="outline" href={PERSONAL.resumeUrl}>
            <Download size={16} />
            Resume
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
      >
        <span className="text-xs text-text-muted">Begin the story</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
