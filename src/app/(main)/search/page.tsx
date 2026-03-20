/* eslint-disable no-console */
'use client';

import MovieCard from '@/app/(main)/(home)/_components/PopularMovies/_components/MovieCard/MovieCard';
import { Movie } from '@/types/movie';
import { Film, History, Loader2, Search, Sparkles, TrendingUp } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // API Fetch Function
  const fetchResults = async (query: string) => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        fetchResults(searchQuery);
        router.replace(`/search?q=${encodeURIComponent(searchQuery)}`, { scroll: false });
      } else {
        setResults([]);
        router.replace('/search', { scroll: false });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, router]);

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-red-500/30">
      {/* --- Animated Background Elements --- */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[30%] w-[30%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full px-4 pt-32 pb-20 lg:px-12">
        {/* --- Header Section --- */}
        <div className="mb-12 space-y-4 text-center md:text-left">
          <h1 className="flex items-center justify-center gap-3 text-4xl font-black tracking-tighter uppercase italic md:justify-start md:text-6xl">
            <Sparkles className="animate-pulse text-red-600" size={40} />
            Discovery
          </h1>
          <p className="font-medium text-gray-400">
            Find your next favorite masterpiece from our vast library.
          </p>
        </div>

        {/* --- Floating Search Bar (Next Level Glassmorphism) --- */}
        <div className="sticky top-24 z-40 mb-16">
          <div className="group relative mx-auto max-w-4xl">
            <div className="absolute -inset-1 rounded-4xl bg-linear-to-r from-red-600 to-purple-600 opacity-20 blur-md transition duration-500 group-focus-within:opacity-50" />

            <div className="relative flex items-center rounded-3xl border border-white/10 bg-black/40 p-2 backdrop-blur-3xl transition-all duration-300 focus-within:border-white/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-gray-400 transition-colors group-focus-within:text-red-500">
                <Search size={24} />
              </div>

              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type movie name, genre or actors..."
                className="w-full bg-transparent px-6 py-4 text-xl font-medium outline-none placeholder:text-gray-600"
              />

              {isLoading ? (
                <div className="mr-4 flex h-10 w-10 items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-red-600" />
                </div>
              ) : (
                searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mr-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition-colors hover:bg-white/10"
                  >
                    <History size={18} className="text-gray-400" />
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* --- Dynamic Content Area --- */}
        <div className="min-h-[50vh]">
          {results.length > 0 ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-8 flex items-center gap-4">
                <TrendingUp className="text-red-600" size={20} />
                <h3 className="text-xs font-black tracking-[0.3em] text-gray-500 uppercase">
                  Search Results
                </h3>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>

              <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          ) : !isLoading && searchQuery.length > 1 ? (
            /* No Results State */
            <div className="animate-in zoom-in-95 flex flex-col items-center justify-center py-20 text-center duration-500">
              <div className="relative mb-6">
                <Film size={100} className="text-white/5" />
                <Search size={40} className="absolute right-0 bottom-0 text-red-600" />
              </div>
              <h4 className="text-2xl font-bold">No matches found</h4>
              <p className="mt-2 text-gray-500">
                We couldn&apos;t find anything for {searchQuery}. <br /> Try different keywords.
              </p>
            </div>
          ) : !searchQuery ? (
            /* Initial State (Suggestions) */
            <div className="animate-in fade-in duration-1000">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {/* Popular Tags */}
                <div className="space-y-6">
                  <h3 className="text-xs font-black tracking-[0.3em] text-gray-500 uppercase">
                    Popular Categories
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      'Marvel',
                      'Interstellar',
                      'Horror',
                      'Netflix Series',
                      'Top Rated',
                      'Action 2026',
                    ].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="rounded-xl border border-white/5 bg-white/5 px-6 py-3 text-sm font-bold transition-all hover:border-red-600/50 hover:bg-red-600/10 hover:text-red-500"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Tips */}
                <div className="rounded-3xl border border-white/5 bg-white/2 p-8 backdrop-blur-sm">
                  <h3 className="mb-4 text-sm font-bold text-white">Search Tips</h3>
                  <ul className="space-y-3 text-sm text-gray-500">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                      Search by movie titles or actors&apos; names.
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                      Try searching by release year (e.g., &quot;2024&quot;).
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                      Filter by genre like &quot;Action&quot; or &quot;Sci-Fi&quot;.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* --- Footer Decoration --- */}
      <div className="mt-20 border-t border-white/5 py-10 text-center">
        <p className="text-[10px] font-bold tracking-[0.5em] text-gray-700 uppercase">
          Powered by TMDB API & NextFilm Architecture
        </p>
      </div>
    </main>
  );
};

export default SearchPage;
