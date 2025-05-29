
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Assignment Pack",
      price: "₹499",
      description: "Perfect for individual assignments",
      features: [
        "Single assignment solution",
        "Plagiarism-free content",
        "24 hour delivery",
        "Email support"
      ]
    },
    {
      name: "Major Project (Without Guide)",
      price: "₹7,999",
      description: "Complete project with documentation",
      features: [
        "Full project development",
        "Complete documentation",
        "Viva preparation materials",
        "Technical support",
        "24 hour delivery",
        "Multiple revisions"
      ],
      popular: true
    },
    {
      name: "Major Project (With Guide)",
      price: "₹10,999",
      description: "Complete solution with guide arrangement",
      features: [
        "All features from standard package",
        "Professional guide arrangement",
        "Direct guide communication",
        "Guide approval documentation",
        "Priority support",
        "24 hour delivery",
        "Unlimited revisions"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Transparent Pricing
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose the perfect plan for your academic needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:scale-105 ${
                  plan.popular ? 'border-blue-500 relative' : 'border-slate-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                  <p className="text-slate-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                  Get Started
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

export default Pricing;
