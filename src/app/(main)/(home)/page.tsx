import CallToAction from './_components/CallToAction/CallToAction';
import GenreSection from './_components/GenreSection/GenreSection';
import Hero from './_components/Hero/Hero';
import PopularMovies from './_components/PopularMovies/PopularMovies';
import TopActors from './_components/TopActors/TopActors';
import TopTenSection from './_components/TopTenSection/TopTenSection';
import UpcomingSection from './_components/UpcomingSection/UpcomingSection';

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

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <Hero trendingMovies={trendingMovies} />
      <PopularMovies />
      <TopTenSection />
      <GenreSection />
      <UpcomingSection />
      <TopActors />
      <CallToAction />
    </main>
  );
};

export default HomePage;
