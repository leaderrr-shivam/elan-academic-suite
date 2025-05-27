
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TermsConditions = () => {
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
              Terms & Conditions
            </h1>
            <p className="text-slate-600 text-lg">
              Last updated: January 2025
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Acceptance of Terms</h2>
              <p className="text-slate-700 mb-6">
                By accessing and using EduElan's services, you accept and agree to be bound by the 
                terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Service Description</h2>
              <p className="text-slate-700 mb-4">
                EduElan provides academic assistance services including:
              </p>
              <ul className="list-disc pl-6 text-slate-700 mb-6 space-y-2">
                <li>Major Project Report creation and documentation</li>
                <li>Assignment solutions and academic support</li>
                <li>Viva preparation materials and guidance</li>
                <li>Guide arrangement services (where applicable)</li>
                <li>Academic consultation and support</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Terms</h2>
              <ul className="list-disc pl-6 text-slate-700 mb-6 space-y-2">
                <li>All payments must be made in full before service delivery begins</li>
                <li>Prices are subject to change without prior notice</li>
                <li>All transactions are processed securely through our payment partners</li>
                <li>No refunds will be issued after payment completion</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Delivery Terms</h2>
              <ul className="list-disc pl-6 text-slate-700 mb-6 space-y-2">
                <li>Standard delivery time is 48-72 hours after successful payment</li>
                <li>Delivery times may vary based on project complexity and requirements</li>
                <li>All deliverables will be provided in the specified digital formats</li>
                <li>We are not responsible for delays caused by technical issues beyond our control</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">User Responsibilities</h2>
              <ul className="list-disc pl-6 text-slate-700 mb-6 space-y-2">
                <li>Provide accurate and complete information for service requirements</li>
                <li>Use our services in accordance with academic integrity policies</li>
                <li>Maintain confidentiality of login credentials and account information</li>
                <li>Report any issues or concerns promptly to our support team</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
              <p className="text-slate-700 mb-6">
                Upon full payment, you receive rights to use the delivered academic content for your 
                personal academic purposes. However, the underlying methodologies, templates, and 
                proprietary processes remain the intellectual property of EduElan.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
              <p className="text-slate-700 mb-6">
                EduElan provides academic assistance services and cannot guarantee specific academic 
                outcomes or grades. Our liability is limited to the amount paid for our services.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Modifications</h2>
              <p className="text-slate-700 mb-6">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting on our website.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
              <p className="text-slate-700">
                For questions about these Terms & Conditions, please contact us:
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

export default TermsConditions;
