"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const technologies = [
  { name: "JavaScript", logo: "/javascript-logo.svg" },
  { name: "TypeScript", logo: "/typescript-logo.svg" },
  { name: "Python", logo: "/python-logo.svg" },
  { name: "Golang", logo: "/go-logo.svg" },
  { name: "React", logo: "/react-logo.svg" },
  { name: "Native", logo: "/react-native-logo.svg" },
  { name: "Next.js", logo: "/nextjs-logo.svg" },
  { name: "TailwindCSS", logo: "/tailwind-logo.svg" },
  { name: "Node.js", logo: "/nodejs-logo.svg" },
  { name: "Express.js", logo: "/express-logo.svg" },
  { name: "Nest.js", logo: "/nestjs-logo.svg" },
  { name: "Django", logo: "/django-logo.svg" },
  { name: "MongoDB", logo: "/mongodb-logo.svg" },
  { name: "PostgreSQL", logo: "/postgresql-logo.svg" },
  { name: "Firebase", logo: "/firebase-logo.svg" },
  { name: "Supabase", logo: "/supabase-logo.svg" },
  { name: "Prisma", logo: "/prisma-logo.svg" },
  { name: "Docker", logo: "/docker-logo.svg" },
];

export default function TechMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState(30);

  useEffect(() => {
    const updateAnimationDuration = () => {
      if (marqueeRef.current) {
        const marqueeWidth = marqueeRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const duration = (marqueeWidth / viewportWidth) * 10; // Adjust the multiplier for speed
        setAnimationDuration(duration);
      }
    };

    updateAnimationDuration();
    window.addEventListener("resize", updateAnimationDuration);

    return () => {
      window.removeEventListener("resize", updateAnimationDuration);
    };
  }, []);

  return (
    <div className="bg-muted/50 py-8 overflow-hidden">
      <div
        ref={marqueeRef}
        className="flex animate-marquee"
        style={{ animationDuration: `${animationDuration}s` }}
      >
        {technologies.concat(technologies).map((tech, index) => (
          <div key={index} className="flex items-center mx-4 sm:mx-8 shrink-0">
            <Image
              src={tech.logo || "/placeholder.svg"}
              alt={tech.name}
              width={32}
              height={32}
              className="sm:w-10 sm:h-10"
            />
            <span className="ml-2 text-xs sm:text-sm font-medium whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
