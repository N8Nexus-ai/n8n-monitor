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
    default: 'border-border',
    success: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5',
    danger: 'border-destructive/30 bg-destructive/5',
  };

  const trendColors = {
    up: 'text-success',
    down: 'text-destructive',
    neutral: 'text-muted-foreground',
  };

  return (
    <Card className={cn(
      'p-6 transition-smooth hover:shadow-md',
      variantStyles[variant]
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <p className={cn('mt-1 text-sm font-medium', trendColors[trend])}>
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          'rounded-lg p-3',
          variant === 'default' && 'bg-primary/10 text-primary',
          variant === 'success' && 'bg-success/10 text-success',
          variant === 'warning' && 'bg-warning/10 text-warning',
          variant === 'danger' && 'bg-destructive/10 text-destructive'
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
}
