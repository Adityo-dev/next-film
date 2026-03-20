'use client';

import { Play, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

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
  const displayMovies = trendingMovies?.slice(0, 6) || [];

  return (
    <section className="relative h-[85vh] w-full bg-[#020617] lg:h-[90vh]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {displayMovies.map((movie) => (
          <SwiperSlide key={movie?.id}>
            <div className="relative flex h-full w-full items-end pb-20 md:items-center md:pb-0">
              <div className="absolute inset-0">
                <Image
                  fill
                  src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                  alt={movie?.title}
                  priority
                  className="h-full w-full object-cover object-[center_25%] md:object-center"
                />

                {/* Dark Overlays for Readability */}
                <div className="absolute inset-0 z-10 bg-linear-to-r from-[#020617] via-[#020617]/60 to-transparent" />
                <div className="absolute inset-0 z-10 bg-linear-to-t from-[#020617] via-transparent to-transparent" />
              </div>

              {/* Content Area */}
              <div className="relative z-20 mx-auto w-full max-w-400 px-4">
                <div className="max-w-3xl text-center md:text-left">
                  {/* Badge & Rating */}
                  <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
                    <span className="rounded-md bg-[#DB1A1A] px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase md:text-xs">
                      Trending
                    </span>
                    <span className="text-sm font-bold text-yellow-400 md:text-base">
                      ⭐ {movie?.vote_average.toFixed(1)}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="mb-4 text-3xl leading-tight font-black text-white sm:text-4xl md:mb-6 md:text-6xl lg:text-7xl">
                    {movie?.title}
                  </h1>

                  {/* Overview */}
                  <p className="mb-8 line-clamp-2 text-sm leading-relaxed text-gray-300 sm:text-base md:line-clamp-3 md:max-w-xl md:text-lg lg:max-w-2xl">
                    {movie?.overview}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start">
                    <Link
                      href={`/movie/${movie?.id}`}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#DB1A1A] px-8 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95 sm:w-auto md:px-10 md:py-4"
                    >
                      <Play size={18} fill="currentColor" />
                      Watch Now
                    </Link>

                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-8 py-3.5 font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 sm:w-auto md:px-10 md:py-4">
                      <Plus size={20} />
                      Watch list
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Fix */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 20px !important;
        }

        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.3;
        }

        .swiper-pagination-bullet-active {
          background: #db1a1a !important;
          width: 30px !important;
          border-radius: 5px !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Hero;
