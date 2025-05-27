
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthGuard";
import { ProtectedDashboard } from "@/components/ProtectedDashboard";
import { RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Json } from "@/integrations/supabase/types";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { OrdersTable } from "@/components/dashboard/OrdersTable";

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  specialization: string;
  total_amount: number;
  order_status: string;
  items: Json;
  created_at: string;
  payment_method: string;
  user_id: string;
  access_token: string;
  customer_phone: string | null;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });

  const fetchUserOrders = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        toast({
          title: "Error Loading Orders",
          description: "Failed to load your orders. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setOrders(data || []);
      
      // Calculate stats
      const stats = {
        total: data?.length || 0,
        pending: data?.filter(order => order.order_status === 'pending').length || 0,
        inProgress: data?.filter(order => order.order_status === 'in_progress').length || 0,
        completed: data?.filter(order => order.order_status === 'completed').length || 0
      };
      setStats(stats);
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Unexpected Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [user]);

  if (loading) {
    return (
      <ProtectedDashboard>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-slate-600">Loading your dashboard...</p>
          </div>
        </div>
      </ProtectedDashboard>
    );
  }

  return (
    <ProtectedDashboard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <DashboardHeader user={user} onRefresh={fetchUserOrders} />
            <DashboardStats stats={stats} />
            <OrdersTable orders={orders} />
          </div>
        </div>
      </div>
    </ProtectedDashboard>
  );
};

export default Dashboard;
