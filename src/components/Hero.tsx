
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <div className="inline-block mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-200/30">
              ✨ Premium Academic Solutions
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight animate-fade-in delay-200">
            Professional Academic Solutions for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              BCA Data Analytics Students
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
            Expert-crafted assignments and major projects tailored for Amity University Online BCA Data Analytics students. 
            Guaranteed results, professional quality, and timely delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in delay-400">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('services')}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Explore Our Academic Solutions
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => scrollToSection('testimonials')}
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              View Success Stories
            </Button>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in delay-500">
            <div className="flex items-center justify-center mb-4">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-slate-700 font-medium">Trusted by 1000+ BCA Data Analytics students nationwide</span>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-slate-600">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-slate-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">48-72hrs</div>
                <div className="text-sm text-slate-600">Fast Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
