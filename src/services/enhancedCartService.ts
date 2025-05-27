
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types/cart';
import { setEnhancedSessionContext, validateEnhancedSessionToken } from '@/utils/enhancedSessionUtils';
import { logSecurityEvent, checkRateLimit } from '@/utils/securityUtils';

export const loadCartItemsSecure = async (token: string, userId?: string): Promise<CartItem[]> => {
  try {
    // Rate limiting for cart operations
    const rateLimitKey = userId ? `cart_load_user:${userId}` : `cart_load_session:${token.slice(0, 10)}`;
    if (!await checkRateLimit(rateLimitKey, 50, 1)) { // 50 requests per minute
      await logSecurityEvent('CART_LOAD_RATE_LIMITED', { 
        user_id: userId, 
        token_prefix: token.slice(0, 10) 
      }, 'WARNING');
      return [];
    }

    // Enhanced session context for anonymous users
    if (!userId && token) {
      // Validate token first
      if (!await validateEnhancedSessionToken(token)) {
        await logSecurityEvent('CART_LOAD_INVALID_TOKEN', { 
          token_prefix: token.slice(0, 10) 
        }, 'WARNING');
        return [];
      }
      
      await setEnhancedSessionContext(token);
    }

    let query = supabase.from('cart_items').select('*');
    
    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.eq('session_token', token).is('user_id', null);
    }

    const { data, error } = await query;
    
    if (error) {
      await logSecurityEvent('CART_LOAD_ERROR', { 
        error: error.message,
        user_id: userId,
        token_prefix: token.slice(0, 10)
      }, 'WARNING');
      throw error;
    }
    
    await logSecurityEvent('CART_LOADED', { 
      item_count: data?.length || 0,
      user_id: userId,
      is_authenticated: !!userId
    });
    
    return data || [];
  } catch (error) {
    console.error('Error loading cart items securely:', error);
    await logSecurityEvent('CART_LOAD_EXCEPTION', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      user_id: userId
    }, 'CRITICAL');
    return [];
  }
};

export const addCartItemSecure = async (
  product: string, 
  price: number, 
  sessionToken: string, 
  userId?: string
): Promise<CartItem | null> => {
  try {
    // Rate limiting for add operations
    const rateLimitKey = userId ? `cart_add_user:${userId}` : `cart_add_session:${sessionToken.slice(0, 10)}`;
    if (!await checkRateLimit(rateLimitKey, 20, 1)) { // 20 additions per minute
      await logSecurityEvent('CART_ADD_RATE_LIMITED', { 
        product,
        user_id: userId 
      }, 'WARNING');
      return null;
    }

    // Enhanced session context for anonymous users
    if (!userId && sessionToken) {
      if (!await validateEnhancedSessionToken(sessionToken)) {
        await logSecurityEvent('CART_ADD_INVALID_TOKEN', { 
          product,
          token_prefix: sessionToken.slice(0, 10) 
        }, 'WARNING');
        return null;
      }
      
      await setEnhancedSessionContext(sessionToken);
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

    if (error) {
      await logSecurityEvent('CART_ADD_ERROR', { 
        error: error.message,
        product,
        user_id: userId
      }, 'WARNING');
      throw error;
    }
    
    await logSecurityEvent('CART_ITEM_ADDED', { 
      product,
      price,
      user_id: userId,
      is_authenticated: !!userId
    });
    
    return data;
  } catch (error) {
    console.error('Error adding to cart securely:', error);
    await logSecurityEvent('CART_ADD_EXCEPTION', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      product,
      user_id: userId
    }, 'CRITICAL');
    return null;
  }
};

export const removeCartItemSecure = async (
  id: string, 
  sessionToken: string, 
  userId?: string
): Promise<boolean> => {
  try {
    // Rate limiting for remove operations
    const rateLimitKey = userId ? `cart_remove_user:${userId}` : `cart_remove_session:${sessionToken.slice(0, 10)}`;
    if (!await checkRateLimit(rateLimitKey, 30, 1)) { // 30 removals per minute
      await logSecurityEvent('CART_REMOVE_RATE_LIMITED', { 
        item_id: id,
        user_id: userId 
      }, 'WARNING');
      return false;
    }

    // Enhanced session context for anonymous users
    if (!userId && sessionToken) {
      if (!await validateEnhancedSessionToken(sessionToken)) {
        await logSecurityEvent('CART_REMOVE_INVALID_TOKEN', { 
          item_id: id,
          token_prefix: sessionToken.slice(0, 10) 
        }, 'WARNING');
        return false;
      }
      
      await setEnhancedSessionContext(sessionToken);
    }

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', id);

    if (error) {
      await logSecurityEvent('CART_REMOVE_ERROR', { 
        error: error.message,
        item_id: id,
        user_id: userId
      }, 'WARNING');
      throw error;
    }
    
    await logSecurityEvent('CART_ITEM_REMOVED', { 
      item_id: id,
      user_id: userId,
      is_authenticated: !!userId
    });
    
    return true;
  } catch (error) {
    console.error('Error removing from cart securely:', error);
    await logSecurityEvent('CART_REMOVE_EXCEPTION', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      item_id: id,
      user_id: userId
    }, 'CRITICAL');
    return false;
  }
};

