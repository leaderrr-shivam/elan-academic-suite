
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types/cart';
import { logSecurityEvent } from '@/utils/securityUtils';
import { checkSimpleRateLimit, createRateLimitKey } from '@/utils/rateLimitUtils';
import { validateAndSetSessionContext } from '@/utils/cartSessionUtils';

export const loadCartItemsSecure = async (token: string, userId?: string): Promise<CartItem[]> => {
  try {
    // Simple rate limiting
    const rateLimitKey = createRateLimitKey('load', userId, token.slice(0, 10));
    if (!await checkSimpleRateLimit(rateLimitKey, 50)) {
      await logSecurityEvent('CART_LOAD_RATE_LIMITED', { 
        user_id: userId, 
        token_prefix: token.slice(0, 10) 
      }, 'WARNING');
      return [];
    }

    // Enhanced session context for anonymous users
    if (!await validateAndSetSessionContext(token, userId, 'LOAD')) {
      return [];
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
