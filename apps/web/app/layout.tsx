import './globals.css';
import { Inter } from 'next/font/google';
import AppThemeProvider from '../components/theme-provider';
import EducateOverlay from '../components/educate-overlay';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BD App',
  description: 'Next.js 14 scaffold',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppThemeProvider>
          {children}
          <EducateOverlay />
        </AppThemeProvider>
      </body>
    </html>
  );
}
