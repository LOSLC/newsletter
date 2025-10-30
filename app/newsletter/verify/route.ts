import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/core/db/setup";
import { and, eq } from "drizzle-orm";
import {
  newsletterEntry,
  newsletterVerificationToken,
} from "@/core/db/schemas/newsletter/schemas";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return new NextResponse("Missing token", { status: 400 });
  }

  // Find a non-expired token
  const [row] = await db
    .select()
    .from(newsletterVerificationToken)
    .where(
      and(
        eq(newsletterVerificationToken.id, token),
        eq(newsletterVerificationToken.expired, false),
      ),
    )
    .limit(1);

  if (!row) {
    return new NextResponse("Invalid or expired token", { status: 400 });
  }

  // Verify email and expire the token atomically
  await db.transaction(async (tx) => {
    await tx
      .update(newsletterEntry)
      .set({ emailVerified: true })
      .where(eq(newsletterEntry.id, row.newsletterEntryId));

    await tx
      .update(newsletterVerificationToken)
      .set({ expired: true })
      .where(eq(newsletterVerificationToken.id, row.id));
  });

  const url = new URL("/newsletter/verified", req.url);
  return NextResponse.redirect(url);
}
