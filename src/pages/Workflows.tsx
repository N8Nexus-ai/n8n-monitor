import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockWorkflows } from '@/lib/mockData';
import { Search, CheckCircle2, XCircle, Clock, Tag } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Workflows() {
  const [search, setSearch] = useState('');
  
  const filteredWorkflows = mockWorkflows.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">Workflows</h1>
            <p className="mt-2 text-muted-foreground">Manage and monitor all workflows</p>
          </div>
          <Badge variant="secondary" className="text-sm px-4 py-2 border-border/50">
            {mockWorkflows.length} Total
          </Badge>
        </div>
      </div>

      {/* Search */}
      <div className="relative animate-slide-up" style={{ animationDelay: '100ms' }}>
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search workflows..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 h-12 rounded-xl border-border/50 bg-card/50 backdrop-blur-sm focus:bg-card transition-all duration-300"
        />
      </div>

      {/* Workflows Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredWorkflows.map((workflow, index) => (
          <Card 
            key={workflow.id} 
            className="group p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110",
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
                <h3 className="text-lg font-bold text-foreground tracking-tight">{workflow.name}</h3>
              </div>
              <Badge 
                variant={workflow.active ? 'default' : 'secondary'} 
                className={cn(
                  "transition-all duration-300 group-hover:scale-110",
                  workflow.active && "bg-gradient-primary text-primary-foreground border-0"
                )}
              >
                {workflow.active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                <div className="flex flex-wrap gap-2">
                  {workflow.tags?.map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="text-xs border-border/50">
                      {tag.name}
                    </Badge>
                  ))}
                  {!workflow.tags?.length && (
                    <span className="text-xs">No tags</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>Updated {new Date(workflow.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
