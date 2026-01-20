import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';

export function HealthStatusCard({
  title,
  value,
  variant = 'outline'
}: {
  title: string;
  value: string | number;
  variant?: 'default' | 'outline';
}) {
  return (
    <Card>
      <CardHeader>
        <div className="text-sm text-slate-600">{title}</div>
      </CardHeader>
      <CardContent>
        <Badge variant={variant} className="text-base px-3 py-1">
          {value}
        </Badge>
      </CardContent>
    </Card>
  );
}
