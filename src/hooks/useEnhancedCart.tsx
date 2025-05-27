
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthGuard';
import { CartItem, CartContextType } from '@/types/cart';
import { generateEnhancedSecureToken } from '@/utils/enhancedSessionUtils';
import { logSecurityEvent } from '@/utils/securityUtils';
import { 
  loadCartItemsSecure, 
  addCartItemSecure, 
  removeCartItemSecure, 
  updateCartItemQuantitySecure, 
  clearCartItemsSecure 
} from '@/services/enhancedCartService';
import { CartContext } from '@/contexts/CartContext';

export const EnhancedCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [sessionToken, setSessionToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const initializeCart = async () => {
      try {
        if (user) {
          // For authenticated users, load their cart items
          await logSecurityEvent('CART_INIT_AUTHENTICATED', { user_id: user.id });
          const cartItems = await loadCartItemsSecure('', user.id);
          setItems(cartItems);
        } else {
          // For non-authenticated users, use enhanced secure session-based cart
          let token = localStorage.getItem('secure_cart_session');
          if (!token || token.length < 64) {
            token = generateEnhancedSecureToken();
            localStorage.setItem('secure_cart_session', token);
            await logSecurityEvent('NEW_SECURE_SESSION_CREATED', { 
              token_length: token.length 
            });
          }
          setSessionToken(token);
          
          await logSecurityEvent('CART_INIT_ANONYMOUS', { 
            token_prefix: token.slice(0, 10) 
          });
          
          const cartItems = await loadCartItemsSecure(token);
          setItems(cartItems);
        }
      } catch (error) {
        console.error('Cart initialization error:', error);
        await logSecurityEvent('CART_INIT_ERROR', { 
          error: error instanceof Error ? error.message : 'Unknown error',
          user_id: user?.id
        }, 'CRITICAL');
      } finally {
        setIsLoading(false);
      }
    };

    initializeCart();
  }, [user]);

  const addToCart = async (product: string, price: number) => {
    try {
      const existingItem = items.find(item => item.product_name === product);
      
      if (existingItem) {
        await updateQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        const newItem = await addCartItemSecure(product, price, sessionToken, user?.id);
        if (newItem) {
          setItems(prev => [...prev, newItem]);
        }
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      await logSecurityEvent('CART_ADD_TO_CART_ERROR', { 
        product,
        error: error instanceof Error ? error.message : 'Unknown error',
        user_id: user?.id
      }, 'WARNING');
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      const success = await removeCartItemSecure(id, sessionToken, user?.id);
      if (success) {
        setItems(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error('Remove from cart error:', error);
      await logSecurityEvent('CART_REMOVE_FROM_CART_ERROR', { 
        item_id: id,
        error: error instanceof Error ? error.message : 'Unknown error',
        user_id: user?.id
      }, 'WARNING');
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(id);
        return;
      }

      const success = await updateCartItemQuantitySecure(id, quantity, sessionToken, user?.id);
      if (success) {
        setItems(prev => prev.map(item => 
          item.id === id ? { ...item, quantity } : item
        ));
      }
    } catch (error) {
      console.error('Update quantity error:', error);
      await logSecurityEvent('CART_UPDATE_QUANTITY_ERROR', { 
        item_id: id,
        quantity,
        error: error instanceof Error ? error.message : 'Unknown error',
        user_id: user?.id
      }, 'WARNING');
    }
  };

  const clearCart = async () => {
    try {
      const success = await clearCartItemsSecure(sessionToken, user?.id);
      if (success) {
        setItems([]);
      }
    } catch (error) {
      console.error('Clear cart error:', error);
      await logSecurityEvent('CART_CLEAR_CART_ERROR', { 
        error: error instanceof Error ? error.message : 'Unknown error',
        user_id: user?.id
      }, 'WARNING');
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