export const updateCartItemQuantitySecure = async (
  id: string, 
  quantity: number, 
  sessionToken: string, 
  userId?: string
): Promise<boolean> => {
  try {
    // Input validation
    if (quantity < 0 || quantity > 100) {
      await logSecurityEvent('CART_UPDATE_INVALID_QUANTITY', { 
        item_id: id,
        quantity,
        user_id: userId
      }, 'WARNING');
      return false;
    }

    // Rate limiting for update operations
    const rateLimitKey = userId ? `cart_update_user:${userId}` : `cart_update_session:${sessionToken.slice(0, 10)}`;
    if (!await checkRateLimit(rateLimitKey, 40, 1)) { // 40 updates per minute
      await logSecurityEvent('CART_UPDATE_RATE_LIMITED', { 
        item_id: id,
        user_id: userId 
      }, 'WARNING');
      return false;
    }

    // Enhanced session context for anonymous users
    if (!userId && sessionToken) {
      if (!await validateEnhancedSessionToken(sessionToken)) {
        await logSecurityEvent('CART_UPDATE_INVALID_TOKEN', { 
          item_id: id,
          token_prefix: sessionToken.slice(0, 10) 
        }, 'WARNING');
        return false;
      }
      
      await setEnhancedSessionContext(sessionToken);
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', id);

    if (error) {
      await logSecurityEvent('CART_UPDATE_ERROR', { 
        error: error.message,
        item_id: id,
        user_id: userId
      }, 'WARNING');
      throw error;
    }
    
    await logSecurityEvent('CART_ITEM_UPDATED', { 
      item_id: id,
      new_quantity: quantity,
      user_id: userId,
      is_authenticated: !!userId
    });
    
    return true;
  } catch (error) {
    console.error('Error updating cart quantity securely:', error);
    await logSecurityEvent('CART_UPDATE_EXCEPTION', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      item_id: id,
      user_id: userId
    }, 'CRITICAL');
    return false;
  }
};

export const clearCartItemsSecure = async (
  sessionToken: string, 
  userId?: string
): Promise<boolean> => {
  try {
    // Rate limiting for clear operations
    const rateLimitKey = userId ? `cart_clear_user:${userId}` : `cart_clear_session:${sessionToken.slice(0, 10)}`;
    if (!await checkRateLimit(rateLimitKey, 5, 5)) { // 5 clears per 5 minutes
      await logSecurityEvent('CART_CLEAR_RATE_LIMITED', { 
        user_id: userId 
      }, 'WARNING');
      return false;
    }

    // Enhanced session context for anonymous users
    if (!userId && sessionToken) {
      if (!await validateEnhancedSessionToken(sessionToken)) {
        await logSecurityEvent('CART_CLEAR_INVALID_TOKEN', { 
          token_prefix: sessionToken.slice(0, 10) 
        }, 'WARNING');
        return false;
      }
      
      await setEnhancedSessionContext(sessionToken);
    }

    let query = supabase.from('cart_items').delete();
    
    if (userId) {
      query = query.eq('user_id', userId);
    } else {
      query = query.eq('session_token', sessionToken);
    }

    const { error } = await query;
    
    if (error) {
      await logSecurityEvent('CART_CLEAR_ERROR', { 
        error: error.message,
        user_id: userId
      }, 'WARNING');
      throw error;
    }
    
    await logSecurityEvent('CART_CLEARED', { 
      user_id: userId,
      is_authenticated: !!userId
    });
    
    return true;
  } catch (error) {
    console.error('Error clearing cart securely:', error);
    await logSecurityEvent('CART_CLEAR_EXCEPTION', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      user_id: userId
    }, 'CRITICAL');
    return false;
  }
};
