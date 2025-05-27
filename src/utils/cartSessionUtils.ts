
import { setEnhancedSessionContext, validateEnhancedSessionToken } from '@/utils/enhancedSessionUtils';
import { logSecurityEvent } from '@/utils/securityUtils';

export const validateAndSetSessionContext = async (
  token: string, 
  userId?: string, 
  operation?: string
): Promise<boolean> => {
  if (!userId && token) {
    if (!await validateEnhancedSessionToken(token)) {
      await logSecurityEvent(`CART_${operation?.toUpperCase()}_INVALID_TOKEN`, { 
        token_prefix: token.slice(0, 10) 
      }, 'WARNING');
      return false;
    }
    
    await setEnhancedSessionContext(token);
  }
  
  return true;
};
