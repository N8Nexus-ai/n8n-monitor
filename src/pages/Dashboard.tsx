import { MetricCard } from '@/components/dashboard/MetricCard';
import { ExecutionChart } from '@/components/dashboard/ExecutionChart';
import { WorkflowList } from '@/components/dashboard/WorkflowList';
import { ExecutionsList } from '@/components/dashboard/ExecutionsList';
import { Activity, CheckCircle2, XCircle, Clock, Zap } from 'lucide-react';
import { mockMetrics, mockWorkflows, mockExecutions, mockChartData } from '@/lib/mockData';

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Real-time observability for your n8n workflows
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-card/50 px-4 py-2 border border-border/50">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          title="Total Executions"
          value={mockMetrics.totalExecutions.toLocaleString()}
          change="+12% from yesterday"
          trend="up"
          icon={Activity}
        />
        <MetricCard
          title="Success Rate"
          value={`${mockMetrics.successRate}%`}
          change="+2.4% from yesterday"
          trend="up"
          icon={CheckCircle2}
          variant="success"
        />
        <MetricCard
          title="Error Rate"
          value={`${mockMetrics.errorRate}%`}
          change="-1.2% from yesterday"
          trend="down"
          icon={XCircle}
          variant="danger"
        />
        <MetricCard
          title="Avg Duration"
          value={`${mockMetrics.avgDuration}ms`}
          change="-150ms from yesterday"
          trend="down"
          icon={Clock}
        />
        <MetricCard
          title="Throughput"
          value={`${mockMetrics.throughput}/min`}
          change="+5.8/min"
          trend="up"
          icon={Zap}
        />
      </div>

      {/* Chart */}
      <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
        <ExecutionChart data={mockChartData} />
      </div>

      {/* Lists Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <WorkflowList workflows={mockWorkflows.filter(w => w.active)} />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
          <ExecutionsList executions={mockExecutions} workflows={mockWorkflows} />
        </div>
      </div>
    </div>
  );
}
