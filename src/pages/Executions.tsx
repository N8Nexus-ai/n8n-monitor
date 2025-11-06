import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockExecutions, mockWorkflows } from '@/lib/mockData';
import { Search, CheckCircle2, XCircle, Loader2, Pause, Clock, Workflow as WorkflowIcon } from 'lucide-react';
import { useState } from 'react';
import { Execution } from '@/types/n8n';

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Executions</h1>
          <p className="mt-1 text-muted-foreground">Track all workflow executions</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {mockExecutions.length} Total
        </Badge>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by workflow name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Executions List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Workflow</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Mode</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-foreground">Started At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredExecutions.map((execution) => {
                const config = statusConfig[execution.status];
                const Icon = config.icon;
                
                return (
                  <tr key={execution.id} className="transition-smooth hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${config.color} ${execution.status === 'running' ? 'animate-spin' : ''}`} />
                        <Badge variant={config.variant} className="text-xs">
                          {execution.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <WorkflowIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">
                          {getWorkflowName(execution.workflowId)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="text-xs">
                        {execution.mode}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{getDuration(execution)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(execution.startedAt).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
