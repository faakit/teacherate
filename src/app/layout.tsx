import './globals.css';
import { Inter } from 'next/font/google';

import 'react-toastify/dist/ReactToastify.css';
import ToastProvider from '@/lib/ToastContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={'pt'}>
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
