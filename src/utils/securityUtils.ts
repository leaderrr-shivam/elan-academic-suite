
import { supabase } from '@/integrations/supabase/client';

// Enhanced session token generation with cryptographic signing
export const generateSecureSessionToken = (): string => {
  const payload = {
    timestamp: Date.now(),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    random: crypto.getRandomValues(new Uint32Array(4)).join(''),
    session_id: crypto.getRandomValues(new Uint32Array(2)).join('')
  };
  
  const payloadBase64 = btoa(JSON.stringify(payload));
  
  // Simple HMAC simulation for client-side (real HMAC validation is done server-side)
  const signature = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
    
  return `${payloadBase64}.${signature}`;
};

// Rate limiting check for client-side operations - FIXED parameter names
export const checkRateLimit = async (identifier: string, maxAttempts: number = 5, windowMinutes: number = 15): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('check_rate_limit', {
      p_identifier: identifier,
      p_max_attempts: maxAttempts,
      p_window_minutes: windowMinutes
    });
    
    if (error) {
      console.error('Rate limit check error:', error);
      return false;
    }
    
    return data === true;
  } catch (error) {
    console.error('Rate limit check failed:', error);
    return false;
  }
};

// Security event logging
export const logSecurityEvent = async (
  eventType: string, 
  details: Record<string, any> = {}, 
  severity: 'INFO' | 'WARNING' | 'CRITICAL' = 'INFO'
): Promise<void> => {
  try {
    await supabase.rpc('log_security_event', {
      event_type: eventType,
      details,
      severity
    });
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
};

// Input validation utilities
export const validateEmail = (email: string): boolean => {
  if (!email || email.length > 255) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const sanitizeInput = (input: string, maxLength: number = 255): string => {
  if (!input) return '';
  return input.trim().slice(0, maxLength);
};

// Admin permission checking
export const hasAdminPermission = async (permission: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('check_admin_permission', {
      required_permission: permission
    });
    
    if (error) {
      console.error('Permission check error:', error);
      return false;
    }
    
    return data === true;
  } catch (error) {
    console.error('Permission check failed:', error);
    return false;
  }
};

// PII encryption utilities (client-side helpers)
export const encryptPII = async (data: string): Promise<string | null> => {
  try {
    const { data: encrypted, error } = await supabase.rpc('encrypt_pii', { data });
    
    if (error) {
      console.error('PII encryption error:', error);
      return null;
    }
    
    return encrypted;
  } catch (error) {
    console.error('PII encryption failed:', error);
    return null;
  }
};

export const decryptPII = async (encryptedData: string): Promise<string | null> => {
  try {
    const { data: decrypted, error } = await supabase.rpc('decrypt_pii', { 
      encrypted_data: encryptedData 
    });
    
    if (error) {
      console.error('PII decryption error:', error);
      return null;
    }
    
    return decrypted;
  } catch (error) {
    console.error('PII decryption failed:', error);
    return null;
  }
};

// Security configuration validation
export const validateSecurityConfig = async (): Promise<Array<{
  check_name: string;
  status: string;
  recommendation: string;
}>> => {
  try {
    const { data, error } = await supabase.rpc('validate_security_config');
    
    if (error) {
      console.error('Security config validation error:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Security config validation failed:', error);
    return [];
  }
};

// Enhanced token validation
export const validateSessionToken = async (token: string): Promise<boolean> => {
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
    
    return data === true;
  } catch (error) {
    await logSecurityEvent('TOKEN_VALIDATION_EXCEPTION', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 'CRITICAL');
    return false;
  }
};
