/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getMovieData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=videos,credits`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const movie = await getMovieData(id);

  if (!movie) {
    notFound();
  }

  const trailer = movie.videos?.results?.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube',
  );
  const director = movie.credits?.crew?.find((c: any) => c.job === 'Director');
  const mainCast = movie.credits?.cast;

  return (
    <main className="min-h-screen bg-[#020617] text-[#f8fafc]">
      {/* --- HERO SECTION: Backdrop --- */}
      <section className="relative h-[60vh] w-full lg:h-[85vh]">
        <Image
          fill
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-[#020617]/40 to-transparent" />

        <div className="relative container mx-auto flex h-full items-end px-4 pb-12 md:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            {/* Poster Card */}
            <div className="hidden w-72 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:block">
              <Image
                width={500}
                height={750}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full"
              />
            </div>

            {/* Movie Info Text */}
            <div className="max-w-4xl">
              <h1 className="text-5xl font-black tracking-tight md:text-7xl">{movie.title}</h1>
              <p className="mt-3 text-lg text-[#fbbf24] italic md:text-xl">{movie.tagline}</p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-bold text-[#94a3b8]">
                <div className="flex items-center gap-1 text-[#fbbf24]">
                  <span className="text-xl">⭐</span>
                  <span className="text-white">{movie.vote_average?.toFixed(1)}</span>
                </div>
                <span>•</span>
                <span>{movie.release_date?.split('-')[0]}</span>
                <span>•</span>
                <span className="rounded border border-[#94a3b8] px-2 py-0.5 text-xs text-white">
                  {movie.runtime} min
                </span>
                <div className="flex gap-2">
                  {movie.genres?.map((g: any) => (
                    <span key={g.id} className="text-[#2563eb]">
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-8 text-base leading-relaxed text-[#cbd5e1] md:text-lg lg:max-w-3xl">
                {movie.overview}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-full bg-[#2563eb] px-10 py-4 font-extrabold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:bg-[#3b82f6] active:scale-95">
                  ▶ Watch Now
                </button>
                <button className="rounded-full bg-white/10 px-10 py-4 font-extrabold backdrop-blur-md transition-all hover:bg-white/20">
                  + Add to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DETAILS SECTION --- */}
      <section className="container mx-auto px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Left Column: Cast & Video */}
          <div className="space-y-16 lg:col-span-3">
            {/* 1. Video/Trailer Player */}
            {trailer && (
              <div>
                <h2 className="mb-8 border-l-4 border-[#2563eb] pl-4 text-2xl font-bold tracking-wider uppercase">
                  Official Trailer
                </h2>
                <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#0f172a] shadow-2xl">
                  <div className="aspect-video w-full">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Cast List */}
            <div>
              <h2 className="mb-8 border-l-4 border-[#2563eb] pl-4 text-2xl font-bold tracking-wider uppercase">
                Top Billed Cast
              </h2>
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
                {mainCast?.map((person: any) => (
                  <div key={person.id} className="group">
                    <div className="relative mb-3 aspect-4/5 overflow-hidden rounded-xl border border-white/5 bg-[#0f172a]">
                      <Image
                        fill
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                            : 'https://via.placeholder.com/185x230?text=No+Image'
                        }
                        alt={person.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <p className="line-clamp-1 font-bold text-[#f8fafc] transition-colors group-hover:text-[#2563eb]">
                      {person.name}
                    </p>
                    <p className="line-clamp-1 text-xs text-[#94a3b8]">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar (Budget, Revenue, Production) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8 rounded-2xl border border-white/5 bg-[#0f172a] p-8 shadow-xl">
              <div>
                <h3 className="mb-6 border-b border-white/10 pb-2 text-lg font-bold tracking-widest text-[#2563eb] uppercase">
                  Information
                </h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-[10px] font-bold text-[#94a3b8] uppercase">Director</p>
                    <p className="text-sm font-semibold">{director?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#94a3b8] uppercase">Budget</p>
                    <p className="text-sm font-semibold text-green-500">
                      {movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#94a3b8] uppercase">Revenue</p>
                    <p className="text-sm font-semibold text-green-500">
                      {movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#94a3b8] uppercase">Original Title</p>
                    <p className="text-sm font-semibold">{movie.original_title}</p>
                  </div>
                </div>
              </div>

              {/* Production Companies */}
              <div>
                <h3 className="mb-6 border-b border-white/10 pb-2 text-lg font-bold tracking-widest text-[#2563eb] uppercase">
                  Production
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {movie.production_companies?.map(
                    (company: any) =>
                      company.logo_path && (
                        <div
                          key={company.id}
                          className="flex items-center justify-center rounded-lg border border-white/5 bg-white/5 p-2 grayscale transition-all hover:grayscale-0"
                        >
                          <Image
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                            width={80}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                      ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
