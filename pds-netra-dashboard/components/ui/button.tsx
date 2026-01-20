import * as React from 'react';

type Variant = 'default' | 'outline' | 'ghost';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ variant = 'default', className = '', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none';
  const v =
    variant === 'outline'
      ? 'border border-slate-200 bg-white hover:bg-slate-50'
      : variant === 'ghost'
        ? 'hover:bg-slate-100'
        : 'bg-slate-900 text-white hover:bg-slate-800';
  return <button className={`${base} ${v} ${className}`} {...props} />;
}
