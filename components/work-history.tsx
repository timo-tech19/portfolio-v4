import { Circle } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import ContactModal from "./contact-modal";

const workHistory = [
  {
    company: "Your Company/Project/Team",
    position: "Compatible role",
    period: "Available to start as soon as possible",
    description: [],
    cta: true,
  },
  {
    company: "Stat-ly (Data Analytics Platform)",
    position: "Software Engineer",
    period: "2022",
    description: [
      "Redesigned entire  project UI for MVP demo within 4 months.",
      "Created animated data visualization charts with D3.js",
      "Optimized company website responsive design to ensure seamless user experience on desktop and mobile devices",
    ],
  },
  {
    company: "FieldR (Match Analyzing Tool)",
    position: "Frontend Developer",
    period: "2021-2022",
    description: [
      "Built entire frontend mobile app from zero to MVP in 8 months",
      "Participated in product design and development discussions",
      "Organized pair-programming sessions with backend developer to speed up development",
    ],
  },
];

export default function WorkHistory() {
  return (
    <section
      id="work"
      className="container space-y-8 md:space-y-16 py-12 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Work History
        </h2>
        <p className="mt-4 text-muted-foreground text-sm sm:text-base">
          My professional journey in the world of web development.
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-1 bg-muted"></div>
        {workHistory.map((job, index) => (
          <div key={index} className="relative mb-8 sm:mb-12">
            <Circle className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-primary text-background rounded-full" />
            <div
              className={`ml-12 sm:ml-0 sm:w-1/2 ${
                index % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:ml-auto"
              }`}
            >
              <div className="relative overflow-hidden rounded-xl bg-background p-[2px]">
                <Spotlight
                  className="from-purple-600 via-purple-500 to-purple-400 blur-3xl dark:from-purple-200 dark:via-purple-300 dark:to-purple-400"
                  size={124}
                />
                <div className="relative h-full w-full rounded-xl bg-background p-6 md:p-8">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {job.company}
                  </h3>
                  <h4 className="text-primary">{job.position}</h4>
                  <p className="text-sm text-muted-foreground">{job.period}</p>
                  {job.description.map((item) => (
                    <p key={item} className=" mt-2 text-sm sm:text-base">
                      {item}
                    </p>
                  ))}
                  {job.cta && (
                    <div className="relative flex md:justify-end mt-4">
                      <ContactModal triggerSize="lg" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
