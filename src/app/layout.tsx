import './globals.css';
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from 'next/font/google';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
});

export const metadata = {
  title: 'Harpreet Singh — Portfolio',
  description: 'Backend developer building AI agents, payments and onchain products.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="bg-ink font-sans leading-[1.7] text-neutral-300 antialiased">{children}</body>
    </html>
  );
}
