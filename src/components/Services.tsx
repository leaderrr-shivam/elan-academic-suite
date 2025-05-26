
import { Button } from "@/components/ui/button";
import { Check, Calendar, User, ShoppingCart } from "lucide-react";

export const Services = () => {
  const handleAddToCart = (product: string, price: number) => {
    console.log(`Adding ${product} to cart for ₹${price}`);
    // Cart functionality will be implemented
  };

  const handleBuyNow = (product: string, price: number) => {
    console.log(`Buy now ${product} for ₹${price}`);
    // Direct checkout functionality will be implemented
  };

  return (
    <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Major Project Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
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

        {/* Two Project Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Without Guide Option */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border border-slate-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                56% OFF
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                POPULAR CHOICE
              </span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Major Project (Without Guide)
            </h3>
            <p className="text-slate-600 mb-6">
              Complete Major Project Report + Viva Solutions for Final Year Submission
            </p>
            
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-4xl font-bold text-slate-900">₹3,499</span>
              <span className="text-2xl text-slate-500 line-through">₹7,999</span>
            </div>
            <p className="text-green-600 font-medium mb-8">Save ₹4,500 • Limited Time Offer</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-slate-600 font-medium">48-72 Hours</p>
                <p className="text-xs text-slate-500">After Payment</p>
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
            
            <div className="space-y-3 mb-8">
              <Button 
                onClick={() => handleBuyNow("Major Project (Without Guide)", 3499)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 text-lg rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Buy Now - ₹3,499
              </Button>
              <Button 
                onClick={() => handleAddToCart("Major Project (Without Guide)", 3499)}
                variant="outline"
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-4 text-lg rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-slate-900 mb-4">What's Included:</h4>
              <div className="space-y-3">
                {[
                  "Complete Major Project Report (100-150 pages)",
                  "Strictly follows Amity University Online guidelines", 
                  "Original, plagiarism-free content with proper citations",
                  "Professional formatting as per university standards",
                  "Comprehensive viva questions and detailed answers",
                  "Delivery in both .docx and .pdf formats",
                  "Technical documentation and code (if applicable)",
                  "Abstract, literature review, methodology & conclusion",
                  "Ready for submission to AMIGO LMS"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl border-l-4 border-orange-500">
              <div className="flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <h5 className="font-bold text-orange-900 mb-1">Note:</h5>
                  <p className="text-orange-800 text-sm">
                    You need to arrange your own project guide/faculty mentor.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* With Guide Option */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 border-2 border-gradient-to-r from-gold-400 to-yellow-600 hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-gold-500 text-white px-4 py-2 text-sm font-bold">
              PREMIUM
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-gradient-to-r from-yellow-100 to-gold-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                31% OFF
              </span>
              <span className="bg-gradient-to-r from-gold-500 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                COMPLETE SOLUTION
              </span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Major Project (With Guide)
            </h3>
            <p className="text-slate-600 mb-6">
              Complete Major Project Report + Professional Guide Arrangement + Viva Solutions
            </p>
            
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-4xl font-bold text-slate-900">₹5,499</span>
              <span className="text-2xl text-slate-500 line-through">₹7,999</span>
            </div>
            <p className="text-green-600 font-medium mb-8">Save ₹2,500 • Complete Package</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-slate-600 font-medium">48-72 Hours</p>
                <p className="text-xs text-slate-500">After Payment</p>
              </div>
              <div className="text-center">
                <Check className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-slate-600 font-medium">Guide Included</p>
                <p className="text-xs text-slate-500">Professional Mentor</p>
              </div>
              <div className="text-center">
                <User className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                <p className="text-sm text-slate-600 font-medium">Expert Support</p>
                <p className="text-xs text-slate-500">End-to-End</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-8">
              <Button 
                onClick={() => handleBuyNow("Major Project (With Guide)", 5499)}
                className="w-full bg-gradient-to-r from-gold-500 to-yellow-600 hover:from-gold-600 hover:to-yellow-700 text-white py-4 text-lg rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Buy Now - ₹5,499
              </Button>
              <Button 
                onClick={() => handleAddToCart("Major Project (With Guide)", 5499)}
                variant="outline"
                className="w-full border-2 border-gold-500 text-gold-600 hover:bg-gold-50 py-4 text-lg rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            <div className="bg-gradient-to-br from-gold-50 to-yellow-50 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-slate-900 mb-4">Premium Includes Everything + :</h4>
              <div className="space-y-3">
                {[
                  "✨ Professional Guide/Faculty Mentor Arrangement",
                  "🎯 Direct Communication with Assigned Guide",
                  "📞 Guide Coordination & Meeting Setup",
                  "💼 Professional Guide Approval Documentation",
                  "🚀 Priority Support & Faster Delivery",
                  "🔥 Guaranteed Guide Acceptance",
                  "All features from standard package included"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
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
            
            <div className="space-y-3">
              <Button 
                onClick={() => handleBuyNow("Intelligent Game Design Pack", 499)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Buy Now - ₹499
              </Button>
              <Button 
                onClick={() => handleAddToCart("Intelligent Game Design Pack", 499)}
                variant="outline"
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Design Thinking Pack */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
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
            
            <div className="space-y-3">
              <Button 
                onClick={() => handleBuyNow("Design Thinking Pack", 499)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Buy Now - ₹499
              </Button>
              <Button 
                onClick={() => handleAddToCart("Design Thinking Pack", 499)}
                variant="outline"
                className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
