
import { useAuth } from '@/components/AuthGuard';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Lock } from 'lucide-react';

interface ProtectedCheckoutProps {
  children: React.ReactNode;
}

export const ProtectedCheckout = ({ children }: ProtectedCheckoutProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading secure checkout...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-200 text-center">
          <div className="mb-6">
            <Shield className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Secure Checkout Required</h2>
            <p className="text-slate-600">
              To protect your privacy and ensure secure transactions, please sign in or create an account before making a purchase.
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Lock className="w-4 h-4 text-green-600" />
              <span>Encrypted and secure payments</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Protected student data privacy</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Lock className="w-4 h-4 text-green-600" />
              <span>Easy order tracking and management</span>
            </div>
          </div>

          <Button
            onClick={() => navigate('/auth', { state: { from: location.pathname + location.search } })}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 text-lg rounded-xl hover:shadow-lg transition-all duration-300 mb-4"
          >
            Sign In / Create Account
          </Button>

          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            Continue Browsing
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
