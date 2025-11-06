import { Card } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ExecutionChartProps {
  data: Array<{
    hour: string;
    success: number;
    error: number;
    running: number;
  }>;
}

export function ExecutionChart({ data }: ExecutionChartProps) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Executions (Last 24h)</h3>
        <p className="text-sm text-muted-foreground">Workflow execution trends by status</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorRunning" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="hour" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--foreground))',
            }}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px',
            }}
          />
          <Area 
            type="monotone" 
            dataKey="success" 
            stroke="hsl(var(--success))" 
            fillOpacity={1} 
            fill="url(#colorSuccess)"
            strokeWidth={2}
            name="Success"
          />
          <Area 
            type="monotone" 
            dataKey="error" 
            stroke="hsl(var(--destructive))" 
            fillOpacity={1} 
            fill="url(#colorError)"
            strokeWidth={2}
            name="Error"
          />
          <Area 
            type="monotone" 
            dataKey="running" 
            stroke="hsl(var(--primary))" 
            fillOpacity={1} 
            fill="url(#colorRunning)"
            strokeWidth={2}
            name="Running"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
