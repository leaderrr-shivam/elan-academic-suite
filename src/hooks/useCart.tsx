
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthGuard';
import { CartItem, CartContextType } from '@/types/cart';
import { generateSecureToken } from '@/utils/sessionUtils';
import { 
  loadCartItems, 
  addCartItem, 
  removeCartItem, 
  updateCartItemQuantity, 
  clearCartItems 
} from '@/services/cartService';
import { CartContext } from '@/contexts/CartContext';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [sessionToken, setSessionToken] = useState<string>('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // For authenticated users, load their cart items
      loadCartItems('', user.id).then(setItems);
    } else {
      // For non-authenticated users, use secure session-based cart
      let token = localStorage.getItem('secure_cart_session');
      if (!token || token.length < 64) {
        token = generateSecureToken();
        localStorage.setItem('secure_cart_session', token);
      }
      setSessionToken(token);
      loadCartItems(token).then(setItems);
    }
  }, [user]);

  const addToCart = async (product: string, price: number) => {
    const existingItem = items.find(item => item.product_name === product);
    
    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      const newItem = await addCartItem(product, price, sessionToken, user?.id);
      if (newItem) {
        setItems(prev => [...prev, newItem]);
      }
    }
  };

  const removeFromCart = async (id: string) => {
    const success = await removeCartItem(id, sessionToken, user?.id);
    if (success) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    const success = await updateCartItemQuantity(id, quantity, sessionToken, user?.id);
    if (success) {
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = async () => {
    const success = await clearCartItems(sessionToken, user?.id);
    if (success) {
      setItems([]);
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export { useCart } from '@/contexts/CartContext';
