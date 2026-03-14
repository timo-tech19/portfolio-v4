"use client";

import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SERVICES } from "@/lib/constants";
import { KineticText } from "@/components/ui/kinetic-text";
import { cn } from "@/lib/utils";

const ServiceShape = dynamic(
  () => import("@/components/three/service-shape"),
  { ssr: false }
);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        sectionRef.current!.querySelectorAll(".service-card")
      );

      // Set all cards to hidden initially
      gsap.set(cards, { opacity: 0, y: 40 });

      // Single timeline scrubbed by the pin ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${SERVICES.length * 80}vh`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * SERVICES.length),
              SERVICES.length - 1
            );
            setActiveIndex(index);
          },
        },
      });

      // Each card animates in sequentially within the timeline
      // Cards appear and stay visible — they don't disappear
      cards.forEach((card, i) => {
        // Animate card in
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          i * 2 // position in timeline — evenly spaced
        );

        // Hold visible (dwell time before next card)
        if (i < cards.length - 1) {
          tl.to({}, { duration: 1 }, `>` ); // spacer
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="chapter relative min-h-screen"
      aria-label="Services"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 md:h-screen md:flex-row md:gap-16 md:py-0">
        {/* Left: 3D Shape (desktop only) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          {!isMobile && (
            <div className="h-[400px] w-[400px]">
              <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.5} />
                <ServiceShape activeIndex={activeIndex} />
              </Canvas>
            </div>
          )}
        </div>

        {/* Right: Service cards */}
        <div className="flex w-full flex-col gap-6 md:w-1/2">
          <div className="mb-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-12 bg-accent" />
              <span className="font-mono text-xs tracking-widest text-accent uppercase">
                Chapter 03
              </span>
            </div>
            <KineticText
              text="The Craft"
              as="h2"
              animation="words"
              className="font-display text-3xl font-bold md:text-5xl"
              stagger={0.1}
            />
          </div>

          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={cn(
                  "service-card group rounded-xl border p-6 transition-colors duration-500",
                  activeIndex === i
                    ? "border-accent/40 bg-surface shadow-[0_0_30px_rgba(196,169,125,0.05)]"
                    : "border-border bg-transparent"
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                      activeIndex === i
                        ? "bg-accent/10 text-accent"
                        : "bg-surface text-text-muted"
                    )}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.techs.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-mono text-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
