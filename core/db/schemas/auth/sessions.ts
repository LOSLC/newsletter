import * as pg from "drizzle-orm/pg-core";
import { user } from "./user";
import { randNumericString, randString } from "@/core/utils/random";
import { addMinutes } from "date-fns";

export const ACCOUNT_VERIFICATION_TOKEN_EXPIRY_MINUTES = 15;
export const USER_SESSION_EXPIRY_DAYS = 30;
export const PASSWORD_RESET_TOKEN_EXPIRY_MINUTES = 15;
export const PASSWORD_RESET_SESSION_EXPIRY_MINUTES = 15;

export const userSession = pg.pgTable("user_sessions", {
  id: pg.uuid("id").primaryKey().defaultRandom(),
  userId: pg
    .uuid("user_id")
    .references((): pg.AnyPgColumn => user.id)
    .notNull(),
  expiresAt: pg.timestamp("expires_at").notNull(),
  createdAt: pg.timestamp("created_at").notNull().defaultNow(),
});

export const accountVerificationSession = pg.pgTable(
  "account_verification_sessions",
  {
    id: pg
      .text("id")
      .primaryKey()
      .$defaultFn(() => randString(64)),
    userId: pg
      .uuid("user_id")
      .references((): pg.AnyPgColumn => user.id)
      .notNull(),
    token: pg
      .text("token")
      .notNull()
      .$defaultFn(() => randNumericString(6)),
    tokenExpiresAt: pg.timestamp("token_expires_at").notNull(),
    createdAt: pg.timestamp("created_at").notNull().defaultNow(),
    expiresAt: pg
      .timestamp("expires_at")
      .notNull()
      .$defaultFn(() =>
        addMinutes(new Date(), ACCOUNT_VERIFICATION_TOKEN_EXPIRY_MINUTES),
      ),
    expired: pg.boolean("expired").notNull().default(false),
  },
);

export const passwordResetRequest = pg.pgTable("password_reset_requests", {
  id: pg
    .text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => randString(64)),
  userId: pg
    .uuid("user_id")
    .references((): pg.AnyPgColumn => user.id)
    .notNull(),
  token: pg
    .text("token")
    .notNull()
    .$defaultFn(() => randNumericString(6)),
  expiresAt: pg
    .timestamp("expires_at")
    .notNull()
    .$defaultFn(() =>
      addMinutes(new Date(), PASSWORD_RESET_TOKEN_EXPIRY_MINUTES),
    ),
  createdAt: pg.timestamp("created_at").notNull().defaultNow(),
});

export const passwordResetSession = pg.pgTable("password_reset_sessions", {
  id: pg.uuid("id").primaryKey().defaultRandom(),
  userId: pg
    .uuid("user_id")
    .references((): pg.AnyPgColumn => user.id)
    .notNull(),
  expiresAt: pg
    .timestamp("expires_at")
    .notNull()
    .$defaultFn(() =>
      addMinutes(new Date(), PASSWORD_RESET_SESSION_EXPIRY_MINUTES),
    ),
  createdAt: pg.timestamp("created_at").notNull().defaultNow(),
});
