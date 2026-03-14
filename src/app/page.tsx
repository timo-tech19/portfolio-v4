import { LoadingScreen } from "@/components/layout/loading-screen";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Hero } from "@/components/chapters/hero";
import { About } from "@/components/chapters/about";
import { Services } from "@/components/chapters/services";
import { Journey } from "@/components/chapters/journey";
import { Projects } from "@/components/chapters/projects";
import { Contact } from "@/components/chapters/contact";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Hero />
      <About />
      <Services />
      <Journey />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
