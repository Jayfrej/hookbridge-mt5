import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Play, RotateCcw, Square, Trash2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface Account {
  id: string;
  account: string;
  nickname: string;
  pid: string | null;
  created: string;
  status: 'Online' | 'Offline' | 'Pending';
}

interface AccountTableProps {
  accounts: Account[];
  onOpen: (account: string) => void;
  onRestart: (account: string) => void;
  onStop: (account: string) => void;
  onDelete: (account: string) => void;
}

const StatusBadge = ({ status }: { status: Account['status'] }) => {
  const variants = {
    Online: 'bg-success/20 text-success border-success/30 hover:bg-success/30',
    Offline: 'bg-offline/20 text-offline border-offline/30 hover:bg-offline/30',
    Pending: 'bg-pending/20 text-pending border-pending/30 hover:bg-pending/30'
  };

  return (
    <Badge variant="outline" className={cn("font-medium", variants[status])}>
      <div className={cn("w-2 h-2 rounded-full mr-2", {
        'bg-success': status === 'Online',
        'bg-offline': status === 'Offline', 
        'bg-pending animate-pulse': status === 'Pending'
      })} />
      {status}
    </Badge>
  );
};

export const AccountTable = ({ accounts, onOpen, onRestart, onStop, onDelete }: AccountTableProps) => {
  if (accounts.length === 0) {
    return (
      <Card className="trading-card">
        <CardContent className="py-16 text-center">
          <div className="text-muted-foreground text-lg">
            No MT5 accounts configured yet
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            Add your first account to get started
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="trading-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-4 px-6 font-semibold text-sm">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-sm">Account</th>
                <th className="text-left py-4 px-6 font-semibold text-sm">Nickname</th>
                <th className="text-left py-4 px-6 font-semibold text-sm">PID</th>
                <th className="text-left py-4 px-6 font-semibold text-sm">Created</th>
                <th className="text-center py-4 px-6 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6">
                    <StatusBadge status={account.status} />
                  </td>
                  <td className="py-4 px-6 font-mono text-sm">{account.account}</td>
                  <td className="py-4 px-6">{account.nickname}</td>
                  <td className="py-4 px-6 font-mono text-sm text-muted-foreground">
                    {account.pid || '—'}
                  </td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">
                    {new Date(account.created).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOpen(account.account)}
                        className="border-primary/20 text-primary hover:bg-primary/10"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRestart(account.account)}
                        className="border-warning/20 text-warning hover:bg-warning/10"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      
                      {account.status === 'Online' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onStop(account.account)}
                          className="border-offline/20 text-offline hover:bg-offline/10"
                        >
                          <Square className="w-4 h-4" />
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(account.account)}
                        className="border-destructive/20 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};