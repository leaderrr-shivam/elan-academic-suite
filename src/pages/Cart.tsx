
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getItemCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout', { state: { items, total: getTotalPrice() } });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ShoppingCart className="w-24 h-24 mx-auto text-slate-400 mb-8" />
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-slate-600 mb-8">Add some amazing products to get started!</p>
            <Button 
              onClick={() => navigate('/#services')}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Browse Products
            </Button>
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
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Shopping Cart</h1>
            <p className="text-xl text-slate-600">Review your items before checkout</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.product_name}</h3>
                      <p className="text-2xl font-bold text-blue-600">₹{item.price.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Subtotal:</span>
                      <span className="text-xl font-bold text-slate-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Items ({getItemCount()})</span>
                    <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Delivery</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-slate-900">Total</span>
                      <span className="text-2xl font-bold text-blue-600">₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 text-lg rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Proceed to Checkout
                </Button>

                <div className="mt-4 text-center">
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/#services')}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Continue Shopping
                  </Button>
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
