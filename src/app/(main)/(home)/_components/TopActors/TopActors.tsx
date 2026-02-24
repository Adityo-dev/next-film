/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { usePopularActors } from '@/hooks/useMovies/useMovies';
import { ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TopActors() {
  const { data: actors, isLoading } = usePopularActors();

  if (isLoading)
    return (
      <div className="flex h-60 items-center justify-center bg-[#020617]">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );

  return (
    <section className="overflow-hidden bg-[#020617] py-20 lg:py-32">
      <div className="mx-auto max-w-400 px-4">
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-1 w-10 rounded-full bg-blue-600"></span>
              <p className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase">
                Industry Icons
              </p>
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic md:text-6xl">
              Cast <span className="text-blue-600">Spotlight</span>
            </h2>
          </div>

          <Link
            href="/actors"
            className="group flex items-center gap-2 text-xs font-bold text-gray-400 transition-colors hover:text-white"
          >
            VIEW ALL ARTISTS{' '}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Actors Grid/Scroll Area */}
        <div className="no-scrollbar flex gap-6 overflow-x-auto pb-10 md:grid md:grid-cols-4 md:overflow-visible lg:grid-cols-5 xl:grid-cols-6">
          {actors?.slice(0, 12).map((actor: any) => (
            <ActorCard key={actor.id} actor={actor} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ActorCard = ({ actor }: { actor: any }) => (
  <Link href={`/actor/${actor.id}`} className="group relative w-50 shrink-0 md:w-auto">
    {/* Profile Image Container */}
    <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-white/5 bg-[#0f172a] transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]">
      <Image
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w342${actor.profile_path}`
            : '/actor-placeholder.jpg'
        }
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        alt={actor.name}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-transparent opacity-60" />

      {/* Name and Department on Hover */}
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition-transform duration-500 group-hover:translate-y-0">
        <p className="mb-1 text-[9px] font-bold tracking-widest text-blue-500 uppercase">
          {actor.known_for_department}
        </p>
        <h3 className="text-lg leading-tight font-black text-white uppercase italic">
          {actor.name}
        </h3>
      </div>
    </div>

    {/* Subtle Decorative Element */}
    <div className="mt-3 flex items-center justify-between px-1">
      <div className="h-px flex-1 bg-white/5 transition-colors group-hover:bg-blue-600/30"></div>
      <div className="ml-3 text-[10px] font-bold text-gray-600 transition-colors group-hover:text-blue-500">
        #{actor.popularity?.toFixed(0)}
      </div>
    </div>
  </Link>
);
