
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types/cart';
import { logSecurityEvent } from '@/utils/securityUtils';
import { checkSimpleRateLimit, createRateLimitKey } from '@/utils/rateLimitUtils';
import { validateAndSetSessionContext } from '@/utils/cartSessionUtils';

export const addCartItemSecure = async (
  product: string, 
  price: number, 
  sessionToken: string, 
  userId?: string
): Promise<CartItem | null> => {
  try {
    // Simple rate limiting
    const rateLimitKey = createRateLimitKey('add', userId, sessionToken.slice(0, 10));
    if (!await checkSimpleRateLimit(rateLimitKey, 20)) {
      await logSecurityEvent('CART_ADD_RATE_LIMITED', { 
        product,
        user_id: userId 
      }, 'WARNING');
      return null;
    }

    // Enhanced session context for anonymous users
    if (!await validateAndSetSessionContext(sessionToken, userId, 'ADD')) {
      return null;
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
