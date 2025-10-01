import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  title: 'My Tech Blog',
  description: 'A blog about web development and technology',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <AuthProvider>
          <Navigation />
          <div className="container mx-auto grid gap-10 px-4 py-10 lg:grid-cols-[3fr_1fr]">
            <main className="space-y-10">{children}</main>
            <Sidebar />
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
