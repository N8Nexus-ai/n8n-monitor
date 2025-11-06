import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  trend = 'neutral', 
  icon: Icon,
  variant = 'default' 
}: MetricCardProps) {
  const variantStyles = {
    default: 'border-border/50 bg-gradient-to-br from-card to-card/50 hover:from-primary/5 hover:to-card',
    success: 'border-success/30 bg-gradient-to-br from-success/10 to-success/5 hover:shadow-glow-success',
    warning: 'border-warning/30 bg-gradient-to-br from-warning/10 to-warning/5',
    danger: 'border-destructive/30 bg-gradient-to-br from-destructive/10 to-destructive/5 hover:shadow-glow-danger',
  };

  const trendColors = {
    up: 'text-success',
    down: 'text-destructive',
    neutral: 'text-muted-foreground',
  };

  const iconVariants = {
    default: 'bg-gradient-primary text-primary-foreground shadow-glow',
    success: 'bg-gradient-success text-white shadow-glow-success',
    warning: 'bg-gradient-to-br from-warning to-warning/80 text-warning-foreground',
    danger: 'bg-gradient-danger text-white shadow-glow-danger',
  };

  return (
    <Card className={cn(
      'p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group',
      variantStyles[variant],
      'animate-fade-in'
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="mt-3 text-4xl font-bold text-foreground tracking-tight">{value}</p>
          {change && (
            <div className="mt-2 flex items-center gap-1">
              {trend === 'up' && (
                <svg className="h-3 w-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {trend === 'down' && (
                <svg className="h-3 w-3 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              <p className={cn('text-sm font-semibold', trendColors[trend])}>
                {change}
              </p>
            </div>
          )}
        </div>
        <div className={cn(
          'rounded-xl p-3.5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3',
          iconVariants[variant]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
