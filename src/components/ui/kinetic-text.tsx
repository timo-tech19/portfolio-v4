"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface KineticTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  animation?: "chars" | "words" | "lines";
  stagger?: number;
  delay?: number;
  scrub?: boolean;
  triggerStart?: string;
  center?: boolean;
}

export function KineticText({
  text,
  className,
  as: Tag = "h1",
  animation = "chars",
  stagger = 0.03,
  delay = 0,
  scrub = false,
  triggerStart = "top 80%",
  center = false,
}: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const elements = container.querySelectorAll(".kinetic-unit");

    const tl = gsap.timeline({
      scrollTrigger: scrub
        ? {
            trigger: container,
            start: triggerStart,
            end: "bottom 20%",
            scrub: 1,
          }
        : {
            trigger: container,
            start: triggerStart,
            toggleActions: "play none none reverse",
          },
      delay,
    });

    tl.from(elements, {
      y: 60,
      opacity: 0,
      rotateX: -90,
      stagger,
      duration: 0.8,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, [text, stagger, delay, scrub, triggerStart]);

  // Split text into units
  const units =
    animation === "chars"
      ? text.split("").map((char, i) => (
          <span
            key={i}
            className="kinetic-unit inline-block"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))
      : animation === "words"
      ? text.split(" ").map((word, i, arr) => (
          <span key={i} className="kinetic-unit inline-block">
            {word}{i < arr.length - 1 ? "\u00A0" : ""}
          </span>
        ))
      : [
          <span key={0} className="kinetic-unit inline-block">
            {text}
          </span>,
        ];

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <Tag
        className={cn("flex flex-wrap", center && "justify-center")}
        style={{ perspective: "1000px" }}
      >
        {units}
      </Tag>
    </div>
  );
}
