import { movieService } from '@/services/movieService/movieService';
import { useQuery } from '@tanstack/react-query';

// Popular Movies Hook
export const usePopularMovies = () => {
  return useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: movieService.getPopularMovies,
  });
};

// Top 10 Weekly Trending Hook
export const useWeeklyTrending = () => {
  return useQuery({
    queryKey: ['movies', 'trending-weekly'],
    queryFn: movieService.getWeeklyTrending,
    staleTime: 1000 * 60 * 60,
  });
};

// Upcoming Movies Hook
export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: movieService.getUpcomingMovies,
    staleTime: 1000 * 60 * 60,
  });
};

// Popular Actors Hook
export const usePopularActors = () => {
  return useQuery({
    queryKey: ['actors', 'popular'],
    queryFn: movieService.getPopularActors,
  });
};

export const useMoviesByGenre = (genreId: number) => {
  return useQuery({
    queryKey: ['movies', 'genre', genreId],
    queryFn: () => movieService.getMoviesByGenre(genreId),
    enabled: !!genreId,
    staleTime: 1000 * 60 * 30,
  });
};
