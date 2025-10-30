import { randString } from "@/core/utils/random";
import * as pg from "drizzle-orm/pg-core";

export const newsletterEntry = pg.pgTable("newsletter_entries", {
  id: pg.uuid("id").primaryKey().defaultRandom(),
  email: pg.text("email").notNull().unique(),
  emailVerified: pg.boolean("email_verified").notNull().default(false),
  firstName: pg.text("first_name").notNull(),
  lastName: pg.text("last_name"),
  industry: pg.text("industry").notNull(),
  role: pg.text("role").notNull(),
  preferredContent: pg.text("preferred_content"),
  subscribedAt: pg.timestamp("subscribed_at").notNull().defaultNow(),
});

export const newsletterVerificationToken = pg.pgTable(
  "newsletter_verification_tokens",
  {
    id: pg
      .text("id")
      .primaryKey()
      .$defaultFn(() => randString(64)),
    newsletterEntryId: pg
      .uuid("newsletter_entry_id")
      .references((): pg.AnyPgColumn => newsletterEntry.id, {
        onDelete: "cascade",
      })
      .notNull(),
    expired: pg.boolean("expired").notNull().default(false),
  },
);

export type NewsletterEntry = typeof newsletterEntry.$inferSelect;
export type NewsletterVerificationToken =
  typeof newsletterVerificationToken.$inferSelect;
export type NewNewsletterEntry = typeof newsletterEntry.$inferInsert;
export type NewNewsletterVerificationToken =
  typeof newsletterVerificationToken.$inferInsert;
