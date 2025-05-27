
import { supabase } from '@/integrations/supabase/client';
import { logSecurityEvent } from '@/utils/securityUtils';
import { checkSimpleRateLimit, createRateLimitKey } from '@/utils/rateLimitUtils';
import { validateAndSetSessionContext } from '@/utils/cartSessionUtils';

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
    const rateLimitKey = createRateLimitKey('update', userId, sessionToken.slice(0, 10));
    if (!await checkSimpleRateLimit(rateLimitKey, 40)) {
      await logSecurityEvent('CART_UPDATE_RATE_LIMITED', { 
        item_id: id,
        user_id: userId 
      }, 'WARNING');
      return false;
    }

    // Enhanced session context for anonymous users
    if (!await validateAndSetSessionContext(sessionToken, userId, 'UPDATE')) {
      return false;
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
