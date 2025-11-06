import { Execution, Workflow, AuditRisk, MetricsSummary, ExecutionStatus } from '@/types/n8n';

// Mock data for demonstration
export const mockMetrics: MetricsSummary = {
  totalExecutions: 15847,
  successRate: 94.2,
  errorRate: 5.8,
  avgDuration: 1250,
  p95Duration: 3480,
  throughput: 42.3,
};

export const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Customer Onboarding Flow',
    active: true,
    projectId: 'proj-1',
    tags: [{ id: 't1', name: 'Production' }, { id: 't2', name: 'Critical' }],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-11-01T14:30:00Z',
  },
  {
    id: '2',
    name: 'Daily Sales Report',
    active: true,
    projectId: 'proj-1',
    tags: [{ id: 't1', name: 'Production' }, { id: 't3', name: 'Scheduled' }],
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-10-25T16:45:00Z',
  },
  {
    id: '3',
    name: 'Slack Notification System',
    active: false,
    projectId: 'proj-2',
    tags: [{ id: 't4', name: 'Staging' }],
    createdAt: '2024-03-05T11:20:00Z',
    updatedAt: '2024-09-10T08:15:00Z',
  },
  {
    id: '4',
    name: 'Data Sync with CRM',
    active: true,
    projectId: 'proj-1',
    tags: [{ id: 't1', name: 'Production' }],
    createdAt: '2024-01-20T13:00:00Z',
    updatedAt: '2024-11-05T10:00:00Z',
  },
];

const statuses: ExecutionStatus[] = ['success', 'error', 'running', 'waiting'];
const modes = ['manual', 'trigger', 'webhook', 'retry'] as const;

export const mockExecutions: Execution[] = Array.from({ length: 50 }, (_, i) => {
  const startedAt = new Date(Date.now() - i * 3600000).toISOString();
  const stoppedAt = new Date(Date.now() - i * 3600000 + Math.random() * 300000).toISOString();
  
  return {
    id: `exec-${i + 1}`,
    workflowId: mockWorkflows[Math.floor(Math.random() * mockWorkflows.length)].id,
    projectId: `proj-${Math.floor(Math.random() * 2) + 1}`,
    mode: modes[Math.floor(Math.random() * modes.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    startedAt,
    stoppedAt: Math.random() > 0.1 ? stoppedAt : undefined,
  };
});

export const mockAuditRisks: AuditRisk[] = [
  {
    risk: 'error',
    section: 'Security',
    title: 'Unprotected Webhooks',
    description: '3 workflows have webhooks without authentication',
    location: 'Customer Onboarding Flow, Data Sync',
    recommendation: 'Enable webhook authentication to prevent unauthorized access',
  },
  {
    risk: 'warning',
    section: 'Credentials',
    title: 'Unused Credentials',
    description: '5 credentials have not been used in the last 30 days',
    location: 'Legacy API Keys',
    recommendation: 'Review and remove unused credentials',
  },
  {
    risk: 'warning',
    section: 'Nodes',
    title: 'Filesystem Access',
    description: '2 workflows use filesystem nodes',
    location: 'Data Sync with CRM',
    recommendation: 'Review filesystem operations for security implications',
  },
  {
    risk: 'info',
    section: 'Performance',
    title: 'Long Running Workflows',
    description: '1 workflow consistently takes >5 minutes',
    location: 'Daily Sales Report',
    recommendation: 'Consider optimizing or breaking into smaller workflows',
  },
];

// Chart data for the last 24 hours
export const mockChartData = Array.from({ length: 24 }, (_, i) => {
  const hour = 23 - i;
  return {
    hour: `${hour.toString().padStart(2, '0')}:00`,
    success: Math.floor(Math.random() * 100) + 50,
    error: Math.floor(Math.random() * 20),
    running: Math.floor(Math.random() * 10),
  };
}).reverse();
