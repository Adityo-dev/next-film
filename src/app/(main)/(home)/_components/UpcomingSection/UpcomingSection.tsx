'use client';
import { useUpcomingMovies } from '@/hooks/useMovies/useMovies';
import { Movie } from '@/types/movie';
import { ChevronLeft, ChevronRight, Loader2, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

export default function UpcomingSection() {
  const { data: movies, isLoading } = useUpcomingMovies();

  if (isLoading)
    return (
      <div className="flex h-60 items-center justify-center bg-[#020617]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );

  return (
    <section className="relative bg-[#020617] py-20">
      <div className="mx-auto max-w-400 px-6">
        {/* Simple & Clean Header */}
        <div className="mb-12 flex items-end justify-between border-b border-white/5 pb-6">
          <div className="space-y-1">
            <h2 className="text-4xl font-black tracking-tight text-white uppercase italic">
              Upcoming <span className="text-blue-600">Releases</span>
            </h2>
            <p className="text-sm font-medium tracking-widest text-gray-500">
              STAY TUNED FOR THE NEXT BIG HITS
            </p>
          </div>

          <div className="hidden gap-2 md:flex">
            <button className="upcoming-prev flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-blue-600 disabled:opacity-10">
              <ChevronLeft size={20} />
            </button>
            <button className="upcoming-next flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-blue-600 disabled:opacity-10">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{ prevEl: '.upcoming-prev', nextEl: '.upcoming-next' }}
          spaceBetween={25}
          slidesPerView={'auto'}
          speed={800}
          autoplay={{
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          grabCursor={true}
          loop={true}
          className="overflow-visible!"
        >
          {movies?.map((movie: Movie) => (
            <SwiperSlide key={movie.id} className="w-fit!">
              <Link href={`/movie/${movie.id}`} className="group relative block w-52 md:w-64">
                {/* Poster Container */}
                <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-gray-900 ring-1 ring-white/10 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] group-hover:ring-blue-500/50">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    fill
                    alt={movie.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Bottom Gradient for Text */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />

                  {/* Rating / Info Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 rounded-md border border-white/10 bg-black/60 px-2 py-1 backdrop-blur-md">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-[10px] font-bold text-white">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Release Date Info - Below Poster */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-tighter text-blue-500 uppercase">
                      Coming On
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {new Date(movie.release_date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  {/* Minimalist Year Badge */}
                  <span className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-gray-400">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </div>

                <h3 className="mt-2 line-clamp-1 text-lg font-bold text-white transition-colors group-hover:text-blue-500">
                  {movie.title}
                </h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
