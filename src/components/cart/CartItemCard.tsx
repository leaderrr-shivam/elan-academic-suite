
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2, Heart, Star } from "lucide-react";
import { CartItem } from "@/types/cart";

interface CartItemCardProps {
  item: CartItem;
  index: number;
  isUpdating: boolean;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string, productName: string) => void;
}

export const CartItemCard = ({ 
  item, 
  index, 
  isUpdating, 
  onUpdateQuantity, 
  onRemoveItem 
}: CartItemCardProps) => {
  return (
    <div 
      className={`bg-white rounded-2xl p-6 shadow-lg border border-slate-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fade-in ${
        isUpdating ? 'opacity-70 pointer-events-none' : ''
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="text-sm text-yellow-600 font-medium">Premium Course</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{item.product_name}</h3>
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-blue-600">₹{item.price.toLocaleString()}</p>
            <span className="text-sm text-slate-500 line-through">₹{(item.price * 2).toLocaleString()}</span>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">50% OFF</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <Heart className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-100 rounded-xl p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="h-10 w-10 p-0 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-all duration-200"
              disabled={isUpdating}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="bg-white rounded-lg px-4 py-2 border border-slate-200">
              <span className="text-lg font-bold text-slate-900">{item.quantity}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="h-10 w-10 p-0 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-all duration-200"
              disabled={isUpdating}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRemoveItem(item.id, item.product_name)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 transition-all duration-200"
            disabled={isUpdating}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <span className="text-slate-600 font-medium">Item Subtotal:</span>
          <span className="text-2xl font-bold text-slate-900">₹{(item.price * item.quantity).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
