
import { supabase } from '@/integrations/supabase/client';
import { generateEnhancedSecureToken, setEnhancedSessionContext } from './enhancedSessionUtils';

// Backward compatibility - use enhanced token generation
export const generateSecureToken = (): string => {
  return generateEnhancedSecureToken();
};

// Backward compatibility - use enhanced session context
export const setSessionContext = async (token: string): Promise<void> => {
  return setEnhancedSessionContext(token);
};
