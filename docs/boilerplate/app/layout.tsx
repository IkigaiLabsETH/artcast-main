import './globals.css';
import '@farcaster/auth-kit/styles.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] });

export const metadata: Metadata = {
  title: 'ArtCast',
  description: 'Farcaster client for Ikigai Labs XYZ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}