
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, FileText, Users, Award, Clock } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <BookOpen className="w-12 h-12 text-blue-600" />,
      title: "Assignment Solutions",
      description: "Complete, original solutions for all your academic assignments with proper formatting and documentation.",
      features: ["Plagiarism-free content", "Proper citations", "Multiple formats"]
    },
    {
      icon: <Code className="w-12 h-12 text-blue-600" />,
      title: "Major Projects",
      description: "Full-scale project development with complete source code, documentation, and presentation materials.",
      features: ["Complete source code", "Technical documentation", "Viva preparation"]
    },
    {
      icon: <FileText className="w-12 h-12 text-blue-600" />,
      title: "Research Papers",
      description: "Well-researched academic papers with proper methodology, analysis, and scholarly references.",
      features: ["Scholarly research", "Proper methodology", "Academic formatting"]
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Group Projects",
      description: "Collaborative project solutions designed for team submissions with individual contribution tracking.",
      features: ["Team coordination", "Individual sections", "Unified presentation"]
    },
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: "Thesis Support",
      description: "Comprehensive thesis writing support including research, analysis, and academic writing assistance.",
      features: ["Research assistance", "Data analysis", "Academic writing"]
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: "Rush Orders",
      description: "Expedited delivery for urgent assignments without compromising on quality or academic standards.",
      features: ["24-48 hour delivery", "Priority support", "Quality guarantee"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive academic support services designed to help you excel in your studies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-slate-700 flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
