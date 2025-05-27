
import React from 'react';
import { CardContent } from '@/components/ui/card';

const AdminWelcomeMessage = () => {
  return (
    <CardContent>
      <div className="text-center">
        <p className="text-gray-600 mb-6">
          Welcome to the admin panel. More settings will be available here in the future.
        </p>
      </div>
    </CardContent>
  );
};

export default AdminWelcomeMessage;
