import * as React from 'react';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'outline';
};

export function Badge({ variant = 'default', className = '', ...props }: Props) {
  const base = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium';
  const v = variant === 'outline' ? 'bg-transparent border-slate-200 text-slate-700' : 'bg-slate-100 border-slate-200 text-slate-800';
  return <span className={`${base} ${v} ${className}`} {...props} />;
}
