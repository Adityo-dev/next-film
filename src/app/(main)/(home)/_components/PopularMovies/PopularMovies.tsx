'use client';
import MovieCard from '@/app/(main)/(home)/_components/PopularMovies/_components/MovieCard/MovieCard';
import { usePopularMovies } from '@/hooks/useMovies/useMovies';
import { Movie } from '@/types/movie';

const PopularMovies = () => {
  const { data: movies, isLoading, isError } = usePopularMovies();

  if (isLoading) return <p className="py-10 text-center">Loading Movies...</p>;
  if (isError) return <p className="py-10 text-center">Something went wrong!</p>;

  return (
    <section className="mx-auto max-w-400 px-4 py-12">
      <h2 className="mb-8 border-l-4 border-[#2563eb] pl-4 text-3xl font-bold text-[#f8fafc]">
        Popular Movies
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies?.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default PopularMovies;
