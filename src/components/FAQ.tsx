
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's included in the Major Project package for ₹4999?",
      answer: "The Major Project package includes a complete 100-150 page report, professional formatting as per Amity University Online guidelines, comprehensive viva questions with detailed answers, technical documentation and code (if applicable), abstract, literature review, methodology & conclusion, and delivery in both .docx and .pdf formats. All content is 100% original and plagiarism-free."
    },
    {
      question: "How quickly will I receive my Major Project report?",
      answer: "We deliver Major Project reports within 24-48 hours after payment confirmation. Our expert team works efficiently to ensure you receive high-quality work within the promised timeframe without compromising on quality."
    },
    {
      question: "Are the assignment packs guaranteed for 10/10 marks?",
      answer: "Yes, all our assignment packs are crafted to ensure you get perfect 10/10 marks on each formative assessment. Our expert team has years of experience with Amity University's evaluation criteria and creates content that meets all requirements for maximum scores."
    },
    {
      question: "Do you provide project guides or faculty mentors?",
      answer: "No, we handle complete report creation only. You need to arrange your own project guide/faculty mentor as per university requirements. We focus on delivering professionally crafted reports that meet all academic standards."
    },
    {
      question: "Is the content original and plagiarism-free?",
      answer: "Absolutely! All our content is 100% original and created from scratch by our expert team. We ensure zero plagiarism and provide proper citations where required. Each project and assignment is unique and tailored to specific requirements."
    },
    {
      question: "What subjects do you cover for BCA Data Analytics?",
      answer: "We provide comprehensive coverage for all BCA Data Analytics subjects across all semesters. Currently, we specialize in Semester 6 subjects like Intelligent Game Design and Design Thinking, along with Major Project reports for final year students."
    }
  ];

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              Student Success Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to know about our BCA Data Analytics academic solutions
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-slate-500 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
