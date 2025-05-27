
import { supabase } from '@/integrations/supabase/client';
import { logSecurityEvent } from '@/utils/securityUtils';
import { checkSimpleRateLimit, createRateLimitKey } from '@/utils/rateLimitUtils';
import { validateAndSetSessionContext } from '@/utils/cartSessionUtils';

export const clearCartItemsSecure = async (
  sessionToken: string, 
  userId?: string
): Promise<boolean> => {
  try {
    // Simple rate limiting
    const rateLimitKey = createRateLimitKey('clear', userId, sessionToken.slice(0, 10));
    if (!await checkSimpleRateLimit(rateLimitKey, 5)) {
      await logSecurityEvent('CART_CLEAR_RATE_LIMITED', { 
        user_id: userId 
      }, 'WARNING');
      return false;
    }

    // Enhanced session context for anonymous users
    if (!await validateAndSetSessionContext(sessionToken, userId, 'CLEAR')) {
      return false;
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
