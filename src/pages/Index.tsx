import { useState, useEffect } from "react";
import { TradingHeader } from "@/components/TradingHeader";
import { SystemStatus } from "@/components/SystemStatus";
import { AddAccountForm } from "@/components/AddAccountForm";
import { AccountTable } from "@/components/AccountTable";
import { WebhookInfo } from "@/components/WebhookInfo";
import { useToast } from "@/hooks/use-toast";

interface Account {
  id: string;
  account: string;
  nickname: string;
  pid: string | null;
  created: string;
  status: 'Online' | 'Offline' | 'Pending';
}

const Index = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      account: "1123456",
      nickname: "Main Trading Account",
      pid: "12345",
      created: new Date().toISOString(),
      status: 'Online'
    },
    {
      id: "2", 
      account: "2234567",
      nickname: "Backup Account",
      pid: null,
      created: new Date(Date.now() - 86400000).toISOString(),
      status: 'Offline'
    }
  ]);
  
  const [systemUptime, setSystemUptime] = useState("2h 15m");
  const { toast } = useToast();

  const webhookUrl = "https://your-domain.com/webhook/your-secure-token";

  const onlineAccounts = accounts.filter(acc => acc.status === 'Online').length;
  const offlineAccounts = accounts.filter(acc => acc.status === 'Offline').length;

  const handleAddAccount = async (account: string, nickname: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAccount: Account = {
      id: Date.now().toString(),
      account,
      nickname,
      pid: null,
      created: new Date().toISOString(),
      status: 'Pending'
    };
    
    setAccounts(prev => [...prev, newAccount]);
    
    // Simulate MT5 launch process
    setTimeout(() => {
      setAccounts(prev => prev.map(acc => 
        acc.id === newAccount.id 
          ? { ...acc, status: 'Online', pid: Math.floor(Math.random() * 90000 + 10000).toString() }
          : acc
      ));
    }, 2000);
  };

  const handleOpen = async (account: string) => {
    toast({
      title: "Opening MT5 Instance",
      description: `Launching MetaTrader 5 for account ${account}`,
    });
    
    setAccounts(prev => prev.map(acc => 
      acc.account === account 
        ? { ...acc, status: 'Pending' }
        : acc
    ));

    setTimeout(() => {
      setAccounts(prev => prev.map(acc => 
        acc.account === account 
          ? { ...acc, status: 'Online', pid: acc.pid || Math.floor(Math.random() * 90000 + 10000).toString() }
          : acc
      ));
    }, 2000);
  };

  const handleRestart = async (account: string) => {
    toast({
      title: "Restarting Instance",
      description: `Restarting MT5 for account ${account}`,
    });
    
    setAccounts(prev => prev.map(acc => 
      acc.account === account 
        ? { ...acc, status: 'Pending' }
        : acc
    ));

    setTimeout(() => {
      setAccounts(prev => prev.map(acc => 
        acc.account === account 
          ? { ...acc, status: 'Online', pid: Math.floor(Math.random() * 90000 + 10000).toString() }
          : acc
      ));
    }, 3000);
  };

  const handleStop = async (account: string) => {
    toast({
      title: "Stopping Instance",
      description: `Stopping MT5 for account ${account}`,
      variant: "destructive"
    });
    
    setAccounts(prev => prev.map(acc => 
      acc.account === account 
        ? { ...acc, status: 'Offline', pid: null }
        : acc
    ));
  };

  const handleDelete = async (account: string) => {
    toast({
      title: "Account Removed",
      description: `Account ${account} has been removed from the system`,
      variant: "destructive"
    });
    
    setAccounts(prev => prev.filter(acc => acc.account !== account));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const startTime = new Date(now.getTime() - Math.random() * 10800000); // Random uptime up to 3 hours
      const diff = now.getTime() - startTime.getTime();
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      setSystemUptime(`${hours}h ${minutes}m`);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <TradingHeader />
        
        <SystemStatus
          totalAccounts={accounts.length}
          onlineAccounts={onlineAccounts}
          offlineAccounts={offlineAccounts}
          systemUptime={systemUptime}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AddAccountForm onAddAccount={handleAddAccount} />
          <WebhookInfo webhookUrl={webhookUrl} />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">MT5 Account Management</h2>
          <AccountTable
            accounts={accounts}
            onOpen={handleOpen}
            onRestart={handleRestart}
            onStop={handleStop}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
