"use server";

import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");
  const senderName = formData.get("senderName");

  if (!validateString(senderEmail, 500)) {
    return { error: "Invalid sender email" };
  }

  if (!validateString(message, 5000)) {
    return { error: "Invalid message" };
  }

  if (!validateString(senderName, 200)) {
    return { error: "Invalid name" };
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "timoheman16@gmail.com",
      subject: `Portfolio message from ${senderName}`,
      replyTo: senderEmail as string,
      text: `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`,
    });

    return { success: true };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}
