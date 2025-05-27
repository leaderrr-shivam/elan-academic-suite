
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthGuard';

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
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // For authenticated users, load their cart items
      loadCartItems('', user.id);
    } else {
      // For non-authenticated users, use session-based cart
      let sid = localStorage.getItem('cart_session_id');
      if (!sid) {
        sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('cart_session_id', sid);
      }
      setSessionId(sid);
      loadCartItems(sid);
    }
  }, [user]);

  const loadCartItems = async (sid: string, userId?: string) => {
    try {
      let query = supabase.from('cart_items').select('*');
      
      if (userId) {
        query = query.eq('user_id', userId);
      } else {
        query = query.eq('session_id', sid).is('user_id', null);
      }

      const { data, error } = await query;
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  const addToCart = async (product: string, price: number) => {
    try {
      const existingItem = items.find(item => item.product_name === product);
      
      if (existingItem) {
        await updateQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        const insertData: any = {
          product_name: product,
          price: price,
          quantity: 1
        };

        if (user) {
          insertData.user_id = user.id;
        } else {
          insertData.session_id = sessionId;
        }

        const { data, error } = await supabase
          .from('cart_items')
          .insert(insertData)
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
      let query = supabase.from('cart_items').delete();
      
      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        query = query.eq('session_id', sessionId);
      }

      const { error } = await query;
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
