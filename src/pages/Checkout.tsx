
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ProtectedCheckout } from "@/components/ProtectedCheckout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthGuard";
import { PaymentInstructions } from "@/components/checkout/PaymentInstructions";
import { OrderForm } from "@/components/checkout/OrderForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";

const Checkout = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    paymentMethod: 'upi',
    specialization: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentInstructions, setShowPaymentInstructions] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [orderData, setOrderData] = useState<any>(null);

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
    if (!formData.name || !formData.email || !formData.specialization) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including your specialization.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Prepare order data with specialization
      const orderData = {
        items: singleProduct ? [singleProduct] : checkoutItems,
        totalAmount: singleProduct ? singleProduct.price : checkoutTotal,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone || null,
        specialization: formData.specialization
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
        <PaymentInstructions
          countdown={countdown}
          setCountdown={setCountdown}
          orderData={orderData}
          formData={formData}
          singleProduct={singleProduct}
          checkoutTotal={checkoutTotal}
          checkoutItems={checkoutItems}
        />
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
              <OrderForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                singleProduct={singleProduct}
                checkoutTotal={checkoutTotal}
              />

              <OrderSummary
                singleProduct={singleProduct}
                checkoutItems={checkoutItems}
                checkoutTotal={checkoutTotal}
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedCheckout>
  );
};

export default Checkout;
