import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Workflow } from '@/types/n8n';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

interface WorkflowListProps {
  workflows: Workflow[];
}

export function WorkflowList({ workflows }: WorkflowListProps) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Active Workflows</h3>
        <p className="text-sm text-muted-foreground">Monitor your workflow status</p>
      </div>
      
      <div className="space-y-4">
        {workflows.map((workflow) => (
          <div
            key={workflow.id}
            className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-smooth hover:border-primary/50 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              {workflow.active ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : (
                <XCircle className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <h4 className="font-medium text-foreground">{workflow.name}</h4>
                <div className="mt-1 flex gap-2">
                  {workflow.tags?.map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="text-xs">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Updated {new Date(workflow.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
