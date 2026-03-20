'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const MainNavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-[#020617]/90 py-4 backdrop-blur-md' : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex w-full items-center justify-between px-4 2xl:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
              Next<span className="text-[#DB1A1A]">Film</span>
            </span>
          </Link>

          {/* Menu Items */}
          <div className="hidden items-center gap-10 text-sm font-semibold text-gray-400 md:flex">
            <Link href="/" className="transition-colors hover:text-white">
              HOME
            </Link>
            <Link href="/trending" className="transition-colors hover:text-white">
              TRENDING
            </Link>
            <Link href="/movies" className="transition-colors hover:text-white">
              MOVIES
            </Link>
            <Link href="/watchlist" className="transition-colors hover:text-white">
              MY LIST
            </Link>
          </div>

          {/* Tools */}
          <div className="flex items-center gap-6">
            <Link
              href="/search"
              className="text-gray-300 transition-transform hover:text-white active:scale-90"
            >
              <Search className="h-6 w-6" />
            </Link>
            <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-linear-to-tr from-[#DB1A1A] to-purple-600 text-xs font-bold text-white shadow-lg">
              AD
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNavigationBar;
