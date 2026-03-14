"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PROJECTS } from "@/lib/constants";
import { KineticText } from "@/components/ui/kinetic-text";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
}: {
  project: (typeof PROJECTS)[number];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      className="project-card flex h-full w-full flex-col items-center justify-center gap-6 md:min-w-[60vw] md:flex-row md:gap-12 md:px-8 lg:min-w-[50vw]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Project image with tilt */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-border md:w-1/2"
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <div className="relative aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 50vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
      </div>

      {/* Project info */}
      <div className="w-full md:w-1/2">
        {project.featured && (
          <span className="mb-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-mono text-accent">
            Featured
          </span>
        )}

        <h3 className="font-display text-2xl font-bold md:text-3xl">
          {project.title}
        </h3>

        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-[11px] font-mono text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent/80"
            >
              <ExternalLink size={14} />
              Live site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              <Github size={14} />
              Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const container = scrollContainerRef.current!;

      // Use a function for end so it recalculates on refresh
      const getScrollDistance = () =>
        container.scrollWidth - window.innerWidth;

      const tween = gsap.to(container, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 0.3, // faster scrub for snappier reverse
          anticipatePin: 1,
          invalidateOnRefresh: true, // recalculate x on resize
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="chapter relative overflow-hidden"
      aria-label="Projects"
    >
      {/* Header */}
      <div className="relative px-6 pt-24 md:absolute md:top-12 md:left-12 md:z-10 md:px-0 md:pt-0">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-12 bg-accent" />
          <span className="font-mono text-xs tracking-widest text-accent uppercase">
            Chapter 05
          </span>
        </div>
        <KineticText
          text="The Work"
          as="h2"
          animation="words"
          className="font-display text-3xl font-bold md:text-5xl"
          stagger={0.1}
        />
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollContainerRef}
        className="flex min-h-0 flex-col gap-12 px-6 pb-24 pt-8 md:h-screen md:flex-row md:flex-nowrap md:items-center md:gap-0 md:px-0 md:pb-0 md:pt-0"
      >
        {/* Spacer for header on desktop */}
        <div className="hidden min-w-[30vw] md:block" />

        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}

        {/* End spacer */}
        <div className="hidden min-w-[10vw] md:block" />
      </div>
    </section>
  );
}
