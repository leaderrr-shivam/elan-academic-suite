
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ShoppingCart, Plus, Minus, Trash2, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getItemCount } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    setUpdatingItems(prev => new Set(prev).add(id));
    
    try {
      await updateQuantity(id, newQuantity);
      toast({
        title: "Cart Updated",
        description: newQuantity === 0 ? "Item removed from cart" : `Quantity updated to ${newQuantity}`,
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (id: string, productName: string) => {
    setUpdatingItems(prev => new Set(prev).add(id));
    
    try {
      await removeFromCart(id);
      toast({
        title: "Item Removed",
        description: `${productName} has been removed from your cart`,
      });
    } catch (error) {
      toast({
        title: "Remove Failed",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { items, total: getTotalPrice() } });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="bg-white rounded-3xl p-12 shadow-xl border border-slate-200">
              <ShoppingCart className="w-32 h-32 mx-auto text-slate-300 mb-8 animate-pulse" />
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Your Cart is Empty</h1>
              <p className="text-xl text-slate-600 mb-8">Discover our amazing educational products and start your learning journey!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/#services')}
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Shopping Cart
              <span className="text-blue-600"> ({getItemCount()} {getItemCount() === 1 ? 'item' : 'items'})</span>
            </h1>
            <p className="text-xl text-slate-600">Review your selected educational resources</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl p-6 shadow-lg border border-slate-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fade-in ${
                    updatingItems.has(item.id) ? 'opacity-70 pointer-events-none' : ''
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
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="h-10 w-10 p-0 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-all duration-200"
                          disabled={updatingItems.has(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="bg-white rounded-lg px-4 py-2 border border-slate-200">
                          <span className="text-lg font-bold text-slate-900">{item.quantity}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="h-10 w-10 p-0 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-all duration-200"
                          disabled={updatingItems.has(item.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id, item.product_name)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 transition-all duration-200"
                        disabled={updatingItems.has(item.id)}
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
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 sticky top-24 animate-fade-in">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600">Items ({getItemCount()})</span>
                    <span className="font-semibold text-slate-900">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600">Delivery</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-600">GST (18%)</span>
                    <span className="font-semibold text-slate-900">₹{Math.round(getTotalPrice() * 0.18).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-slate-900">Total Amount</span>
                      <span className="text-3xl font-bold text-blue-600">₹{Math.round(getTotalPrice() * 1.18).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 text-lg rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>

                  <Button 
                    variant="outline"
                    onClick={() => navigate('/#services')}
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
