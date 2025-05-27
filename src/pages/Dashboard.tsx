import { useState } from "react";
import { useAuth } from "@/components/AuthGuard";
import { ProtectedDashboard } from "@/components/ProtectedDashboard";
import { Button } from "@/components/ui/button";
import { User, Package, Clock, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const orders = [
    {
      id: "ORD-001",
      product: "Data Structures Assignment",
      status: "Completed",
      date: "2024-01-15",
      amount: "₹2,999"
    },
    {
      id: "ORD-002", 
      product: "Web Development Project",
      status: "In Progress",
      date: "2024-01-20",
      amount: "₹9,999"
    }
  ];

  return (
    <ProtectedDashboard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back, {user?.user_metadata?.full_name || user?.email}!
              </h1>
              <p className="text-slate-600">Manage your orders and account settings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">2</div>
                    <div className="text-slate-600">Total Orders</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-orange-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">1</div>
                    <div className="text-slate-600">In Progress</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">1</div>
                    <div className="text-slate-600">Completed</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center">
                  <User className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">Gold</div>
                    <div className="text-slate-600">Membership</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
              <div className="border-b border-slate-200 p-6">
                <h2 className="text-2xl font-bold text-slate-900">Recent Orders</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-slate-900">{order.product}</h3>
                        <p className="text-sm text-slate-600">Order #{order.id} • {order.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900">{order.amount}</div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedDashboard>
  );
};

export default Dashboard;
