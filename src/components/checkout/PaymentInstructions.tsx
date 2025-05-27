
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Mail, CheckCircle, Clock, Shield, Star, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PaymentInstructionsProps {
  countdown: number;
  setCountdown: (count: number) => void;
  orderData: any;
  formData: {
    name: string;
    email: string;
    phone: string;
    paymentMethod: string;
  };
  singleProduct?: any;
  checkoutTotal: number;
  checkoutItems: any[];
}

export const PaymentInstructions = ({
  countdown,
  setCountdown,
  orderData,
  formData,
  singleProduct,
  checkoutTotal,
  checkoutItems
}: PaymentInstructionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const upiId = "eduelan@axl";

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
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
  }, [countdown, navigate, orderData, formData, singleProduct, checkoutTotal, checkoutItems, setCountdown]);

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    toast({
      title: "UPI ID Copied!",
      description: "UPI ID has been copied to your clipboard",
    });
  };

  return (
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
  );
};
