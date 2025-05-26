
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CartItem {
  id: string;
  product_name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: string, price: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Generate or get session ID
    let sid = localStorage.getItem('cart_session_id');
    if (!sid) {
      sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cart_session_id', sid);
    }
    setSessionId(sid);
    loadCartItems(sid);
  }, []);

  const loadCartItems = async (sid: string) => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('session_id', sid);

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  const addToCart = async (product: string, price: number) => {
    try {
      // Check if item already exists
      const existingItem = items.find(item => item.product_name === product);
      
      if (existingItem) {
        await updateQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            session_id: sessionId,
            product_name: product,
            price: price,
            quantity: 1
          })
          .select()
          .single();

        if (error) throw error;
        setItems(prev => [...prev, data]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', id);

      if (error) throw error;
      setItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('session_id', sessionId);

      if (error) throw error;
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
