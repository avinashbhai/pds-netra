import * as React from 'react';

export function Table({ className = '', ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table className={`w-full text-sm ${className}`} {...props} />;
}

export function THead({ className = '', ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={`bg-slate-50 text-slate-600 ${className}`} {...props} />;
}

export function TH({ className = '', ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={`px-3 py-2 text-left font-semibold ${className}`} {...props} />;
}

export function TBody({ className = '', ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...props} />;
}

export function TR({ className = '', ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={`border-t border-slate-200 ${className}`} {...props} />;
}

export function TD({ className = '', ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={`px-3 py-2 align-top ${className}`} {...props} />;
}
