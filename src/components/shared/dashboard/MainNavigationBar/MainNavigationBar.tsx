'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const MainNavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-[#020617]/80 py-5 backdrop-blur-md' : 'py-5'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-white uppercase">
            Next<span className="text-blue-600">Film</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <Link href="/trending" className="transition-colors hover:text-white">
            Trending
          </Link>
          <Link href="/movies" className="transition-colors hover:text-white">
            Movies
          </Link>
          <Link href="/watch list" className="transition-colors hover:text-white">
            My List
          </Link>
        </div>

        {/* Right Side Tools */}
        <div className="flex items-center gap-5">
          {/* Simple Search Icon (Placeholder) */}
          <button className="text-gray-300 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* User Profile / Login */}
          <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-gray-800 bg-gradient-to-r from-blue-600 to-emerald-600 text-xs font-bold text-white">
            AD
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigationBar;
