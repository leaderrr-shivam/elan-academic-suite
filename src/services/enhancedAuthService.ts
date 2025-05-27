
import { supabase } from '@/integrations/supabase/client';
import { checkRateLimit, logSecurityEvent, validateEmail, sanitizeInput } from '@/utils/securityUtils';

export const signInSecure = async (email: string, password: string) => {
  try {
    // Input validation
    const cleanEmail = sanitizeInput(email.toLowerCase());
    if (!validateEmail(cleanEmail)) {
      await logSecurityEvent('AUTH_SIGNIN_INVALID_EMAIL', { 
        email: cleanEmail 
      }, 'WARNING');
      throw new Error('Invalid email format');
    }

    // Rate limiting
    if (!await checkRateLimit(`signin:${cleanEmail}`, 5, 15)) {
      await logSecurityEvent('AUTH_SIGNIN_RATE_LIMITED', { 
        email: cleanEmail 
      }, 'CRITICAL');
      throw new Error('Too many login attempts. Please try again later.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      await logSecurityEvent('AUTH_SIGNIN_FAILED', { 
        email: cleanEmail,
        error: error.message
      }, 'WARNING');
      
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Invalid email or password. Please check your credentials.');
      } else if (error.message.includes('Email not confirmed')) {
        throw new Error('Please check your email and click the confirmation link before signing in.');
      }
      throw error;
    }

    await logSecurityEvent('AUTH_SIGNIN_SUCCESS', { 
      email: cleanEmail,
      user_id: data.user?.id
    });

    return data;
  } catch (error) {
    console.error('Secure sign-in error:', error);
    throw error;
  }
};

export const signUpSecure = async (email: string, password: string, fullName?: string) => {
  try {
    // Input validation
    const cleanEmail = sanitizeInput(email.toLowerCase());
    const cleanFullName = fullName ? sanitizeInput(fullName, 100) : '';
    
    if (!validateEmail(cleanEmail)) {
      await logSecurityEvent('AUTH_SIGNUP_INVALID_EMAIL', { 
        email: cleanEmail 
      }, 'WARNING');
      throw new Error('Invalid email format');
    }

    if (password.length < 6) {
      await logSecurityEvent('AUTH_SIGNUP_WEAK_PASSWORD', { 
        email: cleanEmail 
      }, 'WARNING');
      throw new Error('Password must be at least 6 characters long');
    }

    // Rate limiting
    if (!await checkRateLimit(`signup:${cleanEmail}`, 3, 60)) {
      await logSecurityEvent('AUTH_SIGNUP_RATE_LIMITED', { 
        email: cleanEmail 
      }, 'CRITICAL');
      throw new Error('Too many signup attempts. Please try again later.');
    }

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: cleanFullName,
        }
      }
    });

    if (error) {
      await logSecurityEvent('AUTH_SIGNUP_FAILED', { 
        email: cleanEmail,
        error: error.message
      }, 'WARNING');
      
      if (error.message.includes('User already registered')) {
        throw new Error('An account with this email already exists. Please sign in instead.');
      } else if (error.message.includes('Password should be')) {
        throw new Error('Password should be at least 6 characters long.');
      }
      throw error;
    }

    await logSecurityEvent('AUTH_SIGNUP_SUCCESS', { 
      email: cleanEmail,
      user_id: data.user?.id
    });

    return data;
  } catch (error) {
    console.error('Secure sign-up error:', error);
    throw error;
  }
};

export const signOutSecure = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      await logSecurityEvent('AUTH_SIGNOUT_FAILED', { 
        error: error.message 
      }, 'WARNING');
      throw error;
    }

    await logSecurityEvent('AUTH_SIGNOUT_SUCCESS');
    
    // Clear secure session tokens
    localStorage.removeItem('secure_cart_session');
    
    return true;
  } catch (error) {
    console.error('Secure sign-out error:', error);
    throw error;
  }
};
