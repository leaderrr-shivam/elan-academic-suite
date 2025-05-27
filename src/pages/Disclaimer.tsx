
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const Disclaimer = () => {
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
                <h3 className="text-xl font-bold text-amber-900 mb-2">Important Notice</h3>
                <p className="text-amber-800 font-medium">
                  EduElan is an independent service provider and is not affiliated with Amity University or any other educational institution.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">General Disclaimer</h2>
              <p className="text-slate-700 mb-6">
                The information contained on this website and the services provided by EduElan are for 
                general information and educational assistance purposes only. While we strive to provide 
                accurate and up-to-date information, we make no representations or warranties of any kind, 
                express or implied, about the completeness, accuracy, reliability, suitability, or availability.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Educational Use</h2>
              <p className="text-slate-700 mb-6">
                Our services are intended to be used as reference materials and study aids. Students are 
                responsible for ensuring that their use of our materials complies with their institution's 
                academic integrity policies and guidelines.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">No University Affiliation</h2>
              <p className="text-slate-700 mb-6">
                EduElan is not affiliated with, endorsed by, or connected to Amity University Online, 
                Amity University, or any other educational institution mentioned on this website. We are 
                an independent service provider offering academic assistance.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">No Guarantee of Grades</h2>
              <p className="text-slate-700 mb-6">
                While we provide high-quality academic assistance, we cannot guarantee specific grades, 
                marks, or academic outcomes. Final evaluation and grading are entirely at the discretion 
                of your educational institution and instructors.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Guide Arrangement</h2>
              <p className="text-slate-700 mb-6">
                For services that include guide arrangement, we facilitate connections with potential 
                academic guides but cannot guarantee guide acceptance or availability. The final 
                approval and working relationship with any guide is between the student and the guide.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Technical Issues</h2>
              <p className="text-slate-700 mb-6">
                We strive to maintain our website and services but cannot guarantee uninterrupted access. 
                We are not liable for any technical issues, downtime, or data loss that may occur.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">External Links</h2>
              <p className="text-slate-700 mb-6">
                Our website may contain links to external sites. We have no control over and assume no 
                responsibility for the content, privacy policies, or practices of any third-party sites.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to Services</h2>
              <p className="text-slate-700 mb-6">
                We reserve the right to modify, suspend, or discontinue any aspect of our services at 
                any time without prior notice.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
              <p className="text-slate-700">
                If you have any questions about this disclaimer, please contact us:
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

export default Disclaimer;
