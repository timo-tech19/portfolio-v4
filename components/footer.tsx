import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center space-y-4 py-8 md:flex-row md:justify-between md:space-y-0">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Timo Heman. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <Link
            href="https://github.com/timo-tech19"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/timo-heman/"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://x.com/timo__tech"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">X (Twitter)</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
