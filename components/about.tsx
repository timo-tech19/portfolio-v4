import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section
      id="about"
      className="container space-y-8 md:space-y-16 py-6 md:py-12 lg:py-16"
    >
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          About Me
        </h2>
        <p className="mt-4 text-muted-foreground text-sm sm:text-base">
          A little bit about who I am and what I do.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-full md:w-1/2">
          <Image
            src="/about-me.png"
            alt="Timo Heman working"
            width={600}
            height={600}
            // className="rounded-lg border border-border/40 w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <p className="text-muted-foreground text-sm sm:text-base">
            I am a skilled full-stack software engineer with over a year of
            experience working remotely for startups in small teams of 1 to 15
            members. I excel at building user-friendly products and delivering
            innovative solutions that precisely meet customer needs. I enjoy
            keeping up with technology trends and applying them to solve
            real-world problems.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            I perform my best when I am part of a small team where my
            contributions can have a meaningful impact. I enjoy collaborating
            with intelligent individuals, exchanging ideas, and learning from
            one another.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base">
            Additionally, I thrive when I have the autonomy to manage my work,
            as this allows me to explore various creative solutions to problems
            and determine what best meets the business&apos;s needs.
          </p>
          <div className="text-muted-foreground text-sm sm:text-base">
            Besides technical skills, some of my human skills include:
            <ul className="grid grid-cols-2 gap-2 mt-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Problem-Solving</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Fast-paced Learning</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Effective Communication</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Writing</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Knowlegde Sharing</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>Resilience</span>
              </li>
            </ul>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base">
            When I&apos;m not writing code, I spend my time reading extensively
            about ancient history, philosophy, religion, and psychology.
            I&apos;m interested in understanding humans and enjoy contemplating
            the big existential questions of life. Occasionally, I write about
            my ideas on my{" "}
            <Link
              href="https://thinkwithtim.substack.com/"
              target="_blank"
              rel="noreferrer"
              className="underline text-primary"
            >
              Substack
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

// Human Skills
// Fast-paced learning
// Effective Communication
// Writing
// Problem solving
// Resilience
// Knowledge sharing
