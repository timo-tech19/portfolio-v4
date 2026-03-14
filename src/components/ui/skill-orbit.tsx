"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { SKILLS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SkillOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const pills = containerRef.current.querySelectorAll(".skill-pill");

    pills.forEach((pill, i) => {
      // Random subtle floating animation
      gsap.to(pill, {
        y: `random(-8, 8)`,
        x: `random(-4, 4)`,
        duration: `random(2, 4)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.1,
      });
    });

    return () => {
      pills.forEach((pill) => gsap.killTweensOf(pill));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap justify-center gap-3"
    >
      {SKILLS.map((skill, i) => (
        <div
          key={skill}
          className="skill-pill rounded-full border border-border px-4 py-2 text-xs font-mono text-text-secondary transition-all duration-300 hover:border-accent hover:text-accent hover:bg-accent-dim"
        >
          {skill}
        </div>
      ))}
    </div>
  );
}
