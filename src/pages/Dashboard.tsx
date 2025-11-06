import { MetricCard } from '@/components/dashboard/MetricCard';
import { ExecutionChart } from '@/components/dashboard/ExecutionChart';
import { WorkflowList } from '@/components/dashboard/WorkflowList';
import { ExecutionsList } from '@/components/dashboard/ExecutionsList';
import { Activity, CheckCircle2, XCircle, Clock, Zap } from 'lucide-react';
import { mockMetrics, mockWorkflows, mockExecutions, mockChartData } from '@/lib/mockData';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Real-time observability for your n8n workflows
        </p>
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
      <ExecutionChart data={mockChartData} />

      {/* Lists Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <WorkflowList workflows={mockWorkflows.filter(w => w.active)} />
        <ExecutionsList executions={mockExecutions} workflows={mockWorkflows} />
      </div>
    </div>
  );
}
