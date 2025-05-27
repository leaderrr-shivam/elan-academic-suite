
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthGuard';
import { useToast } from '@/hooks/use-toast';

interface ProtectedDashboardProps {
  children: React.ReactNode;
}

export const ProtectedDashboard = ({ children }: ProtectedDashboardProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Access Restricted",
        description: "Please sign in to access your dashboard.",
        variant: "destructive",
      });
      navigate('/auth', { state: { from: '/dashboard' } });
    }
  }, [user, loading, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Securing your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
