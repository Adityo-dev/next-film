/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { usePopularActors } from '@/hooks/useMovies/useMovies';
import { Loader2, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TopActors() {
  const { data: actors, isLoading } = usePopularActors();

  if (isLoading)
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  return (
    <section className="relative overflow-hidden bg-[#020617] py-24">
      {/* Background Decorative Text */}
      <div className="absolute top-10 left-0 -rotate-90 text-[120px] font-black text-white/2 uppercase select-none">
        ACTORS
      </div>

      <div className="relative z-10 mx-auto mb-16 max-w-400 px-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic md:text-5xl">
              Cast{' '}
              <span className="text-blue-600 underline decoration-white/10 underline-offset-8">
                Spotlight
              </span>
            </h2>
            <p className="text-xs font-bold tracking-[0.4em] text-gray-500 uppercase">
              Discover the faces behind the stories
            </p>
          </div>
        </div>
      </div>

      {/* Unique Tilted Marquee Container */}
      <div className="relative flex scale-110 -rotate-3 md:-rotate-2">
        <div className="animate-marquee flex gap-8 py-10 whitespace-nowrap">
          {actors?.map((actor: any) => (
            <ActorCard key={actor.id} actor={actor} />
          ))}
        </div>

        {/* Duplicate Row */}
        <div className="animate-marquee2 absolute top-0 flex gap-8 py-10 whitespace-nowrap">
          {actors?.map((actor: any) => (
            <ActorCard key={`${actor.id}-clone`} actor={actor} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee2 {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 50s linear infinite;
        }
        .animate-marquee:hover,
        .animate-marquee2:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

const ActorCard = ({ actor }: { actor: any }) => (
  <div className="group relative">
    <Link
      href={`/actor/${actor.id}`}
      className="relative block h-80 w-55 overflow-hidden rounded-[2.5rem] bg-gray-900 shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:rotate-2 md:h-100 md:w-70"
    >
      {/* Image with Parallax-like effect */}
      <Image
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w342${actor.profile_path}`
            : '/actor-placeholder.jpg'
        }
        fill
        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        alt={actor.name}
      />

      {/* Dark Gradient Bottom */}
      <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content Info */}
      <div className="absolute inset-x-0 bottom-0 p-8">
        <div className="mb-2 flex translate-y-4 items-center gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="h-0.5 w-8 bg-blue-600"></span>
          <p className="text-[10px] font-bold tracking-widest text-blue-500 uppercase">
            {actor.known_for_department}
          </p>
        </div>

        <h3 className="text-xl leading-none font-black text-white transition-all duration-500 group-hover:text-blue-500 md:text-2xl">
          {actor.name.split(' ').map((name: string, i: number) => (
            <span key={i} className="block">
              {name}
            </span>
          ))}
        </h3>
      </div>

      {/* Floating Action Icon */}
      <div className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white opacity-0 transition-all duration-500 group-hover:rotate-90 group-hover:opacity-100">
        <Plus size={20} />
      </div>
    </Link>
  </div>
);
