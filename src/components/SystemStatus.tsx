import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Server, Users } from "lucide-react";

interface SystemStatusProps {
  totalAccounts: number;
  onlineAccounts: number;
  offlineAccounts: number;
  systemUptime: string;
}

export const SystemStatus = ({ 
  totalAccounts, 
  onlineAccounts, 
  offlineAccounts,
  systemUptime 
}: SystemStatusProps) => {
  const systemHealth = onlineAccounts === totalAccounts ? 'healthy' : 
                       onlineAccounts > 0 ? 'partial' : 'offline';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="trading-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Status</CardTitle>
          <Server className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={
                systemHealth === 'healthy' 
                  ? 'bg-success/20 text-success border-success/30'
                  : systemHealth === 'partial'
                  ? 'bg-pending/20 text-pending border-pending/30'
                  : 'bg-offline/20 text-offline border-offline/30'
              }
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${
                systemHealth === 'healthy' ? 'bg-success' :
                systemHealth === 'partial' ? 'bg-pending animate-pulse' :
                'bg-offline'
              }`} />
              {systemHealth === 'healthy' ? 'All Systems Online' :
               systemHealth === 'partial' ? 'Partial Connectivity' :
               'System Offline'}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Uptime: {systemUptime}
          </p>
        </CardContent>
      </Card>

      <Card className="trading-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
          <Activity className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{onlineAccounts}</div>
          <p className="text-xs text-muted-foreground">
            of {totalAccounts} accounts online
          </p>
        </CardContent>
      </Card>

      <Card className="trading-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAccounts}</div>
          <p className="text-xs text-muted-foreground">
            {offlineAccounts} offline
          </p>
        </CardContent>
      </Card>
    </div>
  );
};