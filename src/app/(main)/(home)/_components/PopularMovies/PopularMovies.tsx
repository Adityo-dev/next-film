'use client';
import MovieCard from '@/app/(main)/(home)/_components/PopularMovies/_components/MovieCard/MovieCard';
import MovieCardSkeleton from '@/components/main/Skeletons/MovieCardSkeleton';
import { usePopularMovies } from '@/hooks/useMovies/useMovies';
import { Movie } from '@/types/movie';
import Link from 'next/link';

const PopularMovies = () => {
  const { data: movies, isLoading, isError } = usePopularMovies();

  // Error State
  if (isError) return null;

  return (
    <section className="mx-auto w-full px-4 py-12 2xl:px-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="border-l-4 border-[#DB1A1A] pl-4 text-xl font-semibold text-[#f8fafc] md:text-2xl xl:text-3xl">
          Popular Movies
        </h2>

        <Link href={''} className="text-[#DB1A1A]/80 hover:text-[#DB1A1A]">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => <MovieCardSkeleton key={index} />)
          : movies?.slice(0, 12).map((movie: Movie) => <MovieCard key={movie?.id} movie={movie} />)}
      </div>
    </section>
  );
};

export default PopularMovies;
