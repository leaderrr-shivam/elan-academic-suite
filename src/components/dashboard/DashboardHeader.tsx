
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface DashboardHeaderProps {
  user: User | null;
  onRefresh: () => void;
}

export const DashboardHeader = ({ user, onRefresh }: DashboardHeaderProps) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
        </h1>
        <p className="text-slate-600">Track your orders and manage your projects</p>
      </div>
      <Button
        onClick={onRefresh}
        variant="outline"
        className="mt-4 sm:mt-0 border-blue-600 text-blue-600 hover:bg-blue-50"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh
      </Button>
    </div>
  );
};
