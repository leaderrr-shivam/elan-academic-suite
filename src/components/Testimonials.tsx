
export const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahul M.",
      role: "BCA Data Analytics Final Year",
      content: "Got my Major Project report in just 2 days! Perfectly formatted according to Amity guidelines and scored excellent grades. The viva questions were spot-on!",
      rating: "Major Project",
      initial: "R"
    },
    {
      name: "Priya S.", 
      role: "BCA Data Analytics Student",
      content: "The Intelligent Game Design assignment pack was amazing! Scored 10/10 in all three assessments. Worth every penny for the quality provided.",
      rating: "Assignment Pack",
      initial: "P"
    },
    {
      name: "Amit K.",
      role: "BCA Data Analytics Graduate", 
      content: "Used their Major Project service for my final year. Professional quality, original content, and excellent support. Highly recommended for serious students.",
      rating: "Major Project",
      initial: "A"
    },
    {
      name: "Sneha T.",
      role: "BCA Data Analytics Student",
      content: "Design Thinking assignment pack helped me secure full marks! The content quality and adherence to university standards is impressive.",
      rating: "Assignment Pack", 
      initial: "S"
    },
    {
      name: "Vikash L.",
      role: "BCA Data Analytics Final Year",
      content: "Major Project report was delivered on time with proper formatting and documentation. Saved me months of work and got excellent results!",
      rating: "Major Project",
      initial: "V"
    },
    {
      name: "Kavya R.",
      role: "BCA Data Analytics Graduate",
      content: "Both assignment packs for semester 6 were excellent. Consistent 10/10 marks and professional presentation. EduElan is the best!",
      rating: "Assignment Pack",
      initial: "K"
    }
  ];

  return (
    <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              100% Marks Guarantee
            </span>
          </div>
          <p className="text-lg text-blue-600 mb-4">Student Success Stories</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Trusted by BCA Data Analytics Students Across India
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real testimonials from students who achieved academic excellence with our professional solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.initial}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-slate-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  testimonial.rating === "Major Project" 
                    ? "bg-blue-100 text-blue-800" 
                    : "bg-green-100 text-green-800"
                }`}>
                  {testimonial.rating}
                </span>
              </div>
              
              <div className="text-2xl text-blue-600 mb-4">"</div>
              <p className="text-slate-700 leading-relaxed">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
