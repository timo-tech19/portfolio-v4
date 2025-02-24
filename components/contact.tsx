import Link from "next/link";
import ContactForm from "./contact-form";

export default function Contact() {
  return (
    <section
      id="contact"
      className="container space-y-8 md:space-y-16 py-12 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-muted-foreground text-sm sm:text-base">
          Have a project in mind? Let&apos;s work together to bring your ideas
          to life. You can send me a message using the form below or reach out
          to me directly via email at{" "}
          <Link
            href="mailto:timoheman16@gmail.com"
            className="underline text-primary"
          >
            timoheman16@gmail.com
          </Link>
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
