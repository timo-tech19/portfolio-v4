"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { WORK_HISTORY } from "@/lib/constants";
import { KineticText } from "@/components/ui/kinetic-text";
import { cn } from "@/lib/utils";

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [reachedIndices, setReachedIndices] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !fillRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate the fill bar height from 0% to 100% as the section scrolls
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 70%",
            scrub: 0.3,
          },
        }
      );

      // Each node lights up when its card enters the viewport
      const cards = sectionRef.current!.querySelectorAll(".journey-card");
      cards.forEach((card, i) => {
        // Card entrance animation
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              setReachedIndices((prev) => new Set(prev).add(i));
            },
            onLeaveBack: () => {
              setReachedIndices((prev) => {
                const next = new Set(prev);
                next.delete(i);
                return next;
              });
            },
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Total items = work entries + "available" node
  const totalItems = WORK_HISTORY.length + 1;

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="chapter relative py-24 px-6"
      aria-label="Work history"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-20 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <span className="font-mono text-xs tracking-widest text-accent uppercase">
              Chapter 04
            </span>
            <div className="h-px w-12 bg-accent" />
          </div>
          <KineticText
            text="The Road"
            as="h2"
            animation="words"
            className="font-display text-3xl font-bold md:text-5xl"
            stagger={0.1}
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical track — always visible, centered */}
          <div
            ref={trackRef}
            className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px"
          />

          {/* Progress fill — grows as you scroll */}
          <div
            ref={fillRef}
            className="absolute left-6 top-0 bottom-0 w-px origin-top bg-accent md:left-1/2 md:-translate-x-px"
            style={{ transform: "scaleY(0)" }}
          />

          {/* Timeline items */}
          <ol className="relative space-y-20">
            {WORK_HISTORY.map((item, i) => {
              const isReached = reachedIndices.has(i);
              const isEven = i % 2 === 0;

              return (
                <li
                  key={item.company}
                  className="journey-card relative pl-16 md:pl-0"
                >
                  {/* Timeline node */}
                  <div
                    ref={(el) => { nodesRef.current[i] = el; }}
                    className={cn(
                      "absolute left-6 top-6 z-10 -translate-x-1/2 transition-all duration-500",
                      "md:left-1/2"
                    )}
                  >
                    {/* Outer ring */}
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500",
                        isReached
                          ? "border-accent bg-background shadow-[0_0_20px_rgba(196,169,125,0.15)]"
                          : "border-border bg-background"
                      )}
                    >
                      {/* Year label */}
                      <span
                        className={cn(
                          "font-mono text-[10px] font-medium transition-colors duration-500",
                          isReached ? "text-accent" : "text-text-muted"
                        )}
                      >
                        {item.period.match(/\d{4}/)?.[0] ?? ""}
                      </span>
                    </div>

                    {/* Pulse ring for current role */}
                    {item.current && isReached && (
                      <div className="absolute inset-0 animate-ping rounded-full border border-accent/20" />
                    )}
                  </div>

                  {/* Content card — alternating sides on desktop */}
                  <div
                    className={cn(
                      "relative md:w-[calc(50%-3rem)]",
                      isEven
                        ? "md:ml-auto md:pl-8"
                        : "md:mr-auto md:pr-8 md:text-right"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-xl border p-6 transition-all duration-500",
                        isReached
                          ? "border-accent/20 bg-surface"
                          : "border-border bg-surface/30"
                      )}
                    >
                      {item.current && (
                        <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-[10px] font-mono tracking-wider text-accent uppercase">
                          Current
                        </span>
                      )}

                      <h3 className="font-display text-xl font-bold">
                        {item.company}
                      </h3>

                      <p
                        className={cn(
                          "mt-1 font-mono text-sm transition-colors duration-500",
                          isReached ? "text-accent" : "text-text-muted"
                        )}
                      >
                        {item.role}
                      </p>

                      <p className="mt-0.5 text-xs text-text-muted">
                        {item.period}
                      </p>

                      <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                        {item.description}
                      </p>

                      {"url" in item && item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "mt-4 inline-flex items-center gap-1.5 font-mono text-xs transition-colors",
                            isReached
                              ? "text-accent hover:text-accent-hover"
                              : "text-text-muted hover:text-text-secondary"
                          )}
                        >
                          Visit site
                          <span className="text-[10px]">&#8599;</span>
                        </a>
                      )}
                    </div>

                    {/* Connector line from node to card (desktop) */}
                    <div
                      className={cn(
                        "absolute top-[1.85rem] hidden h-px w-8 transition-colors duration-500 md:block",
                        isReached ? "bg-accent/40" : "bg-border",
                        isEven ? "left-0" : "right-0"
                      )}
                    />
                  </div>
                </li>
              );
            })}

            {/* "Available for new opportunities" terminal node */}
            <li className="journey-card relative pl-16 md:pl-0">
              {/* Terminal node */}
              <div className="absolute left-6 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:left-1/2">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-500",
                    reachedIndices.has(WORK_HISTORY.length)
                      ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(196,169,125,0.15)]"
                      : "border-border bg-background"
                  )}
                >
                  <span
                    className={cn(
                      "text-lg transition-colors duration-500",
                      reachedIndices.has(WORK_HISTORY.length)
                        ? "text-accent"
                        : "text-text-muted"
                    )}
                  >
                    →
                  </span>
                </div>
              </div>

              <div className="flex justify-center md:justify-center">
                <div
                  className={cn(
                    "rounded-full border px-8 py-3 text-center transition-all duration-500",
                    reachedIndices.has(WORK_HISTORY.length)
                      ? "border-accent/30 bg-accent/5"
                      : "border-border bg-surface/30"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-sm transition-colors duration-500",
                      reachedIndices.has(WORK_HISTORY.length)
                        ? "text-accent"
                        : "text-text-muted"
                    )}
                  >
                    Open to collaborations & side projects
                  </span>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
