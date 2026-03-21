'use client';
import MovieCardSkeleton from '@/components/main/Skeletons/MovieCardSkeleton';
import { useMoviesByGenre } from '@/hooks/useMovies/useMovies';
import { Movie } from '@/types/movie';
import { useState } from 'react';
import MovieCard from '../PopularMovies/_components/MovieCard/MovieCard';

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
    <section className="bg-[#020617] py-20">
      <div className="mx-auto w-full px-4 xl:px-12">
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
                className={`cursor-pointer rounded-md px-6 py-2 text-sm font-bold transition-all ${
                  activeGenre === genre.id
                    ? 'bg-[#DB1A1A] text-white'
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {movies?.slice(0, 12).map((movie: Movie) => (
              <MovieCard movie={movie} key={movie?.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
