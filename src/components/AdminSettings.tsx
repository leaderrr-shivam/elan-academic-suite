
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { logSecurityEvent } from '@/utils/securityUtils';
import { useAuth } from '@/components/AuthGuard';
import { Shield, Lock, AlertCircle } from 'lucide-react';

const AdminSettings = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Log admin settings page access
  useEffect(() => {
    const logPageAccess = async () => {
      if (user) {
        await logSecurityEvent('ADMIN_SETTINGS_PAGE_ACCESSED', user.id, {
          timestamp: Date.now(),
          user_email: user.email
        }, 'INFO');
      }
    };
    
    logPageAccess();
  }, [user]);

  const handleGetEmail = async () => {
    if (user) {
      await logSecurityEvent('ADMIN_EMAIL_CONFIG_INITIATED', user.id, {
        timestamp: Date.now()
      }, 'INFO');
    }
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!adminEmail || !adminEmail.includes('@')) {
      await logSecurityEvent('ADMIN_EMAIL_UPDATE_INVALID', user?.id, {
        attempted_email: adminEmail,
        error: 'Invalid email format'
      }, 'WARNING');
      
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Log the update attempt
      await logSecurityEvent('ADMIN_EMAIL_UPDATE_ATTEMPT', user?.id, {
        new_email: adminEmail,
        timestamp: Date.now()
      }, 'INFO');

      const { error } = await supabase.functions.invoke('update-admin-settings', {
        body: { adminEmail }
      });

      if (error) throw error;

      // Log successful update
      await logSecurityEvent('ADMIN_EMAIL_UPDATE_SUCCESS', user?.id, {
        new_email: adminEmail,
        timestamp: Date.now()
      }, 'INFO');

      toast({
        title: "Admin Email Updated",
        description: `Admin email has been successfully updated to: ${adminEmail}`,
      });
      
      setShowForm(false);
      setAdminEmail('');
    } catch (error: any) {
      console.error('Error updating admin settings:', error);
      
      // Log the error
      await logSecurityEvent('ADMIN_EMAIL_UPDATE_ERROR', user?.id, {
        error: error.message,
        attempted_email: adminEmail
      }, 'CRITICAL');
      
      toast({
        title: "Error",
        description: "Failed to update admin email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!showForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto border-2 border-blue-200 shadow-xl">
          <CardHeader className="text-center">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Secure Admin Configuration</CardTitle>
            <CardDescription>
              Enterprise-grade admin email configuration for order notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 mb-1">Security Notice</p>
                    <p className="text-sm text-blue-700">
                      This page is protected with enterprise-grade security. All actions are logged and monitored.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  Configure the secure admin email address to receive encrypted order notifications.
                </p>
                <Button 
                  onClick={handleGetEmail}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Configure Admin Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto border-2 border-blue-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Secure Admin Email Setup</CardTitle>
          <CardDescription>
            Enter your secure email address for encrypted order notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800 mb-1">Security Warning</p>
                <p className="text-sm text-yellow-700">
                  This email will receive sensitive order information. Use a secure, monitored email address.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Secure Admin Email Address</Label>
              <Input
                id="adminEmail"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="secure-admin@your-domain.com"
                required
                autoFocus
                className="border-2 border-slate-300 focus:border-blue-500"
              />
              <p className="text-sm text-gray-600">
                This email will receive encrypted notifications for all new orders with enhanced security
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Securing...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Secure Update
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
