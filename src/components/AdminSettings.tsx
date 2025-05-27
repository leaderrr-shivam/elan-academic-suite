
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { logSecurityEvent } from '@/utils/securityUtils';
import { useAuth } from '@/components/AuthGuard';
import { Shield } from 'lucide-react';

const AdminSettings = () => {
  const { user } = useAuth();

  // Log admin settings page access
  useEffect(() => {
    const logPageAccess = async () => {
      if (user) {
        await logSecurityEvent('ADMIN_SETTINGS_PAGE_ACCESSED', {
          user_id: user.id,
          timestamp: Date.now(),
          user_email: user.email
        }, 'INFO');
      }
    };
    
    logPageAccess();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto border-2 border-blue-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Admin Settings</CardTitle>
          <CardDescription>
            Administrative configuration panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Welcome to the admin panel. More settings will be available here in the future.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
