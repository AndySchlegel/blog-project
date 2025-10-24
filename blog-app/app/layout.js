import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import ConditionalLayout from './ConditionalLayout';

export const metadata = {
  title: {
    default: "Andy's Tech Hub",
    template: "%s | Andy's Tech Hub"
  },
  description: 'DevOps, Cloud & Self-Hosting - Praxisnahe Guides von AWS bis Homelab',
  keywords: ['DevOps', 'Cloud', 'AWS', 'Self-Hosting', 'Homelab', 'NAS', 'Docker', 'Kubernetes'],
  authors: [{ name: 'Andy Schlegel' }],
  creator: 'Andy Schlegel',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://blog-app.his4irness23.de',
    siteName: "Andy's Tech Hub",
    title: "Andy's Tech Hub",
    description: 'DevOps, Cloud & Self-Hosting - Praxisnahe Guides',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Andy's Tech Hub",
    description: 'DevOps, Cloud & Self-Hosting - Praxisnahe Guides',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <AuthProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
