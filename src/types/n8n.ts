export type ExecutionStatus = 'error' | 'success' | 'waiting' | 'running' | 'canceled';
export type ExecutionMode = 'manual' | 'trigger' | 'webhook' | 'retry' | 'cli';

export interface Execution {
  id: string;
  workflowId: string;
  projectId?: string;
  mode: ExecutionMode;
  status: ExecutionStatus;
  startedAt: string;
  stoppedAt?: string;
  waitTill?: string;
  retryOf?: string;
  retrySuccessId?: string;
}

export interface ExecutionDetail extends Execution {
  data?: unknown;
  duration?: number;
}

export interface Workflow {
  id: string;
  name: string;
  active: boolean;
  projectId?: string;
  tags?: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  type: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export interface AuditRisk {
  risk: 'warning' | 'error' | 'info';
  section: string;
  title: string;
  description: string;
  location?: string;
  recommendation?: string;
}

export interface MetricsSummary {
  totalExecutions: number;
  successRate: number;
  errorRate: number;
  avgDuration: number;
  p95Duration: number;
  throughput: number;
}

export interface ExecutionsResponse {
  data: Execution[];
  nextCursor?: string;
}
