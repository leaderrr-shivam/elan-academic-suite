
import { Button } from "@/components/ui/button";
import { Check, Calendar, User, ShoppingCart, Shield, Award } from "lucide-react";

interface MajorProjectCardProps {
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: string;
  features: string[];
  isWithGuide?: boolean;
  isPremium?: boolean;
  note?: string;
  onBuyNow: (product: string, price: number) => void;
  onAddToCart: (product: string, price: number) => void;
}

export const MajorProjectCard = ({
  title,
  description,
  price,
  originalPrice,
  discount,
  features,
  isWithGuide = false,
  isPremium = false,
  note,
  onBuyNow,
  onAddToCart
}: MajorProjectCardProps) => {
  const productName = `Major Project (${isWithGuide ? 'With Guide' : 'Without Guide'})`;
  
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 ${
      isPremium 
        ? 'border-gradient-to-r from-amber-400 via-yellow-500 to-gold-600 bg-gradient-to-br from-amber-50 to-yellow-50' 
        : 'border-slate-200 hover:border-blue-300'
    } hover:shadow-3xl transition-all duration-500 hover:scale-105 relative overflow-hidden`}>
      
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-gold-600 text-white px-6 py-3 text-sm font-bold rounded-bl-2xl shadow-lg">
          <Award className="inline w-4 h-4 mr-1" />
          PREMIUM
        </div>
      )}
      
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold border border-green-200">
          {discount}
        </span>
        {!isWithGuide && (
          <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            POPULAR CHOICE
          </span>
        )}
        {isWithGuide && (
          <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-gold-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
            COMPLETE SOLUTION
          </span>
        )}
      </div>
      
      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
        {title}
      </h3>
      <p className="text-slate-600 mb-6 text-lg">
        {description}
      </p>
      
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-4xl font-bold text-slate-900">₹{price.toLocaleString()}</span>
        <span className="text-2xl text-slate-500 line-through">₹{originalPrice.toLocaleString()}</span>
      </div>
      <p className="text-green-600 font-bold mb-8 text-lg">
        Save ₹{(originalPrice - price).toLocaleString()} • {isWithGuide ? 'Complete Package' : 'Limited Time Offer'}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <p className="text-sm text-slate-600 font-medium">48-72 Hours</p>
          <p className="text-xs text-slate-500">After Payment</p>
        </div>
        <div className="text-center">
          <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <p className="text-sm text-slate-600 font-medium">
            {isWithGuide ? 'Guide Included' : '100% Original'}
          </p>
          <p className="text-xs text-slate-500">
            {isWithGuide ? 'Professional Mentor' : 'Plagiarism Free'}
          </p>
        </div>
        <div className="text-center">
          <User className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
          <p className="text-sm text-slate-600 font-medium">
            {isWithGuide ? 'Expert Support' : 'Expert Written'}
          </p>
          <p className="text-xs text-slate-500">
            {isWithGuide ? 'End-to-End' : 'Professional Quality'}
          </p>
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        <Button 
          onClick={() => onBuyNow(productName, price)}
          className={`w-full ${
            isWithGuide 
              ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-gold-600 hover:from-amber-600 hover:via-yellow-600 hover:to-gold-700 text-white shadow-xl' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-xl'
          } py-4 text-lg font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
        >
          Buy Now - ₹{price.toLocaleString()}
        </Button>
        <Button 
          onClick={() => onAddToCart(productName, price)}
          variant="outline"
          className={`w-full border-2 ${
            isWithGuide 
              ? 'border-amber-500 text-amber-700 hover:bg-amber-50 hover:border-amber-600' 
              : 'border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700'
          } py-4 text-lg font-semibold rounded-xl hover:shadow-lg transition-all duration-300`}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>

      <div className={`${
        isWithGuide 
          ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200' 
          : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
      } rounded-2xl p-6`}>
        <h4 className="text-lg font-bold text-slate-900 mb-4">
          {isWithGuide ? '🏆 Premium Complete Solution Includes:' : '📚 What\'s Included:'}
        </h4>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              {isWithGuide && feature.startsWith('✨') ? (
                <span className="text-sm font-medium text-amber-700">{feature}</span>
              ) : (
                <>
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm font-medium">{feature}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {note && (
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl border-l-4 border-orange-500">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <h5 className="font-bold text-orange-900 mb-1">Important Note:</h5>
              <p className="text-orange-800 text-sm font-medium">{note}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
