import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Key, Database, Bell, Shield, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { saveApiConfig, loadApiConfig, getMaskedApiKey } from '@/lib/apiConfig';

export default function Settings() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedApiKey, setSavedApiKey] = useState<string | null>(null);

  // Load configuration from localStorage on mount
  useEffect(() => {
    const config = loadApiConfig();
    if (config) {
      setApiUrl(config.url);
      setSavedApiKey(config.apiKey);
      setApiKey(config.apiKey);
    }
  }, []);

  const handleSave = () => {
    // Validate inputs
    if (!apiUrl.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a valid n8n instance URL',
        variant: 'destructive',
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter an API key',
        variant: 'destructive',
      });
      return;
    }

    // Validate URL format
    try {
      const url = new URL(apiUrl.trim());
      
      // Check if URL contains UI paths that should be removed
      if (url.pathname.includes('/home/') || url.pathname.includes('/workflows') || url.pathname.includes('/api/')) {
        toast({
          title: 'URL Format Warning',
          description: 'Please use only the base URL (e.g., https://workflow.space.usedotted.com). Remove paths like /home/workflows or /api/v1.',
          variant: 'destructive',
        });
        return;
      }
    } catch {
      toast({
        title: 'Validation Error',
        description: 'Please enter a valid URL (e.g., https://workflow.space.usedotted.com)',
        variant: 'destructive',
      });
      return;
    }

    try {
      saveApiConfig({
        url: apiUrl.trim(),
        apiKey: apiKey.trim(),
      });
      setSavedApiKey(apiKey.trim());
      setIsEditing(false);
      setShowApiKey(false);
      toast({
        title: 'Configuration Saved',
        description: 'Your API configuration has been saved to local cache.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save configuration. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleApiKeyFocus = () => {
    setIsEditing(true);
  };

  const handleApiKeyBlur = () => {
    // If the value hasn't changed, stop editing
    if (savedApiKey && apiKey === savedApiKey && !showApiKey) {
      setIsEditing(false);
    }
  };

  const handleToggleVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  // Determine what to display: show masked if saved, not editing, and not showing
  const shouldMask = savedApiKey && !isEditing && !showApiKey && apiKey === savedApiKey;
  const displayApiKey = shouldMask ? getMaskedApiKey(apiKey) : apiKey;
  // Use text type when showing masked value (to display custom mask), when showing, or when editing
  // Use password type only when hiding actual value during editing
  const inputType = shouldMask || showApiKey || isEditing ? 'text' : 'password';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Configure your n8n connection and preferences
        </p>
      </div>

      {/* API Configuration */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-primary/10 p-2">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">API Configuration</h3>
            <p className="text-sm text-muted-foreground">Connect to your n8n instance</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiUrl">n8n Instance URL</Label>
            <Input
              id="apiUrl"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://workflow.space.usedotted.com"
            />
            <p className="text-xs text-muted-foreground">
              Enter only the base URL. Do not include paths like /home/workflows or /api/v1
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={inputType}
                value={displayApiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsEditing(true);
                }}
                onFocus={handleApiKeyFocus}
                onBlur={handleApiKeyBlur}
                placeholder="Enter your n8n API key"
                className="pr-10"
              />
              {savedApiKey && (
                <button
                  type="button"
                  onClick={handleToggleVisibility}
                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Find your API key in n8n Settings → API
            </p>
          </div>

          <Button 
            className="w-full sm:w-auto" 
            onClick={handleSave}
          >
            Save Configuration
          </Button>
        </div>
      </Card>

      {/* Data Collection */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-primary/10 p-2">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Data Collection</h3>
            <p className="text-sm text-muted-foreground">Configure what data to collect</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Include Execution Data</Label>
              <p className="text-sm text-muted-foreground">
                Collect detailed execution payloads for troubleshooting
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Collect Performance Metrics</Label>
              <p className="text-sm text-muted-foreground">
                Track execution duration and performance data
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Audit Logs</Label>
              <p className="text-sm text-muted-foreground">
                Run security audits daily
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Alerts */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-primary/10 p-2">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Alert Settings</h3>
            <p className="text-sm text-muted-foreground">Configure when to receive alerts</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Error Rate Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Alert when error rate exceeds 5%
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Performance Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Alert when p95 duration exceeds threshold
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Security Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Alert on new security risks
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="rounded-lg bg-destructive/10 p-2">
            <Shield className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Security</h3>
            <p className="text-sm text-muted-foreground">Manage sensitive data</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Mask Sensitive Data</Label>
              <p className="text-sm text-muted-foreground">
                Automatically mask credentials and secrets
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <Button variant="destructive" className="w-full sm:w-auto">
            Clear All Data
          </Button>
        </div>
      </Card>
    </div>
  );
}
