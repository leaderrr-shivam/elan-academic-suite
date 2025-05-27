
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const AdminHeader = () => {
  return (
    <CardHeader className="text-center">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Shield className="w-8 h-8 text-white" />
      </div>
      <CardTitle className="text-2xl">Admin Settings</CardTitle>
      <CardDescription>
        Administrative configuration panel
      </CardDescription>
    </CardHeader>
  );
};

export default AdminHeader;
