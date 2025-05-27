
import { useAuth } from '@/components/AuthGuard';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Crown } from 'lucide-react';

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
        <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-slate-200 text-center">
          <div className="mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Secure Student Portal</h2>
            <p className="text-slate-600 text-lg">
              To protect your privacy and ensure secure transactions, please sign in or create an account.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm text-slate-600 bg-green-50 p-3 rounded-xl border border-green-200">
              <Lock className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="font-medium">End-to-end encrypted payments</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 bg-blue-50 p-3 rounded-xl border border-blue-200">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="font-medium">GDPR compliant data protection</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 bg-purple-50 p-3 rounded-xl border border-purple-200">
              <Crown className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <span className="font-medium">Easy order tracking & management</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => navigate('/auth', { 
                state: { 
                  from: location.pathname + location.search,
                  ...location.state
                } 
              })}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 text-lg font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Shield className="w-5 h-5 mr-2" />
              Enter Secure Portal
            </Button>

            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 py-3 rounded-xl font-semibold"
            >
              Continue Browsing
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500 leading-relaxed">
              Your academic success and data privacy are our top priorities. All transactions are secured with industry-standard encryption.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
