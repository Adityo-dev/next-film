'use client';
import { useWeeklyTrending } from '@/hooks/useMovies/useMovies';
import { Movie } from '@/types/movie';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import TopTenCard from './_components/TopTenCard/TopTenCard';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function TopTenSection() {
  const { data: movies, isLoading } = useWeeklyTrending();

  if (isLoading)
    return (
      <div className="flex h-60 items-center justify-center bg-[#020617]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );

  return (
    <section className="relative overflow-hidden bg-[#020617] py-10 lg:py-20">
      <div className="mx-auto max-w-400 px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic md:text-3xl">
              Top 10 <span className="text-blue-600">This Week</span>
            </h2>
            <div className="h-1 w-16 rounded-full bg-blue-600 md:w-20"></div>
          </div>
        </div>

        {/* Swiper Wrapper */}
        <div className="relative pb-10 md:pb-20">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.top-ten-prev',
              nextEl: '.top-ten-next',
            }}
            spaceBetween={25}
            slidesPerView={'auto'}
            speed={1200}
            grabCursor={true}
            slidesPerGroup={1}
            className="top-ten-swiper overflow-visible!"
            breakpoints={{
              320: {
                spaceBetween: 20,
              },
            }}
          >
            {movies?.map((movie: Movie, index: number) => (
              <SwiperSlide key={movie.id} className="w-fit!">
                <TopTenCard movie={movie} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-center gap-4 md:mt-12">
            <button className="top-ten-prev flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-blue-600 bg-transparent text-blue-600 transition-all hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:border-gray-700 disabled:text-gray-700 md:h-12 md:w-12">
              <ChevronLeft size={20} className="md:h-6 md:w-6" />
            </button>

            <button className="top-ten-next flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-blue-600 bg-transparent text-blue-600 transition-all hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:border-gray-700 disabled:text-gray-700 md:h-12 md:w-12">
              <ChevronRight size={20} className="md:h-6 md:w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
