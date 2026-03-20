import { Movie } from '@/types/movie';
import Image from 'next/image';
import Link from 'next/link';

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/movie/${movie?.id}`} className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-sm bg-[#0f172a] shadow-lg">
        {/* Image Section */}
        <div className="relative aspect-3/4 w-full">
          <Image
            fill
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.title}
            className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-[2px]"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </div>

        {/* Hover Overlay with Description */}
        <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-[#020617] via-[#020617]/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="line-clamp-4 translate-y-4 text-sm text-[#f8fafc] transition-transform duration-500 group-hover:translate-y-0">
            {movie?.overview || 'No description available.'}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-bold text-[#fbbf24]">
              ⭐ {movie?.vote_average.toFixed(1)}
            </span>
            <span className="rounded bg-[#DB1A1A] px-2 py-1 text-xs text-white">Details</span>
          </div>
        </div>

        {/* Rating Tag  */}
        <div className="absolute top-2 right-2 rounded bg-[#020617]/70 px-2 py-1 text-sm font-semibold text-[#fbbf24] backdrop-blur-md group-hover:hidden">
          ⭐ {movie?.vote_average.toFixed(1)}
        </div>
      </div>

      {/* Title Section */}
      <div className="mt-3">
        <h3 className="truncate text-lg font-semibold text-[#f8fafc] transition-colors group-hover:text-[#DB1A1A]">
          {movie?.title}
        </h3>
        <p className="mt-1 text-sm text-[#94a3b8]">
          {movie?.release_date ? movie?.release_date.split('-')[0] : 'N/A'}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
