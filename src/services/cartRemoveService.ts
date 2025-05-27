
import { supabase } from '@/integrations/supabase/client';
import { logSecurityEvent } from '@/utils/securityUtils';
import { checkSimpleRateLimit, createRateLimitKey } from '@/utils/rateLimitUtils';
import { validateAndSetSessionContext } from '@/utils/cartSessionUtils';

export const removeCartItemSecure = async (
  id: string, 
  sessionToken: string, 
  userId?: string
): Promise<boolean> => {
  try {
    // Simple rate limiting
    const rateLimitKey = createRateLimitKey('remove', userId, sessionToken.slice(0, 10));
    if (!await checkSimpleRateLimit(rateLimitKey, 30)) {
      await logSecurityEvent('CART_REMOVE_RATE_LIMITED', { 
        item_id: id,
        user_id: userId 
      }, 'WARNING');
      return false;
    }

    // Enhanced session context for anonymous users
    if (!await validateAndSetSessionContext(sessionToken, userId, 'REMOVE')) {
      return false;
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
