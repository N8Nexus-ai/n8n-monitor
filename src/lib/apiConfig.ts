export interface ApiConfig {
  url: string;
  apiKey: string;
}

const STORAGE_KEY = 'n8n_api_config';

/**
 * Save API configuration to localStorage
 */
export function saveApiConfig(config: ApiConfig): void {
  try {
    const data = {
      url: config.url.trim(),
      apiKey: config.apiKey,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save API configuration:', error);
    throw new Error('Failed to save configuration to local storage');
  }
}

/**
 * Load API configuration from localStorage
 */
export function loadApiConfig(): ApiConfig | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    return JSON.parse(stored) as ApiConfig;
  } catch (error) {
    console.error('Failed to load API configuration:', error);
    return null;
  }
}

/**
 * Clear API configuration from localStorage
 */
export function clearApiConfig(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear API configuration:', error);
  }
}

/**
 * Check if API configuration exists
 */
export function hasApiConfig(): boolean {
  return loadApiConfig() !== null;
}

/**
 * Get masked API key for display (shows first 4 characters + dots)
 */
export function getMaskedApiKey(apiKey: string): string {
  if (!apiKey || apiKey.length === 0) {
    return '';
  }
  if (apiKey.length <= 4) {
    return '•'.repeat(apiKey.length);
  }
  // Show first 4 chars and mask the rest (max 32 dots for long keys)
  return apiKey.substring(0, 4) + '•'.repeat(Math.min(apiKey.length - 4, 32));
}
