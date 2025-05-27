
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ProtectedCheckout } from "@/components/ProtectedCheckout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthGuard";
import { Copy, Mail, CheckCircle, Clock, Shield, Star, Timer } from "lucide-react";

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
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [orderData, setOrderData] = useState<any>(null);

  // Get checkout data from navigation state or current cart
  const checkoutItems = location.state?.items || [];
  const checkoutTotal = location.state?.total || 0;
  const singleProduct = location.state?.singleProduct;

  const upiId = "eduelan@axl";

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (showPaymentInstructions && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (showPaymentInstructions && countdown === 0) {
      // Redirect to payment success page with order data
      navigate('/payment-success', { 
        state: {
          orderId: orderData?.orderId,
          orderNumber: orderData?.orderNumber,
          customerName: formData.name,
          customerEmail: formData.email,
          total: singleProduct ? singleProduct.price : checkoutTotal,
          items: singleProduct ? [singleProduct] : checkoutItems
        }
      });
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showPaymentInstructions, countdown, navigate, orderData, formData, singleProduct, checkoutTotal, checkoutItems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    toast({
      title: "UPI ID Copied!",
      description: "UPI ID has been copied to your clipboard",
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
        items: singleProduct ? [singleProduct] : checkoutItems,
        totalAmount: singleProduct ? singleProduct.price : checkoutTotal,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone || null
      };

      // Create order via edge function
      const { data, error } = await supabase.functions.invoke('create-order', {
        body: orderData
      });

      if (error) throw error;

      // Store order data for later use
      setOrderData(data);
      
      // Show payment instructions and start countdown
      setShowPaymentInstructions(true);
      setCountdown(60);
      
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

  if (showPaymentInstructions) {
    return (
      <ProtectedCheckout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Timer Header */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Timer className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">⏰ Complete Payment Now!</h1>
                <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-6 border-2 border-red-300 mb-4">
                  <div className="text-4xl font-bold text-red-700 mb-2">
                    {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                  </div>
                  <p className="text-lg text-red-800 font-semibold">Make payment within {countdown} seconds!</p>
                  <p className="text-sm text-red-700 mt-2">After timer ends, you'll be redirected to get your Order ID for payment confirmation</p>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* QR Code Section */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">📱 Scan QR Code</h3>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                      <img 
                        src="/lovable-uploads/8766459d-1704-429e-95dd-7d8a9cde3828.png" 
                        alt="UPI QR Code" 
                        className="w-64 h-64 mx-auto rounded-xl shadow-lg"
                      />
                      <p className="text-sm text-slate-600 mt-4">Open any UPI app and scan this QR code</p>
                    </div>
                  </div>

                  {/* UPI ID Section */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">💳 Or Pay via UPI ID</h3>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                      <div className="bg-white rounded-xl p-4 border border-green-300 mb-4">
                        <p className="text-sm text-slate-600 mb-2">UPI ID</p>
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-2xl font-bold text-slate-900">{upiId}</span>
                          <Button
                            onClick={copyUpiId}
                            variant="outline"
                            size="sm"
                            className="border-green-300 text-green-700 hover:bg-green-100"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">Copy UPI ID and pay from your UPI app</p>
                    </div>
                  </div>
                </div>

                {/* Amount to Pay */}
                <div className="text-center mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Amount to Pay</h3>
                  <p className="text-4xl font-bold">₹{(singleProduct ? singleProduct.price : checkoutTotal).toLocaleString()}</p>
                </div>
              </div>

              {/* Urgent Instructions */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-8 shadow-xl border-2 border-red-200 mb-8">
                <h2 className="text-2xl font-bold text-red-900 mb-6 text-center flex items-center justify-center gap-3">
                  <Clock className="w-8 h-8 text-red-600 animate-pulse" />
                  🚨 URGENT: Complete Payment in {countdown} Seconds!
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-red-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
                    <h3 className="font-bold text-slate-900 mb-2">⚡ Make Payment NOW</h3>
                    <p className="text-sm text-slate-700">Use QR code OR UPI ID to pay ₹{(singleProduct ? singleProduct.price : checkoutTotal).toLocaleString()} before timer ends!</p>
                  </div>
                  
                  <div className="text-center bg-white rounded-xl p-6 shadow-lg border border-red-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
                    <h3 className="font-bold text-slate-900 mb-2">📸 Get Order ID</h3>
                    <p className="text-sm text-slate-700">After timer, you'll get Order ID to screenshot with payment receipt</p>
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-2xl p-6 border-2 border-orange-200">
                  <div className="text-center">
                    <Mail className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-orange-900 mb-2">Then Email Both Screenshots To:</h3>
                    <a 
                      href={`mailto:eduelandesk@gmail.com?subject=Payment Confirmation - Order ${formData.name}&body=Hi Team,%0A%0AI have completed the payment for my order.%0A%0ACustomer Details:%0AName: ${formData.name}%0AEmail: ${formData.email}%0AAmount: ₹${(singleProduct ? singleProduct.price : checkoutTotal).toLocaleString()}%0A%0APlease find attached:%0A1. Payment receipt screenshot%0A2. Order ID screenshot%0A%0AThank you!`}
                      className="text-xl font-bold text-orange-600 hover:text-orange-800 underline"
                    >
                      eduelandesk@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* FOMO Section */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border-2 border-purple-200 mb-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">🔥 Don't Miss This Limited Offer!</h3>
                  <p className="text-purple-800 font-medium mb-4">This exclusive 50% discount expires after payment window closes. Secure your academic success NOW!</p>
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                      <Star className="w-6 h-6 text-yellow-500 fill-current mx-auto mb-1" />
                      <span className="text-sm text-purple-700">Premium Quality</span>
                    </div>
                    <div className="text-center">
                      <Shield className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <span className="text-sm text-purple-700">100% Guarantee</span>
                    </div>
                    <div className="text-center">
                      <CheckCircle className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <span className="text-sm text-purple-700">Instant Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedCheckout>
    );
  }

  return (
    <ProtectedCheckout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                  <h4 className="font-semibold text-green-800 mb-2">🔒 Secure & Private</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Your data is encrypted and secure</li>
                    <li>• GDPR-compliant privacy protection</li>
                    <li>• No data sharing with third parties</li>
                    <li>• Complete confidentiality guaranteed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedCheckout>
  );
};

export default Checkout;
