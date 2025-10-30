"use server";

import {
  newsletterEntry,
  newsletterVerificationToken,
  type NewNewsletterEntry,
} from "@/core/db/schemas/newsletter/schemas";
import { z } from "zod";
import { db } from "@/core/db/setup";
import { getEnv } from "@/core/utils/env";
import { sendEmail } from "@/core/services/email/mailer";
import EmailVerification from "@/core/services/email/templates/email-verification";
import { redirect } from "next/navigation";

export async function subscribeToNewsLetter(formData: FormData) {
  const data: NewNewsletterEntry = {
    email: String(formData.get("email") ?? ""),
    firstName: String(formData.get("firstName") ?? ""),
    lastName: (formData.get("lastName") as string) ?? "",
    industry: String(formData.get("industry") ?? ""),
    role: String(formData.get("role") ?? ""),
    preferredContent: (formData.get("preferredContent") as string) ?? null,
  };

  const { email, industry, role, firstName, lastName, preferredContent } = data;
  const validatedEmail = z.email().parse(email);

  const [entry] = await db
    .insert(newsletterEntry)
    .values({
      email: validatedEmail,
      industry,
      role,
      firstName,
      lastName,
      preferredContent,
    })
    .returning();

  const [verificationToken] = await db
    .insert(newsletterVerificationToken)
    .values({
      newsletterEntryId: entry.id,
    })
    .returning();

  const baseUrl = getEnv("APP_BASE_URL");
  const verificationUrl = `${baseUrl}/newsletter/verify?token=${verificationToken.id}`;

  await sendEmail({
    to: validatedEmail,
    subject: "Confirm your subscription to LOSL-C",
    component: EmailVerification,
    props: {
      verificationUrl,
      firstName,
    },
  });

  // Redirect back to the homepage with a success flag so the UI can show an alert
  redirect("/?subscribed=1");
}
