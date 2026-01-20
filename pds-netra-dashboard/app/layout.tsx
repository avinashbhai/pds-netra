import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PDS Netra Dashboard',
  description: 'Central monitoring dashboard for PDS Netra'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
