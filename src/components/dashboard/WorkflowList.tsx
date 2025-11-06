import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Workflow } from '@/types/n8n';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkflowListProps {
  workflows: Workflow[];
}

export function WorkflowList({ workflows }: WorkflowListProps) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground tracking-tight">Active Workflows</h3>
        <p className="mt-1 text-sm text-muted-foreground">Monitor your workflow status</p>
      </div>
      
      <div className="space-y-3">
        {workflows.map((workflow, index) => (
          <div
            key={workflow.id}
            className="group flex items-center justify-between rounded-xl border border-border/50 bg-card/50 p-4 transition-all duration-300 hover:border-primary/50 hover:bg-card hover:shadow-lg hover:scale-[1.01]"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110",
                workflow.active 
                  ? "bg-success/20 text-success" 
                  : "bg-muted text-muted-foreground"
              )}>
                {workflow.active ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{workflow.name}</h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {workflow.tags?.map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="text-xs border-border/50">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{new Date(workflow.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
