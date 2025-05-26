import { Button } from "@/components/ui/button";
import { Check, Calendar, User } from "lucide-react";

export const Services = () => {
  return (
    <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Major Project Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium">
              FINAL YEAR SPECIAL
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Amity Online Final Year UG Major Project
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
            Get your complete Major Project Report professionally crafted by experts, following all Amity University Online guidelines with guaranteed submission success.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  38% OFF
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                  PREMIUM PROJECT
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Amity Online Final Year UG Major Project
              </h3>
              <p className="text-slate-600 mb-6">
                Complete Major Project Report + Viva Solutions for Final Year Submission
              </p>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-slate-900">₹4999</span>
                <span className="text-2xl text-slate-500 line-through">₹7999</span>
              </div>
              
              <p className="text-green-600 font-medium mb-8">Save ₹3000 • Limited Time Offer</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm text-slate-600 font-medium">24-48 Hours</p>
                  <p className="text-xs text-slate-500">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <Check className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="text-sm text-slate-600 font-medium">100% Original</p>
                  <p className="text-xs text-slate-500">Plagiarism Free</p>
                </div>
                <div className="text-center">
                  <User className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                  <p className="text-sm text-slate-600 font-medium">Expert Written</p>
                  <p className="text-xs text-slate-500">Professional Quality</p>
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 text-lg rounded-xl">
                Get Your Major Project - ₹4999
              </Button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h4 className="text-lg font-bold text-slate-900 mb-6">What's Included in Your Project Pack:</h4>
              <div className="space-y-4">
                {[
                  "Complete Major Project Report (100-150 pages)",
                  "Strictly follows Amity University Online guidelines", 
                  "Original, plagiarism-free content with proper citations",
                  "Professional formatting as per university standards",
                  "Comprehensive viva questions and detailed answers",
                  "Delivery in both .docx and .pdf formats",
                  "24-48 hours delivery after payment",
                  "Technical documentation and code (if applicable)",
                  "Abstract, literature review, methodology & conclusion",
                  "Ready for submission to AMIGO LMS"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl border-l-4 border-blue-600">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h5 className="font-bold text-blue-900 mb-2">Important Note:</h5>
                <p className="text-blue-800">
                  <strong>Project Guide:</strong> You need to arrange your own project guide/faculty mentor. We handle complete report creation only.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Assignment Packs Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            BCA Data Analytics - Semester 6 Assignment Packs
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Complete assignment packs for Semester 6 subjects with guaranteed 10/10 marks on all assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Intelligent Game Design Pack */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                41% OFF
              </span>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                POPULAR
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Intelligent Game Design - Full Assignment Pack
            </h3>
            <p className="text-slate-600 mb-6">
              Complete pack with all 3 assessments (FA1, FA2, FA3)
            </p>
            
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-3xl font-bold text-slate-900">₹499</span>
              <span className="text-xl text-slate-500 line-through">₹849</span>
            </div>
            <p className="text-green-600 font-medium mb-6">Save ₹350</p>
            
            <div className="space-y-3 mb-8">
              {[
                "Formative Assessment 1 - 10/10 marks guaranteed",
                "Formative Assessment 2 - 10/10 marks guaranteed", 
                "Formative Assessment 3 - 10/10 marks guaranteed",
                "100% original content",
                "Instant download after payment"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
            
            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl">
              Add to Cart - ₹499
            </Button>
          </div>

          {/* Design Thinking Pack */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                41% OFF
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Design Thinking - Full Assignment Pack
            </h3>
            <p className="text-slate-600 mb-6">
              Complete pack with all 3 assessments (FA1, FA2, FA3)
            </p>
            
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-3xl font-bold text-slate-900">₹499</span>
              <span className="text-xl text-slate-500 line-through">₹849</span>
            </div>
            <p className="text-green-600 font-medium mb-6">Save ₹350</p>
            
            <div className="space-y-3 mb-8">
              {[
                "Formative Assessment 1 - 10/10 marks guaranteed",
                "Formative Assessment 2 - 10/10 marks guaranteed",
                "Formative Assessment 3 - 10/10 marks guaranteed", 
                "100% original content",
                "Instant download after payment"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
            
            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl">
              Add to Cart - ₹499
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
