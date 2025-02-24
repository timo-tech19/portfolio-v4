import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GlowEffect } from "./ui/glow-effect";
import ContactForm from "./contact-form";
import Link from "next/link";

type ContactFormProps = {
  triggerSize?: "default" | "sm" | "lg" | "icon" | null | undefined;
};

const ContactModal = ({ triggerSize = "sm" }: ContactFormProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative">
          <GlowEffect
            colors={["rgb(59 130 246)", " rgb(168 85 247)", "rgb(59 130 246)"]}
            mode="colorShift"
            blur="soft"
            duration={3}
            scale={0.95}
          />
          <Button size={triggerSize} variant="outline" className="relative">
            Get In Touch
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle>Get in Touch</DialogTitle>
          <DialogDescription>
            Have a project in mind? Let&apos;s work together to bring your ideas
            to life. You can send me a message using the form below or reach out
            to me directly via email at{" "}
            <Link
              href="mailto:timoheman16@gmail.com"
              className="underline text-primary"
            >
              timoheman16@gmail.com
            </Link>
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <ContactForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
