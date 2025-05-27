
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";

export const useCartActions = () => {
  const { updateQuantity, removeFromCart, getTotalPrice } = useCart();
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
    navigate('/checkout', { state: { items: [], total: getTotalPrice() } });
  };

  const handleBrowseProducts = () => {
    navigate('/', { state: { scrollTo: 'services' } });
  };

  const handleContinueShopping = () => {
    navigate('/', { state: { scrollTo: 'services' } });
  };

  return {
    updatingItems,
    handleUpdateQuantity,
    handleRemoveItem,
    handleCheckout,
    handleBrowseProducts,
    handleContinueShopping
  };
};
