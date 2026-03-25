import type { Metadata } from 'next';
import { Lato, Outfit } from 'next/font/google';
import { MobileBottomSpacer, StickyMobileCta } from '@/components/StickyMobileCta';
import './globals.css';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Cargoz KSA – Warehouse for rent | Flexible Storage',
  description: 'Compare verified warehouses in Saudi Arabia. Flexible storage plans that match your business needs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${outfit.variable} tw-min-h-screen tw-min-w-0 tw-flex tw-flex-col tw-font-sans tw-overflow-x-hidden`}
      >
        {children}
        <MobileBottomSpacer />
        <StickyMobileCta />
      </body>
    </html>
  );
}
