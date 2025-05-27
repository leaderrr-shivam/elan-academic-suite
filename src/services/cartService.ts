
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types/cart';
import { setSessionContext } from '@/utils/sessionUtils';

export const loadCartItems = async (token: string, userId?: string): Promise<CartItem[]> => {
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
    return data || [];
  } catch (error) {
    console.error('Error loading cart items:', error);
    return [];
  }
};

export const addCartItem = async (
  product: string, 
  price: number, 
  sessionToken: string, 
  userId?: string
): Promise<CartItem | null> => {
  try {
    // Set session context for anonymous users
    if (!userId && sessionToken) {
      await setSessionContext(sessionToken);
    }

    const insertData: any = {
      product_name: product,
      price: price,
      quantity: 1
    };

    if (userId) {
      insertData.user_id = userId;
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
    return data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
};

export const removeCartItem = async (
  id: string, 
  sessionToken: string, 
  userId?: string
): Promise<boolean> => {
  try {
    // Set session context for anonymous users
    if (!userId && sessionToken) {
      await setSessionContext(sessionToken);
    }

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return false;
  }
};

export const updateCartItemQuantity = async (
  id: string, 
  quantity: number, 
  sessionToken: string, 
  userId?: string
): Promise<boolean> => {
  try {
    // Set session context for anonymous users
    if (!userId && sessionToken) {
      await setSessionContext(sessionToken);
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating quantity:', error);
    return false;
  }
};

export const clearCartItems = async (
  sessionToken: string, 
  userId?: string
): Promise<boolean> => {
  try {
    // Set session context for anonymous users
    if (!userId && sessionToken) {
      await setSessionContext(sessionToken);
    }

    let query = supabase.from('cart_items').delete();
    
    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.eq('session_token', sessionToken);
    }

    const { error } = await query;
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
};
