"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Check, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    title: "Note Taking App",
    description:
      "An application for managing and sharing your notes and ideas.",
    image: "/jotion.png",
    features: [
      "Email/Password, Google, Github authentication with Clerk",
      "Create and edit with modern block editor",
      "Publish notes and share with others",
      "Create child note pages with notes",
    ],
    techStack: ["TypeScript", "React", "Next.js", "Convex", "ShadCN UI"],
    githubUrl: "https://github.com/timo-tech19/jotion",
  },
  {
    title: "School Management App",
    description: "App for managing common school operations",
    image: "/school-management.png",
    features: [
      "User authentication with Clerk",
      "Data visualization with Recharts",
      "Manage students, teachers, classes, subjects, events, results, assignments etc.",
    ],
    techStack: [
      "TypeScript",
      "React",
      "Next.js",
      "Prisma",
      "Clerk",
      "Cloudinary",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/timo-tech19/next-dashboard-ui",
  },
  {
    title: "Social Media App (Share Me)",
    description: "Social media application for sharing photos with the world",
    image: "/share-me.png",
    features: [
      "Google OAuth authentication",
      "Masonary layout for pins (image posts)",
      "Content management with Sanity.io",
      "CRUD operations for pins",
      "Save and comment on pins",
    ],
    techStack: ["JavaScript", "React", "Sanity CMS"],
    githubUrl: "https://github.com/timo-tech19/ShareMe",
  },
];

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      id="projects"
      className="container space-y-8 md:space-y-16 py-12 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Featured Projects
        </h2>
        <p className="mt-4 text-muted-foreground text-sm sm:text-base">
          Personal projects to demonstrate my skillset.
        </p>
      </div>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="w-full md:w-1/2">
              <Image
                src={projects[currentProject].image || "/placeholder.svg"}
                alt={projects[currentProject].title}
                width={600}
                height={400}
                className="rounded-lg border border-border/40 w-full h-auto object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-2xl font-semibold">
                {projects[currentProject].title}
              </h3>
              <p className="text-muted-foreground">
                {projects[currentProject].description}
              </p>
              <div>
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  {projects[currentProject].features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {projects[currentProject].techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <Button asChild>
                <a
                  href={projects[currentProject].githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={prevProject}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={nextProject}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {projects.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full bg-primary ${
              index === currentProject ? "bg-opacity-100" : "bg-opacity-30"
            }`}
            initial={false}
            animate={{
              width: index === currentProject ? 24 : 8,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </section>
  );
}
