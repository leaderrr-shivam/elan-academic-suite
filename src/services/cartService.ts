
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types/cart';
import { 
  loadCartItemsSecure, 
  addCartItemSecure, 
  removeCartItemSecure, 
  updateCartItemQuantitySecure, 
  clearCartItemsSecure 
} from './enhancedCartService';

// Backward compatibility - use enhanced secure versions
export const loadCartItems = loadCartItemsSecure;
export const addCartItem = addCartItemSecure;
export const removeCartItem = removeCartItemSecure;
export const updateCartItemQuantity = updateCartItemQuantitySecure;
export const clearCartItems = clearCartItemsSecure;
