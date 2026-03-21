'use client';
import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

const TopTenCard = ({ movie, index }: { movie: Movie; index: number }) => {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative flex shrink-0 cursor-pointer items-end pt-6"
    >
      {/* Number Background */}
      <span className="stroke-text absolute bottom-0 left-0 z-20 text-[140px] leading-[0.8] font-black text-transparent transition-all duration-500 select-none group-hover:scale-110 group-hover:text-[#DB1A1A]/30">
        {index + 1}
      </span>

      {/* Poster Image Container */}
      <div className="relative z-10 ml-12 h-96 w-64 overflow-hidden rounded-sm border border-white/10 shadow-2xl transition-all duration-500 group-hover:-translate-y-4 group-hover:rotate-3 group-hover:border-blue-500/50">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          fill
          className="object-cover"
          alt={movie.title}
          sizes="200px"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-blue-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
          font-family: 'Montserrat', sans-serif;
        }
      `}</style>
    </Link>
  );
};

export default TopTenCard;
