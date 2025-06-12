import { pgTable, text, serial, integer, boolean, real, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Main dunk calculator results
export const dunkCalculations = pgTable("dunk_calculations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  height: real("height").notNull(),
  standingReach: real("standing_reach").notNull(),
  rimHeight: real("rim_height").notNull(),
  clearance: real("clearance").notNull(),
  bodyWeight: real("body_weight"),
  jumpType: text("jump_type").notNull(), // standing, approach
  handSize: text("hand_size").notNull(), // small, average, large
  experience: text("experience").notNull(), // beginner, intermediate, advanced
  requiredVertical: real("required_vertical").notNull(),
  hangTime: real("hang_time").notNull(),
  power: real("power").notNull(),
  canDunk: boolean("can_dunk").notNull(),
  assessment: text("assessment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Vertical jump calculator results
export const verticalJumpCalculations = pgTable("vertical_jump_calculations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  jumpMethod: text("jump_method").notNull(), // hangTime, reachHeight, measurement
  hangTime: real("hang_time"),
  maxReach: real("max_reach"),
  standingReach: real("standing_reach"),
  directMeasurement: real("direct_measurement"),
  bodyWeight: real("body_weight"),
  age: integer("age"),
  verticalJump: real("vertical_jump").notNull(),
  percentileRank: text("percentile_rank").notNull(),
  powerOutput: real("power_output").notNull(),
  assessment: text("assessment").notNull(),
  recommendations: json("recommendations").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Standing reach calculator results
export const standingReachCalculations = pgTable("standing_reach_calculations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  calculationType: text("calculation_type").notNull(), // estimate, verify
  height: real("height").notNull(),
  standingReach: real("standing_reach"),
  armSpan: real("arm_span"),
  shoulderWidth: real("shoulder_width"),
  gender: text("gender").notNull(), // male, female
  sport: text("sport"), // basketball, volleyball, general
  estimatedReach: real("estimated_reach").notNull(),
  reachToHeightRatio: real("reach_to_height_ratio").notNull(),
  comparison: text("comparison").notNull(),
  accuracy: text("accuracy").notNull(),
  recommendations: json("recommendations").$type<string[]>(),
  dunkPotential: text("dunk_potential").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Jump comparison calculator results
export const jumpComparisonCalculations = pgTable("jump_comparison_calculations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  standingJump: real("standing_jump").notNull(),
  approachJump: real("approach_jump").notNull(),
  bodyWeight: real("body_weight"),
  dominantLeg: text("dominant_leg").notNull(), // left, right
  experienceLevel: text("experience_level").notNull(), // beginner, intermediate, advanced
  sport: text("sport"), // basketball, volleyball, track, general
  approachAdvantage: real("approach_advantage").notNull(),
  percentageIncrease: real("percentage_increase").notNull(),
  jumpingStyle: text("jumping_style").notNull(),
  strengthProfile: text("strength_profile").notNull(),
  recommendations: json("recommendations").$type<string[]>(),
  optimalStyle: text("optimal_style").notNull(),
  trainingFocus: json("training_focus").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Jump fatigue calculator results
export const jumpFatigueCalculations = pgTable("jump_fatigue_calculations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  restingJump: real("resting_jump").notNull(),
  fatigueJump: real("fatigue_jump").notNull(),
  activityType: text("activity_type").notNull(), // practice, game, training, testing
  durationMinutes: integer("duration_minutes").notNull(),
  intensityLevel: text("intensity_level").notNull(), // low, moderate, high, maximal
  restTime: integer("rest_time").notNull(),
  bodyWeight: real("body_weight"),
  age: integer("age"),
  fitnessLevel: text("fitness_level"), // beginner, intermediate, advanced, elite
  fatigueIndex: real("fatigue_index").notNull(),
  fatigueLevel: text("fatigue_level").notNull(),
  performanceDrop: real("performance_drop").notNull(),
  recoveryTime: real("recovery_time").notNull(),
  fatigueType: text("fatigue_type").notNull(),
  recommendations: json("recommendations").$type<string[]>(),
  trainingAdjustments: json("training_adjustments").$type<string[]>(),
  nextTestTime: text("next_test_time").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Max potential calculator results
export const maxPotentialCalculations = pgTable("max_potential_calculations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  currentVertical: real("current_vertical").notNull(),
  age: integer("age").notNull(),
  trainingExperience: text("training_experience").notNull(), // beginner, intermediate, advanced, elite
  athleticBackground: text("athletic_background").notNull(), // none, recreational, high_school, college, professional
  bodyType: text("body_type").notNull(), // ectomorph, mesomorph, endomorph, mixed
  legLength: text("leg_length").notNull(), // short, average, long
  fastTwitchDominance: text("fast_twitch_dominance").notNull(), // low, moderate, high, unknown
  injuryHistory: text("injury_history").notNull(), // none, minor, moderate, severe
  trainingTime: integer("training_time").notNull(),
  currentWeight: real("current_weight").notNull(),
  maxPotential: real("max_potential").notNull(),
  currentGap: real("current_gap").notNull(),
  percentageIncrease: real("percentage_increase").notNull(),
  timeToReach: real("time_to_reach").notNull(),
  confidenceLevel: text("confidence_level").notNull(),
  limitingFactors: json("limiting_factors").$type<string[]>(),
  strengthAreas: json("strength_areas").$type<string[]>(),
  trainingPhases: json("training_phases").$type<Array<{phase: string; duration: string; focus: string; expectedGain: number}>>(),
  geneticFactors: text("genetic_factors").notNull(),
  recommendations: json("recommendations").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Ideal body weight calculator results
export const idealWeightCalculations = pgTable("ideal_weight_calculations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  currentWeight: real("current_weight").notNull(),
  height: real("height").notNull(),
  currentVertical: real("current_vertical").notNull(),
  bodyFatPercentage: real("body_fat_percentage"),
  trainingLevel: text("training_level").notNull(), // beginner, intermediate, advanced
  primaryGoal: text("primary_goal").notNull(), // dunk, vertical, athletics, general
  timeframe: integer("timeframe").notNull(),
  idealWeight: real("ideal_weight").notNull(),
  weightChange: real("weight_change").notNull(),
  projectedVertical: real("projected_vertical").notNull(),
  verticalChange: real("vertical_change").notNull(),
  bodyFatTarget: real("body_fat_target").notNull(),
  muscleGainNeeded: real("muscle_gain_needed").notNull(),
  fatLossNeeded: real("fat_loss_needed").notNull(),
  timeToReach: real("time_to_reach").notNull(),
  strengthToWeightRatio: real("strength_to_weight_ratio").notNull(),
  recommendations: json("recommendations").$type<string[]>(),
  nutritionGuidelines: json("nutrition_guidelines").$type<string[]>(),
  trainingModifications: json("training_modifications").$type<string[]>(),
  riskFactors: json("risk_factors").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas for all calculator types
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDunkCalculationSchema = createInsertSchema(dunkCalculations).omit({
  id: true,
  createdAt: true,
});

export const insertVerticalJumpCalculationSchema = createInsertSchema(verticalJumpCalculations).omit({
  id: true,
  createdAt: true,
});

export const insertStandingReachCalculationSchema = createInsertSchema(standingReachCalculations).omit({
  id: true,
  createdAt: true,
});

export const insertJumpComparisonCalculationSchema = createInsertSchema(jumpComparisonCalculations).omit({
  id: true,
  createdAt: true,
});

export const insertJumpFatigueCalculationSchema = createInsertSchema(jumpFatigueCalculations).omit({
  id: true,
  createdAt: true,
});

export const insertMaxPotentialCalculationSchema = createInsertSchema(maxPotentialCalculations).omit({
  id: true,
  createdAt: true,
});

export const insertIdealWeightCalculationSchema = createInsertSchema(idealWeightCalculations).omit({
  id: true,
  createdAt: true,
});

// Export types for all schemas
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDunkCalculation = z.infer<typeof insertDunkCalculationSchema>;
export type DunkCalculation = typeof dunkCalculations.$inferSelect;

export type InsertVerticalJumpCalculation = z.infer<typeof insertVerticalJumpCalculationSchema>;
export type VerticalJumpCalculation = typeof verticalJumpCalculations.$inferSelect;

export type InsertStandingReachCalculation = z.infer<typeof insertStandingReachCalculationSchema>;
export type StandingReachCalculation = typeof standingReachCalculations.$inferSelect;

export type InsertJumpComparisonCalculation = z.infer<typeof insertJumpComparisonCalculationSchema>;
export type JumpComparisonCalculation = typeof jumpComparisonCalculations.$inferSelect;

export type InsertJumpFatigueCalculation = z.infer<typeof insertJumpFatigueCalculationSchema>;
export type JumpFatigueCalculation = typeof jumpFatigueCalculations.$inferSelect;

export type InsertMaxPotentialCalculation = z.infer<typeof insertMaxPotentialCalculationSchema>;
export type MaxPotentialCalculation = typeof maxPotentialCalculations.$inferSelect;

export type InsertIdealWeightCalculation = z.infer<typeof insertIdealWeightCalculationSchema>;
export type IdealWeightCalculation = typeof idealWeightCalculations.$inferSelect;

// Legacy support (keeping for backwards compatibility)
export const insertCalculationSchema = insertDunkCalculationSchema;
export type InsertCalculation = InsertDunkCalculation;
export type CalculationResult = DunkCalculation;
