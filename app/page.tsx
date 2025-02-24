import Hero from "@/components/hero";
import TechMarquee from "@/components/tech-marquee";
import About from "@/components/about";
import Services from "@/components/services";
import WorkHistory from "@/components/work-history";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import ScrollAnimation from "@/components/scroll-animation";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <ScrollAnimation
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Hero />
        </ScrollAnimation>

        <ScrollAnimation
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <TechMarquee />
        </ScrollAnimation>

        <ScrollAnimation
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <About />
        </ScrollAnimation>

        <ScrollAnimation
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }}
        >
          <Services />
        </ScrollAnimation>

        <ScrollAnimation
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <WorkHistory />
        </ScrollAnimation>

        <ScrollAnimation
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }}
        >
          <Projects />
        </ScrollAnimation>

        <ScrollAnimation
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Contact />
          <Footer />
        </ScrollAnimation>
      </div>
    </div>
  );
}
