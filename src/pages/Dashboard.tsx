import { useState, useEffect } from 'react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ExecutionChart } from '@/components/dashboard/ExecutionChart';
import { WorkflowList } from '@/components/dashboard/WorkflowList';
import { ExecutionsList } from '@/components/dashboard/ExecutionsList';
import { Activity, CheckCircle2, XCircle, Clock, Zap } from 'lucide-react';
import { fetchExecutions, fetchWorkflows, fetchAllExecutions } from '@/lib/n8nApi';
import { Execution, Workflow, MetricsSummary } from '@/types/n8n';
import { Card } from '@/components/ui/card';

/**
 * Calculate metrics from execution data
 */
function calculateMetrics(executions: Execution[]): MetricsSummary {
  if (executions.length === 0) {
    return {
      totalExecutions: 0,
      successRate: 0,
      errorRate: 0,
      avgDuration: 0,
      p95Duration: 0,
      throughput: 0,
    };
  }

  const totalExecutions = executions.length;
  const successCount = executions.filter(e => e.status === 'success').length;
  const errorCount = executions.filter(e => e.status === 'error').length;
  const successRate = (successCount / totalExecutions) * 100;
  const errorRate = (errorCount / totalExecutions) * 100;

  // Calculate durations for finished executions
  const durations = executions
    .filter(e => e.stoppedAt && e.startedAt)
    .map(e => {
      const start = new Date(e.startedAt).getTime();
      const stop = new Date(e.stoppedAt!).getTime();
      return stop - start;
    })
    .sort((a, b) => a - b);

  const avgDuration = durations.length > 0
    ? durations.reduce((sum, d) => sum + d, 0) / durations.length
    : 0;

  const p95Index = Math.floor(durations.length * 0.95);
  const p95Duration = durations.length > 0 && p95Index < durations.length
    ? durations[p95Index]
    : 0;

  // Calculate throughput (executions per minute) from last hour
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const recentExecutions = executions.filter(e => {
    const startTime = new Date(e.startedAt).getTime();
    return startTime >= oneHourAgo;
  });
  const throughput = recentExecutions.length / 60; // per minute

  return {
    totalExecutions,
    successRate: Math.round(successRate * 10) / 10,
    errorRate: Math.round(errorRate * 10) / 10,
    avgDuration: Math.round(avgDuration),
    p95Duration: Math.round(p95Duration),
    throughput: Math.round(throughput * 10) / 10,
  };
}

/**
 * Generate chart data from executions (last 24 hours)
 */
function generateChartData(executions: Execution[]): Array<{
  hour: string;
  success: number;
  error: number;
  running: number;
}> {
  const now = new Date();
  const hours: Array<{ hour: string; success: number; error: number; running: number }> = [];

  // Generate 24 hours of data
  for (let i = 23; i >= 0; i--) {
    const hourDate = new Date(now);
    hourDate.setHours(now.getHours() - i, 0, 0, 0);
    const nextHour = new Date(hourDate);
    nextHour.setHours(hourDate.getHours() + 1);

    const hourExecutions = executions.filter(e => {
      const execTime = new Date(e.startedAt).getTime();
      return execTime >= hourDate.getTime() && execTime < nextHour.getTime();
    });

    hours.push({
      hour: `${hourDate.getHours().toString().padStart(2, '0')}:00`,
      success: hourExecutions.filter(e => e.status === 'success').length,
      error: hourExecutions.filter(e => e.status === 'error').length,
      running: hourExecutions.filter(e => e.status === 'running').length,
    });
  }

  return hours;
}

export default function Dashboard() {
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const loadData = async () => {
    try {
      setLoading(true);

      // Fetch workflows and executions in parallel
      const [workflowsData, executionsData] = await Promise.all([
        fetchWorkflows({ limit: 250 }),
        fetchAllExecutions({ limit: 250 }),
      ]);

      setWorkflows(workflowsData.data);
      setExecutions(executionsData);
      setLastUpdate(new Date());
    } catch (err) {
      // Silently fail and show empty dashboard
      console.error('Error loading dashboard data:', err);
      // Keep empty arrays - dashboard will show zero values
      setWorkflows([]);
      setExecutions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const metrics = calculateMetrics(executions);
  const chartData = generateChartData(executions);
  const activeWorkflows = workflows.filter(w => w.active);
  const recentExecutions = executions
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    .slice(0, 10);

  if (loading && executions.length === 0 && workflows.length === 0) {
    return (
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

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
            <span className="text-sm text-muted-foreground">
              Live • Updated {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          title="Total Executions"
          value={metrics.totalExecutions.toLocaleString()}
          change={executions.length > 0 ? `${executions.length} total` : 'No data'}
          trend={executions.length > 0 ? 'neutral' : 'neutral'}
          icon={Activity}
        />
        <MetricCard
          title="Success Rate"
          value={`${metrics.successRate}%`}
          change={executions.length > 0 ? `${executions.filter(e => e.status === 'success').length} successful` : 'No data'}
          trend={metrics.successRate >= 90 ? 'up' : metrics.successRate >= 70 ? 'neutral' : 'down'}
          icon={CheckCircle2}
          variant="success"
        />
        <MetricCard
          title="Error Rate"
          value={`${metrics.errorRate}%`}
          change={executions.length > 0 ? `${executions.filter(e => e.status === 'error').length} errors` : 'No data'}
          trend={metrics.errorRate < 5 ? 'down' : metrics.errorRate < 10 ? 'neutral' : 'up'}
          icon={XCircle}
          variant="danger"
        />
        <MetricCard
          title="Avg Duration"
          value={metrics.avgDuration > 0 ? `${Math.round(metrics.avgDuration)}ms` : 'N/A'}
          change={metrics.avgDuration > 0 ? `P95: ${Math.round(metrics.p95Duration)}ms` : 'No data'}
          trend="neutral"
          icon={Clock}
        />
        <MetricCard
          title="Throughput"
          value={`${metrics.throughput}/min`}
          change={executions.length > 0 ? `Last hour: ${executions.filter(e => {
            const oneHourAgo = Date.now() - 60 * 60 * 1000;
            return new Date(e.startedAt).getTime() >= oneHourAgo;
          }).length} executions` : 'No data'}
          trend="neutral"
          icon={Zap}
        />
      </div>

      {/* Chart */}
      <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
        <ExecutionChart data={chartData} />
      </div>

      {/* Lists Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          {activeWorkflows.length > 0 ? (
            <WorkflowList workflows={activeWorkflows} />
          ) : (
            <Card className="p-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">No active workflows found</p>
              </div>
            </Card>
          )}
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
          {recentExecutions.length > 0 ? (
            <ExecutionsList executions={recentExecutions} workflows={workflows} />
          ) : (
            <Card className="p-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">No executions found</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
