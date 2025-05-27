
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthGuard";
import { ProtectedDashboard } from "@/components/ProtectedDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Package, Clock, CheckCircle, Download, Eye, RefreshCw, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  specialization: string;
  total_amount: number;
  order_status: string;
  items: any[];
  created_at: string;
  payment_method: string;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSpecializationBadge = (specialization: string) => {
    switch (specialization) {
      case 'cloud_security':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'data_analytics':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatSpecialization = (specialization: string) => {
    switch (specialization) {
      case 'cloud_security':
        return 'Cloud & Security';
      case 'data_analytics':
        return 'Data Analytics';
      default:
        return 'Not Specified';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
                </h1>
                <p className="text-slate-600">Track your orders and manage your projects</p>
              </div>
              <Button
                onClick={fetchUserOrders}
                variant="outline"
                className="mt-4 sm:mt-0 border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white shadow-lg border-slate-200 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Orders</p>
                      <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    All time
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-slate-200 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">In Progress</p>
                      <p className="text-3xl font-bold text-slate-900">{stats.inProgress}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-orange-600">
                    <Clock className="w-4 h-4 mr-1" />
                    Active projects
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-slate-200 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Completed</p>
                      <p className="text-3xl font-bold text-slate-900">{stats.completed}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Delivered
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-gold-400 to-gold-500 text-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/90">Membership</p>
                      <p className="text-3xl font-bold text-white">Gold</p>
                    </div>
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="mt-4 flex items-center text-sm text-white/90">
                    <User className="w-4 h-4 mr-1" />
                    Premium member
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Orders Table */}
            <Card className="bg-white shadow-lg border-slate-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">Your Orders</CardTitle>
                <CardDescription>
                  {orders.length > 0 
                    ? `You have ${orders.length} order${orders.length > 1 ? 's' : ''} in total`
                    : "No orders found. Place your first order to get started!"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">No orders yet</h3>
                    <p className="text-slate-500 mb-6">Start your academic journey by placing your first order</p>
                    <Button onClick={() => window.location.href = '/'} className="bg-gradient-to-r from-blue-600 to-indigo-700">
                      Explore Services
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[120px]">Order #</TableHead>
                          <TableHead className="min-w-[150px]">Specialization</TableHead>
                          <TableHead className="min-w-[100px]">Amount</TableHead>
                          <TableHead className="min-w-[120px]">Status</TableHead>
                          <TableHead className="min-w-[150px]">Date</TableHead>
                          <TableHead className="min-w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id} className="hover:bg-slate-50">
                            <TableCell className="font-medium">
                              {order.order_number}
                            </TableCell>
                            <TableCell>
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getSpecializationBadge(order.specialization)}`}>
                                {formatSpecialization(order.specialization)}
                              </span>
                            </TableCell>
                            <TableCell className="font-semibold">
                              {formatCurrency(order.total_amount)}
                            </TableCell>
                            <TableCell>
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(order.order_status)}`}>
                                {order.order_status.replace('_', ' ')}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm text-slate-600">
                              {formatDate(order.created_at)}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 border-blue-200 hover:bg-blue-50"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedDashboard>
  );
};

export default Dashboard;
