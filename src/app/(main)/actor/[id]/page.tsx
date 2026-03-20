'use client';
import MovieCardSkeleton from '@/components/main/Skeletons/MovieCardSkeleton';
import { movieService } from '@/services/movieService/movieService';
import { Movie } from '@/types/movie';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import MovieCard from '../../(home)/_components/PopularMovies/_components/MovieCard/MovieCard';

export default function ActorDetails() {
  const { id } = useParams();

  const { data: movies, isLoading } = useQuery({
    queryKey: ['actorMovies', id],
    queryFn: () => movieService.getActorMovies(id as string),
  });

  return (
    <section className="mx-auto w-full bg-[#020617] px-4 py-20 2xl:px-10">
      <h2 className="my-10 text-3xl font-black text-white uppercase italic">
        Movies <span className="text-[#DB1A1A]">Featuring Him/Her</span>
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => <MovieCardSkeleton key={index} />)
          : movies?.slice(0, 12).map((movie: Movie) => <MovieCard key={movie?.id} movie={movie} />)}
      </div>
    </section>
  );
}
