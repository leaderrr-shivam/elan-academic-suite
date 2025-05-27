import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types/cart';
import { setEnhancedSessionContext, validateEnhancedSessionToken } from '@/utils/enhancedSessionUtils';
import { logSecurityEvent } from '@/utils/securityUtils';

// Simplified rate limiting without database conflicts
const checkSimpleRateLimit = async (key: string, maxAttempts: number): Promise<boolean> => {
  const now = Date.now();
  const windowKey = `${key}_${Math.floor(now / 60000)}`; // 1-minute window
  
  try {
    const stored = localStorage.getItem(windowKey);
    const attempts = stored ? parseInt(stored) : 0;
    
    if (attempts >= maxAttempts) {
      return false;
    }
    
    localStorage.setItem(windowKey, (attempts + 1).toString());
    
    // Clean up old keys
    for (let i = 0; i < localStorage.length; i++) {
      const storageKey = localStorage.key(i);
      if (storageKey?.startsWith(key) && storageKey !== windowKey) {
        localStorage.removeItem(storageKey);
      }
    }
    
    return true;
  } catch (error) {
    console.warn('Rate limit check failed, allowing request:', error);
    return true;
  }
};

export const loadCartItemsSecure = async (token: string, userId?: string): Promise<CartItem[]> => {
  try {
    // Simple rate limiting
    const rateLimitKey = userId ? `cart_load_user_${userId}` : `cart_load_session_${token.slice(0, 10)}`;
    if (!await checkSimpleRateLimit(rateLimitKey, 50)) {
      await logSecurityEvent('CART_LOAD_RATE_LIMITED', { 
        user_id: userId, 
        token_prefix: token.slice(0, 10) 
      }, 'WARNING');
      return [];
    }

    // Enhanced session context for anonymous users
    if (!userId && token) {
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
    // Simple rate limiting
    const rateLimitKey = userId ? `cart_add_user_${userId}` : `cart_add_session_${sessionToken.slice(0, 10)}`;
    if (!await checkSimpleRateLimit(rateLimitKey, 20)) {
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
      quantity: 1,
      session_id: userId ? `user_${userId}` : 'anonymous' // Always provide session_id
    };

    if (userId) {
      insertData.user_id = userId;
    } else {
      insertData.session_token = sessionToken;
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
    // Simple rate limiting
    const rateLimitKey = userId ? `cart_remove_user_${userId}` : `cart_remove_session_${sessionToken.slice(0, 10)}`;
    if (!await checkSimpleRateLimit(rateLimitKey, 30)) {
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

    // Simple rate limiting
    const rateLimitKey = userId ? `cart_update_user_${userId}` : `cart_update_session_${sessionToken.slice(0, 10)}`;
    if (!await checkSimpleRateLimit(rateLimitKey, 40)) {
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
    // Simple rate limiting
    const rateLimitKey = userId ? `cart_clear_user_${userId}` : `cart_clear_session_${sessionToken.slice(0, 10)}`;
    if (!await checkSimpleRateLimit(rateLimitKey, 5)) {
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
