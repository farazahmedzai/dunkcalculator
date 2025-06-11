import type { CalculationResults } from "@/pages/home";

interface CalculatorInputs {
  height: number;
  standingReach: number;
  rimHeight: number;
  clearance: number;
  bodyWeight?: number;
  jumpType?: "standing" | "approach";
  handSize?: "small" | "average" | "large";
  experience?: "beginner" | "intermediate" | "advanced";
}

export function calculateDunkRequirements(inputs: CalculatorInputs): CalculationResults {
  const { 
    height, 
    standingReach, 
    rimHeight, 
    clearance, 
    bodyWeight,
    jumpType = "standing",
    handSize = "average",
    experience = "beginner"
  } = inputs;

  // Calculate base required vertical jump
  let baseRequiredVertical = Math.max(0, (rimHeight + clearance) - standingReach);

  // Apply jump type modifier
  if (jumpType === "approach") {
    // Running approach typically adds 6-12 inches
    const approachBonus = 8; // Average bonus for running approach
    baseRequiredVertical = Math.max(0, baseRequiredVertical - approachBonus);
  }

  // Apply hand size modifier to clearance requirement
  let handSizeModifier = 0;
  if (handSize === "small") {
    handSizeModifier = 2; // Need extra clearance for ball control
  } else if (handSize === "large") {
    handSizeModifier = -1; // Can dunk with less clearance
  }

  // Apply experience modifier
  let experienceModifier = 0;
  if (experience === "intermediate") {
    experienceModifier = -1; // Better technique
  } else if (experience === "advanced") {
    experienceModifier = -2; // Excellent technique
  }

  const requiredVertical = Math.max(0, baseRequiredVertical + handSizeModifier + experienceModifier);

  // Calculate hang time using physics formula
  // h = (1/2)gt² where g = 32.174 ft/s² (gravity in imperial)
  // Convert inches to feet for calculation
  const jumpHeightFeet = requiredVertical / 12;
  const gravity = 32.174; // ft/s²
  
  // Time to reach peak: t = √(2h/g)
  // Total hang time is twice the time to reach peak
  const hangTime = requiredVertical > 0 ? 2 * Math.sqrt(2 * jumpHeightFeet / gravity) : 0;

  // Calculate power requirements
  // Use provided body weight or estimate from height
  const actualWeight = bodyWeight || Math.max(120, (height - 60) * 3 + 150);
  
  // Power = Force × Distance / Time
  // Force = Weight (in this simplified model)
  // Convert to watts: 1 hp = 746 watts, 1 ft-lb/s = 1.356 watts
  const powerFootPounds = actualWeight * jumpHeightFeet / Math.max(hangTime / 2, 0.1);
  const power = Math.round(powerFootPounds * 1.356);

  // Generate enhanced assessment
  let assessment: string;
  let canDunk = false;

  if (requiredVertical <= 0) {
    assessment = `Congratulations! You can already dunk with your current measurements${jumpType === "approach" ? " using a running approach" : ""}. Your standing reach is sufficient to clear the rim with the desired clearance.`;
    canDunk = true;
  } else {
    let timeframe = "";
    let difficulty = "";
    
    if (requiredVertical <= 6) {
      timeframe = "2-4 weeks";
      difficulty = "very achievable";
    } else if (requiredVertical <= 12) {
      timeframe = "2-4 months";
      difficulty = "achievable";
    } else if (requiredVertical <= 24) {
      timeframe = "6-12 months";
      difficulty = "challenging but realistic";
    } else {
      timeframe = "12+ months";
      difficulty = "very challenging";
    }

    assessment = `You need to improve your vertical jump by ${requiredVertical.toFixed(1)} inches${jumpType === "approach" ? " (with running approach)" : ""}. This is ${difficulty} with dedicated training over ${timeframe}.`;
    
    // Add modifiers context
    if (handSize === "small") {
      assessment += " Your smaller hands require extra clearance for ball control.";
    } else if (handSize === "large") {
      assessment += " Your larger hands provide an advantage for ball control.";
    }
    
    if (experience === "advanced") {
      assessment += " Your advanced technique gives you a significant advantage.";
    } else if (experience === "beginner") {
      assessment += " Focus on improving your jumping technique alongside strength training.";
    }
  }

  return {
    requiredVertical,
    hangTime: Math.max(0, hangTime),
    power: Math.max(0, power),
    assessment,
    canDunk
  };
}

// Utility function to validate measurements
export function validateMeasurements(inputs: CalculatorInputs): string | null {
  const { height, standingReach, rimHeight, clearance } = inputs;

  if (height <= 0) return "Height must be greater than 0";
  if (standingReach <= 0) return "Standing reach must be greater than 0";
  if (rimHeight <= 0) return "Rim height must be greater than 0";
  if (clearance < 0) return "Clearance cannot be negative";

  // Standing reach should typically be at least equal to height
  if (standingReach < height * 1.0) {
    return "Standing reach seems unusually low. Please double-check your measurement.";
  }

  // Standing reach should not be excessively high
  if (standingReach > height * 1.4) {
    return "Standing reach seems unusually high. Please double-check your measurement.";
  }

  return null;
}

// Helper function to estimate standing reach from height
export function estimateStandingReach(height: number): number {
  // Average standing reach is approximately 1.33x height
  return Math.round(height * 1.33 * 2) / 2; // Round to nearest 0.5
}

// Helper function to convert between units
export function inchesToFeet(inches: number): number {
  return inches / 12;
}

export function feetToInches(feet: number): number {
  return feet * 12;
}

// Calculate vertical jump from hang time (reverse calculation)
export function calculateVerticalFromHangTime(hangTime: number): number {
  if (hangTime <= 0) return 0;
  
  const gravity = 32.174; // ft/s²
  const timeToPeak = hangTime / 2;
  const jumpHeightFeet = (gravity * timeToPeak * timeToPeak) / 2;
  
  return jumpHeightFeet * 12; // Convert to inches
}
