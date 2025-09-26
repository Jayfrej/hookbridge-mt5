import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Zap } from "lucide-react";
import tradingHero from "@/assets/trading-hero.jpg";

export const TradingHeader = () => {
  return (
    <Card className="trading-card border-primary/20 overflow-hidden">
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${tradingHero})` }}
      >
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
        <CardContent className="relative py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h1 className="trading-title">MT5 Multi-Account Trading System</h1>
            </div>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional webhook-based trading solution for managing multiple MetaTrader 5 accounts
            </p>
            
            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge variant="outline" className="border-success/30 text-success bg-success/10">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </Badge>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                <Zap className="w-3 h-3 mr-1" />
                Real-time
              </Badge>
              <Badge variant="outline" className="border-warning/30 text-warning bg-warning/10">
                <TrendingUp className="w-3 h-3 mr-1" />
                Multi-Account
              </Badge>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};