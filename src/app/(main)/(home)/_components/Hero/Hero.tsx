'use client';

import Link from 'next/link';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
}

const Hero = ({ trendingMovies }: { trendingMovies: Movie[] }) => {
  const displayMovies = trendingMovies.slice(0, 6);

  return (
    <section className="relative h-[85vh] w-full bg-[#020617]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {displayMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative flex h-full w-full items-center">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  width={1600}
                  height={1200}
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  priority
                  className="h-full w-full object-cover object-center"
                />
                {/* Dark Overlays for Readability */}
                <div className="absolute inset-0 z-10 bg-linear-to-r from-[#020617] via-[#020617]/60 to-transparent" />
                <div className="absolute inset-0 z-10 bg-linear-to-t from-[#020617] via-transparent to-transparent" />
              </div>

              {/* Content Area */}
              <div className="relative z-20 container mx-auto px-6 md:px-12">
                <div className="max-w-2xl">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-md bg-blue-600 px-3 py-1 text-xs font-bold uppercase">
                      Trending
                    </span>
                    <span className="font-bold text-yellow-400">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </span>
                  </div>

                  <h1 className="animate-in fade-in slide-in-from-left mb-6 text-5xl leading-tight font-black text-white duration-700 md:text-7xl">
                    {movie.title}
                  </h1>

                  <p className="mb-8 line-clamp-3 text-lg leading-relaxed text-gray-300">
                    {movie.overview}
                  </p>

                  <div className="flex gap-4">
                    <Link
                      href={`/movie/${movie.id}`}
                      className="rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95"
                    >
                      Watch Now
                    </Link>
                    <button className="rounded-xl border border-white/10 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/20">
                      + Watch list
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styling for Swiper Pagination  */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 40px !important;
          border-radius: 5px !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Hero;
