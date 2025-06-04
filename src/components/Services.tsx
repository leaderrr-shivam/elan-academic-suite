
import { MajorProjectCard } from "./MajorProjectCard";
import { AssignmentPackCard } from "./AssignmentPackCard";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthGuard";

export const Services = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleAddToCart = async (product: string, price: number) => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: '/#services',
          message: 'Please sign in to add items to your cart'
        } 
      });
      return;
    }

    await addToCart(product, price);
    toast({
      title: "Added to Cart",
      description: `${product} has been added to your secure cart.`,
    });
  };

  const handleBuyNow = (product: string, price: number) => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          from: '/checkout',
          singleProduct: { name: product, price: price },
          message: 'Please sign in to make a secure purchase'
        } 
      });
      return;
    }

    navigate('/checkout', { 
      state: { 
        singleProduct: { name: product, price: price },
        total: price
      } 
    });
  };

  const withoutGuideFeatures = [
    "Complete Major Project Report (100-150 pages)",
    "Follows standard university guidelines and formatting", 
    "Original, plagiarism-free content with proper citations",
    "Professional plagiarism report included for quality assurance",
    "Academic formatting as per university standards",
    "Comprehensive viva questions and detailed answers",
    "Delivery in both .docx and .pdf formats",
    "Technical documentation and code (if applicable)",
    "Abstract, literature review, methodology & conclusion",
    "Ready for submission to university portal"
  ];

  const withGuideFeatures = [
    "✨ Professional Guide/Faculty Mentor Arrangement",
    "🎯 Direct Communication with Assigned Guide",
    "📞 Guide Coordination & Meeting Setup",
    "💼 Professional Guide Approval Documentation",
    "🚀 Priority Support & Faster Delivery",
    "🔥 Guaranteed Guide Acceptance",
    "📋 Complete plagiarism report with quality certification",
    "All features from standard package included"
  ];

  const dataAnalyticsFeatures = [
    "Formative Assessment 1 - High-grade solution guaranteed",
    "Formative Assessment 2 - High-grade solution guaranteed", 
    "Formative Assessment 3 - High-grade solution guaranteed",
    "100% original content with plagiarism report",
    "Instant download after payment"
  ];

  const softwareEngineeringFeatures = [
    "Formative Assessment 1 - High-grade solution guaranteed",
    "Formative Assessment 2 - High-grade solution guaranteed",
    "Formative Assessment 3 - High-grade solution guaranteed", 
    "100% original content with plagiarism report",
    "Instant download after payment"
  ];

  return (
    <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Major Project Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
              FINAL YEAR SPECIAL
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            University Final Year UG Major Project
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
            Get your complete Major Project Report professionally crafted by experts, following all university guidelines with guaranteed submission success.
          </p>
        </div>

        {/* Two Project Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <MajorProjectCard
            title="Major Project (Without Guide)"
            description="Complete Major Project Report + Viva Solutions + Plagiarism Report for Final Year Submission"
            price={7999}
            originalPrice={15999}
            discount="50% OFF"
            features={withoutGuideFeatures}
            note="You need to arrange your own project guide/faculty mentor."
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
          />

          <MajorProjectCard
            title="Major Project (With Guide)"
            description="Complete Major Project Report + Professional Guide Arrangement + Viva Solutions + Plagiarism Report"
            price={10999}
            originalPrice={19999}
            discount="45% OFF"
            features={withGuideFeatures}
            isWithGuide={true}
            isPremium={true}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Assignment Packs Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Computer Science - Final Semester Assignment Packs
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Complete assignment packs for final semester subjects with guaranteed high-grade assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AssignmentPackCard
            title="Data Analytics - Full Assignment Pack"
            description="Complete pack with all 3 assessments (FA1, FA2, FA3)"
            price={499}
            originalPrice={849}
            discount="41% OFF"
            features={dataAnalyticsFeatures}
            isPopular={true}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
          />

          <AssignmentPackCard
            title="Software Engineering - Full Assignment Pack"
            description="Complete pack with all 3 assessments (FA1, FA2, FA3)"
            price={499}
            originalPrice={849}
            discount="41% OFF"
            features={softwareEngineeringFeatures}
            onBuyNow={handleBuyNow}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </section>
  );
};
