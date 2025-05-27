
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartEmptyStateProps {
  onBrowseProducts: () => void;
}

export const CartEmptyState = ({ onBrowseProducts }: CartEmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-200">
            <ShoppingCart className="w-32 h-32 mx-auto text-slate-300 mb-8 animate-pulse" />
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-slate-600 mb-8">Discover our amazing educational products and start your learning journey!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onBrowseProducts}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                size="lg"
              >
                Browse Products
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl"
                size="lg"
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
