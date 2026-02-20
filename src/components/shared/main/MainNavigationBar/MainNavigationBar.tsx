/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Film, Loader2, Search, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const MainNavigationBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // স্ক্রল হ্যান্ডলার
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // লাইভ সার্চ এপিআই কল (Debouncing সহ)
  useEffect(() => {
    const fetchResults = async () => {
      if (searchQuery.trim().length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}`,
        );
        const data = await res.json();
        setResults(data.results?.slice(0, 6) || []);
      } catch (error) {
        console.error('Search Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchResults, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setResults([]);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-white/5 bg-[#020617]/90 py-4 backdrop-blur-md'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
              Next<span className="text-blue-600">Film</span>
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
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-300 transition-transform hover:text-white active:scale-90"
            >
              <Search className="h-6 w-6" />
            </button>
            <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-linear-to-tr from-blue-600 to-purple-600 text-xs font-bold text-white shadow-lg">
              AD
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-100 flex h-[80vh] flex-col items-center bg-[#020617] px-4 transition-all duration-500 ease-in-out ${
          isSearchOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-full opacity-0'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={closeSearch}
          className="absolute top-8 right-8 rounded-full bg-white/5 p-3 text-white transition-all hover:rotate-90 hover:bg-white/10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="w-full max-w-4xl pt-24">
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-white md:text-5xl">
            What Are You Looking For?
          </h2>

          {/* Search Input Box */}
          <div className="group relative">
            <div
              className={`flex items-center rounded-2xl border bg-[#111827] ${isLoading ? 'border-blue-500/50' : 'border-white/10'} overflow-hidden shadow-2xl transition-all focus-within:border-blue-500`}
            >
              <div className="pl-6 text-gray-500">
                <Search className="h-6 w-6" />
              </div>
              <input
                type="text"
                placeholder="Search movies, actors, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus={isSearchOpen}
                className="flex-1 bg-transparent px-6 py-6 text-lg text-white outline-none placeholder:text-gray-600"
              />
              {isLoading && (
                <div className="pr-6">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                </div>
              )}
            </div>
          </div>

          {/* --- Live Results Grid --- */}
          <div className="custom-scrollbar mt-12 max-h-[60vh] overflow-y-auto pb-10">
            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((movie: any) => (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    onClick={closeSearch}
                    className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 shadow-sm transition-all hover:border-blue-500/30 hover:bg-white/10"
                  >
                    {/* Movie Poster Thumbnail */}
                    <div className="h-36 w-28 shrink-0 overflow-hidden rounded-md bg-gray-800 shadow-lg">
                      {movie.poster_path ? (
                        <Image
                          width={600}
                          height={600}
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-700">
                          <Film size={20} />
                        </div>
                      )}
                    </div>

                    {/* Movie Info */}
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-bold text-white transition-colors group-hover:text-blue-400">
                        {movie.title}
                      </h4>
                      <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1 font-bold text-yellow-500">
                          <Star size={12} fill="currentColor" />{' '}
                          {movie.vote_average?.toFixed(1) || 'N/A'}
                        </span>
                        <span>•</span>
                        <span>{movie.release_date?.split('-')[0] || 'Unknown'}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : searchQuery.trim().length > 1 && !isLoading ? (
              <div className="py-10 text-center">
                <p className="text-lg text-gray-500 italic">No results found for {searchQuery}</p>
              </div>
            ) : (
              /* Trending Categories (যখন ইউজার কিছু টাইপ করছে না) */
              <div className="animate-in fade-in slide-in-from-bottom-4 text-center duration-700">
                <p className="mb-6 text-xs font-black tracking-[0.3em] text-gray-500 uppercase">
                  Trending Searches
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Action', 'Comedy', 'Sci-Fi', 'Horror', 'Drama', 'War'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-xs font-bold text-white uppercase shadow-sm transition-all hover:border-blue-400 hover:bg-blue-600"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNavigationBar;
