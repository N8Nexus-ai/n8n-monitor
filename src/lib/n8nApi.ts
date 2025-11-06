import { loadApiConfig } from './apiConfig';
import { Execution, Workflow, ExecutionsResponse } from '@/types/n8n';

export interface ApiExecution {
  id: number;
  data?: unknown;
  finished: boolean;
  mode: string;
  retryOf: string | null;
  retrySuccessId: string | null;
  startedAt: string;
  stoppedAt: string | null;
  workflowId: string;
  waitTill: string | null;
  customData?: unknown;
  status: 'success' | 'error' | 'running' | 'waiting' | 'canceled';
}

export interface ApiExecutionsResponse {
  data: ApiExecution[];
  nextCursor?: string;
}

export interface ApiWorkflow {
  id: string;
  name: string;
  active: boolean;
  tags?: Array<{ id: string; name: string }>;
  createdAt: string;
  updatedAt: string;
  settings?: unknown;
  nodes?: unknown[];
  connections?: unknown;
  staticData?: unknown;
  pinData?: unknown;
}

export interface ApiWorkflowsResponse {
  data: ApiWorkflow[];
  nextCursor?: string;
}

/**
 * Get the base API URL with proper formatting
 */
function getApiUrl(): string {
  const config = loadApiConfig();
  if (!config) {
    throw new Error('API configuration not found. Please configure your n8n instance in Settings.');
  }
  
  const baseUrl = config.url.trim().replace(/\/$/, ''); // Remove trailing slash
  return `${baseUrl}/api/v1`;
}

/**
 * Get the API key from configuration
 */
function getApiKey(): string {
  const config = loadApiConfig();
  if (!config) {
    throw new Error('API configuration not found. Please configure your n8n instance in Settings.');
  }
  return config.apiKey;
}

/**
 * Make an authenticated API request
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const apiUrl = getApiUrl();
  const apiKey = getApiKey();
  
  const url = `${apiUrl}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      method: options.method || 'GET',
      headers: {
        'accept': 'application/json',
        'X-N8N-API-KEY': apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
      // Add mode and credentials for CORS handling
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized. Please check your API key.');
      }
      if (response.status === 404) {
        throw new Error('Resource not found. Please verify your n8n instance URL.');
      }
      if (response.status === 503) {
        throw new Error(`Service unavailable (503). This usually means:
- The n8n instance is down or unreachable
- There's a network/proxy issue
- CORS is blocking the request
- A browser extension is interfering

Try:
1. Check if the URL is accessible: ${url}
2. Verify CORS settings on your n8n instance
3. Disable browser extensions and try again
4. Check browser console for CORS errors`);
      }
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText}. URL: ${url}. ${errorText}`);
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  } catch (error) {
    // Handle network errors, CORS errors, etc.
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Network error: Unable to reach ${url}. This could be:
- CORS policy blocking the request
- Network connectivity issue
- Invalid URL format
- Server is not responding

Check:
1. The URL is correct: ${url}
2. CORS is enabled on your n8n instance
3. Your network connection`);
    }
    // Re-throw other errors
    throw error;
  }
}

/**
 * Fetch executions from n8n API
 */
export async function fetchExecutions(params?: {
  limit?: number;
  cursor?: string;
  status?: 'success' | 'error' | 'running' | 'waiting' | 'canceled';
  workflowId?: string;
  projectId?: string;
  includeData?: boolean;
}): Promise<ExecutionsResponse> {
  const queryParams = new URLSearchParams();
  
  if (params?.limit) {
    queryParams.append('limit', params.limit.toString());
  }
  if (params?.cursor) {
    queryParams.append('cursor', params.cursor);
  }
  if (params?.status) {
    queryParams.append('status', params.status);
  }
  if (params?.workflowId) {
    queryParams.append('workflowId', params.workflowId);
  }
  if (params?.projectId) {
    queryParams.append('projectId', params.projectId);
  }
  if (params?.includeData !== undefined) {
    queryParams.append('includeData', params.includeData.toString());
  }

  const endpoint = `/executions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await apiRequest<ApiExecutionsResponse>(endpoint);

  // Transform API response to our Execution type
  const transformedData: Execution[] = response.data.map((exec) => ({
    id: exec.id.toString(),
    workflowId: exec.workflowId,
    mode: exec.mode as Execution['mode'],
    status: exec.status,
    startedAt: exec.startedAt,
    stoppedAt: exec.stoppedAt || undefined,
    waitTill: exec.waitTill || undefined,
    retryOf: exec.retryOf || undefined,
    retrySuccessId: exec.retrySuccessId || undefined,
  }));

  return {
    data: transformedData,
    nextCursor: response.nextCursor,
  };
}

/**
 * Fetch workflows from n8n API
 */
export async function fetchWorkflows(params?: {
  limit?: number;
  cursor?: string;
  active?: boolean;
  projectId?: string;
}): Promise<{ data: Workflow[]; nextCursor?: string }> {
  const queryParams = new URLSearchParams();
  
  if (params?.limit) {
    queryParams.append('limit', params.limit.toString());
  }
  if (params?.cursor) {
    queryParams.append('cursor', params.cursor);
  }
  if (params?.active !== undefined) {
    queryParams.append('active', params.active.toString());
  }
  if (params?.projectId) {
    queryParams.append('projectId', params.projectId);
  }

  const endpoint = `/workflows${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await apiRequest<ApiWorkflowsResponse>(endpoint);

  // Transform API response to our Workflow type
  const transformedData: Workflow[] = response.data.map((workflow) => ({
    id: workflow.id,
    name: workflow.name,
    active: workflow.active,
    tags: workflow.tags,
    createdAt: workflow.createdAt,
    updatedAt: workflow.updatedAt,
  }));

  return {
    data: transformedData,
    nextCursor: response.nextCursor,
  };
}

/**
 * Fetch all executions with pagination
 */
export async function fetchAllExecutions(params?: {
  limit?: number;
  status?: 'success' | 'error' | 'running' | 'waiting' | 'canceled';
  workflowId?: string;
  projectId?: string;
}): Promise<Execution[]> {
  const allExecutions: Execution[] = [];
  let cursor: string | undefined;
  const limit = params?.limit || 100;

  do {
    const response = await fetchExecutions({
      ...params,
      limit,
      cursor,
    });
    
    allExecutions.push(...response.data);
    cursor = response.nextCursor;
  } while (cursor && allExecutions.length < 1000); // Limit to 1000 executions max

  return allExecutions;
}

