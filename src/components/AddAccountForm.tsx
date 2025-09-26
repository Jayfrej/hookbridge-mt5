import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddAccountFormProps {
  onAddAccount: (account: string, nickname: string) => Promise<void>;
}

export const AddAccountForm = ({ onAddAccount }: AddAccountFormProps) => {
  const [account, setAccount] = useState("");
  const [nickname, setNickname] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!account.trim()) {
      toast({
        title: "Account Required",
        description: "Please enter an account number",
        variant: "destructive"
      });
      return;
    }

    if (!nickname.trim()) {
      toast({
        title: "Nickname Required", 
        description: "Please enter a nickname for this account",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddAccount(account.trim(), nickname.trim());
      setAccount("");
      setNickname("");
      toast({
        title: "Account Added",
        description: `MT5 account ${account} has been configured successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="trading-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          Add MT5 Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="account">Account Number</Label>
              <Input
                id="account"
                type="text"
                placeholder="e.g., 1123456"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="font-mono"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="e.g., Main Account"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full md:w-auto bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding Account...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Account
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};