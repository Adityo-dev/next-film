/* eslint-disable no-console */
'use client';

import { Loader2, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

export default function MoviesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#020617]">
          <Loader2 className="animate-spin text-blue-600" />
        </div>
      }
    >
      <MoviesContent />
    </Suspense>
  );
}

function MoviesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const querySearch = searchParams.get('search') || '';
  const queryGenre = searchParams.get('genre') || '0';

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [activeGenre, setActiveGenre] = useState(queryGenre);

  const API_KEY = 'c3d501df0f1a58320fd0dbb0719f4891';

  const genres = [
    { id: '0', name: 'All' },
    { id: '28', name: 'Action' },
    { id: '35', name: 'Comedy' },
    { id: '18', name: 'Drama' },
    { id: '27', name: 'Horror' },
    { id: '878', name: 'Sci-Fi' },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url = '';
        if (searchTerm) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`;
        } else {
          url =
            activeGenre === '0'
              ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`
              : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${activeGenre}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    // Update Url
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (activeGenre !== '0') params.set('genre', activeGenre);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchTerm, activeGenre, router]);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* --- HERO SECTION (Fixed Image) --- */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-10 bg-linear-to-t from-[#020617] via-[#020617]/20 to-transparent" />

        <Image
          src={
            movies[0]?.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movies[0].backdrop_path}`
              : 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070'
          }
          width={600}
          height={700}
          className="h-full w-full object-cover opacity-50 transition-opacity duration-1000"
          alt="Featured Movie"
        />
        <div className="absolute bottom-12 left-6 z-20 max-w-2xl space-y-2 lg:left-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase italic lg:text-6xl">
            {searchTerm ? `Results for: ${searchTerm}` : movies[0]?.title || 'Explore Movies'}
          </h1>
          <p className="text-xs font-bold tracking-[0.3em] text-blue-500 uppercase">
            Premium Streaming Experience
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-400 px-4 py-12">
        {/* --- FILTERS & SEARCH --- */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => {
                  setActiveGenre(genre.id);
                  setSearchTerm('');
                }}
                className={`rounded-xl px-5 py-2 text-xs font-bold transition-all ${
                  activeGenre === genre.id && !searchTerm
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>

          <div className="group relative w-full max-w-sm">
            <Search
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-blue-500"
              size={16}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pr-6 pl-12 text-sm transition-all outline-none placeholder:text-gray-600 focus:border-blue-500/50"
            />
          </div>
        </div>

        {/* --- MOVIE GRID --- */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Link href={`/movie/${movie?.id}`} key={movie.id} className="group cursor-pointer">
                  <div className="relative aspect-2/3 overflow-hidden rounded-2xl border border-white/5 bg-white/5 transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-500/50">
                    <Image
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : '/api/placeholder/400/600'
                      }
                      width={600}
                      height={700}
                      alt={movie.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[10px] font-black text-yellow-500 backdrop-blur-md">
                      ★ {movie.vote_average.toFixed(1)}
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <h3 className="line-clamp-1 text-sm font-bold text-gray-200 transition-colors group-hover:text-blue-500">
                      {movie.title}
                    </h3>
                    <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase">
                      {movie.release_date?.split('-')[0]}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-sm font-bold tracking-widest text-gray-500 uppercase">
                  No movies found.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
