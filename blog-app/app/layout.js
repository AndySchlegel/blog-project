import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import ConditionalLayout from './ConditionalLayout';

export const metadata = {
  title: 'My Tech Blog',
  description: 'A blog about web development and technology',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <AuthProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
