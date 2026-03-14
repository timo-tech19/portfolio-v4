"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PERSONAL } from "@/lib/constants";
import { RevealText } from "@/components/ui/reveal-text";
import { SkillOrbit } from "@/components/ui/skill-orbit";
import { KineticText } from "@/components/ui/kinetic-text";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !panelsRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Only do horizontal scroll on larger screens
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const panels = panelsRef.current!;
      const totalWidth = panels.scrollWidth - window.innerWidth;

      gsap.to(panels, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="chapter relative overflow-hidden"
      aria-label="About me"
    >
      {/* Desktop: Horizontal scroll panels */}
      <div
        ref={panelsRef}
        className="flex min-h-0 flex-col gap-16 px-6 py-24 md:h-screen md:flex-row md:flex-nowrap md:items-center md:gap-0 md:py-0"
      >
        {/* Panel 1: Photo + Bio */}
        <div className="flex min-w-full flex-col items-center justify-center md:min-w-[100vw] md:px-16 lg:px-24">
          <div className="flex max-w-5xl flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
            {/* Portrait */}
            <div className="shrink-0">
              <div className="relative">
                {/* Decorative border */}
                <div className="absolute -inset-3 rounded-2xl border border-accent/20" />
                {/* Accent corner marks */}
                <div className="absolute -top-3 -left-3 h-6 w-6 border-t-2 border-l-2 border-accent rounded-tl-lg" />
                <div className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-accent rounded-br-lg" />

                <div className="relative h-[280px] w-[220px] overflow-hidden rounded-xl md:h-[360px] md:w-[280px]">
                  <Image
                    src="/hero.png"
                    alt="Timo Heman"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 220px, 280px"
                    priority
                  />
                  {/* Subtle overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* Bio content */}
            <div className="max-w-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-12 bg-accent" />
                <span className="font-mono text-xs tracking-widest text-accent uppercase">
                  Chapter 02
                </span>
              </div>

              <KineticText
                text="The Builder"
                as="h2"
                animation="words"
                className="font-display text-4xl font-bold md:text-6xl"
                stagger={0.1}
              />

              <div className="mt-8 space-y-4">
                {PERSONAL.bio.map((paragraph, i) => (
                  <RevealText key={i} delay={i * 0.15}>
                    <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                      {paragraph}
                    </p>
                  </RevealText>
                ))}
              </div>

              {/* Stats */}
              <RevealText delay={0.4}>
                <div className="mt-10 flex gap-10 md:gap-12">
                  <div>
                    <span className="font-display text-3xl font-bold text-accent">
                      {PERSONAL.yearsExperience}+
                    </span>
                    <p className="mt-1 text-xs text-text-muted uppercase tracking-wider">
                      Years Building
                    </p>
                  </div>
                  <div>
                    <span className="font-display text-3xl font-bold text-accent">
                      3
                    </span>
                    <p className="mt-1 text-xs text-text-muted uppercase tracking-wider">
                      Continents
                    </p>
                  </div>
                  <div>
                    <span className="font-display text-3xl font-bold text-accent">
                      0→1
                    </span>
                    <p className="mt-1 text-xs text-text-muted uppercase tracking-wider">
                      Products Co-founded
                    </p>
                  </div>
                </div>
              </RevealText>
            </div>
          </div>
        </div>

        {/* Panel 2: Skills */}
        <div className="flex min-w-full flex-col items-center justify-center md:min-w-[100vw] md:px-24">
          <div className="max-w-3xl">
            <div className="mb-8 text-center">
              <span className="font-mono text-xs tracking-widest text-accent uppercase">
                Tech Stack
              </span>
              <h3 className="font-display mt-2 text-2xl font-bold md:text-3xl">
                Tools I reach for
              </h3>
            </div>

            <SkillOrbit />

            <p className="mt-8 text-center text-sm text-text-muted max-w-md mx-auto">
              I pick the right tool for the job, not the trendiest one. The best
              stack is the one your users never have to think about.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
