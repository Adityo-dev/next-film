export const movieService = {
  // Get Popular Movies
  getPopularMovies: async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    );
    if (!res.ok) throw new Error('Network error!');
    const data = await res.json();
    return data?.results;
  },

  // Get Top 10 Weekly Trending Movies
  getWeeklyTrending: async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error('Failed to fetch trending movies');
    const data = await res.json();

    return data?.results?.slice(0, 10);
  },

  // Get Upcoming Movies
  getUpcomingMovies: async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error('Failed to fetch upcoming movies');
    const data = await res.json();
    return data?.results;
  },

  // Get Popular Actors
  getPopularActors: async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/person/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) throw new Error('Failed to fetch actors');
    const data = await res.json();
    return data?.results;
  },

  // Get Actor Movies
  getActorMovies: async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/person/${id}/movie_credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    );
    if (!res.ok) throw new Error('Failed to fetch actor movies');
    const data = await res.json();
    return data?.cast;
  },

  // Get Movies By Genre
  getMoviesByGenre: async (genreId: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      throw new Error('Failed to fetch genre movies');
    }

    const data = await res.json();
    return data?.results;
  },
};
