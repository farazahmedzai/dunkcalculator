// Shared FAQ data to eliminate duplication across pages
export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const generalFAQs: FAQItem[] = [
  {
    question: "What's the average vertical jump needed to dunk?",
    answer: "For a 6-foot tall player with average proportions, you typically need a 28-30 inch vertical jump to dunk on a 10-foot rim. However, this varies significantly based on standing reach, hand size, and desired clearance.",
    category: "general"
  },
  {
    question: "What's the minimum height to dunk a basketball?",
    answer: "While height helps, players as short as 5'6\" have successfully dunked with exceptional vertical jump ability (36+ inches). The key factors are vertical leap, standing reach, and technique rather than height alone.",
    category: "general"
  },
  {
    question: "Can shorter players learn to dunk?",
    answer: "Yes! While shorter players need higher vertical jumps, many athletes under 6 feet have successfully dunked through dedicated training. Spud Webb (5'7\") famously won the NBA Slam Dunk Contest in 1986.",
    category: "general"
  },
  {
    question: "How much higher can I jump with a running start?",
    answer: "Most athletes can jump 6-12 inches higher with a proper running approach compared to a standing jump. The additional momentum and optimized take-off angle contribute to this improvement.",
    category: "general"
  },
  {
    question: "What's the difference between standing and approach vertical?",
    answer: "Standing vertical is jumping from a stationary position, while approach vertical includes a running start. Most people can jump 4-8 inches higher with an approach due to momentum conversion.",
    category: "general"
  },
  {
    question: "What's the difference between standing reach and wingspan?",
    answer: "Standing reach is how high you can reach with one arm while standing flat-footed. Wingspan is the distance between your fingertips with both arms spread horizontally. Standing reach is typically 1.3x your height.",
    category: "general"
  },
  {
    question: "Do I need to palm the basketball to dunk?",
    answer: "No, many successful dunkers cannot palm a basketball. Proper grip technique, momentum, and ball control through the approach allow for successful dunking without palming ability.",
    category: "technique"
  }
];

export const trainingFAQs: FAQItem[] = [
  {
    question: "Can I improve my vertical jump enough to dunk?",
    answer: "Most athletes can improve their vertical jump by 6-12 inches through dedicated training. Plyometrics, strength training, and technique work can significantly increase jumping ability over 6-12 months.",
    category: "training"
  },
  {
    question: "How long does it take to improve vertical jump?",
    answer: "With consistent training, most athletes see 4-8 inch improvements in 3-6 months. Beginners often see faster initial progress, while advanced athletes require more specialized training for continued gains.",
    category: "training"
  },
  {
    question: "How long does it take to learn to dunk?",
    answer: "Timeline varies greatly by starting ability. Athletes close to dunking (within 3-4 inches) may achieve it in 3-6 months. Those needing significant vertical improvement typically require 12-18 months of consistent training.",
    category: "training"
  },
  {
    question: "What exercises best improve vertical jump?",
    answer: "Plyometric exercises (box jumps, depth jumps), squats, deadlifts, and calf raises are most effective. Focus on explosive movements and proper landing mechanics.",
    category: "training"
  },
  {
    question: "How often should I train for vertical jump improvement?",
    answer: "3-4 times per week with adequate rest between sessions. Plyometric training requires 48-72 hours recovery between intense sessions to prevent injury and allow adaptation.",
    category: "training"
  },
  {
    question: "Should I lose weight to jump higher?",
    answer: "Reducing excess body fat while maintaining muscle mass typically improves vertical jump. However, losing muscle mass will decrease jumping ability. Focus on strength-to-weight ratio optimization.",
    category: "training"
  }
];

export const calculatorFAQs: FAQItem[] = [
  {
    question: "How accurate is this dunk calculator?",
    answer: "Our calculator uses physics-based formulas considering height, standing reach, vertical jump, and rim clearance. It provides realistic estimates within 2-3 inches for most athletes, though individual technique and hand size can affect results.",
    category: "calculator"
  }
];

export const techniqueFAQs: FAQItem[] = [
  {
    question: "One-foot or two-foot takeoff for dunking?",
    answer: "Two-foot takeoffs generally produce higher maximum height and more control, ideal for power dunks. One-foot takeoffs allow for more momentum and are better for finesse dunks and windmills.",
    category: "technique"
  },
  {
    question: "What's the best approach angle for dunking?",
    answer: "A slight angle (15-30 degrees) from straight-on allows for optimal momentum conversion while maintaining accuracy. Straight-on approaches work for power dunks, while wider angles suit finesse moves.",
    category: "technique"
  },
  {
    question: "How do I time my jump perfectly?",
    answer: "Practice the approach rhythm consistently. Most dunkers use a 3-4 step approach with the penultimate step being longest, followed by a quick plant and explosive takeoff.",
    category: "technique"
  }
];

// Helper function to get FAQs by category
export const getFAQsByCategory = (category: string): FAQItem[] => {
  const allFAQs = [...generalFAQs, ...trainingFAQs, ...calculatorFAQs, ...techniqueFAQs];
  return allFAQs.filter(faq => faq.category === category);
};

// Helper function to get all FAQs
export const getAllFAQs = (): FAQItem[] => {
  return [...generalFAQs, ...trainingFAQs, ...calculatorFAQs, ...techniqueFAQs];
};