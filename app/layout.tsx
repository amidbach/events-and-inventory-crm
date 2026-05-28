import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Elite Events — Luxury Event & Catering Suite',
  description: 'Gereie a saúde financeira, relacionamento com clientes, estoque técnico e cardápios gastronômicos da sua agência com precisão.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#f8f9fa] text-[#191c1d] min-h-screen antialiased selection:bg-[#fed488] selection:text-[#5d4201]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

