import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockExecutions, mockWorkflows } from '@/lib/mockData';
import { Search, CheckCircle2, XCircle, Loader2, Pause, Clock, Workflow as WorkflowIcon } from 'lucide-react';
import { useState } from 'react';
import { Execution } from '@/types/n8n';
import { cn } from '@/lib/utils';

const statusConfig = {
  success: { icon: CheckCircle2, variant: 'default' as const, color: 'text-success' },
  error: { icon: XCircle, variant: 'destructive' as const, color: 'text-destructive' },
  running: { icon: Loader2, variant: 'default' as const, color: 'text-primary' },
  waiting: { icon: Pause, variant: 'secondary' as const, color: 'text-warning' },
  canceled: { icon: XCircle, variant: 'secondary' as const, color: 'text-muted-foreground' },
};

export default function Executions() {
  const [search, setSearch] = useState('');
  
  const filteredExecutions = mockExecutions.filter(e => {
    const workflow = mockWorkflows.find(w => w.id === e.workflowId);
    return workflow?.name.toLowerCase().includes(search.toLowerCase());
  });

  const getWorkflowName = (id: string) => 
    mockWorkflows.find(w => w.id === id)?.name || 'Unknown Workflow';

  const getDuration = (execution: Execution) => {
    if (!execution.stoppedAt) return 'Running...';
    const duration = new Date(execution.stoppedAt).getTime() - new Date(execution.startedAt).getTime();
    return `${(duration / 1000).toFixed(1)}s`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">Executions</h1>
            <p className="mt-2 text-muted-foreground">Track all workflow executions</p>
          </div>
          <Badge variant="secondary" className="text-sm px-4 py-2 border-border/50">
            {mockExecutions.length} Total
          </Badge>
        </div>
      </div>

      {/* Search */}
      <div className="relative animate-slide-up" style={{ animationDelay: '100ms' }}>
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by workflow name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 h-12 rounded-xl border-border/50 bg-card/50 backdrop-blur-sm focus:bg-card transition-all duration-300"
        />
      </div>

      {/* Executions Grid */}
      <div className="grid gap-4">
        {filteredExecutions.map((execution, index) => {
          const config = statusConfig[execution.status];
          const Icon = config.icon;
          
          return (
            <Card
              key={execution.id}
              className="group p-5 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110",
                    execution.status === 'success' && "bg-success/20 text-success",
                    execution.status === 'error' && "bg-destructive/20 text-destructive",
                    execution.status === 'running' && "bg-primary/20 text-primary",
                    execution.status === 'waiting' && "bg-warning/20 text-warning",
                    execution.status === 'canceled' && "bg-muted text-muted-foreground"
                  )}>
                    <Icon className={cn("h-6 w-6", execution.status === 'running' && 'animate-spin')} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <WorkflowIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <h3 className="font-semibold text-foreground truncate">
                        {getWorkflowName(execution.workflowId)}
                      </h3>
                      <Badge variant={config.variant} className="text-xs border-border/50 flex-shrink-0">
                        {execution.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="secondary" className="text-xs border-border/50">
                        {execution.mode}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="font-medium">{getDuration(execution)}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(execution.startedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
