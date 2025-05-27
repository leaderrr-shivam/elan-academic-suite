
interface OrderSummaryProps {
  singleProduct?: any;
  checkoutItems: any[];
  checkoutTotal: number;
}

export const OrderSummary = ({
  singleProduct,
  checkoutItems,
  checkoutTotal
}: OrderSummaryProps) => {
  return (
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
  );
};
