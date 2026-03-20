'use client';
import { useMoviesByGenre } from '@/hooks/useMovies/useMovies';
import { Movie } from '@/types/movie';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const GENRES = [
  { id: 16, name: 'Animation' },
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Sci-Fi' },
];

export default function GenreSection() {
  const [activeGenre, setActiveGenre] = useState(16);

  const { data: movies, isLoading } = useMoviesByGenre(activeGenre);

  return (
    <section className="bg-[#020617] px-4 py-20">
      <div className="mx-auto w-full px-12">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white uppercase italic">
              Explore by <span className="text-[#DB1A1A]">Genre</span>
            </h2>
            <div className="h-1 w-20 rounded-full bg-[#DB1A1A]"></div>
          </div>

          {/* Genre Tabs */}
          <div className="flex w-full flex-wrap gap-3 md:w-auto">
            {GENRES.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setActiveGenre(genre.id)}
                className={`cursor-pointer rounded-full px-6 py-2 text-sm font-bold transition-all ${
                  activeGenre === genre.id
                    ? 'bg-[#DB1A1A] text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Movies Grid */}
        {isLoading ? (
          <div className="flex h-60 items-center justify-center">
            <Loader2 className="animate-spin text-[#DB1A1A]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {movies?.slice(0, 12).map((movie: Movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`} className="group block">
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-white/5 transition-all group-hover:scale-[0.98]">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    fill
                    alt={movie.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-4 truncate text-sm font-bold text-white transition-colors group-hover:text-blue-500">
                  {movie.title}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
