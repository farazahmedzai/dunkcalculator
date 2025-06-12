import SharedFAQSection from "@/components/shared/faq-section";
import { FAQItem } from "@/components/shared/faq-data";

// Homepage-specific FAQs that complement the general ones
const homepageFAQs: FAQItem[] = [
  {
    question: "What's the average vertical jump needed to dunk?",
    answer: "For a 6-foot tall player with average proportions, you typically need a 28-30 inch vertical jump to dunk on a 10-foot rim. However, this varies significantly based on standing reach, hand size, and desired clearance.",
    category: "general"
  },
  {
    question: "How much higher can I jump with a running start?",
    answer: "Most athletes can jump 6-12 inches higher with a proper running approach compared to a standing jump. The additional momentum and optimized take-off angle contribute to this improvement.",
    category: "general"
  },
  {
    question: "Can shorter players learn to dunk?",
    answer: "Yes! While shorter players need higher vertical jumps, many athletes under 6 feet have successfully dunked through dedicated training. Spud Webb (5'7\") famously won the NBA Slam Dunk Contest in 1986.",
    category: "general"
  },
  {
    question: "How accurate is this calculator?",
    answer: "Our calculator uses scientifically validated physics formulas and provides estimates within 2-3 inches for most athletes. Individual factors like technique, coordination, and hand size can affect real-world results.",
    category: "calculator"
  },
  {
    question: "How long does it take to improve vertical jump?",
    answer: "With consistent training, most athletes see 4-8 inch improvements in 3-6 months. Beginners often see faster initial progress, while advanced athletes require more specialized training for continued gains.",
    category: "training"
  },
  {
    question: "What's the difference between standing reach and wingspan?",
    answer: "Standing reach is how high you can reach with one arm while standing flat-footed. Wingspan is the distance between your fingertips with both arms spread horizontally. Standing reach is typically 1.3x your height.",
    category: "general"
  }
];

export default function FAQSection() {
  return (
    <div id="faq" className="bg-white">
      <SharedFAQSection 
        title="Real-World Case Studies & FAQs"
        description="Common questions about dunking and vertical jump requirements"
        customFAQs={homepageFAQs}
      />
    </div>
  );
}
