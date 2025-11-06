import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockWorkflows } from '@/lib/mockData';
import { Search, CheckCircle2, XCircle, Clock, Tag } from 'lucide-react';
import { useState } from 'react';

export default function Workflows() {
  const [search, setSearch] = useState('');
  
  const filteredWorkflows = mockWorkflows.filter(w => 
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Workflows</h1>
          <p className="mt-1 text-muted-foreground">Manage and monitor all workflows</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {mockWorkflows.length} Total
        </Badge>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search workflows..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Workflows Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredWorkflows.map((workflow) => (
          <Card key={workflow.id} className="p-6 transition-smooth hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  {workflow.active ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <h3 className="text-lg font-semibold text-foreground">{workflow.name}</h3>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    <div className="flex flex-wrap gap-2">
                      {workflow.tags?.map((tag) => (
                        <Badge key={tag.id} variant="secondary" className="text-xs">
                          {tag.name}
                        </Badge>
                      ))}
                      {!workflow.tags?.length && (
                        <span className="text-xs">No tags</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Updated {new Date(workflow.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <Badge variant={workflow.active ? 'default' : 'secondary'}>
                {workflow.active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
