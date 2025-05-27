
import { Card, CardContent } from "@/components/ui/card";
import { User, Package, Clock, CheckCircle, TrendingUp } from "lucide-react";

interface StatsData {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

interface DashboardStatsProps {
  stats: StatsData;
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
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
  );
};
