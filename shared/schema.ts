import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const calculationResults = pgTable("calculation_results", {
  id: serial("id").primaryKey(),
  height: real("height").notNull(),
  standingReach: real("standing_reach").notNull(),
  rimHeight: real("rim_height").notNull(),
  clearance: real("clearance").notNull(),
  requiredVertical: real("required_vertical").notNull(),
  hangTime: real("hang_time").notNull(),
  power: real("power").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCalculationSchema = createInsertSchema(calculationResults).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCalculation = z.infer<typeof insertCalculationSchema>;
export type CalculationResult = typeof calculationResults.$inferSelect;
