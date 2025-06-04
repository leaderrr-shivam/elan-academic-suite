
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
              Disclaimer
            </h1>
            <p className="text-slate-600 text-lg">
              Last updated: January 2025
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-6 mb-8 border-l-4 border-amber-500">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">Portfolio Demonstration</h3>
                <p className="text-amber-800 font-medium">
                  EduAssist Pro is a demonstration project built for portfolio purposes to showcase full-stack development capabilities and enterprise-level security implementation.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">General Disclaimer</h2>
              <p className="text-slate-700 mb-6">
                The information contained on this website and the services displayed by EduAssist Pro are for 
                demonstration and portfolio purposes only. This is a showcase project designed to demonstrate 
                technical capabilities in full-stack development, security implementation, and modern web technologies.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Educational Demonstration</h2>
              <p className="text-slate-700 mb-6">
                This platform serves as a demonstration of academic service platform development and is not 
                intended for actual commercial use. All pricing, services, and features shown are simulated 
                for demonstration purposes.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">No University Affiliation</h2>
              <p className="text-slate-700 mb-6">
                EduAssist Pro is not affiliated with, endorsed by, or connected to any educational institution. 
                This is an independent demonstration project showcasing technical development skills and 
                enterprise-level application architecture.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Technical Demonstration</h2>
              <p className="text-slate-700 mb-6">
                This project demonstrates various technical concepts including but not limited to: React development, 
                TypeScript implementation, Supabase integration, enterprise security measures, database design, 
                authentication systems, and responsive web design.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Portfolio Purpose</h2>
              <p className="text-slate-700 mb-6">
                This application has been developed as a portfolio piece to showcase full-stack development 
                capabilities, security implementation, and modern web development practices to potential 
                employers and collaborators.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">No Actual Services</h2>
              <p className="text-slate-700 mb-6">
                While the platform demonstrates a complete academic services marketplace, no actual academic 
                services are provided. All content, pricing, and service descriptions are for demonstration 
                purposes only.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Technical Architecture</h2>
              <p className="text-slate-700 mb-6">
                The platform showcases enterprise-grade security features, database design principles, 
                user authentication, payment flow simulation, and administrative interfaces as technical 
                demonstrations of development capabilities.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
              <p className="text-slate-700">
                For questions about this demonstration project or to discuss development opportunities:
                <br />
                Email: <a href="mailto:demo@eduassistpro.com" className="text-blue-600 hover:text-blue-800">demo@eduassistpro.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
