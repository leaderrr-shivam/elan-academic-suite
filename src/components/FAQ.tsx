
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "What services do you provide?",
      answer: "We provide comprehensive academic solutions including Major Project Reports (with or without guide arrangement), Assignment Packages, Professional Guide Services, and Plagiarism-Free Content. All our services are designed to help university students excel in their academic journey."
    },
    {
      question: "How much do your services cost?",
      answer: "Our pricing is transparent and competitive: Major Project without Guide: ₹7,999, Major Project with Guide: ₹10,999, Assignment Packages: ₹499 per subject. We offer significant discounts from our original pricing to make quality education accessible."
    },
    {
      question: "What is your delivery timeline?",
      answer: "We guarantee 24-hour delivery for all our services. This includes complete project reports, assignment solutions, and all accompanying materials. Rush delivery options are available for urgent requirements."
    },
    {
      question: "Is the content original and plagiarism-free?",
      answer: "Absolutely! All our content is 100% original and plagiarism-free. We provide comprehensive plagiarism reports with every delivery to ensure academic integrity. Our expert team creates fresh, unique content tailored to your specific requirements."
    },
    {
      question: "What does the 'With Guide' service include?",
      answer: "Our 'With Guide' service includes everything from the standard package plus: Professional faculty mentor arrangement, Direct communication setup with your assigned guide, Guide coordination and meeting facilitation, Official guide approval documentation, and Priority support throughout the process."
    },
    {
      question: "What subjects and courses do you cover?",
      answer: "We cover a wide range of computer science and technology subjects including Data Analytics, Software Engineering, Web Development, Database Management, Machine Learning, and many more. Our expert team has experience across various university curricula and academic standards."
    },
    {
      question: "How do I make payment and is it secure?",
      answer: "We offer multiple secure payment options including UPI, Bank Transfer, and Digital Wallets. Our platform uses enterprise-grade security with encrypted transactions. You'll receive instant confirmation and order tracking details after successful payment."
    },
    {
      question: "What if I need revisions or have specific requirements?",
      answer: "We offer multiple revisions to ensure your complete satisfaction. For the 'With Guide' package, revisions are unlimited. Our team works closely with you to understand your specific requirements and university guidelines to deliver exactly what you need."
    },
    {
      question: "Do you provide support after delivery?",
      answer: "Yes! We provide comprehensive post-delivery support including viva preparation assistance, clarifications on project content, and technical support. Our 24/7 customer support team is always available to help you succeed."
    },
    {
      question: "Are your services confidential and secure?",
      answer: "Your privacy and data security are our top priorities. We maintain strict confidentiality of all client information, use enterprise-grade encryption for data protection, and follow GDPR compliance standards. Your academic journey remains completely private and secure."
    }
  ];

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Get answers to common questions about our academic services
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-slate-50 rounded-lg border border-slate-200 px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
