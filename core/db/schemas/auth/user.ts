import * as pg from "drizzle-orm/pg-core";

export const user = pg.pgTable("users", {
  id: pg.uuid("id").primaryKey().defaultRandom(),
  email: pg.text("email").notNull().unique(),
  emailVerified: pg.boolean("email_verified").notNull().default(false),
  passwordHash: pg.text("password_hash").notNull(),
  createdAt: pg.timestamp("created_at").notNull().defaultNow(),
  updatedAt: pg.timestamp("updated_at").notNull().defaultNow(),
});
