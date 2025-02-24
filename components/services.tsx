import { Code, Server, Smartphone, Cloud } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";

const services = [
  {
    title: "Frontend Development",
    description:
      "Building responsive and interactive user interfaces using TypeScript, React and Next.js",
    icon: Code,
  },
  {
    title: "Backend Development",
    description:
      "Creating robust and scalable server-side applications with Node.js, Express, Nest.js, Python, and Django",
    icon: Server,
  },
  {
    title: "Mobile Development",
    description: "Developing cross-platform mobile apps using React Native",
    icon: Smartphone,
  },
  {
    title: "DevOps",
    description:
      "Containerizing applications with Docker and setting up CI/CD pipelines with GitHub Actions",
    icon: Cloud,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="container space-y-8 md:space-y-16 py-12 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          My Services
        </h2>
        <p className="mt-4 text-muted-foreground text-sm sm:text-base">
          Comprehensive solutions for your web development needs.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl bg-background p-[2px]"
          >
            <Spotlight
              className="from-blue-600 via-blue-500 to-blue-400 blur-3xl dark:from-blue-200 dark:via-blue-300 dark:to-blue-400"
              size={124}
            />
            <div className="relative h-full w-full rounded-xl bg-background p-6 md:p-8">
              <div className="flex items-center gap-4">
                <service.icon className="h-8 w-8 text-primary" />
                <h3 className="font-bold text-lg">{service.title}</h3>
              </div>
              <p className="mt-2 text-muted-foreground text-sm">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
