
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Mail, Download, Clock } from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const orderData = location.state || {};
  const { orderId, orderNumber, customerName, customerEmail, total, items } = orderData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Payment Successful!</h1>
            <p className="text-xl text-slate-600">Thank you for your order. Your academic success journey starts now!</p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Details</h2>
                <div className="space-y-4">
                  <div>
                    <span className="text-slate-600">Order Number:</span>
                    <span className="ml-2 font-mono text-sm bg-slate-100 px-2 py-1 rounded">{orderNumber || orderId?.slice(0, 8) + '...'}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Customer:</span>
                    <span className="ml-2 font-medium">{customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Email:</span>
                    <span className="ml-2 font-medium">{customerEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Total Amount:</span>
                    <span className="ml-2 text-2xl font-bold text-green-600">₹{total?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Purchased Items</h3>
                <div className="space-y-3">
                  {items?.map((item: any, index: number) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900">{item.product_name || item.name}</h4>
                      <p className="text-blue-600 font-medium">₹{(item.price * (item.quantity || 1)).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Admin Notification */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-2">📋 Order Received</h3>
            <p className="text-blue-800">
              Your order has been automatically logged in our admin system. Our team will begin processing your academic materials immediately and deliver them within 48-72 hours.
            </p>
          </div>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Check Your Email</h3>
              <p className="text-slate-600 text-sm">Order confirmation sent to {customerEmail}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
              <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Processing Time</h3>
              <p className="text-slate-600 text-sm">Your order will be delivered within 48-72 hours</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
              <Download className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Digital Delivery</h3>
              <p className="text-slate-600 text-sm">All files will be sent via email in .docx and .pdf formats</p>
            </div>
          </div>

          {/* Important Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🎓 Your Academic Success Investment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">What You'll Receive:</h4>
                <ul className="text-slate-700 space-y-1 text-sm">
                  <li>• Complete, original academic content</li>
                  <li>• Professional formatting as per university standards</li>
                  <li>• Comprehensive viva questions and answers</li>
                  <li>• Technical documentation (if applicable)</li>
                  <li>• Ready for submission to AMIGO LMS</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Quality Guarantee:</h4>
                <ul className="text-slate-700 space-y-1 text-sm">
                  <li>• 100% plagiarism-free content</li>
                  <li>• Expert-crafted by professionals</li>
                  <li>• Follows all Amity University guidelines</li>
                  <li>• Multiple format delivery (.docx & .pdf)</li>
                  <li>• Guaranteed submission success</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Need Help?</h3>
            <p className="text-slate-600 mb-4">Our team is here to ensure your academic success. For any questions or support:</p>
            <div className="flex justify-center items-center space-x-2 mb-6">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-600">support@eduelan.com</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Return to Homepage
              </Button>
              <Button 
                onClick={() => navigate('/#services')}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-xl transition-all duration-300"
              >
                Browse More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
