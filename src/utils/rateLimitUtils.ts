
import { logSecurityEvent } from '@/utils/securityUtils';

// Simplified rate limiting without database conflicts
export const checkSimpleRateLimit = async (key: string, maxAttempts: number): Promise<boolean> => {
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

export const createRateLimitKey = (operation: string, userId?: string, tokenPrefix?: string): string => {
  return userId ? `cart_${operation}_user_${userId}` : `cart_${operation}_session_${tokenPrefix}`;
};
