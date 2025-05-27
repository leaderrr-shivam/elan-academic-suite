
import { supabase } from '@/integrations/supabase/client';

// Generate secure session token for anonymous users
export const generateSecureToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Set session context for RLS validation using our custom function
export const setSessionContext = async (token: string): Promise<void> => {
  try {
    await supabase.rpc('set_session_context', {
      parameter_name: 'request.session_token',
      parameter_value: token
    });
  } catch (error) {
    console.log('Session context not set:', error);
  }
};
