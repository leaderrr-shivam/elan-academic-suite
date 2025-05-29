
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's included in the Major Project package for ₹7,999?",
      answer: "The Major Project (Without Guide) package includes a complete 100-150 page report, professional formatting as per Amity University Online guidelines, comprehensive viva questions with detailed answers, technical documentation and code (if applicable), abstract, literature review, methodology & conclusion, and delivery in both .docx and .pdf formats. All content is 100% original and plagiarism-free with 24-hour delivery. This is your smartest investment in academic success!"
    },
    {
      question: "What's the difference between ₹7,999 and ₹10,999 Major Project packages?",
      answer: "The ₹7,999 package includes the complete project report and viva solutions - you arrange your own guide. The ₹10,999 Premium package includes everything PLUS professional guide arrangement, direct communication with assigned faculty mentor, guide coordination, approval documentation, and guaranteed guide acceptance. It's a complete end-to-end solution for your academic success with 24-hour delivery."
    },
    {
      question: "How quickly will I receive my Major Project report?",
      answer: "We deliver Major Project reports within 24 hours after payment confirmation. Our expert team works efficiently to ensure you receive high-quality, submission-ready work within the promised timeframe. Your academic success is our priority, and we never compromise on quality for speed."
    },
    {
      question: "Are the assignment packs guaranteed for 10/10 marks?",
      answer: "Absolutely! All our assignment packs for ₹499 each are crafted by experts who understand Amity University's evaluation criteria inside out. We guarantee perfect 10/10 marks on each formative assessment. This is not just academic support - it's your pathway to excellent grades and career success."
    },
    {
      question: "Is the content 100% original and plagiarism-free?",
      answer: "Yes! Every piece of content is created from scratch by our expert team with years of experience in academic writing. We ensure zero plagiarism and provide proper citations where required. Each project and assignment is unique, tailored to meet Amity University's standards, and designed to showcase your academic excellence."
    },
    {
      question: "How does the guide arrangement work in the ₹10,999 package?",
      answer: "Our Premium package includes professional guide arrangement where we connect you with qualified faculty mentors who are familiar with Amity University's requirements. We handle all coordination, set up direct communication channels, provide approval documentation, and guarantee guide acceptance. This eliminates the stress of finding and convincing a guide yourself."
    },
    {
      question: "What subjects do you cover for BCA Data Analytics?",
      answer: "We provide comprehensive coverage for all BCA Data Analytics subjects across all semesters. Our specialty includes Semester 6 subjects like Intelligent Game Design and Design Thinking (₹499 each), along with Major Project reports for final year students. Every solution is crafted to ensure your academic success and career advancement."
    },
    {
      question: "Why should I invest in EduElan's services?",
      answer: "Investing in EduElan means investing in your future. Our services ensure you graduate with excellent grades, save countless hours of stress, and get professionally crafted content that meets industry standards. With our guaranteed results, expert support, fast 24-hour delivery, and affordable pricing, you're not just buying assignments - you're securing your academic success and career prospects."
    }
  ];

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              Your Success Questions Answered
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to know about investing in your academic success with our BCA Data Analytics solutions
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

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Invest in Your Success?</h3>
            <p className="text-slate-600 mb-6">
              Join thousands of students who have secured their academic future with EduElan. 
              Your success story starts with the right investment in quality education support.
            </p>
            <Button 
              onClick={() => {
                const element = document.getElementById('services');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Start Your Success Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
