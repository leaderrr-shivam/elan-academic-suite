
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
  const [sessionToken, setSessionToken] = useState<string>('');
  const { user } = useAuth();

  // Generate secure session token for anonymous users
  const generateSecureToken = () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  // Set session context for RLS validation
  const setSessionContext = async (token: string) => {
    try {
      await supabase.rpc('set_config', {
        parameter: 'request.session_token',
        value: token
      });
    } catch (error) {
      console.log('Session context not set:', error);
    }
  };

  useEffect(() => {
    if (user) {
      // For authenticated users, load their cart items
      loadCartItems('', user.id);
    } else {
      // For non-authenticated users, use secure session-based cart
      let token = localStorage.getItem('secure_cart_session');
      if (!token || token.length < 64) {
        token = generateSecureToken();
        localStorage.setItem('secure_cart_session', token);
      }
      setSessionToken(token);
      setSessionContext(token).then(() => {
        loadCartItems(token);
      });
    }
  }, [user]);

  const loadCartItems = async (token: string, userId?: string) => {
    try {
      // Set session context before querying for anonymous users
      if (!userId && token) {
        await setSessionContext(token);
      }

      let query = supabase.from('cart_items').select('*');
      
      if (userId) {
        query = query.eq('user_id', userId);
      } else {
        query = query.eq('session_token', token).is('user_id', null);
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
      // Set session context for anonymous users
      if (!user && sessionToken) {
        await setSessionContext(sessionToken);
      }

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
          insertData.session_token = sessionToken;
          insertData.session_id = 'anonymous';
          insertData.session_expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
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
      // Set session context for anonymous users
      if (!user && sessionToken) {
        await setSessionContext(sessionToken);
      }

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
      // Set session context for anonymous users
      if (!user && sessionToken) {
        await setSessionContext(sessionToken);
      }

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
      // Set session context for anonymous users
      if (!user && sessionToken) {
        await setSessionContext(sessionToken);
      }

      let query = supabase.from('cart_items').delete();
      
      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        query = query.eq('session_token', sessionToken);
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
