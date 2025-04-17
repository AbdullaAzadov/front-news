import '@/app/globals.css';
import AppProvider from '@/app/providers/appProvider';
import { cn } from '@/shared/shadcn/lib/utils';
import Header from '@/widgets/header/ui/header';
import { Geologica } from 'next/font/google';

const geologica = Geologica({
  subsets: ['latin', 'cyrillic', 'cyrillic-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geologica',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          geologica.className,
          'antialiased w-full min-h-screen space-y-12',
          'bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50'
        )}
      >
        <Header />
        <main className='container mx-auto'>
          <AppProvider>{children}</AppProvider>
        </main>
      </body>
    </html>
  );
}
