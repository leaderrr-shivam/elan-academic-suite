
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProtectedCheckout } from "@/components/ProtectedCheckout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthGuard";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    paymentMethod: 'upi'
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Get checkout data from navigation state or current cart
  const checkoutItems = location.state?.items || [];
  const checkoutTotal = location.state?.total || 0;
  const singleProduct = location.state?.singleProduct;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Prepare order data
      const orderData = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        total_amount: singleProduct ? singleProduct.price : checkoutTotal,
        order_status: 'completed',
        payment_method: formData.paymentMethod,
        items: singleProduct ? [singleProduct] : checkoutItems,
        user_id: user?.id
      };

      // Insert order into database
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (error) throw error;

      // Send order confirmation email
      try {
        await supabase.functions.invoke('send-order-confirmation', {
          body: {
            orderId: data.id,
            customerName: formData.name,
            customerEmail: formData.email,
            totalAmount: orderData.total_amount,
            items: orderData.items
          }
        });
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Don't fail the order if email fails
      }

      // Clear cart if it was a cart checkout
      if (!singleProduct) {
        await clearCart();
      }

      // Navigate to success page
      navigate('/payment-success', { 
        state: { 
          orderId: data.id,
          customerName: formData.name,
          customerEmail: formData.email,
          total: orderData.total_amount,
          items: orderData.items
        } 
      });
      
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedCheckout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Secure Checkout</h1>
              <p className="text-xl text-slate-600">Complete your order details</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Customer Information */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Customer Information</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="paymentMethod" className="block text-sm font-medium text-slate-700 mb-2">
                      Payment Method
                    </label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="upi">UPI Payment</option>
                      <option value="card">Credit/Debit Card</option>
                      <option value="netbanking">Net Banking</option>
                    </select>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 text-lg rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    {isLoading ? 'Processing...' : `Complete Order - ₹${(singleProduct ? singleProduct.price : checkoutTotal).toLocaleString()}`}
                  </Button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  {singleProduct ? (
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-slate-900">{singleProduct.name}</h3>
                        <p className="text-sm text-slate-600">Quantity: 1</p>
                      </div>
                      <span className="font-bold text-blue-600">₹{singleProduct.price.toLocaleString()}</span>
                    </div>
                  ) : (
                    checkoutItems.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-slate-900">{item.product_name}</h3>
                          <p className="text-sm text-slate-600">Quantity: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-blue-600">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-slate-200 mt-6 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium">₹{(singleProduct ? singleProduct.price : checkoutTotal).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-600">Delivery</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold text-slate-900">
                    <span>Total</span>
                    <span className="text-blue-600">₹{(singleProduct ? singleProduct.price : checkoutTotal).toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">What happens next?</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• We'll send you an order confirmation email immediately</li>
                    <li>• Your digital products will be delivered within 48-72 hours</li>
                    <li>• Plagiarism report included for quality assurance</li>
                    <li>• Our team will contact you if any clarification is needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedCheckout>
  );
};

export default Checkout;
