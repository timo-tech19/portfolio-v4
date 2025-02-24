import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ContactModal from "./contact-modal";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-auto md:mr-6 flex items-center space-x-2">
          <span className="font-bold">timotech.</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="#about" className="transition-colors hover:text-primary">
            About
          </Link>
          <Link
            href="#services"
            className="transition-colors hover:text-primary"
          >
            Services
          </Link>
          <Link href="#work" className="transition-colors hover:text-primary">
            Work
          </Link>
          <Link
            href="#projects"
            className="transition-colors hover:text-primary"
          >
            Projects
          </Link>
          <Link
            href="#contact"
            className="transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/timo-tech19"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <Link
            href="https://www.linkedin.com/in/timo-heman/"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </Link>
          <Link
            href="https://x.com/timo__tech"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">X (Twitter)</span>
            </Button>
          </Link>
          <div className="hidden md:inline-flex">
            <ContactModal />
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                href="#about"
                className="transition-colors hover:text-primary"
              >
                About
              </Link>
              <Link
                href="#services"
                className="transition-colors hover:text-primary"
              >
                Services
              </Link>
              <Link
                href="#work"
                className="transition-colors hover:text-primary"
              >
                Work
              </Link>
              <Link
                href="#projects"
                className="transition-colors hover:text-primary"
              >
                Projects
              </Link>
              <Link
                href="#contact"
                className="transition-colors hover:text-primary"
              >
                Contact
              </Link>
              <div className="flex space-x-4 mt-4">
                <Link
                  href="https://github.com/timo-tech19"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="ghost" size="icon">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/timo-heman/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link
                  href="https://x.com/timo__tech"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="ghost" size="icon">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">X (Twitter)</span>
                  </Button>
                </Link>
              </div>
              <div className="flex w-full justify-stretch">
                <ContactModal triggerSize="lg" />
              </div>
              {/* TODO: Add modal trigger for contact form */}
              {/* <Button size="sm">Get in Touch</Button> */}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
