import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const testimonials = pgTable("testimonials", {
  id: serial().primaryKey(),
  name: text().notNull(),
  message: text().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
