import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { FAQItem, generalFAQs, getFAQsByCategory } from "./faq-data";

interface FAQSectionProps {
  title?: string;
  description?: string;
  category?: string;
  customFAQs?: FAQItem[];
  maxItems?: number;
}

export default function FAQSection({ 
  title = "Frequently Asked Questions",
  description = "Get answers to common questions about dunking and vertical jump training",
  category,
  customFAQs,
  maxItems
}: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  // Determine which FAQs to display
  let faqsToShow: FAQItem[];
  if (customFAQs) {
    faqsToShow = customFAQs;
  } else if (category) {
    faqsToShow = getFAQsByCategory(category);
  } else {
    faqsToShow = generalFAQs;
  }

  // Limit items if maxItems is specified
  if (maxItems) {
    faqsToShow = faqsToShow.slice(0, maxItems);
  }

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-basketball-orange mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          </div>
          <p className="text-xl text-gray-600">{description}</p>
        </div>

        <div className="space-y-4">
          {faqsToShow.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-3">
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left p-0 h-auto font-semibold text-lg"
                  onClick={() => toggleItem(index)}
                >
                  <span className="pr-4">{faq.question}</span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-basketball-orange flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-basketball-orange flex-shrink-0" />
                  )}
                </Button>
              </CardHeader>
              {openItems.includes(index) && (
                <CardContent className="pt-0">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}