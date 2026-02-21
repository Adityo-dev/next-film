import MainFooter from '@/components/shared/main/MainFooter/MainFooter';
import MainNavigationBar from '@/components/shared/main/MainNavigationBar/MainNavigationBar';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NextFilm — Discover Your Next Favorite Movie',
  description:
    'Explore the latest movies, ratings, and details using Next.js, Typescript and Tailwindcss.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} max-w-screen overflow-x-hidden antialiased`}
      >
        <MainNavigationBar />
        {children}
        <MainFooter />
      </body>
    </html>
  );
}
