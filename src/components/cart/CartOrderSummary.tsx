
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

interface CartOrderSummaryProps {
  itemCount: number;
  totalPrice: number;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartOrderSummary = ({ 
  itemCount, 
  totalPrice, 
  onCheckout, 
  onContinueShopping 
}: CartOrderSummaryProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 sticky top-24 animate-fade-in">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-blue-600" />
          Order Summary
        </h3>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-600">Items ({itemCount})</span>
            <span className="font-semibold text-slate-900">₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-600">Delivery</span>
            <span className="font-semibold text-green-600">FREE</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-600">GST (18%)</span>
            <span className="font-semibold text-slate-900">₹{Math.round(totalPrice * 0.18).toLocaleString()}</span>
          </div>
          <div className="border-t border-slate-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-slate-900">Total Amount</span>
              <span className="text-3xl font-bold text-blue-600">₹{Math.round(totalPrice * 1.18).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={onCheckout}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 text-lg rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
            size="lg"
          >
            Proceed to Checkout
          </Button>

          <Button 
            variant="outline"
            onClick={onContinueShopping}
            className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 py-3 rounded-xl transition-all duration-200"
          >
            Continue Shopping
          </Button>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 text-green-800">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">Special Offer</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            Free lifetime updates and 24/7 support included!
          </p>
        </div>
      </div>
    </div>
  );
};
