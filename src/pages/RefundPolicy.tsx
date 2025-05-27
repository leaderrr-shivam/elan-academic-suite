
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              className="mb-4 hover:scale-105 transition-transform duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Refund Policy
            </h1>
            <p className="text-slate-600 text-lg">
              Last updated: January 2025
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-6 mb-8 border-l-4 border-red-500">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-2">Important Notice</h3>
                <p className="text-red-800 font-medium">
                  NO REFUNDS will be issued after payment completion. Please read this policy carefully before making any purchase.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">No Refund Policy</h2>
              <p className="text-slate-700 mb-6">
                All sales are final. Once payment is completed for any of our services including Major Project 
                Reports, Assignment Packs, or Guide Arrangement services, no refunds will be provided under any circumstances.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Why No Refunds?</h2>
              <ul className="list-disc pl-6 text-slate-700 mb-6 space-y-2">
                <li>Our services involve custom academic work that begins immediately after payment</li>
                <li>Digital products are delivered instantly and cannot be returned</li>
                <li>Academic content is tailored specifically for each student's requirements</li>
                <li>Professional time and resources are allocated upon payment confirmation</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Quality Assurance</h2>
              <p className="text-slate-700 mb-6">
                While we maintain a strict no-refund policy, we guarantee the quality of our work. 
                All deliverables meet the specified requirements and academic standards. We ensure:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-6 space-y-2">
                <li>100% original and plagiarism-free content</li>
                <li>Adherence to university guidelines and formatting</li>
                <li>Timely delivery as promised</li>
                <li>Professional quality that meets academic standards</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Before You Purchase</h2>
              <p className="text-slate-700 mb-6">
                Please ensure you:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-6 space-y-2">
                <li>Carefully review the service description and deliverables</li>
                <li>Understand the delivery timeframe (48-72 hours after payment)</li>
                <li>Confirm your requirements and specifications</li>
                <li>Accept our terms and conditions before payment</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Support & Clarifications</h2>
              <p className="text-slate-700 mb-6">
                If you have any questions about our services or need clarifications before purchase, 
                please contact our support team. We are here to help you make an informed decision.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
              <p className="text-slate-700">
                For any questions or concerns, please reach out to us:
                <br />
                Email: <a href="mailto:support@eduelan.com" className="text-blue-600 hover:text-blue-800">support@eduelan.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RefundPolicy;
