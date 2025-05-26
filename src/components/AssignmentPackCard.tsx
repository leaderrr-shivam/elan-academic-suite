
import { Button } from "@/components/ui/button";
import { Check, ShoppingCart } from "lucide-react";

interface AssignmentPackCardProps {
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: string;
  features: string[];
  isPopular?: boolean;
  onBuyNow: (product: string, price: number) => void;
  onAddToCart: (product: string, price: number) => void;
}

export const AssignmentPackCard = ({
  title,
  description,
  price,
  originalPrice,
  discount,
  features,
  isPopular = false,
  onBuyNow,
  onAddToCart
}: AssignmentPackCardProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="flex items-center gap-4 mb-6">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {discount}
        </span>
        {isPopular && (
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            POPULAR
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 mb-6">{description}</p>
      
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-3xl font-bold text-slate-900">₹{price}</span>
        <span className="text-xl text-slate-500 line-through">₹{originalPrice}</span>
      </div>
      <p className="text-green-600 font-medium mb-6">Save ₹{originalPrice - price}</p>
      
      <div className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-slate-700 text-sm">{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="space-y-3">
        <Button 
          onClick={() => onBuyNow(title, price)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300"
        >
          Buy Now - ₹{price}
        </Button>
        <Button 
          onClick={() => onAddToCart(title, price)}
          variant="outline"
          className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
