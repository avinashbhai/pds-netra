'use client';

import { useEffect, useMemo, useState } from 'react';
import { getAlerts } from '@/lib/api';
import type { AlertItem, AlertStatus, Severity } from '@/lib/types';
import { AlertsTable } from '@/components/tables/AlertsTable';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const severityOptions = [
  { label: 'All severities', value: '' },
  { label: 'Critical', value: 'critical' },
  { label: 'Warning', value: 'warning' },
  { label: 'Info', value: 'info' }
];

const statusOptions = [
  { label: 'All statuses', value: '' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' }
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [godownId, setGodownId] = useState('');
  const [district, setDistrict] = useState('');
  const [severity, setSeverity] = useState<string>('');
  const [status, setStatus] = useState<string>('OPEN');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const params = useMemo(() => {
    const p: Record<string, any> = {
      page: 1,
      page_size: 50
    };
    if (godownId.trim()) p.godown_id = godownId.trim();
    if (district.trim()) p.district = district.trim();
    if (severity) p.severity = severity as Severity;
    if (status) p.status = status as AlertStatus;
    if (dateFrom) p.date_from = new Date(dateFrom).toISOString();
    if (dateTo) p.date_to = new Date(dateTo).toISOString();
    return p;
  }, [godownId, district, severity, status, dateFrom, dateTo]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setError(null);
      try {
        const resp = await getAlerts(params);
        if (mounted) setAlerts(resp.items);
      } catch (e) {
        if (mounted) setError(e instanceof Error ? e.message : 'Failed to load alerts');
      }
    })();
    return () => {
      mounted = false;
    };
  }, [params]);

  return (
    <Card>
      <CardHeader>
        <div className="text-xl font-semibold">Alerts</div>
        <div className="text-sm text-slate-600">Filter and review alerts across godowns.</div>
      </CardHeader>
      <CardContent>
        {error && <div className="text-sm text-red-700 mb-3">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
          <div className="md:col-span-2">
            <Label>Godown ID</Label>
            <Input value={godownId} onChange={(e) => setGodownId(e.target.value)} placeholder="GDN_001" />
          </div>
          <div className="md:col-span-2">
            <Label>District</Label>
            <Input value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Surat" />
          </div>
          <div>
            <Label>Severity</Label>
            <Select value={severity} onChange={(e) => setSeverity(e.target.value)} options={severityOptions} />
          </div>
          <div>
            <Label>Status</Label>
            <Select value={status} onChange={(e) => setStatus(e.target.value)} options={statusOptions} />
          </div>

          <div className="md:col-span-3">
            <Label>Date from</Label>
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div className="md:col-span-3">
            <Label>Date to</Label>
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
        </div>

        <AlertsTable alerts={alerts} />
      </CardContent>
    </Card>
  );
}
