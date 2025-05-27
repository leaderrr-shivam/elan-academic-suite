
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Eye } from "lucide-react";
import { Json } from "@/integrations/supabase/types";

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

interface OrdersTableProps {
  orders: Order[];
}

export const OrdersTable = ({ orders }: OrdersTableProps) => {
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
    // Enhanced currency detection with enterprise-grade validation
    if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
      console.warn('Invalid amount detected:', amount);
      return '₹0.00';
    }

    // Security: Prevent potential overflow attacks
    if (amount > Number.MAX_SAFE_INTEGER) {
      console.error('Amount exceeds safe integer limit:', amount);
      return '₹Error';
    }

    let actualAmount: number;
    
    // Intelligent detection: Check if amount appears to be in paisa
    // Rule: If amount has more than 2 decimal places when converted to string,
    // or if it's suspiciously large (> 100000 and ends in 00), it's likely in paisa
    const amountStr = amount.toString();
    const hasDecimals = amountStr.includes('.');
    const endsWithDoubleZero = amountStr.endsWith('00') && amountStr.length > 3;
    
    // More sophisticated detection:
    // 1. If amount > 100000 and ends with 00, likely paisa
    // 2. If amount is exactly divisible by 100 and > 10000, likely paisa
    // 3. If amount < 100, it's definitely rupees (even if it could be paisa)
    if (amount >= 100000 && endsWithDoubleZero && amount % 100 === 0) {
      // This looks like paisa (e.g., 599900 = ₹5,999.00)
      actualAmount = amount / 100;
    } else if (amount >= 10000 && amount % 100 === 0 && !hasDecimals) {
      // Large round number, likely paisa (e.g., 150000 = ₹1,500.00)
      actualAmount = amount / 100;
    } else {
      // This is already in rupees
      actualAmount = amount;
    }

    // Additional validation after conversion
    if (actualAmount < 0 || actualAmount > 10000000) { // Max ₹1 crore for safety
      console.warn('Converted amount outside expected range:', actualAmount);
      return '₹Invalid';
    }
    
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(actualAmount);
  };

  const formatDate = (dateString: string) => {
    // Security: Validate date string to prevent injection
    if (!dateString || typeof dateString !== 'string') {
      return 'Invalid Date';
    }
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid Date';
    }
  };

  // Security: Validate orders array
  if (!Array.isArray(orders)) {
    console.error('Orders is not an array:', orders);
    return (
      <Card className="bg-white shadow-lg border-slate-200">
        <CardContent className="p-6">
          <div className="text-center py-12 text-red-600">
            Error: Invalid orders data
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
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
                  <TableHead className="min-w-[120px] font-semibold">Order #</TableHead>
                  <TableHead className="min-w-[150px] font-semibold">Specialization</TableHead>
                  <TableHead className="min-w-[100px] font-semibold">Amount</TableHead>
                  <TableHead className="min-w-[120px] font-semibold">Status</TableHead>
                  <TableHead className="min-w-[150px] font-semibold">Date</TableHead>
                  <TableHead className="min-w-[100px] font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  // Security: Validate each order object
                  if (!order || typeof order !== 'object' || !order.id) {
                    console.warn('Invalid order object:', order);
                    return null;
                  }
                  
                  return (
                    <TableRow key={order.id} className="hover:bg-slate-50 transition-colors">
                      <TableCell className="font-medium text-slate-900">
                        {order.order_number || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getSpecializationBadge(order.specialization)}`}>
                          {formatSpecialization(order.specialization)}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold text-slate-900">
                        {formatCurrency(order.total_amount)}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(order.order_status)}`}>
                          {order.order_status ? order.order_status.replace('_', ' ') : 'Unknown'}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {formatDate(order.created_at)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 border-blue-200 hover:bg-blue-50 transition-colors"
                          aria-label={`View details for order ${order.order_number || order.id}`}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
