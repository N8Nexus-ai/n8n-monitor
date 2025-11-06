import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockAuditRisks } from '@/lib/mockData';
import { AlertTriangle, XCircle, Info, Shield } from 'lucide-react';

const riskConfig = {
  error: { icon: XCircle, variant: 'destructive' as const, color: 'text-destructive', bg: 'bg-destructive/10' },
  warning: { icon: AlertTriangle, variant: 'default' as const, color: 'text-warning', bg: 'bg-warning/10' },
  info: { icon: Info, variant: 'secondary' as const, color: 'text-primary', bg: 'bg-primary/10' },
};

export default function Audit() {
  const errorCount = mockAuditRisks.filter(r => r.risk === 'error').length;
  const warningCount = mockAuditRisks.filter(r => r.risk === 'warning').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Audit</h1>
          <p className="mt-1 text-muted-foreground">
            Identify and resolve security risks in your workflows
          </p>
        </div>
        <div className="flex gap-3">
          <Badge variant="destructive" className="text-sm">
            {errorCount} Critical
          </Badge>
          <Badge variant="default" className="text-sm">
            {warningCount} Warnings
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-destructive/10 p-3">
              <Shield className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{errorCount}</p>
              <p className="text-sm text-muted-foreground">Critical Issues</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-warning/10 p-3">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{warningCount}</p>
              <p className="text-sm text-muted-foreground">Warnings</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success/10 p-3">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">85%</p>
              <p className="text-sm text-muted-foreground">Security Score</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Risks List */}
      <div className="space-y-4">
        {mockAuditRisks.map((risk, index) => {
          const config = riskConfig[risk.risk];
          const Icon = config.icon;

          return (
            <Card key={index} className="p-6 transition-smooth hover:shadow-md">
              <div className="flex gap-4">
                <div className={`flex-shrink-0 rounded-lg p-3 ${config.bg}`}>
                  <Icon className={`h-6 w-6 ${config.color}`} />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-foreground">{risk.title}</h3>
                        <Badge variant={config.variant}>{risk.risk}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{risk.section}</p>
                    </div>
                  </div>

                  <p className="text-foreground">{risk.description}</p>

                  {risk.location && (
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-sm font-medium text-foreground">Affected Workflows:</p>
                      <p className="mt-1 text-sm text-muted-foreground">{risk.location}</p>
                    </div>
                  )}

                  {risk.recommendation && (
                    <div className="rounded-lg border-l-4 border-primary bg-primary/5 p-3">
                      <p className="text-sm font-medium text-foreground">Recommendation:</p>
                      <p className="mt-1 text-sm text-foreground">{risk.recommendation}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
