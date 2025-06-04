
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const navHeight = 80;
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleViewServices = () => {
    navigate('/services');
  };

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8 animate-fade-in">
            <Shield className="w-4 h-4 mr-2" />
            Enterprise-Grade Security & Quality Assurance
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 animate-fade-in">
            Premium Academic
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 block">
              Solutions Platform
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-12 animate-fade-in">
            Professional academic support for university students worldwide. Get your major projects, assignments, and academic guidance with guaranteed quality and 24-hour delivery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
            <Button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              onClick={handleViewServices}
              variant="outline" 
              className="border-2 border-slate-300 hover:border-blue-500 text-slate-700 hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              View Services
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-3 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="text-left">
                <div className="font-semibold text-slate-900">100% Original</div>
                <div className="text-sm text-slate-600">Plagiarism-free content</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200">
              <Clock className="w-8 h-8 text-blue-500" />
              <div className="text-left">
                <div className="font-semibold text-slate-900">24 Hour Delivery</div>
                <div className="text-sm text-slate-600">Guaranteed fast turnaround</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-200">
              <Shield className="w-8 h-8 text-purple-500" />
              <div className="text-left">
                <div className="font-semibold text-slate-900">Secure Platform</div>
                <div className="text-sm text-slate-600">Enterprise-grade security</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
