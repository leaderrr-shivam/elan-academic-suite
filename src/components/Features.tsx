
import { FileText, User, Calendar, Check } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Ready-to-Submit Assignments",
      description: "Well-researched, plagiarism-free assignments that meet all BCA Data Analytics requirements.",
    },
    {
      icon: User,
      title: "Comprehensive Coverage", 
      description: "Solutions for all BCA Data Analytics subjects across all semesters.",
    },
    {
      icon: Check,
      title: "Premium Quality",
      description: "Crafted by experts with years of experience in data analytics and academics.",
    },
    {
      icon: Calendar,
      title: "On-Time Delivery",
      description: "Never miss a deadline with our prompt delivery system.",
    },
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              Our Advantages
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Why Choose Our BCA Data Analytics Solutions
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We provide premium quality assignments and projects that help you excel in your BCA Data Analytics journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 hover:shadow-lg transition-all duration-300 border border-slate-100"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
