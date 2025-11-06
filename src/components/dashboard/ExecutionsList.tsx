import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Execution } from '@/types/n8n';
import { Clock, CheckCircle2, XCircle, Loader2, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExecutionsListProps {
  executions: Execution[];
  workflows: Array<{ id: string; name: string }>;
}

const statusConfig = {
  success: { icon: CheckCircle2, variant: 'default' as const, color: 'text-success' },
  error: { icon: XCircle, variant: 'destructive' as const, color: 'text-destructive' },
  running: { icon: Loader2, variant: 'default' as const, color: 'text-primary' },
  waiting: { icon: Pause, variant: 'secondary' as const, color: 'text-warning' },
  canceled: { icon: XCircle, variant: 'secondary' as const, color: 'text-muted-foreground' },
};

export function ExecutionsList({ executions, workflows }: ExecutionsListProps) {
  const getWorkflowName = (id: string) => 
    workflows.find(w => w.id === id)?.name || 'Unknown Workflow';

  const getDuration = (execution: Execution) => {
    if (!execution.stoppedAt) return 'Running...';
    const duration = new Date(execution.stoppedAt).getTime() - new Date(execution.startedAt).getTime();
    return `${(duration / 1000).toFixed(1)}s`;
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground tracking-tight">Recent Executions</h3>
        <p className="mt-1 text-sm text-muted-foreground">Latest workflow runs</p>
      </div>
      
      <div className="space-y-3">
        {executions.slice(0, 10).map((execution, index) => {
          const config = statusConfig[execution.status];
          const Icon = config.icon;
          
          return (
            <div
              key={execution.id}
              className="group flex items-center justify-between rounded-xl border border-border/50 bg-card/50 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-lg hover:scale-[1.01]"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110",
                  execution.status === 'success' && "bg-success/20 text-success",
                  execution.status === 'error' && "bg-destructive/20 text-destructive",
                  execution.status === 'running' && "bg-primary/20 text-primary",
                  execution.status === 'waiting' && "bg-warning/20 text-warning",
                  execution.status === 'canceled' && "bg-muted text-muted-foreground"
                )}>
                  <Icon className={cn("h-5 w-5", execution.status === 'running' && 'animate-spin')} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{getWorkflowName(execution.workflowId)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant={config.variant} className="text-xs border-border/50">
                      {execution.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground rounded-md bg-muted/30 px-2 py-0.5">{execution.mode}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5 rounded-lg bg-muted/30 px-2.5 py-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="font-medium">{getDuration(execution)}</span>
                </div>
                <span className="text-[10px]">
                  {new Date(execution.startedAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
