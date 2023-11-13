import { useQuery, useMutation, UseQueryResult, UseMutationResult } from 'react-query';
import { Movie, RatingPayload } from '../types';
const API_KEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY; 
const BASE_URL = process.env.NEXT_PUBLIC_MOVIE_API_BASE_URL || 'https://api.themoviedb.org/3';

const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  const data = await response.json();
  return data.results;
};

const usePopularMovies = (): UseQueryResult<Movie[], Error> => {
  return useQuery('popularMovies', fetchPopularMovies);
};

const fetchSearchedMovies = async (query: string): Promise<Movie[]> => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  if (!response.ok) {
    throw new Error('Failed to search movies');
  }
  const data = await response.json();
  return data.results;
};

const useSearchedMovies = (query: string): UseQueryResult<Movie[], Error> => {
  return useQuery(['searchedMovies', query], () => fetchSearchedMovies(query));
};

const rateMovie = async ({ movieId, rating, guestSessionId }: RatingPayload): Promise<any> => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value: rating })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to rate the movie');
  }
  const data = await response.json();
  return data;
};

const useRateMovie = (): UseMutationResult<any, Error, RatingPayload, unknown> => {
  return useMutation(rateMovie);
};

const createGuestSession = async (): Promise<string> => {
  const response = await fetch(`${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to create a guest session');
  }
  const data = await response.json();
  return data.guest_session_id;
};

const useGuestSession = (): UseQueryResult<string, Error> => {
  return useQuery('guestSession', createGuestSession);
};


const fetchMovieDetails = async (id: string): Promise<Movie> => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  const data = await response.json();
  return data;
};

const useMovieDetails = (id: string): UseQueryResult<Movie, Error> => {
  return useQuery(['movieDetails', id], () => fetchMovieDetails(id));
};

export { usePopularMovies, useSearchedMovies, useRateMovie, useGuestSession, useMovieDetails };
