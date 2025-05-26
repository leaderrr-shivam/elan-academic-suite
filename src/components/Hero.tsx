
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Hero = () => {
  return (
    <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              Premium Academic Solutions
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Professional Academic Solutions for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              BCA Data Analytics Students
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Expert-crafted assignments and major projects tailored for Amity University Online BCA Data Analytics students. 
            Guaranteed results, professional quality, and timely delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Our Academic Solutions
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg rounded-xl"
            >
              View Success Stories
            </Button>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-slate-200 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-slate-700 font-medium">Trusted by 1000+ BCA Data Analytics students nationwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
