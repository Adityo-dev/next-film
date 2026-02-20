import Hero from './_components/Hero/Hero';
import MovieGrid from './_components/MovieGrid/MovieGrid';

async function getMovies(endpoint: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/${endpoint}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) throw new Error(`Failed to fetch movies from ${endpoint}`);
  const data = await res.json();
  return data.results;
}

const HomePage = async () => {
  const trendingMovies = await getMovies('trending/movie/day');
  const popularMovies = await getMovies('movie/popular');

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Hero trendingMovies={trendingMovies} />

      <MovieGrid movies={popularMovies} />
    </main>
  );
};

export default HomePage;
