import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Execution } from '@/types/n8n';
import { Clock, CheckCircle2, XCircle, Loader2, Pause } from 'lucide-react';

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
        <h3 className="text-lg font-semibold text-foreground">Recent Executions</h3>
        <p className="text-sm text-muted-foreground">Latest workflow runs</p>
      </div>
      
      <div className="space-y-3">
        {executions.slice(0, 10).map((execution) => {
          const config = statusConfig[execution.status];
          const Icon = config.icon;
          
          return (
            <div
              key={execution.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-smooth hover:border-primary/50"
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${config.color} ${execution.status === 'running' ? 'animate-spin' : ''}`} />
                <div>
                  <p className="font-medium text-foreground">{getWorkflowName(execution.workflowId)}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant={config.variant} className="text-xs">
                      {execution.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{execution.mode}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{getDuration(execution)}</span>
                </div>
                <span className="text-xs">
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
