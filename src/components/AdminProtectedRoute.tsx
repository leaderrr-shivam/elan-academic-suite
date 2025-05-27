
import { useAuth } from '@/components/AuthGuard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { hasAdminPermission, logSecurityEvent } from '@/utils/securityUtils';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

export const AdminProtectedRoute = ({ 
  children, 
  requiredPermission = 'can_manage_products' 
}: AdminProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [permissionLoading, setPermissionLoading] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!user) {
        // Log unauthorized access attempt
        await logSecurityEvent('ADMIN_ACCESS_ATTEMPT_UNAUTHENTICATED', undefined, {
          page: 'admin-settings',
          user_agent: navigator.userAgent,
          timestamp: Date.now()
        }, 'WARNING');
        
        setIsAdmin(false);
        setPermissionLoading(false);
        return;
      }

      try {
        const hasPermission = await hasAdminPermission(requiredPermission);
        
        if (!hasPermission) {
          // Log unauthorized admin access attempt
          await logSecurityEvent('ADMIN_ACCESS_DENIED', user.id, {
            page: 'admin-settings',
            required_permission: requiredPermission,
            email: user.email
          }, 'CRITICAL');
        } else {
          // Log successful admin access
          await logSecurityEvent('ADMIN_ACCESS_GRANTED', user.id, {
            page: 'admin-settings',
            permission: requiredPermission
          }, 'INFO');
        }
        
        setIsAdmin(hasPermission);
      } catch (error) {
        console.error('Error checking admin permissions:', error);
        await logSecurityEvent('ADMIN_PERMISSION_CHECK_ERROR', user.id, {
          error: error instanceof Error ? error.message : 'Unknown error'
        }, 'CRITICAL');
        setIsAdmin(false);
      } finally {
        setPermissionLoading(false);
      }
    };

    if (!loading) {
      checkAdminAccess();
    }
  }, [user, loading, requiredPermission]);

  // Show loading state
  if (loading || permissionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // User not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-red-200 text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-br from-red-600 to-orange-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Access Denied</h2>
            <p className="text-slate-600 text-lg">
              Authentication required to access this admin area.
            </p>
          </div>

          <button
            onClick={() => navigate('/auth')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 text-lg font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 mb-4"
          >
            <Shield className="w-5 h-5 mr-2 inline" />
            Sign In to Continue
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 py-3 rounded-xl font-semibold"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // User authenticated but not admin
  if (isAdmin === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-red-200 text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-br from-red-600 to-orange-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Unauthorized Access</h2>
            <p className="text-slate-600 text-lg">
              You don't have the required administrator privileges to access this area.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <p className="text-sm text-red-600 font-medium">
                This attempt has been logged for security purposes.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 text-lg font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // User is authenticated and has admin permissions
  return <>{children}</>;
};
