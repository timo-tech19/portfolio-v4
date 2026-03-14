"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sendEmail } from "@/actions/send-email";
import { PERSONAL, SOCIALS } from "@/lib/constants";
import { KineticText } from "@/components/ui/kinetic-text";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.from(sectionRef.current, {
      scale: 0.9,
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 40%",
        scrub: 1,
      },
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData();
    formData.append("senderName", formState.name);
    formData.append("senderEmail", formState.email);
    formData.append("message", formState.message);

    const result = await sendEmail(formData);

    if (result.error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    } else {
      setStatus("sent");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="chapter relative py-24 px-6"
      aria-label="Contact"
    >
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-accent" />
            <span className="font-mono text-xs tracking-widest text-accent uppercase">
              Chapter 06
            </span>
            <div className="h-px w-12 bg-accent" />
          </div>
          <KineticText
            text="The Signal"
            as="h2"
            animation="words"
            className="font-display text-3xl font-bold md:text-5xl"
            stagger={0.1}
          />
          <p className="mt-4 text-text-secondary max-w-lg mx-auto">
            You&apos;ve made it this far — that probably means we&apos;d work well together. Whether it&apos;s a product idea, a collaboration, or just a conversation about building things that matter, I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Left: Contact info + socials */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider">
                    Email
                  </p>
                  <a
                    href={`mailto:${PERSONAL.email}`}
                    className="text-sm text-text-primary hover:text-accent transition-colors"
                  >
                    {PERSONAL.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-sm text-text-primary">
                    {PERSONAL.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="mb-3 text-xs text-text-muted uppercase tracking-wider">
                Or find me here
              </p>
              <div className="flex gap-3">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text-muted transition-all duration-200 hover:border-accent hover:bg-accent/5 hover:text-accent"
                      aria-label={social.label}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Decorative signal rings */}
            <div className="relative hidden h-48 items-center justify-center md:flex">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-accent/10"
                  style={{
                    width: 80 + i * 60,
                    height: 80 + i * 60,
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.1, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
              <div className="h-3 w-3 rounded-full bg-accent shadow-[0_0_20px_var(--accent-glow)]" />
            </div>
          </div>

          {/* Right: Contact form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <FloatingLabelInput
              label="Your name"
              name="senderName"
              required
              value={formState.name}
              onChange={(v) => setFormState((s) => ({ ...s, name: v }))}
              maxLength={200}
            />
            <FloatingLabelInput
              label="Your email"
              name="senderEmail"
              type="email"
              required
              value={formState.email}
              onChange={(v) => setFormState((s) => ({ ...s, email: v }))}
              maxLength={500}
            />
            <FloatingLabelInput
              label="Your message"
              name="message"
              type="textarea"
              required
              value={formState.message}
              onChange={(v) => setFormState((s) => ({ ...s, message: v }))}
              maxLength={5000}
            />

            <MagneticButton
              variant="primary"
              className="w-full"
              onClick={() => {}}
            >
              <Send size={16} />
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                ? "Message sent!"
                : status === "error"
                ? "Error — try again"
                : "Send it"}
            </MagneticButton>

            {status === "sent" && (
              <p className="text-center text-sm text-success">
                Got it — I&apos;ll be in touch soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
