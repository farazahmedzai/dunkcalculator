import SharedFAQSection from "@/components/shared/faq-section";

export default function FAQSection() {
  return (
    <div id="faq" className="bg-white">
      <SharedFAQSection 
        title="Real-World Case Studies & FAQs"
        description="Common questions about dunking and vertical jump requirements"
        maxItems={8}
      />
    </div>
  );
}
