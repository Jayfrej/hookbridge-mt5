import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Link, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WebhookInfoProps {
  webhookUrl: string;
}

export const WebhookInfo = ({ webhookUrl }: WebhookInfoProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      setCopied(true);
      toast({
        title: "Webhook URL Copied",
        description: "The webhook URL has been copied to your clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy webhook URL to clipboard",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="trading-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="w-5 h-5 text-primary" />
          Webhook Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="webhook-url">Webhook URL</Label>
          <div className="flex gap-2">
            <Input
              id="webhook-url"
              type="text"
              value={webhookUrl}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="border-primary/20 text-primary hover:bg-primary/10"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Usage:</strong> Use this URL in TradingView alerts or other webhook sources</p>
          <p><strong>Method:</strong> POST</p>
          <p><strong>Content-Type:</strong> application/json</p>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="text-sm font-medium mb-2">Example JSON Payload:</div>
          <pre className="text-xs text-muted-foreground overflow-x-auto">
{`{
  "account_number": "1123456",
  "symbol": "XAUUSD",
  "action": "BUY",
  "volume": 0.10,
  "take_profit": 2400.0,
  "stop_loss": 2388.0,
  "comment": "tv-signal"
}`}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};