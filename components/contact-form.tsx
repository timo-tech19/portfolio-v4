"use client";

import { toast } from "react-hot-toast";

import { sendEmail } from "@/actions/send-email";
import SubmitButton from "./submit-button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useRef } from "react";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    const { error } = await sendEmail(formData);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Email sent to Timo!");
    formRef.current?.reset();
  };

  return (
    <form
      className="max-w-md mx-auto space-y-4"
      ref={formRef}
      action={formAction}
    >
      <Input
        name="senderName"
        required
        maxLength={500}
        type="text"
        placeholder="Your Name"
        className="h-12"
      />
      <Input
        name="senderEmail"
        required
        maxLength={500}
        type="email"
        placeholder="Your Email"
        className="h-12"
      />
      <Textarea
        name="message"
        required
        maxLength={5000}
        placeholder="Your Message"
        className="h-32"
      />
      <SubmitButton />
    </form>
  );
};

export default ContactForm;
