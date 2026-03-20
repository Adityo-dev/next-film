/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { movieService } from '@/services/movieService/movieService';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ActorDetails() {
  const { id } = useParams();

  const { data: movies, isLoading } = useQuery({
    queryKey: ['actorMovies', id],
    queryFn: () => movieService.getActorMovies(id as string),
  });

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-[#020617]">
        <Loader2 className="animate-spin text-[#DB1A1A]" />
      </div>
    );

  return (
    <main className="min-h-screen bg-[#020617] px-6 py-20">
      <div className="mx-auto max-w-400">
        <h2 className="mb-10 text-3xl font-black text-white uppercase italic">
          Movies <span className="text-[#DB1A1A]">Featuring Him/Her</span>
        </h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {movies?.map((movie: any) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} className="group block">
              <div className="relative aspect-2/3 overflow-hidden rounded-xl border border-white/10 transition-all group-hover:border-[#DB1A1A]">
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : '/no-poster.jpg'
                  }
                  fill
                  alt={movie.title}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 truncate text-sm font-bold text-white group-hover:text-blue-500">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-500">{movie.character || 'Cast'}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
