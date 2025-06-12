// Shared training requirements data to eliminate duplication
export interface TrainingRequirement {
  id: string;
  name: string;
  icon: string;
  description: string;
  athleticRequirements: string[];
  trainingFocus: string[];
  color: string;
  verticalRange: string;
  dunkTypes: string[];
}

export const trainingRequirements: TrainingRequirement[] = [
  {
    id: "power-based",
    name: "Power-Based Dunks",
    icon: "Zap",
    description: "One-hand slam, Two-hand power, Tomahawk",
    athleticRequirements: [
      "24-36 inch vertical jump ability",
      "Strong two-foot takeoff power",
      "Excellent hand-eye coordination",
      "Secure ball grip and control"
    ],
    trainingFocus: [
      "Explosive leg strength development (squats, deadlifts)",
      "Plyometric exercises (depth jumps, box jumps)",
      "Approach speed and timing practice",
      "Ball handling and grip strength work"
    ],
    color: "basketball-orange",
    verticalRange: "24-36 inches",
    dunkTypes: ["One-Hand Slam", "Two-Hand Power Slam", "Tomahawk Dunk"]
  },
  {
    id: "finesse-based", 
    name: "Finesse-Based Dunks",
    icon: "Activity",
    description: "Windmill, 360-degree, Between-the-legs",
    athleticRequirements: [
      "32-42 inch vertical jump ability",
      "Extended hang time capabilities",
      "Superior body control and awareness",
      "Advanced ball handling skills"
    ],
    trainingFocus: [
      "Single-leg plyometric development",
      "Core strength and stability training",
      "Balance and coordination exercises",
      "Motion practice on adjustable rims"
    ],
    color: "purple-600",
    verticalRange: "32-42 inches",
    dunkTypes: ["Windmill Dunk", "360-Degree Dunk", "Between-the-Legs"]
  }
];

export const getTrainingRequirementById = (id: string): TrainingRequirement | undefined => {
  return trainingRequirements.find(req => req.id === id);
};

export const getTrainingRequirementsByVertical = (minVertical: number): TrainingRequirement[] => {
  return trainingRequirements.filter(req => {
    const range = req.verticalRange.split('-');
    const min = parseInt(range[0]);
    return minVertical >= min;
  });
};