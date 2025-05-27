
import { supabase } from '@/integrations/supabase/client';
import { generateSecureSessionToken, logSecurityEvent } from './securityUtils';

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
  try {
    const { data, error } = await supabase.rpc('validate_session_token_secure', {
      token
    });
    
    if (error) {
      await logSecurityEvent('TOKEN_VALIDATION_ERROR', { 
        error: error.message 
      }, 'WARNING');
      return false;
    }
    
    const isValid = data === true;
    
    if (!isValid) {
      await logSecurityEvent('TOKEN_VALIDATION_FAILED', { 
        token_length: token.length 
      }, 'WARNING');
    }
    
    return isValid;
  } catch (error) {
    await logSecurityEvent('TOKEN_VALIDATION_EXCEPTION', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 'CRITICAL');
    return false;
  }
};
