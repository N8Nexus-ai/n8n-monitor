import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Key, Database, Bell, Shield } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [apiKey, setApiKey] = useState('n8n_api_**********************');
  const [apiUrl, setApiUrl] = useState('https://n8n.example.com');

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
              placeholder="https://n8n.example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your n8n API key"
            />
            <p className="text-xs text-muted-foreground">
              Find your API key in n8n Settings → API
            </p>
          </div>

          <Button className="w-full sm:w-auto">
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
