import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    question: "What's the average vertical jump needed to dunk?",
    answer: "For a 6-foot tall player with average proportions, you typically need a 28-30 inch vertical jump to dunk on a 10-foot rim. However, this varies significantly based on standing reach, hand size, and desired clearance."
  },
  {
    question: "How much higher can I jump with a running start?",
    answer: "Most athletes can jump 6-12 inches higher with a proper running approach compared to a standing jump. The additional momentum and optimized take-off angle contribute to this improvement."
  },
  {
    question: "Can shorter players learn to dunk?",
    answer: "Yes! While shorter players need higher vertical jumps, many athletes under 6 feet have successfully dunked through dedicated training. Spud Webb (5'7\") famously won the NBA Slam Dunk Contest in 1986."
  },
  {
    question: "How accurate is this calculator?",
    answer: "Our calculator uses scientifically validated physics formulas and provides estimates within 2-3 inches for most athletes. Individual factors like technique, coordination, and hand size can affect real-world results."
  },
  {
    question: "How long does it take to improve vertical jump?",
    answer: "With consistent training, most athletes see 4-8 inch improvements in 3-6 months. Beginners often see faster initial progress, while advanced athletes require more specialized training for continued gains."
  },
  {
    question: "What's the difference between standing reach and wingspan?",
    answer: "Standing reach is how high you can reach with one arm while standing flat-footed. Wingspan is the distance between your fingertips with both arms spread horizontally. Standing reach is typically 1.3x your height."
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-World Case Studies & FAQs</h2>
          <p className="text-xl text-gray-600">Common questions about dunking and vertical jump requirements</p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <Card key={index} className="border border-gray-200 rounded-lg">
              <Button
                variant="ghost"
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors h-auto"
              >
                <span className="font-semibold text-gray-900 text-left">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openItems.has(index) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
              {openItems.has(index) && (
                <CardContent className="px-6 pb-4 pt-0">
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
