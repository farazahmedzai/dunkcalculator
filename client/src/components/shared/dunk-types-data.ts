// Shared dunk types data to eliminate duplication across pages
export interface DunkType {
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  requiredVertical: string;
  style: "Power" | "Finesse";
  description: string;
  technique: string[];
  advantages: string[];
  tips: string;
  color: string;
}

export const dunkTypes: DunkType[] = [
  {
    name: "One-Hand Slam",
    difficulty: "Beginner",
    requiredVertical: "24-30 inches",
    style: "Power",
    description: "The most basic and practical dunk, using one hand for maximum reach and control.",
    technique: [
      "Approach with 3-4 step runup",
      "Jump off two feet for maximum power",
      "Reach with dominant hand",
      "Slam ball through rim with authority"
    ],
    advantages: [
      "Easiest to execute consistently",
      "Maximum reach with one arm",
      "Good for shorter players",
      "Game-applicable"
    ],
    tips: "Focus on perfect timing and approach angle. Keep non-dunking arm for balance.",
    color: "green"
  },
  {
    name: "Two-Hand Power Slam",
    difficulty: "Beginner",
    requiredVertical: "26-32 inches",
    style: "Power",
    description: "Classic two-handed dunk emphasizing power and control over the rim.",
    technique: [
      "Strong approach with momentum",
      "Two-foot takeoff for stability",
      "Grip ball with both hands above head",
      "Drive through rim with full extension"
    ],
    advantages: [
      "Most secure ball control",
      "Intimidating power display",
      "Lower chance of missing",
      "Great for building confidence"
    ],
    tips: "Ensure you can palm or securely grip the ball. Practice the motion without jumping first.",
    color: "blue"
  },
  {
    name: "Tomahawk Dunk",
    difficulty: "Intermediate",
    requiredVertical: "30-36 inches",
    style: "Power",
    description: "Bringing the ball from behind the head in a chopping motion for dramatic effect.",
    technique: [
      "High approach with strong leap",
      "Ball starts behind head with one hand",
      "Arc ball forward in tomahawk motion",
      "Slam with authority through rim"
    ],
    advantages: [
      "Spectacular visual effect",
      "Good for highlights",
      "Shows superior athleticism",
      "Crowd pleaser"
    ],
    tips: "Requires excellent timing and hand strength. Practice the motion slowly first.",
    color: "orange"
  },
  {
    name: "Windmill Dunk",
    difficulty: "Advanced",
    requiredVertical: "32-38 inches",
    style: "Finesse",
    description: "Ball travels in circular windmill motion around the body before slamming.",
    technique: [
      "One-foot takeoff for hang time",
      "Start with ball at hip level",
      "Circle ball around body in fluid motion",
      "Complete rotation and slam"
    ],
    advantages: [
      "Ultimate style points",
      "Demonstrates exceptional coordination",
      "Signature move potential",
      "Contest winner"
    ],
    tips: "Requires significant hang time. Master the motion on lower rims first.",
    color: "purple"
  },
  {
    name: "360-Degree Dunk",
    difficulty: "Advanced",
    requiredVertical: "34-40 inches",
    style: "Finesse",
    description: "Full body rotation in the air while maintaining ball control.",
    technique: [
      "Approach with slight angle",
      "One-foot takeoff with rotation initiation",
      "Complete 360-degree spin in air",
      "Locate rim and slam on landing side"
    ],
    advantages: [
      "Ultimate difficulty showcase",
      "Requires elite body control",
      "Memorable highlight material",
      "Professional-level skill"
    ],
    tips: "Start with 180-degree turns. Requires exceptional spatial awareness and timing.",
    color: "red"
  },
  {
    name: "Between-the-Legs",
    difficulty: "Expert",
    requiredVertical: "36-42 inches",
    style: "Finesse",
    description: "Ball passes between legs during flight for ultimate style demonstration.",
    technique: [
      "High approach with maximum hang time",
      "Bring knees up toward chest",
      "Pass ball between legs mid-flight",
      "Catch and slam in one motion"
    ],
    advantages: [
      "Elite-level skill demonstration",
      "Exceptional coordination required",
      "Unique and memorable",
      "Professional highlight quality"
    ],
    tips: "Requires maximum vertical and perfect timing. Practice ball handling extensively.",
    color: "indigo"
  }
];

// Helper function to get dunk by name
export const getDunkByName = (name: string): DunkType | undefined => {
  return dunkTypes.find(dunk => dunk.name === name);
};

// Helper function to get dunks by difficulty
export const getDunksByDifficulty = (difficulty: DunkType['difficulty']): DunkType[] => {
  return dunkTypes.filter(dunk => dunk.difficulty === difficulty);
};

// Helper function to get dunks by style
export const getDunksByStyle = (style: DunkType['style']): DunkType[] => {
  return dunkTypes.filter(dunk => dunk.style === style);
};