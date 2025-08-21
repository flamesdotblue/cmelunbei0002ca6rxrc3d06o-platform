import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Monochrome Streets — Street Photography',
  description: 'Black-and-white film photography from cities around the world. Parallax showcase with grainy textures. Buy prints or follow on Instagram.',
  openGraph: {
    title: 'Monochrome Streets — Street Photography',
    description: 'Black-and-white film photography from cities around the world.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monochrome Streets — Street Photography',
    description: 'Black-and-white film photography from cities around the world.'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="grain-overlay">
      <body className="bg-bg text-fg antialiased font-body">
        {children}
      </body>
    </html>
  );
}
