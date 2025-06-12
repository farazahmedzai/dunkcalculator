import { z } from "zod";

// Common validation patterns
export const commonValidation = {
  height: z.number().min(48, "Height must be at least 48 inches").max(96, "Height must be less than 96 inches"),
  standingReach: z.number().min(60, "Standing reach must be at least 60 inches").max(120, "Standing reach must be less than 120 inches"),
  bodyWeight: z.number().min(80, "Body weight must be at least 80 lbs").max(400, "Body weight must be less than 400 lbs"),
  age: z.number().min(12, "Age must be at least 12").max(60, "Age must be less than 60"),
  verticalJump: z.number().min(0, "Vertical jump cannot be negative").max(60, "Vertical jump must be less than 60 inches"),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
  extendedExperienceLevel: z.enum(["beginner", "intermediate", "advanced", "elite"]),
  sport: z.enum(["basketball", "volleyball", "track", "general"]),
  gender: z.enum(["male", "female"]),
  bodyType: z.enum(["ectomorph", "mesomorph", "endomorph", "mixed"]),
  legLength: z.enum(["short", "average", "long"]),
  handSize: z.enum(["small", "average", "large"]),
  jumpType: z.enum(["standing", "approach"]),
  dominantLeg: z.enum(["left", "right"]),
  intensityLevel: z.enum(["low", "moderate", "high", "maximal"]),
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced", "elite"]),
  injuryHistory: z.enum(["none", "minor", "moderate", "severe"]),
  athleticBackground: z.enum(["none", "recreational", "high_school", "college", "professional"]),
  trainingLevel: z.enum(["beginner", "intermediate", "advanced"]),
  primaryGoal: z.enum(["dunk", "vertical", "athletics", "general"]),
};

// Main dunk calculator schema
export const dunkCalculatorSchema = z.object({
  height: commonValidation.height,
  standingReach: commonValidation.standingReach,
  rimHeight: z.number().min(84, "Rim height must be at least 84 inches").max(120, "Rim height must be less than 120 inches"),
  clearance: z.number().min(2, "Clearance must be at least 2 inches").max(12, "Clearance must be less than 12 inches"),
  bodyWeight: commonValidation.bodyWeight.optional(),
  jumpType: commonValidation.jumpType.default("standing"),
  handSize: commonValidation.handSize.default("average"),
  experience: commonValidation.experienceLevel.default("beginner"),
});

// Vertical jump calculator schema
export const verticalJumpCalculatorSchema = z.object({
  jumpMethod: z.enum(["hangTime", "reachHeight", "measurement"]),
  hangTime: z.number().min(0.1).max(2).optional(),
  maxReach: z.number().min(60).max(150).optional(),
  standingReach: commonValidation.standingReach.optional(),
  directMeasurement: commonValidation.verticalJump.optional(),
  bodyWeight: commonValidation.bodyWeight.optional(),
  age: commonValidation.age.optional(),
});

// Standing reach calculator schema
export const standingReachCalculatorSchema = z.object({
  calculationType: z.enum(["estimate", "verify"]),
  height: commonValidation.height,
  standingReach: commonValidation.standingReach.optional(),
  armSpan: z.number().min(48).max(120).optional(),
  shoulderWidth: z.number().min(12).max(30).optional(),
  gender: commonValidation.gender,
  sport: commonValidation.sport.optional(),
});

// Jump comparison calculator schema
export const jumpComparisonCalculatorSchema = z.object({
  standingJump: commonValidation.verticalJump,
  approachJump: commonValidation.verticalJump,
  bodyWeight: commonValidation.bodyWeight.optional(),
  dominantLeg: commonValidation.dominantLeg,
  experienceLevel: commonValidation.experienceLevel,
  sport: commonValidation.sport.optional(),
});

// Jump fatigue calculator schema
export const jumpFatigueCalculatorSchema = z.object({
  restingJump: z.number().min(5).max(60),
  fatigueJump: z.number().min(5).max(60),
  activityType: z.enum(["practice", "game", "training", "testing"]),
  durationMinutes: z.number().min(15).max(300),
  intensityLevel: commonValidation.intensityLevel,
  restTime: z.number().min(0).max(60),
  bodyWeight: commonValidation.bodyWeight.optional(),
  age: commonValidation.age.optional(),
  fitnessLevel: commonValidation.fitnessLevel.optional(),
});

// Max potential calculator schema
export const maxPotentialCalculatorSchema = z.object({
  currentVertical: commonValidation.verticalJump,
  age: commonValidation.age,
  trainingExperience: commonValidation.extendedExperienceLevel,
  athleticBackground: commonValidation.athleticBackground,
  bodyType: commonValidation.bodyType,
  legLength: commonValidation.legLength,
  fastTwitchDominance: z.enum(["low", "moderate", "high", "unknown"]),
  injuryHistory: commonValidation.injuryHistory,
  trainingTime: z.number().min(3).max(60),
  currentWeight: commonValidation.bodyWeight,
});

// Ideal body weight calculator schema
export const idealWeightCalculatorSchema = z.object({
  currentWeight: commonValidation.bodyWeight,
  height: commonValidation.height,
  currentVertical: commonValidation.verticalJump,
  bodyFatPercentage: z.number().min(5).max(40).optional(),
  trainingLevel: commonValidation.trainingLevel,
  primaryGoal: commonValidation.primaryGoal,
  timeframe: z.number().min(4).max(52), // weeks
});

// Export all schema types
export type DunkCalculatorForm = z.infer<typeof dunkCalculatorSchema>;
export type VerticalJumpCalculatorForm = z.infer<typeof verticalJumpCalculatorSchema>;
export type StandingReachCalculatorForm = z.infer<typeof standingReachCalculatorSchema>;
export type JumpComparisonCalculatorForm = z.infer<typeof jumpComparisonCalculatorSchema>;
export type JumpFatigueCalculatorForm = z.infer<typeof jumpFatigueCalculatorSchema>;
export type MaxPotentialCalculatorForm = z.infer<typeof maxPotentialCalculatorSchema>;
export type IdealWeightCalculatorForm = z.infer<typeof idealWeightCalculatorSchema>;