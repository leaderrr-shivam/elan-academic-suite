
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { logSecurityEvent } from '@/utils/securityUtils';
import { useAuth } from '@/components/AuthGuard';
import AdminHeader from './AdminHeader';
import AdminWelcomeMessage from './AdminWelcomeMessage';

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
        });
      }
    };
    
    logPageAccess();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto border-2 border-blue-200 shadow-xl">
        <AdminHeader />
        <AdminWelcomeMessage />
      </Card>
    </div>
  );
};

export default AdminSettings;
