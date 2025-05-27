
import { supabase } from '@/integrations/supabase/client';
import { generateSecureSessionToken, logSecurityEvent, validateSessionToken } from './securityUtils';

// Enhanced secure token generation with better entropy
export const generateEnhancedSecureToken = (): string => {
  return generateSecureSessionToken();
};

// Enhanced session context setting with security logging
export const setEnhancedSessionContext = async (token: string): Promise<void> => {
  try {
    await supabase.rpc('set_session_context', {
      parameter_name: 'request.session_token',
      parameter_value: token
    });
    
    await logSecurityEvent('SESSION_CONTEXT_SET', { 
      token_length: token.length,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Enhanced session context not set:', error);
    await logSecurityEvent('SESSION_CONTEXT_FAILED', { 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, 'WARNING');
  }
};

// Validate session token using enhanced validation
export const validateEnhancedSessionToken = async (token: string): Promise<boolean> => {
  return validateSessionToken(token);
};
