
import { useCart } from "@/hooks/useCart";
import { useCartActions } from "@/hooks/useCartActions";
import { CartEmptyState } from "@/components/cart/CartEmptyState";
import { CartItemCard } from "@/components/cart/CartItemCard";
import { CartOrderSummary } from "@/components/cart/CartOrderSummary";

const Cart = () => {
  const { items, getTotalPrice, getItemCount } = useCart();
  const {
    updatingItems,
    handleUpdateQuantity,
    handleRemoveItem,
    handleCheckout,
    handleBrowseProducts,
    handleContinueShopping
  } = useCartActions();

  if (items.length === 0) {
    return <CartEmptyState onBrowseProducts={handleBrowseProducts} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                <CartItemCard
                  key={item.id}
                  item={item}
                  index={index}
                  isUpdating={updatingItems.has(item.id)}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </div>

            {/* Order Summary */}
            <CartOrderSummary
              itemCount={getItemCount()}
              totalPrice={getTotalPrice()}
              onCheckout={handleCheckout}
              onContinueShopping={handleContinueShopping}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
